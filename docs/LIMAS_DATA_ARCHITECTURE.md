# LIMAS Data Architecture & Data Boundary

## 1. Canonical concept

LIMAS is a master-driven limit repository and monitoring layer.

- The approved limit/capacity decision remains outside LIMAS.
- LIMAS stores the approved/active Master Limit and its parameters/version.
- Product source data is registered in the Product Universe & Integration Registry.
- Current product exposure/outstanding/utilization is inbound/integrated data, not Master Limit data.
- Monitoring is a read model that combines Master Limit + integrated utilization + monitoring thresholds/EWS.
- Reporting reads the monitoring/read model; it is not a second master store.

## 2. Canonical layers

| Layer | Purpose | Stores current utilization? | Stores approved limit? |
|---|---|---:|---:|
| Master Limit Repository | Approved limit, basis/parameters, version, status, effective period | No | Yes |
| Product Universe & Integration Registry | Product universe, source schema, source key, integration target, utilization field, source metadata | No | No |
| Product Utilization Integration | Inbound exposure/outstanding/utilization from source systems | Yes | No |
| Monitoring Read Model | Joined view of master + utilization + thresholds | Derived/read-only | Referenced |
| Reporting & Audit | Reporting, EWS/breach, reconciliation, traceability | Read-only | Referenced |

## 3. Domain master vs utilization boundary

### Country
Master: Country identity and approved limit/gap/final-limit parameters.
- Country Code
- Negara
- Status
- Limit FIB / Formulasi
- Limit FIB / Diputus
- Country Limit
- % Country Limit
- Needs
- Minus
- Add
- Final Limit
- % Final Limit

Integrated utilization:
- Cash Loan
- Non Cash Loan
- Credit Line (Commercial + Treasury)
- Bonds
- Nostro

The source report currently places product checklists/exposures and limit fields in one report, so LIMAS normalizes them into separate layers.

### CCL
Master:
- Bank identity/profile
- Country/category/rating/rating index
- Limit Inhouse
- Tier 1 Capital
- Capacity
- Capacity Limit Adjusted
- Approved CCL
- Limit Contractual
- Global Parent / Top-200 attributes

Integrated utilization:
- Cash Loan / Bank Loan
- Non Cash Loan where applicable
- Commercial Line
- Treasury Line
- Outstanding and related utilization metrics

Utilisasi Capacity is derived monitoring, not a master field.

### MLK
Master / limit basis:
- Entitas
- CIF
- Nama Debitur
- Group Usaha / Group
- Unit Kerja Pengelola
- BUMN/Swasta
- BMPK / Inhouse reference
- Tier
- EBITDA / Kredit Bank Lain / Borrowing Capacity / Available BC as limit-basis/reference parameters where maintained
- Sector / rating / multiplier / watchlist / discount factor
- Master Limit Setting
- Master Limit

Integrated utilization:
- CL Bade / exposure
- NCL Bade / exposure
- Treasury Line exposure
- Bade Treasury Line
- Total Limit Existing
- Total Bade Existing

The source also has MLK_Monitor for the consolidated monitoring/read model.

### CIL
Master:
- Insurance Profile
- Insurance Capacity (IC)
- Multiplier
- CIT
- EIL BMRI
- EIL Mandiri Taspen
- EIL MTF
- EIL MUF
- Consolidated Insurance Limit (CIL)

Integrated utilization:
- Nominal Pertanggungan per entity
- Total Nominal Pertanggungan
- Projection
- EIL utilization
- CIL utilization
- PCP/EWS/action results

This removes the current report's structural mixing of Nominal Pertanggungan and EIL/CIL/CIT.

### LPG
Master:
- Sector
- Segment
- Approved Bankwide Limit
- Approved Regional Limit
- KP + OVS limit where applicable in the source layout

Integrated utilization:
- Outstanding by Sector x Segment x Region
- % Utilization

The source report currently puts Limit, Outstanding and % Utilization side-by-side; LIMAS separates them logically.

## 4. Product Universe

Canonical product universe:
1. Cash Loan
2. Non Cash Loan
3. Credit Line (one source sheet: Credit Line (CommLine and TL))
4. Investment Line
5. Bonds
6. Nostro
7. Nominal Pertanggungan

Pipeline is not a product; it is a staging/source process sheet and should not become a product master.

## 5. Credit Line rule

Commercial Line and Treasury Line are not two separate source tables.

They come from one source sheet: Credit Line (CommLine and TL).

LIMAS therefore uses one normalized source table and classifies each original field/value as Common, Commercial, or Treasury. No synthetic Treasury field rows should be generated.

## 6. Non-duplication rules

Master Limit Setup
- Master key/object
- Master fields
- Approved limit
- Limit parameters/basis
- Version/status/effective period
It should not reproduce product fields or utilization rows.

Master Limit Detail
- Master fields
- Source Data
- Field-level description
- Provenance
- Linked-product summary
It should not reproduce Product Universe & Integration tables.

Product Universe & Integration
- Product universe
- Source sheet/schema
- Source key
- Integration target
- Utilization field
- Source Data
- Keterangan
It should not store approved domain limits.

Monitoring
Master Limit + Integrated Product Utilization + Threshold
It should not create a second master-limit repository.

## 7. Current prototype implementation

- getMasterSections() provides the master-only view.
- domainDataContract is the canonical domain contract.
- domainIntegrationProducts is derived from the canonical domain contract.
- productMasterCatalog is the canonical product universe/source registry.
- Product utilization remains prototype dummy/read-model data until actual source systems are integrated.
- Browser localStorage is prototype persistence only; it is not the target production persistence layer.

## 8. Target Microsoft 365 implementation

SharePoint Lists / controlled master repository -> Master Limit
Product source systems / Excel / controlled feeds -> Product Utilization Integration
Power Automate / scheduled ingestion / validation -> validation + orchestration
LIMAS SPFx -> Monitoring Read Model + Dashboard + EWS + Report

The same data boundaries should be preserved when the prototype is migrated to SPFx.