export const REFERENCE_MASTER_DEFINITIONS = [
  {id:'ENTITY',label:'Entity Master',keyFields:['entityCode'],fields:['entityCode','entityName','entityType','countryCode','parentEntity','consolidationStatus','activeFlag'],seed:'entity'},
  {id:'GROUP',label:'Group Master',keyFields:['groupId'],fields:['groupId','groupName','holding','subGroup','activeFlag'],seed:'group'},
  {id:'COUNTERPARTY',label:'Counterparty Master',keyFields:['counterpartyId'],fields:['counterpartyId','counterpartyName','countryCode','category','activeFlag'],seed:'counterparty'},
  {id:'COUNTRY',label:'Country Master',keyFields:['countryCode'],fields:['countryCode','countryName','foreignMonitoringEligible','activeFlag'],seed:'country'},
  {id:'INDUSTRY',label:'Industry Master',keyFields:['industryCode'],fields:['industryCode','industryName','groupingCode','groupingName','activeFlag'],seed:'industry'},
  {id:'GROUPING',label:'Industry Grouping',keyFields:['groupingCode'],fields:['groupingCode','groupingName','activeFlag'],seed:'grouping'},
  {id:'REGION',label:'Region Master',keyFields:['regionCode'],fields:['regionCode','regionName','legacyScope','regionType','sequence','activeFlag'],seed:'region'},
  {id:'SEGMENT',label:'Segment Master',keyFields:['segmentCode'],fields:['segmentCode','segmentName','segmentType','sequence','activeFlag'],seed:'segment'},
  {id:'IC_NASIONAL',label:'IC Nasional',keyFields:['icCode'],fields:['icCode','icName','displayOrder','visual','ruleCode','activeFlag'],seed:'ic'},
  {id:'IC_SEGWIL',label:'IC Wilayah Segmen',keyFields:['segwilKey'],fields:['segwilKey','sectorCode','regionCode','segmentCode','icNasionalCode','icWilayahSegmenCode','status'],seed:'segwil'},
  {id:'PRODUCT_MAPPING',label:'Product Eligibility / Mapping',keyFields:['mappingId'],fields:['mappingId','productId','sourceField','sourceValue','targetMaster','targetKey','mappingStatus'],seed:'mapping'}
];

const s=v=>String(v??'').trim();
const up=v=>s(v).toUpperCase();
const bool=v=>v===true||up(v)==='TRUE'||up(v)==='Y'||up(v)==='YES'||up(v)==='1';
const iso=v=>s(v)||null;

export function masterDefinition(id){return REFERENCE_MASTER_DEFINITIONS.find(x=>x.id===id)||null;}
export function businessKey(row,definition){return (definition?.keyFields||[]).map(k=>s(row?.[k])).join('|').toUpperCase();}

export function normalizeMasterRow(masterId,row={}){
  const d=masterDefinition(masterId); if(!d) throw new Error('Unknown master: '+masterId);
  const out={operation:s(row.operation)||'CREATE'}; d.fields.forEach(f=>{out[f]=row[f]===undefined?'':row[f]});
  if('activeFlag' in out) out.activeFlag=row.activeFlag===undefined||row.activeFlag===''?true:bool(row.activeFlag);
  if('foreignMonitoringEligible' in out) out.foreignMonitoringEligible=row.foreignMonitoringEligible===undefined||row.foreignMonitoringEligible===''?true:bool(row.foreignMonitoringEligible);
  if('sequence' in out && out.sequence!=='') out.sequence=Number(out.sequence);
  if(masterId==='ENTITY'){out.entityCode=up(out.entityCode);out.entityName=s(out.entityName);out.entityType=up(out.entityType);out.countryCode=up(out.countryCode);}
  if(masterId==='GROUP'){out.groupId=s(out.groupId);}
  if(masterId==='COUNTERPARTY'){out.counterpartyId=up(out.counterpartyId);out.countryCode=up(out.countryCode);}
  if(masterId==='COUNTRY') out.countryCode=up(out.countryCode);
  if(['INDUSTRY','GROUPING','REGION','SEGMENT','IC_NASIONAL'].includes(masterId)) out[d.keyFields[0]]=up(out[d.keyFields[0]]);
  if(masterId==='IC_SEGWIL') out.segwilKey=s(out.segwilKey);
  return out;
}

export function validateMasterRows(masterId,rows=[],existingRows=[]){
  const d=masterDefinition(masterId); if(!d) return {valid:false,errors:[{code:'MASTER_UNKNOWN',message:'Unknown master'}],rows:[]};
  const errors=[],normalized=[]; const seen=new Set();
  (rows||[]).forEach((raw,index)=>{
    const row=normalizeMasterRow(masterId,raw); normalized.push(row); const key=businessKey(row,d);
    if(!key || d.keyFields.some(k=>!s(row[k]))) errors.push({row:index+1,code:'BUSINESS_KEY_MISSING',message:`Missing business key: ${d.keyFields.join(', ')}`});
    if(seen.has(key)) errors.push({row:index+1,code:'DUPLICATE_IN_UPLOAD',message:`Duplicate business key: ${key}`});
    seen.add(key);
    const existing=(existingRows||[]).find(x=>businessKey(x,d)===key);
    const operation=up(row.operation)||'CREATE';
    if(!['CREATE','UPDATE'].includes(operation)) errors.push({row:index+1,code:'OPERATION_INVALID',message:'Operation must be CREATE or UPDATE'});
    if(existing && operation!=='UPDATE') errors.push({row:index+1,code:'DUPLICATE_EXISTING',message:`Business key already exists: ${key}. Use UPDATE for maintenance.`});
    if(operation==='UPDATE' && !existing) errors.push({row:index+1,code:'UPDATE_TARGET_MISSING',message:`No existing master for UPDATE key: ${key}`});
    if(masterId==='ENTITY' && !s(row.entityName)) errors.push({row:index+1,code:'ENTITY_NAME_REQUIRED',message:'Entity name is required'});
    if(masterId==='GROUP' && !s(row.groupName)) errors.push({row:index+1,code:'GROUP_NAME_REQUIRED',message:'Group name is required'});
    if(masterId==='COUNTERPARTY' && !s(row.counterpartyName)) errors.push({row:index+1,code:'COUNTERPARTY_NAME_REQUIRED',message:'Counterparty name is required'});
    if(masterId==='COUNTRY' && !/^[A-Z]{2}$/.test(up(row.countryCode))) errors.push({row:index+1,code:'COUNTRY_CODE_INVALID',message:'Country code must be ISO-2'});
    if(masterId==='IC_NASIONAL' && up(row.visual)==='BLACK' && up(row.ruleCode)!=='PLASTIK_ONLY') errors.push({row:index+1,code:'IC_RULE_INVALID',message:'BLACK/WASPADA requires PLASTIK_ONLY'});
  });
  return {valid:errors.length===0,errors,rows:normalized};
}

export function parseCsv(text=''){
  const lines=text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean); if(!lines.length)return [];
  const parseLine=line=>{const out=[];let cur='',quote=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(quote&&line[i+1]==='"'){cur+='"';i++;}else quote=!quote;}else if(c===','&&!quote){out.push(cur.trim());cur='';}else cur+=c;}out.push(cur.trim());return out;};
  const headers=parseLine(lines[0]); return lines.slice(1).map(line=>{const vals=parseLine(line),row={};headers.forEach((h,i)=>row[h]=vals[i]??'');return row;});
}

export function buildSeedReferenceMasters(source={}){
  const data=source.limasDemoData||{};
  const entities=(source.entityMaster||[]).map(x=>normalizeMasterRow('ENTITY',{...x,entityCode:x.entityCode,entityName:x.entityName,entityType:x.entityType}));
  const groups=[]; const seenGroups=new Set(); (data.MLK||[]).forEach(x=>{const id=s(x.group);if(id&&!seenGroups.has(id)){seenGroups.add(id);groups.push(normalizeMasterRow('GROUP',{groupId:id,groupName:id,holding:x.groupUsahaHolding||id,subGroup:x.subGroup||id,activeFlag:true}));}});
  const counterparties=(data.CCL||[]).map(x=>normalizeMasterRow('COUNTERPARTY',{counterpartyId:x.key,counterpartyName:x.name,countryCode:x.country,category:x.category,activeFlag:true}));
  const countries=[...new Map((data.Country||[]).map(x=>[up(x.key),normalizeMasterRow('COUNTRY',{countryCode:x.key,countryName:x.name,foreignMonitoringEligible:up(x.key)!=='ID',activeFlag:true})])).values()];
  const industry=(source.lpgIndustryMaster||[]).map(x=>normalizeMasterRow('INDUSTRY',x));
  const grouping=[...new Map(industry.map(x=>[x.groupingCode,normalizeMasterRow('GROUPING',{groupingCode:x.groupingCode,groupingName:x.groupingName,activeFlag:true})])).values()];
  const region=(source.lpgRegionMaster||[]).map(x=>normalizeMasterRow('REGION',x));
  const segment=(source.lpgSegmentMaster||[]).map(x=>normalizeMasterRow('SEGMENT',x));
  const ic=(source.lpgIcNational||[]).map(x=>normalizeMasterRow('IC_NASIONAL',x));
  const segwil=(source.lpgSegwil||[]).map(x=>normalizeMasterRow('IC_SEGWIL',{...x,segwilKey:x.segwilKey}));
  const mapping=[];
  return {ENTITY:entities,GROUP:groups,COUNTERPARTY:counterparties,COUNTRY:countries,INDUSTRY:industry,GROUPING:grouping,REGION:region,SEGMENT:segment,IC_NASIONAL:ic,IC_SEGWIL:segwil,PRODUCT_MAPPING:mapping};
}

export const REFERENCE_MASTER_LIFECYCLE=['DRAFT','REVIEW','APPROVED','EFFECTIVE','EXPIRED','SUPERSEDED'];
