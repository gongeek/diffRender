!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.DiffRender=t()}(this,function(){function e(){}function t(e){return document.createElement(e)}function n(e,t){return document.createElementNS(e,t)}function r(e){return document.createTextNode(e)}function i(e,t,n){e.insertBefore(t,n)}function o(e,t){e.removeChild(t)}function a(e,t){e.appendChild(t)}function s(e){return e.parentElement}function l(e){return e.nextSibling}function d(e){return e.tagName}function c(e,t){e.textContent=t}function f(e){return function(t,n,r){DiffRender&&DiffRender.domlog&&console.log(t.outerHTML||""," "+e.name+" ",n||"",r||""),e(t,n,r)}}function u(e){return void 0===e}function h(e){return void 0!==e}function p(e,t){return e.key===t.key&&e.sel===t.sel}function m(e,t,n){var r,i,o={};for(r=t;r<=n;++r)i=e[r].key,h(i)&&(o[i]=r);return o}function g(e,t){function n(e){var n=e.id?"#"+e.id:"",r=e.className?"."+e.className.split(" ").join("."):"";return y(t.tagName(e).toLowerCase()+n+r,{},[],void 0,e)}function r(e,n){return function(){if(0===--n){var r=t.parentNode(e);t.removeChild(r,e)}}}function i(e,n){var r,o=e.data;h(o)&&h(r=o.hook)&&h(r=r.init)&&(r(e),o=e.data);var a,s=e.children,l=e.sel;if(h(l)){var d=l.indexOf("#"),c=l.indexOf(".",d),f=d>0?d:l.length,u=c>0?c:l.length,p=d!==-1||c!==-1?l.slice(0,Math.min(f,u)):l;if(a=e.elm=h(o)&&h(r=o.ns)?t.createElementNS(r,p):t.createElement(p),f<u&&(a.id=l.slice(f+1,u)),c>0&&(a.className=l.slice(u+1).replace(/\./g," ")),k.array(s))for(r=0;r<s.length;++r)t.appendChild(a,i(s[r],n));else k.primitive(e.text)&&t.appendChild(a,t.createTextNode(e.text));for(r=0;r<g.create.length;++r)g.create[r](N,e);e.data&&(r=e.data.hook),h(r)&&(r.create&&r.create(N,e),r.insert&&n.push(e))}else a=e.elm=t.createTextNode(e.text);return e.elm}function o(e,n,r,o,a,s){for(;o<=a;++o)t.insertBefore(e,i(r[o],s),n)}function a(e){var t,n,r=e.data;if(h(r)){for(h(t=r.hook)&&h(t=t.destroy)&&t(e),t=0;t<g.destroy.length;++t)g.destroy[t](e);if(h(t=e.children))for(n=0;n<e.children.length;++n)a(e.children[n])}}function s(e,n,i,o){for(;i<=o;++i){var s,l,d,c=n[i];if(h(c))if(h(c.sel)){for(a(c),l=g.remove.length+1,d=r(c.elm,l),s=0;s<g.remove.length;++s)g.remove[s](c,d);h(s=c.data)&&h(s=s.hook)&&h(s=s.remove)?s(c,d):d()}else t.removeChild(e,c.elm)}}function l(e,n,r,a){for(var l,c,f,h,g=0,v=0,x=n.length-1,y=n[0],k=n[x],T=r.length-1,N=r[0],R=r[T];g<=x&&v<=T;)u(y)?y=n[++g]:u(k)?k=n[--x]:p(y,N)?(d(y,N,a),y=n[++g],N=r[++v]):p(k,R)?(d(k,R,a),k=n[--x],R=r[--T]):p(y,R)?(d(y,R,a),t.insertBefore(e,y.elm,t.nextSibling(k.elm)),y=n[++g],R=r[--T]):p(k,N)?(d(k,N,a),t.insertBefore(e,k.elm,y.elm),k=n[--x],N=r[++v]):(u(l)&&(l=m(n,g,x)),c=l[N.key],u(c)?(t.insertBefore(e,i(N,a),y.elm),N=r[++v]):(f=n[c],d(f,N,a),n[c]=void 0,t.insertBefore(e,f.elm,y.elm),N=r[++v]));g>x?(h=u(r[T+1])?null:r[T+1].elm,o(e,h,r,v,T,a)):v>T&&s(e,n,g,x)}function d(e,n,r){var a,d;h(a=n.data)&&h(d=a.hook)&&h(a=d.prepatch)&&a(e,n);var c=n.elm=e.elm,f=e.children,m=n.children;if(e!==n){if(!p(e,n)){var v=t.parentNode(e.elm);return c=i(n,r),t.insertBefore(v,c,e.elm),void s(v,[e],0,0)}if(h(n.data)){for(a=0;a<g.update.length;++a)g.update[a](e,n);a=n.data.hook,h(a)&&h(a=a.update)&&a(e,n)}u(n.text)?h(f)&&h(m)?f!==m&&l(c,f,m,r):h(m)?(h(e.text)&&t.setTextContent(c,""),o(c,null,m,0,m.length-1,r)):h(f)?s(c,f,0,f.length-1):h(e.text)&&t.setTextContent(c,""):e.text!==n.text&&t.setTextContent(c,n.text),h(d)&&h(a=d.postpatch)&&a(e,n)}}var c,f,g={};for(u(t)&&(t=T),c=0;c<R.length;++c)for(g[R[c]]=[],f=0;f<e.length;++f)void 0!==e[f][R[c]]&&g[R[c]].push(e[f][R[c]]);return function(e,r){var o,a,l,c=[];for(o=0;o<g.pre.length;++o)g.pre[o]();for(u(e.sel)&&(e=n(e)),p(e,r)?d(e,r,c):(a=e.elm,l=t.parentNode(a),i(r,c),null!==l&&(t.insertBefore(l,r.elm,t.nextSibling(a)),s(l,[e],0,0))),o=0;o<c.length;++o)c[o].data.hook.insert(c[o]);for(o=0;o<g.post.length;++o)g.post[o]();return DiffRender&&DiffRender.timelog&&console.timeEnd("patchCost"),r}}function v(e,t){var n,r,i,o=t.elm,a=e.data.attr,s=t.data.attr;if(a||s){a=a||{},s=s||{};for(n in s)r=s[n],i=a[n],i!==r&&(!r&&E[n]?o.removeAttribute(n):o.setAttribute(n,r));for(n in a)n in s||o.removeAttribute(n)}}function x(e,t){var n,r,i;return M.timelog&&console.time("patchCost"),e.tagName&&(n=e.id?"#"+e.id:"",r=e.className?"."+e.className.split(" ").join("."):"",i=e.tagName.toLowerCase()+n+r),!i&&e.isRoot&&(i=e.sel),"string"==typeof e&&(e=D.parse(e,i)),"string"==typeof t&&(t=D.parse(t,i)),B(e,t)}e.prototype={handler:null,startTagRe:/^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m,endTagRe:/^<\/([^>\s]+)[^>]*>/m,attrRe:/([^=\/\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm,stack:[],parse:function(e,t){DiffRender&&DiffRender.timelog&&console.time("parseHTMLCost");var n={sel:t||"div",children:[],isRoot:!0};this.stack=[n];for(var r,i,o,a,s=!1,l=this;e.length>0;)"<!--"==e.substring(0,4)?(a=e.indexOf("-->"),s=a==-1):"</"==e.substring(0,2)?this.endTagRe.test(e)?(r=RegExp.leftContext,i=RegExp.lastMatch,o=RegExp.rightContext,i.replace(this.endTagRe,function(){return l.parseEndTag.apply(l,arguments)}),e=o,s=!1):s=!0:"<"==e.charAt(0)&&(this.startTagRe.test(e)?(r=RegExp.leftContext,i=RegExp.lastMatch,o=RegExp.rightContext,i.replace(this.startTagRe,function(){return l.parseStartTag.apply(l,arguments)}),e=o,s=!1):s=!0),s&&(a=e.indexOf("<"),a==-1?(this.parseText(e),e=""):(this.parseText(e.substring(0,a)),e=e.substring(a))),s=!0;if(0===n.children.length)throw new Error("HTML不标准,请检查标签是否闭合!");return DiffRender&&DiffRender.timelog&&console.timeEnd("parseHTMLCost"),n},setStackTopNode:function(e){var t=this.stack[this.stack.length-1];if(!t)throw new Error("HTML不标准,请检查标签是否闭合!");e(t)},parseText:function(e){this.setStackTopNode(function(t){return t.children?void t.children.push({sel:"span",text:e}):void(t.text=e)})},parseStartTag:function(e,t,n){var r=this.parseAttributes(t,n);return"/>"===e.substr(-2)?void this.setStackTopNode(function(e){e.children=e.children||[],e.text&&(e.children.push({sel:"span",text:e.text}),delete e.text),e.children.push({sel:t,data:{attr:r},key:r.key||""})}):void this.stack.push({sel:t,data:{attr:r},key:r.key||""})},parseEndTag:function(e,t){var n=this.stack.pop();this.setStackTopNode(function(e){e.children=e.children||[],e.text&&(e.children.push({sel:"span",text:e.text}),delete e.text),e.children.push(n)})},parseAttributes:function(e,t){var n=this,r={};return t.replace(this.attrRe,function(t,i,o,a,s,l,d){var c=n.parseAttribute(e,t,i,o,a,s,l,d);r[c.name]=c.value}),r},parseAttribute:function(e,t,n){var r="";arguments[7]?r=arguments[8]:arguments[5]?r=arguments[6]:arguments[3]&&(r=arguments[4]);var i=!r&&!arguments[3];return{name:n,value:!!i||r}}};for(var y=function(e,t,n,r,i){var o=void 0===t?void 0:t.key;return{sel:e,data:t,children:n,text:r,elm:i,key:o}},k={array:Array.isArray,primitive:function(e){return"string"==typeof e||"number"==typeof e}},T={createElement:t,createElementNS:n,createTextNode:r,appendChild:f(a),removeChild:f(o),insertBefore:f(i),parentNode:s,nextSibling:l,tagName:d,setTextContent:f(c)},N=y("",{},[],void 0,void 0),R=["create","update","remove","destroy","pre","post"],b={init:g},C=["allowfullscreen","async","autofocus","autoplay","checked","compact","controls","declare","default","defaultchecked","defaultmuted","defaultselected","defer","disabled","draggable","enabled","formnovalidate","hidden","indeterminate","inert","ismap","itemscope","loop","multiple","muted","nohref","noresize","noshade","novalidate","nowrap","open","pauseonexit","readonly","required","reversed","scoped","seamless","selected","sortable","spellcheck","translate","truespeed","typemustmatch","visible"],E={},w=0,S=C.length;w<S;w++)E[C[w]]=!0;var A={create:v,update:v},B=b.init([A]),D=new e,M={};return M.domlog=window.location.href.indexOf("domlog")!==-1,M.timelog=window.location.href.indexOf("timelog")!==-1,M.patch=x,M});