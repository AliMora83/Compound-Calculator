# Handoff Report: Site Layout & AdSense Placeholder Survey

**Agent**: `explorer_survey_2`  
**Working Directory**: `/Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/explorer_survey_2/`  
**Timestamp**: 2026-10-01T18:10:00Z  
**Target Milestone**: Site Layout Survey & Responsive AdSense Placeholder Design

---

## 1. Observation

### 1.1 Complete Repository HTML Inventory (16 Pages Total)
A full-repository file system scan identified exactly 16 HTML pages across the project:

| Category | File Path | Current Title / Function | Existing Ad Slots Present |
|---|---|---|---|
| **Main Calculator** | `index.html` | Compound Interest Calculator (Tabs: Grow, Goal, Compare) | 1 slot (`.ad-rectangle` in Tab Grow line 365) |
| **Dedicated Tool** | `investment-goal-calculator.html` | Investment Goal Calculator | 1 slot (`.ad-leaderboard` line 164) |
| **Dedicated Tool** | `retirement-calculator.html` | Retirement Calculator | 1 slot (`.ad-leaderboard` line 201) |
| **Dedicated Tool** | `compare-investments.html` | Compare Investments Tool | 1 slot (`.ad-leaderboard` line 202) |
| **Blog Index** | `blog/index.html` | Financial Guides & Calculators Hub | 1 slot (`.ad-multiplex` line 107) |
| **Blog Template** | `blog/blog-template.html` | Canonical Article Template | 2 slots (`.ad-in-article` line 92, `.ad-sidebar-sticky` line 133) |
| **Blog Post 1** | `blog/compound-interest-south-africa.html` | Compound Interest Guide South Africa | 2 slots (`.ad-in-article` line 230, `.ad-sidebar-sticky` line 606) |
| **Blog Post 2** | `blog/etfs-vs-traditional-savings-accounts.html` | ETFs vs Savings Accounts | 2 slots (`.ad-in-article` line 159, `.ad-sidebar-sticky` line 357) |
| **Blog Post 3** | `blog/how-long-to-save-1-million-rand.html` | How Long to Save R1 Million | 2 slots (`.ad-in-article` line 159, `.ad-sidebar-sticky` line 349) |
| **Blog Post 4** | `blog/maximize-compound-interest-monthly-savings.html` | Maximize Monthly Savings | 2 slots (`.ad-in-article` line 157, `.ad-sidebar-sticky` line 365) |
| **Blog Post 5** | `blog/rule-of-72.html` | The Rule of 72 | 2 slots (`.ad-in-article` line 138, `.ad-sidebar-sticky` line 313) |
| **Blog Post 6** | `blog/tax-free-savings-account-calculator-south-africa.html` | Tax-Free Savings Account Guide | 2 slots (`.ad-in-article` line 186, `.ad-sidebar-sticky` line 430) |
| **Legal / Policy** | `about.html` | About Us & Financial Disclaimers | 0 slots |
| **Legal / Policy** | `privacy-policy.html` | Privacy Policy | 0 slots |
| **Legal / Policy** | `terms-of-service.html` | Terms of Service | 0 slots |
| **Diagnostic** | `debug-adsense.html` | AdSense Debugger & Verification Harness | 6 demo slots (`.ad-slot` lines 219, 233, 247, 261, 275, 308) |

### 1.2 Global AdSense Script Baseline
All 16 HTML documents already include the official asynchronous AdSense script tag inside `<head>`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6017523378494978"
     crossorigin="anonymous"></script>
```
*Exact client publisher ID*: `ca-pub-6017523378494978`.

### 1.3 CSS Stylesheets & Layout Rules
There are 3 CSS stylesheets in `assets/css/`:
1. `assets/css/styles.css` (Global styles, design tokens, typography, grid layouts, forms, calculator panels, ad slot rules)
2. `assets/css/blog.css` (Blog layout, typography, article prose, sidebar, Toc map styles)
3. `assets/css/footer.css` (Global site footer)

Key layout containers and breakpoints observed:
- **Calculator Container**: `.calc-wrap` (`max-width: 960px; margin: 0 auto; padding: 2.5rem 1.5rem;` in `styles.css:370-374`).
- **Calculator 2-Column Grid**: `.layout` (`display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem;` on mobile; `@media (min-width: 768px) { grid-template-columns: 300px minmax(0, 1fr); }` in `styles.css:416-425`).
  - Left column: `.input-panel` (fixed 300px on desktop).
  - Right column: `.results-panel` (`minmax(0, 1fr)`).
- **Blog Container**: `.blog-wrapper` (`max-width: 1160px; margin: 0 auto; padding: 0 2rem;` in `blog.css:27-31`).
- **Blog 2-Column Layout**: `.article-layout` (`display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 4rem;` in `blog.css:105-113`).
  - `@media (max-width: 960px)`: stacks into single column (`grid-template-columns: minmax(0, 1fr); gap: 2.5rem;` in `blog.css:1226-1230`).
  - `@media (max-width: 680px)`: `.blog-wrapper` padding reduces to `0 1.125rem` (`blog.css:1240`).
- **Blog Listing Grid**: `.blog-listing-grid` (`display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;` on desktop; `repeat(2, 1fr)` at `<= 960px`; `1fr` at `<= 680px` in `blog.css:1234-1271`).

### 1.4 Existing Ad Slot Classes in `styles.css` (lines 1377-1510)
Current styles target `.ad-slot`, `.ad-leaderboard`, `.ad-rectangle`, `.ad-in-article`, `.ad-sidebar-sticky`, `.ad-multiplex`, `.ad-anchor-sticky`.
Crucial observation:
- **`ad-placeholder` is NOT currently present anywhere in HTML files or CSS stylesheets!**
- The repository uses `class="ad-slot ..."`, whereas `ORIGINAL_REQUEST.md` (Acceptance Criterion 3) explicitly mandates:
  > *"The HTML files must contain clear placeholder elements (e.g., dedicated `div`s with an `ad-placeholder` class) in natural ad-break locations, without breaking the visual layout."*
- Unfilled collapse selector exists in `styles.css:1411-1414`:
  ```css
  .ad-slot:has(ins[data-ad-status="unfilled"]),
  .ad-slot:empty {
    display: none;
  }
  ```

---

## 2. Logic Chain

1. **Class Name Alignment**:
   - *Observation*: `ORIGINAL_REQUEST.md` requires elements with class `ad-placeholder`.
   - *Observation*: Current elements use `class="ad-slot"`.
   - *Deduction*: Any automated audit, validator, or test suite verifying AdSense readiness via `document.querySelectorAll('.ad-placeholder')` or `div.ad-placeholder` will currently fail (0 elements found).
   - *Inference*: Updating all existing and new ad containers to include `class="ad-placeholder ad-slot ..."` ensures 100% compliance with acceptance criteria while preserving existing CSS and JS selectors without regressions.

2. **Calculator Layout Ad Placement**:
   - *Observation*: Placing ads above the calculator input or between inputs and the interactive results causes layout jumping, pushes core metrics below the fold on mobile, and frustrates users.
   - *Observation*: In `index.html`, the `.results-panel` concludes after the year-by-year table and PDF/CSV download buttons (`index.html:364-373`), where `.ad-rectangle` is currently positioned.
   - *Observation*: In `retirement-calculator.html`, `investment-goal-calculator.html`, and `compare-investments.html`, `.ad-leaderboard` is placed right below the summary metrics and above the canvas chart.
   - *Inference*: These positions represent natural visual pauses where the user has already absorbed the numerical calculation and is preparing to explore the visualization or export data.

3. **Long-Form Blog Content (>1500 words) Ad Spacing**:
   - *Observation*: The user's primary requirement is expanding all 6 blog posts from short ~600-900 word drafts to over 1500 words.
   - *Observation*: Currently, each blog post has only 1 in-article ad slot (after the 2nd `h2`) and 1 sidebar sticky ad.
   - *Deduction*: In an article of 1500–2200 words (typically 6–9 `h2` headings and 12–18 paragraphs), a single in-article ad placed at word ~300 leaves ~1500 words of monolithic prose without editorial rhythm.
   - *Inference*: A dual in-article ad break strategy is optimal:
     - **Break 1 (Upper 30% / Section 2-3)**: After introductory concepts, before worked calculations.
     - **Break 2 (Lower 70% / Section 5-6)**: After technical analysis / data tables, before practical takeaways or FAQ.
     - **Sidebar Unit**: Sticky on desktop, naturally stacked below the article on mobile.
     This respects Google AdSense policies (maintaining high content-to-ad ratio) while substantially improving ad viewability and monetization.

4. **Responsive Integrity & Layout Protection**:
   - *Observation*: On mobile screens (320px–375px), standard fixed ad dimensions (like 728px or 336px) will cause viewport horizontal scrolling if containers don't enforce `max-width: 100%` and `box-sizing: border-box`.
   - *Observation*: `styles.css:123-126` enforces global overflow guard `overflow-x: clip`, but inner flex/grid containers must maintain fluid widths.
   - *Inference*: `.ad-placeholder` must specify `max-width: 100%; box-sizing: border-box; overflow: hidden;` with `min-height` reserved to prevent Cumulative Layout Shift (CLS).

---

## 3. Caveats

1. **Policy Exclusion for Legal Pages**:
   `about.html`, `privacy-policy.html`, and `terms-of-service.html` currently do not contain ad units. Under Google AdSense Webmaster Quality Guidelines, placing ads on legal, privacy, or disclaimer pages with minimal unique editorial content risks "thin content" or "accidental click" policy warnings. It is strongly recommended to keep `privacy-policy.html` and `terms-of-service.html` ad-free.
2. **AdSense Sandbox vs Live**:
   Before an AdSense account is approved and live ads are served, Google does not return actual creatives, and `data-ad-status="unfilled"` is only set by Google's client script when an ad request executes. The proposed CSS ensures that in development and audit modes, the placeholder renders with clean editorial dashed styling and an `"ADVERTISEMENT"` header, but gracefully collapses when AdSense explicitly reports an unfilled impression in production.

---

## 4. Conclusion & Concrete Design Proposal

### 4.1 Recommended Ad Break Map Across All Repository Pages

| File | Proposed Placeholder Elements | Placement Location in DOM |
|---|---|---|
| `index.html` (Grow Tab) | `<div class="ad-placeholder ad-slot ad-rectangle" id="ad-rectangle" aria-label="Advertisement" aria-hidden="true">` | Below year-by-year table & CSV export (existing location line 365, add `ad-placeholder` class) |
| `index.html` (Goal Tab) | `<div class="ad-placeholder ad-slot ad-leaderboard" id="ad-goal-leaderboard" aria-label="Advertisement" aria-hidden="true">` | After `.goal-breakdown` metrics, above `.chart-box` |
| `index.html` (Compare Tab)| `<div class="ad-placeholder ad-slot ad-leaderboard" id="ad-compare-leaderboard" aria-label="Advertisement" aria-hidden="true">` | Below `#compare-winner-box`, above `.chart-box` |
| `investment-goal-calculator.html` | `<div class="ad-placeholder ad-slot ad-leaderboard" id="ad-leaderboard" aria-label="Advertisement" aria-hidden="true">` | Line 164: Between `.goal-breakdown` and `.chart-box` (add `ad-placeholder` class) |
| `retirement-calculator.html` | `<div class="ad-placeholder ad-slot ad-leaderboard" id="ad-leaderboard" aria-label="Advertisement" aria-hidden="true">` | Line 201: Between `#ret-saving-callout` and `.chart-box` (add `ad-placeholder` class) |
| `compare-investments.html` | `<div class="ad-placeholder ad-slot ad-leaderboard" id="ad-leaderboard" aria-label="Advertisement" aria-hidden="true">` | Line 202: Between `#compare-winner-box` and `.chart-box` (add `ad-placeholder` class) |
| `blog/index.html` | `<div class="ad-placeholder ad-slot ad-multiplex" aria-label="Advertisement" aria-hidden="true">` | Line 107: Inside `.blog-listing-grid` after Card 4 (add `ad-placeholder` class) |
| `blog/blog-template.html` | In-Article 1: `<div class="ad-placeholder ad-slot ad-in-article">`<br>In-Article 2: `<div class="ad-placeholder ad-slot ad-in-article">`<br>Sidebar: `<div class="ad-placeholder ad-slot ad-sidebar-sticky">` | In-Article 1: After 2nd `h2`<br>In-Article 2: After 4th/5th `h2`<br>Sidebar: Below TOC inside `<aside class="sidebar">` |
| All 6 Blog Articles (`blog/*.html`) | 1. In-Article 1: `<div class="ad-placeholder ad-slot ad-in-article">`<br>2. In-Article 2: `<div class="ad-placeholder ad-slot ad-in-article">`<br>3. Sidebar: `<div class="ad-placeholder ad-slot ad-sidebar-sticky">` | 1. Upper third (~30% scroll mark, after section 2)<br>2. Lower third (~70% scroll mark, after data tables)<br>3. Right sidebar (sticky desktop, static mobile) |

### 4.2 Standard DOM Structure for All 6 Ad Units

#### Unit 1: In-Article Fluid Ad (For Blog Posts)
```html
<!-- AdSense In-Article Placeholder Unit -->
<div class="ad-placeholder ad-slot ad-in-article" aria-label="Advertisement" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="1000000003"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

#### Unit 2: Sidebar Sticky Ad (For Blog Posts & Desktop Rail)
```html
<!-- AdSense Sidebar Sticky Placeholder Unit -->
<div class="ad-placeholder ad-slot ad-sidebar-sticky" aria-label="Advertisement" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="1000000004"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

#### Unit 3: Calculator Leaderboard / Banner Ad (For Calculator Pages)
```html
<!-- AdSense Leaderboard Placeholder Unit -->
<div class="ad-placeholder ad-slot ad-leaderboard" id="ad-leaderboard" aria-label="Advertisement" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="1000000001"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

#### Unit 4: Medium Rectangle Ad (For Index Calculator Results Panel)
```html
<!-- AdSense Rectangle Placeholder Unit -->
<div class="ad-placeholder ad-slot ad-rectangle" id="ad-rectangle" aria-label="Advertisement" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="1000000002"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

#### Unit 5: Multiplex Grid Unit (For `blog/index.html` Listing)
```html
<!-- AdSense Multiplex Grid Placeholder Unit -->
<div class="ad-placeholder ad-slot ad-multiplex" aria-label="Advertisement" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-format="autorelaxed"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="1000000005"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

#### Unit 6: Sticky Anchor Footer Unit (Global / User-Dismissible)
```html
<!-- AdSense Sticky Anchor Footer Placeholder Unit -->
<div class="ad-placeholder ad-slot ad-anchor-sticky" aria-label="Advertisement" aria-hidden="true">
  <button class="ad-anchor-dismiss" aria-label="Dismiss Advertisement">✕</button>
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="1000000006"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

### 4.3 Proposed CSS Specification for `assets/css/styles.css`
Replace lines 1376–1510 in `assets/css/styles.css` with this comprehensive, harmonized ruleset:

```css
/* ── AdSense Ad Slots & Placeholders ─────────────────── */
.ad-placeholder,
.ad-slot {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  margin: 2rem 0;
  padding: 1.75rem 1.25rem 1.25rem 1.25rem;
  background: var(--paper-tint, var(--bg-surface));
  border: 1px dashed var(--rule, var(--border));
  border-radius: var(--radius);
  /* Prevent layout reflow jumps during load (CLS safeguard) */
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
}

.ad-placeholder::before,
.ad-slot::before {
  content: "ADVERTISEMENT";
  display: block;
  font-family: var(--font-body, 'DM Sans', sans-serif);
  font-size: 10px;
  font-weight: 600;
  color: var(--ink-faint);
  letter-spacing: 0.12em;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
}

/* Collapse unfilled/empty slots so they leave no editorial gap when AdSense runs */
.ad-placeholder:has(ins[data-ad-status="unfilled"]),
.ad-placeholder:empty,
.ad-slot:has(ins[data-ad-status="unfilled"]),
.ad-slot:empty {
  display: none;
}

.ad-placeholder.ad-leaderboard,
.ad-slot.ad-leaderboard {
  max-width: 728px;
  margin-left: auto;
  margin-right: auto;
  min-height: 140px;
}

.ad-placeholder.ad-rectangle,
.ad-slot.ad-rectangle {
  max-width: 336px;
  margin-left: auto;
  margin-right: auto;
  min-height: 330px;
}

.ad-placeholder.ad-in-article,
.ad-slot.ad-in-article {
  max-width: 100%;
  margin: 2.5rem auto;
  min-height: 140px;
}

/* Sidebar sticky ad slot position */
.ad-placeholder.ad-sidebar-sticky,
.ad-slot.ad-sidebar-sticky {
  position: sticky;
  top: 100px;
  min-height: 330px;
  margin: 1.5rem 0;
}

/* Multiplex ad slot styled to blend natively in grid */
.ad-placeholder.ad-multiplex,
.ad-slot.ad-multiplex {
  grid-column: span 1;
  background: var(--paper-raised, var(--bg-surface));
  border: 1px solid var(--rule, var(--border));
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem 1.25rem 1.25rem 1.25rem;
  min-height: 350px;
}

/* Anchor ad slot (sticky footer) */
.ad-placeholder.ad-anchor-sticky,
.ad-slot.ad-anchor-sticky {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 728px;
  background: var(--paper-raised, var(--bg-surface));
  border-top: 1px solid var(--rule, var(--border));
  border-left: 1px solid var(--rule, var(--border));
  border-right: 1px solid var(--rule, var(--border));
  border-radius: var(--radius) var(--radius) 0 0;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.08);
  z-index: 9999;
  margin: 0;
  padding: 1.5rem 1.25rem 1.25rem 1.25rem;
  min-height: 120px;
  display: none; /* Controlled via JS in ui.js */
}

/* Close/dismiss action button for sticky footer */
.ad-anchor-dismiss {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--paper-tint, var(--bg-active));
  border: 1px solid var(--rule, var(--border));
  color: var(--ink-soft, var(--text-muted));
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
  z-index: 10000;
}

.ad-anchor-dismiss:hover {
  background: var(--danger);
  color: #ffffff;
}

/* Responsive safety guards */
@media (max-width: 960px) {
  .ad-placeholder.ad-sidebar-sticky,
  .ad-slot.ad-sidebar-sticky {
    position: static;
  }
}

@media (max-width: 360px) {
  .ad-placeholder.ad-leaderboard,
  .ad-slot.ad-leaderboard,
  .ad-placeholder.ad-rectangle,
  .ad-slot.ad-rectangle,
  .ad-placeholder.ad-anchor-sticky,
  .ad-slot.ad-anchor-sticky {
    display: none !important;
  }
}
```

---

## 5. Verification Method

### 5.1 Verification Commands
To independently verify the page count and ad placeholder coverage:

1. **Verify All 16 HTML Files**:
   ```bash
   find /Users/alikora/dev/AntiG/CompCalc -maxdepth 2 -name "*.html" -not -path "*/node_modules/*" -not -path "*/.agents/*" | sort
   ```
   *Expected Output*: Exactly 16 HTML files listed.

2. **Verify AdSense Head Script in All Pages**:
   ```bash
   grep -rn "pagead2.googlesyndication.com" /Users/alikora/dev/AntiG/CompCalc/*.html /Users/alikora/dev/AntiG/CompCalc/blog/*.html | wc -l
   ```
   *Expected Output*: 16 matches.

3. **Check for `.ad-placeholder` Class Coverage**:
   ```bash
   grep -rn "ad-placeholder" /Users/alikora/dev/AntiG/CompCalc/*.html /Users/alikora/dev/AntiG/CompCalc/blog/*.html
   ```
   *Current Result*: 0 matches (demonstrates need for implementer to add `ad-placeholder` alongside `ad-slot`).
   *Target Post-Implementation Result*: Present in all calculators and blog articles.

4. **Visual Layout & Diagnostics Verification**:
   Navigate browser or inspect `/debug-adsense.html` to run diagnostics:
   - Verify all 6 ad formats render cleanly without overflow at desktop (1280px), tablet (820px), and mobile (375px and 320px).
   - Check that `data-mock-slot` or `.ad-placeholder::before` displays `"ADVERTISEMENT"` clearly.
   - Verify CLS stability (containers maintain defined min-heights: 120px, 140px, 330px, 350px).
