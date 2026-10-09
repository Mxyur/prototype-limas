// LIMAS 3R — Governed Product → CIF/Debtor → Entity → Group Usaha identity bridge.
// Pure module: no UI, no mutation of raw Product records, no change to business formulas.
// Display names are NEVER business keys. Resolution is keyed by CIF + as-of date + mapping version.

export const IDENTITY_FIELDS = Object.freeze([
  "product_record_id","source_system","cif","debtor_name",
  "entity_code","entity_name","entity_type","group_id","group_name",
  "mapping_status","mapping_source","mapping_as_of_date","mapping_version"
]);

export const IDENTITY_STATUS = Object.freeze({
  MAPPED:"MAPPED",
  DQ:"DQ"
});

export const IDENTITY_DQ = Object.freeze({
  CIF_MISSING:"ID_CIF_MISSING",
  MAPPING_NOT_FOUND:"ID_MAPPING_NOT_FOUND",
  MAPPING_NOT_APPROVED:"ID_MAPPING_NOT_APPROVED",
  MAPPING_NOT_YET_EFFECTIVE:"ID_MAPPING_NOT_YET_EFFECTIVE",
  MAPPING_EXPIRED:"ID_MAPPING_EXPIRED",
  MAPPING_CONFLICT:"ID_MAPPING_CONFLICT",
  ENTITY_NOT_IN_MASTER:"ID_ENTITY_NOT_IN_MASTER",
  ENTITY_INACTIVE:"ID_ENTITY_INACTIVE",
  GROUP_NOT_IN_MASTER:"ID_GROUP_NOT_IN_MASTER",
  GROUP_MISSING:"ID_GROUP_MISSING",
  META_CONFLICT:"ID_SOURCE_META_CONFLICT",
  DUPLICATE_RECORD_ID:"ID_DUPLICATE_PRODUCT_RECORD_ID",
  COUNTERPARTY_MISSING:"ID_COUNTERPARTY_MISSING",
  COUNTERPARTY_NOT_IN_MASTER:"ID_COUNTERPARTY_NOT_IN_MASTER",
  CCL_SCOPE_INVALID:"ID_CCL_SCOPE_INVALID",
  CCL_LIMIT_TYPE_INVALID:"ID_CCL_LIMIT_TYPE_INVALID"
});

const up=v=>String(v??"").trim().toUpperCase();
const txt=v=>String(v??"").trim();
const isoOrNull=v=>{const s=txt(v);return /^\d{4}-\d{2}-\d{2}/.test(s)?s.slice(0,10):null;};

// ---- Product → identity key extraction (reads source fields only) -------------------------
// Which source field carries the CIF is a property of the product source, not of the display.
export const PRODUCT_IDENTITY_SOURCE = Object.freeze({
  "CASHLOAN":{cif:"no_cus",debtorName:"nm_cus",counterpartyName:null,sourceSystemField:"src"},
  "NON CASH LOAN":{cif:"CUSTID",debtorName:"CUSTNM",counterpartyName:"CPNM",sourceSystemField:null},
  // Treasury Line reaches MLK only through the explicit/controlled mlkCif enrichment (never inferred from Swift Code).
  "CREDIT LINE":{cif:null,cifEnrichment:"mlkCif",debtorName:"Nama",counterpartyName:"Bank",sourceSystemField:null}
});

export function productRecordId(productId,record,index=0){
  const meta=record?.meta||{};
  return txt(meta.recordId)||productId+"#"+String(index+1).padStart(6,"0");
}

export function extractIdentityKeys(productId,record,index=0){
  const spec=PRODUCT_IDENTITY_SOURCE[productId];
  const data=record?.data||{},meta=record?.meta||{};
  const rid=productRecordId(productId,record,index);
  const sourceSystem=txt(meta.sourceSystem)||txt(spec?.sourceSystemField&&data[spec.sourceSystemField])||"UNKNOWN";
  if(!spec)return {product_record_id:rid,product_id:productId,source_system:sourceSystem,cif:"",debtor_name:"",eligible:false};
  const cif=txt(spec.cif?data[spec.cif]:meta[spec.cifEnrichment]);
  return {
    product_record_id:rid,product_id:productId,source_system:sourceSystem,
    cif,debtor_name:txt(data[spec.debtorName]),
    counterparty_name:spec.counterpartyName?txt(data[spec.counterpartyName]):"",
    meta_entity_code:up(meta.reportingEntity),meta_group_id:txt(meta.groupId),
    as_of_date:isoOrNull(meta.asOfDate),
    eligible:true
  };
}

// ---- Masters (versioned, time-aware) ---------------------------------------------------------
// Entity Master row:  {entityCode,entityName,entityType,activeFlag,effectiveDate?,expiryDate?,version?}
// Group Master row:   {groupId,groupName,holding?,subGroup?,activeFlag}
// Mapping row (CIF → Entity/Group): {mappingId,scope,cif,entityCode,groupId,mappingStatus,mappingSource,
//                                     mappingVersion,effectiveDate,expiryDate}
export function buildEntityMaster(rows=[]){
  const byCode=new Map();
  (rows||[]).forEach(r=>byCode.set(up(r.entityCode),{
    entity_code:up(r.entityCode),entity_name:txt(r.entityName)||up(r.entityCode),entity_type:up(r.entityType)||"UNKNOWN",
    active:r.activeFlag!==false,effective_date:isoOrNull(r.effectiveDate),expiry_date:isoOrNull(r.expiryDate)
  }));
  return byCode;
}
export function buildGroupMaster(rows=[]){
  const byId=new Map();
  (rows||[]).forEach(r=>byId.set(txt(r.groupId),{group_id:txt(r.groupId),group_name:txt(r.groupName)||txt(r.groupId),holding:txt(r.holding),sub_group:txt(r.subGroup),active:r.activeFlag!==false}));
  return byId;
}

// Derive a governed MLK mapping table from the existing MLK master rows. This is a MIGRATION adapter:
// it turns today's implicit "MLK master row carries entity+group" into explicit versioned mapping records,
// so the relationship becomes first-class and maintainable (4R) without changing any master value.
export function deriveMlkMappingRows(mlkMasterRows=[],{asOfDate,version="MLK-MAP-v1",source="MLK_MASTER"}={}){
  const eff=isoOrNull(asOfDate)||"1900-01-01";
  return (mlkMasterRows||[]).map(m=>({
    mappingId:"MLK|"+txt(m.key)+"|"+version,scope:"MLK",cif:txt(m.key),
    entityCode:up(m.entity),groupId:txt(m.group),mappingStatus:"APPROVED",mappingSource:source,
    mappingVersion:version,effectiveDate:eff,expiryDate:null
  }));
}
export function deriveGroupMasterRows(mlkMasterRows=[]){
  const seen=new Map();
  (mlkMasterRows||[]).forEach(m=>{const id=txt(m.group);if(id&&!seen.has(id))seen.set(id,{groupId:id,groupName:id,holding:txt(m.groupUsahaHolding),subGroup:txt(m.subGroup),activeFlag:true});});
  return [...seen.values()];
}

// ---- As-of resolution -------------------------------------------------------------------------------------
function activeWindow(row,asOf){
  const eff=isoOrNull(row.effectiveDate),exp=isoOrNull(row.expiryDate);
  if(eff&&asOf<eff)return "FUTURE";
  if(exp&&asOf>=exp)return "EXPIRED";
  return "ACTIVE";
}

// Returns {mapping,dq}. Highest mappingVersion wins among APPROVED+ACTIVE; two different targets at the SAME
// highest version is an explicit conflict (never silently picks one).
export function resolveMapping(cif,asOf,mappingRows=[],scope="MLK"){
  const key=txt(cif);
  if(!key)return {mapping:null,dq:IDENTITY_DQ.CIF_MISSING};
  const rows=(mappingRows||[]).filter(r=>txt(r.cif)===key&&(!scope||r.scope===scope));
  if(!rows.length)return {mapping:null,dq:IDENTITY_DQ.MAPPING_NOT_FOUND};
  const approved=rows.filter(r=>up(r.mappingStatus)==="APPROVED");
  if(!approved.length)return {mapping:null,dq:IDENTITY_DQ.MAPPING_NOT_APPROVED};
  const active=approved.filter(r=>activeWindow(r,asOf)==="ACTIVE");
  if(!active.length){
    return {mapping:null,dq:approved.some(r=>activeWindow(r,asOf)==="FUTURE")&&!approved.some(r=>activeWindow(r,asOf)==="EXPIRED")?IDENTITY_DQ.MAPPING_NOT_YET_EFFECTIVE:IDENTITY_DQ.MAPPING_EXPIRED};
  }
  const rank=r=>String(r.mappingVersion||"");
  const top=active.reduce((a,b)=>rank(b)>a?rank(b):a,"");
  const winners=active.filter(r=>rank(r)===top);
  const targets=new Set(winners.map(r=>up(r.entityCode)+"|"+txt(r.groupId)));
  if(targets.size>1)return {mapping:null,dq:IDENTITY_DQ.MAPPING_CONFLICT};
  return {mapping:winners[0],dq:null};
}

// ---- Product → Entity → Group resolution -----------------------------------------------------------
export function resolveProductIdentity(keys,ctx){
  const {entityMaster,groupMaster,mappingRows,asOfDate}=ctx;
  const asOf=keys.as_of_date||isoOrNull(asOfDate)||"9999-12-31";
  const base={
    product_record_id:keys.product_record_id,source_system:keys.source_system,cif:keys.cif,debtor_name:keys.debtor_name,
    entity_code:"",entity_name:"",entity_type:"",group_id:"",group_name:"",
    mapping_status:IDENTITY_STATUS.DQ,mapping_source:"",mapping_as_of_date:asOf,mapping_version:"",
    dq_codes:[],product_id:keys.product_id
  };
  const {mapping,dq}=resolveMapping(keys.cif,asOf,mappingRows,"MLK");
  if(!mapping){base.dq_codes.push(dq);return base;}
  base.mapping_source=txt(mapping.mappingSource);base.mapping_version=txt(mapping.mappingVersion);
  const ent=entityMaster.get(up(mapping.entityCode));
  if(!ent)base.dq_codes.push(IDENTITY_DQ.ENTITY_NOT_IN_MASTER);
  else{
    base.entity_code=ent.entity_code;base.entity_name=ent.entity_name;base.entity_type=ent.entity_type;
    if(!ent.active)base.dq_codes.push(IDENTITY_DQ.ENTITY_INACTIVE);
  }
  if(!txt(mapping.groupId))base.dq_codes.push(IDENTITY_DQ.GROUP_MISSING);
  else{
    const g=groupMaster.get(txt(mapping.groupId));
    if(!g)base.dq_codes.push(IDENTITY_DQ.GROUP_NOT_IN_MASTER);
    else{base.group_id=g.group_id;base.group_name=g.group_name;}
  }
  // Inline source-meta enrichment must agree with the governed mapping; disagreement is surfaced, not ignored.
  if((keys.meta_entity_code&&base.entity_code&&keys.meta_entity_code!==base.entity_code)||(keys.meta_group_id&&base.group_id&&keys.meta_group_id!==base.group_id))
    base.dq_codes.push(IDENTITY_DQ.META_CONFLICT);
  if(!base.dq_codes.length)base.mapping_status=IDENTITY_STATUS.MAPPED;
  return base;
}

// MLK-eligible = the record's CIF (or controlled mlkCif) is declared to participate in MLK by the mapping contract.
// Participation is declared by the MLK mapping table, never by recordId naming or display text.
export function isMlkParticipant(keys,mappingRows){
  if(!keys.eligible)return false;
  const key=txt(keys.cif);
  return !!key&&(mappingRows||[]).some(r=>r.scope==="MLK"&&txt(r.cif)===key);
}

export function buildProductIdentityBridge(productDb={},ctx){
  const rows=[],seen=new Map(),dqRegister=[];
  for(const [productId,records] of Object.entries(productDb||{})){
    (records||[]).forEach((rec,i)=>{
      const keys=extractIdentityKeys(productId,rec,i);
      if(!keys.eligible)return;
      // Records that carry a CIF but no mapping at all, and are not MLK participants, are out of MLK scope
      // (e.g. foreign-country or CCL counterparties). Records explicitly flagged for MLK by source enrichment
      // (mlkCif) but missing from the mapping table ARE reported as DQ.
      const declaredMlk=!!txt(rec?.meta?.mlkCif);
      if(!isMlkParticipant(keys,ctx.mappingRows)&&!declaredMlk)return;
      const r=resolveProductIdentity(keys,ctx);
      if(seen.has(r.product_record_id)){r.dq_codes.push(IDENTITY_DQ.DUPLICATE_RECORD_ID);r.mapping_status=IDENTITY_STATUS.DQ;}
      else seen.set(r.product_record_id,true);
      rows.push(r);
      if(r.mapping_status!==IDENTITY_STATUS.MAPPED)dqRegister.push({product_record_id:r.product_record_id,product_id:productId,cif:r.cif,codes:r.dq_codes});
    });
  }
  return {rows,dqRegister,summary:summarizeBridge(rows)};
}

export function summarizeBridge(rows=[]){
  const mapped=rows.filter(r=>r.mapping_status===IDENTITY_STATUS.MAPPED).length;
  const byCode={};
  rows.forEach(r=>r.dq_codes.forEach(c=>{byCode[c]=(byCode[c]||0)+1;}));
  return {total:rows.length,mapped,dq:rows.length-mapped,byCode,silentUnknown:rows.filter(r=>r.mapping_status===IDENTITY_STATUS.MAPPED&&(!r.entity_code||!r.group_id||!r.cif)).length};
}

// ---- Aggregation with double-count protection (MLK-01 / MLK-02) -----------------------------
// contributions: [{product_record_id, amount}] — ONE contribution per product_record_id per metric.
// Entity/Group views are built from the bridge; CONSOLIDATED is built from the same set and is never
// summed on top of entity/group totals.
export function aggregateByIdentity(bridgeRows=[],contributions=[]){
  const idx=new Map(bridgeRows.map(r=>[r.product_record_id,r]));
  const seen=new Set(),entity={},group={},unresolved={count:0,amount:0},dup=[];
  let consolidated=0;
  for(const c of contributions){
    const id=c.product_record_id,amt=Number(c.amount)||0;
    if(seen.has(id+"|"+(c.metric||""))){dup.push(id);continue;}
    seen.add(id+"|"+(c.metric||""));
    const b=idx.get(id);
    consolidated+=amt;
    if(!b||b.mapping_status!==IDENTITY_STATUS.MAPPED){unresolved.count++;unresolved.amount+=amt;continue;}
    entity[b.entity_code]=(entity[b.entity_code]||0)+amt;
    group[b.group_id]=(group[b.group_id]||0)+amt;
  }
  const sum=o=>Object.values(o).reduce((a,b)=>a+b,0);
  return {entity,group,consolidated,unresolved,duplicateContributions:dup,
    reconciles:Math.abs(sum(entity)+unresolved.amount-consolidated)<1e-6&&Math.abs(sum(group)+unresolved.amount-consolidated)<1e-6};
}

// ---- CCL identity: Product → Counterparty → Entity → Direct/Indirect ---------------------------
export function resolveCclIdentity(productId,record,index,{counterpartyKeys,entityMaster,cclEntityScope}){
  const meta=record?.meta||{},data=record?.data||{};
  const rid=productRecordId(productId,record,index);
  const cp=txt(meta.cclCounterpartyId);
  const entity=up(meta.reportingEntity);
  const limitType=up(meta.cclLimitType||meta.creditLineLimitType);
  const out={product_record_id:rid,product_id:productId,counterparty_id:cp,entity_code:entity,ccl_limit_type:limitType,as_of_date:isoOrNull(meta.asOfDate)||"",mapping_status:IDENTITY_STATUS.DQ,dq_codes:[]};
  if(!cp)out.dq_codes.push(IDENTITY_DQ.COUNTERPARTY_MISSING);
  else if(!counterpartyKeys.has(cp))out.dq_codes.push(IDENTITY_DQ.COUNTERPARTY_NOT_IN_MASTER);
  if(!entity||!entityMaster.has(entity))out.dq_codes.push(IDENTITY_DQ.ENTITY_NOT_IN_MASTER);
  if(limitType!=="DIRECT"&&limitType!=="INDIRECT")out.dq_codes.push(IDENTITY_DQ.CCL_LIMIT_TYPE_INVALID);
  else{
    const scope=(cclEntityScope||[]).find(s=>up(s.entityCode)===entity);
    if(!scope||(limitType==="DIRECT"&&!scope.direct)||(limitType==="INDIRECT"&&!scope.indirect))out.dq_codes.push(IDENTITY_DQ.CCL_SCOPE_INVALID);
  }
  if(!out.dq_codes.length)out.mapping_status=IDENTITY_STATUS.MAPPED;
  return out;
}
