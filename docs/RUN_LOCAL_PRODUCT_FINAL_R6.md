# LIMAS Product Final R6 — Local Run

## Source

Use the extracted project root. Do not nest `r6-package` inside the repo.

## Install

```powershell
npm install
```

`npm ci` is optional; use `npm install` when the environment has a package-cache/network limitation.

## Automated QA

```powershell
npm run audit
npm run audit:runtime
npm run audit:product-final
npm run audit:limit-action
npm run audit:phase8
npm run audit:identity
npm run audit:3r
npm run audit:source-contract
npm run audit:report-dependency
npm run audit:4r
npm run audit:5r
npm run audit:5r:domain
npm run audit:ops
npm run audit:6r
npm run audit:6r:deep
npm run audit:8r:contract
npm run audit:12r:visual
npm run audit:final
```

## Build

```powershell
npm run build
```

## Run

```powershell
npm run dev
```

Open:

`http://localhost:5173`

Product Final defaults to the Product Final runtime surface.

## Browser Acceptance

Verify:

1. Reference Master persists after reload.
2. Screen CREATE / UPDATE works.
3. CSV file picker → validation → preview → draft works.
4. Template download works.
5. Limit Setup persists by domain.
6. Draft → Review → Approved → Effective works.
7. LPG setup exposes Industry / Grouping / IC Nasional / Region / Segment / IC Segwil / Scope / Limit.
8. MENARIK / NETRAL / SELEKTIF / WASPADA are business parameters.
9. WASPADA only accepts PLASTIK.
10. MLK Switching remains separate from Group Breach / Member Uplift.
11. Group Breach keeps projected Group Position canonical/read-only.
12. Limit Action lifecycle and SYNCED boundary are visible.
13. Dark / black / deep-navy Product Final reference is preserved.
14. Large data drilldown is paginated and searchable.

Do not push Git / Vercel until 13R is fully PASS.
