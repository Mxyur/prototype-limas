// LIMAS Product Final — Universe-specific business dimensions.
// UI contract only: no business calculation or canonical ownership is introduced here.

export const PRODUCT_FINAL_DIMENSION_CONTRACT = {
  Country: {
    primaryDimension: "Country Capacity",
    path: ["Country Capacity", "Domestic / Overseas", "Product", "Product Domestic / Overseas", "Utilization Detail"],
    detailTitle: "Country Utilization Trace",
    fields: ["countryCode", "domesticCapacity", "overseasCapacity", "productContribution"],
    limitModel: {
      parent: "Country Capacity Limit",
      managedLevels: ["Country Capacity", "Domestic / Overseas", "Product", "Product Domestic / Overseas"],
      allocationRule: "Product Total = Domestic + Overseas",
      parentValidation: "Allocated Capacity must not exceed Country Capacity",
      workflowOwner: "Country Team / Committee"
    },
    notes: "Country Capacity is the approved appetite at country level. Domestic/Overseas and product allocations are explicit user-managed appetite layers; they are not inferred from geography alone."
  },

  CCL: {
    primaryDimension: "Counterparty Bank / Swift",
    path: ["Counterparty Bank", "Direct / Indirect Scope", "CCL / Contractual", "Entity Contribution", "Product Utilization"],
    detailTitle: "CCL Utilization Trace",
    fields: ["key", "name", "country", "category", "contractual", "productContribution"],
    limitModel: {
      parent: "Counterparty CCL",
      managedLevels: ["Counterparty", "Direct / Indirect", "Entity Scope", "CCL", "Contractual Limit"],
      allocationRule: "CCL and Contractual Limit remain separate approved values",
      parentValidation: "Entity/application scope must reconcile to configured counterparty applicability",
      workflowOwner: "Authorized CCL owner / Committee"
    },
    notes: "Direct/Indirect and entity scope remain separate business structures. CCL and Contractual Limit are distinct approved limits."
  },

  MLK: {
    primaryDimension: "Group Usaha",
    path: ["Holding / Group", "Group Limit", "Member / Entity", "CIF", "Product / Facility"],
    detailTitle: "MLK Group Utilization Trace",
    fields: ["group", "entity", "bmpkEntitas", "productContribution"],
    limitModel: {
      parent: "Group Usaha Limit",
      managedLevels: ["Group Limit", "Member / Entity Limit", "CIF", "Product / Facility"],
      allocationRule: "Member limits are allocations within the same Group Usaha",
      parentValidation: "Group monitoring is the primary management view; member switching must stay within the same Group Usaha",
      switchingRule: "Donor and recipient must belong to the same Group Usaha"
    },
    notes: "The primary monitored appetite is the Group Usaha limit. Management drills down to members/entities and CIFs. Switching is an intra-group allocation action, not a cross-group transfer."
  },

  CIL: {
    primaryDimension: "Insurance Company",
    path: ["Insurance Company", "IC", "CIT", "Nominal Pertanggungan / EIL", "CIL / Utilization Detail"],
    detailTitle: "CIL Utilization Trace",
    fields: ["insurance", "name", "productContribution"],
    limitModel: {
      parent: "Insurance Capacity",
      managedLevels: ["IC", "Multiplier", "EIL per Entity"],
      derivedLevels: ["CIT", "CIL"],
      formulas: ["CIT = IC × Multiplier", "CIL = Σ active EIL"],
      workflowOwner: "Authorized Insurance / Risk owner"
    },
    notes: "IC, Multiplier and EIL are managed inputs/reference values. CIT and CIL are derived from the approved structure and remain separately monitorable."
  },

  LPG: {
    primaryDimension: "Ecosystem LPG / Sector",
    path: ["Ecosystem", "Segment", "Region / KP + OVS", "IC Wilayah Segmen", "Limit Bucket", "CL / NCL", "Underlying Utilization"],
    detailTitle: "LPG Classification Utilization Trace",
    fields: ["sector", "segment", "region", "productContribution"],
    limitModel: {
      parent: "LPG Ecosystem Appetite",
      managedLevels: ["Ecosystem", "Segment", "Region / Scope", "IC Wilayah Segmen", "Limit Bucket"],
      allocationRule: "Limit belongs to the resolved classification bucket, not to a generic segment alone",
      classificationBasis: "Industry + Region + Segment → IC Wilayah Segmen",
      scopeValues: ["Bankwide", "Region I–XII", "KP + OVS"]
    },
    notes: "Region is a required LPG limit dimension. IC Wilayah Segmen is part of the limit bucket; IC Nasional remains a separate classification. Bankwide, regional and KP + OVS scope buckets remain explicit."
  }
};

export const PRODUCT_FINAL_UNIVERSES = Object.keys(PRODUCT_FINAL_DIMENSION_CONTRACT);

export function productFinalDimensionContractFor(universe) {
  return PRODUCT_FINAL_DIMENSION_CONTRACT[universe] || null;
}

export function productFinalPathLabel(universe) {
  const contract = productFinalDimensionContractFor(universe);
  return contract ? contract.path.join(" → ") : "Universe → Detail";
}