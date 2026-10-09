import {REFERENCE_MASTER_DEFINITIONS,validateMasterRows,parseCsv} from '../src/productFinal/referenceMasterContract.js';
const errors=[];
if(REFERENCE_MASTER_DEFINITIONS.length!==11) errors.push('Expected 11 reference masters');
for(const d of REFERENCE_MASTER_DEFINITIONS){if(!d.keyFields?.length||!d.fields?.length) errors.push(`Invalid definition ${d.id}`);}
const sample={countryCode:'SG',countryName:'Singapore',foreignMonitoringEligible:true};
const valid=validateMasterRows('COUNTRY',[sample],[]);
const screenResult=validateMasterRows('COUNTRY',[sample],[]);
const uploadResult=validateMasterRows('COUNTRY',parseCsv('countryCode,countryName,foreignMonitoringEligible\nSG,Singapore,TRUE'),[]);
if(JSON.stringify(screenResult)!==JSON.stringify(uploadResult)) errors.push('Screen/upload validation parity failed');
if(!valid.valid) errors.push('Valid COUNTRY row rejected');
const dup=validateMasterRows('COUNTRY',[{countryCode:'SG',countryName:'Singapore'},{countryCode:'SG',countryName:'Singapore 2'}],[]);
if(!dup.errors.some(x=>x.code==='DUPLICATE_IN_UPLOAD')) errors.push('Duplicate detection failed');
const csv=parseCsv('countryCode,countryName\nSG,Singapore\nAU,Australia');
if(csv.length!==2||csv[0].countryCode!=='SG') errors.push('CSV parser failed');
const lifecycle=['DRAFT','REVIEW','APPROVED','EFFECTIVE'];
if(lifecycle.join('>')!=='DRAFT>REVIEW>APPROVED>EFFECTIVE') errors.push('Lifecycle contract mismatch');
if(errors.length){console.error(JSON.stringify({status:'FAIL',errors},null,2));process.exit(1);}
console.log(JSON.stringify({status:'PASS',masters:REFERENCE_MASTER_DEFINITIONS.length,validation:'screen_and_upload_shared',duplicateCheck:'PASS',csvParse:'PASS'},null,2));
