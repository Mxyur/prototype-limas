import {readFile} from "node:fs/promises";

const app=await readFile("src/productFinal/ProductFinalApp.jsx","utf8");
const contract=await readFile("src/productFinal/productFinalDimensionContract.js","utf8");

const requiredUniverses=["Country","CCL","MLK","CIL","LPG"];
const requiredAppMarkers=[
  'from "./productFinalDimensionContract"',
  "function UniversePath",
  "function AllocationTable",
  "function MonitoringDetail",
  "function MonitoringView",
  "function LimitsView",
  "function LimitActionSimulation",
  "function ReportsView",
  "function GovernanceView",
  "Drill down",
  "Underlying Utilization",
  "FULL COLUMN MODE",
  "SIMULATION ONLY",
  "function BarChart",
  "function HorizontalBarChart",
  "function DonutChart",
  "pf-reference-kpis",
  "pf-reference-action",
  "Executive Overview"
];
const failures=[];
const assert=(ok,msg)=>{if(!ok)failures.push(msg)};

for(const universe of requiredUniverses){
  assert(contract.includes(universe+":"),"Dimension contract missing universe: "+universe);
}
assert(contract.includes('"Domestic / Overseas"'),"Country Domestic / Overseas path missing.");
assert(contract.includes('"Region / KP + OVS"'),"LPG regional scope path missing.");
assert(contract.includes('"Holding / Group"'),"MLK group path missing.");
assert(contract.includes('"Nominal Pertanggungan / EIL"'),"CIL detail path missing.");
assert(contract.includes('"Direct / Indirect Scope"'),"CCL scope path missing.");

for(const marker of requiredAppMarkers)assert(app.includes(marker),"Product Final UI marker missing: "+marker);
assert(!app.includes("slice(0,7)"),"Legacy report seven-column truncation still present.");
assert(!app.includes("showLimitActionSimulation"),"Legacy broken 8F state marker still present.");
assert(!app.includes("</section>>"),"Known malformed JSX closing tag still present.");
assert(!app.includes("fileURLToPath(import.meta.url)"),"Offline staging path helper leaked into production source.");
assert(app.includes("columns.map(([label,key])"),"Report full-column rendering is missing.");
assert(app.includes("allocation={structureRow?.allocation||[]}"),"Monitoring drill-down is not wired to canonical allocation.");
assert(app.includes("Master Limit remains read-only")||app.includes("Master Limit is read-only"),"Canonical Master Limit boundary is not declared in UI.");

if(failures.length){
  console.error("PRODUCT-FINAL UI AUDIT — FAIL");
  for(const failure of failures)console.error(" - "+failure);
  process.exit(1);
}
console.log("PRODUCT-FINAL UI AUDIT — PASS");
console.log("Universes: "+requiredUniverses.join(", "));
console.log("Drill-down, full-column reports, governance and simulation markers verified.");