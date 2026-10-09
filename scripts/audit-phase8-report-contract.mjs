import assert from 'node:assert/strict';
import {REPORT_BUSINESS_CONTRACT} from '../src/productFinal/reportBusinessContract.js';
import {PRODUCT_FINAL_REPORT_GROUPS} from '../src/productFinal/productFinalReportContract.js';
const expected=['Country','CCL_DIRECT','CCL_INDIRECT','CCL','MLK','MLK_CONSOLIDATED','CIL','LPG'];
for(const key of expected){assert.ok(REPORT_BUSINESS_CONTRACT[key],`${key} business report contract missing`);assert.ok(REPORT_BUSINESS_CONTRACT[key].stack.length>=5,`${key} report stack too shallow`);assert.ok(REPORT_BUSINESS_CONTRACT[key].drilldown.length>=4,`${key} drilldown too shallow`);assert.ok(REPORT_BUSINESS_CONTRACT[key].setup,`${key} setup bridge missing`)}
assert.ok(REPORT_BUSINESS_CONTRACT.LPG.stack.includes('IC Nasional')&&REPORT_BUSINESS_CONTRACT.LPG.stack.includes('IC Segwil'),'LPG IC layers missing');
assert.ok(REPORT_BUSINESS_CONTRACT.CCL.stack.includes('Inhouse')&&REPORT_BUSINESS_CONTRACT.CCL.stack.includes('Capacity')&&REPORT_BUSINESS_CONTRACT.CCL.stack.includes('Contractual'),'CCL business stack incomplete');
assert.ok(REPORT_BUSINESS_CONTRACT.MLK.stack.includes('Holding')&&REPORT_BUSINESS_CONTRACT.MLK.stack.includes('CIF / Debtor'),'MLK business stack incomplete');
console.log(`[LIMAS 8R REPORT CONTRACT AUDIT] PASS • reportVariants=${expected.length} • groups=${PRODUCT_FINAL_REPORT_GROUPS.length} • LPG/CCL/MLK business stacks=PASS`);
