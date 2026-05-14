/* ── Scroll to top — shows after 800px scroll ────────────── */
(function () {
  const THRESHOLD = 800; // px — button appears after this scroll depth
  const wrap = document.getElementById('scrollTopWrap');
  const btn  = document.getElementById('scrollTopBtn');

  if (!wrap || !btn) return;

  function onScroll() {
    const scrolled = window.scrollY || document.documentElement.scrollTop;

    if (scrolled > THRESHOLD) {
      wrap.classList.add('is-visible');
      wrap.setAttribute('aria-hidden', 'false');
    } else {
      wrap.classList.remove('is-visible');
      wrap.setAttribute('aria-hidden', 'true');
    }
  }

  // Throttle to ~60fps — avoids layout thrashing on fast scroll
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Check on load in case page is pre-scrolled (e.g. browser back)
  onScroll();
}());
