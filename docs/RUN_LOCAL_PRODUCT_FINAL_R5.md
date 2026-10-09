# LIMAS Product Final R5 — Local Run

## PowerShell

```powershell
cd "C:\Users\lenov\Downloads\LIMAS-ProductFinal-SEQUENTIAL-R5-20261008"
node -v
npm -v
npm install
npm run audit
npm run build
npm run dev
```

The local development build now defaults to Product Final surface, so `VITE_LIMAS_SURFACE=PRODUCT_FINAL` is optional for this package.

Optional explicit mode:

```powershell
$env:VITE_LIMAS_SURFACE="PRODUCT_FINAL"
$env:VITE_LIMAS_RUNTIME_MODE="E2E"
npm run dev
```

Open:

```text
http://localhost:5173
```

Do not Git push or deploy yet. Browser acceptance must pass first.
