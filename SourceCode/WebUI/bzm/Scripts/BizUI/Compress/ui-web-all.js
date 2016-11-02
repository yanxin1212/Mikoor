/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) { function c(b, c) { var e = b.nodeName.toLowerCase(); if ("area" === e) { var f = b.parentNode, g = f.name, h; return !b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !!h && d(h)) } return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b) } function d(b) { return !a(b).parents().andSelf().filter(function () { return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this) }).length } a.ui = a.ui || {}; if (a.ui.version) return; a.extend(a.ui, { version: "1.8.22", keyCode: { ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91} }), a.fn.extend({ propAttr: a.fn.prop || a.fn.attr, _focus: a.fn.focus, focus: function (b, c) { return typeof b == "number" ? this.each(function () { var d = this; setTimeout(function () { a(d).focus(), c && c.call(d) }, b) }) : this._focus.apply(this, arguments) }, scrollParent: function () { var b; return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function () { return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1)) }).eq(0) : b = this.parents().filter(function () { return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1)) }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b }, zIndex: function (c) { if (c !== b) return this.css("zIndex", c); if (this.length) { var d = a(this[0]), e, f; while (d.length && d[0] !== document) { e = d.css("position"); if (e === "absolute" || e === "relative" || e === "fixed") { f = parseInt(d.css("zIndex"), 10); if (!isNaN(f) && f !== 0) return f } d = d.parent() } } return 0 }, disableSelection: function () { return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) { a.preventDefault() }) }, enableSelection: function () { return this.unbind(".ui-disableSelection") } }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (c, d) { function h(b, c, d, f) { return a.each(e, function () { c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0) }), c } var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], f = d.toLowerCase(), g = { innerWidth: a.fn.innerWidth, innerHeight: a.fn.innerHeight, outerWidth: a.fn.outerWidth, outerHeight: a.fn.outerHeight }; a.fn["inner" + d] = function (c) { return c === b ? g["inner" + d].call(this) : this.each(function () { a(this).css(f, h(this, c) + "px") }) }, a.fn["outer" + d] = function (b, c) { return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function () { a(this).css(f, h(this, b, !0, c) + "px") }) } }), a.extend(a.expr[":"], { data: a.expr.createPseudo ? a.expr.createPseudo(function (b) { return function (c) { return !!a.data(c, b) } }) : function (b, c, d) { return !!a.data(b, d[3]) }, focusable: function (b) { return c(b, !isNaN(a.attr(b, "tabindex"))) }, tabbable: function (b) { var d = a.attr(b, "tabindex"), e = isNaN(d); return (e || d >= 0) && c(b, !e) } }), a(function () { var b = document.body, c = b.appendChild(c = document.createElement("div")); c.offsetHeight, a.extend(c.style, { minHeight: "100px", height: "auto", padding: 0, borderWidth: 0 }), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none" }), a.curCSS || (a.curCSS = a.css), a.extend(a.ui, { plugin: { add: function (b, c, d) { var e = a.ui[b].prototype; for (var f in d) e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]]) }, call: function (a, b, c) { var d = a.plugins[b]; if (!d || !a.element[0].parentNode) return; for (var e = 0; e < d.length; e++) a.options[d[e][0]] && d[e][1].apply(a.element, c) } }, contains: function (a, b) { return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b) }, hasScroll: function (b, c) { if (a(b).css("overflow") === "hidden") return !1; var d = c && c === "left" ? "scrollLeft" : "scrollTop", e = !1; return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e) }, isOverAxis: function (a, b, c) { return a > b && a < b + c }, isOver: function (b, c, d, e, f, g) { return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g) } }) })(jQuery);
 /*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) { if (a.cleanData) { var c = a.cleanData; a.cleanData = function (b) { for (var d = 0, e; (e = b[d]) != null; d++) try { a(e).triggerHandler("remove") } catch (f) { } c(b) } } else { var d = a.fn.remove; a.fn.remove = function (b, c) { return this.each(function () { return c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function () { try { a(this).triggerHandler("remove") } catch (b) { } }), d.call(a(this), b, c) }) } } a.widget = function (b, c, d) { var e = b.split(".")[0], f; b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function (c) { return !!a.data(c, b) }, a[e] = a[e] || {}, a[e][b] = function (a, b) { arguments.length && this._createWidget(a, b) }; var g = new c; g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, { namespace: e, widgetName: b, widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b, widgetBaseClass: f }, d), a.widget.bridge(b, a[e][b]) }, a.widget.bridge = function (c, d) { a.fn[c] = function (e) { var f = typeof e == "string", g = Array.prototype.slice.call(arguments, 1), h = this; return e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e, f && e.charAt(0) === "_" ? h : (f ? this.each(function () { var d = a.data(this, c), f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d; if (f !== d && f !== b) return h = f, !1 }) : this.each(function () { var b = a.data(this, c); b ? b.option(e || {})._init() : a.data(this, c, new d(e, this)) }), h) } }, a.Widget = function (a, b) { arguments.length && this._createWidget(a, b) }, a.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", options: { disabled: !1 }, _createWidget: function (b, c) { a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b); var d = this; this.element.bind("remove." + this.widgetName, function () { d.destroy() }), this._create(), this._trigger("create"), this._init() }, _getCreateOptions: function () { return a.metadata && a.metadata.get(this.element[0])[this.widgetName] }, _create: function () { }, _init: function () { }, destroy: function () { this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled") }, widget: function () { return this.element }, option: function (c, d) { var e = c; if (arguments.length === 0) return a.extend({}, this.options); if (typeof c == "string") { if (d === b) return this.options[c]; e = {}, e[c] = d } return this._setOptions(e), this }, _setOptions: function (b) { var c = this; return a.each(b, function (a, b) { c._setOption(a, b) }), this }, _setOption: function (a, b) { return this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b), this }, enable: function () { return this._setOption("disabled", !1) }, disable: function () { return this._setOption("disabled", !0) }, _trigger: function (b, c, d) { var e, f, g = this.options[b]; d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent; if (f) for (e in f) e in c || (c[e] = f[e]); return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented()) } } })(jQuery); ; /*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.position.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(e,t){function h(e,t,n){return[parseInt(e[0],10)*(l.test(e[0])?t/100:1),parseInt(e[1],10)*(l.test(e[1])?n/100:1)]}function p(t,n){return parseInt(e.css(t,n),10)||0}e.ui=e.ui||{};var n,r=Math.max,i=Math.abs,s=Math.round,o=/left|center|right/,u=/top|center|bottom/,a=/[\+\-]\d+%?/,f=/^\w+/,l=/%$/,c=e.fn.position;e.position={scrollbarWidth:function(){if(n!==t)return n;var r,i,s=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return e("body").append(s),r=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,r===i&&(i=s[0].clientWidth),s.remove(),n=r-i},getScrollInfo:function(t){var n=t.isWindow?"":t.element.css("overflow-x"),r=t.isWindow?"":t.element.css("overflow-y"),i=n==="scroll"||n==="auto"&&t.width<t.element[0].scrollWidth,s=r==="scroll"||r==="auto"&&t.height<t.element[0].scrollHeight;return{width:i?e.position.scrollbarWidth():0,height:s?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var n=e(t||window),r=e.isWindow(n[0]);return{element:n,isWindow:r,offset:n.offset()||{left:0,top:0},scrollLeft:n.scrollLeft(),scrollTop:n.scrollTop(),width:r?n.width():n.outerWidth(),height:r?n.height():n.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return c.apply(this,arguments);t=e.extend({},t);var n,l,d,v,m,g=e(t.of),y=e.position.getWithinInfo(t.within),b=e.position.getScrollInfo(y),w=g[0],E=(t.collision||"flip").split(" "),S={};return w.nodeType===9?(l=g.width(),d=g.height(),v={top:0,left:0}):e.isWindow(w)?(l=g.width(),d=g.height(),v={top:g.scrollTop(),left:g.scrollLeft()}):w.preventDefault?(t.at="left top",l=d=0,v={top:w.pageY,left:w.pageX}):(l=g.outerWidth(),d=g.outerHeight(),v=g.offset()),m=e.extend({},v),e.each(["my","at"],function(){var e=(t[this]||"").split(" "),n,r;e.length===1&&(e=o.test(e[0])?e.concat(["center"]):u.test(e[0])?["center"].concat(e):["center","center"]),e[0]=o.test(e[0])?e[0]:"center",e[1]=u.test(e[1])?e[1]:"center",n=a.exec(e[0]),r=a.exec(e[1]),S[this]=[n?n[0]:0,r?r[0]:0],t[this]=[f.exec(e[0])[0],f.exec(e[1])[0]]}),E.length===1&&(E[1]=E[0]),t.at[0]==="right"?m.left+=l:t.at[0]==="center"&&(m.left+=l/2),t.at[1]==="bottom"?m.top+=d:t.at[1]==="center"&&(m.top+=d/2),n=h(S.at,l,d),m.left+=n[0],m.top+=n[1],this.each(function(){var o,u,a=e(this),f=a.outerWidth(),c=a.outerHeight(),w=p(this,"marginLeft"),x=p(this,"marginTop"),T=f+w+p(this,"marginRight")+b.width,N=c+x+p(this,"marginBottom")+b.height,C=e.extend({},m),k=h(S.my,a.outerWidth(),a.outerHeight());t.my[0]==="right"?C.left-=f:t.my[0]==="center"&&(C.left-=f/2),t.my[1]==="bottom"?C.top-=c:t.my[1]==="center"&&(C.top-=c/2),C.left+=k[0],C.top+=k[1],e.support.offsetFractions||(C.left=s(C.left),C.top=s(C.top)),o={marginLeft:w,marginTop:x},e.each(["left","top"],function(r,i){e.ui.position[E[r]]&&e.ui.position[E[r]][i](C,{targetWidth:l,targetHeight:d,elemWidth:f,elemHeight:c,collisionPosition:o,collisionWidth:T,collisionHeight:N,offset:[n[0]+k[0],n[1]+k[1]],my:t.my,at:t.at,within:y,elem:a})}),e.fn.bgiframe&&a.bgiframe(),t.using&&(u=function(e){var n=v.left-C.left,s=n+l-f,o=v.top-C.top,u=o+d-c,h={target:{element:g,left:v.left,top:v.top,width:l,height:d},element:{element:a,left:C.left,top:C.top,width:f,height:c},horizontal:s<0?"left":n>0?"right":"center",vertical:u<0?"top":o>0?"bottom":"middle"};l<f&&i(n+s)<l&&(h.horizontal="center"),d<c&&i(o+u)<d&&(h.vertical="middle"),r(i(n),i(s))>r(i(o),i(u))?h.important="horizontal":h.important="vertical",t.using.call(this,e,h)}),a.offset(e.extend(C,{using:u}))})},e.ui.position={fit:{left:function(e,t){var n=t.within,i=n.isWindow?n.scrollLeft:n.offset.left,s=n.width,o=e.left-t.collisionPosition.marginLeft,u=i-o,a=o+t.collisionWidth-s-i,f;t.collisionWidth>s?u>0&&a<=0?(f=e.left+u+t.collisionWidth-s-i,e.left+=u-f):a>0&&u<=0?e.left=i:u>a?e.left=i+s-t.collisionWidth:e.left=i:u>0?e.left+=u:a>0?e.left-=a:e.left=r(e.left-o,e.left)},top:function(e,t){var n=t.within,i=n.isWindow?n.scrollTop:n.offset.top,s=t.within.height,o=e.top-t.collisionPosition.marginTop,u=i-o,a=o+t.collisionHeight-s-i,f;t.collisionHeight>s?u>0&&a<=0?(f=e.top+u+t.collisionHeight-s-i,e.top+=u-f):a>0&&u<=0?e.top=i:u>a?e.top=i+s-t.collisionHeight:e.top=i:u>0?e.top+=u:a>0?e.top-=a:e.top=r(e.top-o,e.top)}},flip:{left:function(e,t){var n=t.within,r=n.offset.left+n.scrollLeft,s=n.width,o=n.isWindow?n.scrollLeft:n.offset.left,u=e.left-t.collisionPosition.marginLeft,a=u-o,f=u+t.collisionWidth-s-o,l=t.my[0]==="left"?-t.elemWidth:t.my[0]==="right"?t.elemWidth:0,c=t.at[0]==="left"?t.targetWidth:t.at[0]==="right"?-t.targetWidth:0,h=-2*t.offset[0],p,d;if(a<0){p=e.left+l+c+h+t.collisionWidth-s-r;if(p<0||p<i(a))e.left+=l+c+h}else if(f>0){d=e.left-t.collisionPosition.marginLeft+l+c+h-o;if(d>0||i(d)<f)e.left+=l+c+h}},top:function(e,t){var n=t.within,r=n.offset.top+n.scrollTop,s=n.height,o=n.isWindow?n.scrollTop:n.offset.top,u=e.top-t.collisionPosition.marginTop,a=u-o,f=u+t.collisionHeight-s-o,l=t.my[1]==="top",c=l?-t.elemHeight:t.my[1]==="bottom"?t.elemHeight:0,h=t.at[1]==="top"?t.targetHeight:t.at[1]==="bottom"?-t.targetHeight:0,p=-2*t.offset[1],d,v;a<0?(v=e.top+c+h+p+t.collisionHeight-s-r,e.top+c+h+p>a&&(v<0||v<i(a))&&(e.top+=c+h+p)):f>0&&(d=e.top-t.collisionPosition.marginTop+c+h+p-o,e.top+c+h+p>f&&(d>0||i(d)<f)&&(e.top+=c+h+p))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,n,r,i,s,o=document.getElementsByTagName("body")[0],u=document.createElement("div");t=document.createElement(o?"div":"body"),r={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&e.extend(r,{position:"absolute",left:"-1000px",top:"-1000px"});for(s in r)t.style[s]=r[s];t.appendChild(u),n=o||document.documentElement,n.insertBefore(t,n.firstChild),u.style.cssText="position: absolute; left: 10.7432222px;",i=e(u).offset().left,e.support.offsetFractions=i>10&&i<11,t.innerHTML="",n.removeChild(t)}(),e.uiBackCompat!==!1&&function(e){var n=e.fn.position;e.fn.position=function(r){if(!r||!r.offset)return n.call(this,r);var i=r.offset.split(" "),s=r.at.split(" ");return i.length===1&&(i[1]=i[0]),/^\d/.test(i[0])&&(i[0]="+"+i[0]),/^\d/.test(i[1])&&(i[1]="+"+i[1]),s.length===1&&(/left|center|right/.test(s[0])?s[1]="center":(s[1]=s[0],s[0]="center")),n.call(this,e.extend(r,{at:s[0]+i[0]+" "+s[1]+i[1],offset:t}))}}(jQuery)})(jQuery);
/*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.accordion.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) { a.widget("ui.accordion", { options: { active: 0, animated: "slide", autoHeight: !0, clearStyle: !1, collapsible: !1, event: "click", fillSpace: !1, header: "> li > :first-child,> :not(li):even", icons: { header: "ui-icon-triangle-1-e", headerSelected: "ui-icon-triangle-1-s" }, navigation: !1, navigationFilter: function () { return this.href.toLowerCase() === location.href.toLowerCase() } }, _create: function () { var b = this, c = b.options; b.running = 0, b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), b.headers = b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () { if (c.disabled) return; a(this).addClass("ui-state-hover") }).bind("mouseleave.accordion", function () { if (c.disabled) return; a(this).removeClass("ui-state-hover") }).bind("focus.accordion", function () { if (c.disabled) return; a(this).addClass("ui-state-focus") }).bind("blur.accordion", function () { if (c.disabled) return; a(this).removeClass("ui-state-focus") }), b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"); if (c.navigation) { var d = b.element.find("a").filter(c.navigationFilter).eq(0); if (d.length) { var e = d.closest(".ui-accordion-header"); e.length ? b.active = e : b.active = d.closest(".ui-accordion-content").prev() } } b.active = b._findActive(b.active || c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), b.active.next().addClass("ui-accordion-content-active"), b._createIcons(), b.resize(), b.element.attr("role", "tablist"), b.headers.attr("role", "tab").bind("keydown.accordion", function (a) { return b._keydown(a) }).next().attr("role", "tabpanel"), b.headers.not(b.active || "").attr({ "aria-expanded": "false", "aria-selected": "false", tabIndex: -1 }).next().hide(), b.active.length ? b.active.attr({ "aria-expanded": "true", "aria-selected": "true", tabIndex: 0 }) : b.headers.eq(0).attr("tabIndex", 0), a.browser.safari || b.headers.find("a").attr("tabIndex", -1), c.event && b.headers.bind(c.event.split(" ").join(".accordion ") + ".accordion", function (a) { b._clickHandler.call(b, a, this), a.preventDefault() }) }, _createIcons: function () { var b = this.options; b.icons && (a("<span></span>").addClass("ui-icon " + b.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected), this.element.addClass("ui-accordion-icons")) }, _destroyIcons: function () { this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons") }, destroy: function () { var b = this.options; this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons(); var c = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled"); return (b.autoHeight || b.fillHeight) && c.css("height", ""), a.Widget.prototype.destroy.call(this) }, _setOption: function (b, c) { a.Widget.prototype._setOption.apply(this, arguments), b == "active" && this.activate(c), b == "icons" && (this._destroyIcons(), c && this._createIcons()), b == "disabled" && this.headers.add(this.headers.next())[c ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled") }, _keydown: function (b) { if (this.options.disabled || b.altKey || b.ctrlKey) return; var c = a.ui.keyCode, d = this.headers.length, e = this.headers.index(b.target), f = !1; switch (b.keyCode) { case c.RIGHT: case c.DOWN: f = this.headers[(e + 1) % d]; break; case c.LEFT: case c.UP: f = this.headers[(e - 1 + d) % d]; break; case c.SPACE: case c.ENTER: this._clickHandler({ target: b.target }, b.target), b.preventDefault() } return f ? (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), !1) : !0 }, resize: function () { var b = this.options, c; if (b.fillSpace) { if (a.browser.msie) { var d = this.element.parent().css("overflow"); this.element.parent().css("overflow", "hidden") } c = this.element.parent().height(), a.browser.msie && this.element.parent().css("overflow", d), this.headers.each(function () { c -= a(this).outerHeight(!0) }), this.headers.next().each(function () { a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height())) }).css("overflow", "auto") } else b.autoHeight && (c = 0, this.headers.next().each(function () { c = Math.max(c, a(this).height("").height()) }).height(c)); return this }, activate: function (a) { this.options.active = a; var b = this._findActive(a)[0]; return this._clickHandler({ target: b }, b), this }, _findActive: function (b) { return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === !1 ? a([]) : this.headers.filter(":eq(0)") }, _clickHandler: function (b, c) { var d = this.options; if (d.disabled) return; if (!b.target) { if (!d.collapsible) return; this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header), this.active.next().addClass("ui-accordion-content-active"); var e = this.active.next(), f = { options: d, newHeader: a([]), oldHeader: d.active, newContent: a([]), oldContent: e }, g = this.active = a([]); this._toggle(g, e, f); return } var h = a(b.currentTarget || c), i = h[0] === this.active[0]; d.active = d.collapsible && i ? !1 : this.headers.index(h); if (this.running || !d.collapsible && i) return; var j = this.active, g = h.next(), e = this.active.next(), f = { options: d, newHeader: i && d.collapsible ? a([]) : h, oldHeader: this.active, newContent: i && d.collapsible ? a([]) : g, oldContent: e }, k = this.headers.index(this.active[0]) > this.headers.index(h[0]); this.active = i ? a([]) : h, this._toggle(g, e, f, i, k), j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header), i || (h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected), h.next().addClass("ui-accordion-content-active")); return }, _toggle: function (b, c, d, e, f) { var g = this, h = g.options; g.toShow = b, g.toHide = c, g.data = d; var i = function () { if (!g) return; return g._completed.apply(g, arguments) }; g._trigger("changestart", null, g.data), g.running = c.size() === 0 ? b.size() : c.size(); if (h.animated) { var j = {}; h.collapsible && e ? j = { toShow: a([]), toHide: c, complete: i, down: f, autoHeight: h.autoHeight || h.fillSpace} : j = { toShow: b, toHide: c, complete: i, down: f, autoHeight: h.autoHeight || h.fillSpace }, h.proxied || (h.proxied = h.animated), h.proxiedDuration || (h.proxiedDuration = h.duration), h.animated = a.isFunction(h.proxied) ? h.proxied(j) : h.proxied, h.duration = a.isFunction(h.proxiedDuration) ? h.proxiedDuration(j) : h.proxiedDuration; var k = a.ui.accordion.animations, l = h.duration, m = h.animated; m && !k[m] && !a.easing[m] && (m = "slide"), k[m] || (k[m] = function (a) { this.slide(a, { easing: m, duration: l || 700 }) }), k[m](j) } else h.collapsible && e ? b.toggle() : (c.hide(), b.show()), i(!0); c.prev().attr({ "aria-expanded": "false", "aria-selected": "false", tabIndex: -1 }).blur(), b.prev().attr({ "aria-expanded": "true", "aria-selected": "true", tabIndex: 0 }).focus() }, _completed: function (a) { this.running = a ? 0 : --this.running; if (this.running) return; this.options.clearStyle && this.toShow.add(this.toHide).css({ height: "", overflow: "" }), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data) } }), a.extend(a.ui.accordion, { version: "1.8.22", animations: { slide: function (b, c) { b = a.extend({ easing: "swing", duration: 300 }, b, c); if (!b.toHide.size()) { b.toShow.animate({ height: "show", paddingTop: "show", paddingBottom: "show" }, b); return } if (!b.toShow.size()) { b.toHide.animate({ height: "hide", paddingTop: "hide", paddingBottom: "hide" }, b); return } var d = b.toShow.css("overflow"), e = 0, f = {}, g = {}, h = ["height", "paddingTop", "paddingBottom"], i, j = b.toShow; i = j[0].style.width, j.width(j.parent().width() - parseFloat(j.css("paddingLeft")) - parseFloat(j.css("paddingRight")) - (parseFloat(j.css("borderLeftWidth")) || 0) - (parseFloat(j.css("borderRightWidth")) || 0)), a.each(h, function (c, d) { g[d] = "hide"; var e = ("" + a.css(b.toShow[0], d)).match(/^([\d+-.]+)(.*)$/); f[d] = { value: e[1], unit: e[2] || "px"} }), b.toShow.css({ height: 0, overflow: "hidden" }).show(), b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g, { step: function (a, c) { c.prop == "height" && (e = c.end - c.start === 0 ? 0 : (c.now - c.start) / (c.end - c.start)), b.toShow[0].style[c.prop] = e * f[c.prop].value + f[c.prop].unit }, duration: b.duration, easing: b.easing, complete: function () { b.autoHeight || b.toShow.css("height", ""), b.toShow.css({ width: i, overflow: d }), b.complete() } }) }, bounceslide: function (a) { this.slide(a, { easing: a.down ? "easeOutBounce" : "swing", duration: a.down ? 1e3 : 200 }) } } }) })(jQuery); ; /*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.dialog.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) { var c = "ui-dialog ui-widget ui-widget-content ui-corner-all ", d = { buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0 }, e = { maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0 }, f = a.attrFn || { val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0, click: !0 }; a.widget("ui.dialog", { options: { autoOpen: !0, buttons: {}, closeOnEscape: !0, closeText: "close", dialogClass: "", draggable: !0, hide: null, height: "auto", maxHeight: !1, maxWidth: !1, minHeight: 150, minWidth: 150, modal: !1, position: { my: "center", at: "center", collision: "fit", using: function (b) { var c = a(this).css(b).offset().top; c < 0 && a(this).css("top", b.top - c) } }, resizable: !0, show: null, stack: !0, title: "", width: 300, zIndex: 1e3 }, _create: function () { this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle; var b = this, d = b.options, e = d.title || "&#160;", f = a.ui.dialog.getTitleId(b.element), g = (b.uiDialog = a("<div></div>")).appendTo(document.body).hide().addClass(c + d.dialogClass).css({ zIndex: d.zIndex }).attr("tabIndex", -1).css("outline", 0).keydown(function (c) { d.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault()) }).attr({ role: "dialog", "aria-labelledby": f }).mousedown(function (a) { b.moveToTop(!1, a) }), h = b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g), i = (b.uiDialogTitlebar = a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g), j = a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () { j.addClass("ui-state-hover") }, function () { j.removeClass("ui-state-hover") }).focus(function () { j.addClass("ui-state-focus") }).blur(function () { j.removeClass("ui-state-focus") }).click(function (a) { return b.close(a), !1 }).appendTo(i), k = (b.uiDialogTitlebarCloseText = a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j), l = a("<span></span>").addClass("ui-dialog-title").attr("id", f).html(e).prependTo(i); a.isFunction(d.beforeclose) && !a.isFunction(d.beforeClose) && (d.beforeClose = d.beforeclose), i.find("*").add(i).disableSelection(), d.draggable && a.fn.draggable && b._makeDraggable(), d.resizable && a.fn.resizable && b._makeResizable(), b._createButtons(d.buttons), b._isOpen = !1, a.fn.bgiframe && g.bgiframe() }, _init: function () { this.options.autoOpen && this.open() }, destroy: function () { var a = this; return a.overlay && a.overlay.destroy(), a.uiDialog.hide(), a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), a.uiDialog.remove(), a.originalTitle && a.element.attr("title", a.originalTitle), a }, widget: function () { return this.uiDialog }, close: function (b) { var c = this, d, e; if (!1 === c._trigger("beforeClose", b)) return; return c.overlay && c.overlay.destroy(), c.uiDialog.unbind("keypress.ui-dialog"), c._isOpen = !1, c.options.hide ? c.uiDialog.hide(c.options.hide, function () { c._trigger("close", b) }) : (c.uiDialog.hide(), c._trigger("close", b)), a.ui.dialog.overlay.resize(), c.options.modal && (d = 0, a(".ui-dialog").each(function () { this !== c.uiDialog[0] && (e = a(this).css("z-index"), isNaN(e) || (d = Math.max(d, e))) }), a.ui.dialog.maxZ = d), c }, isOpen: function () { return this._isOpen }, moveToTop: function (b, c) { var d = this, e = d.options, f; return e.modal && !b || !e.stack && !e.modal ? d._trigger("focus", c) : (e.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = e.zIndex), d.overlay && (a.ui.dialog.maxZ += 1, d.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)), f = { scrollTop: d.element.scrollTop(), scrollLeft: d.element.scrollLeft() }, a.ui.dialog.maxZ += 1, d.uiDialog.css("z-index", a.ui.dialog.maxZ), d.element.attr(f), d._trigger("focus", c), d) }, open: function () { if (this._isOpen) return; var b = this, c = b.options, d = b.uiDialog; return b.overlay = c.modal ? new a.ui.dialog.overlay(b) : null, b._size(), b._position(c.position), d.show(c.show), b.moveToTop(!0), c.modal && d.bind("keydown.ui-dialog", function (b) { if (b.keyCode !== a.ui.keyCode.TAB) return; var c = a(":tabbable", this), d = c.filter(":first"), e = c.filter(":last"); if (b.target === e[0] && !b.shiftKey) return d.focus(1), !1; if (b.target === d[0] && b.shiftKey) return e.focus(1), !1 }), a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(), b._isOpen = !0, b._trigger("open"), b }, _createButtons: function (b) { var c = this, d = !1, e = a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), g = a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e); c.uiDialog.find(".ui-dialog-buttonpane").remove(), typeof b == "object" && b !== null && a.each(b, function () { return !(d = !0) }), d && (a.each(b, function (b, d) { d = a.isFunction(d) ? { click: d, text: b} : d; var e = a('<button type="button"></button>').click(function () { d.click.apply(c.element[0], arguments) }).appendTo(g); a.each(d, function (a, b) { if (a === "click") return; a in f ? e[a](b) : e.attr(a, b) }), a.fn.button && e.button() }), e.appendTo(c.uiDialog)) }, _makeDraggable: function () { function f(a) { return { position: a.position, offset: a.offset} } var b = this, c = b.options, d = a(document), e; b.uiDialog.draggable({ cancel: ".ui-dialog-content, .ui-dialog-titlebar-close", handle: ".ui-dialog-titlebar", containment: "document", start: function (d, g) { e = c.height === "auto" ? "auto" : a(this).height(), a(this).height(a(this).height()).addClass("ui-dialog-dragging"), b._trigger("dragStart", d, f(g)) }, drag: function (a, c) { b._trigger("drag", a, f(c)) }, stop: function (g, h) { c.position = [h.position.left - d.scrollLeft(), h.position.top - d.scrollTop()], a(this).removeClass("ui-dialog-dragging").height(e), b._trigger("dragStop", g, f(h)), a.ui.dialog.overlay.resize() } }) }, _makeResizable: function (c) { function h(a) { return { originalPosition: a.originalPosition, originalSize: a.originalSize, position: a.position, size: a.size} } c = c === b ? this.options.resizable : c; var d = this, e = d.options, f = d.uiDialog.css("position"), g = typeof c == "string" ? c : "n,e,s,w,se,sw,ne,nw"; d.uiDialog.resizable({ cancel: ".ui-dialog-content", containment: "document", alsoResize: d.element, maxWidth: e.maxWidth, maxHeight: e.maxHeight, minWidth: e.minWidth, minHeight: d._minHeight(), handles: g, start: function (b, c) { a(this).addClass("ui-dialog-resizing"), d._trigger("resizeStart", b, h(c)) }, resize: function (a, b) { d._trigger("resize", a, h(b)) }, stop: function (b, c) { a(this).removeClass("ui-dialog-resizing"), e.height = a(this).height(), e.width = a(this).width(), d._trigger("resizeStop", b, h(c)), a.ui.dialog.overlay.resize() } }).css("position", f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se") }, _minHeight: function () { var a = this.options; return a.height === "auto" ? a.minHeight : Math.min(a.minHeight, a.height) }, _position: function (b) { var c = [], d = [0, 0], e; if (b) { if (typeof b == "string" || typeof b == "object" && "0" in b) c = b.split ? b.split(" ") : [b[0], b[1]], c.length === 1 && (c[1] = c[0]), a.each(["left", "top"], function (a, b) { +c[a] === c[a] && (d[a] = c[a], c[a] = b) }), b = { my: c.join(" "), at: c.join(" "), offset: d.join(" ") }; b = a.extend({}, a.ui.dialog.prototype.options.position, b) } else b = a.ui.dialog.prototype.options.position; e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.css({ top: 0, left: 0 }).position(a.extend({ of: window }, b)), e || this.uiDialog.hide() }, _setOptions: function (b) { var c = this, f = {}, g = !1; a.each(b, function (a, b) { c._setOption(a, b), a in d && (g = !0), a in e && (f[a] = b) }), g && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", f) }, _setOption: function (b, d) { var e = this, f = e.uiDialog; switch (b) { case "beforeclose": b = "beforeClose"; break; case "buttons": e._createButtons(d); break; case "closeText": e.uiDialogTitlebarCloseText.text("" + d); break; case "dialogClass": f.removeClass(e.options.dialogClass).addClass(c + d); break; case "disabled": d ? f.addClass("ui-dialog-disabled") : f.removeClass("ui-dialog-disabled"); break; case "draggable": var g = f.is(":data(draggable)"); g && !d && f.draggable("destroy"), !g && d && e._makeDraggable(); break; case "position": e._position(d); break; case "resizable": var h = f.is(":data(resizable)"); h && !d && f.resizable("destroy"), h && typeof d == "string" && f.resizable("option", "handles", d), !h && d !== !1 && e._makeResizable(d); break; case "title": a(".ui-dialog-title", e.uiDialogTitlebar).html("" + (d || "&#160;")) } a.Widget.prototype._setOption.apply(e, arguments) }, _size: function () { var b = this.options, c, d, e = this.uiDialog.is(":visible"); this.element.show().css({ width: "auto", minHeight: 0, height: 0 }), b.minWidth > b.width && (b.width = b.minWidth), c = this.uiDialog.css({ height: "auto", width: b.width }).height(), d = Math.max(0, b.minHeight - c); if (b.height === "auto") if (a.support.minHeight) this.element.css({ minHeight: d, height: "auto" }); else { this.uiDialog.show(); var f = this.element.css("height", "auto").height(); e || this.uiDialog.hide(), this.element.height(Math.max(f, d)) } else this.element.height(Math.max(b.height - c, 0)); this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight()) } }), a.extend(a.ui.dialog, { version: "1.8.22", uuid: 0, maxZ: 0, getTitleId: function (a) { var b = a.attr("id"); return b || (this.uuid += 1, b = this.uuid), "ui-dialog-title-" + b }, overlay: function (b) { this.$el = a.ui.dialog.overlay.create(b) } }), a.extend(a.ui.dialog.overlay, { instances: [], oldInstances: [], maxZ: 0, events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (a) { return a + ".dialog-overlay" }).join(" "), create: function (b) { this.instances.length === 0 && (setTimeout(function () { a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function (b) { if (a(b.target).zIndex() < a.ui.dialog.overlay.maxZ) return !1 }) }, 1), a(document).bind("keydown.dialog-overlay", function (c) { b.options.closeOnEscape && !c.isDefaultPrevented() && c.keyCode && c.keyCode === a.ui.keyCode.ESCAPE && (b.close(c), c.preventDefault()) }), a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize)); var c = (this.oldInstances.pop() || a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({ width: this.width(), height: this.height() }); return a.fn.bgiframe && c.bgiframe(), this.instances.push(c), c }, destroy: function (b) { var c = a.inArray(b, this.instances); c != -1 && this.oldInstances.push(this.instances.splice(c, 1)[0]), this.instances.length === 0 && a([document, window]).unbind(".dialog-overlay"), b.remove(); var d = 0; a.each(this.instances, function () { d = Math.max(d, this.css("z-index")) }), this.maxZ = d }, height: function () { var b, c; return a.browser.msie && a.browser.version < 7 ? (b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), b < c ? a(window).height() + "px" : b + "px") : a(document).height() + "px" }, width: function () { var b, c; return a.browser.msie ? (b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), b < c ? a(window).width() + "px" : b + "px") : a(document).width() + "px" }, resize: function () { var b = a([]); a.each(a.ui.dialog.overlay.instances, function () { b = b.add(this) }), b.css({ width: 0, height: 0 }).css({ width: a.ui.dialog.overlay.width(), height: a.ui.dialog.overlay.height() }) } }), a.extend(a.ui.dialog.overlay.prototype, { destroy: function () { a.ui.dialog.overlay.destroy(this.$el) } }) })(jQuery); ; /*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.tabs.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) { function e() { return ++c } function f() { return ++d } var c = 0, d = 0; a.widget("ui.tabs", { options: { add: null, ajaxOptions: null, cache: !1, cookie: null, collapsible: !1, disable: null, disabled: [], enable: null, event: "click", fx: null, idPrefix: "ui-tabs-", load: null, panelTemplate: "<div></div>", remove: null, select: null, show: null, spinner: "<em>Loading&#8230;</em>", tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>" }, _create: function () { this._tabify(!0) }, _setOption: function (a, b) { if (a == "selected") { if (this.options.collapsible && b == this.options.selected) return; this.select(b) } else this.options[a] = b, this._tabify() }, _tabId: function (a) { return a.title && a.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + e() }, _sanitizeSelector: function (a) { return a.replace(/:/g, "\\:") }, _cookie: function () { var b = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + f()); return a.cookie.apply(null, [b].concat(a.makeArray(arguments))) }, _ui: function (a, b) { return { tab: a, panel: b, index: this.anchors.index(a)} }, _cleanup: function () { this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () { var b = a(this); b.html(b.data("label.tabs")).removeData("label.tabs") }) }, _tabify: function (c) { function m(b, c) { b.css("display", ""), !a.support.opacity && c.opacity && b[0].style.removeAttribute("filter") } var d = this, e = this.options, f = /^#.+/; this.list = this.element.find("ol,ul").eq(0), this.lis = a(" > li:has(a[href])", this.list), this.anchors = this.lis.map(function () { return a("a", this)[0] }), this.panels = a([]), this.anchors.each(function (b, c) { var g = a(c).attr("href"), h = g.split("#")[0], i; h && (h === location.toString().split("#")[0] || (i = a("base")[0]) && h === i.href) && (g = c.hash, c.href = g); if (f.test(g)) d.panels = d.panels.add(d.element.find(d._sanitizeSelector(g))); else if (g && g !== "#") { a.data(c, "href.tabs", g), a.data(c, "load.tabs", g.replace(/#.*$/, "")); var j = d._tabId(c); c.href = "#" + j; var k = d.element.find("#" + j); k.length || (k = a(e.panelTemplate).attr("id", j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(d.panels[b - 1] || d.list), k.data("destroy.tabs", !0)), d.panels = d.panels.add(k) } else e.disabled.push(b) }), c ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), e.selected === b ? (location.hash && this.anchors.each(function (a, b) { if (b.hash == location.hash) return e.selected = a, !1 }), typeof e.selected != "number" && e.cookie && (e.selected = parseInt(d._cookie(), 10)), typeof e.selected != "number" && this.lis.filter(".ui-tabs-selected").length && (e.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), e.selected = e.selected || (this.lis.length ? 0 : -1)) : e.selected === null && (e.selected = -1), e.selected = e.selected >= 0 && this.anchors[e.selected] || e.selected < 0 ? e.selected : 0, e.disabled = a.unique(e.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"), function (a, b) { return d.lis.index(a) }))).sort(), a.inArray(e.selected, e.disabled) != -1 && e.disabled.splice(a.inArray(e.selected, e.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), e.selected >= 0 && this.anchors.length && (d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"), d.element.queue("tabs", function () { d._trigger("show", null, d._ui(d.anchors[e.selected], d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0])) }), this.load(e.selected)), a(window).bind("unload", function () { d.lis.add(d.anchors).unbind(".tabs"), d.lis = d.anchors = d.panels = null })) : e.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[e.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"), e.cookie && this._cookie(e.selected, e.cookie); for (var g = 0, h; h = this.lis[g]; g++) a(h)[a.inArray(g, e.disabled) != -1 && !a(h).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled"); e.cache === !1 && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs"); if (e.event !== "mouseover") { var i = function (a, b) { b.is(":not(.ui-state-disabled)") && b.addClass("ui-state-" + a) }, j = function (a, b) { b.removeClass("ui-state-" + a) }; this.lis.bind("mouseover.tabs", function () { i("hover", a(this)) }), this.lis.bind("mouseout.tabs", function () { j("hover", a(this)) }), this.anchors.bind("focus.tabs", function () { i("focus", a(this).closest("li")) }), this.anchors.bind("blur.tabs", function () { j("focus", a(this).closest("li")) }) } var k, l; e.fx && (a.isArray(e.fx) ? (k = e.fx[0], l = e.fx[1]) : k = l = e.fx); var n = l ? function (b, c) { a(b).closest("li").addClass("ui-tabs-selected ui-state-active"), c.hide().removeClass("ui-tabs-hide").animate(l, l.duration || "normal", function () { m(c, l), d._trigger("show", null, d._ui(b, c[0])) }) } : function (b, c) { a(b).closest("li").addClass("ui-tabs-selected ui-state-active"), c.removeClass("ui-tabs-hide"), d._trigger("show", null, d._ui(b, c[0])) }, o = k ? function (a, b) { b.animate(k, k.duration || "normal", function () { d.lis.removeClass("ui-tabs-selected ui-state-active"), b.addClass("ui-tabs-hide"), m(b, k), d.element.dequeue("tabs") }) } : function (a, b, c) { d.lis.removeClass("ui-tabs-selected ui-state-active"), b.addClass("ui-tabs-hide"), d.element.dequeue("tabs") }; this.anchors.bind(e.event + ".tabs", function () { var b = this, c = a(b).closest("li"), f = d.panels.filter(":not(.ui-tabs-hide)"), g = d.element.find(d._sanitizeSelector(b.hash)); if (c.hasClass("ui-tabs-selected") && !e.collapsible || c.hasClass("ui-state-disabled") || c.hasClass("ui-state-processing") || d.panels.filter(":animated").length || d._trigger("select", null, d._ui(this, g[0])) === !1) return this.blur(), !1; e.selected = d.anchors.index(this), d.abort(); if (e.collapsible) { if (c.hasClass("ui-tabs-selected")) return e.selected = -1, e.cookie && d._cookie(e.selected, e.cookie), d.element.queue("tabs", function () { o(b, f) }).dequeue("tabs"), this.blur(), !1; if (!f.length) return e.cookie && d._cookie(e.selected, e.cookie), d.element.queue("tabs", function () { n(b, g) }), d.load(d.anchors.index(this)), this.blur(), !1 } e.cookie && d._cookie(e.selected, e.cookie); if (g.length) f.length && d.element.queue("tabs", function () { o(b, f) }), d.element.queue("tabs", function () { n(b, g) }), d.load(d.anchors.index(this)); else throw "jQuery UI Tabs: Mismatching fragment identifier."; a.browser.msie && this.blur() }), this.anchors.bind("click.tabs", function () { return !1 }) }, _getIndex: function (a) { return typeof a == "string" && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))), a }, destroy: function () { var b = this.options; return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.each(function () { var b = a.data(this, "href.tabs"); b && (this.href = b); var c = a(this).unbind(".tabs"); a.each(["href", "load", "cache"], function (a, b) { c.removeData(b + ".tabs") }) }), this.lis.unbind(".tabs").add(this.panels).each(function () { a.data(this, "destroy.tabs") ? a(this).remove() : a(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" ")) }), b.cookie && this._cookie(null, b.cookie), this }, add: function (c, d, e) { e === b && (e = this.anchors.length); var f = this, g = this.options, h = a(g.tabTemplate.replace(/#\{href\}/g, c).replace(/#\{label\}/g, d)), i = c.indexOf("#") ? this._tabId(a("a", h)[0]) : c.replace("#", ""); h.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0); var j = f.element.find("#" + i); return j.length || (j = a(g.panelTemplate).attr("id", i).data("destroy.tabs", !0)), j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), e >= this.lis.length ? (h.appendTo(this.list), j.appendTo(this.list[0].parentNode)) : (h.insertBefore(this.lis[e]), j.insertBefore(this.panels[e])), g.disabled = a.map(g.disabled, function (a, b) { return a >= e ? ++a : a }), this._tabify(), this.anchors.length == 1 && (g.selected = 0, h.addClass("ui-tabs-selected ui-state-active"), j.removeClass("ui-tabs-hide"), this.element.queue("tabs", function () { f._trigger("show", null, f._ui(f.anchors[0], f.panels[0])) }), this.load(0)), this._trigger("add", null, this._ui(this.anchors[e], this.panels[e])), this }, remove: function (b) { b = this._getIndex(b); var c = this.options, d = this.lis.eq(b).remove(), e = this.panels.eq(b).remove(); return d.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(b + (b + 1 < this.anchors.length ? 1 : -1)), c.disabled = a.map(a.grep(c.disabled, function (a, c) { return a != b }), function (a, c) { return a >= b ? --a : a }), this._tabify(), this._trigger("remove", null, this._ui(d.find("a")[0], e[0])), this }, enable: function (b) { b = this._getIndex(b); var c = this.options; if (a.inArray(b, c.disabled) == -1) return; return this.lis.eq(b).removeClass("ui-state-disabled"), c.disabled = a.grep(c.disabled, function (a, c) { return a != b }), this._trigger("enable", null, this._ui(this.anchors[b], this.panels[b])), this }, disable: function (a) { a = this._getIndex(a); var b = this, c = this.options; return a != c.selected && (this.lis.eq(a).addClass("ui-state-disabled"), c.disabled.push(a), c.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[a], this.panels[a]))), this }, select: function (a) { a = this._getIndex(a); if (a == -1) if (this.options.collapsible && this.options.selected != -1) a = this.options.selected; else return this; return this.anchors.eq(a).trigger(this.options.event + ".tabs"), this }, load: function (b) { b = this._getIndex(b); var c = this, d = this.options, e = this.anchors.eq(b)[0], f = a.data(e, "load.tabs"); this.abort(); if (!f || this.element.queue("tabs").length !== 0 && a.data(e, "cache.tabs")) { this.element.dequeue("tabs"); return } this.lis.eq(b).addClass("ui-state-processing"); if (d.spinner) { var g = a("span", e); g.data("label.tabs", g.html()).html(d.spinner) } return this.xhr = a.ajax(a.extend({}, d.ajaxOptions, { url: f, success: function (f, g) { c.element.find(c._sanitizeSelector(e.hash)).html(f), c._cleanup(), d.cache && a.data(e, "cache.tabs", !0), c._trigger("load", null, c._ui(c.anchors[b], c.panels[b])); try { d.ajaxOptions.success(f, g) } catch (h) { } }, error: function (a, f, g) { c._cleanup(), c._trigger("load", null, c._ui(c.anchors[b], c.panels[b])); try { d.ajaxOptions.error(a, f, b, e) } catch (g) { } } })), c.element.dequeue("tabs"), this }, abort: function () { return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this }, url: function (a, b) { return this.anchors.eq(a).removeData("cache.tabs").data("load.tabs", b), this }, length: function () { return this.anchors.length } }), a.extend(a.ui.tabs, { version: "1.8.22" }), a.extend(a.ui.tabs.prototype, { rotation: null, rotate: function (a, b) { var c = this, d = this.options, e = c._rotate || (c._rotate = function (b) { clearTimeout(c.rotation), c.rotation = setTimeout(function () { var a = d.selected; c.select(++a < c.anchors.length ? a : 0) }, a), b && b.stopPropagation() }), f = c._unrotate || (c._unrotate = b ? function (a) { e() } : function (a) { a.clientX && c.rotate(null) }); return a ? (this.element.bind("tabsshow", e), this.anchors.bind(d.event + ".tabs", f), e()) : (clearTimeout(c.rotation), this.element.unbind("tabsshow", e), this.anchors.unbind(d.event + ".tabs", f), delete this._rotate, delete this._unrotate), this } }) })(jQuery); ; /*! jQuery UI - v1.8.22 - 2012-07-24
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.datepicker.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function ($, undefined) { function Datepicker() { this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = { closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: "" }, this._defaults = { showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1 }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) } function bindHover(a) { var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a"; return a.bind("mouseout", function (a) { var c = $(a.target).closest(b); if (!c.length) return; c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover") }).bind("mouseover", function (c) { var d = $(c.target).closest(b); if ($.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) || !d.length) return; d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), d.addClass("ui-state-hover"), d.hasClass("ui-datepicker-prev") && d.addClass("ui-datepicker-prev-hover"), d.hasClass("ui-datepicker-next") && d.addClass("ui-datepicker-next-hover") }) } function extendRemove(a, b) { $.extend(a, b); for (var c in b) if (b[c] == null || b[c] == undefined) a[c] = b[c]; return a } function isArray(a) { return a && ($.browser.safari && typeof a == "object" && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/)) } $.extend($.ui, { datepicker: { version: "1.8.22"} }); var PROP_NAME = "datepicker", dpuuid = (new Date).getTime(), instActive; $.extend(Datepicker.prototype, { markerClassName: "hasDatepicker", maxRows: 4, log: function () { this.debug && console.log.apply("", arguments) }, _widgetDatepicker: function () { return this.dpDiv }, setDefaults: function (a) { return extendRemove(this._defaults, a || {}), this }, _attachDatepicker: function (target, settings) { var inlineSettings = null; for (var attrName in this._defaults) { var attrValue = target.getAttribute("date:" + attrName); if (attrValue) { inlineSettings = inlineSettings || {}; try { inlineSettings[attrName] = eval(attrValue) } catch (err) { inlineSettings[attrName] = attrValue } } } var nodeName = target.nodeName.toLowerCase(), inline = nodeName == "div" || nodeName == "span"; target.id || (this.uuid += 1, target.id = "dp" + this.uuid); var inst = this._newInst($(target), inline); inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst) }, _newInst: function (a, b) { var c = a[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"); return { id: c, input: a, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: b, dpDiv: b ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv} }, _connectDatepicker: function (a, b) { var c = $(a); b.append = $([]), b.trigger = $([]); if (c.hasClass(this.markerClassName)) return; this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (a, c, d) { b.settings[c] = d }).bind("getData.datepicker", function (a, c) { return this._get(b, c) }), this._autoSize(b), $.data(a, PROP_NAME, b), b.settings.disabled && this._disableDatepicker(a) }, _attachments: function (a, b) { var c = this._get(b, "appendText"), d = this._get(b, "isRTL"); b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + "</span>"), a[d ? "before" : "after"](b.append)), a.unbind("focus", this._showDatepicker), b.trigger && b.trigger.remove(); var e = this._get(b, "showOn"); (e == "focus" || e == "both") && a.focus(this._showDatepicker); if (e == "button" || e == "both") { var f = this._get(b, "buttonText"), g = this._get(b, "buttonImage"); b.trigger = $(this._get(b, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({ src: g, alt: f, title: f }) : $('<button type="button"></button>').addClass(this._triggerClass).html(g == "" ? f : $("<img/>").attr({ src: g, alt: f, title: f }))), a[d ? "before" : "after"](b.trigger), b.trigger.click(function () { return $.datepicker._datepickerShowing && $.datepicker._lastInput == a[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != a[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(a[0])) : $.datepicker._showDatepicker(a[0]), !1 }) } }, _autoSize: function (a) { if (this._get(a, "autoSize") && !a.inline) { var b = new Date(2009, 11, 20), c = this._get(a, "dateFormat"); if (c.match(/[DM]/)) { var d = function (a) { var b = 0, c = 0; for (var d = 0; d < a.length; d++) a[d].length > b && (b = a[d].length, c = d); return c }; b.setMonth(d(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort"))), b.setDate(d(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay()) } a.input.attr("size", this._formatDate(a, b).length) } }, _inlineDatepicker: function (a, b) { var c = $(a); if (c.hasClass(this.markerClassName)) return; c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker", function (a, c, d) { b.settings[c] = d }).bind("getData.datepicker", function (a, c) { return this._get(b, c) }), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css("display", "block") }, _dialogDatepicker: function (a, b, c, d, e) { var f = this._dialogInst; if (!f) { this.uuid += 1; var g = "dp" + this.uuid; this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f) } extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null; if (!this._pos) { var h = document.documentElement.clientWidth, i = document.documentElement.clientHeight, j = document.documentElement.scrollLeft || document.body.scrollLeft, k = document.documentElement.scrollTop || document.body.scrollTop; this._pos = [h / 2 - 100 + j, i / 2 - 150 + k] } return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), f.settings.onSelect = c, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, f), this }, _destroyDatepicker: function (a) { var b = $(a), c = $.data(a, PROP_NAME); if (!b.hasClass(this.markerClassName)) return; var d = a.nodeName.toLowerCase(); $.removeData(a, PROP_NAME), d == "input" ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (d == "div" || d == "span") && b.removeClass(this.markerClassName).empty() }, _enableDatepicker: function (a) { var b = $(a), c = $.data(a, PROP_NAME); if (!b.hasClass(this.markerClassName)) return; var d = a.nodeName.toLowerCase(); if (d == "input") a.disabled = !1, c.trigger.filter("button").each(function () { this.disabled = !1 }).end().filter("img").css({ opacity: "1.0", cursor: "" }); else if (d == "div" || d == "span") { var e = b.children("." + this._inlineClass); e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled") } this._disabledInputs = $.map(this._disabledInputs, function (b) { return b == a ? null : b }) }, _disableDatepicker: function (a) { var b = $(a), c = $.data(a, PROP_NAME); if (!b.hasClass(this.markerClassName)) return; var d = a.nodeName.toLowerCase(); if (d == "input") a.disabled = !0, c.trigger.filter("button").each(function () { this.disabled = !0 }).end().filter("img").css({ opacity: "0.5", cursor: "default" }); else if (d == "div" || d == "span") { var e = b.children("." + this._inlineClass); e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled") } this._disabledInputs = $.map(this._disabledInputs, function (b) { return b == a ? null : b }), this._disabledInputs[this._disabledInputs.length] = a }, _isDisabledDatepicker: function (a) { if (!a) return !1; for (var b = 0; b < this._disabledInputs.length; b++) if (this._disabledInputs[b] == a) return !0; return !1 }, _getInst: function (a) { try { return $.data(a, PROP_NAME) } catch (b) { throw "Missing instance data for this datepicker" } }, _optionDatepicker: function (a, b, c) { var d = this._getInst(a); if (arguments.length == 2 && typeof b == "string") return b == "defaults" ? $.extend({}, $.datepicker._defaults) : d ? b == "all" ? $.extend({}, d.settings) : this._get(d, b) : null; var e = b || {}; typeof b == "string" && (e = {}, e[b] = c); if (d) { this._curInst == d && this._hideDatepicker(); var f = this._getDateDatepicker(a, !0), g = this._getMinMaxDate(d, "min"), h = this._getMinMaxDate(d, "max"); extendRemove(d.settings, e), g !== null && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), h !== null && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d) } }, _changeDatepicker: function (a, b, c) { this._optionDatepicker(a, b, c) }, _refreshDatepicker: function (a) { var b = this._getInst(a); b && this._updateDatepicker(b) }, _setDateDatepicker: function (a, b) { var c = this._getInst(a); c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c)) }, _getDateDatepicker: function (a, b) { var c = this._getInst(a); return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null }, _doKeyDown: function (a) { var b = $.datepicker._getInst(a.target), c = !0, d = b.dpDiv.is(".ui-datepicker-rtl"); b._keyEvent = !0; if ($.datepicker._datepickerShowing) switch (a.keyCode) { case 9: $.datepicker._hideDatepicker(), c = !1; break; case 13: var e = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", b.dpDiv); e[0] && $.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, e[0]); var f = $.datepicker._get(b, "onSelect"); if (f) { var g = $.datepicker._formatDate(b); f.apply(b.input ? b.input[0] : null, [g, b]) } else $.datepicker._hideDatepicker(); return !1; case 27: $.datepicker._hideDatepicker(); break; case 33: $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M"); break; case 34: $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M"); break; case 35: (a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target), c = a.ctrlKey || a.metaKey; break; case 36: (a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target), c = a.ctrlKey || a.metaKey; break; case 37: (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? 1 : -1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M"); break; case 38: (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, "D"), c = a.ctrlKey || a.metaKey; break; case 39: (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? -1 : 1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M"); break; case 40: (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, 7, "D"), c = a.ctrlKey || a.metaKey; break; default: c = !1 } else a.keyCode == 36 && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1; c && (a.preventDefault(), a.stopPropagation()) }, _doKeyPress: function (a) { var b = $.datepicker._getInst(a.target); if ($.datepicker._get(b, "constrainInput")) { var c = $.datepicker._possibleChars($.datepicker._get(b, "dateFormat")), d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode); return a.ctrlKey || a.metaKey || d < " " || !c || c.indexOf(d) > -1 } }, _doKeyUp: function (a) { var b = $.datepicker._getInst(a.target); if (b.input.val() != b.lastVal) try { var c = $.datepicker.parseDate($.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, $.datepicker._getFormatConfig(b)); c && ($.datepicker._setDateFromField(b), $.datepicker._updateAlternate(b), $.datepicker._updateDatepicker(b)) } catch (d) { $.datepicker.log(d) } return !0 }, _showDatepicker: function (a) { a = a.target || a, a.nodeName.toLowerCase() != "input" && (a = $("input", a.parentNode)[0]); if ($.datepicker._isDisabledDatepicker(a) || $.datepicker._lastInput == a) return; var b = $.datepicker._getInst(a); $.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._curInst.dpDiv.stop(!0, !0), b && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0])); var c = $.datepicker._get(b, "beforeShow"), d = c ? c.apply(a, [a, b]) : {}; if (d === !1) return; extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight); var e = !1; $(a).parents().each(function () { return e |= $(this).css("position") == "fixed", !e }), e && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop); var f = { left: $.datepicker._pos[0], top: $.datepicker._pos[1] }; $.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({ position: $.datepicker._inDialog && $.blockUI ? "static" : e ? "fixed" : "absolute", display: "none", left: f.left + "px", top: f.top + "px" }); if (!b.inline) { var g = $.datepicker._get(b, "showAnim"), h = $.datepicker._get(b, "duration"), i = function () { var a = b.dpDiv.find("iframe.ui-datepicker-cover"); if (!!a.length) { var c = $.datepicker._getBorders(b.dpDiv); a.css({ left: -c[0], top: -c[1], width: b.dpDiv.outerWidth(), height: b.dpDiv.outerHeight() }) } }; b.dpDiv.zIndex($(a).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[g] ? b.dpDiv.show(g, $.datepicker._get(b, "showOptions"), h, i) : b.dpDiv[g || "show"](g ? h : null, i), (!g || !h) && i(), b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus(), $.datepicker._curInst = b } }, _updateDatepicker: function (a) { var b = this; b.maxRows = 4; var c = $.datepicker._getBorders(a.dpDiv); instActive = a, a.dpDiv.empty().append(this._generateHTML(a)), this._attachHandlers(a); var d = a.dpDiv.find("iframe.ui-datepicker-cover"); !d.length || d.css({ left: -c[0], top: -c[1], width: a.dpDiv.outerWidth(), height: a.dpDiv.outerHeight() }), a.dpDiv.find("." + this._dayOverClass + " a").mouseover(); var e = this._getNumberOfMonths(a), f = e[1], g = 17; a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), f > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", g * f + "em"), a.dpDiv[(e[0] != 1 || e[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement && a.input.focus(); if (a.yearshtml) { var h = a.yearshtml; setTimeout(function () { h === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml), h = a.yearshtml = null }, 0) } }, _getBorders: function (a) { var b = function (a) { return { thin: 1, medium: 2, thick: 3}[a] || a }; return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))] }, _checkOffset: function (a, b, c) { var d = a.dpDiv.outerWidth(), e = a.dpDiv.outerHeight(), f = a.input ? a.input.outerWidth() : 0, g = a.input ? a.input.outerHeight() : 0, h = document.documentElement.clientWidth + (c ? 0 : $(document).scrollLeft()), i = document.documentElement.clientHeight + (c ? 0 : $(document).scrollTop()); return b.left -= this._get(a, "isRTL") ? d - f : 0, b.left -= c && b.left == a.input.offset().left ? $(document).scrollLeft() : 0, b.top -= c && b.top == a.input.offset().top + g ? $(document).scrollTop() : 0, b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0), b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0), b }, _findPos: function (a) { var b = this._getInst(a), c = this._get(b, "isRTL"); while (a && (a.type == "hidden" || a.nodeType != 1 || $.expr.filters.hidden(a))) a = a[c ? "previousSibling" : "nextSibling"]; var d = $(a).offset(); return [d.left, d.top] }, _hideDatepicker: function (a) { var b = this._curInst; if (!b || a && b != $.data(a, PROP_NAME)) return; if (this._datepickerShowing) { var c = this._get(b, "showAnim"), d = this._get(b, "duration"), e = function () { $.datepicker._tidyDialog(b) }; $.effects && $.effects[c] ? b.dpDiv.hide(c, $.datepicker._get(b, "showOptions"), d, e) : b.dpDiv[c == "slideDown" ? "slideUp" : c == "fadeIn" ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1; var f = this._get(b, "onClose"); f && f.apply(b.input ? b.input[0] : null, [b.input ? b.input.val() : "", b]), this._lastInput = null, this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1 } }, _tidyDialog: function (a) { a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar") }, _checkExternalClick: function (a) { if (!$.datepicker._curInst) return; var b = $(a.target), c = $.datepicker._getInst(b[0]); (b[0].id != $.datepicker._mainDivId && b.parents("#" + $.datepicker._mainDivId).length == 0 && !b.hasClass($.datepicker.markerClassName) && !b.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || b.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != c) && $.datepicker._hideDatepicker() }, _adjustDate: function (a, b, c) { var d = $(a), e = this._getInst(d[0]); if (this._isDisabledDatepicker(d[0])) return; this._adjustInstDate(e, b + (c == "M" ? this._get(e, "showCurrentAtPos") : 0), c), this._updateDatepicker(e) }, _gotoToday: function (a) { var b = $(a), c = this._getInst(b[0]); if (this._get(c, "gotoCurrent") && c.currentDay) c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear; else { var d = new Date; c.selectedDay = d.getDate(), c.drawMonth = c.selectedMonth = d.getMonth(), c.drawYear = c.selectedYear = d.getFullYear() } this._notifyChange(c), this._adjustDate(b) }, _selectMonthYear: function (a, b, c) { var d = $(a), e = this._getInst(d[0]); e["selected" + (c == "M" ? "Month" : "Year")] = e["draw" + (c == "M" ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d) }, _selectDay: function (a, b, c, d) { var e = $(a); if ($(d).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0])) return; var f = this._getInst(e[0]); f.selectedDay = f.currentDay = $("a", d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)) }, _clearDate: function (a) { var b = $(a), c = this._getInst(b[0]); this._selectDate(b, "") }, _selectDate: function (a, b) { var c = $(a), d = this._getInst(c[0]); b = b != null ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d); var e = this._get(d, "onSelect"); e ? e.apply(d.input ? d.input[0] : null, [b, d]) : d.input && d.input.trigger("change"), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], typeof d.input[0] != "object" && d.input.focus(), this._lastInput = null) }, _updateAlternate: function (a) { var b = this._get(a, "altField"); if (b) { var c = this._get(a, "altFormat") || this._get(a, "dateFormat"), d = this._getDate(a), e = this.formatDate(c, d, this._getFormatConfig(a)); $(b).each(function () { $(this).val(e) }) } }, noWeekends: function (a) { var b = a.getDay(); return [b > 0 && b < 6, ""] }, iso8601Week: function (a) { var b = new Date(a.getTime()); b.setDate(b.getDate() + 4 - (b.getDay() || 7)); var c = b.getTime(); return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1 }, parseDate: function (a, b, c) { if (a == null || b == null) throw "Invalid arguments"; b = typeof b == "object" ? b.toString() : b + ""; if (b == "") return null; var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff; d = typeof d != "string" ? d : (new Date).getFullYear() % 100 + parseInt(d, 10); var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = -1, j = -1, k = -1, l = -1, m = !1, n = function (b) { var c = s + 1 < a.length && a.charAt(s + 1) == b; return c && s++, c }, o = function (a) { var c = n(a), d = a == "@" ? 14 : a == "!" ? 20 : a == "y" && c ? 4 : a == "o" ? 3 : 2, e = new RegExp("^\\d{1," + d + "}"), f = b.substring(r).match(e); if (!f) throw "Missing number at position " + r; return r += f[0].length, parseInt(f[0], 10) }, p = function (a, c, d) { var e = $.map(n(a) ? d : c, function (a, b) { return [[b, a]] }).sort(function (a, b) { return -(a[1].length - b[1].length) }), f = -1; $.each(e, function (a, c) { var d = c[1]; if (b.substr(r, d.length).toLowerCase() == d.toLowerCase()) return f = c[0], r += d.length, !1 }); if (f != -1) return f + 1; throw "Unknown name at position " + r }, q = function () { if (b.charAt(r) != a.charAt(s)) throw "Unexpected literal at position " + r; r++ }, r = 0; for (var s = 0; s < a.length; s++) if (m) a.charAt(s) == "'" && !n("'") ? m = !1 : q(); else switch (a.charAt(s)) { case "d": k = o("d"); break; case "D": p("D", e, f); break; case "o": l = o("o"); break; case "m": j = o("m"); break; case "M": j = p("M", g, h); break; case "y": i = o("y"); break; case "@": var t = new Date(o("@")); i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate(); break; case "!": var t = new Date((o("!") - this._ticksTo1970) / 1e4); i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate(); break; case "'": n("'") ? q() : m = !0; break; default: q() } if (r < b.length) throw "Extra/unparsed characters found in date: " + b.substring(r); i == -1 ? i = (new Date).getFullYear() : i < 100 && (i += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (i <= d ? 0 : -100)); if (l > -1) { j = 1, k = l; do { var u = this._getDaysInMonth(i, j - 1); if (k <= u) break; j++, k -= u } while (!0) } var t = this._daylightSavingAdjust(new Date(i, j - 1, k)); if (t.getFullYear() != i || t.getMonth() + 1 != j || t.getDate() != k) throw "Invalid date"; return t }, ATOM: "yy-mm-dd", COOKIE: "D, dd M yy", ISO_8601: "yy-mm-dd", RFC_822: "D, d M y", RFC_850: "DD, dd-M-y", RFC_1036: "D, d M y", RFC_1123: "D, d M yy", RFC_2822: "D, d M yy", RSS: "D, d M y", TICKS: "!", TIMESTAMP: "@", W3C: "yy-mm-dd", _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7, formatDate: function (a, b, c) { if (!b) return ""; var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, e = (c ? c.dayNames : null) || this._defaults.dayNames, f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, g = (c ? c.monthNames : null) || this._defaults.monthNames, h = function (b) { var c = m + 1 < a.length && a.charAt(m + 1) == b; return c && m++, c }, i = function (a, b, c) { var d = "" + b; if (h(a)) while (d.length < c) d = "0" + d; return d }, j = function (a, b, c, d) { return h(a) ? d[b] : c[b] }, k = "", l = !1; if (b) for (var m = 0; m < a.length; m++) if (l) a.charAt(m) == "'" && !h("'") ? l = !1 : k += a.charAt(m); else switch (a.charAt(m)) { case "d": k += i("d", b.getDate(), 2); break; case "D": k += j("D", b.getDay(), d, e); break; case "o": k += i("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864e5), 3); break; case "m": k += i("m", b.getMonth() + 1, 2); break; case "M": k += j("M", b.getMonth(), f, g); break; case "y": k += h("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100; break; case "@": k += b.getTime(); break; case "!": k += b.getTime() * 1e4 + this._ticksTo1970; break; case "'": h("'") ? k += "'" : l = !0; break; default: k += a.charAt(m) } return k }, _possibleChars: function (a) { var b = "", c = !1, d = function (b) { var c = e + 1 < a.length && a.charAt(e + 1) == b; return c && e++, c }; for (var e = 0; e < a.length; e++) if (c) a.charAt(e) == "'" && !d("'") ? c = !1 : b += a.charAt(e); else switch (a.charAt(e)) { case "d": case "m": case "y": case "@": b += "0123456789"; break; case "D": case "M": return null; case "'": d("'") ? b += "'" : c = !0; break; default: b += a.charAt(e) } return b }, _get: function (a, b) { return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b] }, _setDateFromField: function (a, b) { if (a.input.val() == a.lastVal) return; var c = this._get(a, "dateFormat"), d = a.lastVal = a.input ? a.input.val() : null, e, f; e = f = this._getDefaultDate(a); var g = this._getFormatConfig(a); try { e = this.parseDate(c, d, g) || f } catch (h) { this.log(h), d = b ? "" : d } a.selectedDay = e.getDate(), a.drawMonth = a.selectedMonth = e.getMonth(), a.drawYear = a.selectedYear = e.getFullYear(), a.currentDay = d ? e.getDate() : 0, a.currentMonth = d ? e.getMonth() : 0, a.currentYear = d ? e.getFullYear() : 0, this._adjustInstDate(a) }, _getDefaultDate: function (a) { return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date)) }, _determineDate: function (a, b, c) { var d = function (a) { var b = new Date; return b.setDate(b.getDate() + a), b }, e = function (b) { try { return $.datepicker.parseDate($.datepicker._get(a, "dateFormat"), b, $.datepicker._getFormatConfig(a)) } catch (c) { } var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date, e = d.getFullYear(), f = d.getMonth(), g = d.getDate(), h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, i = h.exec(b); while (i) { switch (i[2] || "d") { case "d": case "D": g += parseInt(i[1], 10); break; case "w": case "W": g += parseInt(i[1], 10) * 7; break; case "m": case "M": f += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f)); break; case "y": case "Y": e += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f)) } i = h.exec(b) } return new Date(e, f, g) }, f = b == null || b === "" ? c : typeof b == "string" ? e(b) : typeof b == "number" ? isNaN(b) ? c : d(b) : new Date(b.getTime()); return f = f && f.toString() == "Invalid Date" ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0)), this._daylightSavingAdjust(f) }, _daylightSavingAdjust: function (a) { return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null }, _setDate: function (a, b, c) { var d = !b, e = a.selectedMonth, f = a.selectedYear, g = this._restrictMinMax(a, this._determineDate(a, b, new Date)); a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e != a.selectedMonth || f != a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a)) }, _getDate: function (a) { var b = !a.currentYear || a.input && a.input.val() == "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay)); return b }, _attachHandlers: function (a) { var b = this._get(a, "stepMonths"), c = "#" + a.id; a.dpDiv.find("[data-handler]").map(function () { var a = { prev: function () { window["DP_jQuery_" + dpuuid].datepicker._adjustDate(c, -b, "M") }, next: function () { window["DP_jQuery_" + dpuuid].datepicker._adjustDate(c, +b, "M") }, hide: function () { window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker() }, today: function () { window["DP_jQuery_" + dpuuid].datepicker._gotoToday(c) }, selectDay: function () { return window["DP_jQuery_" + dpuuid].datepicker._selectDay(c, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1 }, selectMonth: function () { return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(c, this, "M"), !1 }, selectYear: function () { return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(c, this, "Y"), !1 } }; $(this).bind(this.getAttribute("data-event"), a[this.getAttribute("data-handler")]) }) }, _generateHTML: function (a) { var b = new Date; b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate())); var c = this._get(a, "isRTL"), d = this._get(a, "showButtonPanel"), e = this._get(a, "hideIfNoPrevNext"), f = this._get(a, "navigationAsDateFormat"), g = this._getNumberOfMonths(a), h = this._get(a, "showCurrentAtPos"), i = this._get(a, "stepMonths"), j = g[0] != 1 || g[1] != 1, k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)), l = this._getMinMaxDate(a, "min"), m = this._getMinMaxDate(a, "max"), n = a.drawMonth - h, o = a.drawYear; n < 0 && (n += 12, o--); if (m) { var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate())); p = l && p < l ? l : p; while (this._daylightSavingAdjust(new Date(o, n, 1)) > p) n--, n < 0 && (n = 11, o--) } a.drawMonth = n, a.drawYear = o; var q = this._get(a, "prevText"); q = f ? this.formatDate(q, this._daylightSavingAdjust(new Date(o, n - i, 1)), this._getFormatConfig(a)) : q; var r = this._canAdjustMonth(a, -1, o, n) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>" : e ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>", s = this._get(a, "nextText"); s = f ? this.formatDate(s, this._daylightSavingAdjust(new Date(o, n + i, 1)), this._getFormatConfig(a)) : s; var t = this._canAdjustMonth(a, 1, o, n) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>" : e ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>", u = this._get(a, "currentText"), v = this._get(a, "gotoCurrent") && a.currentDay ? k : b; u = f ? this.formatDate(u, v, this._getFormatConfig(a)) : u; var w = a.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(a, "closeText") + "</button>", x = d ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? w : "") + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + u + "</button>" : "") + (c ? "" : w) + "</div>" : "", y = parseInt(this._get(a, "firstDay"), 10); y = isNaN(y) ? 0 : y; var z = this._get(a, "showWeek"), A = this._get(a, "dayNames"), B = this._get(a, "dayNamesShort"), C = this._get(a, "dayNamesMin"), D = this._get(a, "monthNames"), E = this._get(a, "monthNamesShort"), F = this._get(a, "beforeShowDay"), G = this._get(a, "showOtherMonths"), H = this._get(a, "selectOtherMonths"), I = this._get(a, "calculateWeek") || this.iso8601Week, J = this._getDefaultDate(a), K = ""; for (var L = 0; L < g[0]; L++) { var M = ""; this.maxRows = 4; for (var N = 0; N < g[1]; N++) { var O = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)), P = " ui-corner-all", Q = ""; if (j) { Q += '<div class="ui-datepicker-group'; if (g[1] > 1) switch (N) { case 0: Q += " ui-datepicker-group-first", P = " ui-corner-" + (c ? "right" : "left"); break; case g[1] - 1: Q += " ui-datepicker-group-last", P = " ui-corner-" + (c ? "left" : "right"); break; default: Q += " ui-datepicker-group-middle", P = "" } Q += '">' } Q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + P + '">' + (/all|left/.test(P) && L == 0 ? c ? t : r : "") + (/all|right/.test(P) && L == 0 ? c ? r : t : "") + this._generateMonthYearHeader(a, n, o, l, m, L > 0 || N > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>"; var R = z ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : ""; for (var S = 0; S < 7; S++) { var T = (S + y) % 7; R += "<th" + ((S + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + ">" + '<span title="' + A[T] + '">' + C[T] + "</span></th>" } Q += R + "</tr></thead><tbody>"; var U = this._getDaysInMonth(o, n); o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, U)); var V = (this._getFirstDayOfMonth(o, n) - y + 7) % 7, W = Math.ceil((V + U) / 7), X = j ? this.maxRows > W ? this.maxRows : W : W; this.maxRows = X; var Y = this._daylightSavingAdjust(new Date(o, n, 1 - V)); for (var Z = 0; Z < X; Z++) { Q += "<tr>"; var _ = z ? '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(Y) + "</td>" : ""; for (var S = 0; S < 7; S++) { var ba = F ? F.apply(a.input ? a.input[0] : null, [Y]) : [!0, ""], bb = Y.getMonth() != n, bc = bb && !H || !ba[0] || l && Y < l || m && Y > m; _ += '<td class="' + ((S + y + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (bb ? " ui-datepicker-other-month" : "") + (Y.getTime() == O.getTime() && n == a.selectedMonth && a._keyEvent || J.getTime() == Y.getTime() && J.getTime() == O.getTime() ? " " + this._dayOverClass : "") + (bc ? " " + this._unselectableClass + " ui-state-disabled" : "") + (bb && !G ? "" : " " + ba[1] + (Y.getTime() == k.getTime() ? " " + this._currentClass : "") + (Y.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!bb || G) && ba[2] ? ' title="' + ba[2] + '"' : "") + (bc ? "" : ' data-handler="selectDay" data-event="click" data-month="' + Y.getMonth() + '" data-year="' + Y.getFullYear() + '"') + ">" + (bb && !G ? "&#xa0;" : bc ? '<span class="ui-state-default">' + Y.getDate() + "</span>" : '<a class="ui-state-default' + (Y.getTime() == b.getTime() ? " ui-state-highlight" : "") + (Y.getTime() == k.getTime() ? " ui-state-active" : "") + (bb ? " ui-priority-secondary" : "") + '" href="#">' + Y.getDate() + "</a>") + "</td>", Y.setDate(Y.getDate() + 1), Y = this._daylightSavingAdjust(Y) } Q += _ + "</tr>" } n++, n > 11 && (n = 0, o++), Q += "</tbody></table>" + (j ? "</div>" + (g[0] > 0 && N == g[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), M += Q } K += M } return K += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), a._keyEvent = !1, K }, _generateMonthYearHeader: function (a, b, c, d, e, f, g, h) { var i = this._get(a, "changeMonth"), j = this._get(a, "changeYear"), k = this._get(a, "showMonthAfterYear"), l = '<div class="ui-datepicker-title">', m = ""; if (f || !i) m += '<span class="ui-datepicker-month">' + g[b] + "</span>"; else { var n = d && d.getFullYear() == c, o = e && e.getFullYear() == c; m += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">'; for (var p = 0; p < 12; p++) (!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' + (p == b ? ' selected="selected"' : "") + ">" + h[p] + "</option>"); m += "</select>" } k || (l += m + (f || !i || !j ? "&#xa0;" : "")); if (!a.yearshtml) { a.yearshtml = ""; if (f || !j) l += '<span class="ui-datepicker-year">' + c + "</span>"; else { var q = this._get(a, "yearRange").split(":"), r = (new Date).getFullYear(), s = function (a) { var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10); return isNaN(b) ? r : b }, t = s(q[0]), u = Math.max(t, s(q[1] || "")); t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) : u, a.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; for (; t <= u; t++) a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : "") + ">" + t + "</option>"; a.yearshtml += "</select>", l += a.yearshtml, a.yearshtml = null } } return l += this._get(a, "yearSuffix"), k && (l += (f || !i || !j ? "&#xa0;" : "") + m), l += "</div>", l }, _adjustInstDate: function (a, b, c) { var d = a.drawYear + (c == "Y" ? b : 0), e = a.drawMonth + (c == "M" ? b : 0), f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + (c == "D" ? b : 0), g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f))); a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c == "M" || c == "Y") && this._notifyChange(a) }, _restrictMinMax: function (a, b) { var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max"), e = c && b < c ? c : b; return e = d && e > d ? d : e, e }, _notifyChange: function (a) { var b = this._get(a, "onChangeMonthYear"); b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a]) }, _getNumberOfMonths: function (a) { var b = this._get(a, "numberOfMonths"); return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b }, _getMinMaxDate: function (a, b) { return this._determineDate(a, this._get(a, b + "Date"), null) }, _getDaysInMonth: function (a, b) { return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate() }, _getFirstDayOfMonth: function (a, b) { return (new Date(a, b, 1)).getDay() }, _canAdjustMonth: function (a, b, c, d) { var e = this._getNumberOfMonths(a), f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1)); return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f) }, _isInRange: function (a, b) { var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max"); return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime()) }, _getFormatConfig: function (a) { var b = this._get(a, "shortYearCutoff"); return b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), { shortYearCutoff: b, dayNamesShort: this._get(a, "dayNamesShort"), dayNames: this._get(a, "dayNames"), monthNamesShort: this._get(a, "monthNamesShort"), monthNames: this._get(a, "monthNames")} }, _formatDate: function (a, b, c, d) { b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear); var e = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay)); return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a)) } }), $.fn.datepicker = function (a) { if (!this.length) return this; $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0); var b = Array.prototype.slice.call(arguments, 1); return typeof a != "string" || a != "isDisabled" && a != "getDate" && a != "widget" ? a == "option" && arguments.length == 2 && typeof arguments[1] == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b)) : this.each(function () { typeof a == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this].concat(b)) : $.datepicker._attachDatepicker(this, a) }) : $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b)) }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.22", window["DP_jQuery_" + dpuuid] = $ })(jQuery);

/*
* Flexigrid for jQuery -  v1.1
*
* Copyright (c) 2008 Paulo P. Marinas (code.google.com/p/flexigrid/)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
*/
(function ($) {
    $.addFlex = function (t, p) {
        if (t.grid) return false; //return if already exist
        p = $.extend({ //apply default properties
            height: 200, //default height
            width: 'auto', //auto width
            striped: true, //apply odd even stripes
            novstripe: false,
            minwidth: 30, //min width of columns
            minheight: 80, //min height of columns
            resizable: true, //allow table resizing
            url: false, //URL if using data from AJAX
            method: 'POST', //data sending method
            dataType: 'xml', //type of data for AJAX, either xml or json
            errormsg: 'Connection Error',
            usepager: false,
            nowrap: true,
            page: 1, //current page
            total: 1, //total pages
            useRp: true, //use the results per page select box
            rp: 15, //results per page
            rpOptions: [10, 15, 20, 30, 50], //allowed per-page values 
            title: false,
            pagestat: 'Displaying {from} to {to} of {total} items',
            pagetext: 'Page',
            outof: 'of',
            findtext: 'Find',
            procmsg: 'Processing, please wait ...',
            query: '',
            qtype: '',
            nomsg: 'No items',
            minColToggle: 1, //minimum allowed column to be hidden
            showToggleBtn: true, //show or hide column toggle popup
            hideOnSubmit: true,
            autoload: true,
            blockOpacity: 0.5,
            preProcess: false,
            onDragCol: false,
            onToggleCol: false,
            onChangeSort: false,
            onSuccess: false,
            onError: false,
            onSubmit: false //using a custom populate function
        }, p);
        $(t).show() //show if hidden
			.attr({
			    cellPadding: 0,
			    cellSpacing: 0,
			    border: 0
			}) //remove padding and spacing
			.removeAttr('width'); //remove width properties
        //create grid class
        var g = {
            hset: {},
            rePosDrag: function () {
                var cdleft = 0 - this.hDiv.scrollLeft;
                if (this.hDiv.scrollLeft > 0) cdleft -= Math.floor(p.cgwidth / 2);
                $(g.cDrag).css({
                    top: g.hDiv.offsetTop + 1
                });
                var cdpad = this.cdpad;
                $('div', g.cDrag).hide();
                $('thead tr:first th:visible', this.hDiv).each(function () {
                    var n = $('thead tr:first th:visible', g.hDiv).index(this);
                    var cdpos = parseInt($('div', this).width());
                    if (cdleft == 0) cdleft -= Math.floor(p.cgwidth / 2);
                    cdpos = cdpos + cdleft + cdpad;
                    if (isNaN(cdpos)) {
                        cdpos = 0;
                    }
                    $('div:eq(' + n + ')', g.cDrag).css({
                        'left': cdpos + 'px'
                    }).show();
                    cdleft = cdpos;
                });
            },
            fixHeight: function (newH) {
                newH = false;
                if (!newH) newH = $(g.bDiv).height();
                var hdHeight = $(this.hDiv).height();
                $('div', this.cDrag).each(
					function () {
					    $(this).height(newH + hdHeight);
					}
				);
                var nd = parseInt($(g.nDiv).height());
                if (nd > newH) $(g.nDiv).height(newH).width(200);
                else $(g.nDiv).height('auto').width('auto');
                $(g.block).css({
                    height: newH,
                    marginBottom: (newH * -1)
                });
                var hrH = g.bDiv.offsetTop + newH;
                if (p.height != 'auto' && p.resizable) hrH = g.vDiv.offsetTop;
                $(g.rDiv).css({
                    height: hrH
                });
            },
            dragStart: function (dragtype, e, obj) { //default drag function start
                if (dragtype == 'colresize') {//column resize
                    $(g.nDiv).hide();
                    $(g.nBtn).hide();
                    var n = $('div', this.cDrag).index(obj);
                    var ow = $('th:visible div:eq(' + n + ')', this.hDiv).width();
                    $(obj).addClass('dragging').siblings().hide();
                    $(obj).prev().addClass('dragging').show();
                    this.colresize = {
                        startX: e.pageX,
                        ol: parseInt(obj.style.left),
                        ow: ow,
                        n: n
                    };
                    $('body').css('cursor', 'col-resize');
                } else if (dragtype == 'vresize') {//table resize
                    var hgo = false;
                    $('body').css('cursor', 'row-resize');
                    if (obj) {
                        hgo = true;
                        $('body').css('cursor', 'col-resize');
                    }
                    this.vresize = {
                        h: p.height,
                        sy: e.pageY,
                        w: p.width,
                        sx: e.pageX,
                        hgo: hgo
                    };
                } else if (dragtype == 'colMove') {//column header drag
                    $(g.nDiv).hide();
                    $(g.nBtn).hide();
                    this.hset = $(this.hDiv).offset();
                    this.hset.right = this.hset.left + $('table', this.hDiv).width();
                    this.hset.bottom = this.hset.top + $('table', this.hDiv).height();
                    this.dcol = obj;
                    this.dcoln = $('th', this.hDiv).index(obj);
                    this.colCopy = document.createElement("div");
                    this.colCopy.className = "colCopy";
                    this.colCopy.innerHTML = obj.innerHTML;
                    if ($.browser.msie) {
                        this.colCopy.className = "colCopy ie";
                    }
                    $(this.colCopy).css({
                        position: 'absolute',
                        display: 'none',
                        textAlign: obj.align
                    });
                    $('body').append(this.colCopy);
                    $(this.cDrag).hide();
                }
                $('body').noSelect();
            },
            dragMove: function (e) {
                if (this.colresize) {//column resize
                    var n = this.colresize.n;
                    var diff = e.pageX - this.colresize.startX;
                    var nleft = this.colresize.ol + diff;
                    var nw = this.colresize.ow + diff;
                    if (nw > p.minwidth) {
                        $('div:eq(' + n + ')', this.cDrag).css('left', nleft);
                        this.colresize.nw = nw;
                    }
                } else if (this.vresize) {//table resize
                    var v = this.vresize;
                    var y = e.pageY;
                    var diff = y - v.sy;
                    if (!p.defwidth) p.defwidth = p.width;
                    if (p.width != 'auto' && !p.nohresize && v.hgo) {
                        var x = e.pageX;
                        var xdiff = x - v.sx;
                        var newW = v.w + xdiff;
                        if (newW > p.defwidth) {
                            this.gDiv.style.width = newW + 'px';
                            p.width = newW;
                        }
                    }
                    var newH = v.h + diff;
                    if ((newH > p.minheight || p.height < p.minheight) && !v.hgo) {
                        this.bDiv.style.height = newH + 'px';
                        p.height = newH;
                        this.fixHeight(newH);
                    }
                    v = null;
                } else if (this.colCopy) {
                    $(this.dcol).addClass('thMove').removeClass('thOver');
                    if (e.pageX > this.hset.right || e.pageX < this.hset.left || e.pageY > this.hset.bottom || e.pageY < this.hset.top) {
                        //this.dragEnd();
                        $('body').css('cursor', 'move');
                    } else {
                        $('body').css('cursor', 'pointer');
                    }
                    $(this.colCopy).css({
                        top: e.pageY + 10,
                        left: e.pageX + 20,
                        display: 'block'
                    });
                }
            },
            dragEnd: function () {
                if (this.colresize) {
                    var n = this.colresize.n;
                    var nw = this.colresize.nw;
                    $('th:visible div:eq(' + n + ')', this.hDiv).css('width', nw);
                    $('tr', this.bDiv).each(
						function () {
						    $('td:visible div:eq(' + n + ')', this).css('width', nw);
						}
					);
                    this.hDiv.scrollLeft = this.bDiv.scrollLeft;
                    $('div:eq(' + n + ')', this.cDrag).siblings().show();
                    $('.dragging', this.cDrag).removeClass('dragging');
                    this.rePosDrag();
                    this.fixHeight();
                    this.colresize = false;
                } else if (this.vresize) {
                    this.vresize = false;
                } else if (this.colCopy) {
                    $(this.colCopy).remove();
                    if (this.dcolt != null) {
                        if (this.dcoln > this.dcolt) $('th:eq(' + this.dcolt + ')', this.hDiv).before(this.dcol);
                        else $('th:eq(' + this.dcolt + ')', this.hDiv).after(this.dcol);
                        this.switchCol(this.dcoln, this.dcolt);
                        $(this.cdropleft).remove();
                        $(this.cdropright).remove();
                        this.rePosDrag();
                        if (p.onDragCol) {
                            p.onDragCol(this.dcoln, this.dcolt);
                        }
                    }
                    this.dcol = null;
                    this.hset = null;
                    this.dcoln = null;
                    this.dcolt = null;
                    this.colCopy = null;
                    $('.thMove', this.hDiv).removeClass('thMove');
                    $(this.cDrag).show();
                }
                $('body').css('cursor', 'default');
                $('body').noSelect(false);
            },
            toggleCol: function (cid, visible) {
                var ncol = $("th[axis='col" + cid + "']", this.hDiv)[0];
                var n = $('thead th', g.hDiv).index(ncol);
                var cb = $('input[value=' + cid + ']', g.nDiv)[0];
                if (visible == null) {
                    visible = ncol.hidden;
                }
                if ($('input:checked', g.nDiv).length < p.minColToggle && !visible) {
                    return false;
                }
                if (visible) {
                    ncol.hidden = false;
                    $(ncol).show();
                    cb.checked = true;
                } else {
                    ncol.hidden = true;
                    $(ncol).hide();
                    cb.checked = false;
                }
                $('tbody tr', t).each(
					function () {
					    if (visible) {
					        $('td:eq(' + n + ')', this).show();
					    } else {
					        $('td:eq(' + n + ')', this).hide();
					    }
					}
				);
                this.rePosDrag();
                if (p.onToggleCol) {
                    p.onToggleCol(cid, visible);
                }
                return visible;
            },
            switchCol: function (cdrag, cdrop) { //switch columns
                $('tbody tr', t).each(
					function () {
					    if (cdrag > cdrop) $('td:eq(' + cdrop + ')', this).before($('td:eq(' + cdrag + ')', this));
					    else $('td:eq(' + cdrop + ')', this).after($('td:eq(' + cdrag + ')', this));
					}
				);
                //switch order in nDiv
                if (cdrag > cdrop) {
                    $('tr:eq(' + cdrop + ')', this.nDiv).before($('tr:eq(' + cdrag + ')', this.nDiv));
                } else {
                    $('tr:eq(' + cdrop + ')', this.nDiv).after($('tr:eq(' + cdrag + ')', this.nDiv));
                }
                if ($.browser.msie && $.browser.version < 7.0) {
                    $('tr:eq(' + cdrop + ') input', this.nDiv)[0].checked = true;
                }
                this.hDiv.scrollLeft = this.bDiv.scrollLeft;
            },
            scroll: function () {
                this.hDiv.scrollLeft = this.bDiv.scrollLeft;
                this.rePosDrag();
            },
            addData: function (data) { //parse data
                //data = $.extend({ rows: [], page: 0, total: 0 }, data);
                //build new body
                var tbody = document.createElement('tbody');
                $.each(data.rows, function (i, row) {
                    var tr = document.createElement('tr');
                    if (i % 2 && p.striped) {
                        tr.className = 'erow';
                    }
                    if (row.id) {
                        tr.id = 'row' + row.id;
                    }
                    $('thead tr:first th', g.hDiv).each( //add cell
						function () {
						    var td = document.createElement('td');
						    var idx = $(this).attr('axis').substr(3);
						    td.align = this.align;
						    // If the json elements aren't named (which is typical), use numeric order
						    if (typeof row.cell[idx] != "undefined") {
						        td.innerHTML = (row.cell[idx] != null) ? row.cell[idx] : ''; //null-check for Opera-browser
						    } else {
						        td.innerHTML = row.cell[p.colModel[idx].name];
						    }
						    $(td).attr('abbr', $(this).attr('abbr'));
						    $(tr).append(td);
						    td = null;
						}
					);
                    if ($('thead', this.gDiv).length < 1) {//handle if grid has no headers
                        for (idx = 0; idx < cell.length; idx++) {
                            var td = document.createElement('td');
                            // If the json elements aren't named (which is typical), use numeric order
                            if (typeof row.cell[idx] != "undefined") {
                                td.innerHTML = (row.cell[idx] != null) ? row.cell[idx] : ''; //null-check for Opera-browser
                            } else {
                                td.innerHTML = row.cell[p.colModel[idx].name];
                            }
                            $(tr).append(td);
                            td = null;
                        }
                    }
                    $(tbody).append(tr);
                    tr = null;
                });

                $('tr', t).unbind();
                $(t).empty();
                $(t).append(tbody);
                this.addCellProp();
                this.addRowProp();
                this.rePosDrag();
                tbody = null;
                data = null;
                i = null;
                if (p.onSuccess) {
                    p.onSuccess(this);
                }
                if (p.hideOnSubmit) {
                    $(g.block).remove();
                }
                this.hDiv.scrollLeft = this.bDiv.scrollLeft;
                if ($.browser.opera) {
                    $(t).css('visibility', 'visible');
                }
            },
            changeSort: function (th) { //change sortorder
                $(g.nDiv).hide();
                $(g.nBtn).hide();
                if (p.sortname == $(th).attr('abbr')) {
                    if (p.sortorder == 'asc') {
                        p.sortorder = 'desc';
                    } else {
                        p.sortorder = 'asc';
                    }
                }
                $(th).addClass('sorted').siblings().removeClass('sorted');
                $('.sdesc', this.hDiv).removeClass('sdesc');
                $('.sasc', this.hDiv).removeClass('sasc');
                $('div', th).addClass('s' + p.sortorder);
                if (!p.sortname) {
                    p.sortorder = 'asc';
                }
                p.sortname = $(th).attr('abbr');
                if (p.onChangeSort) {
                    p.onChangeSort(p.sortname, p.sortorder);
                } else {
                    this.populate();
                }
            },
            addCellProp: function () {
                $('tbody tr td', g.bDiv).each(function () {
                    var tdDiv = document.createElement('div');
                    var n = $('td', $(this).parent()).index(this);
                    var pth = $('th:eq(' + n + ')', g.hDiv).get(0);
                    if (pth != null) {
                        if (p.sortname == $(pth).attr('abbr') && p.sortname) {
                            this.className = 'sorted';
                        }
                        $(tdDiv).css({
                            textAlign: p.colModel[pth.cellIndex].align,
                            width: $('div:first', pth)[0].style.width
                        });
                        if (pth.hidden) {
                            $(this).css('display', 'none');
                        }
                    }
                    if (p.nowrap == false) {
                        $(tdDiv).css('white-space', 'normal');
                    }
                    if (this.innerHTML == '') {
                        this.innerHTML = '&nbsp;';
                    }
                    tdDiv.innerHTML = this.innerHTML;
                    var prnt = $(this).parent()[0];
                    var pid = false;
                    if (prnt.id) {
                        pid = prnt.id.substr(3);
                    }
                    if (pth != null) {
                        if (pth.process) pth.process(tdDiv, pid);
                    }
                    $(this).empty().append(tdDiv).removeAttr('width'); //wrap content
                });
            },
            getCellDim: function (obj) {// get cell prop for editable event
                var ht = parseInt($(obj).height());
                var pht = parseInt($(obj).parent().height());
                var wt = parseInt(obj.style.width);
                var pwt = parseInt($(obj).parent().width());
                var top = obj.offsetParent.offsetTop;
                var left = obj.offsetParent.offsetLeft;
                var pdl = parseInt($(obj).css('paddingLeft'));
                var pdt = parseInt($(obj).css('paddingTop'));
                return {
                    ht: ht,
                    wt: wt,
                    top: top,
                    left: left,
                    pdl: pdl,
                    pdt: pdt,
                    pht: pht,
                    pwt: pwt
                };
            },
            addRowProp: function () {
                $('tbody tr', g.bDiv).each(function () {
                    //					$(this).click(function (e) {
                    //						var obj = (e.target || e.srcElement);
                    //						if (obj.href || obj.type) return true;
                    //						$(this).toggleClass('trSelected');
                    //						if (p.singleSelect) $(this).siblings().removeClass('trSelected');
                    //					}).mousedown(function (e) {
                    //						if (e.shiftKey) {
                    //							$(this).toggleClass('trSelected');
                    //							g.multisel = true;
                    //							this.focus();
                    //							$(g.gDiv).noSelect();
                    //						}
                    //					}).mouseup(function () {
                    //						if (g.multisel) {
                    //							g.multisel = false;
                    //							$(g.gDiv).noSelect(false);
                    //						}
                    //					}).hover(function (e) {
                    //						if (g.multisel) {
                    //							$(this).toggleClass('trSelected');
                    //						}
                    //					}, function () {});
                    if ($.browser.msie && $.browser.version < 7.0) {
                        $(this).hover(function () {
                            $(this).addClass('trOver');
                        }, function () {
                            $(this).removeClass('trOver');
                        });
                    }
                });
            },
            pager: 0
        };
        if (p.colModel) { //create model if any
            thead = document.createElement('thead');
            var tr = document.createElement('tr');
            for (var i = 0; i < p.colModel.length; i++) {
                var cm = p.colModel[i];
                var th = document.createElement('th');
                th.innerHTML = cm.display;
                if (cm.name && cm.sortable) {
                    $(th).attr('abbr', cm.name);
                }
                $(th).attr('axis', 'col' + i);
                if (cm.align) {
                    th.align = "center";
                }
                if (cm.width) {
                    $(th).attr('width', cm.width);
                }
                if ($(cm).attr('hide')) {
                    th.hidden = true;
                }
                if (cm.process) {
                    th.process = cm.process;
                }
                $(tr).append(th);
            }
            $(thead).append(tr);
            $(t).prepend(thead);
        } // end if p.colmodel
        //init divs
        g.gDiv = document.createElement('div'); //create global container
        g.mDiv = document.createElement('div'); //create title container
        g.hDiv = document.createElement('div'); //create header container
        g.bDiv = document.createElement('div'); //create body container
        g.vDiv = document.createElement('div'); //create grip
        g.rDiv = document.createElement('div'); //create horizontal resizer
        g.cDrag = document.createElement('div'); //create column drag
        g.block = document.createElement('div'); //creat blocker
        g.nDiv = document.createElement('div'); //create column show/hide popup
        g.nBtn = document.createElement('div'); //create column show/hide button
        g.iDiv = document.createElement('div'); //create editable layer
        g.tDiv = document.createElement('div'); //create toolbar
        g.sDiv = document.createElement('div');
        g.pDiv = document.createElement('div'); //create pager container
        if (!p.usepager) {
            g.pDiv.style.display = 'none';
        }
        g.hTable = document.createElement('table');
        g.gDiv.className = 'flexigrid';
        if (p.width != 'auto') {
            g.gDiv.style.width = p.width + 'px';
        }
        //add conditional classes
        if ($.browser.msie) {
            $(g.gDiv).addClass('ie');
        }
        if (p.novstripe) {
            $(g.gDiv).addClass('novstripe');
        }
        $(t).before(g.gDiv);
        $(g.gDiv).append(t);
        //set toolbar
        g.hDiv.className = 'hDiv';
        $(t).before(g.hDiv);
        g.hTable.cellPadding = 0;
        g.hTable.cellSpacing = 0;
        $(g.hDiv).append('<div class="hDivBox"></div>');
        $('div', g.hDiv).append(g.hTable);
        var thead = $("thead:first", t).get(0);
        if (thead) $(g.hTable).append(thead);
        thead = null;
        if (!p.colmodel) var ci = 0;
        $('thead tr:first th', g.hDiv).each(function () {
            var thdiv = document.createElement('div');
            if ($(this).attr('abbr')) {
                $(this).click(function (e) {
                    if (!$(this).hasClass('thOver')) return false;
                    var obj = (e.target || e.srcElement);
                    if (obj.href || obj.type) return true;
                    g.changeSort(this);
                });
                if ($(this).attr('abbr') == p.sortname) {
                    this.className = 'sorted';
                    thdiv.className = 's' + p.sortorder;
                }
            }
            if (this.hidden) {
                $(this).hide();
            }
            if (!p.colmodel) {
                $(this).attr('axis', 'col' + ci++);
            }
            $(thdiv).css({
                textAlign: this.align,
                width: this.width + 'px'
            });
            thdiv.innerHTML = this.innerHTML;
            $(this).empty().append(thdiv).removeAttr('width');
//            $(this).empty().append(thdiv).removeAttr('width').mousedown(function (e) {
//                g.dragStart('colMove', e, this);
//            }).hover(function () {
//                if (!g.colresize && !$(this).hasClass('thMove') && !g.colCopy) {
//                    $(this).addClass('thOver');
//                }
//                if ($(this).attr('abbr') != p.sortname && !g.colCopy && !g.colresize && $(this).attr('abbr')) {
//                    $('div', this).addClass('s' + p.sortorder);
//                } else if ($(this).attr('abbr') == p.sortname && !g.colCopy && !g.colresize && $(this).attr('abbr')) {
//                    var no = (p.sortorder == 'asc') ? 'desc' : 'asc';
//                    $('div', this).removeClass('s' + p.sortorder).addClass('s' + no);
//                }
//                if (g.colCopy) {
//                    var n = $('th', g.hDiv).index(this);
//                    if (n == g.dcoln) {
//                        return false;
//                    }
//                    if (n < g.dcoln) {
//                        $(this).append(g.cdropleft);
//                    } else {
//                        $(this).append(g.cdropright);
//                    }
//                    g.dcolt = n;
//                } else if (!g.colresize) {
//                    var nv = $('th:visible', g.hDiv).index(this);
//                    var onl = parseInt($('div:eq(' + nv + ')', g.cDrag).css('left'));
//                    var nw = jQuery(g.nBtn).outerWidth();
//                    var nl = onl - nw + Math.floor(p.cgwidth / 2);
//                    $(g.nDiv).hide();
//                    $(g.nBtn).hide();
//                    $(g.nBtn).css({
//                        'left': nl,
//                        top: g.hDiv.offsetTop
//                    }).show();
//                    var ndw = parseInt($(g.nDiv).width());
//                    $(g.nDiv).css({
//                        top: g.bDiv.offsetTop
//                    });
//                    if ((nl + ndw) > $(g.gDiv).width()) {
//                        $(g.nDiv).css('left', onl - ndw + 1);
//                    } else {
//                        $(g.nDiv).css('left', nl);
//                    }
//                    if ($(this).hasClass('sorted')) {
//                        $(g.nBtn).addClass('srtd');
//                    } else {
//                        $(g.nBtn).removeClass('srtd');
//                    }
//                }
//            }, function () {
//                $(this).removeClass('thOver');
//                if ($(this).attr('abbr') != p.sortname) {
//                    $('div', this).removeClass('s' + p.sortorder);
//                } else if ($(this).attr('abbr') == p.sortname) {
//                    var no = (p.sortorder == 'asc') ? 'desc' : 'asc';
//                    $('div', this).addClass('s' + p.sortorder).removeClass('s' + no);
//                }
//                if (g.colCopy) {
//                    $(g.cdropleft).remove();
//                    $(g.cdropright).remove();
//                    g.dcolt = null;
//                }
//            }); //wrap content
        });
        //set bDiv
        g.bDiv.className = 'bDiv';
        $(t).before(g.bDiv);
        $(g.bDiv).css({
            height: (p.height == 'auto') ? 'auto' : p.height + "px"
        }).scroll(function (e) {
            g.scroll()
        }).append(t);
        if (p.height == 'auto') {
            $('table', g.bDiv).addClass('autoht');
        }
        //add td & row properties
        g.addCellProp();
        g.addRowProp();
        //set cDrag
        //var cdcol = $('thead tr:first th:first', g.hDiv).get(0);
//        if (cdcol != null) {
//            g.cDrag.className = 'cDrag';
//            g.cdpad = 0;
//            g.cdpad += (isNaN(parseInt($('div', cdcol).css('borderLeftWidth'))) ? 0 : parseInt($('div', cdcol).css('borderLeftWidth')));
//            g.cdpad += (isNaN(parseInt($('div', cdcol).css('borderRightWidth'))) ? 0 : parseInt($('div', cdcol).css('borderRightWidth')));
//            g.cdpad += (isNaN(parseInt($('div', cdcol).css('paddingLeft'))) ? 0 : parseInt($('div', cdcol).css('paddingLeft')));
//            g.cdpad += (isNaN(parseInt($('div', cdcol).css('paddingRight'))) ? 0 : parseInt($('div', cdcol).css('paddingRight')));
//            g.cdpad += (isNaN(parseInt($(cdcol).css('borderLeftWidth'))) ? 0 : parseInt($(cdcol).css('borderLeftWidth')));
//            g.cdpad += (isNaN(parseInt($(cdcol).css('borderRightWidth'))) ? 0 : parseInt($(cdcol).css('borderRightWidth')));
//            g.cdpad += (isNaN(parseInt($(cdcol).css('paddingLeft'))) ? 0 : parseInt($(cdcol).css('paddingLeft')));
//            g.cdpad += (isNaN(parseInt($(cdcol).css('paddingRight'))) ? 0 : parseInt($(cdcol).css('paddingRight')));
//            $(g.bDiv).before(g.cDrag);
//            var cdheight = $(g.bDiv).height();
//            var hdheight = $(g.hDiv).height();
//            $(g.cDrag).css({
//                top: -hdheight + 'px'
//            });
//            $('thead tr:first th', g.hDiv).each(function () {
//                var cgDiv = document.createElement('div');
//                $(g.cDrag).append(cgDiv);
//                if (!p.cgwidth) {
//                    p.cgwidth = $(cgDiv).width();
//                }
//                $(cgDiv).css({
//                    height: cdheight + hdheight
//                }).mousedown(function (e) {
//                    g.dragStart('colresize', e, this);
//                });
//                if ($.browser.msie && $.browser.version < 7.0) {
//                    g.fixHeight($(g.gDiv).height());
//                    $(cgDiv).hover(function () {
//                        g.fixHeight();
//                        $(this).addClass('dragging')
//                    }, function () {
//                        if (!g.colresize) $(this).removeClass('dragging')
//                    });
//                }
//            });
//        }
        //add strip
        if (p.striped) {
            $('tbody tr:odd', g.bDiv).addClass('erow');
        }
        if (p.resizable && p.height != 'auto') {
            g.vDiv.className = 'vGrip';
            $(g.vDiv).mousedown(function (e) {
                g.dragStart('vresize', e)
            }).html('<span></span>');
            $(g.bDiv).after(g.vDiv);
        }
        if (p.resizable && p.width != 'auto' && !p.nohresize) {
            g.rDiv.className = 'hGrip';
            $(g.rDiv).mousedown(function (e) {
                g.dragStart('vresize', e, true);
            }).html('<span></span>').css('height', $(g.gDiv).height());
            if ($.browser.msie && $.browser.version < 7.0) {
                $(g.rDiv).hover(function () {
                    $(this).addClass('hgOver');
                }, function () {
                    $(this).removeClass('hgOver');
                });
            }
            $(g.gDiv).append(g.rDiv);
        }
        // add pager
        if (p.usepager) {
            g.pDiv.className = 'paging-frame pDiv';
            g.pDiv.innerHTML = '<div class="pDiv2"></div>';
            $(g.bDiv).after(g.pDiv);
        }
        $(g.pDiv, g.sDiv).append("<div style='clear:both'></div>");
        // add title
        if (p.title) {
            g.mDiv.className = 'mDiv';
            g.mDiv.innerHTML = '<div class="ftitle">' + p.title + '</div>';
            $(g.gDiv).prepend(g.mDiv);
            if (p.showTableToggleBtn) {
                $(g.mDiv).append('<div class="ptogtitle" title="Minimize/Maximize Table"><span></span></div>');
                $('div.ptogtitle', g.mDiv).click(function () {
                    $(g.gDiv).toggleClass('hideBody');
                    $(this).toggleClass('vsble');
                });
            }
        }
        //setup cdrops
        g.cdropleft = document.createElement('span');
        g.cdropleft.className = 'cdropleft';
        g.cdropright = document.createElement('span');
        g.cdropright.className = 'cdropright';
        //add block
        g.block.className = 'gBlock';
        var gh = $(g.bDiv).height();
        var gtop = g.bDiv.offsetTop;
        $(g.block).css({
            width: g.bDiv.style.width,
            height: gh,
            background: 'white',
            position: 'relative',
            marginBottom: (gh * -1),
            zIndex: 1,
            top: gtop,
            left: '0px'
        });
        $(g.block).fadeTo(0, p.blockOpacity);
        // add column control
        if ($('th', g.hDiv).length) {
            g.nDiv.className = 'nDiv';
            g.nDiv.innerHTML = "<table cellpadding='0' cellspacing='0'><tbody></tbody></table>";
            $(g.nDiv).css({
                marginBottom: (gh * -1),
                display: 'none',
                top: gtop
            }).noSelect();
            var cn = 0;
            $('th div', g.hDiv).each(function () {
                var kcol = $("th[axis='col" + cn + "']", g.hDiv)[0];
                var chk = 'checked="checked"';
                if (kcol.style.display == 'none') {
                    chk = '';
                }
                $('tbody', g.nDiv).append('<tr><td class="ndcol1"><input type="checkbox" ' + chk + ' class="togCol" value="' + cn + '" /></td><td class="ndcol2">' + this.innerHTML + '</td></tr>');
                cn++;
            });
            if ($.browser.msie && $.browser.version < 7.0) $('tr', g.nDiv).hover(function () {
                $(this).addClass('ndcolover');
            }, function () {
                $(this).removeClass('ndcolover');
            });
            $('td.ndcol2', g.nDiv).click(function () {
                if ($('input:checked', g.nDiv).length <= p.minColToggle && $(this).prev().find('input')[0].checked) return false;
                return g.toggleCol($(this).prev().find('input').val());
            });
            $('input.togCol', g.nDiv).click(function () {
                if ($('input:checked', g.nDiv).length < p.minColToggle && this.checked == false) return false;
                $(this).parent().next().trigger('click');
            });
            $(g.gDiv).prepend(g.nDiv);
//            $(g.nBtn).addClass('nBtn')
//				.html('<div></div>')
//				.attr('title', 'Hide/Show Columns')
//				.click(function () {
//				    $(g.nDiv).toggle();
//				    return true;
//				}
//			);
            if (p.showToggleBtn) {
                $(g.gDiv).prepend(g.nBtn);
            }
        }
        // add date edit layer
        $(g.iDiv).addClass('iDiv').css({
            display: 'none'
        });
        $(g.bDiv).append(g.iDiv);
        // add flexigrid events
        $(g.bDiv).hover(function () {
            $(g.nDiv).hide();
            $(g.nBtn).hide();
        }, function () {
            if (g.multisel) {
                g.multisel = false;
            }
        });
        $(g.gDiv).hover(function () { }, function () {
            $(g.nDiv).hide();
            $(g.nBtn).hide();
        });
        //add document events
        $(document).mousemove(function (e) {
            g.dragMove(e)
        }).mouseup(function (e) {
            g.dragEnd()
        }).hover(function () { }, function () {
            g.dragEnd()
        });
        //browser adjustments
        if ($.browser.msie && $.browser.version < 7.0) {
            $('.hDiv,.bDiv,.mDiv,.pDiv,.vGrip,.tDiv, .sDiv', g.gDiv).css({
                width: '100%'
            });
            $(g.gDiv).addClass('ie6');
            if (p.width != 'auto') {
                $(g.gDiv).addClass('ie6fullwidthbug');
            }
        }
        g.rePosDrag();
        g.fixHeight();
        //make grid functions accessible
        t.p = p;
        t.grid = g;
        // load data
        if (p.url && p.autoload) {
            g.populate();
        }
        return t;
    };
    var docloaded = false;
    $(document).ready(function () {
        docloaded = true
    });
    $.fn.flexigrid = function (p) {
        return this.each(function () {
            if (!docloaded) {
                $(this).hide();
                var t = this;
                $(document).ready(function () {
                    $.addFlex(t, p);
                });
            } else {
                $.addFlex(this, p);
            }
        });
    }; //end flexigrid
    $.fn.flexReload = function (p) { // function to reload grid
        return this.each(function () {
            if (this.grid && this.p.url) this.grid.populate();
        });
    }; //end flexReload
    $.fn.flexOptions = function (p) { //function to update general options
        return this.each(function () {
            if (this.grid) $.extend(this.p, p);
        });
    }; //end flexOptions
    $.fn.flexToggleCol = function (cid, visible) { // function to reload grid
        return this.each(function () {
            if (this.grid) this.grid.toggleCol(cid, visible);
        });
    }; //end flexToggleCol
    $.fn.flexAddData = function (data) { // function to add data to grid
        return this.each(function () {
            if (this.grid) this.grid.addData(data);
        });
    };
    $.fn.noSelect = function (p) { //no select plugin by me :-)
        var prevent = (p == null) ? true : p;
        if (prevent) {
            return this.each(function () {
                if ($.browser.msie || $.browser.safari) $(this).bind('selectstart', function () {
                    return false;
                });
                else if ($.browser.mozilla) {
                    $(this).css('MozUserSelect', 'none');
                    $('body').trigger('focus');
                } else if ($.browser.opera) $(this).bind('mousedown', function () {
                    return false;
                });
                else $(this).attr('unselectable', 'on');
            });
        } else {
            return this.each(function () {
                if ($.browser.msie || $.browser.safari) $(this).unbind('selectstart');
                else if ($.browser.mozilla) $(this).css('MozUserSelect', 'inherit');
                else if ($.browser.opera) $(this).unbind('mousedown');
                else $(this).removeAttr('unselectable', 'on');
            });
        }
    }; //end noSelect
})(jQuery);

/*
 * jQuery Tooltip plugin 1.3
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-tooltip/
 * http://docs.jquery.com/Plugins/Tooltip
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.tooltip.js 5741 2008-06-21 15:22:16Z joern.zaefferer $
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
 
;(function($) {
	
		// the tooltip element
	var helper = {},
		// the current tooltipped element
		current,
		// the title of the current element, used for restoring
		title,
		// timeout id for delayed tooltips
		tID,
		// IE 5.5 or 6
		IE = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent),
		// flag for mouse tracking
		track = false;
	
	$.tooltip = {
		blocked: false,
		defaults: {
			delay: 200,
			fade: false,
			showURL: true,
			extraClass: "",
			top: 15,
			left: 15,
			id: "tooltip"
		},
		block: function() {
			$.tooltip.blocked = !$.tooltip.blocked;
		}
	};
	
	$.fn.extend({
		tooltip: function(settings) {
			settings = $.extend({}, $.tooltip.defaults, settings);
			createHelper(settings);
			return this.each(function() {
					$.data(this, "tooltip", settings);
					this.tOpacity = helper.parent.css("opacity");
					// copy tooltip into its own expando and remove the title
					this.tooltipText = this.title;
					$(this).removeAttr("title");
					// also remove alt attribute to prevent default tooltip in IE
					this.alt = "";
				})
				.mouseover(save)
				.mouseout(hide)
				.click(hide);
		},
		fixPNG: IE ? function() {
			return this.each(function () {
				var image = $(this).css('backgroundImage');
				if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
					image = RegExp.$1;
					$(this).css({
						'backgroundImage': 'none',
						'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
					}).each(function () {
						var position = $(this).css('position');
						if (position != 'absolute' && position != 'relative')
							$(this).css('position', 'relative');
					});
				}
			});
		} : function() { return this; },
		unfixPNG: IE ? function() {
			return this.each(function () {
				$(this).css({'filter': '', backgroundImage: ''});
			});
		} : function() { return this; },
		hideWhenEmpty: function() {
			return this.each(function() {
				$(this)[ $(this).html() ? "show" : "hide" ]();
			});
		},
		url: function() {
			return this.attr('href') || this.attr('src');
		}
	});
	
	function createHelper(settings) {
		// there can be only one tooltip helper
		if( helper.parent )
			return;
		// create the helper, h3 for title, div for url
		helper.parent = $('<div id="' + settings.id + '"><h3></h3><div class="body"></div><div class="url"></div></div>')
			// add to document
			.appendTo(document.body)
			// hide it at first
			.hide();
			
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			helper.parent.bgiframe();
		
		// save references to title and url elements
		helper.title = $('h3', helper.parent);
		helper.body = $('div.body', helper.parent);
		helper.url = $('div.url', helper.parent);
	}
	
	function settings(element) {
		return $.data(element, "tooltip");
	}
	
	// main event handler to start showing tooltips
	function handle(event) {
		// show helper, either with timeout or on instant
		if( settings(this).delay )
			tID = setTimeout(show, settings(this).delay);
		else
			show();
		
		// if selected, update the helper position when the mouse moves
		track = !!settings(this).track;
		$(document.body).bind('mousemove', update);
			
		// update at least once
		update(event);
	}
	
	// save elements title before the tooltip is displayed
	function save() {
		// if this is the current source, or it has no title (occurs with click event), stop
		if ( $.tooltip.blocked || this == current || (!this.tooltipText && !settings(this).bodyHandler) )
			return;

		// save current
		current = this;
		title = this.tooltipText;
		
		if ( settings(this).bodyHandler ) {
			helper.title.hide();
			var bodyContent = settings(this).bodyHandler.call(this);
			if (bodyContent.nodeType || bodyContent.jquery) {
				helper.body.empty().append(bodyContent)
			} else {
				helper.body.html( bodyContent );
			}
			helper.body.show();
		} else if ( settings(this).showBody ) {
			var parts = title.split(settings(this).showBody);
			helper.title.html(parts.shift()).show();
			helper.body.empty();
			for(var i = 0, part; (part = parts[i]); i++) {
				if(i > 0)
					helper.body.append("<br/>");
				helper.body.append(part);
			}
			helper.body.hideWhenEmpty();
		} else {
			helper.title.html(title).show();
			helper.body.hide();
		}
		
		// if element has href or src, add and show it, otherwise hide it
		if( settings(this).showURL && $(this).url() )
			helper.url.html( $(this).url().replace('http://', '') ).show();
		else 
			helper.url.hide();
		
		// add an optional class for this tip
		helper.parent.addClass(settings(this).extraClass);

		// fix PNG background for IE
		if (settings(this).fixPNG )
			helper.parent.fixPNG();
			
		handle.apply(this, arguments);
	}
	
	// delete timeout and show helper
	function show() {
		tID = null;
		if ((!IE || !$.fn.bgiframe) && settings(current).fade) {
			if (helper.parent.is(":animated"))
				helper.parent.stop().show().fadeTo(settings(current).fade, current.tOpacity);
			else
				helper.parent.is(':visible') ? helper.parent.fadeTo(settings(current).fade, current.tOpacity) : helper.parent.fadeIn(settings(current).fade);
		} else {
			helper.parent.show();
		}
		update();
	}
	
	/**
	 * callback for mousemove
	 * updates the helper position
	 * removes itself when no current element
	 */
	function update(event)	{
		if($.tooltip.blocked)
			return;
		
		if (event && event.target.tagName == "OPTION") {
			return;
		}
		
		// stop updating when tracking is disabled and the tooltip is visible
		if ( !track && helper.parent.is(":visible")) {
			$(document.body).unbind('mousemove', update)
		}
		
		// if no current element is available, remove this listener
		if( current == null ) {
			$(document.body).unbind('mousemove', update);
			return;	
		}
		
		// remove position helper classes
		helper.parent.removeClass("viewport-right").removeClass("viewport-bottom");
		
		var left = helper.parent[0].offsetLeft;
		var top = helper.parent[0].offsetTop;
		if (event) {
			// position the helper 15 pixel to bottom right, starting from mouse position
			left = event.pageX + settings(current).left;
			top = event.pageY + settings(current).top;
			var right='auto';
			if (settings(current).positionLeft) {
				right = $(window).width() - left;
				left = 'auto';
			}
			helper.parent.css({
				left: left,
				right: right,
				top: top
			});
		}
		
		var v = viewport(),
			h = helper.parent[0];
		// check horizontal position
		if (v.x + v.cx < h.offsetLeft + h.offsetWidth) {
			left -= h.offsetWidth + 20 + settings(current).left;
			helper.parent.css({left: left + 'px'}).addClass("viewport-right");
		}
		// check vertical position
		if (v.y + v.cy < h.offsetTop + h.offsetHeight) {
			top -= h.offsetHeight + 20 + settings(current).top;
			helper.parent.css({top: top + 'px'}).addClass("viewport-bottom");
		}
	}
	
	function viewport() {
		return {
			x: $(window).scrollLeft(),
			y: $(window).scrollTop(),
			cx: $(window).width(),
			cy: $(window).height()
		};
	}
	
	// hide helper and restore added classes and the title
	function hide(event) {
		if($.tooltip.blocked)
			return;
		// clear timeout if possible
		if(tID)
			clearTimeout(tID);
		// no more current element
		current = null;
		
		var tsettings = settings(this);
		function complete() {
			helper.parent.removeClass( tsettings.extraClass ).hide().css("opacity", "");
		}
		if ((!IE || !$.fn.bgiframe) && tsettings.fade) {
			if (helper.parent.is(':animated'))
				helper.parent.stop().fadeTo(tsettings.fade, 0, complete);
			else
				helper.parent.stop().fadeOut(tsettings.fade, complete);
		} else
			complete();
		
		if( settings(this).fixPNG )
			helper.parent.unfixPNG();
	}
	
})(jQuery);


/*
* arkec.corecom.datastruct v1.0.0
*/
(function (window) {

    window.datastruct = {};

    /* 
    -----数据字典(key/value)结构----- 
    */
    datastruct.dictionary = function () {
        var obj = new datastruct.dictionary.fn.init();
        return obj;
    };
    datastruct.dictionary.fn = {

        /* 构造函数 */
        init: function () {

            /* 对象属性 */
            this.count = 0;
            this.arrKeys = new Array();
            this.arrValues = new Array();
            /*-------------------------------*/
        },

        /* 添加或修改元素 */
        setItem: function (key, value) {

            if (!this.containKey(key)) {
                this.arrKeys[this.count] = key;
                this.arrValues[this.count] = value;
                this.count++;
            }
            else {
                var index = this._getElementIndex(key);
                if (index > -1) {
                    this.arrKeys[index] = key;
                    this.arrValues[index] = value;
                }
            }
        },

        /* 删除元素 */
        removeItem: function (key) {
            var index = this._getElementIndex(key);

            if (index > -1) {
                this.arrKeys.splice(index, 1);
                this.arrValues.splice(index, 1);
                this.count--;
            }
        },

        /* 获取元素 */
        getItem: function (key) {
            var kvalue = null;

            var index = this._getElementIndex(key);
            if (index > -1) {
                kvalue = this.arrValues[index];
            }

            return kvalue;
        },

        /* 获取元素键值对 */
        getKeyValueItem: function (index) {
            var keyvalueItem = {};
            if (index > -1) {
                keyvalueItem.key = this.arrKeys[index];
                keyvalueItem.value = this.arrValues[index];
            }

            return keyvalueItem;
        },

        /* 清理所有元素 */
        clear: function () {
            if (this.count != 0) {
                this.arrKeys.splice(0, this.count);
                this.arrValues.splice(0, this.count);
                this.count = 0;
            }
        },

        /* 检测是否包含key */
        containKey: function (key) {
            var isContain = false;

            if (this._getElementIndex(key) > -1) {
                isContain = true;
            }

            return isContain;
        },

        /* 获取元素索引序号 */
        _getElementIndex: function (key) {
            var index = -1;

            var i;
            for (i = 0; i < this.arrKeys.length; i++) {
                if (this.arrKeys[i] == key) {
                    index = i;
                    break;
                }
            }

            return index;
        }
    };
    datastruct.dictionary.fn.init.prototype = datastruct.dictionary.fn;
    /*-------------------------------*/

    /* 
    -----数据结构转换类----- 
    */
    datastruct.convertion = {

        /* string转化为object */
        strToObject: function (str) {
            var jsonObj;

            if (typeof (str) == "string") {
                /* json的字符串数据 */
                if (str.indexOf("{") > -1 || str.indexOf("[") > -1) {
                    str = str.replaceAll(/\r\n/gi, "");

                    try{
                        eval("jsonObj = " + str + ";");

                        /* 数据字典 */
                        if (jsonObj.struct && jsonObj.struct == "dictionary") {
                            var dict = new datastruct.dictionary();
                            for (var i = 0; i < jsonObj.items.length; i++) {
                                var itemObj = jsonObj.items[i];
                                dict.setItem(itemObj.key, itemObj.value);
                            }

                            jsonObj = dict;
                        }
                    }
                    catch(e){
                        jsonObj = str;
                    }
                }
                else {
                    jsonObj = str;
                }
            }
            else {
                jsonObj = str;
            }

            return jsonObj;
        },

        /* 用js对象来填充业务对象 */
        fillToBizObj: function (obj, bizObj) {
            for (var prop in bizObj) {
                if (obj[prop]) {
                    bizObj[prop] = obj[prop];
                }
            }
        },

        /* 用js对象来填充业务对象 */
        fillToObj: function (obj, bizObj) {
            for (var prop in bizObj) {
                bizObj[prop] = obj[prop];
            }
        },

        /* object转化为string */
        objectToStr: function (obj) {
            var retStr = "";
            var ret = [];

            //不支持函数类型
            if (typeof (obj) == "function") {
                return;
            }

            //数组转换
            if (obj instanceof Array) {
                var len = obj.length;
                for (var i = 0; i < len; i++) {
                    if (obj[i]) {
                        ret.push(datastruct.convertion.objectToStr(obj[i]));
                    }
                }

                retStr = "[" + ret.join(",") + "]";
            }
            //数据字典dictionary转换
            else if (obj instanceof datastruct.dictionary.fn.init) {
                for (var i = 0; i < obj.count; i++) {

                    var keyvalueItem = obj.getKeyValueItem(i);

                    ret.push("{ key: '" + keyvalueItem.key + "', value: " + datastruct.convertion.objectToStr(keyvalueItem.value) + " }");
                }

                retStr = "{ struct: 'dictionary', items: [" + ret.join(",") + "] }";
            }
            //值类型转换
            else if (typeof (obj) != "object") {
                if (typeof (obj) == "string" && obj.indexOf("'") > -1) {
                    retStr = "\"" + obj + "\"";
                }
                else {
                    retStr = "'" + obj + "'";
                }
            }
            //对象转换
            else {
                for (var item in obj) {
                    var m_value = obj[item];
                    if (typeof (m_value) == "string" || m_value) {
                        m_value = datastruct.convertion.objectToStr(m_value);
                        if (m_value) {
                            ret.push(item + ":" + m_value);
                        }
                    }
                }
                retStr = "{" + ret.join(",") + "}";
            }

            return retStr;
        },

        /* string转化为html */
        strToHtml: function (str) {
            str = str.replace(/\n/g, "<br/>");
            str = str.replace(/\r/g, "");
            str = str.replace(/\s/g, "&nbsp;");

            return str;
        },

        /* html转化为string */
        htmlToStr: function (html) {
            html = html.replace(/\<br\/\>/g, "\n");
            html = html.replace(/&nbsp;/g, " ");

            return html;
        },

        /* 数据表转换为json */
        tableToJson: function (tableSource) {

            var m_dataSource = [];

            if (tableSource) {
                $.each(tableSource.Rows, function () {

                    var rowItem = this;
                    var m_keyvalue;
                    var itemObj = {};

                    var m_idx = 0;
                    $.each(tableSource.TableColumns, function () {

                        itemObj[this] = rowItem[m_idx];
                        m_idx++;
                    });

                    m_dataSource.push(itemObj);
                });
            }

            return m_dataSource;
        },

        /* json转化为数据表 */
        jsonToTable: function (jsonObjs) {

            var m_table = { TotalCount: 0, TableColumns: [], Rows: [] };

            if (jsonObjs.length > 0) {
                for (var p in jsonObjs[0]) {
                    m_table.TableColumns.push(p);
                }

                $.each(jsonObjs, function () {
                    m_table.TotalCount++;

                    var m_row = [];
                    $.each(this, function () {
                        m_row.push(this);
                    });

                    m_table.Rows.push(m_row);
                });
            }

            return m_table;
        },

        /* 货币类型转换 */
        convertToMoney: function (money) {

            if (!money) {
                money = "0";
            }
            money = money.toString();

            var m_prex = "";
            if (money.indexOf("-") == 0) {
                m_prex = "-";
                money = money.replace("-", "");
            }

            money = money.replace(/^(\d*)$/, "$1.");
            money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
            money = money.replace(".", ",");
            var re = /(\d)(\d{3},)/;
            while (re.test(money)) {
                money = money.replace(re, "$1,$2");
            }
            money = money.replace(/,(\d\d)$/, ".$1");
            return '' + m_prex + money.replace(/^\./, "0.");
        },

        /* 日期转换 */
        convertToDateStr: function (timeValue) {
            if(timeValue){
                var m_date = new Date(Date.parse(timeValue.replaceAll("-", "/")));

                if (m_date == "Invalid Date") {
                    return -1;
                }
                else{
                    var m_month = (Number(m_date.getMonth()) + 1);
                    var m_day = Number(m_date.getDate());

                    return m_date.getFullYear() + "-" + (m_month > 9? m_month: "0" + m_month) + "-" + (m_day > 9? m_day: "0" + m_day);
                }
            }
            else{
                return "";
            }
        },

        /* 日期转换 */
        convertToDateByStr: function (timeValueStr) {
            if(timeValueStr){
                var m_date = new Date(datastruct.convertion.convertToDateStr(timeValueStr));

                if (m_date == "Invalid Date") {
                    return null;
                }
                else {
                    m_date.setHours("0");
                    m_date.setMinutes("0");
                    m_date.setMilliseconds("0");

                    return m_date;
                }
            }
            else{
                return null;
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----数据算法类----- 
    */
    datastruct.algorithm = {

        /* 移除数组元素 */
        removeArrayItem: function (arrList, keyProp, key) {
            var m_arr = [];

            $.each(arrList, function () {
                if (this[keyProp] != key) {
                    m_arr.push(this);
                }
            });

            return m_arr;
        }
    };
    /*-------------------------------*/

    /* 
    -----字符类扩展----- 
    */
    String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
        if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
            return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
        } else {
            return this.replace(reallyDo, replaceWith);
        }
    };

    String.prototype.getBytesCount = function () {
        var bytesCount = 0;
        if (this != null) {
            for (var i = 0; i < this.length; i++) {
                var c = this.charAt(i);
                if (/^[\u0000-\u00ff]$/.test(c)) {
                    bytesCount += 1;
                }
                else {
                    bytesCount += 2;
                }
            }
        }
        return bytesCount;
    };

    String.prototype.substringByBytes = function (subByteCount) {
        var m_str=this;
        if (this != null) {
            var bytesCount = 0;
            var m_subLen = 0;

            for (var i = 0; i < this.length; i++) {

                var c = this.charAt(i);
                if (/^[\u0000-\u00ff]$/.test(c)) {
                    bytesCount += 1;
                }
                else {
                    bytesCount += 2;
                }

                if (bytesCount > subByteCount) {
                    m_subLen = i;
                    break;
                }
            }

            m_str = this.substring(0, m_subLen);
        }
        return m_str;
    };

    String.prototype.lengthByBytes = function () {
    
        var bytesCount = 0;

        if (this != null) {
            for (var i = 0; i < this.length; i++) {

                var c = this.charAt(i);
                if (/^[\u0000-\u00ff]$/.test(c)) {
                    bytesCount += 1;
                }
                else {
                    bytesCount += 2;
                }
            }
        }

        return bytesCount;
    };
    /*-------------------------------*/

})(window);


(function (window) {

    window.cachestore = {};

    /* 
    -----缓存处理辅助类----- 
    */
    cachestore.clientCacheHelper = {

        /* 缓存存储结构 */
        _cacheStorage: new window.datastruct.dictionary(),

        /* 添加或修改缓存元素 */
        setItem: function (cacheName, cacheStruct, param) {
            if (cacheStruct == cachestore.cacheStructEnum.value) {
                this._cacheStorage.setItem(cacheName, param);
            }
            else {
                var valueDict;
                if (!this._cacheStorage.containKey(cacheName)) {
                    valueDict = new window.datastruct.dictionary();
                    this._cacheStorage.setItem(cacheName, valueDict);
                }
                else {
                    valueDict = this._cacheStorage.getItem(cacheName);
                }

                valueDict.setItem(param.key, param.value);
            }
        },

        /* 删除缓存数据类 */
        removeCache: function (cacheName) {
            this._cacheStorage.removeItem(cacheName);
        },

        /* 删除缓存数据条目（只支持数据字典结构） */
        removeCacheItem: function (cacheName, paramKey) {
            if (!this._cacheStorage.containKey(cacheName)) {
                return;
            }

            this._cacheStorage.getItem(cacheName).removeItem(paramKey);
        },

        /* 获取缓存元素 */
        getItem: function (cacheName, key) {
            if (!this._cacheStorage.containKey(cacheName)) {
                return;
            }

            var cacheObj = this._cacheStorage.getItem(cacheName);

            var itemValue = "";
            if (cacheObj instanceof window.datastruct.dictionary.fn.init) {
                itemValue = cacheObj.getItem(key);
            }
            else {
                itemValue = cacheObj;
            }

            return itemValue;
        },

        /* 获取元素从Cookie中 */
        getItemFromCookie: function (name) {
            if (!document.cookie) {
                return;
            }

            var valueObj;
            var arrCookies = document.cookie.split(";");
            for (var i = 0; i < arrCookies.length; i++) {

                var cookieItem = arrCookies[i];
                var arrObjs = cookieItem.split("=");

                /* 缓存对象名称在Cookie中存在 */
                if ($.trim(arrObjs[0]) == name) {
                    try{
                        valueObj = datastruct.convertion.strToObject(unescape(decodeURI(arrObjs[1].toString().replace(/\+/g, ' '))));
                    }
                    catch(err){
                        valueObj = datastruct.convertion.strToObject(unescape(arrObjs[1].toString().replace(/\+/g, ' ')));
                    }
                }
            }
            return valueObj;
        },

        /* 从Cookie中移除元素 */
        removeItemInCookie: function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getItemFromCookie(name);
            if (cval != null) document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString();
        },

        /* 清除所有缓存 */
        clearCache: function () {
            this._cacheStorage.clear();
        },

        /* 读取缓存数据 */
        readCacheData: function (cacheName) {
            if (!document.cookie) {
                return;
            }

            var arrCookies = document.cookie.split(";");
            for (var i = 0; i < arrCookies.length; i++) {

                var cookieItem = arrCookies[i];
                var arrObjs = cookieItem.split("=");

                /* 缓存对象名称在Cookie中存在 */
                if ($.trim(arrObjs[0]) == cacheName) {

                    var valueObj = datastruct.convertion.strToObject(unescape(arrObjs[1]));

                    this._cacheStorage.setItem(cacheName, valueObj);

                    break;
                }
            }
        },

        /* 存储缓存数据 */
        saveToLocalStorage: function (cacheName, timelimit, date) {
            for (var i = 0; i < this._cacheStorage.count; i++) {
                var keyvalueItem = this._cacheStorage.getKeyValueItem(i);

                if (!cacheName || cacheName == keyvalueItem.key) {

                    var expireStr = "";
                    if (timelimit) {
                        if (!date) {
                            var exp = new Date();
                            exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
                            expireStr = "expires=" + exp.toGMTString();
                        }
                        else {
                            expireStr = "expires=" + date.toGMTString();
                        }
                    }

                    document.cookie = keyvalueItem.key + "=" + escape(datastruct.convertion.objectToStr(keyvalueItem.value)) + ";path=/;" + expireStr;
                }
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----缓存结构枚举----- 
    */
    cachestore.cacheStructEnum = {
        dictionary: 1,
        value: 2
    };
    /*-------------------------------*/

})(window);


(function (window) {

    window.runtime = {};

    /* 
    -----运行时设置参数----- 
    */
    window.runtime.clientRunSetting = {

        /* 存储用户设置的基本信息(长期性) */
        storeUserSetting: function (param, pvalue) {
            var obj = { key: param, value: pvalue };
            cachestore.clientCacheHelper.setItem("UserSetting", cachestore.cacheStructEnum.dictionary, obj);

            cachestore.clientCacheHelper.saveToLocalStorage("UserSetting", true);
        },
        getUserSetting: function (param) {
            var pvalue = cachestore.clientCacheHelper.getItem("UserSetting", param);
            if (!pvalue) {
                /* 从cookie中获取 */
                cachestore.clientCacheHelper.readCacheData("UserSetting");
            }
            pvalue = cachestore.clientCacheHelper.getItem("UserSetting", param);
            return pvalue;
        },

        /* 存储用户环境(登陆后产生) */
        storeRunningContext: function (param, pvalue) {
            var obj = { key: param, value: pvalue };
            cachestore.clientCacheHelper.setItem("RunningContext", cachestore.cacheStructEnum.dictionary, obj);

            cachestore.clientCacheHelper.saveToLocalStorage("RunningContext", false);
        },
        getRunningContext: function (param) {
            var pvalue = cachestore.clientCacheHelper.getItem("RunningContext", param);
            if (!pvalue) {
                /* 从cookie中获取 */
                cachestore.clientCacheHelper.readCacheData("RunningContext");
            }
            pvalue = cachestore.clientCacheHelper.getItem("RunningContext", param);
            return pvalue;
        },
        /* 清理用户环境(登陆后产生) */
        clearRunningContext: function () {
            cachestore.clientCacheHelper.saveToLocalStorage("RunningContext", true, new Date());
            cachestore.clientCacheHelper.removeCache("RunningContext");
        },

        /* 获取打开系统的初次时间 */
        getOpenTime: function () {
            var m_openTime = runtime.clientRunSetting.getRunningContext("clientOpenTime");
            if (!m_openTime) {
                var m_now = new Date();
                m_openTime = m_now.getTime();
                runtime.clientRunSetting.storeRunningContext("clientOpenTime", m_openTime);
            }

            return m_openTime;
        },

        /* 重新设定系统的初次时间 */
        reSetOpenTime: function () {
            cachestore.clientCacheHelper.removeCacheItem("RunningContext", "clientOpenTime");
            cachestore.clientCacheHelper.saveToLocalStorage("RunningContext", false);
        }
    }
    /*-------------------------------*/

})(window);


(function (window) {

    window.webhandler = {};

    /* 
    -----JavaScript和服务器的数据传输协议----- 
    */
    webhandler.webTransferObj = function (action, bizObj) {
        var obj = new webhandler.webTransferObj.fn.init(action, bizObj);
        return obj;
    };
    webhandler.webTransferObj.fn = {

        /* 构造函数 */
        init: function (action, bizObj) {
            this.Action = action;

            if (bizObj) {
                this.BizObj = datastruct.convertion.objectToStr(bizObj);
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----业务执行环境----- 
    */
    webhandler.bizExeContext = function (successEvent, errorEvent) {
        var obj = new webhandler.bizExeContext.fn.init(successEvent, errorEvent);
        return obj;
    };
    webhandler.bizExeContext.fn = {

        /* 构造函数 */
        init: function (successEvent, errorEvent) {
            this.successEvent = successEvent;
            this.errorEvent = errorEvent;
        }
    };
    /*-------------------------------*/

    /* 
    -----ajax请求处理类----- 
    */
    webhandler.ajaxHandler = {

        /* 统一请求的Web处理程序 */
        _handlerUrl: null,

        /* 发送请求前的事件 */
        _beforeSendEvent: null,

        /* 异常处理事件 */
        _errorEvent: null,

        /* 请求处理完成事件 */
        _completeEvent: null,

        /* 初始化请求事件 */
        init: function (handlerUrl, beforeSendEvent, errorEvent, completeEvent) {
            this._handlerUrl = handlerUrl;
            this._beforeSendEvent = beforeSendEvent;
            this._errorEvent = errorEvent;
            this._completeEvent = completeEvent;
        },

        /* 业务请求 */
        bizRequest: function (transferObj, bizExeContext) {

            var param = datastruct.convertion.objectToStr(transferObj);

            $.ajax({
                url: this._handlerUrl,
                type: "post",
                async: true,
                cache: false,
                data: { Param: param },
                beforeSend: this._beforeSendEvent,
                error: this._errorEvent,
                complete: this._completeEvent,
                success: function (data, textStates) {

                    var retObj = datastruct.convertion.strToObject(data);

                    /* 异常标志Error */
                    if (retObj.Error || (typeof(retObj) == "string" && retObj.indexOf("Error") > -1)) {

                        if (bizExeContext.errorEvent) {
                            bizExeContext.errorEvent(retObj);
                        }
                        else {
                            if (webhandler.ajaxHandler._errorEvent) {
                                webhandler.ajaxHandler._errorEvent(retObj);
                            }
                        }
                    }
                    else {
                        if (bizExeContext.successEvent) {
                            bizExeContext.successEvent(retObj);
                        }
                    }

                    data = null;
                }
            });
        },

        /* 指定的业务请求 */
        specialBizRequest: function (handlerUrl, param, bizExeContext) {

            $.ajax({
                url: handlerUrl,
                type: "post",
                async: true,
                cache: false,
                data: { Param: param },
                beforeSend: this._beforeSendEvent,
                error: this._errorEvent,
                complete: this._completeEvent,
                success: function (data, textStates) {

                    var retObj = datastruct.convertion.strToObject(data);

                    /* 异常标志Error */
                    if (retObj.Error || (typeof(retObj) == "string" && retObj.indexOf("Error") > -1)) {
                        if (bizExeContext.errorEvent) {
                            bizExeContext.errorEvent(retObj);
                        }
                        else {
                            if (webhandler.ajaxHandler._errorEvent) {
                                webhandler.ajaxHandler._errorEvent(retObj);
                            }
                        }
                    }
                    else {
                        if (bizExeContext.successEvent) {
                            bizExeContext.successEvent(retObj);
                        }
                    }

                    data = null;
                }
            });
        },

        /* 加载缓存数据 */
        loadCacheData: function (transferObj, bizExeContext) {
            var param = datastruct.convertion.objectToStr(transferObj);

            $.ajax({
                url: this._handlerUrl + "?" + runtime.clientRunSetting.getOpenTime(),
                type: "get",
                async: true,
                cache: true,
                data: { Param: param },
                beforeSend: this._beforeSendEvent,
                error: this._errorEvent,
                complete: this._completeEvent,
                success: function (data, textStates) {
                    
                    var retObj = "";
                    if(typeof(data) == "string"){
                        retObj = datastruct.convertion.strToObject(data);
                    }

                    /* 异常标志Error */
                    if (retObj.Error || (typeof(retObj) == "string" && retObj.indexOf("Error") > -1)) {
                        if (bizExeContext.errorEvent) {
                            bizExeContext.errorEvent(retObj);
                        }
                        else {
                            if (webhandler.ajaxHandler._errorEvent) {
                                webhandler.ajaxHandler._errorEvent(retObj);
                            }
                        }
                    }
                    else {
                        if (bizExeContext.successEvent) {
                            bizExeContext.successEvent(retObj);
                        }
                    }

                    data = null;
                }
            });
        },

        /* 动态加载Javascript脚本 */
        loadScript: function (jsfile, successEvent, errorEvent) {
            $.ajax({
                url: jsfile + "?" + runtime.clientRunSetting.getOpenTime(),
                dataType: "script",
                cache: true,
                success: successEvent,
                error: errorEvent
            });
        },

        /* 上传文件 */
        uploadFile: function (fileForm, iframe, bizExeContext) {

            cachestore.clientCacheHelper.removeItemInCookie("Response");

            /* 发送前事件 */
            if (this._beforeSendEvent) {
                this._beforeSendEvent();
            }

            var m_func = function(data) {
                if (data) {
                    var retObj = datastruct.convertion.strToObject(data);

                    /* 异常标志Error */
                    if (retObj.Error || (typeof(retObj) == "string" && retObj.indexOf("Error") > -1)) {

                        if (retObj.Message == "Log in expired") {
                            window.location = "/bzm/login.htm";
                            return;
                        }

                        if (bizExeContext.errorEvent) {
                            bizExeContext.errorEvent(retObj);
                        }
                        else {
                            if (webhandler.ajaxHandler._errorEvent) {
                                webhandler.ajaxHandler._errorEvent(retObj);
                            }
                        }
                    }
                    else {
                        if (bizExeContext.successEvent) {
                            bizExeContext.successEvent(retObj);
                        }

                        iframe.stopTime();
                    }

                    if (thisObj._completeEvent) {
                        thisObj._completeEvent();
                    }

                    m_timeevent.stopTime();
                }

                data = null;
            };

            var thisObj = this;
            var m_timeevent = iframe.everyTime("2s", function () {
                
                var m_errorResult = cachestore.clientCacheHelper.getItemFromCookie("Response");
                if(!m_errorResult) {
                    var transferObj = new webhandler.webTransferObj("GetSysResponse");
                    var param = datastruct.convertion.objectToStr(transferObj);

                    $.ajax({
                        url: thisObj._handlerUrl,
                        type: "post",
                        async: true,
                        cache: false,
                        data: { Param: param },
                        error: this._errorEvent,
                        success: function (data, textStates) {
                            m_func(data);
                        }
                    });
                }
                else{
                    m_func(m_errorResult);
                }
            });

            fileForm.submit();
        }
    }
    /*-------------------------------*/

})(window);


(function (window) {

    window.uicontrol = {};

    /* 
    -----通用控件函数----- 
    */
    uicontrol.func = {

        /* 检测input的数字（带小数）输入 */
        checkInputNumber: function (oEvent) {
            var e = oEvent || window.event;
            var key = e.keyCode || e.charCode;

            var ret = false;
            if (key == 46) {

                var s_value = "";
                /* 兼容性处理 */
                if ($.browser.msie) {
                    s_value = e.srcElement.value + ".00";
                }
                else {
                    s_value = e.currentTarget.value + ".00";
                }


                if (!isNaN(s_value)) {
                    ret = true;
                }
            }

            if ((key > 47 && key < 59) || key == 8 || key == 13 || ret) {

            }
            else {
                if (window.event)
                    window.event.returnValue = false;
                else {
                    e.preventDefault();
                }
            }
        },

        /* 检测input的数字输入 */
        checkInputInt: function (oEvent) {
            var e = oEvent || window.event;
            var key = e.keyCode || e.charCode;
            if ((key > 47 && key < 59) || key == 8 || key == 13) {

            }
            else {
                if (window.event)
                    window.event.returnValue = false;
                else {
                    e.preventDefault();
                }
            }
        },

        /* 检测input的输入 */
        checkInput: function (oEvent) {
            var e = oEvent || window.event;
            var key = e.keyCode || e.charCode;

            if (key == 39 || key == 34) {
                if (window.event)
                    window.event.returnValue = false;
                else {
                    e.preventDefault();
                }
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----对话框控件----- 
    */
    uicontrol.dialog = function (ctrl, title, layout, submitFunc, singleBt) {
        var obj = new uicontrol.dialog.fn.init(ctrl, title, layout, submitFunc, singleBt);
        return obj;
    };
    uicontrol.dialog.fn = {
        /* 初始化函数 */
        init: function (ctrl, title, layout, submitFunc, singleBt) {

            var m_buttons = {};

            if (singleBt) {
                m_buttons[mlm.C0024] = submitFunc;
            }
            else {
                if (submitFunc) {
                    m_buttons[mlm.C0024] = submitFunc;
                    m_buttons[mlm.C0023] = function () { m_ctrl.dialog("close"); };
                }
            }

            var m_position = ["auto", 100];
            if (layout.position) {
                m_position = layout.position;
            }

            var m_ctrl = null;
            if (typeof (ctrl) == "string") {

                this.titleCtrlId = ctrl + "_dltitle";
                var m_title = "<span id='" + this.titleCtrlId + "'>" + title + "</span>";

                m_ctrl = $("#" + ctrl).dialog({
                    resizable: false,
                    height: layout.height,
                    width: layout.width,
                    title: m_title,
                    modal: true,
                    autoOpen: false,
                    closeOnEscape: false,
                    position: m_position,
                    buttons: m_buttons
                });
            }
            else {
                this.titleCtrlId = $(ctrl).attr("id") + "_dltitle";
                var m_title = "<span id='" + this.titleCtrlId + "'>" + title + "</span>";

                m_ctrl = ctrl.dialog({
                    resizable: false,
                    height: layout.height,
                    width: layout.width,
                    title: m_title,
                    modal: true,
                    autoOpen: false,
                    closeOnEscape: false,
                    position: m_position,
                    buttons: m_buttons
                });
            }

            this.ctrl = m_ctrl;
        },

        /* 设置标题 */
        setTitle: function (title) {
            $("#" + this.titleCtrlId).text(title);
        },

        /* 打开对话框 */
        show: function () {
            this.ctrl.dialog("open");
        },

        /* 关闭对话框 */
        close: function () {
            this.ctrl.dialog("close");
        }
    };
    uicontrol.dialog.fn.init.prototype = uicontrol.dialog.fn;
    /*-------------------------------*/

    /* 
    -----数据表格控件----- 
    */
    uicontrol.tableList = function (ctrlId, paramObj) {
        var obj = new uicontrol.tableList.fn.init(ctrlId, paramObj);
        return obj;
    };
    uicontrol.tableList.fn = {

        /* 每页显示记录数 */
        pageNumber: 20,

        /* 初始化函数 */
        init: function (ctrlId, paramObj) {

            this.dataSource = { page: 1, totalCount: 0, items: new datastruct.dictionary() };

            this.isPaging = paramObj.isPaging;

            /* 是否支持分页 */
            if (!paramObj.isPaging) {
                paramObj.height = paramObj.height + 30;
            }
            this.keyColumn = paramObj.keyColumn;
            this.autoSeq = paramObj.autoSeq;
            this.selectModel = paramObj.selectModel;
            this.selectEvent = paramObj.selectEvent;
            this.isExpend = paramObj.isExpend;
            this.pageQueryHandler = function(pageNum, pageCount){
            
                this.ispageTrigger = true;
                 
                if(paramObj.pageQueryHandler){
                    paramObj.pageQueryHandler(pageNum, pageCount);
                }
            };
            this.columns = [];
            this._ctrlId = ctrlId;

            /* 自动排序 */
            if (this.autoSeq) {
                var thisObj = this;

                this.columns.push({ display: mlm.C0041, name: "_Seq", width: 50, align: 'center' });

                $.each(paramObj.columns, function () {
                    thisObj.columns.push(this);
                });
            }
            else {
                this.columns = paramObj.columns;
            }

            this.tableGrid = $("#" + ctrlId);

            var thisObj = this;

            this.dataGrid = $("#" + ctrlId).flexigrid({
                colModel: this.columns,
                usepager: paramObj.isPaging,
                width: paramObj.width,
                height: paramObj.height,
                singleSelect: true, //仅允许选择单行
                resizable: false,
                striped: true,
                useRp: false,
                title: paramObj.title,
                showTableToggleBtn: true,
                dataType: "json",
                onChangeSort: function (sortname, sortorder) { uicontrol.tableList.fn._sortItems.call(thisObj, sortname, sortorder); }
            });

            /* 是否支持分页 */
            if (this.isPaging) {
                $(this.dataGrid[0].grid.pDiv).empty();
                this._createPagingCtrl();
            }

            if (paramObj.title && !paramObj.isExpend) {
                $('div.ptogtitle', this.dataGrid[0].grid.mDiv).click();
            }
        },

        /* 绑定数据源 */
        bindDataSource: function (source, sourceitemcount) {
        
            if (!source) {
                this.dataSource = { page: 1, totalCount: 0, items: new datastruct.dictionary() };
                this.dataGrid.flexAddData({ rows: [] });
            }
            else{
                if(!this.ispageTrigger){
                    this.dataSource.page = 1;
                }

                var thisObj = this;

                var m_dataSource = new datastruct.dictionary();

                if (source.Rows) {
                    var k = 1 + this.pageNumber * (this.dataSource.page - 1);
                    $.each(source.Rows, function () {

                        var rowItem = this;
                        var m_keyvalue;
                        var itemObj = {};

                        /* 自动排序 */
                        if (thisObj.autoSeq) {
                            itemObj._Seq = k;
                        }

                        var m_idx = 0;
                        $.each(source.TableColumns, function () {

                            itemObj[this] = rowItem[m_idx];

                            if (this == thisObj.keyColumn) {
                                m_keyvalue = rowItem[m_idx];
                            }

                            m_idx++;
                        });

                        m_dataSource.setItem(m_keyvalue, itemObj);
                        k++;
                    });

                    this.dataSource.totalCount = source.TotalCount;
                    this.dataSource.items = m_dataSource;
                }
                else {
                    var k = 1 + this.pageNumber * (this.dataSource.page - 1);
                    $.each(source, function () {

                        /* 自动排序 */
                        if (thisObj.autoSeq) {
                            this._Seq = k;
                        }

                        m_dataSource.setItem(this[thisObj.keyColumn], this);
                        k++;
                    });

                    if(sourceitemcount){
                        this.dataSource.totalCount = sourceitemcount;
                    }
                    else {
                        this.dataSource.totalCount = source.length;
                    }
                    this.dataSource.items = m_dataSource;
                }

                var m_bindSource = { rows: [] };
                $.each(m_dataSource.arrValues, function (i, rowItem) {
                    var m_key = m_dataSource.arrKeys[i];
                    var m_rowObj = { id: m_key, cell: [] };

                    /* 循环列 */
                    $.each(thisObj.columns, function () {

                        var m_value = thisObj._createCellContent(this, rowItem);
                        m_rowObj.cell.push(m_value);
                    });

                    m_bindSource.rows.push(m_rowObj);
                });

                /* 绑定数据列表 */
                this.dataGrid.flexAddData(m_bindSource);
            }

            /* 是否支持分页 */
            if (this.isPaging) {
                /* 控制分页区域 */
                this._controlPagingCtrl();
            }

            this.ispageTrigger = false;
        },

        /* 添加数据 */
        addData: function (key, dataRow) {

            /* 是否支持分页 */
            if (this.isPaging) {

                this.tableGrid.find("tr").remove();
                this.dataSource.page = 1;
                this.dataSource.totalCount = 1;

                //设置分页区域
                this.pageTxt.val(this.dataSource.page);
                this.totalCount.text(this.dataSource.totalCount);
                this._controlPagingCtrl();

                if (this.autoSeq) {
                    dataRow._Seq = 1;
                }
            }
            else {
                this.dataSource.totalCount++;
                if (this.autoSeq) {
                    dataRow._Seq = this.dataSource.items.count + this.pageNumber * (this.dataSource.page - 1) + 1;
                }
            }

            this.dataSource.items.setItem(key, dataRow);
            var m_rowhtml = $(this._createRow(key, dataRow));

            if (this.dataSource.items.count % 2 == 0) {
                m_rowhtml.addClass("erow");
            }

            this.tableGrid.append(m_rowhtml);
        },

        /* 修改数据 */
        modifyData: function (key, dataRow) {

            if (!this.dataSource.items.containKey(key)) {
                return;
            }

            dataRow._Seq = this.dataSource.items.getItem(key)._Seq;
            this.dataSource.items.setItem(key, dataRow);

            var m_rowhtml = $(this._createRow(key, dataRow));
            if (dataRow._Seq % 2 == 0) {
                m_rowhtml.addClass("erow");
            }

            this.tableGrid.find("tr[id=row" + key + "]").replaceWith(m_rowhtml);
        },

        /* 删除数据 */
        deleteData: function (key, deleteEvent) {

            if (!this.dataSource.items.containKey(key)) {
                return;
            }
            
            this.dataSource.totalCount--;
            if (this.isPaging) {
                this.totalCount.text(this.dataSource.totalCount);
            }

            var deletedItem = this.dataSource.items.getItem(key);
            this.dataSource.items.removeItem(key);
            this.tableGrid.find("tr[id=row" + key + "]").remove();

            var thisObj = this;
            var m_rows = this.tableGrid.find("tr");
            var idx = 1;
            $.each(m_rows, function () {

                var m_thisRow = $(this);
                if (idx % 2 == 0) {
                    m_thisRow.addClass("erow");
                }
                else {
                    m_thisRow.removeClass("erow");
                }

                /* 自动排序 */
                if (thisObj.autoSeq) {
                    var m_key = m_thisRow.attr("id").substr(3);
                    var m_seqCell = m_thisRow.find("span[id='" + thisObj._ctrlId + "_seq']");
                    var seq = Number(m_seqCell.text());
                    if (seq > deletedItem._Seq) {
                        m_seqCell.text(seq - 1);
                        var m_item = thisObj.dataSource.items.getItem(m_key);
                        m_item._Seq = seq - 1;

                        if (deleteEvent) {
                            deleteEvent(m_item);
                        }
                    }
                }
                idx++;
            });
        },

        /* 获取数据的序号 */
        getItem: function (key) {
            return this.dataSource.items.getItem(key);
        },

        /* 获取数据的序号 */
        getItemSeq: function (key) {
            return this.dataSource.items.getItem(key)._Seq;
        },

        /* 上一页 */
        goToLast: function () {
            this.nextBt.show();

            var m_currPage = this.dataSource.page - 1;
            if (m_currPage == 1) {
                this.lastBt.hide();
            }

            this.dataSource.page = m_currPage;
            this.pageTxt.val(m_currPage);

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.pageNumber);
            }
        },

        /* 下一页 */
        goToNext: function () {
            var m_currPage = Number(this.dataSource.page) + 1;

            this.lastBt.show();
            if (m_currPage == this.totolPageCount) {
                this.nextBt.hide();
            }

            this.dataSource.page = m_currPage;
            this.pageTxt.val(m_currPage);

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.pageNumber, this.sortName, this.sortOrder);
            }
        },

        /* 重新设置大小 */
        resize: function (height) {

            /* 是否支持分页 */
            if (!this.isPaging) {
                height = height + 30;
            }
            this.dataGrid[0].grid.bDiv.style.height = height + 'px';
            this.dataGrid[0].p.height = height;
            this.dataGrid[0].grid.fixHeight(height);
        },

        /* 获取选中数据 */
        getSelectedItems: function () {

            var m_selectedItems = [];
            var thisObj = this;
            if (this.selectModel == "2") {
                var selectedItems = $("input[name='" + this._ctrlId + "_check']");
                $.each(selectedItems, function () {
                    if (this.checked) {
                        m_selectedItems.push(thisObj.dataSource.items.getItem($(this).val()));
                    }
                });
            }
            else if (this.selectModel == "1") {
                var selectedItems = $("input[name='" + this._ctrlId + "_radio']");
                $.each(selectedItems, function () {
                    if (this.checked) {
                        m_selectedItems = thisObj.dataSource.items.getItem($(this).val());
                    }
                });
            }

            return m_selectedItems;
        },

        /* 设置选择的数据 */
        setSelectedItems: function (selectedItems, exceptionItems) {
            if (selectedItems == "all") {
                var m_chkItems = $("input[name='" + this._ctrlId + "_check']");
                $.each(m_chkItems, function () {
                    if (!exceptionItems.containKey($(this).val())) {
                        $(this).attr("checked", 'true');
                    }
                });
            }
            else {
                
                if (this.selectModel == "2") {
                    var m_chkItems = $("input[name='" + this._ctrlId + "_check']");
                    $.each(m_chkItems, function () {
                        if (selectedItems.containKey($(this).val())) {
                            $(this).attr("checked", 'true');
                        }
                    });
                }
                else{
                    var m_chkItems = $("input[name='" + this._ctrlId + "_radio']");
                    $.each(m_chkItems, function () {
                        if (selectedItems.containKey($(this).val())) {
                            $(this).attr("checked", 'true');
                        }
                    });
                }
            }
        },

        /* 隐藏内容 */
        hideContent: function () {
            if (this.isExpend) {
                $('div.ptogtitle', this.dataGrid[0].grid.mDiv).click();
                this.isExpend = false;
            }
        },

        /* 重新设置排序 */
        reSetSort: function () {
            this.dataGrid.flexOptions({ sortname: "", sortorder: "" });
            $('.sasc', this.dataGrid[0].grid.hDiv).removeClass('sasc');
            $('.sorted', this.dataGrid[0].grid.hDiv).removeClass('sorted');
        },

        /* 开启批量操作模式 */
        openBatchModel: function () {
            this.selectModel = "2";
        },

        /* 取消批量操作模式 */
        cancelBatchModel: function () {
            this.selectModel = null;
        },

        /* 全选 */
        selectAll: function () {
            $("[name='" + this._ctrlId + "_check']").attr("checked", 'true');
        },

        /* 反选 */
        cancelAll: function () {
            $("[name='" + this._ctrlId + "_check']").removeAttr("checked");
        },

        /* 排序 */
        _sortItems: function (sortname, sortorder) {
            this.sortName = sortname;
            this.sortOrder = sortorder;

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.pageNumber, this.sortName, this.sortOrder);
            }
        },

        /* 创建列内容 */
        _createCellContent: function (col, rowItem) {

            var m_value = "";
            var m_key = rowItem[this.keyColumn];
            col.keyObj = rowItem;

            /* 判断列是否需要调整 */
            if (!col.adjust) {
                if (col.name == "_Seq") {

                    /* 单选模式 */
                    if (this.selectModel == "1") {
                        m_value = "<input type='radio' name='" + this._ctrlId + "_radio' value='" + m_key + "' /><span id='" + this._ctrlId + "_seq'>" + rowItem[col.name] + "</span>";
                    }
                    else if (this.selectModel == "2") {
                        var m_event = "";
                        if (this.selectEvent) {
                            m_event = " onchange='" + this.selectEvent + ".call(this);' "
                        }

                        m_value = "<input type='checkbox' name='" + this._ctrlId + "_check' value='" + m_key + "' " + m_event + " /><span id='" + this._ctrlId + "_seq'>" + rowItem[col.name] + "</span>";
                    }
                    else {
                        m_value = "<span id='" + this._ctrlId + "_seq'>" + rowItem[col.name] + "</span>";
                    }
                }
                else {
                    m_value = rowItem[col.name];

                    if (col.allowNewLine) {
                        m_value = m_value.replace(/\^/g, "\"").replace(/\n/g, "<br>");
                    }
                }
            }
            else {
                var m_cellvalue = [];
                /* 修改列构造函数 */
                if (col.modifiedFunc) {
                    m_cellvalue.push("<a href='javascript:void(\"0\")' class='bt-link' tag='" + m_key + "' onclick='" + col.modifiedFunc + ".call(this);'>" + mlm.C0061 + "</a>");
                }
                /* 删除列构造函数 */
                if (col.deletedFunc) {
                    m_cellvalue.push("<a href='javascript:void(\"0\")' class='bt-link' tag='" + m_key + "' onclick='" + col.deletedFunc + ".call(this);'>" + mlm.C0062 + "</a>");
                }
                /* 自定义列构造函数 */
                if (col.createCell) {
                    m_cellvalue.push(col.createCell(m_key, rowItem[col.name], col.name));
                }

                m_value = m_cellvalue.join("");
            }

            return m_value;
        },

        /* 创建行 */
        _createRow: function (key, dataRow) {
            var thisObj = this;
            var m_row = ["<tr id='row" + key + "'>"];
            $.each(this.dataGrid[0].grid.hTable.rows[0].cells, function () {

                var index = this.axis.substr(3);

                var m_col = thisObj.columns[index];
                var m_value = thisObj._createCellContent(m_col, dataRow);

                var m_td = "<td align='center'>";
                if ($(this).css("display") == "none") {
                    m_td = "<td align='" + thisObj.columns[index].align + "' style='display: none'>";
                }
                m_row.push(m_td);
                m_row.push("<div style='width: " + (Number($(this)[0].offsetWidth) - 12) + "px ;text-align: " + thisObj.columns[index].align + "'>" + m_value + "</div>");
                m_row.push("</td>");
            });
            m_row.push("</tr>");

            return m_row.join("");
        },

        /* 创建分页区域 */
        _createPagingCtrl: function () {
            var pagingArea = $("<div class='p-area'></div>");

            var thisObj = this;
            this.lastBt = $("<a href='javascript:void(\"0\")'>" + mlm.C0037 + "</a>");
            this.pageTxt = $("<input type='text' value='" + this.dataSource.page + "' class='p-txt' onkeypress='uicontrol.func.checkInputInt(event);' />");

            /* 页数改变事件 */
            this.pageTxt.change(function () {
                var m_num = $(this).val();
                if (m_num == 0 || m_num > thisObj.totolPageCount) {
                    $(this).val(thisObj.dataSource.page);
                }
                else {
                    thisObj.dataSource.page = m_num;

                    if (m_num == 1) {
                        thisObj.lastBt.hide();
                        thisObj.nextBt.show();
                    }
                    else if (m_num == thisObj.totolPageCount) {
                        thisObj.lastBt.show();
                        thisObj.nextBt.hide();
                    }
                    else {
                        thisObj.lastBt.show();
                        thisObj.nextBt.show();
                    }

                    /* 查询数据 */
                    if (thisObj.pageQueryHandler) {
                        thisObj.pageQueryHandler(thisObj.dataSource.page, thisObj.pageNumber);
                    }
                }
            });

            this.totalCount = $("<span class='p-lable'>" + this.dataSource.totalCount + "</span>");
            this.nextBt = $("<a href='javascript:void(\"0\")'>" + mlm.C0038 + "</a>");
            this.pageNum = $("<span class='p-lable'>1</span>");

            var thisObj = this;
            /* 绑定分页事件 */
            this.lastBt.click(function () { thisObj.goToLast(); });
            this.nextBt.click(function () { thisObj.goToNext(); });

            pagingArea.append("<span>" + mlm.C0039 + "</span>");
            pagingArea.append(this.totalCount);
            pagingArea.append("<span class='p-totalcount'>" + mlm.C0040 + "</span>");
            pagingArea.append(this.lastBt);
            pagingArea.append(this.pageTxt);
            pagingArea.append("/");
            pagingArea.append(this.pageNum);
            pagingArea.append(this.nextBt);

            this.lastBt.hide();
            this.nextBt.hide();

            $(this.dataGrid[0].grid.pDiv).append(pagingArea);
        },

        /* 设置分页区域控件 */
        _controlPagingCtrl: function () {
            this.totalCount.text(this.dataSource.totalCount);

            /* 设置总页数 */
            this.totolPageCount = parseInt(this.dataSource.totalCount / this.pageNumber);
            if (this.totolPageCount * this.pageNumber > this.dataSource.totalCount || this.totolPageCount * this.pageNumber == this.dataSource.totalCount) {
                this.pageNum.text(this.totolPageCount);
            }
            else {
                this.totolPageCount++;
                this.pageNum.text(this.totolPageCount);
            }

            this.pageTxt.val(this.dataSource.page);

            /* 控制分页按钮 */
            if (this.dataSource.page == 1) {
                this.lastBt.hide();
            }
            else {
                this.lastBt.show();
            }
            if (this.totolPageCount == 0 || this.totolPageCount == this.dataSource.page) {
                this.nextBt.hide();
            }
            else {
                this.nextBt.show();
            }
        }
    };
    uicontrol.tableList.fn.init.prototype = uicontrol.tableList.fn;
    /*-------------------------------*/

    /* 
    -----文件上传控件----- 
    */
    uicontrol.file = function (ctrlId) {
        var obj = new uicontrol.file.fn.init(ctrlId);
        return obj;
    };
    uicontrol.file.fn = {

        /* 构造函数 */
        init: function (ctrlId) {

            this.ctrlId = ctrlId;

            var formId = 'fileform_' + ctrlId;
            var frameId = 'fileframe' + ctrlId;

            this.fileForm = $("#" + formId);
            if (this.fileForm.length == 0) {
                this.fileForm = $('<form action="" method="post" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
                this.fileForm.css('position', 'absolute');
                this.fileForm.css('top', '-1200px');
                this.fileForm.css('left', '-1200px');
                this.fileForm.appendTo('body');
                this.paramCtrl = $('<input type="hidden" name="Param" />');
                this.paramCtrl.appendTo(this.fileForm);

                var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
                if ($.browser.msie) {
                    iframeHtml += " src=\"javascript:false\"";
                }
                iframeHtml += ' />';
                this.iframe = $(iframeHtml);
                this.iframe.appendTo(document.body);

                this.fileForm.attr('target', frameId);
                this.fileForm.attr('method', 'POST');
            }
        },

        /* 上传文件 */
        uploadFile: function (transferObj, bizExeContext) {
            var fileCtrl = $('#' + this.ctrlId);

            fileCtrl.before(fileCtrl.clone());

            var fileId = 'filectrl_' + this.ctrlId;
            this.fileForm.find("#" + fileId).remove();

            fileCtrl.attr('id', fileId);
            fileCtrl.appendTo(this.fileForm);

            //设置上传Url
            this.fileForm.attr('action', webhandler.ajaxHandler._handlerUrl + "?Filename=" + this.ctrlId);

            //设置参数
            var paramObj = {};
            for (var item in transferObj) {
                paramObj[item] = transferObj[item];
            }
            var paramStr = datastruct.convertion.objectToStr(paramObj);

            this.paramCtrl.val(paramStr);

            /* 提交 */
            webhandler.ajaxHandler.uploadFile(this.fileForm, this.iframe, bizExeContext);
        }
    };
    uicontrol.file.fn.init.prototype = uicontrol.file.fn;
    /*-------------------------------*/

    /* 
    -----简单表格控件----- 
    */
    uicontrol.simpleTableList = function (ctrlId, paramObj, source) {
        var obj = new uicontrol.simpleTableList.fn.init(ctrlId, paramObj, source);
        return obj;
    };
    uicontrol.simpleTableList.fn = {

        /* 每页显示数 */
        pageNumber: 50,

        /* 构造函数 */
        init: function (ctrl, paramObj, source) {

            this.keyColumn = paramObj.keyColumn;
            this.dataSource = { page: 1, totalCount: 0, items: new datastruct.dictionary() };
            this.constructTableFunc = paramObj.constructTableFunc;
            this.isPaging = paramObj.isPaging;
            this.pageQueryHandler = paramObj.pageQueryHandler;
            this.sourceType = paramObj.sourceType;
            this.liList = new datastruct.dictionary();
            this.SeqProp = paramObj.seqProp;
            this.events = paramObj.events;
            this.itemCss = paramObj.itemCss;

            if (typeof(ctrl) == "string") {
                this.ctrl = $("#" + ctrl);
            }
            else{
                this.ctrl = ctrl;
            }
            
            this.ctrl.addClass("simple-table");

            var m_class = "content";
            if (paramObj.contentClass) {
                m_class = m_class + " " + paramObj.contentClass;
            }
            this.contentCtrl = $("<div class='" + m_class + "'></div>");
            this.ctrl.append(this.contentCtrl);

            /* 是否支持分页 */
            if (this.isPaging) {
                this.pagingCtrl = $("<div class='paging-frame'></div>");
                this.ctrl.append(this.pagingCtrl);
                this._createPagingCtrl();
            }

            /* 绑定数据 */
            this.bindSource(source);
        },

        /* 绑定数据源 */
        bindSource: function (source) {

            if (!source) {
                this.dataSource = { page: 1, totalCount: 0, items: new datastruct.dictionary() };
                if (this.ulCtrl) {
                    this.ulCtrl.empty();
                }
                return;
            }
            else{
                this.dataSource.items = new datastruct.dictionary();
                if (this.ulCtrl) {
                    this.ulCtrl.empty();
                }
            }

            var thisObj = this;

            if (source.Rows) {
                $.each(source.Rows, function () {

                    var rowItem = this;
                    var m_keyvalue;
                    var itemObj = {};
                    $.each(source.TableColumns, function (i, column) {
                        itemObj[column] = rowItem[i];

                        if (column == thisObj.keyColumn) {
                            m_keyvalue = rowItem[i];
                        }
                    });

                    thisObj.dataSource.items.setItem(m_keyvalue, itemObj);
                });
                this.dataSource.totalCount = source.TotalCount;
            }
            else {
                $.each(source, function () {
                    thisObj.dataSource.items.setItem(this[thisObj.keyColumn], this);
                });
                this.dataSource.totalCount = this.dataSource.items.count;
            }

            /* 创建内容 */
            this._createContent();
        },

        /* 添加元素 */
        addData: function (dataItem) {
            this._createRow(dataItem);

            this.dataSource.items.setItem(dataItem[this.keyColumn], dataItem);
            this.dataSource.totalCount++;
        },

        /* 修改元素 */
        modifyData: function (dataItem) {
            var m_newliCtrl = $("<li></li>");
            var m_key = dataItem[this.keyColumn];

            if (this.constructTableFunc) {
                var liTable = this.constructTableFunc(dataItem);
                m_newliCtrl.append(liTable);
            }

            this.liList.getItem(m_key).replaceWith(m_newliCtrl);

            this.dataSource.items.setItem(m_key, dataItem);
            this.liList.setItem(m_key, m_newliCtrl);
        },

        /* 删除元素 */
        deleteData: function (dataItem) {

            var m_key = dataItem[this.keyColumn];
            var m_deletedSeq = Number(dataItem[this.SeqProp]);
            var m_item = this.liList.getItem(m_key);

            if (m_item) {
                m_item.remove();

                this.dataSource.items.removeItem(m_key);
                this.liList.removeItem(m_key);

                this.dataSource.totalCount--;

                var thisObj = this;
                $.each(this.dataSource.items.arrValues, function () {

                    var m_seq = Number(this[thisObj.SeqProp]);
                    if (thisObj.SeqProp && m_seq > m_deletedSeq) {
                        this[thisObj.SeqProp] = m_seq - 1;
                    }
                });
            }
        },

        /* 获取元素 */
        getItem: function (key) {
            return this.dataSource.items.getItem(key);
        },

        /* 创建内容区域 */
        _createContent: function () {
            this.ulCtrl = $("<ul></ul>");

            var thisObj = this;
            var liItems = [];
            $.each(this.dataSource.items.arrValues, function () {
                thisObj._createRow(this);
            });

            this.contentCtrl.empty();
            this.contentCtrl.append(this.ulCtrl);
            this.resize();

            /* 是否支持分页 */
            if (this.isPaging) {
                /* 控制分页区域 */
                this._controlPagingCtrl();
            }
        },

        /* 创建行 */
        _createRow: function (dataItem) {
            var liCtrl = $("<li></li>");
            liCtrl.attr("tag", dataItem[this.keyColumn]);

            if (this.itemCss) {
                liCtrl.addClass(this.itemCss);
            }

            if (this.constructTableFunc) {
                var liTable = this.constructTableFunc(dataItem);
                liCtrl.append(liTable);
            }

            if (this.events) {   
                $.extend(liCtrl[0], this.events);
            }

            this.ulCtrl.append(liCtrl);

            this.liList.setItem(dataItem[this.keyColumn], liCtrl);
        },

        /* 创建分页区域 */
        _createPagingCtrl: function () {
            var pagingArea = $("<div class='p-area'></div>");

            var thisObj = this;
            this.lastBt = $("<a href='javascript:void(\"0\")'>" + mlm.C0037 + "</a>");
            this.pageTxt = $("<input type='text' value='" + this.dataSource.page + "' class='p-txt' onkeypress='uicontrol.func.checkInputInt(event);' />");

            /* 页数改变事件 */
            this.pageTxt.change(function () {
                var m_num = $(this).val();
                if (m_num == 0 || m_num > thisObj.totolPageCount) {
                    $(this).val(thisObj.dataSource.page);
                }
                else {
                    thisObj.dataSource.page = m_num;

                    if (m_num == 1) {
                        thisObj.lastBt.hide();
                        thisObj.nextBt.show();
                    }
                    else if (m_num == thisObj.totolPageCount) {
                        thisObj.lastBt.show();
                        thisObj.nextBt.hide();
                    }
                    else {
                        thisObj.lastBt.show();
                        thisObj.nextBt.show();
                    }

                    /* 查询数据 */
                    if (thisObj.pageQueryHandler) {
                        thisObj.pageQueryHandler(thisObj.dataSource.page, thisObj.pageNumber);
                    }
                }
            });

            this.totalCount = $("<span class='p-lable'>" + this.dataSource.totalCount + "</span>");
            this.nextBt = $("<a href='javascript:void(\"0\")'>" + mlm.C0038 + "</a>");
            this.pageNum = $("<span class='p-lable'>1</span>");

            var thisObj = this;
            /* 绑定分页事件 */
            this.lastBt.click(function () { thisObj.goToLast(); });
            this.nextBt.click(function () { thisObj.goToNext(); });

            pagingArea.append("<span>" + mlm.C0039 + "</span>");
            pagingArea.append(this.totalCount);
            pagingArea.append("<span class='p-totalcount'>" + mlm.C0040 + "</span>");
            pagingArea.append(this.lastBt);
            pagingArea.append(this.pageTxt);
            pagingArea.append("/");
            pagingArea.append(this.pageNum);
            pagingArea.append(this.nextBt);

            this.lastBt.hide();
            this.nextBt.hide();

            this.pagingCtrl.append(pagingArea);
        },

        /* 设置分页区域控件 */
        _controlPagingCtrl: function () {
            this.totalCount.text(this.dataSource.totalCount);

            /* 设置总页数 */
            this.totolPageCount = parseInt(this.dataSource.totalCount / this.pageNumber);
            if (this.totolPageCount * this.pageNumber > this.dataSource.totalCount || this.totolPageCount * this.pageNumber == this.dataSource.totalCount) {
                this.pageNum.text(this.totolPageCount);
            }
            else {
                this.totolPageCount++;
                this.pageNum.text(this.totolPageCount);
            }

            this.pageTxt.val(this.dataSource.page);

            /* 控制分页按钮 */
            if (this.dataSource.page == 1) {
                this.lastBt.hide();
            }
            else {
                this.lastBt.show();
            }
            if (this.totolPageCount == this.dataSource.page) {
                this.nextBt.hide();
            }
            else {
                this.nextBt.show();
            }
        },

        /* 上一页 */
        goToLast: function () {
            this.nextBt.show();

            var m_currPage = this.dataSource.page - 1;
            if (m_currPage == 1) {
                this.lastBt.hide();
            }

            this.dataSource.page = m_currPage;
            this.pageTxt.val(m_currPage);

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.pageNumber);
            }
        },

        /* 下一页 */
        goToNext: function () {
            var m_currPage = Number(this.dataSource.page) + 1;

            this.lastBt.show();
            if (m_currPage == this.totolPageCount) {
                this.nextBt.hide();
            }

            this.dataSource.page = m_currPage;
            this.pageTxt.val(m_currPage);

            if (this.pageQueryHandler) {
                this.pageQueryHandler(this.dataSource.page, this.pageNumber);
            }
        },

        /* 设置布局 */
        resize: function () {
            var m_ctrl_height = this.ctrl[0].offsetHeight - 1;
            if (m_ctrl_height) {
                this.contentCtrl.css("height", this.isPaging ? m_ctrl_height - 33 : m_ctrl_height);
            }
        }
    };
    uicontrol.simpleTableList.fn.init.prototype = uicontrol.simpleTableList.fn;
    /*-------------------------------*/

    /* 
    -----分组列表控件----- 
    */
    uicontrol.groupList = function (ctrlId, paramObj, source) {
        var obj = new uicontrol.groupList.fn.init(ctrlId, paramObj, source);
        return obj;
    };
    uicontrol.groupList.fn = {

        /* 构造函数 */
        init: function (ctrlObj, paramObj, source) {
            this.dataSource = source;

            if (typeof (ctrlObj) == "string") {
                this.ctrl = $("#" + ctrlObj);
            }
            else {
                this.ctrl = ctrlObj;
            }

            this.ctrl.addClass("group-table");
            this.groupKey = paramObj.groupKey;
            this.groupName = paramObj.groupName;
            this.itemKey = paramObj.itemKey;
            this.constructItemFunc = paramObj.constructItemFunc;
            this.SeqProp = paramObj.seqProp;
        },

        /* 绑定数据 */
        bindSource: function (source) {

            if (source) {
                var m_jsonObjs = datastruct.convertion.tableToJson(source);

                var thisObj = this;
                var m_groups = new datastruct.dictionary();
                $.each(m_jsonObjs, function () {
                    var m_key = this[thisObj.groupKey];

                    if (!m_groups.containKey(m_key)) {
                        var m_items = [];
                        m_items.push(this);
                        m_groups.setItem(m_key, m_items);
                    }
                    else {
                        var m_items = m_groups.getItem(m_key);
                        m_items.push(this);
                        m_groups.setItem(m_key, m_items);
                    }
                });

                this.dataSource = m_groups;
            }

            this._createGroupList();
        },

        /* 添加元素 */
        addData: function (dataItem) {
            var m_key = dataItem[this.groupKey];
            var m_ctrlObj = this.itemCtrls.getItem(m_key);

            if (m_ctrlObj) {
                m_ctrlObj.tableCtrl.addData(dataItem);
            }
            else {
                this._createGroupRow(m_key, [dataItem]);
            }
        },

        /* 修改元素 */
        modifyData: function (dataItem) {
            var m_key = dataItem[this.groupKey];
            var m_itemKey = dataItem[this.itemKey];

            var m_ctrlObj = this.itemCtrls.getItem(m_key);

            var m_simpleTable = m_ctrlObj.tableCtrl;
            m_simpleTable.modifyData(dataItem);

            this.itemCtrls.setItem(m_key, { ctrl: m_ctrlObj.ctrl, tableCtrl: m_simpleTable });
        },

        /* 删除元素 */
        deleteData: function (dataItem) {
            var m_key = dataItem[this.groupKey];
            var m_itemkey = dataItem[this.itemKey];

            var m_ctrlObj = this.itemCtrls.getItem(m_key);
            var m_simpleTable = m_ctrlObj.tableCtrl;

            $.each(this.itemCtrls.arrValues, function () {
                this.tableCtrl.deleteData(dataItem);
            });

            if (m_simpleTable.dataSource.totalCount == 0) {
                m_ctrlObj.ctrl.remove();
                this.itemCtrls.removeItem(m_key);
            }

            this.resize();
        },

        /* 获取分组元素 */
        getGroupItem: function (key) {
            var m_groupItem = this.itemCtrls.getItem(key);

            return m_groupItem;
        },

        /* 获取元素 */
        getItem: function (key, itemKey) {
            var m_groupCtrl = this.itemCtrls.getItem(key);
            if (m_groupCtrl) {
                var m_simpleTable = m_groupCtrl.tableCtrl;
                return m_simpleTable.getItem(itemKey);
            }
        },

        /* 重新设置布局 */
        resize: function () {

            if (!this.itemCtrls) {
                return;
            }

            $.each(this.itemCtrls.arrValues, function () {
                this.tableCtrl.resize();
            });
        },

        /* 创建分组列表 */
        _createGroupList: function () {

            this.ctrl.empty();
            if (this.itemCtrls) {
                this.itemCtrls.clear();
            }

            /* 元素条目控件 */
            this.itemCtrls = new datastruct.dictionary();

            for (var i = 0; i < this.dataSource.count; i++) {
                var m_key = this.dataSource.arrKeys[i];
                var m_valueItems = this.dataSource.arrValues[i];

                this._createGroupRow(m_key, m_valueItems);
            }
        },

        /* 创建分组行 */
        _createGroupRow: function (key, valueItems) {

            var m_name = valueItems[0][this.groupName];

            var listItem = $("<div class='list-item'></div>");
            var titleArea = $("<div class='title-area'></div>");
            var operaBt = $("<span class='ui-icon ui-icon-folder-open' style='cursor: pointer;'></span>");

            var thisObj = this;
            operaBt.click(function () {
                /* 未展开 */
                if (!operaBt.isExpend) {
                    operaBt.removeClass("ui-icon ui-icon-folder-open");
                    operaBt.addClass("ui-icon ui-icon-folder-collapsed");
                    operaBt.isExpend = true;

                    thisObj.itemCtrls.getItem(key).tableCtrl.ctrl.hide();
                }
                else {
                    operaBt.removeClass("ui-icon ui-icon-folder-collapsed");
                    operaBt.addClass("ui-icon ui-icon-folder-open");
                    operaBt.isExpend = false;

                    thisObj.itemCtrls.getItem(key).tableCtrl.ctrl.show();
                }
            });
            operaBt.hover(function () { operaBt.addClass("hover-bt"); }, function () { operaBt.removeClass("hover-bt"); });

            titleArea.append(operaBt);
            titleArea.append("<span>" + m_name + "</span>");

            listItem.append(titleArea);

            var m_tableCtrlId = this.ctrl.attr("id") + "table" + key;
            listItem.append("<div id='" + m_tableCtrlId + "'></div>");
            this.ctrl.append(listItem);

            /* 数据表 */
            var m_tableCtrl = new uicontrol.simpleTableList(m_tableCtrlId, { keyColumn: this.itemKey, sourceType: "json", seqProp: "Seq", isPaging: false, constructTableFunc: this.constructItemFunc },
                                                              valueItems);

            this.itemCtrls.setItem(key, { ctrl: listItem, tableCtrl: m_tableCtrl });
        }
    };
    uicontrol.groupList.fn.init.prototype = uicontrol.groupList.fn;
    /*-------------------------------*/

    /* 
    -----删除确认控件----- 
    */
    uicontrol.confirmDelete = function (submitFunc) {
        var obj = new uicontrol.confirmDelete.fn.init(submitFunc);
        return obj;
    };
    uicontrol.confirmDelete.fn = {

        /* 构造函数 */
        init: function (submitFunc) {
            var m_frame = $("<div></div>");
            var m_innerframe = $("<div class=\"submitForm form-width\"></div>");
            var m_table = $("<div class=\"submitForm-tr first-item last-item\">");
            this.txtCtrl = $("<span></span>");
            m_table.append(this.txtCtrl);
            m_innerframe.append(m_table);
            m_frame.append(m_innerframe);

            $(document).append(m_frame);

            var m_layout = { width: 800 };

            this.dialog = new uicontrol.dialog(m_frame, mlm.C0042, m_layout, submitFunc);
        },

        /* 确认提示 */
        showConfirm: function (confirmInfo) {
            this.txtCtrl.text(confirmInfo);
            this.dialog.show();
        },

        /* 关闭对话框 */
        close: function () {
            this.dialog.close();
        }
    };
    uicontrol.confirmDelete.fn.init.prototype = uicontrol.confirmDelete.fn;
    /*-------------------------------*/

    /* 
    -----树型控件----- 
    */
    uicontrol.treeView = function (ctrl, sourceObj, clickItemEvent, param) {
        return new uicontrol.treeView.fn.init(ctrl, sourceObj, clickItemEvent, param);
    };
    uicontrol.treeView.fn = {

        /* 控件 */
        _ctrl: null,

        /* 数据源对象 
        [{ key:"1", value:"AB", parentKey: 0, tag:null, children:[{ key:"3", value:"AB_1", parentKey:1, 
        tag:null, children:[] }] }, 
        { key:"2", value:"CD", parentKey: 0, tag:null, children:[] }] */
        _sourceObj: null,

        /* 文本单击事件 */
        _clickItemEvent: null,

        /* hashtable结构（用于存储树型控件中的节点对象uicontrol.treeView.Item） */
        _dict: null,

        /* 关键字数组 */
        _keys: [],

        /* 内部 构造函数(创建init函数对象) */
        init: function (ctrl, sourceObj, clickItemEvent, param) {
            this._ctrl = ctrl;
            this._ctrlId = this._ctrl.attr("id");

            this._dict = new datastruct.dictionary();
            this._clickItemEvent = clickItemEvent;
            this.selectedItem = null;
            this.nodeList = [];

            if (param) {
                this._operaModel = param.operaModel;
                this._displayModel = param.displayModel;
                this._sourceFormat = param.sourceFormat;
                this._keyColumn = param.keyColumn;
                this._parentKeyColumn = param.parentKeyColumn;
                this._dispayColumn = param.displayColumn;
                this._dbClickEvent = param.dbClickEvent;
                this._constructDisplayTxt = param.constructDisplayTxt;
                this._isCollapse = param.isCollapse;
                this._expandEvent = param.expandEvent;
                this._collapseEvent = param.collapseEvent;
                this._checkEvent = param.checkEvent;
                this._isForbitSynChild = param.isForbitSynChild;
            }

            if (this._sourceFormat && (this._sourceFormat == "table" || this._sourceFormat == "json")) {
            
                var m_jsonObjs;
                if(this._sourceFormat == "table"){
                    m_jsonObjs = datastruct.convertion.tableToJson(sourceObj);
                }
                else{
                    m_jsonObjs = sourceObj;
                }

                /* 元素临时缓存 */
                var m_itemCache = new datastruct.dictionary();
                var thisObj = this;
                this._sourceObj = [];

                $.each(m_jsonObjs, function () {

                    var m_key = this[thisObj._keyColumn];
                    var m_parentKey = this[thisObj._parentKeyColumn];
                    var m_item = { key: m_key, value: this[thisObj._dispayColumn], parentKey: m_parentKey, tag: this, children: [] };

                    m_itemCache.setItem(m_key, m_item);

                    if (!m_parentKey || m_parentKey == "0" || !m_itemCache.containKey(m_parentKey)) {
                        m_item.parentKey = "0";
                        thisObj._sourceObj.push(m_item);
                    }
                    else {
                        if (m_itemCache.containKey(m_parentKey)) {
                            m_itemCache.getItem(m_parentKey).children.push(m_item);
                        }
                    }
                });
            }
            else {
                this._sourceObj = sourceObj;
            }

            return this;
        },

        /* 加载数据源，并填充控件 */
        loadSource: function () {
            this._ctrl.empty();
            this._keys = [];

            uicontrol.treeView.event.createCtrlContent.call(this, this._ctrl, this._sourceObj, this._dict, this._clickItemEvent);

            uicontrol.treeView.event._changeSize.call(this);
        },

        /* 获取对象 */
        getItem: function (key) {
            return this._dict.getItem(key);
        },

        /* 获取完整的路径 */
        getItemFullName: function (key) {
            var m_obj = this._dict.getItem(key);

            var m_nameObj = { name: m_obj.sourceItem.value };
            this._resecurFullName(m_obj.sourceItem.parentKey, m_nameObj);

            return m_nameObj.name;
        },
        _resecurFullName: function (parentKey, fullNameObj, isbreak) {
            if (!isbreak && parentKey && parentKey > 0) {
                var m_parentObj = this._dict.getItem(parentKey);
                fullNameObj.name = m_parentObj.sourceItem.value + "-" + fullNameObj.name;

                this._resecurFullName(m_parentObj.sourceItem.parentKey, fullNameObj, true);
            }
        },

        /* 获取文本值 */
        getTextValue: function (key, needParentTxt) {
            var m_obj = this._dict.getItem(key);
            if (m_obj) {

                var m_name = m_obj.sourceItem.value;

                if (needParentTxt && m_obj.sourceItem && m_obj.sourceItem.parentKey > 0) {
                    m_name = this._dict.getItem(m_obj.sourceItem.parentKey).sourceItem.value + "-" + m_name;
                }

                return m_name;
            }
            else {
                return "";
            }
        },

        selTvItem: function (key) {
            var obj = this._dict.getItem(key);

            this._ctrl.find('span[type=text]').removeClass('tv_bt_click');
            if (obj) {
                obj.textCtrl.addClass('tv_bt_click');
                this.selectedItem = obj.sourceItem;
            }
        },

        clearSelectedItem: function () {
            this.selectedItem = null;
            this._ctrl.find('span[type=text]').removeClass('tv_bt_click');
        },

        clickItem: function (key) {
            this._dict.getItem(key).textCtrl.click();
        },

        /* 添加子节点 */
        addChildItem: function (sourceObj) {
            uicontrol.treeView.event.createCtrlContent.call(this, this._ctrl, sourceObj, this._dict, this._clickItemEvent);
            uicontrol.treeView.event._changeSize.call(this);

            var parentObj = this._dict.getItem(sourceObj[0].parentKey);
            if (parentObj) {
                parentObj.sourceItem.children.push(sourceObj[0]);
                parentObj.childCtrl.css("display", "block");
            }
        },

        /* 修改子节点 */
        modifyChildItem: function (key, value, sourceobj) {
            var m_obj = this._dict.getItem(key);
            var m_textCtrl = m_obj.textCtrl;
            if (m_textCtrl) {
               if(this._constructDisplayTxt){
                    value = this._constructDisplayTxt(m_obj.sourceItem);
                }

                m_textCtrl.html(value);

                if(this.selectedItem){
                    this.selectedItem.value = value;
                }
            }

            m_obj.sourceItem.tag = sourceobj;
        },

        /* 删除子节点 */
        deleteChildItem: function (key) {

            var m_obj = this._dict.getItem(key);
            var m_containerCtrl = m_obj.containerCtrl;

            var m_parentCtrl = m_containerCtrl.parent();
            var m_liCtrl = m_parentCtrl.parent();

            if (m_containerCtrl) {

                m_obj.childCtrl.remove();
                m_containerCtrl.remove();

                if (m_obj.sourceItem.parentKey == 0) {
                    m_parentCtrl.remove();
                }

                this.selectedItem = null;

                uicontrol.treeView.event._changeSize.call(this);
            }
        },

        /* 清除所有数据 */
        clearAllItems: function () {
            this._ctrl.empty();
            this._keys = [];
        },

        /* 获取所有关键字 */
        getAllKeys: function () {
            return this._keys;
        },

        /* 获取选择的数据 */
        getCheckedValues: function () {
            var values = [];

            var chkCtrls = this._ctrl.find('input[name=' + this._ctrlId + 'check]');
            $.each(chkCtrls, function (i, item) {
                if (item.checked) {
                    values.push($(item).val());
                }
            });

            return values;
        },

        /* 设置选择的数据 */
        setCheckedValues: function (values) {
            var tempCache = new datastruct.dictionary();

            if (values) {
                $.each(values, function (i, item) {
                    tempCache.setItem(item, null);
                });
            }

            var m_thisObj = this;

            var chkCtrls = this._ctrl.find('input[name=' + this._ctrlId + 'check]');
            $.each(chkCtrls, function (i, item) {
                if (tempCache.containKey($(item).val())) {
                    item.checked = true;
                }
                else {
                    item.checked = false;
                }

                m_thisObj._selCheckBox(item, $(item).val());
            });
        },

        /* 清理选择的数据 */
        clearCheckedValues: function (values) {
            var tempCache = new datastruct.dictionary();

            if (values) {
                $.each(values, function (i, item) {
                    tempCache.setItem(item, null);
                });
            }

            var m_thisObj = this;

            var chkCtrls = this._ctrl.find('input[name=' + this._ctrlId + 'check]');
            $.each(chkCtrls, function (i, item) {
                if (tempCache.containKey($(item).val())) {
                    item.checked = false;
                }

                m_thisObj._selCheckBox(item, $(item).val());
            });
        },

        /* 选择复选框 */
        _selCheckBox: function (chbCtrl, key) {

            var itemObj = this._dict.getItem(key);
            var childCtrls = itemObj.childCtrl.find('input[name=' + this._ctrlId + 'check]');

            if(!this._isForbitSynChild){
                $.each(childCtrls, function (i, item) {
                    item.checked = chbCtrl.checked;
                });
            }

            /* 选中 */
            if (chbCtrl.checked) {
                this._recurSetParentCheckBox($(chbCtrl).attr("parentKey"), chbCtrl.checked);
            }
        },

        _recurSetParentCheckBox: function (parentKey, checked) {

            if (parentKey != "0") {
                var itemObj = this._dict.getItem(parentKey);
                var ctrl = itemObj.chooseCtrl;

                if (!ctrl[0].checked) {
                    ctrl[0].checked = checked;
                    this._recurSetParentCheckBox($(ctrl).attr("parentKey"), checked);
                }
            }
        }
    };
    /* 内部子对象 */
    uicontrol.treeView.Item = function () {

        /* 子对象的容器 Table */
        this.containerCtrl = null;

        /* 扩展图标 Span */
        this.expendCtrl = null;

        /* 现实文本 Span */
        this.textCtrl = null;

        /* 选择框 */
        this.chooseCtrl = null;

        /* 下层 Div */
        this.childCtrl = null;

        /* 延迟加载数据的标志 */
        this.loadSymbol = false;

        /* 数据对象 */
        this.sourceItem = null;
    };
    /* 事件机制 */
    uicontrol.treeView.event = {
        /* 创建控件的内容 */
        createCtrlContent: function (ctrl, sourceObj, dict, clickItemEvent) {

            /* uicontrol.treeView对象 */
            var thisObj = this;
            if (!sourceObj) {
                return;
            }

            $.each(sourceObj, function (i, sourceItem) {

                /* 填充关键字数组 */
                thisObj._keys.push(sourceItem.key);

                var itemCtrl = new uicontrol.treeView.Item();
                itemCtrl.containerCtrl = $("<table></table>");

                /* 扩展图标 */
                itemCtrl.expendCtrl = $("<span style='cursor: pointer;'></span>");
                /* 无子集 */
                if (sourceItem.children.length === 0 || thisObj._isCollapse) {
                    itemCtrl.expendCtrl.addClass("ui-icon ui-icon-circle-triangle-e");
                }
                else {
                    itemCtrl.expendCtrl.addClass("ui-icon ui-icon-circle-triangle-s");
                }
                itemCtrl.expendCtrl.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });

                /* 文本显示控件 */
                var m_txt = sourceItem.value;
                if(thisObj._constructDisplayTxt){
                    m_txt = thisObj._constructDisplayTxt(sourceItem);
                }

                itemCtrl.textCtrl = $("<span id='" + thisObj._ctrlId + "_sp_" + sourceItem.key + "' style='cursor: pointer; margin: 5px;' type=text>" + m_txt + "</span>");
                if (thisObj._dbClickEvent) {
                    itemCtrl.textCtrl.dblclick(thisObj._dbClickEvent);
                }

                /* 选择控件 */
                if (thisObj._operaModel && thisObj._operaModel == "checkmodel") {
                    itemCtrl.chooseCtrl = $("<input name='" + thisObj._ctrlId + "check' type='checkbox' value='" + sourceItem.key + "' parentkey='" + sourceItem.parentKey + "' />");

                    itemCtrl.chooseCtrl.click(function () {
                        thisObj._selCheckBox(this, sourceItem.key);

                        if (clickItemEvent) {
                            clickItemEvent.call(this, sourceItem);
                        }
                    });
                }
                else {
                    /* 单击事件 */
                    itemCtrl.textCtrl.click(function () {
                        ctrl.find('span[type=text]').removeClass('tv_bt_click');
                        $(this).addClass('tv_bt_click');
                        thisObj.selectedItem = sourceItem;

                        if (clickItemEvent) {
                            clickItemEvent.call(sourceItem);
                        }
                    });
                }

                if(thisObj._isCollapse){
                    /* 下级控件 */
                    itemCtrl.childCtrl = $("<div style='margin-left:16px; display: none'></div>");
                }
                else{
                    /* 下级控件 */
                    itemCtrl.childCtrl = $("<div style='margin-left:16px;'></div>");
                }

                var m_expendCtrl = itemCtrl.expendCtrl;
                var m_childCtrl = itemCtrl.childCtrl;
                /* 扩展事件 */
                itemCtrl.expendCtrl.click(function () {
                    if (m_childCtrl.css("display") === "none") {

                        /* 存在子集数据 */
                        if (sourceItem.children.length > 0) {
                            m_expendCtrl.removeClass("ui-icon ui-icon-circle-triangle-e");
                            m_expendCtrl.addClass("ui-icon ui-icon-circle-triangle-s");
                            m_childCtrl.css("display", "block");
                            
                            if(thisObj._expandEvent){
                                thisObj._expandEvent();
                            }
                        }
                    }
                    else {
                        m_expendCtrl.removeClass("ui-icon ui-icon-circle-triangle-s");
                        m_expendCtrl.addClass("ui-icon ui-icon-circle-triangle-e");
                        m_childCtrl.css("display", "none");

                        if(thisObj._collapseEvent){
                            thisObj._collapseEvent();
                        }
                    }
                });

                var trCtrl = $("<tr></tr>");
                var tdCtrl = $("<td class='treeview-td'></td>");
                tdCtrl.append(itemCtrl.expendCtrl);
                trCtrl.append(tdCtrl);

                tdCtrl = $("<td class='treeview-td'></td>");
                tdCtrl.append(itemCtrl.chooseCtrl);
                tdCtrl.append(itemCtrl.textCtrl);
                trCtrl.append(tdCtrl);

                itemCtrl.containerCtrl.append(trCtrl);

                itemCtrl.sourceItem = sourceItem;

                dict.setItem(sourceItem.key, itemCtrl);

                if (dict.containKey(sourceItem.parentKey)) {

                    var parentObj = dict.getItem(sourceItem.parentKey);
                    var parentCtrl = parentObj.childCtrl;

                    parentCtrl.append(itemCtrl.containerCtrl).append(itemCtrl.childCtrl);
                }
                else {
                    if (thisObj._displayModel && thisObj._displayModel == "inline") {
                        var liCtrl = $("<li class='treeview-pdcli'></li>");
                        liCtrl.append(itemCtrl.containerCtrl).append(itemCtrl.childCtrl);
                        ctrl.append(liCtrl);

                        thisObj.nodeList.push(liCtrl);
                    }
                    else {
                        ctrl.append(itemCtrl.containerCtrl).append(itemCtrl.childCtrl);
                    }
                }

                /* 递归 */
                uicontrol.treeView.event.createCtrlContent.call(thisObj, ctrl, sourceItem.children, dict, clickItemEvent);
            });
        },

        /* 改变大小 */
        _changeSize: function () {
            var maxHeight = 0;
            $.each(this.nodeList, function () {
                var m_height = Number(this[0].offsetHeight);

                if (m_height > maxHeight) {
                    maxHeight = m_height;
                }
            });

            $.each(this.nodeList, function () {
                var m_height = Number(this[0].offsetHeight);

                if (m_height < maxHeight) {
                    $(this).css("min-height", maxHeight - 12);
                }
            });
        }
    };
    uicontrol.treeView.fn.init.prototype = uicontrol.treeView.fn;
    /*-------------------------------*/

    /* 
    -----单选或复选选择控件----- 
    */
    uicontrol.selectbox = function (ctrlId, type, clickEvent) {
        var obj = new uicontrol.selectbox.fn.init(ctrlId, type, clickEvent);
        return obj;
    };
    uicontrol.selectbox.fn = {

        /* 构造函数 */
        init: function (ctrlObj, type, clickEvent) {

            if (typeof (ctrlObj) == "string") {
                this.ctrlId = ctrlObj;
                this.ctrl = $("#" + ctrlObj);
            }
            else {
                this.ctrlId = ctrlObj.attr("id");
                this.ctrl = ctrlObj;
            }

            this.type = type;
            this.clickEvent = clickEvent;
        },

        /* 绑定数据源 */
        bindSource: function (source) {
            var htmlArr = [];
            var i = 0;
            var thisObj = this;
            this.ctrl.empty();

            var m_eventHtml = "";
            if (this.clickEvent) {
                m_eventHtml = " onchange='" + thisObj.clickEvent + ".call(this);'";
            }

            if (source) {
                $.each(source, function () {
                    var m_id = i + "rd_" + thisObj.ctrlId;
                    htmlArr.push("<li style='float: left; margin: 0px 10px 0px 0px'><input type='" + thisObj.type + "' id=" + m_id + " tag='" + this.value + "' value='" + this.key + "' name='rd" + thisObj.ctrlId + "' " + m_eventHtml + " />");
                    htmlArr.push("<span style='cursor: pointer;' onmouseover='commoncore.func.addFontStyle_b.call(this);' onmouseout='commoncore.func.removeFontStyle_b.call(this);' onclick='commoncore.func.triggerInput(\"" + m_id + "\");'>" + this.value + "</span></li>");

                    if (this.otherHtml) {
                        htmlArr.push(this.otherHtml);
                    }

                    i++;
                });
            }

            this.ctrl.append(htmlArr.join(""));
        },

        /* 获取选择项 */
        getSelectedItem: function () {

            var m_selectItems = [];
            var m_options = $("input[name='rd" + this.ctrlId + "']");
            $.each(m_options, function () {
                var m_this = $(this);
                if (m_this.attr("checked")) {
                    m_selectItems.push(m_this.val());
                }
            });

            return m_selectItems;
        },

        /* 获取选择项文本 */
        getSelectedItemText: function () {

            var m_selectItems = [];
            var m_options = $("input[name='rd" + this.ctrlId + "']");
            $.each(m_options, function () {
                var m_this = $(this);
                if (m_this.attr("checked")) {
                    m_selectItems.push(m_this.attr("tag"));
                }
            });

            return m_selectItems;
        },

        /* 获取选择项对象 */
        getSelectedItemObj: function () {

            var m_selectItems = [];
            var m_options = $("input[name='rd" + this.ctrlId + "']");
            $.each(m_options, function () {
                var m_this = $(this);
                if (m_this.attr("checked")) {
                    m_selectItems.push({ key: m_this.val(), value: m_this.attr("tag") });
                }
            });

            return m_selectItems;
        },

        /* 设置选择项 */
        setSelectedItem: function (items) {

            var m_tempCache = new datastruct.dictionary();

            if (items) {
                $.each(items, function () {
                    m_tempCache.setItem(this.key, this.value);
                });
            }
            var thisObj = this;

            var m_options = $("input[name='rd" + this.ctrlId + "']");
            $.each(m_options, function () {
                var m_this = $(this);
                if (m_tempCache.containKey(m_this.val())) {
                    m_this.attr("checked", true);
                }
                else {
                    if (thisObj.type == "checkbox") {
                        m_this.attr("checked", false);
                    }
                }
            });
        },

        /* 全选 */
        selectAll: function () {
            if (this.type == "checkbox") {
                $("input[name='rd" + this.ctrlId + "']").attr("checked", true);
            }
        },

        /* 反选 */
        unSelectAll: function () {
            if (this.type == "checkbox") {
                $("input[name='rd" + this.ctrlId + "']").attr("checked", false);
            }
        },

        /* 清理选项 */
        clear: function () {
            var m_options = $("input[name='rd" + this.ctrlId + "']");
            $.each(m_options, function () {
                $(this).attr("checked", false);
            });
        }
    };
    uicontrol.selectbox.fn.init.prototype = uicontrol.selectbox.fn;
    /*-------------------------------*/

    /* 
    -----图片滑动控件----- 
    */
    uicontrol.pictureSlip = function (ctrl, param) {
        var obj = new uicontrol.pictureSlip.fn.init(ctrl, param);
        return obj;
    };
    uicontrol.pictureSlip.fn = {

        /* 构造函数 */
        init: function (ctrl, param) {

            if (typeof (ctrl) == "string") {
                this.ctrl = $("#" + ctrl);
            }
            else {
                this.ctrl = ctrl;
            }

            var m_mainArea = $("<div style='height: 390px;'></div>");
            this.mainView = $("<img src='/bzm/css/images/nopic.png' style='cursor: pointer; max-height: 390px; max-width: 390px;' onload='commoncore.func.positionCenterImg.call(this, 390);' onerror='commoncore.func.failLoadImg.call(this);' />");
            m_mainArea.append(this.mainView);
            this.ctrl.append(m_mainArea);

            this.slipArea = $("<ul class='picSlip'></ul>");
            this.ctrl.append(this.slipArea);

            this.psParam = {};

            this.picDialog = $("<div id='" + this.ctrl.attr("id") + "_dialog'></div>");
            var m_leftArea = $("<div class='bigPicSlipView'></div>");
            this.bigPicImg = $("<img style='max-width: 550px; max-height: 550px' onload='commoncore.func.positionCenterImg.call(this, 550);' onerror='commoncore.func.failLoadImg.call(this);' />");
            m_leftArea.append(this.bigPicImg);

            var m_rightArea = $("<div class='bigPicSlip'  style='height: 550px'></div>");

            this.imgCtrlsInBigPic = $("<ul></ul>");
            m_rightArea.append(this.imgCtrlsInBigPic);

            this.picDialog.append(m_leftArea);
            this.picDialog.append(m_rightArea);

            $(document).append(this.picDialog);
            this.bigPicDialog = new uicontrol.dialog(this.picDialog, "", { width: 925, position: param.position });
        },

        /* 绑定图片数据 */
        bindSource: function (pictureSource, pictureTitle) {

            this.pictureTitle = pictureTitle;
            this.pictureSource = pictureSource;

            var thisObj = this;

            this.currPicIndex = 0;

            if(pictureSource.standardPics && pictureSource.standardPics.length > 0){
                this.mainView.attr("src", pictureSource.standardPics[0].src);
                this.mainView.attr("tag", pictureSource.bigPics[0].src);
                this.mainView.click(function () {

                    thisObj.imgCtrlsInBigPic.empty();
                    $.each(thisObj.pictureSource.smallPics, function (i, item) {
                        var m_b_li = $("<li class='img-li'></li>");
                        var m_b_img = $("<img class='small-img' src='" + item.src + "' bigtag='" + thisObj.pictureSource.bigPics[i].src + "' tag='" + thisObj.pictureSource.standardPics[i].src + "' style='max-width: 60px; max-height: 60px;' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this);' />");
                        m_b_li.append(m_b_img);
                        m_b_li.hover(function () {
                            $(this).css("border-color", "#A60000");

                            thisObj.bigPicImg.attr("src", thisObj.pictureSource.bigPics[i].src);

                        }, uicontrol.pictureSlip.fn._picMoveOut);

                        thisObj.imgCtrlsInBigPic.append(m_b_li);
                    });
                    thisObj.bigPicDialog.setTitle(thisObj.pictureTitle);
                    thisObj.bigPicImg.attr("src", $(this).attr("tag"));
                    thisObj.bigPicDialog.show();
                });
            }
            else{
                this.mainView.attr("src", "/bzm/css/images/nopic.png");
                this.mainView.attr("tag", "");
                this.mainView.unbind("click"); 
            }

            thisObj.slipArea.empty();
            this.imgCtrls = [];
            if (pictureSource.smallPics.length > 5) {
                var m_li = $("<li></li>");
                thisObj.lastArrowBt = $("<div class='last-arrow'></div>");
                thisObj.lastArrowBt.mousedown(function () {
                    thisObj.lastArrowBt.addClass("down-last-arrow");

                    if (thisObj.currPicIndex < 0) {
                        return;
                    }
                    thisObj.currPicIndex = thisObj.currPicIndex - 2;
                    if (thisObj.currPicIndex < 0) {
                        thisObj.currPicIndex = 0;
                    }

                    /* 改变图片 */
                    $.each(thisObj.imgCtrlList, function (i, item) {
                        if (i == 0) {
                            thisObj.mainView.attr("src", pictureSource.standardPics[thisObj.currPicIndex + i].src);
                            thisObj.mainView.attr("tag", pictureSource.bigPics[thisObj.currPicIndex + i].src);
                        }

                        if (pictureSource.smallPics[thisObj.currPicIndex + i]) {
                            item.attr("src", pictureSource.smallPics[thisObj.currPicIndex + i].src);
                            item.attr("tag", pictureSource.standardPics[thisObj.currPicIndex + i].src);
                            item.attr("bigtag", pictureSource.bigPics[thisObj.currPicIndex + i].src);
                        }
                    });
                });
                thisObj.lastArrowBt.mouseup(function () {
                    thisObj.lastArrowBt.removeClass("down-last-arrow");
                });
                m_li.append(thisObj.lastArrowBt);
                thisObj.slipArea.append(m_li);
            }

            thisObj.imgCtrlList = [];
            $.each(pictureSource.smallPics, function (i, item) {

                var m_li = $("<li class='img-li'></li>");
                var m_img = $("<img class='small-img' src='" + item.src + "' bigtag='" + pictureSource.bigPics[i].src + "' tag='" + pictureSource.standardPics[i].src + "' style='max-width: 60px; max-height: 60px;' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this);' />");
                m_li.append(m_img);

                thisObj.imgCtrlList.push(m_img);

                m_li.hover(function () { $(this).css("border-color", "#A60000"); }, uicontrol.pictureSlip.fn._picMoveOut);
                m_img.hover(function () {
                    thisObj.mainView.attr("src", $(this).attr("tag"));
                    thisObj.mainView.attr("tag", $(this).attr("bigtag"));
                });

                /* 显示当前图片 */
                if (i < thisObj.currPicIndex + 5 && i > thisObj.currPicIndex - 1) {
                    thisObj.imgCtrls.push(m_img);
                    thisObj.slipArea.append(m_li);
                }
            });

            if (pictureSource.smallPics.length > 5) {
                var m_li = $("<li></li>");
                thisObj.nextArrowBt = $("<div class='next-arrow'></div>");
                thisObj.nextArrowBt.mousedown(function () {
                    thisObj.nextArrowBt.addClass("down-next-arrow");

                    if (thisObj.currPicIndex + 5 > pictureSource.smallPics.length) {
                        return;
                    }
                    thisObj.currPicIndex = thisObj.currPicIndex + 2;
                    if (thisObj.currPicIndex + 5 > pictureSource.smallPics.length) {
                        thisObj.currPicIndex = pictureSource.smallPics.length - 5;
                    }

                    /* 改变图片 */
                    $.each(thisObj.imgCtrlList, function (i, item) {
                        if (i == 0) {
                            thisObj.mainView.attr("src", pictureSource.standardPics[thisObj.currPicIndex + i].src);
                            thisObj.mainView.attr("tag", pictureSource.bigPics[thisObj.currPicIndex + i].src);
                        }

                        if (pictureSource.smallPics[thisObj.currPicIndex + i]) {
                            item.attr("src", pictureSource.smallPics[thisObj.currPicIndex + i].src);
                            item.attr("tag", pictureSource.standardPics[thisObj.currPicIndex + i].src);
                            item.attr("bigtag", pictureSource.bigPics[thisObj.currPicIndex + i].src);
                        }
                    });
                });
                thisObj.nextArrowBt.mouseup(function () {
                    thisObj.nextArrowBt.removeClass("down-next-arrow");
                });
                m_li.append(thisObj.nextArrowBt);
                thisObj.slipArea.append(m_li);
            }

        },

        /* 设置主图 */
        setMainPic: function(){
        
        },

        /* 图片鼠标离开 */
        _picMoveOut: function () {
            $(this).css("border-color", "#ccc");
        }
    };
    uicontrol.pictureSlip.fn.init.prototype = uicontrol.pictureSlip.fn;
    /*-------------------------------*/

})(window);

/* JQuery定时器 */
jQuery.fn.extend({
    everyTime: function (interval, label, fn, times) {
        return this.each(function () {
            jQuery.timer.add(this, interval, label, fn, times);
        });
    },
    oneTime: function (interval, label, fn) {
        return this.each(function () {
            jQuery.timer.add(this, interval, label, fn, 1);
        });
    },
    stopTime: function (label, fn) {
        return this.each(function () {
            jQuery.timer.remove(this, label, fn);
        });
    }
});

jQuery.extend({
    timer: {
        global: [],
        guid: 1,
        dataKey: "jQuery.timer",
        regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
        powers: {
            // Yeah this is major overkill... 
            'ms': 1,
            'cs': 10,
            'ds': 100,
            's': 1000,
            'das': 10000,
            'hs': 100000,
            'ks': 1000000
        },
        timeParse: function (value) {
            if (value == undefined || value == null)
                return null;
            var result = this.regex.exec(jQuery.trim(value.toString()));
            if (result[2]) {
                var num = parseFloat(result[1]);
                var mult = this.powers[result[2]] || 1;
                return num * mult;
            } else {
                return value;
            }
        },
        add: function (element, interval, label, fn, times) {
            var counter = 0;

            if (jQuery.isFunction(label)) {
                if (!times)
                    times = fn;
                fn = label;
                label = interval;
            }

            interval = jQuery.timer.timeParse(interval);

            if (typeof interval != 'number' || isNaN(interval) || interval < 0)
                return;

            if (typeof times != 'number' || isNaN(times) || times < 0)
                times = 0;

            times = times || 0;

            var timers = jQuery.data(element, this.dataKey) || jQuery.data(element, this.dataKey, {});

            if (!timers[label])
                timers[label] = {};

            fn.timerID = fn.timerID || this.guid++;

            var handler = function () {
                if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
                    jQuery.timer.remove(element, label, fn);
            };

            handler.timerID = fn.timerID;

            if (!timers[label][fn.timerID])
                timers[label][fn.timerID] = window.setInterval(handler, interval);

            this.global.push(element);

        },
        remove: function (element, label, fn) {
            var timers = jQuery.data(element, this.dataKey), ret;

            if (timers) {

                if (!label) {
                    for (label in timers)
                        this.remove(element, label, fn);
                } else if (timers[label]) {
                    if (fn) {
                        if (fn.timerID) {
                            window.clearInterval(timers[label][fn.timerID]);
                            delete timers[label][fn.timerID];
                        }
                    } else {
                        for (var fn in timers[label]) {
                            window.clearInterval(timers[label][fn]);
                            delete timers[label][fn];
                        }
                    }

                    for (ret in timers[label]) break;
                    if (!ret) {
                        ret = null;
                        delete timers[label];
                    }
                }

                for (ret in timers) break;
                if (!ret)
                    jQuery.removeData(element, this.dataKey);
            }
        }
    }
});

jQuery(window).bind("unload", function () {
    jQuery.each(jQuery.timer.global, function (index, item) {
        jQuery.timer.remove(item);
    });
});

/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Cloudream (cloudream@gmail.com). */
jQuery(function ($) {
    $.datepicker.regional['zh-CN'] = {
        closeText: '关闭',
        prevText: '&#x3c;上月',
        nextText: '下月&#x3e;',
        currentText: '今天',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
		'七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六',
		'七', '八', '九', '十', '十一', '十二'],
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        weekHeader: '周',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '年'
    };
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});

$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----商品品牌选择控件----- 
    */
    bizcontrol.selectbrand = function (ctrl) {
        var obj = new bizcontrol.selectbrand.fn.init(ctrl);
        return obj;
    };
    bizcontrol.selectbrand.fn = {

        /* 构造函数 */
        init: function (ctrl) {
            this.ctrl = ctrl;
            this.brandNameTxt = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });

            var thisObj = this;
            this.btSelect.click(function () { thisObj.openSelectFrm(); });
            this.brandNameTxt.change(function () { thisObj.inputBrandName($.trim($(this).val())); });

            this._brandDialog = $("<div style='display: none;'></div>");
            this._brandList = $("<div id='group_" + this.ctrl.attr("id") + "'></div>");

            this._brandDialog.append(this._brandList);
            this.ctrl.append(this.brandNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._brandDialog);

            this.brandSource = null;
            this.brandId = 0;
            this.brandName = "";
        },

        /* 打开商品品牌的选择窗体 */
        openSelectFrm: function () {

            var thisObj = this;
            if (!this.brandDialog) {
                this.brandDialog = new uicontrol.dialog(this._brandDialog, mlm.C0156, { width: 910, height: 540, position: ["auto", 50] }, function () { thisObj.selectBrand(); });
            }

            if (!this.brandSource || !this.brandList) {
                this.brandList = new uicontrol.groupList(this._brandList,
                                                              { groupKey: "BrandType_Id", groupName: "BrandTypeName", itemKey: "Brand_Id", seqProp: "Seq",
                                                                  constructItemFunc: bizcontrol.selectbrand.fn.constructBrandItem
                                                              });

                var m_brand = new pdm.brand();
                m_brand.getAllBrands(function (brands) {
                    thisObj.brandSource = brands;
                    thisObj.brandList.bindSource(brands);

                    var m_lis = thisObj._brandList.find("li");
                    m_lis.css("cursor", "pointer");
                    $.each(m_lis, function () {
                        var m_liCtrl = $(this);
                        m_liCtrl.hover(function () { m_liCtrl.css("border-color", "#800000"); }, function () { m_liCtrl.css("border-color", "#c0c0c0"); });
                        m_liCtrl.click(function () {
                            m_lis.css("background-color", "#FFFFFF");
                            m_lis.css("color", "#222222");

                            m_liCtrl.css("background-color", "#F0F0F0");
                            m_liCtrl.css("color", "#800000");

                            thisObj.selectedBrand = { brandId: m_liCtrl.find("input[tag='brandId']").val(), brandName: m_liCtrl.find("span[tag='brandName']").html() };
                        });
                        m_liCtrl.dblclick(function () { thisObj.selectBrand(); });

                        if (thisObj.brandId == m_liCtrl.attr("tag")) {
                            m_liCtrl.css("background-color", "#F0F0F0");
                            m_liCtrl.css("color", "#800000");
                        }
                    });

                    thisObj.brandLiItem = m_lis;
                });
            }
            else {
                this.brandLiItem.css("background-color", "#FFFFFF");
                this.brandLiItem.css("color", "#222222");

                if (this.brandId) {
                    var selectedLi = this._brandList.find("li[tag='" + this.brandId + "']");
                    selectedLi.css("background-color", "#F0F0F0");
                    selectedLi.css("color", "#800000");
                }
            }

            this.brandDialog.show();
        },

        /* 创建品牌单元格 */
        constructBrandItem: function (brand) {
            var m_html = [];
            m_html.push("<img src='" + brand.LogoUrl + "' style='height: 60px' />");

            var m_website = "";
            if (brand.WebSite.indexOf("http://") > -1) {
                m_website = brand.WebSite;
            }
            else {
                m_website = "http://" + brand.WebSite;
            }

            m_html.push("<div class='brand-item'><span tag='brandName'>" + brand.BrandName.replace('-', '<br>') + "</span><input type='hidden' tag='brandId' value='" + brand.Brand_Id + "' /></div>");

            var brand = $(m_html.join(""));

            return brand;
        },

        /* 选择商品品牌 */
        selectBrand: function () {
            if (!this.selectedBrand) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C0157);
                return;
            }

            this.brandId = this.selectedBrand.brandId;
            this.brandName = this.selectedBrand.brandName;

            this.brandNameTxt.val(this.brandName.replace("<br>", "-"));
            this.brandDialog.close();
        },

        /* 输入商品品牌名称 */
        inputBrandName: function (brandName) {

            if (!brandName) {
                this.clear();
                return;
            }

            var thisObj = this;
            if (!this.brandJson) {
                var m_brand = new pdm.brand();
                m_brand.getAllBrands(function (source) {
                    thisObj.brandSource = source;
                    thisObj.brandJson = datastruct.convertion.tableToJson(source);
                    thisObj._getBrand(brandName);
                });
            }
            else {
                this._getBrand(brandName);
            }
        },

        /* 设置商品品牌 */
        setBrand: function (brand) {
            this.brandId = brand.Brand_Id;
            this.brandName = brand.BrandName;
            this.brandNameTxt.val(this.brandName);
        },

        /* 获取商品品牌对象 */
        _getBrand: function (brandName) {

            var m_brand = null;
            $.each(this.brandJson, function () {
                if (this.BrandName.indexOf(brandName) > -1) {
                    m_brand = this;
                    return false;
                }
            });

            if (!m_brand) {
                pageframe.control.alertDialog.showAlertInfo(brandName + mlm.C0158);
                this.clear();
                return;
            }

            this.brandId = m_brand.Brand_Id;
            this.brandName = m_brand.BrandName;

            this.brandNameTxt.val(this.brandName);
        },

        /* 清除控件值 */
        clear: function () {
            this.brandId = null;
            this.brandName = null;
            this.brandNameTxt.val("");
            this.selectedBrand = null;
        }
    };
    bizcontrol.selectbrand.fn.init.prototype = bizcontrol.selectbrand.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----成本科目选择控件----- 
    */
    bizcontrol.selectcostsubject = function (ctrlId) {
        var obj = new bizcontrol.selectcostsubject.fn.init(ctrlId);
        return obj;
    };
    bizcontrol.selectcostsubject.fn = {

        /* 构造函数 */
        init: function (ctrlId) {
            this.ctrl = $("#" + ctrlId);
            this.costSubjectSource = null;

            var m_thisObj = this;
            this.txtCostSubject = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            this.txtCostSubject.change(function () { m_thisObj._changeCostSubject(); });

            var mImgBt = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            mImgBt.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            mImgBt.click(function () { m_thisObj._openSelectionFrm(); });

            this.ctrl.append(this.txtCostSubject);
            this.ctrl.append(mImgBt);

            this.selectContainerCtrl = $("<div style='display: none;'></div>");
            this.costSubjectTreeCtrl = $("<ul></ul>");

            this.selectContainerCtrl.append(this.costSubjectTreeCtrl);

            $(document).append(this.selectContainerCtrl);
        },

        /* 清理 */
        setObj: function (costSubject) {
            this.txtCostSubject.val(costSubject.costSubjectNames);
            this.txtCostSubject.attr("costSubjectIds", costSubject.costSubject_Ids);
        },

        /* 获取对象 */
        getObj: function () {
            var obj = { costSubjectNames: null, costSubject_Ids: null };
            obj.costSubjectNames = this.txtCostSubject.val();
            obj.costSubject_Ids = this.txtCostSubject.attr("costSubjectIds");

            return obj;
        },

        /* 清理 */
        clearObj: function () {
            this.txtCostSubject.val("");
            this.txtCostSubject.attr("costSubjectIds", "");
        },

        /* 清理 */
        clear: function () {
            this.costSubjectSource = null;
            this.txtCostSubject.val("");
            this.txtCostSubject.attr("costSubjectIds", "");
        },

        /* 打开选择的窗体 */
        _openSelectionFrm: function () {

            var m_thisObj = this;

            if (!this.selectContainer) {
                this.selectContainer = new uicontrol.dialog(this.selectContainerCtrl, mlm.C0577 + mlm.C0497, { width: 850, height: 500, position: ["auto", 60] }, function () { m_thisObj._selectCostSubject(); });
            }

            var m_costSubjectIds = this.txtCostSubject.attr("costSubjectIds");
            if (m_costSubjectIds) {
                m_costSubjectIds = m_costSubjectIds.replace(/#/g, '').split(",");
            }

            var m_costsubject = new fm.costsubject();
            if (!this.costSubjectSource) {
                m_costsubject.getAllCostSubjects(function (source) {
                    m_thisObj._bindControl(source, m_costSubjectIds);
                });
            }
            else {
                m_thisObj.costSubjectTreeCtrl.selTvItem(m_costSubjectIds);
            }

            this.selectContainer.show();
        },

        /* 绑定控件 */
        _bindControl: function (source, m_costSubjectIds) {
            this.costSubjectSource = {};
            this.costSubjectSource.tableList = source;
            this.costSubjectSource.objList = datastruct.convertion.tableToJson(source);

            var m_this = this;

            this.costSubjectTreeCtrl = new uicontrol.treeView(this.costSubjectTreeCtrl, this.costSubjectSource.tableList, null,
                                                        { displayModel: "inline", sourceFormat: "table", operaModel: null,
                                                            keyColumn: "CostSubject_Id", parentKeyColumn: "ParentCostSubject_Id", displayColumn: "CostSubjectName",
                                                            dbClickEvent: function () { m_this._selectCostSubject(); }
                                                        });
            this.costSubjectTreeCtrl.loadSource();
            this.costSubjectTreeCtrl.selTvItem(m_costSubjectIds);
        },

        /* 选择区域 */
        _selectCostSubject: function () {

            if (this.costSubjectTreeCtrl.selectedItem) {
                this.txtCostSubject.val(this.costSubjectTreeCtrl.selectedItem.value);
                this.txtCostSubject.attr("costSubjectIds", this.costSubjectTreeCtrl.selectedItem.key);
            }

            this.selectContainer.close();
        },

        /* 改变区域事件 */
        _changeCostSubject: function () {
            var m_thisObj = this;

            if (!this.costSubjectSource) {
                var m_costsubject = new fm.costsubject();
                m_costsubject.getAllCostSubjects(function (source) {

                    m_thisObj.costSubjectSource = {};
                    m_thisObj.costSubjectSource.tableList = source;
                    m_thisObj.costSubjectSource.objList = datastruct.convertion.tableToJson(source);

                    m_thisObj.costSubjectTreeCtrl = new uicontrol.treeView(m_thisObj.costSubjectTreeCtrl, m_thisObj.costSubjectSource.tableList, null,
                                                        { displayModel: "inline", sourceFormat: "table", operaModel: null,
                                                            keyColumn: "CostSubject_Id", parentKeyColumn: "ParentCostSubject_Id", displayColumn: "CostSubjectName",
                                                            dbClickEvent: function () { m_thisObj._selectCostSubject(); }
                                                        });
                    m_thisObj.costSubjectTreeCtrl.loadSource();

                    m_thisObj._setCostSubjects();
                });
            }
            else {
                m_thisObj._setCostSubjects();
            }
        },

        /* 设置区域 */
        _setCostSubjects: function () {
            var m_costSubjectNames = this.txtCostSubject.val();

            var m_results = null;
            var m_resultIds = null;

            var m_thisObj = this;

            if (m_costSubjectNames) {

                $.each(m_thisObj.costSubjectSource.objList, function () {
                    if (!m_results && this.CostSubjectName.indexOf(m_costSubjectNames) > -1) {
                        m_results = this.CostSubjectName;
                        m_resultIds = this.CostSubject_Id;
                        return;
                    }
                });

                this.txtCostSubject.val(m_results);
                this.txtCostSubject.attr("costSubjectIds", m_resultIds);
            }
            else {
                this.txtCostSubject.val("");
                this.txtCostSubject.attr("costSubjectIds", "");
                this.costSubjectTreeCtrl.selectedItem = null;
            }
        }
    };
    bizcontrol.selectcostsubject.fn.init.prototype = bizcontrol.selectcostsubject.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----区域选择控件----- 
    */
    bizcontrol.selectglobalarea = function (ctrlId, singleModel, queryCondition, constructDisplayTxt, isCollapse, style) {
        var obj = new bizcontrol.selectglobalarea.fn.init(ctrlId, singleModel, queryCondition, constructDisplayTxt, isCollapse, style);
        return obj;
    };
    bizcontrol.selectglobalarea.fn = {

        /* 加载区域 */
        loadRegions: function (regionOptionCtrl) {
            if (!bizcontrol.selectglobalarea.fn.regionSource) {
                var m_globalarea = new othm.globalarea();
                m_globalarea.queryRegions(function (retTable) {
                    bizcontrol.selectglobalarea.fn.regionSource = datastruct.convertion.tableToJson(retTable);

                    regionOptionCtrl.append("<option value=''>" + mlm.C0403 + "</option>");
                    $.each(bizcontrol.selectglobalarea.fn.regionSource, function () {
                        regionOptionCtrl.append("<option value='" + this.GlobalArea_Id + "'>" + this.GlobalAreaName + "</option>");
                    });
                });
            }
            else {
                if (regionOptionCtrl.find("option").length == 0) {
                    regionOptionCtrl.append("<option value=''>" + mlm.C0403 + "</option>");
                    $.each(bizcontrol.selectglobalarea.fn.regionSource, function () {
                        regionOptionCtrl.append("<option value='" + this.GlobalArea_Id + "'>" + this.GlobalAreaName + "</option>");
                    });
                }
            }
        },

        /* 构造函数 */
        init: function (ctrlId, singleModel, queryCondition, constructDisplayTxt, isCollapse, style) {
            this.ctrl = $("#" + ctrlId);
            this.globalAreaSource = null;
            this.singleModel = singleModel;
            this.queryCondition = queryCondition;
            this._constructDisplayTxt = constructDisplayTxt;
            this._isCollapse = true;
            if(style){
                this._style = style;
            }
            else{
                this._style = {};
            }
            this.filterObjs = null;
            if (isCollapse) {
                this._isCollapse = isCollapse;
            }

            var m_thisObj = this;

            if (singleModel) {
                this.txtGlobalArea = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            }
            else {
                if (!this._style.txtclass) {
                    this._style.txtclass = "multitext-input";
                }
                this.txtGlobalArea = $("<textarea cols='20' rows='3' class='" + this._style.txtclass + "' onkeypress='uicontrol.func.checkInput(event);'></textarea>");
            }

            this.txtGlobalArea.change(function () { m_thisObj._changeGlobalArea(); });

            var mImgBt = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            mImgBt.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            mImgBt.click(function () { m_thisObj._openSelectionFrm(); });

            this.ctrl.append(this.txtGlobalArea);
            this.ctrl.append(mImgBt);

            this.selectContainerCtrl = $("<div style='display: none;'></div>");

            var m_tableCtrl = $("<div class='submitForm form-width'  style='width: 827px'></div>");

            var m_trCtrl = $("<div class='submitForm-tr first-item'></div>");
            var m_lbRegionCtrl = $("<span class='title'>" + mlm.C0780 + ":</span>");
            this.ddlRegionCtrl = $("<select class='dropdown-list'></select>");
            this.ddlRegionCtrl.change(function () {
                m_this.filterGAreas();
            });
            m_trCtrl.append(m_lbRegionCtrl);
            m_trCtrl.append(this.ddlRegionCtrl);
            m_tableCtrl.append(m_trCtrl);

            this.loadRegions(this.ddlRegionCtrl);

            var m_tr_1Ctrl = $("<div class='submitForm-tr'></div>");
            var m_lbPYCtrl = $("<span class='title'>" + mlm.C0779 + ":</span>");
            var m_chkPYCtrl = $("<span>" + mlm.C0403 + "</span><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><span>F</span><span>G</span><span>H</span><span>I</span><span>J</span><span>K</span><span>L</span><span>M</span><span>N</span><span>O</span><span>P</span><span>Q</span><span>R</span><span>S</span><span>T</span><span>U</span><span>V</span><span>W</span><span>X</span><span>Y</span><span>Z</span>");
            m_chkPYCtrl.css("margin", "0px 5px 0px 0px");
            m_chkPYCtrl.css("padding", "0px 5px 0px 5px");
            m_chkPYCtrl.addClass("bt");
            m_chkPYCtrl.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            var m_this = this;
            m_chkPYCtrl.click(function () {

                var m_thisCtrl = $(this);
                m_this.conditionPY = m_thisCtrl.text();
                m_chkPYCtrl.css("color", "#000000");
                m_thisCtrl.css("color", "red");

                m_this.filterGAreas();
            });
            m_tr_1Ctrl.append(m_lbPYCtrl);
            m_tr_1Ctrl.append(m_chkPYCtrl);
            m_tableCtrl.append(m_tr_1Ctrl);

            var m_tr_2Ctrl = $("<div class='submitForm-tr last-item' style='height: 415px;overflow-y: scroll; background: #FFFFFF'></div>");
            this.globalAreaTreeCtrl = $("<ul id='" + ctrlId + "_tree'></ul>");
            m_tr_2Ctrl.append(this.globalAreaTreeCtrl);
            m_tableCtrl.append(m_tr_2Ctrl);

            this.selectContainerCtrl.append(m_tableCtrl);

            $(document).append(this.selectContainerCtrl);
        },

        /* 清理 */
        setObj: function (expArea) {
            this.txtGlobalArea.val(expArea.globalAreaNames);
            this.txtGlobalArea.attr("areaIds", expArea.globalArea_Ids);
        },

        /* 获取对象 */
        getObj: function () {
            var obj = { globalAreaNames: null, globalArea_Ids: null };
            obj.globalAreaNames = this.txtGlobalArea.val();
            obj.globalArea_Ids = this.txtGlobalArea.attr("areaIds");

            return obj;
        },

        /* 清理 */
        clearObj: function () {
            this.txtGlobalArea.val("");
            this.txtGlobalArea.attr("areaIds", "");
        },

        /* 清理 */
        clear: function () {
            this.globalAreaSource = null;
            this.txtGlobalArea.val("");
            this.txtGlobalArea.attr("areaIds", "");
        },

        /* 获取数据源 */
        _querySource: function (source) {
            var m_thisObj = this;

            var m_areaIds = this.txtGlobalArea.attr("areaIds");
            if (m_areaIds) {
                m_areaIds = m_areaIds.replace(/#/g, '').split(",");
            }

            m_thisObj.globalAreaSource = {};
            m_thisObj.globalAreaSource.objList = [];
            var m_objarr = datastruct.convertion.tableToJson(source);
            m_thisObj.globalAreaSource.originSource = source;

            /* 支撑内部二级区域过滤 */
            var m_innerareaDict = new datastruct.dictionary();
            $.each(m_objarr, function () {
                if (Number(this.AreaType) == 2) {
                    if (!m_innerareaDict.containKey(this.AreaIndexs)) {
                        var m_dict = new datastruct.dictionary();
                        m_dict.setItem(this.GlobalArea_Id, this.ParentArea_Id);
                        m_innerareaDict.setItem(this.AreaIndexs, m_dict);
                    }
                    else {
                        m_innerareaDict.getItem(this.AreaIndexs).setItem(this.GlobalArea_Id, this.ParentArea_Id);
                    }
                }
            });

            if (!m_thisObj.singleModel) {
                m_thisObj.globalAreaSource.objList.push({ GlobalArea_Id: "-1", ParentArea_Id: "0", Layer: "1", AreaIndexs: "", IsImportant: "0", AreaType: "1",
                    PYType: "", GlobalAreaName: mlm.C0481, SonAreaCount: "0"
                });
            }

            if (m_thisObj.filterObjs && m_thisObj.filterObjs.count > 0) {

                $.each(m_objarr, function () {
                    if (this.AreaType == "1") {
                        if (!m_thisObj.filterObjs.containKey(this.GlobalArea_Id.toString())) {
                            m_thisObj.globalAreaSource.objList.push(this);
                        }
                    }
                    else {
                        if (m_innerareaDict.containKey(this.AreaIndexs)) {
                            var m_countryid = m_innerareaDict.getItem(this.AreaIndexs).getItem(this.GlobalArea_Id);
                            if (!m_thisObj.filterObjs.containKey(this.GlobalArea_Id.toString()) && !m_thisObj.filterObjs.containKey(m_countryid)) {
                                m_thisObj.globalAreaSource.objList.push(this);
                            }
                        }
                    }
                });
            }
            else {
                $.each(m_objarr, function () {
                    m_thisObj.globalAreaSource.objList.push(this);
                });
            }
            m_thisObj.globalAreaSource.tableList = datastruct.convertion.jsonToTable(m_thisObj.globalAreaSource.objList);

            m_thisObj.globalAreaSource.objDict = new datastruct.dictionary();

            $.each(m_thisObj.globalAreaSource.objList, function () {
                m_thisObj.globalAreaSource.objDict.setItem(this.GlobalArea_Id, this);
            });

            m_thisObj._bindControl(m_thisObj.globalAreaSource.objList, m_areaIds);
        },

        /* 打开选择的窗体 */
        _openSelectionFrm: function () {

            var m_thisObj = this;

            if (!this.selectContainer) {
                this.selectContainer = new uicontrol.dialog(this.selectContainerCtrl, mlm.C0237, { width: 850, height: 600, position: ["auto", 15] }, function () { m_thisObj._selectGlobalArea(); });
            }

            var globalarea = new othm.globalarea();

            if (m_thisObj.queryCondition == "country" || m_thisObj.queryCondition == "country&area" || !m_thisObj.queryCondition) {
                if (!this.globalAreaSource) {

                    if (m_thisObj.queryCondition == "country") {
                        globalarea.queryCountries(function (source) {
                            m_thisObj._querySource(source);
                        });
                    }
                    else if (m_thisObj.queryCondition == "country&area") {
                        globalarea.queryCountryAndInnerRegion(function (source) {
                            m_thisObj._querySource(source);
                        });
                    }
                    else {
                        globalarea.getAllGlobalAreas(function (source) {
                            m_thisObj._querySource(source);
                        });
                    }
                }
                else {
                    if (!m_thisObj.singleModel) {
                        m_thisObj._querySource(m_thisObj.globalAreaSource.originSource);

                        m_thisObj.filterGAreas();
                    }
                }
            }
            else {
                globalarea.GlobalArea_Ids = m_thisObj.queryCondition;
                globalarea.queryGlobalAreaByCountries(function (source) {
                    m_thisObj._querySource(source);
                });
            }

            this.selectContainer.show();
        },

        /* 绑定控件 */
        _bindControl: function (source, m_areaIds) {

            var m_param = {};

            if (this.singleModel) {
                m_param = { displayModel: "inline", sourceFormat: "json", operaModel: null,
                    keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                    dbClickEvent: function () { m_this._selectGlobalArea(); }, isForbitSynChild: true
                };
            }
            else {
                m_param = { displayModel: "inline", sourceFormat: "json", operaModel: "checkmodel",
                    keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName", isForbitSynChild: true
                };
            }

            if (this._constructDisplayTxt) {
                m_param.constructDisplayTxt = this._constructDisplayTxt;
            }
            if (this._isCollapse) {
                m_param.isCollapse = this._isCollapse;
            }

            var m_this = this;
            if (this.singleModel) {
                this.globalAreaTree = new uicontrol.treeView(this.globalAreaTreeCtrl, source, null, m_param);
                this.globalAreaTree.loadSource();
                this.globalAreaTree.selTvItem(m_areaIds);
            }
            else {
                this.globalAreaTree = new uicontrol.treeView(this.globalAreaTreeCtrl, source, function (sourceItem) {

                    var m_items = m_this.globalAreaTree._ctrl.find('input[name=' + m_this.globalAreaTree._ctrl.attr("id") + 'check]');

                    if (sourceItem.key == "-1") {

                        if ($(this).attr("checked")) {
                            $.each(m_items, function () {
                                var m_thisitem = $(this);
                                var m_objitem = m_this.globalAreaTree.getItem(m_thisitem.val());
                                if (m_objitem.sourceItem.tag.Layer == "1") {
                                    m_thisitem.attr("checked", true);
                                }
                            });
                        }
                        else {
                            m_items.attr("checked", false);
                        }
                    }
                    else {
                        if (!$(this).attr("checked")) {
                            var m_thisitem = $(this);
                            var m_objitem = m_this.globalAreaTree.getItem(m_thisitem.val());

                            var m_clearitems = [];
                            $.each(m_objitem.sourceItem.children, function () {
                                m_clearitems.push(this.key);
                            });

                            m_this.globalAreaTree.clearCheckedValues(m_clearitems);
                        }

                    }
                }, m_param);
                this.globalAreaTree.loadSource();
                this.globalAreaTree.setCheckedValues(m_areaIds);
            }
        },

        /* 选择区域 */
        _selectGlobalArea: function () {

            if (this.singleModel) {
                if (this.globalAreaTree.selectedItem) {
                    this.txtGlobalArea.val(this.globalAreaTree.selectedItem.value);
                    this.txtGlobalArea.attr("areaIds", this.globalAreaTree.selectedItem.key);
                }
            }
            else {
                var m_selectedAreas = this.globalAreaTree.getCheckedValues();

                var m_tempStruct = new datastruct.dictionary();
                $.each(m_selectedAreas, function () {
                    m_tempStruct.setItem(this, null);
                });

                var m_thisObj = this;

                var m_areaDict = new datastruct.dictionary();
                $.each(m_selectedAreas, function () {
                    if (this == "-1") {
                        return;
                    }
                    var m_obj = m_thisObj.globalAreaSource.objDict.getItem(this);
                    if (m_areaDict.containKey(m_obj.ParentArea_Id)) {
                        m_areaDict.removeItem(m_obj.ParentArea_Id);
                    }

                    m_areaDict.setItem(this, m_obj.GlobalAreaName);
                });

                this.txtGlobalArea.val(m_areaDict.arrValues.join(",  "));
                this.txtGlobalArea.attr("areaIds", m_areaDict.arrKeys);
            }

            this.selectContainer.close();
        },

        /* 改变区域事件 */
        _changeGlobalArea: function () {
            var m_thisObj = this;

            if (!this.globalAreaSource) {

                var globalarea = new othm.globalarea();
                if (m_thisObj.queryCondition == "country" || m_thisObj.queryCondition == "country&area" || !m_thisObj.queryCondition) {
                    if (m_thisObj.queryCondition == "country") {
                        globalarea.queryCountries(function (source) {
                            m_thisObj._querySource(source);
                            m_thisObj._setGlobalAreas();
                        });
                    }
                    else if (m_thisObj.queryCondition == "country&area") {
                        globalarea.queryCountryAndInnerRegion(function (source) {
                            m_thisObj._querySource(source);
                            m_thisObj._setGlobalAreas();
                        });
                    }
                    else {
                        globalarea.getAllGlobalAreas(function (source) {
                            m_thisObj._querySource(source);
                            m_thisObj._setGlobalAreas();
                        });
                    }
                }
                else {
                    globalarea.GlobalArea_Ids = m_thisObj.queryCondition;
                    globalarea.queryGlobalAreaByCountries(function (source) {
                        m_thisObj._querySource(source);
                        m_thisObj._setGlobalAreas();
                    });
                }
            }
            else {
                m_thisObj._setGlobalAreas();
            }
        },

        /* 设置区域 */
        _setGlobalAreas: function () {
            var m_areaNames = this.txtGlobalArea.val();

            var m_results = null;
            var m_resultIds = null;

            var m_thisObj = this;

            if (m_areaNames) {

                /* 多选 */
                if (!m_thisObj.singleModel) {

                    m_results = [];
                    m_resultIds = [];
                    var m_cache = new datastruct.dictionary();
                    var m_areaDict = new datastruct.dictionary();
                    var m_parentAreaDict = new datastruct.dictionary();

                    m_areaNames = m_areaNames.split(",");
                    $.each(m_areaNames, function () {
                        var m_area = $.trim(this);
                        if (m_area) {
                            $.each(m_thisObj.globalAreaSource.objList, function () {

                                if (this.GlobalArea_Id == "-1") {
                                    return;
                                }

                                if (this.GlobalAreaName == m_area && !m_cache.containKey(this.GlobalArea_Id)) {
                                    m_cache.setItem(this.GlobalArea_Id);

                                    if (!m_parentAreaDict.containKey(this.GlobalArea_Id)) {
                                        if (m_areaDict.containKey(this.ParentArea_Id)) {
                                            m_areaDict.removeItem(this.ParentArea_Id);
                                        }
                                        m_areaDict.setItem(this.GlobalArea_Id, this.GlobalAreaName);
                                        m_parentAreaDict.setItem(this.ParentArea_Id, this.GlobalAreaName);
                                    }
                                    return;
                                }
                            });
                        }
                    });

                    this.txtGlobalArea.val(m_areaDict.arrValues.join(", "));
                    this.txtGlobalArea.attr("areaIds", m_areaDict.arrKeys.join(","));
                }
                else {
                    $.each(m_thisObj.globalAreaSource.objList, function () {
                        if (!m_results && this.GlobalAreaName.indexOf(m_areaNames) > -1) {
                            m_results = this.GlobalAreaName;
                            m_resultIds = this.GlobalArea_Id;
                            return;
                        }
                    });

                    this.txtGlobalArea.val(m_results);
                    this.txtGlobalArea.attr("areaIds", m_resultIds);
                }
            }
            else {
                this.txtGlobalArea.val("");
                this.txtGlobalArea.attr("areaIds", "");

                if (this.globalAreaTree) {
                    this.globalAreaTree.selectedItem = null;
                }
            }
        },

        /* 过滤区域 */
        filterGAreas: function () {

            var m_areaIds = [];

            var m_selectDict = new datastruct.dictionary();
            var m_selectedAreas = this.globalAreaTree.getCheckedValues();
            if (m_selectedAreas.length == 0) {
                m_areaIds = this.txtGlobalArea.attr("areaIds");
                if (m_areaIds) {
                    m_areaIds = m_areaIds.replace(/#/g, '').split(",");
                }
            }
            $.each(m_selectedAreas, function () {
                m_areaIds.push(this);
                m_selectDict.setItem(this);
            });

            var m_regionid = this.ddlRegionCtrl.val();
            var m_py = this.conditionPY;
            if (!m_py) {
                m_py = mlm.C0403;
            }

            var m_countrys = [];
            var m_countryareaDict = new datastruct.dictionary();

            $.each(this.globalAreaSource.objList, function () {
                var m_areastr = this.GlobalArea_Id.toString();

                if (this.AreaType == "1") {

                    if (m_selectDict.containKey(m_areastr)) {
                        m_countrys.push(this);
                        m_countryareaDict.setItem(this.GlobalArea_Id, []);
                        return;
                    }

                    if (m_areastr == "-1") {
                        m_countrys.push(this);
                        return;
                    }

                    if (!m_regionid && m_py == mlm.C0403) {
                        m_countrys.push(this);
                        m_countryareaDict.setItem(this.GlobalArea_Id, []);
                    }
                    else {
                        if (m_regionid && m_py == mlm.C0403) {
                            if (this.ParentArea_Id == m_regionid) {
                                m_countrys.push(this);
                                m_countryareaDict.setItem(this.GlobalArea_Id, []);
                            }
                        }
                        else if (!m_regionid && m_py != mlm.C0403) {
                            if (this.PYType == m_py) {
                                m_countrys.push(this);
                                m_countryareaDict.setItem(this.GlobalArea_Id, []);
                            }
                        }
                        else {
                            if (this.ParentArea_Id == m_regionid && this.PYType == m_py) {
                                m_countrys.push(this);
                                m_countryareaDict.setItem(this.GlobalArea_Id, []);
                            }
                        }
                    }
                }
                else if (this.AreaType == "2"){

                   if(this.Layer == "2"){
                       m_countryareaDict.setItem(this.GlobalArea_Id, []);
                       var m_areas = m_countryareaDict.getItem(this.ParentArea_Id);
                       if (m_areas) {
                           m_areas.push(this);
                       }
                   }
                   else{
                       var m_areas = m_countryareaDict.getItem((this.AreaIndexs.toString().replaceAll("#", "").split(",")[1]).toString());
                       if (m_areas) {
                           m_areas.push(this);
                       }
                   }
                }
            });

            var m_thisObj = this;
            var m_retitems = [];
            $.each(m_countrys, function () {
                var m_ctitem = this;

                if (m_thisObj.filterObjs) {
                    if (!m_thisObj.filterObjs.containKey(m_ctitem.GlobalArea_Id.toString())) {
                        m_retitems.push(m_ctitem);
                    }
                    else {
                        return;
                    }
                }
                else {
                    m_retitems.push(m_ctitem);
                }

                var m_areas = m_countryareaDict.getItem(this.GlobalArea_Id);
                if (m_areas) {
                    $.each(m_areas, function () {
                        if (m_thisObj.filterObjs) {
                            if (!m_thisObj.filterObjs.containKey(this.GlobalArea_Id.toString())) {
                                m_retitems.push(this);
                            }
                        }
                        else {
                            m_retitems.push(this);
                        }
                    });
                }
            });

            this._bindControl(m_retitems, m_areaIds);
        }
    };
    bizcontrol.selectglobalarea.fn.init.prototype = bizcontrol.selectglobalarea.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----商品种类选择控件----- 
    */
    bizcontrol.selectpdc = function (ctrl, multiModel, shoppingSiteId, salesite_id, completedevent) {
        var obj = new bizcontrol.selectpdc.fn.init(ctrl, multiModel, shoppingSiteId, salesite_id, completedevent);
        return obj;
    };
    bizcontrol.selectpdc.fn = {

        /* 构造函数 */
        init: function (ctrl, multiModel, shoppingSiteId, salesite_id, completedevent) {
            this.ctrl = ctrl;
            this.multiModel = multiModel;
            this.salesite_id = salesite_id;
            this.completedevent = completedevent;

            if (multiModel) {
                this.pdcNameTxt = $("<input type='text' class='text-input' style='width: 535px' onkeypress='uicontrol.func.checkInput(event);' />");
            }
            else {
                this.pdcNameTxt = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            }

            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });

            var thisObj = this;
            this.btSelect.click(function () { thisObj.openSelectFrm(); });
            this.pdcNameTxt.change(function () { thisObj.inputPdcName($.trim($(this).val())); });

            this._pdcDialog = $("<div style='display: none;'></div>");
            this._pdcTree = $("<ul></ul>");

            this._pdcDialog.append(this._pdcTree);
            this.ctrl.append(this.pdcNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._pdcDialog);

            this.pdcSource = null;
            this.pdcId = null;
            this.pdcName = null;
        },

        /* 打开商品种类的选择窗体 */
        openSelectFrm: function () {

            var thisObj = this;
            if (!this.pdcDialog) {
                this.pdcDialog = new uicontrol.dialog(this._pdcDialog, mlm.C0103, { width: 910, height: 500, position: ["auto", 60] }, function () { thisObj.selectPdc(); });
            }

            if (!this.pdcSource || !this.pdcTree) {

                if (!this.salesite_id) {
                    var prodcategory = new pdm.prodcategory();
                    prodcategory.getAllProdCategorys(function (source) {
                        thisObj._bindSourceEvent(source);

                        if (thisObj.multiModel) {
                            thisObj.pdcTree.setCheckedValues(thisObj.pdcId);
                        }
                        else {
                            thisObj.pdcTree.selTvItem(thisObj.pdcId);
                        }
                    });
                }
                else {
                    var m_salepdcnav = new sm.salepdcnavigation();
                    m_salepdcnav.SaleSite_Id = this.salesite_id;
                    m_salepdcnav.querySalePdcNav(function (source) {
                        thisObj._bindSourceEvent(source);

                        if (thisObj.multiModel) {
                            thisObj.pdcTree.setCheckedValues(thisObj.pdcId);
                        }
                        else {
                            thisObj.pdcTree.selTvItem(thisObj.pdcId);
                        }
                    });
                }
            }
            else {
                if (thisObj.multiModel) {
                    this.pdcTree.setCheckedValues(this.pdcId);
                }
                else {
                    this.pdcTree.selTvItem(this.pdcId);
                }
            }

            this.pdcDialog.show();
        },

        /* 选择商品分类 */
        selectPdc: function () {

            if (!this.multiModel) {
                var m_pdc = this.pdcTree.selectedItem;
                if (!m_pdc) {
                    pageframe.control.alertDialog.showAlertInfo(mlm.C0099);
                    return;
                }

                this.pdcId = m_pdc.key;
                this.pdcName = this._getFullName(m_pdc.key);

                this.pdcNameTxt.val(this.pdcName);
            }
            else {
                var m_selectePdcs = this.pdcTree.getCheckedValues();

                var m_thisObj = this;

                var m_pdcArr = [];
                var m_pdcIdArr = [];
                $.each(m_selectePdcs, function () {
                    var m_obj = m_thisObj.pdcTree.getItem(this);

                    if (m_obj.sourceItem.children.length == 0) {
                        m_pdcArr.push(m_thisObj._getFullName(this));
                        m_pdcIdArr.push(this);
                    }
                });

                this.pdcId = m_pdcIdArr;
                this.pdcNameTxt.val(m_pdcArr.join(","));
                this.pdcNameTxt.attr("pdcIds", m_pdcIdArr);
            }

            if (this.completedevent) {
                this.completedevent();
            }

            this.pdcDialog.close();
        },

        /* 输入商品分类名称 */
        inputPdcName: function (pdcName) {

            if (!pdcName) {
                this.clear();

                if (this.completedevent) {
                    this.completedevent();
                }

                return;
            }

            var thisObj = this;
            if (!this.pdcSource || !this.pdcTree) {
                if (!this.salesite_id) {
                    var prodcategory = new pdm.prodcategory();
                    prodcategory.getAllProdCategorys(function (source) {

                        thisObj._bindSourceEvent(source);
                        thisObj._getPdc(pdcName);
                    });
                }
                else {
                    var m_salepdcnav = new sm.salepdcnavigation();
                    m_salepdcnav.SaleSite_Id = this.salesite_id;
                    m_salepdcnav.querySalePdcNav(function (source) {

                        thisObj._bindSourceEvent(source);
                        thisObj._getPdc(pdcName);
                    });
                }
            }
            else {
                this._getPdc(pdcName);
            }

            if (this.completedevent) {
                this.completedevent();
            }
        },

        /* 绑定数据源事件 */
        _bindSourceEvent: function (source) {
            this.pdcSource = source;
            this.pdcJson = datastruct.convertion.tableToJson(source);

            var m_this = this;

            if (this.multiModel) {
                this.pdcTree = new uicontrol.treeView(this._pdcTree, source, null,
                                                        { displayModel: "inline", sourceFormat: "table", operaModel: "checkmodel",
                                                            keyColumn: "ProdCategory_Id", parentKeyColumn: "ParentPdc_Id", displayColumn: "PdcName",
                                                            dbClickEvent: function () { m_this.selectPdc(); }
                                                        });
                this.pdcTree.loadSource();
            }
            else {
                this.pdcTree = new uicontrol.treeView(this._pdcTree, source, null,
                                                        { displayModel: "inline", sourceFormat: "table",
                                                            keyColumn: "ProdCategory_Id", parentKeyColumn: "ParentPdc_Id", displayColumn: "PdcName",
                                                            dbClickEvent: function () { m_this.selectPdc(); }
                                                        });
                this.pdcTree.loadSource();
            }
        },

        /* 设置商品分类 */
        setPdc: function (pdc) {
            this.pdcId = pdc.ProdCategory_Id;
            this.pdcName = pdc.PdcName;
            this.pdcNameTxt.val(pdc.PdcName);
        },

        /* 初始化显示的文本 */
        initDisplayText: function (displayTxt) {
            this.clear();
            this.pdcNameTxt.val(displayTxt);
        },

        /* 禁用 */
        disable: function () {
            this.pdcNameTxt.attr("disabled", "disabled");
            this.btSelect.hide();
        },

        /* 禁用 */
        enable: function () {
            this.pdcNameTxt.attr("disabled", false);
            this.btSelect.show();
        },

        /* 获取商品分类对象 */
        _getPdc: function (pdcName) {

            var m_thisObj = this;

            if (!this.multiModel) {
                var m_pdc = null;
                $.each(this.pdcJson, function () {

                    this.PdcName = m_thisObj._getFullName(this.ProdCategory_Id);
                    if (this.PdcName.toLowerCase().indexOf($.trim(pdcName).toLowerCase()) > -1) {
                        m_pdc = this;
                        return false;
                    }
                });

                if (!m_pdc) {
                    pageframe.control.alertDialog.showAlertInfo(pdcName + mlm.C0104);
                    this.clear();
                    return;
                }

                this.pdcId = m_pdc.ProdCategory_Id;
                this.pdcName = this._getFullName(m_pdc.ProdCategory_Id);

                this.pdcNameTxt.val(this.pdcName);
            }
            else {
                var m_pdcs = [];

                var m_inputPdcs = pdcName.split(",");
                var m_cache = new datastruct.dictionary();

                $.each(this.pdcJson, function () {

                    var m_pjitem = this;

                    var m_ctrlObj = m_thisObj.pdcTree.getItem(this.ProdCategory_Id);

                    if (m_ctrlObj.sourceItem.children && m_ctrlObj.sourceItem.children.length > 0) {
                        return;
                    }

                    m_pjitem.FullPdcName = m_thisObj._getFullName(this.ProdCategory_Id);

                    $.each(m_inputPdcs, function () {

                        var m_str = $.trim(this);
                        if (m_str) {
                            if (this.indexOf("-") > 0) {
                                if (m_pjitem.FullPdcName.toLowerCase().indexOf(m_str.toLowerCase()) > -1 && !m_cache.containKey(m_pjitem.ProdCategory_Id)) {
                                    m_pdcs.push(m_pjitem);
                                    m_cache.setItem(m_pjitem.ProdCategory_Id, null);
                                }
                            }
                            else {
                                if (m_pjitem.PdcName.toLowerCase().indexOf(m_str.toLowerCase()) > -1 && !m_cache.containKey(m_pjitem.ProdCategory_Id)) {
                                    m_pdcs.push(m_pjitem);
                                    m_cache.setItem(m_pjitem.ProdCategory_Id, null);
                                }
                            }
                        }
                    });

                });

                var m_pdcIdArr = [];
                var m_pdcStrArr = [];

                $.each(m_pdcs, function () {
                    m_pdcIdArr.push(this.ProdCategory_Id);
                    m_pdcStrArr.push(this.FullPdcName);
                });

                this.pdcId = m_pdcIdArr; ;
                this.pdcName = m_pdcStrArr.join(",");

                this.pdcNameTxt.val(this.pdcName);
            }
        },

        /* 获取商品分类完整路径 */
        _getFullName: function (pdcId) {

            var m_pdc = this.pdcTree.getItem(pdcId);

            var m_nameObj = { pdcName: m_pdc.sourceItem.value };
            this._resecurFullName(m_pdc.sourceItem.parentKey, m_nameObj);

            return m_nameObj.pdcName;

        },
        _resecurFullName: function (parentKey, fullNameObj, isbreak) {
            if (!isbreak && parentKey && parentKey > 0) {
                var m_parentPdc = this.pdcTree.getItem(parentKey);
                fullNameObj.pdcName = m_parentPdc.sourceItem.value + "-" + fullNameObj.pdcName;

                this._resecurFullName(m_parentPdc.sourceItem.parentKey, fullNameObj, true);
            }
        },

        /* 清除控件值 */
        clear: function () {
            this.pdcId = null;
            this.pdcName = null;
            this.pdcNameTxt.val("");

            if (this.pdcTree) {
                this.pdcTree.selectedItem = null;
            }
        },

        /* 清理数据 */
        claseDataSource: function () {
            this.pdcSource = null;
            this.clear();
        }
    };
    bizcontrol.selectpdc.fn.init.prototype = bizcontrol.selectpdc.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----配送服务查看控件----- 
    */
    bizcontrol.viewexpressservice = function () {
        var obj = new bizcontrol.viewexpressservice.fn.init();
        return obj;
    };
    bizcontrol.viewexpressservice.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewExpressServiceFrm' style='display: none;'></div>");

            this.expServiceTab = $("<div id='expServiceTab_v'></div>");
            var m_ulCtrl = $("<ul></ul>");
            var m_liCtrl_1 = $("<li><a id='lkExpServiceInfo_expv' href='#expServiceInfo_expv'>" + mlm.C0286 + "</a></li>");
            var m_liCtrl_2 = $("<li><a href='#lstSolution_expv'>" + mlm.C1143 + "</a></li>");
            m_ulCtrl.append(m_liCtrl_1);
            m_ulCtrl.append(m_liCtrl_2);
            this.expServiceTab.append(m_ulCtrl);

            var m_expinfoContainer = $("<div id='expServiceInfo_expv'></div>");
            var m_tableContainer = $("<div class='submitForm form-width'></div>");

            var m_tr_1 = $("<div class='submitForm-tr first-item'></div>");
            var m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0436 + ":</span>");
            /* 配送服务 */
            this.m_esNameCtrl = $("<span></span>");
            m_td_1.append(this.m_esNameCtrl);
            m_tr_1.append(m_td_1);

            var m_tr_9 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C1274 + ":</span>");
            /* 配送中心 */
            this.m_warehouseCtrl = $("<span></span>");
            m_td_1.append(this.m_warehouseCtrl);
            m_tr_9.append(m_td_1);

            var m_tr_2 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0291 + ":</span>");
            /* 目的地 */
            this.m_globalAreaCtrl = $("<span style='display: inline-block; width: 650px; max-height: 100px; overflow-y: scroll'></span>");
            m_td_1.append(this.m_globalAreaCtrl);
            m_tr_2.append(m_td_1);

            var m_tr_8 = $("<div class='submitForm-tr'></div>");
            var m_td_2 = $("<span class='left-cell'></span>");
            m_td_2.append("<span class='title'>" + mlm.C0844 + ":</span>");
            /* 运费模式 */
            this.m_esTypeCtrl = $("<span></span>");
            m_td_2.append(this.m_esTypeCtrl);
            m_tr_8.append(m_td_2);
            var m_td_3 = $("<span></span>");
            m_td_3.append("<span class='title'>" + mlm.C0810 + ":</span>");
            /* 进度跟踪 */
            this.m_isTrackCtrl = $("<span></span>");
            m_td_3.append(this.m_isTrackCtrl);
            m_tr_8.append(m_td_3);

            this.tr_3 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0438 + ":</span>");
            /* 商品首重限制 */
            this.m_fromWeightCtrl = $("<span></span>");
            m_td_1.append(this.m_fromWeightCtrl);
            this.m_fromWUnitCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_1.append(this.m_fromWUnitCtrl);
            m_td_2 = $("<span></span>");
            m_td_2.append("<span class='title'>" + mlm.C0439 + ":</span>");
            /* 增重 */
            this.m_increaseWeightCtrl = $("<span></span>");
            m_td_2.append(this.m_increaseWeightCtrl);
            this.m_increaseWUnitCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_2.append(this.m_increaseWUnitCtrl);
            this.tr_3.append(m_td_1);
            this.tr_3.append(m_td_2);

            this.tr_5 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0444 + ":</span>");
            /* 首重运费 */
            this.m_fromPriceCtrl = $("<span></span>");
            m_td_1.append(this.m_fromPriceCtrl);
            this.m_fromPriceCurrCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_1.append(this.m_fromPriceCurrCtrl);
            m_td_2 = $("<span></span>");
            m_td_2.append("<span class='title'>" + mlm.C0445 + ":</span>");
            /* 增重运费 */
            this.m_increasePriceCtrl = $("<span></span>");
            m_td_2.append(this.m_increasePriceCtrl);
            this.m_increasePriceCurrCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_2.append(this.m_increasePriceCurrCtrl);
            this.tr_5.append(m_td_1);
            this.tr_5.append(m_td_2);

            this.tr_7 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C1017 + ":</span>");
            /* 固定运费 */
            this.m_fixPriceCtrl = $("<span></span>");
            m_td_1.append(this.m_fixPriceCtrl);
            this.m_fixPriceCurrCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_1.append(this.m_fixPriceCurrCtrl);
            this.tr_7.append(m_td_1);

            var m_tr_4 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0440 + ":</span>");
            /* 最大重量限制 */
            this.m_maxWeightCtrl = $("<span></span>");
            this.m_maxWUnitCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_td_1.append(this.m_maxWeightCtrl);
            m_td_1.append(this.m_maxWUnitCtrl);
            m_td_2 = $("<span></span>");
            m_td_2.append("<span class='title'>" + mlm.C0441 + ":</span>");
            /* 配送时效 */
            this.m_deliveryTimeCtrl = $("<span></span>");
            m_td_2.append(this.m_deliveryTimeCtrl);
            m_tr_4.append(m_td_1);
            m_tr_4.append(m_td_2);

            var m_tr_6 = $("<div class='submitForm-tr last-item'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0073 + ":</span>");
            /* 备注 */
            this.m_remarkCtrl = $("<span style='display: inline-block; width: 650px'></span>");
            m_td_1.append(this.m_remarkCtrl);
            m_tr_6.append(m_td_1);

            m_tableContainer.append(m_tr_1);
            m_tableContainer.append(m_tr_9);
            m_tableContainer.append(m_tr_2);
            m_tableContainer.append(m_tr_8);
            m_tableContainer.append(this.tr_3);
            m_tableContainer.append(this.tr_5);
            m_tableContainer.append(this.tr_7);
            m_tableContainer.append(m_tr_4);
            m_tableContainer.append(m_tr_6);

            m_expinfoContainer.append(m_tableContainer);
            this.expServiceTab.append(m_expinfoContainer);

            var m_lstsolutionContainer = $("<div id='lstSolution_expv'></div>");
            var m_lstTableContainer = $("<div class='submitForm form-width'></div>");
            var m_lstTr = $("<div class='submitForm-tr first-item last-item'></div>");
            this.lstsolutionTable = $("<table id='lstsolutionList_expv'></table>");
            m_lstTr.append(this.lstsolutionTable);
            m_lstTableContainer.append(m_lstTr);
            m_lstsolutionContainer.append(m_lstTableContainer);
            this.expServiceTab.append(m_lstsolutionContainer);

            this.ctrl.append(this.expServiceTab);
        },

        /* 展示配送服务 */
        show: function (expressservice_id) {
            var thisObj = this;
            if (!this.viewExpressServiceFrm) {
                this.viewExpressServiceFrm = new uicontrol.dialog(this.ctrl, mlm.C0450, { width: 825, position: ["auto", 50] });
                this.expServiceTab.tabs({ show: function (event, ui) {
                    if (ui.index == 1) {
                        if (!thisObj.lstSolutionList) {
                            thisObj.lstSolutionList = new uicontrol.tableList('lstsolutionList_expv',
                                     { autoSeq: true,
                                         keyColumn: "LstSolution_Id",
                                         height: 270,
                                         columns: [{ display: mlm.C0783, name: "LstSolutionName", width: 200, align: 'left', adjust: true, createCell: bizcontrol.viewexpressservice.fn._constructLstSolutionCell },
                                                   { display: mlm.C0784, name: "LstCompanyName", width: 120, align: 'left' },
                                                   { display: mlm.C0785, name: "LstSolutionType", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewexpressservice.fn._constructLstSoluTypeCell },
                                                   { display: mlm.C0810, name: "TrackWebAddress", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewexpressservice.fn._constructTrackWebCell}]
                                     });
                        };

                        thisObj.lstSolutionList.bindDataSource(thisObj.viewExpressServiceFrm.expressservice.LstSolutionTable);
                    }
                }
                });
            }
            $("#lkExpServiceInfo_expv").trigger("click");

            var m_expressservice = new sm.expressservice();
            m_expressservice.ExpressService_Id = expressservice_id;

            m_expressservice.readExpressService(function (obj) {
                thisObj.m_esNameCtrl.text(obj.ExpressServiceName);
                thisObj.m_deliveryTimeCtrl.text(obj.MinDeliveryTime + "-" + obj.MaxDeliveryTime + mlm.C0984);
                thisObj.m_fromWeightCtrl.text(Number(obj.FromWeight).toFixed(3));
                thisObj.m_increaseWeightCtrl.text(Number(obj.IncreaseWeight).toFixed(3));
                thisObj.m_maxWeightCtrl.text(Number(obj.MaxWeight).toFixed(3));
                thisObj.m_increasePriceCtrl.text(Number(obj.IncreasePrice).toFixed(3));
                thisObj.m_fromPriceCtrl.text(Number(obj.FromPrice).toFixed(3));
                thisObj.m_fixPriceCtrl.text(Number(obj.FromPrice).toFixed(2));

                if (obj.IsTrack == "1") {
                    thisObj.m_isTrackCtrl.text(mlm.C0811);
                }
                else {
                    thisObj.m_isTrackCtrl.text("");
                }

                if (obj.ESType == "1") {
                    thisObj.m_esTypeCtrl.text(mlm.C1014);
                    thisObj.tr_3.show();
                    thisObj.tr_5.show();
                    thisObj.tr_7.hide();
                }
                else if (obj.ESType == "2") {
                    thisObj.m_esTypeCtrl.text(mlm.C1015);
                    thisObj.tr_3.hide();
                    thisObj.tr_5.hide();
                    thisObj.tr_7.hide();
                }
                else {
                    thisObj.m_esTypeCtrl.text(mlm.C1016);
                    thisObj.tr_3.hide();
                    thisObj.tr_5.hide();
                    thisObj.tr_7.show();
                }

                thisObj.m_globalAreaCtrl.text(obj.OtherProps.GlobalAreaNames);
                thisObj.m_fromWUnitCtrl.text(saleplatform.currObj.WUnit);
                thisObj.m_increaseWUnitCtrl.text(saleplatform.currObj.WUnit);
                thisObj.m_maxWUnitCtrl.text(saleplatform.currObj.WUnit);
                thisObj.m_fromPriceCurrCtrl.text(saleplatform.currObj.CurrCode);
                thisObj.m_increasePriceCurrCtrl.text(saleplatform.currObj.CurrCode);
                thisObj.m_fixPriceCurrCtrl.text(saleplatform.currObj.CurrCode);
                thisObj.m_remarkCtrl.text(obj.Remark);
                thisObj.m_warehouseCtrl.text(obj.OtherProps.WarehouseName ? obj.OtherProps.WarehouseName : "");

                thisObj.viewExpressServiceFrm.expressservice = obj;
                thisObj.viewExpressServiceFrm.show();
            });
        },

        /* 构建物流解决方案列 */
        _constructLstSolutionCell: function (key, cellvalue) {
            return "<a onclick='openViewLstSolution.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellvalue + "</a>";
        },
        /* 构建快递类型列 */
        _constructLstSoluTypeCell: function (key, cellvalue) {
            if (cellvalue == "1") {
                return mlm.C0803;
            }
            else if (cellvalue == "2") {
                return mlm.C0804;
            }
            else if (cellvalue == "3") {
                return mlm.C0805;
            }
            else {
                return mlm.C0815;
            }
        },
        /* 构建跟踪列 */
        _constructTrackWebCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                return mlm.C0811;
            }
        }
    };

    bizcontrol.viewexpressservice.fn.init.prototype = bizcontrol.viewexpressservice.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----商品查看控件----- 
    */
    bizcontrol.viewproduct = function () {
        var obj = new bizcontrol.viewproduct.fn.init();
        return obj;
    };
    bizcontrol.viewproduct.fn = {

        actionObj: null,

        /* 构造函数 */
        init: function () {
            if (!pageVariable.user) {
                pageVariable.user = userpopedom["user_" + m_usertoken];
            }
            if (pageVariable.user.RoleIds.indexOf("#1#") > -1 || pageVariable.user.RoleIds.indexOf("#8#") > -1) {
                pageVariable.isviewprodauth = true;
            }

            this.ctrl = $("<div id='viewProdFrm' class='view-product' style='display: none;'></div>");

            var m_containerCtrl = $("<div></div>");
            this.viewTabsCtrl = $("<div style='height: 550px'>");

            /* Tab控件 */
            var m_ulTabCtrl = $("<ul class='prodTab' style='width: 1090px'></ul>");
            m_ulTabCtrl.append("<li><a id='lkProdInfo_view' href='#prodInfo_view'>" + mlm.C0169 + "</a></li>");
            m_ulTabCtrl.append("<li><a href='#detailInfo'>" + mlm.C0173 + "</a></li>");
            m_ulTabCtrl.append("<li><a href='#skuList_view'>" + mlm.C0174 + "</a></li>");

            if (pageVariable.isviewprodauth) {
                m_ulTabCtrl.append("<li><a href='#purchaseprice_view'>" + mlm.M0054 + "</a></li>");
            }

            m_ulTabCtrl.append("<li><a href='#custom_view'>" + mlm.C1242 + "</a></li>");

            if (pageVariable.isviewprodauth) {
                m_ulTabCtrl.append("<li><a href='#ssproduct_view'>" + mlm.C1030 + "</a></li>");
            }
            this.viewTabsCtrl.append(m_ulTabCtrl);

            var m_prodInfo_viewCtrl = $("<div id='prodInfo_view'></div>");

            /* 图片控件 */
            this.m_picCtrl = $("<div class='pic-container'></div>");
            m_prodInfo_viewCtrl.append(this.m_picCtrl);

            /* 详细清单 */
            this.m_detailContainerCtrl = $("<div class='detail-container'></div>");
            var m_tableCtrl = $("<div class='submitForm basicinfo' style='width: 640px'></div>");

            var m_trProdNameCtrl = $("<div class='submitForm-tr first-item'><span></span></div>");
            m_trProdNameCtrl.append("<span class='title'>" + mlm.C0175 + ":</span>");
            /* 商品名称 */
            this.prodNameCtrl = $("<span style='width: 520px; display: inline-block'></span>");
            m_trProdNameCtrl.append(this.prodNameCtrl);
            m_tableCtrl.append(m_trProdNameCtrl);

            var m_trProdCodeCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trProdCodeCtrl.append("<span class='title'>" + mlm.C0194 + ":</span>");
            /* 商品编码 */
            this.prodCodeCtrl = $("<span style='width: 520px; display: inline-block'></span>");
            m_trProdCodeCtrl.append(this.prodCodeCtrl);
            m_tableCtrl.append(m_trProdCodeCtrl);

            var m_trUnitCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trUnitCtrl.append("<span class='title'>" + mlm.C1048 + ":</span>");
            /* 单位 */
            this.unitCtrl = $("<span style='width: 520px; display: inline-block'></span>");
            m_trUnitCtrl.append(this.unitCtrl);
            m_tableCtrl.append(m_trUnitCtrl);

            var m_trPdcCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trPdcCtrl.append("<span class='title'>" + mlm.C0090 + ":</span>");
            /* 商品分类 */
            this.pdcCtrl = $("<span style='width: 520px; display: inline-block'></span>");
            m_trPdcCtrl.append(this.pdcCtrl);
            m_tableCtrl.append(m_trPdcCtrl);

            var m_trBrandCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trBrandCtrl.append("<span class='title'>" + mlm.C0112 + ":</span>");
            /* 品牌 */
            this.brandCtrl = $("<span></span>");
            m_trBrandCtrl.append(this.brandCtrl);
            m_tableCtrl.append(m_trBrandCtrl);

            var m_trWeightCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trWeightCtrl.append("<span class='title'>" + mlm.C1247 + ":</span>");
            /* 商品净重 */
            this.weightCtrl = $("<span></span>");
            m_trWeightCtrl.append(this.weightCtrl);
            m_trWeightCtrl.append("<span style='margin: 0px 0px 0px 5px'>kg</span>");
            m_tableCtrl.append(m_trWeightCtrl);

            /* 商品属性 */
            this.propCtrl = $("<div></div>");
            m_tableCtrl.append(this.propCtrl);

            this.m_detailContainerCtrl.append(m_tableCtrl);
            m_prodInfo_viewCtrl.append(this.m_detailContainerCtrl);

            var m_proddescCtrl = $("<div id='detailInfo' class='desc-container'></div>");
            var m_desctitleCtrl = $("<div style='margin: 0px 0px 0px 0px; height: 20px'></div>");
            m_desctitleCtrl.append("<span class='lb-title list-title'>" + mlm.C1147 + "</span>");
            var m_previewToolbarCtrl = $("<div style='float: right;'></div>");
            var m_previewCtrl = $("<input type='button' class='normal-bt' style='margin:0px 10px 0px 0px' value='" + mlm.C0271 + "' />");
            m_previewToolbarCtrl.append(m_previewCtrl);
            m_desctitleCtrl.append(m_previewToolbarCtrl);
            m_proddescCtrl.append(m_desctitleCtrl);
            /* 商品详情控件 */
            this.htmlDetailCtrl = $("<textarea class='proddesc-container'></textarea>");
            m_proddescCtrl.append(this.htmlDetailCtrl);

            /* Sku控件 */
            this.m_skuCtrl = $("<div id='skuList_view' style='width: 1075px;'></div>");
            var m_skuTableCtrl = $("<table id='viewSkuTable'></table>");
            this.m_skuCtrl.append(m_skuTableCtrl);

            //采购价格
            var m_purchaseprice_viewCtrl = $("<div id='purchaseprice_view' style='width: 1075px;'></div>");
            var m_purchasepriceTable = $("<table id='purchasepriceTable_v'></table>");
            m_purchaseprice_viewCtrl.append(m_purchasepriceTable);

            //配货&报关信息
            var m_custom_viewCtrl = $("<div id='custom_view' style='width: 1075px;'></div>");
            var m_custom_tableCtrl = $("<div class='submitForm  form-width-d'></div>");

            var m_trCostumCtrl = $("<div class='submitForm-tr first-item'><span></span></div>");
            m_trCostumCtrl.append("<span class='title'>" + mlm.C1238 + ":</span>");
            /* 报关名称 */
            this.costumCtrl = $("<span></span>");
            m_trCostumCtrl.append(this.costumCtrl);
            m_custom_tableCtrl.append(m_trCostumCtrl);

            var m_trCostumCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trCostumCtrl.append("<span class='title'>" + mlm.C1621 + ":</span>");
            /* 报关名称 */
            this.costum_cnCtrl = $("<span></span>");
            m_trCostumCtrl.append(this.costum_cnCtrl);
            m_custom_tableCtrl.append(m_trCostumCtrl);

            var m_trCostumValueCtrl = $("<div class='submitForm-tr'></div>");
            var m_trCostumLeftCellCtrl = $("<span class='left-cell'></span>");
            m_trCostumLeftCellCtrl.append("<span class='title'>" + mlm.C1239 + ":</span>");
            /* 报关价值 */
            this.costumValueCtrl = $("<span></span>");
            m_trCostumLeftCellCtrl.append(this.costumValueCtrl);
            m_trCostumValueCtrl.append(m_trCostumLeftCellCtrl);
            var m_trCostumRightCellCtrl = $("<span></span>");
            m_trCostumRightCellCtrl.append("<span class='title'>" + mlm.C1240 + ":</span>");
            /* 海关编码 */
            this.costumCodeCtrl = $("<span></span>");
            m_trCostumRightCellCtrl.append(this.costumCodeCtrl);
            m_trCostumValueCtrl.append(m_trCostumRightCellCtrl);
            m_custom_tableCtrl.append(m_trCostumValueCtrl);

            var m_trOriginCtrl = $("<div class='submitForm-tr last-item'><span></span></div>");
            var m_trOriginLeftCellCtrl = $("<span class='left-cell'></span>");
            m_trOriginLeftCellCtrl.append("<span class='title'>" + mlm.C1241 + ":</span>");
            /* 原厂地 */
            this.originCtrl = $("<span></span>");
            m_trOriginLeftCellCtrl.append(this.originCtrl);
            m_trOriginCtrl.append(m_trOriginLeftCellCtrl);
            var m_trMaterialRightCellCtrl = $("<span></span>");
            m_trMaterialRightCellCtrl.append("<span class='title'>" + mlm.C1245 + ":</span>");
            /* 申报材质 */
            this.materialCtrl = $("<span></span>");
            m_trMaterialRightCellCtrl.append(this.materialCtrl);
            m_trOriginCtrl.append(m_trMaterialRightCellCtrl);
            m_custom_tableCtrl.append(m_trOriginCtrl);

            m_custom_viewCtrl.append(m_custom_tableCtrl);

            var m_trProdNameCtrl = $("<div class='submitForm-tr first-item'><span></span></div>");
            m_trProdNameCtrl.append("<span class='title'>" + mlm.C0175 + ":</span>");

            //站点商品信息
            var m_ssprod_viewCtrl = $("<div id='ssproduct_view' style='width: 1075px;'></div>");
            var m_ssprodTable = $("<table id='viewSSProdTable'></table>");
            m_ssprod_viewCtrl.append(m_ssprodTable);

            this.viewTabsCtrl.append(m_prodInfo_viewCtrl);
            this.viewTabsCtrl.append(m_proddescCtrl);
            this.viewTabsCtrl.append(this.m_skuCtrl);

            this.viewTabsCtrl.append(m_custom_viewCtrl);

            if (pageVariable.isviewprodauth) {
                this.viewTabsCtrl.append(m_purchaseprice_viewCtrl);
                this.viewTabsCtrl.append(m_ssprod_viewCtrl);
            }

            m_containerCtrl.append(this.viewTabsCtrl);
            this.ctrl.append(m_containerCtrl);

            m_previewCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            var m_this = this;
            m_previewCtrl.click(function () {
                var m_openfrm = window.open("_proddesc.htm", '', 'height=600, width=1180, top=60, left=30, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');
                m_openfrm.document.write(m_this.htmlDetailCtrl.text());
            });

            this.m_skuquotedctrl = $("<div id='viewSkuQuotedItemFrm' style='display: none;'></div>");
            var m_skuquotedTable = $("<table id='quotedpriceTable_v'></table>");
            this.m_skuquotedctrl.append(m_skuquotedTable);
            $(document).append(this.m_skuquotedctrl);

            /* 商品属性缓存 */
            this.pdcProps = new datastruct.dictionary();

            if (!pageVariable.viewSupplierFrm) {
                pageVariable.viewSupplierFrm = new bizcontrol.viewsupplier();
            }
        },

        /* 展示商品信息 */
        show: function (product_id, skuproduct_id) {

            /* this指针 */
            var thisObj = this;

            bizcontrol.viewproduct.fn.actionObj = this;

            if (!this.viewProdDialog) {
                this.viewProdDialog = new uicontrol.dialog(this.ctrl, mlm.C0197, { width: 1125, position: ["auto", 5] });
                this.picCtrl = new uicontrol.pictureSlip(this.m_picCtrl, { position: ["auto", 5] });

                this.viewTabsCtrl.tabs({ show: function (event, ui) { thisObj._showViewProdTab(event, ui); } });
            }

            if (thisObj.m_remarkCtrl) {
                thisObj.m_remarkCtrl.empty();
                thisObj.htmlDetailCtrl.empty();
                thisObj.m_remarkCtrl = null;
            }

            thisObj.propCtrl.empty();
            this.isloadskuprod = true;
            this.isloadssproduct = true;
            this.isloadquotedprice = true;

            var m_selectlis = [];
            var m_product = new pdm.product();
            m_product.Product_Id = product_id;
            m_product.readProductWithQuotedPrice(function (prodObj) {

                thisObj.viewProdDialog.product = prodObj;

                var m_selectedpvs = new datastruct.dictionary();
                var m_skuitems = [];

                var m_picdict = new datastruct.dictionary();
                $.each(prodObj.ProdPics, function () {
                    m_picdict.setItem(this.Product_Pic_Id, this);
                });

                var m_skupropDict = new datastruct.dictionary();
                $.each(prodObj.SKUProducts, function () {
                    m_skupropDict.setItem(this.SkuProduct_Id, this.OtherProps.SkuProps);
                });

                var m_quotedpriceDict = new datastruct.dictionary();
                $.each(prodObj.QuotedPriceTable, function () {
                    var m_skuobj = null;

                    if (m_quotedpriceDict.containKey(this.SkuProduct_Id)) {
                        m_skuobj = m_quotedpriceDict.getItem(this.SkuProduct_Id);

                        if (Number(this.QuotedPrice) < Number(m_skuobj.minQuotedPrice)) {
                            m_skuobj.minQuotedPrice = this.QuotedPrice;
                        }
                        else if (Number(this.QuotedPrice) > Number(m_skuobj.maxQuotedPrice)) {
                            m_skuobj.maxQuotedPrice = this.QuotedPrice;
                        }
                    }
                    else {
                        m_skuobj = {};
                        m_skuobj.minQuotedPrice = this.QuotedPrice;
                        m_skuobj.maxQuotedPrice = this.QuotedPrice;
                        m_quotedpriceDict.setItem(this.SkuProduct_Id, m_skuobj);
                    }

                    this.SkuProps = m_skupropDict.getItem(this.SkuProduct_Id);
                });

                $.each(prodObj.SKUProducts, function () {
                    this.SkuProps = this.OtherProps.SkuProps;
                    this.TotalStock = this.OtherProps.TotalStock;

                    if (this.OtherProps && this.PropValues) {
                        this.SkuProps = this.OtherProps.SkuProps;
                        this.SkuProd_Key = this.PropValues;
                    }

                    if (this.Product_Pic_Id != "0") {
                        var m_pic = m_picdict.getItem(this.Product_Pic_Id);
                        this.BrowsePicUrl = m_pic.BrowsePicUrl;
                    }

                    var m_quotedprice = m_quotedpriceDict.getItem(this.SkuProduct_Id);
                    if (m_quotedprice) {
                        this.MinQuotedPrice = m_quotedprice.minQuotedPrice;
                        this.MaxQuotedPrice = m_quotedprice.maxQuotedPrice;
                    }

                    m_skuitems.push(this);

                    if (skuproduct_id == this.SkuProduct_Id) {
                        var m_pvarr = this.PropValues.split("_");
                        $.each(m_pvarr, function () {
                            m_selectedpvs.setItem(this);
                        });
                    }
                });
                prodObj.SKUProducts = m_skuitems;

                var m_expendProps = [];
                $.each(prodObj.PropTable, function () {
                    if (this.IsSku == "1") {
                        var m_propid = this.ProdProperty_Id;
                        var m_sku_tr = $("<div class='submitForm-tr'></div>");
                        m_sku_tr.append("<span class='title'>" + this.ProdPropName + ":</span>");

                        var m_txtCtrl = $("<span style='width: 520px; display: inline-block; margin : 0px 0px -5px 0px; padding: 0px'></span>");
                        var m_values = $("<ul id='propul_" + m_propid + "'></ul>");
                        var m_pvalueids = this.ProdPValueIdRange.split(",");
                        var m_pvalues = this.ProdPValueRange.split(",");
                        var m_i = 0;
                        $.each(m_pvalueids, function () {

                            var m_liCtrl = $("<li class='color-pic' tag='" + m_propid + "' value='" + this + "'></li>");
                            var m_pvCtrl = $("<div style='text-align: center;' class='lb-symbol'>" + m_pvalues[m_i] + "</div>");
                            m_liCtrl.hover(function () {
                                $(this).css("border-color", "#A60000");
                            }, function () {
                                if (!$(this).attr("selected")) {
                                    $(this).css("border-color", "#ccc");
                                }
                            });
                            m_liCtrl.click(function () {
                                var m_propid = $(this).attr("tag");
                                var m_proplis = $("#propul_" + m_propid).find("li");

                                $.each(m_proplis, function () {
                                    $(this).css("border-color", "#ccc");
                                    $(this).attr("selected", null);
                                });

                                $(this).attr("selected", "true");
                                $(this).css("border-color", "#A60000");

                                var m_pvarr = new datastruct.dictionary();
                                $.each(prodObj.PropTable, function () {
                                    if (this.IsSku) {

                                        var m_selectedLis = $("#propul_" + this.ProdProperty_Id).find("li");
                                        $.each(m_selectedLis, function () {
                                            if ($(this).attr("selected")) {
                                                m_pvarr.setItem($(this).attr("value"), null);
                                            }
                                        });
                                    }
                                });

                                $.each(prodObj.ProdPics, function () {
                                    var m_level = 0;
                                    $.each(this.RelPValueIds, function () {
                                        if (m_pvarr.containKey(this)) {
                                            m_level++;
                                        }
                                    });

                                    this.Level = m_level;
                                });

                                var m_pic = "";
                                var m_l = 0;
                                $.each(prodObj.ProdPics, function () {
                                    if (this.Level && this.Level > 0) {
                                        if (this.Level > m_l) {
                                            m_l = this.Level;
                                            m_pic = this.PicUrl;
                                        }
                                    }
                                });

                                if (m_pic) {
                                    if (m_pic.indexOf("http://") == -1) {
                                        thisObj.picCtrl.mainView.attr("src", window.webLocation + m_pic);
                                    }
                                    else {
                                        thisObj.picCtrl.mainView.attr("src", m_pic);
                                    }
                                }
                            });
                            m_liCtrl.append(m_pvCtrl);

                            m_values.append(m_liCtrl);
                            m_i++;

                            if (m_selectedpvs.containKey(this.toString())) {
                                m_selectlis.push(m_liCtrl);
                            }
                        });
                        m_txtCtrl.append(m_values);
                        m_sku_tr.append(m_txtCtrl);
                        thisObj.propCtrl.append(m_sku_tr);
                    }
                    else {
                        m_expendProps.push(this);
                    }
                });
                $.each(m_expendProps, function () {
                    var m_tr = $("<div class='submitForm-tr'></div>");
                    m_tr.append("<span class='title'>" + this.ProdPropName + ":</span>");
                    var m_txtCtrl = $("<span style='width: 520px; display: inline-block'></span>");
                    m_txtCtrl.text(this.ProdPValueRange);

                    m_tr.append(m_txtCtrl);
                    thisObj.propCtrl.append(m_tr);
                });

                var m_statestr = "";
                if (prodObj.State == "0") {
                    m_statestr = " (" + mlm.C1150 + ")";
                }

                thisObj.prodNameCtrl.text(prodObj.ProdName + m_statestr);
                thisObj.weightCtrl.text(Number(prodObj.Weight).toFixed(3));

                if (prodObj.OtherProps.BrandName) {
                    thisObj.brandCtrl.text(prodObj.OtherProps.BrandName);
                }
                else {
                    thisObj.brandCtrl.text("");
                }

                thisObj.pdcCtrl.text(prodObj.OtherProps.PdcName);
                thisObj.prodCodeCtrl.text(prodObj.ProdCode);
                thisObj.unitCtrl.text(prodObj.Unit);
                thisObj.htmlDetailCtrl.val(prodObj.Remark.replace(/\^/g, "\"").replace(/\~/g, "\'"));

                thisObj.materialCtrl.text(prodObj.CustomMaterial);
                thisObj.costumCtrl.text(prodObj.CustomProdName);
                thisObj.costum_cnCtrl.text(prodObj.CustomProdName_CN);
                thisObj.costumValueCtrl.text("$ " + Number(prodObj.CustomValue).toFixed(2));
                thisObj.costumCodeCtrl.text(prodObj.CustomCode);
                thisObj.originCtrl.text(prodObj.OtherProps.GlobalAreaName);

                thisObj._fillProdPics(prodObj);

                $.each(m_selectlis, function () {
                    this.trigger("click");
                });
            });

            this.viewProdDialog.show();
            $("#lkProdInfo_view").trigger("click");
        },

        /* 查看商品Tab项 */
        _showViewProdTab: function (event, ui) {

            /* this指针 */
            var m_thisObj = this;

            /* 最小库存单元 */
            if (ui.index == 2) {

                if (!this.m_skuTable) {

                    this.m_skuTable = new uicontrol.tableList("viewSkuTable",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 440,
                                         keyColumn: "SkuProduct_Id",
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'center', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuProdPicCell },
                                                { display: mlm.C0128, name: "SkuProps", width: 160, align: 'left' },
                                                { display: mlm.C1205, name: "ProdCode", width: 120, align: 'left' },
                                                { display: mlm.C1064, name: "Cost", width: 100, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuCostCell },
                                                { display: mlm.C1153, name: "", width: 140, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuQuotedPriceCell },
                                                { display: mlm.C1652, name: "InventoryCost", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuCostCell },
                                                { display: mlm.C1619, name: "SafetyStock", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSafetyStockCell },
                                                { display: mlm.C0634, name: "TotalStock", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructStockCell}]
                                     });
                }

                if (this.isloadskuprod) {
                    this.m_skuTable.bindDataSource(this.viewProdDialog.product.SKUProducts);
                    this.isloadskuprod = false;
                }
            }
            /* 采购价格 */
            else if (ui.index == 3) {
                if (!this.m_purchasePriceTable) {

                    this.m_purchasePriceTable = new uicontrol.tableList("purchasepriceTable_v",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 440,
                                         keyColumn: "QuoteKey",
                                         columns: [{ display: mlm.C1069, name: "", width: 360, align: 'left', adjust: true, createCell: bizcontrol.viewproduct.fn._constructPurSourceCell },
                                                { display: mlm.C1153, name: "", width: 150, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructQuotedPriceCell },
                                                { display: mlm.C1163, name: "", width: 60, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructQuotedPeriodCell}]
                                     });
                }

                if (this.isloadquotedprice) {

                    var m_quoteditems = bizcontrol.viewproduct.fn._getQuotedPrices(0, null, 0);
                    this.m_purchasePriceTable.bindDataSource(m_quoteditems);

                    $.each(m_quoteditems, function () {
                        var m_itemCtrl = $("#lbQuotedRemark_v_" + this.QuoteKey);
                        m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
                    });

                    this.isloadquotedprice = false;
                }
            }
            /* 站点商品信息 */
            else if (ui.index == 5) {
                if (!m_thisObj.viewSSProdTable) {
                    m_thisObj.viewSSProdTable = new uicontrol.tableList("viewSSProdTable",
                                                { isPaging: false,
                                                    autoSeq: true,
                                                    height: 440,
                                                    keyColumn: "SS_Product_Id",
                                                    columns: [{ display: mlm.C0416, name: "", width: 150, align: 'left', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSaleSiteCell },
                                                               { display: mlm.C0180, name: "BrowsePicUrl", width: 90, align: 'center', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSSProdPicCell },
                                                               { display: mlm.C0734, name: "ProdName", width: 260, align: 'left', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSSProdNameCell },
                                                               { display: mlm.C1256, name: "", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSSProdPriceCell },
                                                               { display: mlm.C1257, name: "CMonthSaleCount", width: 60, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                               { display: mlm.C1258, name: "AllSaleCount", width: 60, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                               { display: mlm.C1259, name: "OnlineTimeStr", width: 75, align: 'center', adjust: true, adjust: true, createCell: bizcontrol.viewproduct.fn._constructOnlineTimeCell}]
                                                });
                }

                if (this.isloadssproduct) {
                    var m_ss_product = new sm.ss_product();
                    m_ss_product.Product_Id = this.viewProdDialog.product.Product_Id;
                    m_ss_product.querySSProductByInnerProd(function (retTable) {

                        m_thisObj.viewSSProdTable.bindDataSource(retTable);

                        m_thisObj.isloadssproduct = false;
                    });
                }
            }
        },

        /* 获取采购报价 */
        _getQuotedPrices: function (supplier_id, puraddress, skuproduct_id) {
            var m_thisobj = bizcontrol.viewproduct.fn.actionObj;
            var m_quoteditems = [];
            var m_suppQuotedDict = new datastruct.dictionary();
            var m_i = 1;
            $.each(m_thisobj.viewProdDialog.product.QuotedPriceTable, function () {

                if (Number(supplier_id) > 0) {
                    if (Number(supplier_id) != Number(this.Supplier_Id)) {
                        return;
                    }
                }
                else if (puraddress) {
                    if (puraddress != this.PurAddress) {
                        return;
                    }
                }
                else if (Number(skuproduct_id) > 0) {
                    if (Number(skuproduct_id) != Number(this.SkuProduct_Id)) {
                        return;
                    }
                }

                var m_key = "";
                if (Number(this.Supplier_Id) > 0) {
                    m_key = this.Supplier_Id.toString();
                }
                else {
                    m_key = this.PurAddress;
                }

                var m_suppQuotedObj = m_suppQuotedDict.getItem(m_key);
                if (!m_suppQuotedObj) {
                    m_suppQuotedObj = this;
                    m_suppQuotedObj.QuoteKey = m_i;
                    m_suppQuotedObj.MinQuotedPrice = this.QuotedPrice;
                    m_suppQuotedObj.MaxQuotedPrice = this.QuotedPrice;
                    m_suppQuotedObj.MinPeriod = this.Period;
                    m_suppQuotedObj.MaxPeriod = this.Period;
                    m_suppQuotedObj.Remark = this.Remark;
                    m_suppQuotedDict.setItem(m_key, m_suppQuotedObj);

                    m_quoteditems.push(m_suppQuotedObj);
                }
                else {
                    if (Number(this.QuotedPrice) < Number(m_suppQuotedObj.MinQuotedPrice)) {
                        m_suppQuotedObj.MinQuotedPrice = this.QuotedPrice;
                    }
                    else if (Number(this.QuotedPrice) > Number(m_suppQuotedObj.MaxQuotedPrice)) {
                        m_suppQuotedObj.MaxQuotedPrice = this.QuotedPrice;
                    }

                    if (Number(this.Period) < Number(m_suppQuotedObj.MinPeriod)) {
                        m_suppQuotedObj.MinPeriod = this.Period;
                    }
                    else if (Number(this.Period) > Number(m_suppQuotedObj.MaxPeriod)) {
                        m_suppQuotedObj.MaxPeriod = this.Period;
                    }

                    if (!m_suppQuotedObj.Remark) {
                        m_suppQuotedObj.Remark = this.Remark;
                    }
                    else {
                        m_suppQuotedObj.Remark = m_suppQuotedObj.Remark + ".....";
                    }
                }

                m_i++;
            });

            return m_quoteditems;
        },
        /* 获取采购报价条目 */
        _getQuotedPriceItem: function (supplier_id, puraddress, skuproduct_id) {
            var m_thisobj = bizcontrol.viewproduct.fn.actionObj;
            var m_quoteditems = [];
            var m_i = 1;
            $.each(m_thisobj.viewProdDialog.product.QuotedPriceTable, function () {

                if (Number(supplier_id) > 0) {
                    if (Number(supplier_id) != Number(this.Supplier_Id)) {
                        return;
                    }
                }
                else if (puraddress) {
                    if (puraddress != this.PurAddress) {
                        return;
                    }
                }
                else if (Number(skuproduct_id) > 0) {
                    if (Number(skuproduct_id) != Number(this.SkuProduct_Id)) {
                        return;
                    }
                }

                this.QuoteKey = m_i;
                m_quoteditems.push(this);

                m_i++;
            });

            return m_quoteditems;
        },

        /* 填充商品图片 */
        _fillProdPics: function (product) {
            var m_picObj = { smallPics: [], standardPics: [], bigPics: [] };

            var mainPic = {};
            $.each(product.ProdPics, function () {

                var m_src = "";
                if (this.PicUrl.indexOf("http://") == -1) {
                    m_src = window.webLocation;
                }

                m_picObj.smallPics.push({ src: m_src + this.BrowsePicUrl, width: this.BrowserPicWidth, height: this.BrowserPicHeight });
                m_picObj.standardPics.push({ src: m_src + this.PicUrl, width: this.PicWidth, height: this.PicHeight });
                m_picObj.bigPics.push({ src: m_src + this.SourcePicUrl });
            });

            this.picCtrl.bindSource(m_picObj, product.ProdName);
        },

        /*  */
        _constructSkuCostCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                return commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue);
            }
        },
        /* 构建销售区域及站内导航列 */
        _constructSaleSiteCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_css = "";
            if (!m_obj.State || m_obj.State == "1" || m_obj.State == "3") {
                m_css = "color: #747474";
            }

            var m_htmls = [];
            if (m_obj.SaleSiteName) {
                m_htmls.push("<div style='padding: 0px; " + m_css + "'>" + m_obj.SPfName + "-" + m_obj.SaleSiteName + "</div>");
            }
            else {
                m_htmls.push("<div style='padding: 0px; " + m_css + "'>" + m_obj.SPfName + "</div>");
            }

            return m_htmls.join("");
        },
        /* 构建Sku图片列 */
        _constructSkuProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /* 构建图片列 */
        _constructSSProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 80px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-sl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 80);' onerror='commoncore.func.failLoadImg.call(this, 80);' onclick='viewSSProduct.call(this, \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /* 构建商品列 */
        _constructSSProdNameCell: function (key, cellValue) {
            var m_obj = this.keyObj;
            if (!cellValue) {
                return "<span style='color: #747474'>" + mlm.C0966 + "</span>";
            }
            else {
                var m_obj = this.keyObj;

                var m_css = "";
                if (!m_obj.State || m_obj.State == "1" || m_obj.State == "3") {
                    m_css = "style='color: #747474'";
                }

                var m_items = [];
                m_items.push("<div style='padding: 0px'><a " + m_css + " onclick='viewSSProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue.replace(/\^/g, "\"").replace(/\~/g, "\'") + "</a></div>");
                if (Number(m_obj.AvailableUnitCount) > 1) {
                    m_items.push("<div style='margin: 3px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.AvailableUnitCount + mlm.C1066 + "</div>");
                }

                return m_items.join("");
            }
        },
        /* 构建商品价格列 */
        _constructSSProdPriceCell: function (key, cellValue) {
            var m_arr = [];
            if (this.keyObj.MaxSalePrice && Number(this.keyObj.MaxSalePrice) > 0) {
                if (Number(this.keyObj.MinSalePrice) == Number(this.keyObj.MaxSalePrice)) {
                    m_arr.push("<div style='padding: 0px'>" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinSalePrice) + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px'>" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinSalePrice) + "-" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MaxSalePrice) + "</div>");
                }

                if (this.keyObj.MaxProfit) {
                    var m_maxprofit = Number(this.keyObj.MaxProfit);
                    if (m_maxprofit == -10000) {
                        m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>(" + mlm.C1145 + ")</div>");
                    }
                    else {
                        if (m_maxprofit != 0) {
                            if (Number(this.keyObj.MinProfit) == m_maxprofit) {
                                m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>(" + mlm.C1146 + ":" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinProfit) + ")</div>");
                            }
                            else {
                                m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px' class='lb-symbol'>(" + mlm.C1146 + ":" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MinProfit) + "-" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.MaxProfit) + ")</div>");
                            }
                        }
                    }
                }
            }
            return m_arr.join("");
        },
        /* 构建商品价格列 */
        _constructOnlineTimeCell: function (key, cellValue) {
            if (this.keyObj.State == "2") {
                var date = new Date(cellValue);
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            }
        },

        /* 构建库存列 */
        _constructStockCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                return commoncore.func.constructQtyCell(key, cellValue);
            }
        },
        /* 构建安全库存列 */
        _constructSafetyStockCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                var m_obj = this.keyObj;

                var m_safetystock = Number(cellValue);
                if (m_safetystock > 0) {
                    var m_css = "";
                    if (m_safetystock > Number(m_obj.TotalStock)) {
                        m_css = "color: #FF0000";
                    }
                    return "<div style='padding: 0px; " + m_css + "'>" + cellValue + "</div>";
                }
            }
        },
        /* 构建Sku实际采购价格列 */
        _constructSkuQuotedPriceCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                var m_arr = [];

                if (this.keyObj.MaxQuotedPrice && Number(this.keyObj.MaxQuotedPrice) > 0) {
                    if (Number(this.keyObj.MinQuotedPrice) == Number(this.keyObj.MaxQuotedPrice)) {
                        m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinQuotedPrice) + "</div>");
                    }
                    else {
                        m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinQuotedPrice) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MaxQuotedPrice) + "</div>");
                    }
                }
                return m_arr.join("");
            }
        },
        /* 构建采购来源列 */
        _constructPurSourceCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                var m_arr = [];

                var m_strlen = 43;
                if (this.keyObj.SuppName) {
                    m_arr.push("<a onclick='openViewSuppFrm.call(this, \"" + this.keyObj.Supplier_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SuppName + "</a>");
                    m_strlen = 41;
                }

                if (this.keyObj.PurAddress) {
                    if (this.keyObj.PurAddress.toLowerCase().indexOf("http") > -1) {

                        var m_address = this.keyObj.PurAddress;
                        var m_len = m_address.getBytesCount();
                        if (m_len > m_strlen) {
                            m_address = m_address.substringByBytes(m_strlen) + "...";
                        }

                        if (this.keyObj.GlobalAreaName) {
                            m_address += "-" + this.keyObj.GlobalAreaName;
                        }

                        if (this.keyObj.SuppName) {
                            m_arr.push(" <div style='padding: 0px'>(<a href='" + this.keyObj.PurAddress + "' target='_blank'>" + m_address + "</a>)<div>");
                        }
                        else {
                            m_arr.push("<a href='" + this.keyObj.PurAddress + "' target='_blank'>" + m_address + "</a>");
                        }
                    }
                    else {

                        if (this.keyObj.SuppName) {
                            if (this.keyObj.GlobalAreaName && this.keyObj.PurAddress.indexOf(this.keyObj.GlobalAreaName) == -1) {
                                m_arr.push(" (<span>" + this.keyObj.PurAddress + "-" + this.keyObj.GlobalAreaName + "</span>)");
                            }
                            else {
                                m_arr.push(" (<span>" + this.keyObj.PurAddress + "</span>)");
                            }
                        }
                        else {
                            if (this.keyObj.GlobalAreaName && this.keyObj.PurAddress.indexOf(this.keyObj.GlobalAreaName) == -1) {
                                m_arr.push("<span>" + this.keyObj.PurAddress + "-" + this.keyObj.GlobalAreaName + "</span>");
                            }
                            else {
                                m_arr.push("<span>" + this.keyObj.PurAddress + "</span>");
                            }
                        }
                    }
                }

                return m_arr.join("");
            }
        },
        /* 构建实际采购价格列 */
        _constructQuotedPriceCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                var m_obj = this.keyObj;

                var m_title = m_obj.SuppName;
                if (!m_title) {
                    m_title = m_obj.PurAddress;
                }

                var m_remarkhtml = "";
                if (m_obj.Remark) {
                    m_remarkhtml = " id='lbQuotedRemark_v_" + key + "' style='color: #840000'; tag='" + m_obj.Remark + "'";
                }

                var m_htmls = [];
                if (m_obj.MinQuotedPrice) {
                    if (Number(m_obj.MinQuotedPrice) == Number(m_obj.MaxQuotedPrice)) {
                        m_htmls.push("<div style='padding: 0px'><a " + m_remarkhtml + " onclick='bizcontrol.viewproduct.fn._viewSkuQuotedItem.call(this, \"" + m_title + "\", \"" + m_obj.Supplier_Id + "\", \"" + m_obj.PurAddress + "\", 0)' href='javascript:void(\"0\");'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinQuotedPrice) + "</a></div>");
                    }
                    else {
                        m_htmls.push("<div style='padding: 0px'><a " + m_remarkhtml + " onclick='bizcontrol.viewproduct.fn._viewSkuQuotedItem.call(this, \"" + m_title + "\", \"" + m_obj.Supplier_Id + "\", \"" + m_obj.PurAddress + "\", 0)' href='javascript:void(\"0\");'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinQuotedPrice) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MaxQuotedPrice) + "</a></div>");
                    }
                }

                return m_htmls.join("");
            }
        },
        /* 构建Sku实际采购价格列 */
        _constructSkuItemQuotedPriceCell: function (key, cellValue) {
            if (pageVariable.isviewprodauth) {
                var m_obj = this.keyObj;

                var m_remarkhtml = "";
                if (m_obj.Remark) {
                    m_remarkhtml = " id='lbSkuQuotedRemark_v_" + key + "' style='color: #840000'; tag='" + m_obj.Remark + "'";
                }

                return "<span " + m_remarkhtml + ">" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.QuotedPrice) + "</span>";
            }
        },
        /* 构建采购周期列 */
        _constructQuotedPeriodCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_htmls = [];
            if (m_obj.MinPeriod) {
                if (Number(m_obj.MinPeriod) == Number(m_obj.MaxPeriod)) {
                    m_htmls.push("<div style='padding: 0px'>" + this.keyObj.MinPeriod + " " + mlm.C0800 + "</div>");
                }
                else {
                    m_htmls.push("<div style='padding: 0px'>" + this.keyObj.MinPeriod + " - " + this.keyObj.MaxPeriod + " " + mlm.C0800 + "</div>");
                }
            }

            return m_htmls.join("");
        },
        /* 构建Sku采购周期列 */
        _constructSkuItemQuotedPeriodCell: function (key, cellValue) {
            var m_obj = this.keyObj;
            return "<span>" + this.keyObj.Period + " " + mlm.C0800 + "</span>";
        },
        /* 查看Sku报价 */
        _viewSkuQuotedItem: function (title, supplier_id, puraddress, skuproduct_id) {
            var m_obj = bizcontrol.viewproduct.fn.actionObj;
            if (!m_obj.viewSkuQuotedItemCtrl) {
                m_obj.viewSkuQuotedItemCtrl = uicontrol.dialog(m_obj.m_skuquotedctrl, "", { width: 900, position: ["auto", 25] });

                m_obj.m_quotedpriceTable = new uicontrol.tableList("quotedpriceTable_v",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 440,
                                         keyColumn: "QuoteKey",
                                         columns: [{ display: mlm.C0174, name: "SkuProps", width: 100, align: 'left' },
                                                   { display: mlm.C1069, name: "", width: 360, align: 'left', adjust: true, createCell: bizcontrol.viewproduct.fn._constructPurSourceCell },
                                                   { display: mlm.C1153, name: "", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuItemQuotedPriceCell },
                                                   { display: mlm.C1163, name: "", width: 60, align: 'right', adjust: true, createCell: bizcontrol.viewproduct.fn._constructSkuItemQuotedPeriodCell}]
                                     });
            }

            var m_quoteditems = bizcontrol.viewproduct.fn._getQuotedPriceItem(supplier_id, puraddress, skuproduct_id);
            m_obj.m_quotedpriceTable.bindDataSource(m_quoteditems);

            $.each(m_quoteditems, function () {
                var m_itemCtrl = $("#lbSkuQuotedRemark_v_" + this.QuoteKey);
                m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            });

            m_obj.viewSkuQuotedItemCtrl.setTitle(title);
            m_obj.viewSkuQuotedItemCtrl.show();
        },
        /* 查看供应商 */
        _viewSuppFrm: function (key) {
            pageVariable.viewSupplierFrm.show(key);
        }
    };
    bizcontrol.viewproduct.fn.init.prototype = bizcontrol.viewproduct.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----商品查看控件----- 
    */
    bizcontrol.viewssproduct = function () {
        var obj = new bizcontrol.viewssproduct.fn.init();
        return obj;
    };
    bizcontrol.viewssproduct.fn = {

        _activedobj: null,

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewSSProdFrm' class='view-product' style='display: none;'></div>");

            if (!pageVariable.user) {
                pageVariable.user = userpopedom["user_" + m_usertoken];
            }
            if (pageVariable.user.SysUser_Id == "1" || pageVariable.user.RoleIds.indexOf("#1#") > -1 || pageVariable.user.RoleIds.indexOf("#8#") > -1) {
                pageVariable.user.isauthorise = true;
            }
            else {
                pageVariable.user.isauthorise = false;
            }

            var m_containerCtrl = $("<div></div>");
            this.viewTabsCtrl = $("<div style='height: 550px'>");

            /* Tab控件 */
            var m_ulTabCtrl = $("<ul class='prodTab'></ul>");
            m_ulTabCtrl.append("<li><a id='lkSSProdInfo_view' href='#ssprodInfo_view'>" + mlm.C0169 + "</a></li>");
            m_ulTabCtrl.append("<li><a href='#ss_detailInfo'>" + mlm.C0173 + "</a></li>");
            m_ulTabCtrl.append("<li><a href='#ss_skuList_view'>" + mlm.C1043 + "</a></li>");

            if (pageVariable.user.isauthorise) {
                m_ulTabCtrl.append("<li><a href='#expservice_view'>" + mlm.C0431 + "</a></li>");
                m_ulTabCtrl.append("<li><a href='#saleprice_view'>" + mlm.C1108 + "</a></li>");
                m_ulTabCtrl.append("<li><a href='#gift_view'>" + mlm.C1061 + "</a></li>");
                m_ulTabCtrl.append("<li><a href='#ss_profit_view'>" + mlm.C1045 + "</a></li>");
            }

            this.viewTabsCtrl.append(m_ulTabCtrl);

            var m_ssprodInfo_viewCtrl = $("<div id='ssprodInfo_view'></div>");

            /* 图片控件 */
            this.m_picCtrl = $("<div class='pic-container'></div>");
            m_ssprodInfo_viewCtrl.append(this.m_picCtrl);

            /* 详细清单 */
            this.m_detailContainerCtrl = $("<div class='detail-container'></div>");
            var m_tableCtrl = $("<div class='submitForm basicinfo' style='width: 640px; height: 500px; overflow: auto'></div>");

            var m_trProdNameCtrl = $("<div class='submitForm-tr first-item'><span></span></div>");
            m_trProdNameCtrl.append("<span class='title'>" + mlm.C0175 + ":</span>");
            /* 商品名称 */
            this.prodNameCtrl = $("<span style='width: 500px; display: inline-block'></span>");
            m_trProdNameCtrl.append(this.prodNameCtrl);
            m_tableCtrl.append(m_trProdNameCtrl);

            var m_trProdCodeCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trProdCodeCtrl.append("<span class='title'>" + mlm.C0194 + ":</span>");
            /* 商品编码 */
            this.prodcodeCtrl = $("<span></span>");
            m_trProdCodeCtrl.append(this.prodcodeCtrl);
            m_tableCtrl.append(m_trProdCodeCtrl);

            var m_trUnitCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trUnitCtrl.append("<span class='title'>" + mlm.C1048 + ":</span>");
            /* 单位 */
            this.unitCtrl = $("<span></span>");
            m_trUnitCtrl.append(this.unitCtrl);
            m_tableCtrl.append(m_trUnitCtrl);

            var m_trPdcCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trPdcCtrl.append("<span class='title'>" + mlm.C0090 + ":</span>");
            /* 商品分类 */
            this.pdcCtrl = $("<span style='width: 500px; display: inline-block'></span>");
            m_trPdcCtrl.append(this.pdcCtrl);
            m_tableCtrl.append(m_trPdcCtrl);

            var m_trBrandCtrl = $("<div class='submitForm-tr'><span></span></div>");
            m_trBrandCtrl.append("<span class='title'>" + mlm.C0112 + ":</span>");
            /* 品牌 */
            this.brandCtrl = $("<span></span>");
            m_trBrandCtrl.append(this.brandCtrl);
            m_tableCtrl.append(m_trBrandCtrl);

            /* 商品属性 */
            this.propCtrl = $("<div></div>");
            m_tableCtrl.append(this.propCtrl);

            this.m_detailContainerCtrl.append(m_tableCtrl);
            m_ssprodInfo_viewCtrl.append(this.m_detailContainerCtrl);

            var m_proddescCtrl = $("<div id='ss_detailInfo' class='desc-container'></div>");
            var m_desctitleCtrl = $("<div style='margin: 0px 0px 0px 0px; height: 20px'></div>");
            m_desctitleCtrl.append("<span class='lb-title list-title'>" + mlm.C1147 + "</span>");
            var m_previewToolbarCtrl = $("<div style='float: right;'></div>");
            var m_previewCtrl = $("<input type='button' class='normal-bt' style='margin:0px 10px 0px 0px' value='" + mlm.C0271 + "' />");
            m_previewToolbarCtrl.append(m_previewCtrl);
            m_desctitleCtrl.append(m_previewToolbarCtrl);
            m_proddescCtrl.append(m_desctitleCtrl);
            /* 商品详情控件 */
            this.htmlDetailCtrl = $("<textarea class='ssproddesc-container'></textarea>");
            m_proddescCtrl.append(this.htmlDetailCtrl);
            var m_tagtitleCtrl = $("<div style='margin: 10px 0px 0px 0px; height: 20px'></div>");
            m_tagtitleCtrl.append("<span class='lb-title list-title'>" + mlm.C1640 + "</span>");
            m_proddescCtrl.append(m_tagtitleCtrl);
            /* 网站搜索关键字 */
            this.tagsCtrl = $("<div class='prodtags-container'></div>");
            m_proddescCtrl.append(this.tagsCtrl);

            /* Sku控件 */
            this.m_skuCtrl = $("<div id='ss_skuList_view' style='width: 1075px;'></div>");
            var m_skuTableCtrl = $("<table id='viewInnerProdTable'></table>");
            this.m_skuCtrl.append(m_skuTableCtrl);

            /* 销售信息 */
            this.m_salePriceCtrl = $("<div id='saleprice_view' style='width: 1075px;'></div>");
            var m_salePriceTableCtrl = $("<table id='salePriceTable'></table>");
            this.m_salePriceCtrl.append(m_salePriceTableCtrl);

            /* 配送服务 */
            this.m_expServiceCtrl = $("<div id='expservice_view' style='width: 1075px;'></div>");
            var m_areaCtrl = $("<div id='dvExpArea_view' class='expAreaTree_v'></div>");
            var m_expareatreeCtrl = $("<ul id='expAreaTree_view'></ul>");
            m_areaCtrl.append(m_expareatreeCtrl);
            this.m_expServiceCtrl.append(m_areaCtrl);

            var m_expserviceCtrl = $("<div id='dvExpService_view' class='expServiceList_v'></div>");
            var m_escontainer = $("<div style='height: 30px'></div>");
            m_escontainer.append("<span class='lb-title list-title'>" + mlm.C0436 + mlm.C0463 + "</span>");
            var m_btExportExpService = $("<input type='button' class='normal-bt' style='float: right;' value='" + mlm.C0987 + mlm.C1051 + "' />");
            m_escontainer.append(m_btExportExpService);
            m_expserviceCtrl.append(m_escontainer);

            this.expserviceList = $("<table id='expServiceList_view'></table>");
            m_expserviceCtrl.append(this.expserviceList);
            this.m_expServiceCtrl.append(m_expserviceCtrl);


            /* 赠品 */
            this.m_giftCtrl = $("<div id='gift_view' style='width: 1075px;'></div>");
            var m_giftTableCtrl = $("<div class='submitForm form-width-d'></div>");

            var m_giftfstTrCtrl = $("<div class='submitForm-tr first-item'></div>");
            var m_giftfstTrLCellCtrl = $("<span class='left-cell'></div>");
            m_giftfstTrLCellCtrl.append("<span class='title'>" + mlm.C0798 + ":</span>");
            /* 重量限制 */
            this.giftweightlimitCtrl = $("<span></span>");
            m_giftfstTrLCellCtrl.append(this.giftweightlimitCtrl);
            this.giftweightunitCtrl = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_giftfstTrLCellCtrl.append(this.giftweightunitCtrl);

            var m_giftfstTrRCellCtrl = $("<span></div>");
            m_giftfstTrRCellCtrl.append("<span class='title'>" + mlm.C1254 + ":</span>");
            /* 成本限制 */
            this.giftcostlimitCtrl = $("<span></span>");
            m_giftfstTrRCellCtrl.append(this.giftcostlimitCtrl);
            m_giftfstTrCtrl.append(m_giftfstTrLCellCtrl);
            m_giftfstTrCtrl.append(m_giftfstTrRCellCtrl);

            var m_giftlastTrCtrl = $("<div class='submitForm-tr last-item'></div>");
            m_giftlastTrCtrl.append($("<div style='height: 30px'><span class='lb-title list-title'>" + mlm.C1060 + "</span></div>"));
            this.giftTable = $("<table id='giftList_view'></table>");
            m_giftlastTrCtrl.append(this.giftTable);

            m_giftTableCtrl.append(m_giftfstTrCtrl);
            m_giftTableCtrl.append(m_giftlastTrCtrl);
            this.m_giftCtrl.append(m_giftTableCtrl);

            /* 商品利润 */
            this.m_profitCtrl = $("<div id='ss_profit_view' style='width: 1075px;'></div>");
            var m_apareaContainer = $("<div class='expAreaTree_v'></div>");
            var m_apareatreeCtrl = $("<ul id='apAreaTree_view'></ul>");
            m_apareaContainer.append(m_apareatreeCtrl);
            this.m_profitCtrl.append(m_apareaContainer);

            var m_profitContainer = $("<div class='expServiceList_v'></div>");
            var m_toolContainer = $("<div style='height: 25px; margin: 0px 0px 5px 0px'></div>");
            m_toolContainer.append(" <span class='lb-title list-title'>" + mlm.C1052 + mlm.C0463 + "</span>");
            m_profitContainer.append(m_toolContainer);
            this.profitList = $("<table id='prodProfitList_view'></table>");
            m_profitContainer.append(this.profitList);
            this.m_profitCtrl.append(m_profitContainer);

            this.viewTabsCtrl.append(m_ssprodInfo_viewCtrl);
            this.viewTabsCtrl.append(m_proddescCtrl);
            this.viewTabsCtrl.append(this.m_skuCtrl);

            if (pageVariable.user.isauthorise) {
                this.viewTabsCtrl.append(this.m_salePriceCtrl);
                this.viewTabsCtrl.append(this.m_expServiceCtrl);
                this.viewTabsCtrl.append(this.m_giftCtrl);
                this.viewTabsCtrl.append(this.m_profitCtrl);
            }

            m_containerCtrl.append(this.viewTabsCtrl);
            this.ctrl.append(m_containerCtrl);

            m_btExportExpService.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_previewCtrl.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btExportExpService.click(bizcontrol.viewssproduct.fn._exportExpServices);

            var m_this = this;
            m_previewCtrl.click(function () {
                var m_openfrm = window.open("_proddesc.htm", '', 'height=600, width=1180, top=60, left=30, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');
                m_openfrm.document.write(m_this.htmlDetailCtrl.text());
            });

            /* 商品属性缓存 */
            this.pdcProps = new datastruct.dictionary();
        },

        /* 展示商品信息 */
        show: function (product_id, ss_innerprod_id) {

            /* this指针 */
            var thisObj = this;
            bizcontrol.viewssproduct.fn._activedobj = this;

            if (!this.viewProdDialog) {
                this.viewProdDialog = new uicontrol.dialog(this.ctrl, mlm.C0197, { width: 1125, position: ["auto", 10] });
                this.picCtrl = new uicontrol.pictureSlip(this.m_picCtrl, { position: ["auto", 10] });

                this.viewTabsCtrl.tabs({ show: function (event, ui) { thisObj._showViewProdTab(event, ui); } });
            }

            thisObj.propCtrl.empty();

            var m_product = new sm.ss_product();
            m_product.SS_Product_Id = product_id;
            m_product.readSSProductWithMainPic(function (prodObj) {
                prodObj = $.extend(prodObj, prodObj.OtherProps);
                thisObj.viewProdDialog.product = prodObj;

                if (!saleplatform) {
                    saleplatform = {};
                    saleplatform.currObj = {};
                    saleplatform.currObj.CurrSymbol = thisObj.viewProdDialog.product.CurrSymbol;
                    saleplatform.currObj.WUnit = thisObj.viewProdDialog.product.WUnit;
                    saleplatform.currObj.CurrCode = thisObj.viewProdDialog.product.CurrCode;
                }

                thisObj.viewProdDialog.product.ExpDict = new datastruct.dictionary();
                $.each(thisObj.viewProdDialog.product.ExpServices, function () {
                    if (this.State == "1") {
                        var m_esarr = thisObj.viewProdDialog.product.ExpDict.getItem(this.GlobalArea_Id);
                        if (!m_esarr) {
                            m_esarr = [];
                            thisObj.viewProdDialog.product.ExpDict.setItem(this.GlobalArea_Id, m_esarr);
                        }
                        this.ExpressServiceName = this.OtherProps.ExpressServiceName;
                        this.ESType = this.OtherProps.ESType;
                        this.WarehouseName = this.OtherProps.WarehouseName;
                        m_esarr.push(this);
                    }
                });

                var m_selecteddict = new datastruct.dictionary();
                var m_selectedlictrls = [];
                if (ss_innerprod_id) {
                    $.each(prodObj.InnerProds, function () {
                        if (ss_innerprod_id == this.SS_InnerProd_Id) {
                            if (this.PropValues) {
                                var m_pvs = this.PropValues.split("_");
                                $.each(m_pvs, function () {
                                    m_selecteddict.setItem(this);
                                });
                            }
                        }
                    });
                }

                var m_expendProps = [];
                $.each(prodObj.PropTable, function () {
                    if (this.IsSku == "1") {
                        var m_propid = this.ProdProperty_Id;
                        var m_sku_tr = $("<div class='submitForm-tr'></div>");
                        m_sku_tr.append("<span class='title'>" + this.ProdPropName + ":</span>");

                        var m_txtCtrl = $("<span style='width: 500px; display: inline-block; margin : 0px 0px -5px 0px; padding: 0px'></span>");
                        var m_values = $("<ul id='ss_propul_" + m_propid + "'></ul>");
                        var m_pvalueids = this.ProdPValueIdRange.split(",");
                        var m_pvalues = this.ProdPValueRange.split(",");
                        var m_i = 0;
                        $.each(m_pvalueids, function () {

                            var m_liCtrl = $("<li class='color-pic' tag='" + m_propid + "' value='" + this + "'></li>");

                            if (m_selecteddict.containKey(this.toString())) {
                                m_selectedlictrls.push(m_liCtrl);
                            }

                            var m_pvCtrl = $("<div style='text-align: center;' class='lb-symbol'>" + m_pvalues[m_i] + "</div>");
                            m_liCtrl.hover(function () {
                                $(this).css("border-color", "#A60000");
                            }, function () {
                                if (!$(this).attr("selected")) {
                                    $(this).css("border-color", "#ccc");
                                }
                            });
                            m_liCtrl.click(function () {
                                var m_propid = $(this).attr("tag");
                                var m_proplis = $("#ss_propul_" + m_propid).find("li");

                                $.each(m_proplis, function () {
                                    $(this).css("border-color", "#ccc");
                                    $(this).attr("selected", null);
                                });

                                $(this).attr("selected", "true");
                                $(this).css("border-color", "#A60000");

                                var m_pvarr = new datastruct.dictionary();
                                $.each(prodObj.PropTable, function () {
                                    if (this.IsSku) {

                                        var m_selectedLis = $("#ss_propul_" + this.ProdProperty_Id).find("li");
                                        $.each(m_selectedLis, function () {
                                            if ($(this).attr("selected")) {
                                                m_pvarr.setItem($(this).attr("value"), null);
                                            }
                                        });
                                    }
                                });

                                $.each(prodObj.ProdPics, function () {
                                    var m_level = 0;
                                    $.each(this.RelPValueIds, function () {
                                        if (m_pvarr.containKey(this)) {
                                            m_level++;
                                        }
                                    });

                                    this.Level = m_level;
                                });

                                var m_pic = "";
                                var m_l = 0;
                                $.each(prodObj.ProdPics, function () {
                                    if (this.Level && this.Level > 0) {
                                        if (this.Level > m_l) {
                                            m_l = this.Level;
                                            m_pic = this.PicUrl;
                                        }
                                    }
                                });

                                if (m_pic) {
                                    if (m_pic.indexOf("http://") == -1) {
                                        thisObj.picCtrl.mainView.attr("src", window.webLocation + m_pic);
                                    }
                                    else {
                                        thisObj.picCtrl.mainView.attr("src", m_pic);
                                    }
                                }
                            });
                            m_liCtrl.append(m_pvCtrl);

                            m_values.append(m_liCtrl);
                            m_i++;
                        });
                        m_txtCtrl.append(m_values);
                        m_sku_tr.append(m_txtCtrl);
                        thisObj.propCtrl.append(m_sku_tr);
                    }
                    else {
                        m_expendProps.push(this);
                    }
                });
                $.each(m_expendProps, function () {
                    var m_tr = $("<div class='submitForm-tr'></div>");
                    m_tr.append("<span style='min-width: 100px; display: inline-block; color: #666666'>" + this.ProdPropName + ":</span>");
                    var m_txtCtrl = $("<span style='width: 300px; display: inline-block; padding: 0px 0px 0px 20px; '></span>");
                    m_txtCtrl.text(this.ProdPValueRange);

                    m_tr.append(m_txtCtrl);
                    thisObj.propCtrl.append(m_tr);
                });

                $.each(prodObj.Gifts, function () {
                    this.Weight = this.OtherProps.Weight;
                    this.Cost = this.OtherProps.Cost;
                });

                var m_statestr = "";
                if (prodObj.State == "1") {
                    m_statestr = " (" + mlm.C0399 + ")";
                }
                else if (prodObj.State == "3") {
                    m_statestr = " (" + mlm.C1025 + ")";
                }
                else if (prodObj.State == "4") {
                    m_statestr = " (修订中)";
                }
                thisObj.prodNameCtrl.text(prodObj.ProdName.replace(/\^/g, "\"").replace(/\~/g, "\'") + m_statestr);

                if (prodObj.OtherProps.BrandName) {
                    thisObj.brandCtrl.text(prodObj.OtherProps.BrandName);
                }
                else {
                    thisObj.brandCtrl.text("");
                }

                thisObj.pdcCtrl.text(prodObj.OtherProps.PdcName);
                thisObj.prodcodeCtrl.text(prodObj.ProdCode);
                thisObj.unitCtrl.text(prodObj.Unit);
                if (prodObj.Remark) {
                    thisObj.htmlDetailCtrl.val(prodObj.Remark.replace(/\^/g, "\"").replace(/\~/g, "\'"));
                }
                else {
                    thisObj.htmlDetailCtrl.val("");
                }
                thisObj.tagsCtrl.text(prodObj.Tags.replace(/\^/g, "\"").replace(/\~/g, "\'"));

                thisObj._fillProdPics(prodObj);

                var m_picdict = new datastruct.dictionary();
                $.each(prodObj.ProdPics, function () {
                    m_picdict.setItem(this.Product_Pic_Id, this);
                });

                $.each(prodObj.InnerProds, function () {
                    this.SkuProps = this.OtherProps.SkuProps;

                    if (this.Product_Pic_Id != "0") {
                        var m_pic = m_picdict.getItem(this.Product_Pic_Id);
                        this.BrowsePicUrl = m_pic.BrowsePicUrl;
                    }
                });

                thisObj.giftweightlimitCtrl.text(Number(prodObj.GiftWeightLimit).toFixed(3));
                thisObj.giftweightunitCtrl.text(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.WUnit);
                thisObj.giftcostlimitCtrl.html(commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, prodObj.GiftCostLimit));

                $.each(m_selectedlictrls, function () {
                    $(this).trigger("click");
                });
            });

            this.viewProdDialog.show();

            $("#lkSSProdInfo_view").trigger("click");

            this.isloadinnerprod = true;
            this.isloadexpservice = true;
            this.isloadsaleprice = true;
            this.isloadprofit = true;
            this.isloadgift = true;
            this.product_id = product_id;
            this.isloadRemark = false;
        },

        /* 查看商品Tab项 */
        _showViewProdTab: function (event, ui) {

            /* this指针 */
            var m_thisObj = this;

            /* 内部商品关系 */
            if (ui.index == 2) {

                if (!this.innerProdList) {

                    this.innerProdList = new uicontrol.tableList("viewInnerProdTable",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 440,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'center', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSkuProdPicCell },
                                                { display: mlm.C0174, name: "SkuProps", width: 100, align: 'left' },
                                                { display: mlm.C1205, name: "ProdCode", width: 100, align: 'left' },
                                                { display: mlm.C1251, name: "", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSSBoxWV },
                                                { display: mlm.C1247, name: "PackageWeight", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSSPackageWeight },
                                                { display: mlm.C1239, name: "CustomValue", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSSCustomValue },
                                                { display: mlm.M0012, name: "", width: 300, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_SkuProdCell}]
                                    });
                }

                if (this.isloadinnerprod) {
                    this.innerProdList.bindDataSource(this.viewProdDialog.product.InnerProds);
                    this.isloadinnerprod = false;
                }
            }
            else if (ui.index == 1) {
                if (!m_thisObj.isloadRemark) {
                    m_thisObj.isloadRemark = true;

                    var m_ss_product = new sm.ss_product();
                    m_ss_product.SS_Product_Id = m_thisObj.product_id;
                    m_ss_product.readSSProductRemark(function (retObj) {
                        m_thisObj.htmlDetailCtrl.val(retObj.Remark.replace(/\^/g, "\"").replace(/\~/g, "\'"));
                    });
                }
            }
            /* 配送服务 */
            else if (ui.index == 3) {
                if (this.isloadexpservice) {
                    bizcontrol.viewssproduct.fn._loadExpAreaTree();
                    this.isloadexpservice = false;
                }
            }
            /* 销售信息 */
            else if (ui.index == 4) {

                if (!this.salePriceList) {

                    this.salePriceList = new uicontrol.tableList("salePriceTable",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 440,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0174, name: "SkuProps", width: 150, align: 'left' },
                                                { display: mlm.C1064, name: "PurchaseCost", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_PriceCell },
                                                { display: mlm.C1057, name: "OtherCost", width: 70, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_PriceCell },
                                                { display: mlm.C1056, name: "TransCost", width: 70, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_TranCostCell },
                                                { display: mlm.C0204, name: "ListPrice", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_PriceCell },
                                                { display: mlm.C1058, name: "Discount", width: 70, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_DiscountCell },
                                                { display: mlm.C1059, name: "SalePrice", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSS_PriceCell}]
                                    });
                }

                if (this.isloadsaleprice) {
                    $.each(this.viewProdDialog.product.SalePrices, function () {
                        this.SkuProps = this.OtherProps.SkuProps;
                    });

                    this.salePriceList.bindDataSource(this.viewProdDialog.product.SalePrices);
                    this.isloadsaleprice = false;
                }
            }
            /* 赠品 */
            else if (ui.index == 5) {
                if (!this.giftList) {

                    this.giftList = new uicontrol.tableList("giftList_view",
                                            { isPaging: false,
                                                autoSeq: true,
                                                height: 360,
                                                keyColumn: "SS_Gift_Id",
                                                columns: [{ display: mlm.C1062, name: "GiftName", width: 200, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructGiftNameCell },
                                                        { display: mlm.M0012, name: "", width: 450, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructGiftItemCell },
                                                        { display: mlm.C1247, name: "Weight", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructGiftWeightCell },
                                                        { display: mlm.M0017, name: "Cost", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructGiftCostCell}]
                                            });
                }

                if (this.isloadgift) {
                    this.giftList.bindDataSource(this.viewProdDialog.product.Gifts);
                    this.isloadgift = false;
                }
            }
            /* 商品利润 */
            else if (ui.index == 6) {
                if (this.isloadprofit) {
                    bizcontrol.viewssproduct.fn._loadAPAreaTree();
                    this.isloadprofit = false;
                    if (this.prodProfitList) {
                        this.prodProfitList.bindDataSource(null);
                    }
                }
            }
        },

        /* 填充商品图片 */
        _fillProdPics: function (product) {
            var m_picObj = { smallPics: [], standardPics: [], bigPics: [] };

            $.each(product.ProdPics, function () {
                var m_src = "";
                if (this.PicUrl.indexOf("http://") == -1) {
                    m_src = window.webLocation;
                }

                m_picObj.smallPics.push({ src: m_src + this.BrowsePicUrl, width: this.BrowserPicWidth, height: this.BrowserPicHeight });
                m_picObj.standardPics.push({ src: m_src + this.PicUrl, width: this.PicWidth, height: this.PicHeight });
                m_picObj.bigPics.push({ src: m_src + this.SourcePicUrl });
            });

            this.picCtrl.bindSource(m_picObj, product.ProdName);
        },

        /* 构建商品图片列 */
        _constructSkuProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /* 构建内部商品信息列 */
        _constructSS_SkuProdCell: function (key, cellValue) {

            if (this.authoriseUser) {
                if (!this.authoriseUser()) {
                    return;
                }
            }

            var m_obj = this.keyObj;

            if (m_obj.SkuProducts) {

                var m_strarr = [];
                var i = 0;
                $.each(m_obj.SkuProducts, function () {

                    var m_style = "style='padding: 0px;";
                    if (i > 0) {
                        m_style += "margin: 5px 0px 0px 0px";
                    }
                    m_style += "'";

                    var m_innerprod = this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName;
                    if (this.OtherProps.SkuProps) {
                        m_innerprod += " - " + "[" + this.OtherProps.SkuProps + "]"
                    }

                    if (this.RelQty == "1") {
                        m_strarr.push("<div " + m_style + "><a onclick='viewProduct.call(this, \"" + this.OtherProps.Product_Id + "\", \"" + this.OtherProps.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + m_innerprod + "</a></div>");
                    }
                    else {
                        m_strarr.push("<div " + m_style + ">(" + this.RelQty + " " + this.OtherProps.Unit + ") <a onclick='viewProduct.call(this, \"" + this.OtherProps.Product_Id + "\", \"" + this.OtherProps.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + m_innerprod + "</a></div>");
                    }
                    i++;
                });
                return m_strarr.join("");
            }
            else {
                return "";
            }
        },
        /* 构建包装盒重量&体积列 */
        _constructSSBoxWV: function (key, cellValue) {
            var m_arr = [];

            m_arr.push("<div style='padding: 0px'>" + Number(this.keyObj.BoxWeight).toFixed(3) + " " + bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.WUnit + "</div>");
            m_arr.push("<div style='padding: 0px; margin: 2px 0px 0px 0px'>" + this.keyObj.BoxLength + "*" + this.keyObj.BoxWidth + "*" + this.keyObj.BoxHeight + " cm³</div>");

            return m_arr.join("");
        },
        /* 构建商品重量 */
        _constructSSPackageWeight: function (key, cellvalue) {
            return Number(cellvalue).toFixed(3) + " " + bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.WUnit;
        },
        /* 构建报关价值 */
        _constructSSCustomValue: function (key, cellvalue) {
            return commoncore.func.getCurrHtml("$", cellvalue);
        },
        /* 构建标准售价列 */
        _constructSS_PriceCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, cellValue);
        },
        /*  */
        _constructSS_TranCostCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, Number(cellValue) * Number(this.keyObj.SalePrice));
        },
        /* 构建折扣率列 */
        _constructSS_DiscountCell: function (key, cellValue) {
            return Number(cellValue) * 100 + "%";
        },
        /* 构建赠品名称列 */
        _constructGiftNameCell: function (key, cellvalue) {
            var m_obj = this.keyObj;

            var m_fontstyle = "";
            if (Number(m_obj.Weight) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftWeightLimit) ||
                    Number(m_obj.Cost) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftCostLimit)) {
                m_fontstyle = "color: red;"
            }

            return "<span style='" + m_fontstyle + "'>" + cellvalue + "<span>";
        },
        /* 构建赠品重量列 */
        _constructGiftWeightCell: function (key, cellvalue) {
            var m_obj = this.keyObj;

            var m_fontstyle = "";
            if (Number(m_obj.Weight) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftWeightLimit) ||
                    Number(m_obj.Cost) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftCostLimit)) {
                m_fontstyle = "color: red;"
            }

            return "<span style='" + m_fontstyle + "'>" + Number(cellvalue).toFixed(2) + " " + bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.WUnit + "<span>";
        },
        /* 构建赠品成本列 */
        _constructGiftCostCell: function (key, cellvalue) {
            var m_obj = this.keyObj;

            var m_fontstyle = "";
            if (Number(m_obj.Weight) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftWeightLimit) ||
                    Number(m_obj.Cost) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftCostLimit)) {
                m_fontstyle = "color: red;"
            }

            return "<span style='" + m_fontstyle + "'>" + commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.CurrSymbol, cellvalue) + "<span>";
        },
        /* 构建赠品列 */
        _constructGiftItemCell: function (key, cellvalue) {
            var m_strs = [];
            var m_obj = this.keyObj;

            var m_fontstyle = "";
            if (Number(m_obj.Weight) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftWeightLimit) ||
                    Number(m_obj.Cost) > Number(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.GiftCostLimit)) {
                m_fontstyle = "color: red;"
            }

            var i = 0;
            $.each(m_obj.Items, function () {

                var m_style = "style='padding: 0px;";
                if (i > 0) {
                    m_style += "margin: 5px 0px 0px 0px;";
                }
                m_style += "'";

                if (Number(this.Qty) > 1) {
                    m_strs.push("<div " + m_style + "><a style='" + m_fontstyle + "' onclick='viewProduct.call(this, \"" + this.OtherProps.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName + " [" + this.Qty + this.OtherProps.Unit + "]</a></div>");
                }
                else {
                    m_strs.push("<div " + m_style + "><a style='" + m_fontstyle + "' onclick='viewProduct.call(this, \"" + this.OtherProps.Product_Id + "\", \"" + this.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.OtherProps.ProdCode + " - " + this.OtherProps.ProdName + "</a></div>");
                }
                i++;
            });

            return m_strs.join("");
        },
        /* 加载区域列表 */
        _loadExpAreaTree: function () {
            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            if (!m_actionobj.expAreaTree || !m_actionobj.expAreaTree.ss_product_id || m_actionobj.expAreaTree.ss_product_id != m_actionobj.viewProdDialog.product.SS_Product_Id) {

                /* 显示进度 */
                pageframe.control.processCtrl.showOperaProcess();

                var m_this = this;
                var globalarea = new othm.globalarea();
                globalarea.SaleSite_Id = m_actionobj.viewProdDialog.product.SaleSite_Id;
                globalarea.queryGlobalAreaBySaleSite(function (source) {

                    m_actionobj.expAreaTree = new uicontrol.treeView($("#expAreaTree_view"), source, bizcontrol.viewssproduct.fn._loadExpService,
                                                                { sourceFormat: "table",
                                                                    keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                                    constructDisplayTxt: bizcontrol.viewssproduct.fn._constructGAreaTxt, isCollapse: true
                                                                });
                    m_actionobj.expAreaTree.loadSource();
                    m_actionobj.expAreaTree.ss_product_id = m_actionobj.viewProdDialog.product.SS_Product_Id;

                    bizcontrol.viewssproduct.fn._loadExpService();

                    pageframe.control.processCtrl.hideOperaProcess();
                });
            }
        },
        /* 构建区域显示 */
        _constructGAreaTxt: function (objitem) {
            var m_len = 0;
            var m_expobjs = bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.ExpDict.getItem(objitem.tag.GlobalArea_Id);
            if (m_expobjs) {
                $.each(m_expobjs, function () {
                    if (this.State == "1") {
                        m_len++;
                    }
                });
            }
            if (m_len > 0) {
                return "<span>" + objitem.tag.GlobalAreaName + "(" + m_len + ")" + "</span>";
            }
            else {
                return "<span class='lb-symbol'>" + objitem.tag.GlobalAreaName + "</span>";
            }
        },
        /* 加载配送服务 */
        _loadExpService: function () {
            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            if (!m_actionobj.expServiceList) {
                m_actionobj.expServiceList = new uicontrol.tableList("expServiceList_view",
                                             { autoSeq: true,
                                                 keyColumn: "ExpressService_Id",
                                                 height: 407,
                                                 columns: [{ display: mlm.C0436, name: "ExpressServiceName", width: 280, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructESName },
                                                           { display: mlm.C0291, name: "GlobalAreaName", width: 100, align: 'left' },
                                                           { display: mlm.C0786, name: "ESType", width: 85, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructESTypeCell },
                                                           { display: mlm.C1020, name: "FstCharge", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSSExpChargeCell },
                                                           { display: mlm.C1021, name: "IncreaseCharge", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructSSExpChargeCell}]
                                             });
            }

            if (m_actionobj.expAreaTree.selectedItem) {
                var m_globalareaid = m_actionobj.expAreaTree.selectedItem.key;
                var m_globalservices = m_actionobj.viewProdDialog.product.ExpDict.getItem(m_globalareaid);
                if (m_globalservices) {
                    $.each(m_globalservices, function () {
                        this.GlobalAreaName = m_actionobj.expAreaTree.selectedItem.tag.GlobalAreaName;
                    });
                }
                m_actionobj.expServiceList.bindDataSource(m_globalservices);
            }
        },
        /* 构建配送服务列 */
        _constructESName: function (key, cellValue) {
            var m_arr = [];

            var m_obj = this.keyObj;
            m_arr.push("<a onclick='openViewExpressServiceFrm.call(this, \"" + m_obj.ExpressService_Id + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>");

            if (m_obj.WarehouseName) {
                m_arr.push("<div class='lb-symbol'>(" + m_obj.WarehouseName + ")</div>");
            }

            return m_arr.join("");
        },
        /* 构建计费模式列 */
        _constructESTypeCell: function (key, cellValue) {
            if (cellValue == "1") {
                return mlm.C1014;
            }
            else if (cellValue == "2") {
                return mlm.C1015;
            }
            else {
                return mlm.C1016;
            }
        },
        /* 构建运费列 */
        _constructSSExpChargeCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            if (m_obj.ESType == "2") {
                return commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, cellValue);
            }
        },
        /* 加载利润区域列表 */
        _loadAPAreaTree: function () {
            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            if (!m_actionobj.apAreaTree || !m_actionobj.apAreaTree.ss_product_id || m_actionobj.apAreaTree.ss_product_id != m_actionobj.viewProdDialog.product.SS_Product_Id) {

                /* 显示进度 */
                pageframe.control.processCtrl.showOperaProcess();

                var m_this = this;
                var globalarea = new othm.globalarea();
                globalarea.SaleSite_Id = m_actionobj.viewProdDialog.product.SaleSite_Id;
                globalarea.queryGlobalAreaBySaleSite(function (source) {

                    m_actionobj.apAreaTree = new uicontrol.treeView($("#apAreaTree_view"), source, bizcontrol.viewssproduct.fn._loadProdfit,
                                                                { sourceFormat: "table",
                                                                    keyColumn: "GlobalArea_Id", parentKeyColumn: "ParentArea_Id", displayColumn: "GlobalAreaName",
                                                                    constructDisplayTxt: bizcontrol.viewssproduct.fn._constructGAreaTxt, isCollapse: true
                                                                });
                    m_actionobj.apAreaTree.loadSource();
                    m_actionobj.apAreaTree.ss_product_id = m_actionobj.viewProdDialog.product.SS_Product_Id;

                    bizcontrol.viewssproduct.fn._loadProdfit();
                });
            }
            else {
                bizcontrol.viewssproduct.fn._loadProdfit();
            }
        },
        /* 加载利润 */
        _loadProdfit: function () {
            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            if (!m_actionobj.prodProfitList) {
                m_actionobj.prodProfitList = new uicontrol.tableList("prodProfitList_view",
                                             { isPaging: true,
                                                 autoSeq: true,
                                                 keyColumn: "SS_ProdProfit_V_Id",
                                                 height: 405,
                                                 pageQueryHandler: bizcontrol.viewssproduct.fn._queryProdfit,
                                                 columns: [{ display: mlm.C1141, name: "GlobalAreaNames", width: 160, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructGlobalAreaCell },
                                                           { display: mlm.C0174, name: "SkuProps", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructProfitSkuCell },
                                                           { display: mlm.C0436, name: "ExpressServiceName", width: 170, align: 'left', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructESName },
                                                           { display: mlm.C1102, name: "FstProdProfit", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructProfitCell },
                                                           { display: mlm.C1103, name: "SecondProdProfit", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructOtherProfitCell },
                                                           { display: mlm.C1104, name: "ThirdProdProfit", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewssproduct.fn._constructOtherProfitCell}]
                                             });
            }

            bizcontrol.viewssproduct.fn._queryProdfit(1, m_actionobj.prodProfitList.pageNumber);
        },
        /* 查询利润 */
        _queryProdfit: function (pageNum, pageCount) {
            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            var m_globalarea_id = null;
            if (m_actionobj.apAreaTree.selectedItem) {
                m_globalarea_id = m_actionobj.apAreaTree.selectedItem.key;
            }

            var m_actionobj = bizcontrol.viewssproduct.fn._activedobj;
            var m_ss_product = new sm.ss_product();
            m_ss_product.Page = pageNum;
            m_ss_product.PageNum = pageCount;
            m_ss_product.SS_Product_Id = m_actionobj.viewProdDialog.product.SS_Product_Id;
            m_ss_product.GlobalArea_Id = m_globalarea_id;
            m_ss_product.SaleSite_Id = m_actionobj.viewProdDialog.product.SaleSite_Id;
            m_ss_product.queryProdProfit(function (retTable) {
                m_actionobj.prodProfitList.bindDataSource(retTable);

                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                $.each(m_jsonobjs, function () {
                    var m_itemCtrl = $("#lbPf_GA_V_" + this.SS_ProdProfit_V_Id + ", #lbPfSku_V_" + this.SS_ProdProfit_V_Id);
                    m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
                });

                /* 隐藏进度 */
                pageframe.control.processCtrl.hideOperaProcess();
            });
        },
        /* 构建区域列 */
        _constructGlobalAreaCell: function (key, cellvalue) {
            var m_len = cellvalue.getBytesCount();
            if (m_len > 30) {
                var m_str = cellvalue.substringByBytes(30) + "...";
                return "<span id='lbPf_GA_V_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
            }
            else {
                return cellvalue;
            }
        },
        /* 构建利润Sku列 */
        _constructProfitSkuCell: function (key, cellvalue) {
            var m_len = cellvalue.getBytesCount();
            if (m_len > 30) {
                var m_str = cellvalue.substringByBytes(30) + "...";
                return "<span id='lbPfSku_V_" + key + "' tag='" + cellvalue + "'>" + m_str + "</span>";
            }
            else {
                return cellvalue;
            }
        },
        /* 构建利润列 */
        _constructProfitCell: function (key, cellValue) {
            if (Number(cellValue) == -20000) {
                return "<div style='padding: 0px; margin: 0px' class='lb-symbol'>" + mlm.C1008 + "</div>";
            }
            else {
                return commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, cellValue);
            }
        },
        /* 构建利润列 */
        _constructOtherProfitCell: function (key, cellvalue) {
            if (Number(cellvalue) == -20000) {
                return "<div style='padding: 0px; margin: 0px' class='lb-symbol'>" + mlm.C1008 + "</div>";
            }
            else {
                if (Number(cellvalue) != 0) {

                    var m_items = [];
                    m_items.push("<div style='padding: 0px;'>" + commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, cellvalue) + "</div>");

                    if (Number(this.keyObj.FstProdProfit) > 0) {
                        var m_rate = ((Number(cellvalue) - Number(this.keyObj.FstProdProfit)) / Number(this.keyObj.FstProdProfit) * 100).toFixed(2);
                        m_items.push("<div style='margin: 3px 0px 0px 0px; padding: 0px' class='lb-symbol'>" + mlm.C1260 + ": " + m_rate + "%</div>");
                    }

                    return m_items.join("");
                }
                else {
                    return commoncore.func.getCurrHtml(bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product.OtherProps.CurrSymbol, cellvalue);
                }
            }
        },
        /* 导出配送价格 */
        _exportExpServices: function () {
            var m_product = bizcontrol.viewssproduct.fn._activedobj.viewProdDialog.product;

            var m_mv = {};
            m_mv.Weight = Number(m_product.GiftWeightLimit);
            m_mv.Volumn = 0;
            m_mv.BoxLength = 0;
            m_mv.BoxWidth = 0;
            m_mv.BoxHeight = 0;

            var m_maxinnerweight = 0;
            $.each(m_product.InnerProds, function () {
                if (this.SkuProducts) {
                    var m_itemweight = Number(this.BoxWeight);
                    $.each(this.SkuProducts, function () {
                        m_itemweight += Number(this.Product.Weight) * Number(this.RelQty);
                    });

                    if (m_maxinnerweight == 0 || m_itemweight > m_maxinnerweight) {
                        m_maxinnerweight = m_itemweight;
                    }

                    var m_itemvolumn = Number(this.BoxLength) * Number(this.BoxWidth) * Number(this.BoxHeight);
                    if (m_mv.Volumn == 0 || m_itemvolumn > m_mv.Volumn) {
                        m_mv.Volumn = m_itemvolumn;
                        m_mv.BoxLength = this.BoxLength;
                        m_mv.BoxWidth = this.BoxWidth;
                        m_mv.BoxHeight = this.BoxHeight;
                    }
                }
            });

            m_mv.Weight = m_mv.Weight + m_maxinnerweight;

            var m_ss_product = new sm.ss_product();
            m_ss_product.SaleSite_Id = m_product.SaleSite_Id;
            m_ss_product.SysWeightUnit_id = m_product.SysWeightUnit_Id;
            m_ss_product.SysCurrency_id = m_product.SysCurrency_Id;
            m_ss_product.Weight = m_mv.Weight;
            m_ss_product.Volumn = (Number(m_mv.BoxLength) * Number(m_mv.BoxWidth) * Number(m_mv.BoxHeight)).toString();
            m_ss_product.Tax = "0";
            m_ss_product.ExpServices = m_product.ExpServices;
            m_ss_product.exportProductExpServices(function (paramObj) {
                window.open(paramObj);
            });
        }
    };
    bizcontrol.viewssproduct.fn.init.prototype = bizcontrol.viewssproduct.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----商品选择控件----- 
    */
    bizcontrol.selectproduct = function (selectedEvent, selectType) {
        var obj = new bizcontrol.selectproduct.fn.init(selectedEvent, selectType);
        return obj;
    };
    bizcontrol.selectproduct.fn = {
        /* ID识别码 */
        _key: 1,

        _activedobj: null,

        /* 构造函数 */
        init: function (selectedEvent, selectType) {
            this.selectedEvent = selectedEvent;

            var m_this = this;
            this._key = bizcontrol.selectproduct.fn._key;
            this._selectType = selectType;
            this._ctrl = $("<div id='_sysdv_selprod" + bizcontrol.selectproduct.fn._key + "' style='display: none; '></div>");
            var m_operaContainer = $("<div class='submitForm selectproduct-container'></div>");
            var m_operaTr = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_lbSkuProdCodeSymbol = $("<span style='margin: 0px 10px 0px 0px'>" + mlm.C1205 + ":</span>");
            this._txtSkuProdCode = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            var m_lbKeywordSymbol = $("<span style='margin: 0px 10px 0px 10px'>" + mlm.C0184 + ":</span>");
            this._txtKeyword = $("<input type='text' class='text-input' style='width: 480px' onkeypress='uicontrol.func.checkInput(event);' />");
            var m_btAdvQuery = $("<input type='button' class='normal-bt' value='" + mlm.C1035 + mlm.C0562 + "' />");
            m_btAdvQuery.click(function () {
                m_this._openQueryFrm();
            });
            var m_btQuery = $("<input type='button' class='normal-bt' value='" + mlm.C0562 + "' />");
            m_btQuery.click(function () {

                m_this.productList.bindSource([]);
                m_this._conditionObj.pdcIds = null;
                m_this._conditionObj.brandId = null;
                m_this._conditionObj.keyWord = $.trim(m_this._txtKeyword.val());
                m_this._conditionObj.skuProdCode = $.trim(m_this._txtSkuProdCode.val());
                m_this._conditionObj.propValueIds = null;
                m_this._conditionObj.prodState = null;
                m_this._conditionObj.sortFields = null;
                m_this._conditionObj.product_Ids = null;
                m_this._conditionObj._pageNum = 1;

                m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);
            });
            this._btSelected = $("<input type='button' class='normal-bt' value='" + mlm.C1109 + "(0)' />");
            this._btSelected.click(function () {

                if (m_this.selectedprods.count > 0) {
                    m_this.productList.bindSource([]);
                    m_this._conditionObj.pdcIds = null;
                    m_this._conditionObj.brandId = null;
                    m_this._conditionObj.keyWord = null;
                    m_this._conditionObj.propValueIds = null;
                    m_this._conditionObj.prodState = null;
                    m_this._conditionObj.sortFields = null;
                    m_this._conditionObj.product_Ids = m_this.selectedprods.arrKeys;
                    m_this._conditionObj._pageNum = 1;

                    m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);
                }
                else {
                    pageframe.control.alertDialog.showAlertInfo(mlm.C1110);
                }
            });
            var m_btConfirm = $("<input type='button' class='normal-bt' value='" + mlm.C0024 + "' />");
            m_btConfirm.click(function () {
                m_this._confirmSelected();
            });
            m_operaTr.append(m_lbSkuProdCodeSymbol);
            m_operaTr.append(this._txtSkuProdCode);
            m_operaTr.append(m_lbKeywordSymbol);
            m_operaTr.append(this._txtKeyword);
            m_operaTr.append(m_btAdvQuery);
            m_operaTr.append(m_btQuery);
            m_operaTr.append(this._btSelected);
            m_operaTr.append(m_btConfirm);
            m_operaContainer.append(m_operaTr);

            this._productListCtrl = $("<div class='productlist'></div>");
            m_operaContainer.append(this._productListCtrl);

            var m_moreContainer = $("<div class='more-container'></div>");
            var m_moreTr = $("<div class='more-tr'></div>");
            this._btQueryMore = $("<span class='bt-morepics'></span>");
            this._btQueryMore.hover(function () { $(this).addClass("over-load-bt"); }, function () { $(this).removeClass("over-load-bt"); });
            this._btQueryMore.click(function () {
                m_this._conditionObj._pageNum++;
                m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);
            });

            m_moreTr.append(this._btQueryMore);
            m_moreContainer.append(m_moreTr);
            m_operaContainer.append(m_moreContainer);

            this._ctrl.append(m_operaContainer);
            $(document).append(this._ctrl);

            this._skuselectctrl = $("<div id='_sysdv_selskuprod" + bizcontrol.selectproduct.fn._key + "' style='display: none; '></div>");
            var m_skuoperaContainer = $("<div class='submitForm selectproduct-container' style='width: 780px'></div>");
            var m_skuoperaTr = $("<div class='submitForm-tr first-item last-item'></div>");
            m_skuoperaTr.append("<span class='title'>" + mlm.C0734 + ":" + "</span>");
            this._lbProdName = $("<span></span>");
            m_skuoperaTr.append(this._lbProdName);
            m_skuoperaContainer.append(m_skuoperaTr);

            this._skuprodListCtrl = $("<div class='productlist' style='width: 780px; height: 400px'></div>");
            m_skuoperaContainer.append(this._skuprodListCtrl);
            this._skuselectctrl.append(m_skuoperaContainer);
            $(document).append(this._skuselectctrl);

            this._queryconditionctrl = $("<div id='_sysdv_querycond" + bizcontrol.selectproduct.fn._key + "' style='display: none; '></div>");

            var m_dvtabctrl = $("<div id='_sysdv_queryTabs" + bizcontrol.selectproduct.fn._key + "'></div>");
            var m_ulctrl = $("<ul class='prodTab'></ul>");
            m_ulctrl.append("<li><a href='#_sysdv_tb_querycond" + bizcontrol.selectproduct.fn._key + "'>" + mlm.C1034 + "</a></li>");
            m_ulctrl.append("<li><a href='#_sysdv_tb_adavquerycond" + bizcontrol.selectproduct.fn._key + "'>" + mlm.C1035 + mlm.C1034 + "</a></li>");
            m_dvtabctrl.append(m_ulctrl);

            var m_querycondctrl = $("<div id='_sysdv_tb_querycond" + bizcontrol.selectproduct.fn._key + "'></div>");
            var m_qctable = $("<div class='submitForm form-width'></div>");
            var m_qctable_tr1 = $("<div class='submitForm-tr first-item'></div>");
            m_qctable_tr1.append("<span class='title'>" + mlm.C0184 + ":</span>");
            this._keyworkctrl = $("<input type='text' class='text-long-input' onkeypress='uicontrol.func.checkInput(event);' />");
            m_qctable_tr1.append(this._keyworkctrl);
            m_qctable.append(m_qctable_tr1);
            var m_qctable_tr2 = $("<div class='submitForm-tr'></div>");
            m_qctable_tr2.append("<span class='title'>" + mlm.C0113 + ":</span>");
            this._pdcctrl = $("<span class='select-pdc'></span>");
            m_qctable_tr2.append(this._pdcctrl);
            m_qctable.append(m_qctable_tr2);
            var m_qctable_tr3 = $("<div class='submitForm-tr last-item'></div>");
            m_qctable_tr3.append("<span class='title'>" + mlm.C0112 + ":</span>");
            this._brandctrl = $("<span class='select-brand'></span>");
            m_qctable_tr3.append(this._brandctrl);
            m_qctable.append(m_qctable_tr3);
            m_querycondctrl.append(m_qctable);
            m_dvtabctrl.append(m_querycondctrl);

            var m_advaquerycondctrl = $("<div id='_sysdv_tb_adavquerycond" + bizcontrol.selectproduct.fn._key + "'></div>");
            var m_advatable = $("<div class='submitForm form-width'></div>");
            var m_advatable_tr1 = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_advcontainer = $("<div style='height: 30px'></div>");
            m_advcontainer.append("<span class='lb-title list-title'>" + mlm.C1037 + mlm.C0463 + "</span>");
            var m_btaddprop = $("<input type='button' class='normal-bt' style='float: right;' value='" + mlm.C0075 + "' />");
            m_btaddprop.click(function () {
                m_this._openAddPropFrm();
            });
            m_advcontainer.append(m_btaddprop);
            m_advatable_tr1.append(m_advcontainer);
            m_advatable_tr1.append("<table id='_sysdv_tb_proptdt" + bizcontrol.selectproduct.fn._key + "'></table>");
            m_advatable.append(m_advatable_tr1);
            m_advaquerycondctrl.append(m_advatable);
            m_dvtabctrl.append(m_advaquerycondctrl);

            this._queryconditionctrl.append(m_dvtabctrl);
            $(document).append(this._queryconditionctrl);

            this._addpropctrl = $("<div id='_sysdv_addprop" + bizcontrol.selectproduct.fn._key + "'></div>");
            var m_addproptable = $("<div class='submitForm form-width'></div>");
            this._addproptable_tr1 = $("<div class='submitForm-tr first-item'></div>");
            this._addproptable_tr1.append("<span class='title'>" + mlm.C0631 + ":</span>");
            this._propoptionctrl = $("<select class='dropdown-list'></select>");
            this._addproptable_tr1.append(this._propoptionctrl);
            m_addproptable.append(this._addproptable_tr1);
            this._addproptable_tr2 = $("<div class='submitForm-tr last-item'></div>");
            this._addproptable_tr2.append("<div style='height: 25px'><span class='lb-title list-title'>" + mlm.C0071 + "</span></div>");
            this._addproptable_tr2.append("<table id='_sysdv_tb_pvaluedt" + bizcontrol.selectproduct.fn._key + "'></table>");
            m_addproptable.append(this._addproptable_tr2);
            this._addpropctrl.append(m_addproptable);
            $(document).append(this._addpropctrl);

            this._conditionObj = {};
            this._conditionObj._pageNum = 1;
            this._conditionObj._pageCount = 48;

            m_btAdvQuery.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btQuery.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            this._btSelected.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btConfirm.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btaddprop.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

            bizcontrol.selectproduct.fn._key++;
        },

        /* 打开窗体 */
        show: function (selectedskuprods) {
            var m_thisobj = this;
            bizcontrol.selectproduct.fn._activedobj = this;
            if (!this._selectProdFrm) {
                this._selectProdFrm = new uicontrol.dialog(this._ctrl, mlm.C0395, { width: 1135, position: ["auto", 15] });

                this.productList = new uicontrol.simpleTableList(this._productListCtrl,
                                                                { keyColumn: "Product_Id",
                                                                    isPaging: false,
                                                                    constructTableFunc: this._constructProdTable,
                                                                    itemCss: "product-item",
                                                                    events: { onmouseover: function () { $(this).css("border-color", "#800000"); },
                                                                        onmouseout: function () { $(this).css("border-color", "#c0c0c0"); },
                                                                        ondblclick: function () {
                                                                            var m_key = $(this).attr("tag");
                                                                            m_thisobj._showSkuProds(m_key);
                                                                        }
                                                                    }
                                                                });
            }

            if (selectedskuprods) {
                this.selectedskuprods = selectedskuprods;
            }
            else {
                this.selectedskuprods = new datastruct.dictionary();
            }
            this.selectedprods = new datastruct.dictionary();
            if (this.selectedskuprods) {
                $.each(this.selectedskuprods.arrValues, function () {
                    if (!m_thisobj.selectedprods.containKey(this.Product_Id)) {
                        m_thisobj.selectedprods.setItem(this.Product_Id, null);
                    }
                });
            }
            this.readproddict = new datastruct.dictionary();

            if (this.selectedskuprods && this.selectedskuprods.count > 0) {
                this._conditionObj.pdcIds = null;
                this._conditionObj.brandId = null;
                this._conditionObj.keyWord = null;
                this._conditionObj.propValueIds = null;
                this._conditionObj.prodState = null;
                this._conditionObj.sortFields = null;
                this._conditionObj.product_Ids = this.selectedprods.arrKeys;
                this.productList.bindSource([]);
                this._queryProducts(this._conditionObj._pageNum, this._conditionObj._pageCount, function (products) {
                    var m_proddict = new datastruct.dictionary();
                    $.each(products, function () {
                        m_proddict.setItem(this.Product_Id, this);
                    });

                    $.each(m_thisobj.selectedskuprods.arrValues, function () {
                        this.Product = m_proddict.getItem(this.Product_Id);
                    });
                });
            }
            else {
                this.productList.bindSource([]);
                this._btSelected.val(mlm.C1109 + "(0)");
            }

            this._selectProdFrm.show();
        },

        /* 打开高级查询窗体 */
        _openQueryFrm: function () {
            var m_this = this;
            if (!this._QueryProdFrm) {
                this._QueryProdFrm = new uicontrol.dialog(this._queryconditionctrl, mlm.C0171, { width: 825, position: ["auto", 25] }, function () {
                    m_this.productList.bindSource([]);
                    m_this._conditionObj.pdcIds = [];
                    if (m_this._selectPdc) {
                        if (m_this._selectPdc.pdcId instanceof Array) {
                            $.each(m_this._selectPdc.pdcId, function () {
                                m_this._conditionObj.pdcIds.push(this.toString());
                            });
                        }
                        else {
                            if (m_this._selectPdc.pdcId) {
                                m_this._conditionObj.pdcIds.push(m_this._selectPdc.pdcId.toString());
                            }
                        }
                    }

                    if (m_this._selectBrand) {
                        m_this._conditionObj.brandId = m_this._selectBrand.brandId;
                    }

                    m_this._conditionObj.keyWord = $.trim(this._keyworkctrl.val());

                    m_this._conditionObj.PropValueIds = null;
                    if (m_this._queryPropList) {
                        var propValueIds = [];
                        $.each(m_this._queryPropList.dataSource.items.arrValues, function () {
                            if (this.ProdPValueIdRange) {
                                $.each(this.ProdPValueIdRange.split(","), function () {
                                    propValueIds.push(this);
                                });
                            }
                        });

                        if (propValueIds.length > 0) {
                            m_this._conditionObj.propValueIds = propValueIds.join(",");
                        }
                    }

                    m_this._conditionObj.prodState = null;
                    m_this._conditionObj.sortFields = null;
                    m_this._conditionObj.product_Ids = null;
                    m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);

                    m_this._QueryProdFrm.close();
                });
                this.queryProdTabs = $("#_sysdv_queryTabs" + this._key).tabs({ show: function (event, ui) {
                    if (ui.index == 1) {
                        m_this._queryPropList = new uicontrol.tableList("_sysdv_tb_proptdt" + m_this._key,
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ProdProperty_Id",
                                        columns: [{ display: mlm.C0069, name: "ProdPropName", width: 90, align: 'center' },
                                                { display: mlm.C0071, name: "ProdPValueRange", width: 450, align: 'center', adjust: true, createCell: bizcontrol.selectproduct.fn._constructProdPropValueCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: bizcontrol.selectproduct.fn._constructPropOperaCell}]
                                    });
                    }
                }
                });

                this._selectPdc = new bizcontrol.selectpdc(this._pdcctrl, true);
                this._selectBrand = new bizcontrol.selectbrand(this._brandctrl);
            }

            this._QueryProdFrm.show();
        },
        /* 查询商品 */
        _queryProducts: function (pageNum, pageCount, event) {

            var m_this = this;
            var m_product = new pdm.product();
            m_product.PdcIds = this._conditionObj.pdcIds;
            m_product.BrandId = this._conditionObj.brandId;
            m_product.Key = this._conditionObj.keyWord;
            m_product.SkuProdCode = this._conditionObj.skuProdCode;
            m_product.PropValueIds = this._conditionObj.propValueIds;
            m_product.ProdState = null;
            m_product.SortFields = null;
            m_product.Product_Ids = this._conditionObj.product_Ids;
            m_product.Page = pageNum;
            m_product.PageNum = pageCount;
            m_product.queryProducts(function (retTable) {
                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                $.each(m_jsonobjs, function () {
                    m_this.productList.addData(this);
                });

                var m_totalcount = Number(retTable.TotalCount);
                var m_currcount = m_this.productList.dataSource.items.arrValues.length;
                if (m_totalcount > m_currcount) {
                    m_this._btQueryMore.show();
                    m_this._btQueryMore.text(mlm.C0649 + "(" + m_currcount + "/" + m_totalcount + ")");
                }
                else {
                    m_this._btQueryMore.hide();
                }

                m_this.selectedprods = new datastruct.dictionary();
                m_this._handlerProdTable();

                if (event) {
                    event(m_jsonobjs);
                }
            });
        },
        /* 构建商品表格 */
        _constructProdTable: function (dataItem) {
            var m_src = "";
            if (dataItem.BrowsePicUrl) {
                if (dataItem.BrowsePicUrl.indexOf("http://") == -1) {
                    m_src = window.webLocation + dataItem.BrowsePicUrl;
                }
                else {
                    m_src = dataItem.BrowsePicUrl;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            var m_ctrl = $("<div></div>");
            var m_container = $("<div class='item'></div>");
            var m_img = $("<img src='" + m_src + "' class='pic-item' onload='commoncore.func.positionCenterImg.call(this);' onerror='commoncore.func.failLoadImg.call(this);' tag='" + dataItem.Product_Id + "' />");
            m_container.append(m_img);

            var m_prodname = dataItem.ProdName;
            var m_len = m_prodname.getBytesCount();
            if (m_len > 50) {
                m_prodname = m_prodname.substringByBytes(50) + "...";
            }

            var m_name = $("<div id='lbProdName_" + dataItem.Product_Id + "' class='name-item' tag='" + dataItem.ProdName + "'><a onclick='bizcontrol.selectproduct.fn._viewProduct.call(this, \"" + dataItem.Product_Id + "\")' href='javascript:void(\"0\");'>" + m_prodname + "</a></div>");
            if (m_len > 50) {
                m_name.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            }

            m_ctrl.append(m_container);
            m_ctrl.append(m_name);

            return m_ctrl;
        },
        /* 初始化添加属性窗体 */
        _initPropFrm: function (event) {
            var m_this = this;
            if (!this._SelPropFrm) {
                this._SelPropFrm = new uicontrol.dialog(this._addpropctrl, mlm.C0087, { width: 800, position: ["auto", 30] }, function () { m_this._saveProp(); });

                this._SelPropFrm.show();
                this._pvalueList = new uicontrol.tableList("_sysdv_tb_pvaluedt" + this._key,
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 270,
                                        selectModel: "2",
                                        keyColumn: "PropValue_Id",
                                        columns: [{ display: mlm.C0608 + mlm.C0180, name: "PicUrl", width: 90, align: 'center', adjust: true, createCell: bizcontrol.selectproduct.fn._constructPropPicCell },
                                                   { display: mlm.C0608, name: "PValue", width: 200, align: 'center' },
                                                   { display: mlm.C0609, name: "PValueCode", width: 200, align: 'center'}]
                                    });

                var m_prodproperty = new pdm.prodproperty();
                m_prodproperty.getAllProdPropertys(function (retTable) {
                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                    $.each(m_jsonobjs, function () {
                        m_this._propoptionctrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
                    });

                    if (event) {
                        event();
                    }

                    m_this._loadQueryPValue();
                });

                m_this._propoptionctrl.change(function () {
                    m_this._loadQueryPValue();
                });
            }
            else {
                if (event) {
                    event();
                }

                this._SelPropFrm.show();
            }
        },
        /* 打开添加属性窗体 */
        _openAddPropFrm: function () {
            this._initPropFrm();
            this._addproptable_tr1.show();
            this._SelPropFrm.action = "New";
        },
        /* 打开修改属性窗体 */
        _openModifyPropFrm: function () {

            var m_key = $(this).attr("tag");
            bizcontrol.selectproduct.fn._activedobj._SelPropFrm.ProdProperty_Id = m_key;
            bizcontrol.selectproduct.fn._activedobj._SelPropFrm.action = "Modify";

            bizcontrol.selectproduct.fn._activedobj._initPropFrm(function () {
                bizcontrol.selectproduct.fn._activedobj._propoptionctrl.val(m_key);
                bizcontrol.selectproduct.fn._activedobj._addproptable_tr1.hide();
                bizcontrol.selectproduct.fn._activedobj._loadQueryPValue(function () {
                    var m_propvalue = bizcontrol.selectproduct.fn._activedobj._queryPropList.getItem(m_key);
                    var m_selectStruct = new datastruct.dictionary();
                    if (m_propvalue) {
                        var m_prodPValueIds = m_propvalue.ProdPValueIdRange ? m_propvalue.ProdPValueIdRange.split(",") : null;
                        if (m_prodPValueIds) {
                            $.each(m_prodPValueIds, function () {
                                m_selectStruct.setItem(this);
                            });
                        }
                    }
                    bizcontrol.selectproduct.fn._activedobj._pvalueList.setSelectedItems(m_selectStruct);
                });
            });
        },
        /* 打开删除属性窗体 */
        _openDeletePropFrm: function () {
            if (!bizcontrol.selectproduct.fn._activedobj.delPropFrm) {
                bizcontrol.selectproduct.fn._activedobj.delPropFrm = new uicontrol.confirmDelete(bizcontrol.selectproduct.fn._deleteProp);
            }

            var m_key = $(this).attr("tag");
            var m_obj = bizcontrol.selectproduct.fn._activedobj._queryPropList.getItem(m_key);

            bizcontrol.selectproduct.fn._activedobj.delPropFrm.prodproperty_id = m_key;
            bizcontrol.selectproduct.fn._activedobj.delPropFrm.showConfirm(mlm.C0464 + mlm.C0165 + "(" + m_obj.ProdPropName + ") ?");
        },
        /* 加载属性值 */
        _loadQueryPValue: function (event) {
            var m_this = this;
            var m_prodproperty = new pdm.prodproperty();
            m_prodproperty.ProdProperty_Id = this._propoptionctrl.val();
            m_prodproperty.queryPropValueByProd(function (retTable) {
                m_this._pvalueList.bindDataSource(retTable);

                if (event) {
                    event();
                }
            });
        },
        /* 创建商品属性值单元格 */
        _constructProdPropValueCell: function (key, cellvalue) {
            if (!cellvalue) {
                return "";
            }
            else {
                return cellvalue;
            }
        },
        /* 创建属性设置列 */
        _constructPropOperaCell: function (key, cellvalue) {
            return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='bizcontrol.selectproduct.fn._openModifyPropFrm.call(this);'>" + mlm.C0611 + "</a>" +
                   "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='bizcontrol.selectproduct.fn._openDeletePropFrm.call(this);'>" + mlm.C0062 + "</a>";
        },
        /* 构建属性图片列 */
        _constructPropPicCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                var m_src = window.webLocation + cellvalue;
                return "<img class='product-list-img-sl' src='" + m_src + "' />";
            }
            else {
                return "";
            }
        },
        /* 保存属性 */
        _saveProp: function () {
            var m_selectItems = this._pvalueList.getSelectedItems();
            var m_pvalueIds = [];
            var m_pvalues = [];
            $.each(m_selectItems, function () {
                m_pvalueIds.push(this.PropValue_Id);
                m_pvalues.push(this.PValue);
            });

            var m_obj = {};
            m_obj.ProdProperty_Id = this._propoptionctrl.val();
            m_obj.ProdPropName = this._propoptionctrl.find("option:selected").text();
            m_obj.ProdPValueIdRange = m_pvalueIds.join(",");
            m_obj.ProdPValueRange = m_pvalues.join(",");

            if (this._SelPropFrm.action == "New" && this._queryPropList.getItem(m_obj.ProdProperty_Id) == null) {
                this._queryPropList.addData(m_obj.ProdProperty_Id, m_obj);
            }
            else {
                this._queryPropList.modifyData(m_obj.ProdProperty_Id, m_obj);
            }

            this._SelPropFrm.close();
        },
        /* 删除属性 */
        _deleteProp: function () {
            bizcontrol.selectproduct.fn._activedobj._queryPropList.deleteData(bizcontrol.selectproduct.fn._activedobj.delPropFrm.prodproperty_id);
            bizcontrol.selectproduct.fn._activedobj.delPropFrm.close();
        },

        /* 展示Sku选项 */
        _showSkuProds: function (product_id) {
            var m_thisobj = this;
            if (!this._selectSkuProdFrm) {
                this._selectSkuProdFrm = new uicontrol.dialog(this._skuselectctrl, mlm.C0577 + mlm.C1111, { width: 800, position: ["auto", 35] });

                this.skuproductList = new uicontrol.simpleTableList(this._skuprodListCtrl,
                                                                { keyColumn: "SkuProduct_Id",
                                                                    isPaging: false,
                                                                    constructTableFunc: this._constructSkuProdTable,
                                                                    itemCss: "skuproduct-item",
                                                                    events: { onmouseover: function () { $(this).css("border-color", "#800000"); },
                                                                        onmouseout: function () { $(this).css("border-color", "#c0c0c0"); },
                                                                        ondblclick: function () {
                                                                            var m_skuproduct_id = $(this).attr("tag");

                                                                            var m_itemCtrl = m_thisobj.skuproductList.liList.getItem(m_skuproduct_id);
                                                                            if (!m_thisobj.selectedskuprods.containKey(m_skuproduct_id)) {

                                                                                if (m_thisobj._selectType == "single") {
                                                                                    var m_selecteditem = m_thisobj.skuproductList.getItem(m_skuproduct_id);
                                                                                    m_selecteditem.Product = m_thisobj._selectSkuProdFrm.product;

                                                                                    $.each(m_thisobj.selectedskuprods.arrKeys, function(){
                                                                                        var m_curritemCtrl = m_thisobj.skuproductList.liList.getItem(this);
                                                                                        if (m_curritemCtrl) {
                                                                                            m_curritemCtrl.css("background-color", "#FFFFFF");
                                                                                            m_curritemCtrl.css("color", "#222222");
                                                                                        }
                                                                                    });
                                                                                    m_thisobj.selectedskuprods.clear();

                                                                                    m_thisobj.selectedskuprods.setItem(m_skuproduct_id, m_selecteditem);
                                                                                    m_itemCtrl.css("background-color", "#F0F0F0");
                                                                                    m_itemCtrl.css("color", "#800000");
                                                                                }
                                                                                else {
                                                                                    var m_selecteditem = m_thisobj.skuproductList.getItem(m_skuproduct_id);
                                                                                    m_selecteditem.Product = m_thisobj._selectSkuProdFrm.product;
                                                                                    m_thisobj.selectedskuprods.setItem(m_skuproduct_id, m_selecteditem);
                                                                                    m_itemCtrl.css("background-color", "#F0F0F0");
                                                                                    m_itemCtrl.css("color", "#800000");
                                                                                }
                                                                            }
                                                                            else {
                                                                                m_thisobj.selectedskuprods.removeItem(m_skuproduct_id);
                                                                                m_itemCtrl.css("background-color", "#FFFFFF");
                                                                                m_itemCtrl.css("color", "#222222");
                                                                            }

                                                                            m_thisobj._handlerProdTable();
                                                                        }
                                                                    }
                                                                });
            }

            var m_func = function (retObj) {
                var m_picdict = new datastruct.dictionary();
                $.each(retObj.ProdPics, function () {
                    m_picdict.setItem(this.Product_Pic_Id, this);
                });

                $.each(retObj.SKUProducts, function () {
                    var m_this = this;
                    m_this = $.extend(m_this, m_this.OtherProps);
                    m_this.Product = retObj;
                });

                if (Number(retObj.SkuProdCount) > 1) {

                    var m_items = [];
                    $.each(retObj.SKUProducts, function () {
                        if (this.Product_Pic_Id != "0") {
                            var m_pic = m_picdict.getItem(this.Product_Pic_Id);
                            this.BrowsePicUrl = m_pic.BrowsePicUrl;
                        }

                        m_items.push(this);
                    });
                    m_thisobj.skuproductList.bindSource(m_items);
                    m_thisobj._lbProdName.text(retObj.ProdName);

                    $.each(m_items, function () {
                        if (m_thisobj.selectedskuprods.containKey(this.SkuProduct_Id)) {
                            var m_itemCtrl = m_thisobj.skuproductList.liList.getItem(this.SkuProduct_Id);
                            m_itemCtrl.css("background-color", "#F0F0F0");
                            m_itemCtrl.css("color", "#800000");
                        }
                    });

                    m_thisobj._selectSkuProdFrm.product = retObj;
                    m_thisobj._selectSkuProdFrm.show();
                }
                else {
                    $.each(retObj.SKUProducts, function () {
                        if (!m_thisobj.selectedskuprods.containKey(this.SkuProduct_Id)) {
                            
                            if (m_thisobj._selectType == "single") {
                                 m_thisobj.selectedskuprods.clear();

                                 m_thisobj.selectedskuprods.setItem(this.SkuProduct_Id, this);
                            }
                            else{
                                var m_skupic = m_picdict.getItem(this.Product_Pic_Id);
                                if (m_skupic) {
                                    this.BrowsePicUrl = m_skupic.BrowsePicUrl;
                                }
                                m_thisobj.selectedskuprods.setItem(this.SkuProduct_Id, this);
                            }
                        }
                        else {
                            m_thisobj.selectedskuprods.removeItem(this.SkuProduct_Id);
                        }
                    });

                    m_thisobj._handlerProdTable();
                }

                m_thisobj.readproddict.setItem(retObj.Product_Id, retObj);
            };
            if (this.readproddict.containKey(product_id)) {
                m_func(this.readproddict.getItem(product_id));
            }
            else {
                var m_product = new pdm.product();
                m_product.Product_Id = product_id;
                m_product.readProduct(m_func);
            }
        },

        /* 构建商品Sku表格 */
        _constructSkuProdTable: function (dataItem) {
            var m_src = "";
            if (dataItem.BrowsePicUrl) {
                if (dataItem.BrowsePicUrl.indexOf("http://") == -1) {
                    m_src = window.webLocation + dataItem.BrowsePicUrl;
                }
                else {
                    m_src = dataItem.BrowsePicUrl;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            var m_ctrl = $("<div></div>");
            var m_container = $("<div class='item'></div>");
            var m_img = $("<img src='" + m_src + "' class='pic-item' onload='commoncore.func.positionCenterImg.call(this);' onerror='commoncore.func.failLoadImg.call(this);' tag='" + dataItem.Product_Id + "' />");
            m_container.append(m_img);

            var m_name = $("<div id='lbSkuProd_" + dataItem.SkuProduct_Id + "' class='name-item' tag='" + dataItem.SkuProduct_Id + "'>" + dataItem.SkuProps + "</div>");

            m_ctrl.append(m_container);
            m_ctrl.append(m_name);

            return m_ctrl;
        },

        /* 处理商品表 */
        _handlerProdTable: function () {
            var m_proddict = new datastruct.dictionary();
            if (this.selectedskuprods) {
                $.each(this.selectedskuprods.arrValues, function () {
                    if (!m_proddict.containKey(this.Product_Id)) {
                        m_proddict.setItem(this.Product_Id, null);
                    }
                });
            }
            var m_this = this;
            $.each(m_proddict.arrKeys, function () {
                if (!m_this.selectedprods.containKey(this)) {
                    var m_itemCtrl = m_this.productList.liList.getItem(this);
                    m_itemCtrl.css("background-color", "#F0F0F0");
                    m_itemCtrl.css("color", "#800000");
                }
            });

            $.each(this.selectedprods.arrKeys, function () {
                if (!m_proddict.containKey(this)) {
                    var m_itemCtrl = m_this.productList.liList.getItem(this);
                    m_itemCtrl.css("background-color", "#FFFFFF");
                    m_itemCtrl.css("color", "#222222");
                }
            });

            this.selectedprods = m_proddict;
            this._btSelected.val(mlm.C1109 + "(" + m_proddict.arrKeys.length + ")");
        },

        /* 查看产品 */
        _viewProduct: function (product_id) {
            if (!pageVariable.viewProdCtrl) {
                pageVariable.viewProdCtrl = new bizcontrol.viewproduct();
            }
            pageVariable.viewProdCtrl.show(product_id);
        },

        /* 确定选择 */
        _confirmSelected: function () {
            if (this.selectedskuprods.count == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1110);
                return;
            }

            if (this.selectedEvent) {
                this.selectedEvent(this.selectedskuprods.arrValues);
            }

            this._selectProdFrm.close();
        }
    };
    bizcontrol.selectproduct.fn.init.prototype = bizcontrol.selectproduct.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----销售商品选择控件----- 
    */
    bizcontrol.selectssproduct = function (selectedEvent) {
        var obj = new bizcontrol.selectssproduct.fn.init(selectedEvent);
        return obj;
    };
    bizcontrol.selectssproduct.fn = {
        /* ID识别码 */
        _key: 1,

        _activedobj: null,

        /* 构造函数 */
        init: function (selectedEvent) {
            this.selectedEvent = selectedEvent;

            var m_this = this;
            this._key = bizcontrol.selectssproduct.fn._key;
            this._ctrl = $("<div id='_sysdv_selssprod" + bizcontrol.selectssproduct.fn._key + "' style='display: none; '></div>");
            var m_operaContainer = $("<div class='submitForm selectproduct-container'></div>");
            var m_operaTr = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_lbSkuProdCodeSymbol = $("<span style='margin: 0px 10px 0px 0px'>" + mlm.C1205 + ":</span>");
            this._txtSkuProdCode = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            var m_lbKeywordSymbol = $("<span style='margin: 0px 10px 0px 10px'>" + mlm.C0184 + ":</span>");
            this._txtKeyword = $("<input type='text' class='text-input' style='width: 480px' onkeypress='uicontrol.func.checkInput(event);' />");
            var m_btAdvQuery = $("<input type='button' class='normal-bt' value='" + mlm.C1035 + mlm.C0562 + "' />");
            m_btAdvQuery.click(function () {
                m_this._openQueryFrm();
            });
            var m_btQuery = $("<input type='button' class='normal-bt' value='" + mlm.C0562 + "' />");
            m_btQuery.click(function () {

                m_this.productList.bindSource([]);
                m_this._conditionObj.pdcIds = null;
                m_this._conditionObj.brandId = null;
                m_this._conditionObj.keyWord = $.trim(m_this._txtKeyword.val());
                m_this._conditionObj.skuProdCode = $.trim(m_this._txtSkuProdCode.val());
                m_this._conditionObj.propValueIds = null;
                m_this._conditionObj.prodState = null;
                m_this._conditionObj.sortFields = null;
                m_this._conditionObj.product_Ids = null;
                m_this._conditionObj._pageNum = 1;

                m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);
            });
            this._btSelected = $("<input type='button' class='normal-bt' value='" + mlm.C1109 + "(0)' />");
            this._btSelected.click(function () {

                if (m_this.selectedprods.count > 0) {
                    m_this.productList.bindSource([]);
                    m_this._conditionObj.pdcIds = null;
                    m_this._conditionObj.brandId = null;
                    m_this._conditionObj.keyWord = null;
                    m_this._conditionObj.propValueIds = null;
                    m_this._conditionObj.prodState = null;
                    m_this._conditionObj.sortFields = null;
                    m_this._conditionObj._pageNum = 1;
                    m_this._conditionObj.product_Ids = m_this.selectedprods.arrKeys;
                    m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);
                }
                else {
                    pageframe.control.alertDialog.showAlertInfo(mlm.C1110);
                }
            });
            var m_btConfirm = $("<input type='button' class='normal-bt' value='" + mlm.C0024 + "' />");
            m_btConfirm.click(function () {
                m_this._confirmSelected();
            });
            m_operaTr.append(m_lbSkuProdCodeSymbol);
            m_operaTr.append(this._txtSkuProdCode);
            m_operaTr.append(m_lbKeywordSymbol);
            m_operaTr.append(this._txtKeyword);
            m_operaTr.append(m_btAdvQuery);
            m_operaTr.append(m_btQuery);
            m_operaTr.append(this._btSelected);
            m_operaTr.append(m_btConfirm);
            m_operaContainer.append(m_operaTr);

            this._productListCtrl = $("<div class='productlist'></div>");
            m_operaContainer.append(this._productListCtrl);

            var m_moreContainer = $("<div class='more-container'></div>");
            var m_moreTr = $("<div class='more-tr'></div>");
            this._btQueryMore = $("<span class='bt-morepics'></span>");
            this._btQueryMore.hover(function () { $(this).addClass("over-load-bt"); }, function () { $(this).removeClass("over-load-bt"); });
            this._btQueryMore.click(function () {
                m_this._conditionObj._pageNum++;
                m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);
            });

            m_moreTr.append(this._btQueryMore);
            m_moreContainer.append(m_moreTr);
            m_operaContainer.append(m_moreContainer);

            this._ctrl.append(m_operaContainer);
            $(document).append(this._ctrl);

            this._skuselectctrl = $("<div id='_sysdv_selskussprod" + bizcontrol.selectssproduct.fn._key + "' style='display: none; '></div>");
            var m_skuoperaContainer = $("<div class='submitForm selectproduct-container' style='width: 780px'></div>");
            var m_skuoperaTr = $("<div class='submitForm-tr first-item last-item'></div>");
            m_skuoperaTr.append("<span class='title'>" + mlm.C0734 + ":" + "</span>");
            this._lbProdName = $("<span></span>");
            m_skuoperaTr.append(this._lbProdName);
            m_skuoperaContainer.append(m_skuoperaTr);

            this._skuprodListCtrl = $("<div class='productlist' style='width: 780px; height: 400px'></div>");
            m_skuoperaContainer.append(this._skuprodListCtrl);
            this._skuselectctrl.append(m_skuoperaContainer);
            $(document).append(this._skuselectctrl);

            this._queryconditionctrl = $("<div id='_sysdv_ss_querycond" + bizcontrol.selectssproduct.fn._key + "' style='display: none; '></div>");

            var m_dvtabctrl = $("<div id='_sysdv_ss_queryTabs" + bizcontrol.selectssproduct.fn._key + "'></div>");
            var m_ulctrl = $("<ul class='prodTab'></ul>");
            m_ulctrl.append("<li><a href='#_sysdv_tb_ss_querycond" + bizcontrol.selectssproduct.fn._key + "'>" + mlm.C1034 + "</a></li>");
            m_ulctrl.append("<li><a href='#_sysdv_tb_ss_adavquerycond" + bizcontrol.selectssproduct.fn._key + "'>" + mlm.C1035 + mlm.C1034 + "</a></li>");
            m_dvtabctrl.append(m_ulctrl);

            var m_querycondctrl = $("<div id='_sysdv_tb_ss_querycond" + bizcontrol.selectssproduct.fn._key + "'></div>");
            var m_qctable = $("<div class='submitForm form-width'></div>");
            var m_qctable_tr1 = $("<div class='submitForm-tr first-item'></div>");
            m_qctable_tr1.append("<span class='title'>" + mlm.C0184 + ":</span>");
            this._keyworkctrl = $("<input type='text' class='text-long-input' onkeypress='uicontrol.func.checkInput(event);' />");
            m_qctable_tr1.append(this._keyworkctrl);
            m_qctable.append(m_qctable_tr1);
            var m_qctable_tr2 = $("<div class='submitForm-tr'></div>");
            m_qctable_tr2.append("<span class='title'>" + mlm.C0113 + ":</span>");
            this._pdcctrl = $("<span class='select-pdc'></span>");
            m_qctable_tr2.append(this._pdcctrl);
            m_qctable.append(m_qctable_tr2);
            var m_qctable_tr3 = $("<div class='submitForm-tr last-item'></div>");
            m_qctable_tr3.append("<span class='title'>" + mlm.C0112 + ":</span>");
            this._brandctrl = $("<span class='select-brand'></span>");
            m_qctable_tr3.append(this._brandctrl);
            m_qctable.append(m_qctable_tr3);
            m_querycondctrl.append(m_qctable);
            m_dvtabctrl.append(m_querycondctrl);

            var m_advaquerycondctrl = $("<div id='_sysdv_tb_ss_adavquerycond" + bizcontrol.selectssproduct.fn._key + "'></div>");
            var m_advatable = $("<div class='submitForm form-width'></div>");
            var m_advatable_tr1 = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_advcontainer = $("<div style='height: 30px'></div>");
            m_advcontainer.append("<span class='lb-title list-title'>" + mlm.C1037 + mlm.C0463 + "</span>");
            var m_btaddprop = $("<input type='button' class='normal-bt' style='float: right;' value='" + mlm.C0075 + "' />");
            m_btaddprop.click(function () {
                m_this._openAddPropFrm();
            });
            m_advcontainer.append(m_btaddprop);
            m_advatable_tr1.append(m_advcontainer);
            m_advatable_tr1.append("<table id='_sysdv_tb_ssproptdt" + bizcontrol.selectssproduct.fn._key + "'></table>");
            m_advatable.append(m_advatable_tr1);
            m_advaquerycondctrl.append(m_advatable);
            m_dvtabctrl.append(m_advaquerycondctrl);

            this._queryconditionctrl.append(m_dvtabctrl);
            $(document).append(this._queryconditionctrl);

            this._addpropctrl = $("<div id='_sysdv_addprop" + bizcontrol.selectssproduct.fn._key + "'></div>");
            var m_addproptable = $("<div class='submitForm form-width'></div>");
            this._addproptable_tr1 = $("<div class='submitForm-tr first-item'></div>");
            this._addproptable_tr1.append("<span class='title'>" + mlm.C0631 + ":</span>");
            this._propoptionctrl = $("<select class='dropdown-list'></select>");
            this._addproptable_tr1.append(this._propoptionctrl);
            m_addproptable.append(this._addproptable_tr1);
            this._addproptable_tr2 = $("<div class='submitForm-tr last-item'></div>");
            this._addproptable_tr2.append("<div style='height: 25px'><span class='lb-title list-title'>" + mlm.C0071 + "</span></div>");
            this._addproptable_tr2.append("<table id='_sysdv_tb_sspvaluedt" + bizcontrol.selectssproduct.fn._key + "'></table>");
            m_addproptable.append(this._addproptable_tr2);
            this._addpropctrl.append(m_addproptable);
            $(document).append(this._addpropctrl);

            this._conditionObj = {};
            this._conditionObj._pageNum = 1;
            this._conditionObj._pageCount = 48;

            m_btAdvQuery.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btQuery.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            this._btSelected.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btConfirm.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btaddprop.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);

            bizcontrol.selectssproduct.fn._key++;
        },

        /* 打开窗体 */
        show: function (SalePlatform_Id, salesite_id, selectedskuprods) {
            var m_thisobj = this;

            if (this.SaleSite_Id != salesite_id && this._selectPdc) {
                this._selectPdc.claseDataSource();
            }

            this.SaleSite_Id = salesite_id;
            this.SalePlatform_Id = SalePlatform_Id;

            bizcontrol.selectssproduct.fn._activedobj = this;
            if (!this._selectProdFrm) {
                this._selectProdFrm = new uicontrol.dialog(this._ctrl, mlm.C0395, { width: 1135, position: ["auto", 15] });

                this.productList = new uicontrol.simpleTableList(this._productListCtrl,
                                                                { keyColumn: "SS_Product_Id",
                                                                    isPaging: false,
                                                                    constructTableFunc: this._constructProdTable,
                                                                    itemCss: "ssproduct-item",
                                                                    events: { onmouseover: function () { $(this).css("border-color", "#800000"); },
                                                                        onmouseout: function () { $(this).css("border-color", "#c0c0c0"); },
                                                                        ondblclick: function () {
                                                                            var m_key = $(this).attr("tag");
                                                                            m_thisobj._showSkuProds(m_key);
                                                                        }
                                                                    }
                                                                });
            }

            if (selectedskuprods) {
                this.selectedskuprods = selectedskuprods;
            }
            else {
                this.selectedskuprods = new datastruct.dictionary();
            }
            this.selectedprods = new datastruct.dictionary();
            if (this.selectedskuprods) {
                $.each(this.selectedskuprods.arrValues, function () {
                    if (!m_thisobj.selectedprods.containKey(this.SS_Product_Id)) {
                        m_thisobj.selectedprods.setItem(this.SS_Product_Id, null);
                    }
                });
            }
            this.readproddict = new datastruct.dictionary();

            if (this.selectedskuprods && this.selectedskuprods.count > 0) {
                this._conditionObj.pdcIds = null;
                this._conditionObj.brandId = null;
                this._conditionObj.keyWord = null;
                this._conditionObj.propValueIds = null;
                this._conditionObj.prodState = null;
                this._conditionObj.sortFields = null;
                this._conditionObj.product_Ids = this.selectedprods.arrKeys;
                this.productList.bindSource([]);
                this._queryProducts(this._conditionObj._pageNum, this._conditionObj._pageCount, function (products) {
                    var m_proddict = new datastruct.dictionary();
                    $.each(products, function () {
                        m_proddict.setItem(this.SS_Product_Id, this);
                    });

                    $.each(m_thisobj.selectedskuprods.arrValues, function () {
                        this.Product = m_proddict.getItem(this.SS_Product_Id);
                    });
                });
            }
            else {
                this.productList.bindSource([]);
                this._btSelected.val(mlm.C1109 + "(0)");
            }

            this._selectProdFrm.show();
        },

        /* 打开高级查询窗体 */
        _openQueryFrm: function () {
            var m_this = this;
            if (!this._QueryProdFrm) {
                this._QueryProdFrm = new uicontrol.dialog(this._queryconditionctrl, mlm.C0171, { width: 825, position: ["auto", 25] }, function () {
                    m_this.productList.bindSource([]);
                    m_this._conditionObj.pdcIds = [];
                    if (m_this._selectPdc) {
                        if (m_this._selectPdc.pdcId instanceof Array) {
                            $.each(m_this._selectPdc.pdcId, function () {
                                m_this._conditionObj.pdcIds.push(this.toString());
                            });
                        }
                        else {
                            if (m_this._selectPdc.pdcId) {
                                m_this._conditionObj.pdcIds.push(m_this._selectPdc.pdcId.toString());
                            }
                        }
                    }

                    if (m_this._selectBrand) {
                        m_this._conditionObj.brandId = m_this._selectBrand.brandId;
                    }

                    m_this._conditionObj.keyWord = $.trim(m_this._keyworkctrl.val());

                    m_this._conditionObj.PropValueIds = null;
                    if (m_this._queryPropList) {
                        var propValueIds = [];
                        $.each(m_this._queryPropList.dataSource.items.arrValues, function () {
                            if (this.ProdPValueIdRange) {
                                $.each(this.ProdPValueIdRange.split(","), function () {
                                    propValueIds.push(this);
                                });
                            }
                        });

                        if (propValueIds.length > 0) {
                            m_this._conditionObj.propValueIds = propValueIds.join(",");
                        }
                    }

                    m_this._conditionObj.prodState = null;
                    m_this._conditionObj.sortFields = null;
                    m_this._conditionObj.product_Ids = null;
                    m_this._queryProducts(m_this._conditionObj._pageNum, m_this._conditionObj._pageCount);

                    m_this._QueryProdFrm.close();
                });
                this.queryProdTabs = $("#_sysdv_ss_queryTabs" + this._key).tabs({ show: function (event, ui) {
                    if (ui.index == 1) {
                        m_this._queryPropList = new uicontrol.tableList("_sysdv_tb_ssproptdt" + m_this._key,
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ProdProperty_Id",
                                        columns: [{ display: mlm.C0069, name: "ProdPropName", width: 90, align: 'center' },
                                                { display: mlm.C0071, name: "ProdPValueRange", width: 450, align: 'center', adjust: true, createCell: bizcontrol.selectssproduct.fn._constructProdPropValueCell },
                                                { display: mlm.C0019, name: "", width: 80, align: 'center', adjust: true, createCell: bizcontrol.selectssproduct.fn._constructPropOperaCell}]
                                    });
                    }
                }
                });

                this._selectPdc = new bizcontrol.selectpdc(this._pdcctrl, true, this.SalePlatform_Id, this.SaleSite_Id);
                this._selectBrand = new bizcontrol.selectbrand(this._brandctrl);
            }

            this._selectPdc.shoppingSiteId = this.SalePlatform_Id;
            this._selectPdc.salesite_id = this.SaleSite_Id;

            this._QueryProdFrm.show();
        },
        /* 查询商品 */
        _queryProducts: function (pageNum, pageCount, event) {

            var m_this = this;
            var m_product = new sm.ss_product();
            m_product.PdcIds = this._conditionObj.pdcIds;
            m_product.BrandId = this._conditionObj.brandId;
            m_product.Key = this._conditionObj.keyWord;
            m_product.SkuProdCode = this._conditionObj.skuProdCode;
            m_product.PropValueIds = this._conditionObj.propValueIds;
            m_product.ProdState = 2;
            m_product.SortFields = null;
            m_product.SS_Product_Ids = this._conditionObj.product_Ids;
            m_product.SaleSite_Id = this.SaleSite_Id;
            m_product.Page = pageNum;
            m_product.PageNum = pageCount;
            m_product.querySSProducts(function (retTable) {
                var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                $.each(m_jsonobjs, function () {
                    m_this.productList.addData(this);
                });

                var m_totalcount = Number(retTable.TotalCount);
                var m_currcount = m_this.productList.dataSource.items.arrValues.length;
                if (m_totalcount > m_currcount) {
                    m_this._btQueryMore.show();
                    m_this._btQueryMore.text(mlm.C0649 + "(" + m_currcount + "/" + m_totalcount + ")");
                }
                else {
                    m_this._btQueryMore.hide();
                }

                m_this.selectedprods = new datastruct.dictionary();
                m_this._handlerProdTable();

                if (event) {
                    event(m_jsonobjs);
                }
            });
        },
        /* 构建商品表格 */
        _constructProdTable: function (dataItem) {
            var m_src = "";
            if (dataItem.BrowsePicUrl) {
                if (dataItem.BrowsePicUrl.indexOf("http://") == -1) {
                    m_src = window.webLocation + dataItem.BrowsePicUrl;
                }
                else {
                    m_src = dataItem.BrowsePicUrl;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            var m_ctrl = $("<div></div>");
            var m_container = $("<div class='item'></div>");
            var m_img = $("<img src='" + m_src + "' class='pic-item' onload='commoncore.func.positionCenterImg.call(this);' onerror='commoncore.func.failLoadImg.call(this);' tag='" + dataItem.SS_Product_Id + "' />");
            m_container.append(m_img);

            var m_prodname = dataItem.ProdName;
            var m_len = m_prodname.getBytesCount();
            if (m_len > 42) {
                m_prodname = m_prodname.substringByBytes(42) + "...";
            }

            var m_name = $("<div id='lbProdName_" + dataItem.SS_Product_Id + "' class='name-item' tag='" + dataItem.ProdName + "'><a onclick='bizcontrol.selectssproduct.fn._viewProduct.call(this, \"" + dataItem.SS_Product_Id + "\")' href='javascript:void(\"0\");'>" + m_prodname + "</a></div>");
            if (m_len > 42) {
                m_name.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
            }

            var m_price = "";
            if (Number(dataItem.MinSalePrice) == Number(dataItem.MaxSalePrice)) {
                m_price = "<div style='padding: 0px; margin: 5px 0px 0px 0px'>" + commoncore.func.getCurrHtml(dataItem.CurrSymbol, dataItem.MinSalePrice) + "</div>";
            }
            else {
                m_price = "<div style='padding: 0px; margin: 5px 0px 0px 0px'>" + commoncore.func.getCurrHtml(dataItem.CurrSymbol, dataItem.MinSalePrice) + "-" + commoncore.func.getCurrHtml(dataItem.CurrSymbol, dataItem.MaxSalePrice) + "</div>";
            }

            m_ctrl.append(m_container);
            m_ctrl.append(m_name);
            m_ctrl.append(m_price);

            return m_ctrl;
        },
        /* 初始化添加属性窗体 */
        _initPropFrm: function (event) {
            var m_this = this;
            if (!this._SelPropFrm) {
                this._SelPropFrm = new uicontrol.dialog(this._addpropctrl, mlm.C0087, { width: 800, position: ["auto", 30] }, function () { m_this._saveProp(); });

                this._SelPropFrm.show();
                this._pvalueList = new uicontrol.tableList("_sysdv_tb_sspvaluedt" + this._key,
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 270,
                                        selectModel: "2",
                                        keyColumn: "PropValue_Id",
                                        columns: [{ display: mlm.C0608 + mlm.C0180, name: "PicUrl", width: 90, align: 'center', adjust: true, createCell: bizcontrol.selectssproduct.fn._constructPropPicCell },
                                                   { display: mlm.C0608, name: "PValue", width: 200, align: 'center' },
                                                   { display: mlm.C0609, name: "PValueCode", width: 200, align: 'center'}]
                                    });

                var m_prodproperty = new pdm.prodproperty();
                m_prodproperty.getAllProdPropertys(function (retTable) {
                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                    $.each(m_jsonobjs, function () {
                        m_this._propoptionctrl.append("<option value='" + this.ProdProperty_Id + "'>" + this.ProdPropName + "</option>");
                    });

                    if (event) {
                        event();
                    }

                    m_this._loadQueryPValue();
                });

                m_this._propoptionctrl.change(function () {
                    m_this._loadQueryPValue();
                });
            }
            else {
                if (event) {
                    event();
                }

                this._SelPropFrm.show();
            }
        },
        /* 打开添加属性窗体 */
        _openAddPropFrm: function () {
            this._initPropFrm();
            this._addproptable_tr1.show();
            this._SelPropFrm.action = "New";
        },
        /* 打开修改属性窗体 */
        _openModifyPropFrm: function () {

            var m_key = $(this).attr("tag");
            bizcontrol.selectssproduct.fn._activedobj._SelPropFrm.ProdProperty_Id = m_key;
            bizcontrol.selectssproduct.fn._activedobj._SelPropFrm.action = "Modify";

            bizcontrol.selectssproduct.fn._activedobj._initPropFrm(function () {
                bizcontrol.selectssproduct.fn._activedobj._propoptionctrl.val(m_key);
                bizcontrol.selectssproduct.fn._activedobj._addproptable_tr1.hide();
                bizcontrol.selectssproduct.fn._activedobj._loadQueryPValue(function () {
                    var m_propvalue = bizcontrol.selectssproduct.fn._activedobj._queryPropList.getItem(m_key);
                    var m_selectStruct = new datastruct.dictionary();
                    if (m_propvalue) {
                        var m_prodPValueIds = m_propvalue.ProdPValueIdRange ? m_propvalue.ProdPValueIdRange.split(",") : null;
                        if (m_prodPValueIds) {
                            $.each(m_prodPValueIds, function () {
                                m_selectStruct.setItem(this);
                            });
                        }
                    }
                    bizcontrol.selectssproduct.fn._activedobj._pvalueList.setSelectedItems(m_selectStruct);
                });
            });
        },
        /* 打开删除属性窗体 */
        _openDeletePropFrm: function () {
            if (!bizcontrol.selectssproduct.fn._activedobj.delPropFrm) {
                bizcontrol.selectssproduct.fn._activedobj.delPropFrm = new uicontrol.confirmDelete(bizcontrol.selectssproduct.fn._deleteProp);
            }

            var m_key = $(this).attr("tag");
            var m_obj = bizcontrol.selectssproduct.fn._activedobj._queryPropList.getItem(m_key);

            bizcontrol.selectssproduct.fn._activedobj.delPropFrm.prodproperty_id = m_key;
            bizcontrol.selectssproduct.fn._activedobj.delPropFrm.showConfirm(mlm.C0464 + mlm.C0165 + "(" + m_obj.ProdPropName + ") ?");
        },
        /* 加载属性值 */
        _loadQueryPValue: function (event) {
            var m_this = this;
            var m_prodproperty = new pdm.prodproperty();
            m_prodproperty.ProdProperty_Id = this._propoptionctrl.val();
            m_prodproperty.queryPropValueByProd(function (retTable) {
                m_this._pvalueList.bindDataSource(retTable);

                if (event) {
                    event();
                }
            });
        },
        /* 创建商品属性值单元格 */
        _constructProdPropValueCell: function (key, cellvalue) {
            if (!cellvalue) {
                return "";
            }
            else {
                return cellvalue;
            }
        },
        /* 创建属性设置列 */
        _constructPropOperaCell: function (key, cellvalue) {
            return "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='bizcontrol.selectssproduct.fn._openModifyPropFrm.call(this);'>" + mlm.C0611 + "</a>" +
                   "<a href='javascript:void(\"0\")' class='bt-link' tag='" + key + "' onclick='bizcontrol.selectssproduct.fn._openDeletePropFrm.call(this);'>" + mlm.C0062 + "</a>";
        },
        /* 构建属性图片列 */
        _constructPropPicCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                var m_src = window.webLocation + cellvalue;
                return "<img class='product-list-img-sl' src='" + m_src + "' />";
            }
            else {
                return "";
            }
        },
        /* 保存属性 */
        _saveProp: function () {
            var m_selectItems = this._pvalueList.getSelectedItems();
            var m_pvalueIds = [];
            var m_pvalues = [];
            $.each(m_selectItems, function () {
                m_pvalueIds.push(this.PropValue_Id);
                m_pvalues.push(this.PValue);
            });

            var m_obj = {};
            m_obj.ProdProperty_Id = this._propoptionctrl.val();
            m_obj.ProdPropName = this._propoptionctrl.find("option:selected").text();
            m_obj.ProdPValueIdRange = m_pvalueIds.join(",");
            m_obj.ProdPValueRange = m_pvalues.join(",");

            if (this._SelPropFrm.action == "New" && this._queryPropList.getItem(m_obj.ProdProperty_Id) == null) {
                this._queryPropList.addData(m_obj.ProdProperty_Id, m_obj);
            }
            else {
                this._queryPropList.modifyData(m_obj.ProdProperty_Id, m_obj);
            }

            this._SelPropFrm.close();
        },
        /* 删除属性 */
        _deleteProp: function () {
            bizcontrol.selectssproduct.fn._activedobj._queryPropList.deleteData(bizcontrol.selectssproduct.fn._activedobj.delPropFrm.prodproperty_id);
            bizcontrol.selectssproduct.fn._activedobj.delPropFrm.close();
        },

        /* 展示Sku选项 */
        _showSkuProds: function (product_id) {
            var m_thisobj = this;
            if (!this._selectSkuProdFrm) {
                this._selectSkuProdFrm = new uicontrol.dialog(this._skuselectctrl, mlm.C0577 + mlm.C1111, { width: 800, position: ["auto", 35] });

                this.skuproductList = new uicontrol.simpleTableList(this._skuprodListCtrl,
                                                                { keyColumn: "SS_InnerProd_Id",
                                                                    isPaging: false,
                                                                    constructTableFunc: this._constructSkuProdTable,
                                                                    itemCss: "ssskuproduct-item",
                                                                    events: { onmouseover: function () { $(this).css("border-color", "#800000"); },
                                                                        onmouseout: function () { $(this).css("border-color", "#c0c0c0"); },
                                                                        ondblclick: function () {
                                                                            var m_skuproduct_id = $(this).attr("tag");

                                                                            var m_itemCtrl = m_thisobj.skuproductList.liList.getItem(m_skuproduct_id);
                                                                            if (!m_thisobj.selectedskuprods.containKey(m_skuproduct_id)) {
                                                                                var m_selecteditem = m_thisobj.skuproductList.getItem(m_skuproduct_id);
                                                                                m_selecteditem.Product = m_thisobj._selectSkuProdFrm.product;
                                                                                m_thisobj.selectedskuprods.setItem(m_skuproduct_id, m_selecteditem);
                                                                                m_itemCtrl.css("background-color", "#F0F0F0");
                                                                                m_itemCtrl.css("color", "#800000");
                                                                            }
                                                                            else {
                                                                                m_thisobj.selectedskuprods.removeItem(m_skuproduct_id);
                                                                                m_itemCtrl.css("background-color", "#FFFFFF");
                                                                                m_itemCtrl.css("color", "#222222");
                                                                            }

                                                                            m_thisobj._handlerProdTable();
                                                                        }
                                                                    }
                                                                });
            }

            var m_func = function (retObj) {
                var m_salepricedict = new datastruct.dictionary();
                $.each(retObj.SalePrices, function () {
                    m_salepricedict.setItem(this.SS_InnerProd_Id, this);
                });

                $.each(retObj.InnerProds, function () {
                    var m_this = this;
                    m_this = $.extend(m_this, m_this.OtherProps);
                    m_this.Product = retObj;

                    this.SalePrice = m_salepricedict.getItem(this.SS_InnerProd_Id);
                });

                if (Number(retObj.AvailableUnitCount) > 1) {

                    var m_items = [];
                    $.each(retObj.InnerProds, function () {
                        if (this.LimitQty != "0") {
                            if (this.Product_Pic_Id != "0") {
                                this.BrowsePicUrl = this.OtherProps.BrowsePicUrl;
                            }

                            m_items.push(this);
                        }
                    });
                    m_thisobj.skuproductList.bindSource(m_items);
                    m_thisobj._lbProdName.text(retObj.ProdName);

                    $.each(m_items, function () {
                        if (m_thisobj.selectedskuprods.containKey(this.SS_InnerProd_Id)) {
                            var m_itemCtrl = m_thisobj.skuproductList.liList.getItem(this.SS_InnerProd_Id);
                            m_itemCtrl.css("background-color", "#F0F0F0");
                            m_itemCtrl.css("color", "#800000");
                        }
                    });

                    m_thisobj._selectSkuProdFrm.product = retObj;
                    m_thisobj._selectSkuProdFrm.show();
                }
                else {
                    $.each(retObj.InnerProds, function () {
                        if (this.LimitQty != "0") {
                            if (!m_thisobj.selectedskuprods.containKey(this.SS_InnerProd_Id)) {

                                this.BrowsePicUrl = this.OtherProps.BrowsePicUrl;
                                m_thisobj.selectedskuprods.setItem(this.SS_InnerProd_Id, this);
                            }
                            else {
                                m_thisobj.selectedskuprods.removeItem(this.SS_InnerProd_Id);
                            }
                        }
                    });

                    m_thisobj._handlerProdTable();
                }

                m_thisobj.readproddict.setItem(retObj.SS_Product_Id, retObj);
            };
            if (this.readproddict.containKey(product_id)) {
                m_func(this.readproddict.getItem(product_id));
            }
            else {
                var m_product = new sm.ss_product();
                m_product.SS_Product_Id = product_id;
                m_product.readSS_Product(m_func);
            }
        },

        /* 构建商品Sku表格 */
        _constructSkuProdTable: function (dataItem) {
            var m_src = "";
            if (dataItem.BrowsePicUrl) {
                if (dataItem.BrowsePicUrl.indexOf("http://") == -1) {
                    m_src = window.webLocation + dataItem.BrowsePicUrl;
                }
                else {
                    m_src = dataItem.BrowsePicUrl;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            var m_ctrl = $("<div></div>");
            var m_container = $("<div class='item'></div>");
            var m_img = $("<img src='" + m_src + "' class='pic-item' onload='commoncore.func.positionCenterImg.call(this);' onerror='commoncore.func.failLoadImg.call(this);' tag='" + dataItem.SS_Product_Id + "' />");
            m_container.append(m_img);

            var m_name = $("<div id='lbSkuProd_" + dataItem.SS_InnerProd_Id + "' class='name-item' tag='" + dataItem.SS_InnerProd_Id + "'>" + dataItem.SkuProps + "</div>");
            var m_price = $("<div style='padding: 0px; margin: 0px 0px 0px 0px'>" + commoncore.func.getCurrHtml(dataItem.Product.OtherProps.CurrSymbol, dataItem.SalePrice.SalePrice) + "</div>");

            m_ctrl.append(m_container);
            m_ctrl.append(m_name);
            m_ctrl.append(m_price);

            return m_ctrl;
        },

        /* 处理商品表 */
        _handlerProdTable: function () {
            var m_proddict = new datastruct.dictionary();
            if (this.selectedskuprods) {
                $.each(this.selectedskuprods.arrValues, function () {
                    if (!m_proddict.containKey(this.SS_Product_Id)) {
                        m_proddict.setItem(this.SS_Product_Id, null);
                    }
                });
            }
            var m_this = this;
            $.each(m_proddict.arrKeys, function () {
                if (!m_this.selectedprods.containKey(this)) {
                    var m_itemCtrl = m_this.productList.liList.getItem(this);
                    if (m_itemCtrl) {
                        m_itemCtrl.css("background-color", "#F0F0F0");
                        m_itemCtrl.css("color", "#800000");
                    }
                }
            });

            $.each(this.selectedprods.arrKeys, function () {
                if (!m_proddict.containKey(this)) {
                    var m_itemCtrl = m_this.productList.liList.getItem(this);
                    if (m_itemCtrl) {
                        m_itemCtrl.css("background-color", "#FFFFFF");
                        m_itemCtrl.css("color", "#222222");
                    }
                }
            });

            this.selectedprods = m_proddict;
            this._btSelected.val(mlm.C1109 + "(" + m_proddict.arrKeys.length + ")");
        },

        /* 查看产品 */
        _viewProduct: function (product_id) {
            if (!pageVariable.viewSSProdCtrl) {
                pageVariable.viewSSProdCtrl = new bizcontrol.viewssproduct();
            }
            pageVariable.viewSSProdCtrl.show(product_id);
        },

        /* 确定选择 */
        _confirmSelected: function () {
            if (this.selectedskuprods.count == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1110);
                return;
            }

            if (this.selectedEvent) {
                this.selectedEvent(this.selectedskuprods.arrValues);
            }

            this._selectProdFrm.close();
        }
    };
    bizcontrol.selectssproduct.fn.init.prototype = bizcontrol.selectssproduct.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----物流解决方案查看控件----- 
    */
    bizcontrol.viewlstsolution = function () {
        var obj = new bizcontrol.viewlstsolution.fn.init();
        return obj;
    };
    bizcontrol.viewlstsolution.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewLstSolutionFrm' style='display: none;'></div>");

            var m_tabContainer = $("<div id='lstSolutionTabs_v'></div>");

            var m_ulContainer = $("<ul></ul>");
            var m_liContainer_1 = $("<li><a href='#lstSoluInfo_v'>" + mlm.C0781 + "</a></li>");
            m_ulContainer.append(m_liContainer_1);
            var m_liContainer_2 = $("<li><a href='#lstSoluCharge_v'>" + mlm.C0782 + "</a></li>");
            m_ulContainer.append(m_liContainer_2);
            m_tabContainer.append(m_ulContainer);

            var m_divContainer_1 = $("<div id='lstSoluInfo_v'></div>");
            var m_tableContainer = $("<div class='submitForm form-width-b'></div>");

            var m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C0783 + ":</span>");
            this.lblstSolution = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lblstSolution);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0784 + ":</span>");
            this.lblstCompany = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lblstCompany);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0785 + ":</span>");
            this.lbLstSolutionType = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbLstSolutionType);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0786 + ":</span>");
            this.lbCalculateModel = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbCalculateModel);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div id='dvVolumnArea_v' class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0790 + ":</span>");
            this.lbVolumnForCal = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append("<span class='lb-symbol'>" + mlm.C0791 + "</span><span style='margin: 0px 5px 0px 5px'>/</span>");
            m_rightTd.append(this.lbVolumnForCal);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0792 + ":</span>");
            this.lbTrackWebAddress = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbTrackWebAddress);
            m_trContainer.append(m_leftTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0794 + ":</span>");
            this.lbVATLimit = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVATLimit);
            this.lbVATCurr = $("<span class='lb-symbol' style='margin: 0px 0px 0px 5px'></span>");
            m_leftTd.append(this.lbVATCurr);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0795 + ":</span>");
            this.lbVATValue = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVATValue);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0840 + ":</span>");
            this.dvRemark = $("<span style='display: inline-block; width: 750px'></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.dvRemark);
            m_trContainer.append(m_leftTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0338 + ":</span>");
            this.lbSPfNames = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbSPfNames);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr last-item'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1274 + ":</span>");
            this.lbLstWarehouse = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbLstWarehouse);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_divContainer_1.append(m_tableContainer);
            m_tabContainer.append(m_divContainer_1);

            var m_divContainer_2 = $("<div id='lstSoluCharge_v'></div>");
            m_tableContainer = $("<div class='submitForm form-width-b'></div>");
            m_trContainer = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_ccContainer = $("<div style='height: 435px;'></div>");
            var m_ccContainer_1 = $("<div style='height: 30px;'></div>");
            m_ccContainer_1.append($("<span class='lb-title list-title'>" + mlm.C0796 + "</span>"));
            m_ccContainer.append(m_ccContainer_1);
            var m_ccContainer_2 = $("<div></div>");
            m_ccContainer_2.append("<table id='lstSoluItemList_v'></table>");
            m_ccContainer.append(m_ccContainer_2);
            m_trContainer.append(m_ccContainer);
            m_tableContainer.append(m_trContainer);
            m_divContainer_2.append(m_tableContainer);
            m_tabContainer.append(m_divContainer_2);

            this.ctrl.append(m_tabContainer);

            this.chargeCtrl = $("<div id='viewLstSolutionChargeFrm' style='display: none;'></div>");

            m_tableContainer = $("<div class='submitForm form-width'></div>");
            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0291 + ":</span>");
            this.dvCountry = $("<span style='display: inline-block; width: 640px'></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.dvCountry);
            m_trContainer.append(m_leftTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0799 + ":</span>");
            this.AvaiTime = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.AvaiTime);
            m_trContainer.append(m_leftTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr last-item'></div>");
            var m_chargeTitle = $("<div style='height: 30px;'></div>");
            m_chargeTitle.append($("<span class='lb-title list-title'>" + mlm.C0796 + "</span>"));
            var m_chargeList = $("<div></div>");
            m_chargeList.append("<table id='lstSoluChargeList_v'></table>");
            m_trContainer.append(m_chargeTitle);
            m_trContainer.append(m_chargeList);
            m_tableContainer.append(m_trContainer);
            this.chargeCtrl.append(m_tableContainer);
        },

        /* 展示配送服务模板 */
        show: function (key) {

            var m_this = this;

            if (!this.viewLstSolutionFrm) {
                this.viewLstSolutionFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.M0053, { width: 1025, position: ["auto", 15] });

                this.viewLstSolutionFrm.show();
                this.lstSoluItemList_v = new uicontrol.tableList("lstSoluItemList_v",
                                     { autoSeq: true,
                                         keyColumn: "LstSolutionItem_Id",
                                         height: 340,
                                         columns: [{ display: mlm.C0291, name: "GlobalAreaNames", width: 340, align: 'left' },
                                                   { display: mlm.C1268, name: "LstSolutionItemName", width: 60, align: 'left' },
                                                   { display: mlm.C0985, name: "", width: 150, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructWeightRangeForViewCell.call(m_this, key, cellValue); } },
                                                   { display: mlm.C0444, name: "StartWeightCharge", width: 70, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructWeightChargeForViewCell.call(m_this, key, cellValue); } },
                                                   { display: mlm.C0789, name: "OtherItemCharge", width: 70, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructWeightChargeForViewCell.call(m_this, key, cellValue); } },
                                                   { display: mlm.C0799, name: "", width: 100, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructAvaiTimeForViewCell.call(m_this, key, cellValue); } }]
                                     });

                this.lstSolutionTabs_v = $("#lstSolutionTabs_v").tabs();
            }
            else {
                this.viewLstSolutionFrm.show();
            }

            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.LstSolution_Id = key;
            m_lstsolution.readLstSolution(function (retObj) {

                m_this.lstsolution = retObj;

                m_this.lblstSolution.text(retObj.LstSolutionName);
                m_this.lblstCompany.text(retObj.OtherProps.LstCompanyName);

                if (retObj.LstSolutionType == "1") {
                    m_this.lbLstSolutionType.text(mlm.C0803);
                }
                else if (retObj.LstSolutionType == "2") {
                    m_this.lbLstSolutionType.text(mlm.C0804);
                }
                else {
                    m_this.lbLstSolutionType.text(mlm.C0805);
                }

                if (retObj.CalculateModel == "1") {
                    m_this.lbCalculateModel.text(mlm.C0801);
                    $("#dvVolumnArea_v").hide();
                }
                else {
                    m_this.lbCalculateModel.text(mlm.C0802);
                    $("#dvVolumnArea_v").show();
                }

                m_this.lbVolumnForCal.text(retObj.VolumnForCal);
                m_this.lbTrackWebAddress.text(retObj.TrackWebAddress);
                if (retObj.OtherProps.SPfNames) {
                    m_this.lbSPfNames.text(retObj.OtherProps.SPfNames);
                }
                else {
                    m_this.lbSPfNames.text(mlm.C1140);
                }
                m_this.dvRemark.html(retObj.LstSoluRemark.replace(/\^/g, "\"").replace(/\n/g, "<br>"));

                if (retObj.OtherProps.LstWarehouseTable) {
                    var m_whnamearr = [];
                    var m_warehouseTable = datastruct.convertion.strToObject(retObj.OtherProps.LstWarehouseTable);
                    $.each(m_warehouseTable, function () {
                        m_whnamearr.push(this.WarehouseName);
                    });

                    m_this.lbLstWarehouse.text(m_whnamearr.join(", "));
                }

                if (Number(retObj.VATLimit) > 0) {
                    m_this.lbVATLimit.html(commoncore.func.getCurrHtml(retObj.OtherProps.VAT_CurrSymbol, retObj.VATLimit));
                    m_this.lbVATValue.text((Number(retObj.VATValue) * 100) + " %");
                }
                else {
                    m_this.lbVATLimit.text("");
                    m_this.lbVATCurr.text("");
                    m_this.lbVATValue.text("");
                }

                $.each(retObj.Items, function () {
                    if (this.OtherProps.GlobalAreaNames) {
                        this.GlobalAreaNames = this.OtherProps.GlobalAreaNames;
                    }
                    else {
                        this.GlobalAreaNames = mlm.C0421;
                    }

                    var m_fstLstCharge = this.Charges[0];
                    this.StartWeight = m_fstLstCharge.StartWeight;
                    this.StartWeightCharge = m_fstLstCharge.IncreaseWeightCharge;
                    this.OtherItemCharge = m_fstLstCharge.OtherItemCharge;
                    var m_lastLstCharge = this.Charges[this.Charges.length - 1];
                    this.WeightLimit = m_lastLstCharge.WeightLimit;
                });

                m_this.lstSoluItemList_v.bindDataSource(retObj.Items);
                $.each(retObj.Items, function () {
                    var m_key = this.LstSolutionItem_Id;
                    $("#lkWRange_" + m_key).click(function () {
                        m_this._showCharge(m_key);
                    });
                });
            });
        },

        /* 展示运费 */
        _showCharge: function (key) {
            var m_this = this;
            if (!this.viewLstSolutionChargeFrm) {
                this.viewLstSolutionChargeFrm = new uicontrol.dialog(this.chargeCtrl, mlm.C0672 + mlm.C0807, { width: 800, position: ["auto", 25] });

                this.viewLstSolutionChargeFrm.show();
                this.lstSoluChargeList_v = new uicontrol.tableList("lstSoluChargeList_v",
                                     { autoSeq: true,
                                         keyColumn: "LstSolutionItem_Charge_Id",
                                         height: 150,
                                         columns: [{ display: mlm.C0985, name: "", width: 150, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructLsChargeWRangeForVCell.call(m_this, key, cellValue); } },
                                                   { display: mlm.C0797, name: "", width: 150, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructLsIncChargeForVCell.call(m_this, key, cellValue); } },
                                                   { display: mlm.C0789, name: "OtherItemCharge", width: 90, align: 'left', adjust: true, createCell: function (key, cellValue) { return bizcontrol.viewlstsolution.fn.constructWeightChargeForViewCell.call(m_this, key, cellValue); } }]
                                     });
            }
            else {
                this.viewLstSolutionChargeFrm.show();
            }

            var m_lstSoluItem = this.lstSoluItemList_v.getItem(key);
            this.dvCountry.text(m_lstSoluItem.GlobalAreaNames);
            this.AvaiTime.text(m_lstSoluItem.MinAvaiTime + "-" + m_lstSoluItem.MaxAvaiTime + mlm.C0984);
            this.lstSoluChargeList_v.bindDataSource(m_lstSoluItem.Charges);
        },

        /* 构建费用列 */
        constructWeightChargeForViewCell: function (key, cellvalue) {
            return commoncore.func.getExactCurrHtml(this.lstsolution.OtherProps.CurrSymbol, cellvalue);
        },
        /* 构建参考时效列 */
        constructAvaiTimeForViewCell: function (key, cellvalue) {
            var m_obj = this.lstSoluItemList_v.getItem(key);

            return m_obj.MinAvaiTime + "-" + m_obj.MaxAvaiTime + mlm.C0984;
        },
        /* 构建重量区间列 */
        constructWeightRangeForViewCell: function (key, cellvalue) {
            var m_obj = this.lstSoluItemList_v.getItem(key);

            return "<a id='lkWRange_" + key + "' href='javascript:void(\"0\");'><span>" + Number(m_obj.StartWeight).toFixed(3) + "</span> " + this.lstsolution.OtherProps.WUnit + " - " + "<span>" + Number(m_obj.WeightLimit).toFixed(3) + "</span> " + this.lstsolution.OtherProps.WUnit + "</a>";
        },
        /* 构建运费的重量区间列 */
        constructLsChargeWRangeForVCell: function (key, cellvalue) {
            var m_obj = this.lstSoluChargeList_v.getItem(key);
            return "<span>" + Number(m_obj.StartWeight).toFixed(3) + "</span> " + this.lstsolution.OtherProps.WUnit + " - " + "<span>" + Number(m_obj.WeightLimit).toFixed(3) + "</span> " + this.lstsolution.OtherProps.WUnit;
        },
        /* 构建运费的续重运费列 */
        constructLsIncChargeForVCell: function (key, cellvalue) {

            var m_obj = this.lstSoluChargeList_v.getItem(key);
            var m_increaweight = Number(m_obj.IncreaseWeight);
            if (m_increaweight > 0) {
                return commoncore.func.getExactCurrHtml(this.lstsolution.OtherProps.CurrSymbol, m_obj.IncreaseWeightCharge) + " / " + Number(m_obj.IncreaseWeight).toFixed(3) + " " + this.lstsolution.OtherProps.WUnit;
            }
            else {
                return commoncore.func.getExactCurrHtml(this.lstsolution.OtherProps.CurrSymbol, m_obj.IncreaseWeightCharge);
            }
        }
    };

    bizcontrol.viewlstsolution.fn.init.prototype = bizcontrol.viewlstsolution.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----供应商查看控件----- 
    */
    bizcontrol.viewsupplier = function () {
        var obj = new bizcontrol.viewsupplier.fn.init();
        return obj;
    };
    bizcontrol.viewsupplier.fn = {

        actionObj: null,

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewSupplierFrm' style='display: none;'></div>");

            var m_tabs = $("<div id='viewSupplierTabs'></div>");
            m_tabs.append("<ul><li><a id='lkViewSuppInfo' href='#viewSupplierInfo'>" + mlm.C0781 + "</a></li><li><a href='#viewQuotedPrice'>" + mlm.M0054 + "</a></li></ul>");

            var m_suppContainer = $("<div id='viewSupplierInfo'></div>");
            var m_quotedpriceContainer = $("<div id='viewQuotedPrice'></div>");

            var m_tableContainer = $("<div class='submitForm form-width-a'></div>");

            var m_tr_1 = $("<div class='submitForm-tr first-item'></div>");
            var m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C1069 + ":</span>");
            /* 供应商 */
            this.m_suppNameCtrl = $("<span></span>");
            m_td_1.append(this.m_suppNameCtrl);
            m_tr_1.append(m_td_1);
            var m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C1165 + ":</span>");
            /* 所在国家 */
            this.m_countryCtrl = $("<span></span>");
            m_td_2.append(this.m_countryCtrl);
            m_tr_1.append(m_td_2);

            var m_tr_2 = $("<div class='submitForm-tr first-item'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0310 + ":</span>");
            /* 邮箱 */
            this.m_emailCtrl = $("<span></span>");
            m_td_1.append(this.m_emailCtrl);
            m_tr_2.append(m_td_1);
            m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C1166 + ":</span>");
            /* 公司网址 */
            this.m_webSiteCtrl = $("<span style='width: 320px; display: inline-block'></span>");
            m_td_2.append(this.m_webSiteCtrl);
            m_tr_2.append(m_td_2);

            var m_tr_3 = $("<div class='submitForm-tr first-item'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0311 + ":</span>");
            /* 联系电话 */
            this.m_telCtrl = $("<span></span>");
            m_td_1.append(this.m_telCtrl);
            m_tr_3.append(m_td_1);
            m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C1167 + ":</span>");
            /* 传真 */
            this.m_faxCtrl = $("<span></span>");
            m_td_2.append(this.m_faxCtrl);
            m_tr_3.append(m_td_2);

            var m_tr_4 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C1168 + ":</span>");
            /* 联系地址 */
            this.m_addressCtrl = $("<span style='display: inline-block; width: 650px'></span>");
            m_td_1.append(this.m_addressCtrl);
            m_tr_4.append(m_td_1);

            var m_tr_5 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0073 + ":</span>");
            /* 备注 */
            this.m_remarkCtrl = $("<span style='display: inline-block; width: 650px'></span>");
            m_td_1.append(this.m_remarkCtrl);
            m_tr_5.append(m_td_1);

            var m_linktr = $("<div class='submitForm-tr first-item last-item'></div>");
            m_linktr.append("<div style='height: 30px'><span class='lb-title list-title'>" + mlm.C1164 + mlm.C0463 + "</span></div>");
            this.m_linkerTable = $("<table id='viewSuppLinkerList'></table>");
            m_linktr.append(this.m_linkerTable);

            m_tableContainer.append(m_tr_1);
            m_tableContainer.append(m_tr_2);
            m_tableContainer.append(m_tr_3);
            m_tableContainer.append(m_tr_4);
            m_tableContainer.append(m_tr_5);
            m_tableContainer.append(m_linktr);

            m_suppContainer.append(m_tableContainer);
            m_tabs.append(m_suppContainer);

            var m_quotedpricetableCtrl = $("<div class='submitForm form-width-a'></div>");
            var m_quotedtr = $("<div class='submitForm-tr first-item last-item'></div>");
            m_quotedtr.append("<div style='height: 30px'><span class='lb-title list-title'>" + mlm.M0054 + mlm.C0463 + "</span></div>");
            var m_quotedTable = $("<table id='viewSuppQuotedList'></table>");
            m_quotedtr.append(m_quotedTable);
            m_quotedpricetableCtrl.append(m_quotedtr);
            m_quotedpriceContainer.append(m_quotedpricetableCtrl);

            m_tabs.append(m_quotedpriceContainer);
            this.ctrl.append(m_tabs);

            this.m_skuquotedctrl = $("<div id='viewSuppSkuQuotedFrm' style='display: none;'></div>");
            var m_skuquotedTable = $("<table id='viewSuppSkuQuotedList'></table>");
            this.m_skuquotedctrl.append(m_skuquotedTable);
            $(document).append(this.m_skuquotedctrl);
        },

        /* 展示配送服务 */
        show: function (supplier_id) {

            var thisObj = this;
            bizcontrol.viewsupplier.fn.actionObj = this;

            this.supplier_id = supplier_id;

            if (!this.viewSupplierFrm) {
                this.viewSupplierFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C1069, { width: 925, position: ["auto", 5] });

                this.linkerList = new uicontrol.tableList("viewSuppLinkerList",
                                    { autoSeq: true,
                                        keyColumn: "SupplierLinker_Id",
                                        height: 50,
                                        columns: [{ display: mlm.C1164, name: "S_LinkerName", width: 100, align: 'left' },
                                                { display: mlm.C1169, name: "S_LTitle", width: 80, align: 'left' },
                                                { display: mlm.C0310, name: "S_LEmail", width: 180, align: 'left' },
                                                { display: mlm.C0311, name: "S_LTel", width: 100, align: 'left' },
                                                { display: mlm.C0073, name: "S_LRemark", width: 150, align: 'left', adjust: true, createCell: commoncore.func.constructRemarkCell}]
                                    });

                this.suppquotedList = new uicontrol.tableList("viewSuppQuotedList",
                                    { autoSeq: true,
                                        isPaging: true,
                                        keyColumn: "Product_Id",
                                        height: 300,
                                        pageQueryHandler: bizcontrol.viewsupplier.fn.queryPurchasePrice,
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructProdPicCell },
                                                { display: mlm.C0734, name: "ProdName", width: 270, align: 'left', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructProdNameCell },
                                                { display: mlm.C1064, name: "", width: 150, align: 'right', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructProdCostCell },
                                                { display: mlm.M0054, name: "", width: 150, align: 'right', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructQuoteInfoCell}]
                                    });

                this.supplierTabs = $("#viewSupplierTabs").tabs({ show: function (event, ui) {
                    if (ui.index == 1) {
                        thisObj.queryPurchasePrice(1, thisObj.suppquotedList.pageNumber);
                    }
                } 
                });
            }

            $("#lkViewSuppInfo").trigger("click");

            var m_supplier = new pom.supplier();
            m_supplier.Supplier_Id = supplier_id;

            m_supplier.readSupplier(function (obj) {

                thisObj.supplier = obj;
                thisObj.m_suppNameCtrl.text(obj.SuppName);
                thisObj.m_countryCtrl.text(obj.OtherProps.GlobalAreaName);
                thisObj.m_emailCtrl.text(obj.S_Email);
                thisObj.m_webSiteCtrl.text(obj.S_WebSite);
                thisObj.m_telCtrl.text(obj.S_Tel);
                thisObj.m_faxCtrl.text(obj.S_Fax);
                thisObj.m_addressCtrl.text(obj.S_Address);
                thisObj.m_remarkCtrl.text(obj.S_Remark);

                thisObj.linkerList.bindDataSource(obj.Linkers);
                thisObj.suppquotedList.bindDataSource(null);

                thisObj.viewSupplierFrm.show();

            });
        },

        /*  */
        queryPurchasePrice: function (pageNum, pageCount) {
            var thisObj = bizcontrol.viewsupplier.fn.actionObj;

            var m_purchaseprice = new pom.purchaseprice();
            m_purchaseprice.Supplier_Id = thisObj.supplier_id;
            m_purchaseprice.Page = pageNum;
            m_purchaseprice.PageNum = pageCount;

            m_purchaseprice.queryQuotedProduct(function (source) {
                thisObj.suppquotedList.bindDataSource(source);
            });
        },
        /*  */
        _constructProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 70);' onerror='commoncore.func.failLoadImg.call(this, 70);' onclick='viewProduct.call(this, \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /*  */
        _constructProdNameCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_css = "";
            if (Number(this.keyObj.QuotedSkuCount) != Number(this.keyObj.SkuProdCount)) {
                m_css = "color: #840000"
            }

            var m_html_items = [];

            m_html_items.push("<div style='padding: 0px'><a style='" + m_css + "' onclick='viewProduct.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellValue + "</a></div>");
            if (Number(m_obj.SkuProdCount) > 1) {
                m_html_items.push("<div style='margin: 2px 0px 0px 0px; padding: 0px; " + m_css + "' class='lb-symbol'>" + mlm.C1065 + ": " + m_obj.SkuProdCount + mlm.C1066 + "</div>");
            }

            return m_html_items.join("");
        },
        /*  */
        _constructProdCostCell: function (key, cellValue) {
            var m_arr = [];

            var m_css = "";
            if (Number(this.keyObj.QuotedSkuCount) != Number(this.keyObj.SkuProdCount)) {
                m_css = "color: #840000"
            }

            if (this.keyObj.MaxCost && Number(this.keyObj.MaxCost) > 0) {
                if (Number(this.keyObj.MinCost) == Number(this.keyObj.MaxCost)) {
                    m_arr.push("<div style='padding: 0px; " + m_css + "'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinCost) + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px; " + m_css + "'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MinCost) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.MaxCost) + "</div>");
                }
            }
            return m_arr.join("");
        },
        /*  */
        _constructQuoteInfoCell: function (key, cellValue) {
            var m_css = "";
            if (Number(this.keyObj.QuotedSkuCount) != Number(this.keyObj.SkuProdCount)) {
                m_css = "color: #840000"
            }

            var m_arr = [];
            if (this.keyObj.SuppQuoteds) {
                var m_rows = datastruct.convertion.strToObject(this.keyObj.SuppQuoteds);
                var i = 0;
                $.each(m_rows, function () {

                    var m_pricestr = "";
                    var m_minprice = this[3];
                    var m_maxprice = this[4];
                    if (m_maxprice && Number(m_maxprice) > 0) {
                        if (Number(m_minprice) == Number(m_maxprice)) {
                            m_arr.push("<a onclick='bizcontrol.viewsupplier.fn._viewSkuQuotedItem.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_minprice) + "</a>");
                        }
                        else {
                            m_arr.push("<a onclick='bizcontrol.viewsupplier.fn._viewSkuQuotedItem.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_minprice) + "-" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, m_maxprice) + "</a>");
                        }
                    }
                });
            }

            return m_arr.join("");
        },
        /* 查看Sku报价 */
        _viewSkuQuotedItem: function (product_id) {
            var m_obj = bizcontrol.viewsupplier.fn.actionObj;
            m_obj.product_id = product_id;

            if (!m_obj.viewSkuQuotedItemCtrl) {
                m_obj.viewSkuQuotedItemCtrl = uicontrol.dialog(m_obj.m_skuquotedctrl, "查看商品询价", { width: 900, position: ["auto", 25] });

                m_obj.viewSuppSkuQuotedList = new uicontrol.tableList("viewSuppSkuQuotedList",
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "SkuProduct_Id",
                                         height: 300,
                                         pageQueryHandler: bizcontrol.viewsupplier.fn.querySkuPurchasePrice,
                                         columns: [{ display: mlm.C0174, name: "SkuProps", width: 150, align: 'left' },
                                                   { display: mlm.C1153, name: "", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructSkuItemQuotedPriceCell },
                                                   { display: mlm.C1163, name: "", width: 100, align: 'right', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructSkuItemQuotedPeriodCell },
                                                   { display: mlm.C1152, name: "", width: 350, align: 'left', adjust: true, createCell: bizcontrol.viewsupplier.fn._constructPurAddressCell}]
                                     });
            }

            m_obj.querySkuPurchasePrice(1, m_obj.viewSuppSkuQuotedList.pageNumber);

            m_obj.viewSkuQuotedItemCtrl.show();
        },
        /*  */
        _constructPurAddressCell: function (key, cellValue) {
            var m_arr = [];

            if (this.keyObj.PurAddress) {
                if (this.keyObj.PurAddress.toLowerCase().indexOf("http") > -1) {

                    var m_address = this.keyObj.PurAddress;
                    var m_len = m_address.getBytesCount();
                    if (m_len > 40) {
                        m_address = m_address.substringByBytes(40) + "...";
                    }

                    if (this.keyObj.GlobalAreaName) {
                        m_address += "-" + this.keyObj.GlobalAreaName;
                    }

                    m_arr.push("<a href='" + this.keyObj.PurAddress + "' target='_blank'>" + m_address + "</a>");
                }
                else {
                    if (this.keyObj.GlobalAreaName && this.keyObj.PurAddress.indexOf(this.keyObj.GlobalAreaName) == -1) {
                        m_arr.push("<span>" + this.keyObj.PurAddress + "-" + this.keyObj.GlobalAreaName + "</span>");
                    }
                    else {
                        m_arr.push("<span>" + this.keyObj.PurAddress + "</span>");
                    }
                }
            }

            return m_arr.join("");
        },
        /*  */
        querySkuPurchasePrice: function (pageNum, pageCount) {
            var m_obj = bizcontrol.viewsupplier.fn.actionObj;

            var m_purchaseprice = new pom.purchaseprice();
            m_purchaseprice.Supplier_Id = m_obj.supplier_id;
            m_purchaseprice.Product_Id = m_obj.product_id;
            m_purchaseprice.Page = pageNum;
            m_purchaseprice.PageNum = pageCount;

            m_purchaseprice.querySkuQuotedPrices(function (source) {
                var m_jsonobjs = datastruct.convertion.tableToJson(source);
                m_obj.viewSuppSkuQuotedList.bindDataSource(m_jsonobjs);

                $.each(m_jsonobjs, function () {
                    var m_itemCtrl = $("#lbSuppSkuQuotedRemark_v_" + this.QuoteKey);
                    m_itemCtrl.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
                });
            });
        },
        /* 构建Sku实际采购价格列 */
        _constructSkuItemQuotedPriceCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_remarkhtml = "";
            if (m_obj.Remark) {
                m_remarkhtml = " id='lbSuppSkuQuotedRemark_v_" + key + "' style='color: #840000'; tag='" + m_obj.Remark + "'";
            }

            return "<span " + m_remarkhtml + ">" + commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, this.keyObj.QuotedPrice) + "</span>";
        },
        /* 构建Sku采购周期列 */
        _constructSkuItemQuotedPeriodCell: function (key, cellValue) {
            var m_obj = this.keyObj;
            return "<span>" + this.keyObj.Period + " " + mlm.C0800 + "</span>";
        }
    };

    bizcontrol.viewsupplier.fn.init.prototype = bizcontrol.viewsupplier.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----物流解决方案选择控件----- 
    */
    bizcontrol.selectlstsolution = function (selectedevent, selectModel) {
        var obj = new bizcontrol.selectlstsolution.fn.init(selectedevent, selectModel);
        return obj;
    };
    bizcontrol.selectlstsolution.fn = {
        /* ID识别码 */
        _key: 1,

        /* 构造函数 */
        init: function (selectedevent, selectModel) {

            var thisObj = this;
            this._key = bizcontrol.selectlstsolution.fn._key;
            this.selectedevent = selectedevent;
            this.selectModel = selectModel;
            if (!this.selectModel) {
                this.selectModel = "2";
            }

            this._lstsolutionDialog = $("<div id='selLstSolutionFrm_" + this._key + "' style='display: none;'></div>");

            var m_tablectrl = $("<div class='submitForm form-width-a' style='border-bottom-width: 0px; width: 878px'></div>");
            var m_tr = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_toolctrl = $("<div style='height: 30px'></div>");
            var m_lefttd = $("<span class='left-cell'></span>");
            m_lefttd.append($("<span class='title'>" + mlm.M0053 + ":</span>"));
            this._txtLstSolutionKey = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            m_lefttd.append(this._txtLstSolutionKey);
            m_toolctrl.append(m_lefttd);
            var m_righttd = $("<span></span>");
            m_righttd.append($("<span class='title'>" + mlm.C0784 + ":</span>"));
            this._ddlLstCompany = $("<select class='dropdown-list'></select>");
            m_righttd.append(this._ddlLstCompany);
            m_toolctrl.append(m_righttd);
            m_tr.append(m_toolctrl);
            m_tablectrl.append(m_tr);
            this._lstsolutionDialog.append(m_tablectrl);
            var lstsolutionlistctrl = $("<table id='selLstSolutionList_" + this._key + "'></table>");
            this._lstsolutionDialog.append(lstsolutionlistctrl);

            $(document).append(this._lstsolutionDialog);

            bizcontrol.selectlstsolution.fn._key++;

            var m_func = function () {
                thisObj.lstsolution_ids = null;
                thisObj._queryLstSolutions(1, thisObj.lstSolutionList.pageNumber);
            };
            this._txtLstSolutionKey.change(m_func);
            this._ddlLstCompany.change(m_func);
        },

        /* 打开选择物流解决方案的窗体 */
        show: function (lstsolution_ids, saleplatform_id, warehouse_id, lstcompany_id) {

            var thisObj = this;
            this.lstsolution_ids = lstsolution_ids;
            this.SalePlatform_Id = saleplatform_id;
            this.Warehouse_Id = warehouse_id;
            this.LstCompany_Id = lstcompany_id;
            this.lstsolution_id_dict = new datastruct.dictionary();

            if (this.lstsolution_ids) {
                $.each(this.lstsolution_ids, function () {
                    thisObj.lstsolution_id_dict.setItem(this, null);
                });
            }

            if (!this.selLstSolutionFrm) {
                this.selLstSolutionFrm = new uicontrol.dialog(this._lstsolutionDialog, mlm.C0814, { width: 900, position: ["auto", 35] }, function () { bizcontrol.selectlstsolution.fn._selectLstSolution.call(thisObj); });

                var m_lstcompany = new lstm.lstcompany();
                m_lstcompany.getAllLstCompanys(function (retTable) {

                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);
                    thisObj._ddlLstCompany.append("<option value=''></option>");
                    $.each(m_jsonobjs, function () {
                        thisObj._ddlLstCompany.append("<option value='" + this.LstCompany_Id + "'>" + this.LstCompanyName + "</option>");
                    });

                    thisObj._ddlLstCompany.val(thisObj.LstCompany_Id);

                    thisObj.lstSolutionList.bindDataSource(null);
                    thisObj._queryLstSolutions(1, thisObj.lstSolutionList.pageNumber);
                });

                this.selLstSolutionFrm.show();
                this.lstSolutionList = new uicontrol.tableList("selLstSolutionList_" + this._key,
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "LstSolution_Id",
                                         selectModel: thisObj.selectModel,
                                         height: 270,
                                         pageQueryHandler: function (page, pagenum) { thisObj._queryLstSolutions(page, pagenum); },
                                         columns: [{ display: mlm.C0783, name: "LstSolutionName", width: 200, align: 'left', adjust: true, createCell: bizcontrol.selectlstsolution.fn._constructLstSolutionCell },
                                                   { display: mlm.C0784, name: "LstCompanyName", width: 120, align: 'left' },
                                                   { display: mlm.C0785, name: "LstSolutionType", width: 80, align: 'left', adjust: true, createCell: bizcontrol.selectlstsolution.fn._constructLstSoluTypeCell },
                                                   { display: mlm.C0810, name: "TrackWebAddress", width: 60, align: 'left', adjust: true, createCell: bizcontrol.selectlstsolution.fn._constructTrackWebCell },
                                                   { display: mlm.C1274, name: "WarehouseNames", width: 250, align: 'left'}]
                                     });
            }
            else {

                thisObj._ddlLstCompany.val(thisObj.LstCompany_Id);

                this.lstSolutionList.bindDataSource(null);
                this._queryLstSolutions(1, this.lstSolutionList.pageNumber);

                this.selLstSolutionFrm.show();
            }
        },
        /* 查询物流解决方案 */
        _queryLstSolutions: function (page, pagenum) {

            var thisObj = this;
            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.Page = page;
            m_lstsolution.PageNum = pagenum;
            m_lstsolution.Key = this._txtLstSolutionKey.val();
            m_lstsolution.LstCompany_Id = this._ddlLstCompany.val();
            m_lstsolution.LstSolution_Ids = this.lstsolution_ids;
            m_lstsolution.SalePlatform_Id = this.SalePlatform_Id;
            m_lstsolution.Warehouse_Id = this.Warehouse_Id;

            m_lstsolution.queryLstSolution(function (retTable) {
                thisObj.lstSolutionList.bindDataSource(retTable);
                thisObj.lstSolutionList.setSelectedItems(thisObj.lstsolution_id_dict);
            });
        },
        /* 选择物流解决方案 */
        _selectLstSolution: function () {
            var m_selecteditems = this.lstSolutionList.getSelectedItems();
            if (m_selecteditems.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1142);
                return;
            }

            if (this.selectedevent) {
                this.selectedevent(m_selecteditems);
            }

            this.selLstSolutionFrm.close();
        },

        /* 构建解决方案列 */
        _constructLstSolutionCell: function (key, cellvalue) {
            return "<a onclick='openViewLstSolution.call(this, \"" + key + "\")' href='javascript:void(\"0\");'>" + cellvalue + "</a>";
        },
        /* 构建进度跟踪列 */
        _constructTrackWebCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                return mlm.C0811;
            }
        },
        /* 构建快递类型列 */
        _constructLstSoluTypeCell: function (key, cellvalue) {
            if (cellvalue == "1") {
                return mlm.C0803;
            }
            else if (cellvalue == "2") {
                return mlm.C0804;
            }
            else if (cellvalue == "3") {
                return mlm.C0805;
            }
            else {
                return mlm.C0815;
            }
        }
    };
    bizcontrol.selectlstsolution.fn.init.prototype = bizcontrol.selectlstsolution.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----供应商选择控件----- 
    */
    bizcontrol.selectsupplier = function (ctrl, csssytle, event) {
        var obj = new bizcontrol.selectsupplier.fn.init(ctrl, csssytle, event);
        return obj;
    };
    bizcontrol.selectsupplier.fn = {
        /* ID识别码 */
        _key: 1,

        /* 当前活动对象 */
        _actionObj: null,

        /* 构造函数 */
        init: function (ctrl, csssytle, event) {

            var thisObj = this;
            this._key = bizcontrol.selectsupplier.fn._key;
            this.ctrl = ctrl;
            this.event = event;

            var m_txtClass = "text-long-input";
            if (csssytle) {
                m_txtClass = csssytle.TxtClass;
            }

            this.suppNameTxt = $("<input type='text' class='" + m_txtClass + "' onkeypress='uicontrol.func.checkInput(event);' />");
            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            this.btSelect.click(function () { thisObj._openSelSuppFrm(); });
            this.suppNameTxt.change(function () { thisObj._inputSuppName(); });

            this._suppDialog = $("<div id='selSuppFrm_" + this._key + "' style='display: none;'></div>");
            var m_tablectrl = $("<div class='submitForm form-width-a' style='border-bottom-width: 0px; width: 878px'></div>");
            var m_tr = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_toolctrl = $("<div style='height: 30px'></div>");
            this._txtSuppKey = $("<input type='text' class='text-long-input' onkeypress='uicontrol.func.checkInput(event);' />");
            m_toolctrl.append(this._txtSuppKey);
            var m_btquerysupp = $("<input type='button' class='normal-bt' value='" + mlm.C0562 + "' />");
            m_toolctrl.append(m_btquerysupp);
            m_tr.append(m_toolctrl);
            m_tablectrl.append(m_tr);
            this._suppDialog.append(m_tablectrl);
            var supplistctrl = $("<table id='selSuppList_" + this._key + "'></table>");
            this._suppDialog.append(supplistctrl);

            this.ctrl.append(this.suppNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._suppDialog);

            m_btquerysupp.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btquerysupp.click(function () {
                bizcontrol.selectsupplier.fn._querySuppliers.call(thisObj, 1, thisObj.supplierList.pageNumber);
            });

            bizcontrol.selectsupplier.fn._key++;
        },

        /* 打开选择供应商的窗体 */
        _openSelSuppFrm: function () {

            var thisObj = this;

            bizcontrol.selectsupplier.fn._actionObj = thisObj;

            if (!this.selSuppFrm) {
                this.selSuppFrm = new uicontrol.dialog(this._suppDialog, mlm.C0577 + mlm.C1069, { width: 900, position: ["auto", 35] }, function () { bizcontrol.selectsupplier.fn._selectSupp.call(thisObj); });

                this.selSuppFrm.show();
                this.supplierList = new uicontrol.tableList("selSuppList_" + this._key,
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "Supplier_Id",
                                         selectModel: "1",
                                         height: 300,
                                         pageQueryHandler: bizcontrol.selectsupplier.fn._querySuppliers,
                                         columns: [{ display: mlm.C1069, name: "SuppName", width: 150, align: 'left', adjust: true, createCell: bizcontrol.selectsupplier.fn._constructSuppName },
                                                   { display: mlm.C0073, name: "S_ProdRemark", width: 220, align: 'left', adjust: true, createCell: commoncore.func.constructRemarkCell },
                                                   { display: mlm.C1166, name: "S_WebSite", width: 160, align: 'left' },
                                                   { display: mlm.C1168, name: "S_Address", width: 200, align: 'left', adjust: true, createCell: bizcontrol.selectsupplier.fn._constructAddressCell}]
                                     });
            }
            else {
                this.selSuppFrm.show();
            }

            this._txtSuppKey.val("");
            this.supplierList.bindDataSource(null);
        },
        /* 构造供应商名称列 */
        _constructSuppName: function (key, cellValue) {
            return "<a onclick='openViewSuppFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
        },
        /* 地址 */
        _constructAddressCell: function (key, cellvalue) {
            var m_obj = this.keyObj;

            if (cellvalue) {
                return m_obj.GlobalAreaName + "," + cellvalue;
            }
            else {
                return m_obj.GlobalAreaName;
            }
        },
        /* 获取查询条件 */
        _constructQueryCondition: function () {
            this.conditionObj = {};
            this.conditionObj.keyword = $.trim(this._txtSuppKey.val());
        },
        /* 查询供应商 */
        _querySuppliers: function (page, pagenum) {
            var thisObj = bizcontrol.selectsupplier.fn._actionObj;

            thisObj._constructQueryCondition();

            var m_supplier = new pom.supplier();
            m_supplier.KeyWord = thisObj.conditionObj.keyword;
            m_supplier.Page = page;
            m_supplier.PageNum = pagenum;

            m_supplier.querySuppliers(function (retTable) {
                thisObj.supplierList.bindDataSource(retTable);
            });
        },
        /* 选择供应商 */
        _selectSupp: function () {
            var m_selecteditems = this.supplierList.getSelectedItems();
            if (m_selecteditems.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1178);
                return;
            }

            this.SuppName = m_selecteditems.SuppName;
            this.Supplier_Id = m_selecteditems.Supplier_Id;

            if (this.event) {
                this.event(this.Supplier_Id);
            }

            this.suppNameTxt.val(m_selecteditems.SuppName);
            this.suppNameTxt.attr("tag", m_selecteditems.Supplier_Id);
            this.selSuppFrm.close();
        },
        /* 设置 */
        setSupplier: function (supplier) {
            this.SuppName = supplier.SuppName;
            this.Supplier_Id = supplier.Supplier_Id;
            this.suppNameTxt.val(supplier.SuppName);
            this.suppNameTxt.attr("tag", supplier.Supplier_Id);
        },
        /* 清除供应商 */
        clear: function () {
            this.Supplier_Id = null;
            this.SuppName = null;

            this.suppNameTxt.val("");
            this.suppNameTxt.attr("tag", null);
        },

        /* 输入供应商 */
        _inputSuppName: function () {
            var m_suppname = $.trim(this.suppNameTxt.val());

            if (m_suppname) {
                var m_supplier = new pom.supplier();
                m_supplier.KeyWord = m_suppname;
                m_supplier.Page = 1;
                m_supplier.PageNum = 1;

                var thisObj = this;
                m_supplier.querySuppliers(function (retTable) {
                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

                    if (m_jsonobjs.length > 0) {
                        thisObj.SuppName = m_jsonobjs[0].SuppName;
                        thisObj.Supplier_Id = m_jsonobjs[0].Supplier_Id;

                        thisObj.suppNameTxt.val(thisObj.SuppName);
                        thisObj.suppNameTxt.attr("tag", thisObj.Supplier_Id);
                    }
                    else {
                        thisObj.SuppName = "";
                        thisObj.Supplier_Id = "0";

                        thisObj.suppNameTxt.val("");
                        thisObj.suppNameTxt.attr("tag", "0");
                    }

                    if (thisObj.event) {
                        thisObj.event(thisObj.Supplier_Id);
                    }
                });
            }
            else {
                this.SuppName = "";
                this.Supplier_Id = "0";

                this.suppNameTxt.val("");
                this.suppNameTxt.attr("tag", "0");

                if (this.event) {
                    this.event(this.Supplier_Id);
                }
            }
        }
    };
    bizcontrol.selectsupplier.fn.init.prototype = bizcontrol.selectsupplier.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----仓库选择控件----- 
    */
    bizcontrol.selectwarehouse = function (ctrl, completedevent, datalayer) {
        var obj = new bizcontrol.selectwarehouse.fn.init(ctrl, completedevent, datalayer);
        return obj;
    };
    bizcontrol.selectwarehouse.fn = {

        /* 构造函数 */
        init: function (ctrl, completedevent, datalayer) {
            this.ctrl = ctrl;
            this.completedevent = completedevent;
            this.datalayer = datalayer;

            this.warehouseNameTxt = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");

            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });

            var thisObj = this;
            this.btSelect.click(function () { thisObj.openSelectFrm(); });
            this.warehouseNameTxt.change(function () { thisObj.inputWarehouseName($.trim($(this).val())); });

            this._warehouseDialog = $("<div style='display: none;'></div>");
            this._warehouseTree = $("<ul></ul>");

            this._warehouseDialog.append(this._warehouseTree);
            this.ctrl.append(this.warehouseNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._warehouseDialog);

            this.warehouseSource = null;
            this.warehouse_id = null;
            this.warehousename = null;
        },

        /* 打开仓库的选择窗体 */
        openSelectFrm: function () {

            var thisObj = this;
            if (!this.whDialog) {
                this.whDialog = new uicontrol.dialog(this._warehouseDialog, mlm.C0577 + mlm.C1196, { width: 910, height: 500, position: ["auto", 60] }, function () { thisObj.selectWarehouse(); });
            }

            if (!this.warehouseSource || !this.warehouseTree) {
                var m_warehouse = new whm.warehouse();
                m_warehouse.getAllWarehouses(function (source) {

                    if (thisObj.datalayer == 1) {
                        var m_arr = [];
                        var m_jsonobjs = datastruct.convertion.tableToJson(source);
                        $.each(m_jsonobjs, function () {
                            if (!this.ParentWarehouse_Id || this.ParentWarehouse_Id == "0") {
                                m_arr.push(this);
                            }
                        });

                        thisObj._bindSourceEvent(m_arr);
                    }
                    else {
                        var m_jsonobjs = datastruct.convertion.tableToJson(source);
                        thisObj._bindSourceEvent(m_jsonobjs);
                    }

                    thisObj.warehouseTree.selTvItem(thisObj.warehouse_id);
                });
            }
            else {
                this.warehouseTree.selTvItem(this.warehouse_id);
            }

            this.whDialog.show();
        },

        /* 选择仓库 */
        selectWarehouse: function () {

            var m_warehouse = this.warehouseTree.selectedItem;
            if (!m_warehouse) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1181);
                return;
            }

            this.warehouse_id = m_warehouse.key;
            this.warehousename = this._getFullName(m_warehouse.key);
            this.warehouse = m_warehouse.tag;

            this.warehouseNameTxt.val(this.warehousename);

            if (this.completedevent) {
                this.completedevent();
            }

            this.whDialog.close();
        },

        /* 输入商品分类名称 */
        inputWarehouseName: function (warehousename) {

            if (!warehousename) {
                this.clear();

                if (this.completedevent) {
                    this.completedevent();
                }

                return;
            }

            var thisObj = this;
            if (!this.warehousejson || !this.warehouseTree) {
                var m_warehouse = new whm.warehouse();
                m_warehouse.getAllWarehouses(function (source) {

                    thisObj.warehousejson = datastruct.convertion.tableToJson(source);
                    thisObj._bindSourceEvent(thisObj.warehousejson);

                    thisObj.warehouseTree.selTvItem(thisObj.warehouse_id);

                    thisObj._getWarehouse(warehousename);
                });
            }
            else {
                this._getWarehouse(warehousename);
            }

            if (this.completedevent) {
                this.completedevent();
            }
        },

        /* 绑定数据源事件 */
        _bindSourceEvent: function (source) {
            var m_this = this;
            this.warehouseTree = new uicontrol.treeView(this._warehouseTree, source, null,
                                                        { displayModel: "inline", sourceFormat: "json",
                                                            keyColumn: "Warehouse_Id", parentKeyColumn: "ParentWarehouse_Id", displayColumn: "WarehouseName",
                                                            dbClickEvent: function () { m_this.selectWarehouse(); }
                                                        });
            this.warehouseTree.loadSource();
        },

        /* 设置库存 */
        setWarehouse: function (warehouse) {
            this.warehouse_id = warehouse.Warehouse_Id;
            this.warehousename = warehouse.WarehouseName;
            this.warehouse = warehouse;
            this.warehouseNameTxt.val(warehouse.WarehouseName);
        },

        /* 初始化显示的文本 */
        initDisplayText: function (displayTxt) {
            this.clear();
            this.warehouseNameTxt.val(displayTxt);
        },

        /* 禁用 */
        disable: function () {
            this.warehouseNameTxt.attr("disabled", "disabled");
            this.btSelect.hide();
        },

        /* 禁用 */
        enable: function () {
            this.warehouseNameTxt.attr("disabled", false);
            this.btSelect.show();
        },

        /* 获取商品分类对象 */
        _getWarehouse: function (warehousename) {

            var m_thisObj = this;

            var m_warehouse = null;
            $.each(this.warehousejson, function () {

                if (m_thisObj.datalayer == 1) {
                    if (this.ParentWarehouse_Id && this.ParentWarehouse_Id != "0") {
                        return;
                    }
                }
                this.WarehouseName = m_thisObj._getFullName(this.Warehouse_Id);
                if (this.WarehouseName.toLowerCase().indexOf($.trim(warehousename).toLowerCase()) > -1) {
                    m_warehouse = this;
                    return false;
                }
            });

            if (!m_warehouse) {
                pageframe.control.alertDialog.showAlertInfo(warehousename + mlm.C1182);
                this.clear();
                return;
            }

            this.warehouse_id = m_warehouse.Warehouse_Id;
            this.warehousename = this._getFullName(m_warehouse.Warehouse_Id);
            this.warehouse = m_warehouse.tag;

            this.warehouseNameTxt.val(this.warehousename);
        },

        /* 获取库存完整路径 */
        _getFullName: function (warehouse_id) {

            var m_warehouse = this.warehouseTree.getItem(warehouse_id);

            var m_nameObj = { warehousename: m_warehouse.sourceItem.value };
            this._resecurFullName(m_warehouse.sourceItem.parentKey, m_nameObj);

            return m_nameObj.warehousename;

        },
        _resecurFullName: function (parentKey, fullNameObj, isbreak) {
            if (!isbreak && parentKey && parentKey > 0) {
                var m_parentWH = this.warehouseTree.getItem(parentKey);
                fullNameObj.warehousename = m_parentWH.sourceItem.value + "-" + fullNameObj.warehousename;

                this._resecurFullName(m_parentWH.sourceItem.parentKey, fullNameObj, true);
            }
        },

        /* 清除控件值 */
        clear: function () {
            this.warehouse_id = null;
            this.warehousename = null;
            this.warehouse = null;
            this.warehouseNameTxt.val("");

            if (this.warehouseTree) {
                this.warehouseTree.selectedItem = null;
            }
        }
    };
    bizcontrol.selectwarehouse.fn.init.prototype = bizcontrol.selectwarehouse.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----客户查看控件----- 
    */
    bizcontrol.viewcustomer = function () {
        var obj = new bizcontrol.viewcustomer.fn.init();
        return obj;
    };
    bizcontrol.viewcustomer.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewCustomerFrm' style='display: none;'></div>");

            var m_tabs = $("<div id='view_customerTabs'></div>");
            m_tabs.append("<ul><li><a href='#view_custInfo'>" + mlm.C0781 + "</a></li><li><a href='#view_rvaddress'>" + mlm.C1222 + "</a></li></ul>");

            var m_customerContainer = $("<div id='view_custInfo'></div>");
            var m_rvaddressContainer = $("<div id='view_rvaddress'></div>");

            var m_tableContainer = $("<div class='submitForm form-width-d'></div>");

            var m_tr_1 = $("<div class='submitForm-tr first-item'></div>");
            var m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0364 + ":</span>");
            /* 客户名称 */
            this.m_custNameCtrl = $("<span></span>");
            m_td_1.append(this.m_custNameCtrl);
            m_tr_1.append(m_td_1);
            var m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C0358 + ":</span>");
            /* 客户群 */
            this.m_custgroupCtrl = $("<span></span>");
            m_td_2.append(this.m_custgroupCtrl);
            m_tr_1.append(m_td_2);

            var m_tr_2 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0310 + ":</span>");
            /* 邮箱 */
            this.m_emailCtrl = $("<span></span>");
            m_td_1.append(this.m_emailCtrl);
            m_tr_2.append(m_td_1);
            m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C0311 + ":</span>");
            /* 联系电话 */
            this.m_telCtrl = $("<span></span>");
            m_td_2.append(this.m_telCtrl);
            m_tr_2.append(m_td_2);

            var m_tr_3 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C1223 + ":</span>");
            /* 所属国家 */
            this.m_countryCtrl = $("<span></span>");
            m_td_1.append(this.m_countryCtrl);
            m_tr_3.append(m_td_1);
            m_td_2 = $("<span class='left-cell'></div>");
            m_td_2.append("<span class='title'>" + mlm.C1224 + ":</span>");
            /* 注册站点 */
            this.m_shopsiteCtrl = $("<span></span>");
            m_td_2.append(this.m_shopsiteCtrl);
            m_tr_3.append(m_td_2);

            var m_tr_4 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0312 + ":</span>");
            /* 其他联系方式 */
            this.m_contractinfoCtrl = $("<span style='display: inline-block; width: 650px'></span>");
            m_td_1.append(this.m_contractinfoCtrl);
            m_tr_4.append(m_td_1);

            var m_tr_5 = $("<div class='submitForm-tr last-item'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0073 + ":</span>");
            /* 备注 */
            this.m_remarkCtrl = $("<span style='display: inline-block; width: 650px'></span>");
            m_td_1.append(this.m_remarkCtrl);
            m_tr_5.append(m_td_1);

            m_tableContainer.append(m_tr_1);
            m_tableContainer.append(m_tr_2);
            m_tableContainer.append(m_tr_3);
            m_tableContainer.append(m_tr_4);
            m_tableContainer.append(m_tr_5);

            m_customerContainer.append(m_tableContainer);
            m_tabs.append(m_customerContainer);

            var m_rvaddresstableCtrl = $("<div class='submitForm form-width-d'></div>");
            var m_rvaddresstr = $("<div class='submitForm-tr first-item last-item'></div>");
            m_rvaddresstr.append("<div style='height: 30px'><span class='lb-title list-title'>" + mlm.C1225 + mlm.C0463 + "</span></div>");
            this.m_rvaddressTable = $("<table id='view_RvAddressList'></table>");
            m_rvaddresstr.append(this.m_rvaddressTable);
            m_rvaddresstableCtrl.append(m_rvaddresstr);
            m_rvaddressContainer.append(m_rvaddresstableCtrl);
            m_tabs.append(m_rvaddressContainer);
            this.ctrl.append(m_tabs);
        },

        /* 展示客户 */
        show: function (customer_id) {
            var thisObj = this;
            if (!this.viewCustomerFrm) {
                this.viewCustomerFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C0719, { width: 1125, position: ["auto", 50] });

                this.customerTabs = $("#view_customerTabs").tabs({ show: function (event, ui) { bizcontrol.viewcustomer.fn._showCustTab.call(thisObj, event, ui); } });
            }

            var m_customer = new cm.customer();
            m_customer.Customer_Id = customer_id;
            m_customer.readCustomer(function (obj) {

                thisObj.customer = obj;
                thisObj.m_custNameCtrl.text(obj.CustName);
                thisObj.m_custgroupCtrl.text(obj.OtherProps.CustomerGroupName);
                thisObj.m_emailCtrl.text(obj.Email);
                thisObj.m_telCtrl.text(obj.Tel);
                thisObj.m_countryCtrl.text(obj.OtherProps.GlobalAreaName);
                thisObj.m_shopsiteCtrl.text(obj.OtherProps.SPfName);
                thisObj.m_contractinfoCtrl.text(obj.ContactInfo);
                thisObj.m_remarkCtrl.text(obj.Remark);

                $.each(thisObj.customer.RvAddresses, function () {
                    this.GlobalAreaName = this.OtherProps.GlobalAreaName;
                });

                if (thisObj.actionCustTab == "rvaddress") {
                    thisObj.rvaddressList.bindDataSource(thisObj.customer.RvAddresses);
                }

                thisObj.viewCustomerFrm.show();
            });
        },

        /* 展示客户Tab */
        _showCustTab: function (event, ui) {
            if (ui.index == 1) {
                this.actionCustTab = "rvaddress";

                if (!this.rvaddressList) {
                    this.rvaddressList = new uicontrol.tableList("view_RvAddressList",
                                     { autoSeq: true,
                                         keyColumn: "Customer_RvAddress_Id",
                                         height: 300,
                                         columns: [{ display: mlm.C1226, name: "RvFullName", width: 150, align: 'left', adjust: true, createCell: bizcontrol.viewcustomer.fn._constructAddrCell },
                                                   { display: mlm.C0240, name: "GlobalAreaName", width: 100, align: 'left' },
                                                   { display: mlm.C1227, name: "RvProvince", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewcustomer.fn._constructAddrCell },
                                                   { display: mlm.C0460, name: "RvCity", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewcustomer.fn._constructAddrCell },
                                                   { display: mlm.C1229, name: "", width: 220, align: 'left', adjust: true, createCell: bizcontrol.viewcustomer.fn._constructRvAddressCell },
                                                   { display: mlm.C1228, name: "RvPostCode", width: 100, align: 'left' },
                                                   { display: mlm.C0311, name: "RvTel", width: 100, align: 'left'}]
                                     });
                }

                this.rvaddressList.bindDataSource(this.customer.RvAddresses);
            }
            else {
                this.actionCustTab = "customer";
            }
        },

        /* */
        _constructAddrCell: function (key, cellValue) {
            return commoncore.func.showSpecialChar(cellValue);
        },
        /* 构建收货地址列 */
        _constructRvAddressCell: function (key, cellValue) {
            var m_arr = [];
            if (this.keyObj.RvAddress_2) {
                m_arr.push(this.keyObj.RvAddress_1 + " " + this.keyObj.RvAddress_2);
            }
            else {
                m_arr.push(this.keyObj.RvAddress_1);
            }

            return commoncore.func.showSpecialChar(m_arr.join(","));
        }
    };

    bizcontrol.viewcustomer.fn.init.prototype = bizcontrol.viewcustomer.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----客户选择控件----- 
    */
    bizcontrol.selectcustomer = function (ctrl, filladdressEvent) {
        var obj = new bizcontrol.selectcustomer.fn.init(ctrl, filladdressEvent);
        return obj;
    };
    bizcontrol.selectcustomer.fn = {
        /* ID识别码 */
        _key: 1,

        _activedobj: null,

        /* 构造函数 */
        init: function (ctrl, filladdressEvent) {

            var thisObj = this;
            this._key = bizcontrol.selectcustomer.fn._key;
            this.ctrl = ctrl;
            this.filladdressEvent = filladdressEvent;
            this.custNameTxt = $("<input type='text' class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            this.btSelect.click(function () { thisObj._openSelCustFrm(); });
            this.custNameTxt.change(function () { thisObj._inputCustName(); });

            this._custDialog = $("<div id='selCustFrm_" + this._key + "' style='display: none;'></div>");
            var m_tablectrl = $("<div class='submitForm form-width-a' style='border-bottom-width: 0px; width: 878px'></div>");
            var m_tr = $("<div class='submitForm-tr first-item last-item'></div>");
            var m_toolctrl = $("<div style='height: 30px'></div>");
            this._txtCustKey = $("<input type='text' class='text-long-input' onkeypress='uicontrol.func.checkInput(event);' />");
            m_toolctrl.append(this._txtCustKey);
            var m_btquerycust = $("<input type='button' class='normal-bt' value='" + mlm.C0562 + "' />");
            m_toolctrl.append(m_btquerycust);
            m_tr.append(m_toolctrl);
            m_tablectrl.append(m_tr);
            this._custDialog.append(m_tablectrl);
            var custlistctrl = $("<table id='selCustList_" + this._key + "'></table>");
            this._custDialog.append(custlistctrl);

            this.ctrl.append(this.custNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._custDialog);

            m_btquerycust.hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            m_btquerycust.click(function () {
                thisObj._constructQueryCondition();

                bizcontrol.selectcustomer.fn._queryCustomers.call(thisObj, 1, thisObj.custList.pageNumber);
            });

            bizcontrol.selectcustomer.fn._key++;
        },

        /* 打开选择供应商的窗体 */
        _openSelCustFrm: function () {

            var thisObj = this;

            bizcontrol.selectcustomer.fn._activedobj = this;

            if (!this.selCustFrm) {
                this.selCustFrm = new uicontrol.dialog(this._custDialog, mlm.C0577 + mlm.C0719, { width: 900, position: ["auto", 35] }, function () { bizcontrol.selectcustomer.fn._selectCust.call(thisObj); });

                this.selCustFrm.show();
                this.custList = new uicontrol.tableList("selCustList_" + this._key,
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "Customer_Id",
                                         selectModel: "1",
                                         height: 300,
                                         pageQueryHandler: bizcontrol.selectcustomer.fn._queryCustomers,
                                         columns: [{ display: mlm.C0719, name: "CustName", width: 170, align: 'left', adjust: true, createCell: bizcontrol.selectcustomer.fn._constructCustName },
                                                   { display: mlm.C0240, name: "GlobalAreaName", width: 150, align: 'left' },
                                                   { display: mlm.C0310, name: "Email", width: 200, align: 'left' },
                                                   { display: mlm.C1224, name: "SPfName", width: 100, align: 'left' },
                                                   { display: mlm.C0358, name: "CustomerGroupName", width: 100, align: 'left'}]
                                     });
            }
            else {
                this.selCustFrm.show();
            }

            this._txtCustKey.val("");

            if (!this.Customer_Id || this.Customer_Id == 0) {
                this.custList.bindDataSource(null);
            }
            else {
                var thisObj = this;
                var m_customer = new cm.customer();
                m_customer.Customer_Id = this.Customer_Id;
                m_customer.Page = 1;
                m_customer.PageNum = 1;

                m_customer.queryCustomers(function (retTable) {
                    thisObj.custList.bindDataSource(retTable);

                    var m_selectedcust = new datastruct.dictionary();
                    m_selectedcust.setItem(m_customer.Customer_Id);
                    thisObj.custList.setSelectedItems(m_selectedcust);
                });
            }
        },
        /* 构造客户名称列 */
        _constructCustName: function (key, cellValue) {
            return "<a onclick='openViewCustFrm.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
        },
        /* 获取查询条件 */
        _constructQueryCondition: function () {
            this.conditionObj = {};
            this.conditionObj.keyword = $.trim(this._txtCustKey.val());
        },
        /* 查询客户 */
        _queryCustomers: function (page, pagenum) {

            var thisObj = bizcontrol.selectcustomer.fn._activedobj;
            var m_customer = new cm.customer();
            m_customer.Keywords = thisObj.conditionObj.keyword;
            m_customer.Page = page;
            m_customer.PageNum = pagenum;

            m_customer.queryCustomers(function (retTable) {
                thisObj.custList.bindDataSource(retTable);
            });
        },
        /* 选择客户 */
        _selectCust: function () {
            var m_selecteditems = this.custList.getSelectedItems();
            if (m_selecteditems.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1244);
                return;
            }

            this.CustName = m_selecteditems.CustName;
            this.Customer_Id = m_selecteditems.Customer_Id;
            this.Customer = m_selecteditems;

            this.custNameTxt.val(m_selecteditems.CustName);
            this.custNameTxt.attr("tag", m_selecteditems.Customer_Id);

            if (this.filladdressEvent) {
                this.filladdressEvent(this.Customer_Id);
            }

            this.selCustFrm.close();
        },
        /* 输入客户 */
        _inputCustName: function () {
            var m_custname = $.trim(this.custNameTxt.val());

            if (m_custname) {
                var m_customer = new cm.customer();
                m_customer.Keywords = m_custname;
                m_customer.Page = 1;
                m_customer.PageNum = 1;

                var thisObj = this;
                m_customer.queryCustomers(function (retTable) {
                    var m_jsonobjs = datastruct.convertion.tableToJson(retTable);

                    if (m_jsonobjs.length > 0) {
                        thisObj.CustName = m_jsonobjs[0].CustName;
                        thisObj.Customer_Id = m_jsonobjs[0].Customer_Id;

                        thisObj.custNameTxt.val(thisObj.CustName);
                        thisObj.custNameTxt.attr("tag", thisObj.Customer_Id);
                    }
                    else {
                        thisObj.CustName = "";
                        thisObj.Customer_Id = "0";

                        thisObj.custNameTxt.val("");
                        thisObj.custNameTxt.attr("tag", "0");
                    }

                    if (thisObj.filladdressEvent) {
                        thisObj.filladdressEvent(thisObj.Customer_Id);
                    }
                });
            }
            else {
                this.CustName = "";
                this.Customer_Id = "0";

                this.custNameTxt.val("");
                this.custNameTxt.attr("tag", "0");

                if (this.filladdressEvent) {
                    this.filladdressEvent(this.Customer_Id);
                }
            }
        },
        /* 设置客户 */
        setCust: function (customer) {
            if (customer) {
                this.CustName = customer.CustName;
                this.Customer_Id = customer.Customer_Id;

                this.custNameTxt.val(customer.CustName);
                this.custNameTxt.attr("tag", customer.Customer_Id);
            }
            else {

                this.CustName = null;
                this.Customer_Id = null;

                this.custNameTxt.val("");
                this.custNameTxt.attr("tag", "");
            }
        }
    };
    bizcontrol.selectcustomer.fn.init.prototype = bizcontrol.selectcustomer.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----配送服务选择控件----- 
    */
    bizcontrol.selectexpservice = function (ctrl, preCheckEvent, getCondEvent, fillExpServiceEvent) {
        var obj = new bizcontrol.selectexpservice.fn.init(ctrl, preCheckEvent, getCondEvent, fillExpServiceEvent);
        return obj;
    };
    bizcontrol.selectexpservice.fn = {
        /* ID识别码 */
        _key: 1,

        /* 构造函数 */
        init: function (ctrl, preCheckEvent, getCondEvent, fillExpServiceEvent) {

            var thisObj = this;
            this._key = bizcontrol.selectexpservice.fn._key;
            this.ctrl = ctrl;
            this.fillExpServiceEvent = fillExpServiceEvent;
            this.preCheckEvent = preCheckEvent;
            this.getCondEvent = getCondEvent;
            this.expserviceNameTxt = $("<input type='text' disabled='disabled'  class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            this.btSelect.click(function () { thisObj._openSelExpServiceFrm(); });

            this._expserviceDialog = $("<div id='selExpServiceFrm_" + this._key + "' style='display: none;'></div>");
            var expservicelistctrl = $("<table id='selExpServiceList_" + this._key + "'></table>");
            this._expserviceDialog.append(expservicelistctrl);

            this.ctrl.append(this.expserviceNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._expserviceDialog);

            bizcontrol.selectexpservice.fn._key++;
        },

        /* 打开选择配送服务的窗体 */
        _openSelExpServiceFrm: function () {

            var _continue = true;
            if (this.preCheckEvent) {
                _continue = this.preCheckEvent();
            }

            if (!_continue) {
                return;
            }

            var thisObj = this;

            if (!this.selExpServiceFrm) {
                this.selExpServiceFrm = new uicontrol.dialog(this._expserviceDialog, mlm.C0577 + mlm.C0436, { width: 900, position: ["auto", 35] }, function () { bizcontrol.selectexpservice.fn._selectExpService.call(thisObj); });

                this.selExpServiceFrm.show();
                this.expserviceList = new uicontrol.tableList("selExpServiceList_" + this._key,
                                     { autoSeq: true,
                                         keyColumn: "ExpressService_Id",
                                         selectModel: "1",
                                         height: 300,
                                         columns: [{ display: mlm.C0436, name: "ExpressServiceName", width: 300, align: 'left', adjust: true, createCell: bizcontrol.selectexpservice.fn._constructExpServiceName },
                                                   { display: mlm.C0786, name: "ESType", width: 80, align: 'left', adjust: true, createCell: bizcontrol.selectexpservice.fn._constructESTypeCell },
                                                   { display: mlm.C1101, name: "ExpCharge", width: 100, align: 'right', adjust: true, createCell: bizcontrol.selectexpservice.fn._constructExpCharge },
                                                   { display: mlm.C0441, name: "", width: 120, align: 'right', adjust: true, createCell: bizcontrol.selectexpservice.fn._constructAvaiTime },
                                                   { display: mlm.C0810, name: "IsTrack", width: 80, align: 'center', adjust: true, createCell: bizcontrol.selectexpservice.fn._constructTrackWebCell}]
                                     });
            }
            else {
                this.selExpServiceFrm.show();
            }

            this._queryExpServices();
        },
        _constructExpServiceName: function (key, cellValue) {
            var m_arr = [];

            var m_obj = this.keyObj;
            m_arr.push("<a onclick='openViewExpressServiceFrm.call(this, \"" + m_obj.ExpressService_Id + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>");

            if (m_obj.WarehouseName) {
                m_arr.push("<div style='padding: 0px' class='lb-symbol'>(" + m_obj.WarehouseName + ")</div>");
            }

            return m_arr.join("");
        },
        _constructESTypeCell: function (key, cellValue) {
            if (cellValue == "1") {
                return mlm.C1014;
            }
            else if (cellValue == "2") {
                return mlm.C1015;
            }
            else {
                return mlm.C1016;
            }
        },
        _constructExpCharge: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
        },
        _constructAvaiTime: function (key, cellValue) {
            var m_obj = this.keyObj;
            if (m_obj.MinDeliveryTime) {
                return m_obj.MinDeliveryTime + "-" + m_obj.MaxDeliveryTime + mlm.C0984;
            }
        },
        _constructTrackWebCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                return mlm.C0811;
            }
        },
        /* 查询配送服务 */
        _queryExpServices: function () {

            var m_condObj = this.getCondEvent();

            var thisObj = this;
            var m_expservice = new sm.expressservice();
            m_expservice.SS_Product_Ids = m_condObj.SS_Product_Ids;
            m_expservice.ProdQtys = m_condObj.ProdQtys;
            m_expservice.Weight = m_condObj.Weight;
            m_expservice.GlobalArea_Id = m_condObj.GlobalArea_Id;
            m_expservice.SaleSite_Id = m_condObj.SaleSite_Id;
            m_expservice.Province = m_condObj.Province;
            m_expservice.City = m_condObj.City;

            m_expservice.getExpServicePrice(function (retTable) {
                thisObj.expserviceList.bindDataSource(retTable);

                var m_selecteddict = new datastruct.dictionary();
                m_selecteddict.setItem(thisObj.ExpressService_Id);
                thisObj.expserviceList.setSelectedItems(m_selecteddict);
            });
        },
        /* 选择客户 */
        _selectExpService: function () {
            var m_selecteditems = this.expserviceList.getSelectedItems();
            if (m_selecteditems.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1243);
                return;
            }

            this.ExpressServiceName = m_selecteditems.ExpressServiceName;
            this.ExpressService_Id = m_selecteditems.ExpressService_Id;
            this.ExpressService = m_selecteditems;

            this.expserviceNameTxt.val(m_selecteditems.ExpressServiceName);
            this.expserviceNameTxt.attr("tag", m_selecteditems.ExpressService_Id);

            if (this.fillExpServiceEvent) {
                this.fillExpServiceEvent(m_selecteditems);
            }

            this.selExpServiceFrm.close();
        },
        /* 设置配送服务 */
        setExpService: function (expservice) {
            if (expservice) {
                this.ExpressServiceName = expservice.ExpressServiceName;
                this.ExpressService_Id = expservice.ExpressService_Id;

                this.expserviceNameTxt.val(expservice.ExpressServiceName);
                this.expserviceNameTxt.attr("tag", expservice.ExpressService_Id);
            }
            else {

                this.ExpressServiceName = null;
                this.ExpressService_Id = null;

                this.expserviceNameTxt.val("");
                this.expserviceNameTxt.attr("tag", "");
            }
        }
    };
    bizcontrol.selectexpservice.fn.init.prototype = bizcontrol.selectexpservice.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----配送服务选择控件----- 
    */
    bizcontrol.selectsolstsolution = function (ctrl, preCheckEvent, getCondEvent, fillSolutionEvent) {
        var obj = new bizcontrol.selectsolstsolution.fn.init(ctrl, preCheckEvent, getCondEvent, fillSolutionEvent);
        return obj;
    };
    bizcontrol.selectsolstsolution.fn = {
        /* ID识别码 */
        _key: 1,

        /* 当前活动对象 */
        _actionObj: null,

        /* 构造函数 */
        init: function (ctrl, preCheckEvent, getCondEvent, fillSolutionEvent) {

            var thisObj = this;
            this._key = bizcontrol.selectsolstsolution.fn._key;
            this.ctrl = ctrl;
            this.fillSolutionEvent = fillSolutionEvent;
            this.preCheckEvent = preCheckEvent;
            this.getCondEvent = getCondEvent;
            this.lstSolutionNameTxt = $("<input type='text' disabled='disabled'  class='text-input' onkeypress='uicontrol.func.checkInput(event);' />");
            this.btSelect = $("<img class='bt' src='/BZM/Css/Images/magnifier.png' />");
            this.btSelect.hover(function () { $(this).addClass("hover-bt"); }, function () { $(this).removeClass("hover-bt"); });
            this.btSelect.click(function () { thisObj._openSelLstSolutionFrm(); });

            this._lstsolutionDialog = $("<div id='selLstSolutionFrm_" + this._key + "' style='display: none;'></div>");
            var lstsolutionlistctrl = $("<table id='selLstSolutionList_" + this._key + "'></table>");
            this._lstsolutionDialog.append(lstsolutionlistctrl);

            this.ctrl.append(this.lstSolutionNameTxt);
            this.ctrl.append(this.btSelect);
            $(document).append(this._lstsolutionDialog);

            bizcontrol.selectsolstsolution.fn._key++;
        },

        /* 打开选择物流解决方案的窗体 */
        _openSelLstSolutionFrm: function () {

            var _continue = true;
            if (this.preCheckEvent) {
                _continue = this.preCheckEvent();
            }

            if (!_continue) {
                return;
            }

            var thisObj = this;
            bizcontrol.selectsolstsolution.fn._actionObj = this;

            if (!this.selLstSolutionFrm) {
                this.selLstSolutionFrm = new uicontrol.dialog(this._lstsolutionDialog, mlm.C0577 + mlm.M0053, { width: 1000, position: ["auto", 35] }, function () { bizcontrol.selectsolstsolution.fn._selectLstSolution.call(thisObj); });

                this.selLstSolutionFrm.show();
                this.lstsolutionList = new uicontrol.tableList("selLstSolutionList_" + this._key,
                                     { autoSeq: true,
                                         isPaging: true,
                                         keyColumn: "LstSolution_Id",
                                         selectModel: "1",
                                         height: 300,
                                         pageQueryHandler: bizcontrol.selectsolstsolution.fn._queryLstSolution,
                                         columns: [{ display: mlm.M0053, name: "LstSolutionName", width: 180, align: 'left', adjust: true, createCell: bizcontrol.selectsolstsolution.fn._constructExpServiceName },
                                                   { display: mlm.C0806, name: "Weight", width: 70, align: 'right', adjust: true, createCell: bizcontrol.selectsolstsolution.fn._constructExpWeight },
                                                   { display: mlm.C0807, name: "TotalCharge", width: 240, align: 'right', adjust: true, createCell: bizcontrol.selectsolstsolution.fn._constructExpCost },
                                                   { display: mlm.C0799, name: "", width: 100, align: 'left', adjust: true, createCell: bizcontrol.selectsolstsolution.fn._constructAvaiTime },
                                                   { display: mlm.C0810, name: "TrackWebAddress", width: 60, align: 'center', adjust: true, createCell: bizcontrol.selectsolstsolution.fn._constructTrackWebCell },
                                                   { display: mlm.C1266, name: "WarehouseNames", width: 160, align: 'left'}]
                                     });
            }
            else {
                this.selLstSolutionFrm.show();
            }

            this._queryLstSolution(1, this.lstsolutionList.pageNumber);
        },
        _constructExpServiceName: function (key, cellValue) {
            return "<a onclick='openViewLstSolution.call(this, \"" + key + "\")' href='javascript:void(\"0\");' class='ss-opera-a'>" + cellValue + "</a>";
        },
        _constructESTypeCell: function (key, cellValue) {
            if (cellValue == "1") {
                return mlm.C1014;
            }
            else if (cellValue == "2") {
                return mlm.C1015;
            }
            else {
                return mlm.C1016;
            }
        },
        _constructExpWeight: function (key, cellValue) {
            return Number(cellValue).toFixed(3) + " " + bizcontrol.selectsolstsolution.fn._actionObj.WUnit;
        },
        _constructExpCost: function (key, cellValue) {

            var m_obj = this.keyObj;

            var m_arr = [];
            var m_currsymbol = bizcontrol.selectsolstsolution.fn._actionObj.CurrSymbol;
            m_arr.push(commoncore.func.getCurrHtml(m_currsymbol, m_obj.TotalCharge));

            if (Number(m_obj.VATCharge) > 0) {
                m_arr.push(commoncore.func.getCurrHtml(m_currsymbol, m_obj.VATCharge) + "(" + mlm.C0988 + ")");
            }

            if (Number(bizcontrol.selectsolstsolution.fn._actionObj.Tax) > Number(m_obj.TaxLimit)) {
                m_arr.push(mlm.C0995);
            }

            if (m_arr.length > 0) {
                return m_arr.join("+");
            }
        },
        _constructAvaiTime: function (key, cellValue) {
            var m_obj = this.keyObj;
            if (m_obj.MinAvaiTime) {
                return m_obj.MinAvaiTime + "-" + m_obj.MaxAvaiTime + mlm.C0984;
            }
        },
        _constructTrackWebCell: function (key, cellvalue) {
            if ($.trim(cellvalue)) {
                return mlm.C0811;
            }
        },
        /* 查询物流解决方案 */
        _queryLstSolution: function (page, pagenum) {

            var m_condObj = bizcontrol.selectsolstsolution.fn._actionObj.getCondEvent();

            var thisObj = bizcontrol.selectsolstsolution.fn._actionObj;
            var m_lstsolution = new lstm.lstsolution();
            m_lstsolution.SalePlatform_Id = m_condObj.SalePlatform_Id;
            m_lstsolution.Weight = m_condObj.Weight;
            m_lstsolution.SysWeightUnit_Id = m_condObj.SysWeightUnit_Id;
            m_lstsolution.Length = m_condObj.Length;
            m_lstsolution.Width = m_condObj.Width;
            m_lstsolution.Height = m_condObj.Height;
            m_lstsolution.Tax = m_condObj.Tax;
            m_lstsolution.TaxSysCurrency_Id = m_condObj.TaxSysCurrency_Id;
            m_lstsolution.SysCurrency_Id = m_condObj.SysCurrency_Id;
            m_lstsolution.GlobalAreaIds = m_condObj.GlobalAreaIds;
            m_lstsolution.Province = m_condObj.Province;
            m_lstsolution.City = m_condObj.City;
            m_lstsolution.LstSolutionIds = m_condObj.LstSolutionIds;
            m_lstsolution.Warehouse_Id = m_condObj.Warehouse_Id;
            m_lstsolution.Page = page;
            m_lstsolution.PageNum = pagenum;

            this.WUnit = m_condObj.WUnit;
            this.CurrSymbol = m_condObj.CurrSymbol;
            this.Tax = m_condObj.Tax;

            m_lstsolution.queryLstCharge(function (retTable) {
                thisObj.lstsolutionList.bindDataSource(retTable);

                var m_selecteddict = new datastruct.dictionary();
                m_selecteddict.setItem(thisObj.LstSolution_Id);
                thisObj.lstsolutionList.setSelectedItems(m_selecteddict);
            });
        },
        /* 选择解决方案 */
        _selectLstSolution: function () {
            var m_selecteditems = this.lstsolutionList.getSelectedItems();
            if (m_selecteditems.length == 0) {
                pageframe.control.alertDialog.showAlertInfo(mlm.C1142);
                return;
            }

            this.LstSolutionName = m_selecteditems.LstSolutionName;
            this.LstSolution_Id = m_selecteditems.LstSolution_Id;
            this.LstSolution = m_selecteditems;

            this.lstSolutionNameTxt.val(m_selecteditems.LstSolutionName);
            this.lstSolutionNameTxt.attr("tag", m_selecteditems.LstSolution_Id);

            if (this.fillSolutionEvent) {
                this.fillSolutionEvent(m_selecteditems);
            }

            this.selLstSolutionFrm.close();
        },
        /* 设置解决方案 */
        setLstSolution: function (lstsolution) {
            if (lstsolution) {
                this.LstSolutionName = lstsolution.LstSolutionName;
                this.LstSolution_Id = lstsolution.LstSolution_Id;
                this.LstSolution = lstsolution;

                this.lstSolutionNameTxt.val(lstsolution.LstSolutionName);
                this.lstSolutionNameTxt.attr("tag", lstsolution.LstSolution_Id);
            }
            else {

                this.LstSolutionName = null;
                this.LstSolution_Id = null;
                this.LstSolution = null;

                this.lstSolutionNameTxt.val("");
                this.lstSolutionNameTxt.attr("tag", "");
            }
        }
    };
    bizcontrol.selectsolstsolution.fn.init.prototype = bizcontrol.selectsolstsolution.fn;
    /*-------------------------------*/

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----应收账单查看控件----- 
    */
    bizcontrol.viewaccountinrecord = function () {
        var obj = new bizcontrol.viewaccountinrecord.fn.init();
        return obj;
    };
    bizcontrol.viewaccountinrecord.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div style='display: none;'></div>");

            var m_tableContainer = $("<div class='submitForm form-width-d'></div>");

            var m_tr_1 = $("<div class='submitForm-tr first-item'></div>");
            var m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0751 + ":</span>");
            /* 账单号 */
            this.m_arcodeCtrl = $("<span></span>");
            m_td_1.append(this.m_arcodeCtrl);
            m_tr_1.append(m_td_1);
            var m_td_2 = $("<span></div>");
            m_td_2.append("<span class='title'>" + mlm.C0750 + ":</span>");
            /* 账单日期 */
            this.m_arcreatetimeCtrl = $("<span></span>");
            m_td_2.append(this.m_arcreatetimeCtrl);
            m_tr_1.append(m_td_2);

            var m_tr_2 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0503 + ":</span>");
            /* 账目类别 */
            this.m_rsubjecttypeCtrl = $("<span></span>");
            m_td_1.append(this.m_rsubjecttypeCtrl);
            m_tr_2.append(m_td_1);
            this.dvSaleSiteCtrl = $("<span></div>");
            this.dvSaleSiteCtrl.append("<span class='title'>" + mlm.C0496 + ":</span>");
            /* 站点 */
            this.m_salesiteCtrl = $("<span></span>");
            this.dvSaleSiteCtrl.append(this.m_salesiteCtrl);
            m_tr_2.append(this.dvSaleSiteCtrl);

            var m_tr_3 = $("<div class='submitForm-tr first-item'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0675 + ":</span>");
            /* 交易对方 */
            this.m_rvobjectCtrl = $("<span></span>");
            m_td_1.append(this.m_rvobjectCtrl);
            m_tr_3.append(m_td_1);
            m_td_2 = $("<span></div>");
            m_td_2.append("<span class='title'>" + mlm.C0749 + ":</span>");
            /* 账目总金额 */
            this.m_receiveCtrl = $("<span></span>");
            m_td_2.append(this.m_receiveCtrl);
            m_tr_3.append(m_td_2);

            var m_tr_4 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0676 + ":</span>");
            /* 业务内容 */
            this.m_ribizcontentCtrl = $("<span style='display: inline-block; width: 850px'></span>");
            m_td_1.append(this.m_ribizcontentCtrl);
            m_tr_4.append(m_td_1);

            var m_tr_5 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0073 + ":</span>");
            /* 备注 */
            this.m_remarkCtrl = $("<span style='display: inline-block; width: 850px'></span>");
            m_td_1.append(this.m_remarkCtrl);
            m_tr_5.append(m_td_1);

            var m_tr_6 = $("<div class='submitForm-tr last-item'></div>");
            var m_rvcontainer = $("<div style='height: 195px;'></div>");
            var m_titlecontainer = $("<div style='height: 30px'></div>");
            m_titlecontainer.append("<span class='lb-title list-title'>" + mlm.C0533 + "</span>");
            this.m_remainreceiveCtrl = $("<span class='lb-title list-title' style='margin: 0px 0px 0px 5px'></span>");
            m_titlecontainer.append(this.m_remainreceiveCtrl);
            m_rvcontainer.append(m_titlecontainer);
            this.m_fundReceiveTable = $("<table id='view_fundReceiveList'></table>");
            m_rvcontainer.append(this.m_fundReceiveTable);
            m_tr_6.append(m_rvcontainer);

            m_tableContainer.append(m_tr_1);
            m_tableContainer.append(m_tr_2);
            m_tableContainer.append(m_tr_3);
            m_tableContainer.append(m_tr_4);
            m_tableContainer.append(m_tr_5);
            m_tableContainer.append(m_tr_6);

            this.ctrl.append(m_tableContainer);
        },

        /* 展示账单 */
        show: function (key) {
            if (!this.viewReceiveInFrm) {
                this.viewReceiveInFrm = new uicontrol.dialog(this.ctrl, mlm.C0763, { width: 1100, position: ["auto", 5] });

                this.viewReceiveInFrm.show();
                this.fundReceiveList = new uicontrol.tableList("view_fundReceiveList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 100,
                                         keyColumn: "FundFlowRecord_Id",
                                         columns: [{ display: mlm.C0518, name: "PRFund", width: 125, align: 'right', adjust: true, createCell: bizcontrol.viewaccountinrecord.fn._constructPRFundForReceiveCell },
                                                   { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                   { display: mlm.C0555, name: "FlowFund", width: 125, align: 'right', adjust: true, createCell: bizcontrol.viewaccountinrecord.fn._constructFundForReceiveCell },
                                                   { display: mlm.C0536, name: "LosedFund", width: 100, align: 'right', adjust: true, createCell: bizcontrol.viewaccountinrecord.fn._constructFundForReceiveCell },
                                                   { display: mlm.C0517, name: "Rate", width: 60, align: 'right' },
                                                   { display: mlm.C0861, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewaccountinrecord.fn._constructDateCell },
                                                   { display: mlm.C0367, name: "State", width: 60, align: 'left', adjust: true, createCell: bizcontrol.viewaccountinrecord.fn._constructFundReceiveStateCell}]
                                     });
            }

            var m_this = this;

            var m_accountinrecord = new fm.accountinrecord();
            m_accountinrecord.AccountInRecord_Id = key;
            m_accountinrecord.readAccountInRecord(function (retObj) {

                m_this.m_arcodeCtrl.text(retObj.AIRCode);
                m_this.m_arcreatetimeCtrl.text(commoncore.func.getTimeStrCell(retObj.OtherProps.OperateTimeStr));

                if (retObj.AIRType == "1") {
                    m_this.m_rsubjecttypeCtrl.text(mlm.C0506);
                    m_this.dvSaleSiteCtrl.show();
                }
                else if (retObj.AIRType == "3") {
                    m_this.m_rsubjecttypeCtrl.text(mlm.C0854);
                    m_this.dvSaleSiteCtrl.show();
                }
                else if (retObj.AIRType == "4") {
                    m_this.m_rsubjecttypeCtrl.text(mlm.C0855);
                    m_this.dvSaleSiteCtrl.show();
                }
                else if (retObj.AIRType == "5") {
                    m_this.m_rsubjecttypeCtrl.text(mlm.C0627);
                    m_this.dvSaleSiteCtrl.show();
                }
                else if (retObj.AIRType == "10") {
                    m_this.m_rsubjecttypeCtrl.text(mlm.C0891);
                    m_this.dvSaleSiteCtrl.hide();
                }

                if (retObj.OtherProps.SaleSiteName) {
                    m_this.m_salesiteCtrl.text(retObj.OtherProps.SPfName + "-" + retObj.OtherProps.SaleSiteName);
                }
                else {
                    m_this.m_salesiteCtrl.text(retObj.OtherProps.SPfName);
                }

                m_this.m_receiveCtrl.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.Receive));
                m_this.m_remarkCtrl.text(retObj.Remark);

                var m_rvobject = "";
                if (retObj.Customer_Id && retObj.Customer_Id != "0") {
                    m_rvobject = retObj.OtherProps.CustName;
                }
                else if (retObj.Supplier_Id && retObj.Supplier_Id != "0") {
                    m_rvobject = retObj.OtherProps.SuppName;
                }
                else {
                    m_rvobject = retObj.RvObject;
                }
                m_this.m_rvobjectCtrl.text(m_rvobject);

                var m_bizcontent = "";
                if (retObj.SaleOrder_Id && retObj.SaleOrder_Id != "0") {
                    if (retObj.AS_Problem_Id && retObj.AS_Problem_Id != "0") {
                        m_bizcontent = mlm.C1546 + ": " + retObj.OtherProps.ASPCode;
                    }
                    else {

                        m_bizcontent = mlm.C0938 + ": " + retObj.OtherProps.SOCode;
                    }
                }
                else if (retObj.PurchaseOrder_Id && retObj.PurchaseOrder_Id != "0") {
                    m_bizcontent = mlm.C1393 + ": " + retObj.OtherProps.POCode;
                }
                else {
                    m_bizcontent = retObj.BizContent;
                }
                m_this.m_ribizcontentCtrl.text(m_bizcontent);

                var m_fundreceiveitems = [];
                var m_freezeReceive = 0;
                $.each(retObj.PreviewFundReceives, function () {
                    var m_flowitem = {};
                    m_flowitem.FundFlowRecord_Id = 10000 + Number(this.PreviewFundFlowRecord_Id);
                    m_flowitem.PRFund = this.PRFund;
                    m_flowitem.FlowFund = this.FlowFund;
                    m_flowitem.LosedFund = this.LosedFund;
                    m_flowitem.Rate = this.Rate;
                    m_flowitem.CurrName = this.OtherProps.CurrName;
                    m_flowitem.FundAccount = this.OtherProps.FundAccount;
                    m_flowitem.CurrSymbol = this.OtherProps.CurrSymbol;
                    m_flowitem.AORCurrName = retObj.OtherProps.CurrName;
                    m_flowitem.AORCurrSymbol = retObj.OtherProps.CurrSymbol;
                    m_flowitem.OperateTimeStr = this.OtherProps.OperateTimeStr;
                    m_flowitem.ReadOnly = false;
                    m_flowitem.State = "Freeze";

                    m_freezeReceive += Number(this.PRFund);
                    m_fundreceiveitems.push(m_flowitem);
                });
                $.each(retObj.FundReceives, function () {
                    var m_flowitem = {};
                    m_flowitem.FundFlowRecord_Id = this.FundFlowRecord_Id;
                    m_flowitem.PRFund = this.PRFund;
                    m_flowitem.FlowFund = this.FlowFund;
                    m_flowitem.LosedFund = this.LosedFund;
                    m_flowitem.Rate = this.Rate;
                    m_flowitem.CurrName = this.OtherProps.CurrName;
                    m_flowitem.FundAccount = this.OtherProps.FundAccount;
                    m_flowitem.CurrSymbol = this.OtherProps.CurrSymbol;
                    m_flowitem.AORCurrName = retObj.OtherProps.CurrName;
                    m_flowitem.AORCurrSymbol = retObj.OtherProps.CurrSymbol;
                    m_flowitem.OperateTimeStr = this.OtherProps.OperateTimeStr;
                    m_flowitem.ReadOnly = true;
                    m_flowitem.State = "";
                    m_fundreceiveitems.push(m_flowitem);
                });
                var m_tablesource = datastruct.convertion.jsonToTable(m_fundreceiveitems);
                m_this.fundReceiveList.bindDataSource(m_tablesource);

                var m_receivein = Number(retObj.ReceivedIn);
                var m_receive = Number(retObj.Receive);
                if ((m_receivein > 0 && m_receivein < m_receive) || m_freezeReceive > 0) {
                    m_this.m_remainreceiveCtrl.html("(" + mlm.C0757 + ":" + commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, m_receive - m_receivein) + ")");
                }
                else {
                    m_this.m_remainreceiveCtrl.html("");
                }

                m_this.viewReceiveInFrm.show();
            });
        },

        /*  */
        _constructPRFundForReceiveCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.AORCurrSymbol, cellValue);
        },

        /*  */
        _constructFundForReceiveCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
        },

        /*  */
        _constructDateCell: function (key, cellValue) {
            return commoncore.func.getTimeStrCell(cellValue);
        },

        /*  */
        _constructFundReceiveStateCell: function (key, cellValue) {
            if (cellValue == "Freeze") {
                return mlm.C0872;
            }
            else {
                return mlm.C0873;
            }
        }
    };

    bizcontrol.viewaccountinrecord.fn.init.prototype = bizcontrol.viewaccountinrecord.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----应付账单查看控件----- 
    */
    bizcontrol.viewaccountoutrecord = function () {
        var obj = new bizcontrol.viewaccountoutrecord.fn.init();
        return obj;
    };
    bizcontrol.viewaccountoutrecord.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div style='display: none;'></div>");

            var m_tableContainer = $("<div class='submitForm form-width-b'></div>");

            var m_tr_1 = $("<div class='submitForm-tr first-item'></div>");
            var m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0751 + ":</span>");
            /* 账单号 */
            this.m_arcodeCtrl = $("<span></span>");
            m_td_1.append(this.m_arcodeCtrl);
            m_tr_1.append(m_td_1);
            var m_td_2 = $("<span></div>");
            m_td_2.append("<span class='title'>" + mlm.C0750 + ":</span>");
            /* 账单日期 */
            this.m_arcreatetimeCtrl = $("<span></span>");
            m_td_2.append(this.m_arcreatetimeCtrl);
            m_tr_1.append(m_td_2);

            var m_tr_2 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0497 + ":</span>");
            /* 成本科目 */
            this.m_costsubjectCtrl = $("<span></span>");
            m_td_1.append(this.m_costsubjectCtrl);
            m_tr_2.append(m_td_1);
            m_td_2 = $("<span></div>");
            m_td_2.append("<span class='title'>" + mlm.C0496 + ":</span>");
            /* 站点 */
            this.m_salesiteCtrl = $("<span></span>");
            m_td_2.append(this.m_salesiteCtrl);
            m_tr_2.append(m_td_2);

            var m_tr_3 = $("<div class='submitForm-tr first-item'></div>");
            m_td_1 = $("<span class='left-cell'></div>");
            m_td_1.append("<span class='title'>" + mlm.C0675 + ":</span>");
            /* 交易对方 */
            this.m_payobjectCtrl = $("<span></span>");
            m_td_1.append(this.m_payobjectCtrl);
            m_tr_3.append(m_td_1);
            m_td_2 = $("<span></div>");
            m_td_2.append("<span class='title'>" + mlm.C0749 + ":</span>");
            /* 账目总金额 */
            this.m_payoutCtrl = $("<span></span>");
            m_td_2.append(this.m_payoutCtrl);
            m_tr_3.append(m_td_2);

            var m_tr_4 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0676 + ":</span>");
            /* 业务内容 */
            this.m_ribizcontentCtrl = $("<span style='display: inline-block; width: 850px'></span>");
            m_td_1.append(this.m_ribizcontentCtrl);
            m_tr_4.append(m_td_1);

            var m_tr_5 = $("<div class='submitForm-tr'></div>");
            m_td_1 = $("<span></span>");
            m_td_1.append("<span class='title'>" + mlm.C0073 + ":</span>");
            /* 备注 */
            this.m_remarkCtrl = $("<span style='display: inline-block; width: 850px'></span>");
            m_td_1.append(this.m_remarkCtrl);
            m_tr_5.append(m_td_1);

            var m_tr_6 = $("<div class='submitForm-tr last-item'></div>");
            var m_rvcontainer = $("<div style='height: 195px;'></div>");
            var m_titlecontainer = $("<div style='height: 30px'></div>");
            m_titlecontainer.append("<span class='lb-title list-title'>" + mlm.C0529 + "</span>");
            this.m_remainpayCtrl = $("<span class='lb-title list-title' style='margin: 0px 0px 0px 5px'></span>");
            m_titlecontainer.append(this.m_remainpayCtrl);
            m_rvcontainer.append(m_titlecontainer);
            this.m_payfundTable = $("<table id='view_payfundList'></table>");
            m_rvcontainer.append(this.m_payfundTable);
            m_tr_6.append(m_rvcontainer);

            m_tableContainer.append(m_tr_1);
            m_tableContainer.append(m_tr_2);
            m_tableContainer.append(m_tr_3);
            m_tableContainer.append(m_tr_4);
            m_tableContainer.append(m_tr_5);
            m_tableContainer.append(m_tr_6);

            this.ctrl.append(m_tableContainer);
        },

        /* 展示账单 */
        show: function (key) {
            if (!this.viewAccountOutFrm) {
                this.viewAccountOutFrm = new uicontrol.dialog(this.ctrl, mlm.C0761, { width: 1000, position: ["auto", 5] });

                this.viewAccountOutFrm.show();

                this.paidfundList = new uicontrol.tableList("view_payfundList",
                                     { isPaging: false,
                                         autoSeq: true,
                                         height: 100,
                                         keyColumn: "FundFlowRecord_Id",
                                         columns: [{ display: mlm.C0518, name: "PRFund", width: 125, align: 'right', adjust: true, createCell: bizcontrol.viewaccountoutrecord.fn._constructPRFundForPayCell },
                                                   { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                   { display: mlm.C0529, name: "FlowFund", width: 125, align: 'right', adjust: true, createCell: bizcontrol.viewaccountoutrecord.fn._constructFundForPayCell },
                                                   { display: mlm.C0532, name: "LosedFund", width: 100, align: 'right', adjust: true, createCell: bizcontrol.viewaccountoutrecord.fn._constructFundForPayCell },
                                                   { display: mlm.C0517, name: "Rate", width: 60, align: 'right' },
                                                   { display: mlm.C0860, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewaccountoutrecord.fn._constructDateCell}]
                                     });
            }

            var m_this = this;

            var m_accountoutrecord = new fm.accountoutrecord();
            m_accountoutrecord.AccountOutRecord_Id = key;
            m_accountoutrecord.readAccountOutRecord(function (retObj) {

                m_this.m_costsubjectCtrl.text(retObj.OtherProps.CostSubjectName);
                m_this.m_payoutCtrl.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.Payout));

                if (retObj.OtherProps.SaleSiteName) {
                    m_this.m_salesiteCtrl.text(retObj.OtherProps.SPfName + "-" + retObj.OtherProps.SaleSiteName);
                }
                else {
                    m_this.m_salesiteCtrl.text(retObj.OtherProps.SPfName);
                }

                var m_paid = Number(retObj.Paidout);
                var m_pay = Number(retObj.Payout);
                if (m_paid > 0 && m_paid < m_pay) {
                    m_this.m_remainpayCtrl.html("(" + mlm.C0868 + ":" + commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, m_pay - m_paid) + ")");
                }
                else {
                    m_this.m_remainpayCtrl.html("");
                }

                m_this.m_remarkCtrl.text(retObj.Remark);

                var m_payobject = "";
                if (retObj.Customer_Id && retObj.Customer_Id != "0") {
                    m_payobject = retObj.OtherProps.CustName;
                }
                else if (retObj.Supplier_Id && retObj.Supplier_Id != "0") {
                    m_payobject = retObj.OtherProps.SuppName;
                }
                else {
                    m_payobject = retObj.PayObject;
                }
                m_this.m_payobjectCtrl.text(m_payobject);

                var m_bizcontent = "";
                if (retObj.SaleOrder_Id && retObj.SaleOrder_Id != "0") {
                    if (retObj.AS_Problem_Id && retObj.AS_Problem_Id != "0") {
                        m_bizcontent = mlm.C1546 + ": " + retObj.OtherProps.ASPCode;
                    }
                    else {
                        m_bizcontent = mlm.C0938 + ": " + retObj.OtherProps.SOCode;
                    }
                }
                else if (retObj.PurchaseOrder_Id && retObj.PurchaseOrder_Id != "0") {
                    m_bizcontent = mlm.C1393 + ": " + retObj.OtherProps.POCode;
                }
                else if (retObj.ExpressOrder_Id && retObj.ExpressOrder_Id != "0") {
                    m_bizcontent = mlm.C1316 + ": " + retObj.OtherProps.EOCode + "(" + retObj.OtherProps.LstSolutionName + ", ";

                    if (retObj.OtherProps.TrackingNumber) {
                        m_bizcontent += retObj.OtherProps.TrackingNumber + ")";
                    }
                    else {
                        m_bizcontent += retObj.OtherProps.OutEOCode ? retObj.OtherProps.OutEOCode : mlm.C1291 + mlm.C1322 + ")";
                    }
                }
                else {
                    m_bizcontent = retObj.BizContent;
                }
                m_this.m_ribizcontentCtrl.text(m_bizcontent);

                m_this.m_arcodeCtrl.text(retObj.AORCode);
                m_this.m_arcreatetimeCtrl.text(commoncore.func.getTimeStrCell(retObj.OtherProps.OperateTimeStr));

                $.each(retObj.PaidFunds, function () {
                    this.FundAccount = this.OtherProps.FundAccount;
                    this.CurrName = this.OtherProps.CurrName;
                    this.FundAccount = this.OtherProps.FundAccount;
                    this.CurrSymbol = this.OtherProps.CurrSymbol;
                    this.AORCurrName = retObj.OtherProps.CurrName;
                    this.AORCurrSymbol = retObj.OtherProps.CurrSymbol;
                    this.OperateTimeStr = this.OtherProps.OperateTimeStr;
                });

                m_this.paidfundList.bindDataSource(retObj.PaidFunds);

                m_this.viewAccountOutFrm.show();
            });
        },

        /*  */
        _constructPRFundForPayCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.AORCurrSymbol, cellValue);
        },

        /*  */
        _constructFundForPayCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
        },

        /*  */
        _constructDateCell: function (key, cellValue) {
            return commoncore.func.getTimeStrCell(cellValue);
        }
    };

    bizcontrol.viewaccountoutrecord.fn.init.prototype = bizcontrol.viewaccountoutrecord.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----配送单查看控件----- 
    */
    bizcontrol.viewexpressorder = function () {
        var obj = new bizcontrol.viewexpressorder.fn.init();
        return obj;
    };
    bizcontrol.viewexpressorder.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewEOFrm' style='display: none;'></div>");
            var m_tableContainer = $("<div class='submitForm form-width-a'></div>");

            var m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C1316 + ":</span>");
            this.lbVEOCode = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVEOCode);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0783 + ":</span>");
            this.lbVLstSolution = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVLstSolution);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1300 + ":</span>");
            this.lbVEOAddress = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVEOAddress);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1274 + ":</span>");
            this.lbVWH = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVWH);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1550 + ":</span>");
            this.lbVShipTime = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVShipTime);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1301 + ":</span>");
            this.lbVWeight = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVWeight);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1302 + "(cm³)" + ":</span>");
            this.lbVVolumn = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVVolumn);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1291 + ":</span>");
            this.lbVLstOrderCode = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVLstOrderCode);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1295 + ":</span>");
            this.lbVTrack = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVTrack);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0807 + ":</span>");
            this.lbVLstCost = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVLstCost);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1377 + ":</span>");
            this.lbVRelOrder = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVRelOrder);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            this.dvVEOProd_1 = $("<div class='submitForm-tr'></div>");
            var m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1264 + mlm.C0463 + "</span>"));
            var m_list = $("<div></div>");
            m_list.append("<table id='eoproductv_1List'></table>");
            this.dvVEOProd_1.append(m_title);
            this.dvVEOProd_1.append(m_list);
            m_tableContainer.append(this.dvVEOProd_1);

            this.dvVEOProd_2 = $("<div class='submitForm-tr' style='display: none'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1264 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='eoproductv_2List'></table>");
            this.dvVEOProd_2.append(m_title);
            this.dvVEOProd_2.append(m_list);
            m_tableContainer.append(this.dvVEOProd_2);

            this.dvVCustom = $("<div class='submitForm-tr last-item'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1376 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='customvList'></table>");
            this.dvVCustom.append(m_title);
            this.dvVCustom.append(m_list);
            m_tableContainer.append(this.dvVCustom);

            this.ctrl.append(m_tableContainer);
        },

        /*  */
        show: function (key) {

            var m_this = this;

            if (!this.viewEOFrm) {
                this.viewEOFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C1299, { width: 900, position: ["auto", 5] });

                this.lbVEOAddress.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });

                if (!this.eoproductv_1List) {
                    this.eoproductv_1List = new uicontrol.tableList("eoproductv_1List",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SkuProduct_Id",
                                         height: 65,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: bizcontrol.viewexpressorder.fn._constructEOProdPicCell },
                                                   { display: mlm.C1264, name: "", width: 400, align: 'left', adjust: true, createCell: bizcontrol.viewexpressorder.fn._constructVEOProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell}]
                                     });
                }

                if (!this.eoproductv_2List) {
                    this.eoproductv_2List = new uicontrol.tableList("eoproductv_2List",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SkuProduct_Id",
                                         height: 60,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: bizcontrol.viewexpressorder.fn._constructEOProdPicCell },
                                                   { display: mlm.C1264, name: "", width: 400, align: 'left', adjust: true, createCell: bizcontrol.viewexpressorder.fn._constructVEOProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1369, name: "RevQty", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1370, name: "DamageQty", width: 70, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell}]
                                     });
                }

                if (!this.customvList) {
                    this.customvList = new uicontrol.tableList("customvList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "EO_Custom_Id",
                                         height: 40,
                                         columns: [{ display: mlm.C1307, name: "CustomProdName", width: 150, align: 'left' },
                                                { display: mlm.C1621, name: "CustomProdName_CN", width: 150, align: 'left' },
                                                { display: mlm.C1098, name: "CustomQty", width: 60, align: 'right' },
                                                { display: mlm.C1310, name: "CustomValue", width: 60, align: 'right', adjust: true, createCell: bizcontrol.viewexpressorder.fn._createCustomValueCell },
                                                { display: mlm.C1311, name: "CustomCode", width: 90, align: 'left' },
                                                { display: mlm.C1313, name: "CustomMaterial", width: 90, align: 'left' },
                                                { display: mlm.C1312, name: "GlobalAreaName", width: 70, align: 'left'}]
                                     });
                }
            }

            var m_expressorder = new lstm.expressorder();
            m_expressorder.ExpressOrder_Id = key;
            m_expressorder.readExpressOrder(function (retObj) {

                var m_stateStr = "";
                if (retObj.EOState == "0") {
                    m_stateStr = mlm.C1280;
                }
                else if (retObj.EOState == "10") {
                    m_stateStr = mlm.C1281;
                }
                else if (retObj.EOState == "20") {
                    m_stateStr = mlm.C1282;
                }
                else if (retObj.EOState == "30") {
                    m_stateStr = mlm.C1336;
                }
                else if (retObj.EOState == "40") {
                    m_stateStr = mlm.C1378;
                }
                else if (retObj.EOState == "50") {
                    m_stateStr = mlm.C1330;
                }

                m_this.lbVEOCode.text(retObj.EOCode + " (" + m_stateStr + ")");

                var m_addresschar = "";
                var m_addressArr = [];
                if (retObj.OtherProps.GlobalAreaName == "中国") {
                    m_addresschar = " ";
                    m_addressArr.push(retObj.RvFullName + ",");

                    if (retObj.RvProvince) {
                        m_addressArr.push(retObj.RvProvince);
                    }

                    if (retObj.RvCity) {
                        m_addressArr.push(retObj.RvCity);
                    }

                    if (retObj.RvAddress_1) {
                        m_addressArr.push(retObj.RvAddress_1);
                    }
                    if (retObj.RvAddress_2) {
                        m_addressArr.push(retObj.RvAddress_2);
                    }

                    if (retObj.RvPostCode) {
                        m_addressArr.push("(" + retObj.RvPostCode + ")");
                    }
                }
                else {
                    m_addresschar = ", ";
                    m_addressArr.push(retObj.RvFullName);
                    if (retObj.RvAddress_1) {
                        m_addressArr.push(retObj.RvAddress_1);
                    }
                    if (retObj.RvAddress_2) {
                        m_addressArr.push(retObj.RvAddress_2);
                    }
                    if (retObj.RvCity) {
                        m_addressArr.push(retObj.RvCity);
                    }
                    if (retObj.RvProvince) {
                        m_addressArr.push(retObj.RvProvince);
                    }
                    if (retObj.RvPostCode) {
                        m_addressArr.push(retObj.RvPostCode);
                    }
                    m_addressArr.push(retObj.OtherProps.GlobalAreaName);
                }

                if (retObj.OtherProps.CustName) {
                    m_this.lbVEOAddress.html(commoncore.func.showSpecialChar(m_addressArr.join(m_addresschar)) + " (<a onclick='openViewCustFrm.call(this, \"" + retObj.Customer_Id + "\")' href='javascript:void(\"0\");'>" + retObj.OtherProps.CustName + "</a>)");
                }
                else {
                    m_this.lbVEOAddress.text(commoncore.func.showSpecialChar(m_addressArr.join(m_addresschar)));
                }
                m_this.lbVEOAddress.attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(retObj)));

                m_this.lbVLstSolution.html("<a onclick='openViewLstSolution.call(this, \"" + retObj.LstSolution_Id + "\")' href='javascript:void(\"0\");'>" + retObj.LstSolutionName + " (" + retObj.LstCompanyName + ")</a>");
                m_this.lbVWH.text(retObj.OtherProps.WarehouseName);
                m_this.lbVLstOrderCode.text(retObj.OutEOCode);

                var m_timearr = [];
                if (retObj.OtherProps.ShipTimeStr) {
                    m_timearr.push(commoncore.func.getTimeStrCell(retObj.OtherProps.ShipTimeStr));
                }
                else {
                    m_timearr.push(commoncore.func.getTimeStrCell(retObj.OtherProps.EstimatedShipTimeStr));
                }
                if (retObj.OtherProps.ArriveTimeStr) {
                    m_timearr.push(commoncore.func.getTimeStrCell(retObj.OtherProps.ArriveTimeStr));
                }
                else {
                    m_timearr.push(commoncore.func.getTimeStrCell(retObj.OtherProps.EstimatedArriveTimeStr) + "(" + mlm.C1304 + ")");
                }

                m_this.lbVShipTime.text(m_timearr.join(" " + mlm.C0412 + " "));

                if (Number(retObj.ActualWeight) > 0) {
                    m_this.lbVWeight.text(Number(retObj.ActualWeight).toFixed(3) + " " + retObj.OtherProps.WUnit);
                }
                else {
                    m_this.lbVWeight.text(Number(retObj.Weight).toFixed(3) + " " + retObj.OtherProps.WUnit);
                }
                if (Number(retObj.ActualLength) > 0) {
                    m_this.lbVVolumn.text(retObj.ActualLength + "*" + retObj.ActualWidth + "*" + retObj.ActualHeight);
                }
                else {
                    m_this.lbVVolumn.text(retObj.Length + "*" + retObj.Width + "*" + retObj.Height);
                }
                if (Number(retObj.ActualCost) > 0) {
                    m_this.lbVLstCost.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.ActualCost));
                }
                else {
                    m_this.lbVLstCost.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.ExpServiceCost) + "(" + mlm.C1319 + ")");
                }

                m_this.lbVTrack.text(retObj.TrackingNumber);

                var m_eoproducts = datastruct.convertion.strToObject(retObj.OtherProps.EOProdTable);
                if (retObj.EOState == "40") {
                    m_this.dvVEOProd_1.hide();
                    m_this.dvVEOProd_2.show();

                    m_this.eoproductv_2List.bindDataSource(m_eoproducts);
                }
                else {
                    m_this.dvVEOProd_1.show();
                    m_this.dvVEOProd_2.hide();

                    m_this.eoproductv_1List.bindDataSource(m_eoproducts);
                }

                $.each(retObj.Customs, function () {
                    this.GlobalAreaName = this.OtherProps.GlobalAreaName ? this.OtherProps.GlobalAreaName : "";
                });
                m_this.customvList.bindDataSource(retObj.Customs);

                if (retObj.OtherProps.WH_AreaIndex && retObj.OtherProps.WH_AreaIndex.indexOf("#" + retObj.GlobalArea_Id + "#") > -1) {
                    m_this.dvVCustom.hide();
                }
                else {
                    m_this.dvVCustom.show();
                }

                var m_codeArr = [];
                var m_relobjs = datastruct.convertion.strToObject(retObj.OtherProps.RelTable);
                $.each(m_relobjs, function () {

                    if (this.ASPCode) {
                        m_codeArr.push("<a onclick='viewASProblem.call(this, \"" + this.AS_Problem_Id + "\")' href='javascript:void(\"0\");'>" + this.ASPCode + "</a>");
                    }
                    else {
                        m_codeArr.push("<a onclick='viewSaleOrder.call(this, \"" + this.SaleOrder_Id + "\")' href='javascript:void(\"0\");'>" + this.SOCode + "</a>");
                    }
                });

                m_this.lbVRelOrder.html(m_codeArr.join(", "));
            });

            m_this.viewEOFrm.show();
        },

        /*  */
        _constructEOProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewProduct.call(this, \"" + key + "\", \"" + this.keyObj.SkuProduct_Id + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /*  */
        _constructVEOProdCell: function (key, cellvalue) {
            return "<a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + key + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a>";
        },
        /*  */
        _createCustomValueCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(keycontext.keyparam.tax_syscurrsymbol, cellValue);
        }
    };

    bizcontrol.viewexpressorder.fn.init.prototype = bizcontrol.viewexpressorder.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----售后问题查看控件----- 
    */
    bizcontrol.viewasproblem = function () {
        var obj = new bizcontrol.viewasproblem.fn.init();
        return obj;
    };
    bizcontrol.viewasproblem.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewASProblemFrm' style='display: none;'></div>");

            this.asproblemTab = $("<div id='viewASPTabs'></div>");
            var m_ulCtrl = $("<ul></ul>");
            this.lkViewASProblem = $("<a href='#viewASProblem'>" + mlm.C1392 + "</a>");
            var m_liASPCtrl = $("<li></li>");
            m_liASPCtrl.append(this.lkViewASProblem);
            this.liExpService = $("<li><a href='#viewASPExpService'>" + mlm.C1486 + "</a></li>");
            this.liHandleFinance = $("<li><a href='#viewASPHandleFinance'>" + mlm.C1488 + "</a></li>");
            this.liHandleExp = $("<li><a href='#viewASPHandleExp'>" + mlm.C1428 + "</a></li>");
            m_ulCtrl.append(m_liASPCtrl);
            m_ulCtrl.append(this.liExpService);
            m_ulCtrl.append(this.liHandleFinance);
            m_ulCtrl.append(this.liHandleExp);
            this.asproblemTab.append(m_ulCtrl);

            var m_asproblemContainer = $("<div id='viewASProblem'></div>");
            var m_tableContainer = $("<div class='submitForm form-width-b'></div>");

            var m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C1546 + ":</span>");
            this.lbVASPCode = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVASPCode);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1556 + ":</span>");
            this.lbVProblemType = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVProblemType);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            var m_trContainer = $("<div class='submitForm-tr'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C0719 + ":</span>");
            this.lbVCustName = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVCustName);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1404 + ":</span>");
            this.lbVSOCode = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOCode);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1406 + ":</span>");
            this.lbVCreateTime = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVCreateTime);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1405 + ":</span>");
            this.lbVCustReturn = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVCustReturn);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1407 + ":</span>");
            this.lbVProblemRemark = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVProblemRemark);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            this.trProduct = $("<div class='submitForm-tr'></div>");
            var m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1264 + mlm.C0463 + "</span>"));
            this.dvVASPList = $("<div></div>");
            this.dvVASPList.append("<table id='vaspproductList'></table>");
            this.trProduct.append(m_title);
            this.trProduct.append(this.dvVASPList);
            m_tableContainer.append(this.trProduct);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1408 + ":</span>");
            this.lbVHandleOption = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVHandleOption);
            this.dvRefund = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1409 + ":</span>");
            this.lbVRefund = $("<span></span>");
            this.dvRefund.append(m_lbSymbol);
            this.dvRefund.append(this.lbVRefund);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(this.dvRefund);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr last-item'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1410 + ":</span>");
            this.lbVHandleRemark = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVHandleRemark);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_asproblemContainer.append(m_tableContainer);

            var m_asphandleContainer = $("<div id='viewASPExpService'></div>");
            this.dvVASPHandle_1 = $("<div class='submitForm form-width-b'></div>");

            this.dvVASPExpress = $("<div></div>");
            m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1300 + ":</span>");
            this.lbVShipAddress = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVShipAddress);
            m_trContainer.append(m_rightTd);
            this.dvVASPExpress.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1301 + ":</span>");
            this.lbVASPWeight = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVASPWeight);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1302 + "(cm³)" + ":</span>");
            this.lbVASPVolumn = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVASPVolumn);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            this.dvVASPExpress.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0783 + ":</span>");
            this.lbVASPLstSolution = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVASPLstSolution);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1375 + ":</span>");
            this.lbVASPExpCost = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVASPExpCost);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            this.dvVASPExpress.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1304 + mlm.C1303 + ":</span>");
            this.lbVASPEstimateShip = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVASPEstimateShip);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1304 + mlm.C1305 + ":</span>");
            this.lbVASPEstimateArrive = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVASPEstimateArrive);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            this.dvVASPExpress.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1274 + ":</span>");
            this.lbVASPWarehouse = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVASPWarehouse);
            m_trContainer.append(m_rightTd);
            this.dvVASPExpress.append(m_trContainer);

            this.dvVCustom = $("<div class='submitForm-tr'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1376 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='customvList'></table>");
            this.dvVCustom.append(m_title);
            this.dvVCustom.append(m_list);
            this.dvVASPExpress.append(this.dvVCustom);
            this.dvVASPHandle_1.append(this.dvVASPExpress);

            m_asphandleContainer.append(this.dvVASPHandle_1);

            var m_eohandleContainer = $("<div id='viewASPHandleExp'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1278 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vaspexpressorderList'></table>");
            m_eohandleContainer.append(m_title);
            m_eohandleContainer.append(m_list);

            var m_aspfinancehandleContainer = $("<div id='viewASPHandleFinance'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0880 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vaspfinanceList'></table>");
            m_aspfinancehandleContainer.append(m_title);
            m_aspfinancehandleContainer.append(m_list);
            m_title = $("<div style='height: 30px; margin: 10px 0px 0px 0px'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0972 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vaspmoneyList'></table>");
            m_aspfinancehandleContainer.append(m_title);
            m_aspfinancehandleContainer.append(m_list);

            this.asproblemTab.append(m_asproblemContainer);
            this.asproblemTab.append(m_asphandleContainer);
            this.asproblemTab.append(m_eohandleContainer);
            this.asproblemTab.append(m_aspfinancehandleContainer);

            this.ctrl.append(this.asproblemTab);
        },

        /* 展示配送服务 */
        show: function (as_problem_id) {
            var thisObj = this;

            if (!this.viewASPFrm) {
                this.viewASPFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C1392, { width: 1025, position: ["auto", 15] });

                this.vaspproductList = new uicontrol.tableList("vaspproductList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "SkuProduct_Id",
                                         height: 70,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 70, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructProdPicCell },
                                                   { display: mlm.C1413, name: "", width: 400, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructProdCell },
                                                   { display: mlm.C1414, name: "Qty", width: 60, align: 'right' },
                                                   { display: mlm.C1415, name: "ReceiveRetQty", width: 60, align: 'right'}]
                                     });

                this.customvList = new uicontrol.tableList("customvList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "EO_Custom_Id",
                                         height: 40,
                                         columns: [{ display: mlm.C1307, name: "CustomProdName", width: 150, align: 'left' },
                                                { display: mlm.C1307, name: "CustomProdName_CN", width: 150, align: 'left' },
                                                { display: mlm.C1098, name: "CustomQty", width: 60, align: 'right' },
                                                { display: mlm.C1310, name: "CustomValue", width: 70, align: 'right', adjust: true, createCell: bizcontrol.viewasproblem.fn._createCustomValueCell },
                                                { display: mlm.C1311, name: "CustomCode", width: 90, align: 'left' },
                                                { display: mlm.C1313, name: "CustomMaterial", width: 100, align: 'left' },
                                                { display: mlm.C1312, name: "GlobalAreaName", width: 80, align: 'left'}]
                                     });

                this.vaspexpressorderList = new uicontrol.tableList("vaspexpressorderList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ExpressOrder_Id",
                                        columns: [{ display: mlm.C1316, name: "EOCode", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructEOCodeCell },
                                                   { display: mlm.C0783, name: "", width: 210, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructLstSolutionCell },
                                                   { display: mlm.C1274, name: "WarehouseName", width: 120, align: 'left' },
                                                   { display: mlm.C1303, name: "", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructEOShipTimeCell },
                                                   { display: mlm.C1305, name: "", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructEOArriveTimeCell },
                                                   { display: mlm.C0367, name: "EOState", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructEOStateCell}]
                                    });

                this.vaspfinanceList = new uicontrol.tableList("vaspfinanceList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FKey",
                                        columns: [{ display: mlm.C0751, name: "", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFCodeCell },
                                                  { display: mlm.C1495, name: "", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFTypeCell },
                                                  { display: mlm.C0750, name: "OperateTimeStr", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0722, name: "FTotalMoney", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewasproblem.fn._createFMoneyCell },
                                                  { display: mlm.C0500, name: "State", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFStateCell}]
                                    });

                this.vaspmoneyList = new uicontrol.tableList("vaspmoneyList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FundFlowRecord_Id",
                                        columns: [{ display: mlm.C0724, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0511, name: "AccountOutRecord_Id", width: 60, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFlowActionCell },
                                                  { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                  { display: mlm.C0513, name: "FlowFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewasproblem.fn._createFMoneyCell },
                                                  { display: mlm.C0514, name: "LosedFund", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewasproblem.fn._createFMoneyCell },
                                                  { display: mlm.C0132, name: "Rate", width: 50, align: 'right' },
                                                  { display: mlm.C0751, name: "", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewasproblem.fn._constructFundRelCodeCell },
                                                  { display: mlm.C0518, name: "PRFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewasproblem.fn._createFundAORCell}]
                                    });

                this.asproblemTab.tabs();
            }

            var m_as_problem = new sm.as_problem();
            m_as_problem.AS_Problem_Id = as_problem_id;
            m_as_problem.readASProblem(function (retObj) {

                thisObj.lbVCustName.html("<a onclick='openViewCustFrm.call(this, \"" + retObj.Customer_Id + "\")' href='javascript:void(\"0\");'>" + retObj.OtherProps.CustName + "</a>");
                thisObj.lbVSOCode.html("<a onclick='viewSaleOrder.call(this, \"" + retObj.SaleOrder_Id + "\")' href='javascript:void(\"0\");'>" + retObj.SOCode + "</a>");

                if (retObj.ProblemType == "1") {
                    thisObj.lbVProblemType.text(mlm.C1418);
                    thisObj.trProduct.show();
                }
                else if (retObj.ProblemType == "2") {
                    thisObj.lbVProblemType.text(mlm.C1419);
                    thisObj.trProduct.show();
                }
                else if (retObj.ProblemType == "3") {
                    thisObj.lbVProblemType.text(mlm.C1420);
                    thisObj.trProduct.show();
                }
                else if (retObj.ProblemType == "4") {
                    thisObj.lbVProblemType.text(mlm.C1421);
                    thisObj.trProduct.show();
                }
                else if (retObj.ProblemType == "5") {
                    thisObj.lbVProblemType.text(mlm.C1559);
                    thisObj.trProduct.show();
                }
                else if (retObj.ProblemType == "6") {
                    thisObj.lbVProblemType.text(mlm.C1560);
                    thisObj.trProduct.hide();
                }
                else {
                    thisObj.lbVProblemType.text(mlm.C1421);
                    thisObj.trProduct.hide();
                }

                if (retObj.CustReturn == "1") {
                    thisObj.lbVCustReturn.text(mlm.C1422);
                }
                else {
                    thisObj.lbVCustReturn.text(mlm.C1423);
                }

                thisObj.lbVCreateTime.text(commoncore.func.getTimeStrCell(retObj.OtherProps.CreateTimeStr));

                var m_aspstr = retObj.ASPCode;
                if (retObj.State == "0") {
                    m_aspstr += " (" + mlm.C1424 + ")";
                }
                else if (retObj.State == "10") {
                    m_aspstr += " (" + mlm.C1425 + ")";
                }
                else if (retObj.State == "20") {
                    m_aspstr += " (" + mlm.C1557 + ")";
                }
                thisObj.lbVASPCode.text(m_aspstr);

                thisObj.lbVProblemRemark.text(retObj.ProblemRemark);

                $.each(retObj.Products, function () {
                    this.BrowsePicUrl = this.OtherProps.BrowsePicUrl;
                });
                thisObj.vaspproductList.bindDataSource(retObj.Products);

                thisObj.lbVHandleRemark.text(retObj.HandleRemark);

                if (retObj.HandleType == "1") {
                    thisObj.lbVHandleOption.text(mlm.C1427);
                    thisObj.dvRefund.show();
                    thisObj.lbVRefund.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.Refund));
                    thisObj.liExpService.hide();

                    thisObj.liHandleFinance.show();
                    thisObj.liHandleExp.hide();

                    var m_financerecords = datastruct.convertion.strToObject(retObj.OtherProps.FinanceRecords);
                    var m_fkey = 1;
                    $.each(m_financerecords, function () {
                        this.FKey = m_fkey;
                        m_fkey++;
                    });
                    thisObj.vaspfinanceList.bindDataSource(m_financerecords);

                    var m_fundflowrecords = datastruct.convertion.strToObject(retObj.OtherProps.FundFlowRecords);
                    thisObj.vaspmoneyList.bindDataSource(m_fundflowrecords);

                }
                else if (retObj.HandleType == "2") {

                    thisObj.lbVHandleOption.text(mlm.C1428);
                    thisObj.dvRefund.hide();
                    thisObj.liExpService.show();

                    thisObj.liHandleFinance.hide();
                    thisObj.liHandleExp.show();

                    var m_addressArr = [];
                    if (retObj.OtherProps.GlobalAreaName == "中国") {
                        m_addressArr.push(retObj.ExpService.RvFullName + ",");

                        if (retObj.ExpService.RvProvince) {
                            m_addressArr.push(retObj.ExpService.RvProvince);
                        }

                        if (retObj.ExpService.RvCity) {
                            m_addressArr.push(retObj.ExpService.RvCity);
                        }

                        if (retObj.ExpService.RvAddress_1) {
                            m_addressArr.push(retObj.ExpService.RvAddress_1);
                        }
                        if (retObj.ExpService.RvAddress_2) {
                            m_addressArr.push(retObj.ExpService.RvAddress_2);
                        }

                        if (retObj.ExpService.RvPostCode) {
                            m_addressArr.push("(" + retObj.ExpService.RvPostCode + ")");
                        }

                        thisObj.lbVShipAddress.text(commoncore.func.showSpecialChar(m_addressArr.join(" ")));
                    }
                    else {
                        m_addressArr.push(retObj.ExpService.RvFullName);

                        if (retObj.ExpService.RvAddress_1) {
                            m_addressArr.push(retObj.ExpService.RvAddress_1);
                        }
                        if (retObj.ExpService.RvAddress_2) {
                            m_addressArr.push(retObj.ExpService.RvAddress_2);
                        }
                        if (retObj.ExpService.RvCity) {
                            m_addressArr.push(retObj.ExpService.RvCity);
                        }
                        if (retObj.ExpService.RvProvince) {
                            m_addressArr.push(retObj.ExpService.RvProvince);
                        }
                        if (retObj.ExpService.RvPostCode) {
                            m_addressArr.push(retObj.ExpService.RvPostCode);
                        }
                        m_addressArr.push(retObj.ExpService.OtherProps.GlobalAreaName);

                        thisObj.lbVShipAddress.text(commoncore.func.showSpecialChar(m_addressArr.join(", ")));
                    }

                    retObj.ExpService.GlobalAreaName = retObj.ExpService.OtherProps.GlobalAreaName;
                    thisObj.lbVShipAddress.attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(retObj.ExpService)));

                    thisObj.lbVASPWeight.text(Number(retObj.ExpService.Weight).toFixed(3) + " " + keycontext.keyparam.WUnit);
                    thisObj.lbVASPVolumn.text(retObj.ExpService.Length + "*" + retObj.ExpService.Width + "*" + retObj.ExpService.Height);
                    thisObj.lbVASPLstSolution.text(retObj.ExpService.LstSolutionName + "(" + retObj.ExpService.LstCompanyName + ")");
                    thisObj.lbVASPExpCost.html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, retObj.ExpService.ExpServiceCost));
                    thisObj.lbVASPEstimateShip.html(commoncore.func.getTimeStrCell(retObj.ExpService.OtherProps.EstimatedShipTimeStr));
                    thisObj.lbVASPEstimateArrive.html(commoncore.func.getTimeStrCell(retObj.ExpService.OtherProps.EstimatedArriveTimeStr));
                    thisObj.lbVASPWarehouse.text(retObj.ExpService.OtherProps.WarehouseName);

                    if (retObj.ExpService.OtherProps.WH_AreaIndexs && retObj.ExpService.OtherProps.WH_AreaIndexs.indexOf("#" + retObj.ExpService.GlobalArea_Id + "#") > -1) {
                        thisObj.dvVCustom.hide();
                        thisObj.customvList.bindDataSource(null);
                    }
                    else {
                        thisObj.dvVCustom.show();
                        $.each(retObj.ExpService.Customs, function () {
                            if (this.OtherProps.GlobalAreaName) {
                                this.GlobalAreaName = this.OtherProps.GlobalAreaName;
                            }
                            else {
                                this.GlobalAreaName = "";
                            }
                        });
                        thisObj.customvList.bindDataSource(retObj.ExpService.Customs);
                    }

                    var m_expressorders = datastruct.convertion.strToObject(retObj.OtherProps.ExpressOrders);
                    thisObj.vaspexpressorderList.bindDataSource(m_expressorders);
                }
                else {
                    thisObj.lbVHandleOption.text(mlm.C0627);
                    thisObj.dvRefund.hide();
                    thisObj.liExpService.hide();

                    if (retObj.ProblemType == "7") {
                        thisObj.liHandleFinance.hide();
                    }
                    else {
                        thisObj.liHandleFinance.show();
                    }

                    thisObj.liHandleExp.hide();
                }
            });

            thisObj.viewASPFrm.show();

            thisObj.lkViewASProblem.trigger("click");
        },

        /*  */
        _constructProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewProduct.call(this, \"" + key + "\", \"" + this.keyObj.SkuProduct_Id + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /*  */
        _constructProdCell: function (key, cellValue) {
            var m_arr = [];
            if (this.keyObj.Type == "2") {
                m_arr.push("<a style='color: #666666' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a>");
                m_arr.push(" (<span style='color: #666666'>" + mlm.C1061 + "</span>)");
            }
            else {
                m_arr.push("<a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructAORCodeCell: function (key, cellValue) {
            return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.AccountOutRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.AORCode + "</a>";
        },
        /*  */
        _createCustomValueCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(keycontext.keyparam.tax_syscurrsymbol, cellValue);
        },
        /*  */
        _constructEOCodeCell: function (key, cellValue) {
            return "<a onclick='viewExpressOrder.call(this, \"" + this.keyObj.ExpressOrder_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.EOCode + "</a>";
        },
        /*  */
        _constructLstSolutionCell: function (key, cellValue) {
            return "<a onclick='openViewLstSolution.call(this, \"" + this.keyObj.LstSolution_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.LstSolutionName + "(" + this.keyObj.LstCompanyName + ")" + "</a>";
        },
        /*  */
        _constructEOShipTimeCell: function (key, cellValue) {
            var m_arr = [];

            if (this.keyObj.ShipTimeStr) {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.ShipTimeStr) + "</div>");
            }
            else {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.EstimatedShipTimeStr) + "</div>");
                m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>(" + mlm.C1324 + ")</div>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructEOArriveTimeCell: function (key, cellValue) {
            if (this.keyObj.EOState == "30" || this.keyObj.EOState == "40") {
                return "";
            }

            var m_arr = [];

            if (this.keyObj.ArriveTimeStr) {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.ArriveTimeStr) + "</div>");
            }
            else {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.EstimatedArriveTimeStr) + "</div>");
                m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>(" + mlm.C1326 + ")</div>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructFCodeCell: function (key, cellValue) {
            if (this.keyObj.FBType == "2") {
                return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.FRId + "\")' href='javascript:void(\"0\");'>" + this.keyObj.FCode + "</a>";
            }
            else {
                return "<a onclick='viewReceiveIn.call(this, \"" + this.keyObj.FRId + "\")' href='javascript:void(\"0\");'>" + this.keyObj.FCode + "</a>";
            }
        },
        /*  */
        _constructFTypeCell: function (key, cellValue) {
            if (this.keyObj.FBType == "1") {
                var m_type = "";
                if (this.keyObj.FType == "1") {
                    m_type = mlm.C0506;
                }
                else if (this.keyObj.FType == "3") {
                    m_type = mlm.C0854;
                }
                else if (this.keyObj.FType == "4") {
                    m_type = mlm.C0855;
                }
                else if (this.keyObj.FType == "5") {
                    m_type = mlm.C0627;
                }
                else if (this.keyObj.FType == "10") {
                    m_type = mlm.C0891;
                }

                return mlm.C1499 + "(" + m_type + ")";
            }
            else {
                if (this.keyObj.CostSubjectName) {
                    return mlm.C1500 + "(" + this.keyObj.CostSubjectName + ")";
                }
                else {
                    return mlm.C1500;
                }

            }
        },
        /*  */
        _constructFOperateTimeCell: function (key, cellValue) {
            return commoncore.func.getTimeStrCell(cellValue);
        },
        /*  */
        _createFMoneyCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
        },
        /*  */
        _constructFStateCell: function (key, cellValue) {
            var m_obj = this.keyObj;
            var m_arr = [];

            if (this.keyObj.FBType == "1") {
                if (cellValue == "1") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0508 + "</div>");
                }
                else if (cellValue == "2") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0509 + "</div>");

                    var m_freezeprfund = Number(m_obj.FreezePRFund);
                    if (m_freezeprfund > 0) {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(<span>" + mlm.C0869 + ": </span><span class='content-td'>" + commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_freezeprfund) + "</span>)</div>");
                    }
                    var m_unfund = Number((Number(m_obj.Receive) - Number(m_obj.ReceivedIn) - Number(m_obj.FreezePRFund)).toFixed(2));
                    if (m_unfund > 0) {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(<span>" + mlm.C0870 + ": </span><span class='content-td'>" + commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_unfund) + "</span>)</div>");
                    }
                }
                else if (cellValue == "3") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0539 + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0493 + "</div>");
                }
            }
            else {

                if (cellValue == "1") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0490 + "</div>");
                }
                else if (cellValue == "2") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0491 + "</div>");
                    m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(" + mlm.C0868 + ": " + commoncore.func.getCurrHtml(m_obj.CurrSymbol, (Number(m_obj.Payout) - Number(m_obj.Paidout))) + ")</div>");
                }
                else if (cellValue == "3") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0492 + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0493 + "</div>");
                }
            }

            return m_arr.join("");
        },
        /*  */
        _constructFlowActionCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            if (cellValue && cellValue != "0") {
                return mlm.C0541;
            }
            else {
                return mlm.C0542;
            }
        },
        /*  */
        _createVSORateCell: function (key, cellValue) {
            return Number(cellValue).toFixed(4);
        },
        /*  */
        _constructFundRelCodeCell: function (key, cellValue) {
            if (this.keyObj.AccountOutRecord_Id && this.keyObj.AccountOutRecord_Id != "0") {
                return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.AccountOutRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ObjCode + "</a>";
            }
            else {
                return "<a onclick='viewReceiveIn.call(this, \"" + this.keyObj.AccountInRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ObjCode + "</a>";
            }
        },
        /*  */
        _createFundAORCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.AORCurrSymbol, cellValue);
        },
        /*  */
        _constructEOStateCell: function (key, cellValue) {
            var m_arr = [];

            if (this.keyObj.EOState == "0") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1280 + "</div>");
            }
            else if (this.keyObj.EOState == "10") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1281 + "</div>");
            }
            else if (this.keyObj.EOState == "20") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1282 + "</div>");

                if (this.keyObj.IsTrack == "1") {
                    if (!this.keyObj.TrackingNumber) {
                        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666'>" + mlm.C1327 + "</div>");
                    }
                    else {
                        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + this.keyObj.TrackingNumber + "</div>");
                    }
                }
            }
            else if (this.keyObj.EOState == "30") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1328 + "</div>");
            }
            else if (this.keyObj.EOState == "40") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1329 + "</div>");
            }
            else if (this.keyObj.EOState == "50") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1330 + "</div>");
            }

            return m_arr.join("");
        }
    };

    bizcontrol.viewasproblem.fn.init.prototype = bizcontrol.viewasproblem.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----客户订单查看控件----- 
    */
    bizcontrol.viewsaleorder = function () {
        var obj = new bizcontrol.viewsaleorder.fn.init();
        return obj;
    };
    bizcontrol.viewsaleorder.fn = {

        _activedobj: null,

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewSaleOrderFrm' style='display: none;'></div>");

            this.viewSOTabs = $("<div id='viewSOTabs'></div>");
            var m_ulCtrl = $("<ul></ul>");
            var m_liCtrl_1 = $("<li><a href='#viewSOInfo'>" + mlm.C1485 + "</a></li>");
            var m_liCtrl_2 = $("<li><a href='#viewSExpInfo'>" + mlm.C1486 + "</a></li>");
            var m_liCtrl_3 = $("<li><a href='#viewSEOHandle'>" + mlm.C1487 + "</a></li>");
            var m_liCtrl_4 = $("<li><a href='#viewSFinanceHandle'>" + mlm.C1488 + "</a></li>");
            var m_liCtrl_5 = $("<li><a href='#viewSASPHandle'>" + mlm.C1489 + "</a></li>");
            var m_liCtrl_6 = $("<li><a href='#viewSProdHandle'>" + mlm.C1565 + "</a></li>");
            m_ulCtrl.append(m_liCtrl_1);
            m_ulCtrl.append(m_liCtrl_2);
            m_ulCtrl.append(m_liCtrl_3);
            m_ulCtrl.append(m_liCtrl_4);
            m_ulCtrl.append(m_liCtrl_5);
            m_ulCtrl.append(m_liCtrl_6);
            this.viewSOTabs.append(m_ulCtrl);

            var m_soinfoContainer = $("<div id='viewSOInfo'></div>");
            var m_tableContainer = $("<div class='submitForm form-width-d'></div>");

            var m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C0938 + ":</span>");
            this.lbVSOCode = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSOCode);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0719 + ":</span>");
            this.lbVSOCust = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOCust);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0416 + ":</span>");
            this.lbVSSaleSite = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSSaleSite);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1490 + ":</span>");
            this.lbVSCreateTime = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSCreateTime);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            this.dvQSOCurrRate = $("<span class='left-cell'></span>");
            this.lbVSRateSymbol = $("<span class='title'>" + mlm.C0132 + ":</span>");
            this.lbVSRate = $("<span></span>");
            this.dvQSOCurrRate.append(this.lbVSRateSymbol);
            this.dvQSOCurrRate.append(this.lbVSRate);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0367 + ":</span>");
            this.lbVSSOState = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSSOState);
            m_trContainer.append(this.dvQSOCurrRate);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0073 + ":</span>");
            this.lbVSRemark = $("<span style='width: 920px; display: inline-block'></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSRemark);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            var m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0168 + "</span>"));
            var m_dvList = $("<div></div>");
            m_dvList.append("<table id='viewsoprodList'></table>");
            m_trContainer.append(m_title);
            m_trContainer.append(m_dvList);
            m_tableContainer.append(m_trContainer);

            m_soinfoContainer.append(m_tableContainer);

            var m_sexpinfoContainer = $("<div id='viewSExpInfo'></div>");
            m_tableContainer = $("<div class='submitForm form-width-d'></div>");

            m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1300 + ":</span>");
            this.lbVShipAddress = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVShipAddress);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1301 + ":</span>");
            this.lbVSOWeight = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSOWeight);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1302 + "(cm³)" + ":</span>");
            this.lbVSOVolumn = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOVolumn);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0468 + ":</span>");
            this.lbVSOExpService = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSOExpService);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0783 + ":</span>");
            this.lbVSOLstSolution = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOLstSolution);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1491 + ":</span>");
            this.lbVSOExpPrice = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSOExpPrice);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1375 + ":</span>");
            this.lbVSOExpCost = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOExpCost);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            this.dvVCustom_1 = $("<div class='submitForm-tr'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1466 + ":</span>");
            this.lbVSOEstimateShip = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVSOEstimateShip);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1467 + ":</span>");
            this.lbVSOEstimateArrive = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSOEstimateArrive);
            this.dvVCustom_1.append(m_leftTd);
            this.dvVCustom_1.append(m_rightTd);
            m_tableContainer.append(this.dvVCustom_1);

            this.dvVCustom_2 = $("<div class='submitForm-tr'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1306 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsocustomList'></table>");
            this.dvVCustom_2.append(m_title);
            this.dvVCustom_2.append(m_list);
            m_tableContainer.append(this.dvVCustom_2);

            m_sexpinfoContainer.append(m_tableContainer);

            var m_seohandleContainer = $("<div id='viewSEOHandle'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1278 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsoexpressorderList'></table>");
            m_seohandleContainer.append(m_title);
            m_seohandleContainer.append(m_list);

            var m_sfinancehandleContainer = $("<div id='viewSFinanceHandle'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0880 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsofinanceList'></table>");
            m_sfinancehandleContainer.append(m_title);
            m_sfinancehandleContainer.append(m_list);
            m_title = $("<div style='height: 30px; margin: 10px 0px 0px 0px'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0972 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsomoneyList'></table>");
            m_sfinancehandleContainer.append(m_title);
            m_sfinancehandleContainer.append(m_list);

            var m_sasphandleContainer = $("<div id='viewSASPHandle'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1392 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsoasproblemList'></table>");
            m_sasphandleContainer.append(m_title);
            m_sasphandleContainer.append(m_list);

            var m_sprodhandleContainer = $("<div id='viewSProdHandle'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1565 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vsohandleproductList'></table>");
            m_sprodhandleContainer.append(m_title);
            m_sprodhandleContainer.append(m_list);

            this.viewSOTabs.append(m_soinfoContainer);
            this.viewSOTabs.append(m_sexpinfoContainer);
            this.viewSOTabs.append(m_seohandleContainer);
            this.viewSOTabs.append(m_sfinancehandleContainer);
            this.viewSOTabs.append(m_sasphandleContainer);
            this.viewSOTabs.append(m_sprodhandleContainer);

            this.ctrl.append(this.viewSOTabs);
        },

        /* 展示配送服务 */
        show: function (saleorder_id) {

            var thisObj = this;
            bizcontrol.viewsaleorder.fn._activedobj = this;

            if (!this.viewSaleOrderFrm) {
                this.viewSaleOrderFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C1435, { width: 1125, position: ["auto", 15] });

                this.viewSOTabs.tabs();
                this.lbVShipAddress.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });
                this.lbVSRemark.tooltip({ bodyHandler: commoncore.func.showFullNameByTooltip, showURL: false });

                this.viewsoprodList = new uicontrol.tableList("viewsoprodList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 200,
                                        keyColumn: "SS_InnerProd_Id",
                                        columns: [{ display: mlm.C0180, name: "ProdPicUrl", width: 75, align: 'center', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructSSProdPicCell },
                                                { display: mlm.C0734, name: "", width: 420, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createSOProdCell },
                                                { display: mlm.C1493, name: "ListPrice", width: 90, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createVSOPriceCell },
                                                { display: mlm.C1058, name: "", width: 60, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createSODiscountCell },
                                                { display: mlm.C1494, name: "SalePrice", width: 90, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createVSOPriceCell },
                                                { display: mlm.C1098, name: "Qty", width: 50, align: 'right' },
                                                { display: mlm.C1551, name: "", width: 90, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createVSOTotalPriceCell}]
                                    });

                this.vsocustomList = new uicontrol.tableList("vsocustomList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 45,
                                        keyColumn: "SO_Custom_Id",
                                        columns: [{ display: mlm.C1307, name: "CustomProdName", width: 200, align: 'left' },
                                                { display: mlm.C1307, name: "CustomProdName_CN", width: 200, align: 'left' },
                                                { display: mlm.C1098, name: "CustomQty", width: 50, align: 'right' },
                                                { display: mlm.C1310, name: "CustomValue", width: 70, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createCustomValueCell },
                                                { display: mlm.C1311, name: "CustomCode", width: 110, align: 'left' },
                                                { display: mlm.C1313, name: "CustomMaterial", width: 90, align: 'left' },
                                                { display: mlm.C1312, name: "GlobalAreaName", width: 70, align: 'left'}]
                                    });

                this.vsoexpressorderList = new uicontrol.tableList("vsoexpressorderList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "ExpressOrder_Id",
                                        columns: [{ display: mlm.C1316, name: "EOCode", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructEOCodeCell },
                                                   { display: mlm.C0783, name: "", width: 210, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructLstSolutionCell },
                                                   { display: mlm.C1274, name: "WarehouseName", width: 120, align: 'left' },
                                                   { display: mlm.C1303, name: "", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructEOShipTimeCell },
                                                   { display: mlm.C1305, name: "", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructEOArriveTimeCell },
                                                   { display: mlm.C0367, name: "EOState", width: 90, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructEOStateCell },
                                                   { display: mlm.C1392, name: "", width: 200, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructASProblemCell}]
                                    });

                this.vsofinanceList = new uicontrol.tableList("vsofinanceList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FKey",
                                        columns: [{ display: mlm.C0751, name: "", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFCodeCell },
                                                  { display: mlm.C1495, name: "", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFTypeCell },
                                                  { display: mlm.C0750, name: "OperateTimeStr", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0722, name: "FTotalMoney", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createFMoneyCell },
                                                  { display: mlm.C0500, name: "State", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFStateCell },
                                                  { display: mlm.C1392, name: "", width: 200, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructASProblemCell}]
                                    });

                this.vsomoneyList = new uicontrol.tableList("vsomoneyList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FundFlowRecord_Id",
                                        columns: [{ display: mlm.C0724, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0511, name: "AccountOutRecord_Id", width: 60, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFlowActionCell },
                                                  { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                  { display: mlm.C0513, name: "FlowFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createFMoneyCell },
                                                  { display: mlm.C0514, name: "LosedFund", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createFMoneyCell },
                                                  { display: mlm.C0132, name: "Rate", width: 50, align: 'right' },
                                                  { display: mlm.C0751, name: "", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructFundRelCodeCell },
                                                  { display: mlm.C0518, name: "PRFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createFundAORCell}]
                                    });

                this.vsoasproblemList = new uicontrol.tableList("vsoasproblemList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 150,
                                        keyColumn: "AS_Problem_Id",
                                        columns: [{ display: mlm.C1392, name: "", width: 350, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructASProblemRemarkCell },
                                                   { display: mlm.C1406, name: "CreateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructCreateTimeCell },
                                                   { display: mlm.C1405, name: "", width: 70, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructReceiveRetCell },
                                                   { display: mlm.C1408, name: "", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructASPHandleTypeCell },
                                                   { display: mlm.C1489, name: "", width: 210, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructASPHandleCell },
                                                   { display: mlm.C0367, name: "", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructStateCell}]
                                    });

                this.vsohandleproductList = new uicontrol.tableList("vsohandleproductList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 200,
                                        keyColumn: "SkuProduct_Id",
                                        columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'center', adjust: true, createCell: bizcontrol.viewsaleorder.fn._constructProdPicCell },
                                                { display: mlm.C0734, name: "", width: 420, align: 'left', adjust: true, createCell: bizcontrol.viewsaleorder.fn._createSOGProdCell },
                                                { display: mlm.C1561, name: "Qty", width: 60, align: 'right' },
                                                { display: mlm.C0899, name: "RefundQty", width: 60, align: 'right' },
                                                { display: mlm.C1442, name: "ResendQty", width: 60, align: 'right' },
                                                { display: mlm.C0627, name: "OtherQty", width: 60, align: 'right' },
                                                { display: mlm.C1415, name: "ReceiveRetQty", width: 60, align: 'right'}]
                                    });
            }

            var m_saleorder = new sm.saleorder();
            m_saleorder.SaleOrder_Id = saleorder_id;
            m_saleorder.readFullSaleOrder(function (retObj) {

                thisObj.viewSaleOrderFrm.SaleOrder = retObj;

                thisObj.lbVSOCust.text(retObj.OtherProps.CustName);
                thisObj.lbVSOCode.text(retObj.SOCode);
                thisObj.lbVSSaleSite.text(retObj.OtherProps.SaleSiteName);
                thisObj.lbVSCreateTime.text(datastruct.convertion.convertToDateStr(retObj.OtherProps.CreateTimeStr));

                if (retObj.OtherProps.CurrName == retObj.OtherProps.SPfCurrName) {
                    thisObj.dvQSOCurrRate.hide();
                }
                else {
                    thisObj.dvQSOCurrRate.show();
                }
                thisObj.lbVSRate.text("1.00 " + retObj.OtherProps.SPfCurrCode + " = " + Number(retObj.CurrRate).toFixed(2) + " " + retObj.OtherProps.CurrCode);
                
                thisObj.lbVSRemark.text(commoncore.func.showSpecialChar(retObj.Remark));

                if (retObj.SOState == "0") {
                    thisObj.lbVSSOState.text(mlm.C1496);
                }
                else if (retObj.SOState == "3") {
                    thisObj.lbVSSOState.text(mlm.C1497);
                }
                else if (retObj.SOState == "5") {
                    thisObj.lbVSSOState.text(mlm.C1498);
                }
                else if (retObj.SOState == "18") {
                    thisObj.lbVSSOState.text(mlm.C0538);
                }
                else if (retObj.SOState == "30") {
                    thisObj.lbVSSOState.text(mlm.C1557);
                }
                else {
                    thisObj.lbVSSOState.text(mlm.C1425);
                }

                var m_addressArr = [];
                if (retObj.OtherProps.GlobalAreaName == "中国") {
                    m_addressArr.push(retObj.ExpService.RvFullName + ",");

                    if (retObj.ExpService.RvProvince) {
                        m_addressArr.push(retObj.ExpService.RvProvince);
                    }

                    if (retObj.ExpService.RvCity) {
                        m_addressArr.push(retObj.ExpService.RvCity);
                    }

                    if (retObj.ExpService.RvAddress_1) {
                        m_addressArr.push(retObj.ExpService.RvAddress_1);
                    }
                    if (retObj.ExpService.RvAddress_2) {
                        m_addressArr.push(retObj.ExpService.RvAddress_2);
                    }

                    if (retObj.ExpService.RvPostCode) {
                        m_addressArr.push("(" + retObj.ExpService.RvPostCode + ")");
                    }

                    thisObj.lbVShipAddress.text(commoncore.func.showSpecialChar(m_addressArr.join(" ")));
                }
                else {

                    m_addressArr.push(retObj.ExpService.RvFullName);

                    if (retObj.ExpService.RvAddress_1) {
                        m_addressArr.push(retObj.ExpService.RvAddress_1);
                    }
                    if (retObj.ExpService.RvAddress_2) {
                        m_addressArr.push(retObj.ExpService.RvAddress_2);
                    }
                    if (retObj.ExpService.RvCity) {
                        m_addressArr.push(retObj.ExpService.RvCity);
                    }
                    if (retObj.ExpService.RvProvince) {
                        m_addressArr.push(retObj.ExpService.RvProvince);
                    }
                    if (retObj.ExpService.RvPostCode) {
                        m_addressArr.push(retObj.ExpService.RvPostCode);
                    }
                    m_addressArr.push(retObj.OtherProps.GlobalAreaName);

                    thisObj.lbVShipAddress.text(commoncore.func.showSpecialChar(m_addressArr.join(", ")));
                }

                thisObj.lbVShipAddress.attr("tag", commoncore.func.showSpecialChar(commoncore.func.getRvAddressForView(retObj.ExpService)));

                thisObj.viewsoprodList.bindDataSource(retObj.Products);

                thisObj.lbVSOWeight.text(Number(retObj.ExpService.Weight).toFixed(3) + " " + retObj.OtherProps.WUnit);
                thisObj.lbVSOVolumn.text(retObj.ExpService.Length + "*" + retObj.ExpService.Width + "*" + retObj.ExpService.Height);
                thisObj.lbVSOExpService.text(retObj.ExpService.ExpressServiceName);
                thisObj.lbVSOLstSolution.text(retObj.ExpService.LstSolutionName + "(" + retObj.ExpService.LstCompanyName + ")");
                thisObj.lbVSOExpPrice.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.ExpService.ExpServicePrice));
                thisObj.lbVSOExpCost.html(commoncore.func.getCurrHtml(retObj.OtherProps.CurrSymbol, retObj.ExpService.ExpServiceCost));
                thisObj.lbVSOEstimateShip.text(commoncore.func.getTimeStrCell(retObj.OtherProps.EstimatedShipTimeStr));
                thisObj.lbVSOEstimateArrive.text(commoncore.func.getTimeStrCell(retObj.OtherProps.EstimatedArriveTimeStr));

                if (retObj.ExpService.OtherProps.WH_AreaIndexs) {
                    if (retObj.ExpService.OtherProps.WH_AreaIndexs.indexOf("#" + retObj.ExpService.GlobalArea_Id + "#") > -1) {
                        thisObj.dvVCustom_1.addClass("last-item");
                        var m_dvCustom = thisObj.dvVCustom_2;
                        m_dvCustom.removeClass("last-item");
                        m_dvCustom.hide();
                    }
                    else {
                        thisObj.dvVCustom_1.removeClass("last-item");
                        var m_dvCustom = thisObj.dvVCustom_2;
                        m_dvCustom.addClass("last-item");
                        m_dvCustom.show();
                    }
                }
                $.each(retObj.ExpService.Customs, function () {
                    this.GlobalAreaName = this.OtherProps.GlobalAreaName;
                    if (!this.GlobalAreaName) {
                        this.GlobalAreaName = "";
                    }
                });
                thisObj.vsocustomList.bindDataSource(retObj.ExpService.Customs);

                var m_expressorders = datastruct.convertion.strToObject(retObj.OtherProps.ExpressOrders);
                thisObj.vsoexpressorderList.bindDataSource(m_expressorders);

                var m_financerecords = datastruct.convertion.strToObject(retObj.OtherProps.FinanceRecords);
                var m_fkey = 1;
                $.each(m_financerecords, function () {
                    this.FKey = m_fkey;
                    m_fkey++;
                });
                thisObj.vsofinanceList.bindDataSource(m_financerecords);

                var m_fundflowrecords = datastruct.convertion.strToObject(retObj.OtherProps.FundFlowRecords);
                thisObj.vsomoneyList.bindDataSource(m_fundflowrecords);

                var m_asproblems = datastruct.convertion.strToObject(retObj.OtherProps.ASProblems);
                thisObj.vsoasproblemList.bindDataSource(m_asproblems);

                var m_handleproducts = datastruct.convertion.strToObject(retObj.OtherProps.HandleProducts);
                thisObj.vsohandleproductList.bindDataSource(m_handleproducts);
            });

            thisObj.viewSaleOrderFrm.show();
        },

        /*  */
        _constructSSProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewSSProduct.call(this, \"" + this.keyObj.SS_Product_Id + "\", \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /*  */
        _constructProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + key + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /*  */
        _createSOProdCell: function (key, cellValue) {
            var m_arr = [];
            m_arr.push("<a onclick='viewSSProduct.call(this, \"" + this.keyObj.SS_Product_Id + "\", \"" + key + "\")' href='javascript:void(\"0\");'>");
            m_arr.push("<span>" + this.keyObj.SkuProdCode + "</span> - ");
            m_arr.push("<span>" + this.keyObj.ProdName.replace(/\^/g, "\"").replace(/\~/g, "\'") + "</span>");

            if (this.keyObj.SkuProps) {
                m_arr.push(" - <span>[" + this.keyObj.SkuProps + "]</span>");
            }
            m_arr.push("</a>");

            var m_keyobj = this.keyObj;
            if (this.keyObj.GiftSource) {
                if (this.keyObj.GiftSource.length == 1) {
                    m_arr.push("<div style='margin: 5px 0px 0px 0px; padding: 0px; color: #666'><span style='margin: 0px 15px 0px 0px'>" + mlm.C1061 + ": </span><span>" + this.keyObj.GiftName + "</span>");
                }
                else if (this.keyObj.GiftSource.length > 1) {
                    m_arr.push("<div style='margin: 5px 0px 0px 0px; padding: 0px; color: #666'><span style='margin: 0px 15px 0px 0px'>" + mlm.C1061 + ": </span><select id='ddlSOGift_" + key + "' tag='" + key + "' class='dropdown-list' style='width: 220px' onchange='changeSOGift.call(this);'>");

                    $.each(this.keyObj.GiftSource, function () {
                        if (this.SS_Gift_Id == m_keyobj.SS_Gift_Id) {
                            m_arr.push("<option value='" + this.SS_Gift_Id + "' selected='selected'>" + this.GiftName + "</option>");
                        }
                        else {
                            m_arr.push("<option value='" + this.SS_Gift_Id + "'>" + this.GiftName + "</option>");
                        }
                    });
                    m_arr.push("</select></div>");
                }
            }

            return m_arr.join("");
        },
        /*  */
        _createSOGProdCell: function (key, cellValue) {
            var m_arr = [];
            m_arr.push("<a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + key + "\")' href='javascript:void(\"0\");'>");
            m_arr.push("<span>" + this.keyObj.SkuProdCode + "</span> - ");
            m_arr.push("<span>" + this.keyObj.ProdName + "</span>");

            if (this.keyObj.SkuProps) {
                m_arr.push(" - <span>[" + this.keyObj.SkuProps + "]</span>");
            }
            m_arr.push("</a>");

            return m_arr.join("");
        },
        /*  */
        _createVSOPriceCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(bizcontrol.viewsaleorder.fn._activedobj.viewSaleOrderFrm.SaleOrder.OtherProps.CurrSymbol, cellValue);
        },
        /*  */
        _createSODiscountCell: function (key, cellValue) {
            var m_listprice = Number(this.keyObj.ListPrice);
            var m_saleprice = Number(this.keyObj.SalePrice);
            if (m_listprice > 0 && m_saleprice > 0) {
                return ((m_saleprice / m_listprice) * 100).toFixed(2) + "%";
            }
            else {
                return "100.00%"
            }
        },
        /*  */
        _createVSOTotalPriceCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(bizcontrol.viewsaleorder.fn._activedobj.viewSaleOrderFrm.SaleOrder.OtherProps.CurrSymbol, Number(this.keyObj.SalePrice) * Number(this.keyObj.Qty));
        },
        /*  */
        _createCustomValueCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(keycontext.keyparam.tax_syscurrsymbol, cellValue);
        },
        /*  */
        _constructEOCodeCell: function (key, cellValue) {
            return "<a onclick='viewExpressOrder.call(this, \"" + this.keyObj.ExpressOrder_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.EOCode + "</a>";
        },
        /*  */
        _constructLstSolutionCell: function (key, cellValue) {
            return "<a onclick='openViewLstSolution.call(this, \"" + this.keyObj.LstSolution_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.LstSolutionName + "(" + this.keyObj.LstCompanyName + ")" + "</a>";
        },
        /*  */
        _constructEOShipTimeCell: function (key, cellValue) {
            var m_arr = [];

            if (this.keyObj.ShipTimeStr) {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.ShipTimeStr) + "</div>");
            }
            else {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.EstimatedShipTimeStr) + "</div>");
                m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>(" + mlm.C1324 + ")</div>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructEOArriveTimeCell: function (key, cellValue) {
            if (this.keyObj.EOState == "30" || this.keyObj.EOState == "40") {
                return "";
            }

            var m_arr = [];

            if (this.keyObj.ArriveTimeStr) {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.ArriveTimeStr) + "</div>");
            }
            else {
                m_arr.push("<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.EstimatedArriveTimeStr) + "</div>");
                m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>(" + mlm.C1326 + ")</div>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructEOStateCell: function (key, cellValue) {
            var m_arr = [];

            if (this.keyObj.EOState == "0") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1280 + "</div>");
            }
            else if (this.keyObj.EOState == "10") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1281 + "</div>");
            }
            else if (this.keyObj.EOState == "20") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1282 + "</div>");

                if (this.keyObj.IsTrack == "1") {
                    if (!this.keyObj.TrackingNumber) {
                        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666'>" + mlm.C1327 + "</div>");
                    }
                    else {
                        m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + this.keyObj.TrackingNumber + "</div>");
                    }
                }
            }
            else if (this.keyObj.EOState == "30") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1328 + "</div>");
            }
            else if (this.keyObj.EOState == "40") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1329 + "</div>");
            }
            else if (this.keyObj.EOState == "50") {
                m_arr.push("<div style='padding: 0px;'>" + mlm.C1330 + "</div>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructFCodeCell: function (key, cellValue) {
            if (this.keyObj.FBType == "2") {
                return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.FRId + "\")' href='javascript:void(\"0\");'>" + this.keyObj.FCode + "</a>";
            }
            else {
                return "<a onclick='viewReceiveIn.call(this, \"" + this.keyObj.FRId + "\")' href='javascript:void(\"0\");'>" + this.keyObj.FCode + "</a>";
            }
        },
        /*  */
        _constructFTypeCell: function (key, cellValue) {
            if (this.keyObj.FBType == "1") {
                var m_type = "";
                if (this.keyObj.FType == "1") {
                    m_type = mlm.C0506;
                }
                else if (this.keyObj.FType == "3") {
                    m_type = mlm.C0854;
                }
                else if (this.keyObj.FType == "4") {
                    m_type = mlm.C0855;
                }
                else if (this.keyObj.FType == "5") {
                    m_type = mlm.C0627;
                }
                else if (this.keyObj.FType == "10") {
                    m_type = mlm.C0891;
                }

                return mlm.C1499 + "(" + m_type + ")";
            }
            else {
                if (this.keyObj.CostSubjectName) {
                    return mlm.C1500 + "(" + this.keyObj.CostSubjectName + ")";
                }
                else {
                    return mlm.C1500;
                }

            }
        },
        /*  */
        _constructFOperateTimeCell: function (key, cellValue) {
            return commoncore.func.getTimeStrCell(cellValue);
        },
        /*  */
        _createFMoneyCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
        },
        /*  */
        _constructFStateCell: function (key, cellValue) {
            var m_obj = this.keyObj;
            var m_arr = [];

            if (this.keyObj.FBType == "1") {
                if (cellValue == "1") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0508 + "</div>");
                }
                else if (cellValue == "2") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0509 + "</div>");

                    var m_freezeprfund = Number(m_obj.FreezePRFund);
                    if (m_freezeprfund > 0) {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(<span>" + mlm.C0869 + ": </span><span class='content-td'>" + commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_freezeprfund) + "</span>)</div>");
                    }
                    var m_unfund = Number((Number(m_obj.Receive) - Number(m_obj.ReceivedIn) - Number(m_obj.FreezePRFund)).toFixed(2));
                    if (m_unfund > 0) {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(<span>" + mlm.C0870 + ": </span><span class='content-td'>" + commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_unfund) + "</span>)</div>");
                    }
                }
                else if (cellValue == "3") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0539 + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0493 + "</div>");
                }
            }
            else {

                if (cellValue == "1") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0490 + "</div>");
                }
                else if (cellValue == "2") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0491 + "</div>");
                    m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(" + mlm.C0868 + ": " + commoncore.func.getCurrHtml(m_obj.CurrSymbol, (Number(m_obj.Payout) - Number(m_obj.Paidout))) + ")</div>");
                }
                else if (cellValue == "3") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0492 + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0493 + "</div>");
                }
            }

            return m_arr.join("");
        },
        /*  */
        _constructFlowActionCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            if (cellValue && cellValue != "0") {
                return mlm.C0541;
            }
            else {
                return mlm.C0542;
            }
        },
        /*  */
        _createVSORateCell: function (key, cellValue) {
            return Number(cellValue).toFixed(4);
        },
        /*  */
        _constructFundRelCodeCell: function (key, cellValue) {
            if (this.keyObj.AccountOutRecord_Id && this.keyObj.AccountOutRecord_Id != "0") {
                return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.AccountOutRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ObjCode + "</a>";
            }
            else {
                return "<a onclick='viewReceiveIn.call(this, \"" + this.keyObj.AccountInRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ObjCode + "</a>";
            }
        },
        /*  */
        _createFundAORCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.AORCurrSymbol, cellValue);
        },
        /*  */
        _constructASProblemCell: function (key, cellValue) {
            if (Number(this.keyObj.AS_Problem_Id) > 0) {
                var m_arr = [];
                var m_str = "";
                if (this.keyObj.ProblemType == "1") {
                    m_str = mlm.C1418;
                }
                else if (this.keyObj.ProblemType == "2") {
                    m_str = mlm.C1419;
                }
                else if (this.keyObj.ProblemType == "3") {
                    m_str = mlm.C1420;
                }
                else {
                    m_str = mlm.C1421;
                }
                m_arr.push("<div style='padding: 0px'><a onclick='viewASProblem.call(this, \"" + this.keyObj.AS_Problem_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ASPCode + "</a> (" + m_str + ")</div>");

                return m_arr.join("");
            }
        },
        /*  */
        _constructASProblemRemarkCell: function (key, cellValue) {
            var m_arr = [];

            var m_str = "";
            if (this.keyObj.ProblemType == "1") {
                m_str = mlm.C1418;
            }
            else if (this.keyObj.ProblemType == "2") {
                m_str = mlm.C1419;
            }
            else if (this.keyObj.ProblemType == "3") {
                m_str = mlm.C1420;
            }
            else if (this.keyObj.ProblemType == "4") {
                m_str = mlm.C1421;
            }
            else if (this.keyObj.ProblemType == "5") {
                m_str = mlm.C1559;
            }
            else if (this.keyObj.ProblemType == "6") {
                m_str = mlm.C1560;
            }
            else {
                m_str = mlm.C0627;
            }
            m_arr.push("<div style='padding: 0px'><a onclick='viewASProblem.call(this, \"" + this.keyObj.AS_Problem_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ASPCode + "</a> (" + m_str + ")</div>");
            m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>" + this.keyObj.ProblemRemark + "</div>");

            return m_arr.join("");
        },
        /*  */
        _constructCreateTimeCell: function (key, cellValue) {
            return "<div style='padding: 0px;'>" + commoncore.func.getTimeStrCell(this.keyObj.CreateTimeStr) + "</div>";
        },
        /*  */
        _constructReceiveRetCell: function (key, cellValue) {
            var m_arr = [];

            if (this.keyObj.ProblemType == "1" || this.keyObj.ProblemType == "2" || this.keyObj.ProblemType == "5") {
                if (this.keyObj.CustReturn == "1") {
                    if (!this.keyObj.ReceiveRetFlag || this.keyObj.ReceiveRetFlag == "0") {
                        m_arr.push("<span>" + mlm.C1443 + "</span>");
                    }
                    else if (this.keyObj.ReceiveRetFlag == "1") {
                        m_arr.push("<span>" + mlm.C1444 + "</span>");
                    }
                    else if (this.keyObj.ReceiveRetFlag == "2") {
                        m_arr.push("<span>" + mlm.C1445 + "</span>");
                    }
                    else if (this.keyObj.ReceiveRetFlag == "3") {
                        m_arr.push("<span>" + mlm.C1446 + "</span>");
                    }
                    else {
                        m_arr.push("<span>" + mlm.C1447 + "</span>");
                    }
                }
            }

            return m_arr.join("");
        },
        /*  */
        _constructASPHandleTypeCell: function (key, cellValue) {
            var m_arr = [];
            if (this.keyObj.HandleType == "0") {
                m_arr.push("<div style='padding: 0px; '>" + mlm.C0627 + "</div>");
            }
            else if (this.keyObj.HandleType == "1") {
                m_arr.push("<div style='padding: 0px; '>" + mlm.C1427 + "</div>");
                m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(" + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.Refund) + ")</div>");
            }
            else {
                m_arr.push("<div style='padding: 0px; '>" + mlm.C1428 + "</div>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructASPHandleCell: function (key, cellValue) {
            var m_arr = [];
            if (this.keyObj.HandleType == "1") {
                if (this.keyObj.State == "10") {
                    var m_remaining = Number(this.keyObj.Remaining);

                    if (m_remaining == 0) {
                        m_arr.push("<div style='padding: 0px; color: #000000;'>" + mlm.C1552 + "</div>");

                        if (Number(this.keyObj.PRFund) > 0) {
                            m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000;'>" + mlm.C0872 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.PRFund) + "</div>");
                        }
                    }
                    else {
                        m_arr.push("<div style='padding: 0px; color: #000000;'>" + mlm.C1432 + "</div>");

                        if (this.keyObj.BillType == "1") {
                            m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000;'>" + mlm.C1519 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, m_remaining) + "</div>");

                            if (Number(this.keyObj.PRFund) > 0) {
                                m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000;'>" + mlm.C0872 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, this.keyObj.PRFund) + "</div>");
                            }
                        }
                        else {
                            m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #DD0000'>" + mlm.C1520 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, m_remaining) + "</div>");
                        }
                    }
                }
                else {
                    var m_done = Number(this.keyObj.Done);
                    if (m_done > 0) {
                        if (this.keyObj.BillType == "1") {
                            m_arr.push("<div style='padding: 0px;'>" + mlm.C1564 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, m_done) + "</div>");
                        }
                        else {
                            m_arr.push("<div style='padding: 0px;'>" + mlm.C0910 + ": " + commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, m_done) + "</div>");
                        }
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>" + this.keyObj.HandleRemark + "</div>");
                    }
                    else {
                        m_arr.push("<div style='padding: 0px;'>" + this.keyObj.HandleRemark + "</div>");
                    }
                }
            }
            else if (this.keyObj.HandleType == "2") {
                if (this.keyObj.State == "0") {
                    m_arr.push("<div style='padding: 0px; '>" + this.keyObj.LstSolutionName + ", " + commoncore.func.getTimeStrCell(this.keyObj.EstimatedShipTimeStr) + mlm.C1562 + "</div>");
                }
                else if (this.keyObj.State == "10") {
                    if (this.keyObj.EOState == "0") {
                        m_arr.push("<div style='padding: 0px;'>" + mlm.C1280 + "</div>");

                        if (Number(this.keyObj.EstimatedShipDiff) > 0) {
                            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + "(" + mlm.C1323 + this.keyObj.EstimatedShipDiff + mlm.C0800 + ")" + "</div>");
                        }
                    }
                    else if (this.keyObj.EOState == "10") {
                        m_arr.push("<div style='padding: 0px;'>" + mlm.C1281 + "</div>");

                        if (Number(this.keyObj.EstimatedShipDiff) > 0) {
                            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + "(" + mlm.C1323 + this.keyObj.EstimatedShipDiff + mlm.C0800 + ")" + "</div>");
                        }
                    }
                    else if (this.keyObj.EOState == "20") {
                        m_arr.push("<div style='padding: 0px;'>" + mlm.C1282 + "</div>");

                        if (Number(this.keyObj.EstimatedArriveDiff) > 0) {
                            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + "(" + mlm.C1325 + this.keyObj.EstimatedArriveDiff + mlm.C0800 + ")" + "</div>");
                        }
                    }
                    else if (this.keyObj.EOState == "30") {
                        m_arr.push("<div style='padding: 0px;'>" + mlm.C1328 + "</div>");
                    }
                    else if (this.keyObj.EOState == "40") {
                        m_arr.push("<div style='padding: 0px;'>" + mlm.C1329 + "</div>");
                    }
                    else if (this.keyObj.EOState == "50") {
                        m_arr.push("<div style='padding: 0px;'>" + mlm.C1330 + "</div>");

                        if (Number(this.keyObj.ArriveDiff) > 0) {
                            m_arr.push("<div style='padding: 3px 0px 0px 0px; color: #666;'>" + "(" + mlm.C1325 + this.keyObj.ArriveDiff + mlm.C0800 + ")" + "</div>");
                        }
                    }
                }
                else {
                    m_arr.push("<div style='padding: 0px;'>" + this.keyObj.HandleRemark + "</div>");
                }
            }
            else {
                m_arr.push("<div style='padding: 0px; '>" + this.keyObj.HandleRemark + "</div>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructStateCell: function (key, cellValue) {
            var m_str = "";
            if (this.keyObj.State == "0") {
                m_str = mlm.C1424;
            }
            else if (this.keyObj.State == "10") {
                m_str = mlm.C1425;
            }
            else if (this.keyObj.State == "20") {
                m_str = mlm.C1557;
            }

            return m_str;
        }
    };

    bizcontrol.viewsaleorder.fn.init.prototype = bizcontrol.viewsaleorder.fn;

})(window);

(function (window) {

    if (!window.bizcontrol) {
        window.bizcontrol = {};
    }

    /* 
    -----采购订单查看控件----- 
    */
    bizcontrol.viewpurchaseorder = function () {
        var obj = new bizcontrol.viewpurchaseorder.fn.init();
        return obj;
    };
    bizcontrol.viewpurchaseorder.fn = {

        /* 构造函数 */
        init: function () {
            this.ctrl = $("<div id='viewPurchaseOrderFrm' style='display: none;'></div>");

            this.vpoTab = $("<div id='viewPOTabs'></div>");
            var m_ulCtrl = $("<ul></ul>");
            this.lkViewPOInfo = $("<a href='#viewPOInfo'>" + mlm.C1393 + "</a>");
            var m_liPOCtrl = $("<li></li>");
            m_liPOCtrl.append(this.lkViewPOInfo);
            var m_lkViewPOFinance = $("<li><a href='#viewPOFinance'>" + mlm.C1488 + "</a></li>");
            var m_lkViewPODelivery = $("<li><a href='#viewPODelivery'>" + mlm.C1579 + "</a></li>");
            m_ulCtrl.append(m_liPOCtrl);
            m_ulCtrl.append(m_lkViewPOFinance);
            m_ulCtrl.append(m_lkViewPODelivery);
            this.vpoTab.append(m_ulCtrl);

            var m_poContainer = $("<div id='viewPOInfo'></div>");
            var m_tableContainer = $("<div class='submitForm form-width-b'></div>");

            var m_trContainer = $("<div class='submitForm-tr first-item'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C0893 + ":</span>");
            this.lbVPOCode = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVPOCode);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1069 + ":</span>");
            this.lbVSuppName = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVSuppName);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            var m_trContainer = $("<div class='submitForm-tr'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C1569 + ":</span>");
            this.lbVCreateTime = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVCreateTime);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1467 + ":</span>");
            this.lbVEstimateArriveTime = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVEstimateArriveTime);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            var m_trContainer = $("<div class='submitForm-tr'></div>");
            var m_leftTd = $("<span class='left-cell'></span>");
            var m_lbSymbol = $("<span class='title'>" + mlm.C1570 + ":</span>");
            this.lbVRevType = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVRevType);
            var m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1202 + ":</span>");
            this.lbVInWarehouse = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVInWarehouse);
            m_trContainer.append(m_leftTd);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1599 + ":</span>");
            this.lbVReceiveRemark = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVReceiveRemark);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_trContainer = $("<div class='submitForm-tr'></div>");
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0073 + ":</span>");
            this.lbVPORemark = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVPORemark);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            var m_trProduct = $("<div class='submitForm-tr'></div>");
            var m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1264 + mlm.C0463 + "</span>"));
            var m_dvVPOProductList = $("<div></div>");
            m_dvVPOProductList.append("<table id='vpoproductList'></table>");
            m_trProduct.append(m_title);
            m_trProduct.append(m_dvVPOProductList);
            m_tableContainer.append(m_trProduct);

            m_trContainer = $("<div class='submitForm-tr last-item'></div>");
            m_leftTd = $("<span class='left-cell'></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C0789 + ":</span>");
            this.lbVOtherCharge = $("<span></span>");
            m_leftTd.append(m_lbSymbol);
            m_leftTd.append(this.lbVOtherCharge);
            m_trContainer.append(m_leftTd);
            m_rightTd = $("<span></span>");
            m_lbSymbol = $("<span class='title'>" + mlm.C1571 + ":</span>");
            this.lbVTotalPrice = $("<span></span>");
            m_rightTd.append(m_lbSymbol);
            m_rightTd.append(this.lbVTotalPrice);
            m_trContainer.append(m_rightTd);
            m_tableContainer.append(m_trContainer);

            m_poContainer.append(m_tableContainer);

            var m_pofinanceContainer = $("<div id='viewPOFinance'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0880 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vpofinanceList'></table>");
            m_pofinanceContainer.append(m_title);
            m_pofinanceContainer.append(m_list);
            m_title = $("<div style='height: 30px; margin: 10px 0px 0px 0px'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C0972 + mlm.C0463 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vpomoneyList'></table>");
            m_pofinanceContainer.append(m_title);
            m_pofinanceContainer.append(m_list);

            var m_podeliveryContainer = $("<div id='viewPODelivery'></div>");
            m_title = $("<div style='height: 30px;'></div>");
            m_title.append($("<span class='lb-title list-title'>" + mlm.C1192 + "</span>"));
            m_list = $("<div></div>");
            m_list.append("<table id='vpoinstockList'></table>");
            m_podeliveryContainer.append(m_title);
            m_podeliveryContainer.append(m_list);

            this.vpoTab.append(m_poContainer);
            this.vpoTab.append(m_pofinanceContainer);
            this.vpoTab.append(m_podeliveryContainer);

            this.ctrl.append(this.vpoTab);
        },

        /* 展示采购订单 */
        show: function (purchaseorder_id) {
            var thisObj = this;

            if (!this.viewPOFrm) {
                this.viewPOFrm = new uicontrol.dialog(this.ctrl, mlm.C0672 + mlm.C1393, { width: 1025, position: ["auto", 5] });

                this.vpoproductList = new uicontrol.tableList("vpoproductList",
                                     { autoSeq: true,
                                         keyColumn: "SkuProduct_Id",
                                         height: 200,
                                         pageQueryHandler: queryPurchasePlan,
                                         columns: [{ display: mlm.C0180, name: "BrowsePicUrl", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructProdPicCell },
                                                   { display: mlm.C0734, name: "", width: 300, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 50, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C1586, name: "QuotedPrice", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructQuotedPriceCell },
                                                   { display: mlm.C1494, name: "Price", width: 75, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructQuotedPriceCell },
                                                   { display: mlm.C1551, name: "TotalPrice", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructQuotedPriceCell },
                                                   { display: mlm.C1587, name: "ReceiveRetQty", width: 50, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell}]
                                     });

                this.vpofinanceList = new uicontrol.tableList("vpofinanceList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FKey",
                                        columns: [{ display: mlm.C0751, name: "", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFCodeCell },
                                                  { display: mlm.C1495, name: "", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFTypeCell },
                                                  { display: mlm.C0750, name: "OperateTimeStr", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0722, name: "FTotalMoney", width: 120, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._createFMoneyCell },
                                                  { display: mlm.C0500, name: "State", width: 180, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFStateCell}]
                                    });

                this.vpomoneyList = new uicontrol.tableList("vpomoneyList",
                                    { isPaging: false,
                                        autoSeq: true,
                                        height: 120,
                                        keyColumn: "FundFlowRecord_Id",
                                        columns: [{ display: mlm.C0724, name: "OperateTimeStr", width: 80, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFOperateTimeCell },
                                                  { display: mlm.C0511, name: "AccountOutRecord_Id", width: 60, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFlowActionCell },
                                                  { display: mlm.C0510, name: "FundAccount", width: 220, align: 'left' },
                                                  { display: mlm.C0513, name: "FlowFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._createFMoneyCell },
                                                  { display: mlm.C0514, name: "LosedFund", width: 80, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._createFMoneyCell },
                                                  { display: mlm.C0132, name: "Rate", width: 50, align: 'right' },
                                                  { display: mlm.C0751, name: "", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFundRelCodeCell },
                                                  { display: mlm.C0518, name: "PRFund", width: 115, align: 'right', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._createFundAORCell}]
                                    });

                this.vpoinstockList = new uicontrol.tableList("vpoinstockList",
                                     { autoSeq: true,
                                         isPaging: false,
                                         keyColumn: "InOutStock_Item_Id",
                                         height: 300,
                                         columns: [{ display: mlm.C1397, name: "OperatedTimeStr", width: 75, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructFOperateTimeCell },
                                                   { display: mlm.C1401, name: "Action", width: 100, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructActionCell },
                                                   { display: mlm.C1196, name: "", width: 150, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructWarehouseCell },
                                                   { display: mlm.C1162, name: "ProdName", width: 300, align: 'left', adjust: true, createCell: bizcontrol.viewpurchaseorder.fn._constructProdCell },
                                                   { display: mlm.C1098, name: "Qty", width: 80, align: 'right', adjust: true, createCell: commoncore.func.constructQtyCell },
                                                   { display: mlm.C0501, name: "FullName", width: 100, align: 'left'}]
                                     });

                this.vpoTab.tabs();
            }

            var m_purchaseorder = new pom.purchaseorder();
            m_purchaseorder.PurchaseOrder_Id = purchaseorder_id;
            m_purchaseorder.readPurchaseOrder(function (retObj) {

                var m_postr = retObj.POCode;
                if (retObj.State == "0") {
                    m_postr += "(" + mlm.C0375 + ")";
                }
                else if (retObj.State == "10") {
                    m_postr += "(" + mlm.C1425 + ")";
                }
                else if (retObj.State == "20") {
                    m_postr += "(" + mlm.C1557 + ")";
                }
                thisObj.lbVPOCode.text(m_postr);

                thisObj.lbVSuppName.text(retObj.OtherProps.SuppName);
                thisObj.lbVCreateTime.text(datastruct.convertion.convertToDateStr(retObj.OtherProps.CreateTimeStr));
                thisObj.lbVEstimateArriveTime.text(datastruct.convertion.convertToDateStr(retObj.OtherProps.EstimateArriveTimeStr));
                thisObj.lbVInWarehouse.text(retObj.OtherProps.WarehouseName);
                if (retObj.RevType == "1") {
                    thisObj.lbVRevType.text(mlm.C1597);
                }
                else {
                    thisObj.lbVRevType.text(mlm.C1598);
                }
                thisObj.lbVReceiveRemark.text(retObj.RevRemark);
                thisObj.lbVPORemark.text(retObj.Remark);
                thisObj.lbVOtherCharge.html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, retObj.OtherCharge));
                thisObj.lbVTotalPrice.html(commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, retObj.TotalPrice));

                $.each(retObj.Products, function () {
                    this.BrowsePicUrl = this.OtherProps.BrowsePicUrl;
                    this.SkuProdCode = this.OtherProps.SkuProdCode;
                    this.ProdName = this.OtherProps.ProdName;
                    this.Unit = this.OtherProps.Unit;
                    this.SkuProps = this.OtherProps.SkuProps;
                    this.TotalPrice = Number(this.Qty) * Number(this.Price);
                });
                thisObj.vpoproductList.bindDataSource(retObj.Products);

                var m_financerecords = datastruct.convertion.strToObject(retObj.OtherProps.FinanceRecords);
                var m_fkey = 1;
                $.each(m_financerecords, function () {
                    this.FKey = m_fkey;
                    m_fkey++;
                });
                thisObj.vpofinanceList.bindDataSource(m_financerecords);

                var m_fundflowrecords = datastruct.convertion.strToObject(retObj.OtherProps.FundFlowRecords);
                thisObj.vpomoneyList.bindDataSource(m_fundflowrecords);

                var m_inoutstacks = datastruct.convertion.strToObject(retObj.OtherProps.InOutStockTable);
                thisObj.vpoinstockList.bindDataSource(m_inoutstacks);

            });

            thisObj.viewPOFrm.show();

            thisObj.lkViewPOInfo.trigger("click");
        },

        /*  */
        _constructProdPicCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            var m_src = "";
            if (cellValue) {
                if (cellValue.indexOf("http://") == -1) {
                    m_src = window.webLocation + cellValue;
                }
                else {
                    m_src = cellValue;
                }
            }
            else {
                m_src = window.webLocation + "BZM/Css/Images/nopic.png";
            }

            return "<div style='height: 70px; padding: 0px; border: 1px solid #ccc;'><img class='product-list-img-ssl' style='border: 0px' onload='commoncore.func.positionCenterImg.call(this, 60);' onerror='commoncore.func.failLoadImg.call(this, 60);' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' src='" + m_src + "' onerror='commoncore.func.failLoadImg.call(this);' /></div>";
        },
        /*  */
        _constructProdCell: function (key, cellValue) {
            var m_arr = [];
            if (this.keyObj.Type == "2") {
                m_arr.push("<a style='color: #666666' onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a>");
                m_arr.push(" (<span style='color: #666666'>" + mlm.C1061 + "</span>)");
            }
            else {
                m_arr.push("<a onclick='viewProduct.call(this, \"" + this.keyObj.Product_Id + "\", \"" + this.keyObj.SkuProduct_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.SkuProdCode + " - " + this.keyObj.ProdName + " - [" + this.keyObj.SkuProps + "]</a>");
            }

            return m_arr.join("");
        },
        /*  */
        _constructQuotedPriceCell: function (key, cellValue) {
            if (Number(cellValue) > 0) {
                return commoncore.func.getCurrHtml(keycontext.keyparam.syscurrsymbol, cellValue);
            }
        },
        /*  */
        _constructAORCodeCell: function (key, cellValue) {
            return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.AccountOutRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.AORCode + "</a>";
        },
        /*  */
        _constructFCodeCell: function (key, cellValue) {
            if (this.keyObj.FBType == "2") {
                return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.FRId + "\")' href='javascript:void(\"0\");'>" + this.keyObj.FCode + "</a>";
            }
            else {
                return "<a onclick='viewReceiveIn.call(this, \"" + this.keyObj.FRId + "\")' href='javascript:void(\"0\");'>" + this.keyObj.FCode + "</a>";
            }
        },
        /*  */
        _constructFTypeCell: function (key, cellValue) {
            if (this.keyObj.FBType == "1") {
                var m_type = "";
                if (this.keyObj.FType == "1") {
                    m_type = mlm.C0506;
                }
                else if (this.keyObj.FType == "3") {
                    m_type = mlm.C0854;
                }
                else if (this.keyObj.FType == "4") {
                    m_type = mlm.C0855;
                }
                else if (this.keyObj.FType == "5") {
                    m_type = mlm.C0627;
                }
                else if (this.keyObj.FType == "10") {
                    m_type = mlm.C0891;
                }

                return mlm.C1499 + "(" + m_type + ")";
            }
            else {
                if (this.keyObj.CostSubjectName) {
                    return mlm.C1500 + "(" + this.keyObj.CostSubjectName + ")";
                }
                else {
                    return mlm.C1500;
                }

            }
        },
        /*  */
        _constructFOperateTimeCell: function (key, cellValue) {
            return commoncore.func.getTimeStrCell(cellValue);
        },
        /*  */
        _createFMoneyCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.CurrSymbol, cellValue);
        },
        /*  */
        _constructFStateCell: function (key, cellValue) {
            var m_obj = this.keyObj;
            var m_arr = [];

            if (this.keyObj.FBType == "1") {
                if (cellValue == "1") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0508 + "</div>");
                }
                else if (cellValue == "2") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0509 + "</div>");

                    var m_freezeprfund = Number(m_obj.FreezePRFund);
                    if (m_freezeprfund > 0) {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(<span>" + mlm.C0869 + ": </span><span class='content-td'>" + commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_freezeprfund) + "</span>)</div>");
                    }
                    var m_unfund = Number((Number(m_obj.Receive) - Number(m_obj.ReceivedIn) - Number(m_obj.FreezePRFund)).toFixed(2));
                    if (m_unfund > 0) {
                        m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(<span>" + mlm.C0870 + ": </span><span class='content-td'>" + commoncore.func.getCurrHtml(m_obj.CurrSymbol, m_unfund) + "</span>)</div>");
                    }
                }
                else if (cellValue == "3") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0539 + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0493 + "</div>");
                }
            }
            else {

                if (cellValue == "1") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0490 + "</div>");
                }
                else if (cellValue == "2") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0491 + "</div>");
                    m_arr.push("<div style='padding: 2px 0px 0px 0px; color: #666'>(" + mlm.C0868 + ": " + commoncore.func.getCurrHtml(m_obj.CurrSymbol, (Number(m_obj.Payout) - Number(m_obj.Paidout))) + ")</div>");
                }
                else if (cellValue == "3") {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0492 + "</div>");
                }
                else {
                    m_arr.push("<div style='padding: 0px'>" + mlm.C0493 + "</div>");
                }
            }

            return m_arr.join("");
        },
        /*  */
        _constructFlowActionCell: function (key, cellValue) {
            var m_obj = this.keyObj;

            if (cellValue && cellValue != "0") {
                return mlm.C0541;
            }
            else {
                return mlm.C0542;
            }
        },
        /*  */
        _createVSORateCell: function (key, cellValue) {
            return Number(cellValue).toFixed(4);
        },
        /*  */
        _constructFundRelCodeCell: function (key, cellValue) {
            if (this.keyObj.AccountOutRecord_Id && this.keyObj.AccountOutRecord_Id != "0") {
                return "<a onclick='viewAccountOut.call(this, \"" + this.keyObj.AccountOutRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ObjCode + "</a>";
            }
            else {
                return "<a onclick='viewReceiveIn.call(this, \"" + this.keyObj.AccountInRecord_Id + "\")' href='javascript:void(\"0\");'>" + this.keyObj.ObjCode + "</a>";
            }
        },
        /*  */
        _createFundAORCell: function (key, cellValue) {
            return commoncore.func.getCurrHtml(this.keyObj.AORCurrSymbol, cellValue);
        },
        /*  */
        _constructActionCell: function (key, cellValue) {
            var m_arr = [];
            if (cellValue == "1") {

                if (this.keyObj.StockInType == "1") {
                    m_arr.push(mlm.C1394);
                }
                else if (this.keyObj.StockInType == "2") {
                    m_arr.push(mlm.C1395);
                }
                else {
                    m_arr.push(mlm.C1188);
                }
            }
            else if (cellValue == "2") {
                m_arr.push(mlm.C1189);
            }
            else {
                m_arr.push(mlm.C1190);
            }

            return m_arr.join("");
        },
        /*  */
        _constructWarehouseCell: function (key, cellValue) {
            if (this.keyObj.FromWarehouse) {
                if (this.keyObj.ToWarehouse) {
                    return "<span>" + this.keyObj.FromWarehouse + "->" + this.keyObj.ToWarehouse + "</span>";
                }
                else {
                    return "<span>" + this.keyObj.FromWarehouse + "</span>";
                }
            }
            else {
                if (this.keyObj.ToWarehouse) {
                    return "<span>" + this.keyObj.ToWarehouse + "</span>";
                }
            }
        }
    };

    bizcontrol.viewpurchaseorder.fn.init.prototype = bizcontrol.viewpurchaseorder.fn;

})(window);

(function (window) {

    window.jsdir = "/BZM/Scripts/MLM/Compress/";
    window.cssdir = "/BZM/Css/MLM/";
    window.webLocation = window.location.protocol + "//" + window.location.host + "/";

    /* 
    -----多语言函数----- 
    */
    window.mlm = {

        /* 默认语言 */
        defaultLanguage: "简体中文!zh-cn",

        /* 当前语言 */
        currLanguage: "",

        /* 所有语言种类 */
        languages: [],

        /* 语言种类绑定事件 */
        bindLanguageEvent: [],

        /* 初始化当前语言 */
        init: function () {

            var m_cookielan = runtime.clientRunSetting.getUserSetting("lanuage");
            if (!m_cookielan) {
                m_cookielan = mlm.defaultLanguage;
                runtime.clientRunSetting.storeUserSetting("lanuage", m_cookielan);
            }
            var m_arr = m_cookielan.split("!");
            mlm.currLanguage = { name: m_arr[0], code: m_arr[1] };
        },

        /* 设置语言资源 */
        setLanguageRes: function (lanSymbol) {
            runtime.clientRunSetting.storeUserSetting("lanuage", lanSymbol);
            
            /* 重新清理浏览器缓存 */
            runtime.clientRunSetting.reSetOpenTime();

            location.reload();
        },

        /* 获取多语言 */
        getLanguages: function (event) {

            if (mlm.languages.length == 0) {
                var handlerObj = new webhandler.webTransferObj("GetSettingLanguages");
                var context = new webhandler.bizExeContext(function (retObj) {

                    var m_languages = datastruct.convertion.tableToJson(retObj);
                    mlm.languages = m_languages;

                    if (event) {
                        event();
                    }
                });
                webhandler.ajaxHandler.loadCacheData(handlerObj, context);
            }
            else {
                if (event) {
                    event();
                }
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----环境参数函数----- 
    */
    window.keycontext = {

        keyparam: {},

        /* 初始化当前环境 */
        init: function () {
            var m_keyparam = runtime.clientRunSetting.getRunningContext("keycontext");

            if (!m_keyparam) {
            
                var m_syskeyparam = new spm.syskeyparam();
                m_syskeyparam.readSysKeyParam(function (retObj) {
                    runtime.clientRunSetting.storeRunningContext("keycontext", retObj.SysWeightUnit_Id + "-" + retObj.OtherProps.WUnit);
                    keycontext.keyparam.WUnit = retObj.OtherProps.WUnit;
                    keycontext.keyparam.SysWeightUnit_Id = retObj.SysWeightUnit_Id;
                });
            }
            else {
                var m_items = m_keyparam.split("-");
                keycontext.keyparam.SysWeightUnit_Id = m_items[0];
                keycontext.keyparam.WUnit = m_items[1];
            }
            
            //默认人民币
            keycontext.keyparam.syscurrency = 1;
            keycontext.keyparam.syscurrsymbol = "￥";
            keycontext.keyparam.syscurrcode = "CNY";

            //默认人民币
            keycontext.keyparam.tax_syscurrency = 2;
            keycontext.keyparam.tax_syscurrsymbol = "$";
            keycontext.keyparam.tax_syscurrcode = "USD";
        }
    };
    /*-------------------------------*/

    /* 
    -----安全处理函数----- 
    */
    window.security = {

        /* 验证用户 */
        authoriseUser: function () {
            var m_usertoken = runtime.clientRunSetting.getRunningContext("usertoken");
            if (!m_usertoken) {
                window.location = "/bzm/login.htm";
                return;
            }

            var handlerObj = new webhandler.webTransferObj("AuthoriseUserToken");
            var context = new webhandler.bizExeContext(null, signOut);
            webhandler.ajaxHandler.bizRequest(handlerObj, context);
        },

        //SMT授权认证
        authoriseSMT: function () {

            var smt_code = commoncore.func.getUrlParam("code");
            if (smt_code) {
                var m_syskeyparam = new spm.syskeyparam();
                m_syskeyparam.SMTCode = smt_code;
                m_syskeyparam.authoriseSMT(function () { });
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----销售平台函数----- 
    */
    window.saleplatform = {

        /* 加载销售平台和销售区域 */
        loadSaleSites: function (afterLoadEvent) {

            saleplatform.salesiteCtrl = $("#ddlSalePlatform");
            var m_saleplatform = new sm.saleplatform();
            m_saleplatform.queryAvaiSaleSites(function (tableSource) {
                var m_shoppingSiteAreas = datastruct.convertion.tableToJson(tableSource);

                if(m_shoppingSiteAreas.length > 0){
         
                    $.each(m_shoppingSiteAreas, function () {

                        this.Key = this.SalePlatform_Id;
                        this.Value = this.SPfName;
                        if (this.SaleSite_Id) {
                            this.Key = this.Key + "-" + this.SaleSite_Id;
                            this.Value = this.Value + "-" + this.SaleSiteName;
                        }
                        saleplatform.salesiteCtrl.append("<option value='" + this.Key + "'>" + this.Value + "</option>");
                    });

                    saleplatform.salesites = m_shoppingSiteAreas;

                    var m_ssArrs = saleplatform.salesiteCtrl.val().split("-");
                    saleplatform.currSalePlatformId = m_ssArrs[0];
                    if (m_ssArrs.length == 2) {
                        saleplatform.currSaleSite_Id = m_ssArrs[1];
                    }
                    else {
                        saleplatform.currSaleSite_Id = 0;
                    }

                    $.each(saleplatform.salesites, function () {
                        if (this.SalePlatform_Id == saleplatform.currSalePlatformId && this.SaleSite_Id == saleplatform.currSaleSite_Id) {
                            saleplatform.currObj = this;
                        }
                    });
                }

                if (afterLoadEvent) {
                    afterLoadEvent();
                }
            });

            saleplatform.salesiteCtrl.change(function () {

                var m_ssArrs = saleplatform.salesiteCtrl.val().split("-");
                saleplatform.currSalePlatformId = m_ssArrs[0];
                if (m_ssArrs.length == 2) {
                    saleplatform.currSaleSite_Id = m_ssArrs[1];
                }
                else {
                    saleplatform.currSaleSite_Id = 0;
                }

                $.each(saleplatform.salesites, function () {
                    if (this.SalePlatform_Id == saleplatform.currSalePlatformId && this.SaleSite_Id == saleplatform.currSaleSite_Id) {
                        saleplatform.currObj = this;
                    }
                });

                if (afterLoadEvent) {
                    afterLoadEvent();
                }
            });
        },

        /* 检测销售平台 */
        checkSalePlatform: function () {

            if (!saleplatform.salesites || saleplatform.salesites.length == 0) {
                if (!saleplatform.checkSalePlatformFrm) {
                    saleplatform.checkSalePlatformFrm = new uicontrol.dialog("checkSalePlatformFrm", mlm.C0356, { width: 800 }, function () {
                        window.location = "/bzm/bizui/saleplatform.htm";
                    }, true);
                }

                saleplatform.checkSalePlatformFrm.show();
            }
        }
    };
    /*-------------------------------*/

    /* 
    -----页面通用函数----- 
    */
    window.commoncore = {};
    commoncore.func = {

        /* 处理异常 */
        dealError: function (error) {
            if (error.Message) {
                pageframe.control.alertDialog.showAlertInfo(error.Message);
            }
            else {
                pageframe.control.alertDialog.showAlertInfo(error);
            }
        },

        /* 添加字体样式（类型a） */
        addFontStyle_a: function () {
            var thisObj = $(this);
            thisObj.css("color", "#FFFFFF");
            thisObj.css("text-decoration", "underline");
        },

        /* 删除字体样式（类型a） */
        removeFontStyle_a: function () {
            var thisObj = $(this);
            thisObj.css("color", "#E3E3E3");
            thisObj.css("text-decoration", "none");
        },

        /* 添加字体样式（类型b） */
        addFontStyle_b: function () {
            var thisObj = $(this);
            thisObj.css("text-decoration", "underline");
        },

        /* 删除字体样式（类型b） */
        removeFontStyle_b: function () {
            var thisObj = $(this);
            thisObj.css("text-decoration", "none");
        },

        /* 添加按钮样式（类型a） */
        addBtStyle_a: function () {
            var thisObj = $(this);
            thisObj.css("background-color", "#333333");
        },

        /* 删除按钮样式（类型a） */
        removeBtStyle_a: function () {
            var thisObj = $(this);
            thisObj.css("background-color", "");
        },

        /* 生成属性控件 */
        generatePropCtrl: function (prop, valueItems, pvalueSource) {

            var htmlArr = [];

            if (!pvalueSource || pvalueSource == "1") {
                htmlArr.push("<ul>");

                var i = 0;
                $.each(valueItems, function () {
                    var m_id = i + "c_" + prop;
                    htmlArr.push("<li style='float: left; margin: 0px 5px 5px 0px'><input type='checkbox' id='" + m_id + "' value='" + this.key + "' name='" + prop + "' />");
                    htmlArr.push("<span style='cursor: pointer;' onmouseover='commoncore.func.addFontStyle_b.call(this);' onmouseout='commoncore.func.removeFontStyle_b.call(this);' onclick='commoncore.func.triggerInput(\"" + m_id + "\");'>" + this.value + "</span></li>");
                    i++;
                });

                htmlArr.push("</ul>");
            }
            else {
                var m_id = "c_" + prop;
                htmlArr.push("<textarea id='" + m_id + "' cols='20' rows='2' class='multitext-input' onkeypress='uicontrol.func.checkInput(event);'></textarea>");
            }

            return htmlArr.join("");
        },

        /* 触发选择事件 */
        triggerInput: function (ctrlId) {
            $("#" + ctrlId).click();
        },

        /* 构建数字列 */
        constructNumberCell: function (key, cellValue) {
            return Number(cellValue).toFixed(2);
        },

        /* 构建时间列 */
        constructDateTimeCell: function (key, cellValue) {
            if (cellValue) {
                return datastruct.convertion.convertToDateStr(cellValue);
            }
            else {
                return "";
            }
        },

        /* 构建数量列 */
        constructQtyCell: function (key, cellValue) {
            var m_qty = Number(cellValue);
            if (m_qty > 0) {
                return m_qty;
            }
        },

        /* 返回时间字符 */
        getTimeStrCell: function (timevalue) {
            if (timevalue) {
                var date = new Date(timevalue);
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            }
            else {
                return "";
            }
        },

        /* */
        getNowTime: function () {
            var m_now = new Date();

            var m_month = (Number(m_now.getMonth()) + 1);
            var m_day = Number(m_now.getDate());

            return datastruct.convertion.convertToDateByStr(m_now.getFullYear() + "-" + (m_month > 9 ? m_month : "0" + m_month) + "-" + (m_day > 9 ? m_day : "0" + m_day));
        },

        /* 构建当地时间列 */
        constructLocalTimeCell: function (key, cellValue) {
            var m_time = datastruct.convertion.convertToDateStr(cellValue);
            if (!commoncore.timezone) {
                commoncore.timezone = (new Date().getTimezoneOffset() / 60 * -1) * 3600000;
            }

            return new Date(m_time + commoncore.timezone).toLocaleString();
        },
        /* 转换为当地时间 */
        convertToLocalTime: function (time) {

            if (!commoncore.timezone) {
                commoncore.timezone = (new Date().getTimezoneOffset() / 60 * -1) * 3600000;
            }

            return new Date(time.getTime() + commoncore.timezone).toLocaleString();
        },

        /* 构建区域显示 */
        constructGAreaTxt: function (objitem) {
            if (Number(objitem.tag.SonAreaCount) == 0) {
                return objitem.tag.GlobalAreaName;
            }
            else {
                return objitem.tag.GlobalAreaName + "(" + objitem.tag.SonAreaCount + ")";
            }
        },

        /* 构建备注列 */
        constructRemarkCell: function (key, cellValue) {
            return cellValue.replace(/\^/g, "\"").replace(/\n/g, "<br>");
        },

        /* 获取货币的Html */
        getCurrHtml: function (currSymbol, price) {
            if (currSymbol == "￥") {
                return "<span style='margin: 0px 1px 0px 0px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + datastruct.convertion.convertToMoney(price) + "</span>";
            }
            else {
                return "<span style='margin: 0px 3px 0px 3px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + datastruct.convertion.convertToMoney(price) + "</span>";
            }
        },

        /* 获取精确货币的Html */
        getExactCurrHtml: function (currSymbol, price) {
            var m_price = Number(price);
            var m_pricestr = "";
            if (m_price < 1 && m_price > 0) {
                m_pricestr = Number(price).toFixed(3);
            }
            else {
                m_pricestr = Number(price).toFixed(2);
            }

            if (currSymbol == "￥") {

                return "<span style='margin: 0px 1px 0px 0px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + m_pricestr + "</span>";
            }
            else {
                return "<span style='margin: 0px 3px 0px 3px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + m_pricestr + "</span>";
            }
        },

        /* 获取精确货币的Html */
        getFullExactCurrHtml: function (currSymbol, price) {
            var m_price = Number(price).toFixed(3);

            if (currSymbol == "￥") {

                return "<span style='margin: 0px 1px 0px 0px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + m_price + "</span>";
            }
            else {
                return "<span style='margin: 0px 3px 0px 3px'>" + currSymbol + "</span>" + "<span style='margin: 0px 2px 0px 0px'>" + m_price + "</span>";
            }
        },

        /* 图片居中定位 */
        positionCenterImg: function (containerHeight, containerWidth) {
            var m_height = $(this)[0].offsetHeight;

            if (!containerHeight || Number(containerHeight) == 0) {
                containerHeight = 80;
            }
            var m_top = (containerHeight - m_height) / 2;
            if (Number(m_top) > -1 && m_height > 0) {
                $(this).css("margin", m_top + "px 0px 0px 0px");
            }
            else{
                $(this).css("margin", "0px");
            }
        },

        /* 图片加载失败 */
        failLoadImg: function () {
            var m_this = $(this);
            $(this).attr("src", window.webLocation + "BZM/Css/Images/nopic.png");
        },

        /* 展示完整名称 */
        showFullNameByTooltip: function () {
            return $(this).attr("tag");
        },

        /* 显示特殊字符 */
        showSpecialChar: function (str) {
            return str.replaceAll("%", "\"").replaceAll("@", "'");
        },

        /* 转换特殊字符 */
        convertSpecialChar: function (str) {
            return str.replaceAll("\"", "%").replaceAll("'", "@");
        },

        /* 计算快递运费 */
        calculateExpPrice: function (prodweight, fromweight, increaseweight, maxweight, fromprice, increaseprice) {
            if (prodweight > maxweight || prodweight == maxweight) {
                return -1;
            }

            if (prodweight < fromweight || prodweight == fromweight || increaseweight == 0) {
                return fromprice;
            }

            var m_overweight = prodweight - fromweight;
            var m_expprice = fromprice;

            var m_func = function () {
                if (m_overweight < increaseweight || m_overweight == increaseweight) {
                    m_expprice = m_expprice + increaseprice;
                    return;
                }

                m_overweight = m_overweight - increaseweight;
                m_expprice = m_expprice + increaseprice;

                m_func();
            };

            m_func();

            return m_expprice;
        },

        /* 获取显示的快递地址 */
        getRvAddressForView: function (obj) {
            var m_str = "";

            var m_addressStrs = [];

            if (obj.GlobalAreaName) {

                if (obj.GlobalAreaName == "中国") {

                    m_addressStrs.push(obj.RvFullName + ",");

                    if (obj.RvProvince) {
                        m_addressStrs.push(obj.RvProvince);
                    }

                    if (obj.RvCity) {
                        m_addressStrs.push(obj.RvCity);
                    }

                    var m_rvaddress = "";
                    if (obj.RvAddress_1) {
                        m_rvaddress = obj.RvAddress_1;
                    }
                    if (obj.RvAddress_2) {
                        m_rvaddress = m_rvaddress + " " + obj.RvAddress_2;
                    }
                    if (obj.RvPostCode) {
                        m_rvaddress = m_rvaddress + "(" + obj.RvPostCode + ")";
                    }
                    m_addressStrs.push(m_rvaddress);

                    m_str = m_addressStrs.join(" ");
                }
                else {

                    m_addressStrs.push(obj.RvFullName);

                    var m_rvaddress = "";
                    if (obj.RvAddress_1) {
                        m_rvaddress = obj.RvAddress_1;
                    }
                    if (obj.RvAddress_2) {
                        m_rvaddress = m_rvaddress + " " + obj.RvAddress_2;
                    }
                    m_addressStrs.push(m_rvaddress);

                    if (obj.RvCity) {
                        m_addressStrs.push(obj.RvCity);
                    }

                    var m_rvpp = "";
                    if (obj.RvProvince) {
                        m_rvpp = obj.RvProvince;
                    }
                    if (obj.RvPostCode) {
                        m_rvpp = m_rvpp + " " + obj.RvPostCode;
                    }

                    m_addressStrs.push(m_rvpp);

                    m_addressStrs.push(obj.GlobalAreaName);

                    m_str = m_addressStrs.join(",<br>");
                }
            }

            return m_str;
        },

        /* 获取URL参数 */
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
    };
    /*-------------------------------*/

    window.pageframe = {};
    /* 
    -----页面布局----- 
    */
    pageframe.layout = {

        /* 页面宽度 */
        width: 0,

        /* 页面头高度 */
        headHeight: 0,

        /* 主体内容高度 */
        contentHeight: 0,

        /* 业务菜单导航栏高度 */
        bizMenuHeight: 0,

        /* 重新布局事件列表 */
        resizeEventList: [],

        /* 设置页面布局 */
        setPageFrame: function () {
            var m_frame = $("#pageFrame");

            if (m_frame[0]) {
                var w_h;
                /* 兼容性处理 */
                if ($.browser.msie) {
                    w_h = document.documentElement.clientHeight;
                    /* 最小高度为600  */
                    if (document.documentElement.clientHeight < 600) {
                        w_h = 600;
                    }
                    w_h = w_h - 2;
                }
                else {
                    w_h = window.innerHeight;
                    /* 最小高度为600  */
                    if (window.innerHeight < 600) {
                        w_h = 600;
                    }
                    w_h = w_h - 3;
                }
                pageframe.layout.width = m_frame[0].offsetWidth;
                pageframe.layout.headHeight = $("#pageHeader")[0].offsetHeight;
                pageframe.layout.contentHeight = Number(w_h - pageframe.layout.headHeight - $("#pageFooter")[0].offsetHeight);
                $("#pageContent").css("height", pageframe.layout.contentHeight + "px");
            }
        },

        /* 获取页面中数据表的高度 */
        getTableHeightInForm: function () {
            return pageframe.layout.contentHeight - pageframe.layout.bizMenuHeight - 137;
        },

        /* 获取页面中内容的高度 */
        getContentHeight: function () {
            return pageframe.layout.contentHeight - pageframe.layout.bizMenuHeight - 77;
        }
    };
    /*-------------------------------*/

    /* 
    -----页面公用控件----- 
    */
    pageframe.control = {

        /* 信息提示 */
        alertDialog: {

            ctrl: null,

            textCtrl: null,

            /* 弹出提示窗体 */
            showAlertInfo: function (alertInfo) {

                if (!pageframe.control.alertDialog.ctrl) {
                    pageframe.control.alertDialog.ctrl = new uicontrol.dialog("alertDialog", mlm.C0014, { width: 600, height: 100 });
                    pageframe.control.alertDialog.textCtrl = $("#alertInfo");
                }

                pageframe.control.alertDialog.textCtrl.text(alertInfo);

                pageframe.control.alertDialog.ctrl.show();
            }
        },

        /* 询问提示 */
        askDialog: {
            ctrl: null,

            textCtrl: null,

            /* 弹出提示窗体 */
            showAlertInfo: function (alertInfo, confirmFunc) {

                if (!pageframe.control.askDialog.ctrl) {
                    pageframe.control.askDialog.ctrl = new uicontrol.dialog("askDialog", mlm.C0014, { width: 600, height: 300 }, function () {
                        confirmFunc();

                        pageframe.control.askDialog.ctrl.close();
                    });
                    pageframe.control.askDialog.textCtrl = $("#askInfo");
                }

                pageframe.control.askDialog.textCtrl.text(alertInfo);

                pageframe.control.askDialog.ctrl.show();
            }
        },

        /* 业务菜单导航栏 */
        bizMenuCtrl: {

            ctrl: null,

            /* 初始化菜单导航 */
            init: function () {
                var m_user = userpopedom["user_" + m_usertoken];

                pageframe.control.bizMenuCtrl.ctrl = $("#bizMenuBar");
                pageframe.layout.bizMenuHeight = pageframe.control.bizMenuCtrl.ctrl[0].offsetHeight;
                var m_menucontainer = $("#menuContainer");

                var m_ulmenuCtrl = $("<ul id='bizMenus'></ul>");
                $.each(m_user.menuPopedoms, function () {

                    var m_menuvalue = "";
                    if (this.href) {
                        m_menuvalue = "<a href='" + this.href + "'>" + this.value + "</a>";
                    }
                    else {
                        m_menuvalue = this.value;
                    }

                    var m_limenuId = "menu_" + this.menukey;
                    var m_limenuTag = m_limenuId + "List";
                    var m_limenuCtrl = $("<li id='" + m_limenuId + "' tag='" + m_limenuTag + "'>" + m_menuvalue + "</li>");
                    m_limenuCtrl.hover(pageframe.control.bizMenuCtrl.showMenus, pageframe.control.bizMenuCtrl.hideMenus);

                    m_ulmenuCtrl.append(m_limenuCtrl);
                    m_ulmenuCtrl.append("<li>|</li>");

                    pageframe.control.bizMenuCtrl.list[m_limenuId] = { ctrl: m_limenuCtrl };

                    if (this.sonMenus.length > 0) {

                        var m_sonContainer = $("<div id='" + m_limenuTag + "' class='sonBizMenus'></div>");
                        var m_sonul = $("<ul></ul>");

                        pageframe.control.bizMenuCtrl.list[m_limenuId].child = {};

                        /* 子菜单 */
                        $.each(this.sonMenus, function () {

                            var m_slimenuId = "menu_" + this.menukey;

                            var m_slimenuCtrl = $("<li id='" + m_slimenuId + "' href='" + this.href + "'>" + this.value + "</li>");
                            m_slimenuCtrl.hover(pageframe.control.bizMenuCtrl.addSonMenuStyle, pageframe.control.bizMenuCtrl.removeSonMenuStyle);

                            var m_href = this.href;
                            m_slimenuCtrl.click(function () {
                                if (m_href) {
                                    window.location = "/" + m_href;
                                }
                            });

                            m_sonul.append(m_slimenuCtrl);
                            pageframe.control.bizMenuCtrl.list[m_limenuId].child[m_slimenuId] = m_slimenuCtrl;
                        });

                        m_sonContainer.append(m_sonul);
                        m_menucontainer.append(m_sonContainer);

                        m_sonContainer.hover(function () { pageframe.control.bizMenuCtrl.showMenus.call(pageframe.control.bizMenuCtrl.list[m_limenuId].ctrl); },
                                function () { pageframe.control.bizMenuCtrl.hideMenus.call(pageframe.control.bizMenuCtrl.list[m_limenuId].ctrl); });
                    }
                });

                m_menucontainer.append(m_ulmenuCtrl);
            },

            /* 菜单列表 */
            list: {},

            /* 展示子菜单 */
            showMenus: function () {
                var thisObj = $(this);

                thisObj.css("background-color", "#0D95D7");
                thisObj.css("color", "#FFFFFF");

                var menuListId = thisObj.attr("tag");
                if (menuListId) {
                    var menuListCtrl = $("#" + menuListId);
                    menuListCtrl.css("display", "block");
                    menuListCtrl.css("top", pageframe.layout.headHeight + pageframe.layout.bizMenuHeight);

                    var m_left = thisObj[0].offsetLeft - 1;
                    if ($.browser.msie && $.browser.version == "7.0") {
                        m_left = m_left + $("#sysSymbol")[0].offsetWidth + 22;
                    }
                    menuListCtrl.css("left", m_left);
                }
            },

            /* 隐藏子菜单 */
            hideMenus: function () {
                var thisObj = $(this);
                thisObj.css("background-color", "");
                thisObj.css("color", "#E3E3E3");

                var menuListId = thisObj.attr("tag");
                if (menuListId) {
                    var menuListCtrl = $("#" + menuListId);
                    menuListCtrl.css("display", "none");
                }
            },

            /* 添加子菜单样式 */
            addSonMenuStyle: function () {
                var thisObj = $(this);
                thisObj.css("background-color", "#EFEFEF");
            },
            /* 隐藏子菜单样式 */
            removeSonMenuStyle: function () {
                var thisObj = $(this);
                thisObj.css("background-color", "");
            }
        },

        /* 按钮容器 */
        multiButtion: {
            init: function (btCtrl_id, btContainer_id) {

                var m_btCtrl = $("#" + btCtrl_id);

                var m_btContainerCtrl = $("#" + btContainer_id);
                m_btContainerCtrl.hover(function () {
                    pageVariable.showBtContainer = 1;
                }, function () {
                    pageVariable.showBtContainer = null;
                    m_btContainerCtrl.hide();
                    commoncore.func.removeBtStyle_a.call(m_btCtrl);
                });

                var m_lis = m_btContainerCtrl.find("li");
                m_lis.hover(function () { $(this).addClass("hover"); }, function () { $(this).removeClass("hover"); });
                m_lis.click(function () {
                    m_btContainerCtrl.hide();
                    commoncore.func.removeBtStyle_a.call(m_btCtrl);
                });

                m_btCtrl.hover(function () {
                    pageVariable.showBtContainer = null;
                    m_btContainerCtrl.show();

                    m_btContainerCtrl.css("min-width", m_btCtrl[0].offsetWidth);
                    m_btContainerCtrl.css("top", m_btCtrl.offset().top + m_btCtrl[0].offsetHeight);
                    m_btContainerCtrl.css("left", m_btCtrl.offset().left);
                    commoncore.func.addBtStyle_a.call(m_btCtrl);

                }, function () {
                    setTimeout(function () {
                        if (pageVariable.showBtContainer && pageVariable.showBtContainer == 1) {
                            m_btContainerCtrl.show();
                        }
                        else {
                            m_btContainerCtrl.hide();
                            commoncore.func.removeBtStyle_a.call(m_btCtrl);
                        }
                    }, 100);

                });
            }
        },

        /* 进度条 */
        processCtrl: {

            /* 展示进度 */
            showProcess: function () {

                $("#processBg").show();

                var processBar = $("#processBar");
                processBar.show();

                if (pageframe.layout.contentHeight == 0) {
                    var w_h;
                    var w_l;
                    /* 兼容性处理 */
                    if ($.browser.msie) {
                        w_h = document.documentElement.clientHeight;
                        /* 最小高度为600  */
                        if (document.documentElement.clientHeight < 600) {
                            w_h = 600;
                        }
                        w_h = w_h - 2;
                        w_l = document.documentElement.clientWidth;
                    }
                    else {
                        w_h = window.innerHeight;
                        w_l = window.innerWidth;
                        /* 最小高度为600  */
                        if (window.innerHeight < 600) {
                            w_h = 600;
                        }
                        w_h = w_h - 3;
                    }

                    processBar.css("top", w_h / 2 + "px");
                    processBar.css("left", (w_l - processBar[0].offsetWidth) / 2 + "px");
                }
                else {
                    processBar.css("top", pageframe.layout.contentHeight / 2 + "px");
                    processBar.css("left", (pageframe.layout.width - processBar[0].offsetWidth) / 2 + "px");
                }
            },

            /* 隐藏进度 */
            hideProcess: function () {
                $("#processBg").hide();
                $("#processBar").hide();
            },

            /* 展示进度 */
            showOperaProcess: function () {

                $("#processBg_opera").show();

                var processBar = $("#processBar_opera");
                processBar.show();

                if (pageframe.layout.contentHeight == 0) {
                    var w_h;
                    var w_l;
                    /* 兼容性处理 */
                    if ($.browser.msie) {
                        w_h = document.documentElement.clientHeight;
                        /* 最小高度为600  */
                        if (document.documentElement.clientHeight < 600) {
                            w_h = 600;
                        }
                        w_h = w_h - 2;
                        w_l = document.documentElement.clientWidth;
                    }
                    else {
                        w_h = window.innerHeight;
                        w_l = window.innerWidth;
                        /* 最小高度为600  */
                        if (window.innerHeight < 600) {
                            w_h = 600;
                        }
                        w_h = w_h - 3;
                    }

                    processBar.css("top", w_h / 2 + "px");
                    processBar.css("left", (w_l - processBar[0].offsetWidth) / 2 + "px");
                }
                else {
                    processBar.css("top", pageframe.layout.contentHeight / 2 + "px");
                    processBar.css("left", (pageframe.layout.width - processBar[0].offsetWidth) / 2 + "px");
                }
            },

            /* 隐藏进度 */
            hideOperaProcess: function () {
                $("#processBg_opera").hide();
                $("#processBar_opera").hide();
            }
        },

        /* 内容区域 */
        content: {

            /* 内容标签列表 */
            tagList: [],

            /* 切换内容标签 */
            switchTag: function () {

                var m_thisCtrlId = $(this).attr("tag");
                $.each(pageframe.control.content.tagList, function () {

                    var thisCtrl = $(this);

                    var m_contentCtrlId = thisCtrl.attr("tag");
                    var m_ctrl = $("#" + m_contentCtrlId);
                    if (m_thisCtrlId == m_contentCtrlId) {
                        thisCtrl.addClass("selected");
                        m_ctrl.show();
                    }
                    else {
                        thisCtrl.removeClass("selected");
                        m_ctrl.hide();
                    }
                });
            }
        }
    }
    /*-------------------------------*/
})(window);

/* 多语言初始化 */
mlm.init();

/* 加载多语言Css以及Javascript */
var file = cssdir + "ui-core-" + mlm.currLanguage.code + ".css";
document.write("<link type='text/css' rel='Stylesheet' href='" + file + "' />");
document.write("<script type='text/javascript' src='" + jsdir + "common_res_" + mlm.currLanguage.code + "-1.0.min.js" + "'></script>");

//获取用户指令
if (window.location.pathname.toLowerCase() != "/bzm/login.htm") {
    var m_usertoken = runtime.clientRunSetting.getRunningContext("usertoken");
    if (m_usertoken) {
        document.write("<script type='text/javascript' src='/BZM/Scripts/UserPopedom/" + m_usertoken + ".js'></script>");
    }
    else {
        window.location = "/bzm/login.htm";
    }
}

/* 页面初始化事件 */
$(window).ready(function () {

    /* 初始化Ajax请求 */
    webhandler.ajaxHandler.init("/bzm/BizAjaxHandler.ashx",
                                pageframe.control.processCtrl.showProcess,
                                commoncore.func.dealError,
                                pageframe.control.processCtrl.hideProcess);

    var m_pageframe = $("#pageFrame");

    if (m_pageframe.length == 1) {
        $("#pageWaittingArea").hide();
        $("#pageFrame").show();

        pageframe.layout.setPageFrame();
        pageframe.layout.resizeEventList.push(pageframe.layout.setPageFrame);

        if (m_usertoken) {
            var m_userinfoCtrl = $("#userInfo");
            m_userinfoCtrl.text(userpopedom["user_" + m_usertoken].FullName);
            m_userinfoCtrl.click(openMyInfoFrm);

            $("#btSendPwd, #btModifyPwd").hover(commoncore.func.addBtStyle_a, commoncore.func.removeBtStyle_a);
            $("#btModifyPwd").click(openModifyPwdFrm);
            $("#signOut").click(signOut);

            /* 初始化导航 */
            pageframe.control.bizMenuCtrl.init();

            /* 绑定内容标签切换事件 */
            var m_pageTag = $("#pageTitleTag");
            if (m_pageTag.length > 0) {
                pageframe.control.content.tagList = m_pageTag.find("li");
                $.each(pageframe.control.content.tagList, function () {
                    $(this).click(pageframe.control.content.switchTag);
                });
            }

            /* 验证用户 */
            security.authoriseUser();
        }

        $("#userInfo, #signOut, #language").hover(commoncore.func.addFontStyle_b, commoncore.func.removeFontStyle_b);

        var m_lanCtrl = $("#language");
        var languageCtrl = $("#ddlLanguage");

        m_lanCtrl.text(mlm.currLanguage.name);
        m_lanCtrl.click(function () {
            if (!pageVariable.switchLanguageFrm) {
                pageVariable.switchLanguageFrm = new uicontrol.dialog("switchLanguageFrm", mlm.C0619, { width: 800 }, function () {
                    mlm.setLanguageRes(languageCtrl.find("option:selected").text() + "!" + languageCtrl.val());
                });

                /* 获取多语言 */
                mlm.getLanguages(function () {
                    $.each(mlm.languages, function () {
                        languageCtrl.append("<option value='" + this.LRCode + "'>" + this.LRName + "</option>");
                    });

                    languageCtrl.val(mlm.currLanguage.code);
                });
            }

            pageVariable.switchLanguageFrm.show();
        });
    }

    /* 环境初始化 */
    keycontext.init();

    initPage();

    fillLanRes();
});
/* 初始化界面(虚方法，每个页面需要重写) */
function initPage() { };

/* 窗体大小改变事件 */
$(window).resize(function () {
    for (var eventItem in pageframe.layout.resizeEventList) {
        pageframe.layout.resizeEventList[eventItem]();
    }
});

/* 填充语言资源 */
function fillLanRes(data, textStates) {
    /* 注销 */
    $("#signOut").text(mlm.C0004);
    /* 用户名 */
    $("#lbUserName_my").text(mlm.C0309 + ":");
    /* 邮箱 */
    $("#lbEmail_my").text(mlm.C0310 + ":");
    /* 联系电话 */
    $("#lbTel_my").text(mlm.C0311 + ":");
    /* 其他联系方式 */
    $("#lbContactInfo_my").text(mlm.C0312 + ":");
    /* 密码 */
    $("#lbPwd_my").text(mlm.C0325 + ":");
    /* 旧密码 */
    $("#lbOldPwdSymbol").text(mlm.C0326 + ":");
    /* 新密码 */
    $("#lbNewPwdSymbol").text(mlm.C0327 + ":");
    /* 确认密码 */
    $("#lbConfirmPwdSymbol").text(mlm.C0328 + ":");
    /* 发送密码到邮箱 */
    $("#btSendPwd").val(mlm.C0329);
    /* 设置新密码 */
    $("#btModifyPwd").val(mlm.C0330);

    /* 请先创建销售平台！ */
    $("#lbCheckSSSymbol").text(mlm.C0357);

    /* 必填 */
    $("#lbGlobalSymbol_1, #lbGlobalSymbol_2, #lbGlobalSymbol_3").text(mlm.C0049);
    /* 选择语言 */
    $("#lbLanguage").text(mlm.C0007);

    fillPageLanRes();

    /* 执行绑定事件 */
    $.each(mlm.bindLanguageEvent, function () {
        this();
    });

    data = null;
}
/* 填充语言资源(虚方法，每个页面需要重写) */
function fillPageLanRes() { }

/* 查看个人信息 */
function openMyInfoFrm() {
    if (!pageVariable.myInfoFrm) {
        pageVariable.myInfoFrm = new uicontrol.dialog("myInfoFrm", mlm.C0319, { width: 800, position: ["auto", 60] }, null);
    }

    $("#viewUserName").text(userpopedom["user_" + m_usertoken].FullName);
    $("#viewEmail").text(userpopedom["user_" + m_usertoken].Email);
    $("#viewTel").text(userpopedom["user_" + m_usertoken].Tel);
    $("#viewContact").html(userpopedom["user_" + m_usertoken].ContactInfo);

    pageVariable.myInfoFrm.show();
}

/* 打开修改密码的窗体 */
function openModifyPwdFrm() {
    if (!pageVariable.handlerPwdFrm) {
        pageVariable.handlerPwdFrm = new uicontrol.dialog("handlerPwdFrm", mlm.C0320, { width: 800, position: ["auto", 60] }, savePwd);
    }

    $("#txtOldPwd").val("");
    $("#txtNewPwd").val("");
    $("#txtConfirmPwd").val("");

    pageVariable.handlerPwdFrm.show();
}

/* 设置新密码 */
function savePwd() {

    var m_oldPwd = $.trim($("#txtOldPwd").val());
    if (!m_oldPwd) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0321);
        return;
    }

    var m_newPwd = $.trim($("#txtNewPwd").val());
    if (!m_newPwd) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0322);
        return;
    }

    var m_confirmPwd = $.trim($("#txtConfirmPwd").val());
    if (m_newPwd != m_confirmPwd) {
        pageframe.control.alertDialog.showAlertInfo(mlm.C0323);
        return;
    }

    var handlerObj = new webhandler.webTransferObj("ModifyPwd", { OldPwd: m_oldPwd, NewPwd: m_newPwd });
    var context = new webhandler.bizExeContext(function (retObj) {

        pageVariable.handlerPwdFrm.close();

        pageframe.control.alertDialog.showAlertInfo(mlm.C0324);
    }, null);
    webhandler.ajaxHandler.bizRequest(handlerObj, context);
}

/* 注销用户 */
function signOut() {
    runtime.clientRunSetting.clearRunningContext();
    window.location = "/bzm/login.htm";
}