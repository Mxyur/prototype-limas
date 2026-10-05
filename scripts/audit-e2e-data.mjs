import assert from "node:assert/strict";
import { E2E_MASTER_DATA, E2E_DUMMY_PRODUCT_DATA, E2E_COUNTRY_MONITORING_POLICY, E2E_ENTITY_MASTER, E2E_MLK_ENTITY_SCOPE, E2E_CCL_ENTITY_SCOPE, E2E_CCL_LIMIT_SCOPE, E2E_LPG_MASTER_INDUSTRY } from "../src/e2eDummyData.js";
const EPS=0.01;
const near=(a,b,msg)=>assert.ok(Math.abs(Number(a)-Number(b))<=EPS,msg+" (actual="+a+", expected="+b+")");
const entityCodes=new Set(E2E_ENTITY_MASTER.map(x=>x.entityCode));

assert.ok(E2E_LPG_MASTER_INDUSTRY.length>=80,"LPG Master Industry must contain the full supplied Sector → Grouping list.");
const lpgIndustryCodes=new Set();
const lpgPairKeys=new Set();
for(const r of E2E_LPG_MASTER_INDUSTRY){
  assert.ok(r.industryCode&&r.industryName&&r.groupingCode&&r.groupingName,"LPG Master Industry row must have code/name for both Industry and Grouping.");
  assert.ok(!lpgIndustryCodes.has(r.industryCode),"Duplicate LPG industryCode "+r.industryCode);
  lpgIndustryCodes.add(r.industryCode);
  const pair=String(r.industryCode)+"|"+String(r.groupingCode);
  assert.ok(!lpgPairKeys.has(pair),"Duplicate LPG Sector→Grouping mapping "+pair);
  lpgPairKeys.add(pair);
}
assert.ok(E2E_LPG_MASTER_INDUSTRY.some(r=>r.industryName==="INDUSTRI BATUBARA"&&r.groupingName==="BATUBARA"),"LPG Master Industry must include INDUSTRI BATUBARA → BATUBARA.");
assert.ok(E2E_LPG_MASTER_INDUSTRY.some(r=>r.industryName==="INDUSTRI PLASTIK & SERAT BUATAN"&&r.groupingName==="PLASTIK"),"LPG Master Industry must include INDUSTRI PLASTIK & SERAT BUATAN → PLASTIK.");
assert.ok(E2E_LPG_MASTER_INDUSTRY.some(r=>r.industryName==="ENERGI & AIR"&&r.groupingName==="ENERGI & AIR"),"LPG Master Industry must include ENERGI & AIR → ENERGI & AIR.");
assert.deepEqual(E2E_MLK_ENTITY_SCOPE,["BMEL","BMRI","MANSEK","MTF","MUF"],"MLK scope must follow the confirmed entity universe: BMEL + BMRI + MANSEK + MTF + MUF");
const cclScope=new Map(E2E_CCL_ENTITY_SCOPE.map(x=>[x.entityCode,x]));
const fs=await import("node:fs");
const path=await import("node:path");
const mainSource=fs.readFileSync(path.resolve(process.cwd(),"src/main.jsx"),"utf8");
assert.ok(!/r\.limits\[\s*["']KP \+ OVS["']\s*\]\s*=/.test(mainSource),"LPG cleanse must never overwrite explicit KP + OVS master values");
assert.ok(mainSource.includes("const regionalValues=LPG_REGION_ONLY_SCOPES"),"LPG cleanse must calculate regional reconciliation from Region I–XII only");
assert.ok(mainSource.includes("legacyCorruption"),"LPG persisted-master migration guard must exist for legacy zero snapshots");

console.log("[LIMAS AUDIT] starting E2E invariant audit");
for(const code of E2E_COUNTRY_MONITORING_POLICY.excludedCountryCodes){ assert.ok(!(E2E_MASTER_DATA.Country||[]).some(r=>String(r.key).toUpperCase()===String(code).toUpperCase()),"Excluded Country Code "+code+" must not exist in Country Master"); }
for(const r of E2E_MASTER_DATA.Country||[]){ const d=r.capacityDistribution||{}; if(d.domesticLimit!==null&&d.overseasLimit!==null) near(r.capacityLimit,Number(d.domesticLimit)+Number(d.overseasLimit),"Country capacity split must reconcile for "+r.key); const p=r.productAllocations||{}; const allocated=Object.values(p).reduce((s,x)=>s+(Number(x?.total)||0),0); near(r.capacityLimit,allocated,"Country product allocation must reconcile for "+r.key); for(const [product,x] of Object.entries(p)){ if(x.domesticLimit!==null&&x.overseasLimit!==null) near(x.total,Number(x.domesticLimit)+Number(x.overseasLimit),"Country product split must reconcile for "+r.key+"/"+product); }}
for(const code of E2E_MLK_ENTITY_SCOPE) assert.ok(entityCodes.has(code),"MLK scope entity "+code+" missing from Entity Master");
for(const s of E2E_CCL_ENTITY_SCOPE){ assert.ok(entityCodes.has(s.entityCode),"CCL scope entity "+s.entityCode+" missing from Entity Master"); assert.ok(Boolean(s.direct)||Boolean(s.indirect),"CCL scope entity "+s.entityCode+" must have Direct or Indirect applicability"); }
for(const x of E2E_CCL_LIMIT_SCOPE){ assert.ok(entityCodes.has(x.entityCode),"CCL limit references unknown entity "+x.entityCode); assert.ok(["DIRECT","INDIRECT"].includes(x.limitType),"CCL limit type invalid for "+x.counterpartyId+"/"+x.entityCode); const scope=cclScope.get(x.entityCode); assert.ok(scope && Boolean(scope[x.limitType.toLowerCase()]),"CCL limit scope not enabled for "+x.entityCode+"/"+x.limitType); near(x.facility,(Number(x.bankLoan)||0)+(Number(x.commercialLine)||0)+(Number(x.treasuryLine)||0),"CCL facility components must reconcile for "+x.counterpartyId+"/"+x.entityCode+"/"+x.limitType); }
for(const master of E2E_MASTER_DATA.CCL||[]){ const direct=E2E_CCL_LIMIT_SCOPE.filter(x=>String(x.counterpartyId)===String(master.key)&&x.limitType==="DIRECT").reduce((s,x)=>s+(Number(x.ccl)||0),0); near(master.ccl,direct,"CCL direct entity allocation must reconcile for "+master.key); }
// CCL upstream lineage: raw FI CL/NCL must not be direct CCL utilization.
// They feed Credit Line as Bank Loan / Commercial Line; only Credit Line carries cclLimitType.
for(const r of E2E_DUMMY_PRODUCT_DATA["NON CASH LOAN"]||[]){
  const rid=String(r.meta?.recordId||"");
  if(!rid.startsWith("NCL-CCL-"))continue;
  assert.equal(r.meta?.cclExposureRole,undefined,"NCL CCL upstream rows must not carry direct CCL exposure role: "+rid);
  assert.ok(r.meta?.creditLineLimitType,"NCL CCL upstream rows must carry Credit Line scope metadata: "+rid);
}
for(const r of E2E_DUMMY_PRODUCT_DATA.CASHLOAN||[]){
  const rid=String(r.meta?.recordId||"");
  if(!rid.startsWith("CL-CCL-"))continue;
  assert.equal(r.meta?.cclLimitType,undefined,"CL CCL upstream rows must not carry direct CCL scope metadata: "+rid);
  assert.ok(r.meta?.creditLineLimitType,"CL CCL upstream rows must carry Credit Line scope metadata: "+rid);
}
for(const r of E2E_DUMMY_PRODUCT_DATA["CREDIT LINE"]||[]){
  const rid=String(r.meta?.recordId||"");
  if(!rid.startsWith("CRL-CCL-"))continue;
  assert.ok(r.meta?.cclLimitType,"CCL Credit Line rows must carry direct CCL scope metadata: "+rid);
  const d=r.data||{};
  near(Number(d["Comm Line Total Utilisasi"]||0),[...E2E_DUMMY_PRODUCT_DATA["NON CASH LOAN"]||[]]
    .filter(n=>String(n.meta?.recordingEntity||n.meta?.reportingEntity||"BMRI").toUpperCase()===String(r.meta?.reportingEntity||"BMRI").toUpperCase() &&
      String(n.meta?.creditLineLimitType||"DIRECT")===String(r.meta?.cclLimitType||"DIRECT") &&
      String(n.meta?.recordId||"").replace(/^NCL-/i,"CRL-")===rid)
    .reduce((s,n)=>s+Number(n.data?.EQVIDR||0)/1e6,0),
    "CCL Commercial Line must reconcile to FI NCL upstream for "+rid);
}


// Universal monitoring integrity: positive source exposure must never enter monitoring without an applicable limit scope.
const countryMaster=new Map((E2E_MASTER_DATA.Country||[]).map(r=>[String(r.key).toUpperCase(),r]));
const cclMaster=new Map((E2E_MASTER_DATA.CCL||[]).map(r=>[String(r.key).toUpperCase(),r]));
const mlkMaster=new Map((E2E_MASTER_DATA.MLK||[]).map(r=>[String(r.key),r]));
const cclScopeMap=new Map(E2E_CCL_LIMIT_SCOPE.map(x=>[String(x.counterpartyId).toUpperCase()+"|"+x.entityCode+"|"+x.limitType,x]));
const positive=(v)=>Number(v)>0;
const n=(v)=>Number(String(v??"").replace(/,/g,""))||0;

for(const productId of ["CASHLOAN","NON CASH LOAN","CREDIT LINE","BONDS","NOSTRO"]){
  for(const r of E2E_DUMMY_PRODUCT_DATA[productId]||[]){
    const d=r.data||{}, code=String(productId==="CASHLOAN"?d.code:productId==="NON CASH LOAN"?d["Country Code"]:productId==="CREDIT LINE"?d.Code:productId==="BONDS"?d["Issuer Country"]:d["Bank Country"]||"").trim().toUpperCase();
    if(!code||String(code).toUpperCase()==="ID")continue;
    const master=countryMaster.get(code); if(!master)continue; // out-of-scope country references are not Country monitoring records.
    const exposure=productId==="CASHLOAN"?n(d.total_bade):productId==="NON CASH LOAN"?n(d.EQVIDR)/1e6:productId==="CREDIT LINE"?n(d["Credit Line Total Utilisasi"]):(productId==="BONDS"?n(d["Amount Eq. IDR Juta"]):n(d.Balance)*n(d["FX Rate to IDR"])/1e6);
    if(!positive(exposure))continue;
    const alloc=master.productAllocations?.[productId];
    assert.ok(alloc && Object.prototype.hasOwnProperty.call(alloc,"total"),"Country Product Allocation missing for positive "+productId+"/"+code);
    assert.ok(Number.isFinite(Number(alloc.total)),"Country Product Allocation must be numeric for "+productId+"/"+code);
  }
}
for(const r of E2E_DUMMY_PRODUCT_DATA["NON CASH LOAN"]||[]){
  const d=r.data||{},code=String(d["Country Code"]||"").toUpperCase(),rid=String(r.meta?.recordId||"");
  if(!code||code==="ID"||rid.startsWith("NCL-CCL-")||rid.startsWith("NCL-MLK-")||rid.startsWith("NCL-LPG-"))continue;
  if(!countryMaster.has(code)||!Number.isFinite(n(d.EQVIDR))||n(d.EQVIDR)<=0)continue;
  const officeRef={"NCL-COUNTRY-SG":"Domestic","NCL-COUNTRY-CN":"Overseas","NCL-COUNTRY-AU":"Domestic"}[rid];
  assert.ok(officeRef,"NCL Country exposure requires Booking Office Type enrichment for "+rid);
}

for(const productId of ["CASHLOAN","NON CASH LOAN","CREDIT LINE"]){
  for(const r of E2E_DUMMY_PRODUCT_DATA[productId]||[]){
    if(!r.meta?.cclLimitType)continue;
    const d=r.data||{},entity=String(r.meta.reportingEntity||"BMRI").toUpperCase(),type=String(r.meta.cclLimitType).toUpperCase();
    const key=productId==="NON CASH LOAN"?String(d.CPNM||"").trim().toUpperCase():productId==="CASHLOAN"?String(d.no_cus||"").replace(/^CCL-/i,"").toUpperCase():String(d["Swift Code Vlookup"]||d["Swift Code"]||"").trim().toUpperCase();
    const exposure=productId==="CASHLOAN"?n(d.total_bade):productId==="NON CASH LOAN"?n(d.EQVIDR)/1e6:n(d["Credit Line Total Utilisasi"]);
    if(!positive(exposure))continue;
    assert.ok(cclMaster.has(key),"CCL master missing for positive "+productId+"/"+key);
    const scope=cclScopeMap.get(key+"|"+entity+"|"+type);
    assert.ok(scope,"CCL entity/type limit scope missing for "+key+"/"+entity+"/"+type);
    assert.ok(Object.prototype.hasOwnProperty.call(scope,"ccl")&&Number.isFinite(Number(scope.ccl)),"CCL limit not configured for "+key+"/"+entity+"/"+type);
  }
}

for(const productId of ["CASHLOAN","NON CASH LOAN","CREDIT LINE"]){
  for(const r of E2E_DUMMY_PRODUCT_DATA[productId]||[]){
    const id=String(r.meta?.recordId||""),entity=String(r.meta?.reportingEntity||"").toUpperCase();
    if(!E2E_MLK_ENTITY_SCOPE.includes(entity))continue;
    const isMlk=productId==="CASHLOAN"?id.startsWith("CL-MLK-"):productId==="NON CASH LOAN"?id.startsWith("NCL-MLK-"):id.startsWith("TL-MLK-");
    if(!isMlk)continue;
    const d=r.data||{},key=productId==="CASHLOAN"?String(d.no_cus||""):productId==="NON CASH LOAN"?String(d.CUSTID||""):String(d["Swift Code"]||"").replace(/^TL-/i,"");
    const exposure=productId==="CASHLOAN"?n(d.total_bade):productId==="NON CASH LOAN"?n(d.EQVIDR)/1e6:n(d["Bade Treasury Line"]||d["Treasury Line Total Utilisasi"]);
    if(!positive(exposure))continue;
    const master=mlkMaster.get(key); assert.ok(master,"MLK master missing for positive "+productId+"/"+key+"/"+entity);
    assert.ok(Object.prototype.hasOwnProperty.call(master,"masterLimit") && Number.isFinite(Number(master.masterLimit)),"MLK limit not configured for "+key+"/"+entity);
  }
}

for(const r of E2E_DUMMY_PRODUCT_DATA["Nominal Pertanggungan"]||[]){
  const d=r.data||{},exp=n(d["Nominal Pertanggungan 2025 (Rp Juta)"]); if(!positive(exp))continue;
  const master=(E2E_MASTER_DATA.CIL||[]).find(m=>String(m.name||"").trim().toLowerCase()===String(d["Perusahaan Asuransi"]||"").trim().toLowerCase());
  assert.ok(master,"CIL master missing for positive exposure "+r.meta?.recordId);
  assert.ok(Object.prototype.hasOwnProperty.call(master.eils||{},String(d.Entitas||"").trim()),"CIL EIL missing for positive exposure "+r.meta?.recordId);
}

const universalLpgScopes=["Bankwide","Region I","Region II","Region III","Region IV","Region V","Region VI","Region VII","Region VIII","Region IX","Region X","Region XI","Region XII","KP + OVS"];
for(const master of E2E_MASTER_DATA.LPG||[]){
  for(const scope of universalLpgScopes){
    const limit=master.limits?.[scope], exposureRecords=[];
    for(const productId of ["CASHLOAN","NON CASH LOAN"]){
      for(const r of E2E_DUMMY_PRODUCT_DATA[productId]||[]){
        const d=r.data||{},key=String(d.ecosystem_lpg||"")+"|"+String(d.segmen_lpg||"").replace(/^Sme$/i,"SME");
        if(key!==master.key||String(d.region_lpg||"")!==scope)continue;
        const exp=productId==="CASHLOAN"?n(d.total_bade):n(d.EQVIDR)/1e6; if(positive(exp))exposureRecords.push(exp);
      }
    }
    const exposure=exposureRecords.reduce((s,v)=>s+v,0);
    if(positive(exposure))assert.ok(Object.prototype.hasOwnProperty.call(master.limits||{},scope)&&Number.isFinite(Number(limit)),"LPG limit missing for positive exposure "+master.key+"/"+scope);
  }
}
for(const r of E2E_MASTER_DATA.MLK||[]){ if(r.entity!==null&&r.entity!==undefined) assert.ok(E2E_MLK_ENTITY_SCOPE.includes(r.entity),"MLK master "+r.key+" uses an entity outside confirmed MLK scope"); const vals=[r.clLimit,r.nclLimit,r.treasuryLine]; if(vals.every(v=>v!==null&&v!==undefined&&v!=="")) { const expected=Number(r.clLimit)+Number(r.nclLimit)+Number(r.treasuryLine); const actual=r.totalLimitExisting===null||r.totalLimitExisting===undefined||r.totalLimitExisting===""?expected:r.totalLimitExisting; near(actual,expected,"MLK facility limit does not reconcile for "+r.key); } }
const lpgScopes=["Bankwide","Region I","Region II","Region III","Region IV","Region V","Region VI","Region VII","Region VIII","Region IX","Region X","Region XI","Region XII","KP + OVS"];
for(const r of E2E_MASTER_DATA.LPG||[]){ for(const scope of lpgScopes) assert.ok(Object.prototype.hasOwnProperty.call(r.limits||{},scope),"LPG "+r.key+" missing scope "+scope); const regionSum=lpgScopes.filter(s=>s.startsWith("Region ")).reduce((s,scope)=>s+(Number(r.limits?.[scope])||0),0); near(r.limits.Bankwide,regionSum+(Number(r.limits?.["KP + OVS"])||0),"LPG Bankwide must reconcile for "+r.key); }
const lpgKeys=new Set((E2E_MASTER_DATA.LPG||[]).map(r=>r.key));
let lpgRecords=0;
for(const productId of ["CASHLOAN","NON CASH LOAN"]){ for(const r of E2E_DUMMY_PRODUCT_DATA[productId]||[]){ const d=r.data||{}; if(d.ecosystem_lpg||d.segmen_lpg||d.region_lpg){ assert.ok(d.ecosystem_lpg&&d.segmen_lpg&&d.region_lpg,"Incomplete LPG classification on "+productId+"/"+(r.meta?.recordId||"unknown")); assert.ok(lpgKeys.has(d.ecosystem_lpg+"|"+d.segmen_lpg),"LPG source classification has no matching master: "+d.ecosystem_lpg+"|"+d.segmen_lpg); lpgRecords++; } } }

let numericChecks=0;
const numericNear=(a,b,msg,tol=1)=>{ numericChecks++; assert.ok(Number.isFinite(Number(a))&&Number.isFinite(Number(b)),msg+" must be numeric"); assert.ok(Math.abs(Number(a)-Number(b))<=tol,msg+" (actual="+a+", expected="+b+")"); };

// Product-level numeric reconciliation.
for(const r of E2E_DUMMY_PRODUCT_DATA["NON CASH LOAN"]||[]){
  const d=r.data||{}, amount=Number(d.AMOUNT), fx=Number(d.EXCHANGERT), eq=Number(d.EQVIDR);
  if(amount>0&&fx>0&&eq>0) numericNear(amount*fx,eq,"NCL AMOUNT × EXCHANGERT = EQVIDR",1.01);
}
for(const r of E2E_DUMMY_PRODUCT_DATA.BONDS||[]){
  const d=r.data||{}, amount=Number(d.Amount), eq=Number(d["Amount Eq. IDR Juta"]);
  if(amount>0&&eq>0) numericNear(amount/1000000,eq,"Bonds Amount / 1,000,000 = Amount Eq. IDR Juta",0.01);
}
for(const r of E2E_DUMMY_PRODUCT_DATA.NOSTRO||[]){
  const d=r.data||{}, bal=Number(d.Balance), fx=Number(d["FX Rate to IDR"]), idr=Number(d["Balance IDR"]);
  if(bal>0&&fx>0&&idr>0) numericNear(bal*fx,idr,"Nostro Balance × FX = Balance IDR",0.01);
}
for(const r of E2E_DUMMY_PRODUCT_DATA["Nominal Pertanggungan"]||[]){
  const d=r.data||{}, amount=Number(d["Nominal Pertanggungan 2025 (Rp Juta)"]), eil=Number(d["EIL Entitas (Rp Juta)"]);
  const u=String(d["Utilisasi EIL (%)"]||"").replace("%","");
  if(amount>=0&&eil>0&&u!=="") numericNear(Number(u),amount/eil*100,"CIL Utilisasi EIL",0.01);
}

console.log("[LIMAS AUDIT] PASS • Country="+(E2E_MASTER_DATA.Country||[]).length+" • CCL="+(E2E_MASTER_DATA.CCL||[]).length+" • MLK="+(E2E_MASTER_DATA.MLK||[]).length+" • CIL="+(E2E_MASTER_DATA.CIL||[]).length+" • LPG="+(E2E_MASTER_DATA.LPG||[]).length+" • LPG classified source records="+lpgRecords+" • numeric checks="+numericChecks);