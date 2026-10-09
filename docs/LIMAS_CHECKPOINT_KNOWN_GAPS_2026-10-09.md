# LIMAS Product Final â€” Checkpoint Known Gaps

**Checkpoint date:** 2026-10-09
**Purpose:** Git/Preview checkpoint only; this is not production final acceptance.

## Verified at checkpoint

- The source checkpoint's automated gate chain and Vite production build completed successfully in the local testing copy on 2026-10-09.
- Runtime/browser acceptance is tracked separately from static/automated gate results.

## Explicitly open after browser review

1. **Limit Action semantic UI across all domains requires further alignment to locked business truth.** The current CCL action UI was observed to expose Contractual Limit, Entity Scope, Direct/Indirect Scope, and Proposed Contractual as if these were independent action dimensions/inputs. That is not accepted as the final CCL business workflow.
2. **CCL boundary:** Inhouse Limit and CCL Limit are business-maintained limits; Capacity is reference/derived; Contractual is read-only/system-derived from applicable product limits (Bank Loan + Commercial Line + Treasury Line) with no double counting.
3. **LPG Limit Action:** the action interface still requires an end-to-end master-driven classification path: Industry/Sector â†’ Grouping â†’ Region â†’ Segment â†’ IC Nasional (separate from IC Segwil) â†’ IC Wilayah Segmen â†’ Scope/Limit Bucket. WASPADA remains valid only for PLASTIK. Positive exposure without a resolved bucket/valid limit must remain a Data Issue, not zero utilization.
4. **MLK:** Switching remains intra-Group Usaha; Group Breach/member uplift remains a separate workflow with canonical current/projected group position.
5. **Country and CIL:** domain-specific action boundaries must be verified in the browser against the locked business contract, not inferred from generic UI fields.
6. Responsive, persistence, screen-vs-upload parity, and full browser acceptance remain subject to final manual acceptance.

## Release boundary

This branch is a review checkpoint only. Do not promote it to Production until semantic corrections, browser acceptance, and the final acceptance gate have been completed.
