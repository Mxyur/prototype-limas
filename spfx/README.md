# LIMAS SPFx

Microsoft 365 / SharePoint Online packaging target for the LIMAS prototype.

## Architecture

- UI: React 17.0.1 inside SharePoint Framework 1.23.2
- Build: Heft-based SPFx toolchain
- Authentication: inherited from SharePoint / Microsoft 365 context
- Current data: prototype dummy data + browser localStorage
- Target: SharePoint Online first, then Teams Tab

## Local development

1. Install Node.js 22 LTS.
2. From this folder run `npm install`.
3. Change `config/serve.json` to your tenant workbench URL.
4. Run `npm start`.
5. Open the SharePoint hosted workbench and add the **LIMAS** web part.

## Package for tenant App Catalog

`npm run build`

The generated package is under `sharepoint/solution/limas-spfx.sppkg`.

## Next integration phases

- Replace prototype login with `pageContext.user`.
- Replace localStorage master metadata with SharePoint Lists.
- Store source Excel files in a SharePoint Document Library.
- Add Power Automate for validation / approval / EWS workflows.
- Connect Power BI for management reporting.

SPFx 1.23.2 is the current target for this migration. Microsoft lists SPFx 1.23.2 with Node.js 22 and React 17.0.1 compatibility.