import fs from "node:fs";

const source=fs.readFileSync(new URL("../src/main.jsx",import.meta.url),"utf8");

const required=[
  'import.meta.env?.VITE_LIMAS_RUNTIME_MODE',
  'import.meta.env?.DEV ? "E2E" : "PRODUCTION_SAMPLE"',
  'if(ACTIVE_SAMPLE_RUNTIME){',
  'Object.entries(E2E_MASTER_DATA).forEach',
  'Object.entries(E2E_DUMMY_PRODUCT_DATA).forEach',
  'initializeRuntimeDataset();',
  'if(IS_PRODUCTION_RUNTIME&&RUNTIME_FIXTURE_LEAKS.length)'
];
for(const token of required){
  if(!source.includes(token))throw new Error("Missing production runtime guard: "+token);
}

const forbiddenProductionCall=/installE2EDummyDataset\s*\(/;
if(forbiddenProductionCall.test(source))throw new Error("Legacy unconditional installE2EDummyDataset() still exists.");

const fixtureImportMatch=source.match(/import\s*\{([^}]+)\}\s*from\s*["']\.\/e2eDummyData["']/);
if(!fixtureImportMatch)throw new Error("E2E fixture import block not found.");

const fixtureAliases=[
  "E2E_MASTER_DATA_FIXTURE",
  "E2E_DUMMY_PRODUCT_DATA_FIXTURE",
  "E2E_ENTITY_MASTER_FIXTURE",
  "E2E_MLK_ENTITY_SCOPE_FIXTURE",
  "E2E_CCL_ENTITY_SCOPE_FIXTURE",
  "E2E_CCL_LIMIT_SCOPE_FIXTURE"
];
for(const token of fixtureAliases){
  if(!source.includes(token))throw new Error("Missing fixture alias: "+token);
}

if(!source.includes('PRODUCTION_SAMPLE'))throw new Error("Production sample runtime mode is missing.");
console.log("PASS: production runtime fixture isolation + sample guards are present.");
