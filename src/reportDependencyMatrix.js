// LIMAS 1R — Product → Report Dependency Matrix.
// Every report column is expanded into the full chain:
//   Report Column → Canonical Field/Metric → Mapping/Enrichment → Master Dependency → Product Source Field
// and every chain link is verified against live registries/data (not just "metadata exists").
// This module never changes source fields, formulas or business rules.
import {PRODUCT_REPORT_REQUIREMENTS,resolveReportFieldTraceability} from "./reportTraceability.js";
import {BUSINESS_MAPPING_CONTRACTS} from "./productSchemaGovernance.js";

const REPORT_DOMAIN={Country:"Country",CCL:"CCL",CCL_DIRECT:"CCL",CCL_INDIRECT:"CCL",MLK:"MLK",MLK_CONSOLIDATED:"MLK",CIL:"CIL",LPG:"LPG"};
// Master registry key each domain's MASTER_LIMIT references must resolve to.
const MASTER_OF=(ref,domain)=>{
  const m=String(ref).match(/^(Country|CCL|MLK|CIL|LPG)\b/);
  if(m)return m[1]+" Master";
  if(/master\.|productAllocations|countryAllocationMetrics|effective(Mlk|Ccl)MasterLimit/.test(ref))return domain+" Master";
  if(/LPG .*Master|LPG Industry|LPG Sector|LPG master limits|Debtor Classification Registry/i.test(ref))return "LPG Master";
  return null;
};
// Enrichment attribute names used by the requirement table → the names actually carried in record.meta.
// (Explicit alias map; an unmapped enrichment name is reported, never assumed.)
export const ENRICHMENT_META_ALIASES=Object.freeze({
  reportingEntity:["reportingEntity"],cclCounterpartyId:["cclCounterpartyId"],cclLimitType:["cclLimitType","creditLineLimitType"],
  mlkCif:["mlkCif"],bookingOfficeType:["bookingOfficeType"],"Booking Office":["bookingOffice"],"Booking Office Type":["bookingOfficeType"],
  lpgApplicability:["lpgApplicability"],insuranceCompanyId:["insuranceCompanyId"],
  industryCode:["industryCode"],groupingCode:["groupingCode"],segmentCode:["segmentCode"],regionCode:["regionCode"],
  icNasionalCode:["icNasionalCode"],icWilayahSegmenCode:["icWilayahSegmenCode"]
});
// Enrichments resolved by a MASTER lookup at canonical build time (CIF→Industry→Grouping→…), not stored on the raw record.
export const MASTER_RESOLVED_ENRICHMENT=Object.freeze(new Set(["industryCode","groupingCode","segmentCode","regionCode","icNasionalCode","icWilayahSegmenCode","entityCode"]));

const layerChain=(layer)=>({
  MASTER_LIMIT:{needsMaster:true,needsProduct:false},
  CANONICAL_READ_MODEL:{needsMaster:false,needsProduct:true},
  BUSINESS_ENRICHMENT:{needsMaster:true,needsProduct:true},
  MONITORING:{needsMaster:false,needsProduct:true,derived:true},
  REPORT_DERIVED:{needsMaster:false,needsProduct:false,derived:true},
  DATA_QUALITY:{needsMaster:false,needsProduct:false,derived:true},
  REFERENCE:{needsMaster:false,needsProduct:false,derived:false,staticReference:true}
}[layer]||{needsMaster:false,needsProduct:false,unknown:true});

export function expandLpgColumns(scopes=[],keyOf=s=>s){
  const out=[["No","no"],["Ecosystem LPG (Sektor)","sector"],["Segmen LPG","segment"]];
  scopes.forEach(s=>{const k=keyOf(s);out.push([s+" • Limit","limit_"+k],[s+" • Outstanding","outstanding_"+k],[s+" • Utilisasi","util_"+k]);});
  out.push(["CL • Bankwide","cl"],["NCL • Bankwide","ncl"],["Bankwide vs Regional","crosscheck"],["Bankwide Source Reconciliation","bankwideReconciliation"],["Regional Source Coverage","regionalCoverage"],["Data Quality","dataQuality"],["Status","status"]);
  return out;
}

function productSourcesFor(reportType,fieldRef){
  const domain=REPORT_DOMAIN[reportType]||reportType;
  const out=[];
  for(const [productId,reqs] of Object.entries(PRODUCT_REPORT_REQUIREMENTS)){
    reqs.filter(r=>r.report===domain).forEach(r=>out.push({productId,sourceFields:r.sourceFields,enrichmentFields:r.enrichmentFields||[]}));
  }
  // Narrow to the product named in the reference when explicit (e.g. productContributionMap(...).CASHLOAN).
  const named=Object.keys(PRODUCT_REPORT_REQUIREMENTS).filter(p=>String(fieldRef).includes(p)||(p==="CREDIT LINE"&&/CREDIT LINE|Commercial|Treasury/.test(fieldRef)));
  return named.length?out.filter(o=>named.includes(o.productId)):out;
}

/**
 * @param ctx {reportConfig, productDb, masterData, productSchemaFields, fieldAliases, asOfDate}
 *   reportConfig: {reportType:{columns:[[label,key],...]}}
 */
export function buildReportDependencyMatrix(ctx){
  const {reportConfig={},productDb={},masterData={},productSchemaFields={},fieldAliases={}}=ctx;
  const masters=new Set(Object.keys(masterData).map(k=>k+" Master"));
  const metaKeysByProduct={};
  Object.entries(productDb).forEach(([pid,rows])=>{const s=new Set();(rows||[]).forEach(r=>Object.keys(r.meta||{}).forEach(k=>s.add(k)));metaKeysByProduct[pid]=s;});
  const rows=[];
  Object.entries(reportConfig).forEach(([reportType,cfg])=>{
    (cfg.columns||[]).forEach(([label,key])=>{
      const c=resolveReportFieldTraceability(reportType,key);
      const row={report:reportType,column:key,label,canonical_field:null,metric_type:null,source_layer:c?.sourceLayer||"UNRESOLVED",
        source_reference:c?.sourceReference||null,transformation:c?.transformation||null,
        source_products:[],source_fields:[],mapping:[],enrichment:[],master:null,as_of_basis:"report as_of_date",
        checks:{},gaps:[]};
      if(!c){row.gaps.push("NO_LINEAGE_CONTRACT");row.status="ORPHAN";rows.push(row);return;}
      const chain=layerChain(c.sourceLayer);
      row.canonical_field=c.sourceReference;
      row.metric_type=chain.derived?"DERIVED":c.sourceLayer==="MASTER_LIMIT"?"MASTER":c.sourceLayer==="BUSINESS_ENRICHMENT"?"ENRICHED":"EXPOSURE";
      if(chain.unknown)row.gaps.push("UNKNOWN_SOURCE_LAYER");
      // Master link
      if(chain.needsMaster){
        row.master=MASTER_OF(c.sourceReference,REPORT_DOMAIN[reportType]||reportType);
        row.checks.master_resolved=!!row.master&&masters.has(row.master);
        if(!row.master)row.gaps.push("MASTER_NOT_IDENTIFIED");else if(!masters.has(row.master))row.gaps.push("MASTER_NOT_REGISTERED:"+row.master);
      }else row.checks.master_resolved=true;
      // Product link
      if(chain.needsProduct){
        const srcs=productSourcesFor(reportType,c.sourceReference);
        row.source_products=[...new Set(srcs.map(s=>s.productId))];
        row.source_fields=[...new Set(srcs.flatMap(s=>s.sourceFields))];
        row.enrichment=[...new Set(srcs.flatMap(s=>s.enrichmentFields))];
        row.mapping=row.source_products.map(p=>{const dom=REPORT_DOMAIN[reportType]||reportType;return BUSINESS_MAPPING_CONTRACTS[p]?.[dom]?p+"→"+dom:null;}).filter(Boolean);
        row.checks.source_complete=row.source_products.length>0&&srcs.every(s=>s.sourceFields.every(f=>(productSchemaFields[s.productId]||[]).includes(f)||(fieldAliases[s.productId]||[]).includes(f)));
        row.checks.mapping_complete=row.source_products.length>0&&row.mapping.length===row.source_products.length;
        const enrichMissing=[],runtimePending=[];
        srcs.forEach(s=>s.enrichmentFields.forEach(e=>{
          if(MASTER_RESOLVED_ENRICHMENT.has(e))return;
          const declared=new Set(BUSINESS_MAPPING_CONTRACTS[s.productId]?.[REPORT_DOMAIN[reportType]||reportType]?.enrichment||[]);
          const names=[e,...(ENRICHMENT_META_ALIASES[e]||[])];
          if(!names.some(n=>declared.has(n))){enrichMissing.push(s.productId+":"+e+"(not declared in BUSINESS_MAPPING_CONTRACTS)");return;}
          // Declared. Whether the runtime mapping layer actually emits it is only provable in-app.
          const emitted=ctx.runtimeEnrichmentByProduct?.[s.productId];
          if(!emitted)runtimePending.push(s.productId+":"+e);
          else if(!names.some(n=>emitted.has(n)))enrichMissing.push(s.productId+":"+e+"(declared but not emitted by runtime mapping)");
        }));
        row.runtime_pending=runtimePending;
        row.checks.enrichment_complete=enrichMissing.length===0;
        row.checks.runtime_enrichment_complete=runtimePending.length===0;
        if(!row.source_products.length)row.gaps.push("NO_PRODUCT_SOURCE_FOR_CANONICAL_FIELD");
        if(!row.checks.source_complete&&row.source_products.length)row.gaps.push("SOURCE_FIELD_MISSING");
        if(!row.checks.mapping_complete&&row.source_products.length)row.gaps.push("BUSINESS_MAPPING_MISSING");
        enrichMissing.forEach(e=>row.gaps.push("ENRICHMENT_NOT_CARRIED:"+e));
      }else{row.checks.source_complete=true;row.checks.mapping_complete=true;row.checks.enrichment_complete=true;}
      row.checks.canonical_represented=!!c.sourceReference&&(chain.derived||chain.needsMaster||chain.needsProduct||false);
      row.checks.field_traceable=!!c.transformation&&!!c.sourceReference;
      row.status=row.gaps.length?"GAP":"REPORT_READY";
      rows.push(row);
    });
  });
  return rows;
}

export function evaluateReportReady(matrixRows=[]){
  const byReport={};
  matrixRows.forEach(r=>{(byReport[r.report]??=[]).push(r);});
  const out={};
  Object.entries(byReport).forEach(([report,rows])=>{
    const all=k=>rows.every(r=>r.checks[k]!==false);
    const runtimeAll=all("runtime_enrichment_complete");
    const gaps={};rows.forEach(r=>r.gaps.forEach(g=>{const k=g.split(":")[0];(gaps[k]??=new Set()).add(r.column);}));
    const runtimePendingRows=rows.filter(r=>(r.runtime_pending||[]).length>0);
    out[report]={
      runtimePending:runtimePendingRows.length,columns:rows.length,ready:rows.filter(r=>r.status==="REPORT_READY").length,
      gate:{SOURCE_COMPLETE:all("source_complete"),MAPPING_COMPLETE:all("mapping_complete"),ENRICHMENT_COMPLETE:all("enrichment_complete"),MASTER_RESOLVED:all("master_resolved"),CANONICAL_REPRESENTED:all("canonical_represented"),FIELD_TRACEABLE:all("field_traceable"),RUNTIME_ENRICHMENT_COMPLETE:runtimeAll},
      orphan:rows.filter(r=>r.status==="ORPHAN").map(r=>r.column),
      runtimePendingColumns:[...new Set(runtimePendingRows.map(r=>r.column))],
      gapSummary:Object.fromEntries(Object.entries(gaps).map(([k,v])=>[k,v.size])),
      reportReady:rows.every(r=>r.status==="REPORT_READY")&&runtimeAll,
      staticReady:rows.every(r=>r.status==="REPORT_READY")
    };
  });
  return out;
}
