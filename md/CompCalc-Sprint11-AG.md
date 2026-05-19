# CompoundCalc — Sprint 11: CRO & Conversion Improvements
**For:** Antigravity  
**Prepared by:** Ali  
**Scope:** `index.html`, `assets/js/calculator.js`, `assets/css/styles.css`, all 6 blog articles  
**Last updated:** 2026-05-19

---

## Sprint Goal

Four changes that turn the site's existing traffic into more revenue and leads:

1. **Remove the Calculate button** — calculations already update live; the button is redundant clutter
2. **Suppress email form for returning subscribers** — returning visitors who already submitted never see it again
3. **Persistent floating CTA pill on mobile** — keeps the PDF lead magnet visible for mobile users who scroll past the slide-in form
4. **EasyEquities affiliate CTAs inside all 6 blog articles** — the only revenue stream currently live needs to be in front of every reader

---

## Task 1 — Remove the Calculate Button

### Why
Inputs already trigger live recalculation. The Calculate button is a duplicate action that adds visual noise to the toolbar.

### Files affected
- `index.html`
- `investment-goal-calculator.html`
- `compare-investments.html`
- `assets/js/calculator.js`
- `assets/css/styles.css`

---

### 1A — HTML: Delete the button from the toolbar

Find and delete this element on **all three calculator pages**:

```html
<!-- DELETE this element entirely — appears in the toolbar row -->
<button class="btn-calculate" onclick="computeGrow()">
  <!-- icon + "Calculate" text — exact markup may vary slightly -->
</button>
```

> The exact class name may be `btn-calculate`, `btn-primary`, or similar — find the green Calculate button in the toolbar and delete it and its wrapping element if it has one. The toolbar should be left with only: Currency dropdown · Clear · Share Link.

---

### 1B — JS: Confirm auto-calc is wired to input events

Open `calculator.js` and verify that `computeGrow()`, `computeGoal()`, and `computeCompare()` are each called on `input` or `change` events for their respective fields. They should already be. If any are **only** called from the button's `onclick` and not from input listeners, add the listeners now:

```javascript
// Ensure all Grow tab inputs trigger live recalculation
// Add any that are missing — pattern is the same for all fields
document.getElementById('g-principal').addEventListener('input', computeGrow);
document.getElementById('g-monthly').addEventListener('input', computeGrow);
document.getElementById('g-rate').addEventListener('input', computeGrow);
document.getElementById('g-years').addEventListener('input', computeGrow);
document.getElementById('g-freq').addEventListener('change', computeGrow);

// Goal tab
document.getElementById('goal-target').addEventListener('input', computeGoal);
document.getElementById('goal-monthly').addEventListener('input', computeGoal);
// ... etc — mirror for all Goal and Compare inputs
```

> **Important:** Do not add `input` listeners that would double-fire if they already exist. Check for existing listeners first. If `computeGrow` is already bound to `input`, leave it.

---

### 1C — JS: Confirm email capture still fires

The email capture trigger sets `ecCalculationRan = true` and calls `maybeShowEmailCapture()`. This call must live inside `computeGrow()`, `computeGoal()`, and `computeCompare()` — not inside the old button handler. Verify this is already the case. If the call was only inside the button's `onclick`, move it to the end of each compute function:

```javascript
function computeGrow() {
  // ... all existing calculation logic ...

  // Email capture trigger — must stay here after button removal
  ecCalculationRan = true;
  maybeShowEmailCapture();
}
```

Mirror this in `computeGoal()` and `computeCompare()`.

---

### 1D — JS: Keep the GA4 event firing

The `calculation_run` GA4 event should fire from inside the compute functions (debounced), not from the button. If it was attached to the button's onclick, move it:

```javascript
// Debounce helper — add at top of calculator.js if not already present
let calcDebounceTimer;
function fireCalcGA4Event() {
  clearTimeout(calcDebounceTimer);
  calcDebounceTimer = setTimeout(() => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculation_run', { tab: activeTab });
    }
  }, 1000); // fire 1s after last input change
}

// Call fireCalcGA4Event() at the end of computeGrow(), computeGoal(), computeCompare()
```

---

### 1E — CSS: Clean up toolbar layout

Once the button is removed, the toolbar row (Currency · Clear · Share Link) may need spacing adjustments. The Clear and Share Link buttons should remain right-aligned. Find the toolbar CSS rule and adjust `gap` or `justify-content` if the row looks unbalanced:

```css
/* Find the existing toolbar rule and adjust if needed */
.toolbar-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Ensure Currency label + dropdown stay left, Clear + Share stay right */
.toolbar-row .toolbar-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: auto; /* pushes Clear + Share to the right */
}
```

> If the toolbar doesn't already use `.toolbar-left` / `.toolbar-right` grouping, check the current layout and adjust to keep Currency left and Clear/Share right with `margin-right: auto` on the left group.

---

### Task 1 QA
- [ ] Calculate button is gone from all three calculator pages
- [ ] Results update automatically as inputs change (no button press needed)
- [ ] Clear button still works and resets all fields + results
- [ ] Share Link button still works and copies the URL
- [ ] Email capture still fires after 30s + 1 auto-calculation
- [ ] GA4 `calculation_run` event still fires (verify in GA4 DebugView)
- [ ] Toolbar layout looks balanced on desktop and mobile without the button

---

## Task 2 — Suppress Email Form for Returning Subscribers

### Why
The `cc_email_captured` key is already written to `localStorage` on successful form submission (Sprint 2). The form currently checks this on page load but there may be edge cases where it re-appears. This task hardens the suppression and also suppresses for users who have **dismissed** the form more than twice (avoid badgering disengaged visitors).

### File: `assets/js/calculator.js`

---

### 2A — Harden the existing localStorage check

Find the `maybeShowEmailCapture()` function and confirm the localStorage check is at the top:

```javascript
function maybeShowEmailCapture() {
  if (ecShown || ecDismissed) return;

  // ── Hardened check ──────────────────────────────
  if (localStorage.getItem('cc_email_captured')) return; // already subscribed
  // ────────────────────────────────────────────────

  if (ecCalculationRan && ecTimerFired) {
    showEmailCapture();
  }
}
```

---

### 2B — Add dismiss counter (suppress after 2 dismissals)

Update the `dismissEmailCapture()` function to count dismissals across visits. After 2 dismissals, treat the user as permanently suppressed:

```javascript
const EC_DISMISS_KEY = 'cc_dismiss_count';

function dismissEmailCapture() {
  const el = document.getElementById('email-capture');
  if (el) el.classList.add('hidden');
  ecDismissed = true;

  // Increment dismiss counter in localStorage
  const count = parseInt(localStorage.getItem(EC_DISMISS_KEY) || '0', 10);
  localStorage.setItem(EC_DISMISS_KEY, count + 1);
}

// Update maybeShowEmailCapture to respect dismiss count
function maybeShowEmailCapture() {
  if (ecShown || ecDismissed) return;
  if (localStorage.getItem('cc_email_captured')) return;

  // Suppress permanently after 2 dismissals across visits
  const dismissCount = parseInt(localStorage.getItem(EC_DISMISS_KEY) || '0', 10);
  if (dismissCount >= 2) return;

  if (ecCalculationRan && ecTimerFired) {
    showEmailCapture();
  }
}
```

---

### Task 2 QA
- [ ] Form never appears if `cc_email_captured` is set in localStorage
- [ ] Form does not appear on second visit if user dismissed it twice
- [ ] Form does appear on second visit if user only dismissed it once (single dismissal = not suppressed yet)
- [ ] Successful form submission still sets `cc_email_captured` and form never reappears

---

## Task 3 — Persistent Floating CTA Pill (Mobile Only)

### Why
On mobile, the email capture form is below the fold. Many mobile users scroll past it or never reach it. A persistent pill at the bottom of the screen keeps the PDF offer visible throughout the session.

### Files: `index.html`, `assets/css/styles.css`, `assets/js/calculator.js`

---

### 3A — HTML: Add the pill element

Add this just before the closing `</body>` tag in `index.html`:

```html
<!-- ══════════════════════════════════════════════════
     MOBILE FLOATING CTA PILL
     Visible on mobile only, hidden after email captured
     or after email form becomes visible in the page
     ══════════════════════════════════════════════════ -->
<div id="mobile-cta-pill" class="mobile-cta-pill hidden" role="complementary">
  <span class="pill-icon">📩</span>
  <span class="pill-text">Get your free PDF projection</span>
  <button
    class="pill-btn"
    onclick="scrollToEmailCapture()"
    type="button"
    aria-label="Get your free PDF projection"
  >
    Get it free
  </button>
</div>
```

---

### 3B — CSS: Pill styles

```css
/* ── Mobile Floating CTA Pill ───────────────────────── */
.mobile-cta-pill {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: #111827;
  color: #f9fafb;
  border-radius: 50px;
  padding: 0.75rem 1rem 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 999;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);

  /* Slide up from below */
  animation: pill-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes pill-slide-up {
  from { transform: translateY(100px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}

.mobile-cta-pill.hidden {
  display: none;
}

.pill-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.pill-text {
  font-size: 0.82rem;
  font-weight: 500;
  flex: 1;
  line-height: 1.3;
}

.pill-btn {
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 8px 16px;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
  flex-shrink: 0;
}

.pill-btn:hover {
  background: #15803d;
}

/* Desktop: never show the pill */
@media (min-width: 641px) {
  .mobile-cta-pill {
    display: none !important;
  }
}
```

---

### 3C — JS: Pill logic

Add this block to `calculator.js`:

```javascript
// ── Mobile CTA Pill ───────────────────────────────────
function initMobilePill() {
  // Don't show if already subscribed
  if (localStorage.getItem('cc_email_captured')) return;

  const pill = document.getElementById('mobile-cta-pill');
  if (!pill) return;

  // Show pill 4 seconds after page load on mobile
  setTimeout(() => {
    if (window.innerWidth <= 640) {
      pill.classList.remove('hidden');
    }
  }, 4000);
}

function scrollToEmailCapture() {
  const form = document.getElementById('email-capture');
  const pill = document.getElementById('mobile-cta-pill');

  if (form && !form.classList.contains('hidden')) {
    // Form already visible — just scroll to it
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    // Force-show the email form, then scroll to it
    showEmailCapture();
    setTimeout(() => {
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 450); // wait for slide-in animation
  }

  // Hide the pill once tapped
  if (pill) pill.classList.add('hidden');
}

// Hide pill once the email form appears naturally
const _originalShowEmailCapture = showEmailCapture;
showEmailCapture = function() {
  _originalShowEmailCapture();
  const pill = document.getElementById('mobile-cta-pill');
  if (pill) pill.classList.add('hidden');
};

// Hide pill once user successfully subscribes
// Add this line inside showECSuccess(), after the existing success state code:
// document.getElementById('mobile-cta-pill')?.classList.add('hidden');

// Initialise on DOM ready
window.addEventListener('DOMContentLoaded', initMobilePill);
```

> **Note on `showECSuccess()`**: Find the existing `showECSuccess()` function and add one line at the end of it to hide the pill:
> ```javascript
> document.getElementById('mobile-cta-pill')?.classList.add('hidden');
> ```

---

### Task 3 QA
- [ ] Pill is invisible on desktop (≥641px) at all times
- [ ] Pill appears 4 seconds after page load on mobile
- [ ] Pill does not appear if `cc_email_captured` is set in localStorage
- [ ] Tapping "Get it free" scrolls to the email form (showing it first if hidden)
- [ ] Pill hides once the email form appears on its own (after 30s trigger)
- [ ] Pill hides after successful form submission
- [ ] Animation is smooth — slides up from below on appearance

---

## Task 4 — EasyEquities Affiliate CTAs in Blog Articles

### Why
EasyEquities (`https://bit.ly/4wsBTNT`) is the only live revenue stream. All 6 blog articles have readers who are already engaged with personal finance content — these are the highest-intent visitors on the site. There is currently no affiliate CTA inside the article body.

### Files: All 6 blog articles in `/blog/`

```
blog/compound-interest-south-africa.html
blog/rule-of-72.html
blog/how-long-to-save-1-million-rand.html
blog/tax-free-savings-account-calculator-south-africa.html
blog/etfs-vs-traditional-savings-accounts.html
blog/maximize-compound-interest-monthly-savings.html
```

---

### 4A — The CTA block (reuse on all 6 articles)

This is the single HTML block to add to every blog article. It is designed to feel like editorial content, not an ad:

```html
<!-- ══════════════════════════════════════════════════
     AFFILIATE CTA — EasyEquities
     Place once per article (see positioning guide below)
     ══════════════════════════════════════════════════ -->
<div class="blog-affiliate-cta">
  <div class="blog-affiliate-inner">
    <div class="blog-affiliate-copy">
      <p class="blog-affiliate-headline">Ready to put the maths to work?</p>
      <p class="blog-affiliate-sub">
        EasyEquities lets you start investing from R50 — no minimum balance,
        TFSA included, and access to JSE ETFs, US stocks, and more.
        It's where most South African retail investors start.
      </p>
      <a
        href="https://bit.ly/4wsBTNT"
        target="_blank"
        rel="noopener sponsored"
        class="blog-affiliate-btn"
        onclick="gtag && gtag('event', 'affiliate_click', { platform: 'easyequities', source: 'blog' })"
      >
        Open a free EasyEquities account →
      </a>
      <p class="blog-affiliate-disclosure">
        Affiliate disclosure: CompoundCalc may earn a small commission if you
        open an account. This has no effect on our calculator or content.
      </p>
    </div>
  </div>
</div>
```

---

### 4B — Positioning: where to insert in each article

Insert the block **once per article**, after the second or third `<h2>` section (roughly the midpoint of the article body), before the article's concluding section. Do not place it at the very top or very bottom.

For each article, find a natural break in the article body — typically after a section that ends with an actionable insight (e.g., after the compound interest formula explanation, after the Rule of 72 table, after the R1 million worked examples). The pattern:

```html
</section>  ← end of a mid-article section

<!-- INSERT AFFILIATE CTA HERE -->
<div class="blog-affiliate-cta"> ... </div>

<section>   ← next section begins
  <h2>Next heading</h2>
```

---

### 4C — CSS: Blog affiliate CTA styles

Add to `assets/css/blog.css`:

```css
/* ── Blog Affiliate CTA ─────────────────────────────── */
.blog-affiliate-cta {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1.5px solid #86efac;
  border-radius: 12px;
  padding: 1.5rem 1.75rem;
  margin: 2rem 0;
}

.blog-affiliate-headline {
  font-size: 1rem;
  font-weight: 700;
  color: #14532d;
  margin: 0 0 0.5rem;
}

.blog-affiliate-sub {
  font-size: 0.875rem;
  color: #166534;
  line-height: 1.6;
  margin: 0 0 1rem;
}

.blog-affiliate-btn {
  display: inline-block;
  background: #16a34a;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
  margin-bottom: 0.75rem;
}

.blog-affiliate-btn:hover {
  background: #15803d;
}

.blog-affiliate-disclosure {
  font-size: 0.72rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}
```

---

### Task 4 QA
- [ ] CTA block appears in all 6 blog articles
- [ ] Positioned at the mid-point of each article — not first, not last
- [ ] Green gradient box renders correctly on desktop and mobile
- [ ] Affiliate link opens in a new tab (`target="_blank"`)
- [ ] GA4 `affiliate_click` event fires on click (verify in GA4 DebugView)
- [ ] Disclosure text is visible below the button
- [ ] No duplicate CTAs — exactly one per article

---

## Summary of All Changes

| Task | Files | Priority |
|------|-------|----------|
| 1. Remove Calculate button | `index.html`, `investment-goal-calculator.html`, `compare-investments.html`, `calculator.js`, `styles.css` | 🔴 High |
| 2. Harden email form suppression | `calculator.js` | 🟡 Medium |
| 3. Mobile floating pill CTA | `index.html`, `calculator.js`, `styles.css` | 🟡 Medium |
| 4. EasyEquities CTAs in blog | All 6 blog articles, `blog.css` | 🔴 High |

---

## Master.md Update (add at end of Sprint 11)

When complete, add this block to `Master.md` under section 3:

```markdown
### Sprint 11 — CRO & Conversion Improvements
**Status:** ✅ Complete
- Removed Calculate button from all three calculator pages; confirmed live auto-calculation on all input events
- Hardened email form suppression: permanent suppression after 2 dismissals via `cc_dismiss_count` localStorage key
- Added persistent floating CTA pill on mobile: appears 4s after load, hides on form trigger or successful subscribe
- Added EasyEquities affiliate CTA block to all 6 blog articles with GA4 event tracking
```

---

*Document version: 1.0*  
*Sprint: 11*  
*Contact: ali@openmindi.co.za*
