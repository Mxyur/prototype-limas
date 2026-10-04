# LIMAS — CCL Credit Line Lineage Correction

Date: 2026-10-04

## Confirmed Business Rule

CCL does not consume raw CL/NCL as direct CCL products. For FI debtor/counterparty:

- CL (Cash Loan) = Bank Loan
- NCL (Non Cash Loan) = Commercial Line
- Treasury DN/LN = Treasury Line
- Credit Line is the derived layer combining the upstream FI components.
- CCL monitoring consumes Credit Line only.

Lineage:

`CL (debtor FI) → Bank Loan → Credit Line`

`NCL (debtor FI) → Commercial Line → Credit Line`

`Treasury → Treasury Line → Credit Line`

`Credit Line → CCL Monitoring`

## Defects Corrected

1. Removed direct CCL linkage for raw CASHLOAN/NON CASH LOAN mappings.
2. Removed the previous `LINEAGE_ONLY` treatment for NCL; NCL is a real upstream exposure and contributes to Commercial Line.
3. CCL exposure now consumes only CREDIT LINE integration output.
4. Credit Line CCL mapping derives Bank Loan from FI CL, Commercial Line from FI NCL, Treasury Line from Treasury components, and the derived Credit Line total from all three components.
5. Dummy CCL data was reconciled to the CCL master component values.
6. Regression audit now enforces the lineage and rejects direct CL/NCL CCL exposure metadata.

## Expected Reconciliation

`Bank Loan = Σ FI CL`
`Commercial Line = Σ FI NCL`
`Treasury Line = Treasury DN + Treasury LN`
`Facility = Bank Loan + Commercial Line + Treasury Line`
`CCL Exposure = derived Credit Line layer`

Raw CL/NCL must never be added again after Credit Line construction.