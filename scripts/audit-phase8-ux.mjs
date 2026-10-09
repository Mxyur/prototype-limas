import {readFile} from "node:fs/promises";

const app = await readFile("src/productFinal/ProductFinalApp.jsx", "utf8");
const css = await readFile("src/productFinal/productFinal.css", "utf8");
const copy = await readFile("src/productFinal/productFinalCopy.js", "utf8");
const actionRules = await readFile("src/productFinal/productFinalLimitActionRules.js", "utf8");

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

// 8A — Information Architecture
assert((app.match(/id:"(home|monitoring|limits|reports|governance)"/g)||[]).length === 5, "Primary navigation must contain exactly five operational areas.");
assert(!app.includes('id:"products"'), "Product Universe must not be a primary navigation item.");
assert(app.includes('"productUniverse","Product Universe"'), "Product Universe must be inside Governance.");
assert(app.includes('["overview","Overview"],["structure","Limit Structure"],["allocation","Allocation"],["actions","Limit Actions"],["history","History"]'), "Limit Management IA must not contain a duplicate Monitoring tab.");
assert(!app.includes('["monitoring","Monitoring"]'), "Limit Management must not expose a Monitoring tab.");

// 8B — Visual language / product tone
for (const marker of [
  "premium", "enterprise", "pf-card", "pf-table", "pf-status-badge",
  ".pf-button-primary", ".pf-button-secondary", "pf-empty-state",
  "pf-detail-workspace", "pf-report-catalog", "pf-report-inline-filters"
]) assert(css.toLowerCase().includes(marker.toLowerCase()) || app.includes(marker), `Visual system marker missing: ${marker}`);
assert(!app.includes("Selected Report"), "Report header clutter returned.");
assert(!app.includes("Configured Fields"), "Report header field-count clutter returned.");
assert(!app.includes("pf-report-meta"), "Report metadata strip returned.");
assert(!app.includes("function BarChart"), "Legacy dashboard chart component returned.");
assert(!app.includes("function HorizontalBarChart"), "Legacy dashboard chart component returned.");
assert(!app.includes("function DonutChart"), "Legacy dashboard chart component returned.");

// 8C — Decision dashboard
for (const marker of ["Bankwide Limit Position", "Total Limit", "Utilization", "Available", "Breach", "Near Breach", "Pending Actions", "Awaiting Effective", "LIMIT HEALTH", "PRIORITY", "MANAGEMENT FOCUS", "Governance"]) {
  assert(app.includes(marker), `Dashboard marker missing: ${marker}`);
}

// 8D — Scalability / investigation primitives
for (const marker of ["Search monitored objects", "Search report records", "GridPager", "pageSize", "sortKey", "setSortKey", "pf-detail-workspace", "Underlying utilization"]) {
  assert(app.includes(marker), `Scalability/investigation marker missing: ${marker}`);
}
assert(!app.includes("slice(0,7)"), "Report column truncation regression detected.");

// 8E / 8F / 8G — Limit management, action and governance
for (const marker of ["MASTER OBJECT DETAIL", "READ ONLY · CORE SYSTEM", "SOURCE REFERENCE", "LIMIT ACTIONS", "GOVERNANCE WORKFLOW", "Audit trail", "Before", "Proposed / After", "Committee Reference"]) {
  assert(app.includes(marker), `Limit governance marker missing: ${marker}`);
}
for (const marker of ["Country Capacity Action", "CCL / Contractual Action", "MLK Group Action", "CIL Structural Action", "LPG Appetite Action"]) {
  assert(app.includes(marker), `Universe-specific Limit Action marker missing: ${marker}`);
}
assert(actionRules.includes("same Group Usaha"), "MLK switching same-group rule missing.");
assert(actionRules.includes("CIT and CIL") || app.includes("CIT and CIL are derived/read-only"), "CIL derived-value guard missing.");

// 8H — detail workspace
assert(app.includes("DETAIL WORKSPACE"), "Full detail workspace marker missing.");
assert(app.includes("View canonical master fields"), "Progressive disclosure for canonical detail missing.");

// 8I — Reports / Governance
for (const marker of ["REPORT CATALOG", "Report Data", "Lineage", "productUniverse", "Data Quality Register", "Product Data Dictionary", "LPG E2E Classification Lineage"]) {
  assert(app.includes(marker), `Reports/Governance marker missing: ${marker}`);
}
assert(app.includes('productFinalAction("secondary","exportCsv")'), "Reports CSV export marker missing.");
assert(!app.includes("Reports → Filters"), "Reports Filters should remain contextual, not a navigation workspace.");

// 8J — mature states and desktop behavior
for (const marker of ["No priority risks", "Monitoring snapshot unavailable", "No action requests", "Report unavailable"]) {
  assert(app.includes(marker) || copy.includes(marker), `Contextual state missing: ${marker}`);
}
assert(css.includes("@media(max-width:900px)") && css.includes("@media(max-width:760px)") && css.includes("@media(max-width:480px)"), "Responsive desktop/mobile breakpoints missing.");

// Business-truth safety markers.
assert(app.includes("Canonical snapshot"), "Canonical snapshot transparency missing.");
assert(app.includes("authoritative Master Limit remains read-only"), "Master Limit read-only wording missing.");
assert(!app.includes("Edit Master Limit"), "Direct Master Limit edit wording detected.");
assert(!app.includes("Update Master Limit"), "Direct Master Limit update wording detected.");

if (failures.length) {
  console.error("PHASE 8 UX AUDIT — FAIL");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("PHASE 8 UX AUDIT — PASS");
console.log("8A IA + 8B visual system + 8C dashboard + 8D scalability + 8E/8F/8G limit workflow + 8H detail + 8I reports/governance + 8J state/responsive markers verified.");
