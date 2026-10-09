import {LIMIT_SETUP_DOMAINS,LIMIT_SETUP_FIELDS,validateLimitSetupRows,buildLimitSetupSeed,transitionLimitSetup} from '../src/productFinal/limitSetupContract.js';
import {readFile} from 'node:fs/promises';
const app=await readFile('src/productFinal/ProductFinalApp.jsx','utf8');
const failures=[]; const assert=(x,m)=>{if(!x)failures.push(m)};
assert(LIMIT_SETUP_DOMAINS.join('|')==='Country|CCL|MLK|CIL|LPG','five limit domains locked');
assert(LIMIT_SETUP_FIELDS.includes('effectiveDate')&&LIMIT_SETUP_FIELDS.includes('approval'),'required lifecycle fields missing');
for(const [domain,rows] of Object.entries(buildLimitSetupSeed({limasDemoData:{Country:[],CCL:[],MLK:[],CIL:[],LPG:[]}}))) assert(Array.isArray(rows),`${domain} seed unavailable`);
const good=validateLimitSetupRows('Country',[{businessKey:'SG',scope:'FOREIGN:SG',limitValue:100,effectiveDate:'2026-09-30',threshold:.8}]);
assert(good.valid,'valid Country setup rejected');
const bad=validateLimitSetupRows('Country',[{businessKey:'SG',scope:'',limitValue:-1,effectiveDate:'2026-10-01',expiryDate:'2026-09-01',threshold:2},{businessKey:'SG',scope:'x',limitValue:1,effectiveDate:'2026-10-01'}]);
assert(!bad.valid&&bad.errors.length>=4,'invalid setup validation incomplete');
assert(transitionLimitSetup('DRAFT','REVIEW')&&transitionLimitSetup('REVIEW','APPROVED')&&transitionLimitSetup('APPROVED','EFFECTIVE'),'limit lifecycle incomplete');
assert(app.includes('authoritative Master Limit remains read-only'),'master limit source-owned boundary missing');
assert(!app.includes('Edit Master Limit'),'direct master limit edit regression');
if(failures.length){console.error('PHASE 5R LIMIT SETUP AUDIT — FAIL');failures.forEach(x=>console.error(' - '+x));process.exit(1)}
console.log('PHASE 5R LIMIT SETUP AUDIT — PASS');console.log('domains=5; requiredFields=PASS; validation=PASS; lifecycle=PASS; sourceOwnedMasterBoundary=PASS');
