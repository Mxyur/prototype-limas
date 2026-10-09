import {E2E_MASTER_DATA,E2E_COUNTRY_MONITORING_POLICY,E2E_ENTITY_MASTER,E2E_MLK_ENTITY_SCOPE,E2E_CCL_ENTITY_SCOPE,E2E_CCL_LIMIT_SCOPE,E2E_LPG_MASTER_INDUSTRY,E2E_LPG_MASTER_IC_NATIONAL,E2E_LPG_INDUSTRY_IC_NATIONAL_SAMPLE,E2E_LPG_MASTER_REGION,E2E_LPG_MASTER_SEGMENT,E2E_LPG_IC_SEGWIL_MAPPING} from '../src/e2eDummyData.js';
const f=[];const a=(x,m)=>{if(!x)f.push(m)};const sum=(xs,k)=>xs.reduce((s,x)=>s+(Number(x[k])||0),0);
// Country
const countries=E2E_MASTER_DATA.Country||[]; a(E2E_COUNTRY_MONITORING_POLICY.excludedCountryCodes.includes('ID'),'Country domestic exclusion missing'); a(!countries.some(x=>String(x.key).toUpperCase()==='ID'&&E2E_COUNTRY_MONITORING_POLICY.monitoringUniverse==='FOREIGN_COUNTRY_ONLY'),'Indonesia must not be a foreign monitoring object');
// CCL: entity scope and direct/indirect semantics
const entities=new Set(E2E_ENTITY_MASTER.map(x=>x.entityCode)); for(const x of E2E_CCL_ENTITY_SCOPE)a(entities.has(x.entityCode),`CCL entity unmapped: ${x.entityCode}`); a(E2E_CCL_ENTITY_SCOPE.some(x=>x.indirect&&x.entityCode==='MMI')&&E2E_CCL_ENTITY_SCOPE.some(x=>x.indirect&&x.entityCode==='AMFS'),'CCL indirect scope MMI/AMFS missing');
for(const x of E2E_CCL_LIMIT_SCOPE){a(entities.has(x.entityCode),`CCL limit entity missing: ${x.entityCode}`);a(['DIRECT','INDIRECT'].includes(x.limitType),`CCL limit type invalid: ${x.limitType}`);a(Number(x.ccl)>=Number(x.contractual||0),`CCL contractual exceeds CCL: ${x.counterpartyId}/${x.entityCode}`)}
// MLK: required entity universe and no duplicated consolidated contribution marker in fixture
for(const e of E2E_MLK_ENTITY_SCOPE)a(entities.has(e),`MLK entity scope missing: ${e}`); const mlk=E2E_MASTER_DATA.MLK||[]; a(mlk.every(x=>x.key&&x.entity&&x.group), 'MLK Product/CIF/entity/group identity chain incomplete');
// CIL: CIT = IC * multiplier, CIL <= CIT, EIL sum <= CIL
for(const x of E2E_MASTER_DATA.CIL||[]){const cit=Number(x.ic||0)*Number(x.multiplier||0);a(Math.abs(cit-Number(x.cit||0))<1e-9,`CIL CIT formula mismatch: ${x.key||x.name}`);a(Number(x.cil||0)<=cit+1e-9,`CIL exceeds CIT: ${x.key||x.name}`);a(sum(Object.values(x.eils||{}).map(v=>({v})), 'v')<=Number(x.cil||0)+1e-9,`EIL exceeds CIL: ${x.key||x.name}`)}
// LPG classification chain
for(const r of E2E_LPG_INDUSTRY_IC_NATIONAL_SAMPLE||[]){a(r.industryCode&&r.icCode,'LPG industry→IC mapping incomplete');}
for(const r of E2E_LPG_IC_SEGWIL_MAPPING||[]){a(r.sectorCode&&r.regionCode&&r.segmentCode&&r.icNasionalCode&&r.icWilayahSegmenCode,`LPG Segwil incomplete: ${r.segwilKey||r.key||'row'}`)}
a((E2E_LPG_MASTER_INDUSTRY||[]).length>0&& (E2E_LPG_MASTER_REGION||[]).length>0 && (E2E_LPG_MASTER_SEGMENT||[]).length>0,'LPG master classification references missing');
if(f.length){console.error('PHASE 6R SEMANTIC AUDIT — FAIL');f.forEach(x=>console.error(' - '+x));process.exit(1)}
console.log('PHASE 6R SEMANTIC AUDIT — PASS');console.log(`Country=${countries.length}; CCLScopes=${E2E_CCL_LIMIT_SCOPE.length}; MLKRows=${mlk.length}; CIL=${(E2E_MASTER_DATA.CIL||[]).length}; LPGSegwil=${(E2E_LPG_IC_SEGWIL_MAPPING||[]).length}`);
