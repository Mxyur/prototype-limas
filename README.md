# LIMAS Prototype v3
Diperbarui langsung berdasarkan workbook master_reportMonitoringLimit dan master_dataproduk.

Cakupan:
- Country Master: identitas, checklist product, exposure, limit/gap/final limit
- CCL Master: bank profile, rating, Tier 1 Capital, capacity, CCL, contractual limit, BMRI/PA exposure
- MLK Master: CIF, group, BMPK, Inhouse, EBITDA, sektor, rating, multiplier, watchlist, borrowing capacity, product limit/exposure, master limit
- CIL Master: insurer profile, jenis produk, Insurance Capacity, multiplier, CIT, EIL per entity, CIL, pertanggungan, proyeksi, PCP/EWS
- LPG Master: sektor, segmen, bankwide dan region limit/outstanding/utilization
- Product Source & Mapping: field-field source untuk Cash Loan, NCL, Commercial Line, Investment Line, Bonds, Nostro, Treasury Line
- Early Warning
- Dashboard Master Coverage

Menjalankan:
npm install
npm run dev


## Update v4 – Dashboard & Monitoring
Mempertahankan master data v3 dan memperkaya:
- Executive Dashboard konsolidasi 5 domain
- KPI limit/exposure/utilisasi/EWS/breach
- Distribusi status dan tren utilisasi
- Data freshness
- Early Warning & Breach Center dengan filter domain/status/entity/period
- Exception register dengan threshold dan last update
- Dashboard monitoring detail per Country, CCL, MLK, CIL, LPG
- Product contribution/heatmap
- Drill-down menuju Master Detail dan Product Mapping
