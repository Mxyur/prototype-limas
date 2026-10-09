// LIMAS Product Final — CTA semantics.
// Presentation/interaction contract only.
// No business calculation, canonical ownership, or workflow logic.

export const PRODUCT_FINAL_ACTION_CONTRACT = {
  primary: {
    reviewExceptions: "Review Exceptions",
    proposeLimitAction: "Propose Limit Action",
    openMonitoring: "Open Monitoring",
  },

  secondary: {
    viewStructure: "View Structure",
    viewLimitStructure: "View Limit Structure",
    viewMonitoring: "View Monitoring",
    viewHistory: "View History",
    viewDetails: "View Details",
    exportCsv: "Export CSV",
    openLimitManagement: "Open Limit Management",
  },

  utility: {
    close: "Close",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    previous: "Previous",
  },

  destructive: {
    reject: "Reject",
    cancelAction: "Cancel Action",
  },

  prohibited: [
    "Edit Master Limit",
    "Update Master Limit",
    "Delete Master Limit",
    "Limit Action Simulation",
  ],
};

export function productFinalAction(group, key) {
  return PRODUCT_FINAL_ACTION_CONTRACT[group]?.[key] || key;
}
