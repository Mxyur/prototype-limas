import assert from 'node:assert/strict';
import {E2E_MASTER_DATA,E2E_COUNTRY_MONITORING_POLICY,E2E_ENTITY_MASTER,E2E_MLK_ENTITY_SCOPE,E2E_CCL_ENTITY_SCOPE,E2E_CCL_LIMIT_SCOPE,E2E_LPG_MASTER_INDUSTRY,E2E_LPG_MASTER_IC_NATIONAL,E2E_LPG_INDUSTRY_IC_NATIONAL_SAMPLE,E2E_LPG_MASTER_REGION,E2E_LPG_MASTER_SEGMENT,E2E_LPG_IC_SEGWIL_MAPPING,E2E_DUMMY_PRODUCT_DATA} from '../src/e2eDummyData.js';
import {buildLimitSetupSeed} from '../src/productFinal/limitSetupContract.js';

const failures=[]; const check=(x,m)=>{if(!x)failures.push(m)};
const num=v=>Number(v||0);
const entities=new Set(E2E_ENTITY_MASTER.map(x=>x.entityCode));

// Country
check(E2E_COUNTRY_MONITORING_POLICY.excludedCountryCodes.includes('ID'),'Country: ID exclusion missing');
check(E2E_COUNTRY_MONITORING_POLICY.monitoringUniverse==='FOREIGN_COUNTRY_ONLY','Country: monitoring universe mismatch');
for(const row of E2E_MASTER_DATA.Country||[]) check(String(row.key).toUpperCase()!=='ID','Country: Indonesia must not be a foreign master row');

// CCL
for(const entity of E2E_CCL_ENTITY_SCOPE) check(entities.has(entity.entityCode),`CCL: unknown entity ${entity.entityCode}`);
check(E2E_CCL_ENTITY_SCOPE.filter(x=>x.indirect).map(x=>x.entityCode).sort().join('|')==='AMFS|MMI','CCL: indirect scope must be MMI + AMFS');
for(const m of E2E_CCL_LIMIT_SCOPE){
  check(['DIRECT','INDIRECT'].includes(m.limitType),`CCL: invalid scope ${m.limitType}`);
  check(num(m.ccl)>=num(m.contractual),'CCL: contractual > CCL '+m.counterpartyId+'/'+m.entityCode);
  check(num(m.commercialLine)>=0 && num(m.treasuryLine)>=0,'CCL: negative line component '+m.counterpartyId+'/'+m.entityCode);
}
for(const c of E2E_MASTER_DATA.CCL||[]){
  check(Math.abs(num(c.commercialLineLimit)-(num(c.commercialDnLimit)+num(c.commercialLnLimit)))<1e-9,`CCL: Commercial line reconciliation ${c.key}`);
  check(Math.abs(num(c.treasuryLineLimit)-(num(c.treasuryDnLimit)+num(c.treasuryLnLimit)))<1e-9,`CCL: Treasury line reconciliation ${c.key}`);
  check(Math.abs(num(c.ccl)-num(c.ccl))<1e-9,`CCL: invalid CCL value ${c.key}`);
}

// MLK
for(const entity of E2E_MLK_ENTITY_SCOPE) check(entities.has(entity),`MLK: entity scope missing ${entity}`);
for(const m of E2E_MASTER_DATA.MLK||[]){
  check(m.key&&m.entity&&m.group,`MLK: identity incomplete ${m.name||m.key}`);
  check(num(m.clLimit)>=0&&num(m.nclLimit)>=0&&num(m.treasuryLine)>=0,`MLK: negative component ${m.key}`);
  check(m.masterLimitSetting!==undefined&&m.masterLimitSetting!==null&&m.masterLimitSetting!=="",`MLK: approved Master Limit missing ${m.key}`);
}

// CIL
for(const c of E2E_MASTER_DATA.CIL||[]){
  const cit=num(c.ic)*num(c.multiplier);
  check(Math.abs(cit-num(c.cit))<1e-9,`CIL: CIT formula mismatch ${c.key}`);
  const eil=Object.values(c.eils||{}).reduce((a,v)=>a+num(v),0);
  check(eil<=num(c.cil)+1e-9,`CIL: EIL sum > CIL ${c.key}`);
}

// LPG reference chain
const setup=buildLimitSetupSeed({limasDemoData:E2E_MASTER_DATA,E2E_CCL_LIMIT_SCOPE,lpgIndustryMaster:E2E_LPG_MASTER_INDUSTRY,lpgRegionMaster:E2E_LPG_MASTER_REGION,lpgSegmentMaster:E2E_LPG_MASTER_SEGMENT,lpgSegwil:E2E_LPG_IC_SEGWIL_MAPPING});
const icCodes=new Set(E2E_LPG_MASTER_IC_NATIONAL.map(x=>String(x.icCode).toUpperCase()));
for(const x of E2E_LPG_MASTER_IC_NATIONAL){
  check(['MENARIK','NETRAL','SELEKTIF','WASPADA'].includes(String(x.icCode).toUpperCase()),`LPG: unknown IC ${x.icCode}`);
}
for(const x of E2E_LPG_IC_SEGWIL_MAPPING){
  check(icCodes.has(String(x.icNasionalCode).toUpperCase()),`LPG: IC Nasional unresolved ${x.sectorName}/${x.regionCode}`);
  check(icCodes.has(String(x.icWilayahSegmenCode).toUpperCase()),`LPG: IC Segwil unresolved ${x.sectorName}/${x.regionCode}`);
  check(x.segwilKey && x.sectorCode && x.regionCode && x.segmentCode,`LPG: Segwil key incomplete ${x.sectorName}/${x.regionCode}`);
  check(String(x.icWilayahSegmenCode).toUpperCase()!=='WASPADA' || String(x.sectorName).toUpperCase().includes('PLASTIK'),'LPG: WASPADA must be PLASTIK only');
}
for(const r of setup.LPG){
  check(r.sectorCode&&r.groupingCode&&r.regionCode&&r.segmentCode&&r.icWilayahSegmenCode&&r.scope,`LPG: limit bucket incomplete ${r.businessKey}`);
  if(String(r.icNasionalCode).toUpperCase()==='WASPADA'||String(r.icWilayahSegmenCode).toUpperCase()==='WASPADA') check(String(r.sectorName).toUpperCase().includes('PLASTIK'),'LPG: black appetite cannot apply outside PLASTIK');
}
const lpgSource=[...(E2E_DUMMY_PRODUCT_DATA.CASHLOAN||[]),...(E2E_DUMMY_PRODUCT_DATA['NON CASH LOAN']||[])].filter(r=>r.data?.ecosystem_lpg||r.data?.segmen_lpg||r.data?.region_lpg);
for(const r of lpgSource){
  check(r.data.ecosystem_lpg&&r.data.segmen_lpg&&r.data.region_lpg,`LPG: incomplete source classification ${r.meta?.recordId}`);
  const match=(E2E_MASTER_DATA.LPG||[]).some(m=>String(m.key).toUpperCase()===`${r.data.ecosystem_lpg}|${r.data.segmen_lpg}`.toUpperCase());
  check(match,`LPG: source bucket not configured ${r.meta?.recordId}`);
}

if(failures.length){console.error('PHASE 6R DEEP SEMANTIC AUDIT — FAIL');failures.forEach(x=>console.error(' - '+x));process.exit(1)}
console.log(`[LIMAS 6R DEEP SEMANTIC AUDIT] PASS • Country=${(E2E_MASTER_DATA.Country||[]).length} • CCLScopes=${E2E_CCL_LIMIT_SCOPE.length} • MLK=${(E2E_MASTER_DATA.MLK||[]).length} • CIL=${(E2E_MASTER_DATA.CIL||[]).length} • LPGSource=${lpgSource.length} • LPGBuckets=${setup.LPG.length}`);
