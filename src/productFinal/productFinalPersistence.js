const NAMESPACE = 'limas_product_final_operational_v1';
const KEYS = {
  reference: `${NAMESPACE}:referenceMasters`,
  referenceMeta: `${NAMESPACE}:referenceMeta`,
  limits: `${NAMESPACE}:limitSetups`,
  limitMeta: `${NAMESPACE}:limitMeta`,
  actions: `${NAMESPACE}:limitActions`,
  canonical: `${NAMESPACE}:canonicalRefresh`
};

function storage(){
  try{return typeof window!=='undefined'&&window.localStorage?window.localStorage:null;}catch{return null;}
}
function read(key,fallback){const s=storage();if(!s)return fallback;try{const v=s.getItem(key);return v?JSON.parse(v):fallback;}catch{return fallback;}}
function write(key,value){const s=storage();if(!s)return false;try{s.setItem(key,JSON.stringify(value));return true;}catch{return false;}}

export function loadReferenceMasters(fallback){return read(KEYS.reference,fallback);}
export function saveReferenceMasters(value){return write(KEYS.reference,value);}
export function loadReferenceMeta(fallback={}){return read(KEYS.referenceMeta,fallback);}
export function saveReferenceMeta(value){return write(KEYS.referenceMeta,value);}
export function loadLimitSetups(fallback){return read(KEYS.limits,fallback);}
export function saveLimitSetups(value){return write(KEYS.limits,value);}
export function loadLimitMeta(fallback={}){return read(KEYS.limitMeta,fallback);}
export function saveLimitMeta(value){return write(KEYS.limitMeta,value);}
export function loadLimitActions(fallback=[]){return read(KEYS.actions,fallback);}
export function saveLimitActions(value){return write(KEYS.actions,value);}
export function loadCanonicalRefresh(fallback={}){return read(KEYS.canonical,fallback);}
export function saveCanonicalRefresh(value){return write(KEYS.canonical,value);}

export function clearProductFinalOperationalStore(){const s=storage();if(!s)return;Object.values(KEYS).forEach(k=>{try{s.removeItem(k);}catch{}});}
export {KEYS as PRODUCT_FINAL_PERSISTENCE_KEYS,NAMESPACE as PRODUCT_FINAL_PERSISTENCE_NAMESPACE};
