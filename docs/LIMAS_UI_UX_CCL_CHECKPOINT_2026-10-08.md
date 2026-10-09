# LIMAS Product Final — UI/UX + CCL Allocation Checkpoint

**Date:** 2026-10-08
**Checkpoint:** Executive cockpit + Limit Management / CCL allocation refinement
**Purpose:** Lock a coherent visual/business-boundary checkpoint before browser acceptance and later 13R/14R release.

## Business boundary locked

### CCL maintenance
- Business-maintained inputs are **Inhouse Limit** and **CCL Limit**.
- **Capacity** is treated as reference/derived context and is not a free-form screen input.
- **Contractual** is derived, not manually entered.
- Contractual formula:

```text
Contractual
= Bank Loan Limit
+ Commercial Line Limit
+ Treasury Line Limit
```

The raw source `contractual` field is not renamed or deleted. Product Final derives the governed output from the product-limit components for allocation / monitoring usage.

### Separation of concerns

```text
Business input
  → Inhouse + CCL

Reference / derived
  → Capacity

Product-limit components
  → Bank Loan + Commercial Line + Treasury Line

Derived CCL output
  → Contractual
```

## UI/UX changes

### Dashboard
- Rebuilt as an executive decision surface instead of a crowded data table.
- KPI band now has clear hierarchy: Total Limit, Utilization, Available, Breaches, Near Breach.
- Domain health is presented as a readable list with progress meters and explicit status.
- Priority exceptions are separated from general domain health.
- Management Focus identifies highest utilization, most exceptions, and pending actions.
- Governance status is compact and remains visible without dominating the page.
- Dark/deep-navy enterprise shell and light data surfaces remain the reference visual language.

### Limit Management / Allocation
- CCL allocation is now a dedicated business surface rather than a generic allocation table.
- Input vs derived values are visually separated.
- Contractual composition is shown explicitly by product component.
- Entity/scope reconciliation is visible for Direct / Indirect CCL scope rows.
- Generic domains retain a clean canonical read allocation view.
- Operational tables use stable spacing, readable headers and horizontal overflow rather than compressed/colliding columns.

### Limit Setup
- CCL edit form exposes only the approved business-maintained inputs.
- Derived/reference values are surfaced in a non-editable system-derived panel.
- Screen and bulk upload continue to use the same validation engine and lifecycle.

## Validation completed in this environment

- E2E data audit: PASS
- Runtime mode / fixture isolation: PASS
- Product Final UI audit: PASS
- Limit Setup audit: PASS
- 5R domain audit: PASS
- 6R semantic + deep semantic: PASS
- Operational maintenance audit: PASS
- 8R report contract: PASS
- 12R visual contract: PASS
- Final sequence audit: PASS (`13R = automatable PASS`, `14R = READY/HOLD`)

## Environment limitation

Local Vite bundling and browser rendering were not executed in this environment because the package has no installed `node_modules` cache and dependency retrieval is unavailable/timed out.

Therefore this checkpoint is **not** a 13R browser final acceptance and is **not** a 14R production release.

## Next acceptance

Run the package locally in the user's Windows environment, perform visual/browser checks for:

1. Dashboard hierarchy and spacing.
2. Limit Management → CCL → Allocation.
3. CCL input boundary: Inhouse + CCL only.
4. Contractual reconciliation by Bank Loan + Commercial Line + Treasury Line.
5. No collision / clipping in dense tables.
6. Screen / CSV maintenance parity and lifecycle.

After browser acceptance, the checkpoint can be promoted toward 13R/14R following the locked release procedure.
