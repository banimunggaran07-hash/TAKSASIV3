var Xn=()=>{};var Zn=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Hs=function(n){let e=[],t=0,r=0;for(;t<n.length;){let s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){let a=n[t++];e[r++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){let a=n[t++],i=n[t++],o=n[t++],c=((s&7)<<18|(a&63)<<12|(i&63)<<6|o&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let a=n[t++],i=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(a&63)<<6|i&63)}}return e.join("")},er={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){let a=n[s],i=s+1<n.length,o=i?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,d=a>>2,h=(a&3)<<4|o>>4,m=(o&15)<<2|l>>6,p=l&63;c||(p=64,i||(m=64)),r.push(t[d],t[h],t[m],t[p])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Zn(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Hs(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){let a=t[n.charAt(s++)],o=s<n.length?t[n.charAt(s)]:0;++s;let l=s<n.length?t[n.charAt(s)]:64;++s;let h=s<n.length?t[n.charAt(s)]:64;if(++s,a==null||o==null||l==null||h==null)throw new zt;let m=a<<2|o>>4;if(r.push(m),l!==64){let p=o<<4&240|l>>2;if(r.push(p),h!==64){let g=l<<6&192|h;r.push(g)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},zt=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Fs=function(n){let e=Zn(n);return er.encodeByteArray(e,!0)},qt=function(n){return Fs(n).replace(/\./g,"")},Ye=function(n){try{return er.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Vs(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var $s=()=>Vs().__FIREBASE_DEFAULTS__,js=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ws=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Ye(n[1]);return e&&JSON.parse(e)},Gt=()=>{try{return Xn()||$s()||js()||Ws()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},tr=n=>Gt()?.emulatorHosts?.[n];var Jt=()=>Gt()?.config,Yt=n=>Gt()?.[`_${n}`];var de=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function T(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function nr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(T())}function rr(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function sr(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function ar(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ir(){let n=T();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function or(){try{return typeof indexedDB=="object"}catch{return!1}}function cr(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}var zs="FirebaseError",O=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=zs,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,F.prototype.create)}},F=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},s=`${this.service}/${e}`,a=this.errors[e],i=a?Ks(a,r):"Error",o=`${this.serviceName}: ${i} (${s}).`;return new O(s,o,r)}};function Ks(n,e){try{let t=0,r="";for(;t<n.length;){let s=n.indexOf("{$",t);if(s===-1){r+=n.substring(t);break}let a=n.indexOf("}",s+2);if(a===-1){r+=n.substring(t);break}let i=n.substring(s+2,a),o=e[i];r+=n.substring(t,s)+(o!=null?String(o):`<${i}?>`),t=a+1}return r}catch{return n}}function lr(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function G(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let s of t){if(!r.includes(s))return!1;let a=n[s],i=e[s];if(Qn(a)&&Qn(i)){if(!G(a,i))return!1}else if(a!==i)return!1}for(let s of r)if(!t.includes(s))return!1;return!0}function Qn(n){return n!==null&&typeof n=="object"}function ue(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function he(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[s,a]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(a)}}),e}function pe(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function dr(n,e){let t=new Kt(n,e);return t.subscribe.bind(t)}var Kt=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");qs(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Wt),s.error===void 0&&(s.error=Wt),s.complete===void 0&&(s.complete=Wt);let a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function qs(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Wt(){}var hc=14400*1e3;function S(n){return n&&n._delegate?n._delegate:n}function Xe(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ur(n){return(await fetch(n,{credentials:"include"})).ok}var D=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var te="[DEFAULT]";var Xt=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new de;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Js(e))try{this.getOrInitializeService({instanceIdentifier:te})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(t);try{let a=this.getOrInitializeService({instanceIdentifier:s});r.resolve(a)}catch{}}}}clearInstance(e=te){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=te){return this.instances.has(e)}getOptions(e=te){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[a,i]of this.instancesDeferred.entries()){let o=this.normalizeInstanceIdentifier(a);r===o&&i.resolve(s)}return s}onInit(e,t){let r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);let a=this.instances.get(r);return a&&e(a,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Gs(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=te){return this.component?this.component.multipleInstances?e:te:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Gs(n){return n===te?void 0:n}function Js(n){return n.instantiationMode==="EAGER"}var Qe=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Xt(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Ys=[],w;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(w||(w={}));var Xs={debug:w.DEBUG,verbose:w.VERBOSE,info:w.INFO,warn:w.WARN,error:w.ERROR,silent:w.SILENT},Qs=w.INFO,Zs={[w.DEBUG]:"log",[w.VERBOSE]:"log",[w.INFO]:"info",[w.WARN]:"warn",[w.ERROR]:"error"},ea=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),s=Zs[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},fe=class{constructor(e){this.name=e,this._logLevel=Qs,this._logHandler=ea,this._userLogHandler=null,Ys.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in w))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Xs[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,w.DEBUG,...e),this._logHandler(this,w.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,w.VERBOSE,...e),this._logHandler(this,w.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,w.INFO,...e),this._logHandler(this,w.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,w.WARN,...e),this._logHandler(this,w.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,w.ERROR,...e),this._logHandler(this,w.ERROR,...e)}};var ta=(n,e)=>e.some(t=>n instanceof t),hr,pr;function na(){return hr||(hr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ra(){return pr||(pr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var fr=new WeakMap,Zt=new WeakMap,mr=new WeakMap,Qt=new WeakMap,tn=new WeakMap;function sa(n){let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("success",a),n.removeEventListener("error",i)},a=()=>{t(M(n.result)),s()},i=()=>{r(n.error),s()};n.addEventListener("success",a),n.addEventListener("error",i)});return e.then(t=>{t instanceof IDBCursor&&fr.set(t,n)}).catch(()=>{}),tn.set(e,n),e}function aa(n){if(Zt.has(n))return;let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("complete",a),n.removeEventListener("error",i),n.removeEventListener("abort",i)},a=()=>{t(),s()},i=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",a),n.addEventListener("error",i),n.addEventListener("abort",i)});Zt.set(n,e)}var en={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Zt.get(n);if(e==="objectStoreNames")return n.objectStoreNames||mr.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return M(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function gr(n){en=n(en)}function ia(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Ze(this),e,...t);return mr.set(r,e.sort?e.sort():[e]),M(r)}:ra().includes(n)?function(...e){return n.apply(Ze(this),e),M(fr.get(this))}:function(...e){return M(n.apply(Ze(this),e))}}function oa(n){return typeof n=="function"?ia(n):(n instanceof IDBTransaction&&aa(n),ta(n,na())?new Proxy(n,en):n)}function M(n){if(n instanceof IDBRequest)return sa(n);if(Qt.has(n))return Qt.get(n);let e=oa(n);return e!==n&&(Qt.set(n,e),tn.set(e,n)),e}var Ze=n=>tn.get(n);function yr(n,e,{blocked:t,upgrade:r,blocking:s,terminated:a}={}){let i=indexedDB.open(n,e),o=M(i);return r&&i.addEventListener("upgradeneeded",c=>{r(M(i.result),c.oldVersion,c.newVersion,M(i.transaction),c)}),t&&i.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),o.then(c=>{a&&c.addEventListener("close",()=>a()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),o}var ca=["get","getKey","getAll","getAllKeys","count"],la=["put","add","delete","clear"],nn=new Map;function br(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(nn.get(e))return nn.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,s=la.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ca.includes(t)))return;let a=async function(i,...o){let c=this.transaction(i,s?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(o.shift())),(await Promise.all([l[t](...o),s&&c.done]))[0]};return nn.set(e,a),a}gr(n=>({...n,get:(e,t,r)=>br(e,t)||n.get(e,t,r),has:(e,t)=>!!br(e,t)||n.has(e,t)}));var sn=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(da(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function da(n){return n.getComponent()?.type==="VERSION"}var an="@firebase/app",vr="0.16.3";var $=new fe("@firebase/app"),ua="@firebase/app-compat",ha="@firebase/analytics-compat",pa="@firebase/analytics",fa="@firebase/app-check-compat",ma="@firebase/app-check",ga="@firebase/auth",ba="@firebase/auth-compat",ya="@firebase/database",va="@firebase/data-connect",wa="@firebase/database-compat",ka="@firebase/functions",_a="@firebase/functions-compat",Ia="@firebase/installations",Ea="@firebase/installations-compat",xa="@firebase/messaging",Ta="@firebase/messaging-compat",Aa="@firebase/performance",Sa="@firebase/performance-compat",Pa="@firebase/remote-config",Ca="@firebase/remote-config-compat",Ra="@firebase/storage",Na="@firebase/storage-compat",Oa="@firebase/firestore",La="@firebase/ai",Da="@firebase/firestore-compat",Ma="firebase",Ua="13.0.0";var on="[DEFAULT]",Ba={[an]:"fire-core",[ua]:"fire-core-compat",[pa]:"fire-analytics",[ha]:"fire-analytics-compat",[ma]:"fire-app-check",[fa]:"fire-app-check-compat",[ga]:"fire-auth",[ba]:"fire-auth-compat",[ya]:"fire-rtdb",[va]:"fire-data-connect",[wa]:"fire-rtdb-compat",[ka]:"fire-fn",[_a]:"fire-fn-compat",[Ia]:"fire-iid",[Ea]:"fire-iid-compat",[xa]:"fire-fcm",[Ta]:"fire-fcm-compat",[Aa]:"fire-perf",[Sa]:"fire-perf-compat",[Pa]:"fire-rc",[Ca]:"fire-rc-compat",[Ra]:"fire-gcs",[Na]:"fire-gcs-compat",[Oa]:"fire-fst",[Da]:"fire-fst-compat",[La]:"fire-vertex","fire-js":"fire-js",[Ma]:"fire-js-all"};var Ae=new Map,Ha=new Map,cn=new Map;function wr(n,e){try{n.container.addComponent(e)}catch(t){$.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function me(n){let e=n.name;if(cn.has(e))return $.debug(`There were multiple attempts to register component ${e}.`),!1;cn.set(e,n);for(let t of Ae.values())wr(t,n);for(let t of Ha.values())wr(t,n);return!0}function hn(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function P(n){return n==null?!1:n.settings!==void 0}var Fa={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},V=new F("app","Firebase",Fa);var ln=class{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new D("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw V.create("app-deleted",{appName:this._name})}};var ge=Ua;function pn(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r={name:on,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw V.create("bad-app-name",{appName:String(s)});if(t||(t=Jt()),!t)throw V.create("no-options");let a=Ae.get(s);if(a)if(G(t,a.options)){if(G(r,a.config))return a;throw V.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(a.config),newValue:JSON.stringify(r)})}else throw V.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(a.options),newValue:JSON.stringify(t)});let i=new Qe(s);for(let c of cn.values())i.addComponent(c);let o=new ln(t,r,i);return Ae.set(s,o),o}function Er(n=on){let e=Ae.get(n);if(!e&&n===on&&Jt())return pn();if(!e)throw V.create("no-app",{appName:n});return e}function fn(){return Array.from(Ae.values())}function J(n,e,t){let r=Ba[n]??n;t&&(r+=`-${t}`);let s=r.match(/\s|\//),a=e.match(/\s|\//);if(s||a){let i=[`Unable to register library "${r}" with version "${e}":`];s&&i.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&a&&i.push("and"),a&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),$.warn(i.join(" "));return}me(new D(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}var Va="firebase-heartbeat-database",$a=1,Se="firebase-heartbeat-store",rn=null;function xr(){return rn||(rn=yr(Va,$a,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Se)}catch(t){console.warn(t)}}}}).catch(n=>{throw V.create("idb-open",{originalErrorMessage:n.message})})),rn}async function ja(n){try{let t=(await xr()).transaction(Se),r=await t.objectStore(Se).get(Tr(n));return await t.done,r}catch(e){if(e instanceof O)$.warn(e.message);else{let t=V.create("idb-get",{originalErrorMessage:e?.message});$.warn(t.message)}}}async function kr(n,e){try{let r=(await xr()).transaction(Se,"readwrite");await r.objectStore(Se).put(e,Tr(n)),await r.done}catch(t){if(t instanceof O)$.warn(t.message);else{let r=V.create("idb-set",{originalErrorMessage:t?.message});$.warn(r.message)}}}function Tr(n){return`${n.name}!${n.options.appId}`}var Wa=1024,za=30,dn=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new un(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=_r();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>za){let s=qa(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){$.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=_r(),{heartbeatsToSend:t,unsentEntries:r}=Ka(this._heartbeatsCache.heartbeats),s=qt(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return $.warn(e),""}}};function _r(){return new Date().toISOString().substring(0,10)}function Ka(n,e=Wa){let t=[],r=n.slice();for(let s of n){let a=t.find(i=>i.agent===s.agent);if(a){if(a.dates.push(s.date),Ir(t)>e){a.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ir(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var un=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return or()?cr().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await ja(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return kr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return kr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function Ir(n){return qt(JSON.stringify({version:2,heartbeats:n})).length}function qa(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}function Ga(n){me(new D("platform-logger",e=>new sn(e),"PRIVATE")),me(new D("heartbeat",e=>new dn(e),"PRIVATE")),J(an,vr,n),J(an,vr,"esm2020"),J("fire-js","")}Ga("");var Ja="firebase",Ya="13.0.0";J(Ja,Ya,"app");function Kr(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var qr=Kr,Gr=new F("auth","Firebase",Kr());var ot=new fe("@firebase/auth");function tt(n,...e){ot.logLevel<=w.WARN&&ot.warn(`Auth (${ge}): ${n}`,...e)}function nt(n,...e){ot.logLevel<=w.ERROR&&ot.error(`Auth (${ge}): ${n}`,...e)}function R(n,...e){throw Un(n,...e)}function L(n,...e){return Un(n,...e)}function Ct(n,e,t){let r={...qr(),[e]:t};return new F("auth","Firebase",r).create(e,{appName:n.name})}function W(n){return Ct(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Xa(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&R(n,"argument-error"),Ct(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Un(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Gr.create(n,...e)}function f(n,e,...t){if(!n)throw Un(e,...t)}function U(n){let e="INTERNAL ASSERTION FAILED: "+n;throw nt(e),new Error(e)}function z(n,e){n||U(e)}function wn(){return typeof self<"u"&&self.location?.href||""}function Qa(){return Ar()==="http:"||Ar()==="https:"}function Ar(){return typeof self<"u"&&self.location?.protocol||null}function Za(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Qa()||sr()||"connection"in navigator)?navigator.onLine:!0}function ei(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var ne=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,z(t>e,"Short delay should be less than long delay!"),this.isMobile=nr()||ar()}get(){return Za()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Bn(n,e){z(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var ct=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;U("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;U("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;U("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var ti={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var ni=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ri=new ne(3e4,6e4);function _(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function E(n,e,t,r,s={}){return Jr(n,s,async()=>{let a={},i={};r&&(e==="GET"?i=r:a={body:JSON.stringify(r)});let o=ue({...i,key:n.config.apiKey}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);let l={method:e,headers:c,...a};return rr()||(l.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&Xe(n.emulatorConfig.host)&&(l.credentials="include"),ct.fetch()(await Yr(n,n.config.apiHost,t,o),l)})}async function Jr(n,e,t){n._canInitEmulator=!1;let r={...ti,...e};try{let s=new kn(n),a=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();let i=await a.json();if("needConfirmation"in i)throw Ce(n,"account-exists-with-different-credential",i);if(a.ok&&!("errorMessage"in i))return i;{let o=a.ok?i.errorMessage:i.error.message,[c,l]=o.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ce(n,"credential-already-in-use",i);if(c==="EMAIL_EXISTS")throw Ce(n,"email-already-in-use",i);if(c==="USER_DISABLED")throw Ce(n,"user-disabled",i);let d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Ct(n,d,l);R(n,d)}}catch(s){if(s instanceof O)throw s;R(n,"network-request-failed",{message:String(s)})}}async function Q(n,e,t,r,s={}){let a=await E(n,e,t,r,s);return"mfaPendingCredential"in a&&R(n,"multi-factor-auth-required",{_serverResponse:a}),a}async function Yr(n,e,t,r){let s=`${e}${t}?${r}`,a=n,i=a.config.emulator?Bn(n.config,s):`${n.config.apiScheme}://${s}`;return ni.includes(t)&&(await a._persistenceManagerAvailable,a._getPersistenceType()==="COOKIE")?a._getPersistence()._getFinalTarget(i).toString():i}function si(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var kn=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(L(this.auth,"network-request-failed")),ri.get())})}};function Ce(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let s=L(n,e,r);return s.customData._tokenResponse=t,s}function Sr(n){return n!==void 0&&n.enterprise!==void 0}var lt=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return si(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function Xr(n,e){return E(n,"GET","/v2/recaptchaConfig",_(n,e))}async function ai(n,e){return E(n,"POST","/v1/accounts:delete",e)}async function dt(n,e){return E(n,"POST","/v1/accounts:lookup",e)}function Re(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Qr(n,e=!1){let t=S(n),r=await t.getIdToken(e),s=Hn(r);f(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");let a=typeof s.firebase=="object"?s.firebase:void 0,i=a?.sign_in_provider;return{claims:s,token:r,authTime:Re(mn(s.auth_time)),issuedAtTime:Re(mn(s.iat)),expirationTime:Re(mn(s.exp)),signInProvider:i||null,signInSecondFactor:a?.sign_in_second_factor||null}}function mn(n){return Number(n)*1e3}function Hn(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return nt("JWT malformed, contained fewer than 3 sections"),null;try{let s=Ye(t);return s?JSON.parse(s):(nt("Failed to decode base64 JWT payload"),null)}catch(s){return nt("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Pr(n){let e=Hn(n);return f(e,"internal-error"),f(typeof e.exp<"u","internal-error"),f(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function ve(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof O&&ii(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ii({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var _n=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;let r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var De=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Re(this.lastLoginAt),this.creationTime=Re(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function ut(n){let e=n.auth,t=await n.getIdToken(),r=await ve(n,dt(e,{idToken:t}));f(r?.users.length,e,"internal-error");let s=r.users[0];n._notifyReloadListener(s);let a=s.providerUserInfo?.length?es(s.providerUserInfo):[],i=oi(n.providerData,a),o=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!i?.length,l=o?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new De(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,d)}async function Zr(n){let e=S(n);await ut(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function oi(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function es(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function ci(n,e){let t=await Jr(n,{},async()=>{let r=ue({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:a}=n.config,i=await Yr(n,s,"/v1/token",`key=${a}`),o=await n._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";let c={method:"POST",headers:o,body:r};return n.emulatorConfig&&Xe(n.emulatorConfig.host)&&(c.credentials="include"),ct.fetch()(i,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function li(n,e){return E(n,"POST","/v2/accounts:revokeToken",_(n,e))}var Ne=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){f(e.idToken,"internal-error"),f(typeof e.idToken<"u","internal-error"),f(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Pr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){f(e.length!==0,"internal-error");let t=Pr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(f(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:s,expiresIn:a}=await ci(e,t);this.updateTokensAndExpiration(r,s,Number(a))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:s,expirationTime:a}=t,i=new n;return r&&(f(typeof r=="string","internal-error",{appName:e}),i.refreshToken=r),s&&(f(typeof s=="string","internal-error",{appName:e}),i.accessToken=s),a&&(f(typeof a=="number","internal-error",{appName:e}),i.expirationTime=a),i}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return U("not implemented")}};function Y(n,e){f(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var X=class n{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new _n(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new De(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await ve(this,this.stsTokenManager.getToken(this.auth,e));return f(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Qr(this,e)}reload(){return Zr(this)}_assign(e){this!==e&&(f(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){f(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ut(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(P(this.auth.app))return Promise.reject(W(this.auth));let e=await this.getIdToken();return await ve(this,ai(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){let r=t.displayName??void 0,s=t.email??void 0,a=t.phoneNumber??void 0,i=t.photoURL??void 0,o=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:h,emailVerified:m,isAnonymous:p,providerData:g,stsTokenManager:k}=t;f(h&&k,e,"internal-error");let y=Ne.fromJSON(this.name,k);f(typeof h=="string",e,"internal-error"),Y(r,e.name),Y(s,e.name),f(typeof m=="boolean",e,"internal-error"),f(typeof p=="boolean",e,"internal-error"),Y(a,e.name),Y(i,e.name),Y(o,e.name),Y(c,e.name),Y(l,e.name),Y(d,e.name);let b=new n({uid:h,auth:e,email:s,emailVerified:m,displayName:r,isAnonymous:p,photoURL:i,phoneNumber:a,tenantId:o,stsTokenManager:y,createdAt:l,lastLoginAt:d});return g&&Array.isArray(g)&&(b.providerData=g.map(v=>({...v}))),c&&(b._redirectEventId=c),b}static async _fromIdTokenResponse(e,t,r=!1){let s=new Ne;s.updateFromServerResponse(t);let a=new n({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ut(a),a}static async _fromGetAccountInfoResponse(e,t,r){let s=t.users[0];f(s.localId!==void 0,"internal-error");let a=s.providerUserInfo!==void 0?es(s.providerUserInfo):[],i=!(s.email&&s.passwordHash)&&!a?.length,o=new Ne;o.updateFromIdToken(r);let c=new n({uid:s.localId,auth:e,stsTokenManager:o,isAnonymous:i}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new De(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!a?.length};return Object.assign(c,l),c}};var Cr=new Map;function j(n){z(n instanceof Function,"Expected a class definition");let e=Cr.get(n);return e?(z(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Cr.set(n,e),e)}var ht=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};ht.type="NONE";var In=ht;function rt(n,e,t){return`firebase:${n}:${e}:${t}`}var Oe=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:s,name:a}=this.auth;this.fullUserKey=rt(this.userKey,s.apiKey,a),this.fullPersistenceKey=rt("persistence",s.apiKey,a),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await dt(this.auth,{idToken:e}).catch(()=>{});return t?X._fromGetAccountInfoResponse(this.auth,t,e):null}return X._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new n(j(In),e,r);let s=(await Promise.all(t.map(async l=>{try{if(await l._isAvailable())return l}catch{return}}))).filter(l=>l),a=s[0]||j(In),i=rt(r,e.config.apiKey,e.name),o=null;for(let l of t)try{let d=await l._get(i);if(d){let h;if(typeof d=="string"){let m=await dt(e,{idToken:d}).catch(()=>{});if(!m)break;h=await X._fromGetAccountInfoResponse(e,m,d)}else h=X._fromJSON(e,d);l!==a&&(o=h),a=l;break}}catch{}let c=s.filter(l=>l._shouldAllowMigration);return!a._shouldAllowMigration||!c.length?new n(a,e,r):(a=c[0],o&&await a._set(i,o.toJSON()),await Promise.all(t.map(async l=>{if(l!==a)try{await l._remove(i)}catch{}})),new n(a,e,r))}};function Rr(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ss(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ts(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(is(e))return"Blackberry";if(os(e))return"Webos";if(ns(e))return"Safari";if((e.includes("chrome/")||rs(e))&&!e.includes("edge/"))return"Chrome";if(as(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function ts(n=T()){return/firefox\//i.test(n)}function ns(n=T()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function rs(n=T()){return/crios\//i.test(n)}function ss(n=T()){return/iemobile/i.test(n)}function as(n=T()){return/android/i.test(n)}function is(n=T()){return/blackberry/i.test(n)}function os(n=T()){return/webos/i.test(n)}function Fn(n=T()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function di(n=T()){return Fn(n)&&!!window.navigator?.standalone}function ui(){return ir()&&document.documentMode===10}function cs(n=T()){return Fn(n)||as(n)||os(n)||is(n)||/windows phone/i.test(n)||ss(n)}function ls(n,e=[]){let t;switch(n){case"Browser":t=Rr(T());break;case"Worker":t=`${Rr(T())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ge}/${r}`}var En=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=a=>new Promise((i,o)=>{try{let c=e(a);i(c)}catch(c){o(c)}});r.onAbort=t,this.queue.push(r);let s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function hi(n,e={}){return E(n,"GET","/v2/passwordPolicy",_(n,e))}var pi=6,xn=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??pi,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}};var Tn=class{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new pt(this),this.idTokenSubscription=new pt(this),this.beforeStateQueue=new En(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Gr,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(a=>this._resolvePersistenceManagerAvailable=a)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=j(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted){try{this.persistenceManager=await Oe.create(this,e)}catch(r){tt(`Failed to initialize persistence: ${r}`),this.persistenceManager=await Oe.create(this,[])}finally{this._resolvePersistenceManagerAvailable?.()}if(!this._deleted){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(r){tt(`Failed to initialize current user: ${r}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await dt(this,{idToken:e}),r=await X._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(P(this.app)){let a=this.app.settings.authIdToken;return a?new Promise(i=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(i,i))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let a=this.redirectUser?._redirectEventId,i=r?._redirectEventId,o=await this.tryRedirectSignIn(e);(!a||a===i)&&o?.user&&(r=o.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return f(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ut(e)}catch(t){let r=t?.code;if(r!=="auth/network-request-failed"&&r!=="auth/too-many-requests"&&!r?.startsWith("auth/quota-exceeded"))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ei()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(P(this.app))return Promise.reject(W(this));let t=e?S(e):null;return t&&f(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&f(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return P(this.app)?Promise.reject(W(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return P(this.app)?Promise.reject(W(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(j(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await hi(this),t=new xn(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new F("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await li(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&j(e)||this._popupRedirectResolver;f(t,this,"argument-error"),this.redirectPersistenceManager=await Oe.create(this,[j(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};let a=typeof t=="function"?t:t.next.bind(t),i=!1,o=this._isInitialized?Promise.resolve():this._initializationPromise;if(f(o,this,"internal-error"),o.then(()=>{i||a(this.currentUser)}).catch(c=>{if(!i)if(typeof t!="function"&&t.error)t.error(c);else if(r)r(c);else throw c}),typeof t=="function"){let c=e.addObserver(t,r,s);return()=>{i=!0,c()}}else{let c=e.addObserver(t);return()=>{i=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){let r=t?.message||String(t),s=Ct(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw s.customData={originalError:t},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return f(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ls(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);let r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(P(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&tt(`Error while retrieving App Check token: ${e.error}`),e?.token}};function H(n){return S(n)}var pt=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=dr(t=>this.observer=t)}get next(){return f(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Rt={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function fi(n){Rt=n}function ds(n){return Rt.loadJS(n)}function mi(){return Rt.recaptchaEnterpriseScript}function gi(){return Rt.gapiScript}function us(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var An=class{constructor(){this.enterprise=new Sn}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},Sn=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var bi="recaptcha-enterprise",Le="NO_RECAPTCHA",Nr="onFirebaseAuthREInstanceReady",Me=class n{constructor(e){this.type=bi,this.auth=H(e)}async verify(e="verify",t=!1){async function r(a){if(!t){if(a.tenantId==null&&a._agentRecaptchaConfig!=null)return a._agentRecaptchaConfig.siteKey;if(a.tenantId!=null&&a._tenantRecaptchaConfigs[a.tenantId]!==void 0)return a._tenantRecaptchaConfigs[a.tenantId].siteKey}return new Promise(async(i,o)=>{Xr(a,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)o(new Error("recaptcha Enterprise site key undefined"));else{let l=new lt(c);return a.tenantId==null?a._agentRecaptchaConfig=l:a._tenantRecaptchaConfigs[a.tenantId]=l,i(l.siteKey)}}).catch(c=>{o(c)})})}function s(a,i,o){let c=window.grecaptcha;Sr(c)?c.enterprise.ready(()=>{c.enterprise.execute(a,{action:e}).then(l=>{i(l)}).catch(()=>{i(Le)})}):o(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new An().execute("siteKey",{action:"verify"}):new Promise((a,i)=>{r(this.auth).then(async o=>{if(!t&&Sr(window.grecaptcha)&&n.scriptInjectionDeferred)await n.scriptInjectionDeferred.promise,s(o,a,i);else{if(typeof window>"u"){i(new Error("RecaptchaVerifier is only supported in browser"));return}let c=mi();c.length!==0&&(c+=o+`&onload=${Nr}`),n.scriptInjectionDeferred=new de,window[Nr]=()=>{n.scriptInjectionDeferred?.resolve()},ds(c).then(()=>n.scriptInjectionDeferred?.promise).then(()=>{s(o,a,i)}).catch(l=>{i(l)})}}).catch(o=>{i(o)})})}};Me.scriptInjectionDeferred=null;async function Pe(n,e,t,r=!1,s=!1){let a=new Me(n),i;if(s)i=Le;else try{i=await a.verify(t)}catch{i=await a.verify(t,!0)}let o={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in o){let c=o.phoneEnrollmentInfo.phoneNumber,l=o.phoneEnrollmentInfo.recaptchaToken;Object.assign(o,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:i,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in o){let c=o.phoneSignInInfo.recaptchaToken;Object.assign(o,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:i,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return o}return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function be(n,e,t,r,s){if(s==="EMAIL_PASSWORD_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let a=await Pe(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let i=await Pe(n,e,t,t==="getOobCode");return r(n,i)}else return Promise.reject(a)});else if(s==="PHONE_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){let a=await Pe(n,e,t);return r(n,a).catch(async i=>{if(n._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(i.code==="auth/missing-recaptcha-token"||i.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let o=await Pe(n,e,t,!1,!0);return r(n,o)}return Promise.reject(i)})}else{let a=await Pe(n,e,t,!1,!0);return r(n,a)}else return Promise.reject(s+" provider is not supported.")}async function yi(n){let e=H(n),t=await Xr(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new lt(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Me(e).verify()}function hs(n,e){let t=hn(n,"auth");if(t.isInitialized()){let s=t.getImmediate(),a=t.getOptions();if(G(a,e??{}))return s;R(s,"already-initialized")}return t.initialize({options:e})}function vi(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(j);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function ps(n,e,t){let r=H(n);f(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let s=!!t?.disableWarnings,a=fs(e),{host:i,port:o}=wi(e),c=o===null?"":`:${o}`,l={url:`${a}//${i}${c}/`},d=Object.freeze({host:i,port:o,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){f(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),f(G(l,r.config.emulator)&&G(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Xe(i)?ur(`${a}//${i}${c}`):s||ki()}function fs(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function wi(n){let e=fs(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){let a=s[1];return{host:a,port:Or(r.substr(a.length+1))}}else{let[a,i]=r.split(":");return{host:a,port:Or(i)}}}function Or(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function ki(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var re=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return U("not implemented")}_getIdTokenResponse(e){return U("not implemented")}_linkToIdToken(e,t){return U("not implemented")}_getReauthenticationResolver(e){return U("not implemented")}};async function _i(n,e){return E(n,"POST","/v1/accounts:signUp",e)}async function Ii(n,e){return Q(n,"POST","/v1/accounts:signInWithPassword",_(n,e))}async function Ei(n,e){return Q(n,"POST","/v1/accounts:signInWithEmailLink",_(n,e))}async function xi(n,e){return Q(n,"POST","/v1/accounts:signInWithEmailLink",_(n,e))}var Ue=class n extends re{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return be(e,t,"signInWithPassword",Ii,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Ei(e,{email:this._email,oobCode:this._password});default:R(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return be(e,r,"signUpPassword",_i,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return xi(e,{idToken:t,email:this._email,oobCode:this._password});default:R(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function ye(n,e){return Q(n,"POST","/v1/accounts:signInWithIdp",_(n,e))}var Ti="http://localhost",se=class n extends re{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):R("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...a}=t;if(!r||!s)return null;let i=new n(r,s);return i.idToken=a.idToken||void 0,i.accessToken=a.accessToken||void 0,i.secret=a.secret,i.nonce=a.nonce,i.pendingToken=a.pendingToken||null,i}_getIdTokenResponse(e){let t=this.buildRequest();return ye(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,ye(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,ye(e,t)}buildRequest(){let e={requestUri:Ti,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ue(t)}return e}};async function Lr(n,e){return E(n,"POST","/v1/accounts:sendVerificationCode",_(n,e))}async function Ai(n,e){return Q(n,"POST","/v1/accounts:signInWithPhoneNumber",_(n,e))}async function Si(n,e){let t=await Q(n,"POST","/v1/accounts:signInWithPhoneNumber",_(n,e));if(t.temporaryProof)throw Ce(n,"account-exists-with-different-credential",t);return t}var Pi={USER_NOT_FOUND:"user-not-found"};async function Ci(n,e){let t={...e,operation:"REAUTH"};return Q(n,"POST","/v1/accounts:signInWithPhoneNumber",_(n,t),Pi)}var Be=class n extends re{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Ai(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Si(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return Ci(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:a}=e;return!r&&!t&&!s&&!a?null:new n({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:a})}};function Ri(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ni(n){let e=he(pe(n)).link,t=e?he(pe(e)).deep_link_id:null,r=he(pe(n)).deep_link_id;return(r?he(pe(r)).link:null)||r||t||e||n}var ft=class n{constructor(e){let t=he(pe(e)),r=t.apiKey??null,s=t.oobCode??null,a=Ri(t.mode??null);f(r&&s&&a,"argument-error"),this.apiKey=r,this.operation=a,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){let t=Ni(e);try{return new n(t)}catch{return null}}};var ae=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Ue._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=ft.parseLink(t);return f(r,"argument-error"),Ue._fromEmailAndCode(e,r.code,r.tenantId)}};ae.PROVIDER_ID="password";ae.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ae.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var He=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var ie=class extends He{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Fe=class n extends ie{constructor(){super("facebook.com")}static credential(e){return se._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Fe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Fe.PROVIDER_ID="facebook.com";var oe=class n extends ie{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return se._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};oe.GOOGLE_SIGN_IN_METHOD="google.com";oe.PROVIDER_ID="google.com";var Ve=class n extends ie{constructor(){super("github.com")}static credential(e){return se._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Ve.GITHUB_SIGN_IN_METHOD="github.com";Ve.PROVIDER_ID="github.com";var $e=class n extends ie{constructor(){super("twitter.com")}static credential(e,t){return se._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};$e.TWITTER_SIGN_IN_METHOD="twitter.com";$e.PROVIDER_ID="twitter.com";async function Oi(n,e){return Q(n,"POST","/v1/accounts:signUp",_(n,e))}var we=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){let a=await X._fromIdTokenResponse(e,r,s),i=Dr(r);return new n({user:a,providerId:i,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let s=Dr(r);return new n({user:e,providerId:s,_tokenResponse:r,operationType:t})}};function Dr(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var Pn=class n extends O{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new n(e,t,r,s)}};function ms(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?Pn._fromErrorAndOperation(n,a,e,r):a})}async function Li(n,e,t=!1){let r=await ve(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return we._forOperation(n,"link",r)}async function Di(n,e,t=!1){let{auth:r}=n;if(P(r.app))return Promise.reject(W(r));let s="reauthenticate";try{let a=await ve(n,ms(r,s,e,n),t);f(a.idToken,r,"internal-error");let i=Hn(a.idToken);f(i,r,"internal-error");let{sub:o}=i;return f(n.uid===o,r,"user-mismatch"),we._forOperation(n,s,a)}catch(a){throw a?.code==="auth/user-not-found"&&R(r,"user-mismatch"),a}}async function gs(n,e,t=!1){if(P(n.app))return Promise.reject(W(n));let r="signIn",s=await ms(n,r,e),a=await we._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(a.user),a}async function bs(n,e){return gs(H(n),e)}async function ys(n){let e=H(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Vn(n,e,t){if(P(n.app))return Promise.reject(W(n));let r=H(n),i=await be(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Oi,"EMAIL_PASSWORD_PROVIDER").catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&ys(n),c}),o=await we._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(o.user),o}function $n(n,e,t){return P(n.app)?Promise.reject(W(n)):bs(S(n),ae.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&ys(n),r})}async function Mi(n,e){return E(n,"POST","/v1/accounts:update",e)}async function ze(n,e){let{displayName:t,photoURL:r}=e;if(t===void 0&&r===void 0)return;let s=S(n),i={idToken:await s.getIdToken(),displayName:t,photoUrl:r,returnSecureToken:!0},o=await ve(s,Mi(s.auth,i));s.displayName=o.displayName||null,s.photoURL=o.photoUrl||null;let c=s.providerData.find(({providerId:l})=>l==="password");c&&(c.displayName=s.displayName,c.photoURL=s.photoURL),await s._updateTokensIfNecessary(o)}function Ke(n,e){return S(n).setPersistence(e)}function vs(n,e,t,r){return S(n).onIdTokenChanged(e,t,r)}function ws(n,e,t){return S(n).beforeAuthStateChanged(e,t)}function jn(n,e,t,r){return S(n).onAuthStateChanged(e,t,r)}function Nt(n){return S(n).signOut()}function Mr(n,e){return E(n,"POST","/v2/accounts/mfaEnrollment:start",_(n,e))}function Ui(n,e){return E(n,"POST","/v2/accounts/mfaEnrollment:finalize",_(n,e))}function Bi(n,e){return E(n,"POST","/v2/accounts/mfaEnrollment:start",_(n,e))}function Hi(n,e){return E(n,"POST","/v2/accounts/mfaEnrollment:finalize",_(n,e))}var mt="__sak";var gt=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(mt,"1"),this.storage.removeItem(mt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var Fi=1e3,Vi=10,bt=class extends gt{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=cs(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((i,o,c)=>{this.notifyListeners(i,c)});return}let r=e.key;t?this.detachListener():this.stopPolling();let s=()=>{let i=this.storage.getItem(r);!t&&this.localCache[r]===i||this.notifyListeners(r,i)},a=this.storage.getItem(r);ui()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Vi):s()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Fi)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};bt.type="LOCAL";var qe=bt;var $i=1e3;function gn(n){let e=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return document.cookie.match(t)?.[1]??null}function bn(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}var Cn=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=bn(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:gn(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=bn(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=bn(e);if(window.cookieStore){let o=(l=>{let d=l.changed.find(m=>m.name===r);d&&t(d.value),l.deleted.find(m=>m.name===r)&&t(null)}),c=()=>window.cookieStore.removeEventListener("change",o);return this.listenerUnsubscribes.set(t,c),window.cookieStore.addEventListener("change",o)}let s=gn(r),a=setInterval(()=>{let o=gn(r);o!==s&&(t(o),s=o)},$i),i=()=>clearInterval(a);this.listenerUnsubscribes.set(t,i)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};Cn.type="COOKIE";var yt=class extends gt{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};yt.type="SESSION";var Ge=yt;function ji(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var vt=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:s,data:a}=t.data,i=this.handlersMap[s];if(!i?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});let o=Array.from(i).map(async l=>l(t.origin,a)),c=await ji(o);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};vt.receivers=[];function Wn(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Rn=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let a,i;return new Promise((o,c)=>{let l=Wn("",20);s.port1.start();let d=setTimeout(()=>{c(new Error("unsupported_event"))},r);i={messageChannel:s,onMessage(h){let m=h;if(m.data.eventId===l)switch(m.data.status){case"ack":clearTimeout(d),a=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),o(m.data.response);break;default:clearTimeout(d),clearTimeout(a),c(new Error("invalid_response"));break}}},this.handlers.add(i),s.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}};function B(){return window}function Wi(n){B().location.href=n}function ks(){return typeof B().WorkerGlobalScope<"u"&&typeof B().importScripts=="function"}async function zi(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ki(){return navigator?.serviceWorker?.controller||null}function qi(){return ks()?self:null}var _s="firebaseLocalStorageDb",Gi=1,wt="firebaseLocalStorage",Is="fbase_key",ce=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Ot(n,e){return n.transaction([wt],e?"readwrite":"readonly").objectStore(wt)}function Ji(){let n=indexedDB.deleteDatabase(_s);return new ce(n).toPromise()}function Es(){let n=indexedDB.open(_s,Gi);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(wt,{keyPath:Is})}catch(s){t(s)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(wt)?e(r):(r.close(),await Ji(),e(await Es()))})})}async function Ur(n,e,t){let r=Ot(n,!0).put({[Is]:e,value:t});return new ce(r).toPromise()}async function Yi(n,e){let t=Ot(n,!1).get(e),r=await new ce(t).toPromise();return r===void 0?null:r.value}function Br(n,e){let t=Ot(n,!0).delete(e);return new ce(t).toPromise()}var Xi=800,Qi=3,kt=class{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Es(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>Qi)throw r;if(this.dbPromise){let s=this.dbPromise;this.dbPromise=null;try{(await s).close()}catch{}}}}async initializeServiceWorkerMessaging(){return ks()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=vt._getInstance(qi()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await zi(),!this.activeServiceWorker)return;this.sender=new Rn(this.activeServiceWorker);let e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ki()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Ur(e,mt,"1"),await Br(e,mt)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ur(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>Yi(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Br(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{let e=await this._withRetries(s=>{let a=Ot(s,!1).getAll();return new ce(a).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:s,value:a}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(a)&&(this.notifyListeners(s,a),t.push(s));for(let s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||tt(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Xi)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}};kt.type="LOCAL";var xs=kt;function Hr(n,e){return E(n,"POST","/v2/accounts/mfaSignIn:start",_(n,e))}function Zi(n,e){return E(n,"POST","/v2/accounts/mfaSignIn:finalize",_(n,e))}function eo(n,e){return E(n,"POST","/v2/accounts/mfaSignIn:finalize",_(n,e))}var Bc=us("rcb"),Hc=new ne(3e4,6e4);var st="recaptcha";async function to(n,e,t){if(!n._getRecaptchaConfig())try{await yi(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){let s=r.session;if("phoneNumber"in r){f(s.type==="enroll",n,"internal-error");let a={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await be(n,a,"mfaSmsEnrollment",async(l,d)=>{if(d.phoneEnrollmentInfo.captchaResponse===Le){f(t?.type===st,l,"argument-error");let h=await yn(l,d,t);return Mr(l,h)}return Mr(l,d)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).phoneSessionInfo.sessionInfo}else{f(s.type==="signin",n,"internal-error");let a=r.multiFactorHint?.uid||r.multiFactorUid;f(a,n,"missing-multi-factor-info");let i={mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await be(n,i,"mfaSmsSignIn",async(d,h)=>{if(h.phoneSignInInfo.captchaResponse===Le){f(t?.type===st,d,"argument-error");let m=await yn(d,h,t);return Hr(d,m)}return Hr(d,h)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await be(n,s,"sendVerificationCode",async(c,l)=>{if(l.captchaResponse===Le){f(t?.type===st,c,"argument-error");let d=await yn(c,l,t);return Lr(c,d)}return Lr(c,l)},"PHONE_PROVIDER").catch(c=>Promise.reject(c))).sessionInfo}}finally{t?._reset()}}async function yn(n,e,t){f(t.type===st,n,"argument-error");let r=await t.verify();f(typeof r=="string",n,"argument-error");let s={...e};if("phoneEnrollmentInfo"in s){let a=s.phoneEnrollmentInfo.phoneNumber,i=s.phoneEnrollmentInfo.captchaResponse,o=s.phoneEnrollmentInfo.clientType,c=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:a,recaptchaToken:r,captchaResponse:i,clientType:o,recaptchaVersion:c}}),s}else if("phoneSignInInfo"in s){let a=s.phoneSignInInfo.captchaResponse,i=s.phoneSignInInfo.clientType,o=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:a,clientType:i,recaptchaVersion:o}}),s}else return Object.assign(s,{recaptchaToken:r}),s}var je=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=H(e)}verifyPhoneNumber(e,t){return to(this.auth,e,S(t))}static credential(e,t){return Be._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Be._fromTokenResponse(t,r):null}};je.PROVIDER_ID="phone";je.PHONE_SIGN_IN_METHOD="phone";function Ts(n,e){return e?j(e):(f(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var We=class extends re{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ye(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ye(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ye(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function no(n){return gs(n.auth,new We(n),n.bypassAuthState)}function ro(n){let{auth:e,user:t}=n;return f(t,e,"internal-error"),Di(t,new We(n),n.bypassAuthState)}async function so(n){let{auth:e,user:t}=n;return f(t,e,"internal-error"),Li(t,new We(n),n.bypassAuthState)}var _t=class{constructor(e,t,r,s,a=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:s,tenantId:a,error:i,type:o}=e;if(i){this.reject(i);return}let c={auth:this.auth,requestUri:t,sessionId:r,tenantId:a||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return no;case"linkViaPopup":case"linkViaRedirect":return so;case"reauthViaPopup":case"reauthViaRedirect":return ro;default:R(this.auth,"internal-error")}}resolve(e){z(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){z(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var ao=new ne(2e3,1e4);async function zn(n,e,t){if(P(n.app))return Promise.reject(L(n,"operation-not-supported-in-this-environment"));let r=H(n);Xa(n,e,He);let s=Ts(r,t);return new It(r,"signInViaPopup",e,s).executeNotNull()}var It=class n extends _t{constructor(e,t,r,s,a){super(e,t,s,a),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return f(e,this.auth,"internal-error"),e}async onExecution(){z(this.filter.length===1,"Popup operations only handle one event");let e=Wn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(L(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(L(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(L(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ao.get())};e()}};It.currentPopupAction=null;var io="pendingRedirect",at=new Map,Nn=class extends _t{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=at.get(this.auth._key());if(!e){try{let r=await oo(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}at.set(this.auth._key(),e)}return this.bypassAuthState||at.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function oo(n,e){let t=uo(e),r=lo(n);if(!await r._isAvailable())return!1;let s=await r._get(t)==="true";return await r._remove(t),s}function co(n,e){at.set(n._key(),e)}function lo(n){return j(n._redirectPersistence)}function uo(n){return rt(io,n.config.apiKey,n.name)}async function ho(n,e,t=!1){if(P(n.app))return Promise.reject(W(n));let r=H(n),s=Ts(r,e),i=await new Nn(r,s,t).execute();return i&&!t&&(delete i.user._redirectEventId,await r._persistUserIfCurrent(i.user),await r._setRedirectUser(null,e)),i}var po=600*1e3,On=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!fo(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!As(e)){let r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(L(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=po&&this.cachedEventUids.clear(),this.cachedEventUids.has(Fr(e))}saveEventToCache(e){this.cachedEventUids.add(Fr(e)),this.lastProcessedEventTime=Date.now()}};function Fr(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function As({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function fo(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return As(n);default:return!1}}async function mo(n,e={}){return E(n,"GET","/v1/projects",e)}var go=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,bo=/^https?/;async function yo(n){if(n.config.emulator)return;let{authorizedDomains:e}=await mo(n);for(let t of e)try{if(vo(t))return}catch{}R(n,"unauthorized-domain")}function vo(n){let e=wn(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let i=new URL(n);return i.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&i.hostname===r}if(!bo.test(t))return!1;if(go.test(n))return r===n;let s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}var wo=new ne(3e4,6e4);function Vr(){let n=B().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function ko(n){return new Promise((e,t)=>{function r(){Vr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Vr(),t(L(n,"network-request-failed"))},timeout:wo.get()})}if(B().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(B().gapi?.load)r();else{let s=us("iframefcb");return B()[s]=()=>{gapi.load?r():t(L(n,"network-request-failed"))},ds(`${gi()}?onload=${s}`).catch(a=>t(a))}}).catch(e=>{throw it=null,e})}var it=null;function _o(n){return it=it||ko(n),it}var Io=new ne(5e3,15e3),Eo="__/auth/iframe",xo="emulator/auth/iframe",To={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ao=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function So(n){let e=n.config;f(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Bn(e,xo):`https://${n.config.authDomain}/${Eo}`,r={apiKey:e.apiKey,appName:n.name,v:ge},s=Ao.get(n.config.apiHost);s&&(r.eid=s);let a=n._getFrameworks();return a.length&&(r.fw=a.join(",")),`${t}?${ue(r).slice(1)}`}async function Po(n){let e=await _o(n),t=B().gapi;return f(t,n,"internal-error"),e.open({where:document.body,url:So(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:To,dontclear:!0},r=>new Promise(async(s,a)=>{await r.restyle({setHideOnLeave:!1});let i=L(n,"network-request-failed"),o=B().setTimeout(()=>{a(i)},Io.get());function c(){B().clearTimeout(o),s(r)}r.ping(c).then(c,()=>{a(i)})}))}var Co={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ro=500,No=600,Oo="_blank",Lo="http://localhost",Et=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Do(n,e,t,r=Ro,s=No){let a=Math.max((window.screen.availHeight-s)/2,0).toString(),i=Math.max((window.screen.availWidth-r)/2,0).toString(),o="",c={...Co,width:r.toString(),height:s.toString(),top:a,left:i},l=T().toLowerCase();t&&(o=rs(l)?Oo:t),ts(l)&&(e=e||Lo,c.scrollbars="yes");let d=Object.entries(c).reduce((m,[p,g])=>`${m}${p}=${g},`,"");if(di(l)&&o!=="_self")return Mo(e||"",o),new Et(null);let h=window.open(e||"",o,d);f(h,n,"popup-blocked");try{h.focus()}catch{}return new Et(h)}function Mo(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var Uo="__/auth/handler",Bo="emulator/auth/handler",Ho=encodeURIComponent("fac");async function $r(n,e,t,r,s,a){f(n.config.authDomain,n,"auth-domain-config-required"),f(n.config.apiKey,n,"invalid-api-key");let i={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ge,eventId:s};if(e instanceof He){e.setDefaultLanguage(n.languageCode),i.providerId=e.providerId||"",lr(e.getCustomParameters())||(i.customParameters=JSON.stringify(e.getCustomParameters()));for(let[d,h]of Object.entries(a||{}))i[d]=h}if(e instanceof ie){let d=e.getScopes().filter(h=>h!=="");d.length>0&&(i.scopes=d.join(","))}n.tenantId&&(i.tid=n.tenantId);let o=i;for(let d of Object.keys(o))o[d]===void 0&&delete o[d];let c=await n._getAppCheckToken(),l=c?`#${Ho}=${encodeURIComponent(c)}`:"";return`${Fo(n)}?${ue(o).slice(1)}${l}`}function Fo({config:n}){return n.emulator?Bn(n,Bo):`https://${n.authDomain}/${Uo}`}var vn="webStorageSupport",Ln=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ge,this._completeRedirectFn=ho,this._overrideRedirectResult=co}async _openPopup(e,t,r,s){z(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");let a=await $r(e,t,r,wn(),s);return Do(e,a,Wn())}async _openRedirect(e,t,r,s){await this._originValidation(e);let a=await $r(e,t,r,wn(),s);return Wi(a),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:s,promise:a}=this.eventManagers[t];return s?Promise.resolve(s):(z(a,"If manager is not set, promise should be"),a)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await Po(e),r=new On(e);return t.register("authEvent",s=>(f(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(vn,{type:vn},s=>{let a=s?.[0]?.[vn];a!==void 0&&t(!!a),R(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=yo(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return cs()||ns()||Fn()}},Ss=Ln,xt=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return U("unexpected MultiFactorSessionType")}}},Dn=class n extends xt{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return Ui(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Zi(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Tt=class{constructor(){}static assertion(e){return Dn._fromCredential(e)}};Tt.FACTOR_ID="phone";var At=class{static assertionForEnrollment(e,t){return St._fromSecret(e,t)}static assertionForSignIn(e,t){return St._fromEnrollmentId(e,t)}static async generateSecret(e){let t=e;f(typeof t.user?.auth<"u","internal-error");let r=await Bi(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return Pt._fromStartTotpMfaEnrollmentResponse(r,t.user.auth)}};At.FACTOR_ID="totp";var St=class n extends xt{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return f(typeof this.secret<"u",e,"argument-error"),Hi(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){f(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return eo(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Pt=class n{constructor(e,t,r,s,a,i,o){this.sessionInfo=i,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=s,this.enrollmentCompletionDeadline=a}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let r=!1;return(et(e)||et(t))&&(r=!0),r&&(et(e)&&(e=this.auth.currentUser?.email||"unknownuser"),et(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function et(n){return typeof n>"u"||n?.length===0}var jr="@firebase/auth",Wr="1.13.7";var Mn=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){f(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Vo(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function $o(n){me(new D("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:i,authDomain:o}=r.options;f(i&&!i.includes(":"),"invalid-api-key",{appName:r.name});let c={apiKey:i,authDomain:o,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ls(n)},l=new Tn(r,s,a,c);return vi(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),me(new D("auth-internal",e=>{let t=H(e.getProvider("auth").getImmediate());return(r=>new Mn(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),J(jr,Wr,Vo(n)),J(jr,Wr,"esm2020")}var jo=300,Wo=Yt("authIdTokenMaxAge")||jo,zr=null,zo=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Wo)return;let s=t?.token;zr!==s&&(zr=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Kn(n=Er()){let e=hn(n,"auth");if(e.isInitialized())return e.getImmediate();let t=hs(n,{popupRedirectResolver:Ss,persistence:[xs,qe,Ge]}),r=Yt("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let a=new URL(r,location.origin);if(location.origin===a.origin){let i=zo(a.toString());ws(t,i,()=>i(t.currentUser)),vs(t,o=>i(o))}}let s=tr("auth");return s&&ps(t,`http://${s}`),t}function Ko(){return document.getElementsByTagName("head")?.[0]??document}fi({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{let a=L("internal-error");a.customData=s,t(a)},r.type="text/javascript",r.charset="UTF-8",Ko().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});$o("Browser");var Ps={projectId:"eng-object-1n2tx",appId:"1:494705160260:web:340cd8aa2f18b9d4254c11",apiKey:"AIzaSyDrnYZhR-E243eq7yMpHyoVZuJ9YG55uVY",authDomain:"eng-object-1n2tx.firebaseapp.com",firestoreDatabaseId:"ai-studio-baniinthehouse-f0e85c23-a555-41f7-822f-df7af6af7cb8",storageBucket:"eng-object-1n2tx.firebasestorage.app",messagingSenderId:"494705160260",measurementId:"",oAuthClientId:"494705160260-8t3l8p7gnvi2l6i19fli0q3i9drdp9ku.apps.googleusercontent.com",recaptchaSiteKey:""};var N=[{key:"OtrPrice",name:"Master OTR",code:"OTR",badge:"Harga Pasar",icon:'<svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 8h4.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16h-2"/></svg>',description:"Daftar harga pasar & taksasi unit motor per merk, tipe, dan tahun pembuatan.",sheetKeywords:["OTR","HARGA","PRICE","MOTOR","TAKSASI"],idPrefix:"otr_",fields:[{key:"brand",label:"Merk Motor",type:"select",required:!0,options:["HONDA","YAMAHA","SUZUKI","KAWASAKI","VESPA","LAINNYA"],excelAliases:["merk","brand","merk motor","pabrikan","manufaktur"]},{key:"model",label:"Model / Tipe Motor",type:"text",required:!0,placeholder:"misal BEAT SPORTY CBS, NMAX 155, VARIO 160",excelAliases:["model","tipe","type","nama motor","unit motor","model motor","varian"]},{key:"year",label:"Tahun Pembuatan",type:"number",required:!0,placeholder:"2024",excelAliases:["tahun","year","thn","tahun motor","tahun pembuatan"]},{key:"harga_pasar",label:"Harga Pasar (OTR)",type:"currency",required:!0,placeholder:"18500000",excelAliases:["harga pasar","harga","otr","harga otr","nilai pasar","taksasi","nilai otr"]},{key:"object_description",label:"Deskripsi / Detail Unit",type:"text",placeholder:"misal ISS Deluxe, ABS Connected",excelAliases:["deskripsi","description","object_description","varian","keterangan","detail"]},{key:"group_type_unit",label:"Group Tipe Unit",type:"select",options:["MATIC","BEBEK","SPORT","TRAIL","LISTRIK","LAINNYA"],excelAliases:["group","group type","group_type_unit","kategori","segmen","jenis"]}],sampleData:[{brand:"HONDA",model:"BEAT CBS",year:2024,harga_pasar:185e5,object_description:"BEAT SPORTY CBS FI 110",group_type_unit:"MATIC"},{brand:"YAMAHA",model:"NMAX 155",year:2023,harga_pasar:315e5,object_description:"NMAX 155 CONNECTED ABS",group_type_unit:"MATIC"},{brand:"HONDA",model:"VARIO 160",year:2023,harga_pasar:268e5,object_description:"VARIO 160 CBS SPORTY",group_type_unit:"MATIC"},{brand:"KAWASAKI",model:"KLX 150",year:2022,harga_pasar:34e6,object_description:"KLX 150 BF SPECIAL EDITION",group_type_unit:"TRAIL"}]},{key:"ClopContract",name:"Master CLOP HO",code:"CLOP",badge:"Kontrak HO",icon:'<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',description:"Data referensi kontrak nasabah CLOP HO untuk verifikasi riwayat pembiayaan.",sheetKeywords:["CLOP","KONTRAK","CONTRACT","HO","NASABAH"],idPrefix:"clop_",fields:[{key:"contract_no",label:"Nomor Kontrak",type:"text",required:!0,placeholder:"0123456789",excelAliases:["contract_no","no kontrak","nomor kontrak","contract no","kontrak","no. kontrak","id kontrak"]},{key:"customer_name",label:"Nama Konsumen / Debitur",type:"text",required:!0,placeholder:"Nama lengkap konsumen",excelAliases:["customer_name","nama konsumen","nama debitur","nama nasabah","customer","nama","nama lengkap"]},{key:"nosin",label:"Nomor Mesin (Nosin)",type:"text",placeholder:"JF51E1234567",excelAliases:["nosin","nomor mesin","no mesin","engine no","no. mesin"]},{key:"office_code",label:"Kode Cabang / Kantor",type:"text",placeholder:"JKT01",excelAliases:["office_code","kode kantor","cabang","office code","kode cabang","branch"]},{key:"buss_unit",label:"Unit Bisnis",type:"text",placeholder:"R2 Regular",excelAliases:["buss_unit","unit bisnis","business unit","bu","tipe bisnis"]},{key:"trend_cycle",label:"Trend Cycle / Siklus",type:"text",placeholder:"Cycle 1",excelAliases:["trend_cycle","trend cycle","siklus","cycle","bucket"]}],sampleData:[{contract_no:"0123456789",customer_name:"Budi Santoso",nosin:"JF51E1234567",office_code:"JKT01",buss_unit:"R2 Regular",trend_cycle:"Cycle 1"},{contract_no:"0123456790",customer_name:"Siti Rahmawati",nosin:"JM31E9876543",office_code:"BDG02",buss_unit:"R2 Premium",trend_cycle:"Cycle 2"},{contract_no:"0123456791",customer_name:"Agus Setiawan",nosin:"MH1KC1123456",office_code:"SBY01",buss_unit:"R2 Regular",trend_cycle:"Cycle 1"}]},{key:"BookingQuality",name:"Master BQ",code:"BQ",badge:"Kualitas Booking",icon:'<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',description:"Data monitoring Booking Quality, jatuh tempo angsuran bulanan, dan status kolektibilitas.",sheetKeywords:["BQ","BOOKING","QUALITY","ANGSURAN","JATUH TEMPO","KOLEK"],idPrefix:"bq_",fields:[{key:"contract_no",label:"Nomor Kontrak",type:"text",required:!0,placeholder:"0123456789",excelAliases:["contract_no","no kontrak","nomor kontrak","kontrak","no. kontrak"]},{key:"customer_name",label:"Nama Konsumen",type:"text",required:!0,placeholder:"Nama konsumen",excelAliases:["customer_name","nama konsumen","nama nasabah","customer","nama"]},{key:"status_account",label:"Status Account",type:"select",required:!0,options:["Lancar","DPK","NPL","Menunggak","Lunas"],excelAliases:["status_account","status account","status","kolektibilitas","kol","status bayar"]},{key:"jatuh_tempo",label:"Tanggal Jatuh Tempo",type:"date",required:!0,excelAliases:["jatuh_tempo","jatuh tempo","tgl jatuh tempo","due date","tanggal tempo"]},{key:"angsuran",label:"Nilai Angsuran per Bulan",type:"currency",placeholder:"850000",excelAliases:["angsuran","installment","cicilan","nilai angsuran","angsuran per bulan","tagihan"]},{key:"marketing_name",label:"Nama Marketing / Sales",type:"text",placeholder:"Nama marketing penanggung jawab",excelAliases:["marketing_name","nama marketing","marketing","sales","pic"]}],sampleData:[{contract_no:"0123456789",customer_name:"Budi Santoso",status_account:"Lancar",jatuh_tempo:"2024-11-05",angsuran:85e4,marketing_name:"Dani Pratama"},{contract_no:"0123456790",customer_name:"Siti Rahmawati",status_account:"DPK",jatuh_tempo:"2024-11-10",angsuran:115e4,marketing_name:"Rina Wulandari"},{contract_no:"0123456791",customer_name:"Agus Setiawan",status_account:"Menunggak",jatuh_tempo:"2024-10-25",angsuran:92e4,marketing_name:"Dani Pratama"}]},{key:"FollowUpBahan",name:"Master Follow Up Gform",code:"GFORM",badge:"Leads Online",icon:'<svg class="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',description:"Data leads calon konsumen yang masuk dari Google Form atau registrasi website.",sheetKeywords:["GFORM","FOLLOW","BAHAN","GOOGLE FORM","FORM","LEADS"],idPrefix:"fub_",fields:[{key:"customer_name",label:"Nama Calon Konsumen",type:"text",required:!0,placeholder:"Nama calon konsumen",excelAliases:["customer_name","nama calon konsumen","nama pendaftar","nama","nama konsumen","nama lengkap"]},{key:"phone",label:"Nomor WhatsApp / HP",type:"text",required:!0,placeholder:"081234567890",excelAliases:["phone","no hp","nomor hp","telepon","whatsapp","no wa","kontak","telp"]},{key:"motor",label:"Unit Motor yang Diminati",type:"text",required:!0,placeholder:"Honda Beat / Vario 125",excelAliases:["motor","unit motor","tipe motor","pilihan motor","kendaraan","motor yang diminati"]},{key:"status",label:"Status Tindak Lanjut",type:"select",options:["bahan","follow_up","proses_taksasi","deal","batal"],excelAliases:["status","status tindak lanjut","tahap","stage","progres"]},{key:"notes",label:"Catatan Kebutuhan / Dana",type:"text",placeholder:"misal butuh dana 15 juta untuk usaha",excelAliases:["notes","catatan","keterangan","kebutuhan dana","pesan"]},{key:"marketing_name",label:"Marketing PIC",type:"text",placeholder:"Nama marketing penangan",excelAliases:["marketing_name","nama marketing","marketing","pic"]}],sampleData:[{customer_name:"Hendra Gunawan",phone:"081234567890",motor:"Honda Vario 125",status:"follow_up",notes:"Butuh dana 15 juta untuk modal toko",marketing_name:"Dani Pratama"},{customer_name:"Maya Anggraeni",phone:"081398765432",motor:"Yamaha Fazzio",status:"proses_taksasi",notes:"Gadai BPKB motor an sendiri",marketing_name:"Rina Wulandari"},{customer_name:"Wahyu Tri",phone:"085712349988",motor:"Honda Scoopy",status:"bahan",notes:"Tanya simulasi tenor 23 bulan",marketing_name:"Dani Pratama"}]},{key:"PriceList",name:"Master PriceList",code:"PL",badge:"Skema Angsuran",icon:'<svg class="w-4 h-4 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>',description:"Daftar simulasi uang muka (DP), tenor bulan, dan plafon angsuran pembiayaan.",sheetKeywords:["PRICE","PRICELIST","ANGSURAN","SKEMA","TENOR","SIMULASI"],idPrefix:"pl_",fields:[{key:"brand",label:"Merk Motor",type:"select",required:!0,options:["HONDA","YAMAHA","SUZUKI","KAWASAKI","VESPA","LAINNYA"],excelAliases:["brand","merk","merk motor"]},{key:"model",label:"Model / Tipe Motor",type:"text",required:!0,placeholder:"Beat CBS / NMAX 155",excelAliases:["model","tipe","type","nama motor","unit"]},{key:"year",label:"Tahun",type:"number",placeholder:"2024",excelAliases:["year","tahun","thn"]},{key:"otr",label:"Nilai OTR",type:"currency",placeholder:"18500000",excelAliases:["otr","harga otr","harga pasar"]},{key:"dp",label:"Uang Muka (DP)",type:"currency",placeholder:"2000000",excelAliases:["dp","uang muka","down payment"]},{key:"tenor",label:"Tenor (Bulan)",type:"select",required:!0,options:["11","17","23","29","35"],excelAliases:["tenor","jangka waktu","bulan","tenor bulan"]},{key:"angsuran",label:"Nilai Angsuran per Bulan",type:"currency",required:!0,placeholder:"795000",excelAliases:["angsuran","cicilan","angsuran per bulan","installment"]},{key:"plafond",label:"Plafond Pinjaman",type:"currency",placeholder:"16500000",excelAliases:["plafond","plafon","nilai pinjaman","pinjaman"]}],sampleData:[{brand:"HONDA",model:"Beat CBS",year:2024,otr:185e5,dp:2e6,tenor:"23",angsuran:795e3,plafond:165e5},{brand:"HONDA",model:"Beat CBS",year:2024,otr:185e5,dp:2e6,tenor:"35",angsuran:62e4,plafond:165e5},{brand:"YAMAHA",model:"NMAX 155",year:2023,otr:315e5,dp:35e5,tenor:"23",angsuran:142e4,plafond:28e6},{brand:"YAMAHA",model:"NMAX 155",year:2023,otr:315e5,dp:35e5,tenor:"35",angsuran:111e4,plafond:28e6}]},{key:"Prospect",name:"Master Bahan Prospek",code:"PROSPEK",badge:"Database Pipeline",icon:'<svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',description:"Kumpulan database prospek calon debitur dan pipeline harian marketing.",sheetKeywords:["PROSPEK","PROSPECT","PIPELINE","SALES","BAHAN PROSPEK"],idPrefix:"pro_",fields:[{key:"customer_name",label:"Nama Konsumen Prospek",type:"text",required:!0,placeholder:"Nama konsumen",excelAliases:["customer_name","nama konsumen","nama","nama prospek","debitur"]},{key:"phone",label:"Nomor WhatsApp / HP",type:"text",required:!0,placeholder:"081234567890",excelAliases:["phone","no hp","telepon","whatsapp","no wa"]},{key:"motor",label:"Unit Motor Taksasi",type:"text",required:!0,placeholder:"Honda Scoopy 2022",excelAliases:["motor","unit motor","unit","tipe motor","kendaraan"]},{key:"plafond",label:"Pengajuan Plafond",type:"currency",placeholder:"12000000",excelAliases:["plafond","plafon","pengajuan","kebutuhan pinjaman"]},{key:"status",label:"Status Pipeline",type:"select",options:["baru","proses","taksasi","deal","batal"],excelAliases:["status","tahap","stage"]},{key:"marketing_name",label:"Nama Marketing",type:"text",placeholder:"Nama marketing",excelAliases:["marketing_name","nama marketing","marketing"]}],sampleData:[{customer_name:"Dedi Kurniawan",phone:"081288991122",motor:"Honda PCX 160 2023",plafond:2e7,status:"proses",marketing_name:"Dani Pratama"},{customer_name:"Anisa Rahayu",phone:"081377889900",motor:"Yamaha Aerox 155 2022",plafond:14e6,status:"baru",marketing_name:"Rina Wulandari"},{customer_name:"Rudi Hartono",phone:"085811223344",motor:"Honda Beat Street 2021",plafond:9e6,status:"deal",marketing_name:"Dani Pratama"}]},{key:"Target",name:"Master Target Sales",code:"TARGET",badge:"Target Marketing",icon:'<svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',description:"Target pencapaian nominal plafond & jumlah unit per marketing bulanan.",sheetKeywords:["TARGET","GOAL","KPI","BULANAN","SALES TARGET"],idPrefix:"tar_",fields:[{key:"marketing_name",label:"Nama Marketing",type:"text",required:!0,placeholder:"Nama marketing",excelAliases:["marketing_name","nama marketing","marketing","sales","pic"]},{key:"cabang",label:"Cabang / Kantor",type:"text",placeholder:"Cabang Jakarta Pusat",excelAliases:["cabang","branch","kode cabang","kantor"]},{key:"month",label:"Bulan Periode",type:"text",required:!0,placeholder:"2024-10",excelAliases:["month","bulan","periode","bulan target"]},{key:"target_amount",label:"Target Nominal Plafond",type:"currency",required:!0,placeholder:"150000000",excelAliases:["target_amount","target nominal","target plafond","target rp"]},{key:"target_count",label:"Target Jumlah Unit",type:"number",placeholder:"12",excelAliases:["target_count","target unit","jumlah unit","target jumlah"]}],sampleData:[{marketing_name:"Dani Pratama",cabang:"Cabang Jakarta Pusat",month:"2024-10",target_amount:15e7,target_count:12},{marketing_name:"Rina Wulandari",cabang:"Cabang Jakarta Pusat",month:"2024-10",target_amount:18e7,target_count:15},{marketing_name:"Ahmad Fauzi",cabang:"Cabang Bandung",month:"2024-10",target_amount:12e7,target_count:10}]}];function Ns(n){let e=typeof n=="string"?parseFloat(n.replace(/[^0-9.-]+/g,""))||0:n||0;return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e)}var u={activeEntityKey:"OtrPrice",activeSubView:"upload",workbook:null,cachedCounts:{},tableRecords:{},searchQuery:"",isSaving:!1,saveProgress:0,saveMessage:"",feedback:null};async function qn(){return typeof window<"u"&&window.XLSX?window.XLSX:new Promise(n=>{let e=document.getElementById("sheetjs-script");if(e){e.addEventListener("load",()=>n(window.XLSX)),setTimeout(()=>n(window.XLSX),1e3);return}let t=document.createElement("script");t.id="sheetjs-script",t.src="/xlsx.full.min.js",t.onload=()=>n(window.XLSX),t.onerror=()=>n(null),document.head.appendChild(t)})}function ke(n){return String(n||"").toLowerCase().replace(/[^a-z0-9]/g," ").trim()}function Go(n,e){if(!n||n.length===0)return{headerRowIndex:0,headers:[]};let t=0,r=-1,s=Math.min(12,n.length);for(let o=0;o<s;o++){let c=n[o];if(!Array.isArray(c)||c.length===0)continue;let l=0,d=c.map(h=>ke(h));e.fields.forEach(h=>{let m=[h.key.toLowerCase(),...h.excelAliases.map(ke)];for(let p of d)if(p&&m.some(g=>p===g||p.includes(g)||g.includes(p))){l+=2;break}}),l>r&&(r=l,t=o)}let i=(Array.isArray(n[t])?n[t]:[]).map((o,c)=>o!=null&&String(o).trim()!==""?String(o).trim():`Kolom_${c+1}`);return{headerRowIndex:t,headers:i}}function Cs(n,e){let t={id:`${e.idPrefix}${Date.now()}_${Math.floor(Math.random()*1e5)}`,created_date:new Date().toISOString()},r=Object.keys(n);return e.fields.forEach(s=>{let a,i=[s.key.toLowerCase(),...s.excelAliases.map(ke)];for(let o of r){let c=ke(o);if(c===s.key.toLowerCase()){a=n[o];break}if(i.some(l=>c===l||c.includes(l)||l.includes(c))){a=n[o];break}}if(a!=null&&String(a).trim()!==""){let o=String(a).trim();s.type==="number"?t[s.key]=parseInt(o.replace(/[^0-9-]/g,""),10)||0:s.type==="currency"?t[s.key]=parseFloat(o.replace(/[^0-9.-]/g,""))||0:(s.type,t[s.key]=o)}else s.type==="number"||s.type==="currency"?t[s.key]=0:s.type==="select"&&s.options?t[s.key]=s.options[0]:t[s.key]=""}),e.key==="OtrPrice"&&(t.search_text=`${t.brand||""} ${t.model||""} ${t.year||""} ${t.object_description||""}`.trim()),t}async function Dt(n){let e=N.find(l=>l.key===n)||N[0],t=await qn();if(t)try{let l=e.sampleData.map(m=>{let p={};return e.fields.forEach(g=>{p[g.label]=m[g.key]??""}),p}),d=t.utils.json_to_sheet(l),h=t.utils.book_new();t.utils.book_append_sheet(h,d,e.code),t.writeFile(h,`Template_${e.name.replace(/\s+/g,"_")}.xlsx`);return}catch(l){console.warn("XLSX write template fallback:",l)}let r=e.fields.map(l=>`"${l.label.replace(/"/g,'""')}"`).join(","),s=e.sampleData.map(l=>e.fields.map(d=>{let h=l[d.key]??"";return`"${String(h).replace(/"/g,'""')}"`}).join(",")),a="\uFEFF"+[r,...s].join(`
`),i=new Blob([a],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(i),c=document.createElement("a");c.href=o,c.download=`Template_${e.name.replace(/\s+/g,"_")}.csv`,c.click(),URL.revokeObjectURL(o)}function _e(n,e="upload"){if(n){let r=N.find(s=>s.key.toLowerCase()===n.toLowerCase()||s.code.toLowerCase()===n.toLowerCase());r&&(u.activeEntityKey=r.key)}u.activeSubView=e,u.workbook=null,u.feedback=null;let t=document.getElementById("smart-master-import-hub-modal");t||(t=document.createElement("div"),t.id="smart-master-import-hub-modal",t.className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 lg:p-6 overflow-y-auto animate-fadeIn",document.body.appendChild(t)),C(),Lt(u.activeEntityKey)}function Os(){let n=document.getElementById("smart-master-import-hub-modal");n&&n.remove()}function Mt(){if(document.getElementById("smart-master-hub-trigger-btn"))return;let n=document.createElement("button");n.id="smart-master-hub-trigger-btn",n.type="button",n.className="fixed bottom-5 right-5 z-[9000] flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs shadow-[0_10px_25px_rgba(6,182,212,0.4)] border border-cyan-400/40 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md",n.innerHTML=`
    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" />
    </svg>
    <span>Master Import Hub</span>
  `,n.onclick=()=>_e(),document.body.appendChild(n)}typeof window<"u"&&(window.openMasterImportHub=_e,window.closeMasterImportHub=Os,window.mountMasterImportHub=Mt,window.downloadEntityExcelTemplate=Dt);async function Lt(n){try{let e=await fetch(`/api/entities/${n}/count`);if(e.ok){let t=await e.json();u.cachedCounts[n]=t.count||0;let r=document.getElementById(`count-badge-${n}`);r&&(r.innerText=`${t.count||0} Data`);let s=document.getElementById("hub-current-entity-count");s&&u.activeEntityKey===n&&(s.innerText=`${t.count||0} Tersimpan`)}}catch{}}async function Gn(n){let e=document.getElementById("hub-table-content");e&&(e.innerHTML=`
      <div class="flex items-center justify-center p-8 text-cyan-400 gap-3">
        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span class="text-xs font-semibold">Memuat data dari database...</span>
      </div>
    `);try{let t=await fetch(`/api/entities/${n}`);if(t.ok){let r=await t.json();u.tableRecords[n]=Array.isArray(r)?r:[],u.cachedCounts[n]=u.tableRecords[n].length,Ut(n)}else e&&(e.innerHTML=`<div class="p-4 text-xs text-rose-400 text-center">Gagal memuat data (status ${t.status})</div>`)}catch(t){e&&(e.innerHTML=`<div class="p-4 text-xs text-rose-400 text-center">Gagal koneksi: ${t.message}</div>`)}}async function Jo(n){let e=N.find(l=>l.key===n)||N[0],t=u.tableRecords[n];if(!t||t.length===0)try{let l=await fetch(`/api/entities/${n}`);l.ok&&(t=await l.json())}catch{}if(!t||t.length===0){A(`Belum ada data ${e.name} untuk diekspor.`,"info");return}let r=await qn();if(r)try{let l=t.map(m=>{let p={};return e.fields.forEach(g=>{p[g.label]=m[g.key]??""}),p}),d=r.utils.json_to_sheet(l),h=r.utils.book_new();r.utils.book_append_sheet(h,d,e.code),r.writeFile(h,`${e.name.replace(/\s+/g,"_")}_${new Date().toISOString().slice(0,10)}.xlsx`),A(`Berhasil mengekspor ${t.length} data ke Excel.`,"success");return}catch(l){console.warn("Export XLSX error:",l)}let s=e.fields.map(l=>`"${l.label.replace(/"/g,'""')}"`).join(","),a=t.map(l=>e.fields.map(d=>`"${String(l[d.key]??"").replace(/"/g,'""')}"`).join(",")),i=new Blob(["\uFEFF"+[s,...a].join(`
`)],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(i),c=document.createElement("a");c.href=o,c.download=`${e.name.replace(/\s+/g,"_")}_${new Date().toISOString().slice(0,10)}.csv`,c.click(),URL.revokeObjectURL(o)}async function Yo(n){let e=N.find(t=>t.key===n)||N[0];if(confirm(`APAKAH ANDA YAKIN?

Semua data ${e.name} akan dihapus bersih dari database.`))try{let t=await fetch(`/api/entities/${n}/delete-many`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ids:[]})});t.ok?(u.cachedCounts[n]=0,u.tableRecords[n]=[],A(`Seluruh data ${e.name} berhasil dibersihkan.`,"success"),C(),u.activeSubView==="table"&&Ut(n)):A(`Gagal menghapus data (status ${t.status})`,"error")}catch(t){A(`Gagal reset data: ${t.message}`,"error")}}async function Xo(n,e){A(`Membaca file "${n.name}" untuk ${e.name}...`,"info");try{let t=await qn();if(!t){let l=new FormData;l.append("file",n);let d=await fetch("/api/excel/inspect",{method:"POST",body:l});if(!d.ok)throw new Error("Gagal memeriksa file di server.");let h=await d.json();if(!h.sheets||h.sheets.length===0)throw new Error("Tidak ada Sheet yang terbaca dari file ini.");let m=h.sheets.map(p=>{let g=(p.sample||[]).map(k=>Cs(k,e));return{name:p.name,rawRows:p.sample||[],headers:p.headers||[],mappedRecords:g,matchedFields:[]}});u.workbook={fileName:n.name,sheets:m,activeSheetIndex:0},A(`Berhasil memuat file "${n.name}". Periksa tabel pratinjau di bawah.`,"success"),C();return}let r=await n.arrayBuffer(),s=t.read(r,{type:"array",cellDates:!0,cellNF:!1});if(!s.SheetNames||s.SheetNames.length===0)throw new Error("File Excel tidak memiliki Sheet.");let a=[];for(let l of s.SheetNames){let d=s.Sheets[l];if(!d)continue;let h=t.utils.sheet_to_json(d,{header:1,blankrows:!1,defval:""});if(!h||h.length===0)continue;let{headerRowIndex:m,headers:p}=Go(h,e),g=h.slice(m+1),k=[];if(g.forEach(y=>{if(!Array.isArray(y)||!y.some(I=>I!=null&&String(I).trim()!==""))return;let v={};p.forEach((I,x)=>{v[I]=y[x]??""}),k.push(v)}),k.length>0){let y=k.map(v=>Cs(v,e)),b=[];e.fields.forEach(v=>{let I=[v.key.toLowerCase(),...v.excelAliases.map(ke)];for(let x of p){let le=ke(x);if(I.some(Te=>le===Te||le.includes(Te)||Te.includes(le))){b.push({fieldKey:v.key,excelHeader:x,label:v.label});break}}}),a.push({name:l,rawRows:k,headers:p,mappedRecords:y,matchedFields:b})}}if(a.length===0)throw new Error(`File Excel "${n.name}" tidak memiliki data baris yang dapat dibaca.`);let i=0,o=a.findIndex(l=>{let d=l.name.toUpperCase();return e.sheetKeywords.some(h=>d.includes(h))});o>=0&&(i=o),u.workbook={fileName:n.name,sheets:a,activeSheetIndex:i};let c=a[i];A(`Berhasil membaca "${n.name}" (${c.mappedRecords.length} data pada Sheet "${c.name}").`,"success"),C()}catch(t){console.error("Process Excel error:",t),A(`Gagal membaca file: ${t.message}`,"error")}}async function Qo(n){if(!u.workbook||!u.workbook.sheets[u.workbook.activeSheetIndex]){A("Belum ada data Excel yang siap disimpan.","error");return}let t=u.workbook.sheets[u.workbook.activeSheetIndex].mappedRecords;if(!t||t.length===0){A("Tidak ada baris data untuk diimport.","error");return}u.isSaving=!0,u.saveProgress=5,u.saveMessage=`Menyiapkan ${t.length} data untuk ${n.name}...`,C();try{let s=t.length,a=0;for(let i=0;i<s;i+=75){let o=t.slice(i,i+75),c=await fetch(`/api/entities/${n.key}/bulk`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!c.ok)throw new Error(`Gagal menyimpan batch data (HTTP ${c.status})`);a+=o.length,u.saveProgress=Math.min(95,Math.round(a/s*100)),u.saveMessage=`Menyimpan ${a} dari ${s} data ke ${n.name}...`,Rs(u.saveProgress,u.saveMessage)}u.saveProgress=100,u.saveMessage=`Selesai! Seluruh ${s} data berhasil disimpan ke ${n.name}.`,Rs(100,u.saveMessage),setTimeout(()=>{u.isSaving=!1,u.workbook=null,u.cachedCounts[n.key]=(u.cachedCounts[n.key]||0)+s,A(`\u{1F389} SUKSES! ${s} data berhasil diimport ke ${n.name}.`,"success"),u.activeSubView="table",C(),Gn(n.key)},500)}catch(r){u.isSaving=!1,A(`Gagal simpan data: ${r.message}`,"error"),C()}}function Rs(n,e){let t=document.getElementById("hub-save-progress-bar"),r=document.getElementById("hub-save-progress-label");t&&(t.style.width=`${n}%`),r&&(r.innerText=e)}function A(n,e="info"){u.feedback={message:n,type:e};let t=document.getElementById("hub-notification-box");if(!t)return;let r=e==="success"?"bg-emerald-950/80 border-emerald-500/50 text-emerald-300":e==="error"?"bg-rose-950/80 border-rose-500/50 text-rose-300":"bg-cyan-950/80 border-cyan-500/50 text-cyan-300";t.className=`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 shadow-lg backdrop-blur-md animate-fadeIn ${r}`,t.innerHTML=`
    <div class="flex items-center gap-2">
      <span class="text-sm font-bold">${e==="success"?"\u2713":e==="error"?"\u2715":"\u2139"}</span>
      <span>${n}</span>
    </div>
    <button type="button" class="text-slate-400 hover:text-white text-xs px-2 cursor-pointer" onclick="this.parentElement.remove()">&times;</button>
  `}function C(){let n=document.getElementById("smart-master-import-hub-modal");if(!n)return;let e=N.find(r=>r.key===u.activeEntityKey)||N[0],t=u.cachedCounts[e.key]??"...";n.innerHTML=`
    <div class="relative w-full max-w-6xl rounded-3xl bg-[#080d1a] border border-cyan-500/30 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.18)] text-slate-100 overflow-hidden my-auto flex flex-col max-h-[94vh]">
      
      <!-- Top Header & Modal Title -->
      <div class="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800/80 bg-[#0d1629]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-bold tracking-tight text-white">Master Data & Import Hub</h1>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                1 Tab 1 Pengimportan
              </span>
            </div>
            <p class="text-[11px] sm:text-xs text-slate-400">Pilih tab master di bawah untuk import Excel khusus, input manual, dan manajemen data.</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button id="btn-close-master-hub" type="button" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 flex items-center justify-center transition-all cursor-pointer border border-slate-700/60" title="Tutup Modal">
            &times;
          </button>
        </div>
      </div>

      <!-- MAIN TABS: 1 TAB UNTUK SETIAP PENGIMPORTAN MASTER -->
      <div class="border-b border-slate-800/90 bg-slate-950/70 px-3 sm:px-6 pt-2">
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
          ${N.map(r=>{let s=r.key===u.activeEntityKey,a=u.cachedCounts[r.key];return`
              <button 
                type="button" 
                data-entity="${r.key}"
                class="hub-master-tab flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${s?"bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-cyan-400/80 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]":"bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"}"
              >
                ${r.icon}
                <span>${r.name}</span>
                <span id="count-badge-${r.key}" class="px-1.5 py-0.5 rounded-md text-[10px] font-mono ${s?"bg-cyan-500/30 text-cyan-200":"bg-slate-800 text-slate-400"}">
                  ${a!==void 0?`${a}`:""}
                </span>
              </button>
            `}).join("")}
        </div>
      </div>

      <!-- Sub-Bar: Active Master Context & Toolbar -->
      <div class="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#0a1120] border-b border-slate-800/70">
        <div class="flex items-center gap-2.5">
          <span class="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            ${e.code}
          </span>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-white">${e.name}</span>
              <span class="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-emerald-400 border border-slate-700 font-medium" id="hub-current-entity-count">
                ${t!=="..."?`${t} Tersimpan`:"Memuat data..."}
              </span>
            </div>
            <p class="text-[11px] text-slate-400 hidden sm:block">${e.description}</p>
          </div>
        </div>

        <!-- Master Actions: Template Download, Refresh, Clear, Export -->
        <div class="flex items-center gap-2">
          <button id="btn-download-template" type="button" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer shadow-sm" title="Unduh format file Excel resmi">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Unduh Template Excel</span>
          </button>

          <button id="btn-export-excel" type="button" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer" title="Ekspor data saat ini ke Excel">
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Ekspor</span>
          </button>

          <button id="btn-clear-entity" type="button" class="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/30 transition-all cursor-pointer" title="Hapus semua data master ini">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Hapus</span>
          </button>
        </div>
      </div>

      <!-- Section Switcher (Sub-Views for this Master) -->
      <div class="px-4 sm:px-6 pt-3 bg-slate-900/40 border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button id="subtab-upload" type="button" class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer ${u.activeSubView==="upload"?"border-cyan-400 text-cyan-300 bg-cyan-950/30":"border-transparent text-slate-400 hover:text-slate-200"}">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span>Upload File Excel</span>
          </button>

          <button id="subtab-manual" type="button" class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer ${u.activeSubView==="manual"?"border-cyan-400 text-cyan-300 bg-cyan-950/30":"border-transparent text-slate-400 hover:text-slate-200"}">
            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Input Manual 1 Data</span>
          </button>

          <button id="subtab-table" type="button" class="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer ${u.activeSubView==="table"?"border-cyan-400 text-cyan-300 bg-cyan-950/30":"border-transparent text-slate-400 hover:text-slate-200"}">
            <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>Data Tersimpan</span>
          </button>
        </div>
      </div>

      <!-- Notification Toast Area -->
      <div id="hub-notification-box" class="px-4 sm:px-6 pt-3 empty:hidden"></div>

      <!-- Modal Body Content -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        
        ${u.isSaving?`
          <!-- Saving Progress Card -->
          <div class="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/40 text-center space-y-4 shadow-xl">
            <div class="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto"></div>
            <div class="space-y-1">
              <h3 class="text-base font-bold text-white">Menyimpan Data ke Database...</h3>
              <p id="hub-save-progress-label" class="text-xs text-slate-300">${u.saveMessage}</p>
            </div>
            <div class="w-full max-w-md bg-slate-800 rounded-full h-3 mx-auto overflow-hidden border border-slate-700">
              <div id="hub-save-progress-bar" class="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300 rounded-full" style="width: ${u.saveProgress}%"></div>
            </div>
            <p class="text-[11px] text-slate-400">Harap jangan menutup halaman selama proses penyimpanan berlangsung.</p>
          </div>
        `:u.activeSubView==="upload"?Zo(e):u.activeSubView==="manual"?ec(e):tc(e)}

      </div>
    </div>
  `,nc(e)}function Zo(n){let e=u.workbook?.sheets[u.workbook.activeSheetIndex];return`
    <div class="space-y-6">
      <!-- 1. Dedicated Drop Zone for this Master -->
      <div id="excel-drop-zone" class="relative group border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-3xl p-6 sm:p-8 text-center transition-all bg-gradient-to-b from-slate-900/60 to-slate-950/80 hover:bg-slate-900/80 cursor-pointer shadow-inner">
        <input type="file" id="excel-file-input" accept=".xlsx, .xls, .csv" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
        
        <div class="flex flex-col items-center justify-center space-y-3 pointer-events-none">
          <div class="w-14 h-14 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-bold text-white">
              Tarik & Lepas File Excel <span class="text-cyan-400">${n.name}</span> di Sini
            </h3>
            <p class="text-xs text-slate-400 mt-1">Mendukung format file <span class="text-slate-300 font-mono">.xlsx</span>, <span class="text-slate-300 font-mono">.xls</span>, atau <span class="text-slate-300 font-mono">.csv</span></p>
          </div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/40">
            <span>Pilih File dari Komputer / HP</span>
          </div>
        </div>
      </div>

      <!-- Expected Columns Guidance Chips -->
      <div class="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Kolom yang Dikenali Otomatis untuk ${n.name}:
          </span>
          <button type="button" onclick="window.downloadEntityExcelTemplate('${n.key}')" class="text-[11px] text-emerald-400 hover:text-emerald-300 underline font-semibold cursor-pointer">
            Unduh Contoh Format (.xlsx)
          </button>
        </div>
        <div class="flex flex-wrap gap-1.5">
          ${n.fields.map(t=>`
            <span class="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700/80 flex items-center gap-1">
              <span>${t.label}</span>
              ${t.required?'<span class="text-rose-400 font-bold" title="Wajib">*</span>':""}
            </span>
          `).join("")}
        </div>
      </div>

      <!-- 2. Preview & Import Section (Rendered when file is parsed) -->
      ${u.workbook&&e?`
        <div class="p-5 sm:p-6 rounded-3xl bg-slate-900/70 border border-cyan-500/30 space-y-5 shadow-xl animate-fadeIn">
          
          <!-- Sheet Bar & Summary -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-white">File: ${u.workbook.fileName}</span>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ${e.mappedRecords.length} Baris Data Ditemukan
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Periksa data di bawah. Jika sudah sesuai, klik tombol simpan di sebelah kanan.</p>
            </div>

            <!-- Multi-Sheet Selector if more than 1 sheet -->
            ${u.workbook.sheets.length>1?`
              <div class="flex items-center gap-2">
                <label class="text-xs text-slate-400">Pilih Sheet:</label>
                <select id="select-active-sheet" class="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold focus:outline-none focus:border-cyan-400 cursor-pointer">
                  ${u.workbook.sheets.map((t,r)=>`
                    <option value="${r}" ${r===u.workbook.activeSheetIndex?"selected":""}>
                      Sheet: ${t.name} (${t.mappedRecords.length} data)
                    </option>
                  `).join("")}
                </select>
              </div>
            `:""}
          </div>

          <!-- Matched Columns Pill Indicators -->
          <div class="space-y-1.5">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Status Pemetaan Kolom:</span>
            <div class="flex flex-wrap gap-2">
              ${n.fields.map(t=>{let r=e.matchedFields?.some(s=>s.fieldKey===t.key);return`
                  <span class="px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${r?"bg-emerald-500/10 border-emerald-500/40 text-emerald-300":t.required?"bg-amber-500/10 border-amber-500/40 text-amber-300":"bg-slate-800/80 border-slate-700 text-slate-400"}">
                    <span>${r?"\u2713":t.required?"!":"\u25CB"}</span>
                    <span>${t.label}</span>
                  </span>
                `}).join("")}
            </div>
          </div>

          <!-- Live Preview Table (First 8 Rows) -->
          <div class="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
            <div class="overflow-x-auto max-h-72">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-900/90 text-slate-400 font-bold border-b border-slate-800 sticky top-0">
                  <tr>
                    <th class="p-3 w-10 text-center">#</th>
                    ${n.fields.map(t=>`<th class="p-3 whitespace-nowrap">${t.label}</th>`).join("")}
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 font-mono text-slate-300 text-[11px]">
                  ${e.mappedRecords.slice(0,8).map((t,r)=>`
                    <tr class="hover:bg-slate-900/40 transition-colors">
                      <td class="p-3 text-center text-slate-500 font-bold">${r+1}</td>
                      ${n.fields.map(s=>{let a=t[s.key];return`<td class="p-3 whitespace-nowrap">${(s.type==="currency"?Ns(a):String(a??"-"))||'<span class="text-slate-600 italic">(kosong)</span>'}</td>`}).join("")}
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
            ${e.mappedRecords.length>8?`<div class="p-2.5 text-center text-[11px] text-slate-400 bg-slate-900/80 border-t border-slate-800">
                    Menampilkan 8 dari total ${e.mappedRecords.length} baris data yang siap diimport.
                  </div>`:""}
          </div>

          <!-- Big Action Button -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button id="btn-cancel-preview" type="button" class="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer">
              Batal
            </button>
            <button id="btn-execute-import" type="button" class="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer font-bold transform active:scale-95">
              <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Simpan & Import ${e.mappedRecords.length} Data ke ${n.name}</span>
            </button>
          </div>

        </div>
      `:""}
    </div>
  `}function ec(n){return`
    <div class="max-w-2xl mx-auto p-5 sm:p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-5 shadow-xl animate-fadeIn">
      <div class="border-b border-slate-800 pb-3">
        <h3 class="text-sm font-bold text-white flex items-center gap-2">
          ${n.icon}
          <span>Form Tambah Data Manual: ${n.name}</span>
        </h3>
        <p class="text-xs text-slate-400 mt-0.5">Input data satuan satu per satu langsung ke database.</p>
      </div>

      <form id="form-manual-entity-entry" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${n.fields.map(e=>`
            <div class="${e.type==="text"&&e.key==="object_description"?"sm:col-span-2":""}">
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">
                ${e.label} ${e.required?'<span class="text-rose-400">*</span>':""}
              </label>

              ${e.type==="select"&&e.options?`
                <select name="${e.key}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 cursor-pointer">
                  ${e.options.map(t=>`<option value="${t}">${t}</option>`).join("")}
                </select>
              `:e.type==="currency"?`
                <div class="relative">
                  <span class="absolute left-3 top-2 text-xs text-slate-500 font-bold">Rp</span>
                  <input type="number" name="${e.key}" placeholder="${e.placeholder||"0"}" ${e.required?"required":""} class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400" />
                </div>
              `:e.type==="number"?`
                <input type="number" name="${e.key}" placeholder="${e.placeholder||"0"}" ${e.required?"required":""} class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400" />
              `:e.type==="date"?`
                <input type="date" name="${e.key}" ${e.required?"required":""} class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400" />
              `:`
                <input type="text" name="${e.key}" placeholder="${e.placeholder||""}" ${e.required?"required":""} class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-cyan-400" />
              `}
            </div>
          `).join("")}
        </div>

        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button type="reset" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer">
            Reset Form
          </button>
          <button type="submit" id="btn-submit-manual-entry" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all cursor-pointer">
            Simpan ke Database
          </button>
        </div>
      </form>
    </div>
  `}function tc(n){return setTimeout(()=>Gn(n.key),50),`
    <div class="space-y-4 animate-fadeIn">
      <!-- Search & Action Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="relative w-full sm:w-72">
          <input 
            type="text" 
            id="hub-table-search-input" 
            placeholder="Cari data ${n.name}..." 
            value="${u.searchQuery}"
            class="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          />
          <svg class="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div class="flex items-center gap-2">
          <button id="btn-refresh-table" type="button" class="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer">
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <!-- Table Body Container -->
      <div id="hub-table-content" class="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/70">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `}function Ut(n){let e=document.getElementById("hub-table-content");if(!e)return;let t=N.find(s=>s.key===n)||N[0],r=u.tableRecords[n]||[];if(u.searchQuery.trim()){let s=u.searchQuery.toLowerCase();r=r.filter(a=>Object.values(a).some(i=>String(i||"").toLowerCase().includes(s)))}if(r.length===0){e.innerHTML=`
      <div class="p-10 text-center space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p class="text-xs text-slate-400 font-medium">Belum ada data untuk ${t.name}.</p>
        <button type="button" onclick="window.openMasterImportHub('${t.key}', 'upload')" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 cursor-pointer">
          Upload File Excel Sekarang
        </button>
      </div>
    `;return}e.innerHTML=`
    <div class="overflow-x-auto max-h-[60vh]">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 sticky top-0">
          <tr>
            <th class="p-3 w-10 text-center">#</th>
            ${t.fields.map(s=>`<th class="p-3 whitespace-nowrap">${s.label}</th>`).join("")}
            <th class="p-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60 font-mono text-slate-300 text-[11px]">
          ${r.map((s,a)=>`
            <tr class="hover:bg-slate-900/40 transition-colors">
              <td class="p-3 text-center text-slate-500 font-bold">${a+1}</td>
              ${t.fields.map(i=>{let o=s[i.key];return`<td class="p-3 whitespace-nowrap">${i.type==="currency"?Ns(o):String(o??"-")}</td>`}).join("")}
              <td class="p-3 text-right whitespace-nowrap">
                <button type="button" class="btn-delete-record text-rose-400 hover:text-rose-300 p-1 cursor-pointer" data-id="${s.id}" title="Hapus record">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    <div class="p-3 bg-slate-900 border-t border-slate-800 text-slate-400 text-[11px] flex items-center justify-between">
      <span>Total: <strong class="text-white">${r.length}</strong> data tersimpan</span>
      <span>${t.name} (${t.code})</span>
    </div>
  `,e.querySelectorAll(".btn-delete-record").forEach(s=>{s.addEventListener("click",async a=>{let i=a.currentTarget.getAttribute("data-id");if(i&&confirm("Hapus baris data ini?"))try{(await fetch(`/api/entities/${n}/${i}`,{method:"DELETE"})).ok&&(u.tableRecords[n]=(u.tableRecords[n]||[]).filter(c=>String(c.id)!==String(i)),u.cachedCounts[n]=u.tableRecords[n].length,Ut(n),Lt(n))}catch(o){alert("Gagal menghapus: "+o.message)}})})}function nc(n){let e=document.getElementById("btn-close-master-hub");e&&(e.onclick=Os),document.querySelectorAll(".hub-master-tab").forEach(k=>{k.addEventListener("click",y=>{let b=y.currentTarget.getAttribute("data-entity");b&&b!==u.activeEntityKey&&(u.activeEntityKey=b,u.workbook=null,u.feedback=null,C(),Lt(b))})});let t=document.getElementById("subtab-upload");t&&(t.onclick=()=>{u.activeSubView="upload",C()});let r=document.getElementById("subtab-manual");r&&(r.onclick=()=>{u.activeSubView="manual",C()});let s=document.getElementById("subtab-table");s&&(s.onclick=()=>{u.activeSubView="table",C()});let a=document.getElementById("btn-download-template");a&&(a.onclick=()=>Dt(n.key));let i=document.getElementById("btn-export-excel");i&&(i.onclick=()=>Jo(n.key));let o=document.getElementById("btn-clear-entity");o&&(o.onclick=()=>Yo(n.key));let c=document.getElementById("excel-file-input");c&&(c.onchange=async k=>{let y=k.target.files?.[0];y&&await Xo(y,n)});let l=document.getElementById("btn-cancel-preview");l&&(l.onclick=()=>{u.workbook=null,C()});let d=document.getElementById("btn-execute-import");d&&(d.onclick=()=>Qo(n));let h=document.getElementById("select-active-sheet");h&&u.workbook&&(h.onchange=k=>{let y=parseInt(k.target.value,10);!isNaN(y)&&u.workbook&&u.workbook.sheets[y]&&(u.workbook.activeSheetIndex=y,C())});let m=document.getElementById("form-manual-entity-entry");m&&(m.onsubmit=async k=>{k.preventDefault();let y=new FormData(m),b={};n.fields.forEach(v=>{let I=y.get(v.key);v.type==="number"?b[v.key]=parseInt(String(I||0),10)||0:v.type==="currency"?b[v.key]=parseFloat(String(I||0))||0:b[v.key]=String(I||"").trim()}),n.key==="OtrPrice"&&(b.search_text=`${b.brand||""} ${b.model||""} ${b.year||""} ${b.object_description||""}`.trim());try{let v=await fetch(`/api/entities/${n.key}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});v.ok?(A(`Data berhasil disimpan ke ${n.name}!`,"success"),m.reset(),Lt(n.key)):A(`Gagal menyimpan data (status ${v.status})`,"error")}catch(v){A(`Gagal simpan data: ${v.message}`,"error")}});let p=document.getElementById("hub-table-search-input");p&&(p.oninput=k=>{u.searchQuery=k.target.value,Ut(n.key)});let g=document.getElementById("btn-refresh-table");g&&(g.onclick=()=>Gn(n.key))}typeof window<"u"&&(window.mountMasterImportHub=Mt,window.openMasterImportHub=_e,window.downloadEntityExcelTemplate=Dt);var rc=fn().length?fn()[0]:pn(Ps),q=Kn(rc),Ms=new oe;Ms.setCustomParameters({prompt:"select_account"});try{Ke(q,qe).catch(()=>{})}catch{}var ee="login",Ht=!1,$t=null,Ft=null;function Ls(n){switch(n?.code||""){case"auth/user-not-found":return"Akun dengan email ini belum terdaftar. Silakan pilih Daftar Akun.";case"auth/wrong-password":case"auth/invalid-credential":return"Email atau kata sandi yang Anda masukkan salah.";case"auth/email-already-in-use":return"Alamat email ini sudah terdaftar. Silakan pilih Masuk ke Akun.";case"auth/weak-password":return"Kata sandi terlalu pendek. Masukkan minimal 6 karakter.";case"auth/invalid-email":return"Format alamat email tidak valid.";case"auth/popup-closed-by-user":return"Jendela masuk Google ditutup sebelum proses selesai.";case"auth/popup-blocked":return"Jendela popup Google diblokir browser. Izinkan popup untuk melanjutkan.";case"auth/network-request-failed":return"Gagal terhubung ke jaringan. Periksa sambungan internet Anda.";case"auth/too-many-requests":return"Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat lagi.";case"auth/operation-not-allowed":return"Metode autentikasi ini sedang dinonaktifkan di Firebase Console. Gunakan Masuk dengan Google.";default:return n?.message||"Terjadi kesalahan saat autentikasi. Silakan coba lagi."}}async function Vt(n,e){try{await fetch("/api/auth/session",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({uid:e.uid,email:e.email,displayName:e.displayName||(e.email?e.email.split("@")[0]:"User Taksasi"),photoURL:e.photoURL||null})})}catch(t){console.warn("Session sync warning (non-blocking):",t)}}function Us(){try{for(let n=localStorage.length-1;n>=0;n--){let e=(localStorage.key(n)||"").toLowerCase();e.startsWith("base")&&e.includes("44")&&localStorage.removeItem(localStorage.key(n)||"")}}catch{}}function xe(n,e){localStorage.setItem("smart_access_token",n),localStorage.setItem("auth_token",n),localStorage.setItem("token",n),Us(),localStorage.setItem("smart_taksasi_user",JSON.stringify({uid:e.uid,email:e.email,displayName:e.displayName||(e.email?e.email.split("@")[0]:"User Taksasi"),photoURL:e.photoURL||null}))}function Yn(){localStorage.removeItem("smart_access_token"),localStorage.removeItem("auth_token"),localStorage.removeItem("token"),Us(),localStorage.removeItem("smart_taksasi_user")}function Jn(n,e,t){let r=t?t.innerHTML:"";t&&(t.innerHTML=`
      <svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Mengunduh...</span>
    `),fetch(n).then(s=>{if(!s.ok)throw new Error(`HTTP ${s.status}`);return s.blob()}).then(s=>{let a=window.URL.createObjectURL(s),i=document.createElement("a");i.href=a,i.download=e,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>window.URL.revokeObjectURL(a),1e4),t&&(t.innerHTML=`
          <svg class="w-3.5 h-3.5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Tersimpan!</span>
        `,setTimeout(()=>{t&&(t.innerHTML=r)},2500))}).catch(s=>{console.warn("Direct blob fetch notice:",s);let a=document.createElement("a");a.href=n,a.download=e,document.body.appendChild(a),a.click(),a.remove(),t&&(t.innerHTML=r)})}function jt(n){$t=n,Mt();let e=document.getElementById("smart-taksasi-user-bar");e||(e=document.createElement("div"),e.id="smart-taksasi-user-bar",e.className="fixed top-3 right-3 sm:top-4 sm:right-5 z-[9990] flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d1629]/95 border border-cyan-500/30 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all duration-300",document.body.appendChild(e));let t=n.displayName||(n.email?n.email.split("@")[0]:"User"),r=n.email||"",s=(t.charAt(0)||"U").toUpperCase(),a=n.photoURL?`<img src="${n.photoURL}" alt="${t}" class="w-7 h-7 rounded-full object-cover border border-cyan-400/50 shadow-sm" />`:`<div class="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 text-white font-bold text-xs flex items-center justify-center border border-cyan-300/40">${s}</div>`;e.innerHTML=`
    <button id="btn-topbar-download-apk" type="button" class="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.35)] transition-all cursor-pointer" title="Unduh File Aplikasi Android (.apk)">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>Unduh APK</span>
    </button>
    <div class="h-4 w-px bg-slate-700/80"></div>
    <button id="btn-topbar-master-hub" type="button" class="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 active:scale-95 shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all cursor-pointer" title="Buka Master Data & Import Hub (1 Tab 1 Master)">
      <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" />
      </svg>
      <span>Import Master</span>
    </button>
    <div class="h-4 w-px bg-slate-700/80"></div>
    <button id="btn-smart-profile" type="button" class="flex items-center gap-2 pr-2 text-left hover:opacity-90 active:scale-95 transition-all max-w-[170px] sm:max-w-[220px] cursor-pointer" title="Buka Profil & Pengaturan Sesi">
      ${a}
      <div class="flex flex-col min-w-0">
        <span class="text-xs font-semibold text-slate-100 truncate leading-tight">${t}</span>
        <span class="text-[10px] text-cyan-400 truncate leading-tight">${r}</span>
      </div>
    </button>
    <div class="h-4 w-px bg-slate-700/80"></div>
    <button id="btn-smart-logout" class="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/25 active:scale-95 border border-rose-500/30 transition-all cursor-pointer" title="Keluar dari akun">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span class="hidden sm:inline">Keluar</span>
    </button>
  `;let i=document.getElementById("btn-topbar-download-apk");i&&i.addEventListener("click",d=>{d.preventDefault(),Jn("/SmartTaksasi.apk","SmartTaksasi-v2.1.3.apk",i)});let o=document.getElementById("btn-topbar-master-hub");o&&o.addEventListener("click",()=>{_e()});let c=document.getElementById("btn-smart-profile");c&&c.addEventListener("click",()=>{Bs(n)});let l=document.getElementById("btn-smart-logout");l&&l.addEventListener("click",async()=>{if(confirm(`Yakin ingin keluar dari akun ${t}?`))try{await Nt(q),Yn(),await fetch("/api/apps/auth/logout",{method:"POST"}).catch(()=>{}),window.location.reload()}catch(d){console.warn("Logout notice:",d),window.location.reload()}})}function sc(){let n=document.getElementById("smart-taksasi-user-bar");n&&n.remove()}function Ee(n){let e=document.getElementById("root");e&&(n?(e.style.removeProperty("display"),e.style.removeProperty("opacity"),e.style.removeProperty("pointer-events"),e.style.display="block",e.classList.remove("hidden")):(e.style.setProperty("display","none","important"),e.style.setProperty("opacity","0"),e.style.setProperty("pointer-events","none"),e.classList.add("hidden")))}function Bs(n){let e=document.getElementById("smart-user-profile-modal");e&&e.remove(),K();let t=n.displayName||(n.email?n.email.split("@")[0]:"User Taksasi"),r=n.email||"",s=(t.charAt(0)||"U").toUpperCase(),a=n.photoURL||"",o=(n.providerData&&n.providerData[0]?n.providerData[0].providerId:"email").includes("google")?"Google Authentication":"Email & Password";e=document.createElement("div"),e.id="smart-user-profile-modal",e.className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-fadeIn",e.innerHTML=`
    <div class="relative w-full max-w-[560px] rounded-3xl bg-[#0c1427] border border-cyan-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.2)] text-white overflow-hidden my-auto">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7 7z" />
            </svg>
          </div>
          <div>
            <h2 class="text-base sm:text-lg font-bold tracking-tight text-white">Profil & Pengaturan Akun</h2>
            <p class="text-xs text-slate-400">Kelola identitas, foto profil kamera, dan sesi login</p>
          </div>
        </div>
        <button id="btn-close-profile-modal" type="button" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer">
          &times;
        </button>
      </div>

      <!-- Navigation Tabs (Segmented anti-pill) -->
      <div class="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-1 overflow-x-auto">
        <button id="ptab-details" type="button" class="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-cyan-400 text-cyan-300">
          Detail Akun
        </button>
        <button id="ptab-camera" type="button" class="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-200">
          Foto & Kamera
        </button>
        <button id="ptab-session" type="button" class="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-200">
          Preferensi Sesi
        </button>
        <button id="ptab-install" type="button" class="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-200">
          Instalasi & APK
        </button>
        <button id="ptab-master" type="button" class="px-3.5 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 border-transparent text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer">
          <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" /></svg>
          Master Data Hub
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 max-h-[75vh] overflow-y-auto">
        
        <!-- Status Banner -->
        <div id="profile-feedback-box" class="hidden mb-4 p-3 rounded-xl text-xs flex items-center gap-2"></div>

        <!-- TAB 1: DETAIL AKUN -->
        <div id="psec-details" class="space-y-4">
          <div class="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div id="profile-display-avatar" class="relative group cursor-pointer">
              ${a?`<img src="${a}" alt="${t}" class="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/60 shadow-lg" />`:`<div class="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-cyan-300/60">${s}</div>`}
              <div class="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-white truncate">${t}</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">Aktif</span>
              </div>
              <p class="text-xs text-slate-400 truncate mt-0.5">${r}</p>
              <p class="text-[11px] text-cyan-400 mt-1">${o}</p>
            </div>
          </div>

          <form id="form-edit-profile" class="space-y-3.5">
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Nama Tampilan</label>
              <input type="text" id="input-prof-name" value="${t}" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Peran / Jabatan</label>
                <input type="text" disabled value="Marketing & Taksasi Specialist" class="w-full px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs cursor-not-allowed" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Kantor Cabang</label>
                <select id="select-prof-cabang" class="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400">
                  <option value="Cabang Jakarta Pusat" selected>Cabang Jakarta Pusat</option>
                  <option value="Cabang Jakarta Barat">Cabang Jakarta Barat</option>
                  <option value="Cabang Bandung">Cabang Bandung</option>
                  <option value="Cabang Surabaya">Cabang Surabaya</option>
                  <option value="Cabang Medan">Cabang Medan</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-400 mb-1">ID Pengguna (UID Firebase)</label>
              <input type="text" disabled value="${n.uid}" class="w-full px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-500 text-xs font-mono select-all" />
            </div>

            <div class="pt-2 flex justify-end">
              <button type="submit" id="btn-save-profile" class="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all cursor-pointer">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        <!-- TAB 2: FOTO & KAMERA -->
        <div id="psec-camera" class="hidden space-y-4">
          <p class="text-xs text-slate-300">
            Ambil foto profil langsung menggunakan kamera perangkat Anda, atau pilih foto dari galeri/file.
          </p>

          <!-- Camera Stream Container -->
          <div id="camera-stream-wrapper" class="relative rounded-2xl bg-black border border-slate-800 overflow-hidden min-h-[220px] flex items-center justify-center">
            <video id="profile-cam-video" autoplay playsinline muted class="w-full max-h-[320px] object-cover hidden"></video>
            <canvas id="profile-cam-canvas" class="hidden"></canvas>
            
            <!-- Target Circle Overlay -->
            <div id="cam-overlay" class="absolute inset-0 pointer-events-none hidden items-center justify-center">
              <div class="w-44 h-44 rounded-full border-2 border-dashed border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
            </div>

            <!-- Standby Placeholder -->
            <div id="camera-standby-view" class="p-6 text-center">
              <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mx-auto flex items-center justify-center text-cyan-400 mb-3">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p class="text-xs font-semibold text-slate-200">Kamera Belum Aktif</p>
              <p class="text-[11px] text-slate-400 mt-1">Klik tombol di bawah untuk meminta akses kamera laptop atau smartphone Anda.</p>
            </div>

            <!-- Preview Captured Image View -->
            <div id="cam-captured-view" class="hidden p-4 text-center">
              <img id="cam-preview-img" src="" alt="Preview Foto" class="w-32 h-32 rounded-full object-cover border-2 border-emerald-400 mx-auto shadow-lg" />
              <p class="text-xs text-emerald-400 font-semibold mt-2">Foto Berhasil Diambil</p>
            </div>
          </div>

          <!-- Camera Action Controls -->
          <div class="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button id="btn-start-camera" type="button" class="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 flex items-center gap-2 transition-all cursor-pointer">
              <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Buka Kamera
            </button>

            <button id="btn-snap-camera" type="button" class="hidden px-5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" stroke-width="2"></circle>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              Jepret Foto
            </button>

            <button id="btn-save-photo" type="button" class="hidden px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all cursor-pointer">
              Terapkan Foto Ini
            </button>

            <button id="btn-retake-photo" type="button" class="hidden px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-all cursor-pointer">
              Ambil Ulang
            </button>

            <button id="btn-stop-camera" type="button" class="hidden px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 transition-all cursor-pointer">
              Tutup Kamera
            </button>
          </div>

          <!-- File Upload Option as Alternative -->
          <div class="pt-3 border-t border-slate-800/80">
            <label class="block text-xs font-medium text-slate-400 mb-1.5">Atau Unggah dari File / Galeri:</label>
            <input type="file" id="input-upload-photo" accept="image/*" class="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer" />
          </div>
        </div>

        <!-- TAB 3: PREFERENSI SESI -->
        <div id="psec-session" class="hidden space-y-4">
          <div class="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-cyan-400">Durasi Penyimpanan Sesi</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Tentukan bagaimana aplikasi mengingat sesi login Anda di perangkat ini:
            </p>
            <div class="space-y-2 text-xs">
              <label class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/50 cursor-pointer">
                <input type="radio" name="session-persistence" id="radio-persist-local" value="local" checked class="mt-0.5 text-cyan-400 focus:ring-cyan-400" />
                <div>
                  <span class="font-semibold text-white">Tetap Masuk di Perangkat Ini (Direkomendasikan)</span>
                  <p class="text-[11px] text-slate-400">Sesi disimpan secara aman di browser sehingga Anda tidak perlu login ulang setiap membuka aplikasi.</p>
                </div>
              </label>
              <label class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/50 cursor-pointer">
                <input type="radio" name="session-persistence" id="radio-persist-session" value="session" class="mt-0.5 text-cyan-400 focus:ring-cyan-400" />
                <div>
                  <span class="font-semibold text-white">Sesi Sementara (Komputer Publik / Bersama)</span>
                  <p class="text-[11px] text-slate-400">Sesi akan otomatis dihapus dan Anda diharuskan login kembali begitu tab atau jendela browser ditutup.</p>
                </div>
              </label>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold text-white">Tema Antarmuka</span>
              <p class="text-[11px] text-slate-400">WealthWave Dark Glassmorphism Neon</p>
            </div>
            <button id="btn-toggle-theme" type="button" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 text-cyan-300 hover:bg-slate-700 cursor-pointer">
              Ganti Tema
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
            <div>
              <span class="text-xs font-semibold text-rose-300">Keluar dari Akun</span>
              <p class="text-[11px] text-slate-400">Akhiri sesi aktif Anda di perangkat ini secara tuntas.</p>
            </div>
            <button id="btn-modal-logout" type="button" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-all cursor-pointer">
              Keluar
            </button>
          </div>
        </div>

        <!-- TAB 4: INSTALASI & APK -->
        <div id="psec-install" class="hidden space-y-4">
          <div class="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30">
            <h3 class="text-sm font-bold text-white mb-1">Unduh File APK Android Langsung</h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-3">
              Solusi terbaik jika muncul keterangan <em>"aplikasi tidak dapat dibuka"</em> pada saat instalasi PWA di smartphone Anda. Unduh dan pasang paket mandiri (.apk):
            </p>
            <a href="/SmartTaksasi.apk" download="SmartTaksasi-v2.1.3.apk" class="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Unduh SmartTaksasi-v2.1.3.apk (830 KB)
            </a>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <h4 class="text-xs font-bold text-slate-200">Tips Pemasangan di Smartphone</h4>
            <ul class="text-[11px] text-slate-400 space-y-1.5 list-disc list-inside">
              <li><strong>Jika unduh APK:</strong> Buka file unduhan di notifikasi HP &rarr; Izinkan pemasangan sumber tidak dikenal &rarr; Pasang.</li>
              <li><strong>Jika pasang PWA (Browser):</strong> Selalu buka link di browser <strong>Google Chrome asli</strong>, bukan browser di dalam WhatsApp/Instagram.</li>
              <li><strong>Di iPhone / iPad (iOS):</strong> Buka Safari &rarr; Tombol Share &rarr; Pilih "Tambah ke Layar Utama".</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  `,document.body.appendChild(e);let c=document.getElementById("btn-close-profile-modal");c&&c.addEventListener("click",()=>{K(),e?.remove()}),e.addEventListener("click",l=>{l.target===e&&(K(),e?.remove())}),ac(),ic(n),oc(n),cc(n)}function K(){Ft&&(Ft.getTracks().forEach(n=>n.stop()),Ft=null)}function ac(){let n=["details","camera","session","install"];n.forEach(t=>{let r=document.getElementById(`ptab-${t}`);r&&r.addEventListener("click",()=>{t!=="camera"&&K(),n.forEach(s=>{let a=document.getElementById(`ptab-${s}`),i=document.getElementById(`psec-${s}`);a&&i&&(s===t?(a.className="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-cyan-400 text-cyan-300",i.classList.remove("hidden")):(a.className="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-200",i.classList.add("hidden")))})})});let e=document.getElementById("ptab-master");e&&e.addEventListener("click",()=>{K();let t=document.getElementById("smart-user-profile-modal");t&&t.remove(),_e("excel")})}function ic(n){let e=document.getElementById("form-edit-profile"),t=document.getElementById("input-prof-name"),r=document.getElementById("profile-feedback-box");e&&t&&e.addEventListener("submit",async s=>{s.preventDefault();let a=t.value.trim();if(a)try{await ze(n,{displayName:a});let i=await n.getIdToken();await fetch("/api/user/profile",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({name:a})}).catch(()=>{}),xe(i,n),jt(n),r&&(r.className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300",r.textContent="Nama profil berhasil diperbarui!",r.classList.remove("hidden"),setTimeout(()=>r.classList.add("hidden"),3e3))}catch(i){r&&(r.className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300",r.textContent="Gagal menyimpan perubahan: "+(i.message||"Error"),r.classList.remove("hidden"))}})}function oc(n){let e=document.getElementById("btn-start-camera"),t=document.getElementById("btn-snap-camera"),r=document.getElementById("btn-stop-camera"),s=document.getElementById("btn-save-photo"),a=document.getElementById("btn-retake-photo"),i=document.getElementById("profile-cam-video"),o=document.getElementById("profile-cam-canvas"),c=document.getElementById("cam-overlay"),l=document.getElementById("camera-standby-view"),d=document.getElementById("cam-captured-view"),h=document.getElementById("cam-preview-img"),m=document.getElementById("input-upload-photo"),p=document.getElementById("profile-feedback-box"),g="";e&&i&&e.addEventListener("click",async()=>{try{K();let y=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:640},facingMode:"user"},audio:!1});Ft=y,i.srcObject=y,i.classList.remove("hidden"),c&&c.classList.remove("hidden"),l&&l.classList.add("hidden"),d&&d.classList.add("hidden"),e.classList.add("hidden"),t&&t.classList.remove("hidden"),r&&r.classList.remove("hidden"),s&&s.classList.add("hidden"),a&&a.classList.add("hidden")}catch(y){console.warn("Camera access notice:",y),alert("Tidak dapat mengakses kamera: "+(y.message||"Periksa izin kamera browser Anda."))}}),t&&i&&o&&t.addEventListener("click",()=>{let y=i.videoWidth||480,b=i.videoHeight||480;o.width=y,o.height=b;let v=o.getContext("2d");v&&(v.drawImage(i,0,0,y,b),g=o.toDataURL("image/jpeg",.85),h&&(h.src=g),K(),i.classList.add("hidden"),c&&c.classList.add("hidden"),d&&d.classList.remove("hidden"),t.classList.add("hidden"),r&&r.classList.add("hidden"),s&&s.classList.remove("hidden"),a&&a.classList.remove("hidden"))}),a&&e&&a.addEventListener("click",()=>{d&&d.classList.add("hidden"),s&&s.classList.add("hidden"),a.classList.add("hidden"),e.click()}),r&&e&&r.addEventListener("click",()=>{K(),i&&i.classList.add("hidden"),c&&c.classList.add("hidden"),l&&l.classList.remove("hidden"),t&&t.classList.add("hidden"),r.classList.add("hidden"),e.classList.remove("hidden")});let k=async y=>{try{s&&(s.disabled=!0),await ze(n,{photoURL:y});let b=await n.getIdToken();await fetch("/api/user/profile",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({photo_url:y})}).catch(()=>{}),xe(b,n),jt(n);let v=document.getElementById("profile-display-avatar");v&&(v.innerHTML=`<img src="${y}" alt="User" class="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 shadow-lg" />`),p&&(p.className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300",p.textContent="Foto profil berhasil diperbarui!",p.classList.remove("hidden"),setTimeout(()=>p.classList.add("hidden"),3e3))}catch(b){alert("Gagal menerapkan foto: "+(b.message||"Error"))}finally{s&&(s.disabled=!1)}};s&&s.addEventListener("click",()=>{g&&k(g)}),m&&m.addEventListener("change",()=>{let y=m.files&&m.files[0];if(!y)return;let b=new FileReader;b.onload=v=>{let I=v.target?.result;I&&(g=I,h&&(h.src=I),K(),i&&i.classList.add("hidden"),c&&c.classList.add("hidden"),l&&l.classList.add("hidden"),d&&d.classList.remove("hidden"),e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),r&&r.classList.add("hidden"),s&&s.classList.remove("hidden"),a&&a.classList.remove("hidden"))},b.readAsDataURL(y)})}function cc(n){let e=document.getElementById("radio-persist-local"),t=document.getElementById("radio-persist-session"),r=document.getElementById("btn-toggle-theme"),s=document.getElementById("btn-modal-logout"),a=document.getElementById("profile-feedback-box");e&&e.addEventListener("change",async()=>{if(e.checked)try{await Ke(q,qe),a&&(a.className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300",a.textContent="Preferensi sesi: Diatur tetap masuk di perangkat ini.",a.classList.remove("hidden"),setTimeout(()=>a.classList.add("hidden"),3e3))}catch{}}),t&&t.addEventListener("change",async()=>{if(t.checked)try{await Ke(q,Ge),a&&(a.className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300",a.textContent="Preferensi sesi: Diatur sesi sementara (keluar saat browser ditutup).",a.classList.remove("hidden"),setTimeout(()=>a.classList.add("hidden"),3e3))}catch{}}),r&&r.addEventListener("click",()=>{let i=document.documentElement.classList.contains("dark");document.documentElement.classList.toggle("dark",!i),document.documentElement.classList.toggle("light",i),localStorage.setItem("darkMode",String(!i))}),s&&s.addEventListener("click",async()=>{if(confirm("Yakin ingin keluar dari akun?"))try{await Nt(q),Yn(),await fetch("/api/apps/auth/logout",{method:"POST"}).catch(()=>{}),window.location.reload()}catch{window.location.reload()}})}typeof window<"u"&&(window.openUserProfileModal=()=>{$t&&Bs($t)});function Bt(){let n=document.getElementById("auth-gatekeeper");n||(n=document.createElement("div"),n.id="auth-gatekeeper",n.className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070b14] overflow-y-auto px-4 py-8 font-sans selection:bg-cyan-500/30 selection:text-cyan-200",document.body.prepend(n)),n.innerHTML=`
    <!-- Background Ambient Glow Mesh -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute -bottom-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,11,20,0.8)_100%)]"></div>
    </div>

    <!-- Center Card -->
    <div class="relative w-full max-w-[440px] rounded-3xl bg-[#0c1427]/90 border border-cyan-500/20 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] p-6 sm:p-8 text-white transition-all duration-300">
      
      <!-- Brand Header -->
      <div class="text-center mb-6">
        <div class="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)] mb-3">
          <img src="/logo.png" alt="Smart Taksasi" class="w-10 h-10 object-contain drop-shadow" onerror="this.src='/pwa-192x192.png'" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
          Smart Taksasi V2.1.3
        </h1>
        <p class="text-xs uppercase tracking-widest font-semibold text-cyan-400 mt-1">
          Portal Akses & Keamanan Sistem
        </p>
        <p class="text-xs text-slate-400 mt-2">
          Silakan masuk untuk mengakses modul taksasi, data prospek, dan perhitungan limit pinjaman.
        </p>
      </div>

      <!-- Google Provider Button -->
      <div class="space-y-3">
        <button id="btn-google-auth" type="button" class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 text-white font-medium text-sm transition-all duration-200 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span id="google-btn-text">Lanjutkan dengan Google</span>
        </button>

        <!-- Fast Officer / Demo Access -->
        <button id="btn-fast-demo-auth" type="button" class="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 active:scale-[0.98] border border-cyan-500/30 text-cyan-300 font-medium text-xs transition-all duration-200 hover:border-cyan-400/60 shadow-sm cursor-pointer">
          <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Masuk Cepat Petugas (Bani Munggaran)</span>
        </button>

        <!-- Direct In-App Downloads (Instant Blob fallback) -->
        <div class="grid grid-cols-2 gap-2">
          <button id="btn-barrier-apk" type="button" class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 active:scale-95 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all shadow-sm cursor-pointer">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Unduh APK</span>
          </button>
          <button id="btn-barrier-zip" type="button" class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 border border-slate-700 text-slate-300 font-semibold text-xs transition-all cursor-pointer">
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Backup ZIP</span>
          </button>
        </div>

        <!-- Divider -->
        <div class="relative flex items-center justify-center my-4">
          <div class="border-t border-slate-800 w-full"></div>
          <span class="bg-[#0c1427] px-3 text-[11px] text-slate-400 uppercase tracking-wider whitespace-nowrap">
            atau lanjutkan dengan email
          </span>
          <div class="border-t border-slate-800 w-full"></div>
        </div>

        <!-- Mode Segmented Control Tabs (Clean anti-pill styling) -->
        <div class="flex items-center p-1 bg-slate-900/80 rounded-xl border border-slate-800 mb-4">
          <button id="tab-login" type="button" class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${ee==="login"?"bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm":"text-slate-400 hover:text-slate-200"}">
            Masuk ke Akun
          </button>
          <button id="tab-register" type="button" class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${ee==="register"?"bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm":"text-slate-400 hover:text-slate-200"}">
            Daftar Akun Baru
          </button>
        </div>

        <!-- Error Alert Container -->
        <div id="auth-error-box" class="hidden mb-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
          <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span id="auth-error-msg" class="leading-relaxed"></span>
        </div>

        <!-- Email/Password Form -->
        <form id="auth-email-form" class="space-y-3.5">
          <!-- Full Name (Only for registration) -->
          <div id="group-name" class="${ee==="register"?"block":"hidden"} space-y-1">
            <label class="block text-xs font-medium text-slate-300">Nama Lengkap</label>
            <input
              type="text"
              id="input-name"
              placeholder="Contoh: Bani Munggaran"
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>

          <!-- Email Input -->
          <div class="space-y-1">
            <label class="block text-xs font-medium text-slate-300">Alamat Email</label>
            <input
              type="email"
              id="input-email"
              required
              placeholder="nama@perusahaan.com"
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>

          <!-- Password Input -->
          <div class="space-y-1">
            <label class="block text-xs font-medium text-slate-300">Kata Sandi</label>
            <div class="relative">
              <input
                type="password"
                id="input-password"
                required
                minlength="6"
                placeholder="Minimal 6 karakter"
                class="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-900/60 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              <button
                type="button"
                id="btn-toggle-password"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                title="Tampilkan / Sembunyikan Kata Sandi"
              >
                <svg id="eye-icon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            id="btn-submit-auth"
            class="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 active:scale-[0.98] shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span id="submit-text">${ee==="login"?"Masuk ke Smart Taksasi":"Buat Akun & Masuk"}</span>
            <svg id="submit-spinner" class="hidden w-4 h-4 animate-spin text-slate-950" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </button>
        </form>

        <!-- Security footer note -->
        <div class="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Enkripsi Firebase Google</span>
          </div>
          <a href="/SmartTaksasi.apk" download="SmartTaksasi-v2.1.3.apk" class="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Unduh APK
          </a>
        </div>
      </div>
    </div>
  `,lc()}function lc(){let n=document.getElementById("tab-login"),e=document.getElementById("tab-register"),t=document.getElementById("group-name"),r=document.getElementById("submit-text"),s=document.getElementById("auth-error-box"),a=p=>{ee=p,s&&s.classList.add("hidden"),t&&(p==="register"?t.classList.remove("hidden"):t.classList.add("hidden")),r&&(r.textContent=p==="login"?"Masuk ke Smart Taksasi":"Buat Akun & Masuk"),n&&e&&(p==="login"?(n.className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm",e.className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 text-slate-400 hover:text-slate-200"):(e.className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm",n.className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 text-slate-400 hover:text-slate-200"))};n&&n.addEventListener("click",()=>a("login")),e&&e.addEventListener("click",()=>a("register"));let i=document.getElementById("btn-toggle-password"),o=document.getElementById("input-password");i&&o&&i.addEventListener("click",()=>{let p=o.type==="password";o.type=p?"text":"password"});let c=document.getElementById("btn-google-auth");c&&c.addEventListener("click",async()=>{if(!Ht){Z(null),Ie(!0,"Menghubungkan ke Google...");try{let p=await zn(q,Ms),g=await p.user.getIdToken();xe(g,p.user),await Vt(g,p.user),Je(p.user)}catch(p){let g=p?.code||"";g==="auth/popup-closed-by-user"||g==="auth/cancelled-popup-request"?(console.info("Google Sign-In popup closed by user."),Z("Jendela masuk Google ditutup. Silakan coba lagi atau gunakan tombol Masuk Cepat Petugas.")):g==="auth/popup-blocked"?(console.warn("Google Sign-In popup blocked by browser."),Z("Popup Google diblokir browser. Izinkan popup atau gunakan Masuk Cepat Petugas.")):(console.warn("Google Sign-In notice:",p?.message||p),Z(Ls(p)))}finally{Ie(!1)}}});let l=document.getElementById("btn-fast-demo-auth"),d=document.getElementById("btn-barrier-apk");d&&d.addEventListener("click",()=>{Jn("/SmartTaksasi.apk","SmartTaksasi-v2.1.3.apk",d)});let h=document.getElementById("btn-barrier-zip");h&&h.addEventListener("click",()=>{Jn("/download-zip","smart-taksasi-complete.zip",h)}),l&&l.addEventListener("click",async()=>{if(!Ht){Z(null),Ie(!0,"Menyiapkan sesi petugas...");try{let p={uid:"user_bani",email:"bani.munggaran07@gmail.com",displayName:"Bani Munggaran",photoURL:null},g="session_"+Math.random().toString(36).substring(2)+Date.now();xe(g,p),await Vt(g,p),Je(p)}catch(p){console.warn("Demo session notice:",p)}finally{Ie(!1)}}});let m=document.getElementById("auth-email-form");m&&m.addEventListener("submit",async p=>{if(p.preventDefault(),Ht)return;let g=document.getElementById("input-email"),k=document.getElementById("input-password"),y=document.getElementById("input-name"),b=g?.value?.trim()||"",v=k?.value||"",I=y?.value?.trim()||"";if(!b||!v){Z("Harap isi alamat email dan kata sandi.");return}Z(null),Ie(!0,ee==="login"?"Memverifikasi akun...":"Membuat akun baru...");try{let x;if(ee==="login")x=(await $n(q,b,v)).user;else if(x=(await Vn(q,b,v)).user,I)try{await ze(x,{displayName:I})}catch{}let le=await x.getIdToken();xe(le,x),await Vt(le,x),Je(x)}catch(x){console.warn("Email auth notice:",x?.message||x),Z(Ls(x))}finally{Ie(!1)}})}function Z(n){let e=document.getElementById("auth-error-box"),t=document.getElementById("auth-error-msg");!e||!t||(n?(t.textContent=n,e.classList.remove("hidden")):(e.classList.add("hidden"),t.textContent=""))}function Ie(n,e){Ht=n;let t=document.getElementById("btn-submit-auth"),r=document.getElementById("submit-text"),s=document.getElementById("submit-spinner"),a=document.getElementById("btn-google-auth");t&&(t.disabled=n),a&&(a.disabled=n),n?(s&&s.classList.remove("hidden"),r&&e&&(r.textContent=e)):(s&&s.classList.add("hidden"),r&&(r.textContent=ee==="login"?"Masuk ke Smart Taksasi":"Buat Akun & Masuk"))}function Je(n){let e=document.getElementById("auth-gatekeeper");e&&(e.style.transition="opacity 250ms ease-out, transform 250ms ease-out",e.style.opacity="0",e.style.transform="scale(0.98)",setTimeout(()=>{e.remove()},260)),Ee(!0),jt(n)}function Ds(){let n=localStorage.getItem("smart_access_token"),e=localStorage.getItem("smart_taksasi_user");if(n&&e)try{let t=JSON.parse(e);t&&t.email?(Ee(!0),jt(t)):(Ee(!1),Bt())}catch{Ee(!1),Bt()}else Ee(!1),Bt();jn(q,async t=>{if(t)try{let r=await t.getIdToken();xe(r,t),await Vt(r,t),Je(t)}catch(r){console.warn("Token acquisition notice:",r),Je(t)}else{let r=localStorage.getItem("smart_access_token"),s=localStorage.getItem("smart_taksasi_user");(!r||!s)&&($t=null,Yn(),sc(),Ee(!1),document.getElementById("auth-gatekeeper")||Bt())}})}typeof window<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>Ds()):Ds());export{Jn as downloadFileViaBlob,Bs as openUserProfileModal,Ds as startAuthGatekeeper};
/*! Bundled license information:

@firebase/util/dist/postinstall.mjs:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/component/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
firebase/app/dist/esm/index.esm.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-LY22yodV.js:
@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-LY22yodV.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
