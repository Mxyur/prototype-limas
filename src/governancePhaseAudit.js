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
  explicitCclSource=()=>false,
  mlkMasterRows=[]
}={}){
  const issues=[];
  const add=(x)=>issues.push({phase:3,layer:"Integration / Mapping",status:"Data Issue",...x});
  const mappings=Object.values(integrationMappings||{}).flat().filter(Boolean);
  const mappingByRecord=(productId,recordId,domain)=>mappings.filter(x=>
    String(x.productId||productId)===String(productId)&&
    String(x.recordId||"")===String(recordId)&&
    String(x.limitType||"")===String(domain)
  );
  const positiveSourceExposure=(productId,d,row,domain)=>{
    if(productId==="CASHLOAN")return Number(d.total_bade)||0;
    if(productId==="NON CASH LOAN")return domain==="LPG"
      ?(String(row?.sourceSystem||"").startsWith("DWH")&&String(d.CCY||"").toUpperCase()==="IDR"
        ?Number(d.BALANCE)||0
        :(Number(d.EQVIDR)||0)/1000000)
      :(Number(d.EQVIDR)||0)/1000000;
    if(productId==="CREDIT LINE")return Number(String(d["Credit Line Total Utilisasi"]??0).replace(/,/g,""))||0;
    if(productId==="BONDS")return Number(d["Amount Eq. IDR Juta"])||0;
    if(productId==="NOSTRO")return Number(d.Balance)||0;
    if(productId==="Nominal Pertanggungan")return Number(d["Nominal Pertanggungan 2025 (Rp Juta)"])||0;
    return 0;
  };

  Object.entries(productDatabase||{}).forEach(([productId,rows])=>{
    (rows||[]).forEach(row=>{
      const d=row?.data||{},meta=row?.meta||{},recordId=row?.recordId;

      // COUNTRY business enrichment: positive foreign exposure must resolve
      // to a booking-office classification unless the row is explicitly scoped away.
      if(["CASHLOAN","NON CASH LOAN","BONDS","NOSTRO"].includes(productId)&&integrationDomainAllowed(row,"Country")){
        const countryField=productId==="CASHLOAN"?"code":productId==="NON CASH LOAN"?"Country Code":productId==="BONDS"?"Issuer Country":"Bank Country";
        const country=String(d[countryField]??"").trim().toUpperCase();
        const exposure=positiveSourceExposure(productId,d,row,"Country");
        if(country&&countryMonitoringEligible(country)&&positive(exposure)){
          const mapped=mappingByRecord(productId,recordId,"Country")[0];
          const isCcl=explicitCclSource(row);
          if(!isCcl&&(!mapped||blank(mapped.bookingOfficeType)||mapped.bookingOfficeType==="Needs Mapping")){
            add({issueType:"BOOKING_OFFICE_ENRICHMENT_MISSING",productId,recordId,limitType:"Country",key:country,detail:"Positive Country exposure lacks canonical Booking Office Type enrichment."});
          }
        }
      }

      // CCL: validate only when the source row is explicitly in the CCL universe.
      // Credit Line is inherently CCL-linked; Cash/NCL CCL rows are tagged by CCL metadata/record identity.
      const cclMapping=mappingByRecord(productId,recordId,"CCL")[0];
      const cclTagged=explicitCclSource(row)||Boolean(cclMapping);
      const cclRelevant=(productId==="CREDIT LINE"&&positive(positiveSourceExposure(productId,d,row,"CCL")))||cclTagged;
      if(cclRelevant){
        if(productId==="CREDIT LINE"&&blank(meta.cclCounterpartyId))
          add({issueType:"CCL_COUNTERPARTY_ID_MISSING",productId,recordId,limitType:"CCL",key:"—",detail:"Credit Line row requires stable cclCounterpartyId enrichment."});
        if(["CASHLOAN","NON CASH LOAN"].includes(productId)&&cclTagged&&blank(meta.cclCounterpartyId))
          add({issueType:"CCL_COUNTERPARTY_ID_MISSING",productId,recordId,limitType:"CCL_UPSTREAM",key:"—",detail:"CCL upstream row requires stable cclCounterpartyId enrichment."});
        const limitType=productId==="CREDIT LINE"?meta.cclLimitType:meta.creditLineLimitType;
        if(blank(limitType)||!["DIRECT","INDIRECT"].includes(String(limitType).toUpperCase()))
          add({issueType:productId==="CREDIT LINE"?"CCL_LIMIT_TYPE_MISSING":"CCL_UPSTREAM_LIMIT_TYPE_MISSING",productId,recordId,limitType:"CCL",key:meta.cclCounterpartyId||cclMapping?.key||"—",detail:"CCL mapping requires a valid DIRECT/INDIRECT limit type."});
        if(blank(meta.reportingEntity))
          add({issueType:"REPORTING_ENTITY_MISSING",productId,recordId,limitType:"CCL",key:meta.cclCounterpartyId||cclMapping?.key||"—",detail:"CCL consolidated reporting requires explicit reportingEntity enrichment."});
        if(cclMapping?.masterMatch===false)
          add({issueType:"CCL_MASTER_MAPPING_MISSING",productId,recordId,limitType:"CCL",key:cclMapping.key||meta.cclCounterpartyId||"—",detail:"CCL source row has no resolved target master."});
      }

      // MLK identity must be CIF -> MLK master -> entity. Product metadata is not
      // authoritative for entity when the CIF exists in MLK master.
      const cif=String(productId==="CASHLOAN"?d.no_cus:productId==="NON CASH LOAN"?d.CUSTID:"").trim();
      const treasuryCif=String(meta.mlkCif||"").trim()||String(d["Swift Code"]||"").match(/^TL-(.+)$/i)?.[1]||"";
      const mlkCif=productId==="CREDIT LINE"?treasuryCif:cif;
      const mlkMaster=(mlkMasterRows||[]).find(x=>String(x?.key||"").trim()===mlkCif);
      const mlkMapping=mappingByRecord(productId,recordId,"MLK")[0];
      const mlkRelevant=Boolean(mlkMaster)||Boolean(mlkMapping)||Boolean(meta.mlkCif)||(/^TL-/i.test(String(d["Swift Code"]||""))&&positive(positiveSourceExposure(productId,d,row,"MLK")));
      if(mlkRelevant&&positive(positiveSourceExposure(productId,d,row,"MLK"))){
        if(!mlkCif)
          add({issueType:"MLK_CIF_MISSING",productId,recordId,limitType:"MLK",key:"—",detail:"MLK-applicable positive exposure has no deterministic CIF."});
        if(!meta.reportingEntity&& !mlkMapping?.entity)
          add({issueType:"REPORTING_ENTITY_MISSING",productId,recordId,limitType:"MLK",key:mlkCif||"—",detail:"MLK positive exposure requires reporting entity from MLK master/entity mapping."});
      }

      // LPG: any declared/attribute-bearing LPG row is applicable. A positive
      // applicable row must resolve the complete debtor classification chain.
      if(["CASHLOAN","NON CASH LOAN"].includes(productId)){
        const lpg=lpgClassifier(row);
        const lpgAttributeBearing=Boolean(lpg?.sector||lpg?.segment||lpg?.region)||Boolean(meta.lpgApplicability);
        const lpgApplicable=lpg?.applicability==="APPLICABLE" || lpgAttributeBearing;
        const exposure=positiveSourceExposure(productId,d,row,"LPG");
        if(lpgApplicable&&positive(exposure)){
          if(!lpg?.classified){
            add({issueType:"LPG_CLASSIFICATION_INCOMPLETE",productId,recordId,limitType:"LPG",key:(lpg?.sector||"—")+"|"+(lpg?.segment||"—"),detail:"Positive LPG-applicable exposure must have Sector/Industry, Segment, and Region."});
          }else{
            const mapping=mappingByRecord(productId,recordId,"LPG")[0];
            const e=mapping?.businessEnrichment||{};
            ["masterIndustryCode","groupingCode","segmentCode","regionCode"].forEach(field=>{
              if(blank(e[field]))add({issueType:"LPG_BUSINESS_ENRICHMENT_MISSING",productId,recordId,limitType:"LPG",key:mapping?.key||((lpg?.sector||"—")+"|"+(lpg?.segment||"—")),detail:"LPG mapping missing canonical "+field+"."});
            });
            if(!mapping)
              add({issueType:"LPG_MAPPING_MISSING",productId,recordId,limitType:"LPG",key:(lpg.sector||"—")+"|"+(lpg.segment||"—"),detail:"Positive LPG exposure is classified but has no canonical mapping row."});
          }
        }
      }
    });
  });

  // Every positive mapping must retain lineage and resolve to a concrete master.
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
      .filter(r=>domain!=="CCL"||String(r.cclLimitType||"DIRECT").toUpperCase()==="DIRECT")
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
