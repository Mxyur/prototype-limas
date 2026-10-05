// LIMAS Report Data Contract — Product/Report traceability baseline.
// This module is intentionally metadata-only: it does not alter source fields or business calculations.
// It records which Product Database source fields and LIMAS enrichments are required by each report/domain.

export const PRODUCT_REPORT_REQUIREMENTS = {
  "CASHLOAN": [
    {report:"Country", sourceFields:["code","total_bade","nm_cab"], enrichmentFields:["bookingOfficeType"], note:"Country exposure, utilization, and Domestic/Overseas classification."},
    {report:"MLK", sourceFields:["no_cus","total_bade"], enrichmentFields:["reportingEntity"], note:"CIF-level utilization; entity is required for consolidated scope."},
    {report:"CCL", sourceFields:["no_cus","total_bade"], enrichmentFields:["cclCounterpartyId","cclLimitType","reportingEntity"], note:"Upstream FI Bank Loan lineage; raw Cash Loan is not directly added twice to CCL."},
    {report:"LPG", sourceFields:["no_cus","total_bade","ecosystem_lpg","segmen_lpg","region_lpg"], enrichmentFields:["masterIndustryCode"], note:"Debtor-level LPG classification and Master Industry identity."}
  ],
  "NON CASH LOAN": [
    {report:"Country", sourceFields:["CUSTID","TRXREF","Country Code","EQVIDR","CCY","AMOUNT","BALANCE","EXCHANGERT"], enrichmentFields:["Booking Office","Booking Office Type"], note:"Country exposure, normalized utilization, and Domestic/Overseas classification."},
    {report:"MLK", sourceFields:["CUSTID","TRXREF","EQVIDR"], enrichmentFields:["reportingEntity"], note:"CIF-level utilization; entity is required for consolidated scope."},
    {report:"CCL", sourceFields:["CUSTID","TRXREF","EQVIDR"], enrichmentFields:["cclCounterpartyId","cclLimitType","reportingEntity"], note:"Upstream FI NCL → Commercial Line lineage."},
    {report:"LPG", sourceFields:["CUSTID","TRXREF","EQVIDR","BALANCE","CCY","AMOUNT","EXCHANGERT","ecosystem_lpg","segmen_lpg","region_lpg"], enrichmentFields:["masterIndustryCode"], note:"Debtor-level LPG classification and canonical IDR exposure."}
  ],
  "CREDIT LINE": [
    {report:"Country", sourceFields:["Swift Code Vlookup","Code","Comm DN Utilisasi","Comm LN Utilisasi","Treasury DN Utilisasi","Treasury LN Utilisasi","Credit Line Total Utilisasi"], enrichmentFields:[], note:"Country product limits/exposure; DN/LN directly define Domestic/Overseas."},
    {report:"CCL", sourceFields:["Swift Code Vlookup","Code","Comm DN","Comm DN Utilisasi","Comm LN","Comm LN Utilisasi","Comm Line Total","Comm Line Total Utilisasi","Treasury DN","Treasury DN Utilisasi","Treasury LN","Treasury LN Utilisasi","Treasury Line Total","Treasury Line Total Utilisasi","Credit Line Total","Credit Line Total Utilisasi"], enrichmentFields:["cclCounterpartyId","cclLimitType","reportingEntity"], note:"Canonical CCL Credit Line utilization and Commercial/Treasury lineage."},
    {report:"MLK", sourceFields:["Swift Code","Bade Treasury Line","Treasury Line Total Utilisasi"], enrichmentFields:["reportingEntity"], note:"Treasury Line → MLK facility utilization."}
  ],
  "BONDS": [
    {report:"Country", sourceFields:["Securities Name","Issuer Country","Amount Eq. IDR Juta","Branch"], enrichmentFields:["bookingOfficeType"], note:"Issuer-country exposure and booking-office classification."}
  ],
  "NOSTRO": [
    {report:"Country", sourceFields:["SwfitCode","Bank Country","CCY","Balance","FX Rate to IDR","FX Rate Date"], enrichmentFields:["bookingOfficeType"], note:"Bank-country exposure and canonical IDR normalization."}
  ],
  "Nominal Pertanggungan": [
    {report:"CIL", sourceFields:["Perusahaan Asuransi","Entitas","Nominal Pertanggungan 2025 (Rp Juta)"], enrichmentFields:["insuranceCompanyId"], note:"Insurer/entity utilization against EIL/CIL/CIT."}
  ]
};

export function auditProductReportCoverage(productSchemaFields={},fieldAliases={}){
  const rows=[];
  Object.entries(PRODUCT_REPORT_REQUIREMENTS).forEach(([productId,requirements])=>{
    const available=new Set([...(productSchemaFields[productId]||[]),...(fieldAliases[productId]||[])]);
    requirements.forEach(req=>{
      const missingSourceFields=req.sourceFields.filter(f=>!available.has(f));
      rows.push({
        productId,
        report:req.report,
        sourceFields:req.sourceFields,
        enrichmentFields:req.enrichmentFields||[],
        missingSourceFields,
        missingEnrichmentFields:req.enrichmentFields||[],
        sourceCoverage:missingSourceFields.length===0?"AVAILABLE":"MISSING_SOURCE_FIELD",
        enrichmentCoverage:(req.enrichmentFields||[]).length===0?"NOT_REQUIRED":"ENRICHMENT_REQUIRED",
        note:req.note
      });
    });
  });
  return rows;
}

export function summarizeProductReportCoverage(rows=[]){
  const sourceRows=rows.filter(r=>r.sourceCoverage!=="NOT_APPLICABLE");
  return {
    totalContracts:rows.length,
    sourceComplete:sourceRows.filter(r=>r.sourceCoverage==="AVAILABLE").length,
    sourceIncomplete:sourceRows.filter(r=>r.sourceCoverage==="MISSING_SOURCE_FIELD").length,
    enrichmentRequired:rows.filter(r=>r.enrichmentCoverage==="ENRICHMENT_REQUIRED").length,
    fullySourceComplete:sourceRows.length>0&&sourceRows.every(r=>r.sourceCoverage==="AVAILABLE")
  };
}


/**
 * Report Field Traceability — final report-column contract.
 *
 * A report field is considered traceable only when the contract explicitly
 * identifies the owning layer and the transformation/derivation route.
 * This intentionally keeps source fields immutable and treats enrichment and
 * formulas as separate dependencies.
 */
export const REPORT_FIELD_TRACEABILITY = {
  common: {
    no:{sourceLayer:"REPORT_DERIVED",sourceReference:"report row ordinal",transformation:"Generated sequentially for the report result set.",mandatory:true},
    status:{sourceLayer:"MONITORING",sourceReference:"recordStatus()/statusForReport()",transformation:"Canonical monitoring status / EWS threshold.",mandatory:true},
    statusMaster:{sourceLayer:"MASTER_LIMIT",sourceReference:"master.statusMaster",transformation:"Direct master status.",mandatory:true}
  },
  Country: {
    country:{sourceLayer:"MASTER_LIMIT",sourceReference:"Country.name",transformation:"Direct master attribute.",mandatory:true},
    code:{sourceLayer:"MASTER_LIMIT",sourceReference:"Country.key",transformation:"Canonical country code.",mandatory:true},
    capacity:{sourceLayer:"MASTER_LIMIT",sourceReference:"Country.capacityLimit",transformation:"Normalized to Rp Juta.",mandatory:true},
    capacityDomestic:{sourceLayer:"MASTER_LIMIT",sourceReference:"Country.capacityDistribution.domesticLimit",transformation:"Direct domestic capacity allocation.",mandatory:true},
    capacityOverseas:{sourceLayer:"MASTER_LIMIT",sourceReference:"Country.capacityDistribution.overseasLimit",transformation:"Direct overseas capacity allocation.",mandatory:true},
    allocatedCapacity:{sourceLayer:"MASTER_LIMIT",sourceReference:"countryAllocationMetrics(master).allocated",transformation:"Sum of configured product allocations.",mandatory:true},
    unallocatedCapacity:{sourceLayer:"MASTER_LIMIT",sourceReference:"countryAllocationMetrics(master).unallocated",transformation:"Capacity less allocated product limit.",mandatory:true},
    domestic:{sourceLayer:"CANONICAL_READ_MODEL",sourceReference:"countryBookingExposure(master,'Domestic')",transformation:"Sum of normalized mapped exposure by Booking Office Type.",mandatory:true},
    overseas:{sourceLayer:"CANONICAL_READ_MODEL",sourceReference:"countryBookingExposure(master,'Overseas')",transformation:"Sum of normalized mapped exposure by Booking Office Type.",mandatory:true},
    unmapped:{sourceLayer:"CANONICAL_READ_MODEL",sourceReference:"countryBookingExposure(master,'Needs Mapping')",transformation:"Positive exposure pending booking-office classification.",mandatory:true},
    total:{sourceLayer:"CANONICAL_READ_MODEL",sourceReference:"recordExposure('Country',master)",transformation:"Sum of normalized product contributions.",mandatory:true},
    __productLimit:{sourceLayer:"MASTER_LIMIT",sourceReference:"master.productAllocations.<product>",transformation:"Domestic + Overseas + Total product allocation.",mandatory:true},
    __productExposure:{sourceLayer:"CANONICAL_READ_MODEL",sourceReference:"productContributionMap('Country',master.key)",transformation:"Normalized product contribution.",mandatory:true}
  },
  CCL:{},
  MLK:{},
  CIL:{},
  LPG:{},
  CCL_DIRECT:{},
  CCL_INDIRECT:{},
  MLK_CONSOLIDATED:{}
};

const cclMasterFields={
  bank:["MASTER_LIMIT","CCL.name","Direct master counterparty name."],
  category:["MASTER_LIMIT","CCL.category","Counterparty category."],
  country:["MASTER_LIMIT","CCL.country","Counterparty country."],
  countryRating:["MASTER_LIMIT","CCL.countryRating","Country rating reference."],
  bobot:["MASTER_LIMIT","CCL.bobot","Risk weight."],
  rating:["MASTER_LIMIT","CCL.rating","Counterparty rating."],
  position:["MASTER_LIMIT","CCL.position","Rating as-of position."],
  ratingIndex:["MASTER_LIMIT","CCL.ratingIndex","Rating index reference."],
  inhouse:["MASTER_LIMIT","CCL.inhouse","Inhouse capacity reference."],
  tier1:["MASTER_LIMIT","CCL.tier1","Tier 1 capital reference."],
  capacity:["MASTER_LIMIT","CCL.capacity","Calculated counterparty capacity reference."],
  adjusted:["MASTER_LIMIT","CCL.adjusted","Adjusted capacity limit reference."],
  globalParent:["MASTER_LIMIT","CCL.globalParent","Global parent bank reference."],
  top200:["MASTER_LIMIT","CCL.top200","Top-200 bank reference flag."],
  ccl:["MASTER_LIMIT","effectiveCclMasterLimit(master)","Effective CCL master limit after entity allocation governance."],
  limit:["MASTER_LIMIT","CCL.contractual","Contractual limit reference."],
  outstanding:["CANONICAL_READ_MODEL","recordExposure('CCL',master)","Normalized CCL exposure."],
  jenis:["REPORT_DERIVED","buildReportDummy().CCL.jenis","Direct / consolidated report classification."],
  bmriTotal:["CANONICAL_READ_MODEL","entity-scoped CCL product contributions","BMRI entity total exposure."],
  bmriLoan:["CANONICAL_READ_MODEL","productContributionMap('CCL',key).CASHLOAN","BMRI Bank Loan contribution."],
  bmriCom:["CANONICAL_READ_MODEL","productContributionMap('CCL',key)['CREDIT LINE|Commercial']","BMRI Commercial Line contribution."],
  bmriTrs:["CANONICAL_READ_MODEL","productContributionMap('CCL',key)['CREDIT LINE|Treasury']","BMRI Treasury Line contribution."],
  bmriUtil:["REPORT_DERIVED","CCL master vs exposure","Exposure / effective CCL limit (canonical unit conversion)."],
  contractualUtil:["REPORT_DERIVED","CCL contractual vs exposure","Exposure / contractual limit (canonical unit conversion)."],
  maxOutstanding:["REPORT_DERIVED","recordExposure('CCL',master)","Maximum displayed outstanding for CCL report."],
  maxContractualUtil:["REPORT_DERIVED","CCL contractual vs exposure","Exposure / contractual limit."],
  paTotal:["CANONICAL_READ_MODEL","entity-scoped CCL product contributions","Perusahaan Anak aggregate."],
  paLoan:["CANONICAL_READ_MODEL","entity-scoped Cash Loan CCL contributions","Perusahaan Anak Bank Loan contribution."],
  paCom:["CANONICAL_READ_MODEL","entity-scoped Credit Line commercial contributions","Perusahaan Anak Commercial Line contribution."],
  paTrs:["CANONICAL_READ_MODEL","entity-scoped Credit Line treasury contributions","Perusahaan Anak Treasury Line contribution."],
  paUtil:["REPORT_DERIVED","PA exposure / PA limit","Perusahaan Anak utilization."],
  paContractualUtil:["REPORT_DERIVED","PA exposure / contractual limit","Perusahaan Anak contractual utilization."],
  paMaxOutstanding:["REPORT_DERIVED","PA exposure","Maximum displayed PA outstanding."],
  paMaxContractualUtil:["REPORT_DERIVED","PA exposure / contractual limit","Perusahaan Anak maximum contractual utilization."]
};
Object.entries(cclMasterFields).forEach(([key,[layer,ref,tx]])=>{
  REPORT_FIELD_TRACEABILITY.CCL[key]={sourceLayer:layer,sourceReference:ref,transformation:tx,mandatory:true};
});

const mlkFields={
  tier:["MASTER_LIMIT","MLK.tier","Direct MLK master attribute."],
  holding:["MASTER_LIMIT","MLK.groupUsahaHolding / group","Canonical holding/group identity."],
  subGroup:["MASTER_LIMIT","MLK.subGroup / group","Sub-group identity."],
  flag:["MASTER_LIMIT","MLK.bumnSwasta","BUMN/Swasta classification."],
  unit:["MASTER_LIMIT","MLK.unitKerja","Managing unit."],
  entity:["MASTER_LIMIT","MLK.entity","Reporting entity / subsidiary scope."],
  bmpkKonsol:["MASTER_LIMIT","MLK.bmpkKonsol","Consolidated BMPK reference."],
  bmpkEntitas:["MASTER_LIMIT","MLK.bmpkEntitas","Entity BMPK reference."],
  limitFasilitas:["CANONICAL_READ_MODEL","mlkFacilityMetrics(master).totalLimitExisting","CL + NCL + Treasury facility limit."],
  bade:["CANONICAL_READ_MODEL","mlkFacilityMetrics(master).totalBadeExisting","Normalized product BADE contribution."],
  borrowing:["MASTER_LIMIT","MLK.borrowingCapacity","Borrowing capacity reference."],
  masterLimitSetting:["MASTER_LIMIT","MLK.masterLimitSetting","Configured MLK setting before effective-limit fallback."],
  masterLimit:["MASTER_LIMIT","effectiveMlkMasterLimit(master)","Effective MLK master limit."],
  mlk:["REPORT_DERIVED","effectiveMlkMasterLimit(master)","MLK consolidated value."],
  utilBade:["REPORT_DERIVED","bade / facility limit","Facility utilization."],
  utilFacilityBmpk:["REPORT_DERIVED","facility limit / BMPK entity","Facility-to-BMPK ratio."],
  utilMlkBmpk:["REPORT_DERIVED","MLK / BMPK entity","MLK-to-entity BMPK ratio."],
  utilMlkBmpkConsol:["REPORT_DERIVED","MLK / BMPK consolidated","MLK-to-consolidated BMPK ratio."],
  debtors:["REPORT_DERIVED","MLK monitoring row/group aggregation","Debtor count."],
  totalBmpk:["MASTER_LIMIT","MLK.bmpkEntitas","Master BMPK aggregation."],
  totalMaster:["MASTER_LIMIT","effectiveMlkMasterLimit(master)","Master limit aggregation."],
  totalBorrowing:["MASTER_LIMIT","MLK.borrowingCapacity","Borrowing capacity aggregation."],
  variance:["REPORT_DERIVED","master limit setting vs effective master","Displayed master-limit variance."]
};
Object.entries(mlkFields).forEach(([key,[layer,ref,tx]])=>{
  REPORT_FIELD_TRACEABILITY.MLK[key]={sourceLayer:layer,sourceReference:ref,transformation:tx,mandatory:true};
  REPORT_FIELD_TRACEABILITY.MLK_CONSOLIDATED[key]=REPORT_FIELD_TRACEABILITY.MLK[key];
});

const cilFields={
  insurer:["MASTER_LIMIT","CIL.name","Canonical insurer master name."],
  type:["MASTER_LIMIT","CIL.type","Insurer type."],
  ic:["MASTER_LIMIT","CIL.ic","Insurance capacity."],
  multiplier:["MASTER_LIMIT","CIL.multiplier","Configured multiplier."],
  cit:["MASTER_LIMIT","CIL.cit","CIT = IC × Multiplier."],
  bmriNominal:["CANONICAL_READ_MODEL","productIntegrationMappings['Nominal Pertanggungan'] + entity=BMRI","Normalized BMRI nominal utilization."],
  bmriEil:["MASTER_LIMIT","CIL.eils.BMRI","BMRI EIL."],
  mtNominal:["CANONICAL_READ_MODEL","productIntegrationMappings['Nominal Pertanggungan'] + entity=Mandiri Taspen","Normalized Mandiri Taspen utilization."],
  mtEil:["MASTER_LIMIT","CIL.eils['Mandiri Taspen']","Mandiri Taspen EIL."],
  mtfNominal:["CANONICAL_READ_MODEL","productIntegrationMappings['Nominal Pertanggungan'] + entity=MTF","Normalized MTF utilization."],
  mtfEil:["MASTER_LIMIT","CIL.eils.MTF","MTF EIL."],
  mufNominal:["CANONICAL_READ_MODEL","productIntegrationMappings['Nominal Pertanggungan'] + entity=MUF","Normalized MUF utilization."],
  mufEil:["MASTER_LIMIT","CIL.eils.MUF","MUF EIL."],
  cil:["MASTER_LIMIT","CIL.cil","CIL = sum of entity EIL."],
  totalNominal:["CANONICAL_READ_MODEL","recordExposure('CIL',master)","Total nominal utilization."],
  projection:["REPORT_DERIVED","cilProjection(master.key)","Projection multiplier by entity."],
  utilCit:["REPORT_DERIVED","totalNominal / CIT","Nominal-to-CIT utilization."],
  projectedUtil:["REPORT_DERIVED","projection / CIT","Projected-to-CIT utilization."],
  cilUtil:["REPORT_DERIVED","totalNominal / CIL","Nominal-to-CIL utilization."],
  eilUtil:["REPORT_DERIVED","max(entity nominal / EIL)","Maximum EIL utilization."],
  eilBreaches:["REPORT_DERIVED","entity nominal vs EIL","Entities with EIL breach."]
};
Object.entries(cilFields).forEach(([key,[layer,ref,tx]])=>{
  REPORT_FIELD_TRACEABILITY.CIL[key]={sourceLayer:layer,sourceReference:ref,transformation:tx,mandatory:true};
});

const cclCategoryFields={
  category:["REFERENCE","CCL_REPORT_CATEGORIES","Category bucketing reference."],
  counterpartyCount:["REPORT_DERIVED","cclCategoryMetric()/cclScopeRecordsForCategory()","Count of distinct counterparties in the report bucket."],
  consolidatedCcl:["MASTER_LIMIT","CCL entity-scope CCL allocations","Sum of entity CCL limits."],
  consolidatedContractual:["MASTER_LIMIT","CCL entity-scope contractual limits","Sum of entity contractual limits."],
  consolidatedOs:["CANONICAL_READ_MODEL","CCL entity-scoped product contributions","Consolidated outstanding."],
  consolidatedOsMax:["REPORT_DERIVED","CCL category exposure","Maximum outstanding in category."],
  consolidatedUtil:["REPORT_DERIVED","consolidatedOs / consolidatedContractual","Consolidated utilization."],
  bmriCcl:["MASTER_LIMIT","CCL entity scope BMRI","BMRI CCL limit."],
  bmriContractual:["MASTER_LIMIT","CCL entity scope BMRI","BMRI contractual limit."],
  bmriOs:["CANONICAL_READ_MODEL","CCL entity scope BMRI product contributions","BMRI outstanding."],
  bmriOsMax:["REPORT_DERIVED","BMRI category exposure","BMRI maximum outstanding."],
  bmriUtil:["REPORT_DERIVED","bmriOs / bmriContractual","BMRI utilization."],
  subsidiaryCcl:["MASTER_LIMIT","CCL entity scopes where entity != BMRI","Subsidiary CCL allocation."],
  subsidiaryContractual:["MASTER_LIMIT","CCL entity scopes where entity != BMRI","Subsidiary contractual limit."],
  subsidiaryOs:["CANONICAL_READ_MODEL","CCL entity-scoped product contributions","Subsidiary outstanding."],
  subsidiaryOsMax:["REPORT_DERIVED","Subsidiary category exposure","Subsidiary maximum outstanding."],
  subsidiaryUtil:["REPORT_DERIVED","subsidiaryOs / subsidiaryContractual","Subsidiary utilization."],
  mmiCcl:["MASTER_LIMIT","CCL entity scope MMI / INDIRECT","MMI CCL allocation."],
  mmiContractual:["MASTER_LIMIT","CCL entity scope MMI / INDIRECT","MMI contractual limit."],
  mmiOs:["CANONICAL_READ_MODEL","CCL entity-scoped product contributions","MMI outstanding."],
  mmiOsMax:["REPORT_DERIVED","MMI category exposure","MMI maximum outstanding."],
  mmiUtil:["REPORT_DERIVED","mmiOs / mmiContractual","MMI utilization."],
  amfsCcl:["MASTER_LIMIT","CCL entity scope AMFS / INDIRECT","AMFS CCL allocation."],
  amfsContractual:["MASTER_LIMIT","CCL entity scope AMFS / INDIRECT","AMFS contractual limit."],
  amfsOs:["CANONICAL_READ_MODEL","CCL entity-scoped product contributions","AMFS outstanding."],
  amfsOsMax:["REPORT_DERIVED","AMFS category exposure","AMFS maximum outstanding."],
  amfsUtil:["REPORT_DERIVED","amfsOs / amfsContractual","AMFS utilization."]
};
Object.entries(cclCategoryFields).forEach(([key,[layer,ref,tx]])=>{
  REPORT_FIELD_TRACEABILITY.CCL_DIRECT[key]={sourceLayer:layer,sourceReference:ref,transformation:tx,mandatory:true};
  REPORT_FIELD_TRACEABILITY.CCL_INDIRECT[key]={sourceLayer:layer,sourceReference:ref,transformation:tx,mandatory:true};
});

function lpgDynamicTraceability(key){
  const match=String(key).match(/^(limit|outstanding|util)_(.+)$/);
  if(match){
    const kind=match[1],scope=match[2].replace(/_/g," ");
    if(kind==="limit")return {sourceLayer:"MASTER_LIMIT",sourceReference:"LPG master limits."+scope,transformation:"Canonical master limit normalized to Rp Juta.",mandatory:true};
    if(kind==="outstanding")return {sourceLayer:"CANONICAL_READ_MODEL",sourceReference:"lpgScopeExposure(master, scope)",transformation:"Sum of normalized Cash Loan + NCL exposure in the scope.",mandatory:true};
    return {sourceLayer:"REPORT_DERIVED",sourceReference:"lpgScopeUtil(master, scope)",transformation:"Outstanding / scope limit with explicit zero-limit handling.",mandatory:true};
  }
  if(key==="sector")return {sourceLayer:"MASTER_LIMIT",sourceReference:"LPG.sector",transformation:"Direct ecosystem/sector identity.",mandatory:true};
  if(key==="segment")return {sourceLayer:"MASTER_LIMIT",sourceReference:"LPG.segment",transformation:"Direct segment identity.",mandatory:true};
  if(key==="cl")return {sourceLayer:"CANONICAL_READ_MODEL",sourceReference:"productContributionMap('LPG',master.key).CASHLOAN",transformation:"Bankwide normalized Cash Loan contribution.",mandatory:true};
  if(key==="ncl")return {sourceLayer:"CANONICAL_READ_MODEL",sourceReference:"productContributionMap('LPG',master.key)['NON CASH LOAN']",transformation:"Bankwide normalized NCL contribution.",mandatory:true};
  if(key==="crosscheck")return {sourceLayer:"REPORT_DERIVED",sourceReference:"lpgCrosscheck(master)",transformation:"Bankwide versus regional/KP+OVS reconciliation.",mandatory:true};
  if(key==="bankwideReconciliation")return {sourceLayer:"REPORT_DERIVED",sourceReference:"lpgBankwideReconciliation(master)",transformation:"Bankwide source/product feed reconciliation.",mandatory:true};
  if(key==="regionalCoverage")return {sourceLayer:"CANONICAL_READ_MODEL",sourceReference:"lpgSourceCoverage(master)",transformation:"Regional source coverage count.",mandatory:true};
  if(key==="dataQuality")return {sourceLayer:"DATA_QUALITY",sourceReference:"LPG master/product validators",transformation:"Current LPG data-quality assessment.",mandatory:true};
  return null;
}

export function resolveReportFieldTraceability(reportType,fieldKey){
  const common=REPORT_FIELD_TRACEABILITY.common[fieldKey];
  if(common)return common;
  const domain=REPORT_FIELD_TRACEABILITY[reportType]?.[fieldKey];
  if(domain)return domain;
  if(reportType==="LPG")return lpgDynamicTraceability(fieldKey);
  // Country product limit fields.
  if(reportType==="Country"&&/^(cl|ncl|com|bond|nos)(DomesticLimit|OverseasLimit|TotalLimit)$/.test(String(fieldKey))){
    const productPrefix={cl:"CASHLOAN",ncl:"NON CASH LOAN",com:"CREDIT LINE",bond:"BONDS",nos:"NOSTRO"}[String(fieldKey).match(/^(cl|ncl|com|bond|nos)/)?.[1]];
    return {sourceLayer:"MASTER_LIMIT",sourceReference:"Country.productAllocations."+productPrefix,transformation:"Domestic + Overseas + Total product allocation from Country master.",mandatory:true};
  }
  if(reportType==="Country"&&["statusMaster"].includes(fieldKey))return REPORT_FIELD_TRACEABILITY.common.statusMaster;
  return null;
}

export function auditReportFieldTraceability(reportConfig={},reportRowsByType={}){
  const rows=[];
  Object.entries(reportConfig||{}).forEach(([reportType,cfg])=>{
    const columns=Array.isArray(cfg?.columns)?cfg.columns:[];
    const runtimeRows=Array.isArray(reportRowsByType?.[reportType])?reportRowsByType[reportType]:[];
    columns.forEach(([label,key])=>{
      const contract=resolveReportFieldTraceability(reportType,key);
      const runtimeColumnPresent=runtimeRows.length===0||runtimeRows.every(row=>Object.prototype.hasOwnProperty.call(row,key));
      rows.push({
        reportType,
        field:key,
        label,
        sourceLayer:contract?.sourceLayer||"UNRESOLVED",
        sourceReference:contract?.sourceReference||"—",
        transformation:contract?.transformation||"—",
        mandatory:contract?.mandatory!==false,
        status:contract&&runtimeColumnPresent?"TRACEABLE":!contract?"MISSING_TRACEABILITY_CONTRACT":"RUNTIME_FIELD_MISSING"
      });
    });
  });
  return rows;
}

export function summarizeReportFieldTraceability(rows=[]){
  return {
    totalFields:rows.length,
    traceable:rows.filter(x=>x.status==="TRACEABLE").length,
    missingContract:rows.filter(x=>x.status==="MISSING_TRACEABILITY_CONTRACT").length,
    runtimeMissing:rows.filter(x=>x.status==="RUNTIME_FIELD_MISSING").length,
    ready:rows.length>0&&rows.every(x=>x.status==="TRACEABLE")
  };
}
