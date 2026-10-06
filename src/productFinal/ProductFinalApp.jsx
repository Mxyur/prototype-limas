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
          {active==="monitoring"?<MonitoringView adapter={adapter}/>:active==="home"?<>
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
