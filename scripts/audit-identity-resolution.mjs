// 3R acceptance: governed Product → CIF → Entity → Group identity (semantic, not structural).
import assert from "node:assert/strict";
import {E2E_DUMMY_PRODUCT_DATA as P,E2E_MASTER_DATA as M,E2E_ENTITY_MASTER,E2E_CCL_ENTITY_SCOPE,E2E_DUMMY_META} from "../src/e2eDummyData.js";
import * as I from "../src/identity/identityContract.js";

const results=[];const t=(name,fn)=>{try{fn();results.push(["PASS",name]);}catch(e){results.push(["FAIL",name+" :: "+e.message]);}};
const asOf=E2E_DUMMY_META.asOfDate;
const mappingRows=I.deriveMlkMappingRows(M.MLK,{asOfDate:"2026-01-01"});
const ctx={entityMaster:I.buildEntityMaster(E2E_ENTITY_MASTER),groupMaster:I.buildGroupMaster(I.deriveGroupMasterRows(M.MLK)),mappingRows,asOfDate:asOf};
const bridge=I.buildProductIdentityBridge(P,ctx);

// ---- Real fixture acceptance ----
t("every MLK-participating product record resolves CIF+Entity+Group or carries explicit DQ",()=>{
  assert.ok(bridge.rows.length>0,"bridge empty");
  for(const r of bridge.rows){
    if(r.mapping_status==="MAPPED")assert.ok(r.cif&&r.entity_code&&r.group_id,"silent unknown "+r.product_record_id);
    else assert.ok(r.dq_codes.length>0,"DQ row without code "+r.product_record_id);
  }
  assert.equal(bridge.summary.silentUnknown,0);
});
t("canonical identity fields are all present on every bridge row",()=>{
  for(const r of bridge.rows)for(const f of I.IDENTITY_FIELDS)assert.ok(f in r,"missing "+f+" on "+r.product_record_id);
});
t("no product_record_id is duplicated across products",()=>{
  const ids=bridge.rows.map(r=>r.product_record_id);assert.equal(new Set(ids).size,ids.length);
});
t("display name is not used as key: renaming nm_cus does not change resolution",()=>{
  const rec=structuredClone(P.CASHLOAN.find(x=>x.meta.recordId.startsWith("CL-MLK-EXT")));
  const k1=I.extractIdentityKeys("CASHLOAN",rec,0);rec.data.nm_cus="COMPLETELY DIFFERENT NAME";
  const k2=I.extractIdentityKeys("CASHLOAN",rec,0);
  const a=I.resolveProductIdentity(k1,ctx),b=I.resolveProductIdentity(k2,ctx);
  assert.equal(a.entity_code,b.entity_code);assert.equal(a.group_id,b.group_id);assert.equal(a.mapping_status,"MAPPED");
});
t("raw source record is not mutated by identity resolution",()=>{
  const before=JSON.stringify(P);I.buildProductIdentityBridge(P,ctx);assert.equal(JSON.stringify(P),before);
});
t("inline meta (reportingEntity/groupId) agrees with governed mapping on the production snapshot",()=>{
  const conflicts=bridge.rows.filter(r=>r.dq_codes.includes(I.IDENTITY_DQ.META_CONFLICT));
  assert.equal(conflicts.length,0,"meta conflicts: "+conflicts.map(c=>c.product_record_id).join(","));
});
t("CIF-level aggregation: entity total = group total = consolidated (no double count)",()=>{
  const contrib=[];
  P.CASHLOAN.forEach((rec,i)=>{const id=I.productRecordId("CASHLOAN",rec,i);contrib.push({product_record_id:id,metric:"CL_BADE",amount:Number(rec.data.total_bade)||0});});
  const mlkContrib=contrib.filter(c=>bridge.rows.some(b=>b.product_record_id===c.product_record_id));
  const agg=I.aggregateByIdentity(bridge.rows,mlkContrib);
  assert.ok(agg.reconciles,"does not reconcile");
  const sum=o=>Object.values(o).reduce((a,b)=>a+b,0);
  assert.ok(Math.abs(sum(agg.entity)-sum(agg.group))<1e-6);
  assert.ok(Math.abs(sum(agg.entity)+agg.unresolved.amount-agg.consolidated)<1e-6);
});

// ---- Semantic negative fixtures (each rule must actually fire) ----
const keysFor=cif=>({product_record_id:"X-"+cif,product_id:"CASHLOAN",source_system:"T",cif,debtor_name:"n",as_of_date:"2026-09-30",eligible:true});
const mk=(o={})=>({mappingId:"m",scope:"MLK",cif:"C1",entityCode:"BMRI",groupId:"G1",mappingStatus:"APPROVED",mappingSource:"T",mappingVersion:"v1",effectiveDate:"2026-01-01",expiryDate:null,...o});
const ctxWith=(rows,extra={})=>({entityMaster:I.buildEntityMaster([{entityCode:"BMRI",entityName:"BMRI",entityType:"PARENT"},{entityCode:"OLD",entityName:"OLD",entityType:"SUBSIDIARY",activeFlag:false}]),groupMaster:I.buildGroupMaster([{groupId:"G1",groupName:"G1"},{groupId:"G2",groupName:"G2"}]),mappingRows:rows,asOfDate:"2026-09-30",...extra});
const dqOf=(rows,cif="C1",x={})=>I.resolveProductIdentity({...keysFor(cif),...x},ctxWith(rows)).dq_codes;

t("missing CIF → ID_CIF_MISSING (never silent unknown)",()=>assert.deepEqual(dqOf([mk()],""),[I.IDENTITY_DQ.CIF_MISSING]));
t("unmapped CIF → ID_MAPPING_NOT_FOUND",()=>assert.deepEqual(dqOf([mk()],"ZZ"),[I.IDENTITY_DQ.MAPPING_NOT_FOUND]));
t("DRAFT mapping is not effective",()=>assert.deepEqual(dqOf([mk({mappingStatus:"DRAFT"})]),[I.IDENTITY_DQ.MAPPING_NOT_APPROVED]));
t("future-dated mapping → NOT_YET_EFFECTIVE",()=>assert.deepEqual(dqOf([mk({effectiveDate:"2027-01-01"})]),[I.IDENTITY_DQ.MAPPING_NOT_YET_EFFECTIVE]));
t("expired mapping → EXPIRED",()=>assert.deepEqual(dqOf([mk({expiryDate:"2026-06-30"})]),[I.IDENTITY_DQ.MAPPING_EXPIRED]));
t("unknown entity / unknown group are explicit DQ",()=>{
  assert.ok(dqOf([mk({entityCode:"NOPE"})]).includes(I.IDENTITY_DQ.ENTITY_NOT_IN_MASTER));
  assert.ok(dqOf([mk({groupId:"NOPE"})]).includes(I.IDENTITY_DQ.GROUP_NOT_IN_MASTER));
  assert.ok(dqOf([mk({groupId:""})]).includes(I.IDENTITY_DQ.GROUP_MISSING));
  assert.ok(dqOf([mk({entityCode:"OLD"})]).includes(I.IDENTITY_DQ.ENTITY_INACTIVE));
});
t("same-version divergent targets → ID_MAPPING_CONFLICT (no silent pick)",()=>assert.deepEqual(dqOf([mk(),mk({entityCode:"OLD",mappingId:"m2"})]),[I.IDENTITY_DQ.MAPPING_CONFLICT]));
t("AS-OF: Entity→Group is not static — v2 moves CIF to another group only from its effective date",()=>{
  const rows=[mk({mappingVersion:"v1",expiryDate:"2026-07-01"}),mk({mappingVersion:"v2",groupId:"G2",effectiveDate:"2026-07-01",mappingId:"m2"})];
  const c=ctxWith(rows);
  const before=I.resolveProductIdentity({...keysFor("C1"),as_of_date:"2026-06-15"},c),after=I.resolveProductIdentity({...keysFor("C1"),as_of_date:"2026-09-30"},c);
  assert.equal(before.group_id,"G1");assert.equal(before.mapping_version,"v1");
  assert.equal(after.group_id,"G2");assert.equal(after.mapping_version,"v2");
  assert.equal(before.mapping_status,"MAPPED");assert.equal(after.mapping_status,"MAPPED");
});
t("inline meta that disagrees with governed mapping → ID_SOURCE_META_CONFLICT",()=>assert.ok(dqOf([mk()],"C1",{meta_entity_code:"MTF"}).includes(I.IDENTITY_DQ.META_CONFLICT)));
t("duplicate product_record_id is flagged, not merged",()=>{
  const db={CASHLOAN:[{data:{no_cus:"C1",nm_cus:"a"},meta:{recordId:"R1"}},{data:{no_cus:"C1",nm_cus:"a"},meta:{recordId:"R1"}}]};
  const b=I.buildProductIdentityBridge(db,ctxWith([mk()]));
  assert.equal(b.rows.filter(r=>r.dq_codes.includes(I.IDENTITY_DQ.DUPLICATE_RECORD_ID)).length,1);
});
t("aggregation: duplicated contribution is rejected; unresolved amount is kept visible, never dropped",()=>{
  const b=I.buildProductIdentityBridge({CASHLOAN:[{data:{no_cus:"C1"},meta:{recordId:"A"}},{data:{no_cus:"UNMAPPED"},meta:{recordId:"B",mlkCif:"UNMAPPED"}}]},ctxWith([mk()]));
  const agg=I.aggregateByIdentity(b.rows,[{product_record_id:"A",metric:"m",amount:100},{product_record_id:"A",metric:"m",amount:100},{product_record_id:"B",metric:"m",amount:40}]);
  assert.equal(agg.duplicateContributions.length,1);assert.equal(agg.consolidated,140);assert.equal(agg.unresolved.amount,40);
  assert.equal(agg.entity.BMRI,100);assert.ok(agg.reconciles);
});

// ---- CCL identity ----
const cpKeys=new Set(M.CCL.map(x=>String(x.key)));const cclCtx={counterpartyKeys:cpKeys,entityMaster:ctx.entityMaster,cclEntityScope:E2E_CCL_ENTITY_SCOPE};
t("every CCL-enriched product record resolves Counterparty → Entity → Direct/Indirect or explicit DQ",()=>{
  let n=0;
  for(const [pid,rows] of Object.entries(P))rows.forEach((rec,i)=>{
    if(!rec.meta?.cclCounterpartyId)return;n++;
    const r=I.resolveCclIdentity(pid,rec,i,cclCtx);
    assert.ok(r.mapping_status==="MAPPED"||r.dq_codes.length>0);
    assert.equal(r.mapping_status,"MAPPED","CCL identity not resolved for "+r.product_record_id+" → "+r.dq_codes.join(","));
  });
  assert.ok(n>0);
});
t("CCL: INDIRECT on an entity without indirect scope → ID_CCL_SCOPE_INVALID",()=>{
  const rec={data:{},meta:{recordId:"Z",cclCounterpartyId:[...cpKeys][0],reportingEntity:"BMRI",cclLimitType:"INDIRECT"}};
  assert.ok(I.resolveCclIdentity("CREDIT LINE",rec,0,cclCtx).dq_codes.includes(I.IDENTITY_DQ.CCL_SCOPE_INVALID));
});
t("CCL: unknown counterparty / missing counterparty are explicit DQ",()=>{
  const base={data:{},meta:{recordId:"Z",reportingEntity:"BMRI",cclLimitType:"DIRECT"}};
  assert.ok(I.resolveCclIdentity("CREDIT LINE",{...base,meta:{...base.meta,cclCounterpartyId:"NOPE"}},0,cclCtx).dq_codes.includes(I.IDENTITY_DQ.COUNTERPARTY_NOT_IN_MASTER));
  assert.ok(I.resolveCclIdentity("CREDIT LINE",base,0,cclCtx).dq_codes.includes(I.IDENTITY_DQ.COUNTERPARTY_MISSING));
});

const fail=results.filter(r=>r[0]==="FAIL");
results.forEach(([s,n])=>console.log(s+" · "+n));
console.log("\nIdentity bridge: rows="+bridge.summary.total+" mapped="+bridge.summary.mapped+" dq="+bridge.summary.dq+" "+JSON.stringify(bridge.summary.byCode));
if(fail.length){console.error("\nIDENTITY AUDIT FAIL ("+fail.length+")");process.exit(1);}
console.log("\nIDENTITY AUDIT PASS ("+results.length+" checks)");
