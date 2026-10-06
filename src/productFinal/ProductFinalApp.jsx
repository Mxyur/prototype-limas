import React,{useMemo,useState} from "react";
import {createProductFinalAdapter} from "./productFinalAdapter";
import "./productFinal.css";

const MONITOR_UNIVERSES=["Country","CCL","MLK","CIL","LPG"];
const NAV=[
  {id:"home",label:"Home"},
  {id:"monitoring",label:"Monitoring"},
  {id:"limits",label:"Limits"},
  {id:"products",label:"Products"},
  {id:"reports",label:"Reports"},
  {id:"governance",label:"Governance",divider:true}
];

function MonitoringView({adapter}){
  const [universe,setUniverse]=useState("Country");
  const [status,setStatus]=useState("All");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(null);
  const snapshot=adapter.getMonitoringSnapshot(universe);
  const rows=snapshot?.rows||[];
  const filtered=rows.filter(row=>{
    const matchesStatus=status==="All"||row.status===status;
    const hay=[row.key,row.name,row.group,row.entity,row.sector,row.segment,row.region].join(" ").toLowerCase();
    return matchesStatus&&hay.includes(query.trim().toLowerCase());
  });
  const headers=universe==="Country"?["Code","Country","Limit","Exposure","Utilization","Status"]:
    universe==="CCL"?["Swift","Bank","CCL","Contractual","Outstanding","Utilization","Status"]:
    universe==="MLK"?["CIF","Debtor","Group","Limit","Exposure","Utilization","Status"]:
    universe==="CIL"?["Insurance","Name","CIL","Exposure","Utilization","Status"]:
    ["Sector","Segment","Region","Limit","Outstanding","Utilization","Status"];
  return <div className="pf-monitor">
    <div className="pf-monitor-tabs">{MONITOR_UNIVERSES.map(x=><button key={x} type="button" className={universe===x?"active":""} onClick={()=>setUniverse(x)}>{x}</button>)}</div>
    <div className="pf-monitor-toolbar">
      <select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Status filter"><option value="All">All Status</option><option>Normal</option><option>Warning</option><option>Breach</option><option>Data Issue</option></select>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search entity, key, sector..." aria-label="Search monitoring"/>
      <span className="pf-monitor-count">{filtered.length} / {rows.length}</span>
    </div>
    {!snapshot?<div className="pf-placeholder"><strong>Monitoring snapshot unavailable</strong><span>Canonical monitoring output belum tersedia untuk universe ini.</span></div>:
    <section className="pf-card">
      <div className="pf-monitor-summary"><div><span>Limit</span><strong>{Number(snapshot.totalLimit||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</strong></div><div><span>Exposure</span><strong>{Number(snapshot.totalExposure||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</strong></div><div><span>Utilization</span><strong>{(Number(snapshot.utilization||0)*100).toFixed(1)}%</strong></div><div><span>Breach</span><strong>{snapshot.statusCounts?.Breach??0}</strong></div></div>
      <div className="pf-table-wrap"><table className="pf-table"><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>
      {filtered.map(row=>{
        const util=Number(row.utilization||0)*100;
        return <tr key={row.key} onClick={()=>setSelected(row)}>
          <td>{universe==="Country"?row.countryCode||row.key:universe==="CCL"?row.key:universe==="MLK"?row.key:universe==="CIL"?row.insurance||row.key:row.sector}</td>
          <td>{universe==="Country"?row.name:universe==="CCL"?row.name:universe==="MLK"?row.name:universe==="CIL"?row.name:row.segment}</td>
          {universe==="MLK"?<td>{row.group}</td>:null}
          {universe==="LPG"?<td>{row.region}</td>:null}
          <td>{Number(row.limit||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td>
          {universe==="CCL"?<td>{Number(row.contractual||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td>:null}
          <td>{Number(row.exposure||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td>
          <td>{util.toFixed(1)}%</td>
          <td><span className={"pf-status-badge "+String(row.status||"").toLowerCase().replace(" ","-")}>{row.status}</span></td>
        </tr>
      })}</tbody></table></div>
      {selected?<aside className="pf-drawer" aria-label="Monitoring detail"><button type="button" className="pf-drawer-close" onClick={()=>setSelected(null)}>Close</button><div className="pf-label">Detail</div><h3>{selected.name||selected.key}</h3><p>{universe} · {selected.key}</p><div className="pf-monitor-detail-grid"><div><span>Limit</span><strong>{Number(selected.limit||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</strong></div><div><span>Exposure</span><strong>{Number(selected.exposure||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</strong></div><div><span>Utilization</span><strong>{(Number(selected.utilization||0)*100).toFixed(2)}%</strong></div><div><span>Status</span><strong>{selected.status}</strong></div></div><div className="pf-note">Business values are read-only from the existing canonical monitoring snapshot. No Product Final recalculation is performed.</div></aside>:null}
    </section>}
  </div>;
}
function LimitsView({adapter}){
  const domains=adapter.getLimitsSnapshot();
  const [domain,setDomain]=useState(domains[0]?.type||"Country");
  const selected=domains.find(x=>x.type===domain)||domains[0];
  return <div>
    <div className="pf-monitor-tabs">{domains.map(x=><button key={x.type} type="button" className={domain===x.type?"active":""} onClick={()=>setDomain(x.type)}>{x.type}</button>)}</div>
    <div className="pf-grid" style={{marginTop:12}}>
      <section className="pf-card"><h2>Master Limit</h2><p>Read-only view dari master limit existing.</p><div className="pf-status-row"><div className="pf-status"><div className="pf-label">Total Limit</div><div className="pf-value">{Number(selected?.totalLimit||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</div></div><div className="pf-status"><div className="pf-label">Exposure</div><div className="pf-value">{Number(selected?.totalExposure||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</div></div><div className="pf-status"><div className="pf-label">Utilization</div><div className="pf-value">{(Number(selected?.utilization||0)*100).toFixed(1)}%</div></div></div></section>
      <section className="pf-card"><h2>Write Boundary</h2><p>Product Final tidak membuat CRUD master limit kedua.</p><div className="pf-note">Perubahan master limit tetap dilakukan pada Governance / Version 1 application.</div></section>
      <section className="pf-card"><h2>Scope</h2><p>Detail limit mengikuti canonical scope. Product Final hanya menyajikan data yang sudah tersedia.</p><div className="pf-status-row"><div className="pf-status"><div className="pf-label">Objects</div><div className="pf-value">{selected?.rows?.length??0}</div></div></div></section>
    </div>
    <section className="pf-card" style={{marginTop:14}}><h2>Limit Detail</h2><div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Key</th><th>Name</th><th>Limit</th><th>Exposure</th><th>Status</th><th>Entity</th><th>Region</th></tr></thead><tbody>{(selected?.rows||[]).map(row=><tr key={row.key}><td>{row.key}</td><td>{row.name}</td><td>{Number(row.limit||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{Number(row.exposure||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td><span className={"pf-status-badge "+String(row.status||"").toLowerCase().replace(" ","-")}>{row.status}</span></td><td>{row.entity}</td><td>{row.region}</td></tr>)}</tbody></table></div></section>
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
  const report=snapshot.reports?.[type];
  const rows=(report?.rows||[]).filter(row=>status==="All"||row.status===status||row.statusMaster===status);
  return <div>
    <div className="pf-product-selector">{types.map(x=><button key={x} type="button" className={type===x?"active":""} onClick={()=>setType(x)}>{snapshot.reports[x].title||x}</button>)}</div>
    <div className="pf-monitor-toolbar"><select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Report status filter"><option>All</option><option>Normal</option><option>Warning</option><option>Breach</option><option>Data Issue</option></select><span className="pf-monitor-count">{rows.length} records</span></div>
    {!report?<div className="pf-placeholder"><strong>Report unavailable</strong></div>:<section className="pf-card"><h2>{report.title}</h2><p>{report.subtitle} · {report.source}</p><div className="pf-table-wrap"><table className="pf-table"><thead><tr>{(report.columns||[]).slice(0,10).map(([label])=><th key={label}>{label}</th>)}</tr></thead><tbody>{rows.slice(0,50).map((row,index)=><tr key={row.no||index}>{(report.columns||[]).slice(0,10).map(([label,key])=><td key={key}>{key==="status"||key==="statusMaster"?<span className={"pf-status-badge "+String(row[key]||row.status||"").toLowerCase().replace(" ","-")}>{row[key]||row.status||"—"}</span>:String(row[key]??"—")}</td>)}</tr>)}</tbody></table></div></section>}
  </div>;
}

function GovernanceView({adapter}){
  const snapshot=adapter.getReportsGovernanceSnapshot();
  const gate=snapshot.governance?.releaseGate||{};
  return <div>
    <div className="pf-grid">
      <section className="pf-card"><h2>Release Gate</h2><p>Governance status dibaca dari existing runtime.</p><div className="pf-status-row"><div className="pf-status"><div className="pf-label">Status</div><div className="pf-value">{gate.status||"—"}</div></div><div className="pf-status"><div className="pf-label">Active DQ</div><div className="pf-value">{gate.activeDq??"—"}</div></div><div className="pf-status"><div className="pf-label">Numeric Failures</div><div className="pf-value">{gate.numericFailures??"—"}</div></div></div></section>
      <section className="pf-card"><h2>Phase Health</h2><p>Phase 1–5 mengikuti governance audit yang sama.</p><div className="pf-list">{(snapshot.governance?.phases||[]).map(p=><div className="pf-universe" key={p.phase}><strong>Phase {p.phase} · {p.title}</strong><span>{p.status} · {p.issues} issues</span></div>)}</div></section>
      <section className="pf-card"><h2>Lineage</h2><p>Field-level report traceability tetap tersedia tanpa memenuhi operational screen.</p><div className="pf-status-row"><div className="pf-status"><div className="pf-label">Traceable</div><div className="pf-value">{(snapshot.traceability||[]).filter(x=>x.status==="TRACEABLE").length}</div></div><div className="pf-status"><div className="pf-label">Total Fields</div><div className="pf-value">{(snapshot.traceability||[]).length}</div></div></div></section>
    </div>
    <section className="pf-card" style={{marginTop:14}}><h2>Report Field Lineage</h2><p>Report Field · Source Layer · Source / Reference · Transformation · Status.</p><div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Report</th><th>Field</th><th>Source Layer</th><th>Source / Reference</th><th>Transformation</th><th>Status</th></tr></thead><tbody>{(snapshot.traceability||[]).slice(0,120).map((row,index)=><tr key={row.reportType+"|"+row.field+"|"+index}><td>{row.reportType}</td><td>{row.label||row.field}</td><td>{row.sourceLayer}</td><td>{row.sourceReference}</td><td>{row.transformation}</td><td><span className={"pf-status-badge "+String(row.status||"").toLowerCase().replaceAll("_","-")}>{row.status}</span></td></tr>)}</tbody></table></div></section>
    <section className="pf-card" style={{marginTop:14}}><h2>LPG E2E Classification Lineage</h2><p>Urutan chain dipertahankan dari source record sampai utilization/status.</p><div className="pf-table-wrap"><table className="pf-table"><thead><tr><th>Source Record</th><th>CIF</th><th>Industry</th><th>Grouping</th><th>Segment</th><th>Region</th><th>IC Nasional</th><th>IC Segwil</th><th>Master Limit</th><th>Outstanding</th><th>Utilization</th><th>Status</th></tr></thead><tbody>{(snapshot.lpgLineage||[]).map(row=><tr key={row.sourceRecord}><td>{row.sourceRecord}</td><td>{row.cif}</td><td>{row.industry}</td><td>{row.grouping}</td><td>{row.segment}</td><td>{row.region}</td><td>{row.icNasional}</td><td>{row.icSegwil}</td><td>{Number(row.masterLimit||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{Number(row.canonicalOutstanding||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{(Number(row.utilization||0)*100).toFixed(2)}%</td><td><span className={"pf-status-badge "+String(row.status||"").toLowerCase().replace(" ","-")}>{row.status}</span></td></tr>)}</tbody></table></div></section>
    <div className="pf-note">{gate.detail||"Governance status tersedia dari existing runtime."}</div>
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
          {active==="reports"?<ReportsView adapter={adapter}/>:active==="governance"?<GovernanceView adapter={adapter}/>:active==="products"?<ProductsView adapter={adapter}/>:active==="limits"?<LimitsView adapter={adapter}/>:active==="monitoring"?<MonitoringView adapter={adapter}/>:active==="home"?<>
            <div className="pf-grid">
              <section className="pf-card"><h2>Bankwide Overview</h2><p>Summary menggunakan snapshot yang sama dengan existing canonical monitoring presentation.</p><div className="pf-status-row">
                <div className="pf-status"><div className="pf-label">Master Objects</div><div className="pf-value">{home?.masterObjects??"—"}</div></div>
                <div className="pf-status"><div className="pf-label">Product Source Records</div><div className="pf-value">{home?.productSourceRecords??"—"}</div></div>
              </div></section>
              <section className="pf-card"><h2>Attention Required</h2><p>Exception berasal dari canonical monitoring output; Product Final tidak menentukan threshold sendiri.</p><div className="pf-status-row">
                <div className="pf-status"><div className="pf-label">Breach</div><div className="pf-value">{home?.breach??"—"}</div></div>
                <div className="pf-status"><div className="pf-label">Warning</div><div className="pf-value">{home?.warning??"—"}</div></div>
              </div></section>
              <section className="pf-card"><h2>Trust</h2><p>Governance tetap tersedia tanpa memenuhi layar utama.</p><div className="pf-status-row">
                <div className="pf-status"><div className="pf-label">Release Gate</div><div className="pf-value">{home?.releaseGate?.status??"—"}</div></div>
                <div className="pf-status"><div className="pf-label">Active DQ</div><div className="pf-value">{home?.releaseGate?.activeDq??"—"}</div></div>
              </div></section>
            </div>
            <section className="pf-card" style={{marginTop:14}}><h2>Utilization by Domain</h2><p>Nilai utilization berasal dari presentation snapshot existing dan tidak dihitung ulang oleh Product Final.</p>
              <div className="pf-list">{(home?.domains||[]).map(domain=><div className="pf-universe" key={domain.type}>
                <strong>{domain.type}</strong>
                <span>{(Number(domain.utilization||0)*100).toFixed(1)}% · {domain.breaches} breach · {domain.warnings} warning</span>
              </div>)}</div>
            </section>
            <section className="pf-card" style={{marginTop:14}}><h2>Attention Required</h2>
              <div className="pf-status-row">{(home?.attention||[]).length===0?<div className="pf-note">No warning/breach pada current canonical snapshot.</div>:(home.attention||[]).map((row,index)=><div className="pf-status" key={row.domain+"|"+row.key+"|"+index}>
                <div className="pf-label">{row.domain} · {row.status}</div>
                <div className="pf-value">{row.object||row.key||"—"}</div>
              </div>)}</div>
            </section>
            <div className="pf-note">{home?.releaseGate?.detail||"Foundation snapshot tersedia dari existing runtime."}</div>
          </>:<div className="pf-placeholder"><strong>{current.label} — belum diimplementasikan</strong><span>Scope berikutnya dibangun hanya setelah Foundation gate dinyatakan clear.</span></div>}
        </div>
      </main>
    </div>
  </div>;
}
