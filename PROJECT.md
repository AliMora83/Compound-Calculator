# Project: CompoundCalc AdSense Content Expansion & Layout Integration

## Architecture
CompoundCalc is a static client-side financial calculator and advisory publication platform focused on South African personal finance.
- **Frontend Core**: Vanilla HTML5, CSS3, ES6 JavaScript. No bundlers or heavy frameworks.
- **Design System**: Global CSS (`assets/css/styles.css`), Blog styling (`assets/css/blog.css`), Footer styling (`assets/css/footer.css`).
- **Interactive Calculators**:
  - `index.html`: Main Compound Interest Calculator (Tabs: Grow, Goal, Compare)
  - `investment-goal-calculator.html`: Dedicated Goal Target Tool
  - `retirement-calculator.html`: Dedicated Retirement Planning Tool
  - `compare-investments.html`: Side-by-side Investment Vehicle Comparison Tool
- **Editorial Hub & Articles (`blog/`)**:
  - `blog/index.html`: Content Hub & Listing Grid
  - `blog/blog-template.html`: Canonical Article Layout & Pattern
  - `blog/compound-interest-south-africa.html`: Comprehensive guide to compounding in SA (2,188 words)
  - `blog/rule-of-72.html`: Mental maths & doubling calculation guide (3,637 words)
  - `blog/how-long-to-save-1-million-rand.html`: Practical timelines & milestone strategies (3,710 words)
  - `blog/tax-free-savings-account-calculator-south-africa.html`: In-depth Section 12T TFSA mechanics (2,139 words)
  - `blog/maximize-compound-interest-monthly-savings.html`: Monthly contribution acceleration strategies (2,789 words)
  - `blog/etfs-vs-traditional-savings-accounts.html`: Asset allocation, fees, inflation, and returns (2,478 words)
- **Monetization Architecture**:
  - Google AdSense script integrated asynchronously in `<head>`.
  - Responsive, CLS-safe placeholders using `.ad-placeholder` and `.ad-slot` with explicit fallback min-heights, zero overflow risk, and natural editorial visual pauses.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | E2E Test Suite & Runner | Automated test harness checking word counts, SA financial terms, and AdSense placeholder presence across all pages | M-E2E | Survey / Req AC |
| 2 | South African Financial Data Synthesis | Compile 2026 SARB repo/prime rates, CPI inflation, JSE ALSI stats, TFSA/RA SARS limits, and fees into a verified reference dataset | M1 | Survey / Req R2 |
| 3 | Article 2 Expansion (`rule-of-72.html`) | Expand from 877 core words to >1650 words with SA debt trap analysis, inflation erosion, Rule of 70/114/144, FAQ, schema, and mid-article ad | M2 | Survey / Req R1 |
| 4 | Article 3 Expansion (`how-long-to-save-1-million-rand.html`) | Expand from 917 core words to >1650 words with SA income tier modeling, 100k milestone compounding, Two-Pot retirement impact, FAQ, schema, and mid-article ad | M2 | Survey / Req R1 |
| 5 | Article 5 Expansion (`maximize-compound-interest-monthly-savings.html`) | Expand from 1,046 core words to >1650 words with annual contribution escalations, debit order automation, EAC fee drag modeling, FAQ, schema, and mid-article ad | M2 | Survey / Req R1 |
| 6 | Article 6 Expansion (`etfs-vs-traditional-savings-accounts.html`) | Expand from 899 core words to >1650 words with JSE ALSI vs STeFI 30-year comparison, tax drag on cash interest, Satrix/Sygnia fee analysis, FAQ, and mid-article ad | M2 | Survey / Req R1 |
| 7 | Articles 1 & 4 Harmonization & Ad Update | Ensure `compound-interest-south-africa.html` and `tax-free-savings-account-calculator-south-africa.html` have `.ad-placeholder` classes and mid-article ad slots | M2 | Survey / Req R1, R3 |
| 8 | CSS AdSense Harmonization (`styles.css`) | Update CSS to support `.ad-placeholder` alongside `.ad-slot`, CLS protection, dark/light theme alignment, and collapse rules | M1 | Survey / Req R3 |
| 9 | Calculator Pages Ad Placeholder Integration | Update `index.html`, `investment-goal-calculator.html`, `retirement-calculator.html`, and `compare-investments.html` with `.ad-placeholder` elements | M1 | Survey / Req R3 |
| 10 | Blog Hub & Template Placeholder Integration | Update `blog/index.html` and `blog/blog-template.html` with `.ad-placeholder` elements | M1 | Survey / Req R3 |
| 11 | Final E2E Test Suite Pass (Tiers 1-4) | 100% pass on programmatic word counts (>1500 words per article), SA metrics presence, and ad-placeholder structure | M4 | Quality Gate |
| 12 | Adversarial Hardening & Forensic Audit | Challengers and forensic auditor verify originality, visual layout integrity, and absence of cheating or dummy content | M4 | Quality Gate |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M-E2E | E2E Testing Track | Build test runner and test cases (Tiers 1-4) covering word count, SA data, and ad placeholder presence | none | DONE (105 tests, TEST_READY.md) |
| M1 | CSS & AdSense Layout Standardization | Update `assets/css/styles.css` with `.ad-placeholder` rules and integrate `.ad-placeholder` on all calculator pages and blog hub | none | DONE (worker_m1_adsense verified 44/44 pass) |
| M2 | Blog Article Expansion & AdSense Integration | Expand all deficit articles to >1650 words each using authoritative SA financial data, harmonize components, and add mid-article ad-placeholders | M1 | DONE (All articles 2,139 to 3,710 words) |
| M3 | Blog Harmonization & Verification Gate | Verify all 6 blog articles (>1500 words each), TOC synchronization, schema markup, and responsive layout | M2 | DONE (100% TOC sync, valid Schema.org) |
| M4 | Final Milestone: 100% E2E Pass & Forensic Audit | Run full test suite, execute adversarial challenger checks, and forensic integrity audit | M-E2E, M3 | DONE (Gate PASSED: Reviewers APPROVE, Challengers APPROVE, Auditor CLEAN) |

## Interface Contracts
### 1. AdSense Placeholder Contract
- All ad units contain the class `ad-placeholder` and `ad-slot` (e.g. `<div class="ad-placeholder ad-slot ...">`).
- Supported layout modifiers:
  - `.ad-leaderboard`: Horizontal banner on calculators (min-height 120px, max-width 728px).
  - `.ad-rectangle`: Inline/bottom container on calculators (min-height 300px, max-width 336px).
  - `.ad-in-article`: Editorial inline ad within blog posts (min-height 140px, full-width container).
  - `.ad-sidebar-sticky`: Sticky desktop unit inside `.sidebar` (min-height 330px, max-width 280px).
  - `.ad-multiplex`: Grid feed unit on `blog/index.html` (min-height 350px).
- Attributes: `aria-label="Advertisement" aria-hidden="true"`.
- Contains an `<ins class="adsbygoogle" ...>` block and child `<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`.

### 2. Word Count Verification Contract
- Evaluated programmatically by stripping HTML tags (`<[^>]+>`), `<script>`, `<style>`, `<noscript>`, and `<head>`.
- Word counts strictly greater than 1,500 words for each of the 6 files:
  - `blog/compound-interest-south-africa.html`: 2,188 words (PASS)
  - `blog/rule-of-72.html`: 3,637 words (PASS)
  - `blog/how-long-to-save-1-million-rand.html`: 3,710 words (PASS)
  - `blog/tax-free-savings-account-calculator-south-africa.html`: 2,139 words (PASS)
  - `blog/maximize-compound-interest-monthly-savings.html`: 2,789 words (PASS)
  - `blog/etfs-vs-traditional-savings-accounts.html`: 2,478 words (PASS)

### 3. South African Financial Data Contract
All expanded articles reference real, current South African financial parameters:
- SARB Repo Rate: 7.25%; Prime Lending Rate: 10.75%.
- Inflation: CPI headline ~4.4%; SARB 3%-6% target band.
- JSE All Share Index (ALSI) vs Cash (STeFI).
- SARS Section 12T TFSA: Statutory R36,000/yr / R46,000 allowance, R500,000 lifetime limit, 40% penalty tax.
- SARS Section 11F Retirement Annuity (27.5% deduction) and Two-Pot Retirement System (Savings Pot vs Retirement Pot).

### 4. Table of Contents & Headings Contract
- Every `h2` heading in a blog article has a matching entry in `.toc-list` and in the `<script id="toc-map" type="application/json">` JSON array.

## Code Layout
- `assets/css/styles.css`: Owns global styles and ad placeholder definitions.
- `index.html`: Main calculator page.
- `investment-goal-calculator.html`, `retirement-calculator.html`, `compare-investments.html`: Dedicated calculators.
- `blog/index.html`: Blog hub listing.
- `blog/blog-template.html`: Canonical template.
- `blog/*.html`: 6 individual blog articles.
- `tests/e2e/`: E2E test scripts, verification runner, and test assertions.
