import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const main=fs.readFileSync(path.join(root,'src/main.jsx'),'utf8');
const identity=fs.readFileSync(path.join(root,'src/identity/identityContract.js'),'utf8');
const report=fs.readFileSync(path.join(root,'src/reportDependencyMatrix.js'),'utf8');
const productFinal=fs.readFileSync(path.join(root,'src/productFinal/ProductFinalApp.jsx'),'utf8');

let fails=0;
const pass=(label)=>console.log(`PASS · ${label}`);
const fail=(label)=>{console.error(`FAIL · ${label}`);fails++;};
const check=(cond,label)=>cond?pass(label):fail(label);

check(/aggregateByIdentity/.test(main),'main imports governed identity aggregation checker');
check(/rebuildRuntimeIdentityBridge\(\)/.test(main),'identity bridge rebuild is called from integration mapping flow');
check(/runtimeIdentityState\.byCif\.get\(String\(r\.key\|\|""\)\)/.test(main),'MLK rows resolve identity by governed CIF bridge');
check(/governedGroup\?\.holding/.test(main),'MLK group roll-up uses governed identity to resolve holding');
check(/mlkAggregationAudit=aggregateByIdentity/.test(main),'runtime MLK Entity/Group/Consolidated aggregation audit is wired');
check(/runtimeEnrichmentByProduct/.test(main),'runtime report enrichment registry is exposed');
check(/evaluateReportReady\(reportDependencyMatrix\)/.test(main),'runtime Report Ready evaluator is invoked');
check(/fields:productSchemaFields/.test(main),'Product UI Source surface uses governed raw schema fields');
check(/PRODUCT → CIF\/Debtor → Entity → Group|Identity/.test(productFinal),'Product detail includes governed identity surface');
check(/runtimePending/.test(report),'report dependency evaluator exposes runtime pending state');
check(/runtime_enrichment_complete/.test(report),'report dependency has runtime enrichment gate');
check(/export function aggregateByIdentity/.test(identity),'identity contract exports aggregation checker');

// 3R must not regress into using the old implicit MLK resolver as the source of MLK identity.
const mlkStart=main.indexOf('function mlkMonitoringRows');
const mlkEnd=main.indexOf('function ',mlkStart+10);
const mlkBody=main.slice(mlkStart,mlkEnd<0?main.length:mlkEnd);
check(!/resolveMlkIdentity\(/.test(mlkBody),'MLK monitoring no longer calls legacy inline identity resolver');
check(/runtimeIdentityState\.byCif/.test(mlkBody),'MLK monitoring references governed runtime identity');

if(fails){process.exitCode=1;}else{console.log('3R RUNTIME WIRING GATE PASS');}
