export function createProductFinalAdapter(source={}) {
  const required = ["limasDemoData","productDatabase","productIntegrationMappings","productMasterCatalog"];
  const missing = required.filter((key) => source[key] == null);
  if (missing.length) throw new Error("Product Final adapter source incomplete: " + missing.join(", "));

  return {
    getRuntimeMeta: () => source.runtimeMeta || {},
    getHomeSnapshot: () => source.homeSnapshot || null,
    getMonitoringSnapshot: (type) => source.monitoringSnapshots?.[type] || null,
    getLimitsSnapshot: () => source.limitsSnapshot || [],
    getProductsSnapshot: () => source.productsSnapshot || {catalog:[],fields:{},samples:{},schemaFields:{},mappings:{}},
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
