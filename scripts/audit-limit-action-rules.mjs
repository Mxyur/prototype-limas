import {validateLimitAction, buildLimitActionAfter, LIMIT_ACTION_TRANSITIONS} from "../src/productFinal/productFinalLimitActionRules.js";

const base = {
  selectedObject: {key:"OBJ-001", name:"Sample Object", group:"GROUP-A", limit:100, exposure:60, available:40, utilization:.6, status:"Normal", contractual:75},
  proposedAction: "Management adjustment",
  proposedLimit: "120",
  effectiveDate: "2026-12-31",
  reason: "Committee-approved management basis",
  committeeRef: "MC-2026-004",
  currentLimit: 100,
  currentExposure: 60,
  currentAvailable: 40,
  currentUtilization: .6,
  currentStatus: "Normal",
};

const cases = [
  ["Country valid", {...base, domain:"Country", actionLevel:"COUNTRY_CAPACITY", countryDomestic:"60", countryOverseas:"40"}, true],
  ["Country product valid", {...base, domain:"Country", actionLevel:"PRODUCT", countryDomestic:"50", countryOverseas:"40", countryProduct:"Cash Loan"}, true],
  ["Country invalid allocation", {...base, domain:"Country", actionLevel:"COUNTRY_CAPACITY", countryDomestic:"100", countryOverseas:"50"}, false],
  ["CCL valid", {...base, domain:"CCL", cclLayer:"CCL", cclDirection:"Direct", cclEntityScope:"BMRI", proposedCcl:"120"}, true],
  ["CCL missing scope", {...base, domain:"CCL", cclLayer:"CCL", cclDirection:"", cclEntityScope:"BMRI", proposedCcl:"120"}, false],
  ["CCL contractual valid", {...base, domain:"CCL", cclLayer:"CONTRACTUAL", cclDirection:"Indirect", cclEntityScope:"MMI", proposedContractual:"80"}, true],
  ["CCL contractual missing value", {...base, domain:"CCL", cclLayer:"CONTRACTUAL", cclDirection:"Indirect", cclEntityScope:"MMI", proposedContractual:""}, false],
  ["MLK limit change valid", {...base, domain:"MLK", mlkMode:"LIMIT_CHANGE", proposedLimit:"125"}, true],
  ["MLK switching valid", {...base, domain:"MLK", mlkMode:"SWITCHING", donorKey:"D1", recipientKey:"R1", switchingAmount:"10", rowsInGroup:[{key:"D1"},{key:"R1"}]}, true],
  ["MLK group breach valid", {...base, domain:"MLK", mlkMode:"GROUP_BREACH", targetMemberKey:"M1", memberUplift:"20", rowsInGroup:[{key:"M1",group:"GROUP-A"},{key:"M2",group:"GROUP-A"}]}, true],
  ["MLK switching cross-group", {...base, domain:"MLK", mlkMode:"SWITCHING", donorKey:"D1", recipientKey:"R1", switchingAmount:"10", rowsInGroup:[{key:"D1",group:"GROUP-A"}]}, false],
  ["CIL valid input", {...base, domain:"CIL", cilInput:{ic:"100", multiplier:"1.2", eil:"80"}}, true],
  ["CIL empty input", {...base, domain:"CIL", cilInput:{ic:"", multiplier:"", eil:""}}, false],
  ["LPG regional valid", {...base, domain:"LPG", lpgScope:"Regional", lpgSegment:"ENERGI", lpgRegion:"R01", lpgIcSegwil:"ENERGI-R01", lpgBucket:"APP-01", lpgProduct:"Cash Loan"}, true],
  ["LPG bankwide valid", {...base, domain:"LPG", lpgScope:"Bankwide", lpgSegment:"ENERGI", lpgRegion:"Bankwide", lpgIcSegwil:"ENERGI-BANKWIDE", lpgBucket:"APP-01", lpgProduct:"Cash Loan"}, true],
  ["LPG missing scope value", {...base, domain:"LPG", lpgScope:"Bankwide", lpgSegment:"ENERGI", lpgRegion:"", lpgIcSegwil:"ENERGI-BANKWIDE", lpgBucket:"APP-01", lpgProduct:"Cash Loan"}, false],
  ["LPG missing classification", {...base, domain:"LPG", lpgScope:"Regional", lpgSegment:"ENERGI", lpgRegion:"R01", lpgIcSegwil:"", lpgBucket:"APP-01", lpgProduct:"Cash Loan"}, false],
];

const failures = [];
for (const [name,draft,expected] of cases) {
  const result = validateLimitAction(draft);
  if (result.ok !== expected) failures.push(`${name}: expected ok=${expected}, got ${result.ok} (${result.message||""})`);
  if (result.ok) {
    const after = buildLimitActionAfter({...draft, ...result});
    if (!after || typeof after !== "object") failures.push(`${name}: after-state was not built.`);
    if (name === "Country valid" && after.limit !== 120) failures.push(`${name}: proposed Country Capacity was not retained in after-state.`);
    if (name === "CCL contractual valid" && after.limit !== 80) failures.push(`${name}: proposed Contractual Limit did not become the action after-value.`);
    if (name === "MLK limit change valid" && after.limit !== 125) failures.push(`${name}: proposed MLK Group Limit was not retained in after-state.`);
    if (name === "MLK switching valid" && after.switchingAmount !== 10) failures.push(`${name}: switching amount was not retained in after-state.`);
    if (name === "MLK group breach valid" && after.projectionStatus !== "PENDING_CANONICAL_RECALC") failures.push(`${name}: group breach must remain explicitly pending canonical recalculation.`);
    if (name === "LPG regional valid" && after.limit !== 120) failures.push(`${name}: proposed LPG appetite value was not retained in after-state.`);
  }
}

const transitionExpectations = {
  CREATED:["SUBMITTED"],
  SUBMITTED:["REVIEWED","REJECTED"],
  REVIEWED:["APPROVED","REJECTED"],
  APPROVED:["EFFECTIVE"],
  EFFECTIVE:["SYNCED"],
  SYNCED:[],
  REJECTED:["CREATED"],
};
for (const [state,expected] of Object.entries(transitionExpectations)) {
  if (JSON.stringify(LIMIT_ACTION_TRANSITIONS[state]||[]) !== JSON.stringify(expected)) failures.push(`Transition mismatch for ${state}.`);
}

if (failures.length) {
  console.error("LIMIT ACTION RULE AUDIT — FAIL");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("LIMIT ACTION RULE AUDIT — PASS");
console.log(`Validated ${cases.length} universe workflow scenarios + ${Object.keys(transitionExpectations).length} lifecycle states.`);
