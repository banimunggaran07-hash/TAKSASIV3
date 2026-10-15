var qn=()=>{};var Jn=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Ls=function(n){let e=[],t=0,r=0;for(;t<n.length;){let s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){let i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){let i=n[t++],a=n[t++],o=n[t++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|o&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Yn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){let i=n[s],a=s+1<n.length,o=a?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,u=i>>2,f=(i&3)<<4|o>>4,g=(o&15)<<2|l>>6,p=l&63;c||(p=64,a||(g=64)),r.push(t[u],t[f],t[g],t[p])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Jn(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ls(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){let i=t[n.charAt(s++)],o=s<n.length?t[n.charAt(s)]:0;++s;let l=s<n.length?t[n.charAt(s)]:64;++s;let f=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||o==null||l==null||f==null)throw new Ht;let g=i<<2|o>>4;if(r.push(g),l!==64){let p=o<<4&240|l>>2;if(r.push(p),f!==64){let m=l<<6&192|f;r.push(m)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Ht=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Ds=function(n){let e=Jn(n);return Yn.encodeByteArray(e,!0)},$t=function(n){return Ds(n).replace(/\./g,"")},qe=function(n){try{return Yn.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Ms(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Us=()=>Ms().__FIREBASE_DEFAULTS__,Bs=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Hs=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&qe(n[1]);return e&&JSON.parse(e)},Vt=()=>{try{return qn()||Us()||Bs()||Hs()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Xn=n=>Vt()?.emulatorHosts?.[n];var jt=()=>Vt()?.config,Wt=n=>Vt()?.[`_${n}`];var le=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function k(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Qn(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(k())}function Zn(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function er(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function tr(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function nr(){let n=k();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function rr(){try{return typeof indexedDB=="object"}catch{return!1}}function sr(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}var Fs="FirebaseError",R=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Fs,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,H.prototype.create)}},H=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?$s(i,r):"Error",o=`${this.serviceName}: ${a} (${s}).`;return new R(s,o,r)}};function $s(n,e){try{let t=0,r="";for(;t<n.length;){let s=n.indexOf("{$",t);if(s===-1){r+=n.substring(t);break}let i=n.indexOf("}",s+2);if(i===-1){r+=n.substring(t);break}let a=n.substring(s+2,i),o=e[a];r+=n.substring(t,s)+(o!=null?String(o):`<${a}?>`),t=i+1}return r}catch{return n}}function ir(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function q(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let s of t){if(!r.includes(s))return!1;let i=n[s],a=e[s];if(Gn(i)&&Gn(a)){if(!q(i,a))return!1}else if(i!==a)return!1}for(let s of r)if(!t.includes(s))return!1;return!0}function Gn(n){return n!==null&&typeof n=="object"}function de(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ue(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function he(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function ar(n,e){let t=new Ft(n,e);return t.subscribe.bind(t)}var Ft=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Vs(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Bt),s.error===void 0&&(s.error=Bt),s.complete===void 0&&(s.complete=Bt);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Vs(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Bt(){}var hc=14400*1e3;function T(n){return n&&n._delegate?n._delegate:n}function Ge(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function or(n){return(await fetch(n,{credentials:"include"})).ok}var L=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var ee="[DEFAULT]";var zt=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new le;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ws(e))try{this.getOrInitializeService({instanceIdentifier:ee})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(t);try{let i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=ee){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ee){return this.instances.has(e)}getOptions(e=ee){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[i,a]of this.instancesDeferred.entries()){let o=this.normalizeInstanceIdentifier(i);r===o&&a.resolve(s)}return s}onInit(e,t){let r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);let i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:js(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ee){return this.component?this.component.multipleInstances?e:ee:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function js(n){return n===ee?void 0:n}function Ws(n){return n.instantiationMode==="EAGER"}var Je=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new zt(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var zs=[],b;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(b||(b={}));var Ks={debug:b.DEBUG,verbose:b.VERBOSE,info:b.INFO,warn:b.WARN,error:b.ERROR,silent:b.SILENT},qs=b.INFO,Gs={[b.DEBUG]:"log",[b.VERBOSE]:"log",[b.INFO]:"info",[b.WARN]:"warn",[b.ERROR]:"error"},Js=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),s=Gs[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},pe=class{constructor(e){this.name=e,this._logLevel=qs,this._logHandler=Js,this._userLogHandler=null,zs.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in b))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ks[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,b.DEBUG,...e),this._logHandler(this,b.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,b.VERBOSE,...e),this._logHandler(this,b.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,b.INFO,...e),this._logHandler(this,b.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,b.WARN,...e),this._logHandler(this,b.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,b.ERROR,...e),this._logHandler(this,b.ERROR,...e)}};var Ys=(n,e)=>e.some(t=>n instanceof t),cr,lr;function Xs(){return cr||(cr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Qs(){return lr||(lr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var dr=new WeakMap,qt=new WeakMap,ur=new WeakMap,Kt=new WeakMap,Jt=new WeakMap;function Zs(n){let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(D(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&dr.set(t,n)}).catch(()=>{}),Jt.set(e,n),e}function ei(n){if(qt.has(n))return;let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});qt.set(n,e)}var Gt={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return qt.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ur.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return D(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function hr(n){Gt=n(Gt)}function ti(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Ye(this),e,...t);return ur.set(r,e.sort?e.sort():[e]),D(r)}:Qs().includes(n)?function(...e){return n.apply(Ye(this),e),D(dr.get(this))}:function(...e){return D(n.apply(Ye(this),e))}}function ni(n){return typeof n=="function"?ti(n):(n instanceof IDBTransaction&&ei(n),Ys(n,Xs())?new Proxy(n,Gt):n)}function D(n){if(n instanceof IDBRequest)return Zs(n);if(Kt.has(n))return Kt.get(n);let e=ni(n);return e!==n&&(Kt.set(n,e),Jt.set(e,n)),e}var Ye=n=>Jt.get(n);function fr(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){let a=indexedDB.open(n,e),o=D(a);return r&&a.addEventListener("upgradeneeded",c=>{r(D(a.result),c.oldVersion,c.newVersion,D(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),o.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),o}var ri=["get","getKey","getAll","getAllKeys","count"],si=["put","add","delete","clear"],Yt=new Map;function pr(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Yt.get(e))return Yt.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,s=si.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ri.includes(t)))return;let i=async function(a,...o){let c=this.transaction(a,s?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(o.shift())),(await Promise.all([l[t](...o),s&&c.done]))[0]};return Yt.set(e,i),i}hr(n=>({...n,get:(e,t,r)=>pr(e,t)||n.get(e,t,r),has:(e,t)=>!!pr(e,t)||n.has(e,t)}));var Qt=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ii(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function ii(n){return n.getComponent()?.type==="VERSION"}var Zt="@firebase/app",mr="0.16.3";var $=new pe("@firebase/app"),ai="@firebase/app-compat",oi="@firebase/analytics-compat",ci="@firebase/analytics",li="@firebase/app-check-compat",di="@firebase/app-check",ui="@firebase/auth",hi="@firebase/auth-compat",pi="@firebase/database",fi="@firebase/data-connect",mi="@firebase/database-compat",gi="@firebase/functions",bi="@firebase/functions-compat",yi="@firebase/installations",vi="@firebase/installations-compat",wi="@firebase/messaging",Ii="@firebase/messaging-compat",ki="@firebase/performance",_i="@firebase/performance-compat",Ei="@firebase/remote-config",xi="@firebase/remote-config-compat",Ti="@firebase/storage",Si="@firebase/storage-compat",Ai="@firebase/firestore",Pi="@firebase/ai",Ci="@firebase/firestore-compat",Ri="firebase",Ni="13.0.0";var en="[DEFAULT]",Oi={[Zt]:"fire-core",[ai]:"fire-core-compat",[ci]:"fire-analytics",[oi]:"fire-analytics-compat",[di]:"fire-app-check",[li]:"fire-app-check-compat",[ui]:"fire-auth",[hi]:"fire-auth-compat",[pi]:"fire-rtdb",[fi]:"fire-data-connect",[mi]:"fire-rtdb-compat",[gi]:"fire-fn",[bi]:"fire-fn-compat",[yi]:"fire-iid",[vi]:"fire-iid-compat",[wi]:"fire-fcm",[Ii]:"fire-fcm-compat",[ki]:"fire-perf",[_i]:"fire-perf-compat",[Ei]:"fire-rc",[xi]:"fire-rc-compat",[Ti]:"fire-gcs",[Si]:"fire-gcs-compat",[Ai]:"fire-fst",[Ci]:"fire-fst-compat",[Pi]:"fire-vertex","fire-js":"fire-js",[Ri]:"fire-js-all"};var Ee=new Map,Li=new Map,tn=new Map;function gr(n,e){try{n.container.addComponent(e)}catch(t){$.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function fe(n){let e=n.name;if(tn.has(e))return $.debug(`There were multiple attempts to register component ${e}.`),!1;tn.set(e,n);for(let t of Ee.values())gr(t,n);for(let t of Li.values())gr(t,n);return!0}function an(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function S(n){return n==null?!1:n.settings!==void 0}var Di={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},F=new H("app","Firebase",Di);var nn=class{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new L("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw F.create("app-deleted",{appName:this._name})}};var me=Ni;function on(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r={name:en,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw F.create("bad-app-name",{appName:String(s)});if(t||(t=jt()),!t)throw F.create("no-options");let i=Ee.get(s);if(i)if(q(t,i.options)){if(q(r,i.config))return i;throw F.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(r)})}else throw F.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});let a=new Je(s);for(let c of tn.values())a.addComponent(c);let o=new nn(t,r,a);return Ee.set(s,o),o}function wr(n=en){let e=Ee.get(n);if(!e&&n===en&&jt())return on();if(!e)throw F.create("no-app",{appName:n});return e}function cn(){return Array.from(Ee.values())}function G(n,e,t){let r=Oi[n]??n;t&&(r+=`-${t}`);let s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){let a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),$.warn(a.join(" "));return}fe(new L(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}var Mi="firebase-heartbeat-database",Ui=1,xe="firebase-heartbeat-store",Xt=null;function Ir(){return Xt||(Xt=fr(Mi,Ui,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(xe)}catch(t){console.warn(t)}}}}).catch(n=>{throw F.create("idb-open",{originalErrorMessage:n.message})})),Xt}async function Bi(n){try{let t=(await Ir()).transaction(xe),r=await t.objectStore(xe).get(kr(n));return await t.done,r}catch(e){if(e instanceof R)$.warn(e.message);else{let t=F.create("idb-get",{originalErrorMessage:e?.message});$.warn(t.message)}}}async function br(n,e){try{let r=(await Ir()).transaction(xe,"readwrite");await r.objectStore(xe).put(e,kr(n)),await r.done}catch(t){if(t instanceof R)$.warn(t.message);else{let r=F.create("idb-set",{originalErrorMessage:t?.message});$.warn(r.message)}}}function kr(n){return`${n.name}!${n.options.appId}`}var Hi=1024,Fi=30,rn=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new sn(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=yr();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>Fi){let s=Vi(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){$.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=yr(),{heartbeatsToSend:t,unsentEntries:r}=$i(this._heartbeatsCache.heartbeats),s=$t(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return $.warn(e),""}}};function yr(){return new Date().toISOString().substring(0,10)}function $i(n,e=Hi){let t=[],r=n.slice();for(let s of n){let i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),vr(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),vr(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var sn=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return rr()?sr().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Bi(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return br(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return br(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function vr(n){return $t(JSON.stringify({version:2,heartbeats:n})).length}function Vi(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}function ji(n){fe(new L("platform-logger",e=>new Qt(e),"PRIVATE")),fe(new L("heartbeat",e=>new rn(e),"PRIVATE")),G(Zt,mr,n),G(Zt,mr,"esm2020"),G("fire-js","")}ji("");var Wi="firebase",zi="13.0.0";G(Wi,zi,"app");function Vr(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var jr=Vr,Wr=new H("auth","Firebase",Vr());var st=new pe("@firebase/auth");function Qe(n,...e){st.logLevel<=b.WARN&&st.warn(`Auth (${me}): ${n}`,...e)}function Ze(n,...e){st.logLevel<=b.ERROR&&st.error(`Auth (${me}): ${n}`,...e)}function A(n,...e){throw Rn(n,...e)}function N(n,...e){return Rn(n,...e)}function St(n,e,t){let r={...jr(),[e]:t};return new H("auth","Firebase",r).create(e,{appName:n.name})}function j(n){return St(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ki(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&A(n,"argument-error"),St(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Rn(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Wr.create(n,...e)}function h(n,e,...t){if(!n)throw Rn(e,...t)}function M(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Ze(e),new Error(e)}function W(n,e){n||M(e)}function fn(){return typeof self<"u"&&self.location?.href||""}function qi(){return _r()==="http:"||_r()==="https:"}function _r(){return typeof self<"u"&&self.location?.protocol||null}function Gi(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(qi()||er()||"connection"in navigator)?navigator.onLine:!0}function Ji(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var te=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,W(t>e,"Short delay should be less than long delay!"),this.isMobile=Qn()||tr()}get(){return Gi()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Nn(n,e){W(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var it=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;M("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;M("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;M("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Yi={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Xi=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Qi=new te(3e4,6e4);function v(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function I(n,e,t,r,s={}){return zr(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});let o=de({...a,key:n.config.apiKey}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);let l={method:e,headers:c,...i};return Zn()||(l.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&Ge(n.emulatorConfig.host)&&(l.credentials="include"),it.fetch()(await Kr(n,n.config.apiHost,t,o),l)})}async function zr(n,e,t){n._canInitEmulator=!1;let r={...Yi,...e};try{let s=new mn(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();let a=await i.json();if("needConfirmation"in a)throw Se(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{let o=i.ok?a.errorMessage:a.error.message,[c,l]=o.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Se(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw Se(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw Se(n,"user-disabled",a);let u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw St(n,u,l);A(n,u)}}catch(s){if(s instanceof R)throw s;A(n,"network-request-failed",{message:String(s)})}}async function X(n,e,t,r,s={}){let i=await I(n,e,t,r,s);return"mfaPendingCredential"in i&&A(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Kr(n,e,t,r){let s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Nn(n.config,s):`${n.config.apiScheme}://${s}`;return Xi.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function Zi(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var mn=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(N(this.auth,"network-request-failed")),Qi.get())})}};function Se(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let s=N(n,e,r);return s.customData._tokenResponse=t,s}function Er(n){return n!==void 0&&n.enterprise!==void 0}var at=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Zi(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function qr(n,e){return I(n,"GET","/v2/recaptchaConfig",v(n,e))}async function ea(n,e){return I(n,"POST","/v1/accounts:delete",e)}async function ot(n,e){return I(n,"POST","/v1/accounts:lookup",e)}function Ae(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Gr(n,e=!1){let t=T(n),r=await t.getIdToken(e),s=On(r);h(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");let i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:Ae(ln(s.auth_time)),issuedAtTime:Ae(ln(s.iat)),expirationTime:Ae(ln(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function ln(n){return Number(n)*1e3}function On(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ze("JWT malformed, contained fewer than 3 sections"),null;try{let s=qe(t);return s?JSON.parse(s):(Ze("Failed to decode base64 JWT payload"),null)}catch(s){return Ze("Caught error parsing JWT payload as JSON",s?.toString()),null}}function xr(n){let e=On(n);return h(e,"internal-error"),h(typeof e.exp<"u","internal-error"),h(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function ye(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof R&&ta(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ta({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var gn=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;let r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Ne=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ae(this.lastLoginAt),this.creationTime=Ae(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function ct(n){let e=n.auth,t=await n.getIdToken(),r=await ye(n,ot(e,{idToken:t}));h(r?.users.length,e,"internal-error");let s=r.users[0];n._notifyReloadListener(s);let i=s.providerUserInfo?.length?Yr(s.providerUserInfo):[],a=na(n.providerData,i),o=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!a?.length,l=o?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ne(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,u)}async function Jr(n){let e=T(n);await ct(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function na(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Yr(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function ra(n,e){let t=await zr(n,{},async()=>{let r=de({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Kr(n,s,"/v1/token",`key=${i}`),o=await n._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";let c={method:"POST",headers:o,body:r};return n.emulatorConfig&&Ge(n.emulatorConfig.host)&&(c.credentials="include"),it.fetch()(a,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function sa(n,e){return I(n,"POST","/v2/accounts:revokeToken",v(n,e))}var Pe=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){h(e.idToken,"internal-error"),h(typeof e.idToken<"u","internal-error"),h(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):xr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){h(e.length!==0,"internal-error");let t=xr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(h(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:s,expiresIn:i}=await ra(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new n;return r&&(h(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(h(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(h(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return M("not implemented")}};function J(n,e){h(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var Y=class n{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new gn(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ne(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await ye(this,this.stsTokenManager.getToken(this.auth,e));return h(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Gr(this,e)}reload(){return Jr(this)}_assign(e){this!==e&&(h(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){h(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ct(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(S(this.auth.app))return Promise.reject(j(this.auth));let e=await this.getIdToken();return await ye(this,ea(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){let r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,o=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:f,emailVerified:g,isAnonymous:p,providerData:m,stsTokenManager:O}=t;h(f&&O,e,"internal-error");let y=Pe.fromJSON(this.name,O);h(typeof f=="string",e,"internal-error"),J(r,e.name),J(s,e.name),h(typeof g=="boolean",e,"internal-error"),h(typeof p=="boolean",e,"internal-error"),J(i,e.name),J(a,e.name),J(o,e.name),J(c,e.name),J(l,e.name),J(u,e.name);let w=new n({uid:f,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:p,photoURL:a,phoneNumber:i,tenantId:o,stsTokenManager:y,createdAt:l,lastLoginAt:u});return m&&Array.isArray(m)&&(w.providerData=m.map(x=>({...x}))),c&&(w._redirectEventId=c),w}static async _fromIdTokenResponse(e,t,r=!1){let s=new Pe;s.updateFromServerResponse(t);let i=new n({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ct(i),i}static async _fromGetAccountInfoResponse(e,t,r){let s=t.users[0];h(s.localId!==void 0,"internal-error");let i=s.providerUserInfo!==void 0?Yr(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,o=new Pe;o.updateFromIdToken(r);let c=new n({uid:s.localId,auth:e,stsTokenManager:o,isAnonymous:a}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ne(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(c,l),c}};var Tr=new Map;function V(n){W(n instanceof Function,"Expected a class definition");let e=Tr.get(n);return e?(W(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Tr.set(n,e),e)}var lt=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};lt.type="NONE";var bn=lt;function et(n,e,t){return`firebase:${n}:${e}:${t}`}var Ce=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:s,name:i}=this.auth;this.fullUserKey=et(this.userKey,s.apiKey,i),this.fullPersistenceKey=et("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await ot(this.auth,{idToken:e}).catch(()=>{});return t?Y._fromGetAccountInfoResponse(this.auth,t,e):null}return Y._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new n(V(bn),e,r);let s=(await Promise.all(t.map(async l=>{try{if(await l._isAvailable())return l}catch{return}}))).filter(l=>l),i=s[0]||V(bn),a=et(r,e.config.apiKey,e.name),o=null;for(let l of t)try{let u=await l._get(a);if(u){let f;if(typeof u=="string"){let g=await ot(e,{idToken:u}).catch(()=>{});if(!g)break;f=await Y._fromGetAccountInfoResponse(e,g,u)}else f=Y._fromJSON(e,u);l!==i&&(o=f),i=l;break}}catch{}let c=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new n(i,e,r):(i=c[0],o&&await i._set(a,o.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(a)}catch{}})),new n(i,e,r))}};function Sr(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(es(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Xr(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ns(e))return"Blackberry";if(rs(e))return"Webos";if(Qr(e))return"Safari";if((e.includes("chrome/")||Zr(e))&&!e.includes("edge/"))return"Chrome";if(ts(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Xr(n=k()){return/firefox\//i.test(n)}function Qr(n=k()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Zr(n=k()){return/crios\//i.test(n)}function es(n=k()){return/iemobile/i.test(n)}function ts(n=k()){return/android/i.test(n)}function ns(n=k()){return/blackberry/i.test(n)}function rs(n=k()){return/webos/i.test(n)}function Ln(n=k()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function ia(n=k()){return Ln(n)&&!!window.navigator?.standalone}function aa(){return nr()&&document.documentMode===10}function ss(n=k()){return Ln(n)||ts(n)||rs(n)||ns(n)||/windows phone/i.test(n)||es(n)}function is(n,e=[]){let t;switch(n){case"Browser":t=Sr(k());break;case"Worker":t=`${Sr(k())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${me}/${r}`}var yn=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=i=>new Promise((a,o)=>{try{let c=e(i);a(c)}catch(c){o(c)}});r.onAbort=t,this.queue.push(r);let s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function oa(n,e={}){return I(n,"GET","/v2/passwordPolicy",v(n,e))}var ca=6,vn=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??ca,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}};var wn=class{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new dt(this),this.idTokenSubscription=new dt(this),this.beforeStateQueue=new yn(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wr,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=V(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted){try{this.persistenceManager=await Ce.create(this,e)}catch(r){Qe(`Failed to initialize persistence: ${r}`),this.persistenceManager=await Ce.create(this,[])}finally{this._resolvePersistenceManagerAvailable?.()}if(!this._deleted){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(r){Qe(`Failed to initialize current user: ${r}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await ot(this,{idToken:e}),r=await Y._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(S(this.app)){let i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,o=await this.tryRedirectSignIn(e);(!i||i===a)&&o?.user&&(r=o.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return h(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ct(e)}catch(t){let r=t?.code;if(r!=="auth/network-request-failed"&&r!=="auth/too-many-requests"&&!r?.startsWith("auth/quota-exceeded"))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ji()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(S(this.app))return Promise.reject(j(this));let t=e?T(e):null;return t&&h(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&h(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return S(this.app)?Promise.reject(j(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return S(this.app)?Promise.reject(j(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(V(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await oa(this),t=new vn(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new H("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await sa(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&V(e)||this._popupRedirectResolver;h(t,this,"argument-error"),this.redirectPersistenceManager=await Ce.create(this,[V(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};let i=typeof t=="function"?t:t.next.bind(t),a=!1,o=this._isInitialized?Promise.resolve():this._initializationPromise;if(h(o,this,"internal-error"),o.then(()=>{a||i(this.currentUser)}).catch(c=>{if(!a)if(typeof t!="function"&&t.error)t.error(c);else if(r)r(c);else throw c}),typeof t=="function"){let c=e.addObserver(t,r,s);return()=>{a=!0,c()}}else{let c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){let r=t?.message||String(t),s=St(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw s.customData={originalError:t},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return h(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=is(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);let r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(S(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Qe(`Error while retrieving App Check token: ${e.error}`),e?.token}};function B(n){return T(n)}var dt=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=ar(t=>this.observer=t)}get next(){return h(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var At={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function la(n){At=n}function as(n){return At.loadJS(n)}function da(){return At.recaptchaEnterpriseScript}function ua(){return At.gapiScript}function os(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var In=class{constructor(){this.enterprise=new kn}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},kn=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var ha="recaptcha-enterprise",Re="NO_RECAPTCHA",Ar="onFirebaseAuthREInstanceReady",Oe=class n{constructor(e){this.type=ha,this.auth=B(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,o)=>{qr(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)o(new Error("recaptcha Enterprise site key undefined"));else{let l=new at(c);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,a(l.siteKey)}}).catch(c=>{o(c)})})}function s(i,a,o){let c=window.grecaptcha;Er(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(l=>{a(l)}).catch(()=>{a(Re)})}):o(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new In().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(async o=>{if(!t&&Er(window.grecaptcha)&&n.scriptInjectionDeferred)await n.scriptInjectionDeferred.promise,s(o,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let c=da();c.length!==0&&(c+=o+`&onload=${Ar}`),n.scriptInjectionDeferred=new le,window[Ar]=()=>{n.scriptInjectionDeferred?.resolve()},as(c).then(()=>n.scriptInjectionDeferred?.promise).then(()=>{s(o,i,a)}).catch(l=>{a(l)})}}).catch(o=>{a(o)})})}};Oe.scriptInjectionDeferred=null;async function Te(n,e,t,r=!1,s=!1){let i=new Oe(n),a;if(s)a=Re;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}let o={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in o){let c=o.phoneEnrollmentInfo.phoneNumber,l=o.phoneEnrollmentInfo.recaptchaToken;Object.assign(o,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in o){let c=o.phoneSignInInfo.recaptchaToken;Object.assign(o,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return o}return r?Object.assign(o,{captchaResp:a}):Object.assign(o,{captchaResponse:a}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function ge(n,e,t,r,s){if(s==="EMAIL_PASSWORD_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let i=await Te(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let a=await Te(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)});else if(s==="PHONE_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){let i=await Te(n,e,t);return r(n,i).catch(async a=>{if(n._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(a.code==="auth/missing-recaptcha-token"||a.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let o=await Te(n,e,t,!1,!0);return r(n,o)}return Promise.reject(a)})}else{let i=await Te(n,e,t,!1,!0);return r(n,i)}else return Promise.reject(s+" provider is not supported.")}async function pa(n){let e=B(n),t=await qr(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new at(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Oe(e).verify()}function cs(n,e){let t=an(n,"auth");if(t.isInitialized()){let s=t.getImmediate(),i=t.getOptions();if(q(i,e??{}))return s;A(s,"already-initialized")}return t.initialize({options:e})}function fa(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(V);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function ls(n,e,t){let r=B(n);h(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let s=!!t?.disableWarnings,i=ds(e),{host:a,port:o}=ma(e),c=o===null?"":`:${o}`,l={url:`${i}//${a}${c}/`},u=Object.freeze({host:a,port:o,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){h(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),h(q(l,r.config.emulator)&&q(u,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,Ge(a)?or(`${i}//${a}${c}`):s||ga()}function ds(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ma(n){let e=ds(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){let i=s[1];return{host:i,port:Pr(r.substr(i.length+1))}}else{let[i,a]=r.split(":");return{host:i,port:Pr(a)}}}function Pr(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function ga(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var ne=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return M("not implemented")}_getIdTokenResponse(e){return M("not implemented")}_linkToIdToken(e,t){return M("not implemented")}_getReauthenticationResolver(e){return M("not implemented")}};async function ba(n,e){return I(n,"POST","/v1/accounts:signUp",e)}async function ya(n,e){return X(n,"POST","/v1/accounts:signInWithPassword",v(n,e))}async function va(n,e){return X(n,"POST","/v1/accounts:signInWithEmailLink",v(n,e))}async function wa(n,e){return X(n,"POST","/v1/accounts:signInWithEmailLink",v(n,e))}var Le=class n extends ne{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ge(e,t,"signInWithPassword",ya,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return va(e,{email:this._email,oobCode:this._password});default:A(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ge(e,r,"signUpPassword",ba,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return wa(e,{idToken:t,email:this._email,oobCode:this._password});default:A(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function be(n,e){return X(n,"POST","/v1/accounts:signInWithIdp",v(n,e))}var Ia="http://localhost",re=class n extends ne{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):A("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;let a=new n(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return be(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,be(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,be(e,t)}buildRequest(){let e={requestUri:Ia,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=de(t)}return e}};async function Cr(n,e){return I(n,"POST","/v1/accounts:sendVerificationCode",v(n,e))}async function ka(n,e){return X(n,"POST","/v1/accounts:signInWithPhoneNumber",v(n,e))}async function _a(n,e){let t=await X(n,"POST","/v1/accounts:signInWithPhoneNumber",v(n,e));if(t.temporaryProof)throw Se(n,"account-exists-with-different-credential",t);return t}var Ea={USER_NOT_FOUND:"user-not-found"};async function xa(n,e){let t={...e,operation:"REAUTH"};return X(n,"POST","/v1/accounts:signInWithPhoneNumber",v(n,t),Ea)}var De=class n extends ne{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return ka(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return _a(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return xa(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!t&&!s&&!i?null:new n({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i})}};function Ta(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Sa(n){let e=ue(he(n)).link,t=e?ue(he(e)).deep_link_id:null,r=ue(he(n)).deep_link_id;return(r?ue(he(r)).link:null)||r||t||e||n}var ut=class n{constructor(e){let t=ue(he(e)),r=t.apiKey??null,s=t.oobCode??null,i=Ta(t.mode??null);h(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){let t=Sa(e);try{return new n(t)}catch{return null}}};var se=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Le._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=ut.parseLink(t);return h(r,"argument-error"),Le._fromEmailAndCode(e,r.code,r.tenantId)}};se.PROVIDER_ID="password";se.EMAIL_PASSWORD_SIGN_IN_METHOD="password";se.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Me=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var ie=class extends Me{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Ue=class n extends ie{constructor(){super("facebook.com")}static credential(e){return re._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Ue.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ue.PROVIDER_ID="facebook.com";var ae=class n extends ie{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return re._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};ae.GOOGLE_SIGN_IN_METHOD="google.com";ae.PROVIDER_ID="google.com";var Be=class n extends ie{constructor(){super("github.com")}static credential(e){return re._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Be.GITHUB_SIGN_IN_METHOD="github.com";Be.PROVIDER_ID="github.com";var He=class n extends ie{constructor(){super("twitter.com")}static credential(e,t){return re._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};He.TWITTER_SIGN_IN_METHOD="twitter.com";He.PROVIDER_ID="twitter.com";async function Aa(n,e){return X(n,"POST","/v1/accounts:signUp",v(n,e))}var ve=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){let i=await Y._fromIdTokenResponse(e,r,s),a=Rr(r);return new n({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let s=Rr(r);return new n({user:e,providerId:s,_tokenResponse:r,operationType:t})}};function Rr(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var _n=class n extends R{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new n(e,t,r,s)}};function us(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?_n._fromErrorAndOperation(n,i,e,r):i})}async function Pa(n,e,t=!1){let r=await ye(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ve._forOperation(n,"link",r)}async function Ca(n,e,t=!1){let{auth:r}=n;if(S(r.app))return Promise.reject(j(r));let s="reauthenticate";try{let i=await ye(n,us(r,s,e,n),t);h(i.idToken,r,"internal-error");let a=On(i.idToken);h(a,r,"internal-error");let{sub:o}=a;return h(n.uid===o,r,"user-mismatch"),ve._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&A(r,"user-mismatch"),i}}async function hs(n,e,t=!1){if(S(n.app))return Promise.reject(j(n));let r="signIn",s=await us(n,r,e),i=await ve._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function ps(n,e){return hs(B(n),e)}async function fs(n){let e=B(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Dn(n,e,t){if(S(n.app))return Promise.reject(j(n));let r=B(n),a=await ge(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Aa,"EMAIL_PASSWORD_PROVIDER").catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&fs(n),c}),o=await ve._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(o.user),o}function Mn(n,e,t){return S(n.app)?Promise.reject(j(n)):ps(T(n),se.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&fs(n),r})}async function Ra(n,e){return I(n,"POST","/v1/accounts:update",e)}async function Ve(n,e){let{displayName:t,photoURL:r}=e;if(t===void 0&&r===void 0)return;let s=T(n),a={idToken:await s.getIdToken(),displayName:t,photoUrl:r,returnSecureToken:!0},o=await ye(s,Ra(s.auth,a));s.displayName=o.displayName||null,s.photoURL=o.photoUrl||null;let c=s.providerData.find(({providerId:l})=>l==="password");c&&(c.displayName=s.displayName,c.photoURL=s.photoURL),await s._updateTokensIfNecessary(o)}function je(n,e){return T(n).setPersistence(e)}function ms(n,e,t,r){return T(n).onIdTokenChanged(e,t,r)}function gs(n,e,t){return T(n).beforeAuthStateChanged(e,t)}function Un(n,e,t,r){return T(n).onAuthStateChanged(e,t,r)}function Pt(n){return T(n).signOut()}function Nr(n,e){return I(n,"POST","/v2/accounts/mfaEnrollment:start",v(n,e))}function Na(n,e){return I(n,"POST","/v2/accounts/mfaEnrollment:finalize",v(n,e))}function Oa(n,e){return I(n,"POST","/v2/accounts/mfaEnrollment:start",v(n,e))}function La(n,e){return I(n,"POST","/v2/accounts/mfaEnrollment:finalize",v(n,e))}var ht="__sak";var pt=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ht,"1"),this.storage.removeItem(ht),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var Da=1e3,Ma=10,ft=class extends pt{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ss(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,o,c)=>{this.notifyListeners(a,c)});return}let r=e.key;t?this.detachListener():this.stopPolling();let s=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);aa()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ma):s()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Da)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};ft.type="LOCAL";var We=ft;var Ua=1e3;function dn(n){let e=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return document.cookie.match(t)?.[1]??null}function un(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}var En=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=un(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:dn(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=un(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=un(e);if(window.cookieStore){let o=(l=>{let u=l.changed.find(g=>g.name===r);u&&t(u.value),l.deleted.find(g=>g.name===r)&&t(null)}),c=()=>window.cookieStore.removeEventListener("change",o);return this.listenerUnsubscribes.set(t,c),window.cookieStore.addEventListener("change",o)}let s=dn(r),i=setInterval(()=>{let o=dn(r);o!==s&&(t(o),s=o)},Ua),a=()=>clearInterval(i);this.listenerUnsubscribes.set(t,a)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};En.type="COOKIE";var mt=class extends pt{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};mt.type="SESSION";var ze=mt;function Ba(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var gt=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});let o=Array.from(a).map(async l=>l(t.origin,i)),c=await Ba(o);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};gt.receivers=[];function Bn(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var xn=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((o,c)=>{let l=Bn("",20);s.port1.start();let u=setTimeout(()=>{c(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(f){let g=f;if(g.data.eventId===l)switch(g.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(g.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function U(){return window}function Ha(n){U().location.href=n}function bs(){return typeof U().WorkerGlobalScope<"u"&&typeof U().importScripts=="function"}async function Fa(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $a(){return navigator?.serviceWorker?.controller||null}function Va(){return bs()?self:null}var ys="firebaseLocalStorageDb",ja=1,bt="firebaseLocalStorage",vs="fbase_key",oe=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Ct(n,e){return n.transaction([bt],e?"readwrite":"readonly").objectStore(bt)}function Wa(){let n=indexedDB.deleteDatabase(ys);return new oe(n).toPromise()}function ws(){let n=indexedDB.open(ys,ja);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(bt,{keyPath:vs})}catch(s){t(s)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(bt)?e(r):(r.close(),await Wa(),e(await ws()))})})}async function Or(n,e,t){let r=Ct(n,!0).put({[vs]:e,value:t});return new oe(r).toPromise()}async function za(n,e){let t=Ct(n,!1).get(e),r=await new oe(t).toPromise();return r===void 0?null:r.value}function Lr(n,e){let t=Ct(n,!0).delete(e);return new oe(t).toPromise()}var Ka=800,qa=3,yt=class{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=ws(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>qa)throw r;if(this.dbPromise){let s=this.dbPromise;this.dbPromise=null;try{(await s).close()}catch{}}}}async initializeServiceWorkerMessaging(){return bs()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=gt._getInstance(Va()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Fa(),!this.activeServiceWorker)return;this.sender=new xn(this.activeServiceWorker);let e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$a()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Or(e,ht,"1"),await Lr(e,ht)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Or(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>za(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Lr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{let e=await this._withRetries(s=>{let i=Ct(s,!1).getAll();return new oe(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(let s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||Qe(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ka)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}};yt.type="LOCAL";var Is=yt;function Dr(n,e){return I(n,"POST","/v2/accounts/mfaSignIn:start",v(n,e))}function Ga(n,e){return I(n,"POST","/v2/accounts/mfaSignIn:finalize",v(n,e))}function Ja(n,e){return I(n,"POST","/v2/accounts/mfaSignIn:finalize",v(n,e))}var Bc=os("rcb"),Hc=new te(3e4,6e4);var tt="recaptcha";async function Ya(n,e,t){if(!n._getRecaptchaConfig())try{await pa(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){let s=r.session;if("phoneNumber"in r){h(s.type==="enroll",n,"internal-error");let i={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await ge(n,i,"mfaSmsEnrollment",async(l,u)=>{if(u.phoneEnrollmentInfo.captchaResponse===Re){h(t?.type===tt,l,"argument-error");let f=await hn(l,u,t);return Nr(l,f)}return Nr(l,u)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).phoneSessionInfo.sessionInfo}else{h(s.type==="signin",n,"internal-error");let i=r.multiFactorHint?.uid||r.multiFactorUid;h(i,n,"missing-multi-factor-info");let a={mfaPendingCredential:s.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await ge(n,a,"mfaSmsSignIn",async(u,f)=>{if(f.phoneSignInInfo.captchaResponse===Re){h(t?.type===tt,u,"argument-error");let g=await hn(u,f,t);return Dr(u,g)}return Dr(u,f)},"PHONE_PROVIDER").catch(u=>Promise.reject(u))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await ge(n,s,"sendVerificationCode",async(c,l)=>{if(l.captchaResponse===Re){h(t?.type===tt,c,"argument-error");let u=await hn(c,l,t);return Cr(c,u)}return Cr(c,l)},"PHONE_PROVIDER").catch(c=>Promise.reject(c))).sessionInfo}}finally{t?._reset()}}async function hn(n,e,t){h(t.type===tt,n,"argument-error");let r=await t.verify();h(typeof r=="string",n,"argument-error");let s={...e};if("phoneEnrollmentInfo"in s){let i=s.phoneEnrollmentInfo.phoneNumber,a=s.phoneEnrollmentInfo.captchaResponse,o=s.phoneEnrollmentInfo.clientType,c=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:r,captchaResponse:a,clientType:o,recaptchaVersion:c}}),s}else if("phoneSignInInfo"in s){let i=s.phoneSignInInfo.captchaResponse,a=s.phoneSignInInfo.clientType,o=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:i,clientType:a,recaptchaVersion:o}}),s}else return Object.assign(s,{recaptchaToken:r}),s}var Fe=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=B(e)}verifyPhoneNumber(e,t){return Ya(this.auth,e,T(t))}static credential(e,t){return De._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?De._fromTokenResponse(t,r):null}};Fe.PROVIDER_ID="phone";Fe.PHONE_SIGN_IN_METHOD="phone";function ks(n,e){return e?V(e):(h(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var $e=class extends ne{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return be(e,this._buildIdpRequest())}_linkToIdToken(e,t){return be(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return be(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Xa(n){return hs(n.auth,new $e(n),n.bypassAuthState)}function Qa(n){let{auth:e,user:t}=n;return h(t,e,"internal-error"),Ca(t,new $e(n),n.bypassAuthState)}async function Za(n){let{auth:e,user:t}=n;return h(t,e,"internal-error"),Pa(t,new $e(n),n.bypassAuthState)}var vt=class{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:o}=e;if(a){this.reject(a);return}let c={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Xa;case"linkViaPopup":case"linkViaRedirect":return Za;case"reauthViaPopup":case"reauthViaRedirect":return Qa;default:A(this.auth,"internal-error")}}resolve(e){W(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){W(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var eo=new te(2e3,1e4);async function Hn(n,e,t){if(S(n.app))return Promise.reject(N(n,"operation-not-supported-in-this-environment"));let r=B(n);Ki(n,e,Me);let s=ks(r,t);return new wt(r,"signInViaPopup",e,s).executeNotNull()}var wt=class n extends vt{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return h(e,this.auth,"internal-error"),e}async onExecution(){W(this.filter.length===1,"Popup operations only handle one event");let e=Bn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(N(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(N(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(N(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,eo.get())};e()}};wt.currentPopupAction=null;var to="pendingRedirect",nt=new Map,Tn=class extends vt{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=nt.get(this.auth._key());if(!e){try{let r=await no(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}nt.set(this.auth._key(),e)}return this.bypassAuthState||nt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function no(n,e){let t=io(e),r=so(n);if(!await r._isAvailable())return!1;let s=await r._get(t)==="true";return await r._remove(t),s}function ro(n,e){nt.set(n._key(),e)}function so(n){return V(n._redirectPersistence)}function io(n){return et(to,n.config.apiKey,n.name)}async function ao(n,e,t=!1){if(S(n.app))return Promise.reject(j(n));let r=B(n),s=ks(r,e),a=await new Tn(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}var oo=600*1e3,Sn=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!co(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!_s(e)){let r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(N(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=oo&&this.cachedEventUids.clear(),this.cachedEventUids.has(Mr(e))}saveEventToCache(e){this.cachedEventUids.add(Mr(e)),this.lastProcessedEventTime=Date.now()}};function Mr(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function _s({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function co(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return _s(n);default:return!1}}async function lo(n,e={}){return I(n,"GET","/v1/projects",e)}var uo=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ho=/^https?/;async function po(n){if(n.config.emulator)return;let{authorizedDomains:e}=await lo(n);for(let t of e)try{if(fo(t))return}catch{}A(n,"unauthorized-domain")}function fo(n){let e=fn(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!ho.test(t))return!1;if(uo.test(n))return r===n;let s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}var mo=new te(3e4,6e4);function Ur(){let n=U().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function go(n){return new Promise((e,t)=>{function r(){Ur(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ur(),t(N(n,"network-request-failed"))},timeout:mo.get()})}if(U().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(U().gapi?.load)r();else{let s=os("iframefcb");return U()[s]=()=>{gapi.load?r():t(N(n,"network-request-failed"))},as(`${ua()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw rt=null,e})}var rt=null;function bo(n){return rt=rt||go(n),rt}var yo=new te(5e3,15e3),vo="__/auth/iframe",wo="emulator/auth/iframe",Io={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ko=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function _o(n){let e=n.config;h(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Nn(e,wo):`https://${n.config.authDomain}/${vo}`,r={apiKey:e.apiKey,appName:n.name,v:me},s=ko.get(n.config.apiHost);s&&(r.eid=s);let i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${de(r).slice(1)}`}async function Eo(n){let e=await bo(n),t=U().gapi;return h(t,n,"internal-error"),e.open({where:document.body,url:_o(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Io,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});let a=N(n,"network-request-failed"),o=U().setTimeout(()=>{i(a)},yo.get());function c(){U().clearTimeout(o),s(r)}r.ping(c).then(c,()=>{i(a)})}))}var xo={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},To=500,So=600,Ao="_blank",Po="http://localhost",It=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Co(n,e,t,r=To,s=So){let i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),o="",c={...xo,width:r.toString(),height:s.toString(),top:i,left:a},l=k().toLowerCase();t&&(o=Zr(l)?Ao:t),Xr(l)&&(e=e||Po,c.scrollbars="yes");let u=Object.entries(c).reduce((g,[p,m])=>`${g}${p}=${m},`,"");if(ia(l)&&o!=="_self")return Ro(e||"",o),new It(null);let f=window.open(e||"",o,u);h(f,n,"popup-blocked");try{f.focus()}catch{}return new It(f)}function Ro(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var No="__/auth/handler",Oo="emulator/auth/handler",Lo=encodeURIComponent("fac");async function Br(n,e,t,r,s,i){h(n.config.authDomain,n,"auth-domain-config-required"),h(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:me,eventId:s};if(e instanceof Me){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",ir(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[u,f]of Object.entries(i||{}))a[u]=f}if(e instanceof ie){let u=e.getScopes().filter(f=>f!=="");u.length>0&&(a.scopes=u.join(","))}n.tenantId&&(a.tid=n.tenantId);let o=a;for(let u of Object.keys(o))o[u]===void 0&&delete o[u];let c=await n._getAppCheckToken(),l=c?`#${Lo}=${encodeURIComponent(c)}`:"";return`${Do(n)}?${de(o).slice(1)}${l}`}function Do({config:n}){return n.emulator?Nn(n,Oo):`https://${n.authDomain}/${No}`}var pn="webStorageSupport",An=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ze,this._completeRedirectFn=ao,this._overrideRedirectResult=ro}async _openPopup(e,t,r,s){W(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");let i=await Br(e,t,r,fn(),s);return Co(e,i,Bn())}async _openRedirect(e,t,r,s){await this._originValidation(e);let i=await Br(e,t,r,fn(),s);return Ha(i),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(W(i,"If manager is not set, promise should be"),i)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await Eo(e),r=new Sn(e);return t.register("authEvent",s=>(h(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(pn,{type:pn},s=>{let i=s?.[0]?.[pn];i!==void 0&&t(!!i),A(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=po(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ss()||Qr()||Ln()}},Es=An,kt=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return M("unexpected MultiFactorSessionType")}}},Pn=class n extends kt{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return Na(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Ga(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},_t=class{constructor(){}static assertion(e){return Pn._fromCredential(e)}};_t.FACTOR_ID="phone";var Et=class{static assertionForEnrollment(e,t){return xt._fromSecret(e,t)}static assertionForSignIn(e,t){return xt._fromEnrollmentId(e,t)}static async generateSecret(e){let t=e;h(typeof t.user?.auth<"u","internal-error");let r=await Oa(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return Tt._fromStartTotpMfaEnrollmentResponse(r,t.user.auth)}};Et.FACTOR_ID="totp";var xt=class n extends kt{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return h(typeof this.secret<"u",e,"argument-error"),La(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){h(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return Ja(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Tt=class n{constructor(e,t,r,s,i,a,o){this.sessionInfo=a,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=s,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let r=!1;return(Xe(e)||Xe(t))&&(r=!0),r&&(Xe(e)&&(e=this.auth.currentUser?.email||"unknownuser"),Xe(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Xe(n){return typeof n>"u"||n?.length===0}var Hr="@firebase/auth",Fr="1.13.7";var Cn=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){h(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Mo(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Uo(n){fe(new L("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:o}=r.options;h(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let c={apiKey:a,authDomain:o,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:is(n)},l=new wn(r,s,i,c);return fa(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),fe(new L("auth-internal",e=>{let t=B(e.getProvider("auth").getImmediate());return(r=>new Cn(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),G(Hr,Fr,Mo(n)),G(Hr,Fr,"esm2020")}var Bo=300,Ho=Wt("authIdTokenMaxAge")||Bo,$r=null,Fo=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Ho)return;let s=t?.token;$r!==s&&($r=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Fn(n=wr()){let e=an(n,"auth");if(e.isInitialized())return e.getImmediate();let t=cs(n,{popupRedirectResolver:Es,persistence:[Is,We,ze]}),r=Wt("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let i=new URL(r,location.origin);if(location.origin===i.origin){let a=Fo(i.toString());gs(t,a,()=>a(t.currentUser)),ms(t,o=>a(o))}}let s=Xn("auth");return s&&ls(t,`http://${s}`),t}function $o(){return document.getElementsByTagName("head")?.[0]??document}la({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{let i=N("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",$o().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Uo("Browser");var xs={projectId:"eng-object-1n2tx",appId:"1:494705160260:web:340cd8aa2f18b9d4254c11",apiKey:"AIzaSyDrnYZhR-E243eq7yMpHyoVZuJ9YG55uVY",authDomain:"eng-object-1n2tx.firebaseapp.com",firestoreDatabaseId:"ai-studio-baniinthehouse-f0e85c23-a555-41f7-822f-df7af6af7cb8",storageBucket:"eng-object-1n2tx.firebasestorage.app",messagingSenderId:"494705160260",measurementId:"",oAuthClientId:"494705160260-8t3l8p7gnvi2l6i19fli0q3i9drdp9ku.apps.googleusercontent.com",recaptchaSiteKey:""};var P=[{key:"OtrPrice",name:"Master OTR",code:"OTR",badge:"Harga Pasar",description:"Daftar harga pasar & taksasi unit motor per merk, model, dan tahun pembuatan.",sheetKeywords:["OTR","HARGA","PRICE","MOTOR","TAKSASI"],idPrefix:"otr_",fields:[{key:"brand",label:"Merk Motor",type:"select",required:!0,options:["Honda","Yamaha","Suzuki","Kawasaki","Vespa","Lainnya"],excelAliases:["merk","brand","merk motor","pabrikan"]},{key:"model",label:"Model / Tipe Motor",type:"text",required:!0,placeholder:"misal Beat CBS, NMAX 155, Vario 160",excelAliases:["model","tipe","type","nama motor","unit motor","model motor"]},{key:"year",label:"Tahun Pembuatan",type:"number",required:!0,placeholder:"2023",excelAliases:["tahun","year","thn","tahun motor","tahun pembuatan"]},{key:"harga_pasar",label:"Harga Pasar (OTR)",type:"currency",required:!0,placeholder:"18500000",excelAliases:["harga pasar","harga","otr","harga otr","nilai pasar","taksasi"]},{key:"object_description",label:"Deskripsi / Varian Unit",type:"text",placeholder:"misal ISS Deluxe, ABS Connected",excelAliases:["deskripsi","description","object_description","varian","keterangan"]},{key:"group_type_unit",label:"Group Tipe Unit",type:"select",options:["Matic","Bebek","Sport","Trail","Listrik","Lainnya"],excelAliases:["group","group type","group_type_unit","kategori","segmen"]}]},{key:"ClopContract",name:"Master CLOP HO",code:"CLOP",badge:"Kontrak HO",description:"Data referensi kontrak CLOP HO untuk verifikasi riwayat pembiayaan dan nasabah.",sheetKeywords:["CLOP","KONTRAK","CONTRACT","HO"],idPrefix:"clop_",fields:[{key:"contract_no",label:"Nomor Kontrak",type:"text",required:!0,placeholder:"0123456789",excelAliases:["contract_no","no kontrak","nomor kontrak","contract no","kontrak"]},{key:"customer_name",label:"Nama Konsumen / Debitur",type:"text",required:!0,placeholder:"Nama lengkap konsumen",excelAliases:["customer_name","nama konsumen","nama debitur","nama nasabah","customer","nama"]},{key:"nosin",label:"Nomor Mesin (Nosin)",type:"text",placeholder:"JF51E...",excelAliases:["nosin","nomor mesin","no mesin","engine no"]},{key:"office_code",label:"Kode Kantor / Cabang",type:"text",placeholder:"JKT01",excelAliases:["office_code","kode kantor","cabang","office code","kode cabang"]},{key:"buss_unit",label:"Unit Bisnis",type:"text",placeholder:"R2 Regular",excelAliases:["buss_unit","unit bisnis","business unit","bu"]},{key:"trend_cycle",label:"Trend Cycle / Siklus",type:"text",placeholder:"Cycle 1",excelAliases:["trend_cycle","trend cycle","siklus","cycle"]}]},{key:"BookingQuality",name:"Master BQ",code:"BQ",badge:"Kualitas Booking",description:"Data monitoring Booking Quality, jatuh tempo angsuran, dan status account nasabah.",sheetKeywords:["BQ","BOOKING","QUALITY","ANGSURAN","JATUH TEMPO"],idPrefix:"bq_",fields:[{key:"contract_no",label:"Nomor Kontrak",type:"text",required:!0,placeholder:"0123456789",excelAliases:["contract_no","no kontrak","nomor kontrak","kontrak"]},{key:"customer_name",label:"Nama Konsumen",type:"text",required:!0,placeholder:"Nama konsumen",excelAliases:["customer_name","nama konsumen","nama nasabah","customer"]},{key:"status_account",label:"Status Account",type:"select",required:!0,options:["Lancar","DPK","NPL","Menunggak","Lunas"],excelAliases:["status_account","status account","status","kolektibilitas"]},{key:"jatuh_tempo",label:"Tanggal Jatuh Tempo",type:"date",required:!0,excelAliases:["jatuh_tempo","jatuh tempo","tgl jatuh tempo","due date"]},{key:"angsuran",label:"Nilai Angsuran per Bulan",type:"currency",placeholder:"850000",excelAliases:["angsuran","installment","cicilan","nilai angsuran","angsuran per bulan"]},{key:"marketing_name",label:"Nama Marketing / Sales",type:"text",placeholder:"Nama marketing penanggung jawab",excelAliases:["marketing_name","nama marketing","marketing","sales","pic"]}]},{key:"FollowUpBahan",name:"Master Follow Up Gform",code:"GFORM",badge:"Leads Form",description:"Data prospek dan leads yang masuk melalui Google Form atau saluran pendaftaran online.",sheetKeywords:["GFORM","FOLLOW","BAHAN","GOOGLE FORM","FORM","LEADS"],idPrefix:"fub_",fields:[{key:"customer_name",label:"Nama Calon Konsumen",type:"text",required:!0,placeholder:"Nama lengkap pendaftar",excelAliases:["customer_name","nama calon konsumen","nama pendaftar","nama","nama konsumen"]},{key:"phone",label:"Nomor WhatsApp / HP",type:"text",required:!0,placeholder:"081234567890",excelAliases:["phone","no hp","nomor hp","telepon","whatsapp","no wa","kontak"]},{key:"motor",label:"Unit Motor yang Diminati",type:"text",required:!0,placeholder:"Honda Beat / Vario 125",excelAliases:["motor","unit motor","tipe motor","pilihan motor","kendaraan"]},{key:"status",label:"Status Tindak Lanjut",type:"select",options:["bahan","follow_up","proses_taksasi","deal","batal"],excelAliases:["status","status tindak lanjut","tahap","stage"]},{key:"notes",label:"Catatan Kebutuhan / Dana",type:"text",placeholder:"misal butuh dana 15 juta untuk modal usaha",excelAliases:["notes","catatan","keterangan","kebutuhan dana","pesan"]},{key:"marketing_name",label:"Marketing PIC",type:"text",placeholder:"Nama marketing penangan",excelAliases:["marketing_name","nama marketing","marketing","pic"]}]},{key:"PriceList",name:"Master PriceList",code:"PL",badge:"Skema Angsuran",description:"Daftar simulasi uang muka (DP), tenor bulan, dan plafon angsuran pembiayaan.",sheetKeywords:["PRICE","PRICELIST","ANGSURAN","SKEMA","TENOR","SIMULASI"],idPrefix:"pl_",fields:[{key:"brand",label:"Merk Motor",type:"select",required:!0,options:["Honda","Yamaha","Suzuki","Kawasaki","Vespa","Lainnya"],excelAliases:["brand","merk","merk motor"]},{key:"model",label:"Model / Tipe Motor",type:"text",required:!0,placeholder:"Beat CBS / NMAX 155",excelAliases:["model","tipe","type","nama motor","unit"]},{key:"year",label:"Tahun",type:"number",placeholder:"2023",excelAliases:["year","tahun","thn"]},{key:"otr",label:"Nilai OTR",type:"currency",placeholder:"18500000",excelAliases:["otr","harga otr","harga pasar"]},{key:"dp",label:"Uang Muka (DP)",type:"currency",placeholder:"2000000",excelAliases:["dp","uang muka","down payment"]},{key:"tenor",label:"Tenor (Bulan)",type:"select",required:!0,options:["11","17","23","29","35"],excelAliases:["tenor","jangka waktu","bulan","tenor bulan"]},{key:"angsuran",label:"Nilai Angsuran per Bulan",type:"currency",required:!0,placeholder:"785000",excelAliases:["angsuran","cicilan","angsuran per bulan","installment"]},{key:"plafond",label:"Plafond Pinjaman",type:"currency",placeholder:"16500000",excelAliases:["plafond","plafon","nilai pinjaman","pinjaman"]}]},{key:"Prospect",name:"Master Bahan Prospek",code:"PROSPEK",badge:"Database Pipeline",description:"Kumpulan data calon debitur dan pipeline prospek kerja harian sales force.",sheetKeywords:["PROSPEK","PROSPECT","PIPELINE","SALES","BAHAN PROSPEK"],idPrefix:"pro_",fields:[{key:"customer_name",label:"Nama Konsumen Prospek",type:"text",required:!0,placeholder:"Nama konsumen",excelAliases:["customer_name","nama konsumen","nama","nama prospek","debitur"]},{key:"phone",label:"Nomor WhatsApp / HP",type:"text",required:!0,placeholder:"081234567890",excelAliases:["phone","no hp","telepon","whatsapp","no wa"]},{key:"motor",label:"Unit Motor Taksasi",type:"text",required:!0,placeholder:"Honda Scoopy 2022",excelAliases:["motor","unit motor","unit","tipe motor","kendaraan"]},{key:"plafond",label:"Pengajuan Plafond",type:"currency",placeholder:"12000000",excelAliases:["plafond","plafon","pengajuan","kebutuhan pinjaman"]},{key:"status",label:"Status Pipeline",type:"select",options:["baru","proses","taksasi","deal","batal"],excelAliases:["status","tahap","stage"]},{key:"marketing_name",label:"Nama Marketing",type:"text",placeholder:"Nama marketing",excelAliases:["marketing_name","nama marketing","marketing"]}]}];function jo(n){let e=typeof n=="string"?parseFloat(n.replace(/[^0-9.-]+/g,""))||0:n||0;return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e)}var d={activeTab:"excel",selectedEntityKey:"OtrPrice",workbookData:null,activeSheetIndex:0,isSaving:!1,saveProgress:0,saveMessage:""};function jn(n="excel",e="OtrPrice"){d.activeTab=n,d.selectedEntityKey=e;let t=document.getElementById("smart-master-import-hub-modal");t||(t=document.createElement("div"),t.id="smart-master-import-hub-modal",t.className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 lg:p-6 overflow-y-auto animate-fadeIn",document.body.appendChild(t)),_()}function Ts(){let n=document.getElementById("smart-master-import-hub-modal");n&&n.remove()}window.openMasterImportHub=jn;window.closeMasterImportHub=Ts;function Ss(n,e){let t={id:`${e.idPrefix}${Date.now()}_${Math.floor(Math.random()*1e5)}`,created_date:new Date().toISOString()},r=Object.keys(n);return e.fields.forEach(s=>{let i;for(let a of r){let o=a.trim().toLowerCase();if(o===s.key.toLowerCase()){i=n[a];break}if(s.excelAliases.some(c=>o.includes(c.toLowerCase())||c.toLowerCase().includes(o))){i=n[a];break}}i!=null&&i!==""?s.type==="number"?t[s.key]=parseInt(String(i).replace(/[^0-9-]/g,""),10)||0:s.type==="currency"?t[s.key]=parseFloat(String(i).replace(/[^0-9.-]/g,""))||0:(s.type,t[s.key]=String(i).trim()):s.type==="number"||s.type==="currency"?t[s.key]=0:s.type==="select"&&s.options?t[s.key]=s.options[0]:t[s.key]=""}),e.key==="OtrPrice"&&(t.search_text=`${t.brand||""} ${t.model||""} ${t.year||""} ${t.object_description||""}`.trim()),t}function Wo(n,e){let t=n.toUpperCase();for(let s of P)if(s.sheetKeywords.some(i=>t.includes(i)))return s.key;let r=e.join(" ").toLowerCase();return r.includes("kontrak")&&(r.includes("nosin")||r.includes("trend"))?"ClopContract":r.includes("angsuran")&&r.includes("jatuh tempo")?"BookingQuality":r.includes("gform")||r.includes("follow up")?"FollowUpBahan":r.includes("tenor")&&r.includes("dp")?"PriceList":r.includes("otr")||r.includes("harga pasar")?"OtrPrice":r.includes("prospek")||r.includes("pipeline")?"Prospect":"OtrPrice"}function _(){let n=document.getElementById("smart-master-import-hub-modal");if(!n)return;let e=P.find(t=>t.key===d.selectedEntityKey)||P[0];n.innerHTML=`
    <div class="relative w-full max-w-6xl rounded-3xl bg-[#090f1d] border border-cyan-500/30 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(6,182,212,0.18)] text-slate-100 overflow-hidden my-auto flex flex-col max-h-[92vh]">
      
      <!-- Top Hub Header -->
      <div class="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800/80 bg-[#0d1629]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 11h6M9 15h4" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-bold tracking-tight text-white">Master Data & Import Hub</h1>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">Multi-Sheet Excel & Manual</span>
            </div>
            <p class="text-xs text-slate-400">Pusat import otomatis Excel semua sheet, input data manual satu per satu, dan kelola 6 master data</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <button id="btn-refresh-hub-data" type="button" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer" title="Refresh data">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button id="btn-close-master-hub" type="button" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 flex items-center justify-center transition-all cursor-pointer border border-slate-700/60" title="Tutup Modal Hub">
            &times;
          </button>
        </div>
      </div>

      <!-- Segmented Main Tabs Bar -->
      <div class="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-slate-950/60 px-5 sm:px-7 pt-2.5 gap-2">
        <div class="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
          <button id="hub-tab-excel" type="button" class="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${d.activeTab==="excel"?"border-cyan-400 text-cyan-300 bg-cyan-950/30":"border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"}">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>1. Import File Excel (Multi-Sheet)</span>
          </button>
          <button id="hub-tab-manual" type="button" class="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${d.activeTab==="manual"?"border-cyan-400 text-cyan-300 bg-cyan-950/30":"border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"}">
            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>2. Input Manual Satu-per-Satu</span>
          </button>
          <button id="hub-tab-view" type="button" class="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 ${d.activeTab==="view"?"border-cyan-400 text-cyan-300 bg-cyan-950/30":"border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"}">
            <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>3. Kelola & Riwayat Master Data</span>
          </button>
        </div>

        <!-- Master Entity Selector Pill/Dropdown -->
        <div class="flex items-center gap-2 pb-2">
          <label class="text-[11px] text-slate-400 font-medium hidden sm:inline">Pilih Master:</label>
          <select id="hub-entity-select" class="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold focus:outline-none focus:border-cyan-400 cursor-pointer">
            ${P.map(t=>`<option value="${t.key}" ${t.key===d.selectedEntityKey?"selected":""}>${t.name} (${t.code})</option>`).join("")}
          </select>
        </div>
      </div>

      <!-- Hub Content Area -->
      <div class="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
        
        <!-- Status Notification Box -->
        <div id="hub-notification-box" class="hidden p-3.5 rounded-2xl text-xs flex items-center justify-between border"></div>

        <!-- Progress Indicator Bar (if saving) -->
        <div id="hub-progress-container" class="${d.isSaving?"block":"hidden"} p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-cyan-300 font-semibold" id="hub-progress-label">${d.saveMessage||"Sedang memproses..."}</span>
            <span class="font-mono text-cyan-400 font-bold" id="hub-progress-val">${d.saveProgress}%</span>
          </div>
          <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div id="hub-progress-bar" class="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300" style="width: ${d.saveProgress}%;"></div>
          </div>
        </div>

        ${d.activeTab==="excel"?zo(e):d.activeTab==="manual"?qo(e):Go(e)}

      </div>

      <!-- Hub Footer -->
      <div class="px-5 sm:px-7 py-3.5 border-t border-slate-800/80 bg-[#0d1629] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Database Terkoneksi: Cloud SQL PostgreSQL & Local Fallback Store</span>
        </div>
        <div class="flex items-center gap-3 font-mono text-[11px]">
          <span>App: Smart Taksasi V2.1.3</span>
          <span class="text-slate-600">|</span>
          <span class="text-cyan-400">SheetJS v0.18.5 Active</span>
        </div>
      </div>

    </div>
  `,Jo(e)}function zo(n){let e=d.workbookData;return`
    <div class="space-y-6">
      
      <!-- Entity Banner -->
      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">${n.badge}</span>
          <div>
            <h3 class="text-sm font-bold text-white">${n.name}</h3>
            <p class="text-xs text-slate-400">${n.description}</p>
          </div>
        </div>
        <div class="text-xs text-slate-400">
          Kolom wajib: <span class="font-mono text-cyan-300">${n.fields.filter(t=>t.required).map(t=>t.label).join(", ")}</span>
        </div>
      </div>

      <!-- Step 1: Upload Excel File Box -->
      <div id="excel-drop-zone" class="relative group border-2 border-dashed border-slate-700 hover:border-cyan-400/80 rounded-3xl p-6 sm:p-8 text-center transition-all bg-slate-950/40 hover:bg-slate-900/50 cursor-pointer">
        <input type="file" id="excel-file-input" accept=".xlsx, .xls, .csv" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
        <div class="flex flex-col items-center justify-center space-y-3 pointer-events-none">
          <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/10">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h4 class="text-sm font-bold text-white">Klik atau Tarik File Excel ke Sini (.xlsx, .xls, .csv)</h4>
            <p class="text-xs text-slate-400 mt-1">Sistem otomatis membaca seluruh Sheet dalam file Excel (Master OTR, CLOP HO, BQ, Follow Up Gform, PriceList, Prospek)</p>
          </div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-cyan-300 font-mono">
            <span>Mendukung file multi-sheet tak terbatas</span>
          </div>
        </div>
      </div>

      ${e?`
        <!-- Step 2: Multi-Sheet Inspector & Selector -->
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">File Terbaca: <span class="text-white font-mono">${e.fileName}</span> (${e.sheets.length} Sheet Ditemukan)</h4>
              <p class="text-xs text-slate-500">Pilih sheet di bawah ini untuk melihat pratinjau tabel dan menentukan target master data.</p>
            </div>
            
            <button id="btn-save-all-matching-sheets" type="button" class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Simpan Semua Sheet ke Database</span>
            </button>
          </div>

          <!-- Sheet Tabs Bar -->
          <div class="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            ${e.sheets.map((t,r)=>{let s=r===d.activeSheetIndex,i=P.find(a=>a.key===t.suggestedEntityKey);return`
                <button type="button" data-sheet-index="${r}" class="btn-select-sheet flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${s?"bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-sm":"bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-800"}">
                  <span class="w-2 h-2 rounded-full ${s?"bg-cyan-400":"bg-slate-600"}"></span>
                  <span class="font-bold">${t.name}</span>
                  <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-300">${t.rows.length} baris</span>
                  ${i?`<span class="text-[10px] px-1 rounded bg-cyan-900/50 text-cyan-300 font-mono">${i.code}</span>`:""}
                </button>
              `}).join("")}
          </div>

          <!-- Sheet Preview Details & Table -->
          ${Ko(e.sheets[d.activeSheetIndex]||e.sheets[0],n)}

        </div>
      `:""}

    </div>
  `}function Ko(n,e){if(!n)return"";let t=P.find(s=>s.key===n.suggestedEntityKey)||e,r=n.rows.slice(0,30);return`
    <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5 space-y-4">
      
      <!-- Sheet Action Controls -->
      <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div class="flex flex-wrap items-center gap-3">
          <div>
            <span class="text-xs text-slate-400">Target Simpan Master:</span>
            <select id="sheet-target-entity-select" class="ml-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold focus:outline-none">
              ${P.map(s=>`<option value="${s.key}" ${s.key===n.suggestedEntityKey?"selected":""}>${s.name} (${s.code})</option>`).join("")}
            </select>
          </div>
          <div class="text-xs font-mono text-slate-400">
            Total: <span class="text-white font-bold">${n.rows.length}</span> baris data
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button id="btn-save-current-sheet" type="button" class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>Simpan Sheet "${n.name}" ke ${t.name}</span>
          </button>
        </div>
      </div>

      <!-- Columns Detected Badge List -->
      <div class="space-y-1.5">
        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pemetaan Kolom Excel yang Terdeteksi:</div>
        <div class="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          ${n.headers.map(s=>{let i=t.fields.find(a=>{let o=s.toLowerCase().trim();return o===a.key.toLowerCase()||a.excelAliases.some(c=>o.includes(c.toLowerCase()))});return`
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-900 border ${i?"border-cyan-500/50 text-cyan-300":"border-slate-800 text-slate-400"}">
                <span class="font-medium">${s}</span>
                ${i?`<span class="text-[10px] text-emerald-400 font-mono">\u2192 ${i.label}</span>`:'<span class="text-[10px] text-slate-500">(ekstra)</span>'}
              </span>
            `}).join("")}
        </div>
      </div>

      <!-- Preview Table -->
      <div class="overflow-x-auto rounded-xl border border-slate-800 max-h-[350px]">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-slate-900 text-slate-300 font-bold sticky top-0 border-b border-slate-800">
            <tr>
              <th class="p-2.5 w-12 text-center text-slate-500">No</th>
              ${n.headers.map(s=>`<th class="p-2.5 whitespace-nowrap text-slate-200">${s}</th>`).join("")}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 bg-slate-950/40">
            ${r.length===0?`<tr><td colspan="${n.headers.length+1}" class="p-4 text-center text-slate-500">Sheet kosong atau tidak ada data baris.</td></tr>`:r.map((s,i)=>`
                  <tr class="hover:bg-slate-900/50 transition-colors">
                    <td class="p-2.5 text-center font-mono text-slate-500">${i+1}</td>
                    ${n.headers.map(a=>{let o=s[a],c=o!=null?String(o):"";return`<td class="p-2.5 whitespace-nowrap ${!isNaN(Number(c))&&c.trim()!==""?"font-mono text-cyan-200":"text-slate-300"}">${c}</td>`}).join("")}
                  </tr>
                `).join("")}
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-between text-[11px] text-slate-500">
        <span>Menampilkan pratinjau ${r.length} dari total ${n.rows.length} baris.</span>
        <span>Seluruh baris akan diproses saat Anda menekan tombol simpan.</span>
      </div>

    </div>
  `}function qo(n){return`
    <div class="space-y-6">
      
      <!-- Entity Banner -->
      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">${n.badge}</span>
          <div>
            <h3 class="text-sm font-bold text-white">Formulir Input Langsung: ${n.name}</h3>
            <p class="text-xs text-slate-400">Masukkan data satu per satu dengan validasi kolom otomatis sebelum disimpan ke database</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-emerald-400 flex items-center gap-1 font-mono">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            Siap Input
          </span>
        </div>
      </div>

      <!-- Main Input Form -->
      <form id="form-manual-master-entry" class="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 sm:p-7 space-y-6">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          ${n.fields.map(e=>{let t=e.required?'<span class="text-rose-400 font-bold ml-1">*</span>':'<span class="text-slate-500 text-[10px] ml-1">(opsional)</span>';if(e.type==="select"&&e.options)return`
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-300">${e.label}${t}</label>
                  <select name="${e.key}" ${e.required?"required":""} class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer">
                    ${e.options.map(r=>`<option value="${r}">${r}</option>`).join("")}
                  </select>
                </div>
              `;if(e.type==="currency")return`
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-300">${e.label}${t}</label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-2.5 text-xs text-cyan-400 font-bold">Rp</span>
                    <input type="number" step="any" name="${e.key}" placeholder="${e.placeholder||"0"}" ${e.required?"required":""} class="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                  </div>
                </div>
              `;if(e.type==="date"){let r=new Date().toISOString().slice(0,10);return`
                <div class="space-y-1.5">
                  <label class="block text-xs font-semibold text-slate-300">${e.label}${t}</label>
                  <input type="date" name="${e.key}" value="${r}" ${e.required?"required":""} class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                </div>
              `}return`
              <div class="space-y-1.5">
                <label class="block text-xs font-semibold text-slate-300">${e.label}${t}</label>
                <input type="${e.type}" name="${e.key}" placeholder="${e.placeholder||""}" ${e.required?"required":""} class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
              </div>
            `}).join("")}
        </div>

        <!-- Form Actions -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div class="text-[11px] text-slate-400">
            Kolom dengan tanda <span class="text-rose-400 font-bold">*</span> wajib diisi sebelum menyimpan.
          </div>
          
          <div class="flex items-center gap-2">
            <button type="reset" id="btn-reset-manual-form" class="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer">
              Reset Form
            </button>
            <button type="submit" name="action" value="save_and_new" class="px-4 py-2.5 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 transition-all active:scale-95 cursor-pointer">
              Simpan & Buat Baru
            </button>
            <button type="submit" name="action" value="save" class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Simpan ke ${n.name}</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  `}function Go(n){return`
    <div class="space-y-4">
      
      <!-- Top Explorer Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div class="flex items-center gap-3">
          <div class="relative w-64 sm:w-80">
            <input type="text" id="input-search-master-table" placeholder="Cari data ${n.name}..." class="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400" />
            <svg class="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span id="master-records-count-badge" class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 text-cyan-300 border border-cyan-500/30">
            Memuat...
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button id="btn-export-current-entity-excel" type="button" class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer" title="Download Excel">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Excel
          </button>
          <button id="btn-clear-entity-data" type="button" class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all cursor-pointer" title="Hapus seluruh data entity ini">
            Kosongkan
          </button>
        </div>
      </div>

      <!-- Live Master Data Table Container -->
      <div id="master-live-table-container" class="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden min-h-[250px] p-4 flex items-center justify-center text-slate-500 text-xs">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-cyan-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Memuat data ${n.name}...</span>
        </div>
      </div>

    </div>
  `}function Jo(n){let e=document.getElementById("btn-close-master-hub");e&&(e.onclick=Ts);let t=document.getElementById("btn-refresh-hub-data");t&&(t.onclick=()=>_());let r=document.getElementById("hub-tab-excel"),s=document.getElementById("hub-tab-manual"),i=document.getElementById("hub-tab-view");r&&(r.onclick=()=>{d.activeTab="excel",_()}),s&&(s.onclick=()=>{d.activeTab="manual",_()}),i&&(i.onclick=()=>{d.activeTab="view",_(),we(n)});let a=document.getElementById("hub-entity-select");a&&(a.onchange=p=>{if(d.selectedEntityKey=p.target.value,_(),d.activeTab==="view"){let m=P.find(O=>O.key===d.selectedEntityKey)||n;we(m)}});let o=document.getElementById("excel-file-input");o&&(o.onchange=async p=>{let m=p.target.files?.[0];m&&await Yo(m,n)}),document.querySelectorAll(".btn-select-sheet").forEach(p=>{p.addEventListener("click",()=>{let m=parseInt(p.getAttribute("data-sheet-index")||"0",10);d.activeSheetIndex=m,_()})});let l=document.getElementById("sheet-target-entity-select");l&&d.workbookData&&d.workbookData.sheets[d.activeSheetIndex]&&(l.onchange=p=>{let m=p.target.value;d.workbookData&&(d.workbookData.sheets[d.activeSheetIndex].suggestedEntityKey=m),_()});let u=document.getElementById("btn-save-current-sheet");u&&d.workbookData&&d.workbookData.sheets[d.activeSheetIndex]&&(u.onclick=async()=>{let p=d.workbookData.sheets[d.activeSheetIndex],m=p.suggestedEntityKey||n.key;await Xo(p,m)});let f=document.getElementById("btn-save-all-matching-sheets");f&&d.workbookData&&(f.onclick=async()=>{await Qo(d.workbookData)});let g=document.getElementById("form-manual-master-entry");g&&(g.onsubmit=async p=>{p.preventDefault();let O=p.submitter?.value==="save_and_new";await Zo(g,n,O)}),d.activeTab==="view"&&we(n)}async function Yo(n,e){E(`Membaca file "${n.name}"...`,"info");try{let t=await n.arrayBuffer(),r=window.XLSX;if(!r)throw new Error("Pustaka SheetJS belum dimuat. Periksa koneksi lokal.");let s=r.read(t,{type:"array",cellDates:!0});if(!s.SheetNames||s.SheetNames.length===0)throw new Error("File Excel tidak memiliki Sheet.");let i=[];for(let a of s.SheetNames){let o=s.Sheets[a],c=r.utils.sheet_to_json(o,{defval:""});if(c&&c.length>0){let l=Object.keys(c[0]||{}),u=Wo(a,l);i.push({name:a,rows:c,headers:l,suggestedEntityKey:u})}}if(i.length===0)throw new Error("Tidak ada data baris yang ditemukan dalam file Excel ini.");d.workbookData={fileName:n.name,sheets:i},d.activeSheetIndex=0,E(`Berhasil membaca ${i.length} Sheet dari "${n.name}". Pilih sheet dan periksa tabel pratinjau.`,"success"),_()}catch(t){console.error("Excel parse error:",t),E(`Gagal membaca Excel: ${t.message}`,"error")}}async function Xo(n,e){let t=P.find(r=>r.key===e)||P[0];d.isSaving=!0,d.saveProgress=10,d.saveMessage=`Menyiapkan ${n.rows.length} data untuk ${t.name}...`,_();try{let r=n.rows.map(o=>Ss(o,t)),s=50,i=r.length,a=0;for(let o=0;o<i;o+=s){let c=r.slice(o,o+s),l=await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${t.key}/bulk`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});if(!l.ok)throw new Error(`Gagal menyimpan batch data (status ${l.status})`);a+=c.length,d.saveProgress=Math.min(95,Math.round(a/i*100)),d.saveMessage=`Menyimpan ${a} dari ${i} data ke ${t.name}...`,Rt(d.saveProgress,d.saveMessage)}d.saveProgress=100,d.saveMessage=`Selesai! Seluruh ${i} data berhasil disimpan ke ${t.name}.`,Rt(100,d.saveMessage),setTimeout(()=>{d.isSaving=!1,E(`Sukses! ${i} data dari Sheet "${n.name}" telah disimpan ke ${t.name}.`,"success"),d.activeTab="view",d.selectedEntityKey=t.key,_(),we(t)},600)}catch(r){d.isSaving=!1,E(`Gagal simpan sheet: ${r.message}`,"error"),_()}}async function Qo(n){d.isSaving=!0,d.saveProgress=5,d.saveMessage=`Memulai penyimpanan multi-sheet (${n.sheets.length} sheet)...`,_();try{let e=0;for(let t=0;t<n.sheets.length;t++){let r=n.sheets[t],s=P.find(o=>o.key===r.suggestedEntityKey)||P[0],i=r.rows.map(o=>Ss(o,s));d.saveMessage=`Menyimpan Sheet ${t+1}/${n.sheets.length} ("${r.name}" -> ${s.name})...`,d.saveProgress=Math.round((t+.3)/n.sheets.length*100),Rt(d.saveProgress,d.saveMessage);let a=100;for(let o=0;o<i.length;o+=a){let c=i.slice(o,o+a);await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${s.key}/bulk`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)})}e+=i.length}d.saveProgress=100,d.saveMessage=`Semua sheet berhasil disimpan! Total ${e} data ditambahkan.`,Rt(100,d.saveMessage),setTimeout(()=>{d.isSaving=!1,E(`Berhasil mengimpor seluruh ${n.sheets.length} Sheet (Total: ${e} data) ke Database!`,"success"),d.activeTab="view",_()},800)}catch(e){d.isSaving=!1,E(`Gagal simpan semua sheet: ${e.message}`,"error"),_()}}function Rt(n,e){let t=document.getElementById("hub-progress-bar"),r=document.getElementById("hub-progress-val"),s=document.getElementById("hub-progress-label");t&&(t.style.width=`${n}%`),r&&(r.innerText=`${n}%`),s&&(s.innerText=e)}async function Zo(n,e,t){let r=new FormData(n),s={id:`${e.idPrefix}${Date.now()}_${Math.floor(Math.random()*1e3)}`,created_date:new Date().toISOString()};for(let i of e.fields){let a=r.get(i.key);if(i.required&&(!a||String(a).trim()==="")){E(`Kolom "${i.label}" wajib diisi.`,"error");let o=n.querySelector(`[name="${i.key}"]`);o&&o.focus();return}i.type==="number"?s[i.key]=parseInt(String(a||0).replace(/[^0-9-]/g,""),10)||0:i.type==="currency"?s[i.key]=parseFloat(String(a||0).replace(/[^0-9.-]/g,""))||0:s[i.key]=String(a||"").trim()}e.key==="OtrPrice"&&(s.search_text=`${s.brand||""} ${s.model||""} ${s.year||""} ${s.object_description||""}`.trim()),E(`Menyimpan data baru ke ${e.name}...`,"info");try{let i=await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${e.key}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!i.ok)throw new Error(`Gagal menyimpan data (status ${i.status})`);if(E(`Data baru berhasil disimpan ke ${e.name}!`,"success"),t){n.reset();let a=n.querySelector("input");a&&a.focus()}else d.activeTab="view",_(),we(e)}catch(i){console.error("Manual save error:",i),E(`Gagal menyimpan data: ${i.message}`,"error")}}async function we(n){let e=document.getElementById("master-live-table-container"),t=document.getElementById("master-records-count-badge");if(e)try{let r=await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${n.key}`),s=r.ok?await r.json():[];if(t&&(t.innerText=`${s.length} Data Tersimpan`),s.length===0){e.innerHTML=`
        <div class="py-12 text-center space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p class="text-sm font-semibold text-slate-300">Belum ada data untuk ${n.name}</p>
          <p class="text-xs text-slate-500">Gunakan tab Import Excel atau Input Manual untuk memasukkan data master.</p>
        </div>
      `;return}e.innerHTML=`
      <div class="w-full overflow-x-auto max-h-[480px]">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-slate-900 text-slate-300 font-bold sticky top-0 border-b border-slate-800 z-10">
            <tr>
              <th class="p-3 w-12 text-center text-slate-500">No</th>
              ${n.fields.map(i=>`<th class="p-3 whitespace-nowrap">${i.label}</th>`).join("")}
              <th class="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody id="master-table-tbody" class="divide-y divide-slate-800/60 bg-slate-950/40">
            ${$n(s,n)}
          </tbody>
        </table>
      </div>
    `,ec(s,n),Vn(n),tc(s,n),nc(n)}catch(r){console.error("Load master table error:",r),e.innerHTML=`<div class="p-4 text-rose-400">Gagal memuat data: ${r.message}</div>`}}function $n(n,e){return n.map((t,r)=>`
      <tr class="hover:bg-slate-900/60 transition-colors" data-row-id="${t.id}">
        <td class="p-3 text-center font-mono text-slate-500">${r+1}</td>
        ${e.fields.map(s=>{let i=t[s.key];return s.type==="currency"?`<td class="p-3 whitespace-nowrap font-mono font-bold text-cyan-300">${jo(i)}</td>`:s.type==="number"?`<td class="p-3 whitespace-nowrap font-mono text-slate-200">${i??0}</td>`:`<td class="p-3 whitespace-nowrap text-slate-300">${i??"-"}</td>`}).join("")}
        <td class="p-3 text-right whitespace-nowrap">
          <button type="button" data-del-id="${t.id}" class="btn-delete-row text-rose-400 hover:text-rose-200 p-1 rounded-lg hover:bg-rose-500/20 transition-all cursor-pointer" title="Hapus baris ini">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </td>
      </tr>
    `).join("")}function ec(n,e){let t=document.getElementById("input-search-master-table"),r=document.getElementById("master-table-tbody");!t||!r||(t.oninput=()=>{let s=t.value.toLowerCase().trim();if(!s){r.innerHTML=$n(n,e),Vn(e);return}let i=n.filter(a=>Object.values(a).some(o=>String(o).toLowerCase().includes(s)));r.innerHTML=$n(i,e),Vn(e)})}function Vn(n){document.querySelectorAll(".btn-delete-row").forEach(t=>{t.addEventListener("click",async()=>{let r=t.getAttribute("data-del-id");if(r&&confirm(`Yakin ingin menghapus data dengan ID ${r}?`))try{await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${n.key}/${r}`,{method:"DELETE"});let s=document.querySelector(`tr[data-row-id="${r}"]`);s&&s.remove(),E(`Data berhasil dihapus dari ${n.name}.`,"success")}catch(s){E(`Gagal menghapus: ${s.message}`,"error")}})})}function tc(n,e){let t=document.getElementById("btn-export-current-entity-excel");t&&(t.onclick=()=>{try{let r=window.XLSX;if(!r){alert("Fitur SheetJS belum tersedia.");return}let s=r.utils.json_to_sheet(n),i=r.utils.book_new();r.utils.book_append_sheet(i,s,e.code),r.writeFile(i,`${e.name.replace(/\s+/g,"_")}_${new Date().toISOString().slice(0,10)}.xlsx`)}catch(r){alert("Export gagal: "+r.message)}})}function nc(n){let e=document.getElementById("btn-clear-entity-data");e&&(e.onclick=async()=>{if(confirm(`PERINGATAN: Kosongkan seluruh data ${n.name}? Tindakan ini tidak dapat dibatalkan.`))try{await fetch(`/api/apps/6ac14a88b86a6f85981e7116/entities/${n.key}/delete-many`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ids:[]})}),E(`Seluruh data ${n.name} berhasil dikosongkan.`,"success"),we(n)}catch(t){E(`Gagal mengosongkan data: ${t.message}`,"error")}})}function E(n,e){let t=document.getElementById("hub-notification-box");t&&(t.classList.remove("hidden","bg-emerald-950/60","border-emerald-500/40","text-emerald-300","bg-rose-950/60","border-rose-500/40","text-rose-300","bg-cyan-950/60","border-cyan-500/40","text-cyan-300"),e==="success"?t.classList.add("bg-emerald-950/60","border-emerald-500/40","text-emerald-300"):e==="error"?t.classList.add("bg-rose-950/60","border-rose-500/40","text-rose-300"):t.classList.add("bg-cyan-950/60","border-cyan-500/40","text-cyan-300"),t.innerHTML=`
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full ${e==="success"?"bg-emerald-400":e==="error"?"bg-rose-400":"bg-cyan-400"}"></span>
      <span class="font-medium">${n}</span>
    </div>
    <button type="button" onclick="this.parentElement.classList.add('hidden')" class="text-slate-400 hover:text-white">&times;</button>
  `,(e==="success"||e==="info")&&setTimeout(()=>{t&&t.classList.add("hidden")},5e3))}var rc=cn().length?cn()[0]:on(xs),K=Fn(rc),Cs=new ae;Cs.setCustomParameters({prompt:"select_account"});try{je(K,We).catch(()=>{})}catch{}var Z="login",Ot=!1,Mt=null,Lt=null;function As(n){switch(n?.code||""){case"auth/user-not-found":return"Akun dengan email ini belum terdaftar. Silakan pilih Daftar Akun.";case"auth/wrong-password":case"auth/invalid-credential":return"Email atau kata sandi yang Anda masukkan salah.";case"auth/email-already-in-use":return"Alamat email ini sudah terdaftar. Silakan pilih Masuk ke Akun.";case"auth/weak-password":return"Kata sandi terlalu pendek. Masukkan minimal 6 karakter.";case"auth/invalid-email":return"Format alamat email tidak valid.";case"auth/popup-closed-by-user":return"Jendela masuk Google ditutup sebelum proses selesai.";case"auth/popup-blocked":return"Jendela popup Google diblokir browser. Izinkan popup untuk melanjutkan.";case"auth/network-request-failed":return"Gagal terhubung ke jaringan. Periksa sambungan internet Anda.";case"auth/too-many-requests":return"Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat lagi.";case"auth/operation-not-allowed":return"Metode autentikasi ini sedang dinonaktifkan di Firebase Console. Gunakan Masuk dengan Google.";default:return n?.message||"Terjadi kesalahan saat autentikasi. Silakan coba lagi."}}async function Dt(n,e){try{await fetch("/api/auth/session",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({uid:e.uid,email:e.email,displayName:e.displayName||(e.email?e.email.split("@")[0]:"User Taksasi"),photoURL:e.photoURL||null})})}catch(t){console.warn("Session sync warning (non-blocking):",t)}}function Rs(){try{for(let n=localStorage.length-1;n>=0;n--){let e=(localStorage.key(n)||"").toLowerCase();e.startsWith("base")&&e.includes("44")&&localStorage.removeItem(localStorage.key(n)||"")}}catch{}}function _e(n,e){localStorage.setItem("smart_access_token",n),localStorage.setItem("auth_token",n),localStorage.setItem("token",n),Rs(),localStorage.setItem("smart_taksasi_user",JSON.stringify({uid:e.uid,email:e.email,displayName:e.displayName||(e.email?e.email.split("@")[0]:"User Taksasi"),photoURL:e.photoURL||null}))}function zn(){localStorage.removeItem("smart_access_token"),localStorage.removeItem("auth_token"),localStorage.removeItem("token"),Rs(),localStorage.removeItem("smart_taksasi_user")}function Wn(n,e,t){let r=t?t.innerHTML:"";t&&(t.innerHTML=`
      <svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Mengunduh...</span>
    `),fetch(n).then(s=>{if(!s.ok)throw new Error(`HTTP ${s.status}`);return s.blob()}).then(s=>{let i=window.URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download=e,document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>window.URL.revokeObjectURL(i),1e4),t&&(t.innerHTML=`
          <svg class="w-3.5 h-3.5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Tersimpan!</span>
        `,setTimeout(()=>{t&&(t.innerHTML=r)},2500))}).catch(s=>{console.warn("Direct blob fetch notice:",s);let i=document.createElement("a");i.href=n,i.download=e,document.body.appendChild(i),i.click(),i.remove(),t&&(t.innerHTML=r)})}function Ut(n){Mt=n;let e=document.getElementById("smart-taksasi-user-bar");e||(e=document.createElement("div"),e.id="smart-taksasi-user-bar",e.className="fixed top-3 right-3 sm:top-4 sm:right-5 z-[9990] flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d1629]/95 border border-cyan-500/30 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all duration-300",document.body.appendChild(e));let t=n.displayName||(n.email?n.email.split("@")[0]:"User"),r=n.email||"",s=(t.charAt(0)||"U").toUpperCase(),i=n.photoURL?`<img src="${n.photoURL}" alt="${t}" class="w-7 h-7 rounded-full object-cover border border-cyan-400/50 shadow-sm" />`:`<div class="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 text-white font-bold text-xs flex items-center justify-center border border-cyan-300/40">${s}</div>`;e.innerHTML=`
    <button id="btn-topbar-download-apk" type="button" class="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.35)] transition-all cursor-pointer" title="Unduh File Aplikasi Android (.apk)">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>Unduh APK</span>
    </button>
    <div class="h-4 w-px bg-slate-700/80"></div>
    <button id="btn-smart-profile" type="button" class="flex items-center gap-2 pr-2 text-left hover:opacity-90 active:scale-95 transition-all max-w-[170px] sm:max-w-[220px] cursor-pointer" title="Buka Profil & Pengaturan Sesi">
      ${i}
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
  `;let a=document.getElementById("btn-topbar-download-apk");a&&a.addEventListener("click",l=>{l.preventDefault(),Wn("/SmartTaksasi.apk","SmartTaksasi-v2.1.3.apk",a)});let o=document.getElementById("btn-smart-profile");o&&o.addEventListener("click",()=>{Ns(n)});let c=document.getElementById("btn-smart-logout");c&&c.addEventListener("click",async()=>{if(confirm(`Yakin ingin keluar dari akun ${t}?`))try{await Pt(K),zn(),await fetch("/api/apps/auth/logout",{method:"POST"}).catch(()=>{}),window.location.reload()}catch(l){console.warn("Logout notice:",l),window.location.reload()}})}function sc(){let n=document.getElementById("smart-taksasi-user-bar");n&&n.remove()}function ke(n){let e=document.getElementById("root");e&&(n?(e.style.removeProperty("display"),e.style.removeProperty("opacity"),e.style.removeProperty("pointer-events"),e.style.display="block",e.classList.remove("hidden")):(e.style.setProperty("display","none","important"),e.style.setProperty("opacity","0"),e.style.setProperty("pointer-events","none"),e.classList.add("hidden")))}function Ns(n){let e=document.getElementById("smart-user-profile-modal");e&&e.remove(),z();let t=n.displayName||(n.email?n.email.split("@")[0]:"User Taksasi"),r=n.email||"",s=(t.charAt(0)||"U").toUpperCase(),i=n.photoURL||"",o=(n.providerData&&n.providerData[0]?n.providerData[0].providerId:"email").includes("google")?"Google Authentication":"Email & Password";e=document.createElement("div"),e.id="smart-user-profile-modal",e.className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-fadeIn",e.innerHTML=`
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
              ${i?`<img src="${i}" alt="${t}" class="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/60 shadow-lg" />`:`<div class="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-cyan-300/60">${s}</div>`}
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
  `,document.body.appendChild(e);let c=document.getElementById("btn-close-profile-modal");c&&c.addEventListener("click",()=>{z(),e?.remove()}),e.addEventListener("click",l=>{l.target===e&&(z(),e?.remove())}),ic(),ac(n),oc(n),cc(n)}function z(){Lt&&(Lt.getTracks().forEach(n=>n.stop()),Lt=null)}function ic(){let n=["details","camera","session","install"];n.forEach(t=>{let r=document.getElementById(`ptab-${t}`);r&&r.addEventListener("click",()=>{t!=="camera"&&z(),n.forEach(s=>{let i=document.getElementById(`ptab-${s}`),a=document.getElementById(`psec-${s}`);i&&a&&(s===t?(i.className="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-cyan-400 text-cyan-300",a.classList.remove("hidden")):(i.className="px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 border-transparent text-slate-400 hover:text-slate-200",a.classList.add("hidden")))})})});let e=document.getElementById("ptab-master");e&&e.addEventListener("click",()=>{z();let t=document.getElementById("smart-user-profile-modal");t&&t.remove(),jn("excel")})}function ac(n){let e=document.getElementById("form-edit-profile"),t=document.getElementById("input-prof-name"),r=document.getElementById("profile-feedback-box");e&&t&&e.addEventListener("submit",async s=>{s.preventDefault();let i=t.value.trim();if(i)try{await Ve(n,{displayName:i});let a=await n.getIdToken();await fetch("/api/user/profile",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({name:i})}).catch(()=>{}),_e(a,n),Ut(n),r&&(r.className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300",r.textContent="Nama profil berhasil diperbarui!",r.classList.remove("hidden"),setTimeout(()=>r.classList.add("hidden"),3e3))}catch(a){r&&(r.className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-300",r.textContent="Gagal menyimpan perubahan: "+(a.message||"Error"),r.classList.remove("hidden"))}})}function oc(n){let e=document.getElementById("btn-start-camera"),t=document.getElementById("btn-snap-camera"),r=document.getElementById("btn-stop-camera"),s=document.getElementById("btn-save-photo"),i=document.getElementById("btn-retake-photo"),a=document.getElementById("profile-cam-video"),o=document.getElementById("profile-cam-canvas"),c=document.getElementById("cam-overlay"),l=document.getElementById("camera-standby-view"),u=document.getElementById("cam-captured-view"),f=document.getElementById("cam-preview-img"),g=document.getElementById("input-upload-photo"),p=document.getElementById("profile-feedback-box"),m="";e&&a&&e.addEventListener("click",async()=>{try{z();let y=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:640},facingMode:"user"},audio:!1});Lt=y,a.srcObject=y,a.classList.remove("hidden"),c&&c.classList.remove("hidden"),l&&l.classList.add("hidden"),u&&u.classList.add("hidden"),e.classList.add("hidden"),t&&t.classList.remove("hidden"),r&&r.classList.remove("hidden"),s&&s.classList.add("hidden"),i&&i.classList.add("hidden")}catch(y){console.warn("Camera access notice:",y),alert("Tidak dapat mengakses kamera: "+(y.message||"Periksa izin kamera browser Anda."))}}),t&&a&&o&&t.addEventListener("click",()=>{let y=a.videoWidth||480,w=a.videoHeight||480;o.width=y,o.height=w;let x=o.getContext("2d");x&&(x.drawImage(a,0,0,y,w),m=o.toDataURL("image/jpeg",.85),f&&(f.src=m),z(),a.classList.add("hidden"),c&&c.classList.add("hidden"),u&&u.classList.remove("hidden"),t.classList.add("hidden"),r&&r.classList.add("hidden"),s&&s.classList.remove("hidden"),i&&i.classList.remove("hidden"))}),i&&e&&i.addEventListener("click",()=>{u&&u.classList.add("hidden"),s&&s.classList.add("hidden"),i.classList.add("hidden"),e.click()}),r&&e&&r.addEventListener("click",()=>{z(),a&&a.classList.add("hidden"),c&&c.classList.add("hidden"),l&&l.classList.remove("hidden"),t&&t.classList.add("hidden"),r.classList.add("hidden"),e.classList.remove("hidden")});let O=async y=>{try{s&&(s.disabled=!0),await Ve(n,{photoURL:y});let w=await n.getIdToken();await fetch("/api/user/profile",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${w}`},body:JSON.stringify({photo_url:y})}).catch(()=>{}),_e(w,n),Ut(n);let x=document.getElementById("profile-display-avatar");x&&(x.innerHTML=`<img src="${y}" alt="User" class="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 shadow-lg" />`),p&&(p.className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300",p.textContent="Foto profil berhasil diperbarui!",p.classList.remove("hidden"),setTimeout(()=>p.classList.add("hidden"),3e3))}catch(w){alert("Gagal menerapkan foto: "+(w.message||"Error"))}finally{s&&(s.disabled=!1)}};s&&s.addEventListener("click",()=>{m&&O(m)}),g&&g.addEventListener("change",()=>{let y=g.files&&g.files[0];if(!y)return;let w=new FileReader;w.onload=x=>{let ce=x.target?.result;ce&&(m=ce,f&&(f.src=ce),z(),a&&a.classList.add("hidden"),c&&c.classList.add("hidden"),l&&l.classList.add("hidden"),u&&u.classList.remove("hidden"),e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),r&&r.classList.add("hidden"),s&&s.classList.remove("hidden"),i&&i.classList.remove("hidden"))},w.readAsDataURL(y)})}function cc(n){let e=document.getElementById("radio-persist-local"),t=document.getElementById("radio-persist-session"),r=document.getElementById("btn-toggle-theme"),s=document.getElementById("btn-modal-logout"),i=document.getElementById("profile-feedback-box");e&&e.addEventListener("change",async()=>{if(e.checked)try{await je(K,We),i&&(i.className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300",i.textContent="Preferensi sesi: Diatur tetap masuk di perangkat ini.",i.classList.remove("hidden"),setTimeout(()=>i.classList.add("hidden"),3e3))}catch{}}),t&&t.addEventListener("change",async()=>{if(t.checked)try{await je(K,ze),i&&(i.className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300",i.textContent="Preferensi sesi: Diatur sesi sementara (keluar saat browser ditutup).",i.classList.remove("hidden"),setTimeout(()=>i.classList.add("hidden"),3e3))}catch{}}),r&&r.addEventListener("click",()=>{let a=document.documentElement.classList.contains("dark");document.documentElement.classList.toggle("dark",!a),document.documentElement.classList.toggle("light",a),localStorage.setItem("darkMode",String(!a))}),s&&s.addEventListener("click",async()=>{if(confirm("Yakin ingin keluar dari akun?"))try{await Pt(K),zn(),await fetch("/api/apps/auth/logout",{method:"POST"}).catch(()=>{}),window.location.reload()}catch{window.location.reload()}})}typeof window<"u"&&(window.openUserProfileModal=()=>{Mt&&Ns(Mt)});function Nt(){let n=document.getElementById("auth-gatekeeper");n||(n=document.createElement("div"),n.id="auth-gatekeeper",n.className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070b14] overflow-y-auto px-4 py-8 font-sans selection:bg-cyan-500/30 selection:text-cyan-200",document.body.prepend(n)),n.innerHTML=`
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
          <button id="tab-login" type="button" class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${Z==="login"?"bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm":"text-slate-400 hover:text-slate-200"}">
            Masuk ke Akun
          </button>
          <button id="tab-register" type="button" class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${Z==="register"?"bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm":"text-slate-400 hover:text-slate-200"}">
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
          <div id="group-name" class="${Z==="register"?"block":"hidden"} space-y-1">
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
            <span id="submit-text">${Z==="login"?"Masuk ke Smart Taksasi":"Buat Akun & Masuk"}</span>
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
  `,lc()}function lc(){let n=document.getElementById("tab-login"),e=document.getElementById("tab-register"),t=document.getElementById("group-name"),r=document.getElementById("submit-text"),s=document.getElementById("auth-error-box"),i=p=>{Z=p,s&&s.classList.add("hidden"),t&&(p==="register"?t.classList.remove("hidden"):t.classList.add("hidden")),r&&(r.textContent=p==="login"?"Masuk ke Smart Taksasi":"Buat Akun & Masuk"),n&&e&&(p==="login"?(n.className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm",e.className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 text-slate-400 hover:text-slate-200"):(e.className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm",n.className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 text-slate-400 hover:text-slate-200"))};n&&n.addEventListener("click",()=>i("login")),e&&e.addEventListener("click",()=>i("register"));let a=document.getElementById("btn-toggle-password"),o=document.getElementById("input-password");a&&o&&a.addEventListener("click",()=>{let p=o.type==="password";o.type=p?"text":"password"});let c=document.getElementById("btn-google-auth");c&&c.addEventListener("click",async()=>{if(!Ot){Q(null),Ie(!0,"Menghubungkan ke Google...");try{let p=await Hn(K,Cs),m=await p.user.getIdToken();_e(m,p.user),await Dt(m,p.user),Ke(p.user)}catch(p){let m=p?.code||"";m==="auth/popup-closed-by-user"||m==="auth/cancelled-popup-request"?(console.info("Google Sign-In popup closed by user."),Q("Jendela masuk Google ditutup. Silakan coba lagi atau gunakan tombol Masuk Cepat Petugas.")):m==="auth/popup-blocked"?(console.warn("Google Sign-In popup blocked by browser."),Q("Popup Google diblokir browser. Izinkan popup atau gunakan Masuk Cepat Petugas.")):(console.warn("Google Sign-In notice:",p?.message||p),Q(As(p)))}finally{Ie(!1)}}});let l=document.getElementById("btn-fast-demo-auth"),u=document.getElementById("btn-barrier-apk");u&&u.addEventListener("click",()=>{Wn("/SmartTaksasi.apk","SmartTaksasi-v2.1.3.apk",u)});let f=document.getElementById("btn-barrier-zip");f&&f.addEventListener("click",()=>{Wn("/download-zip","smart-taksasi-complete.zip",f)}),l&&l.addEventListener("click",async()=>{if(!Ot){Q(null),Ie(!0,"Menyiapkan sesi petugas...");try{let p={uid:"user_bani",email:"bani.munggaran07@gmail.com",displayName:"Bani Munggaran",photoURL:null},m="session_"+Math.random().toString(36).substring(2)+Date.now();_e(m,p),await Dt(m,p),Ke(p)}catch(p){console.warn("Demo session notice:",p)}finally{Ie(!1)}}});let g=document.getElementById("auth-email-form");g&&g.addEventListener("submit",async p=>{if(p.preventDefault(),Ot)return;let m=document.getElementById("input-email"),O=document.getElementById("input-password"),y=document.getElementById("input-name"),w=m?.value?.trim()||"",x=O?.value||"",ce=y?.value?.trim()||"";if(!w||!x){Q("Harap isi alamat email dan kata sandi.");return}Q(null),Ie(!0,Z==="login"?"Memverifikasi akun...":"Membuat akun baru...");try{let C;if(Z==="login")C=(await Mn(K,w,x)).user;else if(C=(await Dn(K,w,x)).user,ce)try{await Ve(C,{displayName:ce})}catch{}let Kn=await C.getIdToken();_e(Kn,C),await Dt(Kn,C),Ke(C)}catch(C){console.warn("Email auth notice:",C?.message||C),Q(As(C))}finally{Ie(!1)}})}function Q(n){let e=document.getElementById("auth-error-box"),t=document.getElementById("auth-error-msg");!e||!t||(n?(t.textContent=n,e.classList.remove("hidden")):(e.classList.add("hidden"),t.textContent=""))}function Ie(n,e){Ot=n;let t=document.getElementById("btn-submit-auth"),r=document.getElementById("submit-text"),s=document.getElementById("submit-spinner"),i=document.getElementById("btn-google-auth");t&&(t.disabled=n),i&&(i.disabled=n),n?(s&&s.classList.remove("hidden"),r&&e&&(r.textContent=e)):(s&&s.classList.add("hidden"),r&&(r.textContent=Z==="login"?"Masuk ke Smart Taksasi":"Buat Akun & Masuk"))}function Ke(n){let e=document.getElementById("auth-gatekeeper");e&&(e.style.transition="opacity 250ms ease-out, transform 250ms ease-out",e.style.opacity="0",e.style.transform="scale(0.98)",setTimeout(()=>{e.remove()},260)),ke(!0),Ut(n)}function Ps(){let n=localStorage.getItem("smart_access_token"),e=localStorage.getItem("smart_taksasi_user");if(n&&e)try{let t=JSON.parse(e);t&&t.email?(ke(!0),Ut(t)):(ke(!1),Nt())}catch{ke(!1),Nt()}else ke(!1),Nt();Un(K,async t=>{if(t)try{let r=await t.getIdToken();_e(r,t),await Dt(r,t),Ke(t)}catch(r){console.warn("Token acquisition notice:",r),Ke(t)}else{let r=localStorage.getItem("smart_access_token"),s=localStorage.getItem("smart_taksasi_user");(!r||!s)&&(Mt=null,zn(),sc(),ke(!1),document.getElementById("auth-gatekeeper")||Nt())}})}typeof window<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>Ps()):Ps());export{Wn as downloadFileViaBlob,Ns as openUserProfileModal,Ps as startAuthGatekeeper};
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
