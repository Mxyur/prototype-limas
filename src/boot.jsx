import React from 'react';
import {createRoot} from 'react-dom/client';

const root=document.getElementById('root');

function showBootError(error){
  const message=error?.stack||error?.message||String(error);
  console.error('LIMAS boot error',error);
  root.innerHTML=`<div style="min-height:100vh;background:#061126;color:#fff;padding:32px;font-family:Inter,Segoe UI,Arial,sans-serif"><div style="max-width:900px;margin:40px auto;background:#111b2f;border:1px solid #2a3b59;border-radius:16px;padding:28px;box-shadow:0 20px 60px rgba(0,0,0,.35)"><h1 style="margin:0 0 10px">LIMAS gagal dimuat</h1><p style="color:#aebbd0">Runtime/module error terjadi sebelum aplikasi React berhasil start.</p><pre style="white-space:pre-wrap;word-break:break-word;background:#07101f;border:1px solid #263752;border-radius:10px;padding:16px;color:#ffb4b4;font-size:12px;overflow:auto">${message.replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))}</pre><button onclick="location.reload()" style="margin-top:12px;height:40px;padding:0 14px;border:0;border-radius:8px;background:#1b73e8;color:#fff;font-weight:800">Reload</button></div></div>`;
}

import('./main.jsx').catch(showBootError);
