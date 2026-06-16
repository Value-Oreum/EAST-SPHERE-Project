/* EAST SPHERE — main.js */

(function () {
  'use strict';

  /* ── 스크롤 진행 표시 ── */
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0 && progressBar) {
      progressBar.style.width = ((scrolled / total) * 100).toFixed(1) + '%';
    }
  }

  /* ── 네비게이션 배경 ── */
  const nav = document.getElementById('mainNav');
  function updateNav() {
    if (nav) {
      nav.style.background = window.scrollY > 80
        ? 'rgba(13,31,60,.97)'
        : 'rgba(13,31,60,.92)';
    }
  }

  /* ── IntersectionObserver: fade-up / 숫자 카운터 / 예산 바 ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  const counters = document.querySelectorAll('.num-counter');
  const budgetBars = document.querySelectorAll('.bb-fill');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      /* fade-up */
      if (el.classList.contains('fade-up')) {
        el.classList.add('visible');
      }

      /* 숫자 카운터 */
      if (el.classList.contains('num-counter')) {
        const target = parseFloat(el.dataset.target || '0');
        const isInt = Number.isInteger(target);
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = eased * target;
          el.textContent = isInt ? Math.round(value) : value.toFixed(1);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = isInt ? target : target.toFixed(1);
        }
        requestAnimationFrame(tick);
      }

      /* 예산 바 */
      if (el.classList.contains('bb-fill')) {
        setTimeout(function () { el.classList.add('animated'); }, 100);
      }

      observer.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  fadeEls.forEach(function (el) { observer.observe(el); });
  counters.forEach(function (el) { observer.observe(el); });
  budgetBars.forEach(function (el) { observer.observe(el); });

  /* ── 모바일 메뉴 토글 ── */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    /* 메뉴 항목 클릭 시 닫기 */
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    /* 외부 클릭 시 닫기 */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 스크롤 이벤트 묶기 (throttle) ── */
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        updateNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── 초기 실행 ── */
  updateProgress();
  updateNav();

  /* ── 이미지 lazy loading 폴백 (네이티브 미지원 브라우저) ── */
  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      });
    });
    lazyImgs.forEach(function (img) { imgObserver.observe(img); });
  }

  /* ── 부드러운 앵커 스크롤 (nav 높이 오프셋 보정) ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
