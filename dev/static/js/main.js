(function() {
  'use strict';
  const getSlider = () => {
    const breakpointTablet = window.matchMedia('(min-width: 768px)');
    const crmTrainingHead = document.querySelector('.crm-heading__slider');
    let crmTrainingHeadSlider;

    const breakpointChecker = function () {
      let resizeTimeout;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          resizeHandlerDesktop();
        }, 100);
      }

      function resizeHandlerDesktop() {
        if (breakpointTablet.matches === true) {
          if (crmTrainingHeadSlider !== undefined) {
            crmTrainingHeadSlider.destroy(true, true);
          }
        } else if (breakpointTablet.matches === false) {
          enableSubMenu();
        }
      }
    };

    const enableSubMenu = function () {
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

    breakpointTablet.addListener(breakpointChecker);
    breakpointChecker();
  };

  getSlider();
})();
