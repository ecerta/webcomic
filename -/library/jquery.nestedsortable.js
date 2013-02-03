/*
 * jQuery UI Nested Sortable
 * v 2.0 / 29 oct 2012
 * http://mjsarfatti.com/sandbox/nestedSortable
 *
 * Depends on:
 *	 jquery.ui.sortable.js 1.8+
 *
 * Copyright (c) 2010-2012 Manuele J Sarfatti
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(e){e.widget("mjs.nestedSortable",e.extend({},e.ui.sortable.prototype,{options:{doNotClear:false,expandOnHover:700,isAllowed:function(e,t,n){return true},isTree:false,listType:"ol",maxLevels:0,protectRoot:false,rootID:null,rtl:false,startCollapsed:false,tabSize:20,branchClass:"mjs-nestedSortable-branch",collapsedClass:"mjs-nestedSortable-collapsed",disableNestingClass:"mjs-nestedSortable-no-nesting",errorClass:"mjs-nestedSortable-error",expandedClass:"mjs-nestedSortable-expanded",hoveringClass:"mjs-nestedSortable-hovering",leafClass:"mjs-nestedSortable-leaf"},_create:function(){this.element.data("sortable",this.element.data("nestedSortable"));if(!this.element.is(this.options.listType))throw new Error("nestedSortable: Please check that the listType option is set to your actual list type");if(this.options.isTree)this.options.tolerance="intersect";e.ui.sortable.prototype._create.apply(this,arguments);if(this.options.isTree){var t=this;e(this.items).each(function(){var e=this.item;if(e.children(t.options.listType).length){e.addClass(t.options.branchClass);if(t.options.startCollapsed)e.addClass(t.options.collapsedClass);else e.addClass(t.options.expandedClass)}else{e.addClass(t.options.leafClass)}})}},destroy:function(){this.element.removeData("nestedSortable").unbind(".nestedSortable");return e.ui.sortable.prototype.destroy.apply(this,arguments)},_mouseDrag:function(t){var n=this.options;this.position=this._generatePosition(t);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs}if(this.options.scroll){var r=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<n.scrollSensitivity)this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+n.scrollSpeed;else if(t.pageY-this.overflowOffset.top<n.scrollSensitivity)this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-n.scrollSpeed;if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<n.scrollSensitivity)this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+n.scrollSpeed;else if(t.pageX-this.overflowOffset.left<n.scrollSensitivity)this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-n.scrollSpeed}else{if(t.pageY-e(document).scrollTop()<n.scrollSensitivity)r=e(document).scrollTop(e(document).scrollTop()-n.scrollSpeed);else if(e(window).height()-(t.pageY-e(document).scrollTop())<n.scrollSensitivity)r=e(document).scrollTop(e(document).scrollTop()+n.scrollSpeed);if(t.pageX-e(document).scrollLeft()<n.scrollSensitivity)r=e(document).scrollLeft(e(document).scrollLeft()-n.scrollSpeed);else if(e(window).width()-(t.pageX-e(document).scrollLeft())<n.scrollSensitivity)r=e(document).scrollLeft(e(document).scrollLeft()+n.scrollSpeed)}if(r!==false&&e.ui.ddmanager&&!n.dropBehaviour)e.ui.ddmanager.prepareOffsets(this,t)}this.positionAbs=this._convertPositionTo("absolute");var i=this.placeholder.offset().top;if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";this.hovering=this.hovering?this.hovering:null;this.mouseentered=this.mouseentered?this.mouseentered:false;for(var s=this.items.length-1;s>=0;s--){var o=this.items[s],u=o.item[0],a=this._intersectsWithPointer(o);if(!a)continue;if(u!=this.currentItem[0]&&this.placeholder[a==1?"next":"prev"]()[0]!=u&&!e.contains(this.placeholder[0],u)&&(this.options.type=="semi-dynamic"?!e.contains(this.element[0],u):true)){if(!this.mouseentered){e(u).mouseenter();this.mouseentered=true}if(n.isTree&&e(u).hasClass(n.collapsedClass)&&n.expandOnHover){if(!this.hovering){e(u).addClass(n.hoveringClass);var f=this;this.hovering=window.setTimeout(function(){e(u).removeClass(n.collapsedClass).addClass(n.expandedClass);f.refreshPositions();f._trigger("expand",t,f._uiHash())},n.expandOnHover)}}this.direction=a==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(o)){e(u).mouseleave();this.mouseentered=false;e(u).removeClass(n.hoveringClass);this.hovering&&window.clearTimeout(this.hovering);this.hovering=null;this._rearrange(t,o)}else{break}this._clearEmpty(u);this._trigger("change",t,this._uiHash());break}}var l=this.placeholder[0].parentNode.parentNode&&e(this.placeholder[0].parentNode.parentNode).closest(".ui-sortable").length?e(this.placeholder[0].parentNode.parentNode):null,c=this._getLevel(this.placeholder),h=this._getChildLevels(this.helper);var p=this.placeholder[0].previousSibling?e(this.placeholder[0].previousSibling):null;if(p!=null){while(p[0].nodeName.toLowerCase()!="li"||p[0]==this.currentItem[0]||p[0]==this.helper[0]){if(p[0].previousSibling){p=e(p[0].previousSibling)}else{p=null;break}}}var d=this.placeholder[0].nextSibling?e(this.placeholder[0].nextSibling):null;if(d!=null){while(d[0].nodeName.toLowerCase()!="li"||d[0]==this.currentItem[0]||d[0]==this.helper[0]){if(d[0].nextSibling){d=e(d[0].nextSibling)}else{d=null;break}}}var v=document.createElement(n.listType);this.beyondMaxLevels=0;if(l!=null&&d==null&&(n.rtl&&this.positionAbs.left+this.helper.outerWidth()>l.offset().left+l.outerWidth()||!n.rtl&&this.positionAbs.left<l.offset().left)){l.after(this.placeholder[0]);if(n.isTree&&l.children(n.listItem).children("li:visible:not(.ui-sortable-helper)").length<1){l.removeClass(this.options.branchClass+" "+this.options.expandedClass).addClass(this.options.leafClass)}this._clearEmpty(l[0]);this._trigger("change",t,this._uiHash())}else if(p!=null&&!p.hasClass(n.disableNestingClass)&&(p.children(n.listType).length&&p.children(n.listType).is(":visible")||!p.children(n.listType).length)&&(n.rtl&&this.positionAbs.left+this.helper.outerWidth()<p.offset().left+p.outerWidth()-n.tabSize||!n.rtl&&this.positionAbs.left>p.offset().left+n.tabSize)){this._isAllowed(p,c,c+h+1);if(!p.children(n.listType).length){p[0].appendChild(v);n.isTree&&p.removeClass(n.leafClass).addClass(n.branchClass+" "+n.expandedClass)}if(i&&i<=p.offset().top){p.children(n.listType).prepend(this.placeholder)}else{p.children(n.listType)[0].appendChild(this.placeholder[0])}this._trigger("change",t,this._uiHash())}else{this._isAllowed(l,c,c+h)}this._contactContainers(t);if(e.ui.ddmanager)e.ui.ddmanager.drag(this,t);this._trigger("sort",t,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(t,n){if(this.beyondMaxLevels){this.placeholder.removeClass(this.options.errorClass);if(this.domPosition.prev){e(this.domPosition.prev).after(this.placeholder)}else{e(this.domPosition.parent).prepend(this.placeholder)}this._trigger("revert",t,this._uiHash())}e("."+this.options.hoveringClass).mouseleave().removeClass(this.options.hoveringClass);this.mouseentered=false;this.hovering&&window.clearTimeout(this.hovering);this.hovering=null;e.ui.sortable.prototype._mouseStop.apply(this,arguments)},_intersectsWithSides:function(t){var n=this.options.isTree?.8:.5;var r=e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height*n,t.height),i=e.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,t.top-t.height*n,t.height),s=e.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),o=this._getDragVerticalDirection(),u=this._getDragHorizontalDirection();if(this.floating&&u){return u=="right"&&s||u=="left"&&!s}else{return o&&(o=="down"&&r||o=="up"&&i)}},_clear:function(t,n){e.ui.sortable.prototype._clear.apply(this,arguments);for(var r=this.items.length-1;r>=0;r--){var i=this.items[r].item[0];this._clearEmpty(i)}},serialize:function(t){var n=e.extend({},this.options,t),r=this._getItemsAsjQuery(n&&n.connected),i=[];e(r).each(function(){var t=(e(n.item||this).attr(n.attribute||"id")||"").match(n.expression||/(.+)[-=_](.+)/),r=(e(n.item||this).parent(n.listType).parent(n.items).attr(n.attribute||"id")||"").match(n.expression||/(.+)[-=_](.+)/);if(t){i.push((n.key||t[1])+"["+(n.key&&n.expression?t[1]:t[2])+"]"+"="+(r?n.key&&n.expression?r[1]:r[2]:n.rootID))}});if(!i.length&&n.key){i.push(n.key+"=")}return i.join("&")},toHierarchy:function(t){function s(t){var r=(e(t).attr(n.attribute||"id")||"").match(n.expression||/(.+)[-=_](.+)/);if(r){var i={id:r[2]};if(e(t).children(n.listType).children(n.items).length>0){i.children=[];e(t).children(n.listType).children(n.items).each(function(){var e=s(this);i.children.push(e)})}return i}}var n=e.extend({},this.options,t),r=n.startDepthCount||0,i=[];e(this.element).children(n.items).each(function(){var e=s(this);i.push(e)});return i},toArray:function(t){function o(t,s,u){var a=u+1,f,l;if(e(t).children(n.listType).children(n.items).length>0){s++;e(t).children(n.listType).children(n.items).each(function(){a=o(e(this),s,a)});s--}f=e(t).attr(n.attribute||"id").match(n.expression||/(.+)[-=_](.+)/);if(s===r+1){l=n.rootID}else{var c=e(t).parent(n.listType).parent(n.items).attr(n.attribute||"id").match(n.expression||/(.+)[-=_](.+)/);l=c[2]}if(f){i.push({item_id:f[2],parent_id:l,depth:s,left:u,right:a})}u=a+1;return u}var n=e.extend({},this.options,t),r=n.startDepthCount||0,i=[],s=2;i.push({item_id:n.rootID,parent_id:"none",depth:r,left:"1",right:(e(n.items,this.element).length+1)*2});e(this.element).children(n.items).each(function(){s=o(this,r+1,s)});i=i.sort(function(e,t){return e.left-t.left});return i},_clearEmpty:function(t){var n=this.options;var r=e(t).children(n.listType);if(r.length&&!r.children().length&&!n.doNotClear){n.isTree&&e(t).removeClass(n.branchClass+" "+n.expandedClass).addClass(n.leafClass);r.remove()}else if(n.isTree&&r.length&&r.children().length&&r.is(":visible")){e(t).removeClass(n.leafClass).addClass(n.branchClass+" "+n.expandedClass)}else if(n.isTree&&r.length&&r.children().length&&!r.is(":visible")){e(t).removeClass(n.leafClass).addClass(n.branchClass+" "+n.collapsedClass)}},_getLevel:function(e){var t=1;if(this.options.listType){var n=e.closest(this.options.listType);while(n&&n.length>0&&!n.is(".ui-sortable")){t++;n=n.parent().closest(this.options.listType)}}return t},_getChildLevels:function(t,n){var r=this,i=this.options,s=0;n=n||0;e(t).children(i.listType).children(i.items).each(function(e,t){s=Math.max(r._getChildLevels(t,n+1),s)});return n?s+1:s},_isAllowed:function(t,n,r){var i=this.options,s=e(this.currentItem[0].parentNode).hasClass("ui-sortable")?true:false,o=this.placeholder.closest(".ui-sortable").nestedSortable("option","maxLevels");if(!i.isAllowed(this.placeholder,t,this.currentItem)||i.protectRoot&&(t==null&&!s||s&&n>1)){this.placeholder.addClass(i.errorClass);if(o<r&&o!=0){this.beyondMaxLevels=r-o}else{this.beyondMaxLevels=1}}else{if(o<r&&o!=0){this.placeholder.addClass(i.errorClass);this.beyondMaxLevels=r-o}else{this.placeholder.removeClass(i.errorClass);this.beyondMaxLevels=0}}}}));e.mjs.nestedSortable.prototype.options=e.extend({},e.ui.sortable.prototype.options,e.mjs.nestedSortable.prototype.options)})(jQuery)