// LIMAS Product Final — Universe-specific business dimensions.
// UI contract only: no business calculation or canonical ownership is introduced here.

export const PRODUCT_FINAL_DIMENSION_CONTRACT = {
  Country: {
    primaryDimension: "Country",
    path: ["Country", "Domestic / Overseas", "Product", "Utilization Detail"],
    detailTitle: "Country Utilization Trace",
    fields: ["countryCode", "domesticCapacity", "overseasCapacity", "productContribution"],
    notes: "Indonesia/home country is excluded as a monitored Country object. Domestic/Overseas is analytical classification, not a Region hierarchy."
  },
  CCL: {
    primaryDimension: "Counterparty Bank / Swift",
    path: ["Counterparty Bank", "Direct / Indirect Scope", "Entity Contribution", "Product Utilization"],
    detailTitle: "CCL Utilization Trace",
    fields: ["key", "name", "country", "category", "contractual", "productContribution"],
    notes: "Direct/Indirect and entity scope are preserved as separate business structures."
  },
  MLK: {
    primaryDimension: "Holding / Group",
    path: ["Holding / Group", "Sub-Group", "Entity", "CIF", "Product / Facility"],
    detailTitle: "MLK Utilization Trace",
    fields: ["group", "entity", "bmpkEntitas", "productContribution"],
    notes: "Consolidated/group values are not re-added to entity rows."
  },
  CIL: {
    primaryDimension: "Insurance Company",
    path: ["Insurance Company", "Entity", "Nominal Pertanggungan / EIL", "Utilization Detail"],
    detailTitle: "CIL Utilization Trace",
    fields: ["insurance", "name", "productContribution"],
    notes: "Insurance and entity are the primary analytical dimensions."
  },
  LPG: {
    primaryDimension: "Ecosystem LPG / Sector",
    path: ["Ecosystem", "Segment", "Region / KP + OVS", "CL / NCL", "Underlying Utilization"],
    detailTitle: "LPG Regional Utilization Trace",
    fields: ["sector", "segment", "region", "productContribution"],
    notes: "Region is a required LPG limit dimension. Bankwide, Region I–XII and KP + OVS remain explicit scope buckets."
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
