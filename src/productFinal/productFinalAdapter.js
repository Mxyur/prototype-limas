export function createProductFinalAdapter(source={}) {
  const required = ["limasDemoData","productDatabase","productIntegrationMappings","productMasterCatalog"];
  const missing = required.filter((key) => source[key] == null);
  if (missing.length) throw new Error("Product Final adapter source incomplete: " + missing.join(", "));

  return {
    getRuntimeMeta: () => source.runtimeMeta || {},
    getHomeSnapshot: () => source.homeSnapshot || null,
    getMonitoringSnapshot: (type) => source.monitoringSnapshots?.[type] || null,
    getLimitsSnapshot: () => source.limitsSnapshot || [],
    getLimitStructureSnapshot: () => source.limitStructureSnapshot || [],
    getMasterLimitDetailsSnapshot: () => source.masterLimitDetailsSnapshot || [],
    getLimitSetupSnapshot: () => source.limitSetupSnapshot || [],
    getCCLLimitScope: () => source.cclLimitScope || source.E2E_CCL_LIMIT_SCOPE || [],
    getProductsSnapshot: () => source.productsSnapshot || {catalog:[],fields:{},samples:{},schemaFields:{},mappings:{}},
    getReportsGovernanceSnapshot: () => source.reportsGovernanceSnapshot || {reports:{},traceability:[],governance:{releaseGate:{},phases:[]},lpgLineage:[]},
    getGovernanceDetail: () => { const x=source.reportsGovernanceSnapshot || {}; return {dq:x.dq||{summary:{},rows:[]},mapping:x.mapping||[],dictionary:x.dictionary||{catalog:[],fields:{},schemaFields:{}},historicalDqClosure:x.historicalDqClosure||[]}; },
    getUniverses: () => (source.productMasterCatalog || []).map((item) => ({
      id: item.id,
      label: item.label,
      status: item.status || "Active"
    })),
    getDataSourceSummary: () => ({
      masterDomains: Object.keys(source.limasDemoData || {}),
      productCount: Object.values(source.productDatabase || {}).reduce(
        (count, rows) => count + (Array.isArray(rows) ? rows.length : 0), 0
      ),
      integrationDomains: Object.keys(source.productIntegrationMappings || {})
    })
  };
}
