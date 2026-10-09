export const LIMIT_SETUP_DOMAINS=["Country","CCL","MLK","CIL","LPG"];
export const LIMIT_SETUP_LIFECYCLE=["DRAFT","REVIEW","APPROVED","EFFECTIVE","EXPIRED","SUPERSEDED"];

const s=v=>String(v??"").trim();
const upper=v=>s(v).toUpperCase();
const n=v=>Number(v);
const finite=v=>Number.isFinite(n(v));

export const LIMIT_SETUP_DEFINITIONS={
  Country:{
    keyLabel:"Country Code",
    keyFields:["countryCode","bookingScope"],
    fields:["countryCode","bookingScope","capacityLimit","threshold","effectiveDate","expiryDate","status","version","sourceReference","approval"],
    inputFields:["countryCode","bookingScope","capacityLimit","threshold","effectiveDate","expiryDate","sourceReference","approval"],
    labels:{countryCode:"Country Code",bookingScope:"Scope / Booking",capacityLimit:"Approved Country Limit",threshold:"Threshold",effectiveDate:"Effective Date",expiryDate:"Expiry Date",sourceReference:"Source / Reference",approval:"Approval"}
  },
  CCL:{
    keyLabel:"Counterparty + Entity + Direct/Indirect",
    keyFields:["counterpartyId","entityCode","limitType"],
    fields:["counterpartyId","counterpartyName","entityCode","limitType","inhouse","capacity","ccl","bankLoanLimit","commercialLineLimit","treasuryLineLimit","contractual","threshold","effectiveDate","expiryDate","status","version","sourceReference","approval"],
    inputFields:["counterpartyId","counterpartyName","entityCode","limitType","inhouse","ccl","threshold","effectiveDate","expiryDate","sourceReference","approval"],
    derivedFields:["capacity","contractual"],
    referenceFields:["bankLoanLimit","commercialLineLimit","treasuryLineLimit"],
    labels:{counterpartyId:"Counterparty ID",counterpartyName:"Counterparty",entityCode:"Entity",limitType:"Scope",inhouse:"Inhouse Limit",capacity:"Capacity (Reference)",ccl:"CCL Limit",bankLoanLimit:"Bank Loan Limit",commercialLineLimit:"Commercial Line Limit",treasuryLineLimit:"Treasury Line Limit",contractual:"Contractual (Σ Product Limits)",threshold:"Threshold",effectiveDate:"Effective Date",expiryDate:"Expiry Date",sourceReference:"Source / Reference",approval:"Approval"}
  },
  MLK:{
    keyLabel:"CIF + Entity + Group",
    keyFields:["cif","entityCode","groupId"],
    fields:["cif","debtorName","entityCode","entityType","groupId","groupName","limitType","masterLimitSetting","clLimit","nclLimit","treasuryLine","threshold","effectiveDate","expiryDate","status","version","sourceReference","approval"],
    inputFields:["cif","debtorName","entityCode","entityType","groupId","groupName","limitType","masterLimitSetting","clLimit","nclLimit","treasuryLine","threshold","effectiveDate","expiryDate","sourceReference","approval"],
    labels:{cif:"CIF / Debtor Key",debtorName:"Debtor",entityCode:"Entity",entityType:"Entity Type",groupId:"Group ID",groupName:"Group Usaha",limitType:"Limit Type",masterLimitSetting:"Approved Master Limit",clLimit:"CL Limit",nclLimit:"NCL Limit",treasuryLine:"Treasury Line",threshold:"Threshold",effectiveDate:"Effective Date",expiryDate:"Expiry Date",sourceReference:"Source / Reference",approval:"Approval"}
  },
  CIL:{
    keyLabel:"Insurance Company + Entity",
    keyFields:["insurer","entityCode"],
    fields:["insurer","insuranceCompanyName","entityCode","ic","multiplier","eil","ciltotal","threshold","effectiveDate","expiryDate","status","version","sourceReference","approval"],
    inputFields:["insurer","insuranceCompanyName","entityCode","ic","multiplier","eil","threshold","effectiveDate","expiryDate","sourceReference","approval"],
    labels:{insurer:"Insurance Company ID",insuranceCompanyName:"Insurance Company",entityCode:"Entity",ic:"Insurance Capacity (IC)",multiplier:"Multiplier",eil:"EIL",ciltotal:"CIL (Derived)",threshold:"Threshold",effectiveDate:"Effective Date",expiryDate:"Expiry Date",sourceReference:"Source / Reference",approval:"Approval"}
  },
  LPG:{
    keyLabel:"Sector + Grouping + Region + Segment + IC Segwil + Scope",
    keyFields:["sectorCode","groupingCode","regionCode","segmentCode","icWilayahSegmenCode","scope"],
    fields:["sectorCode","sectorName","groupingCode","groupingName","regionCode","regionName","segmentCode","segmentName","icNasionalCode","icWilayahSegmenCode","segwilKey","scope","approvedLimit","threshold","effectiveDate","expiryDate","status","version","sourceReference","approval"],
    inputFields:["sectorCode","sectorName","groupingCode","groupingName","regionCode","regionName","segmentCode","segmentName","icNasionalCode","icWilayahSegmenCode","segwilKey","scope","approvedLimit","threshold","effectiveDate","expiryDate","sourceReference","approval"],
    labels:{sectorCode:"Industry / Sector Code",sectorName:"Industry / Sector",groupingCode:"Grouping Code",groupingName:"Grouping",regionCode:"Region Code",regionName:"Region",segmentCode:"Segment Code",segmentName:"Segment",icNasionalCode:"IC Nasional",icWilayahSegmenCode:"IC Wilayah Segmen",segwilKey:"Segwil Key",scope:"Scope",approvedLimit:"Approved LPG Limit",threshold:"Threshold",effectiveDate:"Effective Date",expiryDate:"Expiry Date",sourceReference:"Source / Reference",approval:"Approval"}
  }
};

export const LIMIT_SETUP_SHARED_FIELDS=["status","version","sourceReference","approval"];
export const LIMIT_SETUP_FIELDS=["businessKey","scope","limitValue","effectiveDate","expiryDate","threshold","status","version","sourceReference","approval"];

export function makeBusinessKey(domain,row={}){
  if(domain==="Country") return [row.countryCode,row.bookingScope].map(upper).join("|");
  if(domain==="CCL") return [row.counterpartyId,row.entityCode,row.limitType].map(upper).join("|");
  if(domain==="MLK") return [row.cif,row.entityCode,row.groupId].map(upper).join("|");
  if(domain==="CIL") return [row.insurer,row.entityCode].map(upper).join("|");
  if(domain==="LPG") return [row.sectorCode||row.sectorName,row.groupingCode||row.groupingName,row.regionCode,row.segmentCode,row.icWilayahSegmenCode,row.scope].map(upper).join("|");
  return upper(row.businessKey);
}

export function normalizeLimitSetup(domain,row={}){
  if(!LIMIT_SETUP_DOMAINS.includes(domain)) throw new Error(`Unknown limit domain: ${domain}`);
  const definition=LIMIT_SETUP_DEFINITIONS[domain];
  const out={...row,domain};
  out.businessKey=s(row.businessKey)||makeBusinessKey(domain,row);
  out.scope=s(row.scope);
  out.limitValue=finite(row.limitValue)?n(row.limitValue):finite(row.approvedLimit)?n(row.approvedLimit):finite(row.masterLimitSetting)?n(row.masterLimitSetting):finite(row.ciltotal)?n(row.ciltotal):0;
  out.approvedLimit=finite(row.approvedLimit)?n(row.approvedLimit):out.limitValue;
  out.effectiveDate=s(row.effectiveDate);
  out.expiryDate=s(row.expiryDate);
  out.threshold=finite(row.threshold)?n(row.threshold):.8;
  out.status=s(row.status)||"DRAFT";
  out.version=finite(row.version)?n(row.version):1;
  out.sourceReference=s(row.sourceReference);
  out.approval=s(row.approval);
  out.operation=upper(row.operation)||"CREATE";
  if(domain==="CCL"){
    out.bankLoanLimit=finite(row.bankLoanLimit)?n(row.bankLoanLimit):finite(row.bankLoan)?n(row.bankLoan):0;
    out.commercialLineLimit=finite(row.commercialLineLimit)?n(row.commercialLineLimit):finite(row.commercialLine)?n(row.commercialLine):0;
    out.treasuryLineLimit=finite(row.treasuryLineLimit)?n(row.treasuryLineLimit):finite(row.treasuryLine)?n(row.treasuryLine):0;
    out.contractual=out.bankLoanLimit+out.commercialLineLimit+out.treasuryLineLimit;
    out.capacity=finite(row.capacity)?n(row.capacity):0;
  }
  out.domainFields=definition.fields.reduce((acc,key)=>{acc[key]=row[key]??out[key]??"";return acc;},{});
  return out;
}

function sameKey(a,b){return upper(a)===upper(b);}
function validateCommon(r,i,errors){
  if(!r.businessKey) errors.push({row:i+1,code:"BUSINESS_KEY_MISSING",message:"Business key is required"});
  if(!r.scope) errors.push({row:i+1,code:"SCOPE_MISSING",message:"Scope is required"});
  if(!r.effectiveDate) errors.push({row:i+1,code:"EFFECTIVE_DATE_MISSING",message:"Effective date is required"});
  if(r.expiryDate && r.effectiveDate && r.expiryDate<r.effectiveDate) errors.push({row:i+1,code:"DATE_ORDER_INVALID",message:"Expiry date cannot precede effective date"});
  if(r.limitValue<0) errors.push({row:i+1,code:"LIMIT_NEGATIVE",message:"Limit cannot be negative"});
  if(r.threshold<0 || r.threshold>1) errors.push({row:i+1,code:"THRESHOLD_INVALID",message:"Threshold must be between 0 and 1"});
  if(!["CREATE","UPDATE"].includes(r.operation)) errors.push({row:i+1,code:"OPERATION_INVALID",message:"Operation must be CREATE or UPDATE"});
}

export function validateLimitSetupRows(domain,rows=[],existingRows=[]){
  const errors=[],normalized=[],seen=new Set();
  if(!LIMIT_SETUP_DOMAINS.includes(domain)) return {valid:false,errors:[{code:"DOMAIN_UNKNOWN",message:`Unknown domain ${domain}`}],rows:[]};
  rows.forEach((raw,i)=>{
    const r=normalizeLimitSetup(domain,raw); normalized.push(r); validateCommon(r,i,errors);
    const key=upper(r.businessKey);
    if(seen.has(key)) errors.push({row:i+1,code:"DUPLICATE_IN_UPLOAD",message:`Duplicate business key: ${key}`});
    seen.add(key);
    const existing=existingRows.find(x=>sameKey(normalizeLimitSetup(domain,x).businessKey,key));
    if(existing && r.operation!=="UPDATE") errors.push({row:i+1,code:"DUPLICATE_EXISTING",message:`Business key already exists: ${key}. Use UPDATE for maintenance.`});
    if(r.operation==="UPDATE" && !existing) errors.push({row:i+1,code:"UPDATE_TARGET_MISSING",message:`No existing record for UPDATE key: ${key}`});
    if(domain==="Country"){
      if(s(r.countryCode) && !/^[A-Z]{2}$/.test(upper(r.countryCode))) errors.push({row:i+1,code:"COUNTRY_CODE_INVALID",message:"Country Code must be ISO-2"});
    }
    if(domain==="CCL"){
      if(!["DIRECT","INDIRECT"].includes(upper(r.limitType))) errors.push({row:i+1,code:"CCL_SCOPE_INVALID",message:"CCL scope must be DIRECT or INDIRECT"});
      if(!s(r.counterpartyId)) errors.push({row:i+1,code:"CCL_COUNTERPARTY_MISSING",message:"Counterparty is required"});
      if(!s(r.entityCode)) errors.push({row:i+1,code:"CCL_ENTITY_MISSING",message:"Entity is required"});
      if(!finite(r.inhouse)) errors.push({row:i+1,code:"CCL_INHOUSE_INVALID",message:"Inhouse Limit must be numeric"});
      if(!finite(r.ccl)) errors.push({row:i+1,code:"CCL_CCL_INVALID",message:"CCL Limit must be numeric"});
      const derivedContractual=(Number(r.bankLoanLimit)||0)+(Number(r.commercialLineLimit)||0)+(Number(r.treasuryLineLimit)||0);
      if(Math.abs(derivedContractual-(Number(r.contractual)||0))>0.000001) errors.push({row:i+1,code:"CCL_CONTRACTUAL_RECONCILIATION",message:"Contractual must reconcile with Bank Loan + Commercial Line + Treasury Line"});
    }
    if(domain==="MLK"){
      if(!s(r.cif)) errors.push({row:i+1,code:"MLK_CIF_MISSING",message:"CIF / Debtor key is required"});
      if(!s(r.entityCode)) errors.push({row:i+1,code:"MLK_ENTITY_MISSING",message:"Entity is required"});
      if(!s(r.groupId)) errors.push({row:i+1,code:"MLK_GROUP_MISSING",message:"Group Usaha is required"});
      const parts=[r.clLimit,r.nclLimit,r.treasuryLine].filter(v=>s(v)!=="");
      if(parts.length===3 && r.masterLimitSetting!==undefined && r.masterLimitSetting!=="" ){
        const total=Number(r.clLimit)+Number(r.nclLimit)+Number(r.treasuryLine);
        if(Math.abs(total-Number(r.masterLimitSetting))>0.000001) errors.push({row:i+1,code:"MLK_LIMIT_RECONCILIATION",message:"CL + NCL + Treasury Line must reconcile with Approved Master Limit"});
      }
    }
    if(domain==="CIL"){
      if(!s(r.insurer)) errors.push({row:i+1,code:"CIL_INSURER_MISSING",message:"Insurance Company is required"});
      if(!s(r.entityCode)) errors.push({row:i+1,code:"CIL_ENTITY_MISSING",message:"Entity is required"});
      if(r.multiplier!==undefined&&r.multiplier!==""&&!finite(r.multiplier)) errors.push({row:i+1,code:"CIL_MULTIPLIER_INVALID",message:"Multiplier must be numeric"});
    }
    if(domain==="LPG"){
      const required=["sectorCode","groupingCode","regionCode","segmentCode","icWilayahSegmenCode","scope"];
      required.forEach(f=>{if(!s(r[f])) errors.push({row:i+1,code:`LPG_${f.toUpperCase()}_MISSING`,message:`${definitionLabel(domain,f)} is required`});});
      if(!s(r.segwilKey) && s(r.sectorCode)&&s(r.regionCode)&&s(r.segmentCode)) errors.push({row:i+1,code:"LPG_SEGWIL_KEY_MISSING",message:"Segwil Key is required and must represent Sector × Region × Segment"});
      const ic=upper(r.icNasionalCode||"");
      const industry=upper(r.groupingName||r.sectorName||"");
      if(ic && !["MENARIK","NETRAL","SELEKTIF","WASPADA"].includes(ic)) errors.push({row:i+1,code:"LPG_IC_INVALID",message:"IC Nasional must be MENARIK, NETRAL, SELEKTIF, or WASPADA"});
      if(ic==="WASPADA" && !industry.includes("PLASTIK")) errors.push({row:i+1,code:"LPG_WASPADA_NON_PLASTIK",message:"WASPADA is only valid for PLASTIK"});
      if(!["BANKWIDE","KP + OVS",...Array.from({length:12},(_,j)=>`REGION ${["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"][j]}`)].map(upper).includes(upper(r.scope))) errors.push({row:i+1,code:"LPG_SCOPE_INVALID",message:"LPG scope must be Bankwide, Region I–XII, or KP + OVS"});
    }
  });
  return {valid:errors.length===0,errors,rows:normalized};
}
function definitionLabel(domain,field){return LIMIT_SETUP_DEFINITIONS[domain]?.labels?.[field]||field;}

export function nextLimitSetupVersion(existingRows=[],businessKey){
  return Math.max(0,...existingRows.filter(x=>sameKey(normalizeLimitSetup(x.domain||"Country",x).businessKey,businessKey)).map(x=>Number(x.version)||0))+1;
}

export function transitionLimitSetup(status,next){
  const allowed={DRAFT:"REVIEW",REVIEW:"APPROVED",APPROVED:"EFFECTIVE",EFFECTIVE:"EXPIRED"};
  return allowed[status]===next;
}

function countrySeed(d){
  return (d.Country||[]).map(x=>normalizeLimitSetup("Country",{domain:"Country",countryCode:x.key,bookingScope:`FOREIGN:${x.key}`,scope:`FOREIGN:${x.key}`,capacityLimit:Number(x.capacityLimit)||0,limitValue:Number(x.capacityLimit)||0,effectiveDate:"2026-09-30",expiryDate:"",threshold:.8,status:"EFFECTIVE",version:1,sourceReference:`Country Master:${x.key}`,approval:"SOURCE_APPROVED",operation:"CREATE"}));
}
function cclSeed(d,scope){
  return (d.CCL||[]).flatMap(x=>(scope||[]).filter(y=>String(y.counterpartyId)===String(x.key)).map(y=>normalizeLimitSetup("CCL",{counterpartyId:y.counterpartyId,counterpartyName:x.name,entityCode:y.entityCode,limitType:y.limitType,inhouse:x.inhouse,capacity:y.capacity??x.capacity,ccl:y.ccl,bankLoanLimit:y.bankLoan,commercialLineLimit:y.commercialLine,treasuryLineLimit:y.treasuryLine,contractual:(Number(y.bankLoan)||0)+(Number(y.commercialLine)||0)+(Number(y.treasuryLine)||0),limitValue:y.ccl,scope:`${y.entityCode}:${y.limitType}`,effectiveDate:"2026-09-30",expiryDate:"",threshold:.8,status:"EFFECTIVE",version:1,sourceReference:`CCL Scope:${y.counterpartyId}`,approval:"SOURCE_APPROVED",operation:"CREATE"})));
}
function mlkSeed(d){
  return (d.MLK||[]).map(x=>normalizeLimitSetup("MLK",{cif:x.key,debtorName:x.name,entityCode:x.entity,entityType:x.entityType||"ENTITY",groupId:x.group,groupName:x.groupUsahaHolding||x.group,limitType:"MASTER_LIMIT",masterLimitSetting:Number(x.masterLimitSetting??x.masterLimit??0),clLimit:Number(x.clLimit??0),nclLimit:Number(x.nclLimit??0),treasuryLine:Number(x.treasuryLine??0),limitValue:Number(x.masterLimitSetting??x.masterLimit??0),scope:`${x.entity}|${x.group}`,effectiveDate:"2026-09-30",expiryDate:"",threshold:.8,status:"EFFECTIVE",version:1,sourceReference:`MLK Master:${x.key}`,approval:"SOURCE_APPROVED",operation:"CREATE"}));
}
function cilSeed(d){
  return (d.CIL||[]).flatMap(x=>Object.entries(x.eils||{}).map(([entity,value])=>normalizeLimitSetup("CIL",{insurer:x.key,insuranceCompanyName:x.name,entityCode:entity,ic:x.ic,multiplier:x.multiplier,eil:Number(value)||0,ciltotal:Number(x.cil)||0,limitValue:Number(value)||0,scope:entity,effectiveDate:"2026-09-30",expiryDate:"",threshold:.8,status:"EFFECTIVE",version:1,sourceReference:`CIL EIL:${x.key||x.name}`,approval:"SOURCE_APPROVED",operation:"CREATE"})));
}
function lpgSeed(d,refs={}){
  const industries=refs.lpgIndustryMaster||[]; const regions=refs.lpgRegionMaster||[]; const segments=refs.lpgSegmentMaster||[]; const segwil=refs.lpgSegwil||[];
  const sectorByName=new Map(industries.map(x=>[upper(x.groupingName===x.industryName?x.industryName:x.industryName),x]));
  const regionByLegacy=new Map(regions.map(x=>[upper(x.legacyScope),x]));
  const segmentByName=new Map(segments.flatMap(x=>[x.segmentName,...(x.legacyValues||[])].map(v=>[upper(v),x])));
  const mapping=segwil;
  const icFromMapping=(sectorName,scope,segmentName)=>{
    const sector=industries.find(x=>upper(x.industryName)===upper(sectorName)||upper(x.groupingName)===upper(sectorName));
    const region=regionByLegacy.get(upper(scope)); const seg=segmentByName.get(upper(segmentName));
    const m=(mapping||[]).find(x=>upper(x.sectorCode)===upper(sector?.industryCode)&&upper(x.regionCode)===upper(region?.regionCode)&&upper(x.segmentCode)===upper(seg?.segmentCode));
    return {sector,region,seg,m};
  };
  return (d.LPG||[]).flatMap(x=>Object.entries(x.limits||{}).map(([scope,value])=>{
    const {sector,region,seg,m}=icFromMapping(x.sector,scope,x.segment);
    const grouping=sector?.groupingName||x.sector;
    const icNasional=m?.icNasionalCode||((upper(x.sector).includes("ENERGI")||upper(x.sector).includes("BATUBARA"))?"NETRAL":"");
    const icSegwil=m?.icWilayahSegmenCode||icNasional;
    const regionCode=region?.regionCode||((upper(scope)==="KP + OVS")?"HQ_OVS":(upper(scope)==="BANKWIDE"?"BANKWIDE":""));
    const segmentCode=seg?.segmentCode||"";
    const segwilKey=[sector?.industryCode||x.sector,regionCode,segmentCode].map(upper).join("|");
    return normalizeLimitSetup("LPG",{sectorCode:sector?.industryCode||x.sector,sectorName:sector?.industryName||x.sector,groupingCode:sector?.groupingCode||grouping,groupingName:grouping,regionCode,regionName:region?.regionName||scope,segmentCode,segmentName:seg?.segmentName||x.segment,icNasionalCode:icNasional,icWilayahSegmenCode:icSegwil,segwilKey,scope,approvedLimit:Number(value)||0,limitValue:Number(value)||0,effectiveDate:"2026-09-30",expiryDate:"",threshold:.8,status:"EFFECTIVE",version:1,sourceReference:`LPG:${x.key}`,approval:"SOURCE_APPROVED",operation:"CREATE"});
  }));
}

export function buildLimitSetupSeed(source={}){
  const d=source.limasDemoData||{};
  return {
    Country:countrySeed(d),
    CCL:cclSeed(d,source.E2E_CCL_LIMIT_SCOPE||source.cclLimitScope||[]),
    MLK:mlkSeed(d),
    CIL:cilSeed(d),
    LPG:lpgSeed(d,{lpgIndustryMaster:source.lpgIndustryMaster,lpgRegionMaster:source.lpgRegionMaster,lpgSegmentMaster:source.lpgSegmentMaster,lpgSegwil:source.lpgSegwil})
  };
}

export function limitSetupFieldMeta(domain){
  const def=LIMIT_SETUP_DEFINITIONS[domain];
  return def ? (def.inputFields||def.fields).map(field=>({field,label:def.labels[field]||field,required:domain==="LPG"?["sectorCode","groupingCode","regionCode","segmentCode","icWilayahSegmenCode","segwilKey","scope","approvedLimit","effectiveDate"].includes(field):def.keyFields.includes(field)||["effectiveDate"].includes(field)})) : [];
}
export function limitSetupDerivedFieldMeta(domain){
  const def=LIMIT_SETUP_DEFINITIONS[domain];
  return (def?.derivedFields||[]).map(field=>({field,label:def.labels[field]||field}));
}
export function limitSetupReferenceFieldMeta(domain){
  const def=LIMIT_SETUP_DEFINITIONS[domain];
  return (def?.referenceFields||[]).map(field=>({field,label:def.labels[field]||field}));
}
