import {readFile} from "node:fs/promises";
const app = await readFile("src/productFinal/ProductFinalApp.jsx", "utf8");
const contract = await readFile("src/productFinal/productFinalDimensionContract.js", "utf8");
const reportContract = await readFile("src/productFinal/productFinalReportContract.js", "utf8");
const actionContract = await readFile("src/productFinal/productFinalLimitActionContract.js", "utf8");
const actionRules = await readFile("src/productFinal/productFinalLimitActionRules.js", "utf8");
const universes = ["Country", "CCL", "MLK", "CIL", "LPG"];
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
for (const universe of universes) {
  assert(contract.includes(`${universe}:`), `Dimension contract missing universe: ${universe}`);
  assert(actionContract.includes(`${universe}:`), `Limit Action contract missing universe: ${universe}`);
}
for (const group of universes) {
  assert(reportContract.includes(`key: "${group}"`), `Report group missing: ${group}`);
}
for (const marker of [
  'from "./productFinalDimensionContract"',
  'from "./productFinalCopy"',
  'from "./productFinalActionContract"',
  'from "./productFinalReportContract"',
  'from "./productFinalLimitActionContract"',
  'from "./productFinalLimitActionRules"',
  "function UniversePath",
  "function AllocationTable",
  "function MonitoringDetail",
  "function MonitoringView",
  "function LimitsView",
  "function LimitActionWorkspace",
  "function ReportsView",
  "function GovernanceView",
  "function Dashboard",
  "function LineTrendChart",
  "function AnalyticsCard",
  "pf-detail-workspace",
  "pf-action-queue",
  "pf-report-catalog",
  "REPORT CATALOG",
  "FULL COLUMN MODE",
  'data-report-mode="FULL COLUMN MODE"',
  "Country Capacity Action",
  "CCL / Contractual Action",
  "MLK Group Action",
  "CIL Structural Action",
  "LPG Appetite Action",
  "Selected Group Usaha:",
  "Drill down",
  "Underlying utilization",
  "actions=[]",
  "onCreateAction",
  "onTransition",
  "LIMIT_ACTION_TRANSITIONS",
  "validateLimitAction",
  "buildLimitActionAfter",
  "productFinalAction(\"primary\",\"proposeLimitAction\")",
  "productFinalAction(\"primary\",\"openMonitoring\")",
  "productFinalAction(\"secondary\",\"viewStructure\")",

  "productFinalAction(\"secondary\",\"viewMonitoring\")",
  "pf-domain-health-list",
  "pf-exception-list",
  "Governance control center",
  "Product Universe",
  "Canonical snapshot",
  "Master Limit remains unchanged",
  "Domestic + Overseas allocation cannot exceed the proposed Country Capacity",
  "CCL and Contractual Limit remain separate approved values",
  "MLK switching donor and recipient must remain within the selected Group Usaha.",
  "CIT and CIL are derived/read-only",
  "Region and IC Wilayah Segmen are mandatory classification context for LPG action"
]) {
  assert(app.includes(marker), `Product Final UI marker missing: ${marker}`);
}
assert(actionRules.includes("CREATED: [\"SUBMITTED\"]"), "Limit Action transition CREATED → SUBMITTED missing.");
assert(actionRules.includes("SUBMITTED: [\"REVIEWED\", \"REJECTED\"]"), "Limit Action transition SUBMITTED → REVIEWED/REJECTED missing.");
assert(actionRules.includes("REVIEWED: [\"APPROVED\", \"REJECTED\"]"), "Limit Action transition REVIEWED → APPROVED/REJECTED missing.");
assert(actionRules.includes("APPROVED: [\"EFFECTIVE\"]"), "Limit Action transition APPROVED → EFFECTIVE missing.");
assert(actionRules.includes("EFFECTIVE: [\"SYNCED\"]"), "Limit Action transition EFFECTIVE → SYNCED missing.");
// Locked business/IA boundaries.
assert(!app.includes('id:"products"'), "Product Universe must not remain as an operational sidebar item.");
assert(!app.includes('label:"Product Universe"'), "Product Universe must not be a primary sidebar label.");
assert(!app.includes('"Monitoring","Monitoring"'), "Limit Management must not introduce a duplicate Monitoring tab.");
assert(!app.includes('reports.sections.filters'), "Reports Filters must remain contextual, not a workspace tab.");
assert(!app.includes("function LimitActionSimulation"), "Legacy LimitActionSimulation component still present.");
assert(!app.includes("SIMULATION ONLY"), "Legacy simulation-only Limit Action wording still present.");
assert(!app.includes("Limit Action Simulation"), "Legacy simulation wording still present.");
assert(!app.includes("slice(0,7)"), "Legacy report seven-column truncation still present.");
assert(!app.includes("pf-report-meta"), "Reports source/scope/mode metadata strip should not crowd the operational header.");
assert(!app.includes("Selected Report"), "Selected Report widget should not return to the report header.");
assert(!app.includes("Configured Fields"), "Configured Fields widget should remain secondary metadata.");
assert(!app.includes("function BarChart"), "Legacy BarChart component should not return.");
assert(!app.includes("function HorizontalBarChart"), "Legacy HorizontalBarChart component should not return.");
assert(!app.includes("function DonutChart"), "Legacy DonutChart component should not return.");
assert(!app.includes("Where management attention is concentrated"), "Legacy verbose dashboard copy should be removed.");
assert(!app.includes("Across monitored universes"), "Deprecated synthetic bankwide exposure wording remains.");
assert(!app.includes("fileURLToPath(import.meta.url)"), "Offline staging path helper leaked into production source.");
// Reports IA and full-column rendering.
assert(reportContract.includes('CCL_DIRECT", "CCL_INDIRECT", "CCL'), "CCL grouped report variants missing.");
assert(reportContract.includes('MLK", "MLK_CONSOLIDATED'), "MLK grouped report variants missing.");
assert(app.includes("group.reportTypes.map(reportType"), "Grouped report catalog rendering missing.");
assert(app.includes("columns.map(([label,key])"), "Full-column report rendering missing.");
assert(app.includes("Report Data"), "Report Data workspace missing.");
assert(app.includes("Lineage"), "Report Lineage workspace missing.");
assert(app.includes('productFinalAction("secondary","exportCsv")'), "CSV export capability missing.");
// Governance / Product Universe placement.
assert(app.includes('"productUniverse","Product Universe"'), "Product Universe must be available inside Governance.");
assert(app.includes("Data Quality Register"), "Governance DQ register missing.");
assert(app.includes("LPG E2E Classification Lineage"), "LPG lineage view missing.");
// Dashboard quality / reduction.
for (const marker of ["Total Limit", "Utilization", "Available", "Breach", "Near Breach", "Pending Actions", "Awaiting Effective"]) assert(app.includes(marker), `Dashboard decision/attention marker missing: ${marker}`);
assert(app.includes("LIMIT HEALTH"), "Limit health surface missing.");
assert(app.includes("MANAGEMENT FOCUS"), "Management Focus surface missing.");
assert(app.includes("GOVERNANCE STATUS"), "Compact governance signal missing.");
if (failures.length) {
  console.error("PRODUCT-FINAL UI AUDIT — FAIL");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("PRODUCT-FINAL UI AUDIT — PASS");
console.log("Universes: " + universes.join(", "));
console.log("IA, widget reduction, grouped reports, drill-down, full-column reports, governance and five-universe Limit Action markers verified.");
