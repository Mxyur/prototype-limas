// LIMAS Product Final — business-specific report contracts.
// Presentation metadata only: canonical calculations remain upstream.
export const REPORT_BUSINESS_CONTRACT={
  Country:{
    title:"Country Limit Report",
    stack:["Country","Scope","Exposure","Limit","Available","Utilization","Status"],
    drilldown:["Country","Product","Exposure","Source Record"],
    setup:"Country Limit / Allocation",
    principle:"Indonesia remains in source data but is not a foreign-country monitoring object."
  },
  CCL_DIRECT:{
    title:"CCL Direct Limit Report",
    stack:["Counterparty","Entity","Direct","Inhouse","Capacity","CCL","Contractual"],
    drilldown:["Counterparty","Entity","Product / Facility","Exposure","Source Record"],
    setup:"CCL Direct Limit Allocation",
    principle:"Direct scope covers BMRI and approved participating subsidiaries."
  },
  CCL_INDIRECT:{
    title:"CCL Indirect Limit Report",
    stack:["Counterparty","Entity","Indirect","Inhouse","Capacity","CCL","Contractual"],
    drilldown:["Counterparty","Entity","Product / Facility","Exposure","Source Record"],
    setup:"CCL Indirect Limit Allocation",
    principle:"Indirect scope remains explicitly separated from Direct."
  },
  CCL:{
    title:"CCL Counterparty Monitoring",
    stack:["Counterparty","Entity Scope","Inhouse","Capacity","CCL","Contractual","Utilization"],
    drilldown:["Counterparty","Entity","Product","Exposure","Source Record"],
    setup:"CCL Limit Allocation",
    principle:"CCL and Contractual remain separate approved values."
  },
  MLK:{
    title:"MLK Entity / BMRI View",
    stack:["Holding","Sub-Group","Entity","CIF / Debtor","Product / Facility","Limit","Exposure"],
    drilldown:["Group","Entity","CIF / Debtor","Product","Facility","Exposure"],
    setup:"MLK Limit Allocation",
    principle:"Entity contributions roll to Group and must not double-count Consolidated."
  },
  MLK_CONSOLIDATED:{
    title:"MLK Consolidated Report",
    stack:["Holding","Sub-Group","Entity","Group Position","Consolidated Position","Limit","Utilization"],
    drilldown:["Group","Entity","CIF / Debtor","Product","Facility"],
    setup:"MLK Consolidated / Entity Limit Structure",
    principle:"Consolidated view is a presentation layer over canonical contributions, not an extra exposure."
  },
  CIL:{
    title:"CIL Monitoring Report",
    stack:["Insurance Company","IC","Multiplier","CIT","Entity EIL","CIL","Nominal Pertanggungan","Utilization"],
    drilldown:["Insurance Company","Entity","EIL","Nominal Pertanggungan","Source Record"],
    setup:"CIL IC / EIL Setup",
    principle:"CIT and CIL remain derived from governed IC, Multiplier and EIL inputs."
  },
  LPG:{
    title:"LPG Sector / Appetite Report",
    stack:["Industry","Grouping","Segment","Region","IC Nasional","IC Segwil","Scope","Limit Bucket","Outstanding","Utilization"],
    drilldown:["Industry","Grouping","Segment","Region","IC","Segwil","CIF / Debtor","Product","Source Record"],
    setup:"LPG Limit Allocation / Appetite Setup",
    principle:"MENARIK / NETRAL / SELEKTIF / WASPADA are business parameters; WASPADA is valid only for PLASTIK."
  }
};

export function reportBusinessContract(type){return REPORT_BUSINESS_CONTRACT[type]||REPORT_BUSINESS_CONTRACT.Country;}
