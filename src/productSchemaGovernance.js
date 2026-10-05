// Governance note: source schema and business enrichment contracts are kept independent by design.
// LIMAS business mapping + source schema governance registry.
// Raw source fields remain immutable; everything below is a contract/enrichment layer.

export const PRODUCT_SOURCE_SCHEMA_OVERRIDES = {
  "CREDIT LINE": [
    "No","Nama","Swift Code","Swift Code Vlookup","Code","Aging Schedule RM","Negara","Bank","RM","Dept.","BMFIR","Fitch","Moody's","S&P",
    "Treasury DN","Treasury DN Utilisasi","Treasury LN","Treasury LN Utilisasi","Treasury Line Total","Treasury Line Total Utilisasi",
    "Comm DN","Comm DN Utilisasi","Comm LN","Comm LN Utilisasi","Comm Line Total","Comm Line Total Utilisasi","Corporate Card",
    "Credit Line Total","Credit Line Total Utilisasi"
  ],
  "Nominal Pertanggungan": [
    "No","Perusahaan Asuransi","Jenis Prudk Asuransi","Entitas","Nominal Pertanggungan 2025 (Rp Juta)"
  ]
};

export const PRODUCT_DERIVED_FIELDS_FORBIDDEN = {
  "CREDIT LINE": ["Bade Treasury Line"],
  "Nominal Pertanggungan": [
    "EIL Entitas (Rp Juta)",
    "Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)",
    "Utilisasi EIL (%)","CIL (Rp Juta)","CIT (Rp Juta)","Utilisasi CIL (%)",
    "% Utilisasi (Nominal Pertanggungan/CIL)","% Utilisasi Proyeksi (Nominal Pertanggungan/CIL)",
    "Skor Akreditasi (PCP)","Klasifikasi EWS (PCP)","Status / Rekomendasi Action Plan"
  ]
};

export const BUSINESS_MAPPING_CONTRACTS = {
  CASHLOAN: {
    Country:{source:["code","nm_cab"],canonical:"Country Exposure + Booking Office",enrichment:["bookingOfficeType"]},
    CCL:{source:["no_cus","total_bade"],enrichment:["cclApplicability","cclCounterpartyId","creditLineLimitType","reportingEntity"]},
    MLK:{source:["no_cus","total_bade"],enrichment:["mlkCif","reportingEntity"]},
    LPG:{source:["no_cus","ecosystem_lpg","segmen_lpg","region_lpg","total_bade"],enrichment:["lpgApplicability","industryCode","groupingCode","segmentCode","regionCode","icNasionalCode","icWilayahSegmenCode"]}
  },
  "NON CASH LOAN": {
    Country:{source:["Country Code","EQVIDR","CUSTID","TRXREF"],enrichment:["bookingOffice","bookingOfficeType"]},
    CCL:{source:["CUSTID","TRXREF","EQVIDR","Swift Code"],enrichment:["cclApplicability","cclCounterpartyId","creditLineLimitType","reportingEntity"]},
    MLK:{source:["CUSTID","TRXREF","EQVIDR"],enrichment:["mlkCif","reportingEntity"]},
    LPG:{source:["CUSTID","TRXREF","BALANCE","CCY","EQVIDR","AMOUNT","EXCHANGERT","ecosystem_lpg","segmen_lpg","region_lpg"],enrichment:["lpgApplicability","industryCode","groupingCode","segmentCode","regionCode","icNasionalCode","icWilayahSegmenCode"]}
  },
  "CREDIT LINE": {
    Country:{source:["Swift Code Vlookup","Code","Comm DN Utilisasi","Comm LN Utilisasi","Treasury DN Utilisasi","Treasury LN Utilisasi"],enrichment:[]},
    CCL:{source:["Swift Code Vlookup","Code","Credit Line Total Utilisasi"],enrichment:["cclApplicability","cclCounterpartyId","cclLimitType","reportingEntity"]},
    MLK:{source:["Swift Code","Treasury Line Total Utilisasi"],enrichment:["mlkCif","reportingEntity"]}  
  },
  BONDS:{
    Country:{source:["Securities Name","Issuer Country","Amount Eq. IDR Juta","Branch"],enrichment:["bookingOfficeType"]}
  },
  NOSTRO:{
    Country:{source:["SwfitCode","Bank Country","CCY","Balance","FX Rate to IDR","FX Rate Date"],enrichment:["bookingOfficeType","fxNormalization"]}
  },
  "Nominal Pertanggungan":{
    CIL:{source:["Perusahaan Asuransi","Entitas","Nominal Pertanggungan 2025 (Rp Juta)"],enrichment:["insuranceCompanyId","entityCode"]}
  },
  "Investment Line":{
    Product:{source:["Nama Bank","Nama Entity (Scope Entity : AKK)","Switftcode","Amount Invesment Line"],enrichment:["investmentClassification"]}
  }
};

export function buildDebtorClassificationRegistry(productDatabase={}, resolvers={}) {
  const byCif = new Map();
  const conflicts = [];
  const add = (productId,row) => {
    const d=row?.data||{};
    if(!["CASHLOAN","NON CASH LOAN"].includes(productId)) return;
    const cif=String(productId==="CASHLOAN"?d.no_cus:d.CUSTID||"").trim();
    if(!cif) return;
    const sourceIndustry=String(d.ecosystem_lpg||"").trim();
    const sourceSegment=String(d.segmen_lpg||"").trim();
    const sourceRegion=String(d.region_lpg||"").trim();
    const industry=resolvers.industry?.(sourceIndustry)||null;
    const segment=resolvers.segment?.(sourceSegment)||null;
    const region=resolvers.region?.(sourceRegion)||null;
    const classification={
      cif,
      industryCode:industry?.industryCode||"",
      industryName:industry?.industryName||sourceIndustry,
      groupingCode:industry?.groupingCode||"",
      groupingName:industry?.groupingName||"",
      segmentCode:segment?.segmentCode||"",
      segmentName:segment?.segmentName||sourceSegment,
      regionCode:region?.regionCode||"",
      regionName:region?.regionName||sourceRegion,
      sourceProduct:productId,
      recordId:row?.recordId||""
    };
    const existing=byCif.get(cif);
    if(!existing){byCif.set(cif,classification);return;}
    const keys=["industryCode","groupingCode","segmentCode","regionCode"];
    const conflict=keys.filter(k=>existing[k]&&classification[k]&&existing[k]!==classification[k]);
    if(conflict.length){
      conflicts.push({
        issueType:"DEBTOR_CLASSIFICATION_CONFLICT",
        cif,
        field:conflict.join(","),
        detail:"CIF yang sama memiliki classification berbeda antar product/facility source.",
        firstRecordId:existing.recordId,
        conflictingRecordId:row?.recordId||""
      });
    }
  };
  Object.entries(productDatabase||{}).forEach(([productId,rows])=>(rows||[]).forEach(row=>add(productId,row)));
  return {byCif,records:[...byCif.values()],conflicts};
}

export function resolveMlkIdentity(cif,mlkMasterRows=[]) {
  const key=String(cif||"").trim();
  if(!key)return {cif:"",master:null,entityCode:"",status:"MISSING_CIF"};
  const master=(mlkMasterRows||[]).find(x=>String(x?.key||"").trim()===key);
  if(!master)return {cif:key,master:null,entityCode:"",status:"MASTER_NOT_FOUND"};
  return {cif:key,master,entityCode:String(master.entity||"").trim().toUpperCase(),status:master.entity?"MAPPED":"ENTITY_MISSING"};
}

export function businessContractFor(productId,domain){
  if(domain)return BUSINESS_MAPPING_CONTRACTS[productId]?.[domain]||null;
  return BUSINESS_MAPPING_CONTRACTS[productId]||null;
}
