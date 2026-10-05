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

export function auditProductReportCoverage(productSchemaFields={}){
  const rows=[];
  Object.entries(PRODUCT_REPORT_REQUIREMENTS).forEach(([productId,requirements])=>{
    const available=new Set(productSchemaFields[productId]||[]);
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
