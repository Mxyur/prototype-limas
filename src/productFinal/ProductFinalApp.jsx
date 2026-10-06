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
          {active==="home"?<>
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
