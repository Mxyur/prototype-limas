# LIMAS — FINAL CONSOLIDATED BUSINESS / PRODUCT / UX MASTER PLAN
## Product Final — Single Source of Truth, No Requirement Loss
### Checkpoint: 2026-10-08

> **Purpose:** consolidate ALL previously confirmed business rules, prior audit findings, implementation decisions, UX requirements, report semantics, maintenance requirements, and visual references into one master plan so development can continue without repeating the audit and without losing details between phases/chats.

---

# 0. GOVERNING PRINCIPLE

This document supersedes fragmented notes for **execution planning** while preserving all previously locked business truth.

It is not a new business design.
It is the **consolidation of business truth already established**.

The execution rule is:

```text
Previously Audited / Confirmed Requirements
                ↓
        Consolidated Master Plan
                ↓
        Implementation Contract
                ↓
        Phase Acceptance Gate
                ↓
        Final Acceptance
```

The following cycle is explicitly prohibited:

```text
Audit
→ forget earlier result
→ rediscover same requirement
→ patch
→ lose another requirement
→ audit again
```

From this checkpoint onward:

> **Prior audit findings are retained and treated as baseline knowledge. Do not repeat a broad audit unless a verified blocker, contradiction, or genuinely new user requirement appears.**

---

# 1. CURRENT DEVELOPMENT POSITION

## 1.1 What is already retained

The development history has already established and must be preserved:

- Product → CIF/Debtor → Entity → Group identity dependency;
- existing raw Product Database source-column preservation;
- Product → Report dependency contract;
- Reference Master framework and governed maintenance pattern;
- Screen + Bulk Upload shared validation approach;
- Limit Setup vs Limit Action separation;
- CCL Direct / Indirect semantics;
- MLK Entity / Group / Consolidated aggregation and no-double-count principle;
- LPG classification hierarchy;
- LPG IC Nasional and IC Wilayah Segmen separation;
- `WASPADA → PLASTIK only`;
- `KP + OVS` as a true scope;
- Country Monitoring exclusion semantics for Indonesia;
- canonical monitoring/read-model principle;
- report lineage;
- DQ distinction between Missing / Invalid / Not Configured / Approved Zero / Unmapped / Expired / Conflicting;
- large-data drilldown requirement;
- final dark / black / deep-navy enterprise visual direction;
- Management / Committee-driven Limit Action workflow;
- Git/Vercel release hold until final acceptance.

## 1.2 Progress Preservation Ledger

This ledger exists specifically to prevent previously completed work from being treated as forgotten or re-audited from zero.

### Retained completed/evidenced work

```text
0R Business Truth Reconciliation
    → completed as baseline / locked truth

1R Product → Report Dependency
    → dependency contract and prior runtime/static evidence retained

2R Source / Governance Preservation
    → native Product source-field contract retained

3R Identity Resolution
    → Product → CIF/Debtor → Entity → Group bridge retained
    → prior runtime evidence: 28 mapped / 28 eligible in the R3 fixture

4R Reference Master
    → implementation framework and shared Screen/Upload validation retained

Prior CCL / MLK / LPG audits
    → business truth retained; do not restart discovery

Prior UI/UX work
    → enterprise IA, detail workspace, dashboard direction, dark/black/deep-navy reference direction retained
```

The remaining work is therefore **gap closure against this consolidated contract**, not another discovery exercise.

Where prior evidence exists, reuse it. Re-run only the smallest targeted test required to prove a changed dependency or to close a blocker.

## 1.3 Important status clarification

The existence of a structural audit or a generic framework does **not** constitute semantic final acceptance.

Therefore:

```text
Implementation evidence ≠ Final PASS
```

A phase reaches final PASS only when its **business, data, UI, regression, and acceptance criteria** are satisfied.

---

# 2. LOCKED GOVERNANCE ARCHITECTURE

The business architecture remains:

```text
Raw Source
    ↓
Business Mapping / Enrichment
    ↓
Reference Master
    ↓
Domain Mapping
    ↓
Canonical / Derived
    ↓
Monitoring
    ↓
Reporting
    ↓
Governance / Lineage / DQ
```

## 2.1 Layer responsibility

| Layer | Responsibility | Must NOT do |
|---|---|---|
| Product Database | source-oriented product records, native source fields | become a report-only derived table |
| Business Mapping / Enrichment | identity, entity, group, counterparty, classification | silently alter raw source |
| Reference Master | Entity, Group, Counterparty, Country, Industry, Grouping, Region, Segment, IC, etc. | become raw product source |
| Master Limit | approved/source-referenced limit configuration | become Limit Action history |
| Domain Mapping | apply domain-specific rules | duplicate source systems |
| Canonical / Derived | normalized metrics | become a second business truth |
| Monitoring | utilization, limit, available, status, EWS | maintain business masters |
| Reporting | business report views, detail, lineage, export | recalculate domain logic independently |
| Governance | lineage, DQ, ownership, versioning, trust | hide unresolved data issues |

Golden rule:

```text
Product Record != Monitoring Record
```

A single product exposure may feed:

```text
MLK
CCL
LPG
Country
```

without being duplicated as four source datasets.

---

# 3. DEVELOPMENT ROADMAP — LOCKED

The execution sequence remains:

```text
0R  Business Truth Reconciliation
 ↓
1R  Product → Report Dependency Contract
 ↓
2R  Existing Column / Governance Preservation
 ↓
3R  Identity Resolution
 ↓
4R  Reference Master Maintenance
 ↓
5R  Limit Setup / Allocation
 ↓
6R  CCL / MLK / LPG / CIL / Country Semantic Rebuild
 ↓
7R  Canonical + Monitoring Projection
 ↓
8R  Reports + Lineage Projection
 ↓
9R  Governance / DQ / Versioning
 ↓
10R Screen ↔ Upload Regression
 ↓
11R Large Data / Stress
 ↓
12R Final UI / UX
 ↓
13R Final Acceptance
 ↓
14R Release
```

Historical labels such as Phase 8 from older handoffs are implementation workstream terminology. They do not replace this 0R–14R execution sequence.

The original governance architecture remains:

```text
1. Master Limit Governance
2. Product Universe & Product Database
3. Integration & Business Mapping
4. Canonical Read Model & Monitoring
5. Reporting & Lineage
```

---

# 4. GLOBAL BUSINESS NON-NEGOTIABLES

## 4.1 Never change locked source semantics

Do not:

- rename native source fields;
- remove native source fields;
- reinterpret native fields for UI convenience;
- inject derived/report fields into raw Product Database;
- replace native vocabulary with invented terminology;
- use a display label as a unique business key.

Any change requires a verified blocker and explicit approval.

## 4.2 No silent identity

Every eligible record must either resolve or produce an explicit DQ state.

Never silently set:

```text
UNKNOWN
```

and continue as if resolved.

## 4.3 No silent zero

The system must distinguish:

```text
Approved Zero
!=
Not Configured
!=
Missing
!=
Unmapped
```

Positive exposure with unresolved classification/limit must remain a DQ condition, not a fake zero result.

## 4.4 No duplicate calculation truth

Dashboard, Monitoring, and Reports must consume the same canonical/read-model outcome.

Do not build:

```text
Dashboard = dataset A
Monitoring = dataset B
Report = dataset C
```

---

# 5. PRODUCT UNIVERSE — LOCKED

## 5.1 Product universe

The Product Final universe includes:

```text
Cash Loan
NCL
Credit Line
```

Credit Line is one Product Universe:

```text
Credit Line
 ├── Commercial Line
 │    ├── Comm DN
 │    └── Comm LN
 │
 ├── Treasury Line
 │    ├── Treasury DN
 │    └── Treasury LN
 │
 └── Credit Line Total
```

Do not create separate top-level Product Universes for Commercial Line and Treasury Line.

## 5.2 MLK integration

MLK Treasury integration remains an upstream integration/source concern.

Do not duplicate Treasury integration into raw Credit Line Product DB.

## 5.3 Product source examples — Cash Loan

Existing source vocabulary that must remain includes:

```text
no_cus
nm_cus
kd_cab
nm_cab
no_rek
gas_reporting
buc_reporting
jns_krd
src
j_guna
revolv
bilokj
total_limit
total_bade
project_location
code
MatDate/Jatem
ecosystem_lpg
segmen_lpg
region_lpg
```

Business interpretation must preserve the source role:

- `no_cus` → customer/debtor identifier;
- `nm_cus` → debtor/customer name;
- `kd_cab`, `nm_cab` → booking office;
- `no_rek` → facility/account reference;
- `buc_reporting` → business/reporting organization source field;
- `total_limit` → product/facility limit source;
- `total_bade` → exposure/BADE source;
- `project_location` → project location;
- `code` → Country Exposure key;
- `ecosystem_lpg`, `segmen_lpg`, `region_lpg` → LPG source attributes.

Important distinctions:

```text
Country Exposure
!= Project Location
!= Booking Office
!= Reporting Entity
```

`buc_reporting` is not legal Entity identity unless explicitly mapped through the governed identity layer.

---

# 6. PRODUCT → DEBTOR/CIF → ENTITY → GROUP

This is a hard dependency for MLK, reports, monitoring, and relevant downstream analytics.

Canonical relationship:

```text
Product Record
      ↓
CIF / Debtor
      ↓
Entity
      ↓
Group Usaha
```

Required canonical identity attributes:

```text
product_record_id
source_system
cif / customer_id
debtor_name
entity_code
entity_name
entity_type
group_id
group_name
mapping_status
mapping_source
mapping_as_of_date
mapping_version
```

Identity resolution is time-aware:

```text
Product Record
+
As-of Date
+
Mapping Version
=
Resolved Identity
```

No silent unknown.

---

# 7. PRODUCT → REPORT DEPENDENCY CONTRACT

Every report field must be reverse-resolvable:

```text
Report Column
    ↓
Canonical Field / Metric
    ↓
Mapping / Enrichment
    ↓
Reference / Master Dependency
    ↓
Product Source Field(s)
```

Dependency metadata must include:

```text
Report
Column
Canonical Field
Metric Type
Source Product
Source Field
Mapping
Enrichment
Master
Transformation
As-of Date
Lineage
```

Acceptance:

```text
100% resolved
100% traceable
100% runtime-valid
0 orphan report field
```

---

# 8. REFERENCE MASTER — COMPLETE SCOPE

The standardized Reference Master workspace must cover, where applicable:

```text
1. Entity Master
2. Group Master
3. Counterparty Master
4. Country Master
5. Industry Master
6. Industry Grouping
7. Region Master
8. Segment Master
9. IC Nasional
10. IC Wilayah Segmen
11. Product Eligibility / Mapping
```

Each maintainable master should expose:

```text
Business Key
Name / Label
Status
Effective Date
Expiry Date
Version
Owner
Source / Reference
Last Updated
Approval Status
DQ / Validation Result
Audit History
```

## 8.1 Required maintenance lifecycle

```text
DRAFT
  ↓
REVIEW
  ↓
APPROVED
  ↓
EFFECTIVE
  ↓
EXPIRED / SUPERSEDED
```

Actual system statuses may retain existing governed values such as `SUBMITTED`, `PENDING APPROVAL`, `REJECTED`, `CANCELLED`, `SYNCED` where already supported.

## 8.2 Screen + Bulk Upload

Both entry modes must converge into one engine:

```text
Screen Input ─────┐
                  ├→ Common Validation Engine
Bulk Upload ──────┘
                          ↓
                    Schema Validation
                          ↓
                    Business Key Check
                          ↓
                    Reference Validation
                          ↓
                    Duplicate Check
                          ↓
                 Cross-record Validation
                          ↓
                       Preview
                          ↓
                        Draft
                          ↓
                       Review
                          ↓
                      Approval
                          ↓
                      Versioning
                          ↓
                      Effective
```

Never:

```text
Excel → direct overwrite
```

---

# 9. LIMIT MANAGEMENT — COMPLETE OPERATING MODEL

Limit Management must contain two distinct concepts.

## 9.1 Master Limit

Purpose:

- approved/source-referenced master;
- active value;
- effective/expiry;
- source transparency;
- utilization view.

Displayed attributes:

```text
Current Master Limit
Exposure
Utilization
Available
Status
Effective Date
Expiry Date
Source System
Source Record ID
Last Sync
Sync Status
```

The source-owned Master Limit must not be casually edited by an arbitrary UI action.

## 9.2 Limit Allocation / Scope

Purpose:

- allocation of approved limit to a business scope;
- controlled maintenance;
- versioning;
- threshold;
- effective/expiry;
- domain-specific business key.

This is where domain-specific maintenance belongs, including LPG allocation.

## 9.3 Limit Action

Limit Action is separate and exception-based:

```text
Breach / Near Breach
      ↓
Management Review
      ↓
Committee Decision
      ↓
Limit Action
      ↓
Operational Update / Switching
      ↓
Audit / Tracking
```

Required action attributes may include:

```text
Before
Proposed
After
Reason
Committee Reference
Requester
Approver
Effective Date
Status
Audit Trail
```

Operational reality: limit changes are infrequent and committee-driven. Do not design a transaction-heavy CRUD screen.

---

# 10. DOMAIN CONTRACT — COUNTRY

## 10.1 Product contributions

Country Monitoring can consume relevant contributions from:

```text
Cash Loan
NCL
Commercial Line
Treasury Line
Bonds
Nostro
```

## 10.2 Existing source/lineage principles

Examples retained from existing reporting semantics:

- Country identity/status → Country dataset;
- CL exposure → Big Data / adjusted Country dataset;
- NCL → NTF / DWB source;
- Commercial/Treasury → Credit Line utilization source;
- Bonds → Market Risk / Treasury source;
- Nostro → internal Mandiri source;
- total → calculated/GET;
- Country Limit → Country dataset;
- percentage → calculated.

Any existing manual/input field whose business rule has not been explicitly confirmed must remain governed rather than invented.

## 10.3 Critical rule

Indonesia must not become a foreign-country monitoring object merely because domestic product records exist.

The system must distinguish domestic/overseas semantics from region and booking office.

---

# 11. DOMAIN CONTRACT — CCL

## 11.1 Applicability

CCL supports:

```text
Direct Limit
Indirect Limit
```

Direct scope includes:

```text
BMRI
MANTAP
BMEL
MTF
MUF
MIR
MCI
MANSEK
MMI
AMFS
```

Indirect scope includes:

```text
MMI
AMFS
```

The applicability matrix must be governed in data/configuration rather than duplicated in source Product DB.

## 11.2 CCL identity

```text
Product
 ↓
Counterparty
 ↓
Entity
 ↓
Direct / Indirect
```

Minimum canonical keys:

```text
counterparty_id
entity_code
ccl_scope
ccl_limit_type
as_of_date
```

## 11.3 CCL business structure

The management/report structure must preserve:

```text
Inhouse
Capacity
CCL
Contractual
```

with product/system exposure underneath.

Business distinction:

- Inhouse → maintained business/reference input;
- Capacity → derived/reference result from approved semantics;
- CCL → approved counterparty limit;
- Contractual → derived/system-referenced applicable product-limit contribution.

Do not create a free manual “Proposed Contractual” input where the business model says contractual is derived/system-referenced.

## 11.4 Credit Line arithmetic

```text
Commercial DN + Commercial LN
= Commercial Line
```

```text
Treasury DN + Treasury LN
= Treasury Line
```

```text
Commercial Line + Treasury Line
= Credit Line Total
```

Do not aggregate both component values and the total again.

## 11.5 CCL report

Required report structure:

```text
CCL
 ├── Direct
 └── Indirect
```

and appropriate:

```text
Counterparty
Entity
Bank / Subsidiary
Country
Inhouse
Capacity
CCL
Contractual
Exposure
Utilization
Status
```

Where the source report contains OS / OS Max / product-specific values, preserve the existing source/report semantics.

## 11.6 CCL acceptance

Must prove:

- counterparty mapping;
- entity mapping;
- Direct/Indirect applicability;
- BMRI + subsidiaries;
- Inhouse / Capacity / CCL / Contractual separation;
- Contractual reconciliation;
- Credit Line no-double-count;
- report-to-canonical consistency;
- detail + lineage.

---

# 12. DOMAIN CONTRACT — MLK

## 12.1 Corporate hierarchy

```text
Holding
 ↓
Sub-Group
 ↓
Entity
 ↓
Debtor / CIF
 ↓
Product / Facility
```

Known MLK entity universe:

```text
BMEL
BMRI
MANSEK
MTF
MUF
```

The exact active entity/group master must remain governed by the Reference Master rather than hard-coded in raw Product DB.

## 12.2 Aggregation levels

Canonical aggregation levels:

```text
ENTITY
GROUP
CONSOLIDATED
```

Critical invariant:

```text
ENTITY contributions
→ GROUP
→ CONSOLIDATED
```

The consolidated figure must not be added back into entity/group contributions.

## 12.3 MLK exposure

Existing business semantics include:

```text
Total Bade
=
CL Bade
+
NCL Bade
+
Treasury Exposure
```

Existing limit semantics include:

```text
Total Limit Existing
=
CL Limit
+
NCL Limit
+
Treasury Line
```

Utilization follows the approved canonical formula. If denominator is zero, do not invent a denominator.

## 12.4 MLK report views

Required views:

```text
MLK
 ├── BMRI / Entity View
 ├── Consolidated View
 ├── Entity Detail
 ├── Group Detail
 ├── Product / Facility Detail
 └── Lineage
```

## 12.5 MLK management actions

### Switching / Reallocation

```text
Same Group Usaha
Donor Member → Recipient Member
Amount
```

Invariant:

```text
donor.group_id == recipient.group_id
```

Switching changes allocation, not group identity.

### Group Breach

If group breach persists:

```text
Group Position
+
Member Positions
+
Proposed Member Uplift
+
Projected Group Position
```

Do not implement Group Breach as merely another switching transaction.

## 12.6 MLK acceptance

Must prove:

- Product → CIF;
- CIF → Entity;
- Entity → Group;
- Entity total;
- Group total;
- Consolidated total;
- zero duplicate consolidated contribution;
- same-group switching;
- member uplift scenario;
- time-aware identity;
- report lineage;
- correct BMRI and consolidated views.

---

# 13. DOMAIN CONTRACT — CIL

## 13.1 Business structure

```text
Insurance Capacity (IC)
        ↓
Multiplier
        ↓
CIT = IC × Multiplier

EIL per Entity
        ↓
CIL = Σ active EIL

Nominal Pertanggungan
        ↓
Utilization / EWS
```

Monitoring grain:

```text
Insurance Company + Entity + Period
```

## 13.2 Raw vs derived

Raw Product/source may contain:

```text
Nominal Pertanggungan
```

Derived/master/report concepts include:

```text
EIL
CIL
CIT
Projection
PCP/EWS
```

Do not put derived CIL formulas back into raw Product DB.

## 13.3 Acceptance

Must prove:

- Entity/EIL relationship;
- active EIL selection;
- CIL aggregation;
- CIT formula;
- exposure provenance;
- utilization;
- report reconciliation;
- lineage.

---

# 14. DOMAIN CONTRACT — LPG

> **LPG is a monitoring lens over Cash Loan + NCL. It is not a separate Product source.**

## 14.1 One source, multiple views

```text
Cash Loan
NCL
  ↓
CIF / Debtor
  ├──────────→ MLK
  └──────────→ LPG
```

Do not create:

```text
LPG Cash Loan Source
LPG NCL Source
```

## 14.2 LPG golden classification chain

This chain is LOCKED:

```text
CL / NCL
   ↓
CIF
   ↓
Debtor
   ↓
Industry / Sector
   ↓
Industry Grouping
   ↓
Ecosystem
   ↓
Segment
   ↓
Region
   ↓
IC Nasional
   ↓
IC Wilayah Segmen
   ↓
LPG Limit Bucket
```

## 14.3 Source entry attributes

Typical product entry points include:

```text
CIF / customer
Ecosystem LPG
Segment LPG
Region LPG
Total BADE / exposure
```

These are only inputs; mapping/enrichment must resolve the complete canonical classification.

---

# 15. LPG REFERENCE MASTERS — COMPLETE

## 15.1 Master Industry / Grouping

```text
Sector → Grouping
```

Examples already established include:

```text
INDUSTRI BATUBARA → BATUBARA
ENERGI & AIR → ENERGI & AIR
INDUSTRI PLASTIK & SERAT BUATAN → PLASTIK
```

## 15.2 IC Nasional

Canonical values:

```text
MENARIK
NETRAL
SELEKTIF
WASPADA
```

Semantic visual convention:

```text
MENARIK  → Green
NETRAL   → Yellow
SELEKTIF → Orange
WASPADA  → Black
```

Business rule:

```text
WASPADA → ONLY PLASTIK
```

This is not a decorative color rule. The IC value is a business parameter affecting classification/limit treatment.

## 15.3 IC Nasional vs IC Wilayah Segmen

They are separate masters.

### IC Nasional

```text
Sector
 ↓
IC Nasional
```

### IC Wilayah Segmen

```text
Sector
+
Region
+
Segment
 ↓
IC Wilayah Segmen
```

The system must not infer IC Wilayah Segmen merely from IC Nasional.

## 15.4 Region

Canonical reference includes:

```text
HQ_OVS
R01 ... R12
```

Display/crosswalk should preserve legacy business labels, including:

```text
KANTOR PUSAT + Overseas
WILAYAH I / MEDAN
WILAYAH II / PALEMBANG
WILAYAH III / JAKARTA KOTA
WILAYAH IV / JAKARTA THAMRIN
WILAYAH V / JAKARTA SUDIRMAN
WILAYAH VI / BANDUNG
WILAYAH VII / SEMARANG
WILAYAH VIII / SURABAYA
WILAYAH IX / BANJARMASIN
WILAYAH X / MAKASSAR
WILAYAH XI / DENPASAR
WILAYAH XII / JAYAPURA
```

`KP + OVS` is a real analytical scope and must not be reconstructed through regional subtraction.

## 15.5 Segment

Segment terminology from previous source/business materials must remain available through governed crosswalks.

Examples previously used include:

```text
Corporate
Commercial
SME
Micro
```

Other approved canonical segment codes may exist in the master.

Rule:

> Do not silently equate legacy display terms with a new canonical code. Maintain an explicit crosswalk.

---

# 16. LPG SEGWIL KEY + LIMIT BUCKET

Canonical logical key:

```text
sector_code
+
region_code
+
segment_code
=
segwil_key
```

`segwil_key` is retained as a canonical logical identifier.

The limit bucket is more detailed than simply Region × Segment:

```text
Sector
+
Grouping
+
Region
+
Segment
+
IC Wilayah Segmen
+
Scope
→ Approved LPG Limit
```

This is a **real limit allocation key**, not merely a monitoring display dimension.

---

# 17. LPG APPETITE / IC PARAMETER MAINTENANCE

This requirement is explicitly locked because it was previously at risk of being reduced to color-only UI.

The system must represent the business classification as a maintainable configuration.

## 17.1 Example maintenance object

```text
LPG Appetite / Classification Setup

Industry / Sector    [select]
Grouping             [select]
Segment              [select]
Region               [select]
IC Nasional          [MENARIK / NETRAL / SELEKTIF / WASPADA]
IC Wilayah Segmen    [select / derived by mapping]
Scope                [Bankwide / Region / KP+OVS]
Effective Date       [date]
Expiry Date          [date]
Version              [version]
Status               [Draft / Review / Approved / Effective]
Owner                [owner]
Approval Reference   [reference]
```

## 17.2 Rule engine

At minimum:

```text
IF IC Nasional = WASPADA
THEN Industry / Grouping must satisfy PLASTIK eligibility
ELSE reject / DQ
```

The implementation must allow authorized user intervention through governed maintenance rather than hard-coded UI labels.

## 17.3 Important semantic distinction

There are two unrelated uses of black:

```text
1. UI theme:
   dark / black / deep navy enterprise shell

2. LPG business status:
   WASPADA = black semantic status
```

They must not be conflated.

---

# 18. LPG LIMIT MAINTENANCE — REQUIRED DETAIL

The LPG Limit Allocation screen must not stop at a generic `businessKey / scope / limitValue` form.

Required business-facing structure:

```text
LIMIT SETUP
  → Limit Allocation / Scope
      → LPG
```

Form/table fields:

```text
Sector
Grouping
Region
Segment
IC Nasional (reference)
IC Wilayah Segmen
Segwil Key
Scope
Approved Limit
Threshold
Effective Date
Expiry Date
Status
Version
Source / Reference
Owner
Approval
Last Updated
```

The system must support:

```text
Create
View
Update
Duplicate detection
Validate
Preview
Draft
Review
Approve
Effective
Expire / Supersede
History
Lineage
```

No direct overwrite.

---

# 19. LPG MONITORING — OUTPUT ONLY

LPG Monitoring must not become the setup workspace.

Expected structure:

```text
LPG Monitoring
  ├── Executive Summary
  ├── Industry / Sector
  ├── Grouping
  ├── Segment
  ├── Region
  ├── IC Nasional
  ├── IC Wilayah Segmen
  ├── Scope
  ├── Limit
  ├── Outstanding
  ├── Utilization
  ├── Status
  ├── Detail
  ├── Lineage
  └── Export
```

The Monitoring page may provide contextual navigation to:

```text
View Limit Setup
View Product Utilization
View Lineage
```

but must not host a parallel master-maintenance framework.

---

# 20. LPG REPORT STRUCTURE

The report is hierarchical and must support investigation.

Conceptually:

```text
Industry / Ecosystem
    ↓
Segment
    ↓
IC Wilayah Segmen
    ↓
Scope
    ↓
Limit
Outstanding
Utilization
Status
```

Scope can include:

```text
Bankwide
Region I–XII
KP + OVS
```

Bankwide must not become an extra duplicated exposure bucket.

Drilldown:

```text
LPG Report
 ↓
Industry / Grouping
 ↓
Region / Segment / IC
 ↓
Debtor / CIF
 ↓
Facility / Product
 ↓
Source Record
```

---

# 21. LPG DATA QUALITY

Required DQ reasons:

```text
LPG_INDUSTRY_NOT_FOUND
LPG_GROUPING_NOT_FOUND
LPG_REGION_NOT_FOUND
LPG_SEGMENT_NOT_FOUND
LPG_SEGWIL_NOT_FOUND
LPG_IC_CLASSIFICATION_MISSING
LPG_INVALID_IC_MAPPING
LPG_WASPADA_NON_PLASTIK
LPG_LIMIT_NOT_CONFIGURED
LPG_EXPOSURE_WITHOUT_LIMIT_BUCKET
LPG_SOURCE_CLASSIFICATION_MISMATCH
```

Critical invariant:

```text
Outstanding > 0
AND
Bucket unresolved
→ DATA ISSUE
```

Never convert the unresolved state to:

```text
Limit = 0
Utilization = 0
```

---

# 22. REFERENCE MASTER → LIMIT SETUP RELATIONSHIP

Reference Master provides identity/classification.
Limit Setup provides approved financial/configuration values.

Example LPG:

```text
Reference Master
 ├── Industry
 ├── Grouping
 ├── Region
 ├── Segment
 ├── IC Nasional
 └── IC Segwil
        ↓
Limit Setup
 └── LPG Limit Allocation
        ↓
Canonical LPG Limit
        ↓
Monitoring / Report
```

This separation is mandatory.

---

# 23. SCREEN VS BULK UPLOAD — DOMAIN MATRIX

Every maintainable domain must support the required maintenance modes.

| Domain | Screen | Bulk Upload | Common Validation | Approval | Versioning |
|---|---|---|---|---|---|
| Entity | YES | YES | YES | YES | YES |
| Group | YES | YES | YES | YES | YES |
| Counterparty | YES | YES | YES | YES | YES |
| Country | YES | YES | YES | YES | YES |
| Industry / Grouping | YES | YES | YES | YES | YES |
| Region | YES | YES | YES | YES | YES |
| Segment | YES | YES | YES | YES | YES |
| IC Nasional | YES | YES | YES | YES | YES |
| IC Segwil | YES | YES | YES | YES | YES |
| Product Mapping | YES | YES | YES | YES | YES |
| Country Limit Allocation | YES | YES | YES | YES | YES |
| CCL Limit | YES | YES | YES | YES | YES |
| MLK Limit | YES | YES | YES | YES | YES |
| CIL Setup | YES | YES | YES | YES | YES |
| LPG Limit Allocation | YES | YES | YES | YES | YES |

Where a source-owned master is read-only by design, the UI must still expose source/reference information and an approved mechanism rather than pretending it can be edited.

---

# 24. BULK UPLOAD VALIDATION CONTRACT

Every upload must pass:

```text
File Schema
 ↓
Required Columns
 ↓
Data Type / Unit
 ↓
Business Key
 ↓
Reference Integrity
 ↓
Duplicate Within File
 ↓
Duplicate Against Existing Master
 ↓
Cross-record Reconciliation
 ↓
Business Rule
 ↓
Preview
 ↓
Draft
```

Expected upload result categories:

```text
VALID
INVALID
DUPLICATE
CONFLICTING
NOT CONFIGURED
UNMAPPED
```

No direct import-to-effective.

---

# 25. GOVERNANCE / DATA DICTIONARY

Governance must expose:

```text
Field
Source
Layer
Business Meaning
Raw / Enrichment / Reference / Derived
Domain Usage
Report Usage
Editable?
Owner
Mapping Rule
Version
Effective Date
Refresh
```

Existing source-column logic must remain visible.

The governance layer is where technical users can inspect how a business metric is formed without forcing the Product Final user to live inside a technical data dictionary.

---

# 26. CANONICAL MONITORING CONTRACT

Monitoring reads canonical results only.

Required fields:

```text
Exposure
Limit
Available
Utilization
Threshold
Status
As-of Date
```

Domain-specific calculations belong upstream in canonical/domain layers.

Monitoring must not have a second formula for CCL, MLK, LPG, CIL, or Country.

---

# 27. REPORTING CONTRACT

Primary report navigation:

```text
Reports
├── Country
├── CCL
│   ├── Direct
│   └── Indirect
├── MLK
│   ├── BMRI / Entity View
│   └── Consolidated
├── CIL
└── LPG
```

Each report has:

```text
Summary
Data
Detail
Lineage
Export
```

Every report column must have reverse lineage.

Reports must consume the same canonical/read-model outcome as Monitoring.

---

# 28. REPORT-SPECIFIC ACCEPTANCE

## Country

Must show correct foreign-country population, exposure contribution, limit, utilization, and status without domestic Indonesia leakage.

## CCL

Must show Direct/Indirect, counterparty/entity context, Inhouse, Capacity, CCL, Contractual, exposure, utilization, detail and lineage.

## MLK

Must support:

```text
BMRI/entity view
Consolidated view
Group/entity/member drilldown
Product/facility detail
```

and no consolidated double count.

## CIL

Must show insurance company/entity/period context and IC / EIL / CIL relationships.

## LPG

Must show:

```text
Industry
Grouping
Segment
Region
IC Nasional
IC Segwil
Scope
Limit
Outstanding
Utilization
Status
```

with drilldown and lineage.

---

# 29. FINAL PRODUCT FINAL INFORMATION ARCHITECTURE

Primary navigation:

```text
Dashboard
Monitoring
Limit Management
Reports
Governance
```

Product Universe / Product Database lives within the governed product/reference area rather than becoming a competing top-level workspace if the final IA has already converged.

Limit Management:

```text
Overview
Master Limit
Limit Allocation / Scope
Limit Actions
History
```

Do not duplicate Monitoring inside Limit Management.

---

# 30. FINAL LIMIT DETAIL WORKSPACE

This directly addresses the stress-case concern about full data.

Object Detail must support:

```text
Object Detail
 ├── Overview
 ├── Limit Structure
 ├── Allocation
 ├── Limit Actions
 ├── History
 └── Lineage
```

Example:

```text
Japan
Country Limit

● Near Breach

Limit         5.0T
Outstanding   4.82T
Available     180B
Utilization   96.4%
```

Then progressive investigation:

```text
Country
 ↓
Entity / Counterparty
 ↓
Debtor
 ↓
Facility
 ↓
Product
 ↓
Exposure
 ↓
Source Record
```

For LPG:

```text
LPG Bucket
 ↓
Sector / Grouping
 ↓
Region / Segment
 ↓
IC / Segwil
 ↓
Debtor / CIF
 ↓
Facility / Product
```

For MLK:

```text
Group
 ↓
Entity
 ↓
CIF / Debtor
 ↓
Facility
 ↓
Product
```

For CCL:

```text
Counterparty
 ↓
Entity
 ↓
Product / Exposure
```

---

# 31. DASHBOARD — DECISION USEFULNESS

Dashboard must answer within approximately 10 seconds:

```text
Overall Health
Major Risk
Breach
Near Breach
Pending Action
```

Suggested structure:

```text
[Total Limit] [Utilization] [Available]
[Breach] [Near Breach] [Pending Actions]

Limit Health
Country | CCL | MLK | CIL | LPG

Attention Center
Top Risks
Recent / Pending Limit Actions
```

Cards are only used when they support decisions.

No decorative card wall.

---

# 32. FINAL VISUAL REFERENCE — BLACK / DARK ENTERPRISE

> **This section is explicitly restored into the master plan because the previously supplied black/dark reference must not be lost between handoffs.**

The user's previously supplied visual reference is the governing direction for Product Final's visual language.

The implementation target is:

```text
Dark / Black / Deep Navy Enterprise Shell
            ↓
Premium Enterprise Banking Platform
            ↓
High Contrast
            ↓
High Information Density
            ↓
White / Light Data Surfaces
            ↓
Controlled Blue Action Accent
```

Existing handoff direction also records:

```text
dark navy enterprise dashboard
white content cards
blue primary button
blue / grey typography
status chips
responsive tables
```

This is **not** permission to invent a different theme.

Where exact reference-image values are needed, the actual supplied reference is the visual authority; do not manufacture exact hex codes from memory.

## 32.1 Semantic business colors

Business color semantics are separate from the global theme:

```text
Healthy / Green
Attention / Amber
Near Breach / Amber or business-approved semantic status
Breach / Red
```

For LPG IC classification:

```text
MENARIK  = Green
NETRAL   = Yellow
SELEKTIF = Orange
WASPADA  = Black
```

Color must never be the only status signal. Use labels, icons, and accessible text as well.

## 32.2 What must NOT happen

Do not turn Product Final into:

```text
many decorative cards
many metadata widgets
many badges
many tabs
prototype-style clutter
```

Design priority:

```text
Decision first
Investigation second
Action third
Governance on demand
```

---

# 33. VISUAL MATURITY — ALL SCREENS

All screens use a shared design system:

### Typography

```text
Page Title
Section Title
Card Title
Metric
Body
Metadata
Caption
```

### Surfaces

```text
Application Background
 ↓
Section Surface
 ↓
Card Surface
 ↓
Interactive Surface
```

### Interaction states

```text
Hover
Selected
Active
Focus
Disabled
Loading
Success
Error
```

No random CSS patchwork.

---

# 34. LARGE-DATA / STRESS CONTRACT

Must support at least:

```text
10+ countries
100+ counterparties
1,000+ debtors
100+ entities
1,000+ facilities
1,000+ LPG buckets
10,000+ report rows
```

Must validate:

```text
Search
Filter
Sort
Pagination / Virtualization
Drilldown
Navigation context
Full Detail
Lineage
Export
No truncation
```

Stress acceptance must use realistic hierarchy depth, not merely a large row count.

---

# 35. DQ / REMEDIATION BOUNDARY

Data Remediation handles:

```text
Source Field Issue
Mapping Issue
Classification Issue
Enrichment Issue
```

Limit changes remain:

```text
Limit Setup
```

and exception/committee-driven changes remain:

```text
Limit Action
```

Never use Data Remediation to alter a business-approved limit merely to make a report look correct.

---

# 36. LINEAGE CONTRACT

Every important report metric must be explainable:

```text
Report Metric
 ↓
Canonical Metric
 ↓
Domain Rule
 ↓
Mapping / Master
 ↓
Product Source
 ↓
Source Record
```

The user must be able to understand:

```text
Where did this number come from?
Which limit did it use?
Which mapping did it use?
What was effective on the as-of date?
Which source record contributed?
```

---

# 37. PHASE-BY-PHASE IMPLEMENTATION CONTRACT

## 0R — Business Truth Reconciliation

### Purpose
Freeze all previously confirmed business truth.

### Required output
This document plus retained evidence from prior audits.

### Acceptance
No unresolved contradiction in locked business rules.

---

## 1R — Product → Report Dependency Contract

### Build
Complete report field dependency matrix.

### Acceptance
```text
100% fields resolved
100% traceable
0 orphan
runtime-valid
```

---

## 2R — Existing Column / Governance Preservation

### Build
Source-field contract and governance dictionary regression.

### Acceptance
```text
0 unauthorized renamed fields
0 removed source fields
0 reinterpretation
```

---

## 3R — Identity Resolution

### Build
Product → CIF/Debtor → Entity → Group and CCL Product → Counterparty → Entity.

### Acceptance
Every eligible record resolves or has explicit DQ.

No silent unknown.

---

## 4R — Reference Master Maintenance

### Build
Reference Master domains, screen maintenance, bulk upload, approval, versioning.

### Acceptance
All required domains exist with business-key validation and common validation engine.

### Additional acceptance
The UI must clearly distinguish:

```text
Entity
Group
Counterparty
Country
Industry
Grouping
Region
Segment
IC Nasional
IC Segwil
Product Mapping
```

No reference table stranded inside Monitoring.

---

## 5R — Limit Setup / Allocation

### Build
Domain-specific limit setup for:

```text
Country
CCL
MLK
CIL
LPG
```

### Critical requirement
Do not stop at generic fields. Every domain must expose its business-specific key and scope.

### LPG minimum
```text
Sector
Grouping
Region
Segment
IC Nasional
IC Segwil
Scope
Approved Limit
Effective
Expiry
Version
```

### CCL minimum
```text
Counterparty
Entity
Direct / Indirect
Limit Type
Approved Limit
Effective
Expiry
Version
```

### MLK minimum
```text
Entity / Group
CIF where applicable
Limit Type
Allocation / Scope
Approved Limit
Effective
Expiry
Version
```

### Acceptance
Screen + Upload + Approval + Versioning + effective state.

---

## 6R — Semantic Domain Rebuild

Execute:

```text
Country
 ↓
CCL
 ↓
MLK
 ↓
CIL
 ↓
LPG
```

Each domain must have:

```text
Canonical Contract
Formula / Derivation
Master Dependencies
DQ
Semantic Test Cases
Report Reconciliation
Lineage
```

### LPG additional semantic gate

Must pass:

```text
IC Nasional ≠ IC Segwil
WASPADA only PLASTIK
Positive exposure without bucket = DQ
KP + OVS preserved
Bankwide no duplicate exposure
```

---

## 7R — Canonical + Monitoring Projection

### Build
Monitoring reads canonical only.

### Acceptance
Dashboard/Monitoring numbers reconcile to canonical domain outputs.

---

## 8R — Reports + Lineage Projection

### Build
Country, CCL, MLK, CIL, LPG report workspaces.

### Acceptance
Each report:

```text
Summary
Data
Detail
Lineage
Export
```

All fields have lineage.

---

## 9R — Governance / DQ / Versioning

### Build
Trust Center, ownership, version, effective date, refresh, DQ.

### Acceptance
DQ distinguishes:

```text
Missing
Invalid
Not Configured
Approved Zero
Unmapped
Expired
Conflicting
```

---

## 10R — Screen ↔ Upload Regression

For every maintainable domain:

```text
Create via Screen
Create via Upload
Update via Screen
Update via Upload
Invalid via Screen
Invalid via Upload
Duplicate via Screen
Duplicate via Upload
Expired via Screen
Expired via Upload
```

Expected:

```text
same validation
same business result
same canonical result
```

---

## 11R — Large Data / Stress

Run the dataset targets from Section 34.

Acceptance requires both technical scalability and business drilldown integrity.

---

## 12R — Final UI / UX

### Target

```text
Premium Enterprise Banking Platform
```

### Mandatory UX acceptance

- black/dark/deep-navy reference direction preserved;
- dashboard decision usefulness;
- detail workspace;
- limit structure visibility;
- business maintenance visibility;
- report investigation workflow;
- dense-data usability;
- contextual drilldown;
- no prototype clutter;
- consistent component system;
- LPG masters no longer misplaced inside Monitoring.

---

## 13R — Final Acceptance

All of the following must be PASS:

```text
Business Truth
Product Schema
Identity
Mapping
Reference Master
Limit Setup
CCL
MLK
CIL
LPG
Country
Canonical
Monitoring
Reports
Lineage
DQ
Screen Maintenance
Bulk Upload
Screen/Upload Parity
Stress Test
Visual Acceptance
Local Build
```

Any RED blocker prevents final PASS.

---

## 14R — Release

Only after 13R PASS:

```text
1 commit
 ↓
1 push
 ↓
Vercel Preview
 ↓
Production validation
```

Until then:

```text
Git = HOLD
Vercel = HOLD
```

---

# 38. UI SCREEN ACCEPTANCE MATRIX

| Screen | Must answer | Business detail required |
|---|---|---|
| Dashboard | How is the bank doing? | total limit, utilization, available, breach, near breach, pending action |
| Monitoring | What is happening? | exposure, limit, utilization, threshold, status, as-of |
| Limit Management | What needs to be maintained/done? | Master Limit, Allocation, Actions, History |
| Reference Master | What reference governs the result? | domain-specific masters, lifecycle, version |
| LPG Setup | How is sectoral/appetite limit configured? | Industry, Grouping, Region, Segment, IC, Segwil, Scope, Limit |
| CCL Report | How is counterparty limit consumed? | Direct/Indirect, entity, Inhouse, Capacity, CCL, Contractual, exposure |
| MLK Report | What is the consolidated group position? | Entity, Group, CIF, exposure, limit, aggregation |
| CIL Report | What is insurance capacity/exposure? | IC, Multiplier, EIL, CIL, exposure |
| Country Report | What is the foreign-country position? | country, exposure, limit, utilization, status |
| Governance | Can I trust the result? | source, mapping, master, lineage, DQ, owner, version |

---

# 39. CRITICAL “NO MISS” CHECKLIST

Before declaring final:

### Product

```text
[ ] Native source columns preserved
[ ] Product → CIF/Debtor
[ ] Product → Entity
[ ] Product → Group
[ ] Product → Counterparty where required
```

### Reference Master

```text
[ ] Entity
[ ] Group
[ ] Counterparty
[ ] Country
[ ] Industry
[ ] Grouping
[ ] Region
[ ] Segment
[ ] IC Nasional
[ ] IC Segwil
[ ] Product Mapping
```

### Limit Maintenance

```text
[ ] Country
[ ] CCL
[ ] MLK
[ ] CIL
[ ] LPG
[ ] Business-specific keys
[ ] Scope
[ ] Limit
[ ] Threshold
[ ] Effective / Expiry
[ ] Status
[ ] Version
[ ] Approval
[ ] Source / Reference
[ ] Screen
[ ] Bulk Upload
```

### LPG

```text
[ ] Industry → Grouping
[ ] IC Nasional
[ ] Region
[ ] Segment
[ ] IC Segwil
[ ] Segwil Key
[ ] Scope
[ ] LPG Limit Bucket
[ ] MENARIK
[ ] NETRAL
[ ] SELEKTIF
[ ] WASPADA
[ ] WASPADA only PLASTIK
[ ] Black semantic status
[ ] Dark/black UI reference
[ ] Positive exposure without bucket = DQ
[ ] KP + OVS
[ ] Bankwide no duplicate exposure
```

### CCL

```text
[ ] Direct
[ ] Indirect
[ ] BMRI + subsidiaries
[ ] Counterparty
[ ] Entity
[ ] Inhouse
[ ] Capacity
[ ] CCL
[ ] Contractual
[ ] Credit Line no-double-count
```

### MLK

```text
[ ] CIF
[ ] Debtor
[ ] Entity
[ ] Group
[ ] Entity view
[ ] Consolidated view
[ ] No double count
[ ] Switching same-group
[ ] Group breach / member uplift
```

### CIL

```text
[ ] Insurance Company
[ ] Entity
[ ] IC
[ ] Multiplier
[ ] CIT
[ ] EIL
[ ] CIL
[ ] Nominal Pertanggungan
[ ] Period
```

### Reporting / Governance

```text
[ ] Summary
[ ] Data
[ ] Detail
[ ] Lineage
[ ] Export
[ ] Reverse lineage
[ ] DQ reason
[ ] Owner
[ ] Version
[ ] Effective Date
[ ] Refresh
```

### UI / UX

```text
[ ] Dark / Black / Deep Navy reference direction
[ ] White/light data surfaces
[ ] Controlled blue action accent
[ ] Semantic colors preserved
[ ] Dashboard useful in 10 seconds
[ ] Full detail workspace
[ ] Large data drilldown
[ ] No metadata/card overload
[ ] No setup masters buried in Monitoring
```

---

# 40. IMPLEMENTATION RULES FROM THIS CHECKPOINT FORWARD

## Rule 1 — Do not re-audit everything

Prior audit findings are part of the baseline.

## Rule 2 — Do not reset progress

Existing implementation evidence remains valid and must be carried forward unless a regression proves otherwise.

## Rule 3 — Do not call generic structure “final”

A generic framework does not prove domain semantics.

## Rule 4 — Do not hide business detail behind a generic form

The UI must expose the business key relevant to the domain.

## Rule 5 — Do not move business setup into Monitoring

Reference and Limit Setup belong to governed maintenance workspaces.

## Rule 6 — Do not treat LPG labels as decoration

`MENARIK / NETRAL / SELEKTIF / WASPADA` are business configuration values.

## Rule 7 — Do not forget the visual reference

The black/dark/deep-navy reference is part of final Product Final visual acceptance.

## Rule 8 — Do not change source vocabulary

Raw Product DB remains source-oriented.

## Rule 9 — Do not invent formulas

Use locked Version 1 semantics and canonical logic.

## Rule 10 — Do not release early

Git/Vercel remain HOLD until 13R passes.

---

# 41. DEFINITION OF “FINAL”

LIMAS Product Final is FINAL only when:

```text
Business Truth preserved
        +
Product / Identity / Mapping complete
        +
Reference Masters maintainable
        +
Domain-specific Limit Setup maintainable
        +
CCL / MLK / CIL / LPG / Country semantics reconciled
        +
Canonical result correct
        +
Monitoring correct
        +
Reports match business structure
        +
Lineage complete
        +
DQ explicit
        +
Screen/Upload parity proven
        +
Large-data drilldown proven
        +
Black/Dark Enterprise visual reference achieved
        +
Local browser acceptance PASS
        +
Local build PASS
        ↓
13R FINAL ACCEPTANCE PASS
        ↓
14R RELEASE
```

---

# 42. NEXT EXECUTION START POINT

Do not start a new broad audit.

Use this plan as the execution controller.

Current priority is:

```text
1. Finish / reconcile the Product Final runtime entry path
2. Build the missing business-semantic depth in Limit Management
3. Ensure Reference Master is not stranded inside Monitoring
4. Complete LPG appetite / classification maintenance
5. Complete domain-specific LPG / CCL / MLK limit setup
6. Complete MLK / CCL / LPG report workspaces
7. Run targeted phase acceptance
8. Run UI / stress / final acceptance
9. Only then Git/Vercel
```

The user should not be asked to reconstruct business logic manually.

One clean implementation package should be produced after the build/acceptance gates are satisfied.

---

# 43. CHANGE CONTROL

Any future requirement falls into one of three categories:

### A. Already locked

Implement without re-audit.

### B. Existing rule but implementation gap

Implement against this plan and record the gap closure.

### C. Genuinely new business requirement

Add it explicitly to this master plan before coding.

Never silently add a new business rule.

---

# 44. FINAL STATEMENT

This document is the consolidated control plane for LIMAS Product Final as of 2026-10-08.

The objective is no longer to discover what LIMAS should be.

The objective is to **build exactly what has already been agreed, preserve every prior decision, and prove it end-to-end before release.**
