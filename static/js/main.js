"use strict";!function(){var o=document.querySelector("body"),l=!0;function t(e){(document.querySelector("body").classList.contains("_lock")?c:d)(e)}function c(e){var t,i=document.querySelector("body");l&&(t=document.querySelectorAll("._lp"),setTimeout(function(){for(var e=0;e<t.length;e++)t[e].style.paddingRight="0px";i.style.paddingRight="0px",i.classList.remove("_lock")},e),l=!1,setTimeout(function(){l=!0},e))}function d(e){var t=document.querySelector("body");if(l){for(var i=document.querySelectorAll("._lp"),n=0;n<i.length;n++)i[n].style.paddingRight=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px";t.style.paddingRight=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px",t.classList.add("_lock"),l=!1,setTimeout(function(){l=!0},e)}}function s(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))}var e,i,n,r,a,u,p,m,v,f,_,h,y,g,b,w,S,k,L,q,A,x,C,E,P,B,O,H,j,z,M,T;function V(e){this.type=e}function I(){var e;e=e||setTimeout(function(){!(e=null)===w.matches?(void 0!==f&&f.destroy(!0,!0),void 0!==y&&y.destroy(!0,!0)):!1===w.matches&&C(),!0===S.matches?(void 0!==_&&_.destroy(!0,!0),void 0!==g&&g.destroy(!0,!0)):!1===S.matches&&E(),!0===S.matches||!0===b.matches?void 0!==h&&h.destroy(!0,!0):!0===w.matches&&P()},100)}V.prototype.init=function(){var r=this,a=this;this.оbjects=[],this.daClassname="_dynamic_adapt_",this.nodes=document.querySelectorAll("[data-da]");for(var e=0;e<this.nodes.length;e++){var t=this.nodes[e],i=t.dataset.da.trim().split(","),n={};n.element=t,n.parent=t.parentNode,n.destination=document.querySelector(i[0].trim()),n.breakpoint=i[1]?i[1].trim():"767",n.place=i[2]?i[2].trim():"last",n.index=this.indexInParent(n.parent,n.element),this.оbjects.push(n)}this.arraySort(this.оbjects),this.mediaQueries=Array.prototype.map.call(this.оbjects,function(e){return"("+this.type+"-width: "+e.breakpoint+"px),"+e.breakpoint},this),this.mediaQueries=Array.prototype.filter.call(this.mediaQueries,function(e,t,i){return Array.prototype.indexOf.call(i,e)===t});for(var o=0;o<this.mediaQueries.length;o++)!function(e){var e=r.mediaQueries[e],e=String.prototype.split.call(e,","),t=window.matchMedia(e[0]),i=e[1],n=Array.prototype.filter.call(r.оbjects,function(e){return e.breakpoint===i});t.addListener(function(){a.mediaHandler(t,n)}),r.mediaHandler(t,n)}(o)},V.prototype.mediaHandler=function(e,t){if(e.matches)for(var i=0;i<t.length;i++){var n=t[i];n.index=this.indexInParent(n.parent,n.element),this.moveTo(n.place,n.element,n.destination)}else for(var r=0;r<t.length;r++){var a=t[r];a.element.classList.contains(this.daClassname)&&this.moveBack(a.parent,a.element,a.index)}},V.prototype.moveTo=function(e,t,i){t.classList.add(this.daClassname),"last"===e||e>=i.children.length?i.insertAdjacentElement("beforeend",t):"first"!==e?i.children[e].insertAdjacentElement("beforebegin",t):i.insertAdjacentElement("afterbegin",t)},V.prototype.moveBack=function(e,t,i){t.classList.remove(this.daClassname),void 0!==e.children[i]?e.children[i].insertAdjacentElement("beforebegin",t):e.insertAdjacentElement("beforeend",t)},V.prototype.indexInParent=function(e,t){e=Array.prototype.slice.call(e.children);return Array.prototype.indexOf.call(e,t)},V.prototype.arraySort=function(e){"min"===this.type?Array.prototype.sort.call(e,function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?-1:"last"===e.place||"first"===t.place?1:e.place-t.place:e.breakpoint-t.breakpoint}):Array.prototype.sort.call(e,function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?1:"last"===e.place||"first"===t.place?-1:t.place-e.place:t.breakpoint-e.breakpoint})},new V("min").init(),function(){for(var i=document.querySelectorAll("._popup-link"),o=document.querySelectorAll(".popup"),e=function(e){var t=i[e];t.addEventListener("click",function(e){l&&function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";0<document.querySelectorAll(".popup._active").length&&r("",!1);var i=document.querySelector(".popup_".concat(e));i&&l&&(""!=t&&null!=t&&(document.querySelector(".popup_video").querySelector(".popup__video").innerHTML='<iframe src="https://www.youtube.com/embed/'.concat(t,'?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>')),document.querySelector(".menu__body._active")||d(500),i.classList.add("_active"),history.pushState("","","#".concat(e)))}(t.getAttribute("href").replace("#",""),t.getAttribute("data-video")),e.preventDefault()})},t=0;t<i.length;t+=1)e(t);for(var n=0;n<o.length;n+=1)o[n].addEventListener("click",function(e){e.target.closest(".popup__body")||r(e.target.closest(".popup"))});function r(e,t){var i=!(1<arguments.length&&void 0!==t)||t;if(l){if(e){t=e.querySelector(".popup__video");t&&(t.innerHTML=""),e.classList.remove("_active")}else for(var n=0;n<o.length;n+=1){var r=o[n],a=r.querySelector(".popup__video");a&&(a.innerHTML=""),r.classList.remove("_active")}!document.querySelector(".menu__body._active")&&i&&c(500),history.pushState("","",window.location.href.split("#")[0])}}var a=document.querySelectorAll(".popup__close,._popup-close");if(a)for(var s=0;s<a.length;s+=1)!function(e){var t=a[e];t.addEventListener("click",function(){r(t.closest(".popup"))})}(s);document.addEventListener("keydown",function(e){"Escape"===e.code&&r()})}(),s(),function(){var e,t=window.matchMedia("(min-width: 1280px)"),i=window.matchMedia("(min-width: 768px)"),n=document.querySelector(".header__inner"),r=document.querySelector(".sandwich"),a=document.querySelectorAll(".footer-nav__head");document.querySelectorAll(".footer-nav__button");t.matches,i.matches,window.addEventListener("resize",function(){e=e||setTimeout(function(){e=null,function(){s(),n.classList.contains("_active")&&(n.classList.remove("_active"),r.classList.remove("_active"),o.classList.remove("_overlay"),o.classList.remove("_lock"));!0===t.matches&&0<a.length&&a.forEach(function(e){e.classList.contains("is-active")&&e.classList.remove("is-active")})}()},100)},!1)}(),n=document.querySelector(".sandwich"),r=document.querySelector(".header__inner"),null!=n&&(n.addEventListener("click",function(e){l&&(t(500),n.classList.toggle("_active"),r.classList.toggle("_active"),o.classList.toggle("_overlay"))}),document.addEventListener("click",function(e){r.classList.contains("_active")&&(e.target.closest("._active")||(t(500),r.classList.remove("_active"),n.classList.remove("_active"),o.classList.remove("_overlay")))})),document.body.addEventListener("click",function(e){var t=e.target.nextElementSibling;if(t&&t.matches("._active")){t.querySelector('[data-nav-link="sub-close"]');return t.previousElementSibling.classList.remove("_active"),t.classList.remove("_active"),void(t.style.maxHeight=null)}a&&(e.target.closest(".nav__sub-list._active")&&!e.target.closest('[data-nav-link="sub-close"]')||(a.previousElementSibling.classList.remove("_active"),a.classList.remove("_active"),a.style.maxHeight=null)),t&&t.matches(".nav__sub-list")&&(t.previousElementSibling.classList.add("_active"),t.classList.add("_active"),t.style.maxHeight=t.scrollHeight+"px",a=t)}),document.querySelectorAll(".footer-nav__button").forEach(function(e){e.addEventListener("click",function(){e.parentElement.classList.toggle("is-active")})}),u=document.querySelector(".main-areas__controls"),p=document.querySelector(".main-blog__wrapper"),m=document.querySelector(".landing-hero__wrapper"),v=document.querySelector(".boxed-about__slider"),u&&new Swiper(u,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:30,slidesOffsetBefore:0,slidesOffsetAfter:20,breakpoints:{1280:{slidesOffsetAfter:0}}}),p&&new Swiper(p,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,breakpoints:{768:{slidesPerView:2},1280:{slidesPerView:3}}}),m&&new Swiper(m,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,navigation:{nextEl:".landing-hero__nav--next",prevEl:".landing-hero__nav--prev",disabledClass:"landing-hero__nav--disabled"},pagination:{el:".landing-hero__nav-bullets",type:"bullets",bulletClass:"landing-hero__nav-bullet",bulletActiveClass:"landing-hero__nav-bullet--active",clickable:!0},breakpoints:{768:{spaceBetween:20},1024:{spaceBetween:0}}}),v&&new Swiper(v,{direction:"horizontal",autoHeight:!0,grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:0,slidesOffsetBefore:0,slidesOffsetAfter:0,pagination:{el:".boxed-about__nav-bullets",type:"bullets",bulletClass:"boxed-about__nav-bullet",bulletActiveClass:"boxed-about__nav-bullet--active",clickable:!0}}),b=window.matchMedia("(max-width: 767px"),w=window.matchMedia("(min-width: 768px)"),S=window.matchMedia("(min-width: 1280px)"),k=document.querySelector(".crm-heading__slider"),L=document.querySelector(".crm-material__swiper"),q=document.querySelector(".nav__inner"),A=document.querySelector(".other-materials__wrapper"),x=document.querySelector(".settings-awards__swiper"),C=function(){k&&(f=new Swiper(k,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:20,slidesOffsetBefore:20,slidesOffsetAfter:0})),A&&(y=new Swiper(A,{direction:"horizontal",autoHeight:!0,grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0}))},E=function(){L&&(_=new Swiper(L,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,breakpoints:{768:{spaceBetween:40}},navigation:{nextEl:".crm-material__nav--next",prevEl:".crm-material__nav--prev",disabledClass:"crm-material__nav--disabled"}})),x&&(g=new Swiper(x,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,pagination:{el:".settings-awards__bullets",type:"bullets",bulletClass:"settings-awards__bullet",bulletActiveClass:"settings-awards__bullet--active",clickable:!0}}))},P=function(){q&&(h=new Swiper(q,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:30,slidesOffsetBefore:40,slidesOffsetAfter:40}))},w.addListener(I),S.addListener(I),I(),B=document.querySelectorAll("._phone-mask"),O={mask:"+{7} (000) 000-00-00"},B.forEach(function(e){IMask(e,O)}),document.querySelectorAll("._js-input-label").forEach(function(e){var t=e.parentElement.querySelector("label");e.addEventListener("focus",function(){t.classList.add("_active")}),e.addEventListener("blur",function(){e.value||t.classList.remove("_active")})}),document.querySelectorAll(".training-aside__button").forEach(function(e){var t=e.parentElement.querySelector(".training-aside__sub-list");e.addEventListener("click",function(){e.classList.toggle("_open"),t.classList.toggle("_open"),t.style.maxHeight?t.style.maxHeight=null:t.style.maxHeight=t.scrollHeight+"px"})}),e=new Tabs,window.tabs=e,function(){document.querySelector(".boxed-comparison__accordion");i=new Accordions,window.accordions=i}(),H=document.querySelector(".main-partners__list"),(j=document.querySelector(".main-partners__link"))&&j.addEventListener("click",function(){H.classList.contains("_active")?(H.style.maxHeight="",H.classList.remove("_active")):(H.classList.add("_active"),H.style.maxHeight=H.scrollHeight+"px")}),!(T=document.querySelector("#map"))||ymaps&&ymaps.ready(function(){var e=T.getAttribute("data-placemark");z=new window.ymaps.Map("map",{center:[59.73308,30.0854],zoom:17,controls:[]},{autoFitToViewport:!0,suppressMapOpenBlock:!0}),M=new window.ymaps.Placemark(z.getCenter(),{},{iconLayout:"default#image",iconImageHref:e,iconImageSize:[40,40],iconImageOffset:[-20,-50]}),z.behaviors.disable("scrollZoom"),z.geoObjects.add(M)})}();