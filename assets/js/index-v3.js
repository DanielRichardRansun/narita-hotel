// ==========================================
// RANSITE CLIENT & IP ACCESS MANAGEMENT
// ==========================================
(function() {
   'use strict';

   // 1. DOMAIN LOCK / KILL SWITCH
   function verifyEnvironment() {
      var host = window.location.hostname;
      var proto = window.location.protocol;

      // Block local filesystem cloning (file://)
      if (proto === 'file:') {
         renderLockScreen('Local file execution is unauthorized.');
         return false;
      }

      // Whitelist domains: Vercel production & preview, localhost, Ransite
      var isAuthorized = 
         host === 'narita-hotel.vercel.app' ||
         host.indexOf('vercel.app') !== -1 ||
         host === 'localhost' ||
         host === '127.0.0.1' ||
         host === '0.0.0.0' ||
         host === 'ransite.com' ||
         host.indexOf('ransite.com') !== -1;

      if (!isAuthorized) {
         renderLockScreen('Host domain unauthorized: ' + host);
         return false;
      }
      return true;
   }

   function renderLockScreen(detail) {
      function showScreen() {
         document.documentElement.innerHTML = `
            <head>
               <title>Access Restricted - Ransite</title>
               <meta name="viewport" content="width=device-width, initial-scale=1">
               <style>
                  * { box-sizing: border-box; margin: 0; padding: 0; }
                  body { background: #0c0d0e; color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; text-align: center; }
                  .lock-card { max-width: 520px; background: #141518; border: 1px solid rgba(255,255,255,0.08); padding: 48px 32px; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,0.6); }
                  .icon { width: 52px; height: 52px; border-radius: 50%; background: rgba(212,175,55,0.15); color: #d4af37; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 24px; font-weight: bold; border: 1px solid rgba(212,175,55,0.3); }
                  h1 { font-size: 22px; font-weight: 600; margin-bottom: 14px; color: #ffffff; letter-spacing: -0.3px; }
                  p { font-size: 14px; line-height: 1.7; color: #9ca3af; margin-bottom: 28px; }
                  .btn { display: inline-block; background: #d4af37; color: #0c0d0e; text-decoration: none; font-weight: 600; font-size: 14px; padding: 13px 28px; border-radius: 10px; transition: opacity 0.2s; }
                  .btn:hover { opacity: 0.9; }
               </style>
            </head>
            <body>
               <div class="lock-card">
                  <div class="icon">&#9888;</div>
                  <h1>Concept Prototype – Protected Access</h1>
                  <p>Website ini adalah konsep prototipe berhak cipta yang dirancang dan dikembangkan secara eksklusif oleh <strong>Ransite</strong> untuk penawaran resmi Narita Hotel. Akses atau pemindahan hosting tanpa lisensi resmi tidak diizinkan.</p>
                  <a href="https://ransite.com" target="_blank" class="btn">Hubungi Ransite.com</a>
               </div>
            </body>
         `;
      }
      if (document.readyState === 'loading') {
         document.addEventListener('DOMContentLoaded', showScreen);
      } else {
         showScreen();
      }
      throw new Error('Website locked by Ransite IP Protection.');
   }

   if (!verifyEnvironment()) return;

   // 2. FLOATING WATERMARK / BRAND BADGE
   function injectBrandBadge() {
      var badge = document.createElement('div');
      badge.id = 'ransite-concept-badge';
      badge.innerHTML = `
         <a href="https://ransite.com" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:flex;align-items:center;gap:8px;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;letter-spacing:0.3px;">
            <span style="display:inline-block;width:7px;height:7px;background:#22c55e;border-radius:50%;box-shadow:0 0 8px #22c55e;"></span>
            <span style="color:rgba(255,255,255,0.7);">Concept by</span>
            <strong style="color:#d4af37;font-weight:600;">Ransite.com</strong>
         </a>
      `;
      var isMobile = window.innerWidth < 768;
      badge.setAttribute('style', [
         'position:fixed',
         isMobile ? 'bottom:16px' : 'bottom:24px',
         isMobile ? 'left:16px' : 'left:24px',
         'z-index:999999',
         'background:rgba(18,18,20,0.85)',
         'backdrop-filter:blur(10px)',
         '-webkit-backdrop-filter:blur(10px)',
         'border:1px solid rgba(255,255,255,0.12)',
         isMobile ? 'padding:6px 12px' : 'padding:8px 16px',
         'border-radius:50px',
         'box-shadow:0 8px 32px rgba(0,0,0,0.35)',
         'transition:transform 0.2s ease, box-shadow 0.2s ease',
         'pointer-events:auto',
         'user-select:none'
      ].join(';'));

      badge.addEventListener('mouseenter', function() {
         badge.style.transform = 'translateY(-2px)';
         badge.style.boxShadow = '0 12px 36px rgba(0,0,0,0.5)';
      });
      badge.addEventListener('mouseleave', function() {
         badge.style.transform = 'translateY(0)';
         badge.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)';
      });

      function attachBadge() {
         if (document.body && !document.getElementById('ransite-concept-badge')) {
            document.body.appendChild(badge);
         }
      }
      if (document.readyState === 'loading') {
         document.addEventListener('DOMContentLoaded', attachBadge);
      } else {
         attachBadge();
      }
   }
   injectBrandBadge();

   // 3. ANTI-RIGHT CLICK & ANTI-INSPECT SHORTCUTS
   document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
   }, false);

   document.addEventListener('keydown', function(e) {
      // F12
      if (e.key === 'F12' || e.keyCode === 123) {
         e.preventDefault();
         return false;
      }
      // Ctrl+Shift+I / J / C (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
         e.preventDefault();
         return false;
      }
      // Cmd+Option+I / J / C / U (Mac)
      if (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J' || e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U')) {
         e.preventDefault();
         return false;
      }
      // Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
         e.preventDefault();
         return false;
      }
      // Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
         e.preventDefault();
         return false;
      }
   }, false);

   // Prevent dragging images
   document.addEventListener('dragstart', function(e) {
      if (e.target && e.target.nodeName === 'IMG') {
         e.preventDefault();
         return false;
      }
   }, false);
})();

gsap.registerPlugin(ScrollTrigger, CustomEase);

let scroll;
let transitionOffset = 450;

let mewsDistributor;
let mewsInitializing = false;

let creditsImageCycle;
let creditsResetTimeout;

let lenisScrollStateInitialized = false;
let lenisThemeInitialized = false;

let cursorX = 0;
let cursorY = 0;
let cursorCurrentX = 0;
let cursorCurrentY = 0;
let cursorInitialized = false;

let isInitialPageLoad = true;

let swiperInstances = [];
let swiperTimelines = [];

CustomEase.create("animation-nav", ".3, 0, .3, 1");

initPageTransitions();

// Ensure fonts are ready before playing entrance animations to prevent FOUT / wrong font flash
function waitForFonts(callback) {
   if (document.fonts && document.fonts.ready) {
      const timeout = new Promise(function(resolve) { setTimeout(resolve, 300); });
      Promise.race([document.fonts.ready, timeout]).then(function() {
         callback();
      }).catch(function() {
         callback();
      });
   } else {
      callback();
   }
}

// Animation - Page Loader (Home & All Pages)
function initLoader() {

   const windowWidth = window.innerWidth;

   let offset = 10;
   if (windowWidth < 1024) offset = 15;
   if (windowWidth < 720) offset = 20;
   if (windowWidth < 540) offset = 25;

   let offsetTop = "45%";
   if (windowWidth < 1024) offsetTop = "60%";

   const offsetPositive = `${50 - offset}%`;
   const offsetNegative = `${50 + offset}%`;

   const tl = gsap.timeline();

   // Target the header element on the current page (every page has .default-header or .section-home-header)
   const headerSelector = document.querySelector(".section-home-header") 
      ? ".section-home-header" 
      : ".default-header";

   const hasHeaderMedia = !!document.querySelector(`${headerSelector} .background-media, ${headerSelector} figure, ${headerSelector} img`);

   tl.set("html", {
      cursor: "wait"
   }, 0);

   tl.set("main", {
      height: "100svh",
      overflow: "clip"
   });

   tl.set(".default-header .col-row", {
      rotate: 0.001,
      opacity: 0,
      y: "1em",
      filter: "blur(0.25em)",
      scale: 0.975
   }, 0);

   tl.set("html", {
      cursor: "auto"
   }, 0);

   tl.set("body header", {
      autoAlpha: 0
   }, 0);

   tl.set(".section", {
      autoAlpha: 0
   }, 0);

   tl.set(`.section${headerSelector}`, {
      autoAlpha: 1
   }, 0.8);

   tl.set(".section", {
      autoAlpha: 1
   }, 0.8);

   if (hasHeaderMedia) {
      tl.set(`${headerSelector} .background-media`, {
         scale: 1,
         rotate: 0.001
      }, 0);
   }

   tl.set(".loading-container .loading-screen", {
      backgroundColor: "transparent"
   }, 0);

   tl.set(headerSelector, {
      clipPath: `polygon(${offsetPositive} ${offsetTop}, ${offsetNegative} ${offsetTop}, ${offsetNegative} 100%, ${offsetPositive} 100%)`
   }, 0);

   tl.set(".loading-logo svg", {
      yPercent: 0,
      rotate: 0.001
   }, 0);

   tl.from(headerSelector, {
      yPercent: 50,
      rotate: 0.001,
      duration: 2,
      ease: "expo.inOut"
   }, 0);

   tl.to(".loading-logo", {
      top: "35%",
      rotate: 0.001,
      duration: 2,
      ease: "expo.inOut"
   }, 0);

   tl.to(headerSelector, {
      duration: 2,
      ease: "expo.inOut",
      clipPath: "polygon(-1% -1%, 101% -1%, 101% 101%, -1% 101%)",
      clearProps: "all"
   }, 1.8);

   tl.to(".loading-logo svg", {
      yPercent: -100,
      rotate: 0.001,
      duration: 0.9,
      ease: "expo.in"
   }, 1.8);

   tl.to(".loading-logo", {
      top: "5%",
      rotate: 0.001,
      duration: 2,
      ease: "expo.inOut"
   }, 1.8);

   tl.set(".loading-screen", {
      autoAlpha: 0
   }, 3.8);

   if (hasHeaderMedia) {
      tl.to(`${headerSelector} .background-media`, {
         duration: 2,
         ease: "expo.inOut",
         scale: 1,
         rotate: 0.001,
         clearProps: "all"
      }, 1.8);
   }

   tl.to(".loading-logo", {
      opacity: 0,
      duration: 0.4,
      ease: "expo.inOut"
   }, 2.6);

   tl.from(`${headerSelector} .container`, {
      duration: 2,
      ease: "expo.out",
      yPercent: 10,
      clearProps: "all"
   }, 2.6);

   tl.to("body header", {
      duration: 1.4,
      ease: "expo.out",
      autoAlpha: 1,
      clearProps: "all"
   }, 2.8);

   tl.call(function() {
      scroll.stop();
      initMews();
   }, null, 0);

   tl.call(function() {
      pageTransitionOut();
   }, null, 2.4);
}

function initLoaderHome() {
   initLoader();
}

// Animation - Page Leave
function pageTransitionIn() {
   const tl = gsap.timeline();

   const transitionElement = document.querySelector('[data-page-transition]');
   const linksNoHoverElement = document.querySelector('[data-links-no-hover]');
   const loadingCircle = document.querySelector('.loading-circle svg circle');

   tl.to(".transition-screen", {
      duration: 0.4,
      autoAlpha: 1,
      ease: "animation-nav"
   }, 0);
   
   tl.to(".transition-screen", {
      duration: 0.8,
      autoAlpha: 0,
      ease: "animation-nav"
   }, 0.5);

   // Circle load

   if (loadingCircle) {
      const circleLength = loadingCircle.getTotalLength();

      tl.set(".loading-circle svg circle", { 
         strokeDashoffset: circleLength * 3,
         strokeDasharray: circleLength + 2,
         opacity: 1
      }, 0);

      tl.set(".loading-circle svg", { 
         rotate: 0,
         opacity: 1
      }, 0);

      tl.to(".loading-circle svg circle", { 
         autoAlpha: 1,
         duration: 0.7,
         ease: "power1.in"
      }, 0);

      tl.to(".loading-circle svg", { 
         rotate: 360,
         duration: 1.3,
         ease: "none"
      }, 0);

      tl.to(".loading-circle svg circle", { 
         autoAlpha: 1,
         duration: 0.65,
         ease: "power1.in",
         strokeDashoffset: circleLength * 2
      }, 0);

      tl.to(".loading-circle svg circle", { 
         autoAlpha: 1,
         duration: 0.65,
         ease: "power1.out",
         strokeDashoffset: circleLength
      }, 0.7);

      tl.to(".loading-circle svg", { 
         duration: 0.01,
         opacity: 0,
         ease: "none"
      }, 1.25);
   }

   // Call

   tl.call(function() {
      scroll.stop();

      transitionElement?.setAttribute('data-page-transition', 'active');
      linksNoHoverElement?.setAttribute('data-links-no-hover', 'active');
   }, null, 0);

   tl.call(function() {
      transitionElement?.setAttribute('data-page-transition', 'not-active');
   }, null, 0.5);

   tl.call(function() {
      linksNoHoverElement?.setAttribute('data-links-no-hover', 'not-active');
   }, null, 0.55);
}

// Animation - Page Enter
function pageTransitionOut() {
	var tl = gsap.timeline();
  
   tl.call(function() {
      gsap.set("main", { clearProps: "height, overflow" });
      scroll.start();
      scroll.resize();
      ScrollTrigger.refresh();
   }, null, 0);

   tl.set(".default-header .col-row, .default-header + .section", { 
      rotate: 0.001,
      opacity: 0,
      y: "1em",
      filter: "blur(0.25em)",
      scale: 0.975
   }, 0);

   tl.to(".default-header .col-row, .default-header + .section", {
      duration: 1.4,
      rotate: 0.001,
      opacity: 1,
      y: "0em",
      ease: "Expo.easeOut",
      stagger: 0.1,
      scale: 1
   }, 0.2);

   tl.to(".default-header .col-row, .default-header + .section", {
      duration: 2,
      ease: "Expo.easeOut",
      clearProps: "all",
      stagger: 0.1,
      filter: "blur(0em)",
      scale: 1
   }, 0.2);
}

function initPageTransitions() {

   // Reset scroll on page next
   history.scrollRestoration = "manual";

   barba.hooks.afterEnter(() => {
      window.scrollTo(0, 0);

      if (scroll) {
         scroll.scrollTo(0, {
            immediate: true,
            force: true
         });

         scroll.resize();
      }

      if (!isInitialPageLoad) {
         initScript();
      }

      isInitialPageLoad = false;

      requestAnimationFrame(function() {
         ScrollTrigger.refresh();
      });
   });

   // Functions Before
   function initResetDataBefore() {
      document.querySelectorAll('[data-navigation-status]').forEach(function(element) {
         element.setAttribute('data-navigation-status', 'not-active');
      });

      document.querySelectorAll('[data-credits-status]').forEach(function(element) {
         element.setAttribute('data-credits-status', 'not-active');
      });

      document.querySelectorAll('[data-whatsapp-status]').forEach(function(element) {
         element.setAttribute('data-whatsapp-status', 'not-active');
      });

      document.querySelectorAll('[data-benefits-status]').forEach(function(element) {
         element.setAttribute('data-benefits-status', 'not-active');
      });

      document.querySelectorAll('[data-nav-image-status]').forEach(function(element) {
         element.setAttribute('data-nav-image-status', 'not-active');
      });

      document.querySelectorAll('[data-cursor-bubble]').forEach(function(element) {
         element.setAttribute('data-cursor-bubble', 'not-active');
      });

      clearInterval(creditsImageCycle);
      clearTimeout(creditsResetTimeout);
   }

   // Functions After
   function initResetDataAfter() {
      document.querySelectorAll('[data-navigation-status]').forEach(function(element) {
         element.setAttribute('data-navigation-status', 'not-active');
      });

      document.querySelectorAll('[data-credits-status]').forEach(function(element) {
         element.setAttribute('data-credits-status', 'not-active');
      });

      document.querySelectorAll('[data-whatsapp-status]').forEach(function(element) {
         element.setAttribute('data-whatsapp-status', 'not-active');
      });

      document.querySelectorAll('[data-benefits-status]').forEach(function(element) {
         element.setAttribute('data-benefits-status', 'not-active');
      });

      document.querySelectorAll('[data-scrolling-direction]').forEach(function(element) {
         element.setAttribute('data-scrolling-direction', 'down');
      });

      document.querySelectorAll('[data-scrolling-started]').forEach(function(element) {
         element.setAttribute('data-scrolling-started', 'false');
      });

      document.querySelectorAll('[data-nav-image-status]').forEach(function(element) {
         element.setAttribute('data-nav-image-status', 'not-active');
      });

      document.querySelectorAll('[data-cursor-init]').forEach(function(element) {
         element.setAttribute('data-cursor-init', 'false');
      });

      cursorInitialized = false;
   }

   async function handlePageLeave(data) {
      pageTransitionIn();
      initResetDataBefore();

      await delay(transitionOffset);

      initBarbaNavUpdate(data);
      initResetDataAfter();
      destroySwiperSliders();

      data.current.container.remove();
   }

   function handlePageEnter() {
      pageTransitionOut();
   }

   function handlePageBeforeEnter() {
      ScrollTrigger.getAll().forEach(function(trigger) {
         trigger.kill();
      });

      initSmoothScroll();
   }

   barba.init({
      sync: true,
      debug: false,
      timeout: 7000,
      transitions: [
         {
            name: 'load-home',
            to: {
               namespace: ['home']
            },
            once(data) {
               initSmoothScroll();
               initScript();
               waitForFonts(initLoaderHome);
            },
            leave: handlePageLeave,
            enter: handlePageEnter,
            beforeEnter: handlePageBeforeEnter
         },
         {
            name: 'self',
            leave: handlePageLeave,
            enter: handlePageEnter,
            beforeEnter: handlePageBeforeEnter
         },
         {
            name: 'default',
            once(data) {
               initSmoothScroll();
               initScript();
               waitForFonts(initLoader);
            },
            leave: handlePageLeave,
            enter: handlePageEnter,
            beforeEnter: handlePageBeforeEnter
         }
      ]
   });

  function initSmoothScroll() {

      // Lenis: https://github.com/studio-freight/lenis
      initLenis();
      scroll.resize();
      ScrollTrigger.refresh();
   }
} 

function updateLenis(time) {
   if (scroll) {
      scroll.raf(time * 1000);
   }
}

function initLenis() {
   if (scroll) return;

   scroll = new Lenis();
   scroll.on('scroll', ScrollTrigger.update);
}

gsap.ticker.add(updateLenis);
gsap.ticker.lagSmoothing(0);

// Don't touch
function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}

/**
 * Fire all scripts on page load
 */
function initScript() {
   initCheckWindowHeight();
   initBasicFunctions();
   initLazyLoad();
   initScrollTriggerPlayVideoInview();
   initLenisCheckScrollUpDown();
   initScrollToAnchorLenis();
   initCheckTheme();
   initScrollTriggerParallaxScroll();
   initScrolltriggerAnimations();
   initSwiperSlider();
   initCustomCursor();
   initActiveNavLinks();
}

/**
 * Barba Update Links outside Main on page Transition
 */
function initBarbaNavUpdate(data) {

   const nextDocument = new DOMParser().parseFromString(data.next.html, 'text/html');
   const updateItems = nextDocument.querySelectorAll('[data-barba-update]');
   const currentItems = document.querySelectorAll('[data-barba-update]');

   currentItems.forEach(function(currentItem, index) {
      const nextItem = updateItems[index];
      if (!nextItem) return;
      const newLinkStatus = nextItem.getAttribute('data-link-status');
      if (newLinkStatus !== null) {
         currentItem.setAttribute('data-link-status', newLinkStatus);
      }
   });

   const nextPath = (data && data.next && data.next.url) ? data.next.url.path : window.location.pathname;
   initActiveNavLinks(nextPath);
}

/**
 * Update Active Navigation Links based on URL / page identity
 */
function initActiveNavLinks(customPath) {
   let path = (customPath || window.location.pathname || '').toLowerCase();
   path = path.split('?')[0].split('#')[0];

   let activeCategory = '';
   if (path.includes('villa') || path.includes('/stay') || path.endsWith('stay.html')) {
      activeCategory = 'stay';
   } else if (path.includes('dining')) {
      activeCategory = 'dining';
   } else if (path.includes('relax') || path.includes('spa')) {
      activeCategory = 'relax';
   } else if (path.includes('discover')) {
      activeCategory = 'discover';
   } else if (path.includes('offer') || path.includes('package')) {
      activeCategory = 'packages';
   }

   // 1. Desktop Nav (.main-nav-bar)
   document.querySelectorAll('.main-nav-bar .nav-link-relative').forEach(function(el) {
      const link = el.querySelector('a');
      if (!link) return;
      const href = (link.getAttribute('href') || '').toLowerCase();
      let match = false;
      if (activeCategory === 'stay' && (href.includes('villa') || href.includes('stay'))) match = true;
      else if (activeCategory === 'dining' && href.includes('dining')) match = true;
      else if (activeCategory === 'relax' && (href.includes('spa') || href.includes('relax'))) match = true;
      else if (activeCategory === 'discover' && href.includes('discover')) match = true;
      else if (activeCategory === 'packages' && (href.includes('offer') || href.includes('package'))) match = true;

      el.setAttribute('data-link-status', match ? 'active' : 'not-active');
   });

   // 2. Mobile Drawer Nav (.side-nav .row-links-primary)
   document.querySelectorAll('.side-nav .row-links-primary .nav-link').forEach(function(el) {
      const imgId = el.getAttribute('data-nav-image-id');
      const match = (imgId && imgId === activeCategory);
      el.setAttribute('data-link-status', match ? 'active' : 'not-active');
   });

   // 3. Footer Navigation (.section-footer .col-links-primary)
   document.querySelectorAll('.section-footer .col-links-primary .nav-link').forEach(function(el) {
      const link = el.querySelector('a');
      if (!link) return;
      const href = (link.getAttribute('href') || '').toLowerCase();
      let match = false;
      if (activeCategory === 'stay' && (href.includes('villa') || href.includes('stay'))) match = true;
      else if (activeCategory === 'dining' && href.includes('dining')) match = true;
      else if (activeCategory === 'relax' && (href.includes('spa') || href.includes('relax'))) match = true;
      else if (activeCategory === 'discover' && href.includes('discover')) match = true;
      else if (activeCategory === 'packages' && (href.includes('offer') || href.includes('package'))) match = true;

      el.setAttribute('data-link-status', match ? 'active' : 'not-active');
   });

   // 4. Secondary links (room/package specific sublinks)
   const filename = path.split('/').pop().replace('.html', '');
   if (filename && filename !== 'index') {
      document.querySelectorAll('.side-nav .row-links-secondary .link, .section-footer .col-links-secondary .link, .nav-link-dropdown .link').forEach(function(el) {
         const link = el.querySelector('a');
         if (!link) return;
         const href = (link.getAttribute('href') || '').toLowerCase();
         const targetFile = href.split('/').pop().replace('.html', '');
         if (targetFile === filename) {
            el.setAttribute('data-link-status', 'active');
         } else {
            el.setAttribute('data-link-status', 'not-active');
         }
      });
   }
}

/**
 * Window Inner Height Check
 */
function initCheckWindowHeight() {
   // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
   let vh = window.innerHeight * 0.01;
   document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/**
 * Basic Functions
 */
function initBasicFunctions() {

   $(document).off('.basicFunctions');
   clearInterval(creditsImageCycle);

   let cycleImages = $('.credits-box .credits-images li');
   let cyclePrev = 0;
   let cycleCurrent = 0;

   function resetCycle() {
      clearInterval(creditsImageCycle);
      clearTimeout(creditsResetTimeout);

      creditsResetTimeout = setTimeout(function() {
         if (!cycleImages.length) return;

         cyclePrev = 0;
         cycleCurrent = 0;

         cycleImages.removeClass('active prev-active');
         cycleImages.eq(cycleCurrent).addClass('active');
      }, 800);
   }

   function cycleThroughImages() {
      if (!cycleImages.length) return;

      const previousIndex = cycleCurrent;

      cycleCurrent++;

      if (cycleCurrent > cycleImages.length - 1) {
         cycleCurrent = 0;
      }

      cycleImages.eq(previousIndex).removeClass('active').addClass('prev-active');
      cycleImages.eq(cycleCurrent).addClass('active');

      setTimeout(function() {
         cycleImages.eq(previousIndex).removeClass('prev-active');
      }, 1000);
   }

   function closeNavigation() {
      $('[data-navigation-status]').attr('data-navigation-status', 'not-active');
   }

   function closeCredits() {
      $('[data-credits-status]').attr('data-credits-status', 'not-active');
      clearInterval(creditsImageCycle);
      resetCycle();
   }

   function closeWhatsapp() {
      $('[data-whatsapp-status]').attr('data-whatsapp-status', 'not-active');
   }

   function closeBenefits() {
      $('[data-benefits-status]').attr('data-benefits-status', 'not-active');
   }

   // Toggle Navigation
   $(document).on('click.basicFunctions', '[data-navigation-toggle="toggle"]', function() {
      const navigation = $('[data-navigation-status]');
      const isActive = navigation.attr('data-navigation-status') === 'active';

      navigation.attr('data-navigation-status', isActive ? 'not-active' : 'active');

      if (isActive) {
         scroll.start();
      } else {
         scroll.stop();
      }
   });

   // Close Navigation
   $(document).on('click.basicFunctions', '[data-navigation-toggle="close"]', function() {
      closeNavigation();
      scroll.start();
   });

   // Toggle Credits
   $(document).on('click.basicFunctions', '[data-credits-toggle="toggle"]', function() {
      cycleImages = $('.credits-box .credits-images li');

      const credits = $('[data-credits-status]');
      const isActive = credits.attr('data-credits-status') === 'active';

      if (isActive) {
         closeCredits();
         scroll.start();
      } else {
         credits.attr('data-credits-status', 'active');
         scroll.stop();

         clearInterval(creditsImageCycle);
         creditsImageCycle = setInterval(cycleThroughImages, 1400);
      }
   });

   // Close Credits
   $(document).on('click.basicFunctions', '[data-credits-toggle="close"]', function() {
      closeCredits();
      scroll.start();
   });

   // Navigation Images
   $(document).on('mouseenter.basicFunctions', '.col-row-mobile-nav [data-nav-image-id]', function() {
      const navImageID = $(this).attr('data-nav-image-id');

      $('[data-nav-image-group]').find('[data-nav-image-id="' + navImageID + '"]').attr('data-nav-image-status', 'active').siblings().attr('data-nav-image-status', 'not-active');
   });

   $(document).on('mouseleave.basicFunctions', '.col-row-mobile-nav [data-nav-image-id]', function() {
      $('[data-nav-image-group]').find('[data-nav-image-id]').attr('data-nav-image-status', 'not-active');
   });

   // Toggle Whatsapp
   $(document).on('click.basicFunctions', '[data-whatsapp-toggle="toggle"]', function() {
      const whatsapp = $('[data-whatsapp-status]');
      const isActive = whatsapp.attr('data-whatsapp-status') === 'active';

      whatsapp.attr('data-whatsapp-status', isActive ? 'not-active' : 'active');
   });

   // Close Whatsapp
   $(document).on('click.basicFunctions', '[data-whatsapp-toggle="close"]', function() {
      closeWhatsapp();
   });

   // Toggle Benefits
   $(document).on('click.basicFunctions', '[data-benefits-toggle="toggle"]', function() {
      const benefits = $('[data-benefits-status]');
      const isActive = benefits.attr('data-benefits-status') === 'active';

      benefits.attr('data-benefits-status', isActive ? 'not-active' : 'active');
   });

   // Close Benefits
   $(document).on('click.basicFunctions', '[data-benefits-toggle="close"]', function() {
      closeBenefits();
   });

   // Key ESC
   $(document).on('keydown.basicFunctions', function(event) {
      if (event.key !== 'Escape') return;

      const navigationIsActive = $('[data-navigation-status]').attr('data-navigation-status') === 'active';
      const creditsIsActive = $('[data-credits-status]').attr('data-credits-status') === 'active';
      const whatsappIsActive = $('[data-whatsapp-status]').attr('data-whatsapp-status') === 'active';
      const benefitsIsActive = $('[data-benefits-status]').attr('data-benefits-status') === 'active';

      if (navigationIsActive) {
         closeNavigation();
         scroll.start();
      }

      if (creditsIsActive) {
         closeCredits();
         scroll.start();
      }

      if (whatsappIsActive) {
         closeWhatsapp();
      }

      if (benefitsIsActive) {
         closeBenefits();
      }
   });

   // Filter
   $('[data-filter-section]').each(function() {
      const filterSection = $(this);
      const filterGroup = filterSection.find('[data-filter-group]');
      const filterGrid = filterSection.find('[data-filter-grid]');

      filterGroup.find('[data-filter-category]').off('click.basicFunctions').on('click.basicFunctions', function() {
         const clickedFilter = $(this);
         const category = clickedFilter.attr('data-filter-category');

         if (clickedFilter.attr('data-filter-status') === 'active') {
            return;
         }

         $('[data-nav-filter-status]').attr('data-nav-filter-status', 'not-active');
         filterGrid.addClass('toggle-fade-out');

         clickedFilter.attr('data-filter-status', 'active').siblings().attr('data-filter-status', 'not-active');

         setTimeout(function() {
            const filterItems = filterGrid.find('[data-filter-category]');

            if (category === 'all') {
               filterItems.attr('data-filter-status', 'active');
            } else {
               filterItems.attr('data-filter-status', 'not-active');
               filterItems.filter('[data-filter-category="' + category + '"]').attr('data-filter-status', 'active');
            }

            filterGrid.removeClass('toggle-fade-out').addClass('toggle-fade-in');
            scroll.resize();
         }, 200);

         setTimeout(function() {
            filterGrid.removeClass('toggle-fade-in');
            ScrollTrigger.refresh();
         }, 400);
      });
   });

   // Toggle Table
   $('[data-table-status]').each(function() {
      const singleTable = $(this);

      singleTable.find('[data-table-toggle="toggle"]').off('click.basicFunctions').on('click.basicFunctions', function() {
         const isActive = singleTable.attr('data-table-status') === 'active';

         singleTable.attr('data-table-status', isActive ? 'not-active' : 'active');

         setTimeout(function() {
            scroll.resize();
            ScrollTrigger.refresh();
         }, 800);
      });
   });
}

/**
 * Lazy Load
 */
function initLazyLoad() {
   // https://github.com/verlok/vanilla-lazyload
   var lazyLoadInstance = new LazyLoad({ 
      container: document.querySelector('[data-scroll-container]'),
      elements_selector: ".lazy",
   });
}

/**
 * Play Video Inview
 */
function initScrollTriggerPlayVideoInview() {

   const allVideoDivs = gsap.utils.toArray('.playpauze');

   allVideoDivs.forEach(function(videoDiv) {
      const videoElem = videoDiv.querySelector('video');

      if (!videoElem) return;

      ScrollTrigger.create({
         trigger: videoElem,
         start: '0% 120%',
         end: '100% -20%',
         onEnter: () => videoElem.play(),
         onEnterBack: () => videoElem.play(),
         onLeave: () => videoElem.pause(),
         onLeaveBack: () => videoElem.pause(),
      });
   });
}

/**
 * Lenis - Check Scroll up or Down
 */

function initLenisCheckScrollUpDown() {

   if (lenisScrollStateInitialized) return;

   lenisScrollStateInitialized = true;

   let lastScrollTop = 0;
   const threshold = 50;
   const thresholdTop = 50;

   scroll.on('scroll', function(event) {
      const currentScrollTop = event.targetScroll;

      if (Math.abs(lastScrollTop - currentScrollTop) < threshold) {
         return;
      }

      const scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
      const scrollStarted = currentScrollTop > thresholdTop ? 'true' : 'false';

      document.querySelectorAll('[data-scrolling-direction]').forEach(function(element) {
         element.setAttribute('data-scrolling-direction', scrollDirection);
      });

      document.querySelectorAll('[data-scrolling-started]').forEach(function(element) {
         element.setAttribute('data-scrolling-started', scrollStarted);
      });

      lastScrollTop = currentScrollTop;
   });
}

/**
 * Lenis - ScrollTo Anchor Links
 */
function handleAnchorClick(event) {
   if (!(event.target instanceof Element)) return;
   const anchor = event.target.closest('[data-anchor-target]');
   if (!anchor) return;

   const targetScrollToAnchorLenis = anchor.getAttribute('data-anchor-target');
   if (!targetScrollToAnchorLenis || !scroll) return;

   scroll.scrollTo(targetScrollToAnchorLenis, {
      duration: 1,
      easing: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2)
   });
}

function initScrollToAnchorLenis() {
   document.removeEventListener('click', handleAnchorClick);
   document.addEventListener('click', handleAnchorClick);
}

/**
 * Check Theme of Sections
 */
function initCheckTheme() {

   function checkThemeSection() {
      const themeSections = document.querySelectorAll('[data-theme-section]');
      const themeNav = document.querySelector('[data-theme-nav]');
      const backgroundNav = document.querySelector('[data-bg-nav]');
      const navHeightElement = document.querySelector('.main-nav-bar .nav-bar-scrolled-height');

      const navOffset = navHeightElement ? navHeightElement.offsetHeight : 0;
      const centerOffset = window.innerHeight / 2;

      themeSections.forEach(function(section) {
         const bounds = section.getBoundingClientRect();

         if (bounds.top <= navOffset && bounds.bottom >= navOffset) {
            const theme = section.getAttribute('data-theme-section');

            if (theme !== null) {
               themeNav?.setAttribute('data-theme-nav', theme);
            }
         }

         if (bounds.top <= centerOffset && bounds.bottom >= centerOffset) {
            const background = section.getAttribute('data-bg-section');

            if (background !== null) {
               backgroundNav?.setAttribute('data-bg-nav', background);
            }
         }
      });
   }

   checkThemeSection();

   if (lenisThemeInitialized) return;

   lenisThemeInitialized = true;
   scroll.on('scroll', checkThemeSection);
}


/**
* GSAP Scrolltrigger Parallax Scroll
*/
function initScrollTriggerParallaxScroll() {

   ScrollTrigger.matchMedia({
      "(min-width: 1025px)": function() {

         if(document.querySelector('[data-parallax-strength]')) {
            $('[data-parallax-strength]').each(function () {
               
               let tl;
               let triggerElement = $(this);
               let targetElement = $(this).find('[data-parallax-target]');
               let triggerElementID = $(this).attr('data-parallax-trigger');
               let targetElementParallax = ($(this).attr('data-parallax-strength') * 20);
               let heightElementParallax = ($(this).attr('data-parallax-height') * 20);
               $(this).css("--parallax-strength", " " + targetElementParallax + "%");
               $(this).css("--parallax-height", " " + heightElementParallax + "%");

               
               // Check if [data-parallax-trigger="#header"] exists
               if ($(triggerElementID).length !== 0) {
                  triggerElement = $(document).find(triggerElementID);
               }
               
               tl = gsap.timeline({
                  scrollTrigger: {
                     trigger: triggerElement,
                     start: "0% 100%",
                     end: "100% 0%",
                     scrub: true,
                     markers: false
                  }
               });

               tl.set(targetElement, {
                  rotate: 0.001,
               });

               // if ($(this).attr('data-parallax-position') == 'top') {}

               tl.fromTo(targetElement, {
                  yPercent: (targetElementParallax * -0.5)
               }, {
                  yPercent: (targetElementParallax * 0.5),
                  ease: "none"
               });

            });
         }
      }
   });
}

/**
* Scrolltrigger Animations Desktop + Mobile
*/
function initScrolltriggerAnimations() {

   document.querySelectorAll('footer').forEach(function(footer) {
      const triggerElement = footer.querySelector('.row-book');
      const targetElements = footer.querySelectorAll('.row-book .col');

      if (!triggerElement || !targetElements.length) return;

      gsap.from(targetElements, {
         yPercent: -50,
         ease: "none",
         scrollTrigger: {
            trigger: triggerElement,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true
         }
      });
   });
}

/**
* Scrolltrigger Animations Desktop + Mobile
*/
function initMews() {

   // Documentation: https://mews-systems.gitbook.io/booking-engine-guide/booking-engine-widget/advanced-guide

   // Always available api calls
   // distributor.open();
   // distributor.setLanguageCode(languageCode);
   // distributor.setCurrencyCode(currencyCode);
   // distributor.setStartDate(date);
   // distributor.setEndDate(date);
   // distributor.setVoucherCode(code);
   // distributor.showRooms();
   // distributor.showRates(roomId);
   
   if (mewsDistributor || mewsInitializing) {
      return;
   }
   mewsInitializing = true;
   Mews.Distributor({
      configurationIds: [
         '1802fb4c-34a2-455d-880f-ae4071d5b71a',
      ],
   },

   function(distributor) {
      mewsDistributor = distributor;
      mewsInitializing = false;

      $(document)
         .off('click.mews', '[data-mews-toggle="open"]')
         .on('click.mews', '[data-mews-toggle="open"]', function(event) {
            event.preventDefault();

            const voucherCode = $(this).attr('data-mews-voucher');
            const roomId = $(this).attr('data-mews-room-id');

            if (voucherCode) {
               mewsDistributor.setVoucherCode(voucherCode);
            } else {
               mewsDistributor.setVoucherCode('');
            }

            if (roomId) {
               mewsDistributor.showRates(roomId);
            } else {
               mewsDistributor.open();
            }
         });
   });
}

/**
* Swiper Slider
*/
function initSwiperSlider() {

   $('[data-swiper-slider-type="stay"]').each(function(index) {

      var sliderIndexID = 'swiper-slider-type-stay-id-' + index;
      $(this).attr('id', sliderIndexID);

      var sliderThis = $(this);

      // Init Slider 1: Cards
      var swiperSliderMain = document.querySelector('#' + sliderIndexID + ' .swiper-carousel-main');
      var swiperMain = new Swiper(swiperSliderMain, {
         slidesPerView: 1,
         spaceBetween: 0,
         simulateTouch: false,
         loop: true,
         grabCursor: false,
         speed: 1200,
         navigation: {
            nextEl: document.querySelector('#' + sliderIndexID + ' [data-swiper-control="next"]'),
            prevEl: document.querySelector('#' + sliderIndexID + ' [data-swiper-control="prev"]'),
         },
         pagination: {
            el: document.querySelector('#' + sliderIndexID + ' .swiper-pagination'),
            clickable: true,
            renderBullet: function(index, className) {
               return '<span class="' + className + '"><div class="swiper-progress">' + '</div></span>';
            },
         },
         parallax: true,
         lazy: {
            loadPrevNext: true,
         },
         on: {
            slideChange: function() {
               sliderThis.find('.swiper-active-slide').text(this.realIndex + 1);
            },
         },
         allowTouchMove: false
      });

      // GSAP Animation Progress Bar (Will trigger slider to slide)
      var tl = gsap.timeline({paused: true});
      swiperTimelines.push(tl);

      // Retrigger Animation on Slide Change
      function singleSwiperSliderEnd() {
         swiperMain.slideNext();
         swiperText.slideNext();
         tl.restart();
      }

      tl.to(sliderThis.find('.swiper-progress'), {
         duration: 5,
         scaleX: 1,
         ease: "Power1.easeInOut",
         onComplete: singleSwiperSliderEnd
      });

      // Reset Progress Bar On Slide Change
      swiperMain.on("slideChange", function() {
         tl.restart();
         addSwipeFadeClass();
      });

      // Play/Pause Slider in viewport
      sliderThis.each(function() {
         let triggerElement = $(this);

         ScrollTrigger.create({
            trigger: triggerElement,
            start: '0% 100%',
            end: '100% 0%',
            onEnter: () => tl.play(),
            onEnterBack: () => tl.play(),
            onLeave: () => tl.pause(),
            onLeaveBack: () => tl.pause(),
         });
      });

      // Init Slider 2: Fade
      var swiperSliderFade = document.querySelector('#' + sliderIndexID + ' .swiper-carousel-fade');
      var swiperFade = new Swiper(swiperSliderFade, {
         slidesPerView: 1,
         simulateTouch: false,
         loop: true,
         grabCursor: false,
         parallax: true,
         effect: "fade",
         allowTouchMove: false
      });

      // Init Slider 3: Text
      var swiperSliderText = document.querySelector('#' + sliderIndexID + ' .swiper-carousel-text');
      var swiperText = new Swiper(swiperSliderText, {
         slidesPerView: "auto",
         spaceBetween: 0,
         simulateTouch: false,
         loop: true,
         grabCursor: false,
         centeredSlides: true,
         speed: 1200,
         navigation: {
            nextEl: document.querySelector('#' + sliderIndexID + ' [data-swiper-control="next"]'),
            prevEl: document.querySelector('#' + sliderIndexID + ' [data-swiper-control="prev"]'),
         },
         parallax: true,
         lazy: {
            loadPrevNext: true,
         },
         allowTouchMove: false
      });

      swiperInstances.push(swiperMain, swiperFade, swiperText);

      function addSwipeFadeClass() {
         sliderThis.find('.swiper-slide').addClass('slide-is-transitioning');
         sliderThis.find('.swiper-slide-visible').removeClass('slide-is-transitioning');

         setTimeout(function() {
            sliderThis.find('.swiper-slide').removeClass('slide-is-transitioning');
         }, 1200);
      }

      // Connect Swiper Sliders
      swiperMain.controller.control = [swiperFade];

   });

   $('[data-swiper-slider-type="double"]').each(function(index) {

      var sliderIndexID = 'swiper-slider-type-double-id-' + index;
      $(this).attr('id', sliderIndexID);

      var sliderThis = $(this);

      // Init Slider 1: Cards
      var swiperSliderMain = document.querySelector('#' + sliderIndexID + ' .swiper-carousel-main');
      var swiperMain = new Swiper(swiperSliderMain, {
         slidesPerView: 1,
         simulateTouch: false,
         loop: true,
         grabCursor: false,
         speed: 1200,
         navigation: {
            nextEl: document.querySelector('#' + sliderIndexID + ' [data-swiper-control="next"]'),
            prevEl: document.querySelector('#' + sliderIndexID + ' [data-swiper-control="prev"]'),
         },
         pagination: {
            el: document.querySelector('#' + sliderIndexID + ' .swiper-pagination'),
            clickable: true,
            renderBullet: function(index, className) {
               return '<span class="' + className + '"><div class="swiper-progress">' + '</div></span>';
            },
         },
         parallax: true,
         lazy: {
            loadPrevNext: true,
         },
         on: {
            slideChange: function() {
               sliderThis.find('.swiper-active-slide').text(this.realIndex + 1);
            },
         }
      });

      // GSAP Animation Progress Bar (Will trigger slider to slide)
      var tl = gsap.timeline({paused: true});
      swiperTimelines.push(tl);

      // Retrigger Animation on Slide Change
      function singleSwiperSliderEnd() {
         swiperMain.slideNext();
         tl.restart();
      }

      tl.to(sliderThis.find('.swiper-progress'), {
         duration: 5,
         scaleX: 1,
         ease: "Power1.easeInOut",
         onComplete: singleSwiperSliderEnd
      });

      // Reset Progress Bar On Slide Change
      swiperMain.on("slideChange", function() {
         tl.restart();
      });

      // Pause Carousel/Progress Bar On Hover
      sliderThis.find('.swiper-controls').on('mouseenter', function() {
         tl.pause();
      });

      sliderThis.find('.swiper-controls').on('mouseleave', function() {
         tl.resume();
      });

      // Play/Pause Slider in viewport
      sliderThis.each(function() {
         let triggerElement = $(this);

         ScrollTrigger.create({
            trigger: triggerElement,
            start: '0% 120%',
            end: '100% -20%',
            onEnter: () => tl.play(),
            onEnterBack: () => tl.play(),
            onLeave: () => tl.pause(),
            onLeaveBack: () => tl.pause(),
         });
      });

      // Init Slider 2: Secondary
      var swiperSliderSecondary = document.querySelector('#' + sliderIndexID + ' .swiper-carousel-secondary');
      var swiperSecondary = new Swiper(swiperSliderSecondary, {
         slidesPerView: 1,
         simulateTouch: false,
         loop: true,
         grabCursor: false,
         speed: 1200,
         parallax: true,
         lazy: {
            loadPrevNext: true,
         }
      });

      swiperInstances.push(swiperMain, swiperSecondary);

      // Connect Swiper Sliders
      swiperMain.controller.control = [swiperSecondary];
      swiperSecondary.controller.control = [swiperMain];

   });

}

function destroySwiperSliders() {
   swiperTimelines.forEach(function(timeline) {
      timeline.kill();
   });

   swiperInstances.forEach(function(instance) {
      if (instance && !instance.destroyed) {
         instance.destroy(true, true);
      }
   });

   swiperTimelines = [];
   swiperInstances = [];
}

/**
* Custom Cursor
*/
function updateCustomCursor() {
   const cursor = document.querySelector('.custom-cursor');

   if (!cursor) return;

   cursorCurrentX += (cursorX - cursorCurrentX) / 5;
   cursorCurrentY += (cursorY - cursorCurrentY) / 5;

   gsap.set(cursor, {
      left: cursorCurrentX,
      top: cursorCurrentY
   });
}

function initCustomCursor() {

   $(document)
      .off('.customCursor')
      .on('mousemove.customCursor', function(event) {
         cursorX = event.clientX;
         cursorY = event.clientY;

         if (!cursorInitialized) {
            $('[data-cursor-init]').attr('data-cursor-init', 'true');
            cursorInitialized = true;
         }
      })
      .on('mouseenter.customCursor', '[data-cursor-bubble-text]', function() {
         const cursorText = $(this).attr('data-cursor-bubble-text');

         $('[data-cursor-bubble]').attr('data-cursor-bubble', 'active');
         $('.custom-cursor .cursor-text').text(cursorText);
      })
      .on('mouseleave.customCursor', '[data-cursor-bubble-text]', function() {
         $('[data-cursor-bubble]').attr('data-cursor-bubble', 'not-active');
      });
}

gsap.ticker.add(updateCustomCursor);