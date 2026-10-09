import assert from 'node:assert/strict';
import { LIMIT_SETUP_DOMAINS, LIMIT_SETUP_DEFINITIONS, makeBusinessKey, validateLimitSetupRows, buildLimitSetupSeed } from '../src/productFinal/limitSetupContract.js';
import { E2E_MASTER_DATA, E2E_CCL_LIMIT_SCOPE, E2E_LPG_MASTER_INDUSTRY, E2E_LPG_MASTER_REGION, E2E_LPG_MASTER_SEGMENT, E2E_LPG_IC_SEGWIL_MAPPING } from '../src/e2eDummyData.js';

const seeded=buildLimitSetupSeed({limasDemoData:E2E_MASTER_DATA,E2E_CCL_LIMIT_SCOPE,lpgIndustryMaster:E2E_LPG_MASTER_INDUSTRY,lpgRegionMaster:E2E_LPG_MASTER_REGION,lpgSegmentMaster:E2E_LPG_MASTER_SEGMENT,lpgSegwil:E2E_LPG_IC_SEGWIL_MAPPING});
for(const domain of LIMIT_SETUP_DOMAINS){
  assert.ok(LIMIT_SETUP_DEFINITIONS[domain], `${domain} definition missing`);
  assert.ok(seeded[domain].length>0, `${domain} seed missing`);
  for(const row of seeded[domain].slice(0,50)){
    assert.ok(row.businessKey, `${domain} business key missing`);
    assert.ok(row.effectiveDate, `${domain} effective date missing`);
    assert.ok(row.scope, `${domain} scope missing`);
  }
}
const lpg=seeded.LPG;
assert.ok(lpg.every(r=>r.sectorCode&&r.groupingCode&&r.regionCode&&r.segmentCode&&r.icWilayahSegmenCode&&r.segwilKey),'LPG detailed fields missing');
const badWaspada=validateLimitSetupRows('LPG',[{sectorCode:'INDUSTRI BATUBARA',sectorName:'INDUSTRI BATUBARA',groupingCode:'BATUBARA',groupingName:'BATUBARA',regionCode:'R01',segmentCode:'WHOLESALE_COMMERCIAL',icWilayahSegmenCode:'WASPADA',segwilKey:'X',scope:'Region I',approvedLimit:10,limitValue:10,effectiveDate:'2026-10-01',icNasionalCode:'WASPADA',operation:'CREATE'}],[]);
assert.equal(badWaspada.valid,false,'WASPADA non-PLASTIK must fail');
const existing=seeded.CCL.slice(0,1);
const updateKey=makeBusinessKey('CCL',existing[0]);
const upd=validateLimitSetupRows('CCL',[{...existing[0],operation:'UPDATE',businessKey:updateKey}],existing);
assert.equal(upd.valid,true,'CCL UPDATE must be supported');
console.log(`[LIMAS 5R DOMAIN AUDIT] PASS • ${LIMIT_SETUP_DOMAINS.map(d=>d+'='+seeded[d].length).join(' • ')} • LPG detailed fields=${lpg[0]?.sectorCode? 'PASS':'FAIL'} • WASPADA rule=PASS • UPDATE=PASS`);
