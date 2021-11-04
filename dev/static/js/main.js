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

    DynamicAdapt.prototype.init = function () {
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
        function (item) {
          return (
            '(' +
            this.type +
            '-width: ' +
            item.breakpoint +
            'px),' +
            item.breakpoint
          );
        },
        this
      );
      this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (item, index, self) {
          return Array.prototype.indexOf.call(self, item) === index;
        }
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
          function (item) {
            return item.breakpoint === mediaBreakpoint;
          }
        );
        matchMedia.addListener(function () {
          _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
      }
    };

    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
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
    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
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
    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
      } else {
        parent.insertAdjacentElement('beforeend', element);
      }
    };

    // Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function (parent, element) {
      const array = Array.prototype.slice.call(parent.children);
      return Array.prototype.indexOf.call(array, element);
    };

    // Функция сортировки массива по breakpoint и place
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function (arr) {
      if (this.type === 'min') {
        Array.prototype.sort.call(arr, function (a, b) {
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
        Array.prototype.sort.call(arr, function (a, b) {
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
  }

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
      setTimeout(function () {
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
      setTimeout(function () {
        unlock = true;
      }, delay);
    }
  }

  const getPageVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  const getResize = () => {
    const breakpointTablet = window.matchMedia('(min-width: 1280px)');
    const breakpointMobile = window.matchMedia('(min-width: 768px)');
    const headerInner = document.querySelector('.header__inner');
    const sandwich = document.querySelector('.sandwich');
    const headerTop =  document.querySelector('.header__top');
    if (breakpointTablet.matches === false) {
    }
    if (breakpointMobile.matches === false) {
    }
    window.addEventListener('resize', resizeThrottler, false);
    let resizeTimeout;
    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          actualResizeHandler();
        }, 88);
      }
    }
    function actualResizeHandler() {
      getPageVh();
      if (headerInner.classList.contains('_active')) {
        headerInner.classList.remove('_active');
        sandwich.classList.remove('_active');
        body.classList.remove('_overlay');
        body.classList.remove('_lock');
        headerTop.classList.remove('_active');
      }
      if (breakpointTablet.matches === false) {
      }
    }
  }

  const getSandwich = () => {
    const sandwich = document.querySelector('.sandwich');
    const headerInner = document.querySelector('.header__inner');
    const headerTop =  document.querySelector('.header__top');

    if (sandwich != null) {
      const delay = 500;
      sandwich.addEventListener('click', function (e) {
        if (unlock) {
          bodyLock(delay);
          sandwich.classList.toggle('_active');
          headerTop.classList.toggle('_active');
          headerInner.classList.toggle('_active');
          body.classList.toggle('_overlay');
        }
      });
      document.addEventListener('click', function (e) {
        if (!headerInner.classList.contains('_active')) return;
        if (!e.target.closest('._active')) {
          bodyLock(delay);
          headerInner.classList.remove('_active');
          sandwich.classList.remove('_active');
          headerTop.classList.remove('_active');
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
        return;
      }
      if (currentTarget) {
        if (!e.target.closest('.nav__sub-list._active') || e.target.closest('[data-nav-link="sub-close"]')) {
          currentTarget.previousElementSibling.classList.remove('_active');
          currentTarget.classList.remove('_active');
        }
      }
      if (menuItem && menuItem.matches('.nav__sub-list')) {
        menuItem.previousElementSibling.classList.add('_active');
        menuItem.classList.add('_active');
        currentTarget = menuItem;
      }
    };
    document.body.addEventListener('click', menuClickHandler);
  };

  const getSlider = () => {
    const breakpointMobile = window.matchMedia('(max-width: 767px');
    const breakpointTablet = window.matchMedia('(min-width: 768px)');
    const breakpointDesktop = window.matchMedia('(min-width: 1280px)');
    const crmTrainingHead = document.querySelector('.crm-heading__slider');
    const crmMaterial = document.querySelector('.crm-material__swiper');
    const navMenu = document.querySelector('.nav__inner');
    let crmTrainingHeadSlider;
    let crmMaterialSlider;
    let navSlider;

    const breakpointChecker = function () {
      let resizeTimeout;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          resizeHandlerTablet();
          resizeHandlerDesktop();
          resizeBetween();
        }, 100);
      }

      function resizeHandlerTablet() {
        if (breakpointTablet.matches === true) {
          if (crmTrainingHeadSlider !== undefined) {
            crmTrainingHeadSlider.destroy(true, true);
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
    };

    const getTabletSlider = function () {
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
    };

    const getDesktopSliders = function () {
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
              spaceBetween: 40
            }
          },
          navigation: {
            nextEl: '.crm-material__nav--next',
            prevEl: '.crm-material__nav--prev',
            disabledClass: 'crm-material__nav--disabled'
          }
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
    breakpointChecker();
  };

  const getInputMask = () => {
    const phoneElement = document.querySelectorAll('._phone-mask');
    const phoneMaskOption = {
      mask: '+{7}(000)000-00-00'
    }
    phoneElement.forEach(item => {
      IMask(item, phoneMaskOption);
    })
  };

  dynamicAdaptiv();
  getPageVh();
  getResize();
  getSandwich();
  getNavSubMenu();
  getSlider();
  getInputMask();
})();
