import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { transform } from "esbuild";

const sourcePath=path.resolve("src/main.jsx");
const source=fs.readFileSync(sourcePath,"utf8");
// Product Final is a presentation-only dependency. The DQ audit evaluates the
// existing governance runtime and does not need to execute the Product Final UI.
// Stub the JSX module before transforming main.jsx so the audit stays focused
// on data-quality/governance behavior.
const auditSource=source.replace(
  /import\\s+ProductFinalApp\\s+from\\s+["']\.\\/productFinal\\/ProductFinalApp["'];?\\s*/m,
  "const ProductFinalApp=()=>null;\\n"
);

globalThis.window={
  localStorage:{
    _store:new Map(),
    getItem(k){return this._store.has(k)?this._store.get(k):null;},
    setItem(k,v){this._store.set(k,String(v));},
    removeItem(k){this._store.delete(k);}
  },
  location:{reload(){}}
};
globalThis.document={
  getElementById(){return {}} ,
  createElement(){return {style:{}}}
};
globalThis.navigator={userAgent:"LIMAS-DQ-AUDIT"};

let transformed=(await transform(auditSource,{
  loader:"jsx",
  format:"esm",
  sourcemap:false,
  target:"es2022",
})).code;

transformed=transformed.replace(/import\s+["'][^"']+\.css["'];?\s*/g,"");
transformed=transformed.replace(/from\s+["']\.\/([^"']+)["']/g,'from "../src/$1.js"');
transformed=transformed.replace(/createRoot\(document\.getElementById\(['"]root['"]\)\)\.render\([\s\S]*?\);\s*$/m,"");
transformed += `
globalThis.__LIMAS_DEBUG__={
  dataQualityIssueRows,
  dataQualitySummary,
  reconciliationIssues,
  monitoringScopeIntegrityIssues,
  canonicalProductQualityIssues,
  masterCanonicalQualityIssues,
  numericReconciliationAudit,
  governancePhaseAudit,
  canonicalPipelineControls,
  releaseGate,
  auditReportFieldTraceability,
  summarizeReportFieldTraceability,
  productDatabase,
  limasDemoData,
  productIntegrationMappings,
  E2E_DUMMY_META
};
`;

const tmp=path.resolve("scripts",".tmp-limas-main-dq-audit-"+process.pid+".mjs");
fs.writeFileSync(tmp,transformed,"utf8");
try{
  await import(pathToFileURL(tmp).href+"?run="+Date.now());
  const d=globalThis.__LIMAS_DEBUG__;
  const dq=d.dataQualityIssueRows();
  const summary=d.dataQualitySummary();
  const numeric=d.numericReconciliationAudit().filter(x=>x.status==="FAIL");
  const governance=d.governancePhaseAudit();
  const report=Object.entries(governance.phases).map(([_,p])=>({phase:p.phase,title:p.title,status:p.status,issues:p.issues.length}));
  console.log(JSON.stringify({
    meta:d.E2E_DUMMY_META,
    dqCount:dq.length,
    dqByLayer:summary.byLayer,
    dqByType:summary.byType,
    dq:dq.map(x=>({id:x.id,layer:x.layer,issueType:x.issueType,domain:x.domain,key:x.key,productId:x.productId,recordId:x.recordId,detail:x.detail})),
    numericFailures:numeric.map(x=>({layer:x.layer,domain:x.domain,rule:x.rule,actual:x.actual,expected:x.expected,diff:x.diff,unit:x.unit})),
    phases:report,
    releaseGate:d.releaseGate()
  },null,2));
  if(d.releaseGate().status!=="READY"){
    console.error("\n[LIMAS DQ AUDIT] RELEASE GATE BLOCKED");
    process.exitCode=1;
  }
} finally {
  try{fs.unlinkSync(tmp);}catch{}
}
