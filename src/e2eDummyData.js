// LIMAS integrated production-like baseline dataset.
// Source records remain source-native; master limits and derived monitoring are separate layers.
export const E2E_DUMMY_META={
  datasetId:"LIMAS-PRODUCTION-SNAPSHOT-V1",
  period:"Oktober 2026 • Integrated Production Snapshot",
  asOfDate:"2026-09-30",
  status:"PRODUCTION",
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
{key:"ID",name:"Indonesia",statusMaster:"Exist",capacityLimit:120000,capacityDistribution:{domesticLimit:55000,overseasLimit:65000},productAllocations:{CASHLOAN:{domesticLimit:20000,overseasLimit:20000,total:40000},"NON CASH LOAN":{domesticLimit:10000,overseasLimit:15000,total:25000},"CREDIT LINE":{domesticLimit:10000,overseasLimit:10000,total:20000},BONDS:{domesticLimit:10000,overseasLimit:10000,total:20000},NOSTRO:{domesticLimit:5000,overseasLimit:10000,total:15000}}},
{key:"SG",name:"Singapore",statusMaster:"Exist",capacityLimit:80000,capacityDistribution:{domesticLimit:35000,overseasLimit:45000},productAllocations:{CASHLOAN:{domesticLimit:15000,overseasLimit:10000,total:25000},"NON CASH LOAN":{domesticLimit:5000,overseasLimit:10000,total:15000},"CREDIT LINE":{domesticLimit:5000,overseasLimit:10000,total:15000},BONDS:{domesticLimit:5000,overseasLimit:10000,total:15000},NOSTRO:{domesticLimit:5000,overseasLimit:5000,total:10000}}},
{key:"CN",name:"China",statusMaster:"Exist",capacityLimit:100000,capacityDistribution:{domesticLimit:30000,overseasLimit:70000},productAllocations:{CASHLOAN:{domesticLimit:5000,overseasLimit:25000,total:30000},"NON CASH LOAN":{domesticLimit:2000,overseasLimit:18000,total:20000},"CREDIT LINE":{domesticLimit:4000,overseasLimit:16000,total:20000},BONDS:{domesticLimit:14000,overseasLimit:6000,total:20000},NOSTRO:{domesticLimit:5000,overseasLimit:5000,total:10000}}},
{key:"AU",name:"Australia",statusMaster:"Exist",capacityLimit:90000,capacityDistribution:{domesticLimit:40000,overseasLimit:50000},productAllocations:{CASHLOAN:{domesticLimit:15000,overseasLimit:15000,total:30000},"NON CASH LOAN":{domesticLimit:10000,overseasLimit:10000,total:20000},"CREDIT LINE":{domesticLimit:5000,overseasLimit:10000,total:15000},BONDS:{domesticLimit:5000,overseasLimit:10000,total:15000},NOSTRO:{domesticLimit:5000,overseasLimit:5000,total:10000}}}
],
CCL:[
{key:"ANZBAU3M",name:"Australia and New Zealand Banking Group Limited",category:"Asing",country:"Australia",countryRating:"AA",bobot:.55,rating:"AA-",position:"30/09/2026",ratingIndex:.92,inhouse:80000,tier1:400000,capacity:220000,adjusted:80000,globalParent:"ANZ Group",top200:"Yes",ccl:50,contractual:48},
{key:"DBSSGSG",name:"DBS Bank Ltd",category:"Asing",country:"Singapore",countryRating:"AA",bobot:.55,rating:"AA-",position:"30/09/2026",ratingIndex:.91,inhouse:60000,tier1:300000,capacity:160000,adjusted:60000,globalParent:"DBS Group",top200:"Yes",ccl:30,contractual:28},
{key:"MUFGJPJT",name:"MUFG Bank Ltd",category:"Asing",country:"Japan",countryRating:"A+",bobot:.55,rating:"A",position:"30/09/2026",ratingIndex:.86,inhouse:90000,tier1:500000,capacity:250000,adjusted:90000,globalParent:"MUFG",top200:"Yes",ccl:80,contractual:75},
{key:"OCBCSGSG",name:"Oversea-Chinese Banking Corporation",category:"Asing",country:"Singapore",countryRating:"AA",bobot:.55,rating:"AA-",position:"30/09/2026",ratingIndex:.91,inhouse:50000,tier1:280000,capacity:140000,adjusted:50000,globalParent:"OCBC Group",top200:"Yes",ccl:20,contractual:18}
],
MLK:[
{key:"4000000001",name:"DJARUM",group:"DJARUM GROUP",groupUsahaHolding:"DJARUM GROUP",subGroup:"DJARUM GROUP",entity:"BMRI",unitKerja:"CB6",bumnSwasta:"Swasta",tier:"B",bmpkKonsol:60000,inhouseLimitKonsol:54000,bmpkEntitas:50000,inhouseLimitEntitas:45000,sektorDC:"INDUSTRI ROKOK",dcSectoral:3,rating:"A+",ratingMultiplier:2.5,watchlist:"HIJAU",discountFactor:1,ebitda:5000,kreditBankLain:12000,totalDebt:19000,borrowingCapacity:25000,availableBC:6000,statusPerhitungan:"OK",clLimit:2800,nclLimit:700,treasuryLine:500,masterLimitSetting:5000,masterLimit:5000},
{key:"1000000002",name:"ANEKA TAMBANG",group:"ANTAM GROUP",groupUsahaHolding:"ANTAM GROUP",subGroup:"ANTAM GROUP",entity:"BMRI",unitKerja:"CB5",bumnSwasta:"BUMN",tier:"A",bmpkKonsol:70000,inhouseLimitKonsol:63000,bmpkEntitas:55000,inhouseLimitEntitas:49500,sektorDC:"PERTAMBANGAN",dcSectoral:2,rating:"A",ratingMultiplier:2,watchlist:"HIJAU",discountFactor:1,ebitda:6200,kreditBankLain:15000,totalDebt:22000,borrowingCapacity:30000,availableBC:8000,statusPerhitungan:"OK",clLimit:4500,nclLimit:1500,treasuryLine:500,masterLimitSetting:8000,masterLimit:8000},
{key:"1600000003",name:"TUNAS MOBILINDO PERKASA",group:"ASTRA GROUP",groupUsahaHolding:"ASTRA GROUP",subGroup:"ASTRA GROUP",entity:"BMRI",unitKerja:"CB4",bumnSwasta:"Swasta",tier:"A",bmpkKonsol:90000,inhouseLimitKonsol:81000,bmpkEntitas:70000,inhouseLimitEntitas:63000,sektorDC:"OTOMOTIF",dcSectoral:2,rating:"A",ratingMultiplier:2.2,watchlist:"KUNING",discountFactor:.95,ebitda:8000,kreditBankLain:18000,totalDebt:30000,borrowingCapacity:35000,availableBC:5000,statusPerhitungan:"OK",clLimit:9000,nclLimit:1200,treasuryLine:800,masterLimitSetting:10000,masterLimit:10000},
{key:"2000000004",name:"TUNAS RIDEAN",group:"ASTRA GROUP",groupUsahaHolding:"ASTRA GROUP",subGroup:"ASTRA GROUP",entity:"BMRI",unitKerja:"CB4",bumnSwasta:"Swasta",tier:"A",bmpkKonsol:50000,inhouseLimitKonsol:45000,bmpkEntitas:40000,inhouseLimitEntitas:36000,sektorDC:"OTOMOTIF",dcSectoral:2,rating:"A-",ratingMultiplier:2,watchlist:"HIJAU",discountFactor:1,ebitda:3500,kreditBankLain:8000,totalDebt:12000,borrowingCapacity:16000,availableBC:4000,statusPerhitungan:"OK",clLimit:1500,nclLimit:400,treasuryLine:300,masterLimitSetting:4000,masterLimit:4000}
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

// Country CL / NCL source records
const countryRows=[
["ID","CL1",15000,"Menara Mandiri Jakarta","Domestic","16000000101","PT Sinar Nusantara Infrastruktur"],
["SG","CL2",14000,"Menara Mandiri Jakarta","Domestic","16000000102","PT Garuda Pacific Resources"],
["CN","CL3",27000,"Bank Mandiri Shanghai","Overseas","16000000103","PT Nusantara Steel Resources"],
["AU","CL4",7000,"Bank Mandiri (Europe) Limited London","Overseas","16000000104","PT Cipta Energi Global"]
];
countryRows.forEach(([country,id,amount,office,type,cif,name],i)=>p.CASHLOAN.push(cl({no_cus:cif,nm_cus:name,no_rek:"ACC-"+id,total_limit:"",total_bade:String(amount),project_location:country,code:country},""+country,amount,"Country",{recordId:"CL-COUNTRY-"+country,sourceSystem:"Big Data (adjusted Country)",bookingOffice:office,bookingOfficeType:type,countryExposure:country})));
const nclCountry=[
["ID",8000000000,"Menara Mandiri Jakarta","Domestic","16000000101","PT Sinar Nusantara Infrastruktur","PT Nusantara Trade Services"],
["SG",4000000000,"Menara Mandiri Jakarta","Domestic","16000000102","PT Garuda Pacific Resources","Pacific Trade Pte Ltd"],
["CN",16000000000,"Bank Mandiri Shanghai","Overseas","16000000103","PT Nusantara Steel Resources","Shanghai Metals Trading Co Ltd"],
["AU",8000000000,"Menara Mandiri Jakarta","Domestic","16000000104","PT Cipta Energi Global","Southern Cross Commodities Pty Ltd"]
];
nclCountry.forEach(([country,eqvidr,office,type,cif,custnm,cpnm],i)=>p["NON CASH LOAN"].push(ncl({NO:String(i+1),MODULE:"EPLC",TRXREF:"NCL-C-"+country,CUSTID:cif,CUSTNM:custnm,CPNM:cpnm,"Country Code":country,"Country Name":country,CCY:"USD",AMOUNT:String(eqvidr/17310),BALANCE:String(eqvidr/17310),EXCHANGERT:"17310",EQVIDR:String(eqvidr),FINTYPE:"GUARANTEE",TRXTYPE:"BG"} ,country,eqvidr,"Country",{recordId:"NCL-COUNTRY-"+country,sourceSystem:"NTF -> Provided by DWB",bookingOffice:office,bookingOfficeType:type,countryExposure:country})));

// CCL direct exposures: CL + NCL + Credit Line.
const cclRows=[
["ANZBAU3M","ANZ","AU",12000,18000000000,15000],["DBSSGSG","DBS","SG",10000,6000000000,16000],["MUFGJPJT","MUFG","JP",4000,2000000000,10000],["OCBCSGSG","OCBC","SG",1000,1000000000,5000]
];
cclRows.forEach(([swift,short,country,clAmt,nclEq,creditAmt],i)=>{
  p.CASHLOAN.push(cl({no_cus:"CCL-"+swift,nm_cus:short+" Bank Loan",no_rek:"CCL-CL-"+swift,total_limit:"",total_bade:String(clAmt),project_location:country,code:country},swift,clAmt,"CCL",{recordId:"CL-CCL-"+short,sourceSystem:"Core Banking Limit System",countryExposure:country}));
  p["NON CASH LOAN"].push(ncl({NO:String(20+i),MODULE:"EPLC",TRXREF:"NCL-CCL-"+swift,CUSTID:"NCL-CCL-"+short,CUSTNM:["Australia and New Zealand Banking Group Limited","DBS Bank Ltd","MUFG Bank Ltd","Oversea-Chinese Banking Corporation"][i],CPNM:["Australia and New Zealand Banking Group Limited","DBS Bank Ltd","MUFG Bank Ltd","Oversea-Chinese Banking Corporation"][i],"Country Code":country,"Country Name":country,CCY:"USD",AMOUNT:String(nclEq/17310),BALANCE:String(nclEq/17310),EXCHANGERT:"17310",EQVIDR:String(nclEq),FINTYPE:"GUARANTEE",TRXTYPE:"BG"} ,swift,nclEq,"CCL",{recordId:"NCL-CCL-"+short,sourceSystem:"Core Banking Limit System",countryExposure:country}));
  const comm=Math.round(creditAmt*.75),treasury=creditAmt-comm;
  p["CREDIT LINE"].push(credit({No:String(1+i),Nama:short+" Bank Ltd","Swift Code":swift,"Swift Code Vlookup":swift,Code:country,Negara:country,Bank:"Foreign","Comm DN":String(Math.round(comm*.7)),"Comm DN Utilisasi":String(Math.round(comm*.7)),"Comm LN":String(Math.round(comm*.3)),"Comm LN Utilisasi":String(Math.round(comm*.3)),"Comm Line Total":String(comm),"Comm Line Total Utilisasi":String(comm),"Treasury DN":String(treasury),"Treasury DN Utilisasi":String(treasury),"Treasury LN":"0","Treasury LN Utilisasi":"0","Treasury Line Total":String(treasury),"Treasury Line Total Utilisasi":String(treasury),"Credit Line Total":String(creditAmt),"Credit Line Total Utilisasi":String(creditAmt)},[apply("CCL",swift,creditAmt,"Credit Line")],{recordId:"CRL-CCL-"+short,sourceSystem:"Core Banking Limit System",countryExposure:country}));
});

// Country Credit Line monitoring is derived from raw Credit Line records; no derived country source rows.
// MLK CL + NCL + Treasury exposure rows.
const mlkRows=[
["4000000001","DJARUM",1800,500,500],["1000000002","ANEKA TAMBANG",4000,800,700],["1600000003","TUNAS MOBILINDO PERKASA",8500,1000,2500],["2000000004","TUNAS RIDEAN",700,150,150]
];
mlkRows.forEach(([cif,name,clAmt,nclAmt,tlAmt],i)=>{
  const m=E2E_MASTER_DATA.MLK[i];
  p.CASHLOAN.push(cl({no_cus:cif,nm_cus:name,no_rek:"MLK-CL-"+cif,total_limit:"",total_bade:String(clAmt),project_location:"Indonesia",code:"ID"},cif,clAmt,"MLK",{recordId:"CL-MLK-"+name.replaceAll(" ","-"),sourceSystem:"LIMAST",countryExposure:"ID"}));
  p["NON CASH LOAN"].push(ncl({NO:String(50+i),MODULE:"EPLC",TRXREF:"NCL-MLK-"+cif,CUSTID:cif,CUSTNM:name,CPNM:(name+" Trade Services"),"Country Code":"ID","Country Name":"Indonesia",CCY:"USD",AMOUNT:String(nclAmt*1000000/17310),BALANCE:String(nclAmt*1000000/17310),EXCHANGERT:"17310",EQVIDR:String(nclAmt*1000000),FINTYPE:"GUARANTEE",TRXTYPE:"BG"},cif,nclAmt*1000000,"MLK",{recordId:"NCL-MLK-"+name.replaceAll(" ","-"),sourceSystem:"LIMAST",countryExposure:"ID"}));
  p["CREDIT LINE"].push(credit({No:String(70+i),Nama:name+" Treasury","Swift Code":"TL-"+cif,Code:"ID",Negara:"Indonesia","Bade Treasury Line":String(tlAmt),"Treasury Line Total Utilisasi":String(tlAmt),"Credit Line Total Utilisasi":String(tlAmt)},[apply("MLK",cif,tlAmt,"Bade Treasury Line",{scope:"Treasury"})],{recordId:"TL-MLK-"+name.replaceAll(" ","-"),sourceSystem:"LIMAST"}));
});

// Investment Line is source-only / scoped.
[["ANZ","Deposito","10000000000"],["DBS","Placement","5000000000"],["OCBC","Deposito","3500000000"]].forEach(([bank,type,amount],i)=>p["Investment Line"].push(rec("Investment Line",{No:String(i+1),"Nama Bank":bank,"Nama Entity (Scope Entity : AKK)":"DPBM","Switftcode":bank+"xx","Jenis Invesment Line":type,"Amount Invesment Line":amount},[],{recordId:"INV-"+(i+1),sourceSystem:"Investment source / Monthly"})));

// Bonds / Nostro.
[["ID","FR0090","40000","Menara Mandiri Jakarta","Domestic"],["SG","SG-GB-01","9000","Bank Mandiri Singapore","Overseas"],["CN","CN-CORP-01","20500","Bank Mandiri Shanghai","Overseas"],["AU","AU-GB-01","4000","Bank Mandiri (Europe) Limited London","Overseas"]].forEach(([country,sec,eq,branch,type])=>p.BONDS.push(bond({Date:"30-Sep-26",Branch:branch,"Securities Type":"Fixed Rate","Securities Name":sec,"Issuer Name":country+" Dummy Issuer","Issuer Country":country,"Issuer Type":"Government",Portfolio:"Banking Book",CCY:"IDR",Amount:String(Number(eq)*1000000),"Amount Eq. IDR Juta":eq,"Maturity Date":"15-Sep-2030",Coupon:"5.00%"},country,Number(eq),{recordId:"BOND-COUNTRY-"+country,sourceSystem:"Market Risk/Treasury",bookingOffice:branch,bookingOfficeType:type,countryExposure:country})));
[
  ["ID","FABIIDJA","4000000","IDR",1,"2026-09-30"],
  ["SG","DBSSSGSG","5000000","SGD",12500,"2026-09-30"],
  ["CN","CITI-CN","6000000","CNY",2300,"2026-09-30"],
  ["AU","ANZ-AU","2000000","AUD",11000,"2026-09-30"]
].forEach(([country,swift,bal,ccy,fxRate,fxDate])=>{
  const balanceIdr=Number(bal)*Number(fxRate);
  p.NOSTRO.push(nostro(
    {Year:"Sep-26",Branch:"Menara Mandiri Jakarta",SwfitCode:swift,"Bank Name":country+" Correspondent","Bank Country":country,CCY:ccy,Balance:String(bal),"FX Rate to IDR":String(fxRate),"FX Rate Date":fxDate,"Balance IDR":String(balanceIdr)},
    country,Number(bal),
    {recordId:"NOSTRO-COUNTRY-"+country,sourceSystem:"Internal Mandiri",bookingOffice:"Menara Mandiri Jakarta",bookingOfficeType:"Domestic",countryExposure:country,asOfDate:fxDate}
  ));
});

// CIL utilization.
const cilSpecs=[
["TUGU","PT Asuransi Tugu Pratama Indonesia Tbk",[["BMRI",25000],["Mandiri Taspen",10000],["MTF",8000],["MUF",7000]]],
["PLN-INS","PT Asuransi Perisai Listrik Nasional",[["BMRI",16000],["Mandiri Taspen",7000],["MTF",5000],["MUF",3000]]],
["ASKRIDA","PT Asuransi Bangun Askrida",[["BMRI",5000],["Mandiri Taspen",3000],["MTF",1000],["MUF",1000]]]
];
cilSpecs.forEach(([key,insurer,ents])=>ents.forEach(([entity,amount],i)=>p["Nominal Pertanggungan"].push(rec("Nominal Pertanggungan",{No:String(i+1),"Perusahaan Asuransi":insurer,"Jenis Prudk Asuransi":"Asuransi Kredit","Entitas":entity,"EIL Entitas (Rp Juta)":String(E2E_MASTER_DATA.CIL.find(x=>x.key===key).eils[entity]),"Nominal Pertanggungan 2025 (Rp Juta)":String(amount)},[apply("CIL",key,amount,"Nominal Pertanggungan",{entity})],{recordId:"CIL-"+key+"-"+entity.replaceAll(" ","-"),sourceSystem:"CIL_MONITORING"}))));

// LPG source records are ordinary debtor-level Cash Loan/NCL rows with explicit LPG classification.
// LPG monitoring aggregates these raw source records.
const lpgDebtors=[
  ["16000000201","PT Borneo Prima Energi",10000,3000000000,"Region I","Commercial"],
  ["16000000202","PT Kaltara Mineral Abadi",7000,3000000000,"Region II","Commercial"],
  ["16000000203","PT Bara Nusantara Makmur",5000,2000000000,"Region III","Commercial"],
  ["16000000204","PT Kalimantan Coal Trading",16000,2000000000,"KP + OVS","Corporate"],
  ["16000000205","PT Arunika Energi Resources",14000,2000000000,"Region IV","Corporate"],
  ["16000000206","PT Mandala Tambang Sejahtera",7000,1000000000,"Region V","Corporate"]
];
lpgDebtors.forEach(([cif,name,clAmt,nclIdr,region,segment],i)=>{
  const baseId=String(i+1).padStart(3,"0");
  p.CASHLOAN.push(cl(
    {no_cus:cif,nm_cus:name,no_rek:"6090"+baseId+"000"+(i+1),total_limit:"",total_bade:String(clAmt),project_location:"Indonesia",code:"ID",
      ecosystem_lpg:"BATUBARA",segmen_lpg:segment,region_lpg:region},
    "ID",clAmt,"Country",
    {recordId:"CL-LPG-DEBTOR-"+baseId,sourceSystem:"DWH",countryExposure:"ID"}
  ));
  p["NON CASH LOAN"].push(ncl(
    {NO:String(200+i),MODULE:"EPLC",TRXREF:"LPG-NCL-"+baseId,CUSTID:cif,CUSTNM:name,
      CPNM:segment==="Commercial"?"Pacific Commodities Pte Ltd":"Global Coal Trading Pte Ltd",
      "Country Code":"ID","Country Name":"Indonesia",CCY:"IDR",
      AMOUNT:String(nclIdr),BALANCE:String(nclIdr),EXCHANGERT:"1",EQVIDR:String(nclIdr),
      FINTYPE:"GUARANTEE",TRXTYPE:"BG",ecosystem_lpg:"BATUBARA",segmen_lpg:segment,region_lpg:region},
    "ID",nclIdr,"Country",
    {recordId:"NCL-LPG-DEBTOR-"+baseId,sourceSystem:"DWH",countryExposure:"ID"}
  ));
});
const enrichProductData=()=>{
  const offices=[
    ["Menara Mandiri Jakarta","Domestic","Jakarta"],
    ["Bank Mandiri Singapore","Overseas","Singapore"],
    ["Bank Mandiri Shanghai","Overseas","Shanghai"],
    ["Bank Mandiri (Europe) Limited London","Overseas","London"],
    ["Bank Mandiri Cayman Islands","Overseas","Cayman"]
  ];
  const officeByCountry={ID:offices[0],SG:offices[1],CN:offices[2],AU:offices[3],JP:offices[1]};
  const businessUnits=["Corporate Banking 1","Corporate Banking 4","Corporate Banking 5","Corporate Banking 6","Commercial Banking 2","Commercial Banking 8"];
  const products=p;
  products.CASHLOAN.forEach((r,i)=>{
    const d=r.data||{}, country=String(d.code||"ID").toUpperCase(), office=officeByCountry[country]||offices[i%offices.length];
    const mlk=E2E_MASTER_DATA.MLK.find(x=>String(x.key)===String(d.no_cus));
    const officeCode=String(d.kd_cab||((i%5===0)?"60900":(i%5===1?"60200":(i%5===2?"60600":"60100"))));
    d.kd_cab=officeCode;
    d.nm_cab=d.nm_cab||office[0];
    d.gas_reporting=d.gas_reporting||"WHOLESALE BANKING";
    d.buc_reporting=d.buc_reporting||businessUnits[i%businessUnits.length];
    d.unit_pengelola=d.unit_pengelola||(mlk?.unitKerja||businessUnits[i%businessUnits.length]);
    d.jns_krd=d.jns_krd||"WORKING CAPITAL";
    d.src=d.src||"LIMAST";
    d.j_guna=d.j_guna||"KREDIT MODAL KERJA";
    d.revolv=d.revolv||"N";
    d.bilokj=d.bilokj||"9999";
    d["MatDate/Jatem"]=d["MatDate/Jatem"]||"30-Sep-2027";
    // LPG classification is populated only by an explicit source LPG fixture.
    // Do not invent generic LPG attributes for ordinary Cash Loan records.
    r.meta={...r.meta,bookingOffice:r.meta.bookingOffice||d.nm_cab,bookingOfficeType:r.meta.bookingOfficeType||office[1],countryExposure:r.meta.countryExposure||country,asOfDate:r.meta.asOfDate||E2E_DUMMY_META.asOfDate};
  });
  products["NON CASH LOAN"].forEach((r,i)=>{
    const d=r.data||{};
    const country=String(d["Country Code"]||"ID").toUpperCase();
    const office=officeByCountry[country]||offices[i%offices.length];

    // NCL source fidelity: keep the user-confirmed source semantics.
    // REPORTTYPE / TRXTYPE / FINTYPE / SERV* are actual NCL classifications,
    // not generic "NON CASH LOAN / BG / GUARANTEE" placeholders.
    const nclTemplates=[
      {module:"EXCO",reportType:"Export Collection Financing",trxRef:"XC77126002607",custId:"16000005630",custNm:"PT. PABRIK KERTAS TJIWI KIMIA TBK",cpnm:"KENSINGTON INTERNATIONAL LIMITED",country:"HK",countryName:"Hong Kong",trxType:"D/A",ccy:"USD",amount:"14978.87",balance:"14978.87",exchangeRate:"17310",eqvidr:"259284240",finType:"DISCOUNT/REDISCOUNT",trxDate:"07/04/2026",dueDate:"02/10/2026",servCode:"77106",servNm:"Trade Operation Export",pccd:"77106",pcnm:"Trade Operation Export",sof:"T",intrt:"6.97"},
      {module:"EXCO",reportType:"Export Collection Financing",trxRef:"XC77126002602",custId:"16000005628",custNm:"PT. PINDO DELI PULP AND PAPER MILLS",cpnm:"ROCKDALE CAPITAL PTE LTD",country:"SG",countryName:"Singapore",trxType:"D/A",ccy:"USD",amount:"141162.38",balance:"141162.38",exchangeRate:"17310",eqvidr:"2443520798",finType:"DISCOUNT/REDISCOUNT",trxDate:"07/04/2026",dueDate:"25/09/2026",servCode:"77106",servNm:"Trade Operation Export",pccd:"77106",pcnm:"Trade Operation Export",sof:"T",intrt:"6.97"},
      {module:"EXCO",reportType:"Export Collection Financing",trxRef:"XC77126002609",custId:"16000005628",custNm:"PT. PINDO DELI PULP AND PAPER MILLS",cpnm:"PG PAPER COMPANY LIMITED",country:"GB",countryName:"United Kingdom",trxType:"D/A",ccy:"EUR",amount:"30308.4",balance:"30308.4",exchangeRate:"20218.08",eqvidr:"612777656",finType:"DISCOUNT/REDISCOUNT",trxDate:"07/04/2026",dueDate:"22/05/2026",servCode:"77106",servNm:"Trade Operation Export",pccd:"77106",pcnm:"Trade Operation Export",sof:"T",intrt:"7.67"}
    ];
    const tpl=nclTemplates[i%3];
    d["Swift Code"]=d["Swift Code"]||"";
    d.MODULE=d.MODULE||tpl.module;
    d.REPORTTYPE=d.REPORTTYPE||tpl.reportType;
    d.RELREF=d.RELREF||("REL-"+String(r.meta?.recordId||"NCL-"+i));
    d.CPNM=d.CPNM||"Mandiri Counterparty "+country;
    d.CPCNTY=d.CPCNTY||country;
    d.CPBK=d.CPBK||office[2];
    d.BKCNTRY=d.BKCNTRY||country;
    d["Country Name"]=d["Country Name"]||({ID:"Indonesia",SG:"Singapore",CN:"China",AU:"Australia",JP:"Japan"}[country]||country);
    d["Type of Judgment"]=d["Type of Judgment"]||"CPNM";
    d.TRXTYPE=d.TRXTYPE||tpl.trxType;
    d.CCY=d.CCY||"USD";
    if(i<3){
      d["Swift Code"]="";
      d.ecosystem_lpg="";
      d.segmen_lpg="";
      d.region_lpg="";
      d.NO=String(i+1);
      d.MODULE=tpl.module;
      d.REPORTTYPE=tpl.reportType;
      d.TRXREF=tpl.trxRef;
      d.CUSTID=tpl.custId;
      d.CUSTNM=tpl.custNm;
      d.CPNM=tpl.cpnm;
      d["Country Code"]=tpl.country;
      d["Country Name"]=tpl.countryName;
      d.TRXTYPE=tpl.trxType;
      d.CCY=tpl.ccy;
      d.AMOUNT=tpl.amount;
      d.BALANCE=tpl.balance;
      d.EXCHANGERT=tpl.exchangeRate;
      d.EQVIDR=tpl.eqvidr;
      d.FINTYPE=tpl.finType;
      d.TRXDATE=tpl.trxDate;
      d.DUEDATE=tpl.dueDate;
      d.SERVCODE=tpl.servCode;
      d.SERVNM=tpl.servNm;
      d.PCCD=tpl.pccd;
      d.PCNM=tpl.pcnm;
      d.SOF=tpl.sof;
      d.INTRT=tpl.intrt;
      if(r.applied?.[0]) r.applied[0].amount=Number(tpl.eqvidr);
    }
    const eqvidr=Number(d.EQVIDR||0);
    d.AMOUNT=d.AMOUNT||String(eqvidr?eqvidr/(Number(d.EXCHANGERT||17310)):0);
    d.BALANCE=d.BALANCE||d.AMOUNT;
    d.EXCHANGERT=d.EXCHANGERT||"17310";
    d.FINTYPE=d.FINTYPE||tpl.finType;
    d.TRXDATE=d.TRXDATE||"07/04/2026";
    d.DUEDATE=d.DUEDATE||"02/10/2026";
    d.SERVCODE=d.SERVCODE||tpl.servCode;
    d.SERVNM=d.SERVNM||tpl.servNm;
    d.PCCD=d.PCCD||tpl.servCode;
    d.PCNM=d.PCNM||tpl.servNm;
    d.BUCD=d.BUCD||"";
    d.SOF=d.SOF||tpl.sof;
    d.INTRT=d.INTRT||tpl.intrt;
    d.ecosystem_lpg=d.ecosystem_lpg||"";
    d.segmen_lpg=d.segmen_lpg||"";
    d.region_lpg=d.region_lpg||"";

    r.meta={
      ...r.meta,
      // Booking office is an enrichment/reference, not a native NCL source field.
      bookingOffice:r.meta?.bookingOffice||office[0],
      bookingOfficeType:r.meta?.bookingOfficeType||office[1],
      countryExposure:r.meta?.countryExposure||country,
      asOfDate:r.meta?.asOfDate||E2E_DUMMY_META.asOfDate
    };
  });
  products["CREDIT LINE"].forEach((r,i)=>{
    const d=r.data||{};
    const country=String(d.Code||"ID").toUpperCase();
    d["Swift Code"]=d["Swift Code"]||("BMRI"+country+"CL"+String(i+1).padStart(3,"0"));
    d["Swift Code Vlookup"]=d["Swift Code Vlookup"]||d["Swift Code"];
    d["Aging Schedule RM"]=d["Aging Schedule RM"]||"30D";
    d.Bank=d.Bank||"Bank Mandiri / Counterparty";
    d.RM=d.RM||businessUnits[i%businessUnits.length];
    d["Dept."]=d["Dept."]||"Wholesale Banking";
    d.BMFIR=d.BMFIR||"BMRI";
    d.Fitch=d.Fitch||"A";
    d["Moody's"]=d["Moody's"]||"A2";
    d["S&P"]=d["S&P"]||"A";
    const total=Number(d["Credit Line Total"]||d["Credit Line Total Utilisasi"]||0);
    const comm=Number(d["Comm Line Total"]||d["Comm Line Total Utilisasi"]||0);
    const tre=Number(d["Treasury Line Total"]||d["Treasury Line Total Utilisasi"]||Math.max(total-comm,0));
    d["Comm DN"]=d["Comm DN"]||String(Math.round(comm*.7));
    d["Comm DN Utilisasi"]=d["Comm DN Utilisasi"]||String(comm);
    d["Comm LN"]=d["Comm LN"]||String(Math.max(comm-Number(d["Comm DN"]),0));
    d["Comm LN Utilisasi"]=d["Comm LN Utilisasi"]||"0";
    d["Comm Line Total"]=d["Comm Line Total"]||String(comm);
    d["Comm Line Total Utilisasi"]=d["Comm Line Total Utilisasi"]||String(comm);
    d["Treasury DN"]=d["Treasury DN"]||String(tre);
    d["Treasury DN Utilisasi"]=d["Treasury DN Utilisasi"]||String(tre);
    d["Treasury LN"]=d["Treasury LN"]||"0";
    d["Treasury LN Utilisasi"]=d["Treasury LN Utilisasi"]||"0";
    d["Treasury Line Total"]=d["Treasury Line Total"]||String(tre);
    d["Treasury Line Total Utilisasi"]=d["Treasury Line Total Utilisasi"]||String(tre);
    d["Credit Line Total"]=d["Credit Line Total"]||String(comm+tre);
    d["Credit Line Total Utilisasi"]=d["Credit Line Total Utilisasi"]||String(comm+tre);
    r.meta={...r.meta,sourceSystem:r.meta?.sourceSystem||"Credit Line Utilization Feed",countryExposure:r.meta?.countryExposure||country,asOfDate:r.meta?.asOfDate||E2E_DUMMY_META.asOfDate};
  });
  products["Investment Line"].forEach((r,i)=>{
    const d=r.data||{};
    d["catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa"]=d["catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa"]||"Source-only investment exposure; product classification is maintained in the integration layer";
  });
  products.BONDS.forEach((r,i)=>{
    const d=r.data||{};
    d["Potential P/L (Eq. IDR Juta)"]=d["Potential P/L (Eq. IDR Juta)"]||String([125.4,-42.8,86.2,31.7][i%4]);
    const country=String(d["Issuer Country"]||"ID").toUpperCase();
    r.meta={...r.meta,bookingOffice:r.meta?.bookingOffice||d.Branch||"Menara Mandiri Jakarta",bookingOfficeType:r.meta?.bookingOfficeType||((country==="ID")?"Domestic":"Overseas"),countryExposure:r.meta?.countryExposure||country,asOfDate:r.meta?.asOfDate||E2E_DUMMY_META.asOfDate};
  });
  products.NOSTRO.forEach(r=>{
    const d=r.data||{}, country=String(d["Bank Country"]||"ID").toUpperCase();
    r.meta={...r.meta,bookingOffice:r.meta?.bookingOffice||d.Branch||"Menara Mandiri Jakarta",bookingOfficeType:r.meta?.bookingOfficeType||"Domestic",countryExposure:r.meta?.countryExposure||country,asOfDate:r.meta?.asOfDate||d["FX Rate Date"]||E2E_DUMMY_META.asOfDate};
  });
  products["Nominal Pertanggungan"].forEach(r=>{
    const d=r.data||{}, master=E2E_MASTER_DATA.CIL.find(x=>x.key===r.applied?.[0]?.key), amount=Number(d["Nominal Pertanggungan 2025 (Rp Juta)"]||0), eil=Number(d["EIL Entitas (Rp Juta)"]||0), projection=amount*(String(d["Entitas"]||"").toUpperCase()==="BMRI"?1.10:1.075), cil=Number(master?.cil||0), cit=Number(master?.cit||0);
    d["Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)"]=projection.toFixed(2);
    d["Utilisasi EIL (%)"]=eil?((amount/eil)*100).toFixed(2):"0.00";
    d["CIL (Rp Juta)"]=String(cil);
    d["CIT (Rp Juta)"]=String(cit);
    d["Utilisasi CIL (%)"]=cil?((amount/cil)*100).toFixed(2):"0.00";
    d["% Utilisasi (Nominal Pertanggungan/CIL)"]=cil?((amount/cil)*100).toFixed(2):"0.00";
    d["% Utilisasi Proyeksi (Nominal Pertanggungan/CIL)"]=cil?((projection/cil)*100).toFixed(2):"0.00";
    d["Skor Akreditasi (PCP)"]=String(master?.score??75);
    d["Klasifikasi EWS (PCP)"]=((amount/cil)>=.8)?"High":"Normal";
    d["Status / Rekomendasi Action Plan"]=master?.action||"Monitoring as usual";
  });
};
enrichProductData();

const sourceSpec=(r,recordId)=>{
  const meta={...(r.meta||{}),recordId};
  // Product Database stores only source data and provenance metadata.
  // Integration mappings are rebuilt from source fields by the runtime mapping engine.
  delete meta.bookingOffice;
  delete meta.bookingOfficeType;
  delete meta.bookingOfficeStatus;
  delete meta.countryExposure;
  return {
    data:JSON.parse(JSON.stringify(r.data||{})),
    meta
  };
};


const rebuildSourceOnlyProductData=()=>{
  const out={
    CASHLOAN:[],
    "NON CASH LOAN":[],
    "CREDIT LINE":[],
    "Investment Line":[],
    BONDS:[],
    NOSTRO:[],
    "Nominal Pertanggungan":[]
  };

  // Product Database is source-only: retain the raw product records.
  // Mapping/application is rebuilt separately by buildProductIntegrationMappings().
  // LPG is an aggregation/classification over source debtor records; LPG-qualified debtor records remain in the
  // Cash Loan/NCL source universe with explicit LPG attributes.

  p.CASHLOAN.forEach((r,i)=>{
    const meta={...(r.meta||{}),recordId:r.meta?.recordId||"CL-"+String(i+1).padStart(3,"0")};
    if(meta.sourceSystem==="DWH"&&/^CL-LPG-/.test(String(meta.recordId))) meta.integrationDomains=["LPG"];
    out.CASHLOAN.push(sourceSpec({...r,meta},meta.recordId));
  });

  p["NON CASH LOAN"].forEach((r,i)=>{
    const meta={...(r.meta||{}),recordId:r.meta?.recordId||"NCL-"+String(i+1).padStart(3,"0")};
    if(meta.sourceSystem==="DWH"&&/^NCL-LPG-/.test(String(meta.recordId))) meta.integrationDomains=["LPG"];
    out["NON CASH LOAN"].push(sourceSpec({...r,meta},meta.recordId));
  });

  // Credit Line source universe: raw counterparty records only.
  // Country aggregates and MLK Treasury exposure rows are integration/read-model
  // constructs and therefore do not become duplicate Product Database records.
  p["CREDIT LINE"]
    .filter(r=>/^CRL-CCL-/.test(String(r.meta?.recordId||"")))
    .forEach((r,i)=>{
      const meta={...(r.meta||{}),recordId:"CLINE-"+String(i+1).padStart(3,"0")};
      out["CREDIT LINE"].push(sourceSpec({...r,meta},meta.recordId));
    });

  p["Investment Line"].forEach((r,i)=>
    out["Investment Line"].push(sourceSpec(r,r.meta?.recordId||"INV-"+String(i+1).padStart(3,"0")))
  );

  p.BONDS.forEach((r,i)=>
    out.BONDS.push(sourceSpec(r,r.meta?.recordId||"BOND-"+String(i+1).padStart(3,"0")))
  );

  p.NOSTRO.forEach((r,i)=>
    out.NOSTRO.push(sourceSpec(r,r.meta?.recordId||"NOSTRO-"+String(i+1).padStart(3,"0")))
  );

  p["Nominal Pertanggungan"].forEach((r,i)=>
    out["Nominal Pertanggungan"].push(sourceSpec(r,r.meta?.recordId||"CIL-"+String(i+1).padStart(3,"0")))
  );

  return out;
};

export const E2E_DUMMY_PRODUCT_DATA=rebuildSourceOnlyProductData();
