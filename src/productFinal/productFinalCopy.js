// LIMAS Product Final — End-user product vocabulary.
// Content only. No business calculation, canonical ownership, or workflow logic.

export const PRODUCT_FINAL_COPY = {
  dashboard: {
    eyebrow: "MANAGEMENT OVERVIEW",
    title: "Bankwide Limit Position",
    description:
      "Current limit position across the bank's five monitoring areas.",
    period: "Period",
    asOf: "As of",
    scope: "Scope",

    kpis: {
      monitoredItems: "Monitored Items",
      activeExceptions: "Active Exceptions",
      breach: "Breach",
      warning: "Warning",
      dataQuality: "Data Quality",
    },

    sections: {
      riskAreas: "KEY RISK AREAS",
      universePosition: "LIMIT POSITION",
      highlights: "KEY HIGHLIGHTS",
      utilization: "UTILIZATION AGAINST LIMIT",
      trend: "UTILIZATION TREND",
      actions: "NEXT MANAGEMENT ACTIONS",
    },

    labels: {
      highestUtilization: "Highest Utilization",
      mostExceptions: "Most Exceptions",
      dataQuality: "Data Quality",
      currentPosition: "Current Position",
      activeExceptions: "Active Exceptions",
    },

    empty: {
      trendTitle: "Trend unavailable",
      trendDescription:
        "Historical utilization data is not available for this reporting period.",
      risksTitle: "No priority risks",
      risksDescription:
        "No breach or warning requires attention in the current reporting period.",
    },

    actions: {
      reviewExceptions: "Review Exceptions",
      openMonitoring: "Open Monitoring",
      openLimitManagement: "Open Limit Management",
      viewOperationalMonitoring: "View Monitoring",
    },
  },

  masterLimit: {
    eyebrow: "MASTER LIMIT",
    title: "Master Limit",
    readOnly: "READ ONLY",
    source: "Source: Core System",

    sections: {
      currentPosition: "CURRENT POSITION",
      limitStructure: "LIMIT STRUCTURE",
      monitoring: "MONITORING",
      allocation: "ALLOCATION",
      actions: "ACTIONS",
      history: "HISTORY",
      sourceGovernance: "SOURCE & GOVERNANCE",
    },

    metrics: {
      limit: "Limit",
      outstanding: "Outstanding",
      available: "Available",
      utilization: "Utilization",
    },

    actions: {
      viewStructure: "View Structure",
      viewMonitoring: "View Monitoring",
      viewHistory: "View History",
      proposeLimitAction: "Propose Limit Action",
    },

    metadata: {
      sourceSystem: "Source System",
      sourceRecord: "Source Record",
      effectiveDate: "Effective Date",
      lastSync: "Last Sync",
      syncStatus: "Sync Status",
    },

    empty: {
      detailTitle: "Limit details unavailable",
      detailDescription:
        "The current master limit detail is not available in this reporting snapshot.",
    },
  },

  reports: {
    eyebrow: "LIMIT REPORT",
    titleSuffix: "Limit Report",
    description: "Current position across monitored objects.",

    sections: {
      summary: "SUMMARY",
      data: "REPORT DATA",
      detail: "DETAIL",
      lineage: "LINEAGE",
    },

    metrics: {
      records: "Records",
      exceptions: "Exceptions",
      highestUtilization: "Highest Utilization",
    },

    actions: {
      export: "Export CSV",
      viewDetails: "View Detail",
      close: "Close",
    },

    empty: {
      title: "Report unavailable",
      description:
        "This report is not available for the selected monitoring area.",
    },

    filters: {
      all: "All",
      search: "Search records...",
      status: "Status",
      product: "Product",
      managingUnit: "Managing Unit",
    },
  },

  monitoring: {
    eyebrow: "LIMIT MONITORING",
    title: "Limit Monitoring",
    actions: {
      viewDetails: "View Details",
      close: "Close",
      openStructure: "View Limit Structure",
    },
  },

  limitManagement: {
    eyebrow: "LIMIT MANAGEMENT",
    title: "Limit Management",
    actions: {
      proposeAction: "Propose Limit Action",
      viewStructure: "View Structure",
      viewHistory: "View History",
    },

    states: {
      noOpenActions: "No Open Limit Actions",
      noOpenActionsDescription:
        "There are currently no pending limit adjustments or switching requests.",
    },
  },

  governance: {
    eyebrow: "TRUST CENTER",
    title: "Data & Governance",
    description:
      "Review data quality, source transparency, mapping and lineage.",
  },

  common: {
    status: {
      healthy: "Healthy",
      normal: "Normal",
      attention: "Attention",
      warning: "Warning",
      nearBreach: "Near Breach",
      breach: "Breach",
      dataIssue: "Data Issue",
    },

    labels: {
      current: "Current",
      approved: "Approved",
      proposed: "Proposed",
      source: "Source",
      status: "Status",
      details: "Details",
    },

    actions: {
      back: "Back",
      cancel: "Cancel",
      close: "Close",
      save: "Save",
      export: "Export",
    },
  },
};
