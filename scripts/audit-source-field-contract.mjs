import { PRODUCT_SOURCE_SCHEMA_OVERRIDES, PRODUCT_DERIVED_FIELDS_FORBIDDEN } from "../src/productSchemaGovernance.js";
import { E2E_DUMMY_PRODUCT_DATA, E2E_DUMMY_META } from "../src/e2eDummyData.js";
import mainSourceFs from "node:fs";

const failures=[];
const check=(name,fn)=>{try{fn();console.log("✓",name);}catch(e){failures.push({name,message:e.message});console.error("✗",name,e.message);}};
const expect=(cond,msg)=>{if(!cond)throw new Error(msg);};

const lockedCashLoan=[
  "no_cus","nm_cus","kd_cab","nm_cab","no_rek","gas_reporting","buc_reporting","jns_krd","src","j_guna","revolv","bilokj","total_limit","total_bade","project_location","code","MatDate/Jatem","ecosystem_lpg","segmen_lpg","region_lpg"
];
const mainSource=mainSourceFs.readFileSync(new URL("../src/main.jsx",import.meta.url),"utf8");
const sourceMatch=mainSource.match(/const productFields=(\{.*\});/);
if(!sourceMatch)throw new Error("Could not locate productFields source registry in main.jsx");
const declaredProductFields=Function("return ("+sourceMatch[1]+")")();
const sourceSchema={
  ...declaredProductFields,
  ...PRODUCT_SOURCE_SCHEMA_OVERRIDES,
  "CREDIT LINE":PRODUCT_SOURCE_SCHEMA_OVERRIDES["CREDIT LINE"]||declaredProductFields["COMMERCIAL LINE (CRDT)"],
};

check("Cash Loan locked source vocabulary is present",()=>{
  const actual=new Set(sourceSchema.CASHLOAN||[]);
  const missing=lockedCashLoan.filter(x=>!actual.has(x));
  expect(!missing.length,"Missing locked Cash Loan fields: "+missing.join(", "));
});

check("Existing Cash Loan operational field is preserved",()=>{
  expect((sourceSchema.CASHLOAN||[]).includes("unit_pengelola"),"unit_pengelola is missing from Cash Loan source schema");
});

check("Governed source schema covers raw E2E Product fields",()=>{
  for(const [productId,specs] of Object.entries(E2E_DUMMY_PRODUCT_DATA||{})){
    const allowed=new Set(sourceSchema[productId]||Object.keys(specs?.[0]?.data||{}));
    const missing=[];
    for(const spec of specs||[]) for(const field of Object.keys(spec.data||{})) if(!allowed.has(field)) missing.push(productId+"."+field);
    expect(!missing.length,"Unregistered raw source fields: "+missing.slice(0,20).join(", "));
  }
});

check("Raw E2E Product records contain no forbidden derived fields",()=>{
  for(const [productId,specs] of Object.entries(E2E_DUMMY_PRODUCT_DATA||{})){
    const forbidden=new Set(PRODUCT_DERIVED_FIELDS_FORBIDDEN[productId]||[]);
    for(const spec of specs||[]){
      for(const field of Object.keys(spec.data||{})) expect(!forbidden.has(field),`${productId} contains forbidden raw field ${field}`);
    }
  }
});

check("Product DB fixture is source-only for the MLK Treasury source",()=>{
  expect(!(E2E_DUMMY_PRODUCT_DATA["CREDIT LINE"]||[]).some(r=>String(r.meta?.recordId||"").startsWith("TL-MLK-")),"MLK Treasury rows must not be duplicated into raw Credit Line Product DB");
});

check("As-of metadata exists for reproducible source snapshot",()=>{
  expect(E2E_DUMMY_META?.asOfDate,"E2E_DUMMY_META.asOfDate is missing");
});

if(failures.length){
  console.error(`SOURCE FIELD CONTRACT FAIL: ${failures.length}`);
  process.exit(1);
}
console.log("SOURCE FIELD CONTRACT PASS");
