import{h as z,C as Q,D as C,p as X,E as J,F as Y,G as H,H as Z,l as K,d as ee,c as te,I as oe,r as $,J as D,s as T,t as r,K as j,L as N,M as d,v,N as O,O as P,q as M,P as F,Q as L,R as ie,S as se}from"./entry.edd59e7b.js";import{u as ne}from"./vue.f36acd1f.0321f6ce.js";async function le(t,e){return await ae(e).catch(o=>(console.error("Failed to get image meta for "+e,o+""),{width:0,height:0,ratio:0}))}async function ae(t){if(typeof Image>"u")throw new TypeError("Image not supported");return new Promise((e,i)=>{const o=new Image;o.onload=()=>{const s={width:o.width,height:o.height,ratio:o.width/o.height};e(s)},o.onerror=s=>i(s),o.src=t})}function R(t){return e=>e?t[e]||e:t.missingValue}function re({formatter:t,keyMap:e,joinWith:i="/",valueMap:o}={}){t||(t=(l,a)=>`${l}=${a}`),e&&typeof e!="function"&&(e=R(e));const s=o||{};return Object.keys(s).forEach(l=>{typeof s[l]!="function"&&(s[l]=R(s[l]))}),(l={})=>Object.entries(l).filter(([g,y])=>typeof y<"u").map(([g,y])=>{const c=s[g];return typeof c=="function"&&(y=c(l[g])),g=typeof e=="function"?e(g):g,t(g,y)}).join(i)}function U(t=""){if(typeof t=="number")return t;if(typeof t=="string"&&t.replace("px","").match(/^\d+$/g))return parseInt(t,10)}function ce(t=""){if(t===void 0||!t.length)return[];const e=new Set;for(const i of t.split(" ")){const o=parseInt(i.replace("x",""));o&&e.add(o)}return Array.from(e)}function de(t){if(t.length===0)throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)")}function ue(t){const e={};if(typeof t=="string")for(const i of t.split(/[\s,]+/).filter(o=>o)){const o=i.split(":");o.length!==2?e["1px"]=o[0].trim():e[o[0].trim()]=o[1].trim()}else Object.assign(e,t);return e}function me(t){const e={options:t},i=(s,l={})=>B(e,s,l),o=(s,l={},a={})=>i(s,{...a,modifiers:J(l,a.modifiers||{})}).url;for(const s in t.presets)o[s]=(l,a,g)=>o(l,a,{...t.presets[s],...g});return o.options=t,o.getImage=i,o.getMeta=(s,l)=>fe(e,s,l),o.getSizes=(s,l)=>pe(e,s,l),e.$img=o,o}async function fe(t,e,i){const o=B(t,e,{...i});return typeof o.getMeta=="function"?await o.getMeta():await le(t,o.url)}function B(t,e,i){var c,x;if(typeof e!="string"||e==="")throw new TypeError(`input must be a string (received ${typeof e}: ${JSON.stringify(e)})`);if(e.startsWith("data:"))return{url:e};const{provider:o,defaults:s}=he(t,i.provider||t.options.provider),l=ge(t,i.preset);if(e=z(e)?e:Q(e),!o.supportsAlias)for(const S in t.options.alias)e.startsWith(S)&&(e=C(t.options.alias[S],e.substr(S.length)));if(o.validateDomains&&z(e)){const S=X(e).host;if(!t.options.domains.find(E=>E===S))return{url:e}}const a=J(i,l,s);a.modifiers={...a.modifiers};const g=a.modifiers.format;(c=a.modifiers)!=null&&c.width&&(a.modifiers.width=U(a.modifiers.width)),(x=a.modifiers)!=null&&x.height&&(a.modifiers.height=U(a.modifiers.height));const y=o.getImage(e,a,t);return y.format=y.format||g||"",y}function he(t,e){const i=t.options.providers[e];if(!i)throw new Error("Unknown provider: "+e);return i}function ge(t,e){if(!e)return{};if(!t.options.presets[e])throw new Error("Unknown preset: "+e);return t.options.presets[e]}function pe(t,e,i){var k,I,f,h,_;const o=U((k=i.modifiers)==null?void 0:k.width),s=U((I=i.modifiers)==null?void 0:I.height),l=ue(i.sizes),a=(f=i.densities)!=null&&f.trim()?ce(i.densities.trim()):t.options.densities;de(a);const g=o&&s?s/o:0,y=[],c=[];if(Object.keys(l).length>=1){for(const n in l){const p=A(n,String(l[n]),s,g,t);if(p!==void 0){y.push({size:p.size,screenMaxWidth:p.screenMaxWidth,media:`(max-width: ${p.screenMaxWidth}px)`});for(const b of a)c.push({width:p._cWidth*b,src:V(t,e,i,p,b)})}}ve(y)}else for(const n of a){const p=Object.keys(l)[0];let b=A(p,String(l[p]),s,g,t);b===void 0&&(b={size:"",screenMaxWidth:0,_cWidth:(h=i.modifiers)==null?void 0:h.width,_cHeight:(_=i.modifiers)==null?void 0:_.height}),c.push({width:n,src:V(t,e,i,b,n)})}ye(c);const x=c[c.length-1],S=y.length?y.map(n=>`${n.media?n.media+" ":""}${n.size}`).join(", "):void 0,E=S?"w":"x",W=c.map(n=>`${n.src} ${n.width}${E}`).join(", ");return{sizes:S,srcset:W,src:x==null?void 0:x.src}}function A(t,e,i,o,s){const l=s.options.screens&&s.options.screens[t]||parseInt(t),a=e.endsWith("vw");if(!a&&/^\d+$/.test(e)&&(e=e+"px"),!a&&!e.endsWith("px"))return;let g=parseInt(e);if(!l||!g)return;a&&(g=Math.round(g/100*l));const y=o?Math.round(g*o):i;return{size:e,screenMaxWidth:l,_cWidth:g,_cHeight:y}}function V(t,e,i,o,s){return t.$img(e,{...i.modifiers,width:o._cWidth?o._cWidth*s:void 0,height:o._cHeight?o._cHeight*s:void 0},i)}function ve(t){var i;t.sort((o,s)=>o.screenMaxWidth-s.screenMaxWidth);let e=null;for(let o=t.length-1;o>=0;o--){const s=t[o];s.media===e&&t.splice(o,1),e=s.media}for(let o=0;o<t.length;o++)t[o].media=((i=t[o+1])==null?void 0:i.media)||""}function ye(t){t.sort((i,o)=>i.width-o.width);let e=null;for(let i=t.length-1;i>=0;i--){const o=t[i];o.width===e&&t.splice(i,1),e=o.width}}const we=re({keyMap:{format:"f",fit:"fit",width:"w",height:"h",resize:"s",quality:"q",background:"b"},joinWith:"&",formatter:(t,e)=>H(t)+"_"+H(e)}),_e=(t,{modifiers:e={},baseURL:i}={},o)=>{e.width&&e.height&&(e.resize=`${e.width}x${e.height}`,delete e.width,delete e.height);const s=we(e)||"_";return i||(i=C(o.options.nuxt.baseURL,"/_ipx")),{url:C(i,s,Y(t))}},be=!0,xe=!0,Se=Object.freeze(Object.defineProperty({__proto__:null,getImage:_e,supportsAlias:xe,validateDomains:be},Symbol.toStringTag,{value:"Module"})),q={screens:{xs:320,sm:640,md:768,lg:1024,xl:1280,xxl:1536,"2xl":1536},presets:{},provider:"ipxStatic",domains:[],alias:{},densities:[1,2],format:["webp"]};q.providers={ipxStatic:{provider:Se,defaults:{}}};const ke=()=>{const t=Z(),e=K();return e.$img||e._img||(e._img=me({...q,nuxt:{baseURL:t.app.baseURL}}))},w={misc:"Sex and miscellaneous",oral:"Oral",public:"Public (Outside your house, somewhere people could be)",group:"Group sex",hotwife:"Hotwife",swinging:"Swinging"},u={monogamous:{name:"Monogamous",level:1},swinger:{name:"Swinger",level:2},single:{name:"Single",level:3},hotwife:{name:"Hotwife",level:4}},G={public:"Public",bi:"Bisexual",exposition:"Exposition"},m={easy:{name:"Easy",level:1},medium:{name:"Medium",level:2},hard:{name:"Hard",level:3},extreme:{name:"Extreme",level:4}},Te=[{name:"Gave a striptease",points:1,category:w.misc,mode:u.monogamous.level,difficulty:m.easy.level},{name:"Gave a boobjob",points:1,category:w.misc,mode:u.monogamous.level,difficulty:m.easy.level},{name:"Gave a handjob",points:1,category:w.misc,mode:u.monogamous.level,difficulty:m.easy.level},{name:"Gave a blowjob",points:1,category:w.oral,mode:u.monogamous.level,difficulty:m.easy.level},{name:"Licked balls",points:1,category:w.oral,mode:u.monogamous.level,difficulty:m.easy.level},{name:"Made a guy cum only from blowjob",points:2,category:w.oral,mode:u.monogamous.level,difficulty:m.easy.level},{name:"Gave a blowjob a day for one month",points:5,category:w.oral,mode:u.monogamous.level,difficulty:m.medium.level},{name:"Deepthroated a total time of 1 hour in a day",points:3,category:w.oral,mode:u.monogamous.level,difficulty:m.hard.level},{name:"Flashed boobs in public",points:2,category:w.public,mode:u.monogamous.level,difficulty:m.easy.level,tags:[G.public]},{name:"Got naked in public",points:3,category:w.public,mode:u.monogamous.level,difficulty:m.hard.level,tags:[G.public]},{name:"Fucked 2+ guys at the same time",points:2,category:w.group,mode:u.single.level,difficulty:m.medium.level},{name:"Got every hole filled",points:3,category:w.group,mode:u.single.level,difficulty:m.hard.level},{name:"Fucked 10+ guys at once",points:10,category:w.group,mode:u.single.level,difficulty:m.extreme.level},{name:"Went to gloryhole with husband",points:2,category:w.hotwife,mode:u.hotwife.level,difficulty:m.easy.level},{name:"Gave handjob to another man",points:2,category:w.swinging,mode:u.swinger.level,difficulty:m.easy.level}],Me={class:"home"},Ee={class:"wrapper"},Ie=r("h1",null,"Ultimate Slut Checklist",-1),$e={class:"row"},We=r("label",{for:""},"Mode",-1),je=["value"],Oe=["value"],Ue=["value"],Pe=["value"],Ce={class:"row"},Ge=r("label",{for:""},"Difficulty",-1),ze=["value"],He=["value"],De=["value"],Ne=["value"],Fe=r("legend",null,"Type of tasks to exclude",-1),Le=["value","id"],Re=["for"],Ae={class:"masonryContainer"},Ve={class:"titleContainer"},Je={class:"amount"},Be={class:"points"},qe=["id","value"],Qe=["for"],Ze=ee({__name:"index",setup(t){var I;ne({title:"Ultimate slut checklist",meta:[{name:"description",content:"Ultimate slut checklist is THE checklist for everything sexual. Find out how much of a slut you are!"}]});const e=ke();te(()=>({backgroundImage:`url('${e("/images/myImage.webp",{width:1920})}')`}));const i=f=>{var h,_;return f==null?(h=E.value)==null?void 0:h.filter(n=>n.mode<=c.mode&&n.difficulty<=c.difficulty&&c.tagsToExclude.every(p=>{var b;return!((b=n.tags)!=null&&b.includes(p))})):(_=E.value)==null?void 0:_.filter(n=>n.category==f&&n.mode<=c.mode&&n.difficulty<=c.difficulty&&c.tagsToExclude.every(p=>{var b;return!((b=n.tags)!=null&&b.includes(p))}))},o=f=>i(f).filter(h=>k.value.includes(h.name)).length,s=f=>{let h=0;return i(f).filter(_=>k.value.includes(_.name)).forEach(_=>{h+=_.points}),h},l=f=>{let h=0;return i(f).forEach(_=>{h+=_.points}),h},a=()=>{const f=localStorage.getItem("options");return f?JSON.parse(f):null},g=()=>{const f=localStorage.getItem("checkedTasks");return f?JSON.parse(f):null},y={mode:u.hotwife.level,difficulty:m.extreme.level,tagsToExclude:[]},c=oe(a()||y),x=$(((I=a())==null?void 0:I.tagsToExclude)||[]),S=$(null),E=$([]),W=$(null);S.value=w,E.value=Te,W.value=G;const k=$(g()||[]);return D([c,x],([f,h])=>{c.tagsToExclude=x.value,localStorage.setItem("options",JSON.stringify(f))}),D(k,f=>{localStorage.setItem("checkedTasks",JSON.stringify(f))}),(f,h)=>{var _;return M(),T("div",Me,[r("div",Ee,[Ie,r("div",$e,[We,j(r("select",{name:"",id:"","onUpdate:modelValue":h[0]||(h[0]=n=>d(c).mode=n)},[r("option",{value:d(u).monogamous.level},v(d(u).monogamous.name),9,je),r("option",{value:d(u).swinger.level},v(d(u).swinger.name),9,Oe),r("option",{value:d(u).single.level},v(d(u).single.name),9,Ue),r("option",{value:d(u).hotwife.level},v(d(u).hotwife.name),9,Pe)],512),[[N,d(c).mode]])]),r("div",Ce,[Ge,j(r("select",{name:"",id:"","onUpdate:modelValue":h[1]||(h[1]=n=>d(c).difficulty=n)},[r("option",{value:d(m).easy.level},v(d(m).easy.name),9,ze),r("option",{value:d(m).medium.level},v(d(m).medium.name),9,He),r("option",{value:d(m).hard.level},v(d(m).hard.name),9,De),r("option",{value:d(m).extreme.level},v(d(m).extreme.name),9,Ne)],512),[[N,d(c).difficulty]])]),r("fieldset",null,[Fe,(M(!0),T(O,null,P(d(W),n=>(M(),T("div",null,[j(r("input",{type:"checkbox",value:n,"onUpdate:modelValue":h[2]||(h[2]=p=>L(x)?x.value=p:null),id:n},null,8,Le),[[F,d(x)]]),r("label",{for:n},v(n),9,Re)]))),256))]),r("h2",null,"Tasks completed: "+v(o())+" / "+v((_=i())==null?void 0:_.length),1),r("h2",null,"Points: "+v(s())+" / "+v(l()),1),r("div",Ae,[(M(!0),T(O,null,P(d(S),n=>(M(),T(O,null,[i(n).length>0?(M(),T("div",{class:ie({completed:o(n)>=i(n).length}),key:n},[r("div",Ve,[r("h2",null,v(n),1),r("div",Je,v(o(n))+" / "+v(i(n).length),1),r("div",Be," Points: "+v(s(n))+" / "+v(l(n)),1)]),(M(!0),T(O,null,P(i(n),p=>(M(),T("div",{key:p.name},[j(r("input",{type:"checkbox","onUpdate:modelValue":h[3]||(h[3]=b=>L(k)?k.value=b:null),id:p.name,value:p.name},null,8,qe),[[F,d(k)]]),r("label",{for:p.name},v(p.name),9,Qe)]))),128))],2)):se("",!0)],64))),256))])])])}}});export{Ze as default};