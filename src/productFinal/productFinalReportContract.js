// LIMAS Product Final — Report information architecture.
// Presentation/navigation contract only. Report definitions remain canonical in the runtime reportConfig.

export const PRODUCT_FINAL_REPORT_GROUPS = [
  { key: "Country", label: "Country", reportTypes: ["Country"] },
  { key: "CCL", label: "CCL", reportTypes: ["CCL_DIRECT", "CCL_INDIRECT", "CCL"] },
  { key: "MLK", label: "MLK", reportTypes: ["MLK", "MLK_CONSOLIDATED"] },
  { key: "CIL", label: "CIL", reportTypes: ["CIL"] },
  { key: "LPG", label: "LPG", reportTypes: ["LPG"] }
];

export const PRODUCT_FINAL_REPORT_VARIANT_LABELS = {
  Country: "Country Monitoring",
  CCL_DIRECT: "Direct Limit",
  CCL_INDIRECT: "Indirect Limit",
  CCL: "Counterparty Monitoring",
  MLK: "MLK Monitoring",
  MLK_CONSOLIDATED: "Consolidated",
  CIL: "CIL Master Monitoring",
  LPG: "LPG Monitoring"
};

export function productFinalReportVariantLabel(type, report = {}) {
  return PRODUCT_FINAL_REPORT_VARIANT_LABELS[type] || report.title || type;
}
