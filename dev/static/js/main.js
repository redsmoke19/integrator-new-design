(function() {
  'use strict';
  const body = document.querySelector('body');
  let unlock = true;
  const dynamicAdaptiv = () => {
    // Dynamic Adapt v.1
    // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
    // e.x. data-da=".item,992,2"

    function DynamicAdapt(type) {
      this.type = type;
    }

    DynamicAdapt.prototype.init = function() {
      const _this = this;
      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_';
      // массив DOM-элементов
      this.nodes = document.querySelectorAll('[data-da]');

      // наполнение оbjects объктами
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(',');
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
      }

      this.arraySort(this.оbjects);

      // массив уникальных медиа-запросов
      this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function(item) {
          return (
            '(' +
            this.type +
            '-width: ' +
            item.breakpoint +
            'px),' +
            item.breakpoint
          );
        },
        this,
      );
      this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function(item, index, self) {
          return Array.prototype.indexOf.call(self, item) === index;
        },
      );

      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(
          this.оbjects,
          function(item) {
            return item.breakpoint === mediaBreakpoint;
          },
        );
        matchMedia.addListener(function() {
          _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
      }
    };

    DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
      if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
          const оbject = оbjects[i];
          оbject.index = this.indexInParent(оbject.parent, оbject.element);
          this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
      } else {
        for (let i = 0; i < оbjects.length; i++) {
          const оbject = оbjects[i];
          if (оbject.element.classList.contains(this.daClassname)) {
            this.moveBack(оbject.parent, оbject.element, оbject.index);
          }
        }
      }
    };

    // Функция перемещения
    DynamicAdapt.prototype.moveTo = function(place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
      }
      if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
      }
      destination.children[place].insertAdjacentElement('beforebegin', element);
    };

    // Функция возврата
    DynamicAdapt.prototype.moveBack = function(parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
      } else {
        parent.insertAdjacentElement('beforeend', element);
      }
    };

    // Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function(parent, element) {
      const array = Array.prototype.slice.call(parent.children);
      return Array.prototype.indexOf.call(array, element);
    };

    // Функция сортировки массива по breakpoint и place
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function(arr) {
      if (this.type === 'min') {
        Array.prototype.sort.call(arr, function(a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return -1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return 1;
            }

            return a.place - b.place;
          }

          return a.breakpoint - b.breakpoint;
        });
      } else {
        Array.prototype.sort.call(arr, function(a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return 1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return -1;
            }

            return b.place - a.place;
          }

          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    };

    const da = new DynamicAdapt('min');
    da.init();
  };

  function bodyLock(delay) {
    const body = document.querySelector('body');
    if (body.classList.contains('_lock')) {
      bodyLockRemove(delay);
    } else {
      bodyLockAdd(delay);
    }
  }

  function bodyLockRemove(delay) {
    const body = document.querySelector('body');
    if (unlock) {
      const lockPadding = document.querySelectorAll('._lp');
      setTimeout(() => {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('_lock');
      }, delay);

      unlock = false;
      setTimeout(function() {
        unlock = true;
      }, delay);
    }
  }

  function bodyLockAdd(delay) {
    const body = document.querySelector('body');
    if (unlock) {
      const lockPadding = document.querySelectorAll('._lp');
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight =
          window.innerWidth -
          document.querySelector('.wrapper').offsetWidth +
          'px';
      }
      body.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px';
      body.classList.add('_lock');

      unlock = false;
      setTimeout(function() {
        unlock = true;
      }, delay);
    }
  }

  const getPopup = () => {
    const popup_link = document.querySelectorAll('._popup-link');
    const popups = document.querySelectorAll('.popup');
    for (let index = 0; index < popup_link.length; index += 1) {
      const el = popup_link[index];
      // eslint-disable-next-line no-loop-func
      el.addEventListener('click', (e) => {
        if (unlock) {
          const item = el.getAttribute('href').replace('#', '');
          const video = el.getAttribute('data-video');
          popup_open(item, video);
        }
        e.preventDefault();
      });
    }
    for (let index = 0; index < popups.length; index += 1) {
      const popup = popups[index];
      popup.addEventListener('click', (e) => {
        if (!e.target.closest('.popup__body')) {
          popup_close(e.target.closest('.popup'));
        }
      });
    }

    function popup_open(item, video = '') {
      const activePopup = document.querySelectorAll('.popup._active');
      if (activePopup.length > 0) {
        popup_close('', false);
      }
      let curent_popup = document.querySelector(`.popup_${item}`);
      if (curent_popup && unlock) {
        if (video != '' && video != null) {
          const popup_video = document.querySelector('.popup_video');
          popup_video.querySelector('.popup__video').innerHTML = `<iframe src='https://www.youtube.com/embed/${video}?autoplay=1'  allow='autoplay; encrypted-media' allowfullscreen></iframe>`;
        }
        if (!document.querySelector('.menu__body._active')) {
          bodyLockAdd(500);
        }
        curent_popup.classList.add('_active');
        history.pushState('', '', `#${item}`);
      }
    }

    function popup_close(item, bodyUnlock = true) {
      if (unlock) {
        if (!item) {
          for (let index = 0; index < popups.length; index += 1) {
            const popup = popups[index];
            const video = popup.querySelector('.popup__video');
            if (video) {
              video.innerHTML = '';
            }
            popup.classList.remove('_active');
          }
        } else {
          const video = item.querySelector('.popup__video');
          if (video) {
            video.innerHTML = '';
          }
          item.classList.remove('_active');
        }
        if (!document.querySelector('.menu__body._active') && bodyUnlock) {
          bodyLockRemove(500);
        }
        history.pushState('', '', window.location.href.split('#')[0]);
      }
    }

    const popup_close_icon = document.querySelectorAll(
      '.popup__close,._popup-close',
    );
    if (popup_close_icon) {
      for (let index = 0; index < popup_close_icon.length; index += 1) {
        const el = popup_close_icon[index];
        el.addEventListener('click', () => {
          popup_close(el.closest('.popup'));
        });
      }
    }
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        popup_close();
      }
    });
  };

  const getPageVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  const getResize = () => {
    const breakpointTablet = window.matchMedia('(min-width: 1280px)');
    const breakpointMobile = window.matchMedia('(min-width: 768px)');
    const headerInner = document.querySelector('.header__inner');
    const sandwich = document.querySelector('.sandwich');
    const footerSubList = document.querySelectorAll('.footer-nav__head');
    const footerSubOpenButton = document.querySelectorAll('.footer-nav__button');
    if (breakpointTablet.matches === false) {
    }
    if (breakpointMobile.matches === false) {
    }
    window.addEventListener('resize', resizeThrottler, false);
    let resizeTimeout;

    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
        }, 100);
      }
    }

    function actualResizeHandler() {
      getPageVh();
      if (headerInner.classList.contains('_active')) {
        headerInner.classList.remove('_active');
        sandwich.classList.remove('_active');
        body.classList.remove('_overlay');
        body.classList.remove('_lock');
      }
      if (breakpointTablet.matches === true) {
        if (footerSubList.length > 0) {
          footerSubList.forEach(item => {
            if (item.classList.contains('is-active')) {
              item.classList.remove('is-active');
            }
          });
        }
      }
    }
  };

  const getSandwich = () => {
    const sandwich = document.querySelector('.sandwich');
    const headerInner = document.querySelector('.header__inner');

    if (sandwich != null) {
      const delay = 500;
      sandwich.addEventListener('click', function(e) {
        if (unlock) {
          bodyLock(delay);
          sandwich.classList.toggle('_active');
          headerInner.classList.toggle('_active');
          body.classList.toggle('_overlay');
        }
      });
      document.addEventListener('click', function(e) {
        if (!headerInner.classList.contains('_active')) return;
        if (!e.target.closest('._active')) {
          bodyLock(delay);
          headerInner.classList.remove('_active');
          sandwich.classList.remove('_active');
          body.classList.remove('_overlay');
        }
      });
    }
  };

  const getNavSubMenu = () => {
    let currentTarget;
    const menuClickHandler = (e) => {
      const menuItem = e.target.nextElementSibling;
      if (menuItem && menuItem.matches('._active')) {
        const closeButton = menuItem.querySelector('[data-nav-link="sub-close"]');
        menuItem.previousElementSibling.classList.remove('_active');
        menuItem.classList.remove('_active');
        menuItem.style.maxHeight = null;
        return;
      }
      if (currentTarget) {
        if (!e.target.closest('.nav__sub-list._active') || e.target.closest('[data-nav-link="sub-close"]')) {
          currentTarget.previousElementSibling.classList.remove('_active');
          currentTarget.classList.remove('_active');
          currentTarget.style.maxHeight = null;
        }
      }
      if (menuItem && menuItem.matches('.nav__sub-list')) {
        menuItem.previousElementSibling.classList.add('_active');
        menuItem.classList.add('_active');
        menuItem.style.maxHeight = menuItem.scrollHeight + 'px';
        currentTarget = menuItem;
      }
    };
    document.body.addEventListener('click', menuClickHandler);
  };

  const getSubItemsFooter = () => {
    const toggleButton = document.querySelectorAll('.footer-nav__button');
    toggleButton.forEach(item => {
      item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('is-active');
        // sublist.classList.toggle('is-active');
      });
    });
  };

  const getAllBreakpointsSlider = () => {
    const mainAreasTabs = document.querySelector('.main-areas__controls');
    const mainBlogMaterial = document.querySelector('.main-blog__wrapper');
    const landingHeroSlider = document.querySelector('.landing-hero__wrapper');
    const boxedAboutSlider = document.querySelector('.boxed-about__slider');
    const landingExampleSlider = document.querySelector('.landing-examples__swiper');
    const aboutCompanyTeam = document.querySelector('.about-company-team__box');
    const aboutCompanyCertificate = document.querySelectorAll('.about-company-certificate__inner');
    if (mainAreasTabs) {
      new Swiper(mainAreasTabs, {
        direction: 'horizontal',
        grabCursor: true,
        preventClicks: true,
        preventClicksPropagation: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 20,
        breakpoints: {
          1280: {
            slidesOffsetAfter: 0,
          },
        },
      });
    }
    if (mainBlogMaterial) {
      new Swiper(mainBlogMaterial, {
        direction: 'horizontal',
        grabCursor: true,
        preventClicks: true,
        preventClicksPropagation: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        // autoHeight: true,
        breakpoints: {
          768: {
            slidesPerView: 2,
            // autoHeight: false,
          },
          1280: {
            slidesPerView: 3,
            // autoHeight: false,
          },
        },
      });
    }
    if (landingHeroSlider) {
      const heroLandingSlider = new Swiper(landingHeroSlider, {
        direction: 'horizontal',
        grabCursor: true,
        preventClicks: true,
        preventClicksPropagation: true,
        slidesPerView: 1,
        spaceBetween: 20,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        navigation: {
          nextEl: '.landing-hero__nav--next',
          prevEl: '.landing-hero__nav--prev',
          disabledClass: 'landing-hero__nav--disabled',
        },
        pagination: {
          el: '.landing-hero__nav-bullets',
          type: 'bullets',
          bulletClass: 'landing-hero__nav-bullet',
          bulletActiveClass: 'landing-hero__nav-bullet--active',
          clickable: true,
        },
        breakpoints: {
          768: {
            spaceBetween: 20,
          },
          1024: {
            spaceBetween: 0,
          },
        },
      });
      if (heroLandingSlider.slides.length < 2) {
        heroLandingSlider.disable();
        document.querySelector('.landing-hero__navigation').style.display = 'none';
      }
    }
    if (boxedAboutSlider) {
      new Swiper(boxedAboutSlider, {
        direction: 'horizontal',
        autoHeight: true,
        grabCursor: true,
        preventClicks: true,
        preventClicksPropagation: true,
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        pagination: {
          el: '.boxed-about__nav-bullets',
          type: 'bullets',
          bulletClass: 'boxed-about__nav-bullet',
          bulletActiveClass: 'boxed-about__nav-bullet--active',
          clickable: true,
        },
      });
    }
    if (landingExampleSlider) {
      new Swiper(landingExampleSlider, {
        direction: 'horizontal',
        grabCursor: true,
        preventClicks: true,
        preventClicksPropagation: true,
        slidesPerView: 1,
        spaceBetween: 40,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        navigation: {
          nextEl: '.landing-examples__nav--next',
          prevEl: '.landing-examples__nav--prev',
          disabledClass: 'landing-examples__nav--disabled',
        },
        pagination: {
          el: '.landing-examples__nav-bullets',
          type: 'bullets',
          bulletClass: 'landing-examples__nav-bullet',
          bulletActiveClass: 'landing-examples__nav-bullet--active',
          clickable: true,
        },
        breakpoints: {
          768: {
            spaceBetween: '14.5%',
          },
          1024: {
            spaceBetween: '20%',
          },
          1440: {
            spaceBetween: '25%',
          },
          1920: {
            spaceBetween: 20,
          },
        },
      });
    }
    if (aboutCompanyTeam) {
      const slides = aboutCompanyTeam.querySelectorAll('.swiper-slide')

      const aboutCompanyTeamSlider = new Swiper(aboutCompanyTeam, {
        direction: 'horizontal',
        grabCursor: true,
        preventClicks: true,
        preventClicksPropagation: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        // slideActiveClass: 'is-active',
        on: {
          /*init: function () {
            for (let i = 0; i < slides.length; i++) {
              if (i === 3) {
                slides[i].style.marginLeft = '-120px';
              }
            }
          },*/

          slideChangeTransitionStart: function() {
            this.updateSize();
          },

          /*activeIndexChange: function () {
            for (let i = 0; i < slides.length; i++) {
              const activeIndex = aboutCompanyTeamSlider.activeIndex;

              if (i === activeIndex + 2) {
                slides[i].style.marginLeft = '-120px';
              }
            }
          }*/
        },
        breakpoints: {
          768: {
            slidesPerView: 'auto',
          },
        },
        pagination: {
          el: '.about-company-team__nav-bullets',
          type: 'bullets',
          bulletClass: 'about-company-team__nav-bullet',
          bulletActiveClass: 'about-company-team__nav-bullet--active',
          clickable: true,
        },
        navigation: {
          nextEl: '.about-company-team__nav--next',
          prevEl: '.about-company-team__nav--prev',
          disabledClass: 'about-company-team__nav--disabled',
        },
      });
    }
    if (aboutCompanyCertificate.length) {
      aboutCompanyCertificate.forEach(item => {
        const pagination = item.querySelector('.about-company-certificate__nav-bullets')
        // console.log(item);
        const slider = new Swiper(item, {
          // init: false,
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 'auto',
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          breakpoints: {
            1024: {
              slidesPerView: 3,
            }
          },
          pagination: {
            el: pagination,
            type: 'bullets',
            bulletClass: 'about-company-certificate__nav-bullet',
            bulletActiveClass: 'about-company-certificate__nav-bullet--active',
            clickable: true,
          }
        });

      })
    }
  };

  const getSlider = () => {
    const breakpointMobile = window.matchMedia('(max-width: 767px');
    const breakpointTablet = window.matchMedia('(min-width: 768px)');
    const breakpointDesktop = window.matchMedia('(min-width: 1280px)');
    const breakpointLarge = window.matchMedia('(max-width: 1919px)');
    const crmTrainingHead = document.querySelector('.crm-heading__slider');
    const crmMaterial = document.querySelector('.crm-material__swiper');
    const navMenu = document.querySelector('.nav__inner');
    const otherMaterials = document.querySelector('.other-materials__wrapper');
    const settingsAwards = document.querySelector('.settings-awards__swiper');
    const landingOffer = document.querySelector('.landing-offers__sliders');
    const landingIndustrial = document.querySelector('.landing-industries__swiper');
    const aboutHistory = document.querySelector('.about-company-history__slider');
    let crmTrainingHeadSlider;
    let crmMaterialSlider;
    let navSlider;
    let otherMaterialsSlider;
    let settingsAwardsSlider;
    let landingOfferSlider;
    let landingIndustrialSlider;
    let aboutHistorySlider;

    const breakpointChecker = function() {
      let resizeTimeout;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          resizeHandlerTablet();
          resizeHandlerDesktop();
          resizeBetween();
          resizeMobileandLarge();
          resizeHandlerMobile();
        }, 100);
      }

      function resizeHandlerMobile() {
        if (breakpointTablet.matches === false) {
          if (aboutHistorySlider !== undefined) {
            aboutHistorySlider.destroy(true, true);
          }
        } else if (breakpointTablet.matches === true) {
          getMobileSlider();
        }
      }

      function resizeHandlerTablet() {
        if (breakpointTablet.matches === true) {
          if (crmTrainingHeadSlider !== undefined) {
            crmTrainingHeadSlider.destroy(true, true);
          }
          if (otherMaterialsSlider !== undefined) {
            otherMaterialsSlider.destroy(true, true);
          }
        } else if (breakpointTablet.matches === false) {
          getTabletSlider();
        }
      }

      function resizeHandlerDesktop() {
        if (breakpointDesktop.matches === true) {
          if (crmMaterialSlider !== undefined) {
            crmMaterialSlider.destroy(true, true);
          }
          if (settingsAwardsSlider !== undefined) {
            settingsAwardsSlider.destroy(true, true);
          }
        } else if (breakpointDesktop.matches === false) {
          getDesktopSliders();
        }
      }

      function resizeBetween() {
        if (breakpointDesktop.matches === true || breakpointMobile.matches === true) {
          if (navSlider !== undefined) {
            navSlider.destroy(true, true);
          }
        } else if (breakpointTablet.matches === true) {
          getBetweenMobileAndDesktopSliders();
        }
      }

      function resizeMobileandLarge() {
        if (breakpointTablet.matches === true && breakpointLarge.matches === true) {
          if (landingOfferSlider !== undefined) {
            landingOfferSlider.destroy(true, true);
          }
          if (landingIndustrialSlider !== undefined) {
            landingIndustrialSlider.destroy(true, true);
          }
        } else {
          getMobilAndLargeSlider();
        }
      }
    };

    const getMobileSlider = function() {
      if (aboutHistory) {
        const slides = aboutHistory.querySelectorAll('.swiper-slide')
        const clear = (elements) => {
          [...elements].forEach((el) => {
            el.classList.remove('small');
          });
        };

        aboutHistorySlider = new Swiper(aboutHistory, {
          direction: 'vertical',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slideToClickedSlide: true,
          slidesPerView: 'auto',
          spaceBetween: 30,
          // freeMode: {
          //   enabled: true,
          //   sticky: true,
          // },
          mousewheel: true,
          watchSlidesVisibility: true,
          slideActiveClass: 'is-active',
          on: {
            init(swiper) {
              swiper.slides[3].classList.add('small');
            },
            slideChange(swiper) {
              clear(swiper.slides);
              if (swiper.slides[swiper.activeIndex + 3]) {
                if (swiper.slides[swiper.activeIndex + 3] === swiper.slides[swiper.slides.length - 1]) {
                  return;
                }
                swiper.slides[swiper.activeIndex + 3].classList.add('small');
              }
              if (swiper.slides[swiper.activeIndex + 4]) {
                swiper.slides[swiper.activeIndex + 4].classList.add('smaller');
              }
            },
            // init: function () {
            //   for (let i = 0; i < slides.length; i++) {
            //     const point = slides[i].querySelector('.about-company-history__point');
            //     const year = slides[i].querySelector('.about-company-history__year');
            //     const text = slides[i].querySelector('.about-company-history__text');
            //
            //     slides[i].style.opacity = '0';
            //
            //     if (i === 0 || i === 1 || i === 2) {
            //       slides[i].style.opacity = '1';
            //
            //       point.style.width = '30px';
            //       point.style.height = '30px';
            //       point.style.left = '86px';
            //
            //       year.style.fontSize = '20px';
            //       year.style.lineHeight = '26px';
            //
            //       text.style.display = 'block';
            //     }
            //
            //     if (i === 3) {
            //       slides[i].style.opacity = '1';
            //
            //       point.style.width = '24px';
            //       point.style.height = '24px';
            //       point.style.left = '89px';
            //
            //       year.style.fontSize = '16px';
            //       year.style.lineHeight = '21px';
            //
            //       text.style.display = 'none';
            //     }
            //
            //     if (i === 4) {
            //       slides[i].style.opacity = '1';
            //
            //       point.style.width = '16px';
            //       point.style.height = '16px';
            //       point.style.left = '93px';
            //
            //       year.style.fontSize = '12px';
            //       year.style.lineHeight = '16px';
            //
            //       text.style.display = 'none';
            //     }
            //   }
            // }
          },
        });

        // aboutHistorySlider.on('activeIndexChange', function () {
        //   for (let i = 0; i < slides.length; i++) {
        //     const activeIndex = aboutHistorySlider.activeIndex;
        //
        //     const point = slides[i].querySelector('.about-company-history__point');
        //     const year = slides[i].querySelector('.about-company-history__year');
        //     const text = slides[i].querySelector('.about-company-history__text');
        //
        //     slides[i].style.opacity = '0';
        //
        //     point.style.width = '30px';
        //     point.style.height = '30px';
        //     point.style.left = '86px';
        //
        //     year.style.fontSize = '20px';
        //     year.style.lineHeight = '26px';
        //
        //     text.style.display = 'block';
        //
        //     if (i === activeIndex || i === activeIndex + 1 || i === activeIndex + 2) {
        //       slides[i].style.opacity = '1';
        //     }
        //
        //     if (i === activeIndex + 3) {
        //       slides[i].style.opacity = '1';
        //
        //       point.style.width = '24px';
        //       point.style.height = '24px';
        //       point.style.left = '89px';
        //
        //       year.style.fontSize = '16px';
        //       year.style.lineHeight = '21px';
        //
        //       text.style.display = 'none';
        //     }
        //
        //     if (i === activeIndex + 4) {
        //       slides[i].style.opacity = '1';
        //
        //       point.style.width = '16px';
        //       point.style.height = '16px';
        //       point.style.left = '93px';
        //
        //       year.style.fontSize = '12px';
        //       year.style.lineHeight = '16px';
        //
        //       text.style.display = 'none';
        //     }
        //
        //     if (i === slides.length - 1 && activeIndex === slides.length - 4) {
        //       slides[i].style.opacity = '1';
        //
        //       point.style.width = '30px';
        //       point.style.height = '30px';
        //       point.style.left = '86px';
        //
        //       year.style.fontSize = '20px';
        //       year.style.lineHeight = '26px';
        //
        //       text.style.display = 'block';
        //     }
        //   }
        // });
      }
    };

    const getMobilAndLargeSlider = function() {
      if (landingOffer) {
        landingOfferSlider = new Swiper(landingOffer, {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 1,
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          navigation: {
            nextEl: '.landing-offers__nav--next',
            prevEl: '.landing-offers__nav--prev',
            disabledClass: 'landing-offers__nav--disabled',
          },
          pagination: {
            el: '.landing-offers__nav-bullets',
            type: 'bullets',
            bulletClass: 'landing-offers__nav-bullet',
            bulletActiveClass: 'landing-offers__nav-bullet--active',
            clickable: true,
          },
          breakpoints: {
            1920: {
              slidesPerView: 2,
            },
          },
        });
      }

      if (landingIndustrial) {
        landingIndustrialSlider = new Swiper(landingIndustrial, {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 1,
          spaceBetween: 40,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          navigation: {
            nextEl: '.landing-industries__nav--next',
            prevEl: '.landing-industries__nav--prev',
            disabledClass: 'landing-industries__nav--disabled',
          },
          pagination: {
            el: '.landing-industries__nav-bullets',
            type: 'bullets',
            bulletClass: 'landing-industries__nav-bullet',
            bulletActiveClass: 'landing-industries__nav-bullet--active',
            clickable: true,
          },
          breakpoints: {
            1920: {
              spaceBetween: 20,
              slidesPerView: 'auto',
            },
          },
        });
      }
    };

    const getTabletSlider = function() {
      if (crmTrainingHead) {
        crmTrainingHeadSlider = new Swiper(crmTrainingHead, {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 'auto',
          spaceBetween: 20,
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 0,
        });
      }
      if (otherMaterials) {
        otherMaterialsSlider = new Swiper(otherMaterials, {
          direction: 'horizontal',
          autoHeight: true,
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 1,
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        });
      }
    };

    const getDesktopSliders = function() {
      if (crmMaterial) {
        crmMaterialSlider = new Swiper(crmMaterial, {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 1,
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          breakpoints: {
            768: {
              spaceBetween: 40,
            },
          },
          navigation: {
            nextEl: '.crm-material__nav--next',
            prevEl: '.crm-material__nav--prev',
            disabledClass: 'crm-material__nav--disabled',
          },
        });
      }

      if (settingsAwards) {
        settingsAwardsSlider = new Swiper(settingsAwards, {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 'auto',
          spaceBetween: 20,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          pagination: {
            el: '.settings-awards__bullets',
            type: 'bullets',
            bulletClass: 'settings-awards__bullet',
            bulletActiveClass: 'settings-awards__bullet--active',
            clickable: true,
          },
          breakpoints: {
            768: {
              slidesPerView: 1,
              // spaceBetween: 0,
            },
          },
        });
      }
    };

    const getBetweenMobileAndDesktopSliders = function() {
      if (navMenu) {
        navSlider = new Swiper(navMenu, {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 'auto',
          spaceBetween: 30,
          slidesOffsetBefore: 40,
          slidesOffsetAfter: 40,
        });
      }
    };

    breakpointTablet.addListener(breakpointChecker);
    breakpointDesktop.addListener(breakpointChecker);
    breakpointLarge.addListener(breakpointChecker);
    breakpointChecker();
  };

  const getInputMask = () => {
    const phoneElement = document.querySelectorAll('._phone-mask');
    const phoneMaskOption = {
      mask: '+{7} (000) 000-00-00',
    };
    phoneElement.forEach(item => {
      IMask(item, phoneMaskOption);
    });
  };

  const getInputLabelFields = () => {
    const inputs = document.querySelectorAll('._js-input-label');
    inputs.forEach(item => {
      const label = item.parentElement.querySelector('label');
      item.addEventListener('focus', () => {
        label.classList.add('_active');
      });
      item.addEventListener('blur', () => {
        if (!item.value) {
          label.classList.remove('_active');
        }
      });
    });
  };

  const getAsideAction = () => {
    const accordionButton = document.querySelectorAll('.training-aside__button');
    accordionButton.forEach((item) => {
      const subList = item.parentElement.querySelector('.training-aside__sub-list');
      item.addEventListener('click', () => {
        item.classList.toggle('_open');
        subList.classList.toggle('_open');
        if (subList.style.maxHeight) {
          subList.style.maxHeight = null;
        } else {
          subList.style.maxHeight = subList.scrollHeight + 'px';
        }
      });
    });
  };

  const getMorePartners = () => {
    const partnersList = document.querySelector('.main-partners__list');
    const morePartnersButton = document.querySelector('.main-partners__link');
    if (!morePartnersButton) return;
    morePartnersButton.addEventListener('click', () => {
      if (partnersList.classList.contains('_active')) {
        partnersList.style.maxHeight = '';
        partnersList.classList.remove('_active');
      } else {
        partnersList.classList.add('_active');
        partnersList.style.maxHeight = partnersList.scrollHeight + 'px';
      }
    });
  };

  const getMap = () => {
    const mapBlock = document.querySelector('#map');
    let map;
    let myPlacemark;

    if (!mapBlock) {
      return;
    }

    const init = () => {
      const imgUrl = mapBlock.getAttribute('data-placemark');

      map = new window.ymaps.Map('map', {
          center: [59.733080, 30.085400],
          zoom: 17,
          controls: [],
        },
        {
          autoFitToViewport: true,
          suppressMapOpenBlock: true,
        });

      myPlacemark = new window.ymaps.Placemark(map.getCenter(), {},
        {
          iconLayout: 'default#image',
          iconImageHref: imgUrl,
          iconImageSize: [40, 40],
          iconImageOffset: [-20, -50],
        });

      map.behaviors.disable('scrollZoom');
      map.geoObjects.add(myPlacemark);
    };

    if (ymaps) {
      ymaps.ready(init);
    }
  };

  let tabs;
  let accordions;

  const initTabs = () => {
    tabs = new Tabs();
    window.tabs = tabs;
  };

  const initAccordions = () => {
    const comparisonAccordion = document.querySelector('.boxed-comparison__accordion');

    accordions = new Accordions();
    window.accordions = accordions;
  };

  const initAboutHistoryMore = () => {
    const moreButton = document.querySelector('.about-company-history__more');
    const moreList = document.querySelector('.about-company-history__list');
    const moreItem = [...document.querySelectorAll('.about-company-history__item')];
    const breakpoint = window.matchMedia('(min-width: 768px)');
    let initialHeight = 0;
    let windowWidth = window.innerWidth;

    const copyItems = moreItem.concat();
    copyItems.splice(0, 3);

    const calcInitialHeight = () => {
      let height = 0;

      moreItem.forEach((item, index) => {
        if (3 > index) {
          height += item.clientHeight;
        }
      });

      return height;
    };

    const moreButtonClickHandler = (evt) => {
      evt.preventDefault();
      if (moreButton.classList.contains('is-open')) {
        moreButton.classList.remove('is-open');
        moreButton.textContent = 'Загрузить еще';
        moreList.style.maxHeight = `${initialHeight}px`;
      } else {
        moreButton.classList.add('is-open');
        moreButton.textContent = 'Скрыть';
        moreList.style.maxHeight = `${moreList.scrollHeight}px`;
      }
    }

    const getHeightList = () => {
      if (!breakpoint.matches) {
        initialHeight = calcInitialHeight();
        moreList.style.maxHeight = `${initialHeight}px`;
        moreButton.style.display = 'flex';

        moreButton.addEventListener('click', moreButtonClickHandler);
      } else {
        moreButton.removeEventListener('click', moreButtonClickHandler);

        moreList.style.maxHeight = 'unset';
        moreButton.style.display = 'none';
      }
    };

    const showMore = () => {
      if (!moreList) {
        return;
      }

      getHeightList();
      window.addEventListener('resize', () => {
        if (windowWidth === window.innerWidth) {
          return;
        }
        windowWidth = window.innerWidth;
        getHeightList();
      });
    };

    showMore();
  };

  dynamicAdaptiv();
  getPopup();
  getPageVh();
  getResize();
  getSandwich();
  getNavSubMenu();
  getSubItemsFooter();
  initTabs();
  getAllBreakpointsSlider();
  getSlider();
  getInputMask();
  getInputLabelFields();
  getAsideAction();
  // initTabs();
  initAccordions();
  getMorePartners();
  getMap();
  initAboutHistoryMore();
})();
