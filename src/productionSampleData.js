// Explicit production-like sample dataset.
// This is intentionally separate from the E2E runtime mode.
// It reuses the validated fixture structure as a deterministic sample source,
// but remaps record IDs so production sample records can never be mistaken for E2E fixtures.
import {
  E2E_DUMMY_META,
  E2E_MASTER_DATA,
  E2E_DUMMY_PRODUCT_DATA,
  E2E_COUNTRY_MONITORING_POLICY,
  E2E_ENTITY_MASTER,
  E2E_MLK_ENTITY_SCOPE,
  E2E_CCL_ENTITY_SCOPE,
  E2E_CCL_LIMIT_SCOPE,
  E2E_LPG_MASTER_INDUSTRY
} from './e2eDummyData';

const clone=value=>JSON.parse(JSON.stringify(value));

export const PRODUCTION_SAMPLE_META={
  datasetId:"LIMAS-PRODUCTION-SAMPLE-V1",
  period:"October 2026 • Production Sample",
  asOfDate:E2E_DUMMY_META.asOfDate,
  status:"PRODUCTION_SAMPLE",
  description:"Master Limit → Product Source → Mapping → Normalization → Aggregation → Monitoring → Report"
};

export const PRODUCTION_SAMPLE_MASTER_DATA=clone(E2E_MASTER_DATA);
export const PRODUCTION_SAMPLE_COUNTRY_MONITORING_POLICY=clone(E2E_COUNTRY_MONITORING_POLICY);
export const PRODUCTION_SAMPLE_ENTITY_MASTER=clone(E2E_ENTITY_MASTER);
export const PRODUCTION_SAMPLE_MLK_ENTITY_SCOPE=clone(E2E_MLK_ENTITY_SCOPE);
export const PRODUCTION_SAMPLE_CCL_ENTITY_SCOPE=clone(E2E_CCL_ENTITY_SCOPE);
export const PRODUCTION_SAMPLE_CCL_LIMIT_SCOPE=clone(E2E_CCL_LIMIT_SCOPE);
export const PRODUCTION_SAMPLE_LPG_MASTER_INDUSTRY=clone(E2E_LPG_MASTER_INDUSTRY);

const productPrefix={
  CASHLOAN:"PRD-CL-",
  "NON CASH LOAN":"PRD-NCL-",
  "CREDIT LINE":"PRD-CRL-",
  "Investment Line":"PRD-INV-",
  BONDS:"PRD-BOND-",
  NOSTRO:"PRD-NOSTRO-",
  "Nominal Pertanggungan":"PRD-CIL-"
};

export const PRODUCTION_SAMPLE_PRODUCT_DATA=Object.fromEntries(
  Object.entries(E2E_DUMMY_PRODUCT_DATA).map(([productId,rows])=>[
    productId,
    (rows||[]).map((row,index)=>{
      const next=clone(row);
      const oldId=String(next.meta?.recordId||String(index+1).padStart(4,"0"));
      next.meta={...(next.meta||{}),recordId:productPrefix[productId]+oldId};
      return next;
    })
  ])
);
