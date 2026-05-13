# CompoundCalc — Blog Listing Layout Update
**Prepared for:** Antigravity  
**Prepared by:** Ali (ali@openmindi.co.za)  
**Files to edit:** `/assets/css/blog.css` and `/blog/index.html`  
**Reference:** `blog.png` (attached) — 3-column card grid, category tag overlaid on image, "Read more →" link at card bottom

---

## What's Changing

The current live `/blog` page renders cards as a single tall column with a large image on the left and text on the right. The target layout is a **3-column card grid** where:

- The image fills the **full top** of the card
- The **category tag** is overlaid on the image (bottom-left, pill badge)
- Card body contains: read time + date → title → excerpt → "Read more →"
- Cards lift on hover with a soft shadow

Two things need updating: the CSS block in `blog.css` and the HTML in `blog/index.html`.

---

## Change 1 — Replace Blog Listing CSS in `blog.css`

**Find** the entire blog listing section (from the comment through to the end of `.blog-card-meta`):

```css
/* ── Blog listing page ───────────────────────────────────── */
```
…all the way to:
```css
.blog-card-meta {
  font-size: 0.775rem;
  color: var(--text-faint);
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
}
```

**Replace the entire block with:**

```css
/* ── Blog listing page ───────────────────────────────────── */
/*
  Used on /blog/index.html.

  Card structure:
    <a href="..." class="blog-card">
      <div class="blog-card-img">
        <img ...>                          ← real image, OR omit for gradient fallback
        <span class="blog-card-tag">Category</span>   ← overlaid on image
      </div>
      <div class="blog-card-body">
        <div class="blog-card-meta">
          <span>X min read</span>
          <span>Month YYYY</span>
        </div>
        <div class="blog-card-title">Title</div>
        <div class="blog-card-excerpt">Excerpt…</div>
        <span class="blog-card-readmore">Read more →</span>
      </div>
    </a>
*/

.blog-listing-header {
  padding: 3.5rem 0 2.5rem;
  margin-bottom: 2.5rem;
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

/* ── Grid ──────────────────────────────────────────────────── */
.blog-listing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;
}

/* ── Card shell ────────────────────────────────────────────── */
.blog-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease, transform 0.15s ease;
}

.blog-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
}

/* ── Card image area ───────────────────────────────────────── */
.blog-card-img {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #0b1f14 0%, #163d22 60%, #1a4a28 100%);
  flex-shrink: 0;
}

/* Green grid overlay — shown when no real image */
.blog-card-img::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(22, 163, 74, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22, 163, 74, 0.08) 1px, transparent 1px);
  background-size: 26px 26px;
  z-index: 0;
}

/* Real photo — fills slot, hides grid overlay */
.blog-card-img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

/* Gradient scrim — ensures tag is readable over any photo */
.blog-card-img::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
  z-index: 2;
}

/* Category tag — overlaid bottom-left on image */
.blog-card-tag {
  position: absolute;
  bottom: 12px;
  left: 14px;
  z-index: 3;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #fff;
  background: var(--green-secondary, #15803d);
  padding: 3px 10px;
  border-radius: 999px;
  line-height: 1.6;
}

/* ── Card body ─────────────────────────────────────────────── */
.blog-card-body {
  padding: 1.25rem 1.375rem 1.375rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.blog-card-meta {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 0.775rem;
  color: var(--text-faint);
  font-weight: 500;
}

.blog-card-meta span + span::before {
  content: '·';
  margin-right: 0.875rem;
  color: var(--border);
}

.blog-card-title {
  font-family: var(--font-display);
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.blog-card-excerpt {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.65;
  flex: 1;

  /* Clamp to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card-readmore {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--green);
  margin-top: 0.25rem;
  transition: gap 0.15s;
}

.blog-card:hover .blog-card-readmore { gap: 8px; }
```

---

## Change 2 — Update Responsive Breakpoints in `blog.css`

The responsive rules for `.blog-listing-grid` are in the `@media` blocks at the bottom of `blog.css`. These are already correct in the existing file — confirm they read exactly:

```css
@media (max-width: 960px) {
  /* ... existing rules ... */
  .blog-listing-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 680px) {
  /* ... existing rules ... */
  .blog-listing-grid {
    grid-template-columns: 1fr;
  }
}
```

If they already say this, no change needed. If they're missing, add them.

---

## Change 3 — Replace `/blog/index.html` main content

Replace everything between the `<nav>` closing tag and the `<footer>` opening tag with the following:

```html
  <div class="blog-wrapper">

    <header class="blog-listing-header">
      <h1>Financial Blog</h1>
      <p>Guides, tools, and worked examples for South African investors.</p>
    </header>

    <div class="blog-listing-grid">

      <!-- Card 1 — Compound Interest -->
      <a href="/blog/compound-interest-south-africa" class="blog-card">
        <div class="blog-card-img">
          <!-- Replace src with real image when available -->
          <!-- <img src="/assets/blog/compound-interest-cover.webp"
                   alt="Stacked gold coins with a rising green growth curve"
                   width="400" height="200" loading="lazy"> -->
          <span class="blog-card-tag">Investing Basics</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span>5 min read</span>
            <span>May 2026</span>
          </div>
          <div class="blog-card-title">Compound Interest Calculator South Africa (2026 Guide)</div>
          <div class="blog-card-excerpt">See exactly how your savings grow with our free tool and local examples. Monthly contributions, inflation adjustment, year-by-year breakdown.</div>
          <span class="blog-card-readmore">Read more →</span>
        </div>
      </a>

      <!-- Card 2 — Rule of 72 -->
      <a href="/blog/rule-of-72" class="blog-card">
        <div class="blog-card-img">
          <!-- <img src="/assets/blog/rule-of-72-cover.webp"
                   alt="A large 72 on a dark green background"
                   width="400" height="200" loading="lazy"> -->
          <span class="blog-card-tag">Strategies</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span>4 min read</span>
            <span>May 2026</span>
          </div>
          <div class="blog-card-title">The Rule of 72: How Fast Can You Double Your Money?</div>
          <div class="blog-card-excerpt">A simple mental shortcut to estimate investment growth without a calculator. One number, one division — instant insight on any rate.</div>
          <span class="blog-card-readmore">Read more →</span>
        </div>
      </a>

      <!-- Card 3 — R1 Million -->
      <a href="/blog/how-long-to-save-1-million-rand" class="blog-card">
        <div class="blog-card-img">
          <!-- <img src="/assets/blog/r1-million-cover.webp"
                   alt="A gold briefcase with R1 million written on it"
                   width="400" height="200" loading="lazy"> -->
          <span class="blog-card-tag">Milestones</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span>5 min read</span>
            <span>May 2026</span>
          </div>
          <div class="blog-card-title">How Long Will It Take to Save R1 Million?</div>
          <div class="blog-card-excerpt">A realistic look at timelines, interest rates, and exactly what it takes to hit seven figures — with three worked scenarios in ZAR.</div>
          <span class="blog-card-readmore">Read more →</span>
        </div>
      </a>

    </div>
  </div>
```

> **Note on images:** The three cover images are currently live on the site (visible in the screenshot you shared). When uncommenting the `<img>` tags above, confirm the `src` paths match the actual filenames AG used.

---

## Summary of Structural Changes

| Element | Before | After |
|---------|--------|-------|
| Grid layout | Single-column tall cards (image left, text right) | 3-column card grid |
| Image position | Left side of card (flex row) | Full-width top of card |
| Category label | Plain text inside card body | Pill badge overlaid on image, bottom-left |
| Image height | Variable / large | Fixed 200px, `object-fit: cover` |
| Card body order | Category → title → excerpt → meta | Meta (date/time) → title → excerpt → Read more |
| Hover state | Subtle shadow | Shadow + 3px upward lift |
| "Read more" | Not present | Green "Read more →" that widens gap on card hover |
| Excerpt length | Unconstrained | Clamped to 3 lines |

---

## QA Checklist

**Layout:**
- [ ] 3 cards visible side-by-side on desktop (≥960px)
- [ ] 2 cards per row at tablet (≤960px)
- [ ] 1 card full-width at mobile (≤680px)
- [ ] No card stretches taller than its neighbours — grid rows align at top

**Card image area:**
- [ ] Image area is 200px tall on all three cards
- [ ] If real `<img>` present: fills slot, no letterboxing or distortion (`object-fit: cover`)
- [ ] If no `<img>` (gradient fallback): dark green gradient + grid visible — no broken image icon
- [ ] Gradient scrim visible at bottom of image area — category tag text readable on any image
- [ ] Category tag badge renders in bottom-left corner of image — not cut off, not overflowing

**Card body:**
- [ ] Meta row (read time + date) appears above the title
- [ ] Title is bold, serif (Lora)
- [ ] Excerpt is clamped to 3 lines — no cards taller than others due to long excerpts
- [ ] "Read more →" is visible at bottom of every card
- [ ] On card hover: "Read more →" arrow gap widens from 4px to 8px
- [ ] Card lifts 3px on hover — no jitter or layout shift

**Links:**
- [ ] All three cards link to their correct article URLs
- [ ] Nav "Blog" link is active/highlighted on this page
- [ ] Footer links all resolve

---

*Document version: 1.0*  
*Parent document: CompCalc-BlogStyle-AG.md*  
*Questions: ali@openmindi.co.za / +27 62 370 5952*
