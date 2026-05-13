# CompoundCalc — Blog Style Implementation
**Prepared for:** Antigravity  
**Prepared by:** Ali (ali@openmindi.co.za)  
**Scope:** Extract blog CSS into a shared stylesheet, implement three article pages, create a reusable blog template for future articles  
**Reference files:** `compound-interest-south-africa.html`, `rule-of-72.html`, `how-long-to-save-1-million-rand.html` (all attached)

---

## Overview

Three fully designed blog article HTML files are attached. Do **not** deploy them as-is — they contain inline `<style>` blocks and inline `<script>` blocks that need to be extracted and restructured into the site's existing file architecture.

Your job is to:
1. Add one new font (`Lora`) to the existing font setup
2. Create `/assets/css/blog.css` from the shared styles across all three files
3. Create the three article pages from the reference HTML
4. Build a reusable blank `blog-template.html` for future articles
5. Build the `blog/index.html` listing page

---

## Part 1 — Font Addition

The blog introduces one new typeface: **Lora** (a serif display font used for article headings and subheadings). DM Sans and DM Mono are already in use on the main calculator.

### 1.1 Google Fonts CDN (temporary, until self-hosted)

The three reference files already load all three fonts from Google Fonts. For now, update the shared `<head>` font `<link>` tag to include Lora alongside the existing fonts:

**Find** the existing Google Fonts `<link>` tag in your shared `<head>` (or `_head.html` partial):

```html
<!-- existing -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:...&family=DM+Mono:...&display=swap" rel="stylesheet">
```

**Replace with:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&family=Lora:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
```

### 1.2 Self-hosting Lora (do after CDN version is live)

Per the performance requirements in `CompCalc-Setup.md` Part 3.1, self-host after going live:

1. Go to `https://gwfh.mranftl.com/fonts` → search "Lora" → download weights 600, 700 (normal) and 400 (italic)
2. Place `.woff2` files in `/assets/fonts/`
3. Add to `styles.css`:

```css
@font-face {
  font-family: 'Lora';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/assets/fonts/lora-600.woff2') format('woff2');
}
@font-face {
  font-family: 'Lora';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/assets/fonts/lora-700.woff2') format('woff2');
}
@font-face {
  font-family: 'Lora';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/lora-400-italic.woff2') format('woff2');
}
```

4. Remove the Google Fonts `<link>` tag once self-hosted fonts are confirmed working.

---

## Part 2 — CSS: `blog.css`

Create `/assets/css/blog.css`. Copy the CSS below exactly. This stylesheet is loaded **only** on blog pages — add `<link rel="stylesheet" href="/assets/css/blog.css">` to the `<head>` of every blog page, after `styles.css`.

The CSS variables (`--green`, `--border`, etc.) are defined in `styles.css` on `:root` and are shared — do not redefine them here. The `--font-display` variable is new and belongs in this file since it is blog-only.

```css
/* ─────────────────────────────────────────────────────────
   blog.css — CompoundCalc blog styles
   Load after styles.css. Requires CSS variables from styles.css.
   ───────────────────────────────────────────────────────── */

:root {
  --font-display: 'Lora', Georgia, serif;
}

/* ── Blog page wrapper ───────────────────────────────────── */
.blog-wrapper {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ── Article hero ────────────────────────────────────────── */
.article-hero {
  padding: 4rem 0 3rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 3.5rem;
}

.article-category {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--green);
  background: var(--green-faint);
  border: 1px solid var(--green-muted);
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 1.25rem;
}

.article-hero h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.875rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--ink);
  max-width: 780px;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}

.article-hero-lead {
  font-size: 1.125rem;
  color: var(--text-mid);
  max-width: 680px;
  line-height: 1.7;
  margin-bottom: 1.75rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.article-meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 500;
}

.article-meta-item svg {
  width: 14px;
  height: 14px;
  color: var(--text-faint);
}

.meta-dot {
  width: 3px;
  height: 3px;
  background: var(--border);
  border-radius: 50%;
}

/* ── Two-column layout ───────────────────────────────────── */
.article-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 4rem;
  align-items: start;
}

/* ── Article body typography ─────────────────────────────── */
.article-body p {
  font-size: 1.0625rem;
  color: var(--text-mid);
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

.article-body h2 {
  font-family: var(--font-display);
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--ink);
  margin: 2.75rem 0 0.875rem;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.article-body h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
  margin: 1.75rem 0 0.5rem;
}

.article-body a {
  color: var(--green);
  text-decoration: underline;
  text-decoration-color: var(--green-muted);
  text-underline-offset: 3px;
  transition: text-decoration-color 0.15s;
}

.article-body a:hover {
  text-decoration-color: var(--green);
}

.article-body strong {
  font-weight: 600;
  color: var(--text);
}

.article-body em { font-style: italic; }

.article-body ol,
.article-body ul {
  padding-left: 1.4rem;
  margin-bottom: 1.25rem;
}

.article-body li {
  font-size: 1.0625rem;
  color: var(--text-mid);
  line-height: 1.75;
  margin-bottom: 0.4rem;
}

/* ── Image + text flex blocks ────────────────────────────── */
/*
  Usage:
    <div class="img-text-block">          ← image left, text right
    <div class="img-text-block reverse">  ← image right, text left

  Inside .img-slot, use ONE of:
    <span class="img-slot-icon">📈</span>            ← emoji fallback
    <div class="img-slot-stat">72<span>label</span>  ← large stat
    <img src="..." alt="...">                         ← real photo (production)

  .img-slot variant modifiers:
    (none)          dark background with subtle green grid
    .light          light green gradient background
*/
.img-text-block {
  display: flex;
  gap: 0;
  align-items: stretch;
  margin: 2.5rem 0;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.img-text-block.reverse { flex-direction: row-reverse; }

.img-text-block .img-slot {
  flex: 0 0 320px;
  min-height: 220px;
  background: linear-gradient(135deg, #0f1f12 0%, #1a3a24 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

/* Dark slot: green grid overlay */
.img-text-block .img-slot::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(22,163,74,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22,163,74,0.08) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* Light variant */
.img-text-block .img-slot.light {
  background: linear-gradient(135deg, var(--green-faint) 0%, var(--green-light) 60%, #bbf7d0 100%);
}

.img-text-block .img-slot.light::before {
  background-image:
    linear-gradient(rgba(22,163,74,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22,163,74,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* When a real <img> is used, it fills the slot */
.img-text-block .img-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}

.img-slot-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(134,239,172,0.7);
  background: rgba(255,255,255,0.06);
  padding: 4px 10px;
  border-radius: 999px;
  position: relative;
  z-index: 1;
}

.img-slot.light .img-slot-label {
  color: var(--green-mid);
  background: rgba(255,255,255,0.55);
}

.img-slot-icon {
  font-size: 2.75rem;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}

.img-slot.light .img-slot-icon { filter: none; }

.img-slot-stat {
  position: relative;
  z-index: 1;
  font-family: var(--font-mono);
  font-size: 1.875rem;
  font-weight: 500;
  color: var(--green-muted);
  letter-spacing: -0.02em;
  line-height: 1;
  text-align: center;
}

.img-slot-stat span {
  display: block;
  font-size: 0.72rem;
  color: rgba(134,239,172,0.6);
  font-family: var(--font-body);
  text-align: center;
  margin-top: 4px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.img-slot.light .img-slot-stat { color: var(--green-dark); }
.img-slot.light .img-slot-stat span { color: var(--green-mid); }

.img-text-content {
  flex: 1;
  padding: 1.875rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
}

.img-text-content h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.01em;
  line-height: 1.35;
}

.img-text-content p {
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0;
}

.inline-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--green);
  text-decoration: none;
  transition: gap 0.15s;
  margin-top: 4px;
}

.inline-cta:hover { gap: 10px; }

/* ── Formula block ───────────────────────────────────────── */
/*
  Two variants: default (dark, for multi-line formulas with variable list)
  and .simple (dark with large watermark number — used for Rule of 72)

  Usage (default):
    <div class="formula-block">
      <div class="formula-main">A = P(1 + r/n)<sup>nt</sup></div>
      <ul>
        <li><strong>A</strong> = ...</li>
      </ul>
    </div>

  Usage (simple):
    <div class="formula-block simple" data-watermark="72">
      <div class="formula-main">Years to double = 72 ÷ rate (%)</div>
      <div class="formula-sub">Example: 72 ÷ 9% = 8 years</div>
    </div>
*/
.formula-block {
  background: var(--ink);
  color: #a7f3d0;
  font-family: var(--font-mono);
  font-size: 1.0625rem;
  padding: 1.75rem 2rem;
  border-radius: var(--radius);
  margin: 1.5rem 0;
  position: relative;
  overflow: hidden;
}

/* Watermark — set via data-watermark attribute and CSS attr() */
.formula-block::before {
  content: attr(data-watermark);
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: 6rem;
  font-weight: 500;
  color: rgba(22,163,74,0.07);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.formula-main {
  font-size: 1.375rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.formula-sub {
  font-size: 0.9rem;
  color: #6ee7b7;
  position: relative;
  z-index: 1;
}

.formula-block ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  z-index: 1;
}

.formula-block ul li {
  font-size: 0.82rem;
  color: #6ee7b7;
  line-height: 1.6;
}

.formula-block ul li strong { color: #a7f3d0; }

/* ── Tables ──────────────────────────────────────────────── */
/*
  Always wrap in .table-wrap for overflow handling on mobile.

  Row modifier classes (add to <tr>):
    .highlight  — green tint, bold text (use for totals / key rows)
    .danger     — red tint (use for debt / negative rows)
    .exact      — amber tint (use for "exact" / notable accuracy rows)
*/
.table-wrap {
  overflow-x: auto;
  margin: 1.5rem 0;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.blog-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.blog-table thead th {
  background: var(--bg-soft);
  padding: 10px 16px;
  text-align: left;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-faint);
  border-bottom: 1px solid var(--border);
}

.blog-table tbody td {
  padding: 11px 16px;
  border-bottom: 1px solid var(--border);
  color: var(--text-mid);
  font-size: 0.9rem;
}

.blog-table tbody tr:last-child td { border-bottom: none; }
.blog-table tbody tr:nth-child(even) td { background: var(--bg-soft); }

.blog-table .highlight td {
  background: var(--green-faint) !important;
  font-weight: 600;
  color: var(--green-dark);
}

.blog-table .danger td {
  background: #fef2f2 !important;
  color: #991b1b;
  font-weight: 500;
}

.blog-table .exact td {
  background: #fffbeb !important;
  color: #92400e;
  font-weight: 500;
}

/* ── Callout block ───────────────────────────────────────── */
/*
  Variants:
    (default)   green — for key insights, positive callouts
    .warning    amber — for cautions and "watch out" moments

  Usage:
    <div class="callout">
      <p>Key insight text here.</p>
    </div>

    <div class="callout warning">
      <p>Warning or caution text here.</p>
    </div>
*/
.callout {
  background: var(--bg-tint);
  border-left: 3px solid var(--green);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 1.25rem 1.5rem;
  margin: 1.75rem 0;
}

.callout p {
  margin: 0;
  font-size: 1rem;
  color: var(--green-dark);
  line-height: 1.65;
}

.callout strong { color: var(--green-dark); }

.callout.warning {
  background: #fef9ec;
  border-left-color: #f59e0b;
}

.callout.warning p { color: #78350f; }
.callout.warning strong { color: #78350f; }

/* ── Scenario cards ──────────────────────────────────────── */
/*
  Used in Article 3 only. Three colour variants applied via
  modifier classes on .scenario-header:
    .s1  neutral / grey  (Cautious Saver)
    .s2  green           (Consistent Investor)
    .s3  dark/ink        (Serious Builder)

  Usage:
    <div class="scenario-card">
      <div class="scenario-header s2">
        <span class="scenario-tag">Scenario 2</span>
        <span class="scenario-result">~17.5 years</span>
      </div>
      <div class="scenario-body">
        <div class="scenario-inputs"> ... </div>
        <div class="scenario-outputs"> ... </div>
      </div>
      <div class="scenario-narrative"> ... </div>
    </div>
*/
.scenario-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: 2rem 0;
}

.scenario-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.125rem 1.5rem;
  border-bottom: 1px solid var(--border);
}

.scenario-header.s1 { background: var(--bg-soft); }
.scenario-header.s2 { background: var(--green-faint); }
.scenario-header.s3 { background: var(--ink); }

.scenario-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
}

.s1 .scenario-tag { background: var(--border); color: var(--text-muted); }
.s2 .scenario-tag { background: var(--green-muted); color: var(--green-dark); }
.s3 .scenario-tag { background: rgba(22,163,74,0.2); color: var(--green-muted); }

.scenario-result {
  font-family: var(--font-mono);
  font-weight: 500;
}

.s1 .scenario-result { font-size: 1.25rem; color: var(--text-mid); }
.s2 .scenario-result { font-size: 1.25rem; color: var(--green-dark); }
.s3 .scenario-result { font-size: 1.25rem; color: var(--green-muted); }

.scenario-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.scenario-inputs {
  padding: 1.25rem 1.5rem;
  border-right: 1px solid var(--border);
}

.scenario-inputs h4,
.scenario-outputs h4 {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 0.75rem;
}

.scenario-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 5px 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.875rem;
}

.scenario-row:last-child { border-bottom: none; }
.scenario-row .label { color: var(--text-muted); }
.scenario-row .value {
  font-weight: 600;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.scenario-outputs {
  padding: 1.25rem 1.5rem;
  background: var(--bg-soft);
}

/* Per-scenario output backgrounds */
.scenario-card:nth-of-type(2) .scenario-outputs { background: var(--green-faint); }
.scenario-card:nth-of-type(3) .scenario-outputs { background: #f0fdf4; }

.output-big {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 500;
  color: var(--green-dark);
  line-height: 1;
  margin-bottom: 4px;
}

.output-sub {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.output-breakdown {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.output-breakdown-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.825rem;
  color: var(--text-muted);
}

.output-breakdown-row strong {
  color: var(--text);
  font-weight: 600;
}

.scenario-narrative {
  padding: 1rem 1.5rem;
  background: var(--bg);
  border-top: 1px solid var(--border);
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.65;
}

.scenario-card:nth-of-type(2) .scenario-narrative { background: #fafffe; }

/* ── FAQ accordion ───────────────────────────────────────── */
/*
  Toggle open/closed by adding/removing the .open class on .faq-item.
  The inline onclick in the reference HTML handles this — copy it as-is
  or replace with the shared faq.js event listener below.

  Usage:
    <div class="faq-item open">   ← .open = expanded by default
    <div class="faq-item">        ← collapsed by default
*/
.faq-section { margin: 2.5rem 0; }

.faq-item {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 10px;
  overflow: hidden;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.125rem 1.25rem;
  cursor: pointer;
  background: var(--bg);
  transition: background 0.12s;
  border: none;
  width: 100%;
  text-align: left;
}

.faq-question:hover { background: var(--bg-soft); }

.faq-question h3 {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  line-height: 1.4;
}

.faq-chevron {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background: var(--green-faint);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background 0.15s;
}

.faq-chevron svg { width: 10px; height: 10px; color: var(--green); }

.faq-item.open .faq-chevron {
  transform: rotate(180deg);
  background: var(--green);
}

.faq-item.open .faq-chevron svg { color: #fff; }

.faq-answer {
  display: none;
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid var(--border);
}

.faq-answer p {
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.75;
  margin: 1rem 0 0;
}

.faq-item.open .faq-answer { display: block; }

/* ── Affiliate block ─────────────────────────────────────── */
/*
  Used at the bottom of Article 3. Reusable for any article
  that warrants an affiliate CTA.

  Usage:
    <div class="affiliate-block">
      <h3>Ready to start investing?</h3>
      <p>Description text.</p>
      <a href="AFFILIATE_LINK" ... class="affiliate-link">Link text →</a>
      <span class="affiliate-note">Disclosure text.</span>
    </div>
*/
.affiliate-block {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  background: var(--bg-soft);
  margin: 2rem 0;
}

.affiliate-block h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.375rem;
}

.affiliate-block p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.affiliate-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--green);
  text-decoration: none;
  transition: gap 0.15s;
}

.affiliate-link:hover { gap: 10px; }

.affiliate-note {
  display: block;
  font-size: 0.75rem;
  color: var(--text-faint);
  margin-top: 0.625rem;
  line-height: 1.5;
}

/* ── CTA button ──────────────────────────────────────────── */
.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--green);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: var(--radius);
  text-decoration: none;
  transition: background 0.15s, transform 0.1s;
  margin: 1.25rem 0;
}

.btn-cta:hover {
  background: var(--green-dark);
  transform: translateY(-1px);
  text-decoration: none;
  color: #fff;
}

/* ── Share bar ───────────────────────────────────────────── */
.share-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 1.25rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin: 2.5rem 0;
}

.share-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-right: 4px;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg);
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.15s;
  text-decoration: none;
}

.share-btn:hover {
  border-color: var(--green-muted);
  color: var(--green);
  background: var(--green-faint);
}

/* ── Sidebar ─────────────────────────────────────────────── */
.sidebar { position: sticky; top: 80px; }

.sidebar-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.sidebar-card-header {
  background: var(--green);
  padding: 1.125rem 1.25rem;
}

.sidebar-card-header p {
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  margin: 0 0 2px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.sidebar-card-header h3 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.sidebar-card-body {
  padding: 1.25rem;
  background: var(--bg);
}

.sidebar-card-body p {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.sidebar-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-input-group label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.sidebar-input-group input {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 9px 12px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text);
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}

.sidebar-input-group input:focus { border-color: var(--green); }

/* Inline result display — used in Rule of 72 sidebar */
.sidebar-result {
  background: var(--green-faint);
  border: 1px solid var(--green-muted);
  border-radius: var(--radius);
  padding: 10px 12px;
  margin-top: 4px;
  font-size: 0.875rem;
  color: var(--green-dark);
  font-weight: 500;
  display: none; /* shown via JS when input has a value */
}

.btn-sidebar {
  display: block;
  width: 100%;
  background: var(--green);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 10px;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.15s;
  text-align: center;
  text-decoration: none;
}

.btn-sidebar:hover { background: var(--green-dark); }

/* ── Table of contents (sidebar) ─────────────────────────── */
.toc-card { padding: 1.25rem; }

.toc-card h4 {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 0.75rem;
}

.toc-list { list-style: none; }
.toc-list li { margin-bottom: 2px; }

.toc-list a {
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 6px;
  transition: background 0.12s, color 0.12s;
}

.toc-list a::before {
  content: '';
  width: 4px;
  height: 4px;
  background: var(--border);
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.12s;
}

.toc-list a:hover { background: var(--bg-soft); color: var(--green); }
.toc-list a:hover::before { background: var(--green); }

/* ── Blog listing page ───────────────────────────────────── */
/*
  Used on /blog/index.html — three article cards in a grid.

  Usage:
    <div class="blog-listing-grid">
      <article class="blog-card">
        <div class="blog-card-img"> ... </div>
        <div class="blog-card-body"> ... </div>
      </article>
    </div>
*/
.blog-listing-header {
  padding: 4rem 0 2.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 3rem;
}

.blog-listing-header h1 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.blog-listing-header p {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 560px;
}

.blog-listing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.blog-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.15s;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

.blog-card:hover {
  box-shadow: 0 8px 30px rgba(0,0,0,0.07);
  transform: translateY(-2px);
}

.blog-card-img {
  height: 160px;
  background: linear-gradient(135deg, #0f1f12 0%, #1a3a24 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  position: relative;
  overflow: hidden;
}

.blog-card-img::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(22,163,74,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22,163,74,0.07) 1px, transparent 1px);
  background-size: 24px 24px;
}

.blog-card-img span { position: relative; z-index: 1; }

.blog-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-card-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.blog-card-category {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--green);
}

.blog-card-title {
  font-family: var(--font-display);
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.blog-card-excerpt {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
  flex: 1;
}

.blog-card-meta {
  font-size: 0.775rem;
  color: var(--text-faint);
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 960px) {
  .article-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .sidebar { position: static; }

  .blog-listing-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 680px) {
  .blog-wrapper { padding: 0 1.125rem; }

  .article-hero { padding: 2.5rem 0 2rem; }

  .img-text-block,
  .img-text-block.reverse {
    flex-direction: column;
  }

  .img-text-block .img-slot {
    flex: none;
    width: 100%;
    min-height: 160px;
  }

  .img-text-content,
  .img-text-block.reverse .img-text-content {
    padding: 1.25rem 1.25rem 1.5rem;
  }

  .scenario-body {
    grid-template-columns: 1fr;
  }

  .scenario-inputs {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .blog-listing-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Part 3 — Shared JavaScript: `blog.js`

Create `/assets/js/blog.js`. Load it with `<script src="/assets/js/blog.js" defer></script>` on every blog page.

```javascript
/* ─────────────────────────────────────────────────────────
   blog.js — CompoundCalc shared blog behaviour
   ───────────────────────────────────────────────────────── */

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
```

**Update the three article HTML files:**

In all three reference files, remove the inline `<script>` block at the bottom and replace the inline `onclick` attributes with the `data-action` and `id` attributes that `blog.js` targets. Specifically:

1. On the "Copy Link" `<button>` in every share bar, remove the `onclick` and add `data-action="copy"`.
2. In Article 2 (`rule-of-72.html`), change the rate input `id` to `rule72-rate` and the result div `id` to `rule72-result`. Remove the `oninput` attribute.
3. In Article 1, change the sidebar input `id` to `sidebar-monthly` and the CTA button `id` to `sidebar-grow-btn`.
4. In Article 3, change the sidebar input `id` to `sidebar-goal-monthly` and the button `id` to `sidebar-goal-btn`. Remove the `onclick`.
5. In each article, add a `<script id="toc-map" type="application/json">` block with the heading → ID mapping (see template below).

---

## Part 4 — Blog Template (`blog-template.html`)

Save this as `/blog/blog-template.html`. Copy it when creating any new article — never start from scratch.

```html
<!DOCTYPE html>
<html lang="en-ZA">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- ① Update for every article -->
  <title>ARTICLE TITLE | CompoundCalc</title>
  <meta name="description" content="META DESCRIPTION — 150–160 chars">
  <link rel="canonical" href="https://compoundcalc.co.za/blog/SLUG">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&family=Lora:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/assets/css/styles.css">
  <link rel="stylesheet" href="/assets/css/blog.css">

  <!-- GA4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');
  </script>

  <!-- ② FAQ schema — Article 1 only. Remove for other articles. -->
  <!-- <script type="application/ld+json"> ... </script> -->
</head>
<body>

  <!-- Navigation -->
  <nav class="nav">
    <a href="/" class="nav-logo">
      <div class="nav-logo-icon">
        <svg viewBox="0 0 16 16" fill="none"><path d="M2 12 L5 8 L8 9.5 L11 5 L14 2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      CompoundCalc
    </a>
    <ul class="nav-links">
      <li><a href="/savings-calculator">Savings Calculator</a></li>
      <li><a href="/investment-goal-calculator">Goal Calculator</a></li>
      <li><a href="/compare-investments">Compare</a></li>
      <li><a href="/blog" class="active">Blog</a></li>
    </ul>
  </nav>

  <!-- Article -->
  <div class="blog-wrapper">
    <header class="article-hero">
      <div class="article-category">
        <!-- ③ Category label, e.g. "Investing Basics" -->
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5"/></svg>
        CATEGORY
      </div>
      <h1>ARTICLE TITLE</h1>
      <p class="article-hero-lead">LEAD PARAGRAPH — 2–3 sentences, plain text, no links.</p>
      <div class="article-meta">
        <span class="article-meta-item">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3.5l2 1.5" stroke-linecap="round"/></svg>
          X min read
        </span>
        <span class="meta-dot"></span>
        <span class="article-meta-item">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M5 2v2M11 2v2M2 7h12" stroke-linecap="round"/></svg>
          Updated MONTH YYYY
        </span>
        <span class="meta-dot"></span>
        <span class="article-meta-item">CompoundCalc Team</span>
      </div>
    </header>

    <div class="article-layout">

      <!-- Main content -->
      <main class="article-body">

        <!-- Article content goes here -->

        <!-- Share bar — always at bottom of content, above FAQ if present -->
        <div class="share-bar">
          <span class="share-label">Share:</span>
          <a href="https://wa.me/?text=ENCODED_URL" class="share-btn" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.278 7.038L.786 23.214l4.296-1.374A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.188 0-4.22-.633-5.94-1.723l-.426-.253-3.804 1.217 1.065-3.695-.28-.452A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            WhatsApp
          </a>
          <button class="share-btn" data-action="copy">Copy Link</button>
        </div>

      </main>

      <!-- Sidebar -->
      <aside class="sidebar">
        <!-- ④ Swap in the article-specific sidebar widget (see Part 5) -->

        <!-- Table of contents — always present -->
        <div class="sidebar-card">
          <div class="toc-card">
            <h4>In this article</h4>
            <ul class="toc-list">
              <!-- ⑤ Add one <li> per h2 in the article -->
              <li><a href="#section-id">Section title</a></li>
            </ul>
          </div>
        </div>
      </aside>

    </div>
  </div>

  <!-- Footer — identical across all pages -->
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="logo-text">CompoundCalc.co.za</div>
        <p>Free compound interest calculator for South African investors.</p>
      </div>
      <div class="footer-col">
        <h5>Calculators</h5>
        <ul>
          <li><a href="/savings-calculator">Grow Savings</a></li>
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
      <p>Disclaimer: This tool is for informational purposes only and does not constitute financial advice.</p>
      <p>© 2026 CompoundCalc. Built in South Africa 🇿🇦</p>
    </div>
  </footer>

  <!-- TOC heading ID map — update per article -->
  <script id="toc-map" type="application/json">
  {
    "Section Heading One": "section-one",
    "Section Heading Two": "section-two"
  }
  </script>

  <!-- Blog JS -->
  <script src="/assets/js/blog.js" defer></script>

</body>
</html>
```

---

## Part 5 — Article-Specific Sidebar Widgets

Each of the three articles has a different interactive sidebar widget. Use the correct one when building each page.

### Article 1 — Grow Savings mini-calculator

```html
<div class="sidebar-card">
  <div class="sidebar-card-header">
    <p>Free Tool</p>
    <h3>Try the calculator</h3>
  </div>
  <div class="sidebar-card-body">
    <p>Enter a monthly amount to see your 20-year projection instantly.</p>
    <div class="sidebar-input-group">
      <label for="sidebar-monthly">Monthly contribution (ZAR)</label>
      <input type="number" id="sidebar-monthly" placeholder="e.g. 1500" min="0">
    </div>
    <a href="/" class="btn-sidebar" id="sidebar-grow-btn">See Growth →</a>
  </div>
</div>
```

### Article 2 — Rule of 72 live calculator

```html
<div class="sidebar-card">
  <div class="sidebar-card-header">
    <p>Rule of 72 Calculator</p>
    <h3>How long to double?</h3>
  </div>
  <div class="sidebar-card-body">
    <p>Enter your expected annual return to see your doubling time instantly.</p>
    <div class="sidebar-input-group">
      <label for="rule72-rate">Annual return (%)</label>
      <input type="number" id="rule72-rate" placeholder="e.g. 10" min="0.1" max="100" step="0.1">
      <div class="sidebar-result" id="rule72-result"></div>
    </div>
    <a href="/" class="btn-sidebar">Full projection →</a>
  </div>
</div>
```

### Article 3 — Goal Calculator mini-widget

```html
<div class="sidebar-card">
  <div class="sidebar-card-header">
    <p>Goal Calculator</p>
    <h3>How long to R1M?</h3>
  </div>
  <div class="sidebar-card-body">
    <p>Enter your monthly contribution to see how many years to R1 million.</p>
    <div class="sidebar-input-group">
      <label for="sidebar-goal-monthly">Monthly contribution (ZAR)</label>
      <input type="number" id="sidebar-goal-monthly" placeholder="e.g. 2500" min="0">
    </div>
    <button class="btn-sidebar" id="sidebar-goal-btn">Calculate my timeline →</button>
  </div>
</div>
```

---

## Part 6 — Blog Listing Page (`/blog/index.html`)

Build this page using the `blog-template.html` structure (nav + footer), replacing the article layout with:

```html
<div class="blog-wrapper">
  <header class="blog-listing-header">
    <h1>Financial Blog</h1>
    <p>Guides, tools, and worked examples for South African investors.</p>
  </header>

  <div class="blog-listing-grid">

    <a href="/blog/compound-interest-south-africa" class="blog-card">
      <div class="blog-card-img"><span>📈</span></div>
      <div class="blog-card-body">
        <div class="blog-card-category">Investing Basics</div>
        <div class="blog-card-title">Compound Interest Calculator South Africa (2026 Guide)</div>
        <div class="blog-card-excerpt">Use the free calculator to see exactly how your savings grow with monthly contributions, inflation adjustment, and a year-by-year breakdown.</div>
        <div class="blog-card-meta"><span>5 min read</span><span>May 2026</span></div>
      </div>
    </a>

    <a href="/blog/rule-of-72" class="blog-card">
      <div class="blog-card-img"><span>✌️</span></div>
      <div class="blog-card-body">
        <div class="blog-card-category">Mental Maths</div>
        <div class="blog-card-title">The Rule of 72: How to Calculate When Your Money Doubles</div>
        <div class="blog-card-excerpt">One number, one division — and you instantly know how long any investment takes to double. The shortcut every investor should have memorised.</div>
        <div class="blog-card-meta"><span>4 min read</span><span>May 2026</span></div>
      </div>
    </a>

    <a href="/blog/how-long-to-save-1-million-rand" class="blog-card">
      <div class="blog-card-img"><span>🎯</span></div>
      <div class="blog-card-body">
        <div class="blog-card-category">Goal Planning</div>
        <div class="blog-card-title">How Long to Save R1 Million? (Real Examples + Calculator)</div>
        <div class="blog-card-excerpt">Three realistic scenarios — R1,000/month, R2,500/month, R5,000/month — with full breakdowns of what you contribute vs. what compounding builds for you.</div>
        <div class="blog-card-meta"><span>5 min read</span><span>May 2026</span></div>
      </div>
    </a>

  </div>
</div>
```

---

## Part 7 — Images (Placeholder → Production)

All three article files use placeholder `.img-slot` divs with emoji and a "Replace with image" label. When real images are available, swap the placeholder by replacing the slot contents with a single `<img>` tag — the CSS handles the rest:

```html
<!-- Before (placeholder) -->
<div class="img-slot">
  <span class="img-slot-icon">📈</span>
  <span class="img-slot-label">Replace with image</span>
</div>

<!-- After (real image) -->
<div class="img-slot">
  <img src="/assets/blog/compound-growth-curve.webp"
       alt="Compound growth curve showing exponential rise over time"
       width="320" height="220" loading="lazy">
</div>
```

Image spec: `.webp` format, `320×220px` minimum (2× for retina: `640×440px`), explicit `width` and `height` attributes to prevent layout shift, `loading="lazy"`.

---

## QA Checklist

**Files created:**
- [ ] `/assets/css/blog.css` — created from Part 2
- [ ] `/assets/js/blog.js` — created from Part 3
- [ ] `/blog/blog-template.html` — blank template for future use
- [ ] `/blog/index.html` — listing page with three article cards
- [ ] `/blog/compound-interest-south-africa.html`
- [ ] `/blog/rule-of-72.html`
- [ ] `/blog/how-long-to-save-1-million-rand.html`

**Styles:**
- [ ] `blog.css` loaded after `styles.css` on all blog pages — no style conflicts
- [ ] CSS variables (`--green`, `--border`, etc.) resolve correctly — not redefined in `blog.css`
- [ ] `--font-display: 'Lora'` resolves — Lora loaded via Google Fonts or self-hosted
- [ ] No inline `<style>` blocks remaining in the three article files

**JavaScript:**
- [ ] `blog.js` loaded with `defer` on all blog pages
- [ ] No inline `onclick` attributes remaining in the three article files
- [ ] FAQ accordion opens and closes correctly on all three articles
- [ ] "Copy Link" button copies URL and shows "Copied! ✓" for 2 seconds
- [ ] Article 1 sidebar: entering a monthly amount and clicking "See Growth" navigates to `/?m=VALUE&y=20&tab=grow`
- [ ] Article 2 sidebar: typing a rate shows the Rule of 72 result inline without a page load
- [ ] Article 3 sidebar: clicking "Calculate my timeline" navigates to `/investment-goal-calculator?goal=1000000&m=VALUE&r=10`
- [ ] TOC links scroll to the correct heading sections on all three articles

**Content:**
- [ ] `EASYEQUITIES_AFFILIATE_LINK` replaced with Ali's real affiliate URL in Article 3 affiliate block
- [ ] `G-XXXXXXXXXX` replaced with the real GA4 Measurement ID on all blog pages
- [ ] FAQ schema JSON-LD present in `<head>` of Article 1 only (from `CompCalc-BlogArticles.md`)
- [ ] No placeholder text ("ARTICLE TITLE", "SLUG", "CATEGORY", "ENCODED_URL") in published files

**Layout and rendering:**
- [ ] Two-column layout (article + sidebar) renders correctly at 960px+
- [ ] Layout collapses to single column at ≤960px — sidebar appears below article
- [ ] Image+text flex blocks stack vertically on mobile (≤680px)
- [ ] Scenario cards in Article 3 grid to single column on mobile
- [ ] All tables scroll horizontally on mobile — no horizontal overflow on page body
- [ ] Formula blocks render correctly (dark background, mono font, watermark number visible in Article 2)
- [ ] Blog listing grid: 3 columns → 2 columns (≤960px) → 1 column (≤680px)

**SEO:**
- [ ] All three article pages have unique `<title>` and `<meta description>` tags
- [ ] Canonical URL set on each article
- [ ] `/blog/index.html` has its own `<title>` and `<meta description>`
- [ ] `sitemap.xml` updated with all four new URLs (three articles + blog index) — `lastmod` set to publish date
- [ ] FAQ schema validated at `https://validator.schema.org` for Article 1
- [ ] No broken internal links — all `href` values resolve

---

*Document version: 1.0*  
*Parent documents: CompCalc-BlogArticles.md, CompCalc-Setup.md*  
*Questions: ali@openmindi.co.za / +27 62 370 5952*
