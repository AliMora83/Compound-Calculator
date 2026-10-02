# Survey Report & Expansion Blueprint for Blog Articles

**Explorer:** explorer_survey_1  
**Timestamp:** 2026-10-01T20:02:00Z  
**Project Root:** `/Users/alikora/dev/AntiG/CompCalc`  
**Working Directory:** `/Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/explorer_survey_1/`  
**Target:** 6 Blog Articles in `blog/`  
**Primary Goal:** Address Google AdSense "thin content" rejection by surveying all 6 articles, calculating programmatic word counts, auditing HTML/CSS patterns, and formulating precise, seamless expansion plans to ensure every post exceeds 1,500 words while embedding up-to-date South African financial data and AdSense placeholders.

---

## 1. Observation

### 1.1 Inventory of Blog Files
Inspecting `/Users/alikora/dev/AntiG/CompCalc/blog/` revealed 8 files:
- 1 Directory Landing/Index: `blog/index.html`
- 1 Authoring Template: `blog/blog-template.html`
- **6 Active Blog Articles**:
  1. `blog/compound-interest-south-africa.html`
  2. `blog/rule-of-72.html`
  3. `blog/how-long-to-save-1-million-rand.html`
  4. `blog/tax-free-savings-account-calculator-south-africa.html`
  5. `blog/maximize-compound-interest-monthly-savings.html`
  6. `blog/etfs-vs-traditional-savings-accounts.html`

### 1.2 Programmatic Word Count Audit
Word counts were extracted programmatically using Python `HTMLParser` to parse the DOM tree into sections (excluding `<head>`, `<script>`, `<style>`, `<noscript>`), isolating the core readable editorial content (Hero + Body) versus total visible page text (including navigation, sidebar, and footer):

| # | File Path | H1 Title | Category | Hero Words | Body Words | Core Words (Hero+Body) | Total Visible Words | Status (>1500 Core Words) |
|---|---|---|---|---|---|---|---|---|
| 1 | `blog/compound-interest-south-africa.html` | Compound Interest Calculator South Africa (2026 Guide) | Investing Basics | 59 | 1,884 | **1,943** | 2,082 | **PASS** (+443 over) |
| 2 | `blog/rule-of-72.html` | The Rule of 72: How to Calculate When Your Money Doubles | Mental Maths | 51 | 826 | **877** | 999 | **FAIL (Deficit: 623 words)** |
| 3 | `blog/how-long-to-save-1-million-rand.html` | How Long to Save R1 Million? (Real Examples + Calculator) | Goal Planning | 49 | 868 | **917** | 1,045 | **FAIL (Deficit: 583 words)** |
| 4 | `blog/tax-free-savings-account-calculator-south-africa.html` | TFSA Calculator South Africa 2026 — the R46,000 Limit Explained | Investing | 81 | 1,772 | **1,853** | 1,984 | **PASS** (+353 over) |
| 5 | `blog/maximize-compound-interest-monthly-savings.html` | How to Maximize Compound Interest with Monthly Savings | Strategies | 75 | 971 | **1,046** | 1,160 | **FAIL (Deficit: 454 words)** |
| 6 | `blog/etfs-vs-traditional-savings-accounts.html` | ETFs vs Traditional Savings Accounts in South Africa | Investing | 78 | 821 | **899** | 1,007 | **FAIL (Deficit: 601 words)** |

**Key Metric Summary:**
- **4 out of 6 articles** currently suffer from "thin content" (877 to 1,046 core words).
- Total word expansion needed across the 4 deficit articles to reach 1,500 core words: **2,261 words** (or ~2,800 words targeting a safe buffer of 1,600–1,700 words per article).
- Two articles (`compound-interest-south-africa.html` and `tax-free-savings-account-calculator-south-africa.html`) are already robust (>1,850 core words), serving as architectural gold standards.

---

### 1.3 Architectural & Styling Audit Across Articles

#### Typography & Theme Tokens (from `assets/css/blog.css` and `assets/css/styles.css`):
- **Display Headings (`h1`, `h2`):** `--font-display: 'Lora', Georgia, serif;` (preloaded `fraunces-600.woff2` used in app). H1 clamped at `clamp(2rem, 4vw, 2.875rem)` with `color: var(--ink)` and `-0.02em` letter spacing. H2 sized at `1.625rem` with `margin: 2.75rem 0 0.875rem`.
- **Subheadings (`h3`):** `font-size: 1.125rem; font-weight: 600; color: var(--text); margin: 1.75rem 0 0.5rem;`.
- **Body Prose (`p`, `li`):** `DM Sans`, `1.0625rem`, line height `1.8`, `color: var(--text-mid); margin-bottom: 1.25rem`.
- **Monospace Numbers/Stats:** `DM Mono` (`var(--font-mono)`) used for formula blocks, calculations, scenario inputs, and stats.
- **Color Variables:**
  - Accent Green: `--green: #16a34a;`
  - Accent Hover/Secondary: `--green-secondary: var(--accent-hover);`
  - Tints: `--bg-tint: var(--accent-tint); --bg-soft: var(--paper-tint);`
  - Borders: `--border`

#### Grid Layout & Wrappers:
- Page container: `<main><div class="calc-wrap">` (or `<div class="blog-wrapper calc-wrap">`).
- Two-column grid: `.article-layout { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 4rem; align-items: start; }`.
  - Column 1: Editorial body (`.article-body`), shrinking safely with `minmax(0, 1fr)`.
  - Column 2: Sticky sidebar (`.sidebar { position: sticky; top: 80px; }`), collapses to block on screens `<= 960px`.

#### Existing UI Component Ecosystem:
1. **Article Hero (`.article-hero`):**
   - Category pill: `.article-category` with SVG bullet.
   - Title: `h1`.
   - Lead paragraph: `.article-hero-lead` (1.125rem, line-height 1.7).
   - Metadata bar: `.article-meta` with read time, update date, and author badge.
2. **Formula Blocks (`.formula-block`):**
   - Dark emerald block (`background: var(--green-secondary); color: #a7f3d0; font-family: var(--font-mono)`).
   - Formula main display (`.formula-main`), sub-notes (`.formula-sub`), and variable definitions (`ul > li > strong`).
   - Simple watermark variant (`.formula-block.simple[data-watermark="72"]`).
3. **Image + Text Feature Blocks (`.img-text-block` and `.img-text-block.reverse`):**
   - Flex container with `.img-slot` (dark grid or `.light` gradient) and `.img-text-content`.
   - Visual slots feature `.img-slot-icon` (emoji/icon) or `.img-slot-stat` (large DM Mono stat + label).
   - **Discrepancy:** Found in Articles 1, 2, 3; completely missing in Articles 4, 5, 6.
4. **Data Tables (`.table-wrap > table.blog-table`):**
   - Standardized overflow wrapper `.table-wrap` for mobile responsiveness.
   - Clean headers `thead th` with uppercase muted text; alternating rows `tbody tr:nth-child(even)`.
   - Modifiers: `.highlight` (accent green), `.danger` (red tint), `.exact` (amber tint).
   - **Discrepancy:** Articles 4, 5, and 6 currently use bare `<table>` elements without `.table-wrap` or `.blog-table`, risking mobile layout overflow.
5. **Callout Boxes (`.callout` and `.callout.warning`):**
   - Border-left accent blocks (`border-left: 3px solid var(--green)`) on tinted background.
   - **Discrepancy:** Present in Articles 1, 2, 3; missing in Articles 4, 5, 6.
6. **Scenario Cards (`.scenario-card`):**
   - Specialized card in Article 3 with `.scenario-header (.s1, .s2, .s3)`, inputs grid, large result badge (`.output-big`), and narrative breakdown.
7. **Affiliate Conversion Card (`.blog-affiliate-cta`):**
   - High-converting EasyEquities CTA card (`https://bit.ly/4wsBTNT`), styled with ribbon badge, headline, copy, action button, and SARS/FSCA compliant affiliate disclosure.
8. **Share Bar (`.share-bar`):**
   - WhatsApp share button + Copy Link button with clipboard JS integration.
9. **FAQ Accordion (`.faq-accordion`):**
   - Collapsible items (`.faq-item > button.faq-question, div.faq-answer`) driven by `blog.js`.
   - **Discrepancy:** Present in Articles 1, 4, 5, 6; missing in Articles 2 and 3.
10. **Interactive Sidebar Tools (`.sidebar`):**
    - Article 1: Mini Growth Calculator (`#sidebar-monthly`, `#sidebar-grow-btn`).
    - Article 2: Dynamic Rule of 72 Doubling Widget (`#rule72-rate`, `#rule72-result`).
    - Article 3: Quick Goal Timeline Widget (`#sidebar-goal-monthly`).
    - Article 4: Interactive TFSA Annuity Calculator (`calcTFSA()`).
    - Article 5: Monthly Savings Calculator (`calcMonthly()`).
    - Article 6: ETF Return Calculator (`calcEtf()`).
    - All sidebars feature `.toc-card` with table of contents.
11. **Table of Contents Synchronization (`#toc-map`):**
    - `blog.js` reads `<script id="toc-map" type="application/json">` and programmatically attaches matching anchor `id`s to `<h2>` headings.
    - Any added or modified `h2` headings MUST be mirrored in both `.toc-list` and `#toc-map`.

---

### 1.4 AdSense Placeholder Audit
Every article currently contains two AdSense slots:
1. **In-Article Slot (`.ad-slot.ad-in-article`):** Positioned immediately after the 2nd `h2`.
2. **Sidebar Sticky Slot (`.ad-slot.ad-sidebar-sticky`):** Positioned inside `.sidebar` below the TOC card.

**Gap Identified:**
For long-form articles (>1,500 words), having only a single in-article ad slot near the top leaves 1,200+ words of content without an ad break. In accordance with Requirement R3, articles expanding to 1,500–1,800 words should introduce a **second natural in-article ad placeholder** (`.ad-slot.ad-in-article.ad-placeholder`) positioned mid-way through the post (e.g. after the 5th or 6th `h2`, before case studies or the FAQ section).

---

## 2. Logic Chain

```
[Observation 1: AdSense rejection for "thin content"]
        │
        ▼
[Observation 2: 4 of 6 articles contain between 877 and 1,046 words]
        │
        ▼
[Logic Step 1: Articles 2, 3, 5, and 6 must expand by 450 to 650+ words to exceed 1,500 words]
        │
        ▼
[Observation 3: Articles 4, 5, 6 lack visual components (.img-text-block, .callout, .blog-table)]
        │
        ▼
[Logic Step 2: Harmonizing UI components elevates visual authority, engagement, and length simultaneously]
        │
        ▼
[Observation 4: Articles 2 & 3 lack FAQ sections and FAQPage/Article Schema]
        │
        ▼
[Logic Step 3: Introducing 5-question structured FAQ sections adds ~300 high-quality words and SEO rich snippets]
        │
        ▼
[Observation 5: SA macroeconomic data requires 2026 accuracy: Repo rate, Prime rate, TFSA R46,000 limit, Two-Pot retirement system]
        │
        ▼
[Logic Step 4: Injecting real South African financial mechanisms (JSE Top 40, Satrix/Sygnia ETFs, RSA Retail Bonds, SARS interest exemptions) ensures original, authoritative content]
        │
        ▼
[Conclusion: Detailed, article-by-article expansion blueprint providing structural outlines, exact word additions, and styling specifications]
```

---

## 3. Article-by-Article Expansion Blueprints

### Article 1: `compound-interest-south-africa.html`
- **File:** `/Users/alikora/dev/AntiG/CompCalc/blog/compound-interest-south-africa.html`
- **Current Core Words:** 1,943 (Status: Compliant >1500)
- **Target Words:** ~2,050–2,150 words
- **Role in Suite:** Pillar foundational article.
- **Refinements Needed:**
  1. **Macro Data Alignment:** Ensure all rate references reflect the 2026 economic environment (SARB repo rate context, prime rate at repo + 3.5%, CPI inflation target 4.5%–5.5%, and TFSA annual allowance at R46,000).
  2. **AdSense Preparation (R3):** Insert a second in-article ad slot (`.ad-slot.ad-in-article.ad-placeholder`) between Section 8 (*Inflation Compounds Too*) and Section 9 (*Where South Africans Can Put Compounding to Work*).
  3. **Semantic HTML Cleanliness:** Change inner `<main class="article-body">` to `<article class="article-body">`.

---

### Article 2: `rule-of-72.html`
- **File:** `/Users/alikora/dev/AntiG/CompCalc/blog/rule-of-72.html`
- **Current Core Words:** 877 (Deficit: 623 words)
- **Target Core Words:** 1,650–1,750 words (+750 to +850 words)
- **Concrete Expansion Blueprint:**

| Section / Heading | UI Component | Content & SA Financial Data Focus | Word Est. |
|---|---|---|---|
| **1. The Mathematical Origin: Rule of 70 vs 69.3 vs 72** (`#math-origin`) | `p`, `formula-block.simple` | Mathematical derivation using natural logarithms ($\ln(2) \approx 0.693$). Why 72 is the investor's favorite number (divisibility by 2, 3, 4, 6, 8, 9, 12). When to use 69.3 (continuous compounding) vs 70 vs 72. | +180 words |
| **2. Beyond Doubling: The Rule of 114 (Tripling) and Rule of 144 (Quadrupling)** (`#rule-114-144`) | `.table-wrap > table.blog-table` | How to estimate tripling ($114/r$) and quadrupling ($144/r$) in Rand terms. Table comparing 7%, 9%, 10%, 12% across 2×, 3×, and 4× wealth horizons. | +160 words |
| **3. Real vs Nominal Doubling in South Africa** (`#real-vs-nominal`) | `.callout`, `p`, `.img-text-block` | The South African inflation reality: At 10% JSE nominal return and 5% CPI inflation, real return is 5%. Real doubling time is $72/5 = 14.4$ years, not 7.2 years! Contrast bank fixed deposits vs JSE equity. | +170 words |
| **4. The Debt Compounding Trap: NCA Maximums & Store Cards** (`#debt-compounding`) | `.callout.warning`, `p` | South African National Credit Act (NCA) maximum interest rates (Repo + 3.5% + up to 14% = ~21–22% on credit cards, up to 28%+ on unsecured microloans). Case study: A R20,000 store card balance left unpaid doubles in 3.3 years. | +150 words |
| **5. AdSense Break 2** | `.ad-slot.ad-in-article.ad-placeholder` | Positioned between Debt Compounding and Frequently Asked Questions. | — |
| **6. Frequently Asked Questions (FAQ)** (`#faq`) | `.faq-accordion` (5 items) | 1. Difference between Rule of 72 and 70? 2. Does it work with monthly debit orders? 3. Can I calculate required rate for a specific target timeline ($r = 72/t$)? 4. How does 20% DWT affect doubling? 5. Does it apply inside TFSAs? | +220 words |
| **7. Schema & TOC Updates** | `<script type="application/ld+json">` & `#toc-map` | Inject `Article` and `FAQPage` JSON-LD schema into `<head>`. Update sidebar TOC and `#toc-map`. | — |

---

### Article 3: `how-long-to-save-1-million-rand.html`
- **File:** `/Users/alikora/dev/AntiG/CompCalc/blog/how-long-to-save-1-million-rand.html`
- **Current Core Words:** 917 (Deficit: 583 words)
- **Target Core Words:** 1,650–1,750 words (+730 to +830 words)
- **Concrete Expansion Blueprint:**

| Section / Heading | UI Component | Content & SA Financial Data Focus | Word Est. |
|---|---|---|---|
| **1. The Charlie Munger Principle: Why the First R100,000 Is the Hardest** (`#first-100k`) | `.table-wrap > table.blog-table`, `p` | Adapting Charlie Munger's famous maxim to ZAR: Saving R0 to R100k requires 90% capital contributions and 10% compounding. Milestones table: R0→R100k (~3.5 yrs), R100k→R300k (~3.5 yrs), R300k→R600k (~3.5 yrs), R600k→R1M (~3.2 yrs). Compounding does the heavy lifting after R300k. | +200 words |
| **2. Inflation Reality: What Will R1 Million Actually Buy?** (`#inflation-reality`) | `.img-text-block.reverse`, `p` | Purchasing power degradation over 11, 17.5, and 26.5 years at 5% inflation. R1M in 11 yrs = ~R580k today; in 26.5 yrs = ~R275k today. Why investors should target an "inflation-escalating" contribution or a higher nominal goal. | +160 words |
| **3. The Three-Bucket South African Investment Strategy** (`#three-buckets`) | `.callout`, `p`, bullet list | How to structure the route to R1M across SA vehicles: 1. Tax-Free Savings Account (TFSA) up to R46k/year (sheltered growth); 2. Retirement Annuity (RA) under the Two-Pot System (up to 27.5% tax deduction); 3. Discretionary EasyEquities account. | +170 words |
| **4. AdSense Break 2** | `.ad-slot.ad-in-article.ad-placeholder` | Positioned between Three-Bucket Strategy and Practical Platform Selection. | — |
| **5. Tax Implications of Hitting R1 Million in South Africa** (`#tax-implications`) | `.table-wrap > table.blog-table`, `p` | Tax on R1M in regular accounts: SARS interest exemption (R23,800), CGT inclusion rate (40%), Dividends Withholding Tax (20%). Why keeping as much as possible in a TFSA protects the nest egg. | +140 words |
| **6. Frequently Asked Questions (FAQ)** (`#faq`) | `.faq-accordion` (5 items) | 1. Can I save R1M in 5 years in SA? (Requires ~R13,000/mo at 10%). 2. Is R1M enough to retire on in SA? (4% rule yields R40k/yr or R3,333/mo—highlights that R1M is a launchpad milestone, not complete retirement). 3. Should I keep my R1M goal in fixed deposits or equities? 4. How does annual salary escalation shorten the timeline? 5. What if I withdraw during an emergency? | +220 words |
| **7. Schema & TOC Updates** | `<script type="application/ld+json">` & `#toc-map` | Inject `Article` and `FAQPage` JSON-LD schema into `<head>`. Update sidebar TOC and `#toc-map`. | — |

---

### Article 4: `tax-free-savings-account-calculator-south-africa.html`
- **File:** `/Users/alikora/dev/AntiG/CompCalc/blog/tax-free-savings-account-calculator-south-africa.html`
- **Current Core Words:** 1,853 (Status: Compliant >1500)
- **Target Words:** ~1,950–2,050 words
- **Role in Suite:** In-depth TFSA regulatory & calculation authority.
- **Refinements & Structural Upgrades:**
  1. **Table Layout Compliance:** Upgrade the bare comparison table (lines 218–253) into `<div class="table-wrap"><table class="blog-table">` with `.highlight` modifier on the TFSA column.
  2. **Visual Components:** Add 1 `.img-text-block` and 2 `.callout` boxes (highlighting the 40% SARS excess penalty and the rule against re-contributing withdrawn funds).
  3. **AdSense Preparation (R3):** Insert a second in-article ad slot (`.ad-slot.ad-in-article.ad-placeholder`) between Section 6 (*Cash vs Equity TFSA*) and Section 7 (*How to Use the TFSA Calculator*).

---

### Article 5: `maximize-compound-interest-monthly-savings.html`
- **File:** `/Users/alikora/dev/AntiG/CompCalc/blog/maximize-compound-interest-monthly-savings.html`
- **Current Core Words:** 1,046 (Deficit: 454 words)
- **Target Core Words:** 1,650–1,750 words (+600 to +700 words)
- **Concrete Expansion Blueprint:**

| Section / Heading | UI Component | Content & SA Financial Data Focus | Word Est. |
|---|---|---|---|
| **1. The Step-Up Strategy: Annual Contribution Escalation** (`#step-up-strategy`) | `.table-wrap > table.blog-table`, `p` | Real salaries increase over time. What happens when monthly contributions escalate by 5% or 7% annually? Compare Flat R2,000/mo vs 6% Escalating Monthly Contribution over 10, 20, 30 years at 10%. (Flat 30 yrs = ~R4.5M; Escalating = ~R9.2M! Double the wealth). | +200 words |
| **2. Dollar-Cost Averaging (DCA) on the JSE** (`#dollar-cost-averaging`) | `.img-text-block`, `p` | How monthly debit orders exploit South African market volatility. Buying Satrix 40 or Sygnia Itrix S&P 500 across market highs and lows lowers average unit cost, overcoming investor fear. | +150 words |
| **3. Banking Automation & Fee Elimination in South Africa** (`#banking-automation`) | `.callout`, `p`, bullet list | Setting up automated transfers the day after payday ("Pay Yourself First"). Guidance across SA banks (Capitec, FNB, Standard Bank, Nedbank, Investec). Avoiding failed debit order fees (R50–R150) and setting up recurring platform EFTs. | +140 words |
| **4. AdSense Break 2** | `.ad-slot.ad-in-article.ad-placeholder` | Positioned between Banking Automation and Setup Steps. | — |
| **5. Table & UI Standardization** | `.table-wrap > table.blog-table` | Upgrade bare frequency table (lines 185–220) to `.table-wrap > table.blog-table` with `.highlight` on Monthly and Daily rows. | — |
| **6. FAQ Expansion (from 4 to 7 items)** (`#faq`) | `.faq-accordion` | Add 3 high-value questions: 1. Should I increase my debit order every time I get a salary increase? 2. How should I invest an annual 13th cheque or tax refund (lump sum vs DCA)? 3. What is the difference between a bank stop order and an investment platform debit order? | +160 words |
| **7. Schema & TOC Updates** | `<script type="application/ld+json">` & `#toc-map` | Expand `FAQPage` schema to 7 items. Update TOC card and `#toc-map`. | — |

---

### Article 6: `etfs-vs-traditional-savings-accounts.html`
- **File:** `/Users/alikora/dev/AntiG/CompCalc/blog/etfs-vs-traditional-savings-accounts.html`
- **Current Core Words:** 899 (Deficit: 601 words)
- **Target Core Words:** 1,650–1,750 words (+750 to +850 words)
- **Concrete Expansion Blueprint:**

| Section / Heading | UI Component | Content & SA Financial Data Focus | Word Est. |
|---|---|---|---|
| **1. Top South African ETFs Compared: A Core Investor Menu** (`#top-sa-etfs`) | `.table-wrap > table.blog-table`, `p` | Detailed review of leading JSE-listed ETFs: Satrix 40 / 1nvest SWIX 40 (JSE Top 40), Satrix MSCI World / Sygnia Itrix MSCI World (global equities), 1nvest S&P 500, Satrix SA Government Bond ETF (STXGOV), CoreShares SA Property. Table comparing ticker, asset class, TER, and 5-year return profile. | +220 words |
| **2. The Hidden Cost of Fees: ETF TERs vs Active Unit Trusts** (`#fee-drag`) | `.callout.warning`, `p` | Why 0.25% ETF TER beats 1.5%–2.5% active unit trust fees. Worked comparison: R2,000/mo over 25 years at 10% gross. Net 9.7% (ETF) = R2.27M vs Net 8.0% (Unit Trust) = R1.75M. A staggering R520,000 lost purely to fee drag! | +170 words |
| **3. Currency Depreciation: The Rand Hedge Factor** (`#rand-hedge`) | `.img-text-block.reverse`, `p` | Historical ZAR/USD depreciation (~4–6% per year). Why investing in offshore ETFs listed in Rands on the JSE protects purchasing power against local currency devaluation. | +140 words |
| **4. South African Tax Differences in Detail** (`#tax-deep-dive`) | `.table-wrap > table.blog-table`, `p` | Exhaustive tax breakdown: Bank interest exemption (R23,800 under 65, R34,500 over 65) vs Dividends Withholding Tax (20%) vs Capital Gains Tax (40% inclusion, max 18% effective) vs TFSA 100% exemption. Update TFSA limit reference to 2026/27 R46,000. | +160 words |
| **5. AdSense Break 2** | `.ad-slot.ad-in-article.ad-placeholder` | Positioned between Tax Deep Dive and When to Use Which. | — |
| **6. Table & UI Standardization** | `.table-wrap > table.blog-table` | Upgrade bare analytical breakdown table (lines 173–208) to `.table-wrap > table.blog-table` with `.highlight` on ETF row. | — |
| **7. FAQ Expansion (from 4 to 7 items)** (`#faq`) | `.faq-accordion` | Add 3 items: 1. Which platform is cheapest for ETFs in SA? (EasyEquities vs SatrixNOW vs bank brokerages). 2. How are ETF management fees actually deducted? 3. Do ETFs pay cash dividends or auto-reinvest? | +160 words |
| **8. Schema & TOC Updates** | `<script type="application/ld+json">` & `#toc-map` | Expand `FAQPage` schema to 7 items. Update TOC card and `#toc-map`. | — |

---

## 4. Caveats & Assumptions

1. **Read-Only Scope:** In adherence to the Teamwork explorer instructions, no modifications have been made to existing source code or HTML files in `blog/` during this survey.
2. **Word Count Definition:** Programmatic word count is measured on readable editorial text (`article-hero` + `article-body`) excluding HTML tags, inline SVG, and script/style tags. The word counter uses standard tokenization `\b[\w'-]+\b`.
3. **2026/27 TFSA Limit:** Article 4 references the 2026/27 annual contribution limit increase to R46,000. Articles 3 and 6 currently reference the historical R36,000 limit; these must be aligned to R46,000 during the content expansion phase.
4. **AdSense Script Loading:** All blog articles already contain the AdSense client script in `<head>` (`ca-pub-6017523378494978`). Expanding ad slots requires only semantic HTML container placeholders with responsive CSS classes without modifying the client configuration.

---

## 5. Conclusion & Actionable Next Steps

1. **Overall Health:** The blog architecture is well-engineered with responsive CSS, interactive vanilla JS sidebar widgets, and cohesive brand design. However, 4 out of 6 articles (`rule-of-72.html`, `how-long-to-save-1-million-rand.html`, `maximize-compound-interest-monthly-savings.html`, and `etfs-vs-traditional-savings-accounts.html`) average ~950 words and are vulnerable to Google AdSense thin-content disqualification.
2. **Target Objective:** Expanding each of the 4 deficit articles by 600–850 words using the concrete blueprints above will effortlessly bring all articles into the **1,650–1,950 word bracket**, guaranteeing unanimous compliance with Requirement R1 (>1,500 words).
3. **Execution Readiness:**
   - Section outlines, calculations, and tables are fully specified above.
   - All expansions integrate native UI components (`.table-wrap > table.blog-table`, `.img-text-block`, `.callout`, `.faq-accordion`).
   - Structural AdSense placeholders (`.ad-slot.ad-in-article.ad-placeholder`) are assigned specific natural insertion points.
   - Ready for handoff to implementing author/builder agents.

---

## 6. Verification Method

To verify these observations and programmatic word counts independently:

1. **Run the programmatic word count extractor:**
   ```bash
   python3 -c "
   import os, re
   from html.parser import HTMLParser

   class WordCounter(HTMLParser):
       def __init__(self):
           super().__init__()
           self.text = []
           self.in_hb = False
           self.depth = 0
           self.ignored = {'script', 'style', 'head', 'noscript'}
       def handle_starttag(self, tag, attrs):
           if tag.lower() in self.ignored: return
           c = dict(attrs).get('class', '').split()
           if 'article-hero' in c or 'article-body' in c:
               self.depth += 1
               self.in_hb = True
           elif self.in_hb: self.depth += 1
       def handle_endtag(self, tag):
           if self.in_hb:
               self.depth -= 1
               if self.depth <= 0: self.in_hb = False
       def handle_data(self, data):
           if self.in_hb and data.strip(): self.text.append(data.strip())

   for f in ['compound-interest-south-africa.html', 'rule-of-72.html', 'how-long-to-save-1-million-rand.html', 'tax-free-savings-account-calculator-south-africa.html', 'maximize-compound-interest-monthly-savings.html', 'etfs-vs-traditional-savings-accounts.html']:
       with open(os.path.join('blog', f)) as fp:
           p = WordCounter()
           p.feed(fp.read())
           print(f'{f}: {len(re.findall(r\"[a-zA-Z0-9]+(?:[\x27-_][a-zA-Z0-9]+)*\", \" \".join(p.text)))} words')
   "
   ```

2. **Verify Layout & UI Component Classes:**
   Inspect `/Users/alikora/dev/AntiG/CompCalc/assets/css/blog.css` and verify classes `.img-text-block`, `.table-wrap`, `.blog-table`, `.callout`, `.faq-accordion`, `.blog-affiliate-cta`, and `.ad-slot`.
