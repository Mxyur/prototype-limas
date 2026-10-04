import assert from "node:assert/strict";
import { E2E_MASTER_DATA, E2E_DUMMY_PRODUCT_DATA, E2E_COUNTRY_MONITORING_POLICY, E2E_ENTITY_MASTER, E2E_MLK_ENTITY_SCOPE, E2E_CCL_ENTITY_SCOPE, E2E_CCL_LIMIT_SCOPE } from "../src/e2eDummyData.js";
const EPS=0.01;
const near=(a,b,msg)=>assert.ok(Math.abs(Number(a)-Number(b))<=EPS,msg+" (actual="+a+", expected="+b+")");
const entityCodes=new Set(E2E_ENTITY_MASTER.map(x=>x.entityCode));
assert.deepEqual(E2E_MLK_ENTITY_SCOPE,["BMEL","BMRI"],"MLK scope must follow the confirmed entity universe: BMEL + BMRI");
const cclScope=new Map(E2E_CCL_ENTITY_SCOPE.map(x=>[x.entityCode,x]));
console.log("[LIMAS AUDIT] starting E2E invariant audit");
for(const code of E2E_COUNTRY_MONITORING_POLICY.excludedCountryCodes){ assert.ok(!(E2E_MASTER_DATA.Country||[]).some(r=>String(r.key).toUpperCase()===String(code).toUpperCase()),"Excluded Country Code "+code+" must not exist in Country Master"); }
for(const r of E2E_MASTER_DATA.Country||[]){ const d=r.capacityDistribution||{}; if(d.domesticLimit!==null&&d.overseasLimit!==null) near(r.capacityLimit,Number(d.domesticLimit)+Number(d.overseasLimit),"Country capacity split must reconcile for "+r.key); const p=r.productAllocations||{}; const allocated=Object.values(p).reduce((s,x)=>s+(Number(x?.total)||0),0); near(r.capacityLimit,allocated,"Country product allocation must reconcile for "+r.key); for(const [product,x] of Object.entries(p)){ if(x.domesticLimit!==null&&x.overseasLimit!==null) near(x.total,Number(x.domesticLimit)+Number(x.overseasLimit),"Country product split must reconcile for "+r.key+"/"+product); }}
for(const code of E2E_MLK_ENTITY_SCOPE) assert.ok(entityCodes.has(code),"MLK scope entity "+code+" missing from Entity Master");
for(const s of E2E_CCL_ENTITY_SCOPE){ assert.ok(entityCodes.has(s.entityCode),"CCL scope entity "+s.entityCode+" missing from Entity Master"); assert.ok(Boolean(s.direct)||Boolean(s.indirect),"CCL scope entity "+s.entityCode+" must have Direct or Indirect applicability"); }
for(const x of E2E_CCL_LIMIT_SCOPE){ assert.ok(entityCodes.has(x.entityCode),"CCL limit references unknown entity "+x.entityCode); assert.ok(["DIRECT","INDIRECT"].includes(x.limitType),"CCL limit type invalid for "+x.counterpartyId+"/"+x.entityCode); const scope=cclScope.get(x.entityCode); assert.ok(scope && Boolean(scope[x.limitType.toLowerCase()]),"CCL limit scope not enabled for "+x.entityCode+"/"+x.limitType); near(x.facility,(Number(x.bankLoan)||0)+(Number(x.commercialLine)||0)+(Number(x.treasuryLine)||0),"CCL facility components must reconcile for "+x.counterpartyId+"/"+x.entityCode+"/"+x.limitType); }
for(const master of E2E_MASTER_DATA.CCL||[]){ const direct=E2E_CCL_LIMIT_SCOPE.filter(x=>String(x.counterpartyId)===String(master.key)&&x.limitType==="DIRECT").reduce((s,x)=>s+(Number(x.ccl)||0),0); near(master.ccl,direct,"CCL direct entity allocation must reconcile for "+master.key); }
// CCL NCL allocation rows may not carry a Swift Code in the source; CPNM is the counterparty key and must resolve to a CCL master.
for(const r of E2E_DUMMY_PRODUCT_DATA["NON CASH LOAN"]||[]){
  if(!r.meta?.cclLimitType)continue;
  const d=r.data||{};
  const swift=String(d["Swift Code"]||"").trim(),cpnm=String(d.CPNM||"").trim();
  const master=(E2E_MASTER_DATA.CCL||[]).find(m=>String(m.key).toUpperCase()===String(swift||cpnm).toUpperCase());
  assert.ok(master,"CCL NCL source reference must resolve to CCL master for "+(r.meta?.recordId||"unknown"));
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