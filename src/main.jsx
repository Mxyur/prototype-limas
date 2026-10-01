
import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
const domains={"Country": {"sheet": "COUNTRY_MONITORING", "key": "Country Code", "name": "Negara", "products": ["CASHLOAN", "NON CASH LOAN", "COMMERCIAL LINE (CRDT)", "TREASURY LINE (CRDT)", "BONDS", "NOSTRO"], "sections": {"Identitas": [["No", "1", "Data/master/reference"], ["Negara", "United Arab Emirates", "Data/master/reference"], ["Code", "AE", "Data/master/reference"], ["Status", "Exist", "Data/master/reference"]], "Checklist Product": [["CL", "-", "Data/master/reference"], ["NCL", "-", "Data/master/reference"], ["COM", "-", "Data/master/reference"], ["TRS", "-", "Data/master/reference"], ["BOND", "-", "Data/master/reference"], ["NOS", "v", "Data/master/reference"]], "Exposure Product": [["CL", "-", "Data/master/reference"], ["NCL", "-", "Data/master/reference"], ["COM", "-", "Data/master/reference"], ["TRS", "-", "Data/master/reference"], ["BOND", "-", "Data/master/reference"], ["NOS", "v", "Data/master/reference"], ["TOTAL", "26.64", "Data/master/reference"]], "Limit & Gap": [["Limit FIB / Formulasi", "New", "Data/master/reference"], ["Limit FIB / Diputus", "New", "Data/master/reference"], ["Country Limit / Country Limit", "35,941", "Data/master/reference"], ["Country Limit / %Country Limit", "5.72%", "Data/master/reference"], ["Gap Analysis / Needs", "0", "Data/master/reference"], ["Gap Analysis / Minus", "0", "Data/master/reference"], ["Gap Analysis / Add", "0", "Data/master/reference"], ["Final Limit / Final Limit", "35,941", "Data/master/reference"], ["Final Limit / %Final Limit", "5.72%", "Data/master/reference"]]}}, "CCL": {"sheet": "CCL_MONITORING", "key": "Kode Bank / Swift Code", "name": "Nama bank", "products": ["CASHLOAN", "NON CASH LOAN", "COMMERCIAL LINE (CRDT)", "TREASURY LINE (CRDT)"], "sections": {"Bank Profile": [["Nama bank", "ABN Amro Bank NV", "Data/master/reference"], ["CIF/Swift", "-", "Data/master/reference"], ["Kategori Bank", "Asing", "Data/master/reference"], ["Negara", "Netherlands", "Data/master/reference"], ["Global Parent Bank", "—", "Data/master/reference"], ["Apakah Bank termasuk Top 200 Bank Besar Dunia berdasarkan total aset menurut Banker's Almanac", "—", "Data/master/reference"]], "Risk & Capacity": [["Country Rating", "AAA", "Data/master/reference"], ["Bobot", "0.55", "Data/master/reference"], ["Rating", "AA-", "Data/master/reference"], ["Posisi Rating", "31/12/2023", "Data/master/reference"], ["Rating Index", "90.23%", "Data/master/reference"], ["Limit Inhouse (Rp Miliar)", "68,498", "Data/master/reference"], ["Tier 1 Capital (Rp Miliar)", "403,594", "Data/master/reference"], ["Capacity", "200,290", "Data/master/reference"], ["Capacity Limit Adjusted", "68,498", "Data/master/reference"]], "Limit": [["CCL", "500", "Data/master/reference"], ["Utilisasi Capacity", "0.73%", "Data/master/reference"], ["Limit Contractual", "500", "Data/master/reference"]], "BMRI Exposure": [["Outstanding", "13", "Data/master/reference"], ["Jenis Limit", "Direct", "Data/master/reference"], ["Limit", "500", "Data/master/reference"], ["Total", "500", "Data/master/reference"], ["Bank Loan", "-", "Data/master/reference"], ["Commercial Line", "500", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Utilisasi CCL", "100%", "Data/master/reference"], ["Utilisasi Limit Kontraktual", "100%", "Data/master/reference"], ["Outstanding Maksimum", "13", "Data/master/reference"], ["Utilisasi Maksimum Limit Kontraktual", "2.53%", "Data/master/reference"]], "Perusahaan Anak": [["Limit", "500", "Data/master/reference"], ["Total", "500", "Data/master/reference"], ["Bank Loan", "-", "Data/master/reference"], ["Commercial Line", "500", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Utilisasi CCL", "100%", "Data/master/reference"], ["Utilisasi Limit Kontraktual", "100%", "Data/master/reference"], ["Utilisasi Maksimum Limit Kontraktual", "2.53%", "Data/master/reference"]]}}, "MLK": {"sheet": "MLK_Master", "key": "CIF", "name": "Nama Debitur", "products": ["CASHLOAN", "NON CASH LOAN", "TREASURY LINE (CRDT)"], "sections": {"Profil Debitur": [["Entitas", "BMRI", "Data/master/reference"], ["CIF", "4000264485", "Data/master/reference"], ["Nama Debitur", "DJARUM", "Data/master/reference"], ["Group Usaha", "DJARUM GROUP", "Data/master/reference"], ["Unit Kerja Pengelola", "CB6", "Data/master/reference"], ["Group", "DJARUM GROUP", "Data/master/reference"], ["BUMN/Swasta Flag", "Swasta", "Data/master/reference"], ["Tier", "B", "Data/master/reference"]], "Risk & Regulatory": [["BMPK Konsol", "67,204", "Data/master/reference"], ["Inhouse Limit Konsol", "60,484", "Data/master/reference"], ["BMPK/BMPP/BMPD Entitas", "55,993", "Data/master/reference"], ["Inhouse Limit Entitas", "50,394", "Data/master/reference"], ["Sektor DC", "INDUSTRI ROKOK", "Data/master/reference"], ["DC Sectoral", "3", "Data/master/reference"], ["Rating", "A+", "Data/master/reference"], ["Rating Multiplier", "2.67", "Data/master/reference"], ["Watchlist", "HIJAU", "Data/master/reference"], ["Discount Factor", "1", "Data/master/reference"]], "Financial & Capacity": [["EBITDA/Pengganti EBITDA", "1,938", "Data/master/reference"], ["Kredit Bank Lain", "12,010", "Data/master/reference"], ["Total Debt", "-", "Data/master/reference"], ["Borrowing Capacity", "15,523.38", "Data/master/reference"], ["Available BC", "(2,183.62)", "Data/master/reference"], ["Status Perhitungan", "-", "Data/master/reference"]], "Product Limit & Exposure": [["CL Bade", "500", "Data/master/reference"], ["CL Limit", "587", "Data/master/reference"], ["NCL Bade", "-", "Data/master/reference"], ["NCL Limit", "121", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Bade Treasury Line", "-", "Data/master/reference"], ["Total Limit Existing", "-", "Data/master/reference"], ["Total Bade Existing", "-", "Data/master/reference"]], "Master Limit": [["Master Limit Setting", "5,110", "Data/master/reference"], ["Master Limit", "5,818", "Data/master/reference"]]}}, "CIL": {"sheet": "CIL_Master", "key": "Insurance Company ID / Entity", "name": "Perusahaan Asuransi", "products": ["Nominal Pertanggungan"], "sections": {"Insurance Profile": [["No", "1", "Data/master/reference"], ["Perusahaan Asuransi", "PT Asuransi Tugu Pratama Indonesia Tbk", "Data/master/reference"], ["Jenis Perusahaan (Asuransi/Penjaminan)", "Asuransi", "Data/master/reference"], ["Jenis Produk Asuransi", "Asuransi Kredit", "Data/master/reference"]], "Capacity & Threshold": [["Insurance Capacity (IC) (Rp Juta)", "3,605,020,000", "Data/master/reference"], ["Multiplier Terpakai (%)", "3.00%", "Data/master/reference"], ["Consolidated Insurance Threshold (CIT) (Rp Juta)", "108,150,600", "Parameter monitoring"]], "BMRI": [["Nominal Pertanggungan BMRI 2025", "11,573,402.55", "Data/master/reference"], ["EIL BMRI", "60,093,270.28", "Data/master/reference"]], "Mandiri Taspen": [["Nominal Pertanggungan Mandiri Taspen 2025", "BUKAN REKANAN", "Data/master/reference"], ["EIL Mandiri Taspen", "26,999,429.42", "Data/master/reference"]], "MTF": [["Nominal Pertanggungan MTF 2025", "285,708.13", "Data/master/reference"], ["EIL MTF", "10,591,613.12", "Data/master/reference"]], "MUF": [["Nominal Pertanggungan MUF 2025", "21,313", "Data/master/reference"], ["EIL MUF", "10,129,963.92", "Data/master/reference"]], "Consolidated": [["Consolidated Insurance Limit (CIL) (Rp Juta)", "107,814,276.74", "Data/master/reference"], ["Total Nominal Pertanggungan All Entitas 2025 (Rp Juta)", "11,880,423.68", "Data/master/reference"], ["Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)", "13,060,790.52", "Data/master/reference"], ["Skor Akreditasi (PCP)", "79.38", "Data/master/reference"], ["Klasifikasi EWS (PCP)", "Monitoring", "Data/master/reference"]]}}, "LPG": {"sheet": "LPG_Loanportfolio", "key": "Sector + Segment + Region", "name": "Ecosystem LPG", "products": ["CASHLOAN", "NON CASH LOAN"], "sections": {"Identitas": [["No", "1", "Data/master/reference"], ["Ecosystem LPG (Sektor)", "BATUBARA", "Data/master/reference"], ["Segmen LPG", "Corporate", "Data/master/reference"]], "Bankwide": [["Bankwide / Limit", "65,140", "Data/master/reference"], ["Bankwide / Outstanding", "37,919", "Data/master/reference"], ["Bankwide / %Utilisasi", "58.20%", "Data/master/reference"]], "Region Monitoring": [["Region I / Limit", "—", "Data/master/reference"], ["Region I / Outstanding", "—", "Data/master/reference"], ["Region I / %Utilisasi", "—", "Data/master/reference"], ["Region II / Limit", "—", "Data/master/reference"], ["Region II / Outstanding", "—", "Data/master/reference"], ["Region II / %Utilisasi", "—", "Data/master/reference"], ["Region III / Limit", "—", "Data/master/reference"], ["Region III / Outstanding", "—", "Data/master/reference"], ["Region III / %Utilisasi", "—", "Data/master/reference"], ["Region IV / Limit", "—", "Data/master/reference"], ["Region IV / Outstanding", "—", "Data/master/reference"], ["Region IV / %Utilisasi", "—", "Data/master/reference"], ["Region V / Limit", "—", "Data/master/reference"], ["Region V / Outstanding", "—", "Data/master/reference"], ["Region V / %Utilisasi", "—", "Data/master/reference"], ["Region VI / Limit", "—", "Data/master/reference"], ["Region VI / Outstanding", "—", "Data/master/reference"], ["Region VI / %Utilisasi", "—", "Data/master/reference"], ["Region VII / Limit", "—", "Data/master/reference"], ["Region VII / Outstanding", "—", "Data/master/reference"], ["Region VII / %Utilisasi", "—", "Data/master/reference"], ["Region VIII / Limit", "—", "Data/master/reference"], ["Region VIII / Outstanding", "—", "Data/master/reference"], ["Region VIII / %Utilisasi", "—", "Data/master/reference"], ["Region IX / Limit", "—", "Data/master/reference"], ["Region IX / Outstanding", "—", "Data/master/reference"], ["Region IX / %Utilisasi", "—", "Data/master/reference"], ["Region X / Limit", "—", "Data/master/reference"], ["Region X / Outstanding", "—", "Data/master/reference"], ["Region X / %Utilisasi", "—", "Data/master/reference"], ["Region XI / Limit", "—", "Data/master/reference"], ["Region XI / Outstanding", "—", "Data/master/reference"], ["Region XI / %Utilisasi", "—", "Data/master/reference"], ["Region XII / Limit", "—", "Data/master/reference"], ["Region XII / Outstanding", "—", "Data/master/reference"], ["Region XII / %Utilisasi", "—", "Data/master/reference"]], "Validation": [["Status Crosscheck", "—", "Data/master/reference"], ["Data Quality", "—", "Data/master/reference"]]}}};
const productFields={"CASHLOAN": ["no_cus", "nm_cus", "kd_cab", "nm_cab", "no_rek", "gas_reporting", "buc_reporting", "jns_krd", "src", "j_guna", "revolv", "bilokj", "total_limit", "total_bade", "project_location", "code", "MatDate/Jatem", "MatDate/Jatem"], "NON CASH LOAN": ["NO", "MODULE", "Swift Code", "REPORTTYPE", "TRXREF", "RELREF", "CUSTID", "CUSTNM", "CPNM", "CPCNTY", "CPBK", "BKCNTRY", "Country Code", "Country Name", "Type of Judgment", "TRXTYPE", "CCY", "AMOUNT", "BALANCE", "EXCHANGERT", "EQVIDR", "FINTYPE", "TRXDATE", "DUEDATE", "SERVCODE", "SERVNM", "PCCD", "PCNM", "BUCD", "SOF", "INTRT"], "COMMERCIAL LINE (CRDT)": ["No", "Nama", "Swift Code", "Swift Code Vlookup", "Code", "Aging Schedule RM", "Negara", "Bank", "RM", "Dept.", "BMFIR", "Fitch", "Moody's", "S&P", "Treasury DN", "Treasury DN Utilisasi", "Treasury LN", "Treasury LN Utilisasi", "Treasury Line Total", "Treasury Line Total Utilisasi", "Comm DN", "Comm DN Utilisasi", "Comm LN", "Comm LN Utilisasi", "Comm Line Total", "Comm Line Total Utilisasi", "Corporate Card", "Credit Line Total", "Credit Line Total Utilisasi"], "Investment Line": ["No", "Nama Bank", "Nama Entity (Scope Entity : AKK)", "Switftcode", "Jenis Invesment Line", "Amount Invesment Line", "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa"], "BONDS": ["Date", "Branch", "Securities Type", "Securities Name", "Issuer Name", "Issuer Country", "Issuer Type", "Portfolio", "CCY", "Amount", "Amount Eq. IDR Juta", "Maturity Date", "Coupon", "Potential P/L (Eq. IDR Juta)"], "NOSTRO": ["Year", "Branch", "SwfitCode", "Bank Name", "Bank Country", "Balance"], "TREASURY LINE (CRDT)": ["No", "Nama", "Swift Code", "Swift Code Vlookup", "Code", "Aging Schedule RM", "Negara", "Bank", "RM", "Dept.", "BMFIR", "Fitch", "Moody's", "S&P", "TDN", "TDN Utilisasi", "TLN", "TLN Utilisasi", "Treasury Line", "Total Utilisasi", "CDN", "CDN Utilisasi", "CLN", "CLN Utilisasi", "Comm Line", "Comm Line Utilisasi", "Corporate Card", "Credit Line", "Credit Line Utilisasi", "Maturity"]};
const productSample={"Nominal Pertanggungan":{"No":"1","Perusahaan Asuransi":"PT Asuransi Tugu Pratama Indonesia Tbk","Jenis Prudk Asuransi":"Asuransi Kredit","Entitas":"BMRI","EIL Entitas (Rp Juta)":"60093270.28","Nominal Pertanggungan 2025 (Rp Juta)":"11573402.55","Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)":"13060790.52","Utilisasi EIL (%)":"21.73%","CIL (Rp Juta)":"107814276.74","CIT (Rp Juta)":"108150600","Utilisasi CIL (%)":"99.69%","% Utilisasi (Nominal Pertanggungan/CIL)":"10.74%","% Utilisasi Proyeksi (Nominal Pertanggungan/CIL)":"12.12%","Skor Akreditasi (PCP)":"79.38","Klasifikasi EWS (PCP)":"Monitoring","Status / Rekomendasi Action Plan":"Monitoring as usual / no specific action"},"CASHLOAN": {"no_cus": "16000000010", "nm_cus": "PURE SOURCE DAIRY FARM CO., LTD", "kd_cab": "60900", "nm_cab": "PT BANK MANDIRI SHANGHAI (CNY)", "no_rek": "6090100009393", "gas_reporting": "WHOLESALE CIB", "buc_reporting": "CB105", "jns_krd": "I-SYN-CNY", "src": "KLN", "j_guna": "KREDIT INVESTASI", "revolv": "N", "bilokj": "9999", "total_limit": "273.52", "total_bade": "273.52", "project_location": "China", "code": "CN", "MatDate/Jatem": ""}, "NON CASH LOAN": {"NO": "1", "MODULE": "EXCO", "Swift Code": "ANZB AU 3M", "REPORTTYPE": "Export Collection Financing", "TRXREF": "XC77126002607", "RELREF": "", "CUSTID": "16000005630", "CUSTNM": "PT. PABRIK KERTAS TJIWI KIMIA TBK", "CPNM": "KENSINGTON INTERNATIONAL LIMITED", "CPCNTY": "", "CPBK": "", "BKCNTRY": "", "Country Code": "HK", "Country Name": "Hong Kong", "Type of Judgment": "CPNM", "TRXTYPE": "D/A", "CCY": "USD", "AMOUNT": "14978.87", "BALANCE": "14978.87", "EXCHANGERT": "17310", "EQVIDR": "259284240", "FINTYPE": "DISCOUNT/REDISCOUNT", "TRXDATE": "07/04/2026", "DUEDATE": "02/10/2026", "SERVCODE": "77106", "SERVNM": "Trade Operation Export", "PCCD": "77106", "PCNM": "Trade Operation Export", "BUCD": "", "SOF": "T", "INTRT": "6.97"}, "COMMERCIAL LINE (CRDT)": {"No": "1", "Nama": "Australia and New Zealand Banking Group Limited", "Swift Code": "ANZB AU 3M", "Swift Code Vlookup": "ANZBAU3M", "Code": "AU", "Aging Schedule RM": "Raden Rizky Herfianda", "Negara": "Australia", "Bank": "Foreign", "RM": "2", "Dept.": "IFI", "BMFIR": "AA", "Fitch": "AA-", "Moody's": "Aa2", "S&P": "AA-", "Treasury DN": "50000", "Treasury DN Utilisasi": "1469.93", "Treasury LN": "140000", "Treasury LN Utilisasi": "0", "Treasury Line Total": "190000", "Treasury Line Total Utilisasi": "1469.93", "Comm DN": "775000", "Comm DN Utilisasi": "6618.77", "Comm LN": "35000", "Comm LN Utilisasi": "0", "Comm Line Total": "810000", "Comm Line Total Utilisasi": "6618.77", "Corporate Card": "0", "Credit Line Total": "1000000", "Credit Line Total Utilisasi": "8088.69"}, "Investment Line": {"No": "1", "Nama Bank": "ANZ", "Nama Entity (Scope Entity : AKK)": "DPBM", "Switftcode": "ANZxx", "Jenis Invesment Line": "Deposito", "Amount Invesment Line": "10000000000", "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa": ""}, "BONDS": {"Date": "30-Apr-26", "Branch": "Head Office", "Securities Type": "Fixed Rate", "Securities Name": "FR0037", "Issuer Name": "Indo Gov", "Issuer Country": "ID", "Issuer Type": "Government", "Portfolio": "Banking Book", "CCY": "IDR", "Amount": "585424000000", "Amount Eq. IDR Juta": "585424", "Maturity Date": "15-Sep-26", "Coupon": "12%", "Potential P/L (Eq. IDR Juta)": "0"}, "NOSTRO": {"Year": "Apr-26", "Branch": "Head Office", "SwfitCode": "XXXXAEJX", "Bank Name": "FIRST ABU DABI BANK", "Bank Country": "AE", "Balance": "26.64"}};
const integrationRuntimeSource={
  Country:{"CASHLOAN":"Big Data (adjusted Country)","NON CASH LOAN":"NTF -> Provided by DWB","CREDIT LINE":"Data Utilisasi Credit Line","BONDS":"Market Risk/Treasury","NOSTRO":"Internal Mandiri"},
  CCL:{"CASHLOAN":"Core Banking Limit System","NON CASH LOAN":"Core Banking Limit System","CREDIT LINE":"Core Banking Limit System"},
  MLK:{"CASHLOAN":"LIMAST","NON CASH LOAN":"LIMAST","CREDIT LINE":"LIMAST"},
  CIL:{"Nominal Pertanggungan":"CIL_MONITORING"},
  LPG:{"CASHLOAN":"Master Debitur / Master Cash Loan → LPG aggregation","NON CASH LOAN":"Master Debitur / Master NCL → LPG aggregation"}
};

const integrationTargets={
  Country:{"CASHLOAN":"Country Code / Project Location","NON CASH LOAN":"Country Code","CREDIT LINE":"Country Code / Bank Country","BONDS":"Issuer Country","NOSTRO":"Bank Country"},
  CCL:{"CASHLOAN":"Bank / Counterparty mapping","NON CASH LOAN":"Swift Code / Counterparty","CREDIT LINE":"Swift Code","Investment Line":"Swift Code / Entity"},
  MLK:{"CASHLOAN":"CIF","NON CASH LOAN":"CUSTID / CIF","CREDIT LINE":"CIF / Debtor mapping (Treasury scope)"},
  CIL:{"Nominal Pertanggungan":"Insurance Company + Entity"},
  LPG:{"CASHLOAN":"CIF → Sector / Segment / Region","NON CASH LOAN":"CUSTID/CIF → Sector / Segment / Region"}
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
  if(type==="Country") return {"Identitas":s["Identitas"]||[],"Limit & Gap":s["Limit & Gap"]||[]};
  if(type==="CCL") return {"Bank Profile":s["Bank Profile"]||[],"Risk & Capacity":s["Risk & Capacity"]||[],"Limit":(s["Limit"]||[]).filter(([f])=>f!=="Utilisasi Capacity")};
  if(type==="MLK") return {"Profil Debitur":s["Profil Debitur"]||[],"Risk & Regulatory":s["Risk & Regulatory"]||[],"Master Limit":s["Master Limit"]||[]};
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
    "Bankwide Limit":(s["Bankwide"]||[]).filter(([f])=>String(f).toLowerCase().endsWith(" / limit")),
    "Regional Limit":(s["Region Monitoring"]||[]).filter(([f])=>String(f).toLowerCase().endsWith(" / limit"))
  };
  return s;
}

const domainDataContract={
  Country:{
    masterKey:"Country Code",
    masterObject:"Country",
    linkedProducts:["CASHLOAN","NON CASH LOAN","CREDIT LINE","BONDS","NOSTRO"],
    utilizationGrain:"Country Code + Periode",
    masterDescription:"Identitas country + approved Country Limit + adjustment/final limit."
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
    masterObject:"Debtor / Group Usaha",
    linkedProducts:["CASHLOAN","NON CASH LOAN","CREDIT LINE"],
    utilizationGrain:"CIF / Group Usaha + Periode",
    masterDescription:"Debtor profile + risk/capacity basis + approved Master Limit."
  },
  CIL:{
    masterKey:"Insurance Company ID / Entity",
    masterObject:"Insurance Company + Entity",
    linkedProducts:["Nominal Pertanggungan"],
    utilizationGrain:"Insurance Company + Entity + Periode",
    masterDescription:"Insurance capacity + CIT + EIL + consolidated CIL."
  },
  LPG:{
    masterKey:"Sector + Segment + Region",
    masterObject:"Portfolio Guideline",
    linkedProducts:["CASHLOAN","NON CASH LOAN"],
    utilizationGrain:"Sector + Segment + Region + Periode",
    masterDescription:"Approved Bankwide / Regional / KP+OVS guideline limit."
  }
};

const domainIntegrationProducts=Object.fromEntries(Object.entries(domainDataContract).map(([domain,cfg])=>[domain,cfg.linkedProducts]));
function integrationLabel(id){
  if(id==="CREDIT LINE") return "Credit Line (Commercial + Treasury)";
  const item=(typeof productMasterCatalog!=="undefined" ? productMasterCatalog.find(p=>p.id===id) : null);
  return item?.label||id;
}
const provenanceDefaults={
  Country:{description:"Master limit negara untuk monitoring exposure lintas produk.",source:"CPR / Risk Management",dataset:"COUNTRY_MONITORING",system:"LIMAS Working Data",period:"Agustus 2026",owner:"CPR Risk Management",sourceNote:"Approved country limit dan data exposure hasil konsolidasi source product."},
  CCL:{description:"Master CCL dan contractual limit untuk monitoring counterparty serta exposure BMRI/PA.",source:"FIB Group + SISM Group",dataset:"CCL_MONITORING",system:"LIMAS Working Data",period:"Agustus 2026",owner:"FIB / SISM",sourceNote:"BMRI data berasal dari FIB Group; data PA dikompilasi SISM sebelum monitoring."},
  MLK:{description:"Master Limit Kredit untuk monitoring CIF dan Group Usaha.",source:"CRA / SISM Group",dataset:"MLK_Master",system:"LIMAS Working Data",period:"Agustus 2026",owner:"CRA / SISM",sourceNote:"Approved Master Limit menjadi reference monitoring; capacity/borrowing capacity tetap berasal dari proses perhitungan di luar LIMAS."},
  CIL:{description:"Master CIL/EIL/CIT untuk monitoring kapasitas dan nominal pertanggungan asuransi.",source:"Risk Management / SISM",dataset:"CIL_Master",system:"LIMAS Working Data",period:"Agustus 2026",owner:"Risk Management / SISM",sourceNote:"Insurance capacity, EIL, CIT dan exposure disimpan sebagai reference/provenance untuk monitoring."},
  LPG:{description:"Master LPG untuk monitoring konsentrasi sektor, segmen dan region.",source:"Risk Management / Business Unit",dataset:"LPG_Loanportfolio",system:"LIMAS Working Data",period:"Agustus 2026",owner:"Risk Management",sourceNote:"Approved LPG limit menjadi master reference; exposure CL/NCL diagregasi melalui mapping sektor, segmen dan region."}
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

const limasDemoData={
  Country:[
    {key:"AE",name:"United Arab Emirates",statusMaster:"Exist",masterLimit:35941.00087486457,formulasi:"New",diputus:"New",dataQuality:"Normal"},
    {key:"AU",name:"Australia",statusMaster:"Exist",masterLimit:41718.775509510284,formulasi:510,diputus:565990,dataQuality:"Normal"},
    {key:"AT",name:"Austria",statusMaster:"Exist",masterLimit:35259.186470317814,formulasi:300,diputus:509391,dataQuality:"Normal"},
    {key:"BE",name:"Belgium",statusMaster:"Exist",masterLimit:43116.7740055139,formulasi:250,diputus:396193,dataQuality:"Normal"},
    {key:"CN",name:"China",statusMaster:"Exist",masterLimit:260032.3771028455,formulasi:"New",diputus:"New",dataQuality:"Normal"}
  ],
  CCL:[
    {key:"ANZBAU3M",name:"ABN Amro Bank NV",category:"Asing",country:"Netherlands",countryRating:"AAA",bobot:0.55,rating:"AA-",position:"31/12/2023",ratingIndex:0.9023,inhouse:68498,tier1:403594,capacity:200289.57641,adjusted:68498,globalParent:"—",top200:"—",ccl:500,contractual:500.026,dataQuality:"Normal"},
    {key:"ADCB",name:"Abu Dhabi Commercial Bank PJSC",category:"Asing",country:"UAE",countryRating:"AA",bobot:0.55,rating:"AA",position:"31/12/2023",ratingIndex:0.9265,inhouse:68498,tier1:269633,capacity:137398.235975,adjusted:68498,globalParent:"—",top200:"—",ccl:49,contractual:25.04,dataQuality:"Normal"},
    {key:"ADIB",name:"Abu Dhabi Islamic",category:"Asing",country:"UAE",countryRating:"AA",bobot:0.55,rating:"BBB",position:"31/12/2022",ratingIndex:0.7882,inhouse:68498,tier1:105885,capacity:45902.20635,adjusted:45902.20635,globalParent:"—",top200:"—",ccl:0,contractual:0,dataQuality:"Normal"},
    {key:"AGRICN",name:"Agricultural Bank of China Limited",category:"Asing",country:"China",countryRating:"A+",bobot:0.55,rating:"AA",position:"31/12/2023",ratingIndex:0.9265,inhouse:68498,tier1:6853801,capacity:3492525.644575,adjusted:68498,globalParent:"—",top200:"—",ccl:2000,contractual:1700.1335294117648,dataQuality:"Normal"},
    {key:"AGRICD",name:"Agricultural Development Bank of China",category:"Asing",country:"China",countryRating:"A+",bobot:0.55,rating:"AA",position:"31/12/2023",ratingIndex:0.9265,inhouse:68498,tier1:6812368,capacity:3471412.4236,adjusted:68498,globalParent:"—",top200:"—",ccl:200,contractual:200,dataQuality:"Normal"}
  ],
  MLK:[
    {key:"4000264485",name:"DJARUM",group:"DJARUM GROUP",entity:"BMRI",tier:"B",masterLimit:5818,dataQuality:"Normal"},
    {key:"1000145694",name:"ANEKA TAMBANG",group:"ANTAM GROUP",entity:"BMRI",tier:"A",masterLimit:13280,dataQuality:"Normal"},
    {key:"ANTAM-NA",name:"ANTAM RESOURCINDO",group:"ANTAM GROUP",entity:"BMRI",tier:"A",masterLimit:20,dataQuality:"Missing CIF"},
    {key:"16000486963",name:"TUNAS MOBILINDO PERKASA",group:"ASTRA GROUP",entity:"BMRI",tier:"A",masterLimit:314,dataQuality:"Normal"},
    {key:"20000474637",name:"TUNAS RIDEAN",group:"ASTRA GROUP",entity:"BMRI",tier:"A",masterLimit:1035,dataQuality:"Normal"}
  ],
  CIL:[
    {key:"TUGU",name:"PT Asuransi Tugu Pratama Indonesia Tbk",type:"Asuransi",ic:3605020000,multiplier:0.03,cit:108150600,cil:107814276.74,eils:{BMRI:60093270.28,"Mandiri Taspen":26999429.42,MTF:10591613.12,MUF:10129963.92},score:79.38,dataQuality:"Normal",action:"Monitoring as usual / no specific action"},
    {key:"PLN-INS",name:"PT Asuransi Perisai Listrik Nasional",type:"Asuransi",ic:799280000,multiplier:0.015,cit:11989200,cil:11950003.75,eils:{BMRI:6660665.24,"Mandiri Taspen":2992584.03,MTF:1173961.56,MUF:1122792.92},score:57.75,dataQuality:"Normal",action:"Switching Limit"},
    {key:"ASKRIDA",name:"PT Asuransi Bangun Askrida",type:"Asuransi",ic:1544045714.2857144,multiplier:0.015,cit:23160685.714285716,cil:23080742.88,eils:{BMRI:12864690.67,"Mandiri Taspen":5780003.42,MTF:2267439.03,MUF:2168609.76},score:34.25,dataQuality:"Normal",action:"Monitoring as usual / no specific action"},
    {key:"AKRINDO",name:"PT Asuransi Kredit Indonesia",type:"Asuransi",ic:3086548421.052632,multiplier:0.03,cit:92596452.63157895,cil:92620921.35,eils:{BMRI:51624833.26,"Mandiri Taspen":23194627.88,MTF:9099026.54,MUF:8702433.67},score:60.63,dataQuality:"Normal",action:"Monitoring as usual / no specific action"}
  ],
  LPG:[
    {key:"BATUBARA|Corporate|Bankwide",sector:"BATUBARA",segment:"Corporate",region:"Bankwide",limit:65140,dataQuality:"Normal"},
    {key:"BATUBARA|Commercial|Bankwide",sector:"BATUBARA",segment:"Commercial",region:"Bankwide",limit:35949,dataQuality:"Normal"},
    {key:"ENERGI & AIR|Corporate|Bankwide",sector:"ENERGI & AIR",segment:"Corporate",region:"Bankwide",limit:123949,dataQuality:"Normal"},
    {key:"ENERGI & AIR|Commercial|Bankwide",sector:"ENERGI & AIR",segment:"Commercial",region:"Bankwide",limit:33854,dataQuality:"Normal"},
    {key:"FARMASI & KESEHATAN|Corporate|Bankwide",sector:"FARMASI & KESEHATAN",segment:"Corporate",region:"Bankwide",limit:24600,dataQuality:"Normal"}
  ]
};

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
function recordExposure(type,row){
  return productApplicationsFor(type,row.key).reduce((a,x)=>a+(Number(x.amount)||0),0);
}
function recordLimit(type,row){
  if(type==="Country")return Number(row.masterLimit)||0;
  if(type==="CCL")return Number(row.ccl)||0;
  if(type==="MLK")return Number(row.masterLimit)||0;
  if(type==="CIL")return Number(row.cil)||0;
  return Number(row.limit)||0;
}
function recordUtil(type,row){const limit=recordLimit(type,row),exp=recordExposure(type,row);return limit?exp/limit:0}
function recordStatus(type,row){
  if(String(row.dataQuality||"Normal").startsWith("Missing"))return "Data Issue";
  const u=recordUtil(type,row);
  return u>=1?"Breach":u>=0.8?"Warning":"Normal";
}
function cilProjection(key){
  return productApplicationsFor("CIL",key).reduce((a,x)=>{
    const entity=x.entity||"";
    const factor=entity==="BMRI"?1.10:1.075;
    return a+(Number(x.amount)||0)*factor;
  },0);
}
function buildReportDummy(data){
  return {
    Country:data.Country.map((r,i)=>{const p=productContributionMap("Country",r.key),exp=recordExposure("Country",r),totalLimits=limasDemoData.Country.reduce((a,x)=>a+(Number(x.masterLimit)||0),0),share=totalLimits?r.masterLimit/totalLimits:0;return {no:i+1,country:r.name,code:r.key,statusMaster:r.statusMaster,cl:p.CASHLOAN?"v":"-",ncl:p["NON CASH LOAN"]?"v":"-",com:p["CREDIT LINE|Commercial"]?"v":"-",trs:p["CREDIT LINE|Treasury"]?"v":"-",bond:p.BONDS?"v":"-",nos:p.NOSTRO?"v":"-",expCl:p.CASHLOAN||0,expNcl:p["NON CASH LOAN"]||0,expCom:p["CREDIT LINE|Commercial"]||0,expTrs:p["CREDIT LINE|Treasury"]||0,expBond:p.BONDS||0,expNos:p.NOSTRO||0,total:exp,formulasi:r.formulasi,diputus:r.diputus,limit:r.masterLimit,pct:share,needs:0,minus:0,add:0,final:r.masterLimit,finalPct:share,status:recordStatus("Country",r)}}),
    CCL:data.CCL.map((r,i)=>{const p=productContributionMap("CCL",r.key),exp=recordExposure("CCL",r);return {no:i+1,bank:r.name,category:r.category,country:r.country,countryRating:r.countryRating,bobot:r.bobot,rating:r.rating,position:r.position,ratingIndex:r.ratingIndex,inhouse:r.inhouse,tier1:r.tier1,capacity:r.capacity,adjusted:r.adjusted,globalParent:r.globalParent,top200:r.top200,ccl:r.ccl,cclCapacity:r.capacity? r.ccl/r.capacity:0,limit:r.contractual,outstanding:exp,jenis:"Direct",bmriTotal:exp,bmriLoan:p.CASHLOAN||0,bmriCom:p["CREDIT LINE|Commercial"]||0,bmriTrs:p["CREDIT LINE|Treasury"]||0,bmriUtil:r.ccl?exp/r.ccl:0,contractualUtil:r.contractual?exp/r.contractual:0,maxOutstanding:exp,maxContractualUtil:r.contractual?exp/r.contractual:0,paTotal:0,paLoan:0,paCom:0,paTrs:0,paUtil:0,paContractualUtil:0,paMaxOutstanding:0,paMaxContractualUtil:0,status:recordStatus("CCL",r)}}),
    MLK:data.MLK.map((r,i)=>{const p=productContributionMap("MLK",r.key),exp=recordExposure("MLK",r);return {no:i+1,tier:r.tier,holding:r.group,subGroup:r.group,flag:"Source",unit:"Source",entity:r.entity,bmpkKonsol:"—",bmpkEntitas:"—",limitFasilitas:r.masterLimit,bade:exp,borrowing:"Reference",masterLimit:r.masterLimit,mlk:r.masterLimit,utilBade:r.masterLimit?exp/r.masterLimit:0,utilFacilityBmpk:"—",utilMlkBmpk:"—",debtors:1,totalBmpk:"—",totalMaster:r.masterLimit,totalBorrowing:"—",variance:0,status:recordStatus("MLK",r),cif:r.key,name:r.name,products:p}}),
    CIL:data.CIL.map((r,i)=>{const rows=productApplicationsFor("CIL",r.key),p=productContributionMap("CIL",r.key),total=recordExposure("CIL",r);const byEntity={};rows.forEach(a=>{byEntity[a.entity||"Entity"]=(byEntity[a.entity||"Entity"]||0)+(Number(a.amount)||0)});return {no:i+1,insurer:r.name,type:r.type,ic:r.ic,multiplier:(r.multiplier*100).toFixed(2)+"%",cit:r.cit,bmriNominal:byEntity.BMRI||0,bmriEil:r.eils?.BMRI||0,mtNominal:byEntity["Mandiri Taspen"]||0,mtEil:r.eils?.["Mandiri Taspen"]||0,mtfNominal:byEntity.MTF||0,mtfEil:r.eils?.MTF||0,mufNominal:byEntity.MUF||0,mufEil:r.eils?.MUF||0,cil:r.cil,totalNominal:total,projection:cilProjection(r.key),utilCit:r.cit?total/r.cit:0,projectedUtil:r.cit?cilProjection(r.key)/r.cit:0,cilUtil:r.cil?total/r.cil:0,status:recordStatus("CIL",r),score:r.score,action:r.action}}),
    LPG:data.LPG.map((r,i)=>{const p=productContributionMap("LPG",r.key),exp=recordExposure("LPG",r);return {no:i+1,sector:r.sector,segment:r.segment,region:r.region,limit:r.limit,outstanding:exp,util:r.limit?exp/r.limit:0,cl:p.CASHLOAN||0,ncl:p["NON CASH LOAN"]||0,crosscheck:(p.CASHLOAN||0)+(p["NON CASH LOAN"]||0)===exp?"Match":"Selisih",dataQuality:r.dataQuality,status:recordStatus("LPG",r)}})
  };
}
let reportDummy;

const reportConfig={
  Country:{title:"3. Monitoring Eksposur & Capacity Limit per Negara",subtitle:"Format mengikuti struktur COUNTRY_MONITORING pada master report.",source:"master_reportMonitoring.xlsx • Sheet COUNTRY_MONITORING",note:"Report menggunakan canonical Master Limit + Product Utilization; source/lineage mengikuti mapping domain.",columns:[
    ["No","no"],["Negara","country"],["Code","code"],["Status","statusMaster"],["CL","cl"],["NCL","ncl"],["COM","com"],["TRS","trs"],["BOND","bond"],["NOS","nos"],["Exposure CL","expCl"],["Exposure NCL","expNcl"],["Exposure COM","expCom"],["Exposure TRS","expTrs"],["Exposure BOND","expBond"],["Exposure NOS","expNos"],["TOTAL","total"],["Limit FIB Formulasi","formulasi"],["Limit FIB Diputus","diputus"],["Country Limit","limit"],["% Country Limit","pct"],["Needs","needs"],["Minus","minus"],["Add","add"],["Final Limit","final"],["% Final Limit","finalPct"],["Status Monitoring","status"]
  ]},
  CCL:{title:"4. Counterparty Direct Limit - Bank Mandiri (BMRI) & Perusahaan Anak",subtitle:"Format mengikuti struktur CCL_MONITORING pada master report.",source:"master_reportMonitoring.xlsx • Sheet CCL_MONITORING",note:"Master CCL/capacity dipisahkan dari integrated product utilization.",columns:[
    ["No","no"],["Nama bank","bank"],["Kategori Bank","category"],["Negara","country"],["Country Rating","countryRating"],["Bobot","bobot"],["Rating","rating"],["Posisi Rating","position"],["Rating Index","ratingIndex"],["Limit Inhouse (Rp Miliar)","inhouse"],["Tier 1 Capital (Rp Miliar)","tier1"],["Capacity","capacity"],["Capacity Limit Adjusted","adjusted"],["Global Parent Bank","globalParent"],["Top 200 Bank","top200"],["CCL","ccl"],["Limit Contractual","limit"],["Outstanding","outstanding"],["Jenis Limit","jenis"],["BMRI Total Limit","bmriTotal"],["BMRI Bank Loan","bmriLoan"],["BMRI Commercial Line","bmriCom"],["BMRI Treasury Line","bmriTrs"],["BMRI Utilisasi CCL","bmriUtil"],["BMRI Utilisasi Kontraktual","contractualUtil"],["BMRI Outstanding Maksimum","maxOutstanding"],["BMRI Utilisasi Maks. Kontraktual","maxContractualUtil"],["PA Total Limit","paTotal"],["PA Bank Loan","paLoan"],["PA Commercial Line","paCom"],["PA Treasury Line","paTrs"],["PA Utilisasi CCL","paUtil"],["PA Utilisasi Kontraktual","paContractualUtil"],["PA Outstanding Maksimum","paMaxOutstanding"],["PA Utilisasi Maks. Kontraktual","paMaxContractualUtil"],["Status Monitoring","status"]
  ]},
  MLK:{title:"7. Monitoring Debitur per Group Usaha (Konsolidasi)",subtitle:"Format mengikuti struktur MLK_Monitor dan dikorelasikan dengan MLK_Master.",source:"master_reportMonitoring.xlsx • Sheet MLK_Master + MLK_Monitor",note:"Master Limit berasal dari canonical MLK master; exposure berasal dari integrated CL/NCL/Treasury Line.",columns:[
    ["No","no"],["Tier","tier"],["Group Usaha (Holding)","holding"],["Sub-Group","subGroup"],["BUMN/Swasta","flag"],["Unit Kerja Pengelola","unit"],["Entitas","entity"],["BMPK Konsol","bmpkKonsol"],["BMPK Entitas","bmpkEntitas"],["Limit Fasilitas","limitFasilitas"],["Total Bade","bade"],["Borrowing Capacity","borrowing"],["Master Limit","masterLimit"],["MLK Konsolidasi","mlk"],["Utilisasi Bade / Limit Fasilitas","utilBade"],["Utilisasi Limit / BMPK Entitas","utilFacilityBmpk"],["MLK / BMPK Konsol","utilMlkBmpk"],["Jumlah Debitur","debtors"],["Total BMPK Entitas (Master)","totalBmpk"],["Total Master Limit (Master)","totalMaster"],["Total Borrowing Capacity (Master)","totalBorrowing"],["Selisih Master Limit","variance"],["Status","status"]
  ]},
  CIL:{title:"CIL Master Monitoring",subtitle:"Format mengikuti struktur CIL_Master pada master report.",source:"master_reportMonitoring.xlsx • Sheet CIL_Master",note:"CIL master berisi IC/CIT/EIL/CIL; Nominal Pertanggungan adalah integrated utilization.",columns:[
    ["No","no"],["Perusahaan Asuransi","insurer"],["Jenis Perusahaan","type"],["Insurance Capacity (Rp Juta)","ic"],["Multiplier Terpakai","multiplier"],["CIT (Rp Juta)","cit"],["Nominal Pertanggungan BMRI","bmriNominal"],["EIL BMRI","bmriEil"],["Nominal Pertanggungan Mandiri Taspen","mtNominal"],["EIL Mandiri Taspen","mtEil"],["Nominal Pertanggungan MTF","mtfNominal"],["EIL MTF","mtfEil"],["Nominal Pertanggungan MUF","mufNominal"],["EIL MUF","mufEil"],["CIL","cil"],["Total Nominal Pertanggungan","totalNominal"],["Proyeksi 2026","projection"],["% Nominal / CIT","utilCit"],["% Proyeksi / CIT","projectedUtil"],["% Nominal / CIL","cilUtil"],["Status","status"]
  ]},
  LPG:{title:"Loan Portfolio Guideline (LPG) Monitoring",subtitle:"Monitoring Sektor × Segmen × Wilayah dengan CL/NCL breakdown.",source:"master_reportMonitoring.xlsx • LPG_Loanportfolio",note:"Master limit dan integrated CL/NCL outstanding dipisahkan; split CL/NCL pada demo hanya ilustrasi reconciliation sampai source-level tersedia.",columns:[
    ["No","no"],["Sektor","sector"],["Segmen","segment"],["Region","region"],["Limit","limit"],["Outstanding","outstanding"],["Utilisasi","util"],["CL","cl"],["NCL","ncl"],["Crosscheck","crosscheck"],["Data Quality","dataQuality"],["Status","status"]
  ]}
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
  const [type,setType]=useState("Country"),[period,setPeriod]=useState("Agustus 2026"),[status,setStatus]=useState("All"),[generated,setGenerated]=useState(false);
  const rows=reportDummy[type]||[],filtered=rows.filter(r=>status==="All"||statusForReport(r)===status),cfg=reportConfig[type];
  const generate=()=>setGenerated(true);
  const summary={total:rows.length,normal:rows.filter(r=>statusForReport(r)==="Normal").length,warning:rows.filter(r=>statusForReport(r)==="Warning").length,breach:rows.filter(r=>statusForReport(r)==="Breach").length,issue:rows.filter(r=>statusForReport(r)==="Data Issue").length};
  return <Layout screen="report" onNav={nav}><Header title="Generate Monitoring Report" subtitle="Generate report monitoring dengan struktur yang mengikuti master report masing-masing limit"/><div className="page">
    <section className="card"><div className="head"><div><h2>Report Generator</h2><p>Generate report dari monitoring read model yang sama dengan halaman Monitoring.</p></div><div className="chip blue">Prototype Reconciled Data • {rows.length} records</div></div><div className="body">
      <div className="report-controls">
        <div><label>Jenis Report</label><select className="select" value={type} onChange={e=>{setType(e.target.value);setGenerated(false);setStatus("All")}}><option>Country</option><option>CCL</option><option>MLK</option><option>CIL</option><option>LPG</option></select></div>
        <div><label>Periode</label><select className="select" value={period} onChange={e=>setPeriod(e.target.value)}><option>Agustus 2026</option><option>Juli 2026</option><option>Juni 2026</option></select></div>
        <div><label>Status</label><select className="select" value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Normal</option><option>Warning</option><option>Breach</option><option>Data Issue</option></select></div>
        <div className="report-actions"><button className="btn primary" onClick={generate}>Generate Report</button><button className="btn secondary" onClick={()=>downloadReportCsv(type,filtered)}>Download CSV</button></div>
      </div>
    </div></section>
    {generated&&<section className="card"><div className="head"><div><h2>{cfg.title}</h2><p>{cfg.subtitle}</p><div className="report-meta"><span>{cfg.source}</span><span>Periode: {period}</span><span>Generated: {nowLabel()}</span></div></div><button className="btn ghost" onClick={()=>window.print()}>Print / PDF</button></div><div className="body">
      <div className="report-note">{cfg.note}</div>
      <div className="metric-grid report-kpi"><DomainKpi label="Total Data" value={summary.total} sub="Dummy records"/><DomainKpi label="Normal" value={summary.normal} sub="Within monitoring threshold"/><DomainKpi label="Warning" value={summary.warning} sub="Early warning condition" accent="yellow"/><DomainKpi label="Breach" value={summary.breach} sub="Above monitoring limit" accent="red"/><DomainKpi label="Data Issue" value={summary.issue} sub="Needs review"/></div>
      <div className="table-wrap report-table-wrap"><table className="table report-table"><thead><tr>{cfg.columns.map(([label])=><th key={label}>{label}</th>)}</tr></thead><tbody>{filtered.map((r,i)=><tr key={r.no||i}>{cfg.columns.map(([label,key])=><td key={key}>{key==="status"||key==="statusMaster"?<Status v={statusForReport(r)}/>:fmtReport(r[key])}</td>)}</tr>)}</tbody></table></div>
      <div className="report-footer"><b>Reporting note:</b> Report prototype membaca dataset monitoring canonical yang sama dengan Dashboard/Monitoring. Karena itu Master Limit + Product Utilization + Status harus tetap tally. Field yang source-nya belum eksplisit ditandai sesuai MD.</div>
    </div></section>}
    {!generated&&<section className="card"><div className="head"><div><h2>Report Preview</h2><p>Report belum di-generate. Pilih parameter lalu klik Generate Report.</p></div></div><div className="body"><div className="report-preview"><div><b>{cfg.title}</b><span>{cfg.source}</span></div><div><b>5 dummy data</b><span>Normal / Warning / Breach / Data Quality scenario</span></div><div><b>Output</b><span>Preview table + CSV + Print/PDF browser</span></div></div></div></section>}
  </div></Layout>;
}
function Status({v}){return <span className={`badge ${v==='Breach'?'breach':v==='Warning'?'warning':'normal'}`}>{v}</span>}
function Layout({screen,onNav,children}){const nav=[['dashboard','⌂','Dashboard'],['setup','⚙','Master Limit Setup'],['detail','▤','Master Limit Detail'],['products','▦','Product Universe & Integration'],['report','▤','Generate Report'],['warning','◉','Early Warning'],['Country','◎','Country Limit'],['CCL','◈','Counterparty / CCL'],['MLK','◌','Debtor / MLK'],['CIL','⬡','Insurance / CIL'],['LPG','◫','Portfolio / LPG']];return <div className="app shell"><aside className="side"><div className="brand"><div><b>LIMAS</b><small>Limit Management System</small></div></div><div className="nav">{nav.map(([id,ic,lb],i)=><React.Fragment key={id}>{i===1&&<div className="section">Master & Data</div>}{i===4&&<div className="section">Reporting</div>}{i===5&&<div className="section">Monitoring</div>}<button className={screen===id?'active':''} onClick={()=>onNav(id)}><span style={{width:16}}>{ic}</span>{lb}</button></React.Fragment>)}</div><div className="collapse">‹‹ &nbsp; Collapse</div></aside><main className="main">{children}</main></div>}
function Header({title,subtitle}){return <div className="top"><div className="title"><h1>{title}</h1><p>{subtitle}</p></div><div className="usr">🔔 <span className="avatar">R</span><div><b>Risk Management</b><div style={{fontSize:10,color:'#95a3b9'}}>CPR • LIMAS</div></div></div></div>}
function Login({go}){return <div className="app login"><div className="login-card"><div className="login-logo">LM</div><h1>LIMAS</h1><p>Limit Management System</p><input defaultValue="cpr.risk" placeholder="Username"/><input defaultValue="demo123" type="password" placeholder="Password"/><button className="btn primary" onClick={go}>Masuk ke LIMAS</button><div className="foot">Prototype • Development / UAT</div></div></div>}

function DomainKpi({label,value,sub,accent=""}){return <div className="metric"><div className="label">{label}</div><div className="value" style={accent?{color:`var(--${accent})`}:{}}>{value}</div><div className="sub">{sub}</div></div>}

function OverviewTable({type, onDetail}){
  const rows = {
    Country:[
      ["CN","China","2,000","1,420","71%","Normal"],
      ["SG","Singapore","1,650","1,410","85%","Warning"],
      ["AE","United Arab Emirates","500","512","102%","Breach"],
      ["AU","Australia","900","710","79%","Normal"],
      ["JP","Japan","750","645","86%","Warning"]
    ],
    CCL:[
      ["ANZBAU3M","ANZ Bank","500","355","71%","Normal"],
      ["CTBAAU2S","Commonwealth Bank","400","372","93%","Warning"],
      ["NATAAU33","National Australia Bank","300","318","106%","Breach"],
      ["FABAAE","First Abu Dhabi Bank","350","245","70%","Normal"],
      ["ICBC","Agricultural Bank of China","2000","1700","85%","Warning"]
    ],
    MLK:[
      ["4000264485","DJARUM","5,818","4,021","69%","Normal"],
      ["1000145694","ANEKA TAMBANG","13,280","11,580","87%","Warning"],
      ["4000027711","MANDIRI GROUP SAMPLE","9,000","9,630","107%","Breach"],
      ["2000198372","SAMPLE GROUP B","7,500","4,650","62%","Normal"]
    ],
    CIL:[
      ["INS-001|BMRI","Tugu Pratama","60,093","58,300","97%","Warning"],
      ["INS-001|MTF","Tugu Pratama - MTF","10,592","10,129","96%","Warning"],
      ["INS-002|BMRI","Perisai Listrik","6,661","5,980","90%","Warning"],
      ["INS-003|BMRI","Insurance ABC","18,000","19,450","108%","Breach"]
    ],
    LPG:[
      ["BATUBARA|Corporate|R1","Batubara / Corp / R1","65,140","37,919","58%","Normal"],
      ["BATUBARA|Commercial|R1","Batubara / Comm / R1","35,949","30,350","84%","Warning"],
      ["NIKEL|Corporate|R2","Nikel / Corp / R2","42,000","44,500","106%","Breach"],
      ["KELAPA SAWIT|Corporate|R3","Sawit / Corp / R3","50,000","33,600","67%","Normal"]
    ]
  }[type];
  return <div className="table-wrap"><table className="table"><thead><tr><th>Unique Key</th><th>Objek</th><th>Limit</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Detail</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}><td><span className="key">{r[0]}</span></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><Status v={r[5]}/></td><td><button className="btn ghost" onClick={()=>onDetail(type,r[0])}>View</button></td></tr>)}</tbody></table></div>
}

function Dashboard({nav}){
  const domainsList=["Country","CCL","MLK","CIL","LPG"];
  const summary=domainsList.reduce((a,type)=>{
    const rows=limasDemoData[type]||[];
    return {...a,records:a.records+rows.length,normal:a.normal+rows.filter(r=>recordStatus(type,r)==="Normal").length,warning:a.warning+rows.filter(r=>recordStatus(type,r)==="Warning").length,breach:a.breach+rows.filter(r=>recordStatus(type,r)==="Breach").length,issue:a.issue+rows.filter(r=>recordStatus(type,r)==="Data Issue").length};
  },{records:0,normal:0,warning:0,breach:0,issue:0});
  return <Layout screen="dashboard" onNav={nav}>
    <Header title="Halo, Risk Management" subtitle="Executive monitoring limit Bank Mandiri Group"/>
    <div className="page">
      <div className="hero">
        <h2>Limit Management Overview</h2>
        <p>Master limit aktif, product utilization terintegrasi dan monitoring status periode berjalan.</p>
        <div className="hero-grid">
          <div><div className="hero-label">Master Objects</div><div className="hero-value">{summary.records}</div></div>
          <div><div className="hero-label">Integrated Exposure Records</div><div className="hero-value">{summary.records}</div></div>
          <div><div className="hero-label">Breach</div><div className="hero-value">{summary.breach}</div></div>
        </div>
      </div>

      <div className="metric-grid">
        {domainsList.map(type=>{
          const rows=limasDemoData[type]||[],lim=rows.reduce((a,r)=>a+recordLimit(type,r),0),exp=rows.reduce((a,r)=>a+recordExposure(type,r),0),u=lim?exp/lim:0;
          return <DomainKpi key={type} label={type+" Limit"} value={(u*100).toFixed(1)+"%"} sub={rows.length+" objects • "+rows.filter(r=>recordStatus(type,r)==="Warning").length+" EWS • "+rows.filter(r=>recordStatus(type,r)==="Breach").length+" Breach"} accent={u>=1?"red":u>=0.8?"yellow":""}/>;
        })}
      </div>

      <div className="dash-grid">
        <section className="card">
          <div className="head"><div><h2>Utilisasi per Domain</h2><p>Exposure terintegrasi dibandingkan dengan master limit domain.</p></div></div>
          <div className="body"><div className="chart-list">
            {domainsList.map(type=>{
              const rows=limasDemoData[type]||[],lim=rows.reduce((a,r)=>a+recordLimit(type,r),0),exp=rows.reduce((a,r)=>a+recordExposure(type,r),0),u=lim?Math.min(exp/lim,1):0;
              return <div className="chart-row" key={type}><div className="chart-row-head"><b>{type}</b><span>{(u*100).toFixed(1)}%</span></div><div className="chart-track"><span style={{width:(u*100)+"%"}}/></div></div>;
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

      <div className="dash-grid">
        <section className="card"><div className="head"><div><h2>Early Warning & Breach</h2><p>Exception lintas domain dari canonical monitoring model.</p></div><button className="btn secondary" onClick={()=>nav("warning")}>Buka EWS Center</button></div><div className="body"><div className="alert-list">
          {domainsList.flatMap(type=>(limasDemoData[type]||[]).map(r=>({type,r,st:recordStatus(type,r)}))).filter(x=>x.st==="Warning"||x.st==="Breach").slice(0,6).map(({type,r,st})=><div className={"alert "+(st==="Breach"?"breach":"warning")} key={type+"|"+r.key}><span className="bar"></span><div><b>{type+" • "+(r.name||r.sector)}</b><div className="muted-small">Utilisasi {(recordUtil(type,r)*100).toFixed(2)}%</div></div><Status v={st}/></div>)}
        </div></div></section>
        <section className="card"><div className="head"><div><h2>Reconciliation Status</h2><p>Data issue yang memerlukan investigasi.</p></div></div><div className="body">
          {domainsList.map(type=>(limasDemoData[type]||[]).filter(r=>recordStatus(type,r)==="Data Issue").map(r=><div className="mini" style={{marginBottom:8}} key={type+"|"+r.key}><b>{type+" • "+(r.name||r.sector)}</b><div className="muted-small">{r.dataQuality}</div></div>))}
          {summary.issue===0&&<div className="mini">No data issue.</div>}
        </div></section>
      </div>
    </div>
  </Layout>
}

function Warning({nav}){
  const [status,setStatus]=useState("All"), [domain,setDomain]=useState("All");
  const rows=[
    ["Breach","MLK","4000027711","MANDIRI GROUP SAMPLE","9,000","9,630","107%","1,000","2026-08-12 09:00"],
    ["Breach","CCL","NATAAU33","National Australia Bank","300","318","106%","150","2026-08-12 08:55"],
    ["Breach","LPG","NIKEL|Corporate|R2","Nikel / Corp / R2","42,000","44,500","106%","100","2026-08-12 08:20"],
    ["Warning","Country","SG","Singapore","1,650","1,410","85%","80%","2026-08-12 08:05"],
    ["Warning","CIL","INS-001|BMRI","Tugu Pratama - BMRI","60,093","58,300","97%","80%","2026-08-12 08:00"],
    ["Warning","MLK","1000145694","ANEKA TAMBANG","13,280","11,580","87%","80%","2026-08-11 17:35"],
  ];
  const filtered=rows.filter(r=>(status==="All"||r[0]===status)&&(domain==="All"||r[1]===domain));
  return <Layout screen="warning" onNav={nav}><Header title="Early Warning & Breach Center" subtitle="Pusat exception monitoring berdasarkan threshold pada setiap master limit"/><div className="page">
    <div className="metric-grid">
      <DomainKpi label="Total Exception" value={filtered.length} sub="Hasil filter saat ini"/>
      <DomainKpi label="Breach" value={rows.filter(r=>r[0]==="Breach").length} sub="Utilisasi ≥ breach threshold" accent="red"/>
      <DomainKpi label="Early Warning" value={rows.filter(r=>r[0]==="Warning").length} sub="Warning ≤ utilization < breach" accent="yellow"/>
      <DomainKpi label="Data Issue" value="4" sub="Belum lengkap / mismatch"/>
      <DomainKpi label="Action Pending" value="5" sub="Perlu review user" accent="yellow"/>
    </div>
    <section className="card"><div className="head"><div><h2>Filter Exception</h2><p>Status threshold dibaca dari master masing-masing domain</p></div></div><div className="body"><div className="toolbar"><select className="select" value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Warning</option><option>Breach</option></select><select className="select" value={domain} onChange={e=>setDomain(e.target.value)}><option>All</option><option>Country</option><option>CCL</option><option>MLK</option><option>CIL</option><option>LPG</option></select><select className="select"><option>All Entity</option><option>BMRI</option><option>Perusahaan Anak</option></select><select className="select"><option>Latest Period</option><option>Previous Month</option></select></div></div></section>
    <section className="card"><div className="head"><div><h2>Exception Register</h2><p>Drill-down menuju master dan detail exposure</p></div></div><div className="body"><div className="table-wrap"><table className="table"><thead><tr><th>Status</th><th>Domain</th><th>Unique Key</th><th>Objek</th><th>Limit</th><th>Exposure</th><th>Utilisasi</th><th>Threshold</th><th>Last Update</th><th>Aksi</th></tr></thead><tbody>{filtered.map(r=><tr key={r[2]}><td><Status v={r[0]}/></td><td><b>{r[1]}</b></td><td><span className="key">{r[2]}</span></td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td><td>{r[6]}</td><td>{r[7]}</td><td>{r[8]}</td><td><button className="btn ghost" onClick={()=>nav("detail",{type:r[1],key:r[2]})}>Detail</button></td></tr>)}</tbody></table></div></div></section>
    <div className="dash-grid"><section className="card"><div className="head"><div><h2>Exception by Domain</h2><p>Distribusi warning dan breach</p></div></div><div className="body"><div className="heatmap">{[["Country","2","low"],["CCL","2","warn"],["MLK","3","high"],["CIL","2","warn"],["LPG","1","high"],["Data","4","mid"]].map(x=><div className={`heat ${x[2]}`} key={x[0]}><div>{x[0]}</div><div style={{fontSize:18,marginTop:8}}>{x[1]}</div></div>)}</div></div></section>
    <section className="card"><div className="head"><div><h2>Action Status</h2><p>Follow-up exception</p></div></div><div className="body">{[["Open",5],["In Review",3],["Resolved",7]].map(x=><div className="mini" style={{marginBottom:8}} key={x[0]}><b>{x[0]}</b><span style={{float:"right",fontWeight:900}}>{x[1]}</span></div>)}</div></section></div>
  </div></Layout>
}

function Monitor({type,nav}){
  const rows=limasDemoData[type]||[];
  const totalLimit=rows.reduce((a,r)=>a+recordLimit(type,r),0);
  const totalExposure=rows.reduce((a,r)=>a+recordExposure(type,r),0);
  const overallUtil=totalLimit?totalExposure/totalLimit:0;
  const statusCounts={Normal:rows.filter(r=>recordStatus(type,r)==="Normal").length,Warning:rows.filter(r=>recordStatus(type,r)==="Warning").length,Breach:rows.filter(r=>recordStatus(type,r)==="Breach").length,"Data Issue":rows.filter(r=>recordStatus(type,r)==="Data Issue").length};
  const titleMap={Country:"Country Limit Monitoring",CCL:"Counterparty / CCL Monitoring",MLK:"Debtor / MLK Monitoring",CIL:"Insurance / CIL Monitoring",LPG:"Portfolio / LPG Monitoring"};
  const subtitleMap={Country:"Master Country Limit + integrated product utilization.",CCL:"Master CCL / Contractual Limit + integrated counterparty product utilization.",MLK:"Master Limit per CIF/group + integrated CL, NCL and Treasury Line exposure.",CIL:"Master IC/CIT/EIL/CIL + integrated Nominal Pertanggungan.",LPG:"Master limit Sector × Segment × Region + integrated CL/NCL outstanding."};
  const unitMap={Country:"Rp Juta",CCL:"Rp Miliar",MLK:"Rp Juta",CIL:"Rp Juta",LPG:"Rp Juta"};
  const pct=v=>(v*100).toFixed(2)+"%";
  const productsText=r=>{
    if(type==="CIL") return Object.entries(r.entities||{}).map(([e,v])=>e+" "+Number(v.nominal||0).toLocaleString("id-ID",{maximumFractionDigits:2})).join(" • ");
    return Object.entries(r.products||{}).map(([p,v])=>demoProductLabel(p)+": "+Number(v||0).toLocaleString("id-ID",{maximumFractionDigits:2})).join(" • ")||"Tidak ada exposure";
  };
  return <Layout screen={type} onNav={nav}>
    <Header title={titleMap[type]} subtitle={subtitleMap[type]}/>
    <div className="page">
      <div className="metric-grid">
        <DomainKpi label="Total Master Limit" value={totalLimit.toLocaleString("id-ID",{maximumFractionDigits:2})} sub={unitMap[type]}/>
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
            type==="Country"?<><th>Country Code</th><th>Country</th><th>Master Limit</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>:
            type==="CCL"?<><th>Swift</th><th>Bank</th><th>CCL</th><th>Contractual</th><th>Outstanding</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>:
            type==="MLK"?<><th>CIF</th><th>Debitur</th><th>Group</th><th>Master Limit</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>:
            type==="CIL"?<><th>Insurance</th><th>Nama</th><th>CIL</th><th>Nominal Pertanggungan</th><th>Utilisasi CIL</th><th>Status</th><th>Entity Contribution</th></>:
            <><th>Sektor</th><th>Segmen</th><th>Region</th><th>Master Limit</th><th>Outstanding</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>
          }</tr></thead>
          <tbody>{rows.map((r,i)=>{
            const lim=recordLimit(type,r),exp=recordExposure(type,r),u=recordUtil(type,r),st=recordStatus(type,r);
            if(type==="Country") return <tr key={i}><td className="key">{r.key}</td><td>{r.name}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>{productsText(r)}</td></tr>;
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
          <div><h2>{type} Master</h2><p>Unique key: <span className="key">{info.key}</span> • hanya approved master limit dan parameter yang disimpan.</p></div>
          <div className="toolbar"><button className="btn secondary">Download Template</button><button className="btn primary">Upload Master Limit</button></div>
        </div>
        <div className="body">
          <div className="tabs">{Object.keys(domains).map(d=><button className={"tab "+(d===type?"active":"")} key={d} onClick={()=>setType(d)}>{d}</button>)}</div>
          <div className="toolbar" style={{marginBottom:14}}><input className="input" placeholder={"Cari "+info.key}/><select className="select"><option>Active</option><option>Inactive</option><option>All</option></select><button className="btn ghost">Filter</button></div>
          <div className="table-wrap"><table className="table">
            <thead><tr><th>Unique Key</th><th>Master Object</th><th>Master Limit</th><th>Linked Product</th><th>Version</th><th>Status</th><th>Detail</th></tr></thead>
            <tbody>{rows.map((r,i)=><tr key={String(r.key)+i}>
              <td className="key">{r.key}</td>
              <td>{r.name||r.sector}</td>
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

function sampleKey(t){const m={Country:'AE',CCL:'ANZB AU 3M',MLK:'4000264485',CIL:'INS-001 + BMRI',LPG:'BATUBARA + Corporate + Region I'};return m[t]}
function sampleName(t){const m={Country:'United Arab Emirates',CCL:'ABN Amro Bank NV',MLK:'DJARUM',CIL:'PT Asuransi Tugu Pratama Indonesia Tbk',LPG:'BATUBARA'};return m[t]}


const mdFieldSource={
  Country:{
    "Identitas||No":"Dataset team Country","Identitas||Negara":"Dataset team Country","Identitas||Code":"Dataset team Country","Identitas||Status":"Dataset team Country",
    "Checklist Product||CL":"Big Data (adjusted Country)","Checklist Product||NCL":"NTF -> Provided by DWB","Checklist Product||COM":"Data Utilisasi Credit Line","Checklist Product||TRS":"Data Utilisasi Credit Line","Checklist Product||BOND":"Market Risk/Treasury","Checklist Product||NOS":"Internal Mandiri",
    "Exposure Product||CL":"Big Data (adjusted Country)","Exposure Product||NCL":"NTF -> Provided by DWB","Exposure Product||COM":"Data Utilisasi Credit Line","Exposure Product||TRS":"Data Utilisasi Credit Line","Exposure Product||BOND":"Market Risk/Treasury","Exposure Product||NOS":"Internal Mandiri","Exposure Product||TOTAL":"get",
    "Limit & Gap||Limit FIB / Formulasi":"internal","Limit & Gap||Limit FIB / Diputus":"internal","Limit & Gap||Country Limit / Country Limit":"Dataset Country","Limit & Gap||Country Limit / %Country Limit":"get","Limit & Gap||Gap Analysis / Needs":"get","Limit & Gap||Gap Analysis / Minus":"get","Limit & Gap||Gap Analysis / Add":"get","Limit & Gap||Final Limit / Final Limit":"calc","Limit & Gap||Final Limit / %Final Limit":"get"
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
    "Checklist Product||CL":"Checklist keberadaan exposure Cash Loan.",
    "Checklist Product||NCL":"Checklist keberadaan exposure Non Cash Loan.",
    "Checklist Product||COM":"Checklist keberadaan Commercial Line.",
    "Checklist Product||TRS":"Checklist keberadaan Treasury Line.",
    "Checklist Product||BOND":"Checklist keberadaan Bond.",
    "Checklist Product||NOS":"Checklist keberadaan Nostro.",
    "Exposure Product||CL":"Exposure Cash Loan berdasarkan source product.",
    "Exposure Product||NCL":"Exposure Non Cash Loan berdasarkan source product.",
    "Exposure Product||COM":"Exposure Commercial Line berdasarkan utilisasi.",
    "Exposure Product||TRS":"Exposure Treasury Line berdasarkan utilisasi.",
    "Exposure Product||BOND":"Exposure Bond.",
    "Exposure Product||NOS":"Exposure Nostro.",
    "Exposure Product||TOTAL":"Total exposure product hasil agregasi.",
    "Limit & Gap||Limit FIB / Formulasi":"Nilai Formulasi Limit FIB dari source internal.",
    "Limit & Gap||Limit FIB / Diputus":"Nilai Diputus Limit FIB dari source internal.",
    "Limit & Gap||Country Limit / Country Limit":"Country Limit berasal dari Dataset Country.",
    "Limit & Gap||Country Limit / %Country Limit":"Persentase Country Limit terhadap total.",
    "Limit & Gap||Gap Analysis / Needs":"Nilai Needs pada gap analysis.",
    "Limit & Gap||Gap Analysis / Minus":"Nilai Minus pada gap analysis.",
    "Limit & Gap||Gap Analysis / Add":"Nilai Add pada gap analysis.",
    "Limit & Gap||Final Limit / Final Limit":"Final Limit hasil kalkulasi.",
    "Limit & Gap||Final Limit / %Final Limit":"Persentase Final Limit terhadap total."
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
  LPG:{},
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
    "LPG|Identitas|Ecosystem LPG (Sektor)":"Sektor LPG yang menjadi objek monitoring portfolio.",
    "LPG|Identitas|Segmen LPG":"Segmen portfolio yang digunakan dalam pembentukan key monitoring."
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
function masterFieldValue(type,section,field,base,row,index){
  if(!row)return base;
  if(type==="Country"){
    const total=limasDemoData.Country.reduce((a,r)=>a+(Number(r.masterLimit)||0),0);
    const map={"No":index+1,"Negara":row.name,"Code":row.key,"Status":row.statusMaster,
      "Limit FIB / Formulasi":row.formulasi,"Limit FIB / Diputus":row.diputus,
      "Country Limit / Country Limit":row.masterLimit,
      "Country Limit / %Country Limit":total?row.masterLimit/total:0,
      "Gap Analysis / Needs":0,"Gap Analysis / Minus":0,"Gap Analysis / Add":0,
      "Final Limit / Final Limit":row.masterLimit,"Final Limit / %Final Limit":total?row.masterLimit/total:0};
    return Object.prototype.hasOwnProperty.call(map,field)?map[field]:base;
  }
  if(type==="CCL"){
    const map={"Nama bank":row.name,"CIF/Swift":row.key,"Negara":row.country,"Kategori Bank":row.category,
      "Country Rating":row.countryRating,"Bobot":row.bobot,"Rating":row.rating,"Posisi Rating":row.position,
      "Rating Index":row.ratingIndex,"Limit Inhouse (Rp Miliar)":row.inhouse,"Tier 1 Capital (Rp Miliar)":row.tier1,
      "Capacity":row.capacity,"Capacity Limit Adjusted":row.adjusted,"CCL":row.ccl,"Limit Contractual":row.contractual};
    return Object.prototype.hasOwnProperty.call(map,field)?map[field]:base;
  }
  if(type==="MLK"){
    const map={"Entitas":row.entity,"CIF":row.key,"Nama Debitur":row.name,"Group Usaha":row.group,"Group":row.group,
      "Tier":row.tier,"Master Limit Setting":row.masterLimit,"Master Limit":row.masterLimit,
      "CL Bade":productContributionMap("MLK",row.key).CASHLOAN||0,"NCL Bade":productContributionMap("MLK",row.key)["NON CASH LOAN"]||0,
      "Bade Treasury Line":productContributionMap("MLK",row.key)["CREDIT LINE|Treasury"]||0};
    return Object.prototype.hasOwnProperty.call(map,field)?map[field]:base;
  }
  if(type==="CIL"){
    const map={"No":index+1,"Perusahaan Asuransi":row.name,
      "Jenis Perusahaan (Asuransi/Penjaminan)":row.type,
      "Insurance Capacity (IC) (Rp Juta)":row.ic,
      "Multiplier Terpakai (%)":(row.multiplier*100).toFixed(2)+"%",
      "Consolidated Insurance Threshold (CIT) (Rp Juta)":row.cit,
      "EIL BMRI":row.entities?.BMRI?.eil||0,
      "EIL Mandiri Taspen":row.entities?.["Mandiri Taspen"]?.eil||0,
      "EIL MTF":row.entities?.MTF?.eil||0,
      "EIL MUF":row.entities?.MUF?.eil||0,
      "Consolidated Insurance Limit (CIL) (Rp Juta)":row.cil};
    return Object.prototype.hasOwnProperty.call(map,field)?map[field]:base;
  }
  if(type==="LPG"){
    const map={"No":index+1,"Ecosystem LPG (Sektor)":row.sector,"Segmen LPG":row.segment,
      "Bankwide / Limit":row.limit};
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
        <thead><tr><th>Product</th><th>Source Record</th><th>Exposure Field</th><th>Source Value</th><th>Applied Amount</th><th>Runtime Source</th><th>Mapping</th></tr></thead>
        <tbody>{apps.map((a,i)=>{
          const raw=a.sourceData?.[a.exposureField]??"—";
          const label=a.productId==="CREDIT LINE"?(a.scope?"Credit Line • "+a.scope:"Credit Line"):demoProductLabel(a.productId);
          return <tr key={a.recordId+"-"+i}>
            <td><b>{label}</b></td><td className="key">{a.recordId}</td><td>{a.exposureField}</td><td>{raw}</td><td>{Number(a.amount||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{a.sourceSystem}</td><td><Status v={a.masterMatch?"Normal":"Data Issue"}/><div className="muted-small">{a.masterMatch?"Target master found":"Target master not found"} • {a.transform}</div></td>
          </tr>;
        })}</tbody>
      </table></div>}
      <div className="field-help">Applied Amount adalah nilai yang masuk ke aggregation limit. Source Value menunjukkan nilai asli pada product database; bila ada konversi/normalisasi, transform ditampilkan agar lineage dapat ditelusuri.</div>
    </div>
  </section>;
}
function Detail({nav,type="Country",recordKey=""}){
  const safeType=domains[type]?type:"Country";
  const selectedRecord=getDemoRecord(safeType,recordKey);
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
    <Header title={`${safeType} • Master Limit Detail`} subtitle="Approved master limit dan parameter. Utilisasi product dikelola melalui integration layer."/>
    <div className="page">
      <section className="card">
        <div className="head">
          <div><h2>{selectedRecord?.name||selectedRecord?.sector||sampleName(safeType)}</h2><p>Unique Key: <span className="key">{selectedRecord?.key||sampleKey(safeType)}</span> <span className="chip blue" style={{marginLeft:6}}>v{recordMeta.version||1}</span></p></div>
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
          <div className="field-help">Master Limit Detail hanya menyimpan master limit/parameter. Product exposure, outstanding dan utilisasi tidak direplikasi di sini.</div>
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
  {id:"CASHLOAN",label:"Cash Loan",sheet:"CASHLOAN",key:"no_cus / no_rek / code",exposure:"total_bade",source:"master_dataproduk.xlsx • CASHLOAN",note:"Country mapping melalui Project Location / Country Code. Workbook juga mencatat kebutuhan konversi IDR."},
  {id:"NON CASH LOAN",label:"Non Cash Loan",sheet:"NON CASH LOAN",key:"CUSTID / Swift Code / Country Code",exposure:"EQVIDR / BALANCE",source:"master_dataproduk.xlsx • NON CASH LOAN",note:"Workbook mencatat modul EXCO dan EPLC serta country judgment berdasarkan counterparty."},
  {id:"CREDIT LINE",label:"Credit Line",sheet:"Credit Line (CommLine and TL)",key:"Swift Code Vlookup / Code",exposure:"Comm Line Utilisasi + Treasury Line Utilisasi",source:"master_dataproduk.xlsx • Credit Line (CommLine and TL)",note:"Commercial Line dan Treasury Line digabung dalam satu source sheet dan satu tab monitoring."},
  {id:"Investment Line",label:"Investment Line",sheet:"Investment Line",key:"Nama Bank + Entity + Swiftcode",exposure:"Amount Invesment Line",source:"master_dataproduk.xlsx • Investment Line",note:"Pooling untuk eksposur produk/fasilitas yang belum termapping; workbook memberi kebutuhan frekuensi Monthly pada sample."},
  {id:"BONDS",label:"Bonds",sheet:"BONDS",key:"Securities Name + Issuer Country",exposure:"Amount Eq. IDR Juta",source:"master_dataproduk.xlsx • BONDS",note:"Country limit hit pada issuer selain Indonesia; limit dapat kembali setelah Maturity Date."},
  {id:"NOSTRO",label:"Nostro",sheet:"NOSTRO",key:"SwfitCode / Bank Country",exposure:"Balance",source:"master_dataproduk.xlsx • NOSTRO",note:"Country berdasarkan trim Swift Code; balance masih kurs asli dan perlu konversi kurs tengah NTR."},
  {id:"Nominal Pertanggungan",label:"Nominal Pertanggungan",sheet:"CIL_MONITORING",key:"Perusahaan Asuransi + Entitas",exposure:"Nominal Pertanggungan 2025 / Proyeksi 2026",source:"master_reportMonitoringLimit.xlsx • CIL_MONITORING",note:"Digunakan untuk monitoring utilisasi CIL. Utilisasi membandingkan Nominal Pertanggungan terhadap CIL. Source berasal dari monitoring CIL, bukan workbook master_dataproduk."}
];

const productSchemaFields=Object.fromEntries(productMasterCatalog.map(p=>[p.id,[...new Set(
  p.id==='Nominal Pertanggungan'?(productTabFields[p.id]||[]):
  p.id==='CREDIT LINE'?[...(productFields["COMMERCIAL LINE (CRDT)"]||[]),...(productFields["TREASURY LINE (CRDT)"]||[])]:
  (productFields[p.id]||[])
)]]));

function makeProductRecord(productId,overrides={},applied=[],meta={}){
  const base={};
  (productSchemaFields[productId]||[]).forEach(f=>{base[f]='';});
  Object.assign(base,productSample[productId]||{},overrides);
  return {recordId:meta.recordId||productId+'-DEMO',productId,data:base,applied,sourceSystem:meta.sourceSystem||'Source system / feed belum ditetapkan',status:meta.status||'Normal'};
}

const productDatabase={
  'CASHLOAN':[
    makeProductRecord('CASHLOAN',{no_cus:'16000000010',nm_cus:'PURE SOURCE DAIRY FARM CO., LTD',no_rek:'6090100009393',jns_krd:'I-SYN-CNY',src:'KLN',total_limit:'273.52',total_bade:'273.52',project_location:'China',code:'CN'},[{limitType:'Country',key:'CN',amount:273.52,label:'Cash Loan'}],{recordId:'CL-COUNTRY-CN',sourceSystem:'Big Data (adjusted Country)'}),
    makeProductRecord('CASHLOAN',{no_cus:'4000264485',nm_cus:'DJARUM',no_rek:'BMRI-4000264485',jns_krd:'WORKING CAPITAL',src:'BMRI',total_limit:'587',total_bade:'500',project_location:'Indonesia',code:'ID'},[{limitType:'MLK',key:'4000264485',amount:500,label:'Cash Loan'}],{recordId:'CL-MLK-001',sourceSystem:'LIMAST'}),
    makeProductRecord('CASHLOAN',{no_cus:'1000145694',nm_cus:'ANEKA TAMBANG',no_rek:'BMRI-1000145694',jns_krd:'WORKING CAPITAL',src:'BMRI',total_limit:'0',total_bade:'0',project_location:'Indonesia',code:'ID'},[{limitType:'MLK',key:'1000145694',amount:0,label:'Cash Loan'}],{recordId:'CL-MLK-002',sourceSystem:'LIMAST'}),
    makeProductRecord('CASHLOAN',{no_cus:'16000486963',nm_cus:'TUNAS MOBILINDO PERKASA',no_rek:'BMRI-16000486963',jns_krd:'WORKING CAPITAL',src:'BMRI',total_limit:'12',total_bade:'10.93',project_location:'Indonesia',code:'ID'},[{limitType:'MLK',key:'16000486963',amount:10.93,label:'Cash Loan'}],{recordId:'CL-MLK-003',sourceSystem:'LIMAST'}),
    makeProductRecord('CASHLOAN',{no_cus:'20000474637',nm_cus:'TUNAS RIDEAN',no_rek:'BMRI-20000474637',jns_krd:'WORKING CAPITAL',src:'BMRI',total_limit:'150',total_bade:'134.73',project_location:'Indonesia',code:'ID'},[{limitType:'MLK',key:'20000474637',amount:134.73,label:'Cash Loan'}],{recordId:'CL-MLK-004',sourceSystem:'LIMAST'}),
    makeProductRecord('CASHLOAN',{no_cus:'LPG-001',nm_cus:'PT BATUBARA CORPORATE A',no_rek:'LPG-BC-001',jns_krd:'KREDIT',src:'DWH',total_limit:'65140',total_bade:'30000',project_location:'Indonesia',code:'ID'},[{limitType:'LPG',key:'BATUBARA|Corporate|Bankwide',amount:30000,label:'Cash Loan'}],{recordId:'CL-LPG-001',sourceSystem:'DWH'}),
    makeProductRecord('CASHLOAN',{no_cus:'LPG-002',nm_cus:'PT BATUBARA COMMERCIAL A',no_rek:'LPG-BC-002',jns_krd:'KREDIT',src:'DWH',total_limit:'35949',total_bade:'21000',project_location:'Indonesia',code:'ID'},[{limitType:'LPG',key:'BATUBARA|Commercial|Bankwide',amount:21000,label:'Cash Loan'}],{recordId:'CL-LPG-002',sourceSystem:'DWH'}),
    makeProductRecord('CASHLOAN',{no_cus:'LPG-003',nm_cus:'PT ENERGI CORPORATE A',no_rek:'LPG-EA-001',jns_krd:'KREDIT',src:'DWH',total_limit:'123949',total_bade:'57000',project_location:'Indonesia',code:'ID'},[{limitType:'LPG',key:'ENERGI & AIR|Corporate|Bankwide',amount:57000,label:'Cash Loan'}],{recordId:'CL-LPG-003',sourceSystem:'DWH'}),
    makeProductRecord('CASHLOAN',{no_cus:'LPG-004',nm_cus:'PT ENERGI COMMERCIAL A',no_rek:'LPG-EA-002',jns_krd:'KREDIT',src:'DWH',total_limit:'33854',total_bade:'14500',project_location:'Indonesia',code:'ID'},[{limitType:'LPG',key:'ENERGI & AIR|Commercial|Bankwide',amount:14500,label:'Cash Loan'}],{recordId:'CL-LPG-004',sourceSystem:'DWH'}),
    makeProductRecord('CASHLOAN',{no_cus:'LPG-005',nm_cus:'PT FARMASI CORPORATE A',no_rek:'LPG-FK-001',jns_krd:'KREDIT',src:'DWH',total_limit:'24600',total_bade:'10000',project_location:'Indonesia',code:'ID'},[{limitType:'LPG',key:'FARMASI & KESEHATAN|Corporate|Bankwide',amount:10000,label:'Cash Loan'}],{recordId:'CL-LPG-005',sourceSystem:'DWH'})
  ],
  'NON CASH LOAN':[
    makeProductRecord('NON CASH LOAN',{NO:'1',MODULE:'EXCO','Swift Code':'ANZB AU 3M',REPORTTYPE:'Export Collection Financing',TRXREF:'XC77126002607',CUSTID:'16000005630',CUSTNM:'PT. PABRIK KERTAS TJIWI KIMIA TBK',CPNM:'KENSINGTON INTERNATIONAL LIMITED','Country Code':'HK','Country Name':'Hong Kong',CCY:'USD',AMOUNT:'14978.87',BALANCE:'14978.87',EXCHANGERT:'17310',EQVIDR:'259284240',FINTYPE:'DISCOUNT/REDISCOUNT',TRXDATE:'07/04/2026',DUEDATE:'02/10/2026',SERVCODE:'77106',SERVNM:'Trade Operation Export',SOF:'T',INTRT:'6.97'},[{limitType:'CCL',key:'ANZBAU3M',amount:259.28424,label:'Non Cash Loan'},{limitType:'Country',key:'HK',amount:259.28424,label:'Non Cash Loan'}],{recordId:'NCL-CCL-001',sourceSystem:'Core Banking Limit System'}),
    makeProductRecord('NON CASH LOAN',{NO:'2',MODULE:'EPLC','Swift Code':'ANZB AU 3M',REPORTTYPE:'Bank Guarantee',TRXREF:'NCL-0002',CUSTID:'1000145694',CUSTNM:'ANEKA TAMBANG',CPNM:'ANZ Banking Group','Country Code':'AU','Country Name':'Australia',CCY:'USD',AMOUNT:'12.47',BALANCE:'12.47',EXCHANGERT:'17310',EQVIDR:'215810000',FINTYPE:'GUARANTEE'},[{limitType:'MLK',key:'1000145694',amount:215.81,label:'Non Cash Loan'}],{recordId:'NCL-MLK-002',sourceSystem:'LIMAST'}),
    makeProductRecord('NON CASH LOAN',{NO:'3',MODULE:'EPLC','Swift Code':'DBSASGSG',REPORTTYPE:'Bank Guarantee',TRXREF:'NCL-0003',CUSTID:'20000474637',CUSTNM:'TUNAS RIDEAN',CPNM:'DBS Bank','Country Code':'SG','Country Name':'Singapore',CCY:'USD',AMOUNT:'900',BALANCE:'900',EXCHANGERT:'17300',EQVIDR:'155700000',FINTYPE:'GUARANTEE'},[{limitType:'MLK',key:'20000474637',amount:15.57,label:'Non Cash Loan'}],{recordId:'NCL-MLK-003',sourceSystem:'LIMAST'}),
    makeProductRecord('NON CASH LOAN',{NO:'4',MODULE:'LPG',REPORTTYPE:'LPG Portfolio',TRXREF:'LPG-NCL-001',CUSTID:'LPG-NCL-001',CUSTNM:'PT BATUBARA CORPORATE NCL','Country Code':'ID','Country Name':'Indonesia',CCY:'IDR',AMOUNT:'7919',BALANCE:'7919',EQVIDR:'7919',FINTYPE:'Portfolio'},[{limitType:'LPG',key:'BATUBARA|Corporate|Bankwide',amount:7919,label:'Non Cash Loan'}],{recordId:'NCL-LPG-001',sourceSystem:'DWH'}),
    makeProductRecord('NON CASH LOAN',{NO:'5',MODULE:'LPG',REPORTTYPE:'LPG Portfolio',TRXREF:'LPG-NCL-002',CUSTID:'LPG-NCL-002',CUSTNM:'PT BATUBARA COMMERCIAL NCL','Country Code':'ID','Country Name':'Indonesia',CCY:'IDR',AMOUNT:'5856',BALANCE:'5856',EQVIDR:'5856',FINTYPE:'Portfolio'},[{limitType:'LPG',key:'BATUBARA|Commercial|Bankwide',amount:5856,label:'Non Cash Loan'}],{recordId:'NCL-LPG-002',sourceSystem:'DWH'}),
    makeProductRecord('NON CASH LOAN',{NO:'6',MODULE:'LPG',REPORTTYPE:'LPG Portfolio',TRXREF:'LPG-NCL-003',CUSTID:'LPG-NCL-003',CUSTNM:'PT ENERGI CORPORATE NCL','Country Code':'ID','Country Name':'Indonesia',CCY:'IDR',AMOUNT:'14744',BALANCE:'14744',EQVIDR:'14744',FINTYPE:'Portfolio'},[{limitType:'LPG',key:'ENERGI & AIR|Corporate|Bankwide',amount:14744,label:'Non Cash Loan'}],{recordId:'NCL-LPG-003',sourceSystem:'DWH'}),
    makeProductRecord('NON CASH LOAN',{NO:'7',MODULE:'LPG',REPORTTYPE:'LPG Portfolio',TRXREF:'LPG-NCL-004',CUSTID:'LPG-NCL-004',CUSTNM:'PT ENERGI COMMERCIAL NCL','Country Code':'ID','Country Name':'Indonesia',CCY:'IDR',AMOUNT:'3915',BALANCE:'3915',EQVIDR:'3915',FINTYPE:'Portfolio'},[{limitType:'LPG',key:'ENERGI & AIR|Commercial|Bankwide',amount:3915,label:'Non Cash Loan'}],{recordId:'NCL-LPG-004',sourceSystem:'DWH'}),
    makeProductRecord('NON CASH LOAN',{NO:'8',MODULE:'LPG',REPORTTYPE:'LPG Portfolio',TRXREF:'LPG-NCL-005',CUSTID:'LPG-NCL-005',CUSTNM:'PT FARMASI CORPORATE NCL','Country Code':'ID','Country Name':'Indonesia',CCY:'IDR',AMOUNT:'2000',BALANCE:'2000',EQVIDR:'2000',FINTYPE:'Portfolio'},[{limitType:'LPG',key:'FARMASI & KESEHATAN|Corporate|Bankwide',amount:2000,label:'Non Cash Loan'}],{recordId:'NCL-LPG-005',sourceSystem:'DWH'})
  ],
  'CREDIT LINE':[
    makeProductRecord('CREDIT LINE',{No:'1',Nama:'Australia and New Zealand Banking Group Limited','Swift Code':'ANZB AU 3M','Swift Code Vlookup':'ANZBAU3M',Code:'AU',Negara:'Australia',Bank:'Foreign',BMFIR:'AA',Fitch:'AA-','Moody\'s':'Aa2','S&P':'AA-','Treasury DN':'50000','Treasury DN Utilisasi':'1469.93','Treasury LN':'140000','Treasury LN Utilisasi':'0','Treasury Line Total':'190000','Treasury Line Total Utilisasi':'1469.93','Comm DN':'775000','Comm DN Utilisasi':'6618.77','Comm LN':'35000','Comm LN Utilisasi':'0','Comm Line Total':'810000','Comm Line Total Utilisasi':'6618.77','Corporate Card':'0','Credit Line Total':'1000000','Credit Line Total Utilisasi':'8088.69'},[{limitType:'Country',key:'AU',amount:6618.77,label:'Commercial Line',scope:'Commercial'},{limitType:'Country',key:'AU',amount:1469.93,label:'Treasury Line',scope:'Treasury'}],{recordId:'CRL-COUNTRY-AU-001',sourceSystem:'Data Utilisasi Credit Line'}),
    makeProductRecord('CREDIT LINE',{No:'2',Nama:'Australia Credit Line - Other','Swift Code':'ANZB AU OTHER','Swift Code Vlookup':'ANZBAU3M',Code:'AU',Negara:'Australia',Bank:'Foreign','Comm Line Total':'13120.38','Comm Line Total Utilisasi':'13120.38','Treasury Line Total':'0','Treasury Line Total Utilisasi':'0','Credit Line Total':'13120.38','Credit Line Total Utilisasi':'13120.38'},[{limitType:'Country',key:'AU',amount:13120.38,label:'Commercial Line',scope:'Commercial'}],{recordId:'CRL-COUNTRY-AU-002',sourceSystem:'Data Utilisasi Credit Line'}),
    makeProductRecord('CREDIT LINE',{No:'3',Nama:'ABN Amro Bank NV','Swift Code':'ABNANL2A','Swift Code Vlookup':'ANZBAU3M',Code:'NL',Negara:'Netherlands',Bank:'Foreign','Comm Line Total':'0','Comm Line Total Utilisasi':'0','Treasury Line Total':'0','Treasury Line Total Utilisasi':'0','Credit Line Total':'0','Credit Line Total Utilisasi':'0'},[],{recordId:'CRL-CCL-001',sourceSystem:'Core Banking Limit System'}),
    makeProductRecord('CREDIT LINE',{No:'4',Nama:'Abu Dhabi Commercial Bank PJSC','Swift Code':'ADCBADAD','Swift Code Vlookup':'ADCB',Code:'AE',Negara:'UAE',Bank:'Foreign','Comm Line Total':'0','Comm Line Total Utilisasi':'0','Treasury Line Total':'0','Treasury Line Total Utilisasi':'0','Credit Line Total':'0','Credit Line Total Utilisasi':'0'},[],{recordId:'CRL-CCL-002',sourceSystem:'Core Banking Limit System'}),
    makeProductRecord('CREDIT LINE',{No:'5',Nama:'Agricultural Bank of China Limited','Swift Code':'ABOCCNBJ','Swift Code Vlookup':'AGRICN',Code:'CN',Negara:'China',Bank:'Foreign','Comm Line Total':'0','Comm Line Total Utilisasi':'0','Treasury Line Total':'0','Treasury Line Total Utilisasi':'0','Credit Line Total':'0','Credit Line Total Utilisasi':'0'},[],{recordId:'CRL-CCL-003',sourceSystem:'Core Banking Limit System'}),
    makeProductRecord('CREDIT LINE',{No:'6',Nama:'DJARUM Treasury', 'Swift Code':'DJARUM-TL',Code:'ID',Negara:'Indonesia',Bank:'BMRI','Treasury Line':'1938','Bade Treasury Line':'1938','Treasury Line Total Utilisasi':'1938','Credit Line Total Utilisasi':'1938'},[{limitType:'MLK',key:'4000264485',amount:1938,label:'Treasury Line',scope:'Treasury'}],{recordId:'TL-MLK-001',sourceSystem:'LIMAST'}),
    makeProductRecord('CREDIT LINE',{No:'7',Nama:'ANEKA TAMBANG Treasury', 'Swift Code':'ANTAM-TL',Code:'ID',Negara:'Indonesia',Bank:'BMRI','Treasury Line':'4248','Bade Treasury Line':'4248','Treasury Line Total Utilisasi':'4248','Credit Line Total Utilisasi':'4248'},[{limitType:'MLK',key:'1000145694',amount:4248,label:'Treasury Line',scope:'Treasury'}],{recordId:'TL-MLK-002',sourceSystem:'LIMAST'}),
    makeProductRecord('CREDIT LINE',{No:'8',Nama:'TUNAS MOBILINDO Treasury', 'Swift Code':'TUNAS-TL',Code:'ID',Negara:'Indonesia',Bank:'BMRI','Treasury Line':'59','Bade Treasury Line':'59','Treasury Line Total Utilisasi':'59','Credit Line Total Utilisasi':'59'},[{limitType:'MLK',key:'16000486963',amount:59,label:'Treasury Line',scope:'Treasury'}],{recordId:'TL-MLK-003',sourceSystem:'LIMAST'}),
    makeProductRecord('CREDIT LINE',{No:'9',Nama:'TUNAS RIDEAN Treasury', 'Swift Code':'RIDEAN-TL',Code:'ID',Negara:'Indonesia',Bank:'BMRI','Treasury Line':'262','Bade Treasury Line':'262','Treasury Line Total Utilisasi':'262','Credit Line Total Utilisasi':'262'},[{limitType:'MLK',key:'20000474637',amount:262,label:'Treasury Line',scope:'Treasury'}],{recordId:'TL-MLK-004',sourceSystem:'LIMAST'})
  ],
  'Investment Line':Array.from({length:5},(_,i)=>makeProductRecord('Investment Line',{No:String(i+1),'Nama Bank':['ANZ','DBS','OCBC','MUFG','Mizuho'][i],'Nama Entity (Scope Entity : AKK)':'DPBM',Switftcode:['ANZxx','DBSxx','OCBCxx','MUFGxx','MHCBxx'][i],'Jenis Invesment Line':i<3?'Deposito':'Placement','Amount Invesment Line':['10000000000','5000000000','3500000000','2500000000','1800000000'][i]},[],{recordId:'INV-00'+(i+1),sourceSystem:'Investment source / Monthly'})),
  'BONDS':Array.from({length:5},(_,i)=>makeProductRecord('BONDS',{Date:'30-Apr-26',Branch:'Head Office','Securities Type':i===2?'Corporate Bond':'Fixed Rate','Securities Name':['FR0037','FR0080','OBL-ABC','FR0090','FR0100'][i],'Issuer Name':i===2?'Indo Corp':'Indo Gov','Issuer Country':'ID','Issuer Type':i===2?'Corporate':'Government',Portfolio:'Banking Book',CCY:'IDR',Amount:['585424000000','250000000000','100000000000','75000000000','50000000000'][i],'Amount Eq. IDR Juta':['585424','250000','100000','75000','50000'][i],'Maturity Date':['15-Sep-26','15-Jan-27','15-May-27','15-May-28','15-Jun-29'][i],Coupon:['12%','6.5%','7%','7.5%','7%'][i],'Potential P/L (Eq. IDR Juta)':'0'},[{limitType:'Country',key:'ID',amount:0,label:'Bonds',reason:'Issuer Country = ID; excluded from active Country exposure demo'}],{recordId:'BND-00'+(i+1),sourceSystem:'Market Risk/Treasury'})),
  'NOSTRO':Array.from({length:5},(_,i)=>makeProductRecord('NOSTRO',{Year:'Apr-26',Branch:'Head Office',SwfitCode:['XXXXAEJX','XXXXUSXX','XXXXSGXX','XXXXJPXX','XXXXGBXX'][i],'Bank Name':['FIRST ABU DABI BANK','BANK OF AMERICA','DBS BANK','MUFG BANK','BARCLAYS BANK'][i],'Bank Country':['AE','US','SG','JP','GB'][i],Balance:['26.64','0','0','0','0'][i]},[{limitType:'Country',key:['AE','US','SG','JP','GB'][i],amount:i===0?26.64:0,label:'Nostro'}],{recordId:'NOS-00'+(i+1),sourceSystem:'Internal Mandiri'})),
  'Nominal Pertanggungan':Array.from({length:16},(_,i)=>{
    const insurers=[['TUGU','PT Asuransi Tugu Pratama Indonesia Tbk','Asuransi Kredit',[['BMRI',60093270.28,11573402.55],['Mandiri Taspen',26999429.42,0],['MTF',10591613.12,285708.13],['MUF',10129963.92,21313]]],['PLN-INS','PT Asuransi Perisai Listrik Nasional','Asuransi',[['BMRI',6660665.24,1463320.54],['Mandiri Taspen',2992584.03,21417716.08],['MTF',1173961.56,0],['MUF',1122792.92,18378]]],['ASKRIDA','PT Asuransi Bangun Askrida','Asuransi',[['BMRI',12864690.67,2618582.14],['Mandiri Taspen',5780003.42,17299747.72],['MTF',2267439.03,0],['MUF',2168609.76,0]]],['AKRINDO','PT Asuransi Kredit Indonesia','Asuransi',[['BMRI',51624833.26,1058528.01],['Mandiri Taspen',23194627.88,4878825.62],['MTF',9099026.54,0],['MUF',8702433.67,0]]]];
    const g=insurers[Math.floor(i/4)],e=g[3][i%4];
    return makeProductRecord('Nominal Pertanggungan',{No:String(i+1),'Perusahaan Asuransi':g[1],'Jenis Prudk Asuransi':g[2],'Entitas':e[0],'EIL Entitas (Rp Juta)':String(e[1]),'Nominal Pertanggungan 2025 (Rp Juta)':String(e[2])},[{limitType:'CIL',key:g[0],entity:e[0],amount:e[2],label:'Nominal Pertanggungan'}],{recordId:'CIL-'+g[0]+'-'+e[0].replaceAll(' ','-'),sourceSystem:'CIL_MONITORING'});
  })
};

function productApplicationsFor(type,key){
  const out=[];
  const exposureField=(productId,scope)=>{
    if(productId==="CASHLOAN")return "total_bade";
    if(productId==="NON CASH LOAN")return "EQVIDR / BALANCE";
    if(productId==="CREDIT LINE")return scope==="Commercial"?"Comm Line Total Utilisasi":"Treasury Line Total Utilisasi";
    if(productId==="BONDS")return "Amount Eq. IDR Juta";
    if(productId==="NOSTRO")return "Balance";
    if(productId==="Nominal Pertanggungan")return "Nominal Pertanggungan 2025 (Rp Juta)";
    return getProductMeta(productId)?.exposure||"—";
  };
  const transform=(productId)=>productId==="NON CASH LOAN"?"EQVIDR dikonversi ke Rp Juta (/1.000.000)":"Direct / source unit";
  Object.values(productDatabase).forEach(rows=>rows.forEach(r=>(r.applied||[]).forEach(a=>{
    if(a.limitType===type&&String(a.key)===String(key))out.push({
      ...a,productId:r.productId,recordId:r.recordId,sourceSystem:r.sourceSystem,sourceData:r.data,
      exposureField:exposureField(r.productId,a.scope),transform:transform(r.productId),
      masterMatch:(limasDemoData[a.limitType]||[]).some(m=>String(m.key)===String(a.key))
    });
  })));
  return out;
}
function productContributionMap(type,key){
  const map={};
  productApplicationsFor(type,key).forEach(a=>{const k=a.productId==='CREDIT LINE'?'CREDIT LINE|'+(a.scope||'Common'):a.productId;map[k]=(map[k]||0)+(Number(a.amount)||0);});
  return map;
}
function productContributionDetail(type,key){return Object.entries(productContributionMap(type,key)).map(([product,amount])=>({product,amount})).filter(x=>x.amount!==0);}
const reportDummy=buildReportDummy(limasDemoData);


const creditLineGroups={
  "Commercial Line":productFields["COMMERCIAL LINE (CRDT)"]||[],
  "Treasury Line":productFields["TREASURY LINE (CRDT)"]||[]
};
const creditLineSamples={
  "Commercial Line":productSample["COMMERCIAL LINE (CRDT)"]||{},
  "Treasury Line":productSample["TREASURY LINE (CRDT)"]||{}
};
const creditLineFields=[...new Set(creditLineGroups["Commercial Line"])];
const creditLineTreasuryOnly=new Set(["Treasury DN","Treasury DN Utilisasi","Treasury LN","Treasury LN Utilisasi","Treasury Line Total","Treasury Line Total Utilisasi","TDN","TDN Utilisasi","TLN","TLN Utilisasi","Treasury Line","Total Utilisasi","CDN","CDN Utilisasi","CLN","CLN Utilisasi"]);
const creditLineCommercialOnly=new Set(["Comm DN","Comm DN Utilisasi","Comm LN","Comm LN Utilisasi","Comm Line Total","Comm Line Total Utilisasi"]);
const creditLineCommonOnly=new Set(["No","Nama","Swift Code","Swift Code Vlookup","Code","Aging Schedule RM","Negara","Bank","RM","Dept.","BMFIR","Fitch","Moody's","S&P","Corporate Card","Credit Line Total","Credit Line Total Utilisasi"]);


const productTabSource={
  "CASHLOAN":"CASHLOAN","NON CASH LOAN":"NON CASH LOAN","CREDIT LINE":"Credit Line (CommLine and TL)",
  "Investment Line":"Investment Line","BONDS":"BONDS","NOSTRO":"NOSTRO","Nominal Pertanggungan":"CIL_MONITORING"
};
const productTabFields={
  "CASHLOAN":productFields["CASHLOAN"]||[],
  "NON CASH LOAN":productFields["NON CASH LOAN"]||[],
  "Investment Line":productFields["Investment Line"]||[],
  "BONDS":productFields["BONDS"]||[],
  "NOSTRO":productFields["NOSTRO"]||[],
  "Nominal Pertanggungan":[
    "No","Perusahaan Asuransi","Jenis Prudk Asuransi","Entitas","EIL Entitas (Rp Juta)",
    "Nominal Pertanggungan 2025 (Rp Juta)","Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)",
    "Utilisasi EIL (%)","CIL (Rp Juta)","CIT (Rp Juta)","Utilisasi CIL (%)",
    "% Utilisasi (Nominal Pertanggungan/CIL)","% Utilisasi Proyeksi (Nominal Pertanggungan/CIL)",
    "Skor Akreditasi (PCP)","Klasifikasi EWS (PCP)","Status / Rekomendasi Action Plan"
  ]
};
const productFieldNotes={
  "CASHLOAN":{
    project_location:"Country mapping berdasarkan lokasi proyek.",
    code:"Country Code sebagai key mapping.",
    total_limit:"Total limit rekening/fasilitas.",
    total_bade:"Total outstanding/BADE yang digunakan sebagai exposure."
  },
  "NON CASH LOAN":{
    "Swift Code":"Identifier counterparty bank.",
    "CUSTID":"Identifier CIF/customer.",
    "CPNM":"Nama counterparty yang digunakan untuk country judgment.",
    "Country Code":"Country Code hasil mapping counterparty.",
    "EQVIDR":"Nilai ekuivalen IDR untuk exposure.",
    "BALANCE":"Saldo/transaksi outstanding yang menjadi referensi exposure."
  },
  "Investment Line":{
    "Jenis Invesment Line":"Jenis fasilitas investment line.",
    "Amount Invesment Line":"Nominal investment line.",
    "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa":"Catatan pooling untuk fasilitas yang belum termapping."
  },
  "BONDS":{
    "Issuer Country":"Negara issuer untuk country limit.",
    "Amount Eq. IDR Juta":"Exposure ekuivalen IDR.",
    "Maturity Date":"Tanggal maturity; workbook mencatat limit dapat kembali setelah maturity."
  },
  "NOSTRO":{
    "Bank Country":"Country hasil trim Swift Code.",
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
    "Utilisasi CIL (%)":"Utilisasi CIL pada monitoring terhadap CIT.",
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
  const note=productFieldNotes[tab]?.[field]||(
    tab==="CREDIT LINE"
      ? `${group} field dari source sheet Credit Line (CommLine and TL).`
      : `Field ${field} digunakan sebagai source data ${tab}.`
  );
  return {source:`master_dataproduk.xlsx • ${sheet}`,note};
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

function CreditLineFieldTable(){
  const fields=creditLineFields;
  const [editing,setEditing]=useState(false);
  const buildDraft=()=>Object.fromEntries(fields.map(f=>[f,loadProductFieldMeta("CREDIT LINE","Combined",f)]));
  const [draft,setDraft]=useState(buildDraft);
  React.useEffect(()=>{setEditing(false);setDraft(buildDraft())},[]);
  const update=(f,key,value)=>setDraft(m=>({...m,[f]:{...(m[f]||{}),[key]:value}}));
  const save=()=>{fields.forEach(f=>saveProductFieldMeta("CREDIT LINE","Combined",f,draft[f]||{}));setEditing(false)};
  const cancel=()=>{setDraft(buildDraft());setEditing(false)};
  const sample=(f,side)=>{
    const source=creditLineSamples["Commercial Line"]||{};
    const value=source[f];
    if(creditLineTreasuryOnly.has(f)) return side==="treasury" ? (value===0?0:(value||"—")) : "—";
    if(creditLineCommercialOnly.has(f)) return side==="commercial" ? (value===0?0:(value||"—")) : "—";
    if(creditLineCommonOnly.has(f)) return side==="commercial" ? (value===0?0:(value||"—")) : "—";
    if(side==="commercial") return value===0?0:(value||"—");
    return "—";
  };
  return <div className="product-field-block">
    <div className="product-field-toolbar">
      <div><b>Credit Line • Source Fields Lengkap</b><span>Satu tabel dari source sheet Credit Line (CommLine and TL). Field asli dipertahankan; value diklasifikasikan ke Common / Commercial / Treasury.</span></div>
      {!editing?<button className="btn primary" onClick={()=>setEditing(true)}>Edit Field Metadata</button>:<div className="toolbar"><button className="btn ghost" onClick={cancel}>Batal</button><button className="btn primary" onClick={save}>Simpan Perubahan</button></div>}
    </div>
    <div className="table-wrap product-field-wrap">
      <table className="table field-table product-credit-table">
        <thead><tr><th>Field</th><th>Commercial Line</th><th>Treasury Line</th><th>Source Data</th><th>Keterangan</th></tr></thead>
        <tbody>{fields.map(f=>{
          const m=draft[f]||{};
          return <tr key={f}>
            <td><b>{f}</b></td>
            <td>{sample(f,"commercial")}</td>
            <td>{sample(f,"treasury")}</td>
            <td>{editing?<input className="input compact field-input" value={m.source||""} onChange={e=>update(f,"source",e.target.value)}/>:<span className="source-text">{m.source||"—"}</span>}</td>
            <td>{editing?<textarea className="textarea compact-area" value={m.note||""} onChange={e=>update(f,"note",e.target.value)}/>:<span className="note-text">{m.note||"—"}</span>}</td>
          </tr>
        })}</tbody>
      </table>
    </div>
  </div>;
}

function ProductFieldTable({tab,group="",fields,sample}){
  const buildDraft=()=>Object.fromEntries(fields.map(f=>[f,loadProductFieldMeta(tab,group,f)]));
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(buildDraft);
  React.useEffect(()=>{setEditing(false);setDraft(buildDraft())},[tab,group,fields.join("|")]);
  const update=(f,key,value)=>setDraft(m=>({...m,[f]:{...(m[f]||{}),[key]:value}}));
  const save=()=>{fields.forEach(f=>saveProductFieldMeta(tab,group,f,draft[f]||{}));setEditing(false)};
  const cancel=()=>{setDraft(buildDraft());setEditing(false)};
  return <div className="product-field-block">
    <div className="product-field-toolbar">
      <div><b>Source Fields Lengkap</b><span>Field + Sample Value + Source Data + Keterangan</span></div>
      {!editing?<button className="btn primary" onClick={()=>setEditing(true)}>Edit Field Metadata</button>:<div className="toolbar"><button className="btn ghost" onClick={cancel}>Batal</button><button className="btn primary" onClick={save}>Simpan Perubahan</button></div>}
    </div>
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

function ProductCatalog(){
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(()=>Object.fromEntries(productMasterCatalog.map(item=>[item.id,loadProductCatalogMeta(item)])));
  const update=(id,key,value)=>setDraft(m=>({...m,[id]:{...(m[id]||{}),[key]:value}}));
  const save=()=>{productMasterCatalog.forEach(item=>saveProductCatalogMeta(item,draft[item.id]||{}));setEditing(false)};
  const cancel=()=>{setDraft(Object.fromEntries(productMasterCatalog.map(item=>[item.id,loadProductCatalogMeta(item)])));setEditing(false)};
  return <section className="card">
    <div className="head">
      <div><h2>Product Universe</h2><p>Registry universe produk/source untuk integration. Ini bukan repository Master Limit dan tidak menyimpan current utilization.</p></div>
      {!editing?<button className="btn primary" onClick={()=>setEditing(true)}>Edit Product Metadata</button>:<div className="toolbar"><button className="btn ghost" onClick={cancel}>Batal</button><button className="btn primary" onClick={save}>Simpan Perubahan</button></div>}
    </div>
    <div className="body">
      <div className="table-wrap product-master-wrap">
        <table className="table product-master-table">
          <thead><tr><th>Product</th><th>Source Sheet</th><th>Primary Key</th><th>Integrated to Domain</th><th>Utilization Field</th><th>Database Records</th><th>Source Data</th><th>Keterangan</th></tr></thead>
          <tbody>{productMasterCatalog.map(item=>{
            const m=draft[item.id]||{};
            return <tr key={item.id}>
              <td><b>{item.label}</b></td><td>{item.sheet}</td><td>{item.key}</td><td>{productIntegratedDomains(item.id).join(" / ")|| (item.id==="Investment Line"?"Future / Scoped":"—")}</td><td>{item.exposure}</td><td><span className="chip blue">{(productDatabase[item.id]||[]).length}</span></td>
              <td>{editing?<input className="input compact field-input" value={m.source||""} onChange={e=>update(item.id,"source",e.target.value)}/>:<span className="source-text">{m.source||"—"}</span>}</td>
              <td>{editing?<textarea className="textarea compact-area" value={m.note||""} onChange={e=>update(item.id,"note",e.target.value)}/>:<span className="note-text">{m.note||"—"}</span>}</td>
            </tr>
          })}</tbody>
        </table>
      </div>
      <div className="field-help">Product Universe menjadi registry source/integration. Nominal Pertanggungan untuk CIL berasal dari CIL_MONITORING; Investment Line masih Future / Scoped. Nilai utilization aktual tetap merupakan data inbound/integrated, bukan master limit.</div>
    </div>
  </section>;
}

function ProductDatabaseTable({view}){
  const rows=productDatabase[view]||[];
  const fields=productSchemaFields[view]||[];
  const mapped=rows.filter(r=>(r.applied||[]).length).length;
  return <section className="card product-database-card">
    <div className="head"><div><h2>Product Database</h2><p>{rows.length} source records • seluruh kolom source tersimpan • Applied Limit menunjukkan kontribusi ke monitoring.</p></div><div className="chip blue">{rows.length} records</div></div>
    <div className="body">
      <div className="product-db-kpis"><div className="mini"><b>Source Records</b><strong>{rows.length}</strong></div><div className="mini"><b>Mapped Records</b><strong>{mapped}</strong></div><div className="mini"><b>Unmapped Records</b><strong>{rows.length-mapped}</strong></div></div>
      <div className="table-wrap product-db-wrap"><table className="table product-db-table">
        <thead><tr><th>Record ID</th>{fields.map(f=><th key={f}>{f}</th>)}<th>Runtime Source</th><th>Applied Limit</th></tr></thead>
        <tbody>{rows.map(r=><tr key={r.recordId}>
          <td className="key">{r.recordId}</td>
          {fields.map(f=><td key={f}>{r.data[f]===0?0:(r.data[f]||"—")}</td>)}
          <td>{r.sourceSystem}</td>
          <td>{(r.applied||[]).length?(r.applied||[]).map((a,i)=><div className="db-apply-row" key={i}><b>{a.limitType}</b> → {a.key} • {Number(a.amount||0).toLocaleString("id-ID",{maximumFractionDigits:2})}{a.scope?" • "+a.scope:""}</div>):<span className="muted-small">Future / Not mapped</span>}</td>
        </tr>)}</tbody>
      </table></div>
      <div className="field-help">Applied Limit menunjukkan tepat ke Master Limit mana source record dipakai. Contribution ini yang di-aggregate menjadi exposure/outstanding pada Monitoring dan Generate Report.</div>
    </div>
  </section>;
}
function ProductUsage({view}){
  const domainsUsing=productIntegratedDomains(view);
  const rows=productDatabase[view]||[];
  const sourceDomainRows=domainsUsing.map(d=>[
    d,
    integrationTargets[d]?.[view]||"Target mapping belum dilengkapi",
    integrationRuntimeSource[d]?.[view]||"Runtime source belum dilengkapi",
    getProductMeta(view)?.exposure||"—",
    rows.filter(r=>(r.applied||[]).some(a=>a.limitType===d)).length
  ]);
  return <div className="product-mapping-grid">
    <div>
      <div className="section-title">Applied to Limit / Runtime Lineage</div>
      {sourceDomainRows.map(([d,target,source,exposure,count])=><div className="mini" key={d}>
        <b>{d}</b>
        <div className="muted-small">Target Key: {target}</div>
        <div className="muted-small">Runtime Source: {source}</div>
        <div className="muted-small">Utilization Field: {exposure}</div>
        <div className="muted-small">Mapped Records: {count}</div>
      </div>)}
      {!sourceDomainRows.length&&<div className="mini"><b>Future / Scoped</b><div className="muted-small">Belum menjadi runtime integration aktif.</div></div>}
    </div>
    <div>
      <div className="section-title">Data Quality</div>
      <div className="mini">Product Records <span className="chip blue">{rows.length}</span></div>
      <div className="mini" style={{marginTop:8}}>Unique Key <Status v="Normal"/></div>
      <div className="mini" style={{marginTop:8}}>Mapping <Status v={rows.filter(r=>(r.applied||[]).length).length===rows.length?"Normal":"Warning"}/></div>
      <div className="mini" style={{marginTop:8}}>Source Schema <span>{getProductMeta(view)?.sheet||"—"}</span></div>
    </div>
  </div>;
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
