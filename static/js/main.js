"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(i="Object"===i&&e.constructor?e.constructor.name:i)||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}!function(){var s=document.querySelector("body"),o=!0;function t(e){(document.querySelector("body").classList.contains("_lock")?c:d)(e)}function c(e){var t,i=document.querySelector("body");o&&(t=document.querySelectorAll("._lp"),setTimeout(function(){for(var e=0;e<t.length;e++)t[e].style.paddingRight="0px";i.style.paddingRight="0px",i.classList.remove("_lock")},e),o=!1,setTimeout(function(){o=!0},e))}function d(e){var t=document.querySelector("body");if(o){for(var i=document.querySelectorAll("._lp"),n=0;n<i.length;n++)i[n].style.paddingRight=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px";t.style.paddingRight=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px",t.classList.add("_lock"),o=!1,setTimeout(function(){o=!0},e)}}function l(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))}var e,i,n,a,r,u,p,v,m,f,_,y,b,h,g,w,S,k,C,A,x,L,q,E,P,B,O,H,V,T,z,I,j,M,W,Q,R,D,F,N,U,Z,$,G,J,K,X,Y;function ee(e){this.type=e}ee.prototype.init=function(){var a=this,r=this;this.оbjects=[],this.daClassname="_dynamic_adapt_",this.nodes=document.querySelectorAll("[data-da]");for(var e=0;e<this.nodes.length;e++){var t=this.nodes[e],i=t.dataset.da.trim().split(","),n={};n.element=t,n.parent=t.parentNode,n.destination=document.querySelector(i[0].trim()),n.breakpoint=i[1]?i[1].trim():"767",n.place=i[2]?i[2].trim():"last",n.index=this.indexInParent(n.parent,n.element),this.оbjects.push(n)}this.arraySort(this.оbjects),this.mediaQueries=Array.prototype.map.call(this.оbjects,function(e){return"("+this.type+"-width: "+e.breakpoint+"px),"+e.breakpoint},this),this.mediaQueries=Array.prototype.filter.call(this.mediaQueries,function(e,t,i){return Array.prototype.indexOf.call(i,e)===t});for(var s=0;s<this.mediaQueries.length;s++)!function(e){var e=a.mediaQueries[e],e=String.prototype.split.call(e,","),t=window.matchMedia(e[0]),i=e[1],n=Array.prototype.filter.call(a.оbjects,function(e){return e.breakpoint===i});t.addListener(function(){r.mediaHandler(t,n)}),a.mediaHandler(t,n)}(s);console.log(this.mediaQueries)},ee.prototype.mediaHandler=function(e,t){if(e.matches)for(var i=0;i<t.length;i++){var n=t[i];n.index=this.indexInParent(n.parent,n.element),this.moveTo(n.place,n.element,n.destination)}else for(var a=0;a<t.length;a++){var r=t[a];r.element.classList.contains(this.daClassname)&&this.moveBack(r.parent,r.element,r.index)}},ee.prototype.moveTo=function(e,t,i){t.classList.add(this.daClassname),"last"===e||e>=i.children.length?i.insertAdjacentElement("beforeend",t):"first"!==e?i.children[e].insertAdjacentElement("beforebegin",t):i.insertAdjacentElement("afterbegin",t)},ee.prototype.moveBack=function(e,t,i){t.classList.remove(this.daClassname),void 0!==e.children[i]?e.children[i].insertAdjacentElement("beforebegin",t):e.insertAdjacentElement("beforeend",t)},ee.prototype.indexInParent=function(e,t){e=Array.prototype.slice.call(e.children);return Array.prototype.indexOf.call(e,t)},ee.prototype.arraySort=function(e){"min"===this.type?Array.prototype.sort.call(e,function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?-1:"last"===e.place||"first"===t.place?1:e.place-t.place:e.breakpoint-t.breakpoint}):Array.prototype.sort.call(e,function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?1:"last"===e.place||"first"===t.place?-1:t.place-e.place:t.breakpoint-e.breakpoint})},new ee("min").init(),function(){for(var i=document.querySelectorAll("._popup-link"),s=document.querySelectorAll(".popup"),e=function(e){var t=i[e];t.addEventListener("click",function(e){o&&function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";0<document.querySelectorAll(".popup._active").length&&a("",!1);var i=document.querySelector(".popup_".concat(e));i&&o&&(""!=t&&null!=t&&(document.querySelector(".popup_video").querySelector(".popup__video").innerHTML="<iframe src='https://www.youtube.com/embed/".concat(t,"?autoplay=1'  allow='autoplay; encrypted-media' allowfullscreen></iframe>")),document.querySelector(".menu__body._active")||d(500),i.classList.add("_active"),history.pushState("","","#".concat(e)))}(t.getAttribute("href").replace("#",""),t.getAttribute("data-video")),e.preventDefault()})},t=0;t<i.length;t+=1)e(t);for(var n=0;n<s.length;n+=1)s[n].addEventListener("click",function(e){e.target.closest(".popup__body")||a(e.target.closest(".popup"))});function a(e,t){var i=!(1<arguments.length&&void 0!==t)||t;if(o){if(e){t=e.querySelector(".popup__video");t&&(t.innerHTML=""),e.classList.remove("_active")}else for(var n=0;n<s.length;n+=1){var a=s[n],r=a.querySelector(".popup__video");r&&(r.innerHTML=""),a.classList.remove("_active")}!document.querySelector(".menu__body._active")&&i&&c(500),history.pushState("","",window.location.href.split("#")[0])}}var r=document.querySelectorAll(".popup__close,._popup-close");if(r)for(var l=0;l<r.length;l+=1)!function(e){var t=r[e];t.addEventListener("click",function(){a(t.closest(".popup"))})}(l);document.addEventListener("keydown",function(e){"Escape"===e.code&&a()})}(),l(),function(){var e,t=window.matchMedia("(min-width: 1280px)"),i=window.matchMedia("(min-width: 768px)"),n=document.querySelector(".header__inner"),a=document.querySelector(".sandwich"),r=document.querySelectorAll(".footer-nav__head");document.querySelectorAll(".footer-nav__button");t.matches,i.matches,window.addEventListener("resize",function(){e=e||setTimeout(function(){e=null,function(){l(),n.classList.contains("_active")&&(n.classList.remove("_active"),a.classList.remove("_active"),s.classList.remove("_overlay"),s.classList.remove("_lock"));!0===t.matches&&0<r.length&&r.forEach(function(e){e.classList.contains("is-active")&&e.classList.remove("is-active")})}()},100)},!1)}(),n=document.querySelector(".sandwich"),a=document.querySelector(".header__inner"),null!=n&&(n.addEventListener("click",function(e){o&&(t(500),n.classList.toggle("_active"),a.classList.toggle("_active"),s.classList.toggle("_overlay"))}),document.addEventListener("click",function(e){a.classList.contains("_active")&&(e.target.closest("._active")||(t(500),a.classList.remove("_active"),n.classList.remove("_active"),s.classList.remove("_overlay")))})),document.body.addEventListener("click",function(e){var t=e.target.nextElementSibling;if(t&&t.matches("._active")){t.querySelector('[data-nav-link="sub-close"]');return t.previousElementSibling.classList.remove("_active"),t.classList.remove("_active"),void(t.style.maxHeight=null)}r&&(e.target.closest(".nav__sub-list._active")&&!e.target.closest('[data-nav-link="sub-close"]')||(r.previousElementSibling.classList.remove("_active"),r.classList.remove("_active"),r.style.maxHeight=null)),t&&t.matches(".nav__sub-list")&&(t.previousElementSibling.classList.add("_active"),t.classList.add("_active"),t.style.maxHeight=t.scrollHeight+"px",r=t)}),document.querySelectorAll(".footer-nav__button").forEach(function(e){e.addEventListener("click",function(){e.parentElement.classList.toggle("is-active")})}),e=new Tabs,window.tabs=e,u=document.querySelector(".main-areas__controls"),p=document.querySelector(".main-blog__wrapper"),v=document.querySelector(".landing-hero__wrapper"),m=document.querySelector(".boxed-about__slider"),f=document.querySelector(".landing-examples__swiper"),_=document.querySelector(".about-company-team__box"),y=document.querySelector(".applications__slider"),b=document.querySelectorAll(".about-company-certificate__inner"),u&&new Swiper(u,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:30,slidesOffsetBefore:0,slidesOffsetAfter:20,breakpoints:{1280:{slidesOffsetAfter:0}}}),y&&new Swiper(y,{spaceBetween:0,effect:"fade",fadeEffect:{crossFade:!0},pagination:{el:y.querySelector(".swiper-pagination"),type:"bullets",clickable:!0}}),p&&new Swiper(p,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,breakpoints:{768:{slidesPerView:2},1280:{slidesPerView:3}}}),!v||(v=new Swiper(v,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,navigation:{nextEl:".landing-hero__nav--next",prevEl:".landing-hero__nav--prev",disabledClass:"landing-hero__nav--disabled"},pagination:{el:".landing-hero__nav-bullets",type:"bullets",bulletClass:"landing-hero__nav-bullet",bulletActiveClass:"landing-hero__nav-bullet--active",clickable:!0},breakpoints:{768:{spaceBetween:20},1024:{spaceBetween:0}}})).slides.length<2&&(v.disable(),document.querySelector(".landing-hero__navigation").style.display="none"),m&&new Swiper(m,{direction:"horizontal",autoHeight:!0,grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:0,slidesOffsetBefore:0,slidesOffsetAfter:0,pagination:{el:".boxed-about__nav-bullets",type:"bullets",bulletClass:"boxed-about__nav-bullet",bulletActiveClass:"boxed-about__nav-bullet--active",clickable:!0}}),f&&new Swiper(f,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:40,slidesOffsetBefore:0,slidesOffsetAfter:0,navigation:{nextEl:".landing-examples__nav--next",prevEl:".landing-examples__nav--prev",disabledClass:"landing-examples__nav--disabled"},pagination:{el:".landing-examples__nav-bullets",type:"bullets",bulletClass:"landing-examples__nav-bullet",bulletActiveClass:"landing-examples__nav-bullet--active",clickable:!0},breakpoints:{768:{spaceBetween:"14.5%"},1024:{spaceBetween:"20%"},1440:{spaceBetween:"25%"},1920:{spaceBetween:20}}}),_&&(_.querySelectorAll(".swiper-slide"),new Swiper(_,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:20,loop:!0,on:{slideChangeTransitionStart:function(){this.updateSize()}},breakpoints:{768:{slidesPerView:"auto"}},pagination:{el:".about-company-team__nav-bullets",type:"bullets",bulletClass:"about-company-team__nav-bullet",bulletActiveClass:"about-company-team__nav-bullet--active",clickable:!0},navigation:{nextEl:".about-company-team__nav--next",prevEl:".about-company-team__nav--prev",disabledClass:"about-company-team__nav--disabled"}})),b.length&&b.forEach(function(e){var t=e.querySelector(".about-company-certificate__nav-bullets");new Swiper(e,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,breakpoints:{1024:{slidesPerView:3}},pagination:{el:t,type:"bullets",bulletClass:"about-company-certificate__nav-bullet",bulletActiveClass:"about-company-certificate__nav-bullet--active",clickable:!0}})}),L=window.matchMedia("(max-width: 767px"),q=window.matchMedia("(min-width: 768px)"),E=window.matchMedia("(min-width: 1280px)"),P=window.matchMedia("(max-width: 1919px)"),B=document.querySelector(".crm-heading__slider"),O=document.querySelector(".crm-material__swiper"),H=document.querySelector(".nav__inner"),V=document.querySelector(".other-materials__wrapper"),T=document.querySelector(".settings-awards__swiper"),z=document.querySelector(".landing-offers__sliders"),I=document.querySelector(".landing-industries__swiper"),j=document.querySelector(".about-company-history__slider"),M=document.querySelector(".activities__slider"),W=null,Q=function(){var e;e=e||setTimeout(function(){!(e=null)===q.matches?(void 0!==h&&h.destroy(!0,!0),void 0!==S&&S.destroy(!0,!0)):!1===q.matches&&F(),!0===E.matches?(void 0!==g&&g.destroy(!0,!0),void 0!==k&&k.destroy(!0,!0)):!1===E.matches&&N(),!0===E.matches||!0===L.matches?void 0!==w&&w.destroy(!0,!0):!0===q.matches&&U(),!0===q.matches&&!0===P.matches?(void 0!==C&&C.destroy(!0,!0),void 0!==A&&A.destroy(!0,!0)):D(),!1===q.matches?void 0!==x&&x.destroy(!0,!0):!0===q.matches&&R()},100)},R=function(){j&&(j.querySelectorAll(".swiper-slide"),x=new Swiper(j,{direction:"vertical",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!0,slidesPerView:"auto",spaceBetween:30,mousewheel:!0,watchSlidesVisibility:!0,slideActiveClass:"is-active",on:{init:function(e){e.slides[3].classList.add("small")},slideChange:function(e){if(_toConsumableArray(e.slides).forEach(function(e){e.classList.remove("small")}),e.slides[e.activeIndex+3]){if(e.slides[e.activeIndex+3]===e.slides[e.slides.length-1])return;e.slides[e.activeIndex+3].classList.add("small")}e.slides[e.activeIndex+4]&&e.slides[e.activeIndex+4].classList.add("smaller")}}}))},D=function(){z&&(C=new Swiper(z,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,navigation:{nextEl:".landing-offers__nav--next",prevEl:".landing-offers__nav--prev",disabledClass:"landing-offers__nav--disabled"},pagination:{el:".landing-offers__nav-bullets",type:"bullets",bulletClass:"landing-offers__nav-bullet",bulletActiveClass:"landing-offers__nav-bullet--active",clickable:!0},breakpoints:{1920:{slidesPerView:2}}})),I&&(A=new Swiper(I,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:40,slidesOffsetBefore:0,slidesOffsetAfter:0,navigation:{nextEl:".landing-industries__nav--next",prevEl:".landing-industries__nav--prev",disabledClass:"landing-industries__nav--disabled"},pagination:{el:".landing-industries__nav-bullets",type:"bullets",bulletClass:"landing-industries__nav-bullet",bulletActiveClass:"landing-industries__nav-bullet--active",clickable:!0},breakpoints:{1920:{spaceBetween:20,slidesPerView:"auto"}}}))},F=function(){B&&(h=new Swiper(B,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:20,slidesOffsetBefore:20,slidesOffsetAfter:0})),V&&(S=new Swiper(V,{direction:"horizontal",autoHeight:!0,grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0}))},N=function(){O&&(g=new Swiper(O,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,breakpoints:{768:{spaceBetween:40}},navigation:{nextEl:".crm-material__nav--next",prevEl:".crm-material__nav--prev",disabledClass:"crm-material__nav--disabled"}})),T&&(k=new Swiper(T,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,pagination:{el:".settings-awards__bullets",type:"bullets",bulletClass:"settings-awards__bullet",bulletActiveClass:"settings-awards__bullet--active",clickable:!0},breakpoints:{768:{slidesPerView:1}}}))},U=function(){H&&(w=new Swiper(H,{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:"auto",spaceBetween:30,slidesOffsetBefore:40,slidesOffsetAfter:40}))},q.addListener(Q),E.addListener(Q),P.addListener(Q),Q(),M&&((Q=function(){q.matches?W&&(W.destroy(!0,!0),W=null):W=W||new Swiper(M,{spaceBetween:20,pagination:{el:".activities__nav-bullets",type:"bullets",bulletClass:"activities__nav-bullet",bulletActiveClass:"activities__nav-bullet--active",clickable:!0}})})(),q.addListener(Q)),Z=document.querySelectorAll("._phone-mask"),$={mask:"+{7} (000) 000-00-00"},Z.forEach(function(e){IMask(e,$)}),document.querySelectorAll("._js-input-label").forEach(function(e){var t=e.parentElement.querySelector("label");e.addEventListener("focus",function(){t.classList.add("_active")}),e.addEventListener("blur",function(){e.value||t.classList.remove("_active")})}),document.querySelectorAll(".training-aside__button").forEach(function(e){var t=e.parentElement.querySelector(".training-aside__sub-list");e.addEventListener("click",function(){e.classList.toggle("_open"),t.classList.toggle("_open"),t.style.maxHeight?t.style.maxHeight=null:t.style.maxHeight=t.scrollHeight+"px"})}),function(){document.querySelector(".boxed-comparison__accordion");i=new Accordions,window.accordions=i}(),G=document.querySelector(".main-partners__list"),(J=document.querySelector(".main-partners__link"))&&J.addEventListener("click",function(){G.classList.contains("_active")?(G.style.maxHeight="",G.classList.remove("_active")):(G.classList.add("_active"),G.style.maxHeight=G.scrollHeight+"px")}),!(Y=document.querySelector("#map"))||ymaps&&ymaps.ready(function(){var e=Y.getAttribute("data-placemark");K=new window.ymaps.Map("map",{center:[59.73308,30.0854],zoom:17,controls:[]},{autoFitToViewport:!0,suppressMapOpenBlock:!0}),X=new window.ymaps.Placemark(K.getCenter(),{},{iconLayout:"default#image",iconImageHref:e,iconImageSize:[40,40],iconImageOffset:[-20,-50]}),K.behaviors.disable("scrollZoom"),K.geoObjects.add(X)}),function(){var t=document.querySelector(".about-company-history__more"),n=document.querySelector(".about-company-history__list"),e=_toConsumableArray(document.querySelectorAll(".about-company-history__item")),a=window.matchMedia("(min-width: 768px)"),r=0,i=window.innerWidth;e.concat().splice(0,3);function s(e){e.preventDefault(),t.classList.contains("is-open")?(t.classList.remove("is-open"),t.textContent="Загрузить еще",n.style.maxHeight="".concat(r,"px")):(t.classList.add("is-open"),t.textContent="Скрыть",n.style.maxHeight="".concat(n.scrollHeight,"px"))}function l(){var i;a.matches?(t.removeEventListener("click",s),n.style.maxHeight="unset",t.style.display="none"):(i=0,e.forEach(function(e,t){t<3&&(i+=e.clientHeight)}),r=i,n.style.maxHeight="".concat(r,"px"),t.style.display="flex",t.addEventListener("click",s))}n&&(l(),window.addEventListener("resize",function(){i!==window.innerWidth&&(i=window.innerWidth,l())}))}()}();