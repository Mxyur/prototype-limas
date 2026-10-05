// LIMAS Phase 1–5 Governance Audit
// Pure validation helpers. Business calculations remain owned by main.jsx;
// this module evaluates completeness, lineage and no-silent-drop contracts.

const positive=v=>Number.isFinite(Number(v))&&Number(v)>0;
const blank=v=>v===null||v===undefined||String(v).trim()==="";

export const LIMAS_PHASES=[
  {phase:1,key:"MASTER_LIMIT",title:"Master Limit Governance"},
  {phase:2,key:"PRODUCT_UNIVERSE",title:"Product Universe & Product Database"},
  {phase:3,key:"INTEGRATION_MAPPING",title:"Integration & Business Mapping"},
  {phase:4,key:"CANONICAL_MONITORING",title:"Canonical Read Model & Monitoring"},
  {phase:5,key:"REPORTING",title:"Reporting & End-to-End Lineage"}
];

export function auditMasterLimitGovernance({
  masters={},
  masterIssues=[],
  entityMaster=[],
  cclLimitScope=[],
  lpgScopes=[],
  homeCountryCode="ID"
}={}){
  const issues=[...(masterIssues||[])];
  const add=(issue)=>issues.push({phase:1,layer:"Master Limit",...issue});

  const countryRows=masters.Country||[];
  countryRows.forEach(row=>{
    const key=String(row?.key||"").trim().toUpperCase();
    if(key===String(homeCountryCode||"ID").trim().toUpperCase()){
      add({type:"HOME_COUNTRY_IN_MONITORING_MASTER",domain:"Country",key:row.key,detail:"Home country must not be a monitored Country master object."});
    }
  });

  const lpgRows=masters.LPG||[];
  const requiredScopes=["Bankwide",...(lpgScopes||[])];
  lpgRows.forEach(row=>{
    const limits=row?.limits||{};
    requiredScopes.filter(Boolean).forEach(scope=>{
      if(!Object.prototype.hasOwnProperty.call(limits,scope))
        add({type:"LPG_SCOPE_DEFINITION_MISSING",domain:"LPG",key:row.key,detail:"LPG master is missing configured scope field: "+scope});
    });
  });

  const entityCodes=new Set((entityMaster||[]).map(x=>String(x?.entityCode||"").toUpperCase()).filter(Boolean));
  (cclLimitScope||[]).forEach(x=>{
    const entity=String(x?.entityCode||"").toUpperCase();
    if(entity&&!entityCodes.has(entity))
      add({type:"CCL_ENTITY_REFERENCE_INVALID",domain:"CCL",key:x?.counterpartyId||"—",detail:"CCL entity allocation references an entity absent from Entity Master: "+entity});
  });

  const blockingTypes=new Set([
    "DUPLICATE_KEY","CAPACITY_SPLIT_MISMATCH","ALLOCATION_OVER_CAPACITY",
    "PRODUCT_SPLIT_MISMATCH","MLK_MASTER_LIMIT_MISSING","INVALID_ENTITY_SCOPE",
    "CCL_COMMERCIAL_SPLIT_MISMATCH","CCL_TREASURY_SPLIT_MISMATCH","CCL_FACILITY_TOTAL_MISMATCH",
    "CCL_ENTITY_ALLOCATION_MISMATCH","CCL_ENTITY_REFERENCE_INVALID","CCL_LIMIT_TYPE_INVALID",
    "CIL_EIL_MISMATCH","CIT_FORMULA_MISMATCH","LPG_SCOPE_MISMATCH"
  ]);
  return {issues,blockingIssues:issues.filter(x=>blockingTypes.has(x.type)),status:issues.length?"Data Issue":"Normal"};
}

export function auditBusinessEnrichmentCoverage({
  productDatabase={},
  integrationMappings={},
  countryMonitoringEligible=()=>true,
  integrationDomainAllowed=()=>true,
  lpgClassifier=()=>({}),
  explicitCclSource=()=>false
}={}){
  const issues=[];
  const add=(x)=>issues.push({phase:3,layer:"Integration / Mapping",status:"Data Issue",...x});

  const mappings=Object.values(integrationMappings||{}).flat().filter(Boolean);
  const mappingByRecord=(productId,recordId,domain)=>mappings.filter(x=>
    String(x.productId||productId)===String(productId)&&
    String(x.recordId||"")===String(recordId)&&
    String(x.limitType||"")===String(domain)
  );

  Object.entries(productDatabase||{}).forEach(([productId,rows])=>{
    (rows||[]).forEach(row=>{
      const d=row?.data||{},meta=row?.meta||{},recordId=row?.recordId;
      if((productId==="CASHLOAN"||productId==="NON CASH LOAN"||productId==="BONDS"||productId==="NOSTRO")&&integrationDomainAllowed(row,"Country")){
        const countryField=productId==="CASHLOAN"?"code":productId==="NON CASH LOAN"?"Country Code":productId==="BONDS"?"Issuer Country":"Bank Country";
        const country=String(d[countryField]??"").trim().toUpperCase();
        const exposure=productId==="CASHLOAN"?Number(d.total_bade||0):
          productId==="NON CASH LOAN"?Number(d.EQVIDR||0)/1000000:
          productId==="BONDS"?Number(d["Amount Eq. IDR Juta"]||0):
          Number(d.Balance||0);
        if(country&&countryMonitoringEligible(country)&&positive(exposure)){
          const mapped=mappingByRecord(productId,recordId,"Country");
          const mapping=mapped[0];
          const isCcl=explicitCclSource(row);
          if(!isCcl&&(!mapping||blank(mapping.bookingOfficeType)||mapping.bookingOfficeType==="Needs Mapping")){
            add({issueType:"BOOKING_OFFICE_ENRICHMENT_MISSING",productId,recordId,limitType:"Country",key:country,detail:"Positive Country exposure lacks canonical Booking Office Type enrichment."});
          }
        }
      }

      const cclUpstreamRelevant=Boolean(meta.cclCounterpartyId)&&(["CASHLOAN","NON CASH LOAN"].includes(productId));
      const cclDirectRelevant=Boolean(meta.cclLimitType)&&productId==="CREDIT LINE";
      if(cclUpstreamRelevant){
        if(blank(meta.cclCounterpartyId))
          add({issueType:"CCL_COUNTERPARTY_ID_MISSING",productId,recordId,limitType:"CCL_UPSTREAM",key:"—",detail:"CCL upstream source row requires stable cclCounterpartyId enrichment."});
        if(blank(meta.creditLineLimitType))
          add({issueType:"CCL_UPSTREAM_LIMIT_TYPE_MISSING",productId,recordId,limitType:"CCL_UPSTREAM",key:meta.cclCounterpartyId||"—",detail:"CCL upstream Cash/NCL row requires DIRECT/INDIRECT creditLineLimitType enrichment; cclLimitType belongs only to the canonical Credit Line CCL mapping."});
        if(blank(meta.reportingEntity))
          add({issueType:"REPORTING_ENTITY_MISSING",productId,recordId,limitType:"CCL_UPSTREAM",key:meta.cclCounterpartyId||"—",detail:"CCL upstream reporting requires explicit reportingEntity enrichment."});
      }
      if(cclDirectRelevant){
        if(blank(meta.cclCounterpartyId))
          add({issueType:"CCL_COUNTERPARTY_ID_MISSING",productId,recordId,limitType:"CCL",key:"—",detail:"CCL Credit Line row requires stable cclCounterpartyId enrichment."});
        if(blank(meta.cclLimitType))
          add({issueType:"CCL_LIMIT_TYPE_MISSING",productId,recordId,limitType:"CCL",key:meta.cclCounterpartyId||"—",detail:"CCL Credit Line row requires DIRECT/INDIRECT cclLimitType enrichment."});
        if(blank(meta.reportingEntity))
          add({issueType:"REPORTING_ENTITY_MISSING",productId,recordId,limitType:"CCL",key:meta.cclCounterpartyId||"—",detail:"CCL consolidated reporting requires explicit reportingEntity enrichment."});
      }

      const mlkRelevant=
        (productId==="CASHLOAN"&&String(recordId||"").startsWith("CL-MLK-"))||
        (productId==="NON CASH LOAN"&&String(recordId||"").startsWith("NCL-MLK-"))||
        (productId==="CREDIT LINE"&&(String(recordId||"").startsWith("TL-MLK-")||String(d["Swift Code"]||"").toUpperCase().startsWith("TL-")));
      if(mlkRelevant&&blank(meta.reportingEntity))
        add({issueType:"REPORTING_ENTITY_MISSING",productId,recordId,limitType:"MLK",key:d.no_cus||d.CUSTID||String(d["Swift Code"]||"").replace(/^TL-/i,"")||"—",detail:"MLK source row must carry explicit reportingEntity; do not silently default to BMRI."});

      const lpg=lpgClassifier(row);
      if(lpg?.classified&&["CASHLOAN","NON CASH LOAN"].includes(productId)&&positive(
        productId==="CASHLOAN"?Number(d.total_bade||0):Number(d.EQVIDR||0)/1000000
      )){
        const rowsLpg=mappingByRecord(productId,recordId,"LPG");
        const mapping=rowsLpg[0];
        const e=mapping?.businessEnrichment||{};
        if(blank(e.masterIndustryCode)||blank(e.segmentCode)||blank(e.regionCode)){
          add({issueType:"LPG_BUSINESS_ENRICHMENT_MISSING",productId,recordId,limitType:"LPG",key:(lpg.sector||"—")+"|"+(lpg.segment||"—"),detail:"LPG positive exposure requires Sector/Segment/Region to resolve to canonical master codes."});
        }
      }
    });
  });

  // Every positive mapping must point to a concrete target master and carry source lineage metadata.
  mappings.forEach(m=>{
    if(positive(m.normalizedAmount??m.amount)&&blank(m.sourceField)){
      add({issueType:"MAPPING_SOURCE_FIELD_MISSING",productId:m.productId,recordId:m.recordId,limitType:m.limitType,key:m.key,detail:"Positive integration mapping is missing source field lineage."});
    }
    if(positive(m.normalizedAmount??m.amount)&&m.masterMatch===false){
      add({issueType:"MAPPING_MASTER_MATCH_MISSING",productId:m.productId,recordId:m.recordId,limitType:m.limitType,key:m.key,detail:"Positive integration mapping is not matched to a target master."});
    }
  });

  return {issues,status:issues.length?"Data Issue":"Normal"};
}

export function auditCanonicalReadModel({
  mappings=[],
  readModelRows=[],
  expectedExposureByMaster={},
  reportRowsByDomain={}
}={}){
  const issues=[];
  const add=(x)=>issues.push({phase:4,layer:"Canonical Read Model",status:"Data Issue",...x});

  const positiveMappings=(mappings||[]).filter(m=>positive(m?.normalizedAmount??m?.amount));
  positiveMappings.forEach(m=>{
    const matching=(readModelRows||[]).filter(r=>
      String(r?.domain||"")===String(m?.limitType||"")&&
      String(r?.recordId||"")===String(m?.recordId||"")&&
      String(r?.masterKey||"")===String(m?.key||"")
    );
    if(!matching.length){
      add({issueType:"MAPPING_NOT_REPRESENTED_IN_READ_MODEL",productId:m.productId,recordId:m.recordId,limitType:m.limitType,key:m.key,detail:"Positive source-to-master mapping has no canonical read-model row; exposure would silently disappear."});
    }
  });

  (readModelRows||[]).forEach(r=>{
    if(r?.product==="—")return;
    if(blank(r.sourceField))
      add({issueType:"READ_MODEL_SOURCE_FIELD_MISSING",domain:r.domain,recordId:r.recordId,key:r.masterKey,detail:"Canonical read-model row has no source field lineage."});
    if(r.mappingStatus==="Master Not Found")
      add({issueType:"READ_MODEL_MASTER_NOT_FOUND",domain:r.domain,recordId:r.recordId,key:r.masterKey,detail:"Canonical read-model row references a non-existent master."});
    if(positive(r.normalizedExposure)&&r.mappingStatus!=="Mapped"&&r.mappingStatus!=="Needs Booking Mapping")
      add({issueType:"READ_MODEL_UNMAPPED_POSITIVE_EXPOSURE",domain:r.domain,recordId:r.recordId,key:r.masterKey,detail:"Positive canonical exposure is not in a valid mapping state."});
  });

  Object.entries(expectedExposureByMaster||{}).forEach(([composite,expected])=>{
    const [domain,key]=composite.split("::");
    const actual=(readModelRows||[])
      .filter(r=>String(r.domain)===domain&&String(r.masterKey)===key)
      .reduce((s,r)=>s+(Number(r.normalizedExposure)||0),0);
    const delta=Number(actual)-Number(expected);
    if(Math.abs(delta)>0.01)
      add({issueType:"READ_MODEL_EXPOSURE_RECONCILIATION",domain,key,detail:"Canonical read-model exposure does not reconcile to expected normalized master contribution.",actual,expected,diff:delta});
  });

  ["Country","CCL","MLK","CIL","LPG"].forEach(domain=>{
    const masters=(expectedExposureByMaster?Object.keys(expectedExposureByMaster).filter(k=>k.startsWith(domain+"::")).length:0);
    const reportRows=Array.isArray(reportRowsByDomain?.[domain])?reportRowsByDomain[domain]:[];
    if(reportRows.length&&masters&&reportRows.some(r=>r==null))
      add({issueType:"REPORT_READ_MODEL_NULL_ROW",domain,detail:"Report result contains an invalid null row."});
  });

  return {issues,status:issues.length?"Data Issue":"Normal"};
}

export function auditReportRuntime({
  reportConfig={},
  reportRowsByType={},
  auditFieldTraceability=()=>[],
  auditFieldSummary=()=>({totalFields:0,traceable:0,missingContract:0,runtimeMissing:0,ready:false})
}={}){
  const rows=auditFieldTraceability(reportConfig,reportRowsByType);
  const summary=auditFieldSummary(rows);
  const issues=[];
  if(summary.missingContract)issues.push({phase:5,layer:"Reporting",type:"MISSING_REPORT_TRACEABILITY_CONTRACT",detail:summary.missingContract+" report field(s) have no traceability contract."});
  if(summary.runtimeMissing)issues.push({phase:5,layer:"Reporting",type:"RUNTIME_REPORT_FIELD_MISSING",detail:summary.runtimeMissing+" report field(s) are declared in the config but absent from generated runtime rows."});
  const reportFieldGaps=rows.filter(x=>x.status!=="TRACEABLE");
  return {rows,summary,issues,status:issues.length?"Data Issue":"Normal",reportFieldGaps};
}
