/* ─────────────────────────────────────────────────────────
   blog.js — CompoundCalc shared blog behaviour
   ───────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── FAQ accordion ──────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.faq-item').classList.toggle('open');
    });
  });

  /* ── Share button (copy link) ───────────────────────────── */
  document.querySelectorAll('.share-btn[data-action="copy"]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied! ✓';
        setTimeout(() => { btn.textContent = original; }, 2000);
      });
    });
  });

  /* ── TOC anchor IDs ─────────────────────────────────────── */
  // Reads data-toc-map JSON from a <script id="toc-map" type="application/json">
  // block and assigns id attributes to matching h2 elements.
  // Each article page provides its own mapping (see template below).
  const tocMapEl = document.getElementById('toc-map');
  if (tocMapEl) {
    try {
      const map = JSON.parse(tocMapEl.textContent);
      document.querySelectorAll('.article-body h2').forEach(h => {
        const id = map[h.textContent.trim()];
        if (id) h.id = id;
      });
    } catch (e) {
      console.warn('TOC map parse error:', e);
    }
  }

  /* ── Rule of 72 sidebar calculator ─────────────────────── */
  const rateInput = document.getElementById('rule72-rate');
  const rateResult = document.getElementById('rule72-result');
  if (rateInput && rateResult) {
    rateInput.addEventListener('input', () => {
      const v = parseFloat(rateInput.value);
      if (v > 0) {
        rateResult.style.display = 'block';
        rateResult.textContent = `72 ÷ ${v}% = ${(72 / v).toFixed(1)} years to double`;
      } else {
        rateResult.style.display = 'none';
      }
    });
  }

  /* ── Grow Savings sidebar calculator (Article 1) ─────────── */
  const growBtn = document.getElementById('sidebar-grow-btn');
  const growInput = document.getElementById('sidebar-monthly');
  if (growBtn && growInput) {
    growBtn.addEventListener('click', e => {
      const v = growInput.value;
      if (v && !isNaN(v) && Number(v) > 0) {
        e.preventDefault();
        window.location.href = `/?m=${encodeURIComponent(v)}&y=20&tab=grow`;
      }
    });
  }

  /* ── Goal Calculator sidebar (Article 3) ────────────────── */
  const goalBtn = document.getElementById('sidebar-goal-btn');
  const goalInput = document.getElementById('sidebar-goal-monthly');
  if (goalBtn && goalInput) {
    goalBtn.addEventListener('click', () => {
      const v = goalInput.value;
      if (v && v > 0) {
        window.location.href = `/investment-goal-calculator?goal=1000000&m=${encodeURIComponent(v)}&r=10`;
      }
    });
  }

  /* ── Mobile Menu Toggle ──────────────────────────────────── */
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      mobileBtn.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });
  }

});