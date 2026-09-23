
import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
const domains={"Country": {"sheet": "COUNTRY_MONITORING", "key": "Country Code", "name": "Negara", "products": ["CASHLOAN", "NON CASH LOAN", "COMMERCIAL LINE (CRDT)", "TREASURY LINE (CRDT)", "BONDS", "NOSTRO"], "sections": {"Identitas": [["No", "1", "Data/master/reference"], ["Negara", "United Arab Emirates", "Data/master/reference"], ["Code", "AE", "Data/master/reference"], ["Status", "Exist", "Data/master/reference"]], "Checklist Product": [["CL", "-", "Data/master/reference"], ["NCL", "-", "Data/master/reference"], ["COM", "-", "Data/master/reference"], ["TRS", "-", "Data/master/reference"], ["BOND", "-", "Data/master/reference"], ["NOS", "v", "Data/master/reference"]], "Exposure Product": [["CL", "-", "Data/master/reference"], ["NCL", "-", "Data/master/reference"], ["COM", "-", "Data/master/reference"], ["TRS", "-", "Data/master/reference"], ["BOND", "-", "Data/master/reference"], ["NOS", "v", "Data/master/reference"], ["TOTAL", "26.64", "Data/master/reference"]], "Limit & Gap": [["Limit FIB / Formulasi", "New", "Data/master/reference"], ["Limit FIB / Diputus", "New", "Data/master/reference"], ["Country Limit / Country Limit", "35,941", "Data/master/reference"], ["Country Limit / %Country Limit", "5.72%", "Data/master/reference"], ["Gap Analysis / Needs", "0", "Data/master/reference"], ["Gap Analysis / Minus", "0", "Data/master/reference"], ["Gap Analysis / Add", "0", "Data/master/reference"], ["Final Limit / Final Limit", "35,941", "Data/master/reference"], ["Final Limit / %Final Limit", "5.72%", "Data/master/reference"]]}}, "CCL": {"sheet": "CCL_MONITORING", "key": "Kode Bank / Swift Code", "name": "Nama bank", "products": ["CASHLOAN", "NON CASH LOAN", "COMMERCIAL LINE (CRDT)", "TREASURY LINE (CRDT)"], "sections": {"Bank Profile": [["Nama bank", "ABN Amro Bank NV", "Data/master/reference"], ["CIF/Swift", "-", "Data/master/reference"], ["Kategori Bank", "Asing", "Data/master/reference"], ["Negara", "Netherlands", "Data/master/reference"], ["Global Parent Bank", "—", "Data/master/reference"], ["Apakah Bank termasuk Top 200 Bank Besar Dunia berdasarkan total aset menurut Banker's Almanac", "—", "Data/master/reference"]], "Risk & Capacity": [["Country Rating", "AAA", "Data/master/reference"], ["Bobot", "0.55", "Data/master/reference"], ["Rating", "AA-", "Data/master/reference"], ["Posisi Rating", "31/12/2023", "Data/master/reference"], ["Rating Index", "90.23%", "Data/master/reference"], ["Limit Inhouse (Rp Miliar)", "68,498", "Data/master/reference"], ["Tier 1 Capital (Rp Miliar)", "403,594", "Data/master/reference"], ["Capacity", "200,290", "Data/master/reference"], ["Capacity Limit Adjusted", "68,498", "Data/master/reference"]], "Limit": [["CCL", "500", "Data/master/reference"], ["Utilisasi Capacity", "0.73%", "Data/master/reference"], ["Limit Contractual", "500", "Data/master/reference"]], "BMRI Exposure": [["Outstanding", "13", "Data/master/reference"], ["Jenis Limit", "Direct", "Data/master/reference"], ["Limit", "500", "Data/master/reference"], ["Total", "500", "Data/master/reference"], ["Bank Loan", "-", "Data/master/reference"], ["Commercial Line", "500", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Utilisasi CCL", "100%", "Data/master/reference"], ["Utilisasi Limit Kontraktual", "100%", "Data/master/reference"], ["Outstanding Maksimum", "13", "Data/master/reference"], ["Utilisasi Maksimum Limit Kontraktual", "2.53%", "Data/master/reference"]], "Perusahaan Anak": [["Limit", "500", "Data/master/reference"], ["Total", "500", "Data/master/reference"], ["Bank Loan", "-", "Data/master/reference"], ["Commercial Line", "500", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Utilisasi CCL", "100%", "Data/master/reference"], ["Utilisasi Limit Kontraktual", "100%", "Data/master/reference"], ["Utilisasi Maksimum Limit Kontraktual", "2.53%", "Data/master/reference"]]}}, "MLK": {"sheet": "MLK_Master", "key": "CIF", "name": "Nama Debitur", "products": ["CASHLOAN", "NON CASH LOAN", "TREASURY LINE (CRDT)"], "sections": {"Profil Debitur": [["Entitas", "BMRI", "Data/master/reference"], ["CIF", "4000264485", "Data/master/reference"], ["Nama Debitur", "DJARUM", "Data/master/reference"], ["Group Usaha", "DJARUM GROUP", "Data/master/reference"], ["Unit Kerja Pengelola", "CB6", "Data/master/reference"], ["Group", "DJARUM GROUP", "Data/master/reference"], ["BUMN/Swasta Flag", "Swasta", "Data/master/reference"], ["Tier", "B", "Data/master/reference"]], "Risk & Regulatory": [["BMPK Konsol", "67,204", "Data/master/reference"], ["Inhouse Limit Konsol", "60,484", "Data/master/reference"], ["BMPK/BMPP/BMPD Entitas", "55,993", "Data/master/reference"], ["Inhouse Limit Entitas", "50,394", "Data/master/reference"], ["Sektor DC", "INDUSTRI ROKOK", "Data/master/reference"], ["DC Sectoral", "3", "Data/master/reference"], ["Rating", "A+", "Data/master/reference"], ["Rating Multiplier", "2.67", "Data/master/reference"], ["Watchlist", "HIJAU", "Data/master/reference"], ["Discount Factor", "1", "Data/master/reference"]], "Financial & Capacity": [["EBITDA/Pengganti EBITDA", "1,938", "Data/master/reference"], ["Kredit Bank Lain", "12,010", "Data/master/reference"], ["Total Debt", "-", "Data/master/reference"], ["Borrowing Capacity", "15,523.38", "Data/master/reference"], ["Available BC", "(2,183.62)", "Data/master/reference"], ["Status Perhitungan", "-", "Data/master/reference"]], "Product Limit & Exposure": [["CL Bade", "500", "Data/master/reference"], ["CL Limit", "587", "Data/master/reference"], ["NCL Bade", "-", "Data/master/reference"], ["NCL Limit", "121", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Bade Treasury Line", "-", "Data/master/reference"], ["Total Limit Existing", "-", "Data/master/reference"], ["Total Bade Existing", "-", "Data/master/reference"]], "Master Limit": [["Master Limit Setting", "5,110", "Data/master/reference"], ["Master Limit", "5,818", "Data/master/reference"]]}}, "CIL": {"sheet": "CIL_Master", "key": "Insurance Company ID / Entity", "name": "Perusahaan Asuransi", "products": ["Nominal Pertanggungan"], "sections": {"Insurance Profile": [["No", "1", "Data/master/reference"], ["Perusahaan Asuransi", "PT Asuransi Tugu Pratama Indonesia Tbk", "Data/master/reference"], ["Jenis Perusahaan (Asuransi/Penjaminan)", "Asuransi", "Data/master/reference"], ["Jenis Produk Asuransi", "Asuransi Kredit", "Data/master/reference"]], "Capacity & Threshold": [["Insurance Capacity (IC) (Rp Juta)", "3,605,020,000", "Data/master/reference"], ["Multiplier Terpakai (%)", "3.00%", "Data/master/reference"], ["Consolidated Insurance Threshold (CIT) (Rp Juta)", "108,150,600", "Parameter monitoring"]], "BMRI": [["Nominal Pertanggungan BMRI 2025", "11,573,402.55", "Data/master/reference"], ["EIL BMRI", "60,093,270.28", "Data/master/reference"]], "Mandiri Taspen": [["Nominal Pertanggungan Mandiri Taspen 2025", "BUKAN REKANAN", "Data/master/reference"], ["EIL Mandiri Taspen", "26,999,429.42", "Data/master/reference"]], "MTF": [["Nominal Pertanggungan MTF 2025", "285,708.13", "Data/master/reference"], ["EIL MTF", "10,591,613.12", "Data/master/reference"]], "MUF": [["Nominal Pertanggungan MUF 2025", "21,313", "Data/master/reference"], ["EIL MUF", "10,129,963.92", "Data/master/reference"]], "Consolidated": [["Consolidated Insurance Limit (CIL) (Rp Juta)", "107,814,276.74", "Data/master/reference"], ["Total Nominal Pertanggungan All Entitas 2025 (Rp Juta)", "11,880,423.68", "Data/master/reference"], ["Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)", "13,060,790.52", "Data/master/reference"], ["Skor Akreditasi (PCP)", "79.38", "Data/master/reference"], ["Klasifikasi EWS (PCP)", "Monitoring", "Data/master/reference"]]}}, "LPG": {"sheet": "LPG_Loanportfolio", "key": "Sector + Segment + Region", "name": "Ecosystem LPG", "products": ["CASHLOAN", "NON CASH LOAN"], "sections": {"Identitas": [["No", "1", "Data/master/reference"], ["Ecosystem LPG (Sektor)", "BATUBARA", "Data/master/reference"], ["Segmen LPG", "Corporate", "Data/master/reference"]], "Bankwide": [["Bankwide / Limit", "65,140", "Data/master/reference"], ["Bankwide / Outstanding", "37,919", "Data/master/reference"], ["Bankwide / %Utilisasi", "58.20%", "Data/master/reference"]], "Region Monitoring": [["Region I / Limit", "—", "Data/master/reference"], ["Region I / Outstanding", "—", "Data/master/reference"], ["Region I / %Utilisasi", "—", "Data/master/reference"], ["Region II / Limit", "—", "Data/master/reference"], ["Region II / Outstanding", "—", "Data/master/reference"], ["Region II / %Utilisasi", "—", "Data/master/reference"], ["Region III / Limit", "—", "Data/master/reference"], ["Region III / Outstanding", "—", "Data/master/reference"], ["Region III / %Utilisasi", "—", "Data/master/reference"], ["Region IV / Limit", "—", "Data/master/reference"], ["Region IV / Outstanding", "—", "Data/master/reference"], ["Region IV / %Utilisasi", "—", "Data/master/reference"], ["Region V / Limit", "—", "Data/master/reference"], ["Region V / Outstanding", "—", "Data/master/reference"], ["Region V / %Utilisasi", "—", "Data/master/reference"], ["Region VI / Limit", "—", "Data/master/reference"], ["Region VI / Outstanding", "—", "Data/master/reference"], ["Region VI / %Utilisasi", "—", "Data/master/reference"], ["Region VII / Limit", "—", "Data/master/reference"], ["Region VII / Outstanding", "—", "Data/master/reference"], ["Region VII / %Utilisasi", "—", "Data/master/reference"], ["Region VIII / Limit", "—", "Data/master/reference"], ["Region VIII / Outstanding", "—", "Data/master/reference"], ["Region VIII / %Utilisasi", "—", "Data/master/reference"], ["Region IX / Limit", "—", "Data/master/reference"], ["Region IX / Outstanding", "—", "Data/master/reference"], ["Region IX / %Utilisasi", "—", "Data/master/reference"], ["Region X / Limit", "—", "Data/master/reference"], ["Region X / Outstanding", "—", "Data/master/reference"], ["Region X / %Utilisasi", "—", "Data/master/reference"], ["Region XI / Limit", "—", "Data/master/reference"], ["Region XI / Outstanding", "—", "Data/master/reference"], ["Region XI / %Utilisasi", "—", "Data/master/reference"], ["Region XII / Limit", "—", "Data/master/reference"], ["Region XII / Outstanding", "—", "Data/master/reference"], ["Region XII / %Utilisasi", "—", "Data/master/reference"]], "Validation": [["Status Crosscheck", "—", "Data/master/reference"], ["Data Quality", "—", "Data/master/reference"]]}}};
const productFields={"CASHLOAN": ["no_cus", "nm_cus", "kd_cab", "nm_cab", "no_rek", "gas_reporting", "buc_reporting", "jns_krd", "src", "j_guna", "revolv", "bilokj", "total_limit", "total_bade", "project_location", "code", "MatDate/Jatem", "MatDate/Jatem"], "NON CASH LOAN": ["NO", "MODULE", "Swift Code", "REPORTTYPE", "TRXREF", "RELREF", "CUSTID", "CUSTNM", "CPNM", "CPCNTY", "CPBK", "BKCNTRY", "Country Code", "Country Name", "Type of Judgment", "TRXTYPE", "CCY", "AMOUNT", "BALANCE", "EXCHANGERT", "EQVIDR", "FINTYPE", "TRXDATE", "DUEDATE", "SERVCODE", "SERVNM", "PCCD", "PCNM", "BUCD", "SOF", "INTRT"], "COMMERCIAL LINE (CRDT)": ["No", "Nama", "Swift Code", "Swift Code Vlookup", "Code", "Aging Schedule RM", "Negara", "Bank", "RM", "Dept.", "BMFIR", "Fitch", "Moody's", "S&P", "Treasury DN", "Treasury DN Utilisasi", "Treasury LN", "Treasury LN Utilisasi", "Treasury Line Total", "Treasury Line Total Utilisasi", "Comm DN", "Comm DN Utilisasi", "Comm LN", "Comm LN Utilisasi", "Comm Line Total", "Comm Line Total Utilisasi", "Corporate Card", "Credit Line Total", "Credit Line Total Utilisasi"], "Investment Line": ["No", "Nama Bank", "Nama Entity (Scope Entity : AKK)", "Switftcode", "Jenis Invesment Line", "Amount Invesment Line", "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa"], "BONDS": ["Date", "Branch", "Securities Type", "Securities Name", "Issuer Name", "Issuer Country", "Issuer Type", "Portfolio", "CCY", "Amount", "Amount Eq. IDR Juta", "Maturity Date", "Coupon", "Potential P/L (Eq. IDR Juta)"], "NOSTRO": ["Year", "Branch", "SwfitCode", "Bank Name", "Bank Country", "Balance"], "TREASURY LINE (CRDT)": ["No", "Nama", "Swift Code", "Swift Code Vlookup", "Code", "Aging Schedule RM", "Negara", "Bank", "RM", "Dept.", "BMFIR", "Fitch", "Moody's", "S&P", "TDN", "TDN Utilisasi", "TLN", "TLN Utilisasi", "Treasury Line", "Total Utilisasi", "CDN", "CDN Utilisasi", "CLN", "CLN Utilisasi", "Comm Line", "Comm Line Utilisasi", "Corporate Card", "Credit Line", "Credit Line Utilisasi", "Maturity"]};
const productSample={"CASHLOAN": {"no_cus": "16000000010", "nm_cus": "PURE SOURCE DAIRY FARM CO., LTD", "kd_cab": "60900", "nm_cab": "PT BANK MANDIRI SHANGHAI (CNY)", "no_rek": "6090100009393", "gas_reporting": "WHOLESALE CIB", "buc_reporting": "CB105", "jns_krd": "I-SYN-CNY", "src": "KLN", "j_guna": "KREDIT INVESTASI", "revolv": "N", "bilokj": "9999", "total_limit": "273.52", "total_bade": "273.52", "project_location": "China", "code": "CN", "MatDate/Jatem": ""}, "NON CASH LOAN": {"NO": "1", "MODULE": "EXCO", "Swift Code": "ANZB AU 3M", "REPORTTYPE": "Export Collection Financing", "TRXREF": "XC77126002607", "RELREF": "", "CUSTID": "16000005630", "CUSTNM": "PT. PABRIK KERTAS TJIWI KIMIA TBK", "CPNM": "KENSINGTON INTERNATIONAL LIMITED", "CPCNTY": "", "CPBK": "", "BKCNTRY": "", "Country Code": "HK", "Country Name": "Hong Kong", "Type of Judgment": "CPNM", "TRXTYPE": "D/A", "CCY": "USD", "AMOUNT": "14978.87", "BALANCE": "14978.87", "EXCHANGERT": "17310", "EQVIDR": "259284240", "FINTYPE": "DISCOUNT/REDISCOUNT", "TRXDATE": "07/04/2026", "DUEDATE": "02/10/2026", "SERVCODE": "77106", "SERVNM": "Trade Operation Export", "PCCD": "77106", "PCNM": "Trade Operation Export", "BUCD": "", "SOF": "T", "INTRT": "6.97"}, "COMMERCIAL LINE (CRDT)": {"No": "1", "Nama": "Australia and New Zealand Banking Group Limited", "Swift Code": "ANZB AU 3M", "Swift Code Vlookup": "ANZBAU3M", "Code": "AU", "Aging Schedule RM": "Raden Rizky Herfianda", "Negara": "Australia", "Bank": "Foreign", "RM": "2", "Dept.": "IFI", "BMFIR": "AA", "Fitch": "AA-", "Moody's": "Aa2", "S&P": "AA-", "Treasury DN": "50000", "Treasury DN Utilisasi": "1469.93", "Treasury LN": "140000", "Treasury LN Utilisasi": "0", "Treasury Line Total": "190000", "Treasury Line Total Utilisasi": "1469.93", "Comm DN": "775000", "Comm DN Utilisasi": "6618.77", "Comm LN": "35000", "Comm LN Utilisasi": "0", "Comm Line Total": "810000", "Comm Line Total Utilisasi": "6618.77", "Corporate Card": "0", "Credit Line Total": "1000000", "Credit Line Total Utilisasi": "8088.69"}, "Investment Line": {"No": "1", "Nama Bank": "ANZ", "Nama Entity (Scope Entity : AKK)": "DPBM", "Switftcode": "ANZxx", "Jenis Invesment Line": "Deposito", "Amount Invesment Line": "10000000000", "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa": ""}, "BONDS": {"Date": "30-Apr-26", "Branch": "Head Office", "Securities Type": "Fixed Rate", "Securities Name": "FR0037", "Issuer Name": "Indo Gov", "Issuer Country": "ID", "Issuer Type": "Government", "Portfolio": "Banking Book", "CCY": "IDR", "Amount": "585424000000", "Amount Eq. IDR Juta": "585424", "Maturity Date": "15-Sep-26", "Coupon": "12%", "Potential P/L (Eq. IDR Juta)": "0"}, "NOSTRO": {"Year": "Apr-26", "Branch": "Head Office", "SwfitCode": "XXXXAEJX", "Bank Name": "FIRST ABU DABI BANK", "Bank Country": "AE", "Balance": "26.64"}};
const mapTargets={"Country": {"CASHLOAN": "Country Code / Project Location", "NON CASH LOAN": "Country Code", "COMMERCIAL LINE (CRDT)": "Country Code / Bank Country", "TREASURY LINE (CRDT)": "Country Code / Bank Country", "BONDS": "Issuer Country", "NOSTRO": "Bank Country"}, "CCL": {"CASHLOAN": "Bank / Counterparty mapping", "NON CASH LOAN": "Swift Code / Counterparty", "COMMERCIAL LINE (CRDT)": "Swift Code", "TREASURY LINE (CRDT)": "Swift Code"}, "MLK": {"CASHLOAN": "CIF", "NON CASH LOAN": "CUSTID / CIF", "TREASURY LINE (CRDT)": "Debtor / CIF mapping"}, "CIL": {"Nominal Pertanggungan": "Insurance ID + Entity"}, "LPG": {"CASHLOAN": "CIF → Sector / Segment / Region", "NON CASH LOAN": "CUSTID/CIF → Sector / Segment / Region"}};
const sourceExposure={"CASHLOAN": "total_bade", "NON CASH LOAN": "EQVIDR / BALANCE", "COMMERCIAL LINE (CRDT)": "Line Utilisasi", "TREASURY LINE (CRDT)": "Treasury Line Utilisasi", "BONDS": "Amount Eq. IDR Juta", "NOSTRO": "Balance", "Nominal Pertanggungan": "Nominal Pertanggungan"};

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
  return {description:d.description||"",source:d.source||"",dataset:d.dataset||"",system:d.system||"",period:d.period||"",owner:d.owner||"",sourceNote:d.sourceNote||"",version:1,updatedBy:"Risk Management",lastUpdated:"Belum pernah disimpan"};
}
function saveMasterMeta(type,meta){try{window.localStorage.setItem(`limas_master_meta_v1_${type}`,JSON.stringify(meta));}catch(e){}}
function defaultProductProvenance(type){
  const info=domains[type];
  return Object.fromEntries(info.products.map(product=>[product,{product,dataset:sourceName(product),sourceKey:sourceKey(product),exposureField:sourceExposure[product]||"—",owner:provenanceDefaults[type]?.owner||"Risk Management"}]));
}
function loadProductMeta(type){
  const key=`limas_product_meta_v1_${type}`;
  try{const saved=window.localStorage.getItem(key);if(saved){const parsed=JSON.parse(saved);return Object.fromEntries(domains[type].products.map(product=>[product,{product,...(parsed[product]||{})}]));}}catch(e){}
  return defaultProductProvenance(type);
}
function saveProductMeta(type,meta){try{window.localStorage.setItem(`limas_product_meta_v1_${type}`,JSON.stringify(meta));}catch(e){}}
function nowLabel(){return new Intl.DateTimeFormat('id-ID',{dateStyle:'medium',timeStyle:'short'}).format(new Date());}
function Status({v}){return <span className={`badge ${v==='Breach'?'breach':v==='Warning'?'warning':'normal'}`}>{v}</span>}
function Layout({screen,onNav,children}){const nav=[['dashboard','⌂','Dashboard'],['setup','⚙','Master Limit Setup'],['detail','▤','Master Limit Detail'],['products','▦','Product Source & Mapping'],['warning','◉','Early Warning'],['Country','◎','Country Limit'],['CCL','◈','Counterparty / CCL'],['MLK','◌','Debtor / MLK'],['CIL','⬡','Insurance / CIL'],['LPG','◫','Portfolio / LPG']];return <div className="app shell"><aside className="side"><div className="brand"><div><b>LIMAS</b><small>Limit Management System</small></div></div><div className="nav">{nav.map(([id,ic,lb],i)=><React.Fragment key={id}>{i===1&&<div className="section">Master & Data</div>}{i===4&&<div className="section">Monitoring</div>}<button className={screen===id?'active':''} onClick={()=>onNav(id)}><span style={{width:16}}>{ic}</span>{lb}</button></React.Fragment>)}</div><div className="collapse">‹‹ &nbsp; Collapse</div></aside><main className="main">{children}</main></div>}
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
  return <Layout screen="dashboard" onNav={nav}><Header title="Halo, Risk Management" subtitle="Executive monitoring limit Bank Mandiri Group"/>
    <div className="page">
      <div className="hero">
        <h2>Limit Management Overview</h2><p>Master limit aktif, aggregated exposure dan status monitoring periode berjalan.</p>
        <div className="hero-grid">
          <div><div className="hero-label">Total Limit</div><div className="hero-value">Rp 125.45 T</div></div>
          <div><div className="hero-label">Exposure</div><div className="hero-value">Rp 87.32 T</div></div>
          <div><div className="hero-label">Utilisasi</div><div className="hero-value">69.6%</div></div>
        </div>
      </div>
      <div className="metric-grid">
        <DomainKpi label="Country Limit" value="73%" sub="245 monitored • 8 EWS • 2 Breach"/>
        <DomainKpi label="Counterparty CCL" value="61%" sub="128 banks • 7 EWS • 2 Breach"/>
        <DomainKpi label="Debtor MLK" value="82%" sub="1,245 CIF • 9 EWS • 3 Breach" accent="yellow"/>
        <DomainKpi label="Insurance CIL" value="55%" sub="32 insurers • 3 EWS • 1 Breach"/>
        <DomainKpi label="Portfolio LPG" value="78%" sub="96 combinations • 6 EWS • 1 Breach" accent="yellow"/>
      </div>
      <div className="dash-grid">
        <section className="card"><div className="head"><div><h2>Utilisasi per Domain</h2><p>Perbandingan limit vs exposure</p></div></div><div className="body"><div className="chart-bars">{[["Country",73],["CCL",61],["MLK",82],["CIL",55],["LPG",78]].map(([a,v])=><div className="barwrap" key={a}><div className="bar" style={{height:v*1.55}}></div><small>{a}<br/><b>{v}%</b></small></div>)}</div></div></section>
        <section className="card"><div className="head"><div><h2>Distribusi Status</h2><p>Normal / EWS / Breach</p></div></div><div className="body"><div className="pie"></div><div className="legend"><div><i className="dot" style={{background:"#1c73e8"}}/> Normal 81%</div><div><i className="dot" style={{background:"#f2c04d"}}/> Early Warning 14%</div><div><i className="dot" style={{background:"#e45757"}}/> Breach 5%</div></div></div></section>
      </div>
      <div className="dash-grid">
        <section className="card"><div className="head"><div><h2>Early Warning & Breach</h2><p>Exception lintas seluruh domain</p></div><button className="btn secondary" onClick={()=>nav("warning")}>Buka EWS Center</button></div><div className="body"><div className="alert-list">
          <div className="alert breach"><span className="bar"></span><div><b>MLK • MANDIRI GROUP SAMPLE</b><div style={{fontSize:10,color:"var(--muted)"}}>CIF 4000027711 • Utilisasi 107%</div></div><Status v="Breach"/></div>
          <div className="alert breach"><span className="bar"></span><div><b>CCL • National Australia Bank</b><div style={{fontSize:10,color:"var(--muted)"}}>Swift NATAAU33 • Utilisasi 106%</div></div><Status v="Breach"/></div>
          <div className="alert warning"><span className="bar"></span><div><b>Country • Singapore</b><div style={{fontSize:10,color:"var(--muted)"}}>Country Code SG • Utilisasi 85%</div></div><Status v="Warning"/></div>
          <div className="alert warning"><span className="bar"></span><div><b>CIL • Tugu Pratama BMRI</b><div style={{fontSize:10,color:"var(--muted)"}}>EIL utilization 97%</div></div><Status v="Warning"/></div>
        </div></div></section>
        <section className="card"><div className="head"><div><h2>Data Freshness</h2><p>Status pembaruan data source</p></div></div><div className="body">
          {[["Cash Loan","08 Aug 2026 22:00","Normal"],["NCL","08 Aug 2026 22:10","Normal"],["Commercial/Treasury","08 Aug 2026 21:45","Normal"],["Bonds","31 Jul 2026","Normal"],["Nostro","08 Aug 2026 21:30","Normal"],["PA / SISM","07 Aug 2026","Warning"]].map(r=><div className="mini" style={{marginBottom:8}} key={r[0]}><b>{r[0]}</b><div style={{fontSize:10,color:"var(--muted)",marginTop:3}}>{r[1]} <span style={{float:"right"}}><Status v={r[2]}/></span></div></div>)}
        </div></section>
      </div>
      <section className="card"><div className="head"><div><h2>Top Monitoring Exceptions</h2><p>Objek dengan utilisasi tertinggi</p></div></div><div className="body"><OverviewTable type="MLK" onDetail={(t,k)=>nav("detail",{type:t,key:k})}/></div></section>
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
  const cfg={
    Country:{title:"Country Limit Monitoring",subtitle:"Monitoring exposure per negara dengan product breakdown",total:"35,941",exp:"29,820",util:"82.9%",unit:"Rp Miliar", rows:[
      ["CN","China","2,000","1,420","71%","Normal","CL 550 • NCL 210 • COM 70 • TRS 100 • BOND 50 • NOS 30"],
      ["SG","Singapore","1,650","1,410","85%","Warning","CL 980 • NCL 210 • COM 80 • TRS 100 • BOND 20 • NOS 20"],
      ["AE","UAE","500","512","102%","Breach","CL 220 • NCL 80 • COM 110 • TRS 90 • BOND 0 • NOS 12"],
      ["AU","Australia","900","710","79%","Normal","CL 260 • NCL 120 • COM 70 • TRS 190 • BOND 50 • NOS 20"]
    ]},
    CCL:{title:"Counterparty / CCL Monitoring",subtitle:"Monitoring bank counterpart, CCL vs contractual limit, BMRI vs PA",total:"18,500",exp:"11,285",util:"61.0%",unit:"Rp Miliar", rows:[
      ["ANZBAU3M","ANZ Bank","500","810","355","71%","Normal"],
      ["CTBAAU2S","Commonwealth Bank","400","400","372","93%","Warning"],
      ["NATAAU33","National Australia Bank","300","300","318","106%","Breach"],
      ["FABAAE","First Abu Dhabi Bank","350","450","245","70%","Normal"]
    ]},
    MLK:{title:"Debtor / MLK Monitoring",subtitle:"Monitoring CIF dan Group Usaha dengan roll-up exposure",total:"76,420",exp:"62,840",util:"82.2%",unit:"Rp Miliar",rows:[
      ["4000264485","DJARUM","DJARUM GROUP","5,818","4,021","69%","Normal"],
      ["1000145694","ANEKA TAMBANG","ANTAM GROUP","13,280","11,580","87%","Warning"],
      ["4000027711","MANDIRI GROUP SAMPLE","MANDIRI GROUP","9,000","9,630","107%","Breach"],
      ["2000198372","SAMPLE DEBTOR","GROUP B","7,500","4,650","62%","Normal"]
    ]},
    CIL:{title:"Insurance / CIL Monitoring",subtitle:"Monitoring EIL, CIL, CIT dan nominal pertanggungan per entity",total:"107,814",exp:"84,520",util:"78.4%",unit:"Rp Juta",rows:[
      ["INS-001","Tugu Pratama","60,093","58,300","97%","Warning","BMRI 58,300 • MTF 10,129"],
      ["INS-002","Perisai Listrik Nasional","24,000","17,500","73%","Normal","BMRI 5,980 • PA 11,520"],
      ["INS-003","Insurance ABC","18,000","19,450","108%","Breach","BMRI 19,450"]
    ]},
    LPG:{title:"Portfolio / LPG Monitoring",subtitle:"Monitoring konsentrasi Sektor × Segmen × Wilayah",total:"315,000",exp:"246,300",util:"78.2%",unit:"Rp Miliar",rows:[
      ["BATUBARA","Corporate","Region I","65,140","37,919","58%","Normal"],
      ["BATUBARA","Commercial","Region I","35,949","30,350","84%","Warning"],
      ["NIKEL","Corporate","Region II","42,000","44,500","106%","Breach"],
      ["SAWIT","Corporate","Region III","50,000","33,600","67%","Normal"]
    ]}
  }[type];
  const [period,setPeriod]=useState("Agustus 2026");
  return <Layout screen={type} onNav={nav}><Header title={cfg.title} subtitle={cfg.subtitle}/><div className="page">
    <div className="metric-grid"><DomainKpi label="Total Limit" value={cfg.total} sub={cfg.unit}/><DomainKpi label="Total Exposure" value={cfg.exp} sub="Aggregated product"/><DomainKpi label="Utilisasi" value={cfg.util} sub="Current period" accent={parseFloat(cfg.util)>100?"red":parseFloat(cfg.util)>=80?"yellow":""}/><DomainKpi label="Early Warning" value={type==="MLK"?"9":type==="Country"?"8":"6"} sub="Objek perlu monitoring" accent="yellow"/><DomainKpi label="Breach" value={type==="MLK"?"3":type==="Country"?"2":"1"} sub="Objek melewati limit" accent="red"/></div>
    <section className="card"><div className="head"><div><h2>Monitoring Controls</h2><p>Threshold dan period dapat difilter tanpa mengubah master limit</p></div></div><div className="body"><div className="toolbar"><select className="select" value={period} onChange={e=>setPeriod(e.target.value)}><option>Agustus 2026</option><option>Juli 2026</option><option>Juni 2026</option></select><select className="select"><option>All Status</option><option>Normal</option><option>Warning</option><option>Breach</option></select><select className="select"><option>All Entity</option><option>BMRI</option><option>Perusahaan Anak</option></select><button className="btn secondary">Export Excel</button></div></div></section>
    <div className="dash-grid">
      <section className="card"><div className="head"><div><h2>Utilisasi Overview</h2><p>Limit vs exposure</p></div></div><div className="body"><div className="detail-summary"><div className="detail-box"><div className="small">Limit</div><div className="big">{cfg.total}</div></div><div className="detail-box"><div className="small">Exposure</div><div className="big">{cfg.exp}</div></div><div className="detail-box"><div className="small">Utilisasi</div><div className="big">{cfg.util}</div></div><div className="detail-box"><div className="small">Status</div><div className="big"><Status v={parseFloat(cfg.util)>=100?"Breach":parseFloat(cfg.util)>=80?"Warning":"Normal"}/></div></div></div><div style={{marginTop:14}}><div className="progress"><span style={{width:Math.min(parseFloat(cfg.util),100)+"%"}}/></div></div></div></section>
      <section className="card"><div className="head"><div><h2>Utilisasi Trend</h2><p>6 periode terakhir</p></div></div><div className="body"><div className="spark">{[48,55,58,66,72,79].map((v,i)=><span key={i} className={i>3?"active":""} style={{height:v*0.75}}/>)}</div></div></section>
    </div>
    <section className="card"><div className="head"><div><h2>{type==="Country"?"Country":type==="CCL"?"Counterparty":type==="MLK"?"Debtor / Group":type==="CIL"?"Insurance / Entity":"Sector / Segment / Region"} Detail</h2><p>Drill-down tersedia dari key ke product/exposure detail</p></div></div><div className="body"><div className="table-wrap"><table className="table"><thead>{type==="Country"?<tr><th>Country Code</th><th>Country</th><th>Limit</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Product Exposure</th><th>Detail</th></tr>:type==="CCL"?<tr><th>Swift</th><th>Bank</th><th>CCL</th><th>Contractual</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Detail</th></tr>:type==="MLK"?<tr><th>CIF</th><th>Debitur</th><th>Group</th><th>MLK</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Detail</th></tr>:type==="CIL"?<tr><th>Insurance</th><th>Nama</th><th>EIL/CIL</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Entity / Product</th><th>Detail</th></tr>:<tr><th>Sektor</th><th>Segmen</th><th>Region</th><th>Limit</th><th>Outstanding</th><th>Utilisasi</th><th>Status</th><th>Detail</th></tr>}</thead><tbody>
      {cfg.rows.map((r,i)=> type==="Country"?<tr key={i}><td><span className="key">{r[0]}</span></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><Status v={r[5]}/></td><td style={{fontSize:10}}>{r[6]}</td><td><button className="btn ghost" onClick={()=>nav("detail",{type,key:r[0]})}>Detail</button></td></tr>
      : type==="CCL"?<tr key={i}><td><span className="key">{r[0]}</span></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td><td><Status v={r[6]}/></td><td><button className="btn ghost" onClick={()=>nav("detail",{type,key:r[0]})}>Detail</button></td></tr>
      : type==="MLK"?<tr key={i}><td><span className="key">{r[0]}</span></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td><td><Status v={r[6]}/></td><td><button className="btn ghost" onClick={()=>nav("detail",{type,key:r[0]})}>Detail</button></td></tr>
      : type==="CIL"?<tr key={i}><td><span className="key">{r[0]}</span></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><Status v={r[5]}/></td><td>{r[6]}</td><td><button className="btn ghost" onClick={()=>nav("detail",{type,key:r[0]})}>Detail</button></td></tr>
      :<tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td><td><Status v={r[6]}/></td><td><button className="btn ghost" onClick={()=>nav("detail",{type,key:`${r[0]}|${r[1]}|${r[2]}`})}>Detail</button></td></tr>)}
      </tbody></table></div></div></section>
    <section className="card"><div className="head"><div><h2>Product Contribution</h2><p>Kontribusi exposure terhadap utilization {type}</p></div><button className="btn secondary" onClick={()=>nav("products")}>Buka Product Mapping</button></div><div className="body"><div className="heatmap">{(type==="Country"?["Cash Loan","NCL","Commercial","Treasury","Bond","Nostro"]:type==="CCL"?["Bank Loan","NCL","Commercial","Treasury"]:type==="MLK"?["Cash Loan","NCL","Treasury Line"]:type==="CIL"?["Nominal Pertanggungan"]:["Cash Loan","Non Cash Loan"]).map((p,i)=><div className={`heat ${i===2?"warn":i===3?"mid":"low"}`} key={p}><div>{p}</div><div style={{fontSize:18,marginTop:8}}>{[34,18,14,20,7,7][i]||52}%</div></div>)}</div></div></section>
  </div></Layout>
}

function Setup({nav,setSel}){const [type,setType]=useState('Country');const info=domains[type];return <Layout screen="setup" onNav={nav}><Header title="Master Limit Setup" subtitle="Setup data master lengkap per domain sesuai workbook"/><div className="page"><section className="card"><div className="head"><div><h2>{type} Master</h2><p>Unique key: <span className="key">{info.key}</span> • {info.name}</p></div><div className="toolbar"><button className="btn secondary">Download Template</button><button className="btn primary">Upload Excel</button></div></div><div className="body"><div className="tabs">{Object.keys(domains).map(d=><button className={`tab ${d===type?'active':''}`} key={d} onClick={()=>setType(d)}>{d}</button>)}</div><div className="toolbar" style={{marginBottom:14}}><input className="input" placeholder={`Cari ${info.key}`}/><select className="select"><option>Active</option><option>Inactive</option><option>All</option></select><button className="btn ghost">Filter</button></div><table className="table"><thead><tr><th>Unique Key</th><th>Objek</th><th>Section Master</th><th>Product</th><th>Source Sheet</th><th>Detail</th></tr></thead><tbody><tr><td className="key">{sampleKey(type)}</td><td>{sampleName(type)}</td><td>{Object.keys(info.sections).join(', ')}</td><td>{info.products.join(', ')}</td><td>{info.sheet}</td><td><button className="btn ghost" onClick={()=>{setSel(type);nav('detail')}}>Buka Detail</button></td></tr></tbody></table></div></section></div></Layout>}
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
  }
};
const defaultFieldSource=(type,section)=>{
  if(type==="MLK"||type==="CIL"||type==="LPG") return "Belum dicantumkan pada MD";
  const map={
    Country:{"Identitas":"MD Country","Checklist Product":"MD Country","Exposure Product":"MD Country","Limit & Gap":"MD Country"},
    CCL:{"Bank Profile":"MD CCL","Risk & Capacity":"MD CCL","Limit":"MD CCL","BMRI Exposure":"MD CCL","Perusahaan Anak":"MD CCL"}
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
  };
  return specific[`${type}|${section}|${field}`]||`Field ${field} digunakan sebagai ${section.toLowerCase()} untuk monitoring ${type}.`;
};
function loadFieldMeta(type){
  const key=`limas_field_meta_v5_${type}`;
  try{const saved=window.localStorage.getItem(key);if(saved)return JSON.parse(saved);}catch(e){}
  const out={};
  Object.entries(domains[type]?.sections||{}).forEach(([section,rows])=>{
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

function Detail({nav,type}){
  const info=domains[type];
  const [tab,setTab]=useState(Object.keys(info.sections)[0]);
  const [meta,setMeta]=useState(()=>loadMasterMeta(type));
  const [fieldMeta,setFieldMeta]=useState(()=>loadFieldMeta(type));
  const [editing,setEditing]=useState(false);
  const [savedAt,setSavedAt]=useState("");
  const updateField=(section,field,key,value)=>setFieldMeta(m=>({...m,[`${section}||${field}`]:{...(m[`${section}||${field}`]||{}),[key]:value}}));
  const startEdit=()=>{setMeta(loadMasterMeta(type));setFieldMeta(loadFieldMeta(type));setEditing(true);setSavedAt("");};
  const cancelEdit=()=>{setMeta(loadMasterMeta(type));setFieldMeta(loadFieldMeta(type));setEditing(false);setSavedAt("");};
  const saveChanges=()=>{
    saveFieldMeta(type,fieldMeta);
    const next={...meta,version:Number(meta.version||1)+1,lastUpdated:nowLabel(),updatedBy:"Risk Management"};
    saveMasterMeta(type,next);
    setMeta(next);
    setEditing(false);
    setSavedAt(next.lastUpdated);
  };
  return <Layout screen="detail" onNav={nav}>
    <Header title={`${type} • Master Limit Detail`} subtitle="Master, parameter, source reference, provenance dan traceability untuk objek monitoring"/>
    <div className="page">
      <section className="card">
        <div className="head">
          <div>
            <h2>{sampleName(type)}</h2>
            <p>Unique Key: <span className="key">{sampleKey(type)}</span> <span className="chip blue" style={{marginLeft:6}}>v{meta.version||1}</span></p>
          </div>
          <div className="toolbar">
            {!editing?<button className="btn primary" onClick={startEdit}>Edit Field Metadata</button>:<>
              <button className="btn ghost" onClick={cancelEdit}>Batal</button>
              <button className="btn primary" onClick={saveChanges}>Simpan Perubahan</button>
            </>}
            <button className="btn secondary" onClick={()=>nav('products')}>Product Source & Mapping</button>
          </div>
        </div>
        <div className="body">
          <div className="tabs">{Object.keys(info.sections).map(s=><button className={`tab ${tab===s?'active':''}`} key={s} onClick={()=>setTab(s)}>{s}</button>)}</div>
          <div className="field-table-wrap">
            <table className="table field-table">
              <thead><tr><th>Field</th><th>Sample Value</th><th>Source Data</th><th>Keterangan</th></tr></thead>
              <tbody>
                {info.sections[tab].map(([f,v])=>{
                  const fm=fieldMeta[`${tab}||${f}`]||{source:mdFieldSource[type]?.[`${tab}||${f}`]||defaultFieldSource(type,tab),note:defaultFieldNote(type,tab,f)};
                  return <tr key={f}>
                    <td><b>{f}</b></td>
                    <td>{v}</td>
                    <td>{editing?<input className="input compact field-input" value={fm.source||""} onChange={e=>updateField(tab,f,"source",e.target.value)}/>:<span className="source-text">{fm.source||"—"}</span>}</td>
                    <td>{editing?<textarea className="textarea compact-area" value={fm.note||""} onChange={e=>updateField(tab,f,"note",e.target.value)}/>:<span className="note-text">{fm.note||"—"}</span>}</td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
          <div className="field-help">{editing?"Mode edit: Source Data mengikuti referensi MD secara default dan dapat disesuaikan bila source berubah.":"Source Data ditarik dari kolom Source pada MD master; nilai get/calc ditandai sebagai hasil pengambilan atau kalkulasi."}</div>
        </div>
      </section>

      <section className="card">
        <div className="head">
          <div><h2>Product Scope & Mapping</h2><p>Source Data per product dikaitkan langsung dengan mapping dan exposure field yang membentuk monitoring.</p></div>
          <button className="btn secondary" onClick={()=>nav('products')}>Buka Product Mapping</button>
        </div>
        <div className="body">
          <div className="table-wrap">
            <table className="table provenance-table">
              <thead><tr><th>Product</th><th>Source Dataset</th><th>Source Key</th><th>Target Key</th><th>Exposure Field</th><th>Data Owner</th></tr></thead>
              <tbody>{info.products.map(p=><tr key={p}>
                <td><b>{p}</b></td><td>{sourceName(p)}</td><td>{sourceKey(p)}</td><td>{mapTargets[type]?.[p]||'—'}</td><td>{sourceExposure[p]||'—'}</td><td>{provenanceDefaults[type]?.owner||"Risk Management"}</td>
              </tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="head"><div><h2>Data Provenance</h2><p>Ringkasan provenance master; detail Source Data dan Keterangan tersedia per field di atas.</p></div>{savedAt&&<span className="chip blue">Tersimpan {savedAt}</span>}</div>
        <div className="body">
          <div className="provenance-grid">
            <div className="provenance-box"><span>Sumber Utama</span><b>{meta.source||"—"}</b><small>{meta.dataset||"Dataset / report belum diisi"}</small></div>
            <div className="provenance-box"><span>Source System</span><b>{meta.system||"—"}</b><small>Periode: {meta.period||"—"}</small></div>
            <div className="provenance-box"><span>Data Owner</span><b>{meta.owner||"—"}</b><small>Updated by: {meta.updatedBy||"—"}</small></div>
            <div className="provenance-box"><span>Last Updated</span><b>{meta.lastUpdated||"—"}</b><small>Version master: v{meta.version||1}</small></div>
          </div>
          <div className="source-note"><b>Konteks Source</b><div>{meta.sourceNote||"Belum ada catatan source."}</div></div>
        </div>
      </section>
    </div>
  </Layout>
}

function sourceName(p){return {'CASHLOAN':'CASHLOAN','NON CASH LOAN':'NON CASH LOAN','COMMERCIAL LINE (CRDT)':'COMMERCIAL LINE (CRDT)','TREASURY LINE (CRDT)':'TREASURY LINE (CRDT)','BONDS':'BONDS','NOSTRO':'NOSTRO','Nominal Pertanggungan':'CIL_Master'}[p]||p}
function sourceKey(p){return {'CASHLOAN':'CIF / Project Location / Country Code','NON CASH LOAN':'CUSTID / Country Code / Swift Code','COMMERCIAL LINE (CRDT)':'Swift Code / Bank Country','TREASURY LINE (CRDT)':'Swift Code / Bank Country','BONDS':'Issuer Country','NOSTRO':'SwiftCode / Bank Country','Nominal Pertanggungan':'Insurance ID + Entity'}[p]||'—'}
function Products({nav}){const [p,setP]=useState('CASHLOAN');const fields=productFields[p]||[];const sample=productSample[p]||{};return <Layout screen="products" onNav={nav}><Header title="Product Source & Mapping" subtitle="Seluruh source field dari workbook master_dataproduk dan mapping ke setiap limit"/><div className="page"><section className="card"><div className="head"><div><h2>{p}</h2><p>Field source lengkap • contoh data • target limit mapping</p></div></div><div className="body"><div className="tabs">{Object.keys(productFields).map(x=><button className={`tab ${x===p?'active':''}`} key={x} onClick={()=>setP(x)}>{x}</button>)}</div><div className="grid2"><div><div className="section-title">Source Fields Lengkap</div><div className="rowgrid">{fields.map(f=><React.Fragment key={f}><div>{f}</div><div>{sample[f]||'—'}</div><div style={{color:'var(--muted)'}}>Source column</div></React.Fragment>)}</div></div><div><div className="section-title">Dipakai oleh Limit</div>{Object.keys(domains).filter(d=>domains[d].products.includes(p)).map(d=><div className="mini" key={d} style={{marginBottom:8}}><b>{d}</b><div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>Target: {mapTargets[d]?.[p]||'—'} • Exposure: {sourceExposure[p]||'—'}</div></div>)}<div className="section-title">Data Quality</div><div className="mini">Unique Key <Status v="Normal"/></div><div className="mini" style={{marginTop:8}}>Mapping <Status v="Normal"/></div></div></div></div></section></div></Layout>}

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
  if(screen==="detail") return <Detail nav={nav} type={sel} key={sel+":"+selKey} />;
  if(screen==="products") return <Products nav={nav}/>;
  if(screen==="warning") return <Warning nav={nav}/>;
  if(["Country","CCL","MLK","CIL","LPG"].includes(screen)) return <Monitor type={screen} nav={nav}/>;
  return <Dashboard nav={nav}/>;
}
createRoot(document.getElementById('root')).render(<App/>);
