# Historical DQ Closure Matrix — 2026-10-06

## Scope
This matrix distinguishes **current runtime validation** from **historical DQ closure evidence**. A current `dqCount=0` is not treated as proof that every historical DQ item has been individually closed.

## Current objective evidence

| Control | Evidence | Result |
|---|---|---|
| E2E invariant audit | `npm run audit` | PASS — Country=5, CCL=4, MLK=14, CIL=3, LPG=3, LPG classified source records=16, numeric checks=44 |
| Runtime isolation | `npm run audit:runtime` | PASS |
| Runtime DQ | `node scripts/audit-dq-runtime.mjs` | dqCount=0 |
| Numeric reconciliation | Same runtime audit | numericFailures=[] |
| Phase 1 | Master Limit Governance | Normal / 0 issues |
| Phase 2 | Product Universe & Product Database | Normal / 0 issues |
| Phase 3 | Integration & Business Mapping | Normal / 0 issues |
| Phase 4 | Canonical Read Model & Monitoring | Normal / 0 issues |
| Phase 5 | Reporting & End-to-End Lineage | Normal / 0 issues |
| Release gate | Runtime audit | READY |
| Vite build | GitHub Actions | PASS |
| Vercel preview | PR #17 preview | READY |

## Historical DQ evidence status

The repository currently does not contain a canonical artifact enumerating the original 12 historical DQ IDs with their individual closure evidence. Therefore no historical item is marked CLOSED solely from the runtime audit.

| Historical DQ bucket | Current runtime evidence | Historical closure evidence | Status |
|---|---|---|---|
| LPG Industry / Grouping / Region / Segment | Covered by Phase 2/3 audit and LPG classified-record checks | No canonical per-DQ closure record found | OPEN-EVIDENCE |
| LPG Segwil / IC classification | Covered by business mapping + E2E audit | No canonical per-DQ closure record found | OPEN-EVIDENCE |
| LPG Waspada / monitoring rule | Covered by runtime DQ and phase controls | No canonical per-DQ closure record found | OPEN-EVIDENCE |
| LPG limit / exposure bucket consistency | Numeric audit + Master Limit phase pass | No canonical per-DQ closure record found | OPEN-EVIDENCE |
| Country allocation | Country fixture and E2E audit pass | No canonical per-DQ closure record found | OPEN-EVIDENCE |
| CCL entity / Direct-Indirect / facility mapping | CCL fixture and E2E audit pass | No canonical per-DQ closure record found | OPEN-EVIDENCE |
| MLK entity-level mapping | MLK fixture and E2E audit pass | No canonical per-DQ closure record found | OPEN-EVIDENCE |
| CIL EIL/CIL reconciliation | CIL fixture and E2E audit pass | No canonical per-DQ closure record found | OPEN-EVIDENCE |
| Source-schema / enrichment contamination | Product Dictionary governance + runtime isolation pass | No canonical per-DQ closure record found | OPEN-EVIDENCE |

## Release interpretation

The application currently satisfies the **runtime release gate**:
- active runtime DQ = 0
- numeric failures = 0
- blocking layers = none
- blocking phases = none
- five LIMAS phases = Normal

However, the historical-governance gate remains **evidence-incomplete** until the original 12 DQ items are enumerated and each receives:

`DQ ID → Root Cause → Affected Record(s) → Corrective Action → Validation/Recheck → Final Status`

## Next action

Recover the authoritative 12 historical DQ IDs from prior project evidence/chat export or an existing governance artifact. Then replace each OPEN-EVIDENCE row with a one-to-one closure record. Do not infer missing DQ IDs.

## Non-goals

- Do not change Product DB terminology.
- Do not change canonical calculation rules.
- Do not merge PR #17 based solely on runtime PASS.
- Do not manufacture historical DQ closure evidence.
