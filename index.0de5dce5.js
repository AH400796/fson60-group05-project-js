/*!
 * TOAST UI Pagination
 * @version 3.4.1
 * @author NHN FE Development Team <dl_javascript@nhn.com>
 * @license MIT
 */!function(A,g){b=g()}(window,(function(){return function(A){var g={};function i(C){if(g[C])return g[C].exports;var B=g[C]={i:C,l:!1,exports:{}};return A[C].call(B.exports,B,B.exports,i),B.l=!0,B.exports}return i.m=A,i.c=g,i.d=function(A,g,C){i.o(A,g)||Object.defineProperty(A,g,{enumerable:!0,get:C})},i.r=function(A){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})},i.t=function(A,g){if(1&g&&(A=i(A)),8&g)return A;if(4&g&&"object"==typeof A&&A&&A.__esModule)return A;var C=Object.create(null);if(i.r(C),Object.defineProperty(C,"default",{enumerable:!0,value:A}),2&g&&"string"!=typeof A)for(var B in A)i.d(C,B,function(g){return A[g]}.bind(null,B));return C},i.n=function(A){var g=A&&A.__esModule?function(){return A.default}:function(){return A};return i.d(g,"a",g),g},i.o=function(A,g){return Object.prototype.hasOwnProperty.call(A,g)},i.p="dist",i(i.s=10)}([function(A,g,i){A.exports=function(A,g){var i,C,B,I,E=Object.prototype.hasOwnProperty;for(B=1,I=arguments.length;B<I;B+=1)for(C in i=arguments[B])E.call(i,C)&&(A[C]=i[C]);return A}},function(A,g,i){A.exports=function(A){return void 0===A}},function(A,g,i){A.exports=function(A){return A instanceof Array}},function(A,g,i){var C=i(2),B=i(17),I=i(6);A.exports=function(A,g,i){C(A)?B(A,g,i):I(A,g,i)}},function(A,g,i){A.exports=function(A){return"string"==typeof A||A instanceof String}},function(A,g,i){A.exports=function(A){return A instanceof Function}},function(A,g,i){A.exports=function(A,g,i){var C;for(C in i=i||null,A)if(A.hasOwnProperty(C)&&!1===g.call(i,A[C],C,A))break}},function(A,g,i){var C=i(18),B=i(0);A.exports=function(A,g){var i;return g||(g=A,A=null),i=g.init||function(){},A&&C(i,A),g.hasOwnProperty("static")&&(B(i,g.static),delete g.static),B(i.prototype,g),i}},function(A,g,i){var C=i(2);A.exports=function(A,g,i){var B,I;if(i=i||0,!C(g))return-1;if(Array.prototype.indexOf)return Array.prototype.indexOf.call(g,A,i);for(I=g.length,B=i;i>=0&&B<I;B+=1)if(g[B]===A)return B;return-1}},function(A,g,i){var C=i(29),B=i(30),I=i(5),E={capitalizeFirstLetter:function(A){return A.substring(0,1).toUpperCase()+A.substring(1,A.length)},isContained:function(A,g){return!!g&&(A===g||g.contains(A))},createElementByTemplate:function(A,g){var i=document.createElement("div"),B=I(A)?A(g):C(A,g);return i.innerHTML=B,i.firstChild},bind:function(A,g){var i,C=Array.prototype.slice;return A.bind?A.bind.apply(A,C.call(arguments,1)):(i=C.call(arguments,2),function(){return A.apply(g,i.length?i.concat(C.call(arguments)):arguments)})},sendHostName:function(){B("pagination","UA-129987462-1")}};A.exports=E},function(A,g,i){i(11),A.exports=i(12)},function(A,g,i){},function(A,g,i){var C=i(13),B=i(7),I=i(0),E=i(1),o=i(20),Q=i(9),t={totalItems:10,itemsPerPage:10,visiblePages:10,page:1,centerAlign:!1,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",usageStatistics:!0},e=B({init:function(A,g){this._options=I({},t,g),this._currentPage=0,this._view=new o(A,this._options,Q.bind(this._onClickHandler,this)),this._paginate(),this._options.usageStatistics&&Q.sendHostName()},_setCurrentPage:function(A){this._currentPage=A||this._options.page},_getLastPage:function(){var A=Math.ceil(this._options.totalItems/this._options.itemsPerPage);return A||1},_getPageIndex:function(A){var g;return this._options.centerAlign?(g=A-Math.floor(this._options.visiblePages/2),g=Math.max(g,1),g=Math.min(g,this._getLastPage()-this._options.visiblePages+1)):Math.ceil(A/this._options.visiblePages)},_getRelativePage:function(A){var g="prev"===A,i=this.getCurrentPage();return g?i-1:i+1},_getMorePageIndex:function(A){var g=this._getPageIndex(this.getCurrentPage()),i=this._options.visiblePages,C="prev"===A;return this._options.centerAlign?C?g-1:g+i:C?(g-1)*i:g*i+1},_convertToValidPage:function(A){var g=this._getLastPage();return A=Math.max(A,1),A=Math.min(A,g)},_paginate:function(A){var g=this._makeViewData(A||this._options.page);this._setCurrentPage(A),this._view.update(g)},_makeViewData:function(A){var g={},i=this._getLastPage(),C=this._getPageIndex(A),B=this._getPageIndex(i),I=this._getEdge(A);return g.leftPageNumber=I.left,g.rightPageNumber=I.right,g.prevMore=C>1,g.nextMore=C<B,g.page=A,g.currentPageIndex=A,g.lastPage=i,g.lastPageListIndex=i,g},_getEdge:function(A){var g,i,C,B=this._getLastPage(),I=this._options.visiblePages,E=this._getPageIndex(A);return this._options.centerAlign?(C=Math.floor(I/2),(i=(g=Math.max(A-C,1))+I-1)>B&&(g=Math.max(B-I+1,1),i=B)):(g=(E-1)*I+1,i=E*I,i=Math.min(i,B)),{left:g,right:i}},_onClickHandler:function(A,g){switch(A){case"first":g=1;break;case"prev":g=this._getRelativePage("prev");break;case"next":g=this._getRelativePage("next");break;case"prevMore":g=this._getMorePageIndex("prev");break;case"nextMore":g=this._getMorePageIndex("next");break;case"last":g=this._getLastPage();break;default:if(!g)return}this.movePageTo(g)},reset:function(A){E(A)&&(A=this._options.totalItems),this._options.totalItems=A,this._paginate(1)},movePageTo:function(A){A=this._convertToValidPage(A),this.invoke("beforeMove",{page:A})&&(this._paginate(A),this.fire("afterMove",{page:A}))},setTotalItems:function(A){this._options.totalItems=A},setItemsPerPage:function(A){this._options.itemsPerPage=A},getCurrentPage:function(){return this._currentPage||this._options.page}});C.mixin(e),A.exports=e},function(A,g,i){var C=i(0),B=i(14),I=i(4),E=i(16),o=i(2),Q=i(5),t=i(3),e=/\s+/g;function a(){this.events=null,this.contexts=null}a.mixin=function(A){C(A.prototype,a.prototype)},a.prototype._getHandlerItem=function(A,g){var i={handler:A};return g&&(i.context=g),i},a.prototype._safeEvent=function(A){var g,i=this.events;return i||(i=this.events={}),A&&((g=i[A])||(g=[],i[A]=g),i=g),i},a.prototype._safeContext=function(){var A=this.contexts;return A||(A=this.contexts=[]),A},a.prototype._indexOfContext=function(A){for(var g=this._safeContext(),i=0;g[i];){if(A===g[i][0])return i;i+=1}return-1},a.prototype._memorizeContext=function(A){var g,i;B(A)&&(g=this._safeContext(),(i=this._indexOfContext(A))>-1?g[i][1]+=1:g.push([A,1]))},a.prototype._forgetContext=function(A){var g,i;B(A)&&(g=this._safeContext(),(i=this._indexOfContext(A))>-1&&(g[i][1]-=1,g[i][1]<=0&&g.splice(i,1)))},a.prototype._bindEvent=function(A,g,i){var C=this._safeEvent(A);this._memorizeContext(i),C.push(this._getHandlerItem(g,i))},a.prototype.on=function(A,g,i){var C=this;I(A)?(A=A.split(e),t(A,(function(A){C._bindEvent(A,g,i)}))):E(A)&&(i=g,t(A,(function(A,g){C.on(g,A,i)})))},a.prototype.once=function(A,g,i){var C=this;if(E(A))return i=g,void t(A,(function(A,g){C.once(g,A,i)}));this.on(A,(function B(){g.apply(i,arguments),C.off(A,B,i)}),i)},a.prototype._spliceMatches=function(A,g){var i,C=0;if(o(A))for(i=A.length;C<i;C+=1)!0===g(A[C])&&(A.splice(C,1),i-=1,C-=1)},a.prototype._matchHandler=function(A){var g=this;return function(i){var C=A===i.handler;return C&&g._forgetContext(i.context),C}},a.prototype._matchContext=function(A){var g=this;return function(i){var C=A===i.context;return C&&g._forgetContext(i.context),C}},a.prototype._matchHandlerAndContext=function(A,g){var i=this;return function(C){var B=A===C.handler,I=g===C.context,E=B&&I;return E&&i._forgetContext(C.context),E}},a.prototype._offByEventName=function(A,g){var i=this,C=Q(g),B=i._matchHandler(g);A=A.split(e),t(A,(function(A){var g=i._safeEvent(A);C?i._spliceMatches(g,B):(t(g,(function(A){i._forgetContext(A.context)})),i.events[A]=[])}))},a.prototype._offByHandler=function(A){var g=this,i=this._matchHandler(A);t(this._safeEvent(),(function(A){g._spliceMatches(A,i)}))},a.prototype._offByObject=function(A,g){var i,C=this;this._indexOfContext(A)<0?t(A,(function(A,g){C.off(g,A)})):I(g)?(i=this._matchContext(A),C._spliceMatches(this._safeEvent(g),i)):Q(g)?(i=this._matchHandlerAndContext(g,A),t(this._safeEvent(),(function(A){C._spliceMatches(A,i)}))):(i=this._matchContext(A),t(this._safeEvent(),(function(A){C._spliceMatches(A,i)})))},a.prototype.off=function(A,g){I(A)?this._offByEventName(A,g):arguments.length?Q(A)?this._offByHandler(A):E(A)&&this._offByObject(A,g):(this.events={},this.contexts=[])},a.prototype.fire=function(A){this.invoke.apply(this,arguments)},a.prototype.invoke=function(A){var g,i,C,B;if(!this.hasListener(A))return!0;for(g=this._safeEvent(A),i=Array.prototype.slice.call(arguments,1),C=0;g[C];){if(!1===(B=g[C]).handler.apply(B.context,i))return!1;C+=1}return!0},a.prototype.hasListener=function(A){return this.getListenerLength(A)>0},a.prototype.getListenerLength=function(A){return this._safeEvent(A).length},A.exports=a},function(A,g,i){var C=i(1),B=i(15);A.exports=function(A){return!C(A)&&!B(A)}},function(A,g,i){A.exports=function(A){return null===A}},function(A,g,i){A.exports=function(A){return A===Object(A)}},function(A,g,i){A.exports=function(A,g,i){var C=0,B=A.length;for(i=i||null;C<B&&!1!==g.call(i,A[C],C,A);C+=1);}},function(A,g,i){var C=i(19);A.exports=function(A,g){var i=C(g.prototype);i.constructor=A,A.prototype=i}},function(A,g,i){A.exports=function(A){function g(){}return g.prototype=A,new g}},function(A,g,i){var C=i(3),B=i(7),I=i(21),E=i(22),o=i(24),Q=i(25),t=i(0),e=i(4),a=i(28),n=i(9),w={page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'},s=["first","prev","next","last"],M=["prev","next"],m=B({init:function(A,g,i){this._containerElement=null,this._firstItemClassName=g.firstItemClassName,this._lastItemClassName=g.lastItemClassName,this._template=t({},w,g.template),this._buttons={},this._enabledPageElements=[],this._setRootElement(A),this._setMoveButtons(),this._setDisabledMoveButtons(),this._setMoreButtons(),this._attachClickEvent(i)},_setRootElement:function(A){if(e(A)?A=document.getElementById(A)||document.querySelector(A):A.jquery&&(A=A[0]),!a(A))throw new Error("The container element is invalid.");this._containerElement=A},_setMoveButtons:function(){C(s,(function(A){this._buttons[A]=n.createElementByTemplate(this._template.moveButton,{type:A})}),this)},_setDisabledMoveButtons:function(){C(s,(function(A){var g="disabled"+n.capitalizeFirstLetter(A);this._buttons[g]=n.createElementByTemplate(this._template.disabledMoveButton,{type:A})}),this)},_setMoreButtons:function(){C(M,(function(A){var g=A+"More";this._buttons[g]=n.createElementByTemplate(this._template.moreButton,{type:A})}),this)},_getContainerElement:function(){return this._containerElement},_appendFirstButton:function(A){var g;g=A.page>1?this._buttons.first:this._buttons.disabledFirst,this._getContainerElement().appendChild(g)},_appendPrevButton:function(A){var g;g=A.currentPageIndex>1?this._buttons.prev:this._buttons.disabledPrev,this._getContainerElement().appendChild(g)},_appendNextButton:function(A){var g;g=A.currentPageIndex<A.lastPageListIndex?this._buttons.next:this._buttons.disabledNext,this._getContainerElement().appendChild(g)},_appendLastButton:function(A){var g;g=A.page<A.lastPage?this._buttons.last:this._buttons.disabledLast,this._getContainerElement().appendChild(g)},_appendPrevMoreButton:function(A){var g;A.prevMore&&(g=this._buttons.prevMore,Q(g,this._firstItemClassName),this._getContainerElement().appendChild(g))},_appendNextMoreButton:function(A){var g;A.nextMore&&(g=this._buttons.nextMore,Q(g,this._lastItemClassName),this._getContainerElement().appendChild(g))},_appendPages:function(A){var g,i,C=A.leftPageNumber,B=A.rightPageNumber;for(i=C;i<=B;i+=1)i===A.page?g=n.createElementByTemplate(this._template.currentPage,{page:i}):(g=n.createElementByTemplate(this._template.page,{page:i}),this._enabledPageElements.push(g)),i!==C||A.prevMore||Q(g,this._firstItemClassName),i!==B||A.nextMore||Q(g,this._lastItemClassName),this._getContainerElement().appendChild(g)},_attachClickEvent:function(A){var g=this._getContainerElement();E(g,"click",(function(g){var i,C,B=I(g);o(g),(C=this._getButtonType(B))||(i=this._getPageNumber(B)),A(C,i)}),this)},_getButtonType:function(A){var g,i=this._buttons;return C(i,(function(i,C){return!n.isContained(A,i)||(g=C,!1)}),this),g},_getPageNumber:function(A){var g,i=this._findPageElement(A);return i&&(g=parseInt(i.innerText,10)),g},_findPageElement:function(A){for(var g,i=0,C=this._enabledPageElements.length;i<C;i+=1)if(g=this._enabledPageElements[i],n.isContained(A,g))return g;return null},_empty:function(){this._enabledPageElements=[],C(this._buttons,(function(A,g){this._buttons[g]=A.cloneNode(!0)}),this),this._getContainerElement().innerHTML=""},update:function(A){this._empty(),this._appendFirstButton(A),this._appendPrevButton(A),this._appendPrevMoreButton(A),this._appendPages(A),this._appendNextMoreButton(A),this._appendNextButton(A),this._appendLastButton(A)}});A.exports=m},function(A,g,i){A.exports=function(A){return A.target||A.srcElement}},function(A,g,i){var C=i(4),B=i(3),I=i(23);function E(A,g,i,C){function E(g){i.call(C||A,g||window.event)}"addEventListener"in A?A.addEventListener(g,E):"attachEvent"in A&&A.attachEvent("on"+g,E),function(A,g,i,C){var E=I(A,g),o=!1;B(E,(function(A){return A.handler!==i||(o=!0,!1)})),o||E.push({handler:i,wrappedHandler:C})}(A,g,i,E)}A.exports=function(A,g,i,I){C(g)?B(g.split(/\s+/g),(function(g){E(A,g,i,I)})):B(g,(function(g,C){E(A,C,g,i)}))}},function(A,g,i){var C="_feEventKey";A.exports=function(A,g){var i,B=A[C];return B||(B=A[C]={}),(i=B[g])||(i=B[g]=[]),i}},function(A,g,i){A.exports=function(A){A.preventDefault?A.preventDefault():A.returnValue=!1}},function(A,g,i){var C=i(3),B=i(8),I=i(26),E=i(27);A.exports=function(A){var g,i=Array.prototype.slice.call(arguments,1),o=A.classList,Q=[];o?C(i,(function(g){A.classList.add(g)})):((g=I(A))&&(i=[].concat(g.split(/\s+/),i)),C(i,(function(A){B(A,Q)<0&&Q.push(A)})),E(A,Q))}},function(A,g,i){var C=i(1);A.exports=function(A){return A&&A.className?C(A.className.baseVal)?A.className:A.className.baseVal:""}},function(A,g,i){var C=i(2),B=i(1);A.exports=function(A,g){g=(g=C(g)?g.join(" "):g).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),B(A.className.baseVal)?A.className=g:A.className.baseVal=g}},function(A,g,i){A.exports=function(A){return"object"==typeof HTMLElement?A&&(A instanceof HTMLElement||!!A.nodeType):!(!A||!A.nodeType)}},function(A,g,i){var C=i(8),B=i(3),I=i(2),E=i(4),o=i(0),Q=/{{\s?|\s?}}/g,t=/^[a-zA-Z0-9_@]+\[[a-zA-Z0-9_@"']+\]$/,e=/\[\s?|\s?\]/,a=/^[a-zA-Z_]+\.[a-zA-Z_]+$/,n=/\./,w=/^["']\w+["']$/,s=/"|'/g,M=/^-?\d+\.?\d*$/,m={if:function(A,g,i){var C=function(A,g){var i=[A],C=[],I=0,E=0;return B(g,(function(A,B){0===A.indexOf("if")?I+=1:"/if"===A?I-=1:I||0!==A.indexOf("elseif")&&"else"!==A||(i.push("else"===A?["true"]:A.split(" ").slice(1)),C.push(g.slice(E,B)),E=B+1)})),C.push(g.slice(E)),{exps:i,sourcesInsideIf:C}}(A,g),I=!1,E="";return B(C.exps,(function(A,g){return(I=D(A,i))&&(E=Y(C.sourcesInsideIf[g],i)),!I})),E},each:function(A,g,i){var C=D(A,i),E=I(C)?"@index":"@key",Q={},t="";return B(C,(function(A,C){Q[E]=C,Q["@this"]=A,o(i,Q),t+=Y(g.slice(),i)})),t},with:function(A,g,i){var B=C("as",A),I=A[B+1],E=D(A.slice(0,B),i),Q={};return Q[I]=E,Y(g,o(i,Q))||""}},l=3==="a".split(/a/).length?function(A,g){return A.split(g)}:function(A,g){var i,C,B=[],I=0;for(g.global||(g=new RegExp(g,"g")),i=g.exec(A);null!==i;)C=i.index,B.push(A.slice(I,C)),I=C+i[0].length,i=g.exec(A);return B.push(A.slice(I)),B};function c(A,g){var i,C=g[A];return"true"===A?C=!0:"false"===A?C=!1:w.test(A)?C=A.replace(s,""):t.test(A)?C=c((i=A.split(e))[0],g)[c(i[1],g)]:a.test(A)?C=c((i=A.split(n))[0],g)[i[1]]:M.test(A)&&(C=parseFloat(A)),C}function r(A,g,i){for(var C,B,I,o,Q=m[A],t=1,e=2,a=g[e];t&&E(a);)0===a.indexOf(A)?t+=1:0===a.indexOf("/"+A)&&(t-=1,C=e),a=g[e+=2];if(t)throw Error(A+" needs {{/"+A+"}} expression.");return g[0]=Q(g[0].split(" ").slice(1),(B=0,I=C,(o=g.splice(B+1,I-B)).pop(),o),i),g}function D(A,g){var i=c(A[0],g);return i instanceof Function?function(A,g,i){var C=[];return B(g,(function(A){C.push(c(A,i))})),A.apply(null,C)}(i,A.slice(1),g):i}function Y(A,g){for(var i,C,B,I=1,o=A[I];E(o);)C=(i=o.split(" "))[0],m[C]?(B=r(C,A.splice(I,A.length-I),g),A=A.concat(B)):A[I]=D(i,g),o=A[I+=2];return A.join("")}A.exports=function(A,g){return Y(l(A,Q),g)}},function(A,g,i){var C=i(1),B=i(31);A.exports=function(A,g){var i=location.hostname,I="TOAST UI "+A+" for "+i+": Statistics",E=window.localStorage.getItem(I);(C(window.tui)||!1!==window.tui.usageStatistics)&&(E&&!function(A){return(new Date).getTime()-A>6048e5}(E)||(window.localStorage.setItem(I,(new Date).getTime()),setTimeout((function(){"interactive"!==document.readyState&&"complete"!==document.readyState||B("https://www.google-analytics.com/collect",{v:1,t:"event",tid:g,cid:i,dp:i,dh:A,el:A,ec:"use"})}),1e3)))}},function(A,g,i){var C=i(6);A.exports=function(A,g){var i=document.createElement("img"),B="";return C(g,(function(A,g){B+="&"+g+"="+A})),B=B.substring(1),i.src=A+"?"+B,i.style.display="none",document.body.appendChild(i),document.body.removeChild(i),i}}])}));const j=document.getElementById("pagination"),f={totalItems:200,itemsPerPage:20,visiblePages:5,usageStatistics:!1,page:1,centerAlign:!0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new(A(b))(j,f);var v,X=/^\s+|\s+$/g,P=/^[-+]0x[0-9a-f]+$/i,_=/^0b[01]+$/i,$=/^0o[0-7]+$/i,AA=parseInt,gA="object"==typeof C&&C&&C.Object===Object&&C,iA="object"==typeof self&&self&&self.Object===Object&&self,CA=gA||iA||Function("return this")(),BA=Object.prototype.toString,IA=Math.max,EA=Math.min,oA=function(){return CA.Date.now()};function QA(A,g,i){var C,B,I,E,o,Q,t=0,e=!1,a=!1,n=!0;if("function"!=typeof A)throw new TypeError("Expected a function");function w(g){var i=C,I=B;return C=B=void 0,t=g,E=A.apply(I,i)}function s(A){return t=A,o=setTimeout(m,g),e?w(A):E}function M(A){var i=A-Q;return void 0===Q||i>=g||i<0||a&&A-t>=I}function m(){var A=oA();if(M(A))return l(A);o=setTimeout(m,function(A){var i=g-(A-Q);return a?EA(i,I-(A-t)):i}(A))}function l(A){return o=void 0,n&&C?w(A):(C=B=void 0,E)}function c(){var A=oA(),i=M(A);if(C=arguments,B=this,Q=A,i){if(void 0===o)return s(Q);if(a)return o=setTimeout(m,g),w(Q)}return void 0===o&&(o=setTimeout(m,g)),E}return g=eA(g)||0,tA(i)&&(e=!!i.leading,I=(a="maxWait"in i)?IA(eA(i.maxWait)||0,g):I,n="trailing"in i?!!i.trailing:n),c.cancel=function(){void 0!==o&&clearTimeout(o),t=0,C=Q=B=o=void 0},c.flush=function(){return void 0===o?E:l(oA())},c}function tA(A){var g=typeof A;return!!A&&("object"==g||"function"==g)}function eA(A){if("number"==typeof A)return A;if(function(A){return"symbol"==typeof A||function(A){return!!A&&"object"==typeof A}(A)&&"[object Symbol]"==BA.call(A)}(A))return NaN;if(tA(A)){var g="function"==typeof A.valueOf?A.valueOf():A;A=tA(g)?g+"":g}if("string"!=typeof A)return 0===A?A:+A;A=A.replace(X,"");var i=_.test(A);return i||$.test(A)?AA(A.slice(2),i?2:8):P.test(A)?NaN:+A}v=function(A,g,i){var C=!0,B=!0;if("function"!=typeof A)throw new TypeError("Expected a function");return tA(i)&&(C="leading"in i?!!i.leading:C,B="trailing"in i?!!i.trailing:B),QA(A,g,{leading:C,maxWait:g,trailing:B})};const aA=document.querySelector(".scroll-up");document.addEventListener("scroll",A(v)(function A(){scrollY>333?aA.style.display="block":aA.style.display="none";return A}(),333)),aA.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"})}));
//# sourceMappingURL=index.0de5dce5.js.map