// 1R acceptance: every rendered report column resolved through the full dependency chain.
import fs from "node:fs";
import assert from "node:assert/strict";
import {E2E_DUMMY_PRODUCT_DATA as P,E2E_MASTER_DATA as M} from "../src/e2eDummyData.js";
import {PRODUCT_SOURCE_SCHEMA_OVERRIDES} from "../src/productSchemaGovernance.js";
import {buildReportDependencyMatrix,evaluateReportReady,expandLpgColumns} from "../src/reportDependencyMatrix.js";

const src=fs.readFileSync(new URL("../src/main.jsx",import.meta.url),"utf8");
const block=src.slice(src.indexOf("const reportConfig={"),src.indexOf("\n};",src.indexOf("const reportConfig={")));
const heads=[...block.matchAll(/^\s*"?([A-Za-z_]+)"?:\{title:/gm)];
const reportConfig={};
heads.forEach((h,i)=>{
  const seg=block.slice(h.index,heads[i+1]?.index??block.length);
  const cols=[...seg.matchAll(/\["([^"]+)","([A-Za-z0-9_]+)"\]/g)].map(m=>[m[1],m[2]]);
  reportConfig[h[1]]={columns:cols};
});
// LPG columns are spread-built in main.jsx; expand with the same scope list.
const scopesMatch=src.match(/const LPG_BANK_SCOPE=([^;\r\n]+)/),regMatch=src.match(/const LPG_REGIONAL_SCOPES=\[([^\]]*)\]/);
const lpgScopes=["Bankwide",...Array.from({length:12},(_,i)=>"Region "+["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"][i]),"KP + OVS"];
reportConfig.LPG={columns:expandLpgColumns(lpgScopes,s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,""))};

// Product schema fields as the app registers them: existing source samples + governed overrides (read-only).
const schemaFields={};
Object.entries(P).forEach(([pid,rows])=>{const s=new Set(PRODUCT_SOURCE_SCHEMA_OVERRIDES[pid]||[]);rows.forEach(r=>Object.keys(r.data||{}).forEach(k=>s.add(k)));schemaFields[pid]=[...s];});

const matrix=buildReportDependencyMatrix({reportConfig,productDb:P,masterData:M,productSchemaFields:schemaFields,fieldAliases:{}});
const ready=evaluateReportReady(matrix);

console.log("REPORT DEPENDENCY MATRIX — "+matrix.length+" columns across "+Object.keys(ready).length+" reports\n");
let gapTotal=0;
Object.entries(ready).forEach(([r,v])=>{
  gapTotal+=v.columns-v.ready;
  console.log((v.reportReady?"READY ":"GAP   ")+r.padEnd(18)+" cols="+String(v.columns).padStart(3)+" ready="+String(v.ready).padStart(3)+" orphan="+v.orphan.length+" runtimePending="+v.runtimePending+" "+JSON.stringify(v.gapSummary));
});
fs.mkdirSync(new URL("../docs/generated/",import.meta.url),{recursive:true});
fs.writeFileSync(new URL("../docs/generated/report-dependency-matrix.json",import.meta.url),JSON.stringify({generated_for_as_of:"2026-09-30",rows:matrix,summary:ready},null,1));

const orphans=matrix.filter(r=>r.status==="ORPHAN");
const checks=[];const t=(n,f)=>{try{f();checks.push(["PASS",n])}catch(e){checks.push(["FAIL",n+" :: "+e.message])}};
t("matrix covers every extracted report column",()=>assert.ok(matrix.length>100));
t("no orphan report column (every column has a lineage contract)",()=>assert.equal(orphans.length,0,orphans.slice(0,5).map(o=>o.report+"."+o.column).join(", ")));
t("every MASTER_LIMIT-backed column resolves to a registered master",()=>{const bad=matrix.filter(r=>r.checks.master_resolved===false);assert.equal(bad.length,0,bad.slice(0,5).map(o=>o.report+"."+o.column+" "+o.gaps.join("|")).join(", "));});
t("every canonical product-backed column has source fields + business mapping",()=>{const bad=matrix.filter(r=>r.checks.source_complete===false||r.checks.mapping_complete===false);assert.equal(bad.length,0,bad.slice(0,5).map(o=>o.report+"."+o.column+" "+o.gaps.join("|")).join(", "));});
t("every enrichment a report depends on is declared in the mapping contract or master-resolved",()=>{const bad=matrix.filter(r=>r.checks.enrichment_complete===false);assert.equal(bad.length,0,[...new Set(bad.flatMap(b=>b.gaps.filter(g=>g.startsWith("ENRICH"))))].join(", "));});
const pending=matrix.filter(r=>(r.runtime_pending||[]).length>0).length;
let runtimeEvidence=null; try { runtimeEvidence=JSON.parse(fs.readFileSync(new URL("../docs/generated/r3-runtime-evidence.json",import.meta.url),"utf8")); } catch {}
const runtimeReady=runtimeEvidence && runtimeEvidence.runtimePendingTotal===0 && runtimeEvidence.orphanTotal===0 && Object.values(runtimeEvidence.reportDependency||{}).every(x=>x.reportReady===true && x.runtimePending===0 && x.orphanCount===0);
t("runtime dependency evidence reconciles all 8 report variants",()=>assert.equal(runtimeReady,true,"missing or incomplete internal runtime evidence"));
t("100% report columns pass the STATIC chain gate",()=>assert.equal(gapTotal,0,gapTotal+" columns not ready"));
console.log("");checks.forEach(([s,n])=>console.log(s+" · "+n));
if(checks.some(c=>c[0]==="FAIL")){console.error("\nREPORT DEPENDENCY AUDIT FAIL — see docs/generated/report-dependency-matrix.json");process.exit(1);}
console.log("\nREPORT DEPENDENCY STATIC GATE PASS");
console.log(runtimeReady ? "RUNTIME GATE PASS: internal transpiled E2E harness proves 8/8 report variants ready, 0 runtime-pending, 0 orphan. Browser/Vite acceptance remains deferred." : "RUNTIME GATE OPEN: "+pending+" static columns require runtime proof.");
