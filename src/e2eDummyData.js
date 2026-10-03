// Synthetic E2E dataset for LIMAS prototype.
// Current-layer demonstration only; proposed cross-domain taxonomy is intentionally NOT implemented here.
export const E2E_DUMMY_META={
  datasetId:"LIMAS-E2E-DUMMY-V1",
  period:"Oktober 2026 • E2E Dummy Snapshot",
  status:"SYNTHETIC / DEMO ONLY",
  description:"Master -> Product -> Mapping -> Normalization -> Aggregation -> Reconciliation -> EWS/Monitoring -> Report."
};
const rec=(productId,data,applied=[],meta={})=>({productId,data,applied,meta});
const apply=(limitType,key,amount,label,extra={})=>({limitType,key,amount,label,...extra});
const cl=(data,key,amount,limitType,meta={})=>rec("CASHLOAN",data,[apply(limitType,key,amount,"Cash Loan")],meta);
const ncl=(data,key,amount,limitType,meta={})=>rec("NON CASH LOAN",data,[apply(limitType,key,amount,"Non Cash Loan")],meta);
const credit=(data,applied=[],meta={})=>rec("CREDIT LINE",data,applied,meta);
const bond=(data,key,amount,meta={})=>rec("BONDS",data,[apply("Country",key,amount,"Bonds")],meta);
const nostro=(data,key,amount,meta={})=>rec("NOSTRO",data,[apply("Country",key,amount,"Nostro")],meta);

export const E2E_MASTER_DATA={
Country:[
{key:"ID",name:"Indonesia",statusMaster:"Exist",capacityLimit:120000,capacityDistribution:{domesticLimit:55000,overseasLimit:65000},productAllocations:{CASHLOAN:{domesticLimit:20000,overseasLimit:20000,total:40000},"NON CASH LOAN":{domesticLimit:10000,overseasLimit:15000,total:25000},"CREDIT LINE":{domesticLimit:15000,overseasLimit:5000,total:20000},BONDS:{domesticLimit:10000,overseasLimit:10000,total:20000},NOSTRO:{domesticLimit:5000,overseasLimit:10000,total:15000}}},
{key:"SG",name:"Singapore",statusMaster:"Exist",capacityLimit:80000,capacityDistribution:{domesticLimit:35000,overseasLimit:45000},productAllocations:{CASHLOAN:{domesticLimit:15000,overseasLimit:10000,total:25000},"NON CASH LOAN":{domesticLimit:5000,overseasLimit:10000,total:15000},"CREDIT LINE":{domesticLimit:15000,overseasLimit:0,total:15000},BONDS:{domesticLimit:5000,overseasLimit:10000,total:15000},NOSTRO:{domesticLimit:5000,overseasLimit:5000,total:10000}}},
{key:"CN",name:"China",statusMaster:"Exist",capacityLimit:100000,capacityDistribution:{domesticLimit:30000,overseasLimit:70000},productAllocations:{CASHLOAN:{domesticLimit:5000,overseasLimit:25000,total:30000},"NON CASH LOAN":{domesticLimit:2000,overseasLimit:18000,total:20000},"CREDIT LINE":{domesticLimit:20000,overseasLimit:0,total:20000},BONDS:{domesticLimit:14000,overseasLimit:6000,total:20000},NOSTRO:{domesticLimit:5000,overseasLimit:5000,total:10000}}},
{key:"AU",name:"Australia",statusMaster:"Exist",capacityLimit:90000,capacityDistribution:{domesticLimit:40000,overseasLimit:50000},productAllocations:{CASHLOAN:{domesticLimit:15000,overseasLimit:15000,total:30000},"NON CASH LOAN":{domesticLimit:10000,overseasLimit:10000,total:20000},"CREDIT LINE":{domesticLimit:12000,overseasLimit:3000,total:15000},BONDS:{domesticLimit:5000,overseasLimit:10000,total:15000},NOSTRO:{domesticLimit:5000,overseasLimit:5000,total:10000}}}
],
CCL:[
{key:"ANZBAU3M",name:"Australia and New Zealand Banking Group Limited",category:"Asing",country:"Australia",countryRating:"AA",bobot:.55,rating:"AA-",position:"30/09/2026",ratingIndex:.92,inhouse:80000,tier1:400000,capacity:220000,adjusted:80000,globalParent:"ANZ Group",top200:"Yes",ccl:50,contractual:48},
{key:"DBSSGSG",name:"DBS Bank Ltd",category:"Asing",country:"Singapore",countryRating:"AA",bobot:.55,rating:"AA-",position:"30/09/2026",ratingIndex:.91,inhouse:60000,tier1:300000,capacity:160000,adjusted:60000,globalParent:"DBS Group",top200:"Yes",ccl:30,contractual:28},
{key:"MUFGJPJT",name:"MUFG Bank Ltd",category:"Asing",country:"Japan",countryRating:"A+",bobot:.55,rating:"A",position:"30/09/2026",ratingIndex:.86,inhouse:90000,tier1:500000,capacity:250000,adjusted:90000,globalParent:"MUFG",top200:"Yes",ccl:80,contractual:75},
{key:"OCBCSGSG",name:"Oversea-Chinese Banking Corporation",category:"Asing",country:"Singapore",countryRating:"AA",bobot:.55,rating:"AA-",position:"30/09/2026",ratingIndex:.91,inhouse:50000,tier1:280000,capacity:140000,adjusted:50000,globalParent:"OCBC Group",top200:"Yes",ccl:20,contractual:18}
],
MLK:[
{key:"4000000001",name:"DJARUM",group:"DJARUM GROUP",groupUsahaHolding:"DJARUM GROUP",subGroup:"DJARUM GROUP",entity:"BMRI",unitKerja:"CB6",bumnSwasta:"Swasta",tier:"B",bmpkKonsol:60000,inhouseLimitKonsol:54000,bmpkEntitas:50000,inhouseLimitEntitas:45000,sektorDC:"INDUSTRI ROKOK",dcSectoral:3,rating:"A+",ratingMultiplier:2.5,watchlist:"HIJAU",discountFactor:1,ebitda:5000,kreditBankLain:12000,totalDebt:19000,borrowingCapacity:25000,availableBC:6000,statusPerhitungan:"OK",clBade:1800,clLimit:2800,nclBade:500,nclLimit:700,treasuryLine:500,badeTreasuryLine:500,masterLimitSetting:5000,masterLimit:5000},
{key:"1000000002",name:"ANEKA TAMBANG",group:"ANTAM GROUP",groupUsahaHolding:"ANTAM GROUP",subGroup:"ANTAM GROUP",entity:"BMRI",unitKerja:"CB5",bumnSwasta:"BUMN",tier:"A",bmpkKonsol:70000,inhouseLimitKonsol:63000,bmpkEntitas:55000,inhouseLimitEntitas:49500,sektorDC:"PERTAMBANGAN",dcSectoral:2,rating:"A",ratingMultiplier:2,watchlist:"HIJAU",discountFactor:1,ebitda:6200,kreditBankLain:15000,totalDebt:22000,borrowingCapacity:30000,availableBC:8000,statusPerhitungan:"OK",clBade:4000,clLimit:4500,nclBade:800,nclLimit:1500,treasuryLine:500,badeTreasuryLine:700,masterLimitSetting:8000,masterLimit:8000},
{key:"1600000003",name:"TUNAS MOBILINDO PERKASA",group:"ASTRA GROUP",groupUsahaHolding:"ASTRA GROUP",subGroup:"ASTRA GROUP",entity:"BMRI",unitKerja:"CB4",bumnSwasta:"Swasta",tier:"A",bmpkKonsol:90000,inhouseLimitKonsol:81000,bmpkEntitas:70000,inhouseLimitEntitas:63000,sektorDC:"OTOMOTIF",dcSectoral:2,rating:"A",ratingMultiplier:2.2,watchlist:"KUNING",discountFactor:.95,ebitda:8000,kreditBankLain:18000,totalDebt:30000,borrowingCapacity:35000,availableBC:5000,statusPerhitungan:"OK",clBade:8500,clLimit:9000,nclBade:1000,nclLimit:1200,treasuryLine:800,badeTreasuryLine:2500,masterLimitSetting:10000,masterLimit:10000},
{key:"2000000004",name:"TUNAS RIDEAN",group:"ASTRA GROUP",groupUsahaHolding:"ASTRA GROUP",subGroup:"ASTRA GROUP",entity:"BMRI",unitKerja:"CB4",bumnSwasta:"Swasta",tier:"A",bmpkKonsol:50000,inhouseLimitKonsol:45000,bmpkEntitas:40000,inhouseLimitEntitas:36000,sektorDC:"OTOMOTIF",dcSectoral:2,rating:"A-",ratingMultiplier:2,watchlist:"HIJAU",discountFactor:1,ebitda:3500,kreditBankLain:8000,totalDebt:12000,borrowingCapacity:16000,availableBC:4000,statusPerhitungan:"OK",clBade:700,clLimit:1500,nclBade:150,nclLimit:400,treasuryLine:300,badeTreasuryLine:150,masterLimitSetting:4000,masterLimit:4000}
],
CIL:[
{key:"TUGU",name:"PT Asuransi Tugu Pratama Indonesia Tbk",type:"Asuransi",ic:2000000,multiplier:.04,cit:80000,cil:60000,eils:{BMRI:35000,"Mandiri Taspen":12000,MTF:8000,MUF:5000},score:82,action:"Monitoring as usual"},
{key:"PLN-INS",name:"PT Asuransi Perisai Listrik Nasional",type:"Asuransi",ic:1000000,multiplier:.03,cit:30000,cil:30000,eils:{BMRI:15000,"Mandiri Taspen":7000,MTF:5000,MUF:3000},score:61,action:"Review allocation"},
{key:"ASKRIDA",name:"PT Asuransi Bangun Askrida",type:"Asuransi",ic:1200000,multiplier:.02,cit:24000,cil:24000,eils:{BMRI:12000,"Mandiri Taspen":5500,MTF:4000,MUF:2500},score:74,action:"Monitoring as usual"}
],
LPG:[
{key:"BATUBARA|Corporate",sector:"BATUBARA",segment:"Corporate",limits:{Bankwide:50000,"Region I":0,"Region II":0,"Region III":0,"Region IV":0,"Region V":0,"Region VI":0,"Region VII":0,"Region VIII":0,"Region IX":0,"Region X":0,"Region XI":0,"Region XII":0,"KP + OVS":50000}},
{key:"BATUBARA|Commercial",sector:"BATUBARA",segment:"Commercial",limits:{Bankwide:30000,"Region I":2500,"Region II":2500,"Region III":2500,"Region IV":2500,"Region V":2500,"Region VI":2500,"Region VII":2500,"Region VIII":2500,"Region IX":2500,"Region X":2500,"Region XI":0,"Region XII":0,"KP + OVS":5000}},
{key:"ENERGI & AIR|Corporate",sector:"ENERGI & AIR",segment:"Corporate",limits:{Bankwide:40000}}
]
};

const p={CASHLOAN:[], "NON CASH LOAN":[], "CREDIT LINE":[], "Investment Line":[], BONDS:[], NOSTRO:[], "Nominal Pertanggungan":[]};

// Country CL / NCL
const countryRows=[
["ID","CL1",15000,"Menara Mandiri Jakarta","Domestic"],["SG","CL2",14000,"Menara Mandiri Jakarta","Domestic"],["CN","CL3",27000,"Bank Mandiri Shanghai","Overseas"],["AU","CL4",7000,"Bank Mandiri (Europe) Limited London","Overseas"]
];
countryRows.forEach(([country,id,amount,office,type],i)=>p.CASHLOAN.push(cl({no_cus:id,nm_cus:"Country Dummy "+country,no_rek:"ACC-"+id,total_limit:String(amount*1.2),total_bade:String(amount),project_location:country,code:country},""+country,amount,"Country",{recordId:"CL-COUNTRY-"+country,sourceSystem:"Big Data (adjusted Country)",bookingOffice:office,bookingOfficeType:type,countryExposure:country})));
const nclCountry=[
["ID",8000000000,"Menara Mandiri Jakarta","Domestic"],["SG",4000000000,"Menara Mandiri Jakarta","Domestic"],["CN",16000000000,"Bank Mandiri Shanghai","Overseas"],["AU",8000000000,"Menara Mandiri Jakarta","Domestic"]
];
nclCountry.forEach(([country,eqvidr,office,type],i)=>p["NON CASH LOAN"].push(ncl({NO:String(i+1),MODULE:"EPLC",TRXREF:"NCL-C-"+country,CUSTID:"NCL-"+country,CUSTNM:"Country NCL "+country,CPNM:"Dummy Counterparty","Country Code":country,"Country Name":country,CCY:"USD",AMOUNT:String(eqvidr*.6),BALANCE:"0",EQVIDR:String(eqvidr),FINTYPE:"GUARANTEE",TRXTYPE:"BG"} ,country,eqvidr,"Country",{recordId:"NCL-COUNTRY-"+country,sourceSystem:"NTF -> Provided by DWB",bookingOffice:office,bookingOfficeType:type,countryExposure:country})));

// CCL direct exposures: CL + NCL + Credit Line.
const cclRows=[
["ANZBAU3M","ANZ","AU",12000,18000000000,15000],["DBSSGSG","DBS","SG",10000,6000000000,16000],["MUFGJPJT","MUFG","JP",4000,2000000000,10000],["OCBCSGSG","OCBC","SG",1000,1000000000,5000]
];
cclRows.forEach(([swift,short,country,clAmt,nclEq,creditAmt],i)=>{
  p.CASHLOAN.push(cl({no_cus:"CCL-"+swift,nm_cus:short+" Bank Loan",no_rek:"CCL-CL-"+swift,total_limit:String(clAmt*1.15),total_bade:String(clAmt),project_location:country,code:country},swift,clAmt,"CCL",{recordId:"CL-CCL-"+short,sourceSystem:"Core Banking Limit System",countryExposure:country}));
  p["NON CASH LOAN"].push(ncl({NO:String(20+i),MODULE:"EPLC",TRXREF:"NCL-CCL-"+swift,CUSTID:"NCL-CCL-"+short,CUSTNM:short+" Commercial Facility",CPNM:short+" Bank","Country Code":country,"Country Name":country,CCY:"USD",AMOUNT:String(nclEq*.7),BALANCE:"0",EQVIDR:String(nclEq),FINTYPE:"GUARANTEE",TRXTYPE:"BG"} ,swift,nclEq,"CCL",{recordId:"NCL-CCL-"+short,sourceSystem:"Core Banking Limit System",countryExposure:country}));
  const comm=Math.round(creditAmt*.75),treasury=creditAmt-comm;
  p["CREDIT LINE"].push(credit({No:String(1+i),Nama:short+" Bank Ltd","Swift Code":swift,"Swift Code Vlookup":swift,Code:country,Negara:country,Bank:"Foreign","Comm DN":String(comm*.7),"Comm DN Utilisasi":String(comm),"Comm LN":String(comm*.3),"Comm LN Utilisasi":"0","Comm Line Total":String(comm),"Comm Line Total Utilisasi":String(comm),"Treasury DN":String(treasury),"Treasury DN Utilisasi":String(treasury),"Treasury LN":"0","Treasury LN Utilisasi":"0","Treasury Line Total":String(treasury),"Treasury Line Total Utilisasi":String(treasury),"Credit Line Total":String(creditAmt),"Credit Line Total Utilisasi":String(creditAmt)},[apply("CCL",swift,creditAmt,"Credit Line")],{recordId:"CRL-CCL-"+short,sourceSystem:"Core Banking Limit System",countryExposure:country}));
});

// Country Credit Line view; split reflects source-native Commercial/Treasury semantics.
const countryCredit=[
["ID",12000,8000,4000],["SG",15000,15000,0],["CN",19500,19500,0],["AU",10000,5000,5000]
];
countryCredit.forEach(([country,total,commUtil,treasuryUtil])=>p["CREDIT LINE"].push(credit({No:"C-"+country, Nama:"Country "+country+" Credit Line",Code:country,Negara:country,"Comm DN":String(commUtil),"Comm DN Utilisasi":String(commUtil),"Comm LN":"0","Comm LN Utilisasi":"0","Comm Line Total":String(commUtil),"Comm Line Total Utilisasi":String(commUtil),"Treasury DN":String(treasuryUtil),"Treasury DN Utilisasi":String(treasuryUtil),"Treasury LN":"0","Treasury LN Utilisasi":"0","Treasury Line Total":String(treasuryUtil),"Treasury Line Total Utilisasi":String(treasuryUtil),"Credit Line Total":String(total),"Credit Line Total Utilisasi":String(total)},[apply("Country",country,commUtil,"Credit Line",{scope:"Commercial"}),apply("Country",country,treasuryUtil,"Credit Line",{scope:"Treasury"})],{recordId:"CRL-COUNTRY-"+country,sourceSystem:"Data Utilisasi Credit Line",countryExposure:country})));

// MLK CL + NCL + Treasury exposure rows.
const mlkRows=[
["4000000001","DJARUM",1800,500,500],["1000000002","ANEKA TAMBANG",4000,800,700],["1600000003","TUNAS MOBILINDO PERKASA",8500,1000,2500],["2000000004","TUNAS RIDEAN",700,150,150]
];
mlkRows.forEach(([cif,name,clAmt,nclAmt,tlAmt],i)=>{
  const m=E2E_MASTER_DATA.MLK[i];
  p.CASHLOAN.push(cl({no_cus:cif,nm_cus:name,no_rek:"MLK-CL-"+cif,total_limit:String(m.clLimit),total_bade:String(clAmt),project_location:"Indonesia",code:"ID"},cif,clAmt,"MLK",{recordId:"CL-MLK-"+name.replaceAll(" ","-"),sourceSystem:"LIMAST",countryExposure:"ID"}));
  p["NON CASH LOAN"].push(ncl({NO:String(50+i),MODULE:"EPLC",TRXREF:"NCL-MLK-"+cif,CUSTID:cif,CUSTNM:name,CPNM:"Dummy Counterparty","Country Code":"ID","Country Name":"Indonesia",CCY:"USD",AMOUNT:String(nclAmt*1000000),BALANCE:"0",EQVIDR:String(nclAmt*1000000),FINTYPE:"GUARANTEE",TRXTYPE:"BG"},cif,nclAmt*1000000,"MLK",{recordId:"NCL-MLK-"+name.replaceAll(" ","-"),sourceSystem:"LIMAST",countryExposure:"ID"}));
  p["CREDIT LINE"].push(credit({No:String(70+i),Nama:name+" Treasury","Swift Code":"TL-"+cif,Code:"ID",Negara:"Indonesia","Treasury Line":String(m.treasuryLine),"Bade Treasury Line":String(tlAmt),"Treasury Line Total Utilisasi":String(tlAmt),"Credit Line Total Utilisasi":String(tlAmt)},[apply("MLK",cif,tlAmt,"Bade Treasury Line",{scope:"Treasury"})],{recordId:"TL-MLK-"+name.replaceAll(" ","-"),sourceSystem:"LIMAST"}));
});

// Investment Line is source-only / scoped.
[["ANZ","Deposito","10000000000"],["DBS","Placement","5000000000"],["OCBC","Deposito","3500000000"]].forEach(([bank,type,amount],i)=>p["Investment Line"].push(rec("Investment Line",{No:String(i+1),"Nama Bank":bank,"Nama Entity (Scope Entity : AKK)":"DPBM","Switftcode":bank+"xx","Jenis Invesment Line":type,"Amount Invesment Line":amount},[],{recordId:"INV-"+(i+1),sourceSystem:"Investment source / Monthly"})));

// Bonds / Nostro.
[["ID","FR0090","40000","Menara Mandiri Jakarta","Domestic"],["SG","SG-GB-01","9000","Bank Mandiri Singapore","Overseas"],["CN","CN-CORP-01","20500","Bank Mandiri Shanghai","Overseas"],["AU","AU-GB-01","4000","Bank Mandiri (Europe) Limited London","Overseas"]].forEach(([country,sec,eq,branch,type])=>p.BONDS.push(bond({Date:"30-Sep-26",Branch:branch,"Securities Type":"Fixed Rate","Securities Name":sec,"Issuer Name":country+" Dummy Issuer","Issuer Country":country,"Issuer Type":"Government",Portfolio:"Banking Book",CCY:"IDR",Amount:String(Number(eq)*1000000),"Amount Eq. IDR Juta":eq,"Maturity Date":"15-Sep-2030",Coupon:"5.00%"},country,Number(eq),{recordId:"BOND-COUNTRY-"+country,sourceSystem:"Market Risk/Treasury",bookingOffice:branch,bookingOfficeType:type,countryExposure:country})));
[["ID","FABIIDJA","4000"],["SG","DBSSSGSG","5000"],["CN","CITI-CN","6000"],["AU","ANZ-AU","2000"]].forEach(([country,swift,bal])=>p.NOSTRO.push(nostro({Year:"Sep-26",Branch:"Menara Mandiri Jakarta",SwfitCode:swift,"Bank Name":country+" Correspondent","Bank Country":country,Balance:bal},country,Number(bal),{recordId:"NOSTRO-COUNTRY-"+country,sourceSystem:"Internal Mandiri",bookingOffice:"Menara Mandiri Jakarta",bookingOfficeType:"Domestic",countryExposure:country})));

// CIL utilization.
const cilSpecs=[
["TUGU","PT Asuransi Tugu Pratama Indonesia Tbk",[["BMRI",25000],["Mandiri Taspen",10000],["MTF",8000],["MUF",7000]]],
["PLN-INS","PT Asuransi Perisai Listrik Nasional",[["BMRI",16000],["Mandiri Taspen",7000],["MTF",5000],["MUF",3000]]],
["ASKRIDA","PT Asuransi Bangun Askrida",[["BMRI",5000],["Mandiri Taspen",3000],["MTF",1000],["MUF",1000]]]
];
cilSpecs.forEach(([key,insurer,ents])=>ents.forEach(([entity,amount],i)=>p["Nominal Pertanggungan"].push(rec("Nominal Pertanggungan",{No:String(i+1),"Perusahaan Asuransi":insurer,"Jenis Prudk Asuransi":"Asuransi Kredit","Entitas":entity,"EIL Entitas (Rp Juta)":String(E2E_MASTER_DATA.CIL.find(x=>x.key===key).eils[entity]),"Nominal Pertanggungan 2025 (Rp Juta)":String(amount)},[apply("CIL",key,amount,"Nominal Pertanggungan",{entity})],{recordId:"CIL-"+key+"-"+entity.replaceAll(" ","-"),sourceSystem:"CIL_MONITORING"}))));

// LPG: BATUBARA Commercial has full 13-scope coverage; Corporate is bankwide-only to demonstrate partial coverage.
const scopes=["Region I","Region II","Region III","Region IV","Region V","Region VI","Region VII","Region VIII","Region IX","Region X","Region XI","Region XII","KP + OVS"];
const amounts=[2500,2500,2500,2500,2500,2500,2500,2500,2500,2500,0,0,5000];
scopes.forEach((scope,i)=>{
  const total=amounts[i],clAmt=total*.6,nclAmt=total*.4;
  p.CASHLOAN.push(rec("CASHLOAN",{no_cus:"LPG-CL-"+i,nm_cus:"LPG Commercial CL "+scope,no_rek:"LPG-"+i,total_limit:String(total),total_bade:String(clAmt),project_location:"Indonesia",code:"ID",ecosystem_lpg:"BATUBARA",segmen_lpg:"Commercial",region_lpg:scope},[],{recordId:"CL-LPG-COM-"+(i+1),sourceSystem:"DWH"}));
  p["NON CASH LOAN"].push(rec("NON CASH LOAN",{NO:String(200+i),MODULE:"EPLC",TRXREF:"LPG-NCL-"+i,CUSTID:"LPG-"+i,CUSTNM:"LPG Commercial NCL "+scope,CCY:"IDR",BALANCE:String(nclAmt),EQVIDR:String(nclAmt*1000000),"Country Code":"ID",ecosystem_lpg:"BATUBARA",segmen_lpg:"Commercial",region_lpg:scope},[],{recordId:"NCL-LPG-COM-"+(i+1),sourceSystem:"DWH"}));
});
p.CASHLOAN.push(rec("CASHLOAN",{no_cus:"LPG-CORP",nm_cus:"LPG Corporate Bankwide",no_rek:"LPG-CORP",total_limit:"50000",total_bade:"42000",project_location:"Indonesia",code:"ID",ecosystem_lpg:"BATUBARA",segmen_lpg:"Corporate",region_lpg:"KP + OVS"},[],{recordId:"CL-LPG-CORP",sourceSystem:"DWH"}));

export const E2E_DUMMY_PRODUCT_DATA=p;
