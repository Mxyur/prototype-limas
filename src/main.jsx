
import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
import {E2E_DUMMY_META,E2E_MASTER_DATA,E2E_DUMMY_PRODUCT_DATA} from './e2eDummyData';
const LPG_BANK_SCOPE="Bankwide";
const LPG_REGIONAL_SCOPES=["Region I","Region II","Region III","Region IV","Region V","Region VI","Region VII","Region VIII","Region IX","Region X","Region XI","Region XII","KP + OVS"];
const LPG_SCOPES=[LPG_BANK_SCOPE,...LPG_REGIONAL_SCOPES];
const lpgScopeKey=(scope)=>String(scope).replace(/[^A-Za-z0-9]+/g,"_");

const domains={"Country": {"sheet": "COUNTRY_MONITORING", "key": "Country Code", "name": "Negara", "products": ["CASHLOAN", "NON CASH LOAN", "CREDIT LINE", "BONDS", "NOSTRO"], "sections": {"Identitas": [["No", "1", "Data/master/reference"], ["Negara", "United Arab Emirates", "Data/master/reference"], ["Code", "AE", "Data/master/reference"], ["Status", "Exist", "Data/master/reference"]], "Limit & Gap": [["Capacity Limit", "35,941", "Data/master/reference"], ["Capacity Distribution / Domestic", "—", "Data/master/reference"], ["Capacity Distribution / Overseas", "—", "Data/master/reference"], ["Product Distribution / CASHLOAN / Domestic Limit", "—", "Data/master/reference"], ["Product Distribution / CASHLOAN / Overseas Limit", "—", "Data/master/reference"], ["Product Distribution / CASHLOAN / Total Product Limit", "—", "Calculated"], ["Product Distribution / NON CASH LOAN / Domestic Limit", "—", "Data/master/reference"], ["Product Distribution / NON CASH LOAN / Overseas Limit", "—", "Data/master/reference"], ["Product Distribution / NON CASH LOAN / Total Product Limit", "—", "Calculated"], ["Product Distribution / CREDIT LINE / Domestic Limit", "—", "Data/master/reference"], ["Product Distribution / CREDIT LINE / Overseas Limit", "—", "Data/master/reference"], ["Product Distribution / CREDIT LINE / Total Product Limit", "—", "Calculated"], ["Product Distribution / BONDS / Domestic Limit", "—", "Data/master/reference"], ["Product Distribution / BONDS / Overseas Limit", "—", "Data/master/reference"], ["Product Distribution / BONDS / Total Product Limit", "—", "Calculated"], ["Product Distribution / NOSTRO / Domestic Limit", "—", "Data/master/reference"], ["Product Distribution / NOSTRO / Overseas Limit", "—", "Data/master/reference"], ["Product Distribution / NOSTRO / Total Product Limit", "—", "Calculated"], ["Allocated Capacity", "—", "Calculated"], ["Unallocated Capacity", "—", "Calculated"]]}}, "CCL": {"sheet": "CCL_MONITORING", "key": "Kode Bank / Swift Code", "name": "Nama bank", "products": ["CASHLOAN", "NON CASH LOAN", "CREDIT LINE"], "sections": {"Bank Profile": [["Nama bank", "ABN Amro Bank NV", "Data/master/reference"], ["CIF/Swift", "-", "Data/master/reference"], ["Kategori Bank", "Asing", "Data/master/reference"], ["Negara", "Netherlands", "Data/master/reference"], ["Global Parent Bank", "—", "Data/master/reference"], ["Apakah Bank termasuk Top 200 Bank Besar Dunia berdasarkan total aset menurut Banker's Almanac", "—", "Data/master/reference"]], "Risk & Capacity": [["Country Rating", "AAA", "Data/master/reference"], ["Bobot", "0.55", "Data/master/reference"], ["Rating", "AA-", "Data/master/reference"], ["Posisi Rating", "31/12/2023", "Data/master/reference"], ["Rating Index", "90.23%", "Data/master/reference"], ["Limit Inhouse (Rp Miliar)", "68,498", "Data/master/reference"], ["Tier 1 Capital (Rp Miliar)", "403,594", "Data/master/reference"], ["Capacity", "200,290", "Data/master/reference"], ["Capacity Limit Adjusted", "68,498", "Data/master/reference"]], "Limit": [["CCL", "500", "Data/master/reference"], ["Utilisasi Capacity", "0.73%", "Data/master/reference"], ["Limit Contractual", "500", "Data/master/reference"]], "BMRI Exposure": [["Outstanding", "13", "Data/master/reference"], ["Jenis Limit", "Direct", "Data/master/reference"], ["Limit", "500", "Data/master/reference"], ["Total", "500", "Data/master/reference"], ["Bank Loan", "-", "Data/master/reference"], ["Commercial Line", "500", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Utilisasi CCL", "100%", "Data/master/reference"], ["Utilisasi Limit Kontraktual", "100%", "Data/master/reference"], ["Outstanding Maksimum", "13", "Data/master/reference"], ["Utilisasi Maksimum Limit Kontraktual", "2.53%", "Data/master/reference"]], "Perusahaan Anak": [["Limit", "500", "Data/master/reference"], ["Total", "500", "Data/master/reference"], ["Bank Loan", "-", "Data/master/reference"], ["Commercial Line", "500", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Utilisasi CCL", "100%", "Data/master/reference"], ["Utilisasi Limit Kontraktual", "100%", "Data/master/reference"], ["Utilisasi Maksimum Limit Kontraktual", "2.53%", "Data/master/reference"]]}}, "MLK": {"sheet": "MLK_Master", "key": "CIF", "name": "Nama Debitur", "products": ["CASHLOAN", "NON CASH LOAN", "CREDIT LINE"], "sections": {"Profil Debitur": [["Entitas", "BMRI", "Data/master/reference"], ["CIF", "4000264485", "Data/master/reference"], ["Nama Debitur", "DJARUM", "Data/master/reference"], ["Group Usaha", "DJARUM GROUP", "Data/master/reference"], ["Unit Kerja Pengelola", "CB6", "Data/master/reference"], ["Group", "DJARUM GROUP", "Data/master/reference"], ["BUMN/Swasta Flag", "Swasta", "Data/master/reference"], ["Tier", "B", "Data/master/reference"]], "Risk & Regulatory": [["BMPK Konsol", "67,204", "Data/master/reference"], ["Inhouse Limit Konsol", "60,484", "Data/master/reference"], ["BMPK/BMPP/BMPD Entitas", "55,993", "Data/master/reference"], ["Inhouse Limit Entitas", "50,394", "Data/master/reference"], ["Sektor DC", "INDUSTRI ROKOK", "Data/master/reference"], ["DC Sectoral", "3", "Data/master/reference"], ["Rating", "A+", "Data/master/reference"], ["Rating Multiplier", "2.67", "Data/master/reference"], ["Watchlist", "HIJAU", "Data/master/reference"], ["Discount Factor", "1", "Data/master/reference"]], "Financial & Capacity": [["EBITDA/Pengganti EBITDA", "1,938", "Data/master/reference"], ["Kredit Bank Lain", "12,010", "Data/master/reference"], ["Total Debt", "-", "Data/master/reference"], ["Borrowing Capacity", "15,523.38", "Data/master/reference"], ["Available BC", "(2,183.62)", "Data/master/reference"], ["Status Perhitungan", "-", "Data/master/reference"]], "Product Limit & Exposure": [["CL Bade", "500", "Data/master/reference"], ["CL Limit", "587", "Data/master/reference"], ["NCL Bade", "-", "Data/master/reference"], ["NCL Limit", "121", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Bade Treasury Line", "-", "Data/master/reference"], ["Total Limit Existing", "-", "Data/master/reference"], ["Total Bade Existing", "-", "Data/master/reference"]], "Master Limit": [["Master Limit Setting", "5,110", "Data/master/reference"], ["Master Limit", "5,818", "Data/master/reference"]]}}, "CIL": {"sheet": "CIL_Master", "key": "Insurance Company ID / Entity", "name": "Perusahaan Asuransi", "products": ["Nominal Pertanggungan"], "sections": {"Insurance Profile": [["No", "1", "Data/master/reference"], ["Perusahaan Asuransi", "PT Asuransi Tugu Pratama Indonesia Tbk", "Data/master/reference"], ["Jenis Perusahaan (Asuransi/Penjaminan)", "Asuransi", "Data/master/reference"], ["Jenis Produk Asuransi", "Asuransi Kredit", "Data/master/reference"]], "Capacity & Threshold": [["Insurance Capacity (IC) (Rp Juta)", "3,605,020,000", "Data/master/reference"], ["Multiplier Terpakai (%)", "3.00%", "Data/master/reference"], ["Consolidated Insurance Threshold (CIT) (Rp Juta)", "108,150,600", "Parameter monitoring"]], "BMRI": [["Nominal Pertanggungan BMRI 2025", "11,573,402.55", "Data/master/reference"], ["EIL BMRI", "60,093,270.28", "Data/master/reference"]], "Mandiri Taspen": [["Nominal Pertanggungan Mandiri Taspen 2025", "BUKAN REKANAN", "Data/master/reference"], ["EIL Mandiri Taspen", "26,999,429.42", "Data/master/reference"]], "MTF": [["Nominal Pertanggungan MTF 2025", "285,708.13", "Data/master/reference"], ["EIL MTF", "10,591,613.12", "Data/master/reference"]], "MUF": [["Nominal Pertanggungan MUF 2025", "21,313", "Data/master/reference"], ["EIL MUF", "10,129,963.92", "Data/master/reference"]], "Consolidated": [["Consolidated Insurance Limit (CIL) (Rp Juta)", "107,814,276.74", "Data/master/reference"], ["Total Nominal Pertanggungan All Entitas 2025 (Rp Juta)", "11,880,423.68", "Data/master/reference"], ["Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)", "13,060,790.52", "Data/master/reference"], ["Skor Akreditasi (PCP)", "79.38", "Data/master/reference"], ["Klasifikasi EWS (PCP)", "Monitoring", "Data/master/reference"]]}}, "LPG": {"sheet":"LPG_Loanportfolio","key":"Ecosystem LPG + Segmen LPG","name":"Ecosystem LPG","products":["CASHLOAN","NON CASH LOAN"],"sections":{"Identitas":[["No","1","Data/master/reference"],["Ecosystem LPG (Sektor)","BATUBARA","Data/master/reference"],["Segmen LPG","Corporate","Data/master/reference"]],"Bankwide Limit":[["Bankwide / Limit","65,140","Data/master/reference"],["Bankwide / Outstanding","Derived from CL + NCL debtor classification","Calculated"]],"Regional Limit":[["Region I / Limit","—","Data/master/reference"],["Region II / Limit","—","Data/master/reference"],["Region III / Limit","—","Data/master/reference"],["Region IV / Limit","—","Data/master/reference"],["Region V / Limit","—","Data/master/reference"],["Region VI / Limit","—","Data/master/reference"],["Region VII / Limit","—","Data/master/reference"],["Region VIII / Limit","—","Data/master/reference"],["Region IX / Limit","—","Data/master/reference"],["Region X / Limit","—","Data/master/reference"],["Region XI / Limit","—","Data/master/reference"],["Region XII / Limit","—","Data/master/reference"],["KP + OVS / Limit","—","Data/master/reference"]]}}};
const productFields={"CASHLOAN": ["no_cus", "nm_cus", "kd_cab", "nm_cab", "no_rek", "gas_reporting", "buc_reporting", "jns_krd", "src", "j_guna", "revolv", "bilokj", "total_limit", "total_bade", "project_location", "code", "MatDate/Jatem", "ecosystem_lpg", "segmen_lpg", "region_lpg", "unit_pengelola"], "NON CASH LOAN": ["NO", "MODULE", "Swift Code", "REPORTTYPE", "TRXREF", "RELREF", "CUSTID", "CUSTNM", "CPNM", "CPCNTY", "CPBK", "BKCNTRY", "Country Code", "Country Name", "Type of Judgment", "TRXTYPE", "CCY", "AMOUNT", "BALANCE", "EXCHANGERT", "EQVIDR", "FINTYPE", "TRXDATE", "DUEDATE", "SERVCODE", "SERVNM", "PCCD", "PCNM", "BUCD", "SOF", "INTRT", "ecosystem_lpg", "segmen_lpg", "region_lpg"], "COMMERCIAL LINE (CRDT)": ["No", "Nama", "Swift Code", "Swift Code Vlookup", "Code", "Aging Schedule RM", "Negara", "Bank", "RM", "Dept.", "BMFIR", "Fitch", "Moody's", "S&P", "Treasury DN", "Treasury DN Utilisasi", "Treasury LN", "Treasury LN Utilisasi", "Treasury Line Total", "Treasury Line Total Utilisasi", "Comm DN", "Comm DN Utilisasi", "Comm LN", "Comm LN Utilisasi", "Comm Line Total", "Comm Line Total Utilisasi", "Corporate Card", "Credit Line Total", "Credit Line Total Utilisasi"], "Investment Line": ["No", "Nama Bank", "Nama Entity (Scope Entity : AKK)", "Switftcode", "Jenis Invesment Line", "Amount Invesment Line", "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa"], "BONDS": ["Date", "Branch", "Securities Type", "Securities Name", "Issuer Name", "Issuer Country", "Issuer Type", "Portfolio", "CCY", "Amount", "Amount Eq. IDR Juta", "Maturity Date", "Coupon", "Potential P/L (Eq. IDR Juta)"], "NOSTRO": ["Year", "Branch", "SwfitCode", "Bank Name", "Bank Country", "CCY", "Balance", "FX Rate to IDR", "FX Rate Date", "Balance IDR"]};
const productSample={"Nominal Pertanggungan":{"No":"1","Perusahaan Asuransi":"PT Asuransi Tugu Pratama Indonesia Tbk","Jenis Prudk Asuransi":"Asuransi Kredit","Entitas":"BMRI","EIL Entitas (Rp Juta)":"60093270.28","Nominal Pertanggungan 2025 (Rp Juta)":"11573402.55","Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)":"13060790.52","Utilisasi EIL (%)":"21.73%","CIL (Rp Juta)":"107814276.74","CIT (Rp Juta)":"108150600","Utilisasi CIL (%)":"11.02%","% Utilisasi (Nominal Pertanggungan/CIL)":"10.74%","% Utilisasi Proyeksi (Nominal Pertanggungan/CIL)":"12.12%","Skor Akreditasi (PCP)":"79.38","Klasifikasi EWS (PCP)":"Monitoring","Status / Rekomendasi Action Plan":"Monitoring as usual / no specific action"},"CASHLOAN": {"no_cus": "16000000010", "nm_cus": "PURE SOURCE DAIRY FARM CO., LTD", "kd_cab": "60900", "nm_cab": "PT BANK MANDIRI SHANGHAI (CNY)", "no_rek": "6090100009393", "gas_reporting": "WHOLESALE CIB", "buc_reporting": "CB105", "jns_krd": "I-SYN-CNY", "src": "KLN", "j_guna": "KREDIT INVESTASI", "revolv": "N", "bilokj": "9999", "total_limit": "286035.62", "total_bade": "286035.62", "project_location": "China", "code": "CN", "MatDate/Jatem": "", "ecosystem_lpg":"BATUBARA", "segmen_lpg":"Commercial", "region_lpg":"Region V"}, "NON CASH LOAN": {"NO": "1", "MODULE": "EXCO", "Swift Code": "ANZB AU 3M", "REPORTTYPE": "Export Collection Financing", "TRXREF": "XC77126002607", "RELREF": "", "CUSTID": "16000005630", "CUSTNM": "PT. PABRIK KERTAS TJIWI KIMIA TBK", "CPNM": "KENSINGTON INTERNATIONAL LIMITED", "CPCNTY": "", "CPBK": "", "BKCNTRY": "", "Country Code": "HK", "Country Name": "Hong Kong", "Type of Judgment": "CPNM", "TRXTYPE": "D/A", "CCY": "USD", "AMOUNT": "24532.90", "BALANCE": "24532.90", "EXCHANGERT": "17310", "EQVIDR": "425000000", "FINTYPE": "DISCOUNT/REDISCOUNT", "TRXDATE": "07/04/2026", "DUEDATE": "02/10/2026", "SERVCODE": "77106", "SERVNM": "Trade Operation Export", "PCCD": "77106", "PCNM": "Trade Operation Export", "BUCD": "", "SOF": "T", "INTRT": "6.97", "ecosystem_lpg":"BATUBARA", "segmen_lpg":"Commercial", "region_lpg":"Region V"}, "COMMERCIAL LINE (CRDT)": {"No": "1", "Nama": "Australia and New Zealand Banking Group Limited", "Swift Code": "ANZB AU 3M", "Swift Code Vlookup": "ANZBAU3M", "Code": "AU", "Aging Schedule RM": "Raden Rizky Herfianda", "Negara": "Australia", "Bank": "Foreign", "RM": "2", "Dept.": "IFI", "BMFIR": "AA", "Fitch": "AA-", "Moody's": "Aa2", "S&P": "AA-", "Treasury DN": "50000", "Treasury DN Utilisasi": "1469.93", "Treasury LN": "140000", "Treasury LN Utilisasi": "0", "Treasury Line Total": "190000", "Treasury Line Total Utilisasi": "1469.93", "Comm DN": "775000", "Comm DN Utilisasi": "6618.77", "Comm LN": "35000", "Comm LN Utilisasi": "0", "Comm Line Total": "810000", "Comm Line Total Utilisasi": "6618.77", "Corporate Card": "0", "Credit Line Total": "1000000", "Credit Line Total Utilisasi": "8088.69"}, "Investment Line": {"No": "1", "Nama Bank": "ANZ", "Nama Entity (Scope Entity : AKK)": "DPBM", "Switftcode": "ANZxx", "Jenis Invesment Line": "Deposito", "Amount Invesment Line": "10000000000", "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa": ""}, "BONDS": {"Date": "30-Apr-26", "Branch": "Head Office", "Securities Type": "Fixed Rate", "Securities Name": "FR0037", "Issuer Name": "Indo Gov", "Issuer Country": "ID", "Issuer Type": "Government", "Portfolio": "Banking Book", "CCY": "IDR", "Amount": "585424000000", "Amount Eq. IDR Juta": "585424", "Maturity Date": "15-Sep-26", "Coupon": "12%", "Potential P/L (Eq. IDR Juta)": "0"}, "NOSTRO": {"Year": "Apr-26", "Branch": "Head Office", "SwfitCode": "FABIAEAA", "Bank Name": "FIRST ABU DABI BANK", "Bank Country": "AE", "CCY": "AED", "Balance": "26.64", "FX Rate to IDR": "4700", "FX Rate Date": "2026-04-30", "Balance IDR": "125208"}};
const integrationRuntimeSource={
  Country:{"CASHLOAN":"Big Data (adjusted Country)","NON CASH LOAN":"NTF -> Provided by DWB","CREDIT LINE":"Data Utilisasi Credit Line","BONDS":"Market Risk/Treasury","NOSTRO":"Internal Mandiri"},
  CCL:{"CASHLOAN":"Core Banking Limit System","NON CASH LOAN":"Core Banking Limit System","CREDIT LINE":"Core Banking Limit System"},
  MLK:{"CASHLOAN":"LIMAST","NON CASH LOAN":"LIMAST","CREDIT LINE":"LIMAST"},
  CIL:{"Nominal Pertanggungan":"CIL_MONITORING"},
  LPG:{"CASHLOAN":"Master Debitur / Master Cash Loan → LPG aggregation","NON CASH LOAN":"Master Debitur / Master NCL → LPG aggregation"}
};

const integrationTargets={
  Country:{
    "CASHLOAN":"Country Exposure = code; Booking Office = nm_cab; Domestic/Overseas = derived from booking-office reference",
    "NON CASH LOAN":"Country Exposure = Country Code; Booking Office source is not present in current schema; Domestic/Overseas requires reference/source",
    "CREDIT LINE":"Country Exposure = Code / Negara; Domestic = Commercial DN + Treasury DN; Overseas = Commercial LN + Treasury LN; no Booking Office enrichment required",
    "BONDS":"Country Exposure = Issuer Country; Booking Office source = Branch; Domestic/Overseas requires booking-office reference",
    "NOSTRO":"Country Exposure = Bank Country; Booking Office source = Branch; Balance is normalized to IDR using CCY + FX Rate to IDR + FX Rate Date"
},
  CCL:{"CASHLOAN":"Bank / Counterparty mapping","NON CASH LOAN":"Swift Code / Counterparty","CREDIT LINE":"Swift Code","Investment Line":"Swift Code / Entity"},
  MLK:{"CASHLOAN":"CIF","NON CASH LOAN":"CUSTID / CIF","CREDIT LINE":"CIF / Debtor mapping (Treasury scope)"},
  CIL:{"Nominal Pertanggungan":"Insurance Company + Entity"},
  LPG:{"CASHLOAN":"CIF → Ecosystem LPG / Segmen LPG / Scope Region","NON CASH LOAN":"CUSTID/CIF → Ecosystem LPG / Segmen LPG / Scope Region"}
};


/*
 * LIMAS DATA ARCHITECTURE
 * 1) Master Limit = approved/active limit master only.
 * 2) Product Universe = source/integration registry only.
 * 3) Product Utilization = runtime/read-model data integrated from source systems.
 * 4) Monitoring = Master Limit + Product Utilization.
 */
function getMasterSections(type){
  const s=domains[type]?.sections||{};
  if(type==="Country") return {
    "Identitas":s["Identitas"]||[],
    "Limit & Gap":s["Limit & Gap"]||[]
  };
  if(type==="CCL") return {"Bank Profile":s["Bank Profile"]||[],"Risk & Capacity":s["Risk & Capacity"]||[],"Limit":(s["Limit"]||[]).filter(([f])=>f!=="Utilisasi Capacity")};
  if(type==="MLK") return {"Profil Debitur":s["Profil Debitur"]||[],"Risk & Regulatory":s["Risk & Regulatory"]||[],"Financial & Capacity":s["Financial & Capacity"]||[],"Product Limit & Exposure":(s["Product Limit & Exposure"]||[]).filter(([f])=>!String(f).toLowerCase().includes("bade")),"Master Limit":s["Master Limit"]||[]};
  if(type==="CIL") return {
    "Insurance Profile":s["Insurance Profile"]||[],
    "Capacity & Threshold":s["Capacity & Threshold"]||[],
    "Entity Limit (EIL)":[
      ...(s["BMRI"]||[]).filter(([f])=>String(f).startsWith("EIL ")),
      ...(s["Mandiri Taspen"]||[]).filter(([f])=>String(f).startsWith("EIL ")),
      ...(s["MTF"]||[]).filter(([f])=>String(f).startsWith("EIL ")),
      ...(s["MUF"]||[]).filter(([f])=>String(f).startsWith("EIL "))
    ],
    "Consolidated Limit":(s["Consolidated"]||[]).filter(([f])=>String(f).startsWith("Consolidated Insurance Limit"))
  };
  if(type==="LPG") return {
    "Identitas":s["Identitas"]||[],
    "Bankwide Limit":[["Bankwide / Limit","—"]],
    "Regional Limit":LPG_REGIONAL_SCOPES.map(scope=>[scope+" / Limit","—"])
  };
  return s;
}

const domainDataContract={
  Country:{
    masterKey:"Country Code",
    masterObject:"Country",
    linkedProducts:["CASHLOAN","NON CASH LOAN","CREDIT LINE","BONDS","NOSTRO"],
    utilizationGrain:"Country Code + Product + Booking Office Type + Periode",
    masterDescription:"Country capacity limit + product allocation split Domestic/Overseas + adjustment/final limit. Domestic/Overseas is determined by Booking Office Type at product utilization level."
  },
  CCL:{
    masterKey:"Kode Bank / Swift Code",
    masterObject:"Counterparty Bank",
    linkedProducts:["CASHLOAN","NON CASH LOAN","CREDIT LINE"],
    utilizationGrain:"Bank / Swift Code + Periode",
    masterDescription:"Counterparty profile + risk/capacity basis + approved CCL / contractual limit."
  },
  MLK:{
    masterKey:"CIF",
    masterObject:"Holding → Sub-Group → Entitas → Debtor / CIF",
    linkedProducts:["CASHLOAN","NON CASH LOAN","CREDIT LINE"],
    utilizationGrain:"Holding / Sub-Group / Entitas / CIF + Periode",
    masterDescription:"Debtor master, regulatory capacity, facility/exposure split and approved Master Limit; monitoring is aggregated through Holding → Sub-Group → Entitas."
  },
  CIL:{
    masterKey:"Insurance Company ID / Entity",
    masterObject:"Insurance Company + Entity",
    linkedProducts:["Nominal Pertanggungan"],
    utilizationGrain:"Insurance Company + Entity + Periode",
    masterDescription:"Insurance capacity + CIT + EIL + consolidated CIL."
  },
  LPG:{
    masterKey:"Ecosystem LPG + Segmen LPG",
    masterObject:"Portfolio Guideline",
    linkedProducts:["CASHLOAN","NON CASH LOAN"],
    utilizationGrain:"Ecosystem LPG + Segmen LPG + Scope (Bankwide/Region/KP+OVS) + Periode",
    masterDescription:"Approved limit per Ecosystem LPG × Segmen LPG, dengan scope Bankwide, Region I–XII dan KP + OVS. Bankwide adalah aggregate monitoring, bukan tambahan exposure terpisah."
  }
};

const domainIntegrationProducts=Object.fromEntries(Object.entries(domainDataContract).map(([domain,cfg])=>[domain,cfg.linkedProducts]));
function integrationLabel(id){
  if(id==="CREDIT LINE") return "Credit Line (Commercial + Treasury)";
  const item=(typeof productMasterCatalog!=="undefined" ? productMasterCatalog.find(p=>p.id===id) : null);
  return item?.label||id;
}
const provenanceDefaults={
  Country:{description:"Master limit negara untuk monitoring exposure lintas produk.",source:"CPR / Risk Management",dataset:"COUNTRY_MONITORING",system:"LIMAS Working Data",period:E2E_DUMMY_META.period,owner:"CPR Risk Management",sourceNote:"Approved country limit dan data exposure hasil konsolidasi source product."},
  CCL:{description:"Master CCL dan contractual limit untuk monitoring counterparty serta exposure BMRI/PA.",source:"FIB Group + SISM Group",dataset:"CCL_MONITORING",system:"LIMAS Working Data",period:E2E_DUMMY_META.period,owner:"FIB / SISM",sourceNote:"BMRI data berasal dari FIB Group; data PA dikompilasi SISM sebelum monitoring."},
  MLK:{description:"Master Limit Kredit untuk monitoring CIF, Group Usaha dan konsolidasi entitas.",source:"CRA / SISM Group",dataset:"MLK_Master + MLK_Monitor",system:"LIMAS Working Data",period:E2E_DUMMY_META.period,owner:"CRA / SISM",sourceNote:"Master debtor data dan monitoring hierarchy dipisahkan. Master Limit Setting dan Master Limit Final adalah field berbeda; Limit Fasilitas dan Bade berasal dari facility/utilization aggregation. MLK konsolidasi adalah report-level metric dan tidak disamakan dengan debtor Master Limit."},
  CIL:{description:"Master CIL/EIL/CIT untuk monitoring kapasitas dan nominal pertanggungan asuransi.",source:"Risk Management / SISM",dataset:"CIL_Master",system:"LIMAS Working Data",period:E2E_DUMMY_META.period,owner:"Risk Management / SISM",sourceNote:"Insurance capacity, EIL, CIT dan exposure disimpan sebagai reference/provenance untuk monitoring."},
  LPG:{description:"Master LPG untuk monitoring konsentrasi sektor, segmen dan region.",source:"Risk Management / Business Unit",dataset:"LPG_Loanportfolio",system:"LIMAS Working Data",period:E2E_DUMMY_META.period,owner:"Risk Management",sourceNote:"Approved LPG limit disimpan per sektor × segmen dengan Bankwide, Region I–XII dan KP + OVS. Outstanding berasal dari CL/NCL pada level debitur; Bankwide diperlakukan sebagai aggregate/reconciliation value dan tidak dijumlahkan dengan regional."}
};
function loadMasterMeta(type){
  const key=`limas_master_meta_v1_${type}`;
  try{const saved=window.localStorage.getItem(key);if(saved)return JSON.parse(saved);}catch(e){}
  const d=provenanceDefaults[type]||{};
  return {description:d.description||"",source:d.source||"",dataset:d.dataset||"",system:d.system||"",period:d.period||"",owner:d.owner||"",sourceNote:d.sourceNote||"",status:"Active",effectiveDate:d.period||"",version:1,updatedBy:"Risk Management",lastUpdated:"Belum pernah disimpan"};
}
function saveMasterMeta(type,meta){try{window.localStorage.setItem(`limas_master_meta_v1_${type}`,JSON.stringify(meta));}catch(e){}}
function recordMetaKey(type,recordKey){return `limas_master_record_v1_${type}||${recordKey}`;}
function loadRecordMeta(type,recordKey){
  const fallback={version:1,status:"Active",effectiveDate:provenanceDefaults[type]?.period||"",expiryDate:"",approvedBy:"Risk Management",lastUpdated:"Belum pernah disimpan"};
  if(!recordKey)return fallback;
  try{const saved=window.localStorage.getItem(recordMetaKey(type,recordKey));if(saved)return {...fallback,...JSON.parse(saved)};}catch(e){}
  return fallback;
}
function saveRecordMeta(type,recordKey,meta){if(!recordKey)return;try{window.localStorage.setItem(recordMetaKey(type,recordKey),JSON.stringify(meta));}catch(e){}}

function defaultProductProvenance(type){
  const info=domains[type];
  return Object.fromEntries((domainIntegrationProducts[type]||[]).map(product=>[product,{product,dataset:sourceName(product),sourceKey:sourceKey(product),exposureField:sourceExposure(product),owner:provenanceDefaults[type]?.owner||"Risk Management"}]));
}
function loadProductMeta(type){
  const key=`limas_product_meta_v1_${type}`;
  try{const saved=window.localStorage.getItem(key);if(saved){const parsed=JSON.parse(saved);return Object.fromEntries((domainIntegrationProducts[type]||[]).map(product=>[product,{product,...(parsed[product]||{})}]));}}catch(e){}
  return defaultProductProvenance(type);
}
function saveProductMeta(type,meta){try{window.localStorage.setItem(`limas_product_meta_v1_${type}`,JSON.stringify(meta));}catch(e){}}
function nowLabel(){return new Intl.DateTimeFormat('id-ID',{dateStyle:'medium',timeStyle:'short'}).format(new Date());}

function lpgLeafRows(rows=limasDemoData?.LPG||[]){return rows;}
function lpgSectorTotalRows(){
  const groups={};
  lpgLeafRows().forEach(r=>{
    groups[r.sector]??={sector:r.sector,segment:"TOTAL SEKTOR",key:r.sector+"|TOTAL SEKTOR",limits:{},derived:true,dataQuality:"Derived"};
    LPG_SCOPES.forEach(scope=>{
      const v=lpgScopeLimit(r,scope);
      if(v!==null&&v!==undefined)groups[r.sector].limits[scope]=(groups[r.sector].limits[scope]||0)+Number(v||0);
    });
  });
  return Object.values(groups);
}
function lpgDisplayRows(){return [...lpgSectorTotalRows(),...lpgLeafRows()];}
function lpgScopeLimit(row,scope=LPG_BANK_SCOPE){if(!row)return null;return row.limits?.[scope]??(scope===LPG_BANK_SCOPE?row.limit??null:null);}
function lpgProductAttribute(r,field){return String(r?.data?.[field]??"").trim();}
function lpgProductClassification(r){
  const sector=lpgProductAttribute(r,"ecosystem_lpg"),segment=lpgProductAttribute(r,"segmen_lpg"),region=lpgProductAttribute(r,"region_lpg");
  return {sector,segment,region,classified:Boolean(sector&&segment)};
}
function lpgProductAmount(r){
  if(r.productId==="CASHLOAN")return Number(r.data?.total_bade)||0;
  if(r.productId==="NON CASH LOAN"){
    if(String(r.sourceSystem||"").startsWith("DWH")&&r.data?.CCY==="IDR")return Number(r.data?.BALANCE)||0;
    return (Number(r.data?.EQVIDR)||0)/1000000;
  }
  return 0;
}
function lpgProductApplicationsForKey(key){
  const out=[];
  ["CASHLOAN","NON CASH LOAN"].forEach(productId=>{
    const mappings=(productIntegrationMappings[productId]||[]).filter(a=>a.limitType==="LPG"&&String(a.key)===String(key));
    mappings.forEach(a=>{
      const r=(productDatabase[productId]||[]).find(x=>String(x.recordId)===String(a.recordId));
      if(!r)return;
      const normalized=normalizeAppliedAmount("LPG",productId,a.amount,r);
      out.push({
        ...a,productId,recordId:r.recordId,sourceSystem:r.sourceSystem,sourceData:r.data,
        amount:a.amount,normalizedAmount:normalized.amount,
        label:productId==="CASHLOAN"?"Cash Loan":"Non Cash Loan",
        scope:a.scope||null,entity:r.data?.nm_cus||r.data?.CUSTNM||"",
        exposureField:productId==="CASHLOAN"?"total_bade":"EQVIDR",
        transform:normalized.transform,sourceUnit:normalized.sourceUnit,targetUnit:normalized.targetUnit,
        masterMatch:(limasDemoData.LPG||[]).some(m=>String(m.key)===String(a.key))
      });
    });
  });
  return out;
}
function lpgRawProductApps(row,scope){
  if(!row)return [];
  const rows=row.segment==="TOTAL SEKTOR"?lpgLeafRows().filter(x=>x.sector===row.sector):[row];
  const apps=rows.flatMap(x=>lpgProductApplicationsForKey(x.key));
  return scope===LPG_BANK_SCOPE ? apps : apps.filter(a=>a.scope===scope);
}
function lpgScopeProductExposure(row,scope){
  const apps=lpgRawProductApps(row,scope);
  return {amount:apps.reduce((a,x)=>a+(Number(x.amount)||0),0),apps};
}
function lpgScopeExposure(row,scope=LPG_BANK_SCOPE){
  const product=lpgScopeProductExposure(row,scope);
  return product.apps.length?product.amount:null;
}
function lpgScopeSource(row,scope=LPG_BANK_SCOPE){
  return lpgScopeProductExposure(row,scope).apps.length?"Product Feed":"No Product Data";
}
function lpgScopeUtil(row,scope){
  const lim=lpgScopeLimit(row,scope),exp=lpgScopeExposure(row,scope);
  return lim&&exp!==null?exp/lim:null;
}
function lpgMaxUtilization(row){return Math.max(...LPG_SCOPES.map(scope=>lpgScopeUtil(row,scope)).filter(v=>v!==null),0);}
function lpgExceptionScope(row){
  return LPG_SCOPES.map(scope=>({scope,util:lpgScopeUtil(row,scope)})).filter(x=>x.util!==null).sort((a,b)=>b.util-a.util)[0]||null;
}
function lpgCrosscheck(row){
  const bw=lpgScopeExposure(row,LPG_BANK_SCOPE);
  const regional=LPG_REGIONAL_SCOPES.map(scope=>lpgScopeExposure(row,scope)).filter(v=>v!==null);
  if(bw===null)return {status:"Pending",variance:null,mode:"Bankwide product data belum tersedia"};
  if(regional.length===0)return {status:"Pending",variance:null,mode:"Regional product data belum tersedia"};
  const sum=regional.reduce((a,v)=>a+v,0),variance=bw-sum;
  return {status:Math.abs(variance)<0.01?"Match":"Selisih",variance,mode:"Product Feed"};
}
function lpgSourceCoverage(row){
  const targetSegments=row.segment==="TOTAL SEKTOR"?lpgLeafRows().filter(x=>x.sector===row.sector).map(x=>x.segment):[row.segment];
  const classified=Object.values(productDatabase).flat().filter(r=>{
    const c=lpgProductClassification(r);
    return ["CASHLOAN","NON CASH LOAN"].includes(r.productId)&&c.classified&&c.sector===row.sector&&targetSegments.includes(c.segment);
  });
  const regionalMapped=LPG_REGIONAL_SCOPES.filter(scope=>classified.some(r=>lpgProductClassification(r).region===scope)).length;
  const bankwideMapped=classified.length>0;
  return {bankwideMapped,regionalMapped,totalRegional:LPG_REGIONAL_SCOPES.length,classifiedRecords:classified.length};
}
function lpgBankwideReconciliation(row){
  const product=lpgScopeProductExposure(row,LPG_BANK_SCOPE);
  return {status:product.apps.length?"Product Derived":"No Product Data",variance:null,product:product.apps.length?product.amount:null};
}

const limasDemoData={
  Country:[
    {key:"AE",name:"United Arab Emirates",statusMaster:"Exist",capacityLimit:35941.00087486457,masterLimit:35941.00087486457,capacityDistribution:{domesticLimit:null,overseasLimit:null},productAllocations:{},formulasi:"New",diputus:"New",dataQuality:"Normal"},
    {key:"AU",name:"Australia",statusMaster:"Exist",capacityLimit:41718.775509510284,masterLimit:41718.775509510284,capacityDistribution:{domesticLimit:null,overseasLimit:null},productAllocations:{},formulasi:510,diputus:565990,dataQuality:"Normal"},
    {key:"AT",name:"Austria",statusMaster:"Exist",capacityLimit:35259.186470317814,masterLimit:35259.186470317814,capacityDistribution:{domesticLimit:null,overseasLimit:null},productAllocations:{},formulasi:300,diputus:509391,dataQuality:"Normal"},
    {key:"BE",name:"Belgium",statusMaster:"Exist",capacityLimit:43116.7740055139,masterLimit:43116.7740055139,capacityDistribution:{domesticLimit:null,overseasLimit:null},productAllocations:{},formulasi:250,diputus:396193,dataQuality:"Normal"},
    {key:"CN",name:"China",statusMaster:"Exist",capacityLimit:260032.3771028455,masterLimit:260032.3771028455,capacityDistribution:{domesticLimit:null,overseasLimit:null},productAllocations:{},formulasi:"New",diputus:"New",dataQuality:"Normal"},
    {key:"HK",name:"Hong Kong",statusMaster:"Exist",capacityLimit:40000,masterLimit:40000,capacityDistribution:{domesticLimit:null,overseasLimit:null},productAllocations:{},formulasi:"New",diputus:"New",dataQuality:"Normal"}
  ],
  CCL:[
    {key:"ANZBAU3M",name:"Australia and New Zealand Banking Group Limited",category:"Asing",country:"Australia",countryRating:"A+",bobot:0.55,rating:"AA-",position:"31/12/2023",ratingIndex:0.9023,inhouse:68498,tier1:403594,capacity:200289.57641,adjusted:68498,globalParent:"—",top200:"—",ccl:500,contractual:500.026,dataQuality:"Normal"},
    {key:"ABNANL2A",name:"ABN Amro Bank NV",category:"Asing",country:"Netherlands",countryRating:"AAA",bobot:0.55,rating:"AA-",position:"31/12/2023",ratingIndex:0.9023,inhouse:68498,tier1:403594,capacity:200289.57641,adjusted:68498,globalParent:"—",top200:"—",ccl:500,contractual:500.026,dataQuality:"Normal"},
    {key:"ADCB",name:"Abu Dhabi Commercial Bank PJSC",category:"Asing",country:"UAE",countryRating:"AA",bobot:0.55,rating:"AA",position:"31/12/2023",ratingIndex:0.9265,inhouse:68498,tier1:269633,capacity:137398.235975,adjusted:68498,globalParent:"—",top200:"—",ccl:49,contractual:25.04,dataQuality:"Normal"},
    {key:"ADIB",name:"Abu Dhabi Islamic",category:"Asing",country:"UAE",countryRating:"AA",bobot:0.55,rating:"BBB",position:"31/12/2022",ratingIndex:0.7882,inhouse:68498,tier1:105885,capacity:45902.20635,adjusted:45902.20635,globalParent:"—",top200:"—",ccl:0,contractual:0,dataQuality:"Normal"},
    {key:"AGRICN",name:"Agricultural Bank of China Limited",category:"Asing",country:"China",countryRating:"A+",bobot:0.55,rating:"AA",position:"31/12/2023",ratingIndex:0.9265,inhouse:68498,tier1:6853801,capacity:3492525.644575,adjusted:68498,globalParent:"—",top200:"—",ccl:2000,contractual:1700.1335294117648,dataQuality:"Normal"},
    {key:"AGRICD",name:"Agricultural Development Bank of China",category:"Asing",country:"China",countryRating:"A+",bobot:0.55,rating:"AA",position:"31/12/2023",ratingIndex:0.9265,inhouse:68498,tier1:6812368,capacity:3471412.4236,adjusted:68498,globalParent:"—",top200:"—",ccl:200,contractual:200,dataQuality:"Normal"}
  ],
  MLK:[
    {key:"4000264485",name:"DJARUM",group:"DJARUM GROUP",groupUsahaHolding:"DJARUM GROUP",subGroup:"DJARUM GROUP",entity:"BMRI",unitKerja:"CB6",bumnSwasta:"Swasta",tier:"B",
      bmpkKonsol:67204,inhouseLimitKonsol:60484,bmpkEntitas:55993,inhouseLimitEntitas:50394,sektorDC:"INDUSTRI ROKOK",dcSectoral:3,rating:"A+",ratingMultiplier:2.67,watchlist:"HIJAU",discountFactor:1,
      ebitda:1938,kreditBankLain:12010,totalDebt:null,borrowingCapacity:15523.38,availableBC:-2183.62,statusPerhitungan:null,
      clBade:500,clLimit:587,nclBade:0,nclLimit:121,treasuryLine:0,badeTreasuryLine:1938,totalLimitExisting:708,totalBadeExisting:2438,
      masterLimitSetting:5110,masterLimit:5818,dataQuality:"Normal"},
    {key:"1000145694",name:"ANEKA TAMBANG",group:"ANTAM GROUP",groupUsahaHolding:"ANTAM GROUP",subGroup:"ANTAM GROUP",entity:"BMRI",unitKerja:null,bumnSwasta:"BUMN",tier:"A",
      bmpkKonsol:null,inhouseLimitKonsol:null,bmpkEntitas:null,inhouseLimitEntitas:null,sektorDC:null,dcSectoral:null,rating:null,ratingMultiplier:null,watchlist:null,discountFactor:null,
      ebitda:null,kreditBankLain:null,totalDebt:null,borrowingCapacity:null,availableBC:null,statusPerhitungan:null,
      clBade:null,clLimit:null,nclBade:null,nclLimit:null,treasuryLine:0,badeTreasuryLine:0,totalLimitExisting:912,totalBadeExisting:null,
      masterLimitSetting:718,masterLimit:13280,dataQuality:"Normal"},
    {key:"1000145695",name:"ANTAM RESOURCINDO",group:"ANTAM GROUP",groupUsahaHolding:"ANTAM GROUP",subGroup:"ANTAM GROUP",entity:"BMRI",unitKerja:null,bumnSwasta:"BUMN",tier:"A",
      bmpkKonsol:null,inhouseLimitKonsol:null,bmpkEntitas:null,inhouseLimitEntitas:null,sektorDC:null,dcSectoral:null,rating:null,ratingMultiplier:null,watchlist:null,discountFactor:null,
      ebitda:null,kreditBankLain:null,totalDebt:null,borrowingCapacity:null,availableBC:null,statusPerhitungan:null,
      clBade:null,clLimit:null,nclBade:null,nclLimit:null,treasuryLine:0,badeTreasuryLine:0,totalLimitExisting:0,totalBadeExisting:null,
      masterLimitSetting:null,masterLimit:20,dataQuality:"Normal"},
    {key:"16000486963",name:"TUNAS MOBILINDO PERKASA",group:"ASTRA GROUP",groupUsahaHolding:"ASTRA GROUP",subGroup:"ASTRA GROUP",entity:"BMRI",unitKerja:null,bumnSwasta:"Swasta",tier:"A",
      bmpkKonsol:null,inhouseLimitKonsol:null,bmpkEntitas:null,inhouseLimitEntitas:null,sektorDC:null,dcSectoral:null,rating:null,ratingMultiplier:null,watchlist:null,discountFactor:null,
      ebitda:null,kreditBankLain:null,totalDebt:null,borrowingCapacity:null,availableBC:null,statusPerhitungan:null,
      clBade:null,clLimit:0,nclBade:null,nclLimit:0,treasuryLine:0,badeTreasuryLine:0,totalLimitExisting:0,totalBadeExisting:null,
      masterLimitSetting:314,masterLimit:314,dataQuality:"Normal"},
    {key:"20000474637",name:"TUNAS RIDEAN",group:"ASTRA GROUP",groupUsahaHolding:"ASTRA GROUP",subGroup:"ASTRA GROUP",entity:"BMRI",unitKerja:null,bumnSwasta:"Swasta",tier:"A",
      bmpkKonsol:null,inhouseLimitKonsol:null,bmpkEntitas:null,inhouseLimitEntitas:null,sektorDC:null,dcSectoral:null,rating:null,ratingMultiplier:null,watchlist:null,discountFactor:null,
      ebitda:null,kreditBankLain:null,totalDebt:null,borrowingCapacity:null,availableBC:null,statusPerhitungan:null,
      clBade:null,clLimit:150,nclBade:null,nclLimit:0,treasuryLine:0,badeTreasuryLine:262,totalLimitExisting:20,totalBadeExisting:null,
      masterLimitSetting:1015,masterLimit:1035,dataQuality:"Normal"}
  ],
  CIL:[
    {key:"TUGU",name:"PT Asuransi Tugu Pratama Indonesia Tbk",type:"Asuransi",ic:3605020000,multiplier:0.03,cit:108150600,cil:107814276.74,eils:{BMRI:60093270.28,"Mandiri Taspen":26999429.42,MTF:10591613.12,MUF:10129963.92},score:79.38,dataQuality:"Normal",action:"Monitoring as usual / no specific action"},
    {key:"PLN-INS",name:"PT Asuransi Perisai Listrik Nasional",type:"Asuransi",ic:799280000,multiplier:0.015,cit:11989200,cil:11950003.75,eils:{BMRI:6660665.24,"Mandiri Taspen":2992584.03,MTF:1173961.56,MUF:1122792.92},score:57.75,dataQuality:"Normal",action:"Switching Limit"},
    {key:"ASKRIDA",name:"PT Asuransi Bangun Askrida",type:"Asuransi",ic:1544045714.2857144,multiplier:0.015,cit:23160685.714285716,cil:23080742.88,eils:{BMRI:12864690.67,"Mandiri Taspen":5780003.42,MTF:2267439.03,MUF:2168609.76},score:34.25,dataQuality:"Normal",action:"Monitoring as usual / no specific action"},
    {key:"AKRINDO",name:"PT Asuransi Kredit Indonesia",type:"Asuransi",ic:3086548421.052632,multiplier:0.03,cit:92596452.63157895,cil:92620921.35,eils:{BMRI:51624833.26,"Mandiri Taspen":23194627.88,MTF:9099026.54,MUF:8702433.67},score:60.63,dataQuality:"Normal",action:"Monitoring as usual / no specific action"}
  ],
  LPG:[
    {key:"BATUBARA|Corporate",sector:"BATUBARA",segment:"Corporate",
      limits:{Bankwide:65140,"Region I":0,"Region II":0,"Region III":0,"Region IV":0,"Region V":0,"Region VI":0,"Region VII":0,"Region VIII":0,"Region IX":0,"Region X":0,"Region XI":0,"Region XII":0,"KP + OVS":65140},
      dataQuality:"Normal"},
    {key:"BATUBARA|Commercial",sector:"BATUBARA",segment:"Commercial",
      limits:{Bankwide:35949,"Region I":362,"Region II":843,"Region III":985,"Region IV":639,"Region V":1579,"Region VI":0,"Region VII":0,"Region VIII":340,"Region IX":4174,"Region X":42,"Region XI":0,"Region XII":0,"KP + OVS":26984},
      dataQuality:"Normal"},
    {key:"BATUBARA|Sme",sector:"BATUBARA",segment:"Sme",
      limits:{Bankwide:4286,"Region I":84,"Region II":357,"Region III":266,"Region IV":57,"Region V":466,"Region VI":230,"Region VII":20,"Region VIII":42,"Region IX":2634,"Region X":100,"Region XI":17,"Region XII":0,"KP + OVS":11},
      dataQuality:"Normal"},
    {key:"BATUBARA|Micro",sector:"BATUBARA",segment:"Micro",
      limits:{Bankwide:7,"Region I":0,"Region II":2,"Region III":0,"Region IV":0,"Region V":0,"Region VI":0,"Region VII":0,"Region VIII":0,"Region IX":0,"Region X":0,"Region XI":0,"Region XII":0,"KP + OVS":0},
      dataQuality:"Normal"},
    {key:"ENERGI & AIR|Corporate",sector:"ENERGI & AIR",segment:"Corporate",limits:{Bankwide:123949},dataQuality:"Source bankwide only"},
    {key:"ENERGI & AIR|Commercial",sector:"ENERGI & AIR",segment:"Commercial",limits:{Bankwide:33854},dataQuality:"Source bankwide only"},
    {key:"FARMASI & KESEHATAN|Corporate",sector:"FARMASI & KESEHATAN",segment:"Corporate",limits:{Bankwide:24600},dataQuality:"Source bankwide only"}
  ]
};

// Prototype allocation policy: until user-approved allocation data is available,
// Country Capacity is distributed 35% Domestic / 65% Overseas.
// Product mix is Cash Loan 35%, NCL 25%, Credit Line 20%, Bonds 12%, Nostro 8%.
// The same policy is applied consistently to every demo Country so all screens reconcile.
const COUNTRY_PROTO_POLICY = {
  domesticShare: 0.35,
  overseasShare: 0.65,
  products: [
    ["CASHLOAN", 0.35],
    ["NON CASH LOAN", 0.25],
    ["CREDIT LINE", 0.20],
    ["BONDS", 0.12],
    ["NOSTRO", 0.08]
  ]
};
function hydrateCountryPrototypeAllocations(){
  (limasDemoData.Country||[]).forEach(row=>{
    const capacity=Number(row.capacityLimit)||0;
    const domesticCapacity=capacity*COUNTRY_PROTO_POLICY.domesticShare;
    const overseasCapacity=capacity*COUNTRY_PROTO_POLICY.overseasShare;
    row.capacityDistribution={
      domesticLimit:Number(domesticCapacity.toFixed(2)),
      overseasLimit:Number(overseasCapacity.toFixed(2))
    };
    const allocations={};
    let allocatedDomestic=0,allocatedOverseas=0;
    COUNTRY_PROTO_POLICY.products.forEach(([product,share],index)=>{
      const isLast=index===COUNTRY_PROTO_POLICY.products.length-1;
      const total=isLast?Number((capacity-Object.values(allocations).reduce((s,x)=>s+x.total,0)).toFixed(2)):Number((capacity*share).toFixed(2));
      const domestic=isLast?Number((domesticCapacity-allocatedDomestic).toFixed(2)):Number((total*COUNTRY_PROTO_POLICY.domesticShare).toFixed(2));
      const overseas=isLast?Number((overseasCapacity-allocatedOverseas).toFixed(2)):Number((total-domestic).toFixed(2));
      allocations[product]={domesticLimit:domestic,overseasLimit:overseas,total};
      allocatedDomestic+=domestic; allocatedOverseas+=overseas;
    });
    row.productAllocations=allocations;
  });
}
hydrateCountryPrototypeAllocations();

function demoProductLabel(p){
  if(p==="CASHLOAN")return "Cash Loan";
  if(p==="NON CASH LOAN")return "Non Cash Loan";
  if(p==="CREDIT LINE|Commercial")return "Credit Line • Commercial Line";
  if(p==="CREDIT LINE|Treasury")return "Credit Line • Treasury Line";
  if(p==="TREASURY LINE")return "Credit Line • Treasury Line";
  if(p==="NOSTRO")return "Nostro";
  if(p==="Nominal Pertanggungan")return "Nominal Pertanggungan";
  return p;
}
function productTotal(products){return Object.values(products||{}).reduce((a,v)=>a+(Number(v)||0),0)}
function countryCreditLineSplit(apps){
  const n=v=>Number(String(v??"").replace(/,/g,""))||0;
  return apps.filter(x=>x.productId==="CREDIT LINE").reduce((a,x)=>{
    const d=x.sourceData||{};
    a.domestic += n(d["Comm DN Utilisasi"])+n(d["Treasury DN Utilisasi"]);
    a.overseas += n(d["Comm LN Utilisasi"])+n(d["Treasury LN Utilisasi"]);
    return a;
  },{domestic:0,overseas:0});
}
function countryBookingExposure(row,bookingType){
  const apps=productApplicationsFor("Country",row.key);
  const cl=countryCreditLineSplit(apps);
  const other=apps.filter(x=>x.productId!=="CREDIT LINE"&&x.bookingOfficeType===bookingType)
    .reduce((a,x)=>a+(Number(x.amount)||0),0);
  return other + (bookingType==="Domestic"?cl.domestic:bookingType==="Overseas"?cl.overseas:0);
}
function countryBookingCoverage(row){
  const apps=productApplicationsFor("Country",row.key);
  const cl=countryCreditLineSplit(apps);
  const otherTotal=apps.filter(x=>x.productId!=="CREDIT LINE").reduce((a,x)=>a+(Number(x.amount)||0),0);
  const otherMapped=apps.filter(x=>x.productId!=="CREDIT LINE"&&x.bookingOfficeType!=="Needs Mapping").reduce((a,x)=>a+(Number(x.amount)||0),0);
  const otherUnmapped=apps.filter(x=>x.productId!=="CREDIT LINE"&&x.bookingOfficeType==="Needs Mapping").reduce((a,x)=>a+(Number(x.amount)||0),0);
  return {total:otherTotal+cl.domestic+cl.overseas,mapped:otherMapped+cl.domestic+cl.overseas,unmapped:otherUnmapped};
}
function countryProductMonitoring(row){
  const allocation=countryAllocationMetrics(row);
  const apps=productApplicationsFor("Country",row.key);
  return allocation.items.map(item=>{
    const productApps=apps.filter(a=>a.productId===item.product);
    let domestic=0,overseas=0;
    if(item.product==="CREDIT LINE"){
      const cl=countryCreditLineSplit(productApps);
      domestic=cl.domestic; overseas=cl.overseas;
    }else{
      domestic=productApps.filter(a=>a.bookingOfficeType==="Domestic").reduce((s,a)=>s+(Number(a.amount)||0),0);
      overseas=productApps.filter(a=>a.bookingOfficeType==="Overseas").reduce((s,a)=>s+(Number(a.amount)||0),0);
    }
    const exposure=domestic+overseas;
    return {
      ...item,domesticExposure:domestic,overseasExposure:overseas,exposure,
      domesticUtil:item.domestic?domestic/item.domestic:null,
      overseasUtil:item.overseas?overseas/item.overseas:null,
      productUtil:item.total?exposure/item.total:null
    };
  });
}
function countryMaxUtilization(row){
  const metrics=countryProductMonitoring(row);
  const countryUtil=recordLimit("Country",row)?recordExposure("Country",row)/recordLimit("Country",row):0;
  return Math.max(countryUtil,...metrics.flatMap(x=>[x.productUtil||0,x.domesticUtil||0,x.overseasUtil||0]));
}
function recordExposure(type,row){
  if(type==="LPG")return Number(lpgScopeExposure(row,LPG_BANK_SCOPE)||0);
  return productApplicationsFor(type,row.key).reduce((a,x)=>a+(Number(x.normalizedAmount??x.amount)||0),0);
}
function recordLimit(type,row){
  if(type==="Country")return Number(row.capacityLimit)||0;
  if(type==="CCL")return (Number(row.ccl)||0)*1000;
  if(type==="MLK")return Number(row.masterLimit)||0;
  if(type==="CIL")return Number(row.cil)||0;
  if(type==="LPG")return Number(lpgScopeLimit(row,LPG_BANK_SCOPE)||0);
  return Number(row.limit)||0;
}
function recordUtil(type,row){const limit=recordLimit(type,row),exp=recordExposure(type,row);return limit?exp/limit:0}
function recordStatus(type,row){
  if(String(row.dataQuality||"Normal").startsWith("Missing"))return "Data Issue";
  const u=recordUtil(type,row);
  let maxUtil=type==="Country"?countryMaxUtilization(row):u;

  if(type==="CCL"){
    const contractualLimit=Number(row.contractual||0)*1000;
    const contractualUtil=contractualLimit?recordExposure(type,row)/contractualLimit:0;
    maxUtil=Math.max(u,contractualUtil);
  }

  if(type==="CIL"){
    const apps=productApplicationsFor("CIL",row.key);
    const entityTotals={};
    apps.forEach(a=>{
      const e=a.entity||"Entity";
      entityTotals[e]=(entityTotals[e]||0)+(Number(a.normalizedAmount??a.amount)||0);
    });
    let maxEil=0;
    Object.entries(entityTotals).forEach(([entity,amount])=>{
      const eil=Number(row.eils?.[entity]||0);
      if(eil>0)maxEil=Math.max(maxEil,amount/eil);
    });
    const cit=Number(row.cit||0);
    const citUtil=cit?recordExposure(type,row)/cit:0;
    maxUtil=Math.max(maxUtil,maxEil,citUtil);
  }

  if(type==="LPG"){
    const bankwideExposure=lpgScopeExposure(row,LPG_BANK_SCOPE);
    if(bankwideExposure===null)return "Data Issue";
    maxUtil=lpgMaxUtilization(row);
  }

  if(reconciliationIssues().some(x=>x.status==="Data Issue"&&x.limitType===type&&String(x.key)===String(row.key)))return "Data Issue";
  return maxUtil>=1?"Breach":maxUtil>=0.8?"Warning":"Normal";
}
function cilProjection(key){
  return productApplicationsFor("CIL",key).reduce((a,x)=>{
    const entity=x.entity||"";
    const factor=entity==="BMRI"?1.10:1.075;
    return a+(Number(x.amount)||0)*factor;
  },0);
}
function mlkNum(v){return v===null||v===undefined||v===""?null:Number(v);}
function mlkSum(rows,field){const vals=rows.map(r=>mlkNum(r[field])).filter(v=>v!==null&&Number.isFinite(v));return vals.length?vals.reduce((a,v)=>a+v,0):null;}
function mlkFacilityMetrics(row){
  const p=productContributionMap("MLK",row.key);
  const clLimit=mlkNum(row.clLimit),nclLimit=mlkNum(row.nclLimit),treasuryLimit=mlkNum(row.treasuryLine)??0;
  const clBade=mlkNum(p.CASHLOAN)??0;
  const nclBade=mlkNum(p["NON CASH LOAN"])??0;
  const treasuryBade=mlkNum(p["CREDIT LINE|Treasury"])??0;
  const totalLimitExisting=mlkNum(row.totalLimitExisting) ?? (clLimit!==null&&nclLimit!==null?clLimit+nclLimit+treasuryLimit:null);
  const totalBadeExisting=clBade+nclBade+treasuryBade;
  return {clLimit,nclLimit,treasuryLimit,clBade,nclBade,treasuryBade,totalLimitExisting,totalBadeExisting};
}
function mlkMonitoringRows(rows){
  const out=[];
  rows.forEach(r=>{
    const f=mlkFacilityMetrics(r),bmpkKonsol=mlkNum(r.bmpkKonsol),bmpkEntitas=mlkNum(r.bmpkEntitas),borrowing=mlkNum(r.borrowingCapacity),masterLimit=mlkNum(r.masterLimit),setting=mlkNum(r.masterLimitSetting);
    out.push({no:out.length+1,tier:r.tier,holding:r.groupUsahaHolding||r.group,subGroup:r.subGroup||r.group,flag:r.bumnSwasta,unit:r.unitKerja,entity:r.entity,bmpkKonsol,bmpkEntitas,limitFasilitas:f.totalLimitExisting,bade:f.totalBadeExisting,borrowing,masterLimit,masterLimitSetting:setting,mlk:null,utilBade:f.totalLimitExisting?f.totalBadeExisting/f.totalLimitExisting:null,utilFacilityBmpk:bmpkEntitas&&f.totalLimitExisting?f.totalLimitExisting/bmpkEntitas:null,utilMlkBmpk:null,debtors:1,totalBmpk:bmpkEntitas,totalMaster:masterLimit,totalBorrowing:borrowing,variance:null,status:recordStatus("MLK",r),cif:r.key,name:r.name,products:productContributionMap("MLK",r.key),rowType:"Debtor"});
  });
  const groups=new Map();
  rows.forEach(r=>{const h=r.groupUsahaHolding||r.group||"—";if(!groups.has(h))groups.set(h,[]);groups.get(h).push(r);});
  groups.forEach((members,holding)=>{
    const totalMaster=mlkSum(members,"masterLimit"),totalBorrowing=mlkSum(members,"borrowingCapacity"),totalBmpk=mlkSum(members,"bmpkEntitas");
    const facility=members.map(mlkFacilityMetrics).map(x=>x.totalLimitExisting).filter(v=>v!==null).reduce((a,v)=>a+v,0);
    const bade=members.map(mlkFacilityMetrics).reduce((a,x)=>a+(x.totalBadeExisting||0),0);
    out.push({no:out.length+1,tier:"—",holding,subGroup:"Sub-total Group",flag:members[0]?.bumnSwasta||"—",unit:"—",entity:"Sub-total Group",bmpkKonsol:mlkSum(members,"bmpkKonsol"),bmpkEntitas:totalBmpk,limitFasilitas:facility,bade,borrowing:totalBorrowing,masterLimit:null,masterLimitSetting:null,mlk:null,utilBade:facility?bade/facility:null,utilFacilityBmpk:totalBmpk?facility/totalBmpk:null,utilMlkBmpk:null,debtors:members.length,totalBmpk:totalBmpk,totalMaster:totalMaster,totalBorrowing:totalBorrowing,variance:null,status:"Normal",cif:"—",name:"—",products:{},rowType:"Sub-total Group"});
  });
  return out;
}
function buildReportDummy(data){
  return {
    Country:data.Country.map((r,i)=>{const p=productContributionMap("Country",r.key),exp=recordExposure("Country",r),totalLimits=limasDemoData.Country.reduce((a,x)=>a+(Number(x.capacityLimit??x.masterLimit)||0),0),share=totalLimits?(Number(r.capacityLimit??r.masterLimit)||0)/totalLimits:0,a=countryAllocationMetrics(r);return {no:i+1,country:r.name,code:r.key,statusMaster:r.statusMaster,cl:p.CASHLOAN?"v":"-",ncl:p["NON CASH LOAN"]?"v":"-",com:p["CREDIT LINE|Commercial"]?"v":"-",trs:p["CREDIT LINE|Treasury"]?"v":"-",bond:p.BONDS?"v":"-",nos:p.NOSTRO?"v":"-",expCl:p.CASHLOAN||0,expNcl:p["NON CASH LOAN"]||0,expCom:p["CREDIT LINE|Commercial"]||0,expTrs:p["CREDIT LINE|Treasury"]||0,expBond:p.BONDS||0,expNos:p.NOSTRO||0,total:exp,domestic:countryBookingExposure(r,"Domestic"),overseas:countryBookingExposure(r,"Overseas"),unmapped:countryBookingExposure(r,"Needs Mapping"),capacity:r.capacityLimit,capacityDomestic:a.domesticCapacity,capacityOverseas:a.overseasCapacity,allocatedCapacity:a.allocated,unallocatedCapacity:a.unallocated,clDomesticLimit:a.items.find(x=>x.product==="CASHLOAN")?.domestic,clOverseasLimit:a.items.find(x=>x.product==="CASHLOAN")?.overseas,clTotalLimit:a.items.find(x=>x.product==="CASHLOAN")?.total,nclDomesticLimit:a.items.find(x=>x.product==="NON CASH LOAN")?.domestic,nclOverseasLimit:a.items.find(x=>x.product==="NON CASH LOAN")?.overseas,nclTotalLimit:a.items.find(x=>x.product==="NON CASH LOAN")?.total,comDomesticLimit:a.items.find(x=>x.product==="CREDIT LINE")?.domestic,comOverseasLimit:a.items.find(x=>x.product==="CREDIT LINE")?.overseas,comTotalLimit:a.items.find(x=>x.product==="CREDIT LINE")?.total,bondDomesticLimit:a.items.find(x=>x.product==="BONDS")?.domestic,bondOverseasLimit:a.items.find(x=>x.product==="BONDS")?.overseas,bondTotalLimit:a.items.find(x=>x.product==="BONDS")?.total,nosDomesticLimit:a.items.find(x=>x.product==="NOSTRO")?.domestic,nosOverseasLimit:a.items.find(x=>x.product==="NOSTRO")?.overseas,nosTotalLimit:a.items.find(x=>x.product==="NOSTRO")?.total,formulasi:r.formulasi,diputus:r.diputus,limit:r.capacityLimit,pct:share,status:recordStatus("Country",r)}}),
    CCL:data.CCL.map((r,i)=>{const p=productContributionMap("CCL",r.key),exp=recordExposure("CCL",r);return {no:i+1,bank:r.name,category:r.category,country:r.country,countryRating:r.countryRating,bobot:r.bobot,rating:r.rating,position:r.position,ratingIndex:r.ratingIndex,inhouse:r.inhouse,tier1:r.tier1,capacity:r.capacity,adjusted:r.adjusted,globalParent:r.globalParent,top200:r.top200,ccl:r.ccl,cclCapacity:r.capacity? r.ccl/r.capacity:0,limit:r.contractual,outstanding:exp,jenis:"Direct",bmriTotal:exp,bmriLoan:p.CASHLOAN||0,bmriCom:p["CREDIT LINE|Commercial"]||0,bmriTrs:p["CREDIT LINE|Treasury"]||0,bmriUtil:r.ccl?exp/(r.ccl*1000):0,contractualUtil:r.contractual?exp/(r.contractual*1000):0,maxOutstanding:exp,maxContractualUtil:r.contractual?exp/r.contractual:0,paTotal:0,paLoan:0,paCom:0,paTrs:0,paUtil:0,paContractualUtil:0,paMaxOutstanding:0,paMaxContractualUtil:0,status:recordStatus("CCL",r)}}),
    MLK:mlkMonitoringRows(data.MLK),
    CIL:data.CIL.map((r,i)=>{const rows=productApplicationsFor("CIL",r.key),p=productContributionMap("CIL",r.key),total=recordExposure("CIL",r);const byEntity={};rows.forEach(a=>{byEntity[a.entity||"Entity"]=(byEntity[a.entity||"Entity"]||0)+(Number(a.amount)||0)});return {no:i+1,insurer:r.name,type:r.type,ic:r.ic,multiplier:(r.multiplier*100).toFixed(2)+"%",cit:r.cit,bmriNominal:byEntity.BMRI||0,bmriEil:r.eils?.BMRI||0,mtNominal:byEntity["Mandiri Taspen"]||0,mtEil:r.eils?.["Mandiri Taspen"]||0,mtfNominal:byEntity.MTF||0,mtfEil:r.eils?.MTF||0,mufNominal:byEntity.MUF||0,mufEil:r.eils?.MUF||0,cil:r.cil,totalNominal:total,projection:cilProjection(r.key),utilCit:r.cit?total/r.cit:0,projectedUtil:r.cit?cilProjection(r.key)/r.cit:0,cilUtil:r.cil?total/r.cil:0,eilUtil:Math.max(...Object.entries(byEntity).map(([entity,amount])=>{const eil=Number(r.eils?.[entity]||0);return eil?amount/eil:0}),0),eilBreaches:Object.entries(byEntity).filter(([entity,amount])=>{const eil=Number(r.eils?.[entity]||0);return eil>0&&amount/eil>=1}).map(([entity])=>entity).join(", "),status:recordStatus("CIL",r),score:r.score,action:r.action}}),
    LPG:lpgDisplayRows().map((r,i)=>{
      const p=productContributionMap("LPG",r.key),out={no:i+1,sector:r.sector,segment:r.segment,dataQuality:r.dataQuality,status:recordStatus("LPG",r)};
      LPG_SCOPES.forEach(scope=>{const k=lpgScopeKey(scope),lim=lpgScopeLimit(r,scope),exp=lpgScopeExposure(r,scope),u=lim&&exp!==null?exp/lim:null;out["limit_"+k]=lim;out["outstanding_"+k]=exp;out["util_"+k]=u;out["source_"+k]=lpgScopeSource(r,scope);});
      const recon=lpgCrosscheck(r),bwRecon=lpgBankwideReconciliation(r),coverage=lpgSourceCoverage(r);
      out.crosscheck=recon.status+(recon.variance!==null?" • Δ "+recon.variance.toLocaleString("id-ID",{maximumFractionDigits:2}):"")+(recon.mode?" • "+recon.mode:"");
      out.bankwideReconciliation=bwRecon.status+(bwRecon.variance!==null?" • Δ "+bwRecon.variance.toLocaleString("id-ID",{maximumFractionDigits:2}):"");
      out.regionalCoverage=coverage.regionalMapped+"/"+coverage.totalRegional+" scope";
      out.cl=p.CASHLOAN||0;out.ncl=p["NON CASH LOAN"]||0;
      return out;
    })
  };
}

const LPG_REPORT_COLUMNS=[
    ["No","no"],["Ecosystem LPG (Sektor)","sector"],["Segmen LPG","segment"],
    ...LPG_SCOPES.flatMap(scope=>{const k=lpgScopeKey(scope);return [[scope+" • Limit","limit_"+k],[scope+" • Outstanding","outstanding_"+k],[scope+" • Utilisasi","util_"+k]];}),
    ["CL • Bankwide","cl"],["NCL • Bankwide","ncl"],["Bankwide vs Regional","crosscheck"],["Bankwide Source Reconciliation","bankwideReconciliation"],["Regional Source Coverage","regionalCoverage"],["Data Quality","dataQuality"],["Status","status"]
];
const reportConfig={
  Country:{title:"3. Monitoring Eksposur & Capacity Limit per Negara",subtitle:"Capacity Limit → Domestic/Overseas Distribution → Product Limit → Domestic/Overseas Exposure.",source:"master_reportMonitoring.xlsx • Sheet COUNTRY_MONITORING",note:"Country capacity adalah master layer. Capacity didistribusikan ke Domestic/Overseas lalu diturunkan ke masing-masing product. Exposure/Bade tetap menjadi monitoring layer dan Domestic/Overseas ditentukan dari Booking Office Type.",columns:[
    ["No","no"],["Negara","country"],["Code","code"],["Status","statusMaster"],["Capacity Limit","capacity"],["Capacity Distribution Domestic","capacityDomestic"],["Capacity Distribution Overseas","capacityOverseas"],["Allocated Capacity","allocatedCapacity"],["Unallocated Capacity","unallocatedCapacity"],["CASHLOAN Domestic Limit","clDomesticLimit"],["CASHLOAN Overseas Limit","clOverseasLimit"],["CASHLOAN Total Limit","clTotalLimit"],["NON CASH LOAN Domestic Limit","nclDomesticLimit"],["NON CASH LOAN Overseas Limit","nclOverseasLimit"],["NON CASH LOAN Total Limit","nclTotalLimit"],["CREDIT LINE Domestic Limit","comDomesticLimit"],["CREDIT LINE Overseas Limit","comOverseasLimit"],["CREDIT LINE Total Limit","comTotalLimit"],["BONDS Domestic Limit","bondDomesticLimit"],["BONDS Overseas Limit","bondOverseasLimit"],["BONDS Total Limit","bondTotalLimit"],["NOSTRO Domestic Limit","nosDomesticLimit"],["NOSTRO Overseas Limit","nosOverseasLimit"],["NOSTRO Total Limit","nosTotalLimit"],["Domestic Exposure","domestic"],["Overseas Exposure","overseas"],["Unmapped Booking Exposure","unmapped"],["TOTAL EXPOSURE","total"],["Status Monitoring","status"]
  ]},
  CCL:{title:"4. Counterparty Direct Limit - Bank Mandiri (BMRI) & Perusahaan Anak",subtitle:"Format mengikuti struktur CCL_MONITORING pada master report.",source:"master_reportMonitoring.xlsx • Sheet CCL_MONITORING",note:"Master CCL/capacity dipisahkan dari integrated product utilization.",columns:[
    ["No","no"],["Nama bank","bank"],["Kategori Bank","category"],["Negara","country"],["Country Rating","countryRating"],["Bobot","bobot"],["Rating","rating"],["Posisi Rating","position"],["Rating Index","ratingIndex"],["Limit Inhouse (Rp Miliar)","inhouse"],["Tier 1 Capital (Rp Miliar)","tier1"],["Capacity","capacity"],["Capacity Limit Adjusted","adjusted"],["Global Parent Bank","globalParent"],["Top 200 Bank","top200"],["CCL","ccl"],["Limit Contractual","limit"],["Outstanding","outstanding"],["Jenis Limit","jenis"],["BMRI Total Limit","bmriTotal"],["BMRI Bank Loan","bmriLoan"],["BMRI Commercial Line","bmriCom"],["BMRI Treasury Line","bmriTrs"],["BMRI Utilisasi CCL","bmriUtil"],["BMRI Utilisasi Kontraktual","contractualUtil"],["BMRI Outstanding Maksimum","maxOutstanding"],["BMRI Utilisasi Maks. Kontraktual","maxContractualUtil"],["PA Total Limit","paTotal"],["PA Bank Loan","paLoan"],["PA Commercial Line","paCom"],["PA Treasury Line","paTrs"],["PA Utilisasi CCL","paUtil"],["PA Utilisasi Kontraktual","paContractualUtil"],["PA Outstanding Maksimum","paMaxOutstanding"],["PA Utilisasi Maks. Kontraktual","paMaxContractualUtil"],["Status Monitoring","status"]
  ]},
  MLK:{title:"7. Monitoring Debitur per Group Usaha (Konsolidasi)",subtitle:"Format mengikuti struktur MLK_Monitor dan dikorelasikan dengan MLK_Master.",source:"master_reportMonitoring.xlsx • Sheet MLK_Master + MLK_Monitor",note:"Master Limit berasal dari canonical MLK master; exposure berasal dari integrated CL/NCL/Treasury Line.",columns:[
    ["No","no"],["Tier","tier"],["Group Usaha (Holding)","holding"],["Sub-Group","subGroup"],["BUMN/Swasta","flag"],["Unit Kerja Pengelola","unit"],["Entitas","entity"],["BMPK Konsol","bmpkKonsol"],["BMPK Entitas","bmpkEntitas"],["Limit Fasilitas","limitFasilitas"],["Total Bade","bade"],["Borrowing Capacity","borrowing"],["Master Limit Setting","masterLimitSetting"],["Master Limit","masterLimit"],["MLK Konsolidasi","mlk"],["Utilisasi Bade / Limit Fasilitas","utilBade"],["Utilisasi Limit / BMPK Entitas","utilFacilityBmpk"],["MLK / BMPK Konsol","utilMlkBmpk"],["Jumlah Debitur","debtors"],["Total BMPK Entitas (Master)","totalBmpk"],["Total Master Limit (Master)","totalMaster"],["Total Borrowing Capacity (Master)","totalBorrowing"],["Selisih Master Limit","variance"],["Status","status"]
  ]},
  CIL:{title:"CIL Master Monitoring",subtitle:"Format mengikuti struktur CIL_Master pada master report.",source:"master_reportMonitoring.xlsx • Sheet CIL_Master",note:"CIL master berisi IC/CIT/EIL/CIL; Nominal Pertanggungan adalah integrated utilization.",columns:[
    ["No","no"],["Perusahaan Asuransi","insurer"],["Jenis Perusahaan","type"],["Insurance Capacity (Rp Juta)","ic"],["Multiplier Terpakai","multiplier"],["CIT (Rp Juta)","cit"],["Nominal Pertanggungan BMRI","bmriNominal"],["EIL BMRI","bmriEil"],["Nominal Pertanggungan Mandiri Taspen","mtNominal"],["EIL Mandiri Taspen","mtEil"],["Nominal Pertanggungan MTF","mtfNominal"],["EIL MTF","mtfEil"],["Nominal Pertanggungan MUF","mufNominal"],["EIL MUF","mufEil"],["CIL","cil"],["Total Nominal Pertanggungan","totalNominal"],["Proyeksi 2026","projection"],["% Nominal / CIT","utilCit"],["% Proyeksi / CIT","projectedUtil"],["% Nominal / CIL","cilUtil"],["Max Utilisasi EIL","eilUtil"],["EIL Breach Entity","eilBreaches"],["Status","status"]
  ]},
  LPG:{title:"Loan Portfolio Guideline (LPG) Monitoring",subtitle:"Monitoring Ecosystem LPG × Segmen dengan Bankwide, Region I–XII dan KP + OVS.",source:"master_reportMonitoring.xlsx • LPG_Loanportfolio",note:"Bankwide adalah aggregate dari debtor-level CL/NCL yang terklasifikasi. Outstanding regional hanya dihitung dari product record dengan region_lpg; bila region belum tersedia, report menampilkan No Product Data dan tidak mengarang outstanding regional.",columns:LPG_REPORT_COLUMNS}
};
function fmtReport(v){if(v===null||v===undefined||v==="")return "—";if(typeof v==="number")return v.toLocaleString('id-ID',{maximumFractionDigits:2});return v;}
function statusForReport(row){return row.status||row.statusMaster||"Normal";}
function downloadReportCsv(type,rows){
  const cfg=reportConfig[type];
  const header=cfg.columns.map(x=>x[0]).join(",");
  const body=rows.map(r=>cfg.columns.map(([,key])=>`"${String(fmtReport(r[key])).replaceAll('"','""')}"`).join(",")).join("\n");
  const csv=header+"\n"+body;
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download=`LIMAS_${type}_Monitoring_Report.csv`;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url),500);
}
function Report({nav}){
  const [type,setType]=useState("Country"),[period,setPeriod]=useState(E2E_DUMMY_META.period),[status,setStatus]=useState("All"),[generated,setGenerated]=useState(false);
  const rows=(buildReportDummy(limasDemoData)[type]||[]),filtered=rows.filter(r=>status==="All"||statusForReport(r)===status),cfg=reportConfig[type];
  const generate=()=>setGenerated(true);
  const summary={total:rows.length,normal:rows.filter(r=>statusForReport(r)==="Normal").length,warning:rows.filter(r=>statusForReport(r)==="Warning").length,breach:rows.filter(r=>statusForReport(r)==="Breach").length,issue:rows.filter(r=>statusForReport(r)==="Data Issue").length};
  return <Layout screen="report" onNav={nav}><Header title="Generate Monitoring Report" subtitle="Generate report monitoring dengan struktur yang mengikuti master report masing-masing limit"/><div className="page">
    <section className="card"><div className="head"><div><h2>Report Generator</h2><p>Generate report dari monitoring read model yang sama dengan halaman Monitoring.</p></div><div className="chip blue">Prototype Reconciled Data • {rows.length} records</div></div><div className="body">
      <div className="report-controls">
        <div><label>Jenis Report</label><select className="select" value={type} onChange={e=>{setType(e.target.value);setGenerated(false);setStatus("All")}}><option>Country</option><option>CCL</option><option>MLK</option><option>CIL</option><option>LPG</option></select></div>
        <div><label>Periode</label><select className="select" value={period} onChange={e=>setPeriod(e.target.value)}><option>{E2E_DUMMY_META.period}</option></select></div>
        <div><label>Status</label><select className="select" value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Normal</option><option>Warning</option><option>Breach</option><option>Data Issue</option></select></div>
        <div className="report-actions"><button className="btn primary" onClick={generate}>Generate Report</button><button className="btn secondary" onClick={()=>downloadReportCsv(type,filtered)}>Download CSV</button></div>
      </div>
    </div></section>
    <section className="card">
      <div className="head"><div><h2>End-to-End Data Control</h2><p>Control point sebelum angka masuk Report dan Monitoring.</p></div><span className="chip blue">Canonical Pipeline</span></div>
      <div className="body"><div className="integration-chip-grid">
        {canonicalPipelineControls().map((x,i)=><div className="mini integration-chip" key={"pipeline-"+i}>
          <b>{x.layer}</b>
          <div style={{marginTop:4}}><Status v={x.status}/><span className="muted-small" style={{marginLeft:6}}>{x.count} issue</span></div>
          <div className="muted-small" style={{marginTop:4}}>{x.detail}</div>
        </div>)}
      </div></div>
    </section>
    {generated&&<section className="card"><div className="head"><div><h2>{cfg.title}</h2><p>{cfg.subtitle}</p><div className="report-meta"><span>{cfg.source}</span><span>Periode: {period}</span><span>Generated: {nowLabel()}</span></div></div><button className="btn ghost" onClick={()=>window.print()}>Print / PDF</button></div><div className="body">
      <div className="report-note">{cfg.note}</div>
      <div className="metric-grid report-kpi"><DomainKpi label="Total Data" value={summary.total} sub="Canonical master/report objects"/><DomainKpi label="Normal" value={summary.normal} sub="Within monitoring threshold"/><DomainKpi label="Warning" value={summary.warning} sub="Early warning condition" accent="yellow"/><DomainKpi label="Breach" value={summary.breach} sub="Above monitoring limit" accent="red"/><DomainKpi label="Data Issue" value={summary.issue} sub="Needs review"/></div>
      <div className="table-wrap report-table-wrap"><table className="table report-table"><thead><tr>{cfg.columns.map(([label])=><th key={label}>{label}</th>)}</tr></thead><tbody>{filtered.map((r,i)=><tr key={r.no||i}>{cfg.columns.map(([label,key])=><td key={key}>{key==="status"||key==="statusMaster"?<Status v={statusForReport(r)}/>:fmtReport(r[key])}</td>)}</tr>)}</tbody></table></div>
      <div className="report-footer"><b>Reporting note:</b> Report prototype membaca dataset monitoring canonical yang sama dengan Dashboard/Monitoring. Karena itu Master Limit + Product Utilization + Status harus tetap tally. Field yang source-nya belum eksplisit ditandai sesuai MD.</div>
    </div></section>}
    {!generated&&<section className="card"><div className="head"><div><h2>Report Preview</h2><p>Report belum di-generate. Pilih parameter lalu klik Generate Report.</p></div></div><div className="body"><div className="report-preview"><div><b>{cfg.title}</b><span>{cfg.source}</span></div><div><b>{rows.length} canonical records</b><span>Master Limit + Product Utilization + EWS status</span></div><div><b>Output</b><span>Preview table + CSV + Print/PDF browser</span></div></div></div></section>}
  </div></Layout>;
}
function Status({v}){const cls=v==="Breach"?"breach":v==="Warning"?"warning":v==="Data Issue"?"dataissue":"normal";return <span className={`badge ${cls}`}>{v}</span>}
function Layout({screen,onNav,children}){const nav=[['dashboard','⌂','Dashboard'],['setup','⚙','Master Limit Setup'],['detail','▤','Master Limit Detail'],['products','▦','Product Universe & Integration'],['report','▤','Generate Report'],['warning','◉','Early Warning'],['Country','◎','Country Limit'],['CCL','◈','Counterparty / CCL'],['MLK','◌','Debtor / MLK'],['CIL','⬡','Insurance / CIL'],['LPG','◫','Portfolio / LPG']];return <div className="app shell"><aside className="side"><div className="brand"><div><b>LIMAS</b><small>Limit Management System</small></div></div><div className="nav">{nav.map(([id,ic,lb],i)=><React.Fragment key={id}>{i===1&&<div className="section">Master & Data</div>}{i===4&&<div className="section">Reporting</div>}{i===5&&<div className="section">Monitoring</div>}<button className={screen===id?'active':''} onClick={()=>onNav(id)}><span style={{width:16}}>{ic}</span>{lb}</button></React.Fragment>)}</div><div className="collapse">‹‹ &nbsp; Collapse</div></aside><main className="main">{children}</main></div>}
function Header({title,subtitle}){return <div className="top"><div className="title"><h1>{title}</h1><p>{subtitle}</p></div><div className="usr">🔔 <span className="avatar">R</span><div><b>Risk Management</b><div style={{fontSize:10,color:'#95a3b9'}}>CPR • LIMAS</div></div></div></div>}
function Login({go}){return <div className="app login"><div className="login-card"><div className="login-logo">LM</div><h1>LIMAS</h1><p>Limit Management System</p><input defaultValue="cpr.risk" placeholder="Username"/><input defaultValue="demo123" type="password" placeholder="Password"/><button className="btn primary" onClick={go}>Masuk ke LIMAS</button><div className="foot">Prototype • Development Environment</div></div></div>}

function DomainKpi({label,value,sub,accent=""}){return <div className="metric"><div className="label">{label}</div><div className="value" style={accent?{color:`var(--${accent})`}:{}}>{value}</div><div className="sub">{sub}</div></div>}

function OverviewTable({type,onDetail}){
  const sourceRows=type==="LPG"?lpgDisplayRows():(limasDemoData[type]||[]);
  const rows=sourceRows.slice(0,6).map(r=>{
    const key=r.key;
    const object=type==="LPG"?(r.sector+" / "+r.segment):(r.name||r.sector||r.key);
    const limit=recordLimit(type,r),exposure=recordExposure(type,r),util=recordUtil(type,r),status=recordStatus(type,r);
    return [key,object,Number.isFinite(limit)?Number(limit).toLocaleString("id-ID",{maximumFractionDigits:2}):"—",exposure===null?"—":Number(exposure).toLocaleString("id-ID",{maximumFractionDigits:2}),Number.isFinite(util)?(util*100).toFixed(2)+"%":"—",status];
  });
  return <div className="table-wrap"><table className="table"><thead><tr><th>Unique Key</th><th>Objek</th><th>Limit</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Detail</th></tr></thead><tbody>{rows.map(r=><tr key={String(r[0])}><td><span className="key">{r[0]}</span></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><Status v={r[5]}/></td><td><button className="btn ghost" onClick={()=>onDetail(type,r[0])}>View</button></td></tr>)}</tbody></table></div>
}

function Dashboard({nav}){
  const domainsList=["Country","CCL","MLK","CIL","LPG"];
  const rowsForKpi=type=>type==="LPG"?lpgLeafRows(limasDemoData.LPG):limasDemoData[type]||[];
  const productRecordCount=Object.values(productDatabase).reduce((n,rows)=>n+rows.length,0);
  const summary=domainsList.reduce((a,type)=>{
    const rows=rowsForKpi(type);
    return {...a,records:a.records+rows.length,normal:a.normal+rows.filter(r=>recordStatus(type,r)==="Normal").length,warning:a.warning+rows.filter(r=>recordStatus(type,r)==="Warning").length,breach:a.breach+rows.filter(r=>recordStatus(type,r)==="Breach").length,issue:a.issue+rows.filter(r=>recordStatus(type,r)==="Data Issue").length};
  },{records:0,normal:0,warning:0,breach:0,issue:0});
  const canonicalRows=canonicalExceptions();
  const reconciliationRows=reconciliationIssues().filter(x=>x.status==="Data Issue");
  return <Layout screen="dashboard" onNav={nav}>
    <Header title="Halo, Risk Management" subtitle="Executive monitoring limit Bank Mandiri Group"/>
    <div className="page">
      <div className="hero">
        <h2>Limit Management Overview</h2>
        <p>Master limit aktif, product utilization terintegrasi dan monitoring status periode berjalan.</p>
        <div className="hero-grid">
          <div><div className="hero-label">Master Objects</div><div className="hero-value">{summary.records}</div></div>
          <div><div className="hero-label">Product Source Records</div><div className="hero-value">{productRecordCount}</div></div>
          <div><div className="hero-label">Breach</div><div className="hero-value">{summary.breach}</div></div>
        </div>
      </div>

      <div className="metric-grid">
        {domainsList.map(type=>{
          const rows=rowsForKpi(type),lim=rows.reduce((a,r)=>a+recordLimit(type,r),0),exp=rows.reduce((a,r)=>a+recordExposure(type,r),0),u=lim?exp/lim:0;
          return <DomainKpi key={type} label={type+" Limit"} value={(u*100).toFixed(1)+"%"} sub={rows.length+" objects • "+rows.filter(r=>recordStatus(type,r)==="Warning").length+" EWS • "+rows.filter(r=>recordStatus(type,r)==="Breach").length+" Breach"} accent={u>=1?"red":u>=0.8?"yellow":""}/>;
        })}
      </div>

      <div className="dash-grid">
        <section className="card">
          <div className="head"><div><h2>Utilisasi per Domain</h2><p>Exposure terintegrasi dibandingkan dengan master limit domain.</p></div></div>
          <div className="body"><div className="chart-list">
            {domainsList.map(type=>{
              const rows=rowsForKpi(type),lim=rows.reduce((a,r)=>a+recordLimit(type,r),0),exp=rows.reduce((a,r)=>a+recordExposure(type,r),0),u=lim?exp/lim:0;
              return <div className="chart-row" key={type}><div className="chart-row-head"><b>{type}</b><span>{(u*100).toFixed(1)}%</span></div><div className="chart-track"><span style={{width:Math.min(u*100,100)+"%"}}/></div></div>;
            })}
          </div></div>
        </section>
        <section className="card">
          <div className="head"><div><h2>Distribusi Status</h2><p>Satu sumber data untuk dashboard, monitoring dan report.</p></div></div>
          <div className="body">
            <div className="legend">
              <div><i className="dot" style={{background:"#1c73e8"}}/> Normal {summary.normal}</div>
              <div><i className="dot" style={{background:"#f2c04d"}}/> Early Warning {summary.warning}</div>
              <div><i className="dot" style={{background:"#e45757"}}/> Breach {summary.breach}</div>
              <div><i className="dot" style={{background:"#8692a6"}}/> Data Issue {summary.issue}</div>
            </div>
          </div>
        </section>
      </div>

      <section className="card">
        <div className="head"><div><h2>Data Lineage</h2><p>Traceability dari Master Limit sampai product utilization dan monitoring output.</p></div></div>
        <div className="body"><div className="integration-chip-grid">
          <div className="mini integration-chip"><b>1. Master Limit</b><div className="muted-small">Approved limit, parameter, effective period, version dan status.</div></div>
          <div className="mini integration-chip"><b>2. Product Universe</b><div className="muted-small">Product source registry dan integration mapping.</div></div>
          <div className="mini integration-chip"><b>3. Product Utilization</b><div className="muted-small">Source record → target key → aggregation → outstanding/exposure.</div></div>
          <div className="mini integration-chip"><b>4. Monitoring / Report</b><div className="muted-small">Utilisasi → remaining → threshold → EWS/Breach → report.</div></div>
        </div></div>
      </section>

      <section className="card">
        <div className="head"><div><h2>Canonical Data Pipeline Health</h2><p>Source → cleansing → integration → read model → report/monitoring.</p></div></div>
        <div className="body"><div className="integration-chip-grid">
          {canonicalPipelineControls().map((x,i)=><div className="mini integration-chip" key={"dash-pipeline-"+i}><b>{x.layer}</b><div className="muted-small"><Status v={x.status}/> • {x.detail}</div></div>)}
        </div></div>
      </section>

      <div className="dash-grid">
        <section className="card"><div className="head"><div><h2>Early Warning & Breach</h2><p>Exception lintas domain dari canonical monitoring model.</p></div><button className="btn secondary" onClick={()=>nav("warning")}>Buka EWS Center</button></div><div className="body"><div className="alert-list">
          {canonicalRows.filter(x=>x.status==="Warning"||x.status==="Breach").slice(0,6).map((x,i)=><div className={"alert "+(x.status==="Breach"?"breach":"warning")} key={x.domain+"|"+x.key+"|"+i}><span className="bar"></span><div><b>{x.domain+" • "+x.object}</b><div className="muted-small">Utilisasi {x.util?((x.util*100).toFixed(2)+"%"):"—"}</div></div><Status v={x.status}/></div>)}
          {canonicalRows.filter(x=>x.status==="Warning"||x.status==="Breach").length===0&&<div className="mini">No utilization warning/breach pada canonical monitoring.</div>}
        </div></div></section>
        <section className="card"><div className="head"><div><h2>Reconciliation Status</h2><p>Data issue yang memerlukan investigasi.</p></div></div><div className="body">
          {domainsList.map(type=>(limasDemoData[type]||[]).filter(r=>recordStatus(type,r)==="Data Issue").map(r=><div className="mini" style={{marginBottom:8}} key={type+"|"+r.key}><b>{type+" • "+(r.name||r.sector)}</b><div className="muted-small">Master data: {r.dataQuality}</div></div>))}
          {reconciliationRows.map((x,i)=><div className="mini" style={{marginBottom:8}} key={"recon|"+x.recordId+"|"+i}><b>{x.issueType+" • "+x.productId}</b><div className="muted-small">{x.recordId} → {x.limitType} / {x.key} • {x.detail}</div></div>)}
          {summary.issue===0&&reconciliationRows.length===0&&<div className="mini">No data/reconciliation issue.</div>}
        </div></section>
      </div>
    </div>
  </Layout>
}

function exceptionEntity(r){
  if(r.domain==="MLK"){
    const master=(limasDemoData.MLK||[]).find(x=>String(x.key)===String(r.key));
    return master?.entity||"BMRI";
  }
  if(r.domain==="CIL"){
    const app=productApplicationsFor("CIL",r.key)[0];
    return app?.entity||"BMRI";
  }
  return "BMRI";
}
function Warning({nav}){
  const [status,setStatus]=useState("All"),[domain,setDomain]=useState("All"),[entity,setEntity]=useState("All Entity"),[snapshot,setSnapshot]=useState("Latest Canonical Snapshot");
  const rows=canonicalExceptions().map(r=>({...r,entity:exceptionEntity(r),snapshot:E2E_DUMMY_META.datasetId,period:E2E_DUMMY_META.period}));
  const filtered=rows.filter(r=>(status==="All"||r.status===status)&&(domain==="All"||r.domain===domain)&&(entity==="All Entity"||r.entity===entity)&&(snapshot==="Latest Canonical Snapshot"||r.snapshot===snapshot));
  const breach=filtered.filter(r=>r.status==="Breach").length,warning=filtered.filter(r=>r.status==="Warning").length,issue=filtered.filter(r=>r.status==="Data Issue").length;
  const actionPending=filtered.length;
  const entityOptions=[...new Set(rows.map(r=>r.entity).filter(Boolean))];
  return <Layout screen="warning" onNav={nav}><Header title="Early Warning & Breach Center" subtitle="Exception monitoring dari canonical Master Limit + Product Utilization + reconciliation engine"/><div className="page">
    <div className="metric-grid">
      <DomainKpi label="Total Exception" value={filtered.length} sub="Hasil filter saat ini"/>
      <DomainKpi label="Breach" value={breach} sub="Utilisasi ≥ 100%" accent="red"/>
      <DomainKpi label="Early Warning" value={warning} sub="80% ≤ utilisasi < 100%" accent="yellow"/>
      <DomainKpi label="Data Issue" value={issue} sub="Master / mapping / identity"/>
      <DomainKpi label="Action Pending" value={actionPending} sub="Exception yang perlu review" accent="yellow"/>
    </div>
    <section className="card"><div className="head"><div><h2>Filter Exception</h2><p>Semua exception berasal dari canonical monitoring dan reconciliation engine.</p></div></div><div className="body"><div className="toolbar">
      <select className="select" value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Warning</option><option>Breach</option><option>Data Issue</option></select>
      <select className="select" value={domain} onChange={e=>setDomain(e.target.value)}><option>All</option><option>Country</option><option>CCL</option><option>MLK</option><option>CIL</option><option>LPG</option></select>
      <select className="select" value={entity} onChange={e=>setEntity(e.target.value)}><option>All Entity</option>{entityOptions.map(x=><option key={x}>{x}</option>)}</select>
      <select className="select" value={snapshot} onChange={e=>setSnapshot(e.target.value)}><option>Latest Canonical Snapshot</option><option value={E2E_DUMMY_META.datasetId}>{E2E_DUMMY_META.datasetId}</option></select>
    </div></div></section>
    <section className="card"><div className="head"><div><h2>Exception Register</h2><p>Drill-down menuju master, product source dan reconciliation detail.</p></div></div><div className="body"><div className="table-wrap"><table className="table">
      <thead><tr><th>Status</th><th>Domain</th><th>Entity</th><th>Unique Key</th><th>Objek</th><th>Limit</th><th>Exposure</th><th>Utilisasi</th><th>Threshold</th><th>Snapshot</th><th>Detail</th><th>Aksi</th></tr></thead>
      <tbody>{filtered.map((r,i)=><tr key={r.domain+"|"+r.key+"|"+i}><td><Status v={r.status}/></td><td><b>{r.domain}</b></td><td>{r.entity}</td><td><span className="key">{r.key}</span></td><td>{r.object}</td><td>{fmtReport(r.limit)}</td><td>{fmtReport(r.exposure)}</td><td>{r.util?((r.util*100).toFixed(2)+"%"):"—"}</td><td>{r.threshold}</td><td className="muted-small">{r.period}</td><td className="muted-small">{r.detail}</td><td><button className="btn ghost" onClick={()=>domains[r.domain]?nav("detail",{type:r.domain,key:r.key}):nav("products")}>{domains[r.domain]?"Detail":"Product"}</button></td></tr>)}</tbody>
    </table></div></div></section>
    <div className="dash-grid">
      <section className="card"><div className="head"><div><h2>Exception by Domain</h2><p>Canonical warning, breach dan reconciliation issue.</p></div></div><div className="body"><div className="heatmap">{["Country","CCL","MLK","CIL","LPG"].map(d=>{const n=rows.filter(r=>r.domain===d).length;return <div className={"heat "+(n>=3?"high":n>=1?"warn":"low")} key={d}><div>{d}</div><div style={{fontSize:18,marginTop:8}}>{n}</div></div>})}</div></div></section>
      <section className="card"><div className="head"><div><h2>Reconciliation Status</h2><p>Issues yang benar-benar ditemukan pada product-to-master mapping.</p></div></div><div className="body">{reconciliationIssues().length?reconciliationIssues().map((x,i)=><div className="mini" style={{marginBottom:8}} key={x.recordId+"|"+i}><b>{x.issueType+" • "+x.productId}</b><div className="muted-small">{x.recordId} → {x.limitType} / {x.key} • {x.detail}</div></div>):<div className="mini">No reconciliation issue.</div>}</div></section>
    </div>
  </div></Layout>;
}
function LPGMonitor({nav}){
  const rows=lpgDisplayRows(),leaf=lpgLeafRows();
  const totalLimit=leaf.reduce((a,r)=>a+(Number(lpgScopeLimit(r,LPG_BANK_SCOPE))||0),0);
  const totalExposure=leaf.reduce((a,r)=>a+(Number(lpgScopeExposure(r,LPG_BANK_SCOPE))||0),0);
  const overallUtil=totalLimit?totalExposure/totalLimit:0;
  const statuses=leaf.map(r=>recordStatus("LPG",r)),warning=statuses.filter(x=>x==="Warning").length,breach=statuses.filter(x=>x==="Breach").length;
  const regionalMapped=leaf.reduce((n,r)=>n+LPG_REGIONAL_SCOPES.filter(scope=>lpgScopeProductExposure(r,scope).apps.length>0).length,0);
  const regionalPossible=leaf.length*LPG_REGIONAL_SCOPES.length;
  const pct=v=>(v*100).toFixed(2)+"%",money=v=>v===null||v===undefined?"—":Number(v).toLocaleString("id-ID",{maximumFractionDigits:2});
  const scopeStatus=(r,scope)=>{const u=lpgScopeUtil(r,scope);return u===null?"—":<Status v={u>=1?"Breach":u>=0.8?"Warning":"Normal"}/>};
  return <Layout screen="LPG" onNav={nav}>
    <Header title="Portfolio / LPG Monitoring" subtitle="Ecosystem LPG × Segmen LPG dengan Bankwide, Region I–XII dan KP + OVS"/>
    <div className="page">
      <div className="metric-grid">
        <DomainKpi label="Bankwide Limit" value={money(totalLimit)} sub="Sum segment limits • Rp Juta"/>
        <DomainKpi label="Bankwide Outstanding" value={money(totalExposure)} sub="CL + NCL integrated feed / reconciled snapshot"/>
        <DomainKpi label="Bankwide Utilisasi" value={pct(overallUtil)} sub="Outstanding / Bankwide Limit" accent={overallUtil>=1?"red":overallUtil>=0.8?"yellow":""}/>
        <DomainKpi label="Early Warning" value={warning} sub="80%–<100%" accent="yellow"/>
        <DomainKpi label="Breach" value={breach} sub="≥100%" accent="red"/>
      </div>
      <section className="card"><div className="head"><div><h2>LPG Control Model</h2><p>Bankwide adalah aggregate dari Region I–XII + KP + OVS. Bankwide source bukan additional exposure.</p></div><span className="chip blue">CL + NCL → LPG</span></div>
        <div className="body"><div className="integration-chip-grid">
          <div className="mini integration-chip"><b>1. Debtor Source</b><div className="muted-small">CIF/CUSTID + outstanding dari Cash Loan dan Non Cash Loan.</div></div>
          <div className="mini integration-chip"><b>2. LPG Classification</b><div className="muted-small">Ecosystem LPG → Segmen LPG → Bankwide / Region / KP + OVS.</div></div>
          <div className="mini integration-chip"><b>3. Aggregation</b><div className="muted-small">Bankwide = sum regional scope. Bankwide dan regional tidak dijumlahkan bersama.</div></div>
          <div className="mini integration-chip"><b>4. Control</b><div className="muted-small">Crosscheck Bankwide vs regional + source coverage sebelum EWS/report.</div></div>
        </div>
        <div className="field-help">Regional outstanding hanya ditampilkan apabila ada debtor product record dengan region_lpg yang sesuai. Tidak ada outstanding snapshot yang ditanam ke master limit. Bankwide adalah aggregate seluruh debtor product yang terklasifikasi, bukan record LPG tersendiri.</div>
        </div>
      </section>
      <section className="card"><div className="head"><div><h2>Sector × Segment Monitoring</h2><p>Format mengikuti contoh LPG: total sektor + Corporate / Commercial / Sme / Micro.</p></div><span className="chip blue">{leaf.length} segment rows • {statuses.filter(x=>x==="Data Issue").length} data issue</span></div>
        <div className="body"><div className="table-wrap lpg-monitor-wrap"><table className="table lpg-monitor-table">
          <thead><tr><th>Ecosystem LPG</th><th>Segmen LPG</th>{LPG_SCOPES.map(scope=><th colSpan="3" key={scope}>{scope}</th>)}<th>Status</th><th>Crosscheck</th><th>Source Coverage</th></tr>
            <tr><th></th><th></th>{LPG_SCOPES.flatMap(scope=><React.Fragment key={scope}><th>Limit</th><th>Outstanding</th><th>Util.</th></React.Fragment>)}<th></th><th></th><th></th></tr></thead>
          <tbody>{rows.map(r=><tr key={r.key} className={r.segment==="TOTAL SEKTOR"?"lpg-total-row":""}>
            <td><b>{r.sector}</b></td><td><b>{r.segment}</b></td>
            {LPG_SCOPES.flatMap(scope=><React.Fragment key={scope}><td>{money(lpgScopeLimit(r,scope))}</td><td>{money(lpgScopeExposure(r,scope))}</td><td>{scopeStatus(r,scope)}</td></React.Fragment>)}
            <td><Status v={recordStatus("LPG",r)}/></td>
            <td className="muted-small">{(()=>{const x=lpgCrosscheck(r);return x.status+(x.variance!==null?" • Δ "+money(x.variance):"")+(x.mode==="Reference Snapshot"?" • snapshot":"")})()}</td>
            <td className="muted-small">{(()=>{const c=lpgSourceCoverage(r);return (c.bankwideMapped?"BW product feed • ":"BW product data belum ada • ")+c.regionalMapped+"/"+c.totalRegional+" regional product feed"})()}</td>
          </tr>)}</tbody>
        </table></div></div>
      </section>
      <section className="card"><div className="head"><div><h2>Reconciliation</h2><p>Bankwide product contribution dan bankwide ↔ regional control.</p></div></div>
        <div className="body"><div className="metric-grid">
          {rows.map(r=>{const recon=lpgBankwideReconciliation(r);return <div className="mini" key={r.key}><b>{r.sector} • {r.segment}</b><div className="muted-small">Source BW: {lpgScopeSource(r,LPG_BANK_SCOPE)} • Product CL+NCL: {recon.product===null?"—":money(recon.product)}{recon.variance!==null?" • Δ "+money(recon.variance):""}</div></div>})}
          <div className="mini"><b>Regional Product Coverage</b><div className="muted-small">{regionalMapped} of {regionalPossible} segment×region scopes have debtor-level product feed.</div></div>
        </div></div>
      </section>
    </div>
  </Layout>;
}

function MLKMonitor({nav}){
  const rows=mlkMonitoringRows(limasDemoData.MLK||[]),debtors=rows.filter(r=>r.rowType==="Debtor");
  const totalLimit=debtors.reduce((a,r)=>a+(Number(r.masterLimit)||0),0),totalExposure=debtors.reduce((a,r)=>a+(Number(r.bade)||0),0),util=totalLimit?totalExposure/totalLimit:0;
  return <Layout screen="MLK" onNav={nav}><Header title="Debtor / MLK Monitoring" subtitle="Holding → Sub-Group → Entitas → Debtor/CIF • Facility Limit + Bade + Master Limit"/><div className="page">
    <div className="metric-grid"><DomainKpi label="Debtor / CIF" value={debtors.length} sub="Canonical MLK master"/><DomainKpi label="Master Limit" value={totalLimit.toLocaleString("id-ID",{maximumFractionDigits:2})} sub="Final debtor Master Limit"/><DomainKpi label="Total Bade" value={totalExposure.toLocaleString("id-ID",{maximumFractionDigits:2})} sub="CL + NCL + Treasury Bade"/><DomainKpi label="Utilisasi Master" value={(util*100).toFixed(2)+"%"} sub="Total Bade / Master Limit" accent={util>=1?"red":util>=0.8?"yellow":""}/><DomainKpi label="Data Issue" value={debtors.filter(r=>r.status==="Data Issue").length} sub="Master / mapping"/></div>
    <section className="card"><div className="head"><div><h2>MLK Hierarchy & Aggregation</h2><p>Monitoring memisahkan debtor master dengan subtotal group. Master Limit Setting tidak otomatis dijumlahkan dengan Existing Limit sebagai universal rule.</p></div><span className="chip blue">Holding → Sub-Group → Entitas → CIF</span></div><div className="body"><div className="integration-chip-grid"><div className="mini integration-chip"><b>Master</b><div className="muted-small">CIF, group, entity, regulatory, capacity dan Master Limit.</div></div><div className="mini integration-chip"><b>Facility</b><div className="muted-small">CL Limit + NCL Limit + Treasury Line = Total Limit Existing.</div></div><div className="mini integration-chip"><b>Exposure</b><div className="muted-small">CL Bade + NCL Bade + Bade Treasury Line = Total Bade Existing.</div></div><div className="mini integration-chip"><b>Report</b><div className="muted-small">Debtor dan Sub-total Group dipisahkan dari MLK konsolidasi.</div></div></div></div></section>
    <section className="card"><div className="head"><div><h2>Monitoring Detail</h2><p>Nilai fasilitas dan exposure tidak lagi disamakan dengan Master Limit.</p></div></div><div className="body"><div className="table-wrap"><table className="table"><thead><tr><th>Row Type</th><th>Tier</th><th>Holding</th><th>Sub-Group</th><th>Entitas</th><th>CIF</th><th>Limit Fasilitas</th><th>Total Bade</th><th>Borrowing Capacity</th><th>Master Limit Setting</th><th>Master Limit</th><th>MLK</th><th>Util. Bade/Limit</th><th>Util. Limit/BMPK</th><th>Status</th></tr></thead><tbody>{rows.map((r,i)=><tr key={r.rowType+"|"+r.cif+"|"+i}><td>{r.rowType}</td><td>{r.tier}</td><td>{r.holding}</td><td>{r.subGroup}</td><td>{r.entity}</td><td className="key">{r.cif}</td><td>{fmtReport(r.limitFasilitas)}</td><td>{fmtReport(r.bade)}</td><td>{fmtReport(r.borrowing)}</td><td>{fmtReport(r.masterLimitSetting)}</td><td>{fmtReport(r.masterLimit)}</td><td>{fmtReport(r.mlk)}</td><td>{r.utilBade==null?"—":(r.utilBade*100).toFixed(2)+"%"}</td><td>{r.utilFacilityBmpk==null?"—":(r.utilFacilityBmpk*100).toFixed(2)+"%"}</td><td><Status v={r.status}/></td></tr>)}</tbody></table></div></div></section>
  </div></Layout>;
}

function Monitor({type,nav}){
  if(type==="LPG")return <LPGMonitor nav={nav}/>;
  if(type==="MLK")return <MLKMonitor nav={nav}/>;

  const rows=limasDemoData[type]||[];
  const totalLimit=rows.reduce((a,r)=>a+recordLimit(type,r),0);
  const totalExposure=rows.reduce((a,r)=>a+recordExposure(type,r),0);
  const overallUtil=totalLimit?totalExposure/totalLimit:0;
  const statusCounts={Normal:rows.filter(r=>recordStatus(type,r)==="Normal").length,Warning:rows.filter(r=>recordStatus(type,r)==="Warning").length,Breach:rows.filter(r=>recordStatus(type,r)==="Breach").length,"Data Issue":rows.filter(r=>recordStatus(type,r)==="Data Issue").length};
  const titleMap={Country:"Country Capacity Limit Monitoring",CCL:"Counterparty / CCL Monitoring",MLK:"Debtor / MLK Monitoring",CIL:"Insurance / CIL Monitoring",LPG:"Portfolio / LPG Monitoring"};
  const subtitleMap={Country:"Country Capacity Limit → Domestic/Overseas Distribution → Product Limit → integrated utilization.",CCL:"Master CCL / Contractual Limit + integrated counterparty product utilization.",MLK:"Master Limit per CIF/group + integrated CL, NCL and Treasury Line exposure.",CIL:"Master IC/CIT/EIL/CIL + integrated Nominal Pertanggungan.",LPG:"Master limit Sector × Segment × Region + integrated CL/NCL outstanding."};
  const unitMap={Country:"Rp Juta",CCL:"Rp Juta",MLK:"Rp Juta",CIL:"Rp Juta",LPG:"Rp Juta"};
  const pct=v=>(v*100).toFixed(2)+"%";
  const productsText=r=>{
    if(type==="CIL"){
      return productContributionDetail("CIL",r.key).map(x=>demoProductLabel(x.product)+": "+Number(x.amount||0).toLocaleString("id-ID",{maximumFractionDigits:2})).join(" • ")||"Tidak ada exposure";
    }
    return Object.entries(productContributionMap(type,r.key)).map(([p,v])=>demoProductLabel(p)+": "+Number(v||0).toLocaleString("id-ID",{maximumFractionDigits:2})).join(" • ")||"Tidak ada exposure";
  };
  return <Layout screen={type} onNav={nav}>
    <Header title={titleMap[type]} subtitle={subtitleMap[type]}/>
    <div className="page">
      <div className="metric-grid">
        <DomainKpi label={type==="Country"?"Total Capacity Limit":"Total Master Limit"} value={totalLimit.toLocaleString("id-ID",{maximumFractionDigits:2})} sub={unitMap[type]}/>
        <DomainKpi label="Integrated Exposure" value={totalExposure.toLocaleString("id-ID",{maximumFractionDigits:2})} sub="Product utilization"/>
        <DomainKpi label="Utilisasi" value={pct(overallUtil)} sub="Exposure / Master Limit" accent={overallUtil>=1?"red":overallUtil>=0.8?"yellow":""}/>
        <DomainKpi label="Early Warning" value={statusCounts.Warning} sub="80%–<100%" accent="yellow"/>
        <DomainKpi label="Breach" value={statusCounts.Breach} sub="≥100%" accent="red"/>
      </div>
      <section className="card">
        <div className="head"><div><h2>Data Lineage</h2><p>Angka monitoring berasal dari master limit dan product utilization yang sama dengan report.</p></div><span className="chip blue">Master → Integration → Monitoring</span></div>
        <div className="body"><div className="integration-chip-grid">
          <div className="mini integration-chip"><b>1. Master Limit</b><div className="muted-small">{domainDataContract[type].masterDescription}</div></div>
          <div className="mini integration-chip"><b>2. Product Universe</b><div className="muted-small">{(domainIntegrationProducts[type]||[]).map(integrationLabel).join(" • ")}</div></div>
          <div className="mini integration-chip"><b>3. Utilization Inbound</b><div className="muted-small">Source record → target key → aggregation → exposure</div></div>
          <div className="mini integration-chip"><b>4. Monitoring Output</b><div className="muted-small">Utilization + remaining + threshold + EWS/Breach</div></div>
        </div></div>
      </section>
      <section className="card">
        <div className="head"><div><h2>Monitoring Detail</h2><p>Limit, exposure dan product contribution berasal dari canonical demo data.</p></div></div>
        <div className="body"><div className="table-wrap"><table className="table">
          <thead><tr>{
            type==="Country"?<><th>Country Code</th><th>Country</th><th>Capacity Limit</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>:
            type==="CCL"?<><th>Swift</th><th>Bank</th><th>CCL</th><th>Contractual</th><th>Outstanding</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>:
            type==="MLK"?<><th>CIF</th><th>Debitur</th><th>Group</th><th>Master Limit</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>:
            type==="CIL"?<><th>Insurance</th><th>Nama</th><th>CIL</th><th>Nominal Pertanggungan</th><th>Utilisasi CIL</th><th>Status</th><th>Entity Contribution</th></>:
            <><th>Sektor</th><th>Segmen</th><th>Region</th><th>Master Limit</th><th>Outstanding</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>
          }</tr></thead>
          <tbody>{rows.map((r,i)=>{
            const lim=recordLimit(type,r),exp=recordExposure(type,r),u=recordUtil(type,r),st=recordStatus(type,r);
            if(type==="Country") {
  const coverage=countryBookingCoverage(r),a=countryAllocationMetrics(r),pm=countryProductMonitoring(r);
  const productText=pm.map(x=>`${integrationLabel(x.product)}: D ${fmtReport(x.domesticExposure)}/${fmtReport(x.domestic)} (${x.domesticUtil===null?"—":pct(x.domesticUtil)}), O ${fmtReport(x.overseasExposure)}/${fmtReport(x.overseas)} (${x.overseasUtil===null?"—":pct(x.overseasUtil)})`).join(" • ");
  return <tr key={i}><td className="key">{r.key}</td><td>{r.name}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>Capacity D/O: {fmtReport(a.domesticCapacity)} / {fmtReport(a.overseasCapacity)} • {productText}</td></tr>;
}
            if(type==="CCL") return <tr key={i}><td className="key">{r.key}</td><td>{r.name}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{Number(r.contractual||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>{productsText(r)}</td></tr>;
            if(type==="MLK") return <tr key={i}><td className="key">{r.key}</td><td>{r.name}</td><td>{r.group}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>{productsText(r)}</td></tr>;
            if(type==="CIL") return <tr key={i}><td className="key">{r.key}</td><td>{r.name}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>{productsText(r)}</td></tr>;
            return <tr key={i}><td>{r.sector}</td><td>{r.segment}</td><td>{r.region}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>{productsText(r)}</td></tr>;
          })}</tbody>
        </table></div></div>
      </section>
      <section className="card">
        <div className="head"><div><h2>Reconciliation</h2><p>Exposure harus sama dengan penjumlahan contribution source yang terhubung.</p></div></div>
        <div className="body"><div className="metric-grid">
          <DomainKpi label="Records" value={rows.length} sub="Master objects"/>
          <DomainKpi label="Normal" value={statusCounts.Normal} sub="Within threshold"/>
          <DomainKpi label="Warning" value={statusCounts.Warning} sub="Needs monitoring" accent="yellow"/>
          <DomainKpi label="Breach" value={statusCounts.Breach} sub="Above master limit" accent="red"/>
          <DomainKpi label="Data Issue" value={statusCounts["Data Issue"]} sub="Mapping / master quality"/>
        </div></div>
      </section>
    </div>
  </Layout>;
}

function Setup({nav,setSel}){
  const [type,setType]=useState("Country");
  const info=domains[type], linkedProducts=domainIntegrationProducts[type]||[], rows=limasDemoData[type]||[];
  return <Layout screen="setup" onNav={nav}>
    <Header title="Master Limit Setup" subtitle="Repository master limit per domain • utilization product diintegrasikan terpisah"/>
    <div className="page">
      <section className="card">
        <div className="head">
          <div><h2>{type} Master</h2><p>Unique key: <span className="key">{info.key}</span> • hanya approved master limit dan parameter yang disimpan. {type==="LPG"?"Outstanding Bankwide/Region dihitung dari product debtor records.":""}</p></div>
          <div className="toolbar"><button className="btn secondary">Download Template</button><button className="btn primary">Upload Master Limit</button></div>
        </div>
        <div className="body">
          <div className="tabs">{Object.keys(domains).map(d=><button className={"tab "+(d===type?"active":"")} key={d} onClick={()=>setType(d)}>{d}</button>)}</div>
          <div className="toolbar" style={{marginBottom:14}}><input className="input" placeholder={"Cari "+info.key}/><select className="select"><option>Active</option><option>Inactive</option><option>All</option></select><button className="btn ghost">Filter</button></div>
          <div className="table-wrap"><table className="table">
            <thead><tr><th>Unique Key</th><th>Master Object</th><th>{type==="Country"?"Capacity Limit":"Master Limit"}</th><th>Linked Product</th><th>Version</th><th>Status</th><th>Detail</th></tr></thead>
            <tbody>{rows.map((r,i)=><tr key={String(r.key)+i}>
              <td className="key">{r.key}</td>
              <td>{type==="LPG"?(r.sector+" / "+r.segment):(r.name||r.sector)}</td>
              <td>{recordLimit(type,r).toLocaleString("id-ID",{maximumFractionDigits:2})}</td>
              <td>{linkedProducts.map(p=><span key={p} className="chip blue" style={{marginRight:5,marginBottom:4,display:"inline-block"}}>{integrationLabel(p)}</span>)}</td>
              <td>v{loadRecordMeta(type,r.key).version||1}</td><td><Status v={recordStatus(type,r)==="Data Issue"?"Data Issue":(loadRecordMeta(type,r.key).status||"Active")}/></td>
              <td><button className="btn ghost" onClick={()=>{setSel(type);nav("detail",{type,key:r.key})}}>Buka Detail</button></td>
            </tr>)}</tbody>
          </table></div>
          <div className="field-help">Master Limit menyimpan limit/parameter. Outstanding, utilization dan EWS berasal dari Product Utilization Integration.</div>
        </div>
      </section>
    </div>
  </Layout>
}

function sampleKey(t){const m={Country:'AE',CCL:'ANZBAU3M',MLK:'4000264485',CIL:'TUGU + BMRI',LPG:'BATUBARA + Corporate'};return m[t]}
function sampleName(t){const m={Country:'United Arab Emirates',CCL:'Australia and New Zealand Banking Group Limited',MLK:'DJARUM',CIL:'PT Asuransi Tugu Pratama Indonesia Tbk',LPG:'BATUBARA'};return m[t]}


const mdFieldSource={
  Country:{
    "Identitas||No":"Dataset team Country","Identitas||Negara":"Dataset team Country","Identitas||Code":"Dataset team Country","Identitas||Status":"Dataset team Country",
    "Limit & Gap||Capacity Limit":"Dataset Country","Limit & Gap||Capacity Distribution / Domestic":"Dataset Country","Limit & Gap||Capacity Distribution / Overseas":"Dataset Country",
    "Limit & Gap||Product Distribution / CASHLOAN / Domestic Limit":"Dataset Country","Limit & Gap||Product Distribution / CASHLOAN / Overseas Limit":"Dataset Country","Limit & Gap||Product Distribution / CASHLOAN / Total Product Limit":"calc",
    "Limit & Gap||Product Distribution / NON CASH LOAN / Domestic Limit":"Dataset Country","Limit & Gap||Product Distribution / NON CASH LOAN / Overseas Limit":"Dataset Country","Limit & Gap||Product Distribution / NON CASH LOAN / Total Product Limit":"calc",
    "Limit & Gap||Product Distribution / CREDIT LINE / Domestic Limit":"Dataset Country","Limit & Gap||Product Distribution / CREDIT LINE / Overseas Limit":"Dataset Country","Limit & Gap||Product Distribution / CREDIT LINE / Total Product Limit":"calc",
    "Limit & Gap||Product Distribution / BONDS / Domestic Limit":"Dataset Country","Limit & Gap||Product Distribution / BONDS / Overseas Limit":"Dataset Country","Limit & Gap||Product Distribution / BONDS / Total Product Limit":"calc",
    "Limit & Gap||Product Distribution / NOSTRO / Domestic Limit":"Dataset Country","Limit & Gap||Product Distribution / NOSTRO / Overseas Limit":"Dataset Country","Limit & Gap||Product Distribution / NOSTRO / Total Product Limit":"calc",
    "Limit & Gap||Allocated Capacity":"calc","Limit & Gap||Unallocated Capacity":"calc"
  },
  CCL:{
    "Bank Profile||Nama bank":"Dataset Utilisasi FI (provided by FI)",
    "Bank Profile||CIF/Swift":"Internal","Bank Profile||Kategori Bank":"Internal","Bank Profile||Negara":"Internal",
    "Bank Profile||Global Parent Bank":"Belum dicantumkan pada MD",
    "Bank Profile||Apakah Bank termasuk Top 200 Bank Besar Dunia berdasarkan total aset menurut Banker's Almanac":"Belum dicantumkan pada MD",
    "Risk & Capacity||Country Rating":"Tradingeconomics","Risk & Capacity||Bobot":"GET","Risk & Capacity||Rating":"internal","Risk & Capacity||Posisi Rating":"internal","Risk & Capacity||Rating Index":"master rating scale","Risk & Capacity||Limit Inhouse (Rp Miliar)":"dataset ccl","Risk & Capacity||Tier 1 Capital (Rp Miliar)":"data lapkeu Bank","Risk & Capacity||Capacity":"GET","Risk & Capacity||Capacity Limit Adjusted":"GET (adj)",
    "Limit||CCL":"Input manual / keputusan komite","Limit||Utilisasi Capacity":"calc","Limit||Limit Contractual":"Input manual / keputusan komite",
    "BMRI Exposure||Outstanding":"Core Banking Limit System","BMRI Exposure||Jenis Limit":"Core Banking Limit System","BMRI Exposure||Limit":"Core Banking Limit System","BMRI Exposure||Total":"Core Banking Limit System","BMRI Exposure||Bank Loan":"Core Banking Limit System","BMRI Exposure||Commercial Line":"Core Banking Limit System","BMRI Exposure||Treasury Line":"Core Banking Limit System","BMRI Exposure||Utilisasi CCL":"calc","BMRI Exposure||Utilisasi Limit Kontraktual":"calc","BMRI Exposure||Outstanding Maksimum":"Core Banking Limit System","BMRI Exposure||Utilisasi Maksimum Limit Kontraktual":"calc",
    "Perusahaan Anak||Limit":"Input manual / Perusahaan Anak","Perusahaan Anak||Total":"Input manual / Perusahaan Anak","Perusahaan Anak||Bank Loan":"Input manual / Perusahaan Anak","Perusahaan Anak||Commercial Line":"Input manual / Perusahaan Anak","Perusahaan Anak||Treasury Line":"Input manual / Perusahaan Anak","Perusahaan Anak||Utilisasi CCL":"calc","Perusahaan Anak||Utilisasi Limit Kontraktual":"calc","Perusahaan Anak||Utilisasi Maksimum Limit Kontraktual":"calc"
  },
  MLK:{
    "Profil Debitur||Entitas":"Entitas yang state Debitur BMRI/PA",
    "Profil Debitur||CIF":"eMAS/BigData",
    "Profil Debitur||Nama Debitur":"eMAS/BigData",
    "Profil Debitur||Group Usaha":"eMAS/BigData",
    "Profil Debitur||Unit Kerja Pengelola":"NewIPS",
    "Profil Debitur||Group":"eMAS/BigData",
    "Profil Debitur||BUMN/Swasta Flag":"eMAS/BigData",
    "Profil Debitur||Tier":"Belum dicantumkan pada MD",
    "Risk & Regulatory||BMPK Konsol":"New IPS",
    "Risk & Regulatory||Inhouse Limit Konsol":"formula = 90%*BMPKKonsol (BMRI); PA Setup/Mapping",
    "Risk & Regulatory||BMPK/BMPP/BMPD Entitas":"New IPS / WCO",
    "Risk & Regulatory||Inhouse Limit Entitas":"formula = 90%*BMPKEntitas",
    "Risk & Regulatory||Sektor DC":"LIMAST",
    "Risk & Regulatory||DC Sectoral":"LIMAST",
    "Risk & Regulatory||Rating":"LIMAST",
    "Risk & Regulatory||Rating Multiplier":"LIMAST",
    "Risk & Regulatory||Watchlist":"LIMAST",
    "Risk & Regulatory||Discount Factor":"LIMAST",
    "Financial & Capacity||EBITDA/Pengganti EBITDA":"LIMAST",
    "Financial & Capacity||Kredit Bank Lain":"formula : Total Limit BMRI + Kredit Bank Lain",
    "Financial & Capacity||Total Debt":"LIMAST",
    "Financial & Capacity||Borrowing Capacity":"LIMAST",
    "Financial & Capacity||Available BC":"LIMAST",
    "Product Limit & Exposure||CL Bade":"LIMAST",
    "Product Limit & Exposure||CL Limit":"LIMAST",
    "Product Limit & Exposure||NCL Bade":"LIMAST",
    "Product Limit & Exposure||NCL Limit":"LIMAST",
    "Product Limit & Exposure||Treasury Line":"LIMAST",
    "Product Limit & Exposure||Bade Treasury Line":"LIMAST",
    "Product Limit & Exposure||Total Limit Existing":"formula = limit CL dan NCL + TRSLine",
    "Product Limit & Exposure||Total Bade Existing":"formula = bade CL dan NCL + TRSLine",
    "Master Limit||Master Limit Setting":"Master Limit Setting",
    "Master Limit||Master Limit":"formula = if setting master limit kosong, then pilih total limit"
  },
  CIL:{
    "Insurance Profile||No":"various Source",
    "Insurance Profile||Perusahaan Asuransi":"various Source",
    "Insurance Profile||Jenis Perusahaan (Asuransi/Penjaminan)":"list OJK/iCAPS",
    "Insurance Profile||Jenis Produk Asuransi":"list OJK/iCAPS",
    "Capacity & Threshold||Insurance Capacity (IC) (Rp Juta)":"feed by user (final calc)",
    "Capacity & Threshold||Multiplier Terpakai (%)":"feed by user (final calc)",
    "Capacity & Threshold||Consolidated Insurance Threshold (CIT) (Rp Juta)":"feed by user (final calc)",
    "Entity Limit (EIL)||EIL BMRI":"CPR",
    "Entity Limit (EIL)||EIL Mandiri Taspen":"CPR",
    "Entity Limit (EIL)||EIL MTF":"CPR",
    "Entity Limit (EIL)||EIL MUF":"CPR",
    "Consolidated Limit||Consolidated Insurance Limit (CIL) (Rp Juta)":"CIL = sum EIL"
  }
};
const mdFieldDescription={
  Country:{
    "Identitas||No":"Identitas baris pada master monitoring.",
    "Identitas||Negara":"Nama negara sebagai objek monitoring country limit.",
    "Identitas||Code":"Kode negara sebagai key join/mapping exposure product.",
    "Identitas||Status":"Status master country.",
    "Limit & Gap||Capacity Limit":"Approved Country Capacity Limit.",
    "Limit & Gap||Capacity Distribution / Domestic":"Bagian Capacity Limit yang dialokasikan untuk booking Domestic.",
    "Limit & Gap||Capacity Distribution / Overseas":"Bagian Capacity Limit yang dialokasikan untuk booking Overseas.",
    "Limit & Gap||Product Distribution / CASHLOAN / Domestic Limit":"Approved Cash Loan limit untuk booking Domestic.",
    "Limit & Gap||Product Distribution / CASHLOAN / Overseas Limit":"Approved Cash Loan limit untuk booking Overseas.",
    "Limit & Gap||Product Distribution / CASHLOAN / Total Product Limit":"Total approved Cash Loan limit; Domestic + Overseas.",
    "Limit & Gap||Product Distribution / NON CASH LOAN / Domestic Limit":"Approved Non Cash Loan limit untuk booking Domestic.",
    "Limit & Gap||Product Distribution / NON CASH LOAN / Overseas Limit":"Approved Non Cash Loan limit untuk booking Overseas.",
    "Limit & Gap||Product Distribution / NON CASH LOAN / Total Product Limit":"Total approved Non Cash Loan limit; Domestic + Overseas.",
    "Limit & Gap||Product Distribution / CREDIT LINE / Domestic Limit":"Approved Credit Line limit untuk booking Domestic.",
    "Limit & Gap||Product Distribution / CREDIT LINE / Overseas Limit":"Approved Credit Line limit untuk booking Overseas.",
    "Limit & Gap||Product Distribution / CREDIT LINE / Total Product Limit":"Total approved Credit Line limit; Domestic + Overseas.",
    "Limit & Gap||Product Distribution / BONDS / Domestic Limit":"Approved Bonds limit untuk booking Domestic.",
    "Limit & Gap||Product Distribution / BONDS / Overseas Limit":"Approved Bonds limit untuk booking Overseas.",
    "Limit & Gap||Product Distribution / BONDS / Total Product Limit":"Total approved Bonds limit; Domestic + Overseas.",
    "Limit & Gap||Product Distribution / NOSTRO / Domestic Limit":"Approved Nostro limit untuk booking Domestic.",
    "Limit & Gap||Product Distribution / NOSTRO / Overseas Limit":"Approved Nostro limit untuk booking Overseas.",
    "Limit & Gap||Product Distribution / NOSTRO / Total Product Limit":"Total approved Nostro limit; Domestic + Overseas.",
    "Limit & Gap||Allocated Capacity":"Total Capacity yang sudah diturunkan ke seluruh product.",
    "Limit & Gap||Unallocated Capacity":"Sisa Capacity setelah seluruh product allocation."
  },
  CCL:{},
  MLK:{},
  CIL:{
    "Insurance Profile||No":"various Source",
    "Insurance Profile||Perusahaan Asuransi":"various Source",
    "Insurance Profile||Jenis Perusahaan (Asuransi/Penjaminan)":"list OJK/iCAPS",
    "Insurance Profile||Jenis Produk Asuransi":"list OJK/iCAPS",
    "Capacity & Threshold||Insurance Capacity (IC) (Rp Juta)":"feed by user (final calc)",
    "Capacity & Threshold||Multiplier Terpakai (%)":"—",
    "Capacity & Threshold||Consolidated Insurance Threshold (CIT) (Rp Juta)":"feed by user (final calc)",
    "Entity Limit (EIL)||EIL BMRI":"CPR",
    "Entity Limit (EIL)||EIL Mandiri Taspen":"CPR",
    "Entity Limit (EIL)||EIL MTF":"CPR",
    "Entity Limit (EIL)||EIL MUF":"CPR",
    "Consolidated Limit||Consolidated Insurance Limit (CIL) (Rp Juta)":"CIL = sum EIL"
  },
  LPG:{
    "Identitas||Ecosystem LPG (Sektor)":"Dataset LPG_Loanportfolio","Identitas||Segmen LPG":"Dataset LPG_Loanportfolio",
    "Bankwide Limit||Bankwide / Limit":"Risk Management / Business Unit",
    ...Object.fromEntries(LPG_REGIONAL_SCOPES.map(scope=>["Regional Limit||"+scope+" / Limit","Risk Management / Business Unit"]))
  },
    "MLK|Master Limit|Master Limit":"Approved Master Limit yang menjadi reference utilization.",
    "MLK|Product Limit & Exposure|CL Bade":"Current Cash Loan exposure dari LIMAST.",
    "MLK|Product Limit & Exposure|NCL Bade":"Current Non Cash Loan exposure dari LIMAST.",
    "MLK|Product Limit & Exposure|Bade Treasury Line":"Current Treasury Line exposure dari LIMAST.",
    "CIL|Entity Limit (EIL)|EIL BMRI":"Approved EIL BMRI yang menjadi bagian consolidated CIL.",
    "CIL|Entity Limit (EIL)|EIL Mandiri Taspen":"Approved EIL Mandiri Taspen yang menjadi bagian consolidated CIL.",
    "CIL|Entity Limit (EIL)|EIL MTF":"Approved EIL MTF yang menjadi bagian consolidated CIL.",
    "CIL|Entity Limit (EIL)|EIL MUF":"Approved EIL MUF yang menjadi bagian consolidated CIL.",
    "CIL|Consolidated Limit|Consolidated Insurance Limit (CIL) (Rp Juta)":"Approved CIL hasil konsolidasi EIL."
};
const defaultFieldSource=(type,section)=>{
  if(type==="MLK"||type==="LPG") return "Belum dicantumkan pada MD";
  const map={
    Country:{"Identitas":"MD Country","Limit & Gap":"MD Country"},
    CCL:{"Bank Profile":"MD CCL","Risk & Capacity":"MD CCL","Limit":"MD CCL"},
    MLK:{"Profil Debitur":"MLK_Master","Risk & Regulatory":"MLK_Master","Master Limit":"MLK_Master"},
    CIL:{"Insurance Profile":"CIL_Master","Capacity & Threshold":"CIL_Master","Entity Limit (EIL)":"CIL_Master","Consolidated Limit":"CIL_Master"},
    LPG:{"Identitas":"LPG_Loanportfolio","Bankwide Limit":"LPG_Loanportfolio","Regional Limit":"LPG_Loanportfolio"}
  };
  return map[type]?.[section]||"Belum dicantumkan pada MD";
};
const defaultFieldNote=(type,section,field)=>{
  const specific={
    "Country|Identitas|Negara":"Nama negara yang menjadi objek monitoring country limit.",
    "Country|Identitas|Code":"Country code unik yang digunakan sebagai key mapping exposure.",
    "Country|Identitas|Status":"Status master apakah objek masih aktif digunakan dalam monitoring.",
     "Country|Limit & Gap|Capacity Limit":"Approved Country Capacity Limit.",
     "Country|Limit & Gap|Capacity Distribution / Domestic":"Capacity yang dialokasikan untuk booking Domestic.",
     "Country|Limit & Gap|Capacity Distribution / Overseas":"Capacity yang dialokasikan untuk booking Overseas.",
    "CCL|Bank Profile|Nama bank":"Nama counterparty bank yang menjadi objek monitoring CCL.",
    "CCL|Bank Profile|CIF/Swift":"Identifier counterparty yang digunakan untuk matching data exposure.",
    "CCL|Limit|CCL":"Approved Counterparty Credit Limit yang menjadi master monitoring.",
    "CCL|Limit|Limit Contractual":"Batas kontraktual yang digunakan sebagai reference tambahan monitoring.",
    "MLK|Profil Debitur|CIF":"Unique identifier debitur untuk mapping exposure dan Group Usaha.",
    "MLK|Profil Debitur|Nama Debitur":"Nama debitur yang ditampilkan pada monitoring.",
    "MLK|Profil Debitur|Group Usaha":"Group usaha untuk kebutuhan consolidated roll-up.",
    "MLK|Master Limit|Master Limit":"Approved Master Limit yang digunakan sebagai reference monitoring.",
    "CIL|Capacity & Threshold|Insurance Capacity (IC) (Rp Juta)":"Total insurance capacity yang menjadi basis reference monitoring.",
    "CIL|Capacity & Threshold|Consolidated Insurance Threshold (CIT) (Rp Juta)":"Threshold monitoring consolidated insurance.",
    "LPG|Identitas|Ecosystem LPG (Sektor)":"Sektor LPG sebagai objek agregasi monitoring.",
    "LPG|Identitas|Segmen LPG":"Segmen LPG sebagai dimensi master limit dan agregasi; klasifikasi debtor berasal dari product attributes."
    ,"CIL|Entity Limit (EIL)|EIL BMRI":"Approved EIL BMRI yang menjadi bagian dari CIL master."
    ,"CIL|Entity Limit (EIL)|EIL Mandiri Taspen":"Approved EIL Mandiri Taspen yang menjadi bagian dari CIL master."
    ,"CIL|Entity Limit (EIL)|EIL MTF":"Approved EIL MTF yang menjadi bagian dari CIL master."
    ,"CIL|Entity Limit (EIL)|EIL MUF":"Approved EIL MUF yang menjadi bagian dari CIL master."
    ,"CIL|Consolidated Limit|Consolidated Insurance Limit (CIL) (Rp Juta)":"Approved Consolidated Insurance Limit, hasil konsolidasi EIL."
  };
  return specific[`${type}|${section}|${field}`]||`Field ${field} digunakan sebagai ${section.toLowerCase()} untuk monitoring ${type}.`;
};
function loadFieldMeta(type){
  const key=`limas_field_meta_v5_${type}`;
  try{const saved=window.localStorage.getItem(key);if(saved)return JSON.parse(saved);}catch(e){}
  const out={};
  Object.entries(getMasterSections(type)).forEach(([section,rows])=>{
    rows.forEach(([field])=>{
      const id=`${section}||${field}`;
      out[id]={
        source:mdFieldSource[type]?.[id]||defaultFieldSource(type,section),
        note:mdFieldDescription[type]?.[id]||defaultFieldNote(type,section,field)
      };
    });
  });
  return out;
}
function saveFieldMeta(type,data){try{window.localStorage.setItem(`limas_field_meta_v5_${type}`,JSON.stringify(data));}catch(e){}}

function getDemoRecord(type,key){
  const rows=limasDemoData[type]||[];
  if(key!==undefined&&key!==null&&key!==""){
    const found=rows.find(r=>String(r.key)===String(key));
    if(found)return found;
  }
  return rows[0]||null;
}
function countryAllocationMetrics(row){
  const products=["CASHLOAN","NON CASH LOAN","CREDIT LINE","BONDS","NOSTRO"];
  const allocations=row.productAllocations||{},dist=row.capacityDistribution||{};
  const numOrNull=v=>(v===""||v===undefined||v===null||!Number.isFinite(Number(v)))?null:Number(v);
  const domesticCapacity=numOrNull(dist.domesticLimit),overseasCapacity=numOrNull(dist.overseasLimit);
  const items=products.map(product=>{
    const v=allocations[product]||{};
    const domestic=numOrNull(v.domesticLimit),overseas=numOrNull(v.overseasLimit);
    const total=(domestic??0)+(overseas??0);
    return {product,domestic,overseas,total,sourced:domestic!==null||overseas!==null};
  });
  const allocated=items.some(x=>x.sourced)?items.reduce((a,x)=>a+x.total,0):null;
  const allocatedDomestic=items.some(x=>x.domestic!==null)?items.reduce((a,x)=>a+(x.domestic??0),0):null;
  const allocatedOverseas=items.some(x=>x.overseas!==null)?items.reduce((a,x)=>a+(x.overseas??0),0):null;
  const capacity=Number(row.capacityLimit)||0;
  const distributedCapacity=domesticCapacity===null&&overseasCapacity===null?null:(domesticCapacity??0)+(overseasCapacity??0);
  return {items,capacity,domesticCapacity,overseasCapacity,distributedCapacity,
    capacityDistributionGap:distributedCapacity===null?null:capacity-distributedCapacity,
    allocated,allocatedDomestic,allocatedOverseas,
    distributionGapDomestic:domesticCapacity===null||allocatedDomestic===null?null:domesticCapacity-allocatedDomestic,
    distributionGapOverseas:overseasCapacity===null||allocatedOverseas===null?null:overseasCapacity-allocatedOverseas,
    unallocated:allocated===null?null:capacity-allocated};
}
function masterFieldValue(type,section,field,base,row,index){
  if(!row)return base;
  if(type==="Country"){
    const total=limasDemoData.Country.reduce((a,r)=>a+(Number(r.capacityLimit)||0),0);
    const alloc=countryAllocationMetrics(row);
    const parts=field.split(" / ");
    const product=parts[1],sub=parts[2];
    const item=alloc.items.find(x=>x.product===product);
    if(parts[0]==="Product Distribution"&&item&&sub) return sub==="Domestic Limit"?item.domestic:sub==="Overseas Limit"?item.overseas:sub==="Total Product Limit"?item.total:base;
    const map={"No":index+1,"Negara":row.name,"Code":row.key,"Status":row.statusMaster,
      "Capacity Limit":row.capacityLimit,
      "Capacity Distribution / Domestic":alloc.domesticCapacity,
      "Capacity Distribution / Overseas":alloc.overseasCapacity,
      "Allocated Capacity":alloc.allocated,"Unallocated Capacity":alloc.unallocated};
    return Object.prototype.hasOwnProperty.call(map,field)?map[field]:base;
  }
  if(type==="CCL"){
    const p=productContributionMap("CCL",row.key),total=recordExposure("CCL",row);
    const bankLoan=p.CASHLOAN||0,contractualCanonical=(Number(row.contractual)||0)*1000,contractUtil=contractualCanonical?total/contractualCanonical:0;
    const map={"Nama bank":row.name,"CIF/Swift":row.key,"Negara":row.country,"Kategori Bank":row.category,
      "Country Rating":row.countryRating,"Bobot":row.bobot,"Rating":row.rating,"Posisi Rating":row.position,
      "Rating Index":row.ratingIndex,"Limit Inhouse (Rp Miliar)":row.inhouse,"Tier 1 Capital (Rp Miliar)":row.tier1,
      "Capacity":row.capacity,"Capacity Limit Adjusted":row.adjusted,"CCL":row.ccl,"Limit Contractual":row.contractual,
      "Outstanding":total,"Limit":row.ccl,"Total":total,"Bank Loan":bankLoan,
      "Commercial Line":p["CREDIT LINE|Commercial"]||0,"Treasury Line":p["CREDIT LINE|Treasury"]||0,
      "Utilisasi CCL":row.ccl?total/row.ccl:0,"Utilisasi Limit Kontraktual":contractUtil,
      "Outstanding Maksimum":total,"Utilisasi Maksimum Limit Kontraktual":contractUtil};
    return Object.prototype.hasOwnProperty.call(map,field)?map[field]:base;
  }
  if(type==="MLK"){
    const p=productContributionMap("MLK",row.key);
    const clLimit=mlkNum(row.clLimit),nclLimit=mlkNum(row.nclLimit),treasuryLine=mlkNum(row.treasuryLine)??0;
    const clBade=mlkNum(row.clBade)??mlkNum(p.CASHLOAN)??0,nclBade=mlkNum(row.nclBade)??mlkNum(p["NON CASH LOAN"])??0;
    const badeTreasuryLine=mlkNum(row.badeTreasuryLine)??mlkNum(p["CREDIT LINE|Treasury"])??0;
    const totalLimitExisting=mlkNum(row.totalLimitExisting) ?? (clLimit!==null&&nclLimit!==null?clLimit+nclLimit+treasuryLine:null);
    const totalBadeExisting=mlkNum(row.totalBadeExisting) ?? (clBade+nclBade+badeTreasuryLine);
    const map={"Entitas":row.entity,"CIF":row.key,"Nama Debitur":row.name,"Group Usaha":row.groupUsahaHolding||row.group,
      "Unit Kerja Pengelola":row.unitKerja,"Group":row.subGroup||row.group,"BUMN/Swasta Flag":row.bumnSwasta,"Tier":row.tier,
      "BMPK Konsol":row.bmpkKonsol,"Inhouse Limit Konsol":row.inhouseLimitKonsol,"BMPK/BMPP/BMPD Entitas":row.bmpkEntitas,"Inhouse Limit Entitas":row.inhouseLimitEntitas,
      "Sektor DC":row.sektorDC,"DC Sectoral":row.dcSectoral,"Rating":row.rating,"Rating Multiplier":row.ratingMultiplier,"Watchlist":row.watchlist,"Discount Factor":row.discountFactor,
      "EBITDA/Pengganti EBITDA":row.ebitda,"Kredit Bank Lain":row.kreditBankLain,"Total Debt":row.totalDebt,"Borrowing Capacity":row.borrowingCapacity,"Available BC":row.availableBC,"Status Perhitungan":row.statusPerhitungan,
      "CL Bade":clBade,"CL Limit":row.clLimit,"NCL Bade":nclBade,"NCL Limit":row.nclLimit,"Treasury Line":treasuryLine,"Bade Treasury Line":badeTreasuryLine,
      "Total Limit Existing":totalLimitExisting,"Total Bade Existing":totalBadeExisting,"Master Limit Setting":row.masterLimitSetting,"Master Limit":row.masterLimit};
    return Object.prototype.hasOwnProperty.call(map,field)?map[field]:base;
  }
  if(type==="CIL"){
    const rows=productApplicationsFor("CIL",row.key),byEntity={};
    rows.forEach(a=>{const e=a.entity||"Entity";byEntity[e]=(byEntity[e]||0)+(Number(a.amount)||0)});
    const total=recordExposure("CIL",row),projection=cilProjection(row.key);
    const map={"No":index+1,"Perusahaan Asuransi":row.name,"Jenis Perusahaan (Asuransi/Penjaminan)":row.type,
      "Insurance Capacity (IC) (Rp Juta)":row.ic,"Multiplier Terpakai (%)":(row.multiplier*100).toFixed(2)+"%",
      "Consolidated Insurance Threshold (CIT) (Rp Juta)":row.cit,
      "EIL BMRI":row.eils?.BMRI||0,"EIL Mandiri Taspen":row.eils?.["Mandiri Taspen"]||0,"EIL MTF":row.eils?.MTF||0,"EIL MUF":row.eils?.MUF||0,
      "Nominal Pertanggungan BMRI 2025":byEntity.BMRI||0,"Nominal Pertanggungan Mandiri Taspen 2025":byEntity["Mandiri Taspen"]||0,
      "Nominal Pertanggungan MTF 2025":byEntity.MTF||0,"Nominal Pertanggungan MUF 2025":byEntity.MUF||0,
      "Consolidated Insurance Limit (CIL) (Rp Juta)":row.cil,"Total Nominal Pertanggungan All Entitas 2025 (Rp Juta)":total,
      "Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)":projection,
      "Utilisasi CIL (%)":row.cil?total/row.cil:0,"Klasifikasi EWS (PCP)":recordStatus("CIL",row)};
    return Object.prototype.hasOwnProperty.call(map,field)?map[field]:base;
  }
  if(type==="LPG"){
    const map={"No":index+1,"Ecosystem LPG (Sektor)":row.sector,"Segmen LPG":row.segment,"Bankwide / Limit":lpgScopeLimit(row,LPG_BANK_SCOPE)};
    LPG_REGIONAL_SCOPES.forEach(scope=>{map[scope+" / Limit"]=lpgScopeLimit(row,scope);});
    return Object.prototype.hasOwnProperty.call(map,field)?map[field]:base;
  }
  return base;
}

function UtilizationTrace({type,key}){
  const apps=productApplicationsFor(type,key);
  return <section className="card">
    <div className="head"><div><h2>Utilization Source Trace</h2><p>Jejak source record yang benar-benar membentuk outstanding/exposure pada Master Limit ini.</p></div><span className="chip blue">{apps.length} mapped source records</span></div>
    <div className="body">
      {apps.length===0?<div className="mini">Belum ada product utilization yang ter-mapping ke key ini.</div>:
      <div className="table-wrap"><table className="table">
        <thead><tr><th>Product</th><th>Source Record</th><th>Exposure Source Field</th><th>Country Source Field</th><th>Booking Office Source Field</th><th>Booking Type</th><th>Source Value</th><th>Applied Amount</th><th>Runtime Source</th><th>Mapping</th></tr></thead>
        <tbody>{apps.map((a,i)=>{
          const raw=a.sourceData?.[a.exposureField]??"—";
          const label=a.productId==="CREDIT LINE"?(a.scope?"Credit Line • "+a.scope:"Credit Line"):demoProductLabel(a.productId);
          return <tr key={a.recordId+"-"+i}>
            <td><b>{label}</b></td><td className="key">{a.recordId}</td><td>{a.exposureField}</td><td>{productBusinessMappingLabel(a.productId,"country")}</td><td>{a.productId==="CREDIT LINE"?"Not applicable — DN/LN source":productBusinessMappingLabel(a.productId,"booking")}<div className="muted-small">{a.productId==="CREDIT LINE"?"—":(a.bookingOffice||"—")}</div></td><td>{a.productId==="CREDIT LINE"?<Status v="Not Applicable"/>:<Status v={a.bookingOfficeType||"Needs Mapping"}/>}</td><td>{raw}</td><td>{Number(a.amount||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{a.sourceSystem}</td><td><Status v={a.masterMatch?"Normal":"Data Issue"}/><div className="muted-small">{a.masterMatch?"Target master found":"Target master not found"} • {a.transform}</div></td>
          </tr>;
        })}</tbody>
      </table></div>}
      <div className="field-help">Applied Amount adalah nilai yang masuk ke aggregation limit. Source Value menunjukkan nilai asli pada product database; bila ada konversi/normalisasi, transform ditampilkan agar lineage dapat ditelusuri.</div>
    </div>
  </section>;
}
function Detail({nav,type="Country",recordKey=""}){
  const safeType=domains[type]?type:"Country";
  const selectedRecord=getDemoRecord(safeType,recordKey)||getDemoRecord(safeType);

  const selectedIndex=Math.max(0,(limasDemoData[safeType]||[]).findIndex(r=>String(r.key)===String(selectedRecord?.key)));
  const masterSections=getMasterSections(safeType);
  const [tab,setTab]=useState(()=>Object.keys(masterSections)[0]);
  const [meta,setMeta]=useState(()=>loadMasterMeta(safeType));
  const [recordMeta,setRecordMeta]=useState(()=>loadRecordMeta(safeType,recordKey));
  const [fieldMeta,setFieldMeta]=useState(()=>loadFieldMeta(safeType));
  const [editing,setEditing]=useState(false);
  const [savedAt,setSavedAt]=useState("");
  const updateField=(section,field,key,value)=>setFieldMeta(m=>({...m,[`${section}||${field}`]:{...(m[`${section}||${field}`]||{}),[key]:value}}));
  const startEdit=()=>{setMeta(loadMasterMeta(safeType));setRecordMeta(loadRecordMeta(safeType,recordKey));setFieldMeta(loadFieldMeta(safeType));setEditing(true);setSavedAt("");};
  const cancelEdit=()=>{setMeta(loadMasterMeta(safeType));setRecordMeta(loadRecordMeta(safeType,recordKey));setFieldMeta(loadFieldMeta(safeType));setEditing(false);setSavedAt("");};
  const saveChanges=()=>{saveFieldMeta(safeType,fieldMeta);const nextRecord={...recordMeta,version:Number(recordMeta.version||1)+1,lastUpdated:nowLabel(),approvedBy:"Risk Management"};saveRecordMeta(safeType,recordKey,nextRecord);setRecordMeta(nextRecord);setEditing(false);setSavedAt(nextRecord.lastUpdated);};
  const linkedProducts=domainIntegrationProducts[safeType]||[];
  return <Layout screen="detail" onNav={nav}>
    <Header title={`${safeType} • Master Limit Detail`} subtitle={safeType==="Country"?"Approved country capacity, distribution, product allocation dan parameter.":"Approved master limit dan parameter. Utilisasi product dikelola melalui integration layer."}/>
    <div className="page">
      <section className="card">
        <div className="head">
          <div><h2>{safeType==="LPG"?(selectedRecord?.sector+" / "+selectedRecord?.segment):(selectedRecord?.name||selectedRecord?.sector||sampleName(safeType))}</h2><p>Unique Key: <span className="key">{selectedRecord?.key||sampleKey(safeType)}</span> <span className="chip blue" style={{marginLeft:6}}>v{recordMeta.version||1}</span></p></div>
          <div className="toolbar">{!editing?<button className="btn primary" onClick={startEdit}>Edit Field Metadata</button>:<><button className="btn ghost" onClick={cancelEdit}>Batal</button><button className="btn primary" onClick={saveChanges}>Simpan Perubahan</button></>}</div>
        </div>
        <div className="body">
          <div className="tabs">{Object.keys(masterSections).map(s=><button className={`tab ${tab===s?'active':''}`} key={s} onClick={()=>setTab(s)}>{s}</button>)}</div>
          <div className="field-table-wrap">
            <table className="table field-table"><thead><tr><th>Field</th><th>Sample Value</th><th>Source Data</th><th>Keterangan</th></tr></thead>
              <tbody>{(masterSections[tab]||[]).map(([f,v])=>{
                const id=`${tab}||${f}`;
                const fm=fieldMeta[id]||{source:mdFieldSource[safeType]?.[id]||defaultFieldSource(safeType,tab),note:mdFieldDescription[safeType]?.[id]||defaultFieldNote(safeType,tab,f)}; const displayValue=masterFieldValue(safeType,tab,f,v,selectedRecord,selectedIndex);
                return <tr key={f}><td><b>{f}</b></td><td>{displayValue}</td><td>{editing?<input className="input compact field-input" value={fm.source||""} onChange={e=>updateField(tab,f,"source",e.target.value)}/>:<span className="source-text">{fm.source||"—"}</span>}</td><td>{editing?<textarea className="textarea compact-area" value={fm.note||""} onChange={e=>updateField(tab,f,"note",e.target.value)}/>:<span className="note-text">{fm.note||"—"}</span>}</td></tr>;
              })}</tbody>
            </table>
          </div>
          <div className="field-help">Master Limit Detail hanya menyimpan master limit/parameter. Product exposure, outstanding dan utilisasi tidak direplikasi di sini. Untuk CIL, EIL detail ditarik langsung dari canonical CIL master; nominal pertanggungan/produk tetap ditelusuri melalui Utilization Source Trace.</div>
        </div>
      </section>
      <UtilizationTrace type={safeType} key={selectedRecord?.key||recordKey}/>

      <section className="card">
        <div className="head"><div><h2>Linked Product Integration</h2><p>Hanya ringkasan koneksi; detail source field dikelola pada Product Source & Mapping.</p></div><button className="btn secondary" onClick={()=>nav('products')}>Buka Product Mapping</button></div>
        <div className="body"><div className="integration-chip-grid">{linkedProducts.map(p=><div className="mini integration-chip" key={p}><b>{integrationLabel(p)}</b><div style={{fontSize:10,color:"var(--muted)",marginTop:4}}>Product utilization terintegrasi • {p==="CREDIT LINE"?"Commercial + Treasury scope":"linked exposure"}</div></div>)}</div></div>
      </section>
      <section className="card">
        <div className="head"><div><h2>Data Provenance</h2><p>Provenance master limit; Source Data dan Keterangan tersedia per field.</p></div>{savedAt&&<span className="chip blue">Tersimpan {savedAt}</span>}</div>
        <div className="body"><div className="provenance-grid">
          <div className="provenance-box"><span>Sumber Utama</span><b>{meta.source||"—"}</b><small>{meta.dataset||"Dataset / report belum diisi"}</small></div>
          <div className="provenance-box"><span>Source System</span><b>{meta.system||"—"}</b><small>Periode: {meta.period||"—"}</small></div>
          <div className="provenance-box"><span>Data Owner</span><b>{meta.owner||"—"}</b><small>Approved by: {recordMeta.approvedBy||"—"}</small></div>
          <div className="provenance-box"><span>Last Updated</span><b>{meta.lastUpdated||"—"}</b><small>Version master: v{recordMeta.version||1}</small></div>
        </div><div className="source-note"><b>Konteks Source</b><div>{meta.sourceNote||"Belum ada catatan source."}</div></div></div>
      </section>
    </div>
  </Layout>
}




function getProductMeta(productId){
  return typeof productMasterCatalog!=="undefined" ? productMasterCatalog.find(p=>p.id===productId) : null;
}
function productIntegratedDomains(productId){
  return Object.entries(domainIntegrationProducts).filter(([,products])=>products.includes(productId)).map(([domain])=>domain);
}
function sourceName(p){return getProductMeta(p)?.sheet||p}
function sourceKey(p){return getProductMeta(p)?.key||"—"}
function sourceExposure(p){return getProductMeta(p)?.exposure||"—"}

const productMasterCatalog=[
  {id:"CASHLOAN",label:"Cash Loan",sheet:"CASHLOAN",key:"no_cus / no_rek / code",exposure:"total_bade",canonicalUnit:"Rp Juta",status:"Active",source:"master_dataproduk.xlsx • CASHLOAN",note:"Country Exposure memakai field code/Country Code. Booking Office memakai nm_cab; Domestic/Overseas berasal dari reference kantor pembukuan."},
  {id:"NON CASH LOAN",label:"Non Cash Loan",sheet:"NON CASH LOAN",key:"TRXREF",exposure:"EQVIDR / BALANCE",canonicalUnit:"Rp Juta",status:"Active",source:"master_dataproduk.xlsx • NON CASH LOAN",note:"Country Exposure memakai Country Code. Booking Office + Booking Office Type adalah business enrichment/reference yang wajib tersedia untuk identifikasi Country; tidak boleh diinfer dari Country Code."},
  {id:"CREDIT LINE",label:"Credit Line",sheet:"Credit Line (CommLine and TL)",key:"Swift Code Vlookup / Code",exposure:"Credit Line Total Utilisasi",canonicalUnit:"Rp Juta",status:"Active",source:"master_dataproduk.xlsx • Credit Line (CommLine and TL)",note:"Credit Line adalah parent product: Commercial Line + Treasury Line. TDN/TLN/CDN/CLN adalah alias terminology, bukan product terpisah. DN = Domestic dan LN = Overseas."},
  {id:"Investment Line",label:"Investment Line",sheet:"Investment Line",key:"Nama Bank + Entity + Swiftcode",exposure:"Amount Invesment Line",canonicalUnit:"Rp Juta",status:"Future / Scoped",source:"master_dataproduk.xlsx • Investment Line",note:"Source-only/scoped. Belum menjadi linked utilization aktif; canonical unit disiapkan Rp Juta untuk integrasi berikutnya."},
  {id:"BONDS",label:"Bonds",sheet:"BONDS",key:"Securities Name + Issuer Country",exposure:"Amount Eq. IDR Juta",canonicalUnit:"Rp Juta",status:"Active",source:"master_dataproduk.xlsx • BONDS",note:"Country Exposure memakai Issuer Country. Branch adalah source field kantor pembukuan; Issuer Country tidak boleh dipakai sebagai Booking Office."},
  {id:"NOSTRO",label:"Nostro",sheet:"NOSTRO",key:"SwfitCode / Bank Country",exposure:"Balance",canonicalUnit:"Rp Juta",status:"Active",source:"master_dataproduk.xlsx • NOSTRO",note:"Country Exposure memakai Bank Country. Balance tetap source currency; canonical utilization dikonversi ke IDR memakai CCY + FX Rate to IDR + FX Rate Date."},
  {id:"Nominal Pertanggungan",label:"Nominal Pertanggungan",sheet:"CIL_MONITORING",key:"Perusahaan Asuransi + Entitas",exposure:"Nominal Pertanggungan 2025 / Proyeksi 2026",canonicalUnit:"Rp Juta",status:"Active",source:"master_reportMonitoringLimit.xlsx • CIL_MONITORING",note:"Utilisasi CIL membandingkan Nominal Pertanggungan terhadap EIL/CIL. Source berasal dari CIL_MONITORING."}
];

const productBusinessMapping={
  "CASHLOAN":{countryExposureField:"code",countryExposureLabel:"Country Code",bookingOfficeField:"nm_cab",bookingOfficeLabel:"nm_cab",exposureField:"total_bade",exposureLabel:"Total BADE",limitSource:"Country master: Product Distribution / CASHLOAN / Domestic + Overseas Limit"},
  "NON CASH LOAN":{countryExposureField:"Country Code",countryExposureLabel:"Country Code",bookingOfficeField:"Booking Office",bookingOfficeLabel:"Business enrichment / reference",exposureField:"EQVIDR / BALANCE",exposureLabel:"EQVIDR / BALANCE",limitSource:"Country master: Product Distribution / NON CASH LOAN / Domestic + Overseas Limit"},
  "CREDIT LINE":{countryExposureField:"Code",countryExposureLabel:"Code / Negara",bookingOfficeField:null,bookingOfficeLabel:"Tidak diperlukan untuk klasifikasi Domestic/Overseas",exposureField:"Credit Line Total Utilisasi",exposureLabel:"Commercial Line + Treasury Line",limitSource:"Country master: Product Distribution / CREDIT LINE / Domestic + Overseas Limit"},
  "BONDS":{countryExposureField:"Issuer Country",countryExposureLabel:"Issuer Country",bookingOfficeField:"Branch",bookingOfficeLabel:"Branch",exposureField:"Amount Eq. IDR Juta",exposureLabel:"Amount Eq. IDR Juta",limitSource:"Country master: Product Distribution / BONDS / Domestic + Overseas Limit"},
  "NOSTRO":{countryExposureField:"Bank Country",countryExposureLabel:"Bank Country",bookingOfficeField:"Branch",bookingOfficeLabel:"Branch",exposureField:"Balance",exposureLabel:"Balance",limitSource:"Country master: Product Distribution / NOSTRO / Domestic + Overseas Limit"},
  "Investment Line":{countryExposureField:null,countryExposureLabel:"Tidak menjadi Country-linked product saat ini",bookingOfficeField:null,bookingOfficeLabel:"Tidak tersedia / tidak digunakan",exposureField:"Amount Invesment Line",exposureLabel:"Amount Invesment Line",limitSource:"Investment Line source / scoped; tidak menjadi Country master allocation"},
  "Nominal Pertanggungan":{countryExposureField:null,countryExposureLabel:"Tidak relevan",bookingOfficeField:null,bookingOfficeLabel:"Tidak relevan",exposureField:"Nominal Pertanggungan 2025 (Rp Juta)",exposureLabel:"Nominal Pertanggungan 2025",limitSource:"CIL master: EIL / Consolidated Insurance Limit"}
};
const productBusinessEnrichment={
  "NON CASH LOAN":["Booking Office","Booking Office Type"],
};
const productBusinessEnrichmentNote={
  "NON CASH LOAN":"Field enrichment LIMAS karena source NCL belum menyediakan kantor pembukuan. Nilai wajib diisi dari reference/mapping yang disepakati; tidak diinfer dari Country Code, Country Name, Swift Code, atau counterparty.",
};
const productBusinessMappingLabel=(productId,kind)=>{
  // Display labels use the canonical LIMAS business vocabulary; source field names are never renamed.

  const m=productBusinessMapping[productId]||{};
  if(kind==="country") return m.countryExposureField?m.countryExposureField+" → "+m.countryExposureLabel:m.countryExposureLabel||"—";
  if(kind==="booking") return m.bookingOfficeField?m.bookingOfficeField+" → "+m.bookingOfficeLabel:m.bookingOfficeLabel||"—";
  if(kind==="exposure") return m.exposureField||"—";
  if(kind==="limit") return m.limitSource||"—";
  return "—";
};

const productTabSource={
  "CASHLOAN":"CASHLOAN","NON CASH LOAN":"NON CASH LOAN","CREDIT LINE":"Credit Line (CommLine and TL)",
  "Investment Line":"Investment Line","BONDS":"BONDS","NOSTRO":"NOSTRO","Nominal Pertanggungan":"CIL_MONITORING"
};
const creditLineAliasMap={
  "TDN":"Treasury DN",
  "TLN":"Treasury LN",
  "CDN":"Comm DN",
  "CLN":"Comm LN",
  "Treasury Line":"Treasury Line Total",
  "Total Utilisasi":"Treasury Line Total Utilisasi",
  "Comm Line":"Comm Line Total",
  "Comm Line Utilisasi":"Comm Line Total Utilisasi",
  "Credit Line":"Credit Line Total",
  "Credit Line Utilisasi":"Credit Line Total Utilisasi"
};
const creditLineCanonicalFields=[
  {key:"No",label:"No",source:"No",group:"Common"},
  {key:"Nama",label:"Nama",source:"Nama",group:"Common"},
  {key:"Swift Code",label:"Swift Code",source:"Swift Code",group:"Common"},
  {key:"Swift Code Vlookup",label:"Swift Code Vlookup",source:"Swift Code Vlookup",group:"Common"},
  {key:"Code",label:"Code",source:"Code",group:"Common"},
  {key:"Aging Schedule RM",label:"Aging Schedule RM",source:"Aging Schedule RM",group:"Common"},
  {key:"Negara",label:"Negara",source:"Negara",group:"Common"},
  {key:"Bank",label:"Bank",source:"Bank",group:"Common"},
  {key:"RM",label:"RM",source:"RM",group:"Common"},
  {key:"Dept.",label:"Dept.",source:"Dept.",group:"Common"},
  {key:"BMFIR",label:"BMFIR",source:"BMFIR",group:"Common"},
  {key:"Fitch",label:"Fitch",source:"Fitch",group:"Common"},
  {key:"Moody's",label:"Moody's",source:"Moody's",group:"Common"},
  {key:"S&P",label:"S&P",source:"S&P",group:"Common"},
  {key:"Commercial Line Domestic Limit",label:"Commercial Line • Domestic Limit",source:"Comm DN",group:"Commercial Line"},
  {key:"Commercial Line Domestic Utilization",label:"Commercial Line • Domestic Utilization",source:"Comm DN Utilisasi",group:"Commercial Line"},
  {key:"Commercial Line Overseas Limit",label:"Commercial Line • Overseas Limit",source:"Comm LN",group:"Commercial Line"},
  {key:"Commercial Line Overseas Utilization",label:"Commercial Line • Overseas Utilization",source:"Comm LN Utilisasi",group:"Commercial Line"},
  {key:"Commercial Line Total Limit",label:"Commercial Line • Total Limit",source:"Comm Line Total",group:"Commercial Line"},
  {key:"Commercial Line Total Utilization",label:"Commercial Line • Total Utilization",source:"Comm Line Total Utilisasi",group:"Commercial Line"},
  {key:"Treasury Line Domestic Limit",label:"Treasury Line • Domestic Limit",source:"Treasury DN",group:"Treasury Line"},
  {key:"Treasury Line Domestic Utilization",label:"Treasury Line • Domestic Utilization",source:"Treasury DN Utilisasi",group:"Treasury Line"},
  {key:"Treasury Line Overseas Limit",label:"Treasury Line • Overseas Limit",source:"Treasury LN",group:"Treasury Line"},
  {key:"Treasury Line Overseas Utilization",label:"Treasury Line • Overseas Utilization",source:"Treasury LN Utilisasi",group:"Treasury Line"},
  {key:"Treasury Line Total Limit",label:"Treasury Line • Total Limit",source:"Treasury Line Total",group:"Treasury Line"},
  {key:"Treasury Line Total Utilization",label:"Treasury Line • Total Utilization",source:"Treasury Line Total Utilisasi",group:"Treasury Line"},
  {key:"Credit Line Total Limit",label:"Credit Line • Total Limit",source:"Credit Line Total",group:"Credit Line"},
  {key:"Credit Line Total Utilization",label:"Credit Line • Total Utilization",source:"Credit Line Total Utilisasi",group:"Credit Line"}
];
const creditLineCanonicalValue=(data,key)=>{
  const field=creditLineCanonicalFields.find(x=>x.key===key);
  const source=field?.source||creditLineAliasMap[key]||key;
  return data?.[source]===0?0:(data?.[source]||"—");
};

const countryIntegratedProductIds=["CASHLOAN","NON CASH LOAN","CREDIT LINE","BONDS","NOSTRO"];
const productTabFields={
  "CASHLOAN":[...(productFields["CASHLOAN"]||[])],
  "NON CASH LOAN":[...(productFields["NON CASH LOAN"]||[])],
  "Investment Line":[...(productFields["Investment Line"]||[])],
  "BONDS":[...(productFields["BONDS"]||[])],
  "NOSTRO":[...(productFields["NOSTRO"]||[])],
  "Nominal Pertanggungan":[
    "No","Perusahaan Asuransi","Jenis Prudk Asuransi","Entitas","EIL Entitas (Rp Juta)",
    "Nominal Pertanggungan 2025 (Rp Juta)","Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)",
    "Utilisasi EIL (%)","CIL (Rp Juta)","CIT (Rp Juta)","Utilisasi CIL (%)",
    "% Utilisasi (Nominal Pertanggungan/CIL)","% Utilisasi Proyeksi (Nominal Pertanggungan/CIL)",
    "Skor Akreditasi (PCP)","Klasifikasi EWS (PCP)","Status / Rekomendasi Action Plan"
  ]
};

const productSchemaFields=Object.fromEntries(productMasterCatalog.map(p=>[p.id,[...new Set(
  p.id==='Nominal Pertanggungan'?(productTabFields[p.id]||[]):
  p.id==='CREDIT LINE'?creditLineCanonicalFields.map(x=>x.key):
  (productTabFields[p.id]||productFields[p.id]||[])
)]]));

const bookingOfficeReference=[
  {office:'Menara Mandiri Jakarta',officeType:'Domestic',country:'ID',status:'Active'},
  {office:'Bank Mandiri (Europe) Limited London',officeType:'Overseas',country:'GB',status:'Active'},
  {office:'Bank Mandiri Cayman Islands',officeType:'Overseas',country:'KY',status:'Active'},
  {office:'Bank Mandiri Shanghai',officeType:'Overseas',country:'CN',status:'Active'},
  {office:'Bank Mandiri Singapore',officeType:'Overseas',country:'SG',status:'Active'}
];
function resolveBookingOfficeType(office,explicitType=''){
  const raw=String(explicitType||'').trim().toUpperCase();
  if(raw==='DOMESTIC'||raw==='OVERSEAS') return raw==='DOMESTIC'?'Domestic':'Overseas';
  const ref=bookingOfficeReference.find(x=>String(x.office).trim().toUpperCase()===String(office||'').trim().toUpperCase());
  return ref?.officeType||'Needs Mapping';
}
function deriveBookingAttributes(productId,data,meta={}){
  const mapping=productBusinessMapping[productId]||{};
  const officeField=mapping.bookingOfficeField;
  const explicitOffice=meta.bookingOffice??(officeField?data?.[officeField]:"")??"";
  const office=String(explicitOffice||"").trim();
  // Booking Office Type is a reference/derived classification; never infer it from text.
  const explicitType=meta.bookingOfficeType??"";
  const normalizedType=resolveBookingOfficeType(office,explicitType);
  const countryField=mapping.countryExposureField;
  const countryExposure=meta.countryExposure??(countryField?data?.[countryField]:"")??"";
  return {bookingOffice:office||"—",bookingOfficeType:normalizedType,bookingOfficeStatus:normalizedType==="Needs Mapping"?"Needs Mapping":"Mapped",countryExposure:String(countryExposure||"—")};
}
function makeProductRecord(productId,overrides={},applied=[],meta={}){
  const base={};
  (productSchemaFields[productId]||[]).forEach(f=>{base[f]='';});
  Object.assign(base,productSample[productId]||{},overrides);
  return {recordId:meta.recordId||productId+'-DEMO',productId,data:base,applied,sourceSystem:meta.sourceSystem||'Source system / feed belum ditetapkan',asOfDate:meta.asOfDate||E2E_DUMMY_META.asOfDate||"2026-09-30",status:meta.status||'Normal'};
}

const productIntegrationMappings={};
const productDatabase={};

function installE2EDummyDataset(){
  Object.keys(limasDemoData).forEach(k=>delete limasDemoData[k]);
  Object.entries(E2E_MASTER_DATA).forEach(([type,rows])=>{
    limasDemoData[type]=JSON.parse(JSON.stringify(rows));
  });
  Object.keys(productDatabase).forEach(k=>delete productDatabase[k]);
  Object.keys(productIntegrationMappings).forEach(k=>delete productIntegrationMappings[k]);

  Object.entries(E2E_DUMMY_PRODUCT_DATA).forEach(([productId,specs])=>{
    productDatabase[productId]=specs.map(spec=>{
      const record=makeProductRecord(productId,spec.data||{},[],spec.meta||{});
      const fields=productSchemaFields[productId]||[];
      record.data=Object.fromEntries(fields.map(f=>{
        const canonical=productId==="CREDIT LINE"?creditLineCanonicalFields.find(x=>x.key===f):null;
        const sourceKey=canonical?.source||f;
        return [f,spec.data?.[f]??spec.data?.[sourceKey]??''];
      }));
      record.applied=[];
      return record;
    });
    if(productDatabase[productId]?.[0])productSample[productId]={...productDatabase[productId][0].data};
  });
}

const DOMAIN_CANONICAL_UNITS={
  Country:"Rp Juta",
  CCL:"Rp Juta",
  MLK:"Rp Juta",
  CIL:"Rp Juta",
  LPG:"Rp Juta"
};
const productCanonicalTransform=(domain,productId,row)=>{
  const d=row?.data||{};
  const targetUnit=DOMAIN_CANONICAL_UNITS[domain]||"Rp Juta";
  if(productId==="NON CASH LOAN"){
    const dwhIdr=String(row?.sourceSystem||"").startsWith("DWH")&&String(d.CCY||"").toUpperCase()==="IDR";
    return dwhIdr
      ? {sourceUnit:"Rp Juta",targetUnit,factor:1,description:"DWH IDR context: use BALANCE already expressed in Rp Juta."}
      : {sourceUnit:"Rp",targetUnit,factor:0.000001,description:"Normalize EQVIDR from IDR (Rp) to canonical Rp Juta."};
  }
  if(productId==="NOSTRO"){
    const fx=Number(d["FX Rate to IDR"]);
    return Number.isFinite(fx)&&fx>0
      ? {sourceUnit:String(d.CCY||"Source Currency"),targetUnit:"Rp Juta",factor:fx/1000000,description:"Convert Balance in source currency to IDR using FX Rate to IDR, then normalize to Rp Juta."}
      : {sourceUnit:String(d.CCY||"Source Currency"),targetUnit:"Rp Juta",factor:0,description:"FX metadata is missing or invalid; canonical IDR utilization cannot be calculated."};
  }
  if(productId==="BONDS")return {sourceUnit:"Rp Juta",targetUnit,factor:1,description:"Use Amount Eq. IDR Juta as canonical exposure."};
  if(productId==="CREDIT LINE")return {sourceUnit:"Rp Juta",targetUnit,factor:1,description:"Credit Line utilization is source-native in Rp Juta; DN/LN semantics remain source-native."};
  if(productId==="CASHLOAN")return {sourceUnit:"Rp Juta",targetUnit,factor:1,description:"Use Total BADE as canonical exposure in Rp Juta."};
  if(productId==="Nominal Pertanggungan")return {sourceUnit:"Rp Juta",targetUnit:"Rp Juta",factor:1,description:"Use Nominal Pertanggungan as canonical exposure in Rp Juta."};
  return {sourceUnit:targetUnit,targetUnit,factor:1,description:"Direct canonical unit."};
};
function normalizeAppliedAmount(domain,productId,raw,row){
  const value=Number(raw)||0;
  const t=productCanonicalTransform(domain,productId,row);
  const amount=productId==="NOSTRO"?Number(row?.data?.Balance||0)*t.factor:value*t.factor;
  return {amount,sourceUnit:t.sourceUnit,targetUnit:t.targetUnit,factor:t.factor,transform:t.description};
}
function normalizeLpgSegment(value){
  const raw=String(value??"").trim();
  if(/^sme$/i.test(raw))return "SME";
  if(/^small\s*medium/i.test(raw))return "SME";
  if(/^micro$/i.test(raw))return "Micro";
  return raw;
}
function canonicalizeProductBusinessValues(r){
  const data=r?.data||{};
  if(data.code!==undefined)data.code=String(data.code||"").trim().toUpperCase();
  if(data["Country Code"]!==undefined)data["Country Code"]=String(data["Country Code"]||"").trim().toUpperCase();
  if(data["Issuer Country"]!==undefined)data["Issuer Country"]=String(data["Issuer Country"]||"").trim().toUpperCase();
  if(data["Bank Country"]!==undefined)data["Bank Country"]=String(data["Bank Country"]||"").trim().toUpperCase();
  if(data.CCY!==undefined)data.CCY=String(data.CCY||"").trim().toUpperCase();
  if(data.ecosystem_lpg!==undefined)data.ecosystem_lpg=String(data.ecosystem_lpg||"").trim();
  if(data.segmen_lpg!==undefined)data.segmen_lpg=normalizeLpgSegment(data.segmen_lpg);
  if(data.region_lpg!==undefined)data.region_lpg=String(data.region_lpg||"").trim();
}
function productSourceField(productId,domain){
  if(domain==="Country"){
    if(productId==="CASHLOAN")return "code";
    if(productId==="NON CASH LOAN")return "Country Code";
    if(productId==="CREDIT LINE")return "Code";
    if(productId==="BONDS")return "Issuer Country";
    if(productId==="NOSTRO")return "Bank Country";
  }
  if(domain==="CCL"){
    if(productId==="CREDIT LINE")return "Swift Code Vlookup";
    if(productId==="NON CASH LOAN")return "Swift Code";
  }
  if(domain==="MLK"){
    if(productId==="CASHLOAN")return "no_cus";
    if(productId==="NON CASH LOAN")return "CUSTID";
  }
  if(domain==="CIL"&&productId==="Nominal Pertanggungan")return "Perusahaan Asuransi";
  if(domain==="LPG")return "ecosystem_lpg / segmen_lpg";
  return "—";
}
function productRawExposure(productId,row,domain){
  const d=row?.data||{};
  if(productId==="CASHLOAN")return Number(d.total_bade)||0;
  if(productId==="NON CASH LOAN"){
    if(domain==="LPG"&&String(row?.sourceSystem||"").startsWith("DWH")&&String(d.CCY||"").toUpperCase()==="IDR")return Number(d.BALANCE)||0;
    return Number(d.EQVIDR)||0;
  }
  if(productId==="CREDIT LINE")return Number(d["Credit Line Total Utilisasi"])||0;
  if(productId==="BONDS")return Number(d["Amount Eq. IDR Juta"])||0;
  if(productId==="NOSTRO")return Number(d.Balance)||0;
  if(productId==="Nominal Pertanggungan")return Number(d["Nominal Pertanggungan 2025 (Rp Juta)"])||0;
  return 0;
}
function addIntegrationMapping(productId,row,config){
  const key=String(config.key??"").trim();
  if(!key)return;
  const masterRows=limasDemoData[config.limitType]||[];
  const master=masterRows.find(m=>String(m.key).trim().toUpperCase()===key.toUpperCase());
  const booking=deriveBookingAttributes(productId,row.data||{},config.meta||{});
  const raw=Number(config.amount??productRawExposure(productId,row,config.limitType))||0;
  const entry={
    limitType:config.limitType,key,amount:raw,label:config.label||demoProductLabel(productId),
    productId,recordId:row.recordId,sourceField:config.sourceField||productSourceField(productId,config.limitType),
    sourceValue:config.sourceValue??key,mappingRule:config.mappingRule||"Source key -> target master key",
    scope:config.scope||null,entity:config.entity||null,masterMatch:Boolean(master),
    masterObject:master?.name||master?.sector||master?.key||"—",
    bookingOffice:config.bookingOffice??booking.bookingOffice,
    bookingOfficeType:config.bookingOfficeType??booking.bookingOfficeType,
    bookingOfficeStatus:config.bookingOfficeStatus??booking.bookingOfficeStatus,
    countryExposure:config.countryExposure??(config.limitType==="Country"?key:"—"),
    sourceSystem:row.sourceSystem,asOfDate:row.asOfDate
  };
  (productIntegrationMappings[productId]??=[]).push(entry);
}
function buildProductIntegrationMappings(){
  Object.keys(productIntegrationMappings).forEach(k=>delete productIntegrationMappings[k]);

  (productDatabase.CASHLOAN||[]).forEach(r=>{
    const d=r.data||{},code=String(d.code||"").trim(),cif=String(d.no_cus||"").trim();
    if(code)addIntegrationMapping("CASHLOAN",r,{limitType:"Country",key:code,amount:d.total_bade,label:"Cash Loan",sourceField:"code",sourceValue:code,mappingRule:"Cash Loan code -> Country Code"});
    if(cif)addIntegrationMapping("CASHLOAN",r,{limitType:"MLK",key:cif,amount:d.total_bade,label:"Cash Loan",sourceField:"no_cus",sourceValue:cif,mappingRule:"Cash Loan no_cus -> MLK CIF"});
  });

  (productDatabase["NON CASH LOAN"]||[]).forEach(r=>{
    const d=r.data||{},country=String(d["Country Code"]||"").trim(),cif=String(d.CUSTID||"").trim(),swift=String(d["Swift Code"]||"").trim();
    if(country)addIntegrationMapping("NON CASH LOAN",r,{limitType:"Country",key:country,amount:d.EQVIDR,label:"Non Cash Loan",sourceField:"Country Code",sourceValue:country,mappingRule:"NCL Country Code -> Country Code"});
    if(cif)addIntegrationMapping("NON CASH LOAN",r,{limitType:"MLK",key:cif,amount:d.EQVIDR,label:"Non Cash Loan",sourceField:"CUSTID",sourceValue:cif,mappingRule:"NCL CUSTID -> MLK CIF"});
    if(swift)addIntegrationMapping("NON CASH LOAN",r,{limitType:"CCL",key:swift,amount:d.EQVIDR,label:"Non Cash Loan",sourceField:"Swift Code",sourceValue:swift,mappingRule:"NCL Swift Code -> CCL Swift"});
    const sector=String(d.ecosystem_lpg||"").trim(),segment=normalizeLpgSegment(d.segmen_lpg);
    if(sector&&segment){
      const scope=String(d.region_lpg||"").trim();
      addIntegrationMapping("NON CASH LOAN",r,{limitType:"LPG",key:sector+"|"+segment,amount:d.EQVIDR,label:"Non Cash Loan",scope:scope||null,sourceField:"ecosystem_lpg / segmen_lpg",sourceValue:sector+" / "+segment,mappingRule:"NCL debtor attributes -> LPG Ecosystem x Segment x Scope"});
    }
  });

  (productDatabase["CREDIT LINE"]||[]).forEach(r=>{
    const d=r.data||{},swift=String(d["Swift Code Vlookup"]||d["Swift Code"]||"").trim(),total=Number(d["Credit Line Total Utilisasi"]||0),country=String(d.Code||"").trim();
    if(swift)addIntegrationMapping("CREDIT LINE",r,{limitType:"CCL",key:swift,amount:total,label:"Credit Line",sourceField:"Swift Code Vlookup",sourceValue:swift,mappingRule:"Credit Line Swift Code Vlookup -> CCL Swift"});
    if(country){
      const components=[
        ["Commercial","Comm DN Utilisasi","Domestic"],["Commercial","Comm LN Utilisasi","Overseas"],
        ["Treasury","Treasury DN Utilisasi","Domestic"],["Treasury","Treasury LN Utilisasi","Overseas"]
      ];
      components.forEach(([scope,field,bo])=>{
        const amount=Number(String(d[field]??"").replace(/,/g,""))||0;
        if(amount!==0)addIntegrationMapping("CREDIT LINE",r,{limitType:"Country",key:country,amount,label:"Credit Line",scope,sourceField:field,sourceValue:d[field],mappingRule:"Credit Line "+scope+" "+bo+" utilization -> Country "+bo});
      });
    }
  });

  (productDatabase.BONDS||[]).forEach(r=>{
    const d=r.data||{},country=String(d["Issuer Country"]||"").trim();
    if(country)addIntegrationMapping("BONDS",r,{limitType:"Country",key:country,amount:d["Amount Eq. IDR Juta"],label:"Bonds",sourceField:"Issuer Country",sourceValue:country,bookingOffice:d.Branch||"—",mappingRule:"Bonds Issuer Country -> Country Code",meta:{bookingOffice:d.Branch||""}});
  });

  (productDatabase.NOSTRO||[]).forEach(r=>{
    const d=r.data||{},country=String(d["Bank Country"]||"").trim();
    if(country)addIntegrationMapping("NOSTRO",r,{limitType:"Country",key:country,amount:d.Balance,label:"Nostro",sourceField:"Bank Country",sourceValue:country,bookingOffice:d.Branch||"—",mappingRule:"Nostro Bank Country -> Country Code",meta:{bookingOffice:d.Branch||""}});
  });

  (productDatabase["Nominal Pertanggungan"]||[]).forEach(r=>{
    const d=r.data||{},insurer=String(d["Perusahaan Asuransi"]||"").trim(),entity=String(d.Entitas||"").trim();
    if(insurer)addIntegrationMapping("Nominal Pertanggungan",r,{limitType:"CIL",key:insurer,entity,amount:d["Nominal Pertanggungan 2025 (Rp Juta)"],label:"Nominal Pertanggungan",sourceField:"Perusahaan Asuransi",sourceValue:insurer,mappingRule:"Insurance Company + Entity -> CIL master"});
  });

  ["CASHLOAN","NON CASH LOAN"].forEach(productId=>{
    (productDatabase[productId]||[]).forEach(r=>{
      const d=r.data||{},sector=String(d.ecosystem_lpg||"").trim(),segment=normalizeLpgSegment(d.segmen_lpg);
      if(!sector||!segment)return;
      const scope=String(d.region_lpg||"").trim();
      addIntegrationMapping(productId,r,{limitType:"LPG",key:sector+"|"+segment,amount:productRawExposure(productId,r,"LPG"),label:productId==="CASHLOAN"?"Cash Loan":"Non Cash Loan",scope:scope||null,sourceField:"ecosystem_lpg / segmen_lpg",sourceValue:sector+" / "+segment,mappingRule:"Product LPG attributes -> Ecosystem x Segment x Scope"});
    });
  });
}

function cleanseMasterData(){
  (limasDemoData.Country||[]).forEach(r=>{
    delete r.masterLimit;
    r.capacityLimit=Number(Number(r.capacityLimit||0).toFixed(2));
    r.statusMaster=r.statusMaster||"Exist";
  });
  (limasDemoData.MLK||[]).forEach(r=>{
    const clLimit=mlkNum(r.clLimit),nclLimit=mlkNum(r.nclLimit),treasuryLimit=mlkNum(r.treasuryLine);
    if(clLimit!==null&&nclLimit!==null&&treasuryLimit!==null)r.totalLimitExisting=clLimit+nclLimit+treasuryLimit;
    if(r.masterLimitSetting===null||r.masterLimitSetting===undefined||r.masterLimitSetting==="")r.masterLimit=r.totalLimitExisting??r.masterLimit;
  });
  (limasDemoData.CIL||[]).forEach(r=>{
    const sumEil=Object.values(r.eils||{}).reduce((a,v)=>a+(Number(v)||0),0);
    if(sumEil>0)r.cil=Number(sumEil.toFixed(2));
    if(Number(r.ic)>0&&Number(r.multiplier)>0)r.cit=Number((r.ic*r.multiplier).toFixed(2));
  });
  (limasDemoData.LPG||[]).forEach(r=>{
    const bankwide=Number(r.limits?.Bankwide)||0;
    const regionValues=LPG_REGIONAL_SCOPES.map(s=>r.limits?.[s]).filter(v=>v!==undefined&&v!==null).map(Number);
    if(r.limits&&regionValues.length===LPG_REGIONAL_SCOPES.length&&r.limits["KP + OVS"]!==undefined){
      const regional=regionValues.reduce((a,v)=>a+(Number(v)||0),0);
      r.limits["KP + OVS"]=Number((bankwide-regional).toFixed(2));
    }
  });
  Object.values(productDatabase||{}).flat().forEach(canonicalizeProductBusinessValues);
}

function productApplicationsFor(type,key){
  if(type==="LPG")return lpgProductApplicationsForKey(key);
  const out=[];
  const exposureField=(domain,productId,scope)=>{
    if(productId==="CASHLOAN")return "total_bade";
    if(productId==="NON CASH LOAN")return "EQVIDR / BALANCE";
    if(productId==="CREDIT LINE"){
      if(domain==="CCL")return "Credit Line Total Utilisasi";
      if(scope==="Commercial")return "Comm Line Total Utilisasi";
      if(scope==="Treasury")return "Treasury Line Total Utilisasi";
      return "Credit Line Total Utilisasi";
    }
    if(productId==="BONDS")return "Amount Eq. IDR Juta";
    if(productId==="NOSTRO")return "Balance";
    if(productId==="Nominal Pertanggungan")return "Nominal Pertanggungan 2025 (Rp Juta)";
    return getProductMeta(productId)?.exposure||"—";
  };
  const transform=(productId,scope)=>{
    if(productId==="NON CASH LOAN")return "EQVIDR/BALANCE normalized to domain canonical unit";
    if(productId==="CREDIT LINE"){
      return (scope==="Commercial"||scope==="Treasury")
        ?"DN/LN source-native; Commercial + Treasury hierarchy forms Credit Line Total"
        :"DN/LN source-native; Credit Line Total is parent utilization";
    }
    return "Direct / canonical source unit";
  };
  Object.entries(productIntegrationMappings).forEach(([productId,mappings])=>{
    (mappings||[]).forEach(a=>{
      if(a.limitType!==type||String(a.key)!==String(key))return;
      const r=(productDatabase[productId]||[]).find(x=>String(x.recordId)===String(a.recordId));
      if(!r)return;
      const normalized=normalizeAppliedAmount(type,productId,a.amount,r);
      out.push({
        ...a,productId,recordId:r.recordId,sourceSystem:r.sourceSystem,sourceData:r.data,
        exposureField:exposureField(type,productId,a.scope),transform:transform(productId,a.scope),
        sourceUnit:normalized.sourceUnit,targetUnit:normalized.targetUnit,normalizationFactor:normalized.factor,
        normalizedAmount:normalized.amount,masterMatch:(limasDemoData[type]||[]).some(m=>String(m.key)===String(a.key)),
        bookingOffice:a.bookingOffice||"—",bookingOfficeType:a.bookingOfficeType||"Needs Mapping",
        bookingOfficeStatus:a.bookingOfficeStatus||"Needs Mapping",countryExposure:a.countryExposure||"—"
      });
    });
  });
  return out;
}
function canonicalReadModelRows(){
  const rows=[];
  Object.entries(domainDataContract).forEach(([domain,cfg])=>{
    (limasDemoData[domain]||[]).forEach(master=>{
      const apps=productApplicationsFor(domain,master.key);
      if(!apps.length){
        rows.push({
          domain,masterKey:master.key,masterObject:master.name||master.sector||master.key,
          product:"—",recordId:"—",sourceSystem:"—",sourceField:"—",sourceAmount:null,
          sourceUnit:"—",targetUnit:DOMAIN_CANONICAL_UNITS[domain]||"—",normalizedExposure:null,
          bookingOffice:"—",bookingOfficeType:"—",scope:"—",
          mappingStatus:"No Product Data",utilization:recordUtil(domain,master),status:recordStatus(domain,master)
        });
      }else{
        apps.forEach(a=>{
          const mappingStatus=!a.masterMatch?"Master Not Found":
            (domain==="Country"&&a.bookingOfficeType==="Needs Mapping"?"Needs Booking Mapping":"Mapped");
          rows.push({
            domain,masterKey:master.key,masterObject:master.name||master.sector||master.key,
            product:demoProductLabel(a.productId),recordId:a.recordId,sourceSystem:a.sourceSystem,
            sourceField:a.exposureField,sourceAmount:a.amount,sourceUnit:a.sourceUnit,
            targetUnit:a.targetUnit,normalizedExposure:a.normalizedAmount,
            bookingOffice:a.bookingOffice,bookingOfficeType:a.bookingOfficeType,scope:a.scope||"—",
            mappingStatus,utilization:recordUtil(domain,master),status:recordStatus(domain,master)
          });
        });
      }
    });
  });
  return rows;
}

function reconciliationIssues(){
  const issues=[];
  const countryProducts=["CASHLOAN","NON CASH LOAN","CREDIT LINE","BONDS","NOSTRO"];

  Object.entries(productDatabase).forEach(([productId,rows])=>{
    (rows||[]).forEach(row=>{
      const d=row.data||{};
      if(countryProducts.includes(productId)){
        const field=productSourceField(productId,"Country");
        const key=String(d[field]??"").trim();
        const mappings=(productIntegrationMappings[productId]||[]).filter(a=>a.limitType==="Country"&&String(a.recordId)===String(row.recordId));
        if(!key){
          issues.push({status:"Data Issue",issueType:"MISSING_COUNTRY_KEY",productId,recordId:row.recordId,limitType:"Country",key:"—",object:"—",detail:productId+" does not have source Country Exposure in field "+field,amount:0});
        }else if(!mappings.length){
          issues.push({status:"Data Issue",issueType:"COUNTRY_MAPPING_MISSING",productId,recordId:row.recordId,limitType:"Country",key,object:"—",detail:"Source Country key exists but no mapping candidate was created.",amount:0});
        }else if(productId!=="CREDIT LINE"&&mappings.some(a=>a.bookingOfficeType==="Needs Mapping")){
          const a=mappings.find(x=>x.bookingOfficeType==="Needs Mapping")||mappings[0];
          issues.push({status:"Data Issue",issueType:"MISSING_BOOKING_MAPPING",productId,recordId:row.recordId,limitType:"Country",key,object:a.masterObject||"—",detail:"Country mapping needs Booking Office Type from reference/enrichment; source record does not provide the classification.",amount:0});
        }
      }
    });
  });

  Object.entries(productIntegrationMappings).forEach(([productId,mappings])=>(mappings||[]).forEach(a=>{
    const master=(limasDemoData[a.limitType]||[]).find(m=>String(m.key).trim().toUpperCase()===String(a.key).trim().toUpperCase());
    const row=(productDatabase[productId]||[]).find(r=>String(r.recordId)===String(a.recordId));
    const normalized=row?normalizeAppliedAmount(a.limitType,productId,a.amount,row).amount:(Number(a.amount)||0);
    if(!master&&normalized!==0){
      issues.push({status:"Data Issue",issueType:"MASTER_NOT_FOUND",productId,recordId:a.recordId,limitType:a.limitType,key:a.key,object:a.masterObject||"—",detail:"Integration mapping points to a master key that is not available.",amount:normalized});
    }
    if(Number(a.amount||0)<0){
      issues.push({status:"Data Issue",issueType:"NEGATIVE_EXPOSURE",productId,recordId:a.recordId,limitType:a.limitType,key:a.key,object:a.masterObject||"—",detail:"Integration exposure cannot be negative.",amount:Number(a.amount)||0});
    }
    if(productId==="CREDIT LINE"&&a.limitType==="CCL"&&master&&row){
      const sourceNameValue=String(row.data?.Nama||"").trim().toLowerCase();
      const masterName=String(master.name||"").trim().toLowerCase();
      if(sourceNameValue&&masterName&&sourceNameValue!==masterName){
        issues.push({status:"Data Issue",issueType:"INVALID_IDENTITY",productId,recordId:a.recordId,limitType:"CCL",key:a.key,object:master.name,detail:"Nama product tidak sama dengan nama master untuk CCL mapping.",amount:0});
      }
    }
  }));
  return issues;
}
function canonicalExceptions(){
  const rows=[];
  Object.keys(limasDemoData).forEach(type=>(limasDemoData[type]||[]).forEach(r=>{
    const st=recordStatus(type,r);
    if(st==="Warning"||st==="Breach"||st==="Data Issue"){
      rows.push({status:st,domain:type,key:r.key,object:r.name||r.sector,limit:recordLimit(type,r),exposure:recordExposure(type,r),util:recordUtil(type,r),threshold:st==="Breach"?"100%":st==="Warning"?"80%":"—",detail:st==="Data Issue"?(r.dataQuality||"Master data quality issue"):"Canonical monitoring exception"});
    }
  }));
  reconciliationIssues().filter(x=>x.status==="Data Issue").forEach(x=>rows.push({status:"Data Issue",domain:x.limitType,key:x.key,object:x.object,limit:"—",exposure:x.amount,util:0,threshold:"—",detail:x.issueType+" • "+x.detail+" • "+x.recordId}));
  const existingExceptionKeys=new Set(rows.map(x=>[x.domain,x.key,x.detail].join("|")));
  canonicalProductQualityIssues().forEach(x=>{
    const item={status:"Data Issue",domain:x.limitType||"Product Database",key:x.key||x.recordId,object:x.productId,limit:"—",exposure:0,util:0,threshold:"—",detail:x.type+" • "+x.detail+" • "+x.recordId};
    const k=[item.domain,item.key,item.detail].join("|");
    if(!existingExceptionKeys.has(k)){rows.push(item);existingExceptionKeys.add(k);}
  });
  return rows;
}
function productContributionMap(type,key){
  const map={};
  const row=type==="LPG"?lpgDisplayRows().find(r=>String(r.key)===String(key)):null;
  const apps=type==="LPG"&&row?.segment==="TOTAL SEKTOR"
    ? lpgLeafRows().filter(x=>x.sector===row.sector).flatMap(x=>productApplicationsFor("LPG",x.key))
    : productApplicationsFor(type,key);
  apps.forEach(a=>{
    if(type==="CCL"&&a.productId==="CREDIT LINE"){
      const d=a.sourceData||{};
      const comm=(Number(String(d["Comm DN Utilisasi"]??"").replace(/,/g,""))||0)+(Number(String(d["Comm LN Utilisasi"]??"").replace(/,/g,""))||0);
      const trs=(Number(String(d["Treasury DN Utilisasi"]??"").replace(/,/g,""))||0)+(Number(String(d["Treasury LN Utilisasi"]??"").replace(/,/g,""))||0);
      map["CREDIT LINE|Commercial"]=(map["CREDIT LINE|Commercial"]||0)+comm;
      map["CREDIT LINE|Treasury"]=(map["CREDIT LINE|Treasury"]||0)+trs;
      return;
    }
    const k=a.productId==="CREDIT LINE"?"CREDIT LINE|"+(a.scope||"Common"):a.productId;
    map[k]=(map[k]||0)+(Number(a.normalizedAmount??a.amount)||0);
  });
  return map;
}
function productContributionDetail(type,key){return Object.entries(productContributionMap(type,key)).map(([product,amount])=>({product,amount})).filter(x=>x.amount!==0);}

function canonicalProductQualityIssues(){
  const issues=[];
  Object.entries(productDatabase).forEach(([productId,rows])=>{
    const seenRecordIds=new Set();
    rows.forEach(r=>{
      const d=r.data||{};
      if(seenRecordIds.has(String(r.recordId)))issues.push({layer:"Product Database",productId,recordId:r.recordId,type:"DUPLICATE_RECORD_ID",detail:"Product record ID is duplicated."});
      seenRecordIds.add(String(r.recordId));
      if(productId==="CASHLOAN"&&(!d.no_cus||!d.no_rek))issues.push({layer:"Product Database",productId,recordId:r.recordId,type:"MISSING_IDENTIFIER",detail:"Cash Loan requires customer/account identifier."});
      if(productId==="NON CASH LOAN"&&(!d.CUSTID||!d.TRXREF))issues.push({layer:"Product Database",productId,recordId:r.recordId,type:"MISSING_IDENTIFIER",detail:"NCL requires CUSTID and TRXREF."});
      if(productId==="CREDIT LINE"){
        const audit=creditLineAuditRows([r])[0];
        if(audit.status==="Data Issue")issues.push({layer:"Product Database",productId,recordId:r.recordId,type:"CREDIT_LINE_RECONCILIATION",detail:audit.issues.join(" • ")});
      }
      if(productId==="BONDS"){
        if(!d["Securities Name"]||!d["Issuer Country"])issues.push({layer:"Product Database",productId,recordId:r.recordId,type:"MISSING_KEY",detail:"Bonds requires Security and Issuer Country."});
        const nominal=Number(String(d.Amount??"").replace(/,/g,""))||0,eq=Number(String(d["Amount Eq. IDR Juta"]??"").replace(/,/g,""))||0;
        if(nominal&&eq&&Math.abs(nominal/1000000-eq)>.01)issues.push({layer:"Product Database",productId,recordId:r.recordId,type:"BONDS_EQ_IDR_MISMATCH",detail:"Amount does not reconcile to Amount Eq. IDR Juta."});
      }
      if(productId==="NOSTRO"&&(!d.SwfitCode||!d["Bank Country"]))issues.push({layer:"Product Database",productId,recordId:r.recordId,type:"MISSING_KEY",detail:"Nostro requires Swift identifier and Bank Country."});
      if(productId==="NOSTRO"&&(!d.CCY||!(Number(d["FX Rate to IDR"])>0)||!d["FX Rate Date"]))issues.push({layer:"Product Database",productId,recordId:r.recordId,type:"MISSING_FX_METADATA",detail:"Nostro canonical IDR utilization requires CCY, positive FX Rate to IDR, and FX Rate Date."});
      if(productId==="Nominal Pertanggungan"&&(!d["Perusahaan Asuransi"]||!d.Entitas))issues.push({layer:"Product Database",productId,recordId:r.recordId,type:"MISSING_KEY",detail:"CIL utilization requires insurer and entity."});
    });
  });
  return issues;
}

function masterCanonicalQualityIssues(){
  const issues=[];
  Object.entries(limasDemoData).forEach(([type,rows])=>{
    const seen=new Set();
    rows.forEach(r=>{
      const k=String(r.key);
      if(seen.has(k))issues.push({layer:"Master Limit",domain:type,key:r.key,type:"DUPLICATE_KEY",detail:"Master key is duplicated."});
      seen.add(k);
      if(type==="Country"){
        const a=countryAllocationMetrics(r);
        if(a.distributedCapacity!==null&&Math.abs(a.capacity-a.distributedCapacity)>.01)issues.push({layer:"Master Limit",domain:type,key:r.key,type:"CAPACITY_SPLIT_MISMATCH",detail:"Capacity ≠ Domestic + Overseas distribution."});
        if(a.unallocated!==null&&a.unallocated<-.01)issues.push({layer:"Master Limit",domain:type,key:r.key,type:"ALLOCATION_OVER_CAPACITY",detail:"Product allocation exceeds Country Capacity."});
        a.items.forEach(x=>{
          if(x.sourced&&x.domestic!==null&&x.overseas!==null&&Math.abs(x.total-(x.domestic+x.overseas))>.01)issues.push({layer:"Master Limit",domain:type,key:r.key,type:"PRODUCT_SPLIT_MISMATCH",detail:x.product+" Domestic + Overseas ≠ Product Total."});
        });
      }
      if(type==="CIL"){
        const sumEil=Object.values(r.eils||{}).reduce((a,v)=>a+(Number(v)||0),0);
        if(Math.abs(Number(r.cil||0)-sumEil)>.01)issues.push({layer:"Master Limit",domain:type,key:r.key,type:"CIL_EIL_MISMATCH",detail:"CIL ≠ sum of EIL."});
        if(Math.abs(Number(r.cit||0)-(Number(r.ic||0)*Number(r.multiplier||0)))>.01)issues.push({layer:"Master Limit",domain:type,key:r.key,type:"CIT_FORMULA_MISMATCH",detail:"CIT ≠ IC × Multiplier."});
      }
      if(type==="LPG"){
        const limits=r.limits||{};
        const hasAll=LPG_REGIONAL_SCOPES.every(scope=>limits[scope]!==undefined&&limits[scope]!==null);
        if(hasAll&&limits["Bankwide"]!==undefined&&limits["KP + OVS"]!==undefined){
          const regional=LPG_REGIONAL_SCOPES.reduce((a,scope)=>a+(Number(limits[scope])||0),0);
          const total=regional+(Number(limits["KP + OVS"])||0);
          if(Math.abs(Number(limits.Bankwide)-total)>.01)issues.push({layer:"Master Limit",domain:type,key:r.key,type:"LPG_SCOPE_MISMATCH",detail:"Bankwide ≠ Regional scopes + KP + OVS."});
        }
      }
    });
  });
  return issues;
}
function canonicalPipelineControls(){
  const masterIssues=masterCanonicalQualityIssues();
  const productIssues=canonicalProductQualityIssues();
  const mappingIssues=reconciliationIssues().filter(x=>x.status==="Data Issue");
  const dictionaryIssues=productMasterCatalog.filter(p=>!p.id||!p.exposure||!p.canonicalUnit).length;
  const report=buildReportDummy(limasDemoData);
  const readModelMismatches=[];
  ["Country","CCL","MLK","CIL","LPG"].forEach(domain=>{
    const masters=domain==="LPG"?lpgLeafRows():(limasDemoData[domain]||[]);
    const reportRows=domain==="LPG"?(report[domain]||[]).filter(r=>r.segment!=="TOTAL SEKTOR"):(report[domain]||[]);
    if(masters.length!==reportRows.length)readModelMismatches.push(domain+" row-count");
    masters.forEach(master=>{
      const rr=reportRows.find(r=>String(r.key)===String(master.key));
      if(rr&&statusForReport(rr)!==recordStatus(domain,master))readModelMismatches.push(domain+" "+String(master.key)+" status");
    });
  });
  return [
    {layer:"1. Master Limit",status:masterIssues.length?"Data Issue":"Normal",count:masterIssues.length,detail:masterIssues.length?masterIssues.slice(0,3).map(x=>x.type+" • "+(x.domain||"")).join(" ; "):"Master keys, capacity/product allocation and master formulas reconcile."},
    {layer:"2. Product Dictionary",status:dictionaryIssues?"Data Issue":"Normal",count:dictionaryIssues,detail:dictionaryIssues?"Product registry still has incomplete definitions.":"Canonical vocabulary is mapped without renaming source fields or creating semantic duplicates."},
    {layer:"3. Product Database",status:productIssues.length?"Data Issue":"Normal",count:productIssues.length,detail:productIssues.length?productIssues.slice(0,3).map(x=>x.productId+" • "+x.type).join(" ; "):"Required identifiers and source hierarchy checks pass."},
    {layer:"4. Integration / Read Model",status:mappingIssues.length?"Data Issue":"Normal",count:mappingIssues.length,detail:mappingIssues.length?mappingIssues.slice(0,3).map(x=>x.issueType+" • "+x.productId).join(" ; "):"Source key → normalized exposure → master aggregation reconciles."},
    {layer:"5. Report & Monitoring",status:readModelMismatches.length?"Data Issue":"Normal",count:readModelMismatches.length,detail:readModelMismatches.length?readModelMismatches.slice(0,3).join(" ; "):"Report, Dashboard, Monitoring dan EWS membaca canonical functions yang sama."}
  ];
}



// Canonical naming policy: source field names remain unchanged; business labels are standardized in the LIMAS mapping layer.
installE2EDummyDataset();
buildProductIntegrationMappings();
cleanseMasterData();

const CANONICAL_BUSINESS_LABELS={
  countryExposure:"Country Exposure",
  bookingOffice:"Booking Office",
  bookingOfficeType:"Booking Office Type",
  exposure:"Exposure",
  productLimit:"Product Limit",
  domesticLimit:"Domestic Limit",
  overseasLimit:"Overseas Limit"
};
const productCanonicalCrosswalk=[
  {concept:"Country Exposure",values:["code","Country Code","Code","Issuer Country","Bank Country","Not applicable"]},
  {concept:"Booking Office",values:["nm_cab","Business Enrichment","Not applicable — DN/LN source","Branch","Branch","Not applicable"]},
  {concept:"Exposure",values:["total_bade","EQVIDR (normalized)","Credit Line Total Utilisasi","Amount Eq. IDR Juta","Balance + FX normalization","Nominal Pertanggungan"]},
  {concept:"Limit",values:["total_limit / Country allocation","Country product allocation","DN/LN component limits","Country product allocation","Country product allocation","EIL / CIL"]}
];
const productUniverseAudit=[
  {
    product:"CASHLOAN",
    status:"Normal",
    canonical:["Country Exposure = code","Booking Office = nm_cab","Exposure = total_bade","Limit = total_limit"],
    overlap:"kd_cab + nm_cab are code/name of the same office; total_limit vs total_bade are limit/exposure; project_location vs code are different geographic concepts.",
    action:"Tidak ada field yang perlu dihapus. Pertahankan source fields; gunakan canonical business labels di mapping layer."
  },
  {
    product:"NON CASH LOAN",
    status:"Review",
    canonical:["Country Exposure = Country Code","Exposure = EQVIDR (normalized IDR)","Booking Office = business enrichment only"],
    overlap:"AMOUNT, BALANCE, dan EQVIDR sama-sama monetary attributes tetapi bukan field yang identik: transaction amount, balance/outstanding, dan normalized IDR. CPCNTY/BKCNTRY/Country Name/Country Code berada pada domain country tetapi semantic role harus tetap dibedakan. SERVCODE/SERVNM dan PCCD/PCNM tampak sebagai code/name pairs yang perlu dikonfirmasi source definition.",
    action:"Jangan collapse otomatis. Tetapkan satu canonical Exposure untuk tiap monitoring domain dan dokumentasikan unit/transformasinya."
  },
  {
    product:"CREDIT LINE",
    status:"Normalized",
    canonical:["Credit Line = Commercial Line + Treasury Line","Commercial DN = Domestic","Commercial LN = Overseas","Treasury DN = Domestic","Treasury LN = Overseas"],
    overlap:"TDN/TLN dan CDN/CLN merupakan alias vocabulary untuk Treasury/Commercial DN/LN. Comm Line Total, Treasury Line Total, dan Credit Line Total adalah hierarchy totals, bukan duplicate metrics.",
    action:"Satu canonical field per business concept. DN/LN dipakai sebagai source semantics; tidak membuat Booking Office enrichment. Treasury Line tidak ditampilkan sebagai universe product terpisah."
  },
  {
    product:"Investment Line",
    status:"Review",
    canonical:["Investment Line Amount = Amount Invesment Line","Identifier = Nama Bank + Entity + Switftcode"],
    overlap:"Field catatan panjang berisi catatan pooling, bukan measure/identifier.",
    action:"Pertahankan sebagai source untuk provenance, tetapi perlakukan sebagai Notes/metadata pada business dictionary, bukan sebagai business metric."
  },
  {
    product:"BONDS",
    status:"Normal",
    canonical:["Country Exposure = Issuer Country","Booking Office = Branch","Exposure = Amount Eq. IDR Juta"],
    overlap:"Amount dan Amount Eq. IDR Juta merepresentasikan nilai ekonomi yang sama dalam unit berbeda; Securities Name dan Issuer Name adalah security vs issuer dan tidak boleh digabung.",
    action:"Pertahankan keduanya di source. Gunakan Amount Eq. IDR Juta sebagai exposure canonical untuk monitoring dan Amount sebagai source nominal."
  },
  {
    product:"NOSTRO",
    status:"Review",
    canonical:["Country Exposure = Bank Country","Booking Office = Branch","Exposure = Balance after FX normalization"],
    overlap:"SwfitCode dan Swift Code di product lain adalah identifier yang sama secara konsep tetapi source spelling berbeda. Balance tanpa currency/FX normalization belum comparable dengan product lain.",
    action:"Jangan rename source field. Tambahkan metadata unit/currency dan FX transformation sebelum dipakai sebagai consolidated exposure."
  },
  {
    product:"Nominal Pertanggungan",
    status:"Review",
    canonical:["Entity = Entitas","Exposure = Nominal Pertanggungan","Entity Limit = EIL","Consolidated Limit = CIL"],
    overlap:"Utilisasi CIL (%) dan % Utilisasi (Nominal Pertanggungan/CIL) terlihat overlap secara nama, tetapi nilainya dapat berbeda; definisi/period basis harus dikonfirmasi sebelum salah satunya di-retire.",
    action:"Pertahankan dua source fields sampai formula/period basis dikonfirmasi; jangan menganggap duplicate hanya dari label."
  }
];

const productFieldNotes={
  "_CANONICAL_":{},
  "CASHLOAN":{
    nm_cab:"Nama cabang/kantor pembukuan pada source Cash Loan. Digunakan sebagai source field Booking Office; tidak membuat field Booking Office baru.",
    project_location:"Lokasi proyek sebagai source context Country Exposure; bukan nama kantor pembukuan.",
    code:"Country Code sebagai key Country Exposure untuk Country Limit.",
    total_limit:"Total limit rekening/fasilitas.",
    total_bade:"Total outstanding/BADE yang digunakan sebagai exposure.",
    ecosystem_lpg:"Atribut debitur untuk klasifikasi Ecosystem LPG/Sektor; bukan master limit dan bukan Applied Limit.",
    segmen_lpg:"Atribut debitur untuk klasifikasi Segmen LPG (Corporate/Commercial/SME/Micro); bukan master limit.",
    region_lpg:"Atribut region pada level debitur (Region I–XII atau KP + OVS). Bankwide dibentuk dari agregasi outstanding product, bukan dari record khusus Bankwide."
  },
  "NON CASH LOAN":{
    "Swift Code":"Identifier/source Swift counterparty. Untuk CCL, join ke master menggunakan Swift Code Vlookup; actual Swift tidak wajib identik dengan normalized master key.",
    "CUSTID":"Identifier CIF/customer.",
    "CPNM":"Nama counterparty yang digunakan untuk country judgment.",
    "Country Code":"Country Code hasil mapping counterparty.",
    "EQVIDR":"Nilai ekuivalen IDR untuk exposure.",
    "BALANCE":"Saldo/transaksi outstanding yang menjadi referensi exposure. Pada demo DWH-Indonesia untuk LPG, field ini menjadi nilai outstanding dalam Rp Juta.",
    "ecosystem_lpg":"Atribut debitur untuk klasifikasi Ecosystem LPG/Sektor; bukan Applied Limit.",
    "segmen_lpg":"Atribut debitur untuk klasifikasi Segmen LPG.",
    "region_lpg":"Atribut region pada level debitur. Bankwide merupakan hasil agregasi seluruh debtor records."
  },
  "Investment Line":{
    "Jenis Invesment Line":"Jenis fasilitas investment line.",
    "Amount Invesment Line":"Nominal investment line.",
    "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa":"Catatan pooling untuk fasilitas yang belum termapping."
  },
  "BONDS":{
    "Branch":"Branch pada source Bonds digunakan sebagai source kantor pembukuan bila dibutuhkan untuk bucket Domestic/Overseas; tidak membuat field Booking Office baru.",
    "Issuer Country":"Negara issuer untuk Country Exposure/Country Limit.",
    "Amount Eq. IDR Juta":"Exposure ekuivalen IDR.",
    "Maturity Date":"Tanggal maturity; workbook mencatat limit dapat kembali setelah maturity."
  },
  "NOSTRO":{
    "Branch":"Branch pada source Nostro digunakan sebagai source kantor pembukuan bila dibutuhkan untuk bucket Domestic/Overseas; tidak membuat field Booking Office baru.",
    "Bank Country":"Country pada source Nostro sebagai Country Exposure/Country Limit.",
    "Balance":"Balance dalam kurs asli; workbook mencatat kebutuhan konversi menggunakan kurs tengah NTR."
  },
  "Nominal Pertanggungan":{
    "Perusahaan Asuransi":"Nama perusahaan asuransi pada monitoring CIL.",
    "Jenis Prudk Asuransi":"Jenis produk asuransi yang direferensikan pada CIL.",
    "Entitas":"Entitas Bank Mandiri yang memiliki nominal pertanggungan.",
    "EIL Entitas (Rp Juta)":"EIL entitas yang menjadi denominator utilisasi EIL.",
    "Nominal Pertanggungan 2025 (Rp Juta)":"Nominal pertanggungan 2025 sebagai exposure untuk monitoring CIL.",
    "Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)":"Proyeksi nominal pertanggungan 2026.",
    "Utilisasi EIL (%)":"Utilisasi terhadap EIL entitas pada monitoring CIL.",
    "CIL (Rp Juta)":"Consolidated Insurance Limit sebagai denominator utilisasi.",
    "CIT (Rp Juta)":"Consolidated Insurance Threshold sebagai parameter monitoring.",
    "Utilisasi CIL (%)":"Utilisasi Nominal Pertanggungan terhadap CIL. CIL/CIT menjadi parameter threshold terpisah.",
    "% Utilisasi (Nominal Pertanggungan/CIL)":"Utilisasi utama: Nominal Pertanggungan 2025 dibandingkan dengan CIL.",
    "% Utilisasi Proyeksi (Nominal Pertanggungan/CIL)":"Utilisasi proyeksi: Proyeksi Total Nominal Pertanggungan 2026 dibandingkan dengan CIL.",
    "Status / Rekomendasi Action Plan":"Status hasil monitoring dan rekomendasi action plan."
  }
};

function productMetaKey(tab,group,field){return `limas_product_field_meta_v2_${tab}||${group||"Default"}||${field}`;}
function loadProductFieldMeta(tab,group,field){
  const key=productMetaKey(tab,group,field);
  try{
    const saved=window.localStorage.getItem(key);
    if(saved)return JSON.parse(saved);
  }catch(e){}
  const sheet=productTabSource[tab]||tab;
  const note=productFieldNotes[tab]?.[field]||
    (tab==="CREDIT LINE" ? group+" field dari source sheet Credit Line (CommLine and TL)." : "Field "+field+" digunakan sebagai source data "+tab+".");
  return {source:"master_dataproduk.xlsx • "+sheet,note};
}
function saveProductFieldMeta(tab,group,field,meta){
  try{window.localStorage.setItem(productMetaKey(tab,group,field),JSON.stringify(meta));}catch(e){}
}
function catalogMetaKey(id){return `limas_product_catalog_v2_${id}`;}
function loadProductCatalogMeta(item){
  try{
    const saved=window.localStorage.getItem(catalogMetaKey(item.id));
    if(saved)return JSON.parse(saved);
  }catch(e){}
  return {source:item.source,note:item.note};
}
function saveProductCatalogMeta(item,meta){
  try{window.localStorage.setItem(catalogMetaKey(item.id),JSON.stringify(meta));}catch(e){}
}

function ProductDictionaryBusinessMapping({tab}){ 
  const m=productBusinessMapping[tab]||{};
  const enrichment=productBusinessEnrichment[tab]||[];
  const items=[
    ["Country Exposure",m.countryExposureField?m.countryExposureField+" → "+m.countryExposureLabel:(m.countryExposureLabel||"—")],
    ["Booking Office",m.bookingOfficeField?m.bookingOfficeField+" → "+m.bookingOfficeLabel:(m.bookingOfficeLabel||"—")],
    ["Booking Office Type",tab==="CREDIT LINE"?"DN/LN source — not required":(enrichment.includes("Booking Office Type")?"Business Enrichment / Reference":"Derived / Reference")],
    ["Exposure",m.exposureField?m.exposureField+" → "+m.exposureLabel:(m.exposureLabel||"—")]
  ];
  return <div className="product-dictionary-summary">
    <div className="section-title">Business Mapping Standard</div>
    <div className="product-db-kpis">
      {items.map(([label,value])=><div className="mini" key={label}><b>{label}</b><span className="muted-small">{value}</span></div>)}
    </div>
    {enrichment.length>0&&<div className="field-help"><b>Business Enrichment:</b> {enrichment.join(" + ")} — {productBusinessEnrichmentNote[tab]}</div>}
  </div>;
}

function CreditLineFieldTable(){
  const fields=creditLineCanonicalFields;
  const [editing,setEditing]=useState(false);
  const buildDraft=()=>Object.fromEntries(fields.map(f=>[f.key,loadProductFieldMeta("CREDIT LINE",f.group,f.key)]));
  const [draft,setDraft]=useState(buildDraft);
  React.useEffect(()=>{setEditing(false);setDraft(buildDraft())},[]);
  const update=(f,key,value)=>setDraft(m=>({...m,[f]:{...(m[f]||{}),[key]:value}}));
  const save=()=>{fields.forEach(f=>saveProductFieldMeta("CREDIT LINE",f.group,f.key,draft[f.key]||{}));setEditing(false)};
  const cancel=()=>{setDraft(buildDraft());setEditing(false)};
  const sample=(f)=>{
    const source=productSample["COMMERCIAL LINE (CRDT)"]||{};
    return creditLineCanonicalValue(source,f.key);
  };
  return <div className="product-field-block">
    <div className="product-field-toolbar">
      <div><b>Data Dictionary — Credit Line</b><span>Credit Line = Commercial Line + Treasury Line. Domestic/Overseas sudah tersedia dari DN/LN pada source; tidak dibuat mapping Booking Office tambahan.</span></div>
      {!editing?<button className="btn primary" onClick={()=>setEditing(true)}>Edit Field Metadata</button>:<div className="toolbar"><button className="btn ghost" onClick={cancel}>Batal</button><button className="btn primary" onClick={save}>Simpan Perubahan</button></div>}
    </div>
    <ProductDictionaryBusinessMapping tab="CREDIT LINE"/>
    <div className="table-wrap product-field-wrap">
      <table className="table field-table product-credit-table">
        <thead><tr><th>Business Field</th><th>Sample Value</th><th>Source Field</th><th>Keterangan</th></tr></thead>
        <tbody>{fields.map(f=>{
          const m=draft[f]||{};
          return <tr key={f}>
            <td><b>{f.label}</b></td>
            <td>{sample(f)}</td>
            <td>{f.source}</td>
            <td>{editing?<textarea className="textarea compact-area" value={m.note||""} onChange={e=>update(f,"note",e.target.value)}/>:<span className="note-text">{m.note||"—"}</span>}</td>
          </tr>
        })}</tbody>
      </table>
    </div>
  </div>;
}

function ProductFieldTable({tab,group="",fields=[],sample={}}){
  const buildDraft=()=>Object.fromEntries(fields.map(f=>[f,loadProductFieldMeta(tab,group,f)]));
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(buildDraft);
  React.useEffect(()=>{setEditing(false);setDraft(buildDraft())},[tab,group,fields.join("|")]);
  const update=(f,key,value)=>setDraft(m=>({...m,[f]:{...(m[f]||{}),[key]:value}}));
  const save=()=>{fields.forEach(f=>saveProductFieldMeta(tab,group,f,draft[f]||{}));setEditing(false)};
  const cancel=()=>{setDraft(buildDraft());setEditing(false)};
  return <div className="product-field-block">
    <div className="product-field-toolbar">
      <div><b>Data Dictionary — Source Fields</b><span>Field source dipertahankan apa adanya • Sample Value • Source Data • Keterangan</span></div>
      {!editing?<button className="btn primary" onClick={()=>setEditing(true)}>Edit Field Metadata</button>:<div className="toolbar"><button className="btn ghost" onClick={cancel}>Batal</button><button className="btn primary" onClick={save}>Simpan Perubahan</button></div>}
    </div>
    <ProductDictionaryBusinessMapping tab={tab}/>
    <div className="table-wrap product-field-wrap">
      <table className="table field-table product-field-table">
        <thead><tr><th>Field</th><th>Sample Value</th><th>Source Data</th><th>Keterangan</th></tr></thead>
        <tbody>{fields.map(f=>{
          const m=draft[f]||{};
          return <tr key={f}>
            <td><b>{f}</b></td><td>{sample[f]===0?0:(sample[f]||"—")}</td>
            <td>{editing?<input className="input compact field-input" value={m.source||""} onChange={e=>update(f,"source",e.target.value)}/>:<span className="source-text">{m.source||"—"}</span>}</td>
            <td>{editing?<textarea className="textarea compact-area" value={m.note||""} onChange={e=>update(f,"note",e.target.value)}/>:<span className="note-text">{m.note||"—"}</span>}</td>
          </tr>
        })}</tbody>
      </table>
    </div>
  </div>;
}

function ProductUniverseAudit(){
  const creditRows=creditLineAuditRows(productDatabase["CREDIT LINE"]||[]);
  return <section className="card" style={{marginTop:16}}>
    <div className="head">
      <div>
        <h2>Universe Product — Semantic Audit</h2>
        <p>Audit membedakan source field, canonical business meaning, alias, dan derived value. Field source tidak diganti hanya untuk membuat penamaan seragam.</p>
      </div>
      <span className="chip blue">{productUniverseAudit.length} products audited</span>
    </div>
    <div className="body">
      <div className="table-wrap">
        <table className="table product-master-table">
          <thead><tr><th>Product</th><th>Status</th><th>Canonical Business Meaning</th><th>Overlap / Duplicate Check</th><th>Action</th></tr></thead>
          <tbody>{productUniverseAudit.map(x=><tr key={"universe-audit-"+x.product}>
            <td><b>{x.product}</b></td>
            <td><Status v={x.status==="Normalized"?"Normal":x.status}/></td>
            <td>{x.canonical.map((v,i)=><div key={i} className="muted-small">{v}</div>)}</td>
            <td>{x.overlap}</td>
            <td>{x.action}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <div className="field-help">
        <b>Credit Line vocabulary:</b> TDN → Treasury DN, TLN → Treasury LN, CDN → Comm DN, CLN → Comm LN.
        Comm Line Total dan Treasury Line Total adalah component totals; Credit Line Total adalah parent total.
        Alias tersebut tidak boleh muncul sebagai business fields terpisah.
      </div>
      <div className="table-wrap" style={{marginTop:12}}>
        <table className="table product-master-table">
          <thead><tr><th>Canonical Concept</th><th>Cash Loan</th><th>Non Cash Loan</th><th>Credit Line</th><th>Bonds</th><th>Nostro</th><th>Nominal Pertanggungan</th></tr></thead>
          <tbody>{productCanonicalCrosswalk.map((x,i)=><tr key={"crosswalk-"+i}>
            <td><b>{x.concept}</b></td>{x.values.map((v,j)=><td key={j}>{v}</td>)}
          </tr>)}</tbody>
        </table>
      </div>
      <div className="table-wrap" style={{marginTop:12}}>
        <table className="table product-master-table">
          <thead><tr><th>Credit Line Record</th><th>Reconciliation</th><th>Issue</th></tr></thead>
          <tbody>{creditRows.map(x=><tr key={"credit-audit-"+x.recordId}>
            <td className="key">{x.recordId}</td>
            <td><Status v={x.status==="Normal"?"Normal":x.status}/></td>
            <td>{x.issues.length?x.issues.join(" • "):"Commercial / Treasury / Credit Line hierarchy reconciles within tolerance"}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <div className="field-help">Reconciliation tolerance untuk total/utilization demo memakai ±0.05 untuk mengakomodasi rounding. Record MLK dengan <b>Bade Treasury Line</b> adalah integration-only exposure row sehingga tidak dibandingkan dengan hierarchy limit Credit Line. Source values tidak diubah otomatis.</div>
    </div>
  </section>;
}

function ProductCatalog(){
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(()=>Object.fromEntries(productMasterCatalog.map(item=>[item.id,loadProductCatalogMeta(item)])));
  const update=(id,key,value)=>setDraft(m=>({...m,[id]:{...(m[id]||{}),[key]:value}}));
  const save=()=>{productMasterCatalog.forEach(item=>saveProductCatalogMeta(item,draft[item.id]||{}));setEditing(false)};
  const cancel=()=>{setDraft(Object.fromEntries(productMasterCatalog.map(item=>[item.id,loadProductCatalogMeta(item)])));setEditing(false)};
  return <section className="card">
    <div className="head">
      <div><h2>Product Universe</h2><p>Registry produk, definisi utilisasi, canonical unit, dan jumlah source records. Audit/cleansing tetap berjalan di belakang layar.</p></div>
      {!editing?<button className="btn primary" onClick={()=>setEditing(true)}>Edit Product Metadata</button>:<div className="toolbar"><button className="btn ghost" onClick={cancel}>Batal</button><button className="btn primary" onClick={save}>Simpan Perubahan</button></div>}
    </div>
    <div className="body">
      <div className="table-wrap product-master-wrap">
        <table className="table product-master-table">
          <thead><tr><th>Product</th><th>Status</th><th>Integrated Domain</th><th>Utilization Field</th><th>Canonical Unit</th><th>Primary Key</th><th>Database Records</th><th>Definition</th></tr></thead>
          <tbody>{productMasterCatalog.map(item=>{
            const m=draft[item.id]||{};
            return <tr key={item.id}>
              <td><b>{item.label}</b></td><td><Status v={item.status==="Future / Scoped"?"Needs Mapping":"Normal"}/></td>
              <td>{productIntegratedDomains(item.id).join(" / ")||"Future / Scoped"}</td><td>{item.exposure}</td><td><b>{item.canonicalUnit||"Rp Juta"}</b></td><td>{item.key}</td>
              <td><span className="chip blue">{(productDatabase[item.id]||[]).length}</span></td>
              <td>{editing?<textarea className="textarea compact-area" value={m.note||""} onChange={e=>update(item.id,"note",e.target.value)}/>:<span className="note-text">{m.note||item.note||"—"}</span>}</td>
            </tr>
          })}</tbody>
        </table>
      </div>
      <div className="field-help"><b>Canonical contract:</b> seluruh limit/utilization pada read model LIMAS dinyatakan dalam IDR dengan canonical unit <b>Rp Juta</b>. Source field tetap dipertahankan apa adanya dan hanya dinormalisasi pada integration/read-model layer. Credit Line tetap satu product; Commercial Line dan Treasury Line adalah component. LPG berasal dari agregasi Cash Loan + Non Cash Loan. Investment Line masih Future / Scoped.</div>
    </div>
  </section>;
}

function creditLineAuditRows(rows){
  const n=(v)=>Number(String(v??"").replace(/,/g,""))||0;
  const near=(a,b,t=.05)=>Math.abs(n(a)-n(b))<=t;
  return rows.map(r=>{
    const d=r.data||{};
    // MLK Treasury records are integration-only exposure rows, not full Credit Line source rows.
    const treasuryExposureOnly=d["Bade Treasury Line"]!==undefined &&
      d["Treasury Line Total"]===undefined &&
      d["Credit Line Total"]===undefined;
    if(treasuryExposureOnly){
      return {recordId:r.recordId,status:"Not Applicable",issues:["Integration-only MLK Treasury exposure row; line limit reconciliation is not applicable"]};
    }
    const commercialTotal=n(d["Comm DN"])+n(d["Comm LN"]);
    const treasuryTotal=n(d["Treasury DN"])+n(d["Treasury LN"]);
    const creditTotal=n(d["Comm Line Total"])+n(d["Treasury Line Total"]);
    const commercialUtil=n(d["Comm DN Utilisasi"])+n(d["Comm LN Utilisasi"]);
    const treasuryUtil=n(d["Treasury DN Utilisasi"])+n(d["Treasury LN Utilisasi"]);
    const creditUtil=n(d["Credit Line Total Utilisasi"]);
    const issues=[];
    if(!near(commercialTotal,d["Comm Line Total"])) issues.push("Commercial Total ≠ Comm DN + Comm LN");
    if(!near(treasuryTotal,d["Treasury Line Total"])) issues.push("Treasury Total ≠ Treasury DN + Treasury LN");
    if(!near(creditTotal,d["Credit Line Total"])) issues.push("Credit Line Total ≠ Commercial Total + Treasury Total");
    if(!near(commercialUtil+treasuryUtil,creditUtil)) issues.push("Credit Line Utilisasi ≠ Commercial Utilisasi + Treasury Utilisasi");
    return {recordId:r.recordId,status:issues.length?"Data Issue":"Normal",issues};
  });
}

function productExposureAmount(productId,r){
  const n=(v)=>Number(String(v??"").replace(/,/g,""))||0;
  if(productId==="CASHLOAN") return n(r.data?.total_bade);
  if(productId==="NON CASH LOAN"){
    const dwhIdr=String(r?.sourceSystem||"").startsWith("DWH")&&String(r?.data?.CCY||"").toUpperCase()==="IDR";
    return dwhIdr?n(r.data?.BALANCE):n(r.data?.EQVIDR)/1000000;
  }
  if(productId==="CREDIT LINE") return n(r.data?.["Credit Line Total Utilisasi"]);
  if(productId==="BONDS") return n(r.data?.["Amount Eq. IDR Juta"]);
  if(productId==="NOSTRO") return normalizeAppliedAmount("Country","NOSTRO",n(r.data?.Balance),r).amount;
  return 0;
}
function productBookingSplit(view,rows){
  const split={Domestic:0,Overseas:0,"Needs Mapping":0};
  rows.forEach(r=>{
    if(view==="CREDIT LINE"){
      const n=v=>Number(String(v??"").replace(/,/g,""))||0;
      split.Domestic += n(r.data?.["Comm DN Utilisasi"]) + n(r.data?.["Treasury DN Utilisasi"]);
      split.Overseas += n(r.data?.["Comm LN Utilisasi"]) + n(r.data?.["Treasury LN Utilisasi"]);
      return;
    }
    const amount=productExposureAmount(view,r);
    const type=["Domestic","Overseas"].includes(r.bookingOfficeType)?r.bookingOfficeType:"Needs Mapping";
    split[type]+=amount;
  });
  return split;
}
function ProductBookingClassification({view,rows}){
  if(!countryIntegratedProductIds.includes(view)) return null;
  const split=productBookingSplit(view,rows);
  const isCreditLine=view==="CREDIT LINE";
  const mapped=rows.filter(r=>["Domestic","Overseas"].includes(r.bookingOfficeType)).length;
  const needs=rows.length-mapped;
  const exposureField={
    "NON CASH LOAN":"EQVIDR / 1.000.000",
    "CREDIT LINE":"Credit Line Total Utilisasi",
    "BONDS":"Amount Eq. IDR Juta",
    "NOSTRO":"Balance",
    "CASHLOAN":"total_bade"
  }[view]||"Exposure";
  return <section className="card" style={{marginTop:16}}>
    <div className="head">
      <div>
        <h2>Domestic / Overseas Breakdown</h2>
        <p>Dimensi monitoring dipisahkan berdasarkan <b>Booking Office Type</b>. Country Exposure tetap memakai source country field dan tidak menentukan Domestic/Overseas.</p>
      </div>
      <span className="chip blue">{isCreditLine?"DN/LN source-native":`${mapped} mapped / ${needs} needs mapping`}</span>
    </div>
    <div className="body">
      <div className="product-db-kpis">
        <div className="mini"><b>Domestic</b><strong>{split.Domestic.toLocaleString("id-ID",{maximumFractionDigits:2})}</strong><span className="muted-small">Exposure</span></div>
        <div className="mini"><b>Overseas</b><strong>{split.Overseas.toLocaleString("id-ID",{maximumFractionDigits:2})}</strong><span className="muted-small">Exposure</span></div>
        <div className="mini"><b>Needs Mapping</b><strong>{split["Needs Mapping"].toLocaleString("id-ID",{maximumFractionDigits:2})}</strong><span className="muted-small">Exposure belum terklasifikasi</span></div>
      </div>
      <div className="table-wrap" style={{marginTop:12}}>
        <table className="table">
          <thead><tr><th>Record ID</th><th>Country Exposure</th>{view==="CREDIT LINE"?<><th>Commercial DN / LN</th><th>Treasury DN / LN</th></>:<><th>Booking Office</th><th>Booking Office Type</th></>}<th>Domestic Exposure</th><th>Overseas Exposure</th><th>Needs Mapping Exposure</th></tr></thead>
          <tbody>{rows.map(r=>{
            const amount=productExposureAmount(view,r);
            const mapping=(productIntegrationMappings[view]||[]).find(a=>a.limitType==="Country"&&String(a.recordId)===String(r.recordId));
            const type=mapping?.bookingOfficeType==="Domestic"||mapping?.bookingOfficeType==="Overseas"?mapping.bookingOfficeType:"Needs Mapping";
            const creditSplit=view==="CREDIT LINE"?{
              domestic:(Number(String(r.data?.["Comm DN Utilisasi"]??"").replace(/,/g,""))||0)+(Number(String(r.data?.["Treasury DN Utilisasi"]??"").replace(/,/g,""))||0),
              overseas:(Number(String(r.data?.["Comm LN Utilisasi"]??"").replace(/,/g,""))||0)+(Number(String(r.data?.["Treasury LN Utilisasi"]??"").replace(/,/g,""))||0)
            }:null;
            return <tr key={"booking-"+r.recordId}>
              <td className="key">{r.recordId}</td>
              <td>{mapping?.countryExposure||"—"}</td>
              {view==="CREDIT LINE"?<><td>{r.data?.["Comm DN Utilisasi"]||0} / {r.data?.["Comm LN Utilisasi"]||0}</td><td>{r.data?.["Treasury DN Utilisasi"]||0} / {r.data?.["Treasury LN Utilisasi"]||0}</td></>:<><td>{mapping?.bookingOffice||"—"}</td><td><Status v={type}/></td></>}
              <td>{view==="CREDIT LINE"?(creditSplit.domestic||0).toLocaleString("id-ID",{maximumFractionDigits:2}):(type==="Domestic"?amount.toLocaleString("id-ID",{maximumFractionDigits:2}):"—")}</td>
              <td>{view==="CREDIT LINE"?(creditSplit.overseas||0).toLocaleString("id-ID",{maximumFractionDigits:2}):(type==="Overseas"?amount.toLocaleString("id-ID",{maximumFractionDigits:2}):"—")}</td>
              <td>{view==="CREDIT LINE"?"—":(type==="Needs Mapping"?amount.toLocaleString("id-ID",{maximumFractionDigits:2}):"—")}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>
      <div className="field-help">
        Exposure basis: <b>{exposureField}</b>. Untuk Credit Line, Domestic/Overseas berasal langsung dari source: <b>DN = Domestic</b> dan <b>LN = Overseas</b>, baik pada Commercial Line maupun Treasury Line. Tidak ada Business Enrichment Booking Office untuk Credit Line. Untuk Non Cash Loan, Booking Office/Type tetap Business Enrichment karena source belum menyediakan atribut tersebut. Bonds/Nostro menggunakan source <b>Branch</b> sebagai Booking Office.
      </div>
    </div>
  </section>;
}

function productDatabaseDisplayValue(view,r,f){
  return r.data[f]===0?0:(r.data[f]||"—");
}
function ProductDatabaseTable({view}){
  const rows=productDatabase[view]||[];
  const fields=productSchemaFields[view]||[];
  const sourceSystems=[...new Set(rows.map(r=>r.sourceSystem).filter(Boolean))];
  const latestAsOf=rows.map(r=>r.asOfDate).filter(Boolean).sort().slice(-1)[0]||"—";
  return <section className="card product-database-card">
    <div className="head"><div><h2>Product Database</h2><p>{rows.length} source records • source fields dan source metadata only. Target master, mapping, limit, dan derived utilization berada di integration layer.</p></div><div className="chip blue">{rows.length} records</div></div>
    <div className="body">
      <div className="product-db-kpis">
        <div className="mini"><b>Source Records</b><strong>{rows.length}</strong></div>
        <div className="mini"><b>Fields in Schema</b><strong>{fields.length}</strong></div>
        <div className="mini"><b>Source Systems</b><strong>{sourceSystems.length}</strong></div>
        <div className="mini"><b>Latest As-of Date</b><strong style={{fontSize:14}}>{latestAsOf}</strong></div>
      </div>
      <div className="table-wrap product-db-wrap">
        <table className="table product-db-table">
          <thead><tr><th>Record ID</th>{fields.map(f=><th key={f}>{f}</th>)}<th>Runtime Source</th><th>As-of Date</th></tr></thead>
          <tbody>{rows.map(r=><tr key={r.recordId}>
            <td className="key">{r.recordId}</td>
            {fields.map(f=><td key={f}>{productDatabaseDisplayValue(view,r,f)}</td>)}
            <td>{r.sourceSystem||"—"}</td><td>{r.asOfDate||"—"}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <div className="field-help"><b>Source-only rule:</b> Product Database menyimpan produk/fasilitas yang memang ada di source. Tidak ada target Country/CCL/MLK/CIL/LPG, Applied Limit, atau Derived Integration pada record/table ini.</div>
    </div>
  </section>;
}
function ProductUsage({view}){
  const item=getProductMeta(view)||{};
  const mapping=productBusinessMapping[view]||{};
  const rows=productDatabase[view]||[];
  const domainsUsing=productIntegratedDomains(view);
  const status=item.status==="Future / Scoped"?"Future / Scoped":"Active";
  return <section className="card" style={{marginTop:16}}>
    <div className="head"><div><h2>Product Definition</h2><p>Definisi bisnis minimum yang dipakai untuk membentuk utilization dari Product Database.</p></div><Status v={status==="Active"?"Normal":"Needs Mapping"}/></div>
    <div className="body">
      <div className="metric-grid">
        <DomainKpi label="Canonical Unit" value={item.canonicalUnit||"Rp Juta"} sub="Canonical read model"/>
        <DomainKpi label="Database Records" value={rows.length} sub="Source records"/>
        <DomainKpi label="Utilization Field" value={item.exposure||"—"} sub="Source exposure basis"/>
        <DomainKpi label="Integrated Domain" value={domainsUsing.join(" / ")||"Future / Scoped"} sub="Active integration"/>
      </div>
      <div className="table-wrap" style={{marginTop:12}}>
        <table className="table product-master-table"><thead><tr><th>Business Attribute</th><th>Source / Rule</th><th>Canonical Treatment</th></tr></thead>
          <tbody>
            <tr><td><b>Primary Key</b></td><td>{item.key||"—"}</td><td>Business key product-specific; Record ID tetap technical key.</td></tr>
            <tr><td><b>Country Exposure</b></td><td>{mapping.countryExposureField||"—"}</td><td>{mapping.countryExposureLabel||"Not applicable"}</td></tr>
            <tr><td><b>Booking Office</b></td><td>{mapping.bookingOfficeField||"—"}</td><td>{mapping.bookingOfficeLabel||"Not applicable"}</td></tr>
            <tr><td><b>Utilization</b></td><td>{mapping.exposureField||item.exposure||"—"}</td><td>Normalized to {item.canonicalUnit||"Rp Juta"} before monitoring.</td></tr>
            <tr><td><b>Data Date</b></td><td>Product record metadata</td><td>{rows[0]?.asOfDate||E2E_DUMMY_META.asOfDate||"—"}</td></tr>
          </tbody>
        </table>
      </div>
      <div className="field-help">{item.note||"—"}</div>
    </div>
  </section>;
}

function CanonicalReadModelPreview(){
  const rows=canonicalReadModelRows();
  const mapped=rows.filter(r=>r.mappingStatus==="Mapped").length;
  const issues=rows.filter(r=>r.status==="Data Issue"||r.mappingStatus!=="Mapped"&&r.mappingStatus!=="No Product Data").length;
  const noData=rows.filter(r=>r.mappingStatus==="No Product Data").length;
  const sample=rows.filter(r=>r.product!=="—").slice(0,20);
  return <section className="card" style={{marginTop:16}}>
    <div className="head">
      <div><h2>Canonical Read Model — E2E Dummy</h2><p>Output integrasi setelah Master + Product Source + Mapping + Normalization. Read model inilah yang dikonsumsi Monitoring, EWS dan Report.</p></div>
      <span className="chip blue">{E2E_DUMMY_META.datasetId}</span>
    </div>
    <div className="body">
      <div className="integration-chip-grid">
        <div className="mini integration-chip"><b>1. Master</b><div className="muted-small">Approved limit / capacity / regulatory context</div></div>
        <div className="mini integration-chip"><b>2. Product</b><div className="muted-small">{Object.values(productDatabase).reduce((n,x)=>n+x.length,0)} source records</div></div>
        <div className="mini integration-chip"><b>3. Mapping</b><div className="muted-small">{mapped} mapped rows</div></div>
        <div className="mini integration-chip"><b>4. Normalize</b><div className="muted-small">Source unit → target domain unit</div></div>
        <div className="mini integration-chip"><b>5. Reconcile</b><div className="muted-small">{canonicalPipelineControls()[3].count} issue(s)</div></div>
        <div className="mini integration-chip"><b>6. Monitor</b><div className="muted-small">Utilization → EWS / Breach / Data Issue</div></div>
      </div>
      <div className="metric-grid" style={{marginTop:12}}>
        <DomainKpi label="Read Model Rows" value={rows.length} sub={E2E_DUMMY_META.period}/>
        <DomainKpi label="Mapped" value={mapped} sub="Valid master linkage"/>
        <DomainKpi label="Read Model Issue" value={issues} sub="Mapping / data integrity"/>
        <DomainKpi label="No Product Data" value={noData} sub="Master without source feed"/>
        <DomainKpi label="EWS / Breach Masters" value={canonicalExceptions().filter(r=>r.status==="Warning"||r.status==="Breach").length} sub="Unique master-level exceptions" accent={canonicalExceptions().some(r=>r.status==="Breach")?"red":"yellow"}/>
      </div>
      <div className="table-wrap" style={{marginTop:12}}>
        <table className="table">
          <thead><tr><th>Domain</th><th>Master Key</th><th>Product</th><th>Source Record</th><th>Source</th><th>Source Amount</th><th>Normalized</th><th>Mapping</th><th>Status</th></tr></thead>
          <tbody>{sample.map((r,i)=><tr key={"crm-"+r.domain+"-"+r.recordId+"-"+i}>
            <td>{r.domain}</td><td className="key">{r.masterKey}</td><td>{r.product}</td><td className="key">{r.recordId}</td><td>{r.sourceSystem}</td>
            <td>{fmtReport(r.sourceAmount)}</td><td>{fmtReport(r.normalizedExposure)} {r.targetUnit}</td>
            <td><Status v={r.mappingStatus==="Mapped"?"Normal":"Data Issue"}/></td><td><Status v={r.status}/></td>
          </tr>)}</tbody>
        </table>
      </div>
      <div className="field-help"><b>Lineage:</b> Source Record → Source Field → Source Amount / Unit → Normalized Exposure → Target Master Key → Monitoring Grain → Utilization → Status. This is a generated demo read model, not a persistent production database.</div>
    </div>
  </section>;
}

function Products({nav}){
  const [view,setView]=useState("catalog");
  const limitTabs=[
    ["catalog","Master Data Produk"],["CASHLOAN","Cash Loan"],["NON CASH LOAN","Non Cash Loan"],["CREDIT LINE","Credit Line"],["Nominal Pertanggungan","Nominal Pertanggungan (CIL)"],["Investment Line","Investment Line"],["BONDS","Bonds"],["NOSTRO","Nostro"]
  ];
  const info=productMasterCatalog.find(x=>x.id===view);
  return <Layout screen="products" onNav={nav}>
    <Header title="Product Universe & Integration" subtitle="Universe product + source schema + integration mapping. Tidak menyimpan master limit maupun current utilization."/>
    <div className="page">
      <section className="card">
        <div className="body">
          <div className="tabs product-tabs">{limitTabs.map(([id,label])=><button className={`tab ${view===id?'active':''}`} key={id} onClick={()=>setView(id)}>{label}</button>)}</div>
        </div>
      </section>

      {view==="catalog"&&<ProductCatalog/>}

      {info&&<section className="card">
        <div className="head">
          <div><h2>{info.label}</h2><p>Source sheet: <b>{info.sheet}</b> • Primary Key: <span className="key">{info.key}</span></p></div>
        </div>
        <div className="body">
          {view==="CREDIT LINE"
            ? <CreditLineFieldTable/>
            : <ProductFieldTable key={view} tab={view} fields={productTabFields[view]||[]} sample={productSample[view]||{}}/>
          }
          <ProductUsage view={view}/>{view!=="catalog"&&<ProductDatabaseTable view={view}/>}
        </div>
      </section>}
    </div>
    <CanonicalReadModelPreview/>
  </Layout>;
}

class AppErrorBoundary extends React.Component{
  constructor(props){super(props);this.state={error:null}}
  static getDerivedStateFromError(error){return {error}}
  componentDidCatch(error){console.error("LIMAS runtime error",error)}
  render(){
    if(this.state.error) return <div style={{minHeight:"100vh",background:"#061126",color:"#fff",padding:"32px",fontFamily:"Inter,Segoe UI,Arial,sans-serif"}}><h2 style={{marginTop:0}}>LIMAS Runtime Error</h2><p style={{color:"#ffb4b4"}}>{this.state.error?.message||"Unknown error"}</p><button className="btn primary" onClick={()=>window.location.reload()}>Reload</button></div>;
    return this.props.children;
  }
}
function App(){
  const [login,setLogin]=useState(false);
  const [screen,setScreen]=useState("dashboard");
  const [sel,setSel]=useState("Country");
  const [selKey,setSelKey]=useState("");
  const nav=(id,payload)=>{
    if(payload && payload.type){setSel(payload.type); setSelKey(payload.key||"");}
    setScreen(id);
  };
  const navDetail=(type,key)=>{setSel(type);setSelKey(key);setScreen("detail")};
  if(!login) return <Login go={()=>setLogin(true)}/>;
  if(screen==="dashboard") return <Dashboard nav={nav}/>;
  if(screen==="setup") return <Setup nav={nav} setSel={setSel}/>;
  if(screen==="detail") return <Detail nav={nav} type={sel} recordKey={selKey} key={sel+":"+selKey} />;
  if(screen==="products") return <Products nav={nav}/>;
  if(screen==="report") return <Report nav={nav}/>;
  if(screen==="warning") return <Warning nav={nav}/>;
  if(["Country","CCL","MLK","CIL","LPG"].includes(screen)) return <Monitor type={screen} nav={nav}/>;
  return <Dashboard nav={nav}/>;
}
createRoot(document.getElementById('root')).render(<AppErrorBoundary><App/></AppErrorBoundary>);
