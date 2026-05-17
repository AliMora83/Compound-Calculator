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

/* ── AdSense Sticky Anchor Ad Controller ───────────────── */
(function () {
  const ANCHOR_DISMISS_KEY = 'cc-anchor-dismissed-until';
  const anchorAd = document.querySelector('.ad-anchor-sticky');
  if (!anchorAd) return;

  const dismissBtn = anchorAd.querySelector('.ad-anchor-dismiss');
  
  // Check if dismissed previously and still within 24h window
  const dismissedUntil = localStorage.getItem(ANCHOR_DISMISS_KEY);
  if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
    anchorAd.style.display = 'none';
    anchorAd.setAttribute('aria-hidden', 'true');
    return;
  }

  // Make sure it is visible initially if not dismissed
  anchorAd.style.display = 'flex';
  anchorAd.setAttribute('aria-hidden', 'false');

  if (dismissBtn) {
    dismissBtn.addEventListener('click', function () {
      // Fade out gracefully
      anchorAd.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      anchorAd.style.opacity = '0';
      anchorAd.style.transform = 'translate(-50%, 10%) scale(0.95)';
      
      setTimeout(function () {
        anchorAd.style.display = 'none';
        anchorAd.setAttribute('aria-hidden', 'true');
      }, 300);

      // Persist preference for 24 hours
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(ANCHOR_DISMISS_KEY, expiry.toString());
    });
  }
}());
