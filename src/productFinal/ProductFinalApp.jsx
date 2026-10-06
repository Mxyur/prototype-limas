import React,{useMemo,useState} from "react";
import {createProductFinalAdapter} from "./productFinalAdapter";
import "./productFinal.css";

const NAV=[
  {id:"home",label:"Home"},
  {id:"monitoring",label:"Monitoring"},
  {id:"limits",label:"Limits"},
  {id:"products",label:"Products"},
  {id:"reports",label:"Reports"},
  {id:"governance",label:"Governance",divider:true}
];

export default function ProductFinalApp({source}){
  const [active,setActive]=useState("home");
  const adapter=useMemo(()=>createProductFinalAdapter(source),[source]);
  const universes=adapter.getUniverses();
  const data=adapter.getDataSourceSummary();
  const meta=adapter.getRuntimeMeta();
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
          {active==="home"?<>
            <div className="pf-grid">
              <section className="pf-card"><h2>Foundation Status</h2><p>Surface Product Final berjalan sebagai presentation layer di atas source yang sama.</p><div className="pf-status-row"><div className="pf-status"><div className="pf-label">Surface</div><div className="pf-value">PRODUCT_FINAL</div></div><div className="pf-status"><div className="pf-label">Runtime</div><div className="pf-value">{meta.status||"CONNECTED"}</div></div></div></section>
              <section className="pf-card"><h2>Shared Data Foundation</h2><p>Tidak ada dataset atau business calculation baru di foundation.</p><div className="pf-status-row"><div className="pf-status"><div className="pf-label">Master Domains</div><div className="pf-value">{data.masterDomains.length}</div></div><div className="pf-status"><div className="pf-label">Source Records</div><div className="pf-value">{data.productCount}</div></div></div></section>
              <section className="pf-card"><h2>Architecture Guardrail</h2><p>UI tidak menghitung ulang limit, outstanding, utilization, classification, atau status.</p><div className="pf-note">Semua akses data Product Final wajib melewati adapter read-only.</div></section>
            </div>
            <section className="pf-card" style={{marginTop:14}}><h2>Universe Registry</h2><p>Presentational registry untuk konsistensi navigasi dan visual; bukan business-rule engine.</p><div className="pf-list">{universes.map(u=><div className="pf-universe" key={u.id}><strong>{u.label}</strong><span>{u.status}</span></div>)}</div></section>
            <div className="pf-note">Foundation slice hanya membangun shell dan adapter boundary. Business screens dibangun satu per satu setelah gate berikutnya clear.</div>
          </>:<div className="pf-placeholder"><strong>{current.label} — belum diimplementasikan</strong><span>Scope berikutnya dibangun hanya setelah Foundation gate dinyatakan clear.</span></div>}
        </div>
      </main>
    </div>
  </div>;
}
