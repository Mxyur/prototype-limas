// @ts-nocheck
import * as React from 'react';
import type { ILimasProps } from './ILimasProps';

const LIMAS_CSS = `
.limas-spfx-root{--bg:#061126;--panel:#fff;--text:#182238;--muted:#7f8ba0;--line:#e7ebf1;--blue:#1b73e8;--green:#1e9d68;--yellow:#d39a14;--red:#dc4a4a}*{box-sizing:border-box}button,input,select{font:inherit}.limas-spfx-root *{box-sizing:border-box}.app{min-height:100vh;background:radial-gradient(circle at 90% 0,rgba(41,145,255,.32),transparent 28%),linear-gradient(150deg,#07162e,#020a15 78%);position:relative;overflow:hidden}.app:before,.app:after{content:"";position:absolute;border:1px solid rgba(42,145,255,.22);border-radius:50%;pointer-events:none;transform:rotate(-25deg)}.app:before{width:90vw;height:72vh;right:-17vw;top:-24vh}.app:after{width:110vw;height:90vh;right:-24vw;top:-33vh;border-color:rgba(42,145,255,.10)}.shell{display:flex;min-height:100vh;position:relative;z-index:1}.side{width:260px;background:rgba(17,21,29,.97);padding:18px 14px;border-right:1px solid rgba(255,255,255,.07);display:flex;flex-direction:column}.brand{height:88px;border-radius:16px;background:linear-gradient(135deg,#12396e,#0d6ac0);display:grid;place-items:center;text-align:center;margin-bottom:14px}.brand b{font-size:23px}.brand small{font-size:10px;display:block;opacity:.75;margin-top:3px}.nav{display:flex;flex-direction:column;gap:5px}.nav button{border:0;background:none;color:#9aa5b7;text-align:left;padding:11px 13px;border-radius:10px;display:flex;align-items:center;gap:10px;font-weight:700}.nav button:hover,.nav button.active{background:#2b3037;color:#fff}.section{font-size:10px;letter-spacing:1px;color:#667187;margin:12px 8px 4px;text-transform:uppercase}.collapse{margin-top:auto;color:#919db0;border-top:1px solid rgba(255,255,255,.07);padding:12px 10px}.main{flex:1;padding:26px 30px 35px;min-width:0}.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.title h1{margin:0;font-size:24px}.title p{margin:4px 0;color:#98a5b9}.usr{display:flex;gap:9px;align-items:center;font-size:12px}.avatar{width:34px;height:34px;border-radius:50%;background:#fff;color:#1d5fa8;display:grid;place-items:center;font-weight:900}.page{display:flex;flex-direction:column;gap:16px}.card{background:rgba(255,255,255,.98);color:var(--text);border-radius:18px;box-shadow:0 18px 50px rgba(0,0,0,.22)}.head{padding:18px 21px 11px;display:flex;justify-content:space-between;align-items:flex-start;gap:12px}.head h2{margin:0;font-size:18px}.head p{margin:5px 0 0;color:var(--muted);font-size:12px}.body{padding:18px 21px 21px}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.kpi{background:#fff;border:1px solid #eef1f4;border-radius:15px;padding:16px}.kpi .l{font-size:11px;color:#7e899b}.kpi .v{font-size:26px;font-weight:800;margin-top:7px}.kpi .m{font-size:10px;margin-top:4px}.btn{height:39px;border-radius:9px;padding:0 13px;border:0;font-weight:800}.primary{background:var(--blue);color:#fff}.secondary{background:#edf4fd;color:#1b5fae}.ghost{background:#fff;color:#40506b;border:1px solid #dde4ec}.toolbar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.input,.select{height:40px;border:1px solid #dce3eb;border-radius:9px;padding:0 11px;min-width:170px;background:#fff;color:#2a3550}.tabs{display:flex;gap:4px;border-bottom:1px solid var(--line);overflow:auto}.tab{border:0;background:none;color:#738096;padding:10px 12px;font-weight:800;border-bottom:2px solid transparent;white-space:nowrap}.tab.active{color:#1d63b0;border-color:var(--blue)}.table-wrap{overflow:auto}.table{width:100%;border-collapse:collapse;font-size:12px}.table th{background:#f5f7fa;color:#718096;text-align:left;padding:11px;border-bottom:1px solid var(--line);white-space:nowrap}.table td{padding:11px;border-bottom:1px solid #edf0f3;vertical-align:top}.table tr:hover td{background:#fbfcfe}.badge{display:inline-flex;padding:5px 9px;border-radius:999px;font-size:10px;font-weight:800}.normal{background:#ddf5e9;color:#136b4a}.warning{background:#fff1ca;color:#8a640d}.breach{background:#ffe1e1;color:#a52d2d}.key{font-family:ui-monospace,Menlo,monospace;background:#f3f5f8;border:1px solid #e1e6ed;border-radius:6px;padding:4px 6px;font-size:10px}.grid2{display:grid;grid-template-columns:1.2fr .8fr;gap:15px}.rowgrid{display:grid;grid-template-columns:1.1fr 1fr 1fr;border:1px solid var(--line);border-radius:11px;overflow:hidden}.rowgrid>div{padding:9px 10px;border-bottom:1px solid var(--line);font-size:11px}.rowgrid>div:nth-child(3n+1),.rowgrid>div:nth-child(3n+2),.rowgrid>div:nth-child(3n+3){}.rowgrid .h{background:#f6f8fb;font-weight:800}.section-title{font-size:12px;font-weight:900;color:#5c6980;margin:13px 0 8px}.mini{background:#f6f8fb;border:1px solid #e8ecf1;border-radius:11px;padding:11px;font-size:11px}.login{min-height:100vh;display:grid;place-items:center;position:relative;z-index:2;padding:24px}.login-card{width:min(480px,94vw);background:#fff;color:var(--text);border-radius:20px;padding:30px;box-shadow:0 25px 70px rgba(0,0,0,.35)}.login-logo{width:70px;height:70px;border-radius:18px;background:linear-gradient(135deg,#0d4c9d,#2c9cff);display:grid;place-items:center;color:#fff;font-size:18px;font-weight:900;margin-bottom:20px}.login-card h1{margin:0;font-size:28px}.login-card p{margin:5px 0 20px;color:#7e899a}.login-card input{height:47px;width:100%;border:1px solid #dbe2ea;border-radius:10px;padding:0 12px;margin-bottom:10px}.login-card .btn{width:100%;height:47px}.foot{font-size:10px;color:#98a2b1;text-align:center;margin-top:15px}@media(max-width:1050px){.kpis{grid-template-columns:repeat(2,1fr)}.grid2{grid-template-columns:1fr}}@media(max-width:760px){.side{display:none}.main{padding:16px}}

.metric-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.metric{background:#fff;border:1px solid #eef1f4;border-radius:14px;padding:15px}
.metric .label{font-size:10px;color:#7b8798;font-weight:700;text-transform:uppercase;letter-spacing:.4px}
.metric .value{font-size:23px;font-weight:800;margin-top:6px}.metric .sub{font-size:10px;color:#8b95a6;margin-top:4px}
.progress{height:9px;background:#edf1f6;border-radius:9px;overflow:hidden}.progress>span{display:block;height:100%;background:linear-gradient(90deg,#1c73e8,#5aa5ff);border-radius:9px}
.progress.warning>span{background:linear-gradient(90deg,#d39b16,#f1c15c)}.progress.breach>span{background:linear-gradient(90deg,#dc4b4b,#f27a7a)}
.spark{height:74px;display:flex;align-items:flex-end;gap:6px}.spark span{flex:1;border-radius:5px 5px 0 0;background:#dcebff}.spark span.active{background:#2e90ff}
.chip{display:inline-flex;align-items:center;gap:5px;background:#f1f5fa;border:1px solid #e3e8ef;border-radius:8px;padding:5px 8px;font-size:10px;font-weight:700;color:#556276}
.chip.blue{background:#e8f2ff;color:#1d64af}.chip.warn{background:#fff3d2;color:#8f6810}.chip.bad{background:#ffe6e6;color:#a32e2e}
.section-title{font-size:12px;font-weight:800;color:#5d6b80;margin:2px 0 10px}
.hero{background:linear-gradient(135deg,#0f3e7d,#0a5cb0);color:#fff;border-radius:18px;padding:20px;position:relative;overflow:hidden}
.hero:after{content:"";position:absolute;right:-30px;top:-50px;width:260px;height:260px;border:1px solid rgba(255,255,255,.15);border-radius:50%}
.hero h2{margin:0;font-size:18px}.hero p{margin:5px 0;color:#c9dcf7;font-size:11px}
.hero-grid{display:grid;grid-template-columns:1.5fr .8fr .8fr;gap:12px;margin-top:16px}.hero-value{font-size:30px;font-weight:900}.hero-label{font-size:10px;color:#c4d6f1}
.dash-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:15px}.dash-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px}
.pie{width:170px;height:170px;border-radius:50%;margin:auto;background:conic-gradient(#1c73e8 0 53%,#55a7ff 53% 71%,#f2c04d 71% 86%,#e45757 86% 100%);position:relative}
.pie:after{content:"";position:absolute;inset:38px;background:#fff;border-radius:50%}.legend{display:grid;gap:8px;margin-top:12px}.legend div{display:flex;align-items:center;gap:7px;font-size:10px;color:#6f7b8d}.dot{width:9px;height:9px;border-radius:50%;display:inline-block}
.heatmap{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}.heat{border-radius:9px;padding:11px 8px;font-size:10px;font-weight:800;min-height:62px;color:#17304d}.heat.low{background:#e4f6ed}.heat.mid{background:#e4f0ff}.heat.warn{background:#fff1c9}.heat.high{background:#ffe0e0}
.alert-list{display:grid;gap:8px}.alert{display:grid;grid-template-columns:8px 1fr auto;gap:10px;align-items:center;padding:10px;border:1px solid #edf0f5;border-radius:10px}.alert .bar{width:8px;height:38px;border-radius:5px;background:#1d9b68}.alert.warning .bar{background:#d39b16}.alert.breach .bar{background:#dc4b4b}
.detail-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.detail-box{background:#f6f8fb;border:1px solid #e8ecf1;border-radius:12px;padding:12px}.detail-box .small{font-size:10px;color:#7c8797}.detail-box .big{font-size:20px;font-weight:850;margin-top:5px}
.drill-links{display:flex;gap:7px;flex-wrap:wrap}.drill-link{border:1px solid #dfe6ee;background:#fff;color:#1f63ab;padding:7px 9px;border-radius:9px;font-size:10px;font-weight:750}
.euro{font-variant-numeric:tabular-nums}
@media(max-width:1150px){.metric-grid{grid-template-columns:repeat(3,1fr)}.hero-grid,.dash-grid3{grid-template-columns:1fr}.detail-summary{grid-template-columns:repeat(2,1fr)}}

.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.field-block{display:flex;flex-direction:column;gap:6px}.field-wide{grid-column:1/-1}
.field-block label{font-size:10px;font-weight:800;color:#69778d;text-transform:uppercase;letter-spacing:.35px}
.full{width:100%;min-width:0}.textarea{width:100%;min-height:88px;border:1px solid #dce3eb;border-radius:9px;padding:10px 11px;resize:vertical;font:inherit;font-size:12px;color:#2a3550;background:#fff}
.textarea:disabled,.input:disabled{background:#f7f9fb;color:#667388;opacity:1}
.provenance-footer{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px;padding-top:14px;border-top:1px solid var(--line)}
.provenance-footer>div{background:#f6f8fb;border:1px solid #e8ecf1;border-radius:10px;padding:10px}.provenance-footer span{display:block;font-size:9px;color:#8792a3;text-transform:uppercase;font-weight:800}.provenance-footer b{display:block;font-size:11px;margin-top:4px}
.provenance-table .compact{min-width:150px;width:100%;height:34px;font-size:10px}.provenance-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.provenance-box{background:#f6f8fb;border:1px solid #e8ecf1;border-radius:12px;padding:13px;min-height:92px}.provenance-box span{display:block;font-size:9px;color:#7f8ba0;text-transform:uppercase;font-weight:800;letter-spacing:.35px}.provenance-box b{display:block;font-size:12px;margin-top:7px}.provenance-box small{display:block;color:#8a95a5;font-size:10px;margin-top:5px}
.source-note{margin-top:12px;padding:12px 14px;border:1px solid #e8ecf1;border-radius:11px;background:#fbfcfe;font-size:11px;color:#56647a}.source-note div{margin-top:5px;color:#7b8798;line-height:1.5}
@media(max-width:900px){.form-grid{grid-template-columns:1fr}.field-wide{grid-column:auto}.provenance-grid{grid-template-columns:1fr 1fr}.provenance-footer{grid-template-columns:1fr 1fr}}

.field-table-wrap{overflow:auto}
.field-table{min-width:980px}
.field-table th:nth-child(1){width:21%}.field-table th:nth-child(2){width:19%}.field-table th:nth-child(3){width:25%}.field-table th:nth-child(4){width:35%}
.field-table td{vertical-align:middle}
.field-input{width:100%;min-width:190px}
.compact-area{min-width:260px;min-height:58px;padding:8px;font-size:11px;line-height:1.35}
.source-text{font-size:11px;color:#45617f}.note-text{font-size:11px;color:#68778c;line-height:1.45}
.field-help{margin-top:10px;padding:9px 11px;border-radius:9px;background:#f6f8fb;border:1px solid #e8ecf1;color:#7b8798;font-size:10px}

.report-controls{display:grid;grid-template-columns:1.1fr .8fr .8fr auto;gap:12px;align-items:end}
.report-controls>div{display:flex;flex-direction:column;gap:6px}.report-controls label{font-size:10px;font-weight:800;color:#69778d;text-transform:uppercase;letter-spacing:.35px}
.report-actions{display:flex;gap:8px;align-items:end;height:40px}
.report-meta{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}.report-meta span{font-size:10px;background:#f5f7fa;border:1px solid #e8ecf1;border-radius:7px;padding:5px 7px;color:#6b788b}
.report-note{background:#f6f8fb;border:1px solid #e7ecf1;border-radius:10px;padding:10px 12px;font-size:10px;color:#66758a;margin-bottom:13px;line-height:1.45}
.report-table-wrap{max-height:620px;border:1px solid #e7ebf1;border-radius:10px}
.report-table{min-width:1450px}.report-table th{position:sticky;top:0;z-index:1;background:#eef3f8}.report-table td,.report-table th{white-space:nowrap}
.report-footer{margin-top:12px;font-size:10px;color:#78869a;padding:10px 12px;border-top:1px solid var(--line);line-height:1.45}
.report-preview{display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:10px}.report-preview>div{background:#f6f8fb;border:1px solid #e8ecf1;border-radius:12px;padding:13px}.report-preview b{display:block;font-size:11px;color:#34445d}.report-preview span{display:block;margin-top:5px;font-size:10px;color:#7f8ba0;line-height:1.35}
@media(max-width:1100px){.report-controls{grid-template-columns:1fr 1fr}.report-actions{height:auto}.report-preview{grid-template-columns:1fr}.report-kpi{grid-template-columns:repeat(3,1fr)}}
@media(max-width:700px){.report-controls{grid-template-columns:1fr}.report-kpi{grid-template-columns:1fr 1fr}}

/* Dashboard layout fixes */
.metric{color:var(--text);min-width:0}
.metric .value{color:var(--text);line-height:1.1}
.metric .value[style*="yellow"]{color:var(--yellow)!important}
.chart-bars{height:190px;display:flex;align-items:flex-end;justify-content:space-between;gap:18px;padding:12px 18px 0}
.barwrap{height:165px;flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;min-width:48px}
.barwrap .bar{width:42px;max-width:70%;min-height:8px;border-radius:7px 7px 3px 3px;background:linear-gradient(180deg,#5aa5ff,#1c73e8)}
.barwrap small{font-size:10px;color:#6f7b8d;text-align:center;margin-top:7px;line-height:1.3}
.barwrap small b{color:var(--text);font-size:11px}
.page{min-width:0}
.hero-grid>div{min-width:0}
@media(max-width:900px){
  .main{padding:18px 16px 28px}
  .hero-grid{grid-template-columns:1fr!important}
  .hero-value{font-size:26px}
  .metric-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .chart-bars{height:180px;gap:8px;padding-left:4px;padding-right:4px}
  .barwrap .bar{width:30px}
}
@media(max-width:560px){
  .metric-grid{grid-template-columns:1fr}
  .hero{padding:16px}
}

/* Final dashboard rendering hardening */
.shell{width:100%;min-width:0}
.side{flex:0 0 260px}
.main{flex:1 1 auto;width:0;max-width:100%;overflow-x:hidden}
.hero-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
.hero-grid>div{overflow:hidden}
.hero-value{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.metric-grid{grid-template-columns:repeat(5,minmax(0,1fr))}
.chart-list{display:flex;flex-direction:column;gap:16px;padding:4px 0 2px}
.chart-row{width:100%}
.chart-row-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:7px;font-size:12px;color:var(--text)}
.chart-row-head span{font-weight:900}
.chart-track{height:12px;background:#e9eef5;border-radius:999px;overflow:hidden}
.chart-track span{display:block;height:100%;min-width:8px;border-radius:999px;background:linear-gradient(90deg,#1c73e8,#5aa5ff)}
@media(max-width:1100px){
  .metric-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .hero-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:760px){
  .side{display:none}
  .main{width:100%;padding:18px 16px 28px}
  .hero-grid{grid-template-columns:1fr}
  .metric-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .dash-grid{grid-template-columns:1fr}
}
@media(max-width:520px){
  .metric-grid{grid-template-columns:1fr}
}

/* Product Source & Mapping */
.product-tabs{display:flex;gap:4px;overflow-x:auto;overflow-y:hidden;padding-bottom:2px}
.product-tabs .tab{white-space:nowrap}
.product-field-block{margin-top:4px}
.product-field-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:8px 0 10px}
.product-field-toolbar>b,.product-field-toolbar>div>b{font-size:12px;color:var(--text)}
.product-field-toolbar span{display:block;font-size:10px;color:var(--muted);margin-top:3px}
.product-field-wrap,.product-master-wrap{overflow:auto;border:1px solid var(--line);border-radius:12px}
.product-field-table,.product-master-table{min-width:980px}
.product-field-table th,.product-field-table td,.product-master-table th,.product-master-table td{vertical-align:top}
.product-field-table td:first-child{min-width:210px}
.product-field-table td:nth-child(2){min-width:230px;max-width:360px;overflow-wrap:anywhere}
.product-field-table td:nth-child(3){min-width:240px}
.product-field-table td:nth-child(4){min-width:320px}
.product-master-table{min-width:1200px}
.product-master-table td:first-child{min-width:150px}
.product-master-table td:nth-child(2){min-width:180px}
.product-master-table td:nth-child(3){min-width:220px}
.product-master-table td:nth-child(4){min-width:180px}
.product-master-table td:nth-child(5){min-width:190px}
.product-master-table td:nth-child(6){min-width:250px}
.product-master-table td:nth-child(7){min-width:360px}
.credit-line-groups{display:flex;flex-direction:column;gap:18px}
.product-group{padding-top:2px}
.product-mapping-grid{display:grid;grid-template-columns:1.5fr .75fr;gap:15px;margin-top:18px}
.field-input{min-width:220px;width:100%;height:auto;min-height:38px}
.compact-area{min-width:260px;width:100%;min-height:72px}
.source-text,.note-text{display:block;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.45}
.product-master-hint{font-size:11px;color:var(--muted);margin-bottom:12px}
@media(max-width:900px){
  .product-field-toolbar{align-items:flex-start;flex-direction:column}
  .product-mapping-grid{grid-template-columns:1fr}
}

.product-credit-table{min-width:1250px}
.product-credit-table th,.product-credit-table td{vertical-align:top}
.product-credit-table th:nth-child(1){min-width:190px}
.product-credit-table th:nth-child(2),.product-credit-table th:nth-child(3){min-width:190px}
.product-credit-table th:nth-child(4){min-width:250px}
.product-credit-table th:nth-child(5){min-width:360px}
.product-credit-table td:nth-child(2),.product-credit-table td:nth-child(3){white-space:nowrap}
.product-credit-table thead th:nth-child(2){background:#eef5ff;color:#1b5fae}
.product-credit-table thead th:nth-child(3){background:#eef8f4;color:#16714f}

.integration-chip-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.integration-chip{min-height:64px}
`;

const domains={"Country": {"sheet": "COUNTRY_MONITORING", "key": "Country Code", "name": "Negara", "products": ["CASHLOAN", "NON CASH LOAN", "COMMERCIAL LINE (CRDT)", "TREASURY LINE (CRDT)", "BONDS", "NOSTRO"], "sections": {"Identitas": [["No", "1", "Data/master/reference"], ["Negara", "United Arab Emirates", "Data/master/reference"], ["Code", "AE", "Data/master/reference"], ["Status", "Exist", "Data/master/reference"]], "Checklist Product": [["CL", "-", "Data/master/reference"], ["NCL", "-", "Data/master/reference"], ["COM", "-", "Data/master/reference"], ["TRS", "-", "Data/master/reference"], ["BOND", "-", "Data/master/reference"], ["NOS", "v", "Data/master/reference"]], "Exposure Product": [["CL", "-", "Data/master/reference"], ["NCL", "-", "Data/master/reference"], ["COM", "-", "Data/master/reference"], ["TRS", "-", "Data/master/reference"], ["BOND", "-", "Data/master/reference"], ["NOS", "v", "Data/master/reference"], ["TOTAL", "26.64", "Data/master/reference"]], "Limit & Gap": [["Limit FIB / Formulasi", "New", "Data/master/reference"], ["Limit FIB / Diputus", "New", "Data/master/reference"], ["Country Limit / Country Limit", "35,941", "Data/master/reference"], ["Country Limit / %Country Limit", "5.72%", "Data/master/reference"], ["Gap Analysis / Needs", "0", "Data/master/reference"], ["Gap Analysis / Minus", "0", "Data/master/reference"], ["Gap Analysis / Add", "0", "Data/master/reference"], ["Final Limit / Final Limit", "35,941", "Data/master/reference"], ["Final Limit / %Final Limit", "5.72%", "Data/master/reference"]]}}, "CCL": {"sheet": "CCL_MONITORING", "key": "Kode Bank / Swift Code", "name": "Nama bank", "products": ["CASHLOAN", "NON CASH LOAN", "COMMERCIAL LINE (CRDT)", "TREASURY LINE (CRDT)"], "sections": {"Bank Profile": [["Nama bank", "ABN Amro Bank NV", "Data/master/reference"], ["CIF/Swift", "-", "Data/master/reference"], ["Kategori Bank", "Asing", "Data/master/reference"], ["Negara", "Netherlands", "Data/master/reference"], ["Global Parent Bank", "—", "Data/master/reference"], ["Apakah Bank termasuk Top 200 Bank Besar Dunia berdasarkan total aset menurut Banker's Almanac", "—", "Data/master/reference"]], "Risk & Capacity": [["Country Rating", "AAA", "Data/master/reference"], ["Bobot", "0.55", "Data/master/reference"], ["Rating", "AA-", "Data/master/reference"], ["Posisi Rating", "31/12/2023", "Data/master/reference"], ["Rating Index", "90.23%", "Data/master/reference"], ["Limit Inhouse (Rp Miliar)", "68,498", "Data/master/reference"], ["Tier 1 Capital (Rp Miliar)", "403,594", "Data/master/reference"], ["Capacity", "200,290", "Data/master/reference"], ["Capacity Limit Adjusted", "68,498", "Data/master/reference"]], "Limit": [["CCL", "500", "Data/master/reference"], ["Utilisasi Capacity", "0.73%", "Data/master/reference"], ["Limit Contractual", "500", "Data/master/reference"]], "BMRI Exposure": [["Outstanding", "13", "Data/master/reference"], ["Jenis Limit", "Direct", "Data/master/reference"], ["Limit", "500", "Data/master/reference"], ["Total", "500", "Data/master/reference"], ["Bank Loan", "-", "Data/master/reference"], ["Commercial Line", "500", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Utilisasi CCL", "100%", "Data/master/reference"], ["Utilisasi Limit Kontraktual", "100%", "Data/master/reference"], ["Outstanding Maksimum", "13", "Data/master/reference"], ["Utilisasi Maksimum Limit Kontraktual", "2.53%", "Data/master/reference"]], "Perusahaan Anak": [["Limit", "500", "Data/master/reference"], ["Total", "500", "Data/master/reference"], ["Bank Loan", "-", "Data/master/reference"], ["Commercial Line", "500", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Utilisasi CCL", "100%", "Data/master/reference"], ["Utilisasi Limit Kontraktual", "100%", "Data/master/reference"], ["Utilisasi Maksimum Limit Kontraktual", "2.53%", "Data/master/reference"]]}}, "MLK": {"sheet": "MLK_Master", "key": "CIF", "name": "Nama Debitur", "products": ["CASHLOAN", "NON CASH LOAN", "TREASURY LINE (CRDT)"], "sections": {"Profil Debitur": [["Entitas", "BMRI", "Data/master/reference"], ["CIF", "4000264485", "Data/master/reference"], ["Nama Debitur", "DJARUM", "Data/master/reference"], ["Group Usaha", "DJARUM GROUP", "Data/master/reference"], ["Unit Kerja Pengelola", "CB6", "Data/master/reference"], ["Group", "DJARUM GROUP", "Data/master/reference"], ["BUMN/Swasta Flag", "Swasta", "Data/master/reference"], ["Tier", "B", "Data/master/reference"]], "Risk & Regulatory": [["BMPK Konsol", "67,204", "Data/master/reference"], ["Inhouse Limit Konsol", "60,484", "Data/master/reference"], ["BMPK/BMPP/BMPD Entitas", "55,993", "Data/master/reference"], ["Inhouse Limit Entitas", "50,394", "Data/master/reference"], ["Sektor DC", "INDUSTRI ROKOK", "Data/master/reference"], ["DC Sectoral", "3", "Data/master/reference"], ["Rating", "A+", "Data/master/reference"], ["Rating Multiplier", "2.67", "Data/master/reference"], ["Watchlist", "HIJAU", "Data/master/reference"], ["Discount Factor", "1", "Data/master/reference"]], "Financial & Capacity": [["EBITDA/Pengganti EBITDA", "1,938", "Data/master/reference"], ["Kredit Bank Lain", "12,010", "Data/master/reference"], ["Total Debt", "-", "Data/master/reference"], ["Borrowing Capacity", "15,523.38", "Data/master/reference"], ["Available BC", "(2,183.62)", "Data/master/reference"], ["Status Perhitungan", "-", "Data/master/reference"]], "Product Limit & Exposure": [["CL Bade", "500", "Data/master/reference"], ["CL Limit", "587", "Data/master/reference"], ["NCL Bade", "-", "Data/master/reference"], ["NCL Limit", "121", "Data/master/reference"], ["Treasury Line", "-", "Data/master/reference"], ["Bade Treasury Line", "-", "Data/master/reference"], ["Total Limit Existing", "-", "Data/master/reference"], ["Total Bade Existing", "-", "Data/master/reference"]], "Master Limit": [["Master Limit Setting", "5,110", "Data/master/reference"], ["Master Limit", "5,818", "Data/master/reference"]]}}, "CIL": {"sheet": "CIL_Master", "key": "Insurance Company ID / Entity", "name": "Perusahaan Asuransi", "products": ["Nominal Pertanggungan"], "sections": {"Insurance Profile": [["No", "1", "Data/master/reference"], ["Perusahaan Asuransi", "PT Asuransi Tugu Pratama Indonesia Tbk", "Data/master/reference"], ["Jenis Perusahaan (Asuransi/Penjaminan)", "Asuransi", "Data/master/reference"], ["Jenis Produk Asuransi", "Asuransi Kredit", "Data/master/reference"]], "Capacity & Threshold": [["Insurance Capacity (IC) (Rp Juta)", "3,605,020,000", "Data/master/reference"], ["Multiplier Terpakai (%)", "3.00%", "Data/master/reference"], ["Consolidated Insurance Threshold (CIT) (Rp Juta)", "108,150,600", "Parameter monitoring"]], "BMRI": [["Nominal Pertanggungan BMRI 2025", "11,573,402.55", "Data/master/reference"], ["EIL BMRI", "60,093,270.28", "Data/master/reference"]], "Mandiri Taspen": [["Nominal Pertanggungan Mandiri Taspen 2025", "BUKAN REKANAN", "Data/master/reference"], ["EIL Mandiri Taspen", "26,999,429.42", "Data/master/reference"]], "MTF": [["Nominal Pertanggungan MTF 2025", "285,708.13", "Data/master/reference"], ["EIL MTF", "10,591,613.12", "Data/master/reference"]], "MUF": [["Nominal Pertanggungan MUF 2025", "21,313", "Data/master/reference"], ["EIL MUF", "10,129,963.92", "Data/master/reference"]], "Consolidated": [["Consolidated Insurance Limit (CIL) (Rp Juta)", "107,814,276.74", "Data/master/reference"], ["Total Nominal Pertanggungan All Entitas 2025 (Rp Juta)", "11,880,423.68", "Data/master/reference"], ["Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)", "13,060,790.52", "Data/master/reference"], ["Skor Akreditasi (PCP)", "79.38", "Data/master/reference"], ["Klasifikasi EWS (PCP)", "Monitoring", "Data/master/reference"]]}}, "LPG": {"sheet": "LPG_Loanportfolio", "key": "Sector + Segment + Region", "name": "Ecosystem LPG", "products": ["CASHLOAN", "NON CASH LOAN"], "sections": {"Identitas": [["No", "1", "Data/master/reference"], ["Ecosystem LPG (Sektor)", "BATUBARA", "Data/master/reference"], ["Segmen LPG", "Corporate", "Data/master/reference"]], "Bankwide": [["Bankwide / Limit", "65,140", "Data/master/reference"], ["Bankwide / Outstanding", "37,919", "Data/master/reference"], ["Bankwide / %Utilisasi", "58.20%", "Data/master/reference"]], "Region Monitoring": [["Region I / Limit", "—", "Data/master/reference"], ["Region I / Outstanding", "—", "Data/master/reference"], ["Region I / %Utilisasi", "—", "Data/master/reference"], ["Region II / Limit", "—", "Data/master/reference"], ["Region II / Outstanding", "—", "Data/master/reference"], ["Region II / %Utilisasi", "—", "Data/master/reference"], ["Region III / Limit", "—", "Data/master/reference"], ["Region III / Outstanding", "—", "Data/master/reference"], ["Region III / %Utilisasi", "—", "Data/master/reference"], ["Region IV / Limit", "—", "Data/master/reference"], ["Region IV / Outstanding", "—", "Data/master/reference"], ["Region IV / %Utilisasi", "—", "Data/master/reference"], ["Region V / Limit", "—", "Data/master/reference"], ["Region V / Outstanding", "—", "Data/master/reference"], ["Region V / %Utilisasi", "—", "Data/master/reference"], ["Region VI / Limit", "—", "Data/master/reference"], ["Region VI / Outstanding", "—", "Data/master/reference"], ["Region VI / %Utilisasi", "—", "Data/master/reference"], ["Region VII / Limit", "—", "Data/master/reference"], ["Region VII / Outstanding", "—", "Data/master/reference"], ["Region VII / %Utilisasi", "—", "Data/master/reference"], ["Region VIII / Limit", "—", "Data/master/reference"], ["Region VIII / Outstanding", "—", "Data/master/reference"], ["Region VIII / %Utilisasi", "—", "Data/master/reference"], ["Region IX / Limit", "—", "Data/master/reference"], ["Region IX / Outstanding", "—", "Data/master/reference"], ["Region IX / %Utilisasi", "—", "Data/master/reference"], ["Region X / Limit", "—", "Data/master/reference"], ["Region X / Outstanding", "—", "Data/master/reference"], ["Region X / %Utilisasi", "—", "Data/master/reference"], ["Region XI / Limit", "—", "Data/master/reference"], ["Region XI / Outstanding", "—", "Data/master/reference"], ["Region XI / %Utilisasi", "—", "Data/master/reference"], ["Region XII / Limit", "—", "Data/master/reference"], ["Region XII / Outstanding", "—", "Data/master/reference"], ["Region XII / %Utilisasi", "—", "Data/master/reference"]], "Validation": [["Status Crosscheck", "—", "Data/master/reference"], ["Data Quality", "—", "Data/master/reference"]]}}};
const productFields={"CASHLOAN": ["no_cus", "nm_cus", "kd_cab", "nm_cab", "no_rek", "gas_reporting", "buc_reporting", "jns_krd", "src", "j_guna", "revolv", "bilokj", "total_limit", "total_bade", "project_location", "code", "MatDate/Jatem", "MatDate/Jatem"], "NON CASH LOAN": ["NO", "MODULE", "Swift Code", "REPORTTYPE", "TRXREF", "RELREF", "CUSTID", "CUSTNM", "CPNM", "CPCNTY", "CPBK", "BKCNTRY", "Country Code", "Country Name", "Type of Judgment", "TRXTYPE", "CCY", "AMOUNT", "BALANCE", "EXCHANGERT", "EQVIDR", "FINTYPE", "TRXDATE", "DUEDATE", "SERVCODE", "SERVNM", "PCCD", "PCNM", "BUCD", "SOF", "INTRT"], "COMMERCIAL LINE (CRDT)": ["No", "Nama", "Swift Code", "Swift Code Vlookup", "Code", "Aging Schedule RM", "Negara", "Bank", "RM", "Dept.", "BMFIR", "Fitch", "Moody's", "S&P", "Treasury DN", "Treasury DN Utilisasi", "Treasury LN", "Treasury LN Utilisasi", "Treasury Line Total", "Treasury Line Total Utilisasi", "Comm DN", "Comm DN Utilisasi", "Comm LN", "Comm LN Utilisasi", "Comm Line Total", "Comm Line Total Utilisasi", "Corporate Card", "Credit Line Total", "Credit Line Total Utilisasi"], "Investment Line": ["No", "Nama Bank", "Nama Entity (Scope Entity : AKK)", "Switftcode", "Jenis Invesment Line", "Amount Invesment Line", "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa"], "BONDS": ["Date", "Branch", "Securities Type", "Securities Name", "Issuer Name", "Issuer Country", "Issuer Type", "Portfolio", "CCY", "Amount", "Amount Eq. IDR Juta", "Maturity Date", "Coupon", "Potential P/L (Eq. IDR Juta)"], "NOSTRO": ["Year", "Branch", "SwfitCode", "Bank Name", "Bank Country", "Balance"], "TREASURY LINE (CRDT)": ["No", "Nama", "Swift Code", "Swift Code Vlookup", "Code", "Aging Schedule RM", "Negara", "Bank", "RM", "Dept.", "BMFIR", "Fitch", "Moody's", "S&P", "TDN", "TDN Utilisasi", "TLN", "TLN Utilisasi", "Treasury Line", "Total Utilisasi", "CDN", "CDN Utilisasi", "CLN", "CLN Utilisasi", "Comm Line", "Comm Line Utilisasi", "Corporate Card", "Credit Line", "Credit Line Utilisasi", "Maturity"]};
const productSample={"Nominal Pertanggungan":{"No":"1","Perusahaan Asuransi":"PT Asuransi Tugu Pratama Indonesia Tbk","Jenis Prudk Asuransi":"Asuransi Kredit","Entitas":"BMRI","EIL Entitas (Rp Juta)":"60093270.28","Nominal Pertanggungan 2025 (Rp Juta)":"11573402.55","Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)":"13060790.52","Utilisasi EIL (%)":"21.73%","CIL (Rp Juta)":"107814276.74","CIT (Rp Juta)":"108150600","Utilisasi CIL (%)":"99.69%","% Utilisasi (Nominal Pertanggungan/CIL)":"10.74%","% Utilisasi Proyeksi (Nominal Pertanggungan/CIL)":"12.12%","Skor Akreditasi (PCP)":"79.38","Klasifikasi EWS (PCP)":"Monitoring","Status / Rekomendasi Action Plan":"Monitoring as usual / no specific action"},"CASHLOAN": {"no_cus": "16000000010", "nm_cus": "PURE SOURCE DAIRY FARM CO., LTD", "kd_cab": "60900", "nm_cab": "PT BANK MANDIRI SHANGHAI (CNY)", "no_rek": "6090100009393", "gas_reporting": "WHOLESALE CIB", "buc_reporting": "CB105", "jns_krd": "I-SYN-CNY", "src": "KLN", "j_guna": "KREDIT INVESTASI", "revolv": "N", "bilokj": "9999", "total_limit": "273.52", "total_bade": "273.52", "project_location": "China", "code": "CN", "MatDate/Jatem": ""}, "NON CASH LOAN": {"NO": "1", "MODULE": "EXCO", "Swift Code": "ANZB AU 3M", "REPORTTYPE": "Export Collection Financing", "TRXREF": "XC77126002607", "RELREF": "", "CUSTID": "16000005630", "CUSTNM": "PT. PABRIK KERTAS TJIWI KIMIA TBK", "CPNM": "KENSINGTON INTERNATIONAL LIMITED", "CPCNTY": "", "CPBK": "", "BKCNTRY": "", "Country Code": "HK", "Country Name": "Hong Kong", "Type of Judgment": "CPNM", "TRXTYPE": "D/A", "CCY": "USD", "AMOUNT": "14978.87", "BALANCE": "14978.87", "EXCHANGERT": "17310", "EQVIDR": "259284240", "FINTYPE": "DISCOUNT/REDISCOUNT", "TRXDATE": "07/04/2026", "DUEDATE": "02/10/2026", "SERVCODE": "77106", "SERVNM": "Trade Operation Export", "PCCD": "77106", "PCNM": "Trade Operation Export", "BUCD": "", "SOF": "T", "INTRT": "6.97"}, "COMMERCIAL LINE (CRDT)": {"No": "1", "Nama": "Australia and New Zealand Banking Group Limited", "Swift Code": "ANZB AU 3M", "Swift Code Vlookup": "ANZBAU3M", "Code": "AU", "Aging Schedule RM": "Raden Rizky Herfianda", "Negara": "Australia", "Bank": "Foreign", "RM": "2", "Dept.": "IFI", "BMFIR": "AA", "Fitch": "AA-", "Moody's": "Aa2", "S&P": "AA-", "Treasury DN": "50000", "Treasury DN Utilisasi": "1469.93", "Treasury LN": "140000", "Treasury LN Utilisasi": "0", "Treasury Line Total": "190000", "Treasury Line Total Utilisasi": "1469.93", "Comm DN": "775000", "Comm DN Utilisasi": "6618.77", "Comm LN": "35000", "Comm LN Utilisasi": "0", "Comm Line Total": "810000", "Comm Line Total Utilisasi": "6618.77", "Corporate Card": "0", "Credit Line Total": "1000000", "Credit Line Total Utilisasi": "8088.69"}, "Investment Line": {"No": "1", "Nama Bank": "ANZ", "Nama Entity (Scope Entity : AKK)": "DPBM", "Switftcode": "ANZxx", "Jenis Invesment Line": "Deposito", "Amount Invesment Line": "10000000000", "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa": ""}, "BONDS": {"Date": "30-Apr-26", "Branch": "Head Office", "Securities Type": "Fixed Rate", "Securities Name": "FR0037", "Issuer Name": "Indo Gov", "Issuer Country": "ID", "Issuer Type": "Government", "Portfolio": "Banking Book", "CCY": "IDR", "Amount": "585424000000", "Amount Eq. IDR Juta": "585424", "Maturity Date": "15-Sep-26", "Coupon": "12%", "Potential P/L (Eq. IDR Juta)": "0"}, "NOSTRO": {"Year": "Apr-26", "Branch": "Head Office", "SwfitCode": "XXXXAEJX", "Bank Name": "FIRST ABU DABI BANK", "Bank Country": "AE", "Balance": "26.64"}};
const integrationTargets={
  Country:{"CASHLOAN":"Country Code / Project Location","NON CASH LOAN":"Country Code","CREDIT LINE":"Country Code / Bank Country","BONDS":"Issuer Country","NOSTRO":"Bank Country"},
  CCL:{"CASHLOAN":"Bank / Counterparty mapping","NON CASH LOAN":"Swift Code / Counterparty","CREDIT LINE":"Swift Code","Investment Line":"Swift Code / Entity"},
  MLK:{"CASHLOAN":"CIF","NON CASH LOAN":"CUSTID / CIF","CREDIT LINE":"CIF / Debtor mapping (Treasury scope)"},
  CIL:{"Nominal Pertanggungan":"Insurance Company + Entity"},
  LPG:{"CASHLOAN":"CIF → Sector / Segment / Region","NON CASH LOAN":"CUSTID/CIF → Sector / Segment / Region"}
};


/*
 * LIMAS DATA ARCHITECTURE
 * 1) Master Limit = approved/active limit master only.
 * 2) Product Universe = source/integration registry only.
 * 3) Product Utilization = runtime/read-model data integrated from source systems.
 * 4) Monitoring = Master Limit + Product Utilization.
 */
function getMasterSections(type){
  const s=domains[type]?.sections||{};
  if(type==="Country") return {"Identitas":s["Identitas"]||[],"Limit & Gap":s["Limit & Gap"]||[]};
  if(type==="CCL") return {"Bank Profile":s["Bank Profile"]||[],"Risk & Capacity":s["Risk & Capacity"]||[],"Limit":(s["Limit"]||[]).filter(([f])=>f!=="Utilisasi Capacity")};
  if(type==="MLK") return {"Profil Debitur":s["Profil Debitur"]||[],"Risk & Regulatory":s["Risk & Regulatory"]||[],"Master Limit":s["Master Limit"]||[]};
  if(type==="CIL") return {
    "Insurance Profile":s["Insurance Profile"]||[],
    "Capacity & Threshold":s["Capacity & Threshold"]||[],
    "Entity Limit (EIL)":[
      ...(s["BMRI"]||[]).filter(([f])=>String(f).startsWith("EIL ")),
      ...(s["Mandiri Taspen"]||[]).filter(([f])=>String(f).startsWith("EIL ")),
      ...(s["MTF"]||[]).filter(([f])=>String(f).startsWith("EIL ")),
      ...(s["MUF"]||[]).filter(([f])=>String(f).startsWith("EIL "))
    ],
    "Consolidated Limit":(s["Consolidated"]||[]).filter(([f])=>String(f).startsWith("Consolidated Insurance Limit"))
  };
  if(type==="LPG") return {
    "Identitas":s["Identitas"]||[],
    "Bankwide Limit":(s["Bankwide"]||[]).filter(([f])=>String(f).toLowerCase().endsWith(" / limit")),
    "Regional Limit":(s["Region Monitoring"]||[]).filter(([f])=>String(f).toLowerCase().endsWith(" / limit"))
  };
  return s;
}

const domainDataContract={
  Country:{
    masterKey:"Country Code",
    masterObject:"Country",
    linkedProducts:["CASHLOAN","NON CASH LOAN","CREDIT LINE","BONDS","NOSTRO"],
    utilizationGrain:"Country Code + Periode",
    masterDescription:"Identitas country + approved Country Limit + adjustment/final limit."
  },
  CCL:{
    masterKey:"Kode Bank / Swift Code",
    masterObject:"Counterparty Bank",
    linkedProducts:["CASHLOAN","NON CASH LOAN","CREDIT LINE"],
    utilizationGrain:"Bank / Swift Code + Periode",
    masterDescription:"Counterparty profile + risk/capacity basis + approved CCL / contractual limit."
  },
  MLK:{
    masterKey:"CIF",
    masterObject:"Debtor / Group Usaha",
    linkedProducts:["CASHLOAN","NON CASH LOAN","CREDIT LINE"],
    utilizationGrain:"CIF / Group Usaha + Periode",
    masterDescription:"Debtor profile + risk/capacity basis + approved Master Limit."
  },
  CIL:{
    masterKey:"Insurance Company ID / Entity",
    masterObject:"Insurance Company + Entity",
    linkedProducts:["Nominal Pertanggungan"],
    utilizationGrain:"Insurance Company + Entity + Periode",
    masterDescription:"Insurance capacity + CIT + EIL + consolidated CIL."
  },
  LPG:{
    masterKey:"Sector + Segment + Region",
    masterObject:"Portfolio Guideline",
    linkedProducts:["CASHLOAN","NON CASH LOAN"],
    utilizationGrain:"Sector + Segment + Region + Periode",
    masterDescription:"Approved Bankwide / Regional / KP+OVS guideline limit."
  }
};

const domainIntegrationProducts=Object.fromEntries(Object.entries(domainDataContract).map(([domain,cfg])=>[domain,cfg.linkedProducts]));
function integrationLabel(id){
  if(id==="CREDIT LINE") return "Credit Line (Commercial + Treasury)";
  const item=(typeof productMasterCatalog!=="undefined" ? productMasterCatalog.find(p=>p.id===id) : null);
  return item?.label||id;
}
const provenanceDefaults={
  Country:{description:"Master limit negara untuk monitoring exposure lintas produk.",source:"CPR / Risk Management",dataset:"COUNTRY_MONITORING",system:"LIMAS Working Data",period:"Agustus 2026",owner:"CPR Risk Management",sourceNote:"Approved country limit dan data exposure hasil konsolidasi source product."},
  CCL:{description:"Master CCL dan contractual limit untuk monitoring counterparty serta exposure BMRI/PA.",source:"FIB Group + SISM Group",dataset:"CCL_MONITORING",system:"LIMAS Working Data",period:"Agustus 2026",owner:"FIB / SISM",sourceNote:"BMRI data berasal dari FIB Group; data PA dikompilasi SISM sebelum monitoring."},
  MLK:{description:"Master Limit Kredit untuk monitoring CIF dan Group Usaha.",source:"CRA / SISM Group",dataset:"MLK_Master",system:"LIMAS Working Data",period:"Agustus 2026",owner:"CRA / SISM",sourceNote:"Approved Master Limit menjadi reference monitoring; capacity/borrowing capacity tetap berasal dari proses perhitungan di luar LIMAS."},
  CIL:{description:"Master CIL/EIL/CIT untuk monitoring kapasitas dan nominal pertanggungan asuransi.",source:"Risk Management / SISM",dataset:"CIL_Master",system:"LIMAS Working Data",period:"Agustus 2026",owner:"Risk Management / SISM",sourceNote:"Insurance capacity, EIL, CIT dan exposure disimpan sebagai reference/provenance untuk monitoring."},
  LPG:{description:"Master LPG untuk monitoring konsentrasi sektor, segmen dan region.",source:"Risk Management / Business Unit",dataset:"LPG_Loanportfolio",system:"LIMAS Working Data",period:"Agustus 2026",owner:"Risk Management",sourceNote:"Approved LPG limit menjadi master reference; exposure CL/NCL diagregasi melalui mapping sektor, segmen dan region."}
};
function loadMasterMeta(type){
  const key=`limas_master_meta_v1_${type}`;
  try{const saved=window.localStorage.getItem(key);if(saved)return JSON.parse(saved);}catch(e){}
  const d=provenanceDefaults[type]||{};
  return {description:d.description||"",source:d.source||"",dataset:d.dataset||"",system:d.system||"",period:d.period||"",owner:d.owner||"",sourceNote:d.sourceNote||"",status:"Active",effectiveDate:d.period||"",version:1,updatedBy:"Risk Management",lastUpdated:"Belum pernah disimpan"};
}
function saveMasterMeta(type,meta){try{window.localStorage.setItem(`limas_master_meta_v1_${type}`,JSON.stringify(meta));}catch(e){}}
function recordMetaKey(type,recordKey){return `limas_master_record_v1_${type}||${recordKey}`;}
function loadRecordMeta(type,recordKey){
  const fallback={version:1,status:"Active",effectiveDate:provenanceDefaults[type]?.period||"",expiryDate:"",approvedBy:"Risk Management",lastUpdated:"Belum pernah disimpan"};
  if(!recordKey)return fallback;
  try{const saved=window.localStorage.getItem(recordMetaKey(type,recordKey));if(saved)return {...fallback,...JSON.parse(saved)};}catch(e){}
  return fallback;
}
function saveRecordMeta(type,recordKey,meta){if(!recordKey)return;try{window.localStorage.setItem(recordMetaKey(type,recordKey),JSON.stringify(meta));}catch(e){}}

function defaultProductProvenance(type){
  const info=domains[type];
  return Object.fromEntries((domainIntegrationProducts[type]||[]).map(product=>[product,{product,dataset:sourceName(product),sourceKey:sourceKey(product),exposureField:sourceExposure(product),owner:provenanceDefaults[type]?.owner||"Risk Management"}]));
}
function loadProductMeta(type){
  const key=`limas_product_meta_v1_${type}`;
  try{const saved=window.localStorage.getItem(key);if(saved){const parsed=JSON.parse(saved);return Object.fromEntries((domainIntegrationProducts[type]||[]).map(product=>[product,{product,...(parsed[product]||{})}]));}}catch(e){}
  return defaultProductProvenance(type);
}
function saveProductMeta(type,meta){try{window.localStorage.setItem(`limas_product_meta_v1_${type}`,JSON.stringify(meta));}catch(e){}}
function nowLabel(){return new Intl.DateTimeFormat('id-ID',{dateStyle:'medium',timeStyle:'short'}).format(new Date());}

const limasDemoData={
  Country:[
    {key:"AE",name:"United Arab Emirates",statusMaster:"Exist",masterLimit:35941.00087486457,formulasi:"New",diputus:"New",products:{NOSTRO:26.64},dataQuality:"Normal"},
    {key:"AU",name:"Australia",statusMaster:"Exist",masterLimit:41718.775509510284,formulasi:510,diputus:565990,products:{"CREDIT LINE|Commercial":19739.15,"CREDIT LINE|Treasury":1469.93,NOSTRO:608.7},dataQuality:"Normal"},
    {key:"AT",name:"Austria",statusMaster:"Exist",masterLimit:35259.186470317814,formulasi:300,diputus:509391,products:{},dataQuality:"Normal"},
    {key:"BE",name:"Belgium",statusMaster:"Exist",masterLimit:43116.7740055139,formulasi:250,diputus:396193,products:{},dataQuality:"Normal"},
    {key:"CN",name:"China",statusMaster:"Exist",masterLimit:260032.3771028455,formulasi:"New",diputus:"New",products:{CASHLOAN:279.85},dataQuality:"Normal"}
  ],
  CCL:[
    {key:"ANZBAU3M",name:"ABN Amro Bank NV",category:"Asing",country:"Netherlands",countryRating:"AAA",bobot:0.55,rating:"AA-",position:"31/12/2023",ratingIndex:0.9023,inhouse:68498,tier1:403594,capacity:200289.57641,adjusted:68498,globalParent:"—",top200:"—",ccl:500,contractual:500.026,products:{"CREDIT LINE|Commercial":13},dataQuality:"Normal"},
    {key:"ADCB",name:"Abu Dhabi Commercial Bank PJSC",category:"Asing",country:"UAE",countryRating:"AA",bobot:0.55,rating:"AA",position:"31/12/2023",ratingIndex:0.9265,inhouse:68498,tier1:269633,capacity:137398.235975,adjusted:68498,globalParent:"—",top200:"—",ccl:49,contractual:25.04,products:{"CREDIT LINE|Commercial":1},dataQuality:"Normal"},
    {key:"ADIB",name:"Abu Dhabi Islamic",category:"Asing",country:"UAE",countryRating:"AA",bobot:0.55,rating:"BBB",position:"31/12/2022",ratingIndex:0.7882,inhouse:68498,tier1:105885,capacity:45902.20635,adjusted:45902.20635,globalParent:"—",top200:"—",ccl:0,contractual:0,products:{},dataQuality:"Normal"},
    {key:"AGRICN",name:"Agricultural Bank of China Limited",category:"Asing",country:"China",countryRating:"A+",bobot:0.55,rating:"AA",position:"31/12/2023",ratingIndex:0.9265,inhouse:68498,tier1:6853801,capacity:3492525.644575,adjusted:68498,globalParent:"—",top200:"—",ccl:2000,contractual:1700.1335294117648,products:{"CREDIT LINE|Commercial":109},dataQuality:"Normal"},
    {key:"AGRICD",name:"Agricultural Development Bank of China",category:"Asing",country:"China",countryRating:"A+",bobot:0.55,rating:"AA",position:"31/12/2023",ratingIndex:0.9265,inhouse:68498,tier1:6812368,capacity:3471412.4236,adjusted:68498,globalParent:"—",top200:"—",ccl:200,contractual:200,products:{},dataQuality:"Normal"}
  ],
  MLK:[
    {key:"4000264485",name:"DJARUM",group:"DJARUM GROUP",entity:"BMRI",tier:"B",masterLimit:5818,products:{CASHLOAN:500,"NON CASH LOAN":0,"TREASURY LINE":1938},dataQuality:"Normal"},
    {key:"1000145694",name:"ANEKA TAMBANG",group:"ANTAM GROUP",entity:"BMRI",tier:"A",masterLimit:13280,products:{CASHLOAN:0,"NON CASH LOAN":215.81,"TREASURY LINE":4248},dataQuality:"Normal"},
    {key:"ANTAM-NA",name:"ANTAM RESOURCINDO",group:"ANTAM GROUP",entity:"BMRI",tier:"A",masterLimit:20,products:{"TREASURY LINE":8},dataQuality:"Missing CIF"},
    {key:"16000486963",name:"TUNAS MOBILINDO PERKASA",group:"ASTRA GROUP",entity:"BMRI",tier:"A",masterLimit:314,products:{CASHLOAN:10.93,"TREASURY LINE":59},dataQuality:"Normal"},
    {key:"20000474637",name:"TUNAS RIDEAN",group:"ASTRA GROUP",entity:"BMRI",tier:"A",masterLimit:1035,products:{CASHLOAN:134.73,"NON CASH LOAN":15.57,"TREASURY LINE":262},dataQuality:"Normal"}
  ],
  CIL:[
    {key:"TUGU",name:"PT Asuransi Tugu Pratama Indonesia Tbk",type:"Asuransi",ic:3605020000,multiplier:0.03,cit:108150600,cil:107814276.74,projection:13060790.51975,score:79.38,entities:{BMRI:{nominal:11573402.55,eil:60093270.28},"Mandiri Taspen":{nominal:0,eil:26999429.42},MTF:{nominal:285708.13,eil:10591613.12},MUF:{nominal:21313,eil:10129963.92}},dataQuality:"Normal",action:"Monitoring as usual / no specific action"},
    {key:"PLN-INS",name:"PT Asuransi Perisai Listrik Nasional",type:"Asuransi",ic:799280000,multiplier:0.015,cit:11989200,cil:11950003.75,projection:24653453.73,score:57.75,entities:{BMRI:{nominal:1463320.54,eil:6660665.24},"Mandiri Taspen":{nominal:21417716.08,eil:2992584.03},MTF:{nominal:0,eil:1173961.56},MUF:{nominal:18378,eil:1122792.92}},dataQuality:"Normal",action:"Switching Limit"},
    {key:"ASKRIDA",name:"PT Asuransi Bangun Askrida",type:"Asuransi",ic:1544045714.2857144,multiplier:0.015,cit:23160685.714285716,cil:23080742.88,projection:21477669.153,score:34.25,entities:{BMRI:{nominal:2618582.14,eil:12864690.67},"Mandiri Taspen":{nominal:17299747.72,eil:5780003.42},MTF:{nominal:0,eil:2267439.03},MUF:{nominal:0,eil:2168609.76}},dataQuality:"Normal",action:"Monitoring as usual / no specific action"},
    {key:"AKRINDO",name:"PT Asuransi Kredit Indonesia",type:"Asuransi",ic:3086548421.052632,multiplier:0.03,cit:92596452.63157895,cil:92620921.35,projection:6409118.3525,score:60.63,entities:{BMRI:{nominal:1058528.01,eil:51624833.26},"Mandiri Taspen":{nominal:4878825.62,eil:23194627.88},MTF:{nominal:0,eil:9099026.54},MUF:{nominal:0,eil:8702433.67}},dataQuality:"Normal",action:"Monitoring as usual / no specific action"}
  ],
  LPG:[
    {key:"BATUBARA|Corporate|Bankwide",sector:"BATUBARA",segment:"Corporate",region:"Bankwide",limit:65140,outstanding:37919,products:{CASHLOAN:30000,"NON CASH LOAN":7919},dataQuality:"Demo split: source total reconciled"},
    {key:"BATUBARA|Commercial|Bankwide",sector:"BATUBARA",segment:"Commercial",region:"Bankwide",limit:35949,outstanding:26856,products:{CASHLOAN:21000,"NON CASH LOAN":5856},dataQuality:"Demo split: source total reconciled"},
    {key:"ENERGI & AIR|Corporate|Bankwide",sector:"ENERGI & AIR",segment:"Corporate",region:"Bankwide",limit:123949,outstanding:71744,products:{CASHLOAN:57000,"NON CASH LOAN":14744},dataQuality:"Demo split: source total reconciled"},
    {key:"ENERGI & AIR|Commercial|Bankwide",sector:"ENERGI & AIR",segment:"Commercial",region:"Bankwide",limit:33854,outstanding:18415,products:{CASHLOAN:14500,"NON CASH LOAN":3915},dataQuality:"Demo split: source total reconciled"},
    {key:"FARMASI & KESEHATAN|Corporate|Bankwide",sector:"FARMASI & KESEHATAN",segment:"Corporate",region:"Bankwide",limit:24600,outstanding:12000,products:{CASHLOAN:10000,"NON CASH LOAN":2000},dataQuality:"Demo split: source total reconciled"}
  ]
};
function demoProductLabel(p){
  if(p==="CASHLOAN")return "Cash Loan";
  if(p==="NON CASH LOAN")return "Non Cash Loan";
  if(p==="CREDIT LINE|Commercial")return "Credit Line • Commercial Line";
  if(p==="CREDIT LINE|Treasury")return "Credit Line • Treasury Line";
  if(p==="TREASURY LINE")return "Credit Line • Treasury Line";
  if(p==="NOSTRO")return "Nostro";
  if(p==="Nominal Pertanggungan")return "Nominal Pertanggungan";
  return p;
}
function productTotal(products){return Object.values(products||{}).reduce((a,v)=>a+(Number(v)||0),0)}
function recordExposure(type,row){
  if(type==="CIL")return Object.values(row.entities||{}).reduce((a,e)=>a+(Number(e.nominal)||0),0);
  if(type==="LPG")return Number(row.outstanding)||0;
  return productTotal(row.products);
}
function recordLimit(type,row){
  if(type==="Country")return Number(row.masterLimit)||0;
  if(type==="CCL")return Number(row.ccl)||0;
  if(type==="MLK")return Number(row.masterLimit)||0;
  if(type==="CIL")return Number(row.cil)||0;
  return Number(row.limit)||0;
}
function recordUtil(type,row){const limit=recordLimit(type,row),exp=recordExposure(type,row);return limit?exp/limit:0}
function recordStatus(type,row){
  if(String(row.dataQuality||"Normal").startsWith("Missing"))return "Data Issue";
  const u=recordUtil(type,row);
  return u>=1?"Breach":u>=0.8?"Warning":"Normal";
}
function buildReportDummy(data){
  return {
    Country:data.Country.map((r,i)=>{const p=r.products||{},exp=recordExposure("Country",r),totalLimits=(limasDemoData.Country||[]).reduce((a,x)=>a+(Number(x.masterLimit)||0),0),u=recordUtil("Country",r),share=totalLimits?r.masterLimit/totalLimits:0;return {no:i+1,country:r.name,code:r.key,statusMaster:r.statusMaster,cl:p.CASHLOAN?"v":"-",ncl:p["NON CASH LOAN"]?"v":"-",com:p["CREDIT LINE|Commercial"]?"v":"-",trs:p["CREDIT LINE|Treasury"]?"v":"-",bond:p.BONDS?"v":"-",nos:p.NOSTRO?"v":"-",expCl:p.CASHLOAN||0,expNcl:p["NON CASH LOAN"]||0,expCom:p["CREDIT LINE|Commercial"]||0,expTrs:p["CREDIT LINE|Treasury"]||0,expBond:p.BONDS||0,expNos:p.NOSTRO||0,total:exp,formulasi:r.formulasi,diputus:r.diputus,limit:r.masterLimit,pct:share,needs:0,minus:0,add:0,final:r.masterLimit,finalPct:share,status:recordStatus("Country",r)}}),
    CCL:data.CCL.map((r,i)=>{const p=r.products||{},exp=recordExposure("CCL",r),u=recordUtil("CCL",r);return {no:i+1,bank:r.name,category:"Asing",country:r.country,countryRating:"Source reference",bobot:"—",rating:"—",position:"—",ratingIndex:"—",inhouse:r.ccl,tier1:"—",capacity:"—",adjusted:r.ccl,globalParent:"—",top200:"—",ccl:r.ccl,cclCapacity:"—",limit:r.contractual,outstanding:exp,jenis:"Direct",bmriTotal:r.ccl,bmriLoan:0,bmriCom:p["CREDIT LINE|Commercial"]||0,bmriTrs:p["CREDIT LINE|Treasury"]||0,bmriUtil:1,contractualUtil:r.contractual?exp/r.contractual:0,maxOutstanding:exp,maxContractualUtil:r.contractual?exp/r.contractual:0,paTotal:0,paLoan:0,paCom:0,paTrs:0,paUtil:0,paContractualUtil:0,paMaxOutstanding:0,paMaxContractualUtil:0,status:recordStatus("CCL",r)}}),
    MLK:data.MLK.map((r,i)=>{const p=r.products||{},exp=recordExposure("MLK",r),u=recordUtil("MLK",r);return {no:i+1,tier:r.tier,holding:r.group,subGroup:r.group,flag:"Source",unit:"Source",entity:r.entity,bmpkKonsol:"—",bmpkEntitas:"—",limitFasilitas:r.masterLimit,bade:exp,borrowing:"Reference",masterLimit:r.masterLimit,mlk:r.masterLimit,utilBade:u,utilFacilityBmpk:"—",utilMlkBmpk:"—",debtors:1,totalBmpk:"—",totalMaster:r.masterLimit,totalBorrowing:"—",variance:0,status:recordStatus("MLK",r),cif:r.key,name:r.name,products:p}}),
    CIL:data.CIL.map((r,i)=>{const total=recordExposure("CIL",r);return {no:i+1,insurer:r.name,type:r.type,ic:r.ic,multiplier:(r.multiplier*100).toFixed(2)+"%",cit:r.cit,bmriNominal:r.entities.BMRI?.nominal||0,bmriEil:r.entities.BMRI?.eil||0,mtNominal:r.entities["Mandiri Taspen"]?.nominal||0,mtEil:r.entities["Mandiri Taspen"]?.eil||0,mtfNominal:r.entities.MTF?.nominal||0,mtfEil:r.entities.MTF?.eil||0,mufNominal:r.entities.MUF?.nominal||0,mufEil:r.entities.MUF?.eil||0,cil:r.cil,totalNominal:total,projection:r.projection,utilCit:r.cit?total/r.cit:0,projectedUtil:r.cit?r.projection/r.cit:0,cilUtil:r.cil?total/r.cil:0,status:recordStatus("CIL",r),score:r.score,action:r.action}}),
    LPG:data.LPG.map((r,i)=>{const p=r.products||{},exp=recordExposure("LPG",r);return {no:i+1,sector:r.sector,segment:r.segment,region:r.region,limit:r.limit,outstanding:exp,util:r.limit?exp/r.limit:0,cl:p.CASHLOAN||0,ncl:p["NON CASH LOAN"]||0,crosscheck:(p.CASHLOAN||0)+(p["NON CASH LOAN"]||0)===exp?"Match":"Selisih",dataQuality:r.dataQuality,status:recordStatus("LPG",r)}})
  };
}
const reportDummy=buildReportDummy(limasDemoData);
function fmtReport(v){if(v===null||v===undefined||v==="")return "—";if(typeof v==="number")return v.toLocaleString('id-ID',{maximumFractionDigits:2});return v;}
function statusForReport(row){return row.status||row.statusMaster||"Normal";}
function downloadReportCsv(type,rows){
  const cfg=reportConfig[type];
  const header=cfg.columns.map(x=>x[0]).join(",");
  const body=rows.map(r=>cfg.columns.map(([,key])=>`"${String(fmtReport(r[key])).replaceAll('"','""')}"`).join(",")).join("\n");
  const csv=header+"\n"+body;
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download=`LIMAS_${type}_Monitoring_Report.csv`;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url),500);
}
function Report({nav}){
  const [type,setType]=useState("Country"),[period,setPeriod]=useState("Agustus 2026"),[status,setStatus]=useState("All"),[generated,setGenerated]=useState(false);
  const rows=reportDummy[type]||[],filtered=rows.filter(r=>status==="All"||statusForReport(r)===status),cfg=reportConfig[type];
  const generate=()=>setGenerated(true);
  const summary={total:rows.length,normal:rows.filter(r=>statusForReport(r)==="Normal").length,warning:rows.filter(r=>statusForReport(r)==="Warning").length,breach:rows.filter(r=>statusForReport(r)==="Breach").length,issue:rows.filter(r=>statusForReport(r)==="Data Issue").length};
  return <Layout screen="report" onNav={nav}><Header title="Generate Monitoring Report" subtitle="Generate report monitoring dengan struktur yang mengikuti master report masing-masing limit"/><div className="page">
    <section className="card"><div className="head"><div><h2>Report Generator</h2><p>Generate report dari monitoring read model yang sama dengan halaman Monitoring.</p></div><div className="chip blue">Prototype Reconciled Data • {rows.length} records</div></div><div className="body">
      <div className="report-controls">
        <div><label>Jenis Report</label><select className="select" value={type} onChange={e=>{setType(e.target.value);setGenerated(false);setStatus("All")}}><option>Country</option><option>CCL</option><option>MLK</option><option>CIL</option><option>LPG</option></select></div>
        <div><label>Periode</label><select className="select" value={period} onChange={e=>setPeriod(e.target.value)}><option>Agustus 2026</option><option>Juli 2026</option><option>Juni 2026</option></select></div>
        <div><label>Status</label><select className="select" value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Normal</option><option>Warning</option><option>Breach</option><option>Data Issue</option></select></div>
        <div className="report-actions"><button className="btn primary" onClick={generate}>Generate Report</button><button className="btn secondary" onClick={()=>downloadReportCsv(type,filtered)}>Download CSV</button></div>
      </div>
    </div></section>
    {generated&&<section className="card"><div className="head"><div><h2>{cfg.title}</h2><p>{cfg.subtitle}</p><div className="report-meta"><span>{cfg.source}</span><span>Periode: {period}</span><span>Generated: {nowLabel()}</span></div></div><button className="btn ghost" onClick={()=>window.print()}>Print / PDF</button></div><div className="body">
      <div className="report-note">{cfg.note}</div>
      <div className="metric-grid report-kpi"><DomainKpi label="Total Data" value={summary.total} sub="Dummy records"/><DomainKpi label="Normal" value={summary.normal} sub="Within monitoring threshold"/><DomainKpi label="Warning" value={summary.warning} sub="Early warning condition" accent="yellow"/><DomainKpi label="Breach" value={summary.breach} sub="Above monitoring limit" accent="red"/><DomainKpi label="Data Issue" value={summary.issue} sub="Needs review"/></div>
      <div className="table-wrap report-table-wrap"><table className="table report-table"><thead><tr>{cfg.columns.map(([label])=><th key={label}>{label}</th>)}</tr></thead><tbody>{filtered.map((r,i)=><tr key={r.no||i}>{cfg.columns.map(([label,key])=><td key={key}>{key==="status"||key==="statusMaster"?<Status v={statusForReport(r)}/>:fmtReport(r[key])}</td>)}</tr>)}</tbody></table></div>
      <div className="report-footer"><b>Reporting note:</b> Report prototype membaca dataset monitoring canonical yang sama dengan Dashboard/Monitoring. Karena itu Master Limit + Product Utilization + Status harus tetap tally. Field yang source-nya belum eksplisit ditandai sesuai MD.</div>
    </div></section>}
    {!generated&&<section className="card"><div className="head"><div><h2>Report Preview</h2><p>Report belum di-generate. Pilih parameter lalu klik Generate Report.</p></div></div><div className="body"><div className="report-preview"><div><b>{cfg.title}</b><span>{cfg.source}</span></div><div><b>5 dummy data</b><span>Normal / Warning / Breach / Data Quality scenario</span></div><div><b>Output</b><span>Preview table + CSV + Print/PDF browser</span></div></div></div></section>}
  </div></Layout>;
}
function Status({v}){return <span className={`badge ${v==='Breach'?'breach':v==='Warning'?'warning':'normal'}`}>{v}</span>}
function Layout({screen,onNav,children}){const nav=[['dashboard','⌂','Dashboard'],['setup','⚙','Master Limit Setup'],['detail','▤','Master Limit Detail'],['products','▦','Product Universe & Integration'],['report','▤','Generate Report'],['warning','◉','Early Warning'],['Country','◎','Country Limit'],['CCL','◈','Counterparty / CCL'],['MLK','◌','Debtor / MLK'],['CIL','⬡','Insurance / CIL'],['LPG','◫','Portfolio / LPG']];return <div className="app shell"><aside className="side"><div className="brand"><div><b>LIMAS</b><small>Limit Management System</small></div></div><div className="nav">{nav.map(([id,ic,lb],i)=><React.Fragment key={id}>{i===1&&<div className="section">Master & Data</div>}{i===4&&<div className="section">Reporting</div>}{i===5&&<div className="section">Monitoring</div>}<button className={screen===id?'active':''} onClick={()=>onNav(id)}><span style={{width:16}}>{ic}</span>{lb}</button></React.Fragment>)}</div><div className="collapse">‹‹ &nbsp; Collapse</div></aside><main className="main">{children}</main></div>}
function Header({title,subtitle}){return <div className="top"><div className="title"><h1>{title}</h1><p>{subtitle}</p></div><div className="usr">🔔 <span className="avatar">R</span><div><b>Risk Management</b><div style={{fontSize:10,color:'#95a3b9'}}>CPR • LIMAS</div></div></div></div>}
function Login({go}){return <div className="app login"><div className="login-card"><div className="login-logo">LM</div><h1>LIMAS</h1><p>Limit Management System</p><input defaultValue="cpr.risk" placeholder="Username"/><input defaultValue="demo123" type="password" placeholder="Password"/><button className="btn primary" onClick={go}>Masuk ke LIMAS</button><div className="foot">Prototype • Development / UAT</div></div></div>}

function DomainKpi({label,value,sub,accent=""}){return <div className="metric"><div className="label">{label}</div><div className="value" style={accent?{color:`var(--${accent})`}:{}}>{value}</div><div className="sub">{sub}</div></div>}

function OverviewTable({type, onDetail}){
  const rows = {
    Country:[
      ["CN","China","2,000","1,420","71%","Normal"],
      ["SG","Singapore","1,650","1,410","85%","Warning"],
      ["AE","United Arab Emirates","500","512","102%","Breach"],
      ["AU","Australia","900","710","79%","Normal"],
      ["JP","Japan","750","645","86%","Warning"]
    ],
    CCL:[
      ["ANZBAU3M","ANZ Bank","500","355","71%","Normal"],
      ["CTBAAU2S","Commonwealth Bank","400","372","93%","Warning"],
      ["NATAAU33","National Australia Bank","300","318","106%","Breach"],
      ["FABAAE","First Abu Dhabi Bank","350","245","70%","Normal"],
      ["ICBC","Agricultural Bank of China","2000","1700","85%","Warning"]
    ],
    MLK:[
      ["4000264485","DJARUM","5,818","4,021","69%","Normal"],
      ["1000145694","ANEKA TAMBANG","13,280","11,580","87%","Warning"],
      ["4000027711","MANDIRI GROUP SAMPLE","9,000","9,630","107%","Breach"],
      ["2000198372","SAMPLE GROUP B","7,500","4,650","62%","Normal"]
    ],
    CIL:[
      ["INS-001|BMRI","Tugu Pratama","60,093","58,300","97%","Warning"],
      ["INS-001|MTF","Tugu Pratama - MTF","10,592","10,129","96%","Warning"],
      ["INS-002|BMRI","Perisai Listrik","6,661","5,980","90%","Warning"],
      ["INS-003|BMRI","Insurance ABC","18,000","19,450","108%","Breach"]
    ],
    LPG:[
      ["BATUBARA|Corporate|R1","Batubara / Corp / R1","65,140","37,919","58%","Normal"],
      ["BATUBARA|Commercial|R1","Batubara / Comm / R1","35,949","30,350","84%","Warning"],
      ["NIKEL|Corporate|R2","Nikel / Corp / R2","42,000","44,500","106%","Breach"],
      ["KELAPA SAWIT|Corporate|R3","Sawit / Corp / R3","50,000","33,600","67%","Normal"]
    ]
  }[type];
  return <div className="table-wrap"><table className="table"><thead><tr><th>Unique Key</th><th>Objek</th><th>Limit</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Detail</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}><td><span className="key">{r[0]}</span></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><Status v={r[5]}/></td><td><button className="btn ghost" onClick={()=>onDetail(type,r[0])}>View</button></td></tr>)}</tbody></table></div>
}

function Dashboard({nav}){
  const domainsList=["Country","CCL","MLK","CIL","LPG"];
  const summary=domainsList.reduce((a,type)=>{
    const rows=limasDemoData[type]||[];
    return {...a,records:a.records+rows.length,normal:a.normal+rows.filter(r=>recordStatus(type,r)==="Normal").length,warning:a.warning+rows.filter(r=>recordStatus(type,r)==="Warning").length,breach:a.breach+rows.filter(r=>recordStatus(type,r)==="Breach").length,issue:a.issue+rows.filter(r=>recordStatus(type,r)==="Data Issue").length};
  },{records:0,normal:0,warning:0,breach:0,issue:0});
  return <Layout screen="dashboard" onNav={nav}>
    <Header title="Halo, Risk Management" subtitle="Executive monitoring limit Bank Mandiri Group"/>
    <div className="page">
      <div className="hero">
        <h2>Limit Management Overview</h2>
        <p>Master limit aktif, product utilization terintegrasi dan monitoring status periode berjalan.</p>
        <div className="hero-grid">
          <div><div className="hero-label">Master Objects</div><div className="hero-value">{summary.records}</div></div>
          <div><div className="hero-label">Integrated Exposure Records</div><div className="hero-value">{summary.records}</div></div>
          <div><div className="hero-label">Breach</div><div className="hero-value">{summary.breach}</div></div>
        </div>
      </div>

      <div className="metric-grid">
        {domainsList.map(type=>{
          const rows=limasDemoData[type]||[],lim=rows.reduce((a,r)=>a+recordLimit(type,r),0),exp=rows.reduce((a,r)=>a+recordExposure(type,r),0),u=lim?exp/lim:0;
          return <DomainKpi key={type} label={type+" Limit"} value={(u*100).toFixed(1)+"%"} sub={rows.length+" objects • "+rows.filter(r=>recordStatus(type,r)==="Warning").length+" EWS • "+rows.filter(r=>recordStatus(type,r)==="Breach").length+" Breach"} accent={u>=1?"red":u>=0.8?"yellow":""}/>;
        })}
      </div>

      <div className="dash-grid">
        <section className="card">
          <div className="head"><div><h2>Utilisasi per Domain</h2><p>Exposure terintegrasi dibandingkan dengan master limit domain.</p></div></div>
          <div className="body"><div className="chart-list">
            {domainsList.map(type=>{
              const rows=limasDemoData[type]||[],lim=rows.reduce((a,r)=>a+recordLimit(type,r),0),exp=rows.reduce((a,r)=>a+recordExposure(type,r),0),u=lim?Math.min(exp/lim,1):0;
              return <div className="chart-row" key={type}><div className="chart-row-head"><b>{type}</b><span>{(u*100).toFixed(1)}%</span></div><div className="chart-track"><span style={{width:(u*100)+"%"}}/></div></div>;
            })}
          </div></div>
        </section>
        <section className="card">
          <div className="head"><div><h2>Distribusi Status</h2><p>Satu sumber data untuk dashboard, monitoring dan report.</p></div></div>
          <div className="body">
            <div className="legend">
              <div><i className="dot" style={{background:"#1c73e8"}}/> Normal {summary.normal}</div>
              <div><i className="dot" style={{background:"#f2c04d"}}/> Early Warning {summary.warning}</div>
              <div><i className="dot" style={{background:"#e45757"}}/> Breach {summary.breach}</div>
              <div><i className="dot" style={{background:"#8692a6"}}/> Data Issue {summary.issue}</div>
            </div>
          </div>
        </section>
      </div>

      <section className="card">
        <div className="head"><div><h2>Data Lineage</h2><p>Traceability dari Master Limit sampai product utilization dan monitoring output.</p></div></div>
        <div className="body"><div className="integration-chip-grid">
          <div className="mini integration-chip"><b>1. Master Limit</b><div className="muted-small">Approved limit, parameter, effective period, version dan status.</div></div>
          <div className="mini integration-chip"><b>2. Product Universe</b><div className="muted-small">Product source registry dan integration mapping.</div></div>
          <div className="mini integration-chip"><b>3. Product Utilization</b><div className="muted-small">Source record → target key → aggregation → outstanding/exposure.</div></div>
          <div className="mini integration-chip"><b>4. Monitoring / Report</b><div className="muted-small">Utilisasi → remaining → threshold → EWS/Breach → report.</div></div>
        </div></div>
      </section>

      <div className="dash-grid">
        <section className="card"><div className="head"><div><h2>Early Warning & Breach</h2><p>Exception lintas domain dari canonical monitoring model.</p></div><button className="btn secondary" onClick={()=>nav("warning")}>Buka EWS Center</button></div><div className="body"><div className="alert-list">
          {domainsList.flatMap(type=>(limasDemoData[type]||[]).map(r=>({type,r,st:recordStatus(type,r)}))).filter(x=>x.st==="Warning"||x.st==="Breach").slice(0,6).map(({type,r,st})=><div className={"alert "+(st==="Breach"?"breach":"warning")} key={type+"|"+r.key}><span className="bar"></span><div><b>{type+" • "+(r.name||r.sector)}</b><div className="muted-small">Utilisasi {(recordUtil(type,r)*100).toFixed(2)}%</div></div><Status v={st}/></div>)}
        </div></div></section>
        <section className="card"><div className="head"><div><h2>Reconciliation Status</h2><p>Data issue yang memerlukan investigasi.</p></div></div><div className="body">
          {domainsList.map(type=>(limasDemoData[type]||[]).filter(r=>recordStatus(type,r)==="Data Issue").map(r=><div className="mini" style={{marginBottom:8}} key={type+"|"+r.key}><b>{type+" • "+(r.name||r.sector)}</b><div className="muted-small">{r.dataQuality}</div></div>))}
          {summary.issue===0&&<div className="mini">No data issue.</div>}
        </div></section>
      </div>
    </div>
  </Layout>
}

function Warning({nav}){
  const [status,setStatus]=useState("All"), [domain,setDomain]=useState("All");
  const rows=[
    ["Breach","MLK","4000027711","MANDIRI GROUP SAMPLE","9,000","9,630","107%","1,000","2026-08-12 09:00"],
    ["Breach","CCL","NATAAU33","National Australia Bank","300","318","106%","150","2026-08-12 08:55"],
    ["Breach","LPG","NIKEL|Corporate|R2","Nikel / Corp / R2","42,000","44,500","106%","100","2026-08-12 08:20"],
    ["Warning","Country","SG","Singapore","1,650","1,410","85%","80%","2026-08-12 08:05"],
    ["Warning","CIL","INS-001|BMRI","Tugu Pratama - BMRI","60,093","58,300","97%","80%","2026-08-12 08:00"],
    ["Warning","MLK","1000145694","ANEKA TAMBANG","13,280","11,580","87%","80%","2026-08-11 17:35"],
  ];
  const filtered=rows.filter(r=>(status==="All"||r[0]===status)&&(domain==="All"||r[1]===domain));
  return <Layout screen="warning" onNav={nav}><Header title="Early Warning & Breach Center" subtitle="Pusat exception monitoring berdasarkan threshold pada setiap master limit"/><div className="page">
    <div className="metric-grid">
      <DomainKpi label="Total Exception" value={filtered.length} sub="Hasil filter saat ini"/>
      <DomainKpi label="Breach" value={rows.filter(r=>r[0]==="Breach").length} sub="Utilisasi ≥ breach threshold" accent="red"/>
      <DomainKpi label="Early Warning" value={rows.filter(r=>r[0]==="Warning").length} sub="Warning ≤ utilization < breach" accent="yellow"/>
      <DomainKpi label="Data Issue" value="4" sub="Belum lengkap / mismatch"/>
      <DomainKpi label="Action Pending" value="5" sub="Perlu review user" accent="yellow"/>
    </div>
    <section className="card"><div className="head"><div><h2>Filter Exception</h2><p>Status threshold dibaca dari master masing-masing domain</p></div></div><div className="body"><div className="toolbar"><select className="select" value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Warning</option><option>Breach</option></select><select className="select" value={domain} onChange={e=>setDomain(e.target.value)}><option>All</option><option>Country</option><option>CCL</option><option>MLK</option><option>CIL</option><option>LPG</option></select><select className="select"><option>All Entity</option><option>BMRI</option><option>Perusahaan Anak</option></select><select className="select"><option>Latest Period</option><option>Previous Month</option></select></div></div></section>
    <section className="card"><div className="head"><div><h2>Exception Register</h2><p>Drill-down menuju master dan detail exposure</p></div></div><div className="body"><div className="table-wrap"><table className="table"><thead><tr><th>Status</th><th>Domain</th><th>Unique Key</th><th>Objek</th><th>Limit</th><th>Exposure</th><th>Utilisasi</th><th>Threshold</th><th>Last Update</th><th>Aksi</th></tr></thead><tbody>{filtered.map(r=><tr key={r[2]}><td><Status v={r[0]}/></td><td><b>{r[1]}</b></td><td><span className="key">{r[2]}</span></td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td><td>{r[6]}</td><td>{r[7]}</td><td>{r[8]}</td><td><button className="btn ghost" onClick={()=>nav("detail",{type:r[1],key:r[2]})}>Detail</button></td></tr>)}</tbody></table></div></div></section>
    <div className="dash-grid"><section className="card"><div className="head"><div><h2>Exception by Domain</h2><p>Distribusi warning dan breach</p></div></div><div className="body"><div className="heatmap">{[["Country","2","low"],["CCL","2","warn"],["MLK","3","high"],["CIL","2","warn"],["LPG","1","high"],["Data","4","mid"]].map(x=><div className={`heat ${x[2]}`} key={x[0]}><div>{x[0]}</div><div style={{fontSize:18,marginTop:8}}>{x[1]}</div></div>)}</div></div></section>
    <section className="card"><div className="head"><div><h2>Action Status</h2><p>Follow-up exception</p></div></div><div className="body">{[["Open",5],["In Review",3],["Resolved",7]].map(x=><div className="mini" style={{marginBottom:8}} key={x[0]}><b>{x[0]}</b><span style={{float:"right",fontWeight:900}}>{x[1]}</span></div>)}</div></section></div>
  </div></Layout>
}

function Monitor({type,nav}){
  const rows=limasDemoData[type]||[];
  const totalLimit=rows.reduce((a,r)=>a+recordLimit(type,r),0);
  const totalExposure=rows.reduce((a,r)=>a+recordExposure(type,r),0);
  const overallUtil=totalLimit?totalExposure/totalLimit:0;
  const statusCounts={Normal:rows.filter(r=>recordStatus(type,r)==="Normal").length,Warning:rows.filter(r=>recordStatus(type,r)==="Warning").length,Breach:rows.filter(r=>recordStatus(type,r)==="Breach").length,"Data Issue":rows.filter(r=>recordStatus(type,r)==="Data Issue").length};
  const titleMap={Country:"Country Limit Monitoring",CCL:"Counterparty / CCL Monitoring",MLK:"Debtor / MLK Monitoring",CIL:"Insurance / CIL Monitoring",LPG:"Portfolio / LPG Monitoring"};
  const subtitleMap={Country:"Master Country Limit + integrated product utilization.",CCL:"Master CCL / Contractual Limit + integrated counterparty product utilization.",MLK:"Master Limit per CIF/group + integrated CL, NCL and Treasury Line exposure.",CIL:"Master IC/CIT/EIL/CIL + integrated Nominal Pertanggungan.",LPG:"Master limit Sector × Segment × Region + integrated CL/NCL outstanding."};
  const unitMap={Country:"Rp Juta",CCL:"Rp Miliar",MLK:"Rp Juta",CIL:"Rp Juta",LPG:"Rp Juta"};
  const pct=v=>(v*100).toFixed(2)+"%";
  const productsText=r=>{
    if(type==="CIL") return Object.entries(r.entities||{}).map(([e,v])=>e+" "+Number(v.nominal||0).toLocaleString("id-ID",{maximumFractionDigits:2})).join(" • ");
    return Object.entries(r.products||{}).map(([p,v])=>demoProductLabel(p)+": "+Number(v||0).toLocaleString("id-ID",{maximumFractionDigits:2})).join(" • ")||"Tidak ada exposure";
  };
  return <Layout screen={type} onNav={nav}>
    <Header title={titleMap[type]} subtitle={subtitleMap[type]}/>
    <div className="page">
      <div className="metric-grid">
        <DomainKpi label="Total Master Limit" value={totalLimit.toLocaleString("id-ID",{maximumFractionDigits:2})} sub={unitMap[type]}/>
        <DomainKpi label="Integrated Exposure" value={totalExposure.toLocaleString("id-ID",{maximumFractionDigits:2})} sub="Product utilization"/>
        <DomainKpi label="Utilisasi" value={pct(overallUtil)} sub="Exposure / Master Limit" accent={overallUtil>=1?"red":overallUtil>=0.8?"yellow":""}/>
        <DomainKpi label="Early Warning" value={statusCounts.Warning} sub="80%–<100%" accent="yellow"/>
        <DomainKpi label="Breach" value={statusCounts.Breach} sub="≥100%" accent="red"/>
      </div>
      <section className="card">
        <div className="head"><div><h2>Data Lineage</h2><p>Angka monitoring berasal dari master limit dan product utilization yang sama dengan report.</p></div><span className="chip blue">Master → Integration → Monitoring</span></div>
        <div className="body"><div className="integration-chip-grid">
          <div className="mini integration-chip"><b>1. Master Limit</b><div className="muted-small">{domainDataContract[type].masterDescription}</div></div>
          <div className="mini integration-chip"><b>2. Product Universe</b><div className="muted-small">{(domainIntegrationProducts[type]||[]).map(integrationLabel).join(" • ")}</div></div>
          <div className="mini integration-chip"><b>3. Utilization Inbound</b><div className="muted-small">Source record → target key → aggregation → exposure</div></div>
          <div className="mini integration-chip"><b>4. Monitoring Output</b><div className="muted-small">Utilization + remaining + threshold + EWS/Breach</div></div>
        </div></div>
      </section>
      <section className="card">
        <div className="head"><div><h2>Monitoring Detail</h2><p>Limit, exposure dan product contribution berasal dari canonical demo data.</p></div></div>
        <div className="body"><div className="table-wrap"><table className="table">
          <thead><tr>{
            type==="Country"?<><th>Country Code</th><th>Country</th><th>Master Limit</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>:
            type==="CCL"?<><th>Swift</th><th>Bank</th><th>CCL</th><th>Contractual</th><th>Outstanding</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>:
            type==="MLK"?<><th>CIF</th><th>Debitur</th><th>Group</th><th>Master Limit</th><th>Exposure</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>:
            type==="CIL"?<><th>Insurance</th><th>Nama</th><th>CIL</th><th>Nominal Pertanggungan</th><th>Utilisasi CIL</th><th>Status</th><th>Entity Contribution</th></>:
            <><th>Sektor</th><th>Segmen</th><th>Region</th><th>Master Limit</th><th>Outstanding</th><th>Utilisasi</th><th>Status</th><th>Product Contribution</th></>
          }</tr></thead>
          <tbody>{rows.map((r,i)=>{
            const lim=recordLimit(type,r),exp=recordExposure(type,r),u=recordUtil(type,r),st=recordStatus(type,r);
            if(type==="Country") return <tr key={i}><td className="key">{r.key}</td><td>{r.name}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>{productsText(r)}</td></tr>;
            if(type==="CCL") return <tr key={i}><td className="key">{r.key}</td><td>{r.name}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{Number(r.contractual||0).toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>{productsText(r)}</td></tr>;
            if(type==="MLK") return <tr key={i}><td className="key">{r.key}</td><td>{r.name}</td><td>{r.group}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>{productsText(r)}</td></tr>;
            if(type==="CIL") return <tr key={i}><td className="key">{r.key}</td><td>{r.name}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>{productsText(r)}</td></tr>;
            return <tr key={i}><td>{r.sector}</td><td>{r.segment}</td><td>{r.region}</td><td>{lim.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{exp.toLocaleString("id-ID",{maximumFractionDigits:2})}</td><td>{pct(u)}</td><td><Status v={st}/></td><td style={{fontSize:10}}>{productsText(r)}</td></tr>;
          })}</tbody>
        </table></div></div>
      </section>
      <section className="card">
        <div className="head"><div><h2>Reconciliation</h2><p>Exposure harus sama dengan penjumlahan contribution source yang terhubung.</p></div></div>
        <div className="body"><div className="metric-grid">
          <DomainKpi label="Records" value={rows.length} sub="Master objects"/>
          <DomainKpi label="Normal" value={statusCounts.Normal} sub="Within threshold"/>
          <DomainKpi label="Warning" value={statusCounts.Warning} sub="Needs monitoring" accent="yellow"/>
          <DomainKpi label="Breach" value={statusCounts.Breach} sub="Above master limit" accent="red"/>
          <DomainKpi label="Data Issue" value={statusCounts["Data Issue"]} sub="Mapping / master quality"/>
        </div></div>
      </section>
    </div>
  </Layout>;
}

function Setup({nav,setSel}){
  const [type,setType]=useState("Country");
  const info=domains[type], linkedProducts=domainIntegrationProducts[type]||[], rows=limasDemoData[type]||[];
  return <Layout screen="setup" onNav={nav}>
    <Header title="Master Limit Setup" subtitle="Repository master limit per domain • utilization product diintegrasikan terpisah"/>
    <div className="page">
      <section className="card">
        <div className="head">
          <div><h2>{type} Master</h2><p>Unique key: <span className="key">{info.key}</span> • hanya approved master limit dan parameter yang disimpan.</p></div>
          <div className="toolbar"><button className="btn secondary">Download Template</button><button className="btn primary">Upload Master Limit</button></div>
        </div>
        <div className="body">
          <div className="tabs">{Object.keys(domains).map(d=><button className={"tab "+(d===type?"active":"")} key={d} onClick={()=>setType(d)}>{d}</button>)}</div>
          <div className="toolbar" style={{marginBottom:14}}><input className="input" placeholder={"Cari "+info.key}/><select className="select"><option>Active</option><option>Inactive</option><option>All</option></select><button className="btn ghost">Filter</button></div>
          <div className="table-wrap"><table className="table">
            <thead><tr><th>Unique Key</th><th>Master Object</th><th>Master Limit</th><th>Linked Product</th><th>Version</th><th>Status</th><th>Detail</th></tr></thead>
            <tbody>{rows.map((r,i)=><tr key={String(r.key)+i}>
              <td className="key">{r.key}</td>
              <td>{r.name||r.sector}</td>
              <td>{recordLimit(type,r).toLocaleString("id-ID",{maximumFractionDigits:2})}</td>
              <td>{linkedProducts.map(p=><span key={p} className="chip blue" style={{marginRight:5,marginBottom:4,display:"inline-block"}}>{integrationLabel(p)}</span>)}</td>
              <td>v{loadRecordMeta(type,r.key).version||1}</td><td><Status v={recordStatus(type,r)==="Data Issue"?"Data Issue":(loadRecordMeta(type,r.key).status||"Active")}/></td>
              <td><button className="btn ghost" onClick={()=>{setSel(type);nav("detail",{type,key:r.key})}}>Buka Detail</button></td>
            </tr>)}</tbody>
          </table></div>
          <div className="field-help">Master Limit menyimpan limit/parameter. Outstanding, utilization dan EWS berasal dari Product Utilization Integration.</div>
        </div>
      </section>
    </div>
  </Layout>
}

function sampleKey(t){const m={Country:'AE',CCL:'ANZB AU 3M',MLK:'4000264485',CIL:'INS-001 + BMRI',LPG:'BATUBARA + Corporate + Region I'};return m[t]}
function sampleName(t){const m={Country:'United Arab Emirates',CCL:'ABN Amro Bank NV',MLK:'DJARUM',CIL:'PT Asuransi Tugu Pratama Indonesia Tbk',LPG:'BATUBARA'};return m[t]}


const mdFieldSource={
  Country:{
    "Identitas||No":"Dataset team Country","Identitas||Negara":"Dataset team Country","Identitas||Code":"Dataset team Country","Identitas||Status":"Dataset team Country",
    "Checklist Product||CL":"Big Data (adjusted Country)","Checklist Product||NCL":"NTF -> Provided by DWB","Checklist Product||COM":"Data Utilisasi Credit Line","Checklist Product||TRS":"Data Utilisasi Credit Line","Checklist Product||BOND":"Market Risk/Treasury","Checklist Product||NOS":"Internal Mandiri",
    "Exposure Product||CL":"Big Data (adjusted Country)","Exposure Product||NCL":"NTF -> Provided by DWB","Exposure Product||COM":"Data Utilisasi Credit Line","Exposure Product||TRS":"Data Utilisasi Credit Line","Exposure Product||BOND":"Market Risk/Treasury","Exposure Product||NOS":"Internal Mandiri","Exposure Product||TOTAL":"get",
    "Limit & Gap||Limit FIB / Formulasi":"internal","Limit & Gap||Limit FIB / Diputus":"internal","Limit & Gap||Country Limit / Country Limit":"Dataset Country","Limit & Gap||Country Limit / %Country Limit":"get","Limit & Gap||Gap Analysis / Needs":"get","Limit & Gap||Gap Analysis / Minus":"get","Limit & Gap||Gap Analysis / Add":"get","Limit & Gap||Final Limit / Final Limit":"calc","Limit & Gap||Final Limit / %Final Limit":"get"
  },
  CCL:{
    "Bank Profile||Nama bank":"Dataset Utilisasi FI (provided by FI)",
    "Bank Profile||CIF/Swift":"Internal","Bank Profile||Kategori Bank":"Internal","Bank Profile||Negara":"Internal",
    "Bank Profile||Global Parent Bank":"Belum dicantumkan pada MD",
    "Bank Profile||Apakah Bank termasuk Top 200 Bank Besar Dunia berdasarkan total aset menurut Banker's Almanac":"Belum dicantumkan pada MD",
    "Risk & Capacity||Country Rating":"Tradingeconomics","Risk & Capacity||Bobot":"GET","Risk & Capacity||Rating":"internal","Risk & Capacity||Posisi Rating":"internal","Risk & Capacity||Rating Index":"master rating scale","Risk & Capacity||Limit Inhouse (Rp Miliar)":"dataset ccl","Risk & Capacity||Tier 1 Capital (Rp Miliar)":"data lapkeu Bank","Risk & Capacity||Capacity":"GET","Risk & Capacity||Capacity Limit Adjusted":"GET (adj)",
    "Limit||CCL":"Input manual / keputusan komite","Limit||Utilisasi Capacity":"calc","Limit||Limit Contractual":"Input manual / keputusan komite",
    "BMRI Exposure||Outstanding":"Core Banking Limit System","BMRI Exposure||Jenis Limit":"Core Banking Limit System","BMRI Exposure||Limit":"Core Banking Limit System","BMRI Exposure||Total":"Core Banking Limit System","BMRI Exposure||Bank Loan":"Core Banking Limit System","BMRI Exposure||Commercial Line":"Core Banking Limit System","BMRI Exposure||Treasury Line":"Core Banking Limit System","BMRI Exposure||Utilisasi CCL":"calc","BMRI Exposure||Utilisasi Limit Kontraktual":"calc","BMRI Exposure||Outstanding Maksimum":"Core Banking Limit System","BMRI Exposure||Utilisasi Maksimum Limit Kontraktual":"calc",
    "Perusahaan Anak||Limit":"Input manual / Perusahaan Anak","Perusahaan Anak||Total":"Input manual / Perusahaan Anak","Perusahaan Anak||Bank Loan":"Input manual / Perusahaan Anak","Perusahaan Anak||Commercial Line":"Input manual / Perusahaan Anak","Perusahaan Anak||Treasury Line":"Input manual / Perusahaan Anak","Perusahaan Anak||Utilisasi CCL":"calc","Perusahaan Anak||Utilisasi Limit Kontraktual":"calc","Perusahaan Anak||Utilisasi Maksimum Limit Kontraktual":"calc"
  },
  MLK:{
    "Profil Debitur||Entitas":"Entitas yang state Debitur BMRI/PA",
    "Profil Debitur||CIF":"eMAS/BigData",
    "Profil Debitur||Nama Debitur":"eMAS/BigData",
    "Profil Debitur||Group Usaha":"eMAS/BigData",
    "Profil Debitur||Unit Kerja Pengelola":"NewIPS",
    "Profil Debitur||Group":"eMAS/BigData",
    "Profil Debitur||BUMN/Swasta Flag":"eMAS/BigData",
    "Profil Debitur||Tier":"Belum dicantumkan pada MD",
    "Risk & Regulatory||BMPK Konsol":"New IPS",
    "Risk & Regulatory||Inhouse Limit Konsol":"formula = 90%*BMPKKonsol (BMRI); PA Setup/Mapping",
    "Risk & Regulatory||BMPK/BMPP/BMPD Entitas":"New IPS / WCO",
    "Risk & Regulatory||Inhouse Limit Entitas":"formula = 90%*BMPKEntitas",
    "Risk & Regulatory||Sektor DC":"LIMAST",
    "Risk & Regulatory||DC Sectoral":"LIMAST",
    "Risk & Regulatory||Rating":"LIMAST",
    "Risk & Regulatory||Rating Multiplier":"LIMAST",
    "Risk & Regulatory||Watchlist":"LIMAST",
    "Risk & Regulatory||Discount Factor":"LIMAST",
    "Financial & Capacity||EBITDA/Pengganti EBITDA":"LIMAST",
    "Financial & Capacity||Kredit Bank Lain":"formula : Total Limit BMRI + Kredit Bank Lain",
    "Financial & Capacity||Total Debt":"LIMAST",
    "Financial & Capacity||Borrowing Capacity":"LIMAST",
    "Financial & Capacity||Available BC":"LIMAST",
    "Product Limit & Exposure||CL Bade":"LIMAST",
    "Product Limit & Exposure||CL Limit":"LIMAST",
    "Product Limit & Exposure||NCL Bade":"LIMAST",
    "Product Limit & Exposure||NCL Limit":"LIMAST",
    "Product Limit & Exposure||Treasury Line":"LIMAST",
    "Product Limit & Exposure||Bade Treasury Line":"LIMAST",
    "Product Limit & Exposure||Total Limit Existing":"formula = limit CL dan NCL + TRSLine",
    "Product Limit & Exposure||Total Bade Existing":"formula = bade CL dan NCL + TRSLine",
    "Master Limit||Master Limit Setting":"Master Limit Setting",
    "Master Limit||Master Limit":"formula = if setting master limit kosong, then pilih total limit"
  },
  CIL:{
    "Insurance Profile||No":"various Source",
    "Insurance Profile||Perusahaan Asuransi":"various Source",
    "Insurance Profile||Jenis Perusahaan (Asuransi/Penjaminan)":"list OJK/iCAPS",
    "Insurance Profile||Jenis Produk Asuransi":"list OJK/iCAPS",
    "Capacity & Threshold||Insurance Capacity (IC) (Rp Juta)":"feed by user (final calc)",
    "Capacity & Threshold||Multiplier Terpakai (%)":"feed by user (final calc)",
    "Capacity & Threshold||Consolidated Insurance Threshold (CIT) (Rp Juta)":"feed by user (final calc)",
    "Entity Limit (EIL)||EIL BMRI":"CPR",
    "Entity Limit (EIL)||EIL Mandiri Taspen":"CPR",
    "Entity Limit (EIL)||EIL MTF":"CPR",
    "Entity Limit (EIL)||EIL MUF":"CPR",
    "Consolidated Limit||Consolidated Insurance Limit (CIL) (Rp Juta)":"CIL = sum EIL"
  }
};
const mdFieldDescription={
  Country:{
    "Identitas||No":"Identitas baris pada master monitoring.",
    "Identitas||Negara":"Nama negara sebagai objek monitoring country limit.",
    "Identitas||Code":"Kode negara sebagai key join/mapping exposure product.",
    "Identitas||Status":"Status master country.",
    "Checklist Product||CL":"Checklist keberadaan exposure Cash Loan.",
    "Checklist Product||NCL":"Checklist keberadaan exposure Non Cash Loan.",
    "Checklist Product||COM":"Checklist keberadaan Commercial Line.",
    "Checklist Product||TRS":"Checklist keberadaan Treasury Line.",
    "Checklist Product||BOND":"Checklist keberadaan Bond.",
    "Checklist Product||NOS":"Checklist keberadaan Nostro.",
    "Exposure Product||CL":"Exposure Cash Loan berdasarkan source product.",
    "Exposure Product||NCL":"Exposure Non Cash Loan berdasarkan source product.",
    "Exposure Product||COM":"Exposure Commercial Line berdasarkan utilisasi.",
    "Exposure Product||TRS":"Exposure Treasury Line berdasarkan utilisasi.",
    "Exposure Product||BOND":"Exposure Bond.",
    "Exposure Product||NOS":"Exposure Nostro.",
    "Exposure Product||TOTAL":"Total exposure product hasil agregasi.",
    "Limit & Gap||Limit FIB / Formulasi":"Nilai Formulasi Limit FIB dari source internal.",
    "Limit & Gap||Limit FIB / Diputus":"Nilai Diputus Limit FIB dari source internal.",
    "Limit & Gap||Country Limit / Country Limit":"Country Limit berasal dari Dataset Country.",
    "Limit & Gap||Country Limit / %Country Limit":"Persentase Country Limit terhadap total.",
    "Limit & Gap||Gap Analysis / Needs":"Nilai Needs pada gap analysis.",
    "Limit & Gap||Gap Analysis / Minus":"Nilai Minus pada gap analysis.",
    "Limit & Gap||Gap Analysis / Add":"Nilai Add pada gap analysis.",
    "Limit & Gap||Final Limit / Final Limit":"Final Limit hasil kalkulasi.",
    "Limit & Gap||Final Limit / %Final Limit":"Persentase Final Limit terhadap total."
  },
  CCL:{},
  MLK:{},
  CIL:{
    "Insurance Profile||No":"various Source",
    "Insurance Profile||Perusahaan Asuransi":"various Source",
    "Insurance Profile||Jenis Perusahaan (Asuransi/Penjaminan)":"list OJK/iCAPS",
    "Insurance Profile||Jenis Produk Asuransi":"list OJK/iCAPS",
    "Capacity & Threshold||Insurance Capacity (IC) (Rp Juta)":"feed by user (final calc)",
    "Capacity & Threshold||Multiplier Terpakai (%)":"—",
    "Capacity & Threshold||Consolidated Insurance Threshold (CIT) (Rp Juta)":"feed by user (final calc)",
    "Entity Limit (EIL)||EIL BMRI":"CPR",
    "Entity Limit (EIL)||EIL Mandiri Taspen":"CPR",
    "Entity Limit (EIL)||EIL MTF":"CPR",
    "Entity Limit (EIL)||EIL MUF":"CPR",
    "Consolidated Limit||Consolidated Insurance Limit (CIL) (Rp Juta)":"CIL = sum EIL"
  },
  LPG:{},
    "MLK|Master Limit|Master Limit":"Approved Master Limit yang menjadi reference utilization.",
    "MLK|Product Limit & Exposure|CL Bade":"Current Cash Loan exposure dari LIMAST.",
    "MLK|Product Limit & Exposure|NCL Bade":"Current Non Cash Loan exposure dari LIMAST.",
    "MLK|Product Limit & Exposure|Bade Treasury Line":"Current Treasury Line exposure dari LIMAST.",
    "CIL|Entity Limit (EIL)|EIL BMRI":"Approved EIL BMRI yang menjadi bagian consolidated CIL.",
    "CIL|Entity Limit (EIL)|EIL Mandiri Taspen":"Approved EIL Mandiri Taspen yang menjadi bagian consolidated CIL.",
    "CIL|Entity Limit (EIL)|EIL MTF":"Approved EIL MTF yang menjadi bagian consolidated CIL.",
    "CIL|Entity Limit (EIL)|EIL MUF":"Approved EIL MUF yang menjadi bagian consolidated CIL.",
    "CIL|Consolidated Limit|Consolidated Insurance Limit (CIL) (Rp Juta)":"Approved CIL hasil konsolidasi EIL."
};
const defaultFieldSource=(type,section)=>{
  if(type==="MLK"||type==="LPG") return "Belum dicantumkan pada MD";
  const map={
    Country:{"Identitas":"MD Country","Limit & Gap":"MD Country"},
    CCL:{"Bank Profile":"MD CCL","Risk & Capacity":"MD CCL","Limit":"MD CCL"},
    MLK:{"Profil Debitur":"MLK_Master","Risk & Regulatory":"MLK_Master","Master Limit":"MLK_Master"},
    CIL:{"Insurance Profile":"CIL_Master","Capacity & Threshold":"CIL_Master","Entity Limit (EIL)":"CIL_Master","Consolidated Limit":"CIL_Master"},
    LPG:{"Identitas":"LPG_Loanportfolio","Bankwide Limit":"LPG_Loanportfolio","Regional Limit":"LPG_Loanportfolio"}
  };
  return map[type]?.[section]||"Belum dicantumkan pada MD";
};
const defaultFieldNote=(type,section,field)=>{
  const specific={
    "Country|Identitas|Negara":"Nama negara yang menjadi objek monitoring country limit.",
    "Country|Identitas|Code":"Country code unik yang digunakan sebagai key mapping exposure.",
    "Country|Identitas|Status":"Status master apakah objek masih aktif digunakan dalam monitoring.",
    "CCL|Bank Profile|Nama bank":"Nama counterparty bank yang menjadi objek monitoring CCL.",
    "CCL|Bank Profile|CIF/Swift":"Identifier counterparty yang digunakan untuk matching data exposure.",
    "CCL|Limit|CCL":"Approved Counterparty Credit Limit yang menjadi master monitoring.",
    "CCL|Limit|Limit Contractual":"Batas kontraktual yang digunakan sebagai reference tambahan monitoring.",
    "MLK|Profil Debitur|CIF":"Unique identifier debitur untuk mapping exposure dan Group Usaha.",
    "MLK|Profil Debitur|Nama Debitur":"Nama debitur yang ditampilkan pada monitoring.",
    "MLK|Profil Debitur|Group Usaha":"Group usaha untuk kebutuhan consolidated roll-up.",
    "MLK|Master Limit|Master Limit":"Approved Master Limit yang digunakan sebagai reference monitoring.",
    "CIL|Capacity & Threshold|Insurance Capacity (IC) (Rp Juta)":"Total insurance capacity yang menjadi basis reference monitoring.",
    "CIL|Capacity & Threshold|Consolidated Insurance Threshold (CIT) (Rp Juta)":"Threshold monitoring consolidated insurance.",
    "LPG|Identitas|Ecosystem LPG (Sektor)":"Sektor LPG yang menjadi objek monitoring portfolio.",
    "LPG|Identitas|Segmen LPG":"Segmen portfolio yang digunakan dalam pembentukan key monitoring."
    ,"CIL|Entity Limit (EIL)|EIL BMRI":"Approved EIL BMRI yang menjadi bagian dari CIL master."
    ,"CIL|Entity Limit (EIL)|EIL Mandiri Taspen":"Approved EIL Mandiri Taspen yang menjadi bagian dari CIL master."
    ,"CIL|Entity Limit (EIL)|EIL MTF":"Approved EIL MTF yang menjadi bagian dari CIL master."
    ,"CIL|Entity Limit (EIL)|EIL MUF":"Approved EIL MUF yang menjadi bagian dari CIL master."
    ,"CIL|Consolidated Limit|Consolidated Insurance Limit (CIL) (Rp Juta)":"Approved Consolidated Insurance Limit, hasil konsolidasi EIL."
  };
  return specific[`${type}|${section}|${field}`]||`Field ${field} digunakan sebagai ${section.toLowerCase()} untuk monitoring ${type}.`;
};
function loadFieldMeta(type){
  const key=`limas_field_meta_v5_${type}`;
  try{const saved=window.localStorage.getItem(key);if(saved)return JSON.parse(saved);}catch(e){}
  const out={};
  Object.entries(getMasterSections(type)).forEach(([section,rows])=>{
    rows.forEach(([field])=>{
      const id=`${section}||${field}`;
      out[id]={
        source:mdFieldSource[type]?.[id]||defaultFieldSource(type,section),
        note:mdFieldDescription[type]?.[id]||defaultFieldNote(type,section,field)
      };
    });
  });
  return out;
}
function saveFieldMeta(type,data){try{window.localStorage.setItem(`limas_field_meta_v5_${type}`,JSON.stringify(data));}catch(e){}}

function Detail({nav,type="Country",recordKey=""}){
  const safeType=domains[type]?type:"Country";
  const selectedRecord=getDemoRecord(safeType,recordKey);
  const selectedIndex=Math.max(0,(limasDemoData[safeType]||[]).findIndex(r=>String(r.key)===String(selectedRecord?.key)));
  const masterSections=getMasterSections(safeType);
  const [tab,setTab]=useState(()=>Object.keys(masterSections)[0]);
  const [meta,setMeta]=useState(()=>loadMasterMeta(safeType));
  const [recordMeta,setRecordMeta]=useState(()=>loadRecordMeta(safeType,recordKey));
  const [fieldMeta,setFieldMeta]=useState(()=>loadFieldMeta(safeType));
  const [editing,setEditing]=useState(false);
  const [savedAt,setSavedAt]=useState("");
  const updateField=(section,field,key,value)=>setFieldMeta(m=>({...m,[`${section}||${field}`]:{...(m[`${section}||${field}`]||{}),[key]:value}}));
  const startEdit=()=>{setMeta(loadMasterMeta(safeType));setRecordMeta(loadRecordMeta(safeType,recordKey));setFieldMeta(loadFieldMeta(safeType));setEditing(true);setSavedAt("");};
  const cancelEdit=()=>{setMeta(loadMasterMeta(safeType));setRecordMeta(loadRecordMeta(safeType,recordKey));setFieldMeta(loadFieldMeta(safeType));setEditing(false);setSavedAt("");};
  const saveChanges=()=>{saveFieldMeta(safeType,fieldMeta);const nextRecord={...recordMeta,version:Number(recordMeta.version||1)+1,lastUpdated:nowLabel(),approvedBy:"Risk Management"};saveRecordMeta(safeType,recordKey,nextRecord);setRecordMeta(nextRecord);setEditing(false);setSavedAt(nextRecord.lastUpdated);};
  const linkedProducts=domainIntegrationProducts[safeType]||[];
  return <Layout screen="detail" onNav={nav}>
    <Header title={`${safeType} • Master Limit Detail`} subtitle="Approved master limit dan parameter. Utilisasi product dikelola melalui integration layer."/>
    <div className="page">
      <section className="card">
        <div className="head">
          <div><h2>{selectedRecord?.name||selectedRecord?.sector||sampleName(safeType)}</h2><p>Unique Key: <span className="key">{selectedRecord?.key||sampleKey(safeType)}</span> <span className="chip blue" style={{marginLeft:6}}>v{recordMeta.version||1}</span></p></div>
          <div className="toolbar">{!editing?<button className="btn primary" onClick={startEdit}>Edit Field Metadata</button>:<><button className="btn ghost" onClick={cancelEdit}>Batal</button><button className="btn primary" onClick={saveChanges}>Simpan Perubahan</button></>}</div>
        </div>
        <div className="body">
          <div className="tabs">{Object.keys(masterSections).map(s=><button className={`tab ${tab===s?'active':''}`} key={s} onClick={()=>setTab(s)}>{s}</button>)}</div>
          <div className="field-table-wrap">
            <table className="table field-table"><thead><tr><th>Field</th><th>Sample Value</th><th>Source Data</th><th>Keterangan</th></tr></thead>
              <tbody>{(masterSections[tab]||[]).map(([f,v])=>{
                const id=`${tab}||${f}`;
                const fm=fieldMeta[id]||{source:mdFieldSource[safeType]?.[id]||defaultFieldSource(safeType,tab),note:mdFieldDescription[safeType]?.[id]||defaultFieldNote(safeType,tab,f)}; const displayValue=masterFieldValue(safeType,tab,f,v,selectedRecord,selectedIndex);
                return <tr key={f}><td><b>{f}</b></td><td>{displayValue}</td><td>{editing?<input className="input compact field-input" value={fm.source||""} onChange={e=>updateField(tab,f,"source",e.target.value)}/>:<span className="source-text">{fm.source||"—"}</span>}</td><td>{editing?<textarea className="textarea compact-area" value={fm.note||""} onChange={e=>updateField(tab,f,"note",e.target.value)}/>:<span className="note-text">{fm.note||"—"}</span>}</td></tr>;
              })}</tbody>
            </table>
          </div>
          <div className="field-help">Master Limit Detail hanya menyimpan master limit/parameter. Product exposure, outstanding dan utilisasi tidak direplikasi di sini.</div>
        </div>
      </section>
      <section className="card">
        <div className="head"><div><h2>Linked Product Integration</h2><p>Hanya ringkasan koneksi; detail source field dikelola pada Product Source & Mapping.</p></div><button className="btn secondary" onClick={()=>nav('products')}>Buka Product Mapping</button></div>
        <div className="body"><div className="integration-chip-grid">{linkedProducts.map(p=><div className="mini integration-chip" key={p}><b>{integrationLabel(p)}</b><div style={{fontSize:10,color:"var(--muted)",marginTop:4}}>Product utilization terintegrasi • {p==="CREDIT LINE"?"Commercial + Treasury scope":"linked exposure"}</div></div>)}</div></div>
      </section>
      <section className="card">
        <div className="head"><div><h2>Data Provenance</h2><p>Provenance master limit; Source Data dan Keterangan tersedia per field.</p></div>{savedAt&&<span className="chip blue">Tersimpan {savedAt}</span>}</div>
        <div className="body"><div className="provenance-grid">
          <div className="provenance-box"><span>Sumber Utama</span><b>{meta.source||"—"}</b><small>{meta.dataset||"Dataset / report belum diisi"}</small></div>
          <div className="provenance-box"><span>Source System</span><b>{meta.system||"—"}</b><small>Periode: {meta.period||"—"}</small></div>
          <div className="provenance-box"><span>Data Owner</span><b>{meta.owner||"—"}</b><small>Approved by: {recordMeta.approvedBy||"—"}</small></div>
          <div className="provenance-box"><span>Last Updated</span><b>{meta.lastUpdated||"—"}</b><small>Version master: v{recordMeta.version||1}</small></div>
        </div><div className="source-note"><b>Konteks Source</b><div>{meta.sourceNote||"Belum ada catatan source."}</div></div></div>
      </section>
    </div>
  </Layout>
}


function getProductMeta(productId){
  return typeof productMasterCatalog!=="undefined" ? productMasterCatalog.find(p=>p.id===productId) : null;
}
function productIntegratedDomains(productId){
  return Object.entries(domainIntegrationProducts).filter(([,products])=>products.includes(productId)).map(([domain])=>domain);
}
function sourceName(p){return getProductMeta(p)?.sheet||p}
function sourceKey(p){return getProductMeta(p)?.key||"—"}
function sourceExposure(p){return getProductMeta(p)?.exposure||"—"}

const productMasterCatalog=[
  {id:"CASHLOAN",label:"Cash Loan",sheet:"CASHLOAN",key:"no_cus / no_rek / code",exposure:"total_bade",source:"master_dataproduk.xlsx • CASHLOAN",note:"Country mapping melalui Project Location / Country Code. Workbook juga mencatat kebutuhan konversi IDR."},
  {id:"NON CASH LOAN",label:"Non Cash Loan",sheet:"NON CASH LOAN",key:"CUSTID / Swift Code / Country Code",exposure:"EQVIDR / BALANCE",source:"master_dataproduk.xlsx • NON CASH LOAN",note:"Workbook mencatat modul EXCO dan EPLC serta country judgment berdasarkan counterparty."},
  {id:"CREDIT LINE",label:"Credit Line",sheet:"Credit Line (CommLine and TL)",key:"Swift Code Vlookup / Code",exposure:"Comm Line Utilisasi + Treasury Line Utilisasi",source:"master_dataproduk.xlsx • Credit Line (CommLine and TL)",note:"Commercial Line dan Treasury Line digabung dalam satu source sheet dan satu tab monitoring."},
  {id:"Investment Line",label:"Investment Line",sheet:"Investment Line",key:"Nama Bank + Entity + Swiftcode",exposure:"Amount Invesment Line",source:"master_dataproduk.xlsx • Investment Line",note:"Pooling untuk eksposur produk/fasilitas yang belum termapping; workbook memberi kebutuhan frekuensi Monthly pada sample."},
  {id:"BONDS",label:"Bonds",sheet:"BONDS",key:"Securities Name + Issuer Country",exposure:"Amount Eq. IDR Juta",source:"master_dataproduk.xlsx • BONDS",note:"Country limit hit pada issuer selain Indonesia; limit dapat kembali setelah Maturity Date."},
  {id:"NOSTRO",label:"Nostro",sheet:"NOSTRO",key:"SwfitCode / Bank Country",exposure:"Balance",source:"master_dataproduk.xlsx • NOSTRO",note:"Country berdasarkan trim Swift Code; balance masih kurs asli dan perlu konversi kurs tengah NTR."},
  {id:"Nominal Pertanggungan",label:"Nominal Pertanggungan",sheet:"CIL_MONITORING",key:"Perusahaan Asuransi + Entitas",exposure:"Nominal Pertanggungan 2025 / Proyeksi 2026",source:"master_reportMonitoringLimit.xlsx • CIL_MONITORING",note:"Digunakan untuk monitoring utilisasi CIL. Utilisasi membandingkan Nominal Pertanggungan terhadap CIL. Source berasal dari monitoring CIL, bukan workbook master_dataproduk."}
];

const creditLineGroups={
  "Commercial Line":productFields["COMMERCIAL LINE (CRDT)"]||[],
  "Treasury Line":productFields["TREASURY LINE (CRDT)"]||[]
};
const creditLineSamples={
  "Commercial Line":productSample["COMMERCIAL LINE (CRDT)"]||{},
  "Treasury Line":productSample["TREASURY LINE (CRDT)"]||{}
};
const creditLineFields=creditLineGroups["Commercial Line"];
const creditLineTreasuryOnly=new Set(["Treasury DN","Treasury DN Utilisasi","Treasury LN","Treasury LN Utilisasi","Treasury Line Total","Treasury Line Total Utilisasi","TDN","TDN Utilisasi","TLN","TLN Utilisasi","Treasury Line","Total Utilisasi","CDN","CDN Utilisasi","CLN","CLN Utilisasi"]);
const creditLineCommercialOnly=new Set(["Comm DN","Comm DN Utilisasi","Comm LN","Comm LN Utilisasi","Comm Line Total","Comm Line Total Utilisasi"]);
const creditLineCommonOnly=new Set(["No","Nama","Swift Code","Swift Code Vlookup","Code","Aging Schedule RM","Negara","Bank","RM","Dept.","BMFIR","Fitch","Moody's","S&P","Corporate Card","Credit Line Total","Credit Line Total Utilisasi"]);


const productTabSource={
  "CASHLOAN":"CASHLOAN","NON CASH LOAN":"NON CASH LOAN","CREDIT LINE":"Credit Line (CommLine and TL)",
  "Investment Line":"Investment Line","BONDS":"BONDS","NOSTRO":"NOSTRO","Nominal Pertanggungan":"CIL_MONITORING"
};
const productTabFields={
  "CASHLOAN":productFields["CASHLOAN"]||[],
  "NON CASH LOAN":productFields["NON CASH LOAN"]||[],
  "Investment Line":productFields["Investment Line"]||[],
  "BONDS":productFields["BONDS"]||[],
  "NOSTRO":productFields["NOSTRO"]||[],
  "Nominal Pertanggungan":[
    "No","Perusahaan Asuransi","Jenis Prudk Asuransi","Entitas","EIL Entitas (Rp Juta)",
    "Nominal Pertanggungan 2025 (Rp Juta)","Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)",
    "Utilisasi EIL (%)","CIL (Rp Juta)","CIT (Rp Juta)","Utilisasi CIL (%)",
    "% Utilisasi (Nominal Pertanggungan/CIL)","% Utilisasi Proyeksi (Nominal Pertanggungan/CIL)",
    "Skor Akreditasi (PCP)","Klasifikasi EWS (PCP)","Status / Rekomendasi Action Plan"
  ]
};
const productFieldNotes={
  "CASHLOAN":{
    project_location:"Country mapping berdasarkan lokasi proyek.",
    code:"Country Code sebagai key mapping.",
    total_limit:"Total limit rekening/fasilitas.",
    total_bade:"Total outstanding/BADE yang digunakan sebagai exposure."
  },
  "NON CASH LOAN":{
    "Swift Code":"Identifier counterparty bank.",
    "CUSTID":"Identifier CIF/customer.",
    "CPNM":"Nama counterparty yang digunakan untuk country judgment.",
    "Country Code":"Country Code hasil mapping counterparty.",
    "EQVIDR":"Nilai ekuivalen IDR untuk exposure.",
    "BALANCE":"Saldo/transaksi outstanding yang menjadi referensi exposure."
  },
  "Investment Line":{
    "Jenis Invesment Line":"Jenis fasilitas investment line.",
    "Amount Invesment Line":"Nominal investment line.",
    "catatan : baru sebagai pooling untuk eksposur produk/fasilitas yang belum termapping sebagai apa":"Catatan pooling untuk fasilitas yang belum termapping."
  },
  "BONDS":{
    "Issuer Country":"Negara issuer untuk country limit.",
    "Amount Eq. IDR Juta":"Exposure ekuivalen IDR.",
    "Maturity Date":"Tanggal maturity; workbook mencatat limit dapat kembali setelah maturity."
  },
  "NOSTRO":{
    "Bank Country":"Country hasil trim Swift Code.",
    "Balance":"Balance dalam kurs asli; workbook mencatat kebutuhan konversi menggunakan kurs tengah NTR."
  },
  "Nominal Pertanggungan":{
    "Perusahaan Asuransi":"Nama perusahaan asuransi pada monitoring CIL.",
    "Jenis Prudk Asuransi":"Jenis produk asuransi yang direferensikan pada CIL.",
    "Entitas":"Entitas Bank Mandiri yang memiliki nominal pertanggungan.",
    "EIL Entitas (Rp Juta)":"EIL entitas yang menjadi denominator utilisasi EIL.",
    "Nominal Pertanggungan 2025 (Rp Juta)":"Nominal pertanggungan 2025 sebagai exposure untuk monitoring CIL.",
    "Proyeksi Total Nominal Pertanggungan 2026 (10% BMRI, 7.5% PA) (Rp Juta)":"Proyeksi nominal pertanggungan 2026.",
    "Utilisasi EIL (%)":"Utilisasi terhadap EIL entitas pada monitoring CIL.",
    "CIL (Rp Juta)":"Consolidated Insurance Limit sebagai denominator utilisasi.",
    "CIT (Rp Juta)":"Consolidated Insurance Threshold sebagai parameter monitoring.",
    "Utilisasi CIL (%)":"Utilisasi CIL pada monitoring terhadap CIT.",
    "% Utilisasi (Nominal Pertanggungan/CIL)":"Utilisasi utama: Nominal Pertanggungan 2025 dibandingkan dengan CIL.",
    "% Utilisasi Proyeksi (Nominal Pertanggungan/CIL)":"Utilisasi proyeksi: Proyeksi Total Nominal Pertanggungan 2026 dibandingkan dengan CIL.",
    "Status / Rekomendasi Action Plan":"Status hasil monitoring dan rekomendasi action plan."
  }
};

function productMetaKey(tab,group,field){return `limas_product_field_meta_v2_${tab}||${group||"Default"}||${field}`;}
function loadProductFieldMeta(tab,group,field){
  const key=productMetaKey(tab,group,field);
  try{
    const saved=window.localStorage.getItem(key);
    if(saved)return JSON.parse(saved);
  }catch(e){}
  const sheet=productTabSource[tab]||tab;
  const note=productFieldNotes[tab]?.[field]||(
    tab==="CREDIT LINE"
      ? `${group} field dari source sheet Credit Line (CommLine and TL).`
      : `Field ${field} digunakan sebagai source data ${tab}.`
  );
  return {source:`master_dataproduk.xlsx • ${sheet}`,note};
}
function saveProductFieldMeta(tab,group,field,meta){
  try{window.localStorage.setItem(productMetaKey(tab,group,field),JSON.stringify(meta));}catch(e){}
}
function catalogMetaKey(id){return `limas_product_catalog_v2_${id}`;}
function loadProductCatalogMeta(item){
  try{
    const saved=window.localStorage.getItem(catalogMetaKey(item.id));
    if(saved)return JSON.parse(saved);
  }catch(e){}
  return {source:item.source,note:item.note};
}
function saveProductCatalogMeta(item,meta){
  try{window.localStorage.setItem(catalogMetaKey(item.id),JSON.stringify(meta));}catch(e){}
}

function CreditLineFieldTable(){
  const fields=creditLineFields;
  const [editing,setEditing]=useState(false);
  const buildDraft=()=>Object.fromEntries(fields.map(f=>[f,loadProductFieldMeta("CREDIT LINE","Combined",f)]));
  const [draft,setDraft]=useState(buildDraft);
  React.useEffect(()=>{setEditing(false);setDraft(buildDraft())},[]);
  const update=(f,key,value)=>setDraft(m=>({...m,[f]:{...(m[f]||{}),[key]:value}}));
  const save=()=>{fields.forEach(f=>saveProductFieldMeta("CREDIT LINE","Combined",f,draft[f]||{}));setEditing(false)};
  const cancel=()=>{setDraft(buildDraft());setEditing(false)};
  const sample=(f,side)=>{
    const source=creditLineSamples["Commercial Line"]||{};
    const value=source[f];
    if(creditLineTreasuryOnly.has(f)) return side==="treasury" ? (value===0?0:(value||"—")) : "—";
    if(creditLineCommercialOnly.has(f)) return side==="commercial" ? (value===0?0:(value||"—")) : "—";
    if(creditLineCommonOnly.has(f)) return side==="commercial" ? (value===0?0:(value||"—")) : "—";
    if(side==="commercial") return value===0?0:(value||"—");
    return "—";
  };
  return <div className="product-field-block">
    <div className="product-field-toolbar">
      <div><b>Credit Line • Source Fields Lengkap</b><span>Satu tabel dari source sheet Credit Line (CommLine and TL). Field asli dipertahankan; value diklasifikasikan ke Common / Commercial / Treasury.</span></div>
      {!editing?<button className="btn primary" onClick={()=>setEditing(true)}>Edit Field Metadata</button>:<div className="toolbar"><button className="btn ghost" onClick={cancel}>Batal</button><button className="btn primary" onClick={save}>Simpan Perubahan</button></div>}
    </div>
    <div className="table-wrap product-field-wrap">
      <table className="table field-table product-credit-table">
        <thead><tr><th>Field</th><th>Commercial Line</th><th>Treasury Line</th><th>Source Data</th><th>Keterangan</th></tr></thead>
        <tbody>{fields.map(f=>{
          const m=draft[f]||{};
          return <tr key={f}>
            <td><b>{f}</b></td>
            <td>{sample(f,"commercial")}</td>
            <td>{sample(f,"treasury")}</td>
            <td>{editing?<input className="input compact field-input" value={m.source||""} onChange={e=>update(f,"source",e.target.value)}/>:<span className="source-text">{m.source||"—"}</span>}</td>
            <td>{editing?<textarea className="textarea compact-area" value={m.note||""} onChange={e=>update(f,"note",e.target.value)}/>:<span className="note-text">{m.note||"—"}</span>}</td>
          </tr>
        })}</tbody>
      </table>
    </div>
  </div>;
}

function ProductFieldTable({tab,group="",fields,sample}){
  const buildDraft=()=>Object.fromEntries(fields.map(f=>[f,loadProductFieldMeta(tab,group,f)]));
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(buildDraft);
  React.useEffect(()=>{setEditing(false);setDraft(buildDraft())},[tab,group,fields.join("|")]);
  const update=(f,key,value)=>setDraft(m=>({...m,[f]:{...(m[f]||{}),[key]:value}}));
  const save=()=>{fields.forEach(f=>saveProductFieldMeta(tab,group,f,draft[f]||{}));setEditing(false)};
  const cancel=()=>{setDraft(buildDraft());setEditing(false)};
  return <div className="product-field-block">
    <div className="product-field-toolbar">
      <div><b>Source Fields Lengkap</b><span>Field + Sample Value + Source Data + Keterangan</span></div>
      {!editing?<button className="btn primary" onClick={()=>setEditing(true)}>Edit Field Metadata</button>:<div className="toolbar"><button className="btn ghost" onClick={cancel}>Batal</button><button className="btn primary" onClick={save}>Simpan Perubahan</button></div>}
    </div>
    <div className="table-wrap product-field-wrap">
      <table className="table field-table product-field-table">
        <thead><tr><th>Field</th><th>Sample Value</th><th>Source Data</th><th>Keterangan</th></tr></thead>
        <tbody>{fields.map(f=>{
          const m=draft[f]||{};
          return <tr key={f}>
            <td><b>{f}</b></td><td>{sample[f]===0?0:(sample[f]||"—")}</td>
            <td>{editing?<input className="input compact field-input" value={m.source||""} onChange={e=>update(f,"source",e.target.value)}/>:<span className="source-text">{m.source||"—"}</span>}</td>
            <td>{editing?<textarea className="textarea compact-area" value={m.note||""} onChange={e=>update(f,"note",e.target.value)}/>:<span className="note-text">{m.note||"—"}</span>}</td>
          </tr>
        })}</tbody>
      </table>
    </div>
  </div>;
}

function ProductCatalog(){
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(()=>Object.fromEntries(productMasterCatalog.map(item=>[item.id,loadProductCatalogMeta(item)])));
  const update=(id,key,value)=>setDraft(m=>({...m,[id]:{...(m[id]||{}),[key]:value}}));
  const save=()=>{productMasterCatalog.forEach(item=>saveProductCatalogMeta(item,draft[item.id]||{}));setEditing(false)};
  const cancel=()=>{setDraft(Object.fromEntries(productMasterCatalog.map(item=>[item.id,loadProductCatalogMeta(item)])));setEditing(false)};
  return <section className="card">
    <div className="head">
      <div><h2>Product Universe</h2><p>Registry universe produk/source untuk integration. Ini bukan repository Master Limit dan tidak menyimpan current utilization.</p></div>
      {!editing?<button className="btn primary" onClick={()=>setEditing(true)}>Edit Product Metadata</button>:<div className="toolbar"><button className="btn ghost" onClick={cancel}>Batal</button><button className="btn primary" onClick={save}>Simpan Perubahan</button></div>}
    </div>
    <div className="body">
      <div className="table-wrap product-master-wrap">
        <table className="table product-master-table">
          <thead><tr><th>Product</th><th>Source Sheet</th><th>Primary Key</th><th>Integrated to Domain</th><th>Utilization Field</th><th>Source Data</th><th>Keterangan</th></tr></thead>
          <tbody>{productMasterCatalog.map(item=>{
            const m=draft[item.id]||{};
            return <tr key={item.id}>
              <td><b>{item.label}</b></td><td>{item.sheet}</td><td>{item.key}</td><td>{productIntegratedDomains(item.id).join(" / ")|| (item.id==="Investment Line"?"Future / Scoped":"—")}</td><td>{item.exposure}</td>
              <td>{editing?<input className="input compact field-input" value={m.source||""} onChange={e=>update(item.id,"source",e.target.value)}/>:<span className="source-text">{m.source||"—"}</span>}</td>
              <td>{editing?<textarea className="textarea compact-area" value={m.note||""} onChange={e=>update(item.id,"note",e.target.value)}/>:<span className="note-text">{m.note||"—"}</span>}</td>
            </tr>
          })}</tbody>
        </table>
      </div>
      <div className="field-help">Product Universe menjadi registry source/integration. Nominal Pertanggungan untuk CIL berasal dari CIL_MONITORING; Investment Line masih Future / Scoped. Nilai utilization aktual tetap merupakan data inbound/integrated, bukan master limit.</div>
    </div>
  </section>;
}

function ProductUsage({view}){
  const domainsUsing=productIntegratedDomains(view);
  const sourceDomainRows=domainsUsing.map(d=>[d,integrationTargets[d]?.[view]||"Target mapping belum dilengkapi",getProductMeta(view)?.exposure||"—"]);
  return <div className="product-mapping-grid">
    <div><div className="section-title">Integration Target</div>{sourceDomainRows.map(([d,target,exposure])=><div className="mini" key={d}><b>{d}</b><div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Target Key: {target} • Utilization Field: {exposure}</div></div>)}</div>
    <div><div className="section-title">Data Quality</div><div className="mini">Unique Key <Status v="Normal"/></div><div className="mini" style={{marginTop:8}}>Mapping <Status v="Normal"/></div><div className="mini" style={{marginTop:8}}>Source <span>{getProductMeta(view)?.sheet||"—"}</span></div></div>
  </div>;
}


function Products({nav}){
  const [view,setView]=useState("catalog");
  const limitTabs=[
    ["catalog","Master Data Produk"],["CASHLOAN","Cash Loan"],["NON CASH LOAN","Non Cash Loan"],["CREDIT LINE","Credit Line"],["Nominal Pertanggungan","Nominal Pertanggungan (CIL)"],["Investment Line","Investment Line"],["BONDS","Bonds"],["NOSTRO","Nostro"]
  ];
  const info=productMasterCatalog.find(x=>x.id===view);
  return <Layout screen="products" onNav={nav}>
    <Header title="Product Universe & Integration" subtitle="Universe product + source schema + integration mapping. Tidak menyimpan master limit maupun current utilization."/>
    <div className="page">
      <section className="card">
        <div className="body">
          <div className="tabs product-tabs">{limitTabs.map(([id,label])=><button className={`tab ${view===id?'active':''}`} key={id} onClick={()=>setView(id)}>{label}</button>)}</div>
        </div>
      </section>

      {view==="catalog"&&<ProductCatalog/>}

      {info&&<section className="card">
        <div className="head">
          <div><h2>{info.label}</h2><p>Source sheet: <b>{info.sheet}</b> • Primary Key: <span className="key">{info.key}</span></p></div>
        </div>
        <div className="body">
          {view==="CREDIT LINE"
            ? <CreditLineFieldTable/>
            : <ProductFieldTable key={view} tab={view} fields={productTabFields[view]||[]} sample={productSample[view]||{}}/>
          }
          <ProductUsage view={view}/>
        </div>
      </section>}
    </div>
  </Layout>;
}

class AppErrorBoundary extends React.Component{
  constructor(props){super(props);this.state={error:null}}
  static getDerivedStateFromError(error){return {error}}
  componentDidCatch(error){console.error("LIMAS runtime error",error)}
  render(){
    if(this.state.error) return <div style={{minHeight:"100vh",background:"#061126",color:"#fff",padding:"32px",fontFamily:"Inter,Segoe UI,Arial,sans-serif"}}><h2 style={{marginTop:0}}>LIMAS Runtime Error</h2><p style={{color:"#ffb4b4"}}>{this.state.error?.message||"Unknown error"}</p><button className="btn primary" onClick={()=>window.location.reload()}>Reload</button></div>;
    return this.props.children;
  }
}
function App(){
  const [login,setLogin]=useState(true);
  const [screen,setScreen]=useState("dashboard");
  const [sel,setSel]=useState("Country");
  const [selKey,setSelKey]=useState("");
  const nav=(id,payload)=>{
    if(payload && payload.type){setSel(payload.type); setSelKey(payload.key||"");}
    setScreen(id);
  };
  const navDetail=(type,key)=>{setSel(type);setSelKey(key);setScreen("detail")};
  if(!login) return <Login go={()=>setLogin(true)}/>;
  if(screen==="dashboard") return <Dashboard nav={nav}/>;
  if(screen==="setup") return <Setup nav={nav} setSel={setSel}/>;
  if(screen==="detail") return <Detail nav={nav} type={sel} recordKey={selKey} key={sel+":"+selKey} />;
  if(screen==="products") return <Products nav={nav}/>;
  if(screen==="report") return <Report nav={nav}/>;
  if(screen==="warning") return <Warning nav={nav}/>;
  if(["Country","CCL","MLK","CIL","LPG"].includes(screen)) return <Monitor type={screen} nav={nav}/>;
  return <Dashboard nav={nav}/>;
}

export default function Limas(props: ILimasProps): React.ReactElement {
  return (
    <div className="limas-spfx-root">
      <style>{LIMAS_CSS}</style>
      <AppErrorBoundary><App /></AppErrorBoundary>
    </div>
  );
}
