"use strict";!function(){var t=document.querySelector("body"),a=!0;function i(e){(document.querySelector("body").classList.contains("_lock")?function(e){var t=document.querySelector("body");{var i;a&&(i=document.querySelectorAll("._lp"),setTimeout(function(){for(var e=0;e<i.length;e++)i[e].style.paddingRight="0px";t.style.paddingRight="0px",t.classList.remove("_lock")},e),a=!1,setTimeout(function(){a=!0},e))}}:function(e){var t=document.querySelector("body");if(a){for(var i=document.querySelectorAll("._lp"),n=0;n<i.length;n++)i[n].style.paddingRight=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px";t.style.paddingRight=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px",t.classList.add("_lock"),a=!1,setTimeout(function(){a=!0},e)}})(e)}function e(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))}var n,r,s,o,c,l,d,p,u,m,v,h,f,y,_,g,w,b,L,k,S,x,q,E;function A(e){this.type=e}function C(){var e;e=e||setTimeout(function(){!(e=null)===y.matches?(void 0!==u&&u.destroy(!0,!0),void 0!==h&&h.destroy(!0,!0)):!1===y.matches&&k(),!0===_.matches?void 0!==m&&m.destroy(!0,!0):!1===_.matches&&S(),!0===_.matches||!0===f.matches?void 0!==v&&v.destroy(!0,!0):!0===y.matches&&x()},100)}A.prototype.init=function(){var a=this,r=this;this.оbjects=[],this.daClassname="_dynamic_adapt_",this.nodes=document.querySelectorAll("[data-da]");for(var e=0;e<this.nodes.length;e++){var t=this.nodes[e],i=t.dataset.da.trim().split(","),n={};n.element=t,n.parent=t.parentNode,n.destination=document.querySelector(i[0].trim()),n.breakpoint=i[1]?i[1].trim():"767",n.place=i[2]?i[2].trim():"last",n.index=this.indexInParent(n.parent,n.element),this.оbjects.push(n)}this.arraySort(this.оbjects),this.mediaQueries=Array.prototype.map.call(this.оbjects,function(e){return"("+this.type+"-width: "+e.breakpoint+"px),"+e.breakpoint},this),this.mediaQueries=Array.prototype.filter.call(this.mediaQueries,function(e,t,i){return Array.prototype.indexOf.call(i,e)===t});for(var s=0;s<this.mediaQueries.length;s++)!function(e){var e=a.mediaQueries[e],e=String.prototype.split.call(e,","),t=window.matchMedia(e[0]),i=e[1],n=Array.prototype.filter.call(a.оbjects,function(e){return e.breakpoint===i});t.addListener(function(){r.mediaHandler(t,n)}),a.mediaHandler(t,n)}(s)},A.prototype.mediaHandler=function(e,t){if(e.matches)for(var i=0;i<t.length;i++){var n=t[i];n.index=this.indexInParent(n.parent,n.element),this.moveTo(n.place,n.element,n.destination)}else for(var a=0;a<t.length;a++){var r=t[a];r.element.classList.contains(this.daClassname)&&this.moveBack(r.parent,r.element,r.index)}},A.prototype.moveTo=function(e,t,i){t.classList.add(this.daClassname),"last"===e||e>=i.children.length?i.insertAdjacentElement("beforeend",t):"first"!==e?i.children[e].insertAdjacentElement("beforebegin",t):i.insertAdjacentElement("afterbegin",t)},A.prototype.moveBack=function(e,t,i){t.classList.remove(this.daClassname),void 0!==e.children[i]?e.children[i].insertAdjacentElement("beforebegin",t):e.insertAdjacentElement("beforeend",t)},A.prototype.indexInParent=function(e,t){e=Array.prototype.slice.call(e.children);return Array.prototype.indexOf.call(e,t)},A.prototype.arraySort=function(e){"min"===this.type?Array.prototype.sort.call(e,function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?-1:"last"===e.place||"first"===t.place?1:e.place-t.place:e.breakpoint-t.breakpoint}):Array.prototype.sort.call(e,function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?1:"last"===e.place||"first"===t.place?-1:t.place-e.place:t.breakpoint-e.breakpoint})},new A("min").init(),e(),r=window.matchMedia("(min-width: 1280px)"),s=window.matchMedia("(min-width: 768px)"),o=document.querySelector(".header__inner"),c=document.querySelector(".sandwich"),r.matches,s.matches,window.addEventListener("resize",function(){n=n||setTimeout(function(){n=null,function(){e(),o.classList.contains("_active")&&(o.classList.remove("_active"),c.classList.remove("_active"),t.classList.remove("_overlay"),t.classList.remove("_lock"));r.matches}()},88)},!1),l=document.querySelector(".sandwich"),d=document.querySelector(".header__inner"),null!=l&&(l.addEventListener("click",function(e){a&&(i(500),l.classList.toggle("_active"),d.classList.toggle("_active"),t.classList.toggle("_overlay"))}),document.addEventListener("click",function(e){d.classList.contains("_active")&&(e.target.closest("._active")||(i(500),d.classList.remove("_active"),l.classList.remove("_active"),t.classList.remove("_overlay")))})),document.body.addEventListener("click",function(e){var t=e.target.nextElementSibling;if(t&&t.matches("._active")){t.querySelector('[data-nav-link="sub-close"]');return t.previousElementSibling.classList.remove("_active"),t.classList.remove("_active"),void(t.style.maxHeight=null)}p&&(e.target.closest(".nav__sub-list._active")&&!e.target.closest('[data-nav-link="sub-close"]')||(p.previousElementSibling.classList.remove("_active"),p.classList.remove("_active"),p.style.maxHeight=null)),t&&t.matches(".nav__sub-list")&&(t.previousElementSibling.classList.add("_active"),t.classList.add("_active"),t.style.maxHeight=t.scrollHeight+"px",p=t)}),f=window.matchMedia("(max-width: 767px"),y=window.matchMedia("(min-width: 768px)"),_=window.matchMedia("(min-width: 1280px)"),g=document.querySelector(".crm-heading__slider"),w=document.querySelector(".crm-material__swiper"),b=document.querySelector(".nav__inner"),L=document.querySelector(".other-materials__wrapper"),k=function(){g&&(u=new Swiper(g,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:20,slidesOffsetBefore:20,slidesOffsetAfter:0})),L&&(h=new Swiper(L,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0}))},S=function(){w&&(m=new Swiper(w,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,breakpoints:{768:{spaceBetween:40}},navigation:{nextEl:".crm-material__nav--next",prevEl:".crm-material__nav--prev",disabledClass:"crm-material__nav--disabled"}}))},x=function(){b&&(v=new Swiper(b,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:30,slidesOffsetBefore:40,slidesOffsetAfter:40}))},y.addListener(C),_.addListener(C),C(),q=document.querySelectorAll("._phone-mask"),E={mask:"+{7}(000)000-00-00"},q.forEach(function(e){IMask(e,E)}),document.querySelectorAll("._js-input-label").forEach(function(e){var t=e.parentElement.querySelector("label");e.addEventListener("focus",function(){t.classList.add("_active")}),e.addEventListener("blur",function(){e.value||t.classList.remove("_active")})}),document.querySelectorAll(".training-aside__button").forEach(function(e){var t=e.parentElement.querySelector(".training-aside__sub-list");e.addEventListener("click",function(){e.classList.toggle("_open"),t.classList.toggle("_open"),t.style.maxHeight?t.style.maxHeight=null:t.style.maxHeight=t.scrollHeight+"px"})})}();