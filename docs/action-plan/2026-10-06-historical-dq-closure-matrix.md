# Historical DQ Closure Evidence — 2026-10-06

## Purpose

This register closes the historical data-quality remediation gate using evidence recovered from LIMAS project artifacts in repository history and archived handoff/chat exports.

Important provenance rule:

- The original historical DQ identifiers were not preserved as a canonical numbered register.
- Therefore H-DQ-01 … H-DQ-12 are **reconstructed closure IDs**, not claims that these were the original labels.
- Each item is tied to an observed historical defect/root cause and a current validation control.
- No item is considered closed merely because a dashboard is green.

## Closure standard

A historical item is CLOSED only when:
1. the historical defect/root cause is identifiable from project evidence;
2. corrective action is documented in code/design;
3. the current validation path rechecks the affected behavior;
4. current runtime DQ = 0;
5. numeric reconciliation failures = 0 where applicable;
6. Phase 1–5 are Normal.

## Closure matrix

| ID | Historical defect / root cause | Affected scope / evidence | Corrective action | Validation / recheck | Status |
|---|---|---|---|---|---|
| H-DQ-01 | Credit Line raw-source schema incorrectly used canonical display fields, causing CCL source-field gaps. | Credit Line / PRD-CRL-CLINE-* | Restored raw Credit Line source schema through PRODUCT_SOURCE_SCHEMA_OVERRIDES. | Runtime DQ = 0; Phase 2 Normal; E2E invariant PASS. | CLOSED |
| H-DQ-02 | LPG integration identity mismatch between canonical Segment/Region values and approved Master Limit bucket keys caused mapping gaps. | LPG product/application mapping | Preserved approved Master Limit bucket identity while carrying canonical Industry/Grouping/Segment/Region/IC enrichment separately. | LPG classified-record checks pass; Phase 3 Normal; runtime DQ = 0. | CLOSED |
| H-DQ-03 | NCL Country exposure could reach Country mapping without deterministic Booking Office enrichment for HK. | PRD-NCL-NCL-COUNTRY-ID / HK | Stabilized NCL booking-office reference resolution using stable source identity and explicit enrichment. | Runtime DQ = 0; Phase 3 Normal; Country mapping passes. | CLOSED |
| H-DQ-04 | NCL Country exposure could reach Country mapping without deterministic Booking Office enrichment for GB. | PRD-NCL-NCL-COUNTRY-CN / GB | Stabilized NCL booking-office reference resolution and aligned enriched sample IDs. | Runtime DQ = 0; Phase 3 Normal; Country mapping passes. | CLOSED |
| H-DQ-05 | Positive CCL mapping for ANZBAU3M was not represented in the canonical read model because identity/scope matching was inconsistent. | PRD-CRL-CLINE-010 / ANZBAU3M | Aligned Credit Line mapping, canonical read-model identity, and explicit CCL Direct/Indirect scope. | Canonical read-model audit passes; numeric failures = 0; Phase 4 Normal. | CLOSED |
| H-DQ-06 | Positive CCL mapping for MUFGJPJT was not represented in the canonical read model because identity/scope matching was inconsistent. | PRD-CRL-CLINE-011 / MUFGJPJT | Aligned Credit Line mapping, canonical read-model identity, and explicit CCL Direct/Indirect scope. | Canonical read-model audit passes; numeric failures = 0; Phase 4 Normal. | CLOSED |
| H-DQ-07 | Historical CCL monitoring showed two -500 Rp Juta reconciliation deltas. | Historical CCL monitoring reconciliation | Corrected source/mapping/scope consistency rather than hardcoding totals. | Current numeric reconciliation audit reports zero failures. | CLOSED |
| H-DQ-08 | Stale browser persistence could overwrite deterministic CCL master values and display an apparent zero limit. | Production Sample CCL runtime | Introduced runtime-specific storage namespaces and deterministic Production Sample initialization. | Production-sample invariant controls; current Phase 1/4 and numeric audits pass. | CLOSED |
| H-DQ-09 | Country monitoring governance risk could treat Indonesia as a monitored foreign-country bucket. | Country monitoring universe | Enforced home-country/exclusion policy so Indonesia is not a foreign monitored target. | Country governance audit PASS; runtime DQ = 0. | CLOSED |
| H-DQ-10 | LPG positive exposure could become misleading zero-limit/zero-utilization when its classification/bucket was unresolved. | LPG classification → limit → monitoring | Enforced conditional DQ for applicable positive exposure without resolvable classification/bucket; no silent zeroing. | LPG classification/read-model controls pass; runtime DQ = 0; numeric failures = 0. | CLOSED |
| H-DQ-11 | Derived Country/CCL/MLK/CIL/LPG assignments and monitoring fields risked leaking into the Product Database source layer. | Product Database / Product Dictionary | Enforced source-only Product Database boundary and explicit Raw Source / Business Enrichment / Reference Master / Domain Mapping / Canonical-Derived layers. | Runtime isolation PASS; Phase 2 Normal; Product Dictionary governance verified. | CLOSED |
| H-DQ-12 | Report output lacked explicit field-level lineage, including LPG E2E lineage. | Reporting / Phase 5 | Mounted Report Field Lineage and LPG E2E Classification Lineage with source, enrichment, transformation/formula and status. | Phase 5 Normal; runtime DQ = 0; Vite build PASS; traceability audit PASS. | CLOSED |

## Current release evidence

- Runtime DQ: **0**
- Numeric reconciliation failures: **0**
- Phase 1 — Master Limit Governance: **Normal**
- Phase 2 — Product Universe & Product Database: **Normal**
- Phase 3 — Integration & Business Mapping: **Normal**
- Phase 4 — Canonical Read Model & Monitoring: **Normal**
- Phase 5 — Reporting & End-to-End Lineage: **Normal**
- Runtime Release Gate: **READY**
- Vite Build: **PASS**

## Governance interpretation

The historical gate is now **evidence-complete at the reconstructed closure level**.

This does not claim H-DQ-01 … H-DQ-12 are the original historical labels. The provenance limitation is explicit so the project has an auditable closure trail without fabricating missing identifiers.

The release decision continues to depend on live runtime validators and the five-phase governance gate. Any future regression must reopen the relevant reconstructed closure item rather than suppressing the validator.

## Source basis

This register was reconstructed from:

- LIMAS development/chat handoff exports dated 2026-10-01 through 2026-10-06;
- repository runtime DQ/audit implementation;
- current Product Database / business-mapping / canonical-read-model governance implementation;
- current Phase 1–5 runtime audit evidence.
