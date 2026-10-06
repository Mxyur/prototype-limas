import React,{useMemo,useState} from "react";
import {createProductFinalAdapter} from "./productFinalAdapter";
import "./productFinal.css";

const MONITOR_UNIVERSES=["Country","CCL","MLK","CIL","LPG"];
const NAV=[
  {id:"home",label:"Dashboard"},
  {id:"monitoring",label:"Monitoring"},
  {id:"limits",label:"Limit Management"},
  {id:"products",label:"Product Universe"},
  {id:"reports",label:"Reports"},
  {id:"governance",label:"Governance",divider:true}
];

function GridPager({page,pageCount,pageSize,setPage,setPageSize,total}){return <div className="pf-grid-pager">
  <div className="pf-grid-pager-info">{total} records · Page {page} of {pageCount}</div>
  <div className="pf-grid-pager-actions">
    <select value={pageSize} onChange={e=>{setPageSize(Number(e.target.value));setPage(1)}} aria-label="Rows per page"><option value="25">25 / page</option><option value="50">50 / page</option><option value="100">100 / page</option></select>
    <button type="button" disabled={page<=1} onClick={()=>setPage(Math.max(1,page-1))}>Previous</button>
    <button type="button" disabled={page>=pageCount} onClick={()=>setPage(Math.min(pageCount,page+1))}>Next</button>
  </div>
</div>}
function MonitoringView({adapter}){
  const [universe,setUniverse]=useState("Country");
  const [status,setStatus]=useState("All");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(null);
  const [page,setPage]=useState(1);
  const [pageSize,setPageSize]=useState(25);
  const [sortKey,setSortKey]=useState("status");
  const [sortDir,setSortDir]=useState("asc");
  const snapshot=adapter.getMonitoringSnapshot(universe);
  const rows=snapshot?.rows||[];
  const filtered=rows.filter(row=>{
    const matchesStatus=status==="All"||row.status===status;
    const hay=[row.key,row.name,row.group,row.entity,row.sector,row.segment,row.region,row.countryCode,row.insurance].join(" ").toLowerCase();
    return matchesStatus&&hay.includes(query.trim().toLowerCase());
  });
  const sorted=[...filtered].sort((a,b)=>{
    const av=a?.[sortKey],bv=b?.[sortKey];
    if(sortKey==="utilization"||sortKey==="limit"||sortKey==="exposure") return ((Number(av)||0)-(Number(bv)||0))* (sortDir==="asc"?1:-1);
    return String(av??"").localeCompare(String(bv??""),"id",{numeric:true,sensitivity:"base"})*(sortDir==="asc"?1:-1);
  });
  const pageCount=Math.max(1,Math.ceil(sorted.length/pageSize));
  const safePage=Math.min(page,pageCount);
  const pageRows=sorted.slice((safePage-1)*pageSize,safePage*pageSize);
  const headers=universe==="Country"?["Code","Country","Limit","Exposure","Utilization","Status"]:
    universe==="CCL"?["Swift","Bank","CCL","Contractual","Outstanding","Utilization","Status"]:
    universe==="MLK"?["CIF","Debtor","Group","Limit","Exposure","Utilization","Status"]:
    universe==="CIL"?["Insurance","Name","CIL","Exposure","Utilization","Status"]:
    ["Sector","Segment","Region","Limit","Outstanding","Utilization","Status"];
  const toggleSort=key=>{if(sortKey===key)setSortDir(x=>x==="asc"?"desc":"asc");else{setSortKey(key);setSortDir("asc")}setPage(1)};
  const money=v=>Number.isFinite(Number(v))?Number(v).toLocaleString("id-ID",{maximumFractionDigits:2}):"—";
  const pct=v=>Number.isFinite(Number(v))?(Number(v)*100).toFixed(1)+"%":"—";
  return <div className="pf-monitor">
    <div className="pf-monitor-tabs">{MONITOR_UNIVERSES.map(x=><button key={x} type="button" className={universe===x?"active":""} onClick={()=>{setUniverse(x);setPage(1);setSelected(null)}}>{x}</button>)}</div>
    <div className="pf-monitor-toolbar">
      <select value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}} aria-label="Status filter"><option value="All">All Status</option><option>Normal</option><option>Warning</option><option>Breach</option><option>Data Issue</option></select>
      <input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Search entity, key, sector..." aria-label="Search monitoring"/>
      <span className="pf-monitor-count">{filtered.length} / {rows.length}</span>
    </div>
    {!snapshot?<div className="pf-placeholder"><strong>Monitoring snapshot unavailable</strong><span>Canonical monitoring output belum tersedia untuk universe ini.</span></div>:
    <section className="pf-card">
      <div className="pf-monitor-summary"><div><span>Limit</span><strong>{money(snapshot.totalLimit)}</strong></div><div><span>Exposure</span><strong>{money(snapshot.totalExposure)}</strong></div><div><span>Utilization</span><strong>{pct(snapshot.utilization)}</strong></div><div><span>Breach</span><strong>{snapshot.statusCounts?.Breach??0}</strong></div></div>
      <div className="pf-table-wrap"><table className="pf-table"><thead><tr>{headers.map((h,i)=><th key={h}><button type="button" className="pf-th-sort" onClick={()=>toggleSort(i===0?(universe==="Country"?"countryCode":universe==="CCL"?"key":universe==="MLK"?"key":universe==="CIL"?"insurance":"sector"):i===1?"name":i===2&&(universe==="MLK"?"group":universe==="LPG"?"region":"limit")?"limit":i===3?"exposure":i===4?"utilization":"status")}>{h}</button></th>)}</tr></thead><tbody>
      {pageRows.map(row=>{
        const util=Number(row.utilization||0)*100;
        return <tr key={row.key} onClick={()=>setSelected(row)}>
          <td>{universe==="Country"?row.countryCode||row.key:universe==="CCL"?row.key:universe==="MLK"?row.key:universe==="CIL"?row.insurance||row.key:row.sector}</td>
          <td>{universe==="Country"?row.name:universe==="CCL"?row.name:universe==="MLK"?row.name:universe==="CIL"?row.name:row.segment}</td>
          {universe==="MLK"?<td>{row.group}</td>:null}
          {universe==="LPG"?<td>{row.region}</td>:null}
          <td>{money(row.limit)}</td>
          {universe==="CCL"?<td>{money(row.contractual)}</td>:null}
          <td>{money(row.exposure)}</td>
          <td>{util.toFixed(1)}%</td>
          <td><span className={"pf-status-badge "+String(row.status||"").toLowerCase().replace(" ","-")}>{row.status}</span></td>
        </tr>
      })}</tbody></table></div>
      <GridPager page={safePage} pageCount={pageCount} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} total={sorted.length}/>
      {selected?<aside className="pf-drawer" aria-label="Monitoring detail"><button type="button" className="pf-drawer-close" onClick={()=>setSelected(null)}>Close</button><div className="pf-label">Detail</div><h3>{selected.name||selected.key}</h3><p>{universe} · {selected.key}</p><div className="pf-monitor-detail-grid"><div><span>Limit</span><strong>{money(selected.limit)}</strong></div><div><span>Exposure</span><strong>{money(selected.exposure)}</strong></div><div><span>Utilization</span><strong>{pct(selected.utilization)}</strong></div><div><span>Status</span><strong>{selected.status}</strong></div></div><div className="pf-note">Business values are read-only from the existing canonical monitoring snapshot. No Product Final recalculation is performed.</div></aside>:null}
    </section>}
  </div>;
}
function LimitsView({adapter}){
  const domains=adapter.getLimitsSnapshot();
  const structures=adapter.getLimitStructureSnapshot();
  const details=adapter.getMasterLimitDetailsSnapshot();
  const [domain,setDomain]=useState(domains[0]?.type||"Country");
  const [view,setView]=useState("overview");
  const [selectedKey,setSelectedKey]=useState(null);
  const selected=domains.find(x=>x.type===domain)||domains[0];
  const structure=structures.find(x=>x.type===domain)||structures[0];
  const detail=details.find(x=>x.type===domain)||details[0];
  const structureRows=structure?.rows||[];
  const selectedStructure=structureRows.find(x=>String(x.key)===String(selectedKey))||structureRows[0];
  const selectedDetail=(detail?.rows||[]).find(x=>String(x.key)===String(selectedKey))||(detail?.rows||[])[0];
  const money=v=>Number.isFinite(Number(v))?Number(v).toLocaleString("id-ID",{maximumFractionDigits:2}):"—";
  const pct=v=>Number.isFinite(Number(v))?(Number(v)*100).toFixed(1)+"%":"—";
  const selectRow=key=>setSelectedKey(key);

  return <div>
    <div className="pf-monitor-tabs pf-section-tabs">
      {["overview","structure","master"].map(x=><button key={x} type="button" className={view===x?"active":""} onClick={()=>setView(x)}>
        {x==="overview"?"Overview":x==="structure"?"Limit Structure":"Master Limit Detail"}
      </button>)}
    </div>
    <div className="pf-monitor-tabs" style={{marginTop:10}}>
      {domains.map(x=><button key={x.type} type="button" className={domain===x.type?"active":""} onClick={()=>{setDomain(x.type);setSelectedKey(null)}}>{x.type}</button>)}
    </div>

    {view==="overview"&&<div>
      <div className="pf-grid">
        <section className="pf-card"><h2>Master Limit</h2><p>Canonical master-limit summary. Read-only presentation layer.</p><div className="pf-status-row">
          <div className="pf-status"><div className="pf-label">Total Limit</div><div className="pf-value">{money(selected?.totalLimit)}</div></div>
          <div className="pf-status"><div className="pf-label">Exposure</div><div className="pf-value">{money(selected?.totalExposure)}</div></div>
          <div className="pf-status"><div className="pf-label">Utilization</div><div className="pf-value">{pct(selected?.utilization)}</div></div>
        </div></section>
        <section className="pf-card"><h2>Limit Structure</h2><p>Hierarchy from universe/master scope to allocation and utilization.</p><div className="pf-status-row">
          <div className="pf-status"><div className="pf-label">Objects</div><div className="pf-value">{structureRows.length}</div></div>
          <div className="pf-status"><div className="pf-label">Components</div><div className="pf-value">{structureRows.reduce((n,x)=>n+(x.components||[]).length,0)}</div></div>
        </div></section>
        <section className="pf-card"><h2>Write Boundary</h2><p>Product Final tidak membuat CRUD master limit kedua.</p><div className="pf-note">Perubahan master limit tetap dilakukan pada Governance / Version 1 application.</div></section>
      </div>
      <section className="pf-card" style={{marginTop:14}}>
        <div className="pf-card-head-inline"><div><h2>{domain} · Limit Objects</h2><p>Pilih object untuk membuka detail struktur limit.</p></div><span className="pf-monitor-count">{selected?.rows?.length??0} objects</span></div>
        <div className="pf-table-wrap" style={{marginTop:14}}><table className="pf-table"><thead><tr><th>Key</th><th>Name</th><th>Limit</th><th>Exposure</th><th>Utilization</th><th>Status</th></tr></thead><tbody>
          {(selected?.rows||[]).map(row=><tr key={row.key} onClick={()=>{setSelectedKey(row.key);setView("structure")}}><td>{row.key}</td><td className="pf-cell-wrap">{row.name}</td><td>{money(row.limit)}</td><td>{money(row.exposure)}</td><td>{pct(row.limit?row.exposure/row.limit:0)}</td><td><span className={"pf-status-badge "+String(row.status||"").toLowerCase().replace(" ","-")}>{row.status}</span></td></tr>)}
        </tbody></table></div>
      </section>
    </div>}

    {view==="structure"&&<div>
      <section className="pf-card">
        <div className="pf-card-head-inline"><div><h2>Limit Structure · {domain}</h2><p>Canonical hierarchy and allocation view. No new business calculation is introduced.</p></div><span className="pf-readonly-badge">READ ONLY</span></div>
        <div className="pf-table-wrap" style={{marginTop:14}}><table className="pf-table pf-table-structured"><thead><tr><th>Key</th><th>Name</th><th>Entity</th><th>Managing Unit</th><th>Master Limit</th><th>Available</th><th>Utilization</th><th>Status</th></tr></thead><tbody>
          {structureRows.map(row=><tr key={row.key} className={String(selectedStructure?.key)===String(row.key)?"pf-row-selected":""} onClick={()=>selectRow(row.key)}>
            <td>{row.key}</td><td className="pf-cell-wrap">{row.name}</td><td>{row.entity}</td><td>{row.managingUnit}</td><td>{money(row.limit)}</td><td>{money(row.available)}</td><td>{pct(row.utilization)}</td><td><span className={"pf-status-badge "+String(row.status||"").toLowerCase().replace(" ","-")}>{row.status}</span></td>
          </tr>)}
        </tbody></table></div>
      </section>
      {selectedStructure&&<section className="pf-card" style={{marginTop:14}}>
        <div className="pf-detail-heading"><div><div className="pf-label">Selected Limit Object</div><h2>{selectedStructure.name}</h2><p>{domain} · {selectedStructure.key} · {selectedStructure.group}</p></div><button type="button" className="pf-button-secondary" onClick={()=>setView("master")}>Open Master Detail</button></div>
        <div className="pf-detail-kpis">
          <div><span>Master Limit</span><strong>{money(selectedStructure.limit)}</strong></div>
          <div><span>Exposure</span><strong>{money(selectedStructure.exposure)}</strong></div>
          <div><span>Available</span><strong>{money(selectedStructure.available)}</strong></div>
          <div><span>Utilization</span><strong>{pct(selectedStructure.utilization)}</strong></div>
        </div>
        <div className="pf-source-strip">
          <div><span>Ownership</span><strong>Core / Master Limit</strong></div>
          <div><span>Source Layer</span><strong>Canonical Read Model</strong></div>
          <div><span>Source Record ID</span><strong>{selectedStructure.key||"—"}</strong></div>
          <div><span>Sync Status</span><strong>Snapshot</strong></div>
        </div>
        <div className="pf-structure-chain">
          <div><b>Universe</b><span>{domain}</span></div><div><b>Master Object</b><span>{selectedStructure.key}</span></div><div><b>Scope / Entity</b><span>{selectedStructure.entity||selectedStructure.region||"—"}</span></div><div><b>Allocation</b><span>{(selectedStructure.allocation||[]).length} component(s)</span></div>
        </div>
        <div className="pf-section-heading">Limit Components</div>
        <div className="pf-component-grid">{(selectedStructure.components||[]).map((x,i)=><div className="pf-component-card" key={x.section+"|"+x.field+"|"+i}><span>{x.section}</span><strong>{x.field}</strong><b>{typeof x.value==="number"?money(x.value):String(x.value??"—")}</b></div>)}</div>
        <div className="pf-section-heading">Product / Allocation View</div>
        {(selectedStructure.allocation||[]).length?<div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Product / Component</th><th>Domestic</th><th>Overseas</th><th>Total / Exposure</th></tr></thead><tbody>{selectedStructure.allocation.map((x,i)=><tr key={(x.product||"component")+"|"+i}><td>{x.product}</td><td>{x.domestic!==undefined?money(x.domestic):"—"}</td><td>{x.overseas!==undefined?money(x.overseas):"—"}</td><td>{money(x.total??x.exposure)}</td></tr>)}</tbody></table></div>:<div className="pf-note">Tidak ada allocation component yang tersedia pada canonical snapshot untuk object ini.</div>}
      </section>}
    </div>}

    {view==="master"&&<div>
      <section className="pf-card">
        <div className="pf-card-head-inline"><div><h2>Master Limit Detail · {domain}</h2><p>Field-level master structure dari canonical existing runtime. Read-only.</p></div><span className="pf-readonly-badge">CANONICAL</span></div>
        <div className="pf-master-object-grid" style={{marginTop:14}}>{(detail?.rows||[]).map(row=><button type="button" key={row.key} className={"pf-master-object "+(String(selectedDetail?.key)===String(row.key)?"active":"")} onClick={()=>selectRow(row.key)}><strong>{row.name}</strong><span>{row.key} · {money(row.masterLimit)} limit · {row.status}</span></button>)}</div>
      </section>
      {selectedDetail&&<section className="pf-card" style={{marginTop:14}}>
        <div className="pf-detail-heading"><div><div className="pf-label">Master Limit Record</div><h2>{selectedDetail.name}</h2><p>{domain} · {selectedDetail.key}</p></div><span className={"pf-status-badge "+String(selectedDetail.status||"").toLowerCase().replace(" ","-")}>{selectedDetail.status}</span></div>
        <div className="pf-detail-kpis"><div><span>Master Limit</span><strong>{money(selectedDetail.masterLimit)}</strong></div><div><span>Exposure</span><strong>{money(selectedDetail.exposure)}</strong></div><div><span>Available</span><strong>{money(selectedDetail.masterLimit-selectedDetail.exposure)}</strong></div></div>
        <div className="pf-source-strip">
          <div><span>Ownership</span><strong>Core / Master Limit</strong></div>
          <div><span>Source Layer</span><strong>Canonical Read Model</strong></div>
          <div><span>Master Key</span><strong>{selectedDetail.key||"—"}</strong></div>
          <div><span>Sync Status</span><strong>Snapshot</strong></div>
        </div>
        <div className="pf-master-sections">{Object.entries(selectedDetail.sections||{}).map(([section,fields])=><section className="pf-master-section" key={section}><div className="pf-section-heading">{section}</div><div className="pf-master-fields">{fields.map((field,i)=><div className="pf-master-field" key={field.field+"|"+i}><span>{field.field}</span><strong>{typeof field.value==="number"?money(field.value):String(field.value??"—")}</strong></div>)}</div></section>)}</div>
      </section>}
    </div>}
  </div>;
}
function ProductsView({adapter}){
  const data=adapter.getProductsSnapshot();
  const catalog=data.catalog||[];
  const [product,setProduct]=useState(catalog[0]?.id||"CASHLOAN");
  const [layer,setLayer]=useState("Source");
  const fields=data.fields?.[product]||[];
  const samples=data.samples?.[product]||{};
  const mappings=data.mappings?.[product]||[];
  const enrichment=[...new Set(mappings.flatMap(row=>Object.keys(row.businessEnrichment||{})))];
  const references=[...new Map(mappings.map(row=>[String(row.key||"") ,{key:row.key,name:row.masterObject}])).values()].filter(x=>x.key);
  return <div>
    <div className="pf-product-selector">{catalog.map(item=><button key={item.id} type="button" className={product===item.id?"active":""} onClick={()=>{setProduct(item.id);setLayer("Source")}}>{item.label}</button>)}</div>
    <div className="pf-product-meta">
      <span>{catalog.find(x=>x.id===product)?.definition||catalog.find(x=>x.id===product)?.note||"Product registry"}</span>
    </div>
    <div className="pf-product-layers">{["Source","Business Enrichment","Reference Master","Domain Mapping"].map(x=><button key={x} type="button" className={layer===x?"active":""} onClick={()=>setLayer(x)}>{x}</button>)}</div>
    {layer==="Source"?<section className="pf-card"><h2>Source Fields</h2><p>Field tetap source-oriented. Derived monitoring outputs tidak dimasukkan ke Product Database.</p><div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Field</th><th>Sample</th><th>Canonical Schema</th></tr></thead><tbody>{fields.map(field=><tr key={field}><td>{field}</td><td>{samples[field]===0?0:(samples[field]??"—")}</td><td>{(data.schemaFields?.[product]||[]).includes(field)?"Registered":"Not registered"}</td></tr>)}</tbody></table></div></section>
    :layer==="Business Enrichment"?<section className="pf-card"><h2>Business Enrichment</h2><p>Enrichment dibaca dari mapping yang sudah dibangun existing.</p><div className="pf-list">{enrichment.length?enrichment.map(x=><div className="pf-universe" key={x}><strong>{x}</strong><span>Mapped enrichment field</span></div>):<div className="pf-note">No enrichment field configured for this product.</div>}</div></section>
    :layer==="Reference Master"?<section className="pf-card"><h2>Reference Master</h2><p>Reference target tetap berasal dari existing integration mapping.</p><div className="pf-list">{references.length?references.map(x=><div className="pf-universe" key={x.key}><strong>{x.name||x.key}</strong><span>{x.key}</span></div>):<div className="pf-note">No reference mapping available.</div>}</div></section>
    :<section className="pf-card"><h2>Domain Mapping</h2><p>Source record → target master mapping, read-only.</p><div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Domain</th><th>Source Record</th><th>Source Field</th><th>Target</th><th>Scope</th><th>Status</th></tr></thead><tbody>{mappings.map((row,i)=><tr key={(row.recordId||"row")+"|"+i}><td>{row.limitType||"—"}</td><td>{row.recordId||"—"}</td><td>{row.sourceField||"—"}</td><td>{row.masterObject||row.key||"—"}</td><td>{row.scope||"—"}</td><td>{row.masterMatch?"Mapped":"Issue"}</td></tr>)}</tbody></table></div></section>}
  </div>;
}
function ReportsView({adapter}){
  const snapshot=adapter.getReportsGovernanceSnapshot();
  const types=Object.keys(snapshot.reports||{});
  const [type,setType]=useState(types[0]||"Country");
  const [status,setStatus]=useState("All");
  const [query,setQuery]=useState("");
  const [page,setPage]=useState(1);
  const [pageSize,setPageSize]=useState(25);
  const [sortKey,setSortKey]=useState("");
  const [sortDir,setSortDir]=useState("asc");
  const [selected,setSelected]=useState(null);
  const report=snapshot.reports?.[type];
  const columns=report?.columns||[];
  const valueFor=(row,keys)=>{for(const key of keys){if(row?.[key]!==undefined&&row?.[key]!==null&&row?.[key]!=="")return row[key]}return null};
  const money=v=>Number.isFinite(Number(v))?Number(v).toLocaleString("id-ID",{maximumFractionDigits:2}):"—";
  const pct=v=>{const n=Number(v);if(!Number.isFinite(n))return "—";return (Math.abs(n)<=1?n*100:n).toFixed(1)+"%"};
  const baseRows=(report?.rows||[]).filter(row=>{
    const statusMatch=status==="All"||row.status===status||row.statusMaster===status;
    const hay=columns.map(([,key])=>row?.[key]).join(" ").toLowerCase();
    return statusMatch&&hay.includes(query.trim().toLowerCase());
  });
  const activeSort=sortKey||columns[0]?.[1]||"";
  const rows=[...baseRows].sort((a,b)=>{
    const av=a?.[activeSort],bv=b?.[activeSort];
    const an=Number(av),bn=Number(bv);
    const cmp=Number.isFinite(an)&&Number.isFinite(bn)?an-bn:String(av??"").localeCompare(String(bv??""),"id",{numeric:true,sensitivity:"base"});
    return cmp*(sortDir==="asc"?1:-1);
  });
  const pageCount=Math.max(1,Math.ceil(rows.length/pageSize));
  const safePage=Math.min(page,pageCount);
  const pageRows=rows.slice((safePage-1)*pageSize,safePage*pageSize);
  const visibleColumns=columns.slice(0,7);
  const totalLimit=rows.reduce((s,r)=>s+(Number(valueFor(r,["limit","masterLimit","ccl","cil","capacityLimit"]))||0),0);
  const totalExposure=rows.reduce((s,r)=>s+(Number(valueFor(r,["outstanding","exposure","total","totalBade"]))||0),0);
  const exceptionCount=rows.filter(r=>["Warning","Breach","Data Issue"].includes(r.status)||["Warning","Breach","Data Issue"].includes(r.statusMaster)).length;
  const avgUtil=rows.length?rows.reduce((s,r)=>s+(Number(valueFor(r,["utilization","utilisasi","utilisasiCcl"]))||0),0)/rows.length:0;
  const toggleSort=key=>{if(activeSort===key)setSortDir(x=>x==="asc"?"desc":"asc");else{setSortKey(key);setSortDir("asc")}setPage(1)};
  const exportCsv=()=>{const headers=columns.map(([label])=>label),keys=columns.map(([,key])=>key);const esc=v=>{const s=String(v??"");return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};const body=[headers.join(","),...rows.map(row=>keys.map(k=>esc(row[k])).join(","))].join("\n");const blob=new Blob([body],{type:"text/csv;charset=utf-8;"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="LIMAS-"+type+".csv";a.click();URL.revokeObjectURL(url)};
  return <div>
    <section className="pf-card pf-report-header"><div><div className="pf-label">LIMAS REPORT</div><h2>{report?.title||type}</h2><p>{report?.subtitle||"Canonical reporting view"}{report?.source?" · "+report.source:""}</p></div><div className="pf-report-header-meta"><span>{rows.length} records</span><span>Read-only</span></div></section>
    <div className="pf-product-selector pf-report-selector">{types.map(x=><button key={x} type="button" className={type===x?"active":""} onClick={()=>{setType(x);setSelected(null);setPage(1)}}>{snapshot.reports[x].title||x}</button>)}</div>
    {!report?<div className="pf-placeholder"><strong>Report unavailable</strong></div>:<>
      <div className="pf-report-kpis"><div><span>Total Limit</span><strong>{money(totalLimit)}</strong></div><div><span>Total Exposure</span><strong>{money(totalExposure)}</strong></div><div><span>Average Utilization</span><strong>{pct(avgUtil)}</strong></div><div><span>Exceptions</span><strong>{exceptionCount}</strong></div></div>
      <div className="pf-monitor-toolbar pf-report-toolbar"><select value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}} aria-label="Report status filter"><option>All</option><option>Normal</option><option>Warning</option><option>Breach</option><option>Data Issue</option></select><input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Search report fields..." aria-label="Search report"/><span className="pf-monitor-count">{rows.length} records</span><button type="button" className="pf-button-secondary" onClick={exportCsv}>Export Full CSV</button></div>
      <section className="pf-card"><div className="pf-card-head-inline"><div><h2>Report Detail</h2><p>Search, sort and page through the full canonical report dataset.</p></div></div>
        <div className="pf-table-wrap" style={{marginTop:14}}><table className="pf-table pf-report-table"><thead><tr>{visibleColumns.map(([label,key])=><th key={label}><button type="button" className="pf-th-sort" onClick={()=>toggleSort(key)}>{label}</button></th>)}<th>Detail</th></tr></thead><tbody>
          {pageRows.map((row,index)=><tr key={row.no||row.key||index}>{visibleColumns.map(([label,key])=><td key={key} className="pf-cell-wrap">{key==="status"||key==="statusMaster"?<span className={"pf-status-badge "+String(row[key]||row.status||"").toLowerCase().replace(" ","-")}>{row[key]||row.status||"—"}</span>:String(row[key]??"—")}</td>)}<td><button type="button" className="pf-row-action" onClick={()=>setSelected(row)}>View detail</button></td></tr>)}
        </tbody></table></div>
        <GridPager page={safePage} pageCount={pageCount} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} total={rows.length}/>
      </section>
      {selected&&<aside className="pf-drawer pf-report-drawer" aria-label="Report record detail"><button type="button" className="pf-drawer-close" onClick={()=>setSelected(null)}>Close</button><div className="pf-label">{type} · Record Detail</div><h3>{String(valueFor(selected,["name","debtor","bank","country","key"])||"Report record")}</h3><p>Complete record from canonical report snapshot.</p><div className="pf-report-detail-list">{columns.map(([label,key])=><div key={key}><span>{label}</span><strong>{String(selected[key]??"—")}</strong></div>)}</div></aside>}
    </>}
  </div>;
}
function ProductFinalGovernance({adapter}){
  const reportsSnapshot=adapter.getReportsGovernanceSnapshot();
  const detail=adapter.getGovernanceDetail();
  const [tab,setTab]=useState("overview");
  const gate=reportsSnapshot.governance?.releaseGate||{};
  const dqRows=detail.dq?.rows||[];
  const mapping=detail.mapping||[];
  const dictionary=detail.dictionary||{};
  const historical=detail.historicalDqClosure||[];
  const trace=reportsSnapshot.traceability||[];
  const csv=(name,headers,rows)=>{
    const escape=v=>{const s=String(v??"");return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
    const body=[headers.join(","),...rows.map(row=>headers.map(h=>escape(row[h])).join(","))].join("\n");
    const blob=new Blob([body],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=name; a.click(); URL.revokeObjectURL(url);
  };
  const tabs=["overview","dq","mapping","dictionary","lineage"];
  return <div>
    <div className="pf-product-selector">{tabs.map(x=><button key={x} type="button" className={tab===x?"active":""} onClick={()=>setTab(x)}>{x==="overview"?"Overview":x==="dq"?"Data Quality":x==="mapping"?"Business Mapping":x==="dictionary"?"Data Dictionary":"Lineage"}</button>)}</div>

    {tab==="overview"&&<>
      <div className="pf-grid">
        <section className="pf-card"><h2>Release Gate</h2><p>Governance status dibaca dari existing runtime.</p><div className="pf-status-row"><div className="pf-status"><div className="pf-label">Status</div><div className="pf-value">{gate.status||"—"}</div></div><div className="pf-status"><div className="pf-label">Active DQ</div><div className="pf-value">{gate.activeDq??"—"}</div></div><div className="pf-status"><div className="pf-label">Numeric Failures</div><div className="pf-value">{gate.numericFailures??"—"}</div></div></div></section>
        <section className="pf-card"><h2>Phase Health</h2><p>Phase 1–5 mengikuti governance audit yang sama.</p><div className="pf-list">{(reportsSnapshot.governance?.phases||[]).map(p=><div className="pf-universe" key={p.phase}><strong>Phase {p.phase} · {p.title}</strong><span>{p.status} · {p.issues} issues</span></div>)}</div></section>
        <section className="pf-card"><h2>Trust</h2><p>Governance tidak memenuhi operational screen, tetapi tetap dapat diverifikasi.</p><div className="pf-status-row"><div className="pf-status"><div className="pf-label">Traceable Fields</div><div className="pf-value">{trace.filter(x=>x.status==="TRACEABLE").length}/{trace.length}</div></div><div className="pf-status"><div className="pf-label">Historical DQ</div><div className="pf-value">{historical.length} areas</div></div></div></section>
      </div>
      <section className="pf-card" style={{marginTop:14}}><h2>Historical DQ Closure</h2><p>Register reconstructed closure evidence; bukan nomor original historical register.</p><div className="pf-list">{historical.map((item,i)=><div className="pf-universe" key={i}><strong>H-DQ-{String(i+1).padStart(2,"0")}</strong><span>{item} · CLOSED</span></div>)}</div></section>
      <div className="pf-note">{gate.detail||"Governance status tersedia dari existing runtime."}</div>
    </>}

    {tab==="dq"&&<section className="pf-card"><div className="pf-card-head-inline"><div><h2>Data Quality Register</h2><p>Read-only governance view dari validator existing. Action/remediation tetap dilakukan pada Version 1.</p></div><button type="button" className="pf-button-secondary" onClick={()=>csv("LIMAS_Product_Final_DQ.csv",["Layer","Domain","Key","Object","Issue Type","Detail","Action Status"],dqRows.map(x=>({Layer:x.layer,Domain:x.domain,Key:x.key,Object:x.object,"Issue Type":x.issueType,Detail:x.detail,"Action Status":x.action?.status}))) }>Export CSV</button></div>
      <div className="pf-status-row"><div className="pf-status"><div className="pf-label">Current Issues</div><div className="pf-value">{detail.dq?.summary?.rows?.length??dqRows.length}</div></div><div className="pf-status"><div className="pf-label">Open / In Progress</div><div className="pf-value">{detail.dq?.summary?.actionPending??"—"}</div></div></div>
      <div className="pf-table-wrap" style={{marginTop:14}}><table className="pf-table"><thead><tr><th>Layer</th><th>Issue Type</th><th>Domain</th><th>Key</th><th>Detail</th><th>Action</th></tr></thead><tbody>{dqRows.length?dqRows.slice(0,150).map((row,i)=><tr key={row.id+"|"+i}><td>{row.layer}</td><td>{row.issueType}</td><td>{row.domain}</td><td>{row.key}</td><td>{row.detail}</td><td>{row.action?.status||"—"}</td></tr>):<tr><td colSpan="6">No Data Quality issue in current validator.</td></tr>}</tbody></table></div>
    </section>}

    {tab==="mapping"&&<section className="pf-card"><div className="pf-card-head-inline"><div><h2>Business Mapping</h2><p>Source record → target master mapping; read-only in Product Final.</p></div><button type="button" className="pf-button-secondary" onClick={()=>csv("LIMAS_Product_Final_Mapping.csv",["Domain","Product","Record","Source Field","Source Value","Target Key","Target Master","Scope","Status"],mapping.map(x=>({Domain:x.limitType,Product:x.productId,Record:x.recordId,"Source Field":x.sourceField,"Source Value":x.sourceValue,"Target Key":x.key,"Target Master":x.masterObject,Scope:x.scope,Status:x.masterMatch?"Mapped":"Issue"}))) }>Export CSV</button></div>
      <div className="pf-status-row"><div className="pf-status"><div className="pf-label">Mapping Edges</div><div className="pf-value">{mapping.length}</div></div><div className="pf-status"><div className="pf-label">Mapped</div><div className="pf-value">{mapping.filter(x=>x.masterMatch).length}</div></div></div>
      <div className="pf-table-wrap" style={{marginTop:14}}><table className="pf-table"><thead><tr><th>Domain</th><th>Product</th><th>Record</th><th>Source Field</th><th>Source Value</th><th>Target</th><th>Scope</th><th>Status</th></tr></thead><tbody>{mapping.slice(0,180).map((row,i)=><tr key={(row.recordId||"row")+"|"+row.limitType+"|"+i}><td>{row.limitType}</td><td>{row.productId}</td><td>{row.recordId}</td><td>{row.sourceField||"—"}</td><td>{row.sourceValue||"—"}</td><td>{row.masterObject||row.key||"—"}</td><td>{row.scope||"—"}</td><td>{row.masterMatch?"Mapped":"Issue"}</td></tr>)}</tbody></table></div>
    </section>}

    {tab==="dictionary"&&<section className="pf-card"><h2>Product Data Dictionary</h2><p>Presentation of existing source schema and product metadata; no field semantics are redefined here.</p>
      <div className="pf-product-selector" style={{marginTop:12}}>{(dictionary.catalog||[]).map(item=><button key={item.id} type="button" onClick={()=>{}}>{item.label}</button>)}</div>
      {(dictionary.catalog||[]).map(item=><div className="pf-universe" style={{marginTop:8}} key={item.id}><strong>{item.label}</strong><span>{item.definition||item.note||"—"} · Key: {item.key||"—"} · Canonical: {item.canonicalUnit||"Rp Juta"}</span><div style={{marginTop:8,fontSize:10,color:"#5b6472"}}>Source fields: {(dictionary.fields?.[item.id]||[]).length} · Registered schema fields: {(dictionary.schemaFields?.[item.id]||[]).length}</div></div>)}
      <div className="pf-note">Layer governance: Raw Source → Business Enrichment → Reference Master → Domain Mapping → Canonical/Derived. Derived monitoring outputs tetap berada di Monitoring, bukan Product Database.</div>
    </section>}

    {tab==="lineage"&&<>
      <section className="pf-card"><h2>Report Field Lineage</h2><p>Report Field · Source Layer · Source / Reference · Transformation · Status.</p><div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Report</th><th>Field</th><th>Source Layer</th><th>Source / Reference</th><th>Transformation</th><th>Status</th></tr></thead><tbody>{trace.slice(0,180).map((row,index)=><tr key={row.reportType+"|"+row.field+"|"+index}><td>{row.reportType}</td><td>{row.label||row.field}</td><td>{row.sourceLayer}</td><td>{row.sourceReference}</td><td>{row.transformation}</td><td><span className={"pf-status-badge "+String(row.status||"").toLowerCase().replaceAll("_","-")}>{row.status}</span></td></tr>)}</tbody></table></div></section>
      <section className="pf-card" style={{marginTop:14}}><h2>LPG E2E Classification Lineage</h2><p>Urutan chain dipertahankan dari source record sampai utilization/status.</p><div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Source Record</th><th>CIF</th><th>Industry</th><th>Grouping</th><th>Segment</th><th>Region</th><th>IC Nasional</th><th>IC Segwil</th><th>Master Limit</th><th>Outstanding</th><th>Utilization</th><th>Status</th></tr></thead><tbody>{(reportsSnapshot.lpgLineage||[]).map(row=><tr key={row.sourceRecord}><td>{row.sourceRecord}</td><td>{row.cif}</td><td>{row.industry}</td><td>{row.grouping}</td><td>{row.segment}</td><td>{row.region}</td><td>{row.icNasional}</td><td>{row.icSegwil}</td><td>{Number(row.masterLimit||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{Number(row.canonicalOutstanding||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{(Number(row.utilization||0)*100).toFixed(2)}%</td><td><span className={"pf-status-badge "+String(row.status||"").toLowerCase().replace(" ","-")}>{row.status}</span></td></tr>)}</tbody></table></div></section>
    </>}
  </div>;
}
export default function ProductFinalApp({source}){
  const [active,setActive]=useState("home");
  const adapter=useMemo(()=>createProductFinalAdapter(source),[source]);
  const universes=adapter.getUniverses();
  const data=adapter.getDataSourceSummary();
  const meta=adapter.getRuntimeMeta();
  const home=adapter.getHomeSnapshot();
  const current=NAV.find(x=>x.id===active)||NAV[0];

  return <div className="pf">
    <div className="pf-shell">
      <aside className="pf-side">
        <div className="pf-brand"><strong>LIMAS</strong><span>Product Final · Clean Experience</span></div>
        <nav className="pf-nav" aria-label="Product Final navigation">
          {NAV.map(item=><React.Fragment key={item.id}>
            {item.divider?<div className="pf-divider"/>:null}
            <button type="button" className={active===item.id?"active":""} onClick={()=>setActive(item.id)}>{item.label}</button>
          </React.Fragment>)}
        </nav>
      </aside>
      <main className="pf-main">
        <header className="pf-top">
          <div className="pf-top-left"><span className="pf-top-title">LIMAS Product Final</span><span className="pf-top-meta">Business / Executive Experience</span></div>
          <div className="pf-top-right"><span className="pf-trust">● Canonical source connected</span><span className="pf-avatar">R</span></div>
        </header>
        <div className="pf-content">
          <div className="pf-crumb">LIMAS › {current.label}</div>
          <h1 className="pf-title">{current.label}</h1>
          <p className="pf-subtitle">Foundation shell aktif. Business truth tetap berasal dari existing LIMAS; Product Final hanya mengubah experience layer.</p>
          {active==="reports"?<ReportsView adapter={adapter}/>:active==="governance"?<ProductFinalGovernance adapter={adapter}/>:active==="products"?<ProductsView adapter={adapter}/>:active==="limits"?<LimitsView adapter={adapter}/>:active==="monitoring"?<MonitoringView adapter={adapter}/>:active==="home"?<>
            <section className="pf-dashboard-hero">
              <div>
                <div className="pf-label">MANAGEMENT DASHBOARD</div>
                <h2>Bankwide Limit Position</h2>
                <p>Executive view of current limit position, utilization and risk attention. All business values remain sourced from the canonical monitoring snapshot.</p>
              </div>
              <div className="pf-dashboard-hero-meta">
                <span className="pf-readonly-badge">CANONICAL</span>
                <span className="pf-readonly-badge">READ ONLY</span>
              </div>
            </section>
            <div className="pf-dashboard-kpis">
              <section className="pf-dashboard-kpi"><span>Total Limit</span><strong>{Number(home?.totalLimit||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</strong><small>Across monitored universes</small></section>
              <section className="pf-dashboard-kpi"><span>Total Exposure</span><strong>{Number(home?.totalExposure||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</strong><small>Current canonical exposure</small></section>
              <section className="pf-dashboard-kpi"><span>Available</span><strong>{Number(home?.available||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</strong><small>Limit less current exposure</small></section>
              <section className="pf-dashboard-kpi"><span>Utilization</span><strong>{(Number(home?.utilization||0)*100).toFixed(1)}%</strong><small>Bankwide weighted position</small></section>
            </div>
            <div className="pf-dashboard-grid">
              <section className="pf-card pf-dashboard-risk-card">
                <div className="pf-card-head-inline"><div><h2>Risk & Attention Center</h2><p>Prioritized exceptions from canonical monitoring; no new threshold is calculated here.</p></div><span className="pf-monitor-count">{home?.topRisks?.length||0} prioritized</span></div>
                <div className="pf-risk-summary">
                  <div><span>Breach</span><strong className="pf-risk-danger">{home?.breach??"—"}</strong></div>
                  <div><span>Warning / Near Breach</span><strong className="pf-risk-warning">{home?.nearBreach??"—"}</strong></div>
                  <div><span>Data Issue</span><strong>{home?.issue??"—"}</strong></div>
                </div>
                <div className="pf-risk-list">
                  {(home?.topRisks||[]).length===0?<div className="pf-note">No warning or breach in the current canonical snapshot.</div>:(home.topRisks||[]).map((row,index)=><button type="button" className="pf-risk-row" key={row.domain+"|"+row.key+"|"+index} onClick={()=>{setActive("monitoring");}}>
                    <span className={"pf-status-badge "+String(row.status||"").toLowerCase().replace(" ","-")}>{row.status}</span>
                    <span className="pf-risk-object"><strong>{row.object||row.key||"—"}</strong><small>{row.domain} · {row.key||"—"}</small></span>
                    <strong className="pf-risk-util">{Number.isFinite(Number(row.utilization))?(Number(row.utilization)*100).toFixed(1)+"%":"—"}</strong>
                  </button>)}
                </div>
              </section>
              <section className="pf-card">
                <div className="pf-card-head-inline"><div><h2>Limit Actions</h2><p>Operational workflow is not yet connected to the canonical runtime.</p></div><span className="pf-readonly-badge">NOT CONNECTED</span></div>
                <div className="pf-action-placeholder">
                  <div><span>Pending Actions</span><strong>—</strong><small>Workflow source not connected</small></div>
                  <div><span>Awaiting Effective</span><strong>—</strong><small>Workflow source not connected</small></div>
                </div>
                <div className="pf-note">No synthetic action count is shown. Once the approved workflow source exists, these cards can become actionable without changing Master Limit ownership.</div>
              </section>
            </div>
            <section className="pf-card pf-dashboard-domain">
              <div className="pf-card-head-inline"><div><h2>Universe Health</h2><p>Compare limit position and exceptions across Country, CCL, MLK, CIL and LPG.</p></div><span className="pf-monitor-count">{home?.masterObjects??0} monitored objects</span></div>
              <div className="pf-domain-grid">{(home?.domains||[]).map(domain=><button type="button" className="pf-domain-card" key={domain.type} onClick={()=>{setActive("monitoring");}}>
                <div className="pf-domain-head"><strong>{domain.type}</strong><span className={"pf-status-badge "+(domain.breaches?"breach":domain.warnings?"warning":"")}>{domain.breaches?"Breach":domain.warnings?"Warning":"Normal"}</span></div>
                <div className="pf-domain-bar"><span style={{width:Math.min(100,Math.max(0,Number(domain.utilization||0)*100))+"%"}}/></div>
                <div className="pf-domain-meta"><span>{(Number(domain.utilization||0)*100).toFixed(1)}% utilized</span><span>{domain.records} objects</span></div>
                <div className="pf-domain-exceptions"><span>{domain.breaches} breach</span><span>{domain.warnings} warning</span><span>{domain.issues} DQ</span></div>
              </button>)}</div>
            </section>
            <section className="pf-card pf-dashboard-trust">
              <div className="pf-card-head-inline"><div><h2>Trust & Data Health</h2><p>Release and data-quality signals remain visible without competing with operational risk.</p></div><span className="pf-readonly-badge">{home?.releaseGate?.status||"—"}</span></div>
              <div className="pf-trust-grid">
                <div><span>Release Gate</span><strong>{home?.releaseGate?.status||"—"}</strong></div>
                <div><span>Active DQ</span><strong>{home?.releaseGate?.activeDq??"—"}</strong></div>
                <div><span>Numeric Failures</span><strong>{home?.releaseGate?.numericFailures??"—"}</strong></div>
                <div><span>Blocking Layers</span><strong>{home?.releaseGate?.blockingLayers??"—"}</strong></div>
              </div>
            </section>
          </>:<div className="pf-placeholder"><strong>{current.label} — belum diimplementasikan</strong><span>Scope berikutnya dibangun hanya setelah Foundation gate dinyatakan clear.</span></div>}
        </div>
      </main>
    </div>
  </div>;
}
