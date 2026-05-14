# CompoundCalc — Footer Update + Scroll to Top
**Prepared for:** Antigravity  
**Prepared by:** Ali (ali@openmindi.co.za)  
**Files to edit:** `styles.css`, `calculator.js` (or a new `ui.js`), every page's HTML  
**Scope:** Dark green footer, white text throughout, scroll-to-top button that appears after 800px scroll

---

## Overview

Two changes:

| # | Change | Where |
|---|--------|--------|
| 1 | Footer background → dark green, all text → white | `styles.css` |
| 2 | "Scroll to top" button — fixed bottom-right, visible after 800px scroll | HTML + `styles.css` + JS |

---

## Change 1 — Footer: Dark Green Background, White Text

**File:** `styles.css`

Find the existing footer block. It may be one rule or several — locate by `.site-footer` or `.footer`. Replace the entire footer section with the following. If the existing rules use different class names, rename accordingly.

```css
/* ── Site Footer ─────────────────────────────────────────── */
.site-footer {
  background: #14532d;
  padding: 3.5rem 2rem 0;
  margin-top: 4rem;
}

.footer-inner {
  max-width: 1160px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Brand column */
.footer-brand .logo-text {
  font-size: 1.0625rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
  margin-bottom: 0.625rem;
  display: block;
}

.footer-brand p {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
  max-width: 260px;
}

/* Nav columns */
.footer-col h5 {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1rem;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.footer-col ul a {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-col ul a:hover {
  color: #ffffff;
}

/* Bottom bar */
.footer-bottom {
  max-width: 1160px;
  margin: 0 auto;
  padding: 1.375rem 0 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-bottom p {
  font-size: 0.775rem;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1.5;
}

/* ── Footer responsive ───────────────────────────────────── */
@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.375rem;
  }
}
```

**Also update `blog.css`** — the blog pages have their own footer rules. Find and replace:

```css
/* Find in blog.css: */
.site-footer { background: var(--ink); padding: 3rem 2rem; margin-top: 5rem; }

/* Replace with: */
.site-footer { background: #14532d; padding: 3.5rem 2rem 0; margin-top: 5rem; }
```

Then apply the same `.footer-inner`, `.footer-brand`, `.footer-col`, and `.footer-bottom` rules above to `blog.css` as well (or, better, move all footer rules into a shared `footer.css` partial and include it on every page).

---

## Change 2 — Scroll to Top Button

### 2.1 — HTML (add once, to every page)

Add this element **immediately before the closing `</body>` tag** on every page — `index.html`, `savings-calculator.html`, `investment-goal-calculator.html`, `compare-investments.html`, and all three blog article pages and `blog/index.html`.

```html
<!-- ── Scroll to top ──────────────────────────────────────
     Visibility controlled by JS — hidden until 800px scroll
     ──────────────────────────────────────────────────────── -->
<div class="scroll-top-wrap" id="scrollTopWrap" aria-hidden="true">
  <button
    class="scroll-top-btn"
    id="scrollTopBtn"
    onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
    aria-label="Scroll to top of page"
    type="button"
  >
    <span class="scroll-top-label">Scroll to top</span>
    <span class="scroll-top-circle" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 13V5M9 5L5 9M9 5L13 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </button>
</div>
```

---

### 2.2 — CSS (add to `styles.css`, also to `blog.css`)

Add this block near the bottom of both stylesheets, just before the `@media` responsive rules:

```css
/* ── Scroll to top ───────────────────────────────────────── */
.scroll-top-wrap {
  position: fixed;
  bottom: 2.5rem;
  right: 2rem;
  z-index: 200;

  /* Hidden by default — JS adds .is-visible */
  opacity: 0;
  pointer-events: none;
  transform: translateY(12px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.scroll-top-wrap.is-visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.scroll-top-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: var(--font-body, 'DM Sans', sans-serif);
}

.scroll-top-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #14532d;
  letter-spacing: 0.01em;
  transition: color 0.15s;
}

.scroll-top-btn:hover .scroll-top-label {
  color: var(--green, #16a34a);
}

.scroll-top-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #14532d;
  border-radius: 50%;
  transition: background 0.15s, transform 0.15s;
  flex-shrink: 0;
}

.scroll-top-btn:hover .scroll-top-circle {
  background: var(--green, #16a34a);
  transform: translateY(-2px);
}

/* On dark footer pages the label needs to stay readable —
   no changes needed since button is fixed over page content,
   not over the footer */

@media (max-width: 480px) {
  .scroll-top-wrap {
    bottom: 1.25rem;
    right: 1rem;
  }

  /* Hide text label on small screens — icon only */
  .scroll-top-label {
    display: none;
  }
}
```

---

### 2.3 — JavaScript

If a shared `ui.js` (or `main.js`) already exists, add this function to it. Otherwise create `/assets/js/ui.js` and load it with `<script src="/assets/js/ui.js" defer></script>` on every page.

```javascript
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
```

---

## Updated Footer HTML (all pages)

Every page's `<footer>` block should match this structure. Replace existing footer HTML with the following — content is the same as before, class names are tightened to match the new CSS above.

```html
<footer class="site-footer">
  <div class="footer-inner">

    <div class="footer-brand">
      <span class="logo-text">CompoundCalc.co.za</span>
      <p>Free compound interest calculator for South African investors. See how your savings grow over time.</p>
    </div>

    <div class="footer-col">
      <h5>Quick Menu</h5>
      <ul>
        <li><a href="/">Compound Calculator</a></li>
        <li><a href="/investment-goal-calculator">Goal Calculator</a></li>
        <li><a href="/compare-investments">Compare Scenarios</a></li>
        <li><a href="/blog">Financial Blog</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h5>Company</h5>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/privacy-policy">Privacy Policy</a></li>
        <li><a href="/terms-of-service">Terms of Service</a></li>
      </ul>
    </div>

  </div>

  <div class="footer-bottom">
    <p>Disclaimer: This tool is for informational purposes only and does not constitute financial advice. CompoundCalc is not a registered financial services provider.</p>
    <p>© 2026 CompoundCalc. Built in South Africa 🇿🇦</p>
  </div>
</footer>
```

---

## QA Checklist

**Footer:**
- [ ] Footer background is dark green (`#14532d`) on all pages — calculator, blog articles, blog index, legal pages
- [ ] "CompoundCalc.co.za" brand text is white
- [ ] Body copy under brand is at 55% white opacity — visible but not competing
- [ ] Column headings ("Quick Menu", "Company") are at 40% white — clearly secondary
- [ ] Nav links are at 70% white opacity, brighten to 100% on hover
- [ ] Disclaimer and copyright text at bottom bar are at 35% white — clearly fine print
- [ ] Footer displays 3 columns on desktop, 2 columns on tablet (brand spans full width), 1 column on mobile
- [ ] No text is unreadably dark or invisible against the green background

**Scroll to top button:**
- [ ] Button is **not visible** when page first loads (scroll position = 0)
- [ ] Button **fades in** smoothly after scrolling past 800px
- [ ] Button **fades out** smoothly when scrolling back above 800px
- [ ] Clicking the button scrolls smoothly to the very top of the page
- [ ] "Scroll to top" label is dark green, button circle is dark green with white arrow
- [ ] On hover: label brightens to primary green, circle lifts 2px
- [ ] On mobile (≤480px): text label hidden, circle icon only — still functional
- [ ] Button does not overlap footer content or stick over the footer on short pages
- [ ] `aria-hidden` toggles correctly (`true` when hidden, `false` when visible)
- [ ] Button present on all pages: calculator, goal calculator, compare, all blog articles, blog index

---

*Document version: 1.0*  
*Questions: ali@openmindi.co.za / +27 62 370 5952*
