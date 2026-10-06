# LIMAS Product Final — Unfinished Plan Tracker
## Sequential Development Control — 2026-10-06

Purpose: keep every unfinished Product Final requirement explicitly managed and prevent a functional pass from being mistaken for visual/product-final completion.

## Locked architecture
- Business truth remains canonical and read-only in Product Final.
- Product Final is an experience layer over the existing canonical read model.
- No duplicate master-limit truth, duplicate database, or invented business calculation.
- Each phase follows: IMPLEMENT → AUDIT → BUILD → REGRESSION → VISUAL CHECK → GATE.
- Do not advance to the next phase while the current phase is BLOCKED/FAIL.

## Current phase matrix

| Phase | Scope | Status | Gate |
|---|---|---|---|
| 8A | Information Architecture | PASS | Closed |
| 8B | Reference-based enterprise visual language | BLOCKED AT VISUAL GATE | Implementation + automated QA PASS; browser visual acceptance still blocked by protected preview access |
| 8C | Management dashboard / executive analytics | PENDING | Starts only after 8B PASS |
| 8D | Large dataset / stress UX | PASS* | Re-run after visual work if regression |
| 8E | Limit Management workspace | PASS* | Re-run after visual work if regression |
| 8F | Limit action / switching workflow | PARTIAL / SIMULATION | Keep simulation-only until backend/workflow authority is confirmed |
| 8G | Approval + audit trail | NOT STARTED | Business workflow gap must be resolved before implementation |
| 8H | Full detail workspace | PARTIAL | Complete analytical drill-down/detail workspace |
| 8I | Reports + Governance UX finalization | PARTIAL | Final Trust Center/report acceptance |
| 8J | E2E stress + visual acceptance | NOT STARTED | Final release gate |

* Previously passed, but subject to mandatory regression after cross-cutting UI changes.

## 8B — Explicit visual target
Reference characteristics to implement, not merely imitate with colors:
- dark navy application shell/sidebar
- strong page hierarchy and compact enterprise density
- KPI row as primary decision surface
- bar chart, line/trend chart, and donut/pie analytical visuals
- exception/breach table below analytics
- domain-specific visual treatment for Country / CCL / MLK / CIL / LPG
- recommendation / switching entry point
- restrained shadows, borders, typography, status semantics, and interactive states
- reusable visual primitives so later phases do not require ad-hoc CSS

Reference source:
- LIMAS Architecture and Dashboard Mockups.png
- LIMAS_Existing_System_and_Product_Final_Proposal.md
- LIMAS_Product_Final_Blueprint_and_Build_Spec.md

## 8B acceptance
[x] Real chart primitives exist in Product Final
[x] Executive dashboard structurally matches the reference pattern
[x] Domain dashboard pattern exists
[x] Breach/exception area is visually prominent
[x] Recommendation / Switching entry point is discoverable
[x] Sidebar/navigation has product-like visual hierarchy
[x] Visual language is consistent across Dashboard/Monitoring/Limits/Reports
[x] Existing canonical data boundary remains intact
[x] Product Final audit checks visual primitives
[x] Build + audit + workflow checks PASS
[ ] Browser visual acceptance — BLOCKED: protected Vercel preview is not accessible through the current integration

### 8B implementation evidence
- Visual reference primitives added: BarChart, HorizontalBarChart, DonutChart, analytics cards, reference KPI treatment, dashboard filters, exception table, Recommendation / Switching CTA, navigation glyph treatment.
- Existing pre-build JSX warning in `src/main.jsx` was normalized in the same sequential gate; latest Vite build no longer reports the prior JSX warning.
- Latest branch commit: `f7bf0766d2fc52d20b469df315bd17a2ec0553c8`.
- GitHub Audit: SUCCESS.
- GitHub Vite Build Validation: SUCCESS.
- Vercel preview checks for both Product Final surfaces: SUCCESS.
- Remaining non-functional warnings: dependency vulnerabilities, runner/action Node warning, and Vite chunk-size warning.

### Gate decision
8B implementation is technically PASS, but the mandatory visual gate is BLOCKED by deployment access. Do not start 8C until visual acceptance is available or an equivalent trusted visual verification path is established.

## Next gates
8B PASS → 8C → 8F/8G workflow reconciliation → 8H → 8I → 8J.

Last known blocker before this tracker:
- browser-level visual acceptance could not be performed because protected Vercel preview access returned 403.
- Vite reports a pre-existing JSX warning; dependency vulnerabilities and chunk-size warning remain non-blocking until explicitly remediated.