// LIMAS Product Final — Limit Action workspace contract.
// Presentation/workflow contract only. No canonical master mutation or business calculation.

export const PRODUCT_FINAL_LIMIT_ACTION_CONTRACT = {
  Country: {
    targetLabel: "Country Capacity",
    managedLevels: ["Country Capacity", "Domestic / Overseas", "Product", "Product Domestic / Overseas"],
    note: "Country allocation follows the approved Country Capacity structure. Domestic/Overseas and product allocation remain explicit management layers."
  },
  CCL: {
    targetLabel: "Counterparty Bank / Swift",
    managedLevels: ["Counterparty", "Direct / Indirect", "Entity Scope", "CCL", "Contractual Limit"],
    note: "CCL and Contractual Limit remain separate approved values. The action record captures the requested change without mutating either canonical value."
  },
  MLK: {
    targetLabel: "Group Usaha",
    managedLevels: ["Group Limit", "Member / Entity Limit", "CIF", "Product / Facility"],
    note: "Group monitoring is the primary view. Switching or allocation requests must remain within the same Group Usaha."
  },
  CIL: {
    targetLabel: "Insurance Company",
    managedLevels: ["IC", "Multiplier", "EIL per Entity"],
    derivedLevels: ["CIT", "CIL"],
    note: "IC, Multiplier and EIL are managed inputs/reference values. CIT and CIL remain derived values and are not directly edited here."
  },
  LPG: {
    targetLabel: "Ecosystem LPG / Sector",
    managedLevels: ["Ecosystem", "Segment", "Region / Scope", "IC Wilayah Segmen", "Limit Bucket"],
    note: "Region is a required LPG limit dimension. The action record must retain the resolved classification/scope context."
  }
};

export const PRODUCT_FINAL_LIMIT_ACTION_LIFECYCLE = [
  "CREATED",
  "SUBMITTED",
  "REVIEWED",
  "APPROVED",
  "EFFECTIVE",
  "SYNCED"
];

export const PRODUCT_FINAL_LIMIT_ACTION_TERMINAL = ["REJECTED"];
