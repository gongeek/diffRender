!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.DiffRender=t()}(this,function(){function e(){}function t(e){var t=Object.create(null);return function(n){var r=t[n];return r||(t[n]=e(n))}}function n(e){return N.innerHTML=e,N.textContent}function r(e,t,n,r,o){return t&&t.attr&&t.attr.hasOwnProperty("bx-name")&&(t.hook=t.hook||{},t.hook.insert=function(){},t.hook.update=function(){},t.hook.create=function(){}),R(e,t,n,r,o)}function o(e){return document.createElement(e)}function i(e,t){return document.createElementNS(e,t)}function a(e){return document.createTextNode(e)}function s(e,t,n){e.insertBefore(t,n)}function l(e,t){e.removeChild(t)}function d(e,t){e.appendChild(t)}function c(e){return e.parentElement}function f(e){return e.nextSibling}function u(e){return e.tagName}function h(e,t){e.textContent=t}function p(e){return function(t,n,r){DiffRender&&DiffRender.domlog&&console.log(t.outerHTML||""," "+e.name+" ",n||"",r||""),e(t,n,r)}}function m(e){return void 0===e}function g(e){return void 0!==e}function v(e,t){return e.key===t.key&&e.sel===t.sel}function x(e,t,n){var r,o,i={};for(r=t;r<=n;++r)o=e[r].key,g(o)&&(i[o]=r);return i}function T(e,t){function n(e){var n=e.id?"#"+e.id:"",r=e.className?"."+e.className.split(" ").join("."):"";return R(t.tagName(e).toLowerCase()+n+r,{},[],void 0,e)}function r(e,n){return function(){if(0===--n){var r=t.parentNode(e);t.removeChild(r,e)}}}function o(e,n){var r,i=e.data;g(i)&&g(r=i.hook)&&g(r=r.init)&&(r(e),i=e.data);var a,s=e.children,l=e.sel;if(g(l)){var d=l.indexOf("#"),c=l.indexOf(".",d),f=d>0?d:l.length,h=c>0?c:l.length,p=d!==-1||c!==-1?l.slice(0,Math.min(f,h)):l;if(a=e.elm=g(i)&&g(r=i.ns)?t.createElementNS(r,p):t.createElement(p),f<h&&(a.id=l.slice(f+1,h)),c>0&&(a.className=l.slice(h+1).replace(/\./g," ")),C.array(s))for(r=0;r<s.length;++r)t.appendChild(a,o(s[r],n));else C.primitive(e.text)&&t.appendChild(a,t.createTextNode(e.text));for(r=0;r<u.create.length;++r)u.create[r](w,e);e.data&&(r=e.data.hook),g(r)&&(r.create&&r.create(w,e),r.insert&&n.push(e))}else a=e.elm=t.createTextNode(e.text);return e.elm}function i(e,n,r,i,a,s){for(;i<=a;++i)t.insertBefore(e,o(r[i],s),n)}function a(e){var t,n,r=e.data;if(g(r)){for(g(t=r.hook)&&g(t=t.destroy)&&t(e),t=0;t<u.destroy.length;++t)u.destroy[t](e);if(g(t=e.children))for(n=0;n<e.children.length;++n)a(e.children[n])}}function s(e,n,o,i){for(;o<=i;++o){var s,l,d,c=n[o];if(g(c))if(g(c.sel)){for(a(c),l=u.remove.length+1,d=r(c.elm,l),s=0;s<u.remove.length;++s)u.remove[s](c,d);g(s=c.data)&&g(s=s.hook)&&g(s=s.remove)?s(c,d):d()}else t.removeChild(e,c.elm)}}function l(e,n,r,a){for(var l,c,f,u,h=0,p=0,g=n.length-1,T=n[0],k=n[g],y=r.length-1,b=r[0],R=r[y];h<=g&&p<=y;)m(T)?T=n[++h]:m(k)?k=n[--g]:v(T,b)?(d(T,b,a),T=n[++h],b=r[++p]):v(k,R)?(d(k,R,a),k=n[--g],R=r[--y]):v(T,R)?(d(T,R,a),t.insertBefore(e,T.elm,t.nextSibling(k.elm)),T=n[++h],R=r[--y]):v(k,b)?(d(k,b,a),t.insertBefore(e,k.elm,T.elm),k=n[--g],b=r[++p]):(m(l)&&(l=x(n,h,g)),c=l[b.key],m(c)?(t.insertBefore(e,o(b,a),T.elm),b=r[++p]):(f=n[c],d(f,b,a),n[c]=void 0,t.insertBefore(e,f.elm,T.elm),b=r[++p]));h>g?(u=m(r[y+1])?null:r[y+1].elm,i(e,u,r,p,y,a)):p>y&&s(e,n,h,g)}function d(e,n,r){var a,d;g(a=n.data)&&g(d=a.hook)&&g(a=d.prepatch)&&a(e,n);var c=n.elm=e.elm,f=e.children,h=n.children;if(e!==n){if(!v(e,n)){var p=t.parentNode(e.elm);return c=o(n,r),t.insertBefore(p,c,e.elm),void s(p,[e],0,0)}if(g(n.data)){for(a=0;a<u.update.length;++a)u.update[a](e,n);a=n.data.hook,g(a)&&g(a=a.update)&&a(e,n)}m(n.text)?g(f)&&g(h)?f!==h&&l(c,f,h,r):g(h)?(g(e.text)&&t.setTextContent(c,""),i(c,null,h,0,h.length-1,r)):g(f)?s(c,f,0,f.length-1):g(e.text)&&t.setTextContent(c,""):e.text!==n.text&&t.setTextContent(c,n.text),g(d)&&g(a=d.postpatch)&&a(e,n)}}var c,f,u={};for(m(t)&&(t=E),c=0;c<S.length;++c)for(u[S[c]]=[],f=0;f<e.length;++f)void 0!==e[f][S[c]]&&u[S[c]].push(e[f][S[c]]);return function(e,r){var i,a,l,c=[];for(i=0;i<u.pre.length;++i)u.pre[i]();for(m(e.sel)&&(e=n(e)),v(e,r)?d(e,r,c):(a=e.elm,l=t.parentNode(a),o(r,c),null!==l&&(t.insertBefore(l,r.elm,t.nextSibling(a)),s(l,[e],0,0))),i=0;i<c.length;++i)c[i].data.hook.insert(c[i]);for(i=0;i<u.post.length;++i)u.post[i]();return DiffRender&&DiffRender.timelog&&console.timeEnd("patchCost"),r}}function k(e,t){var n,r,o,i=t.elm,a=e.data&&e.data.attr,s=t.data&&t.data.attr;if(a||s){a=a||{},s=s||{};for(n in s)r=s[n],o=a[n],o!==r&&(!r&&M[n]?i.removeAttribute(n):i.setAttribute(n,r));for(n in a)n in s||i.removeAttribute(n)}}function y(e,t){var n,r,o;return q.timelog&&console.time("patchCost"),e.tagName&&(n=e.id?"#"+e.id:"",r=e.className?"."+e.className.split(" ").join("."):"",o=e.tagName.toLowerCase()+n+r,e.innerHTML=""),!o&&e.isRoot&&(o=e.sel),"string"==typeof e&&(e=j.parse(e,o)),"string"==typeof t&&(t=j.parse(t,o)),H(e,t)}var b,R=function(e,t,n,r,o){var i=void 0===t?void 0:t.key;return{sel:e,data:t,children:n,text:r,elm:o,key:i}},N=document.createElement("div");b=t(n),e.prototype={handler:null,startTagRe:/^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m,endTagRe:/^<\/([^>\s]+)[^>]*>/m,attrRe:/([^=\/\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm,stack:[],parse:function(e,t){DiffRender&&DiffRender.timelog&&console.time("parseHTMLCost");var n={sel:t||"div",children:[],isRoot:!0};this.stack=[n];for(var r,o,i,a,s=!1,l=this;e.length>0;)"<!--"==e.substring(0,4)?(a=e.indexOf("-->"),s=a==-1):"</"==e.substring(0,2)?this.endTagRe.test(e)?(r=RegExp.leftContext,o=RegExp.lastMatch,i=RegExp.rightContext,o.replace(this.endTagRe,function(){return l.parseEndTag.apply(l,arguments)}),e=i,s=!1):s=!0:"<"==e.charAt(0)&&(this.startTagRe.test(e)?(r=RegExp.leftContext,o=RegExp.lastMatch,i=RegExp.rightContext,o.replace(this.startTagRe,function(){return l.parseStartTag.apply(l,arguments)}),e=i,s=!1):s=!0),s&&(a=e.indexOf("<"),a==-1?(this.parseText(e),e=""):(this.parseText(e.substring(0,a)),e=e.substring(a))),s=!0;if(0===n.children.length)throw new Error("HTML不标准,请检查标签是否闭合!");return DiffRender&&DiffRender.timelog&&console.timeEnd("parseHTMLCost"),n},setStackTopNode:function(e){var t=this.stack[this.stack.length-1];if(!t)throw new Error("HTML不标准,请检查标签是否闭合!");e(t)},parseText:function(e){this.setStackTopNode(function(t){return t.children?void t.children.push({sel:"span",text:e}):void(t.text=b(e))})},parseStartTag:function(e,t,n){var o=this.parseAttributes(t,n);return"/>"===e.substr(-2)||"input"===t||"br"===t||"img"===t?void this.setStackTopNode(function(e){e.children=e.children||[],e.text&&(e.children.push(r("span",void 0,void 0,e.text)),delete e.text),e.children.push(r(t,{attr:o}))}):void this.stack.push(r(t,{attr:o}))},parseEndTag:function(e,t){var n=this.stack.pop();this.setStackTopNode(function(e){e.children=e.children||[],e.text&&(e.children.push(r("span",void 0,void 0,e.text)),delete e.text),e.children.push(n)})},parseAttributes:function(e,t){var n=this,r={};return t.replace(this.attrRe,function(t,o,i,a,s,l,d){var c=n.parseAttribute(e,t,o,i,a,s,l,d);r[c.name]=c.value}),r},parseAttribute:function(e,t,n){var r="";arguments[7]?r=arguments[8]:arguments[5]?r=arguments[6]:arguments[3]&&(r=arguments[4]);var o=!r&&!arguments[3];return{name:n,value:!!o||r}}};for(var C={array:Array.isArray,primitive:function(e){return"string"==typeof e||"number"==typeof e}},E={createElement:o,createElementNS:i,createTextNode:a,appendChild:p(d),removeChild:p(l),insertBefore:p(s),parentNode:c,nextSibling:f,tagName:u,setTextContent:p(h)},w=R("",{},[],void 0,void 0),S=["create","update","remove","destroy","pre","post"],A={init:T},D=["allowfullscreen","async","autofocus","autoplay","checked","compact","controls","declare","default","defaultchecked","defaultmuted","defaultselected","defer","disabled","draggable","enabled","formnovalidate","hidden","indeterminate","inert","ismap","itemscope","loop","multiple","muted","nohref","noresize","noshade","novalidate","nowrap","open","pauseonexit","readonly","required","reversed","scoped","seamless","selected","sortable","spellcheck","translate","truespeed","typemustmatch","visible"],M={},B=0,L=D.length;B<L;B++)M[D[B]]=!0;var O={create:k,update:k},H=A.init([O]),j=new e,q={};return q.domlog=window.location.href.indexOf("domlog")!==-1,q.timelog=window.location.href.indexOf("timelog")!==-1,q.patch=y,window.DiffRender=q,q});