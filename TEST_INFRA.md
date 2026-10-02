# E2E Test Infrastructure & 4-Tier Test Methodology

## 1. Overview & Objective

CompoundCalc is a South African financial calculator and advisory publishing platform. Following a Google AdSense "thin content" rejection, the project is executing a content expansion and layout modernization initiative:
1. **Content Volume**: Expand all 6 blog articles in `blog/` to strictly greater than 1,500 programmatic words each.
2. **Authoritative South African Data**: Infuse up-to-date (2026) South African macroeconomic and regulatory figures (SARB repo rate 7.25%, prime rate 10.75%, CPI ~4.4%, JSE ALSI returns, Section 12T TFSA rules, Section 11F RA, Two-Pot retirement system, and ASISA EAC fee standards).
3. **AdSense Readiness**: Integrate responsive, CLS-safe structural ad placeholders (`.ad-placeholder`) across all calculator tools and blog articles without visual regression.

To guarantee zero regression, total compliance, and verifiable quality, this document establishes the **4-Tier E2E Testing Architecture** and its automated verification runner.

---

## 2. The 4-Tier Test Case Design Methodology

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TIER 4: REAL-WORLD SCENARIOS                         │
│  SARB Repo & Prime Rates • CPI Inflation Band • JSE ALSI vs Cash STeFI │
│  SARS Section 12T TFSA • SARS Section 11F RA & Two-Pot • ASISA EAC Drag│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│              TIER 3: CROSS-FEATURE COMBINATIONS                        │
│  TOC Anchors ↔ H2 ID Sync • JSON-LD Schema (Article/FAQPage) Validity │
│  Responsive Ad Slot Layout Modifiers • CSS CLS Rules & Fallbacks       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│              TIER 2: BOUNDARY & CORNER CASES                           │
│  HTML Tag Stripping Rigor • Script/Style/Head/SVG Non-Content Exclusion│
│  Whitespace & Token Normalization • Exact CSS Token Parsing • DOM Level│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                   TIER 1: FEATURE COVERAGE                             │
│  6 Blog Articles Word Counts > 1,500 • 4 Calculator Ad Placeholders    │
│  6 Blog Articles Ad Placeholders • AdSense Async Head Script Presence  │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Tier 1: Feature Coverage (Core Requirements)

Tier 1 directly verifies the core acceptance criteria specified in `ORIGINAL_REQUEST.md` and `PROJECT.md`.

| Test ID | Test Target | Verification Criteria | Expected Outcome |
|---|---|---|---|
| `T1-WORD-001` | `blog/compound-interest-south-africa.html` | Programmatic editorial word count > 1,500 words | PASS (>1,500 words) |
| `T1-WORD-002` | `blog/rule-of-72.html` | Programmatic editorial word count > 1,500 words | PASS (>1,500 words post-expansion) |
| `T1-WORD-003` | `blog/how-long-to-save-1-million-rand.html` | Programmatic editorial word count > 1,500 words | PASS (>1,500 words post-expansion) |
| `T1-WORD-004` | `blog/tax-free-savings-account-calculator-south-africa.html` | Programmatic editorial word count > 1,500 words | PASS (>1,500 words) |
| `T1-WORD-005` | `blog/maximize-compound-interest-monthly-savings.html` | Programmatic editorial word count > 1,500 words | PASS (>1,500 words post-expansion) |
| `T1-WORD-006` | `blog/etfs-vs-traditional-savings-accounts.html` | Programmatic editorial word count > 1,500 words | PASS (>1,500 words post-expansion) |
| `T1-AD-CALC-001` | `index.html` | Presence of `.ad-placeholder` container | PASS (`ad-placeholder` present) |
| `T1-AD-CALC-002` | `investment-goal-calculator.html` | Presence of `.ad-placeholder` container | PASS (`ad-placeholder` present) |
| `T1-AD-CALC-003` | `retirement-calculator.html` | Presence of `.ad-placeholder` container | PASS (`ad-placeholder` present) |
| `T1-AD-CALC-004` | `compare-investments.html` | Presence of `.ad-placeholder` container | PASS (`ad-placeholder` present) |
| `T1-AD-BLOG-001` | `blog/*.html` (All 6 articles) | Presence of `.ad-placeholder` in-article & sidebar | PASS (`ad-placeholder` present) |
| `T1-AD-HUB-001` | `blog/index.html` & `blog/blog-template.html` | Presence of `.ad-placeholder` containers | PASS (`ad-placeholder` present) |
| `T1-SCRIPT-001` | All 10 core pages (calculators & blogs) | Google AdSense client script in `<head>` | PASS (`ca-pub-6017523378494978` loaded) |

---

### Tier 2: Boundary & Corner Cases (Parser Rigor & DOM Robustness)

Tier 2 exercises the test suite against edge cases, parser trickery, and HTML formatting traps to ensure the test harness cannot be fooled by dummy content or invalid markup.

| Test ID | Test Case | Edge Condition / Boundary Handled | Validation Rule |
|---|---|---|---|
| `T2-STRIP-001` | Non-Content Element Stripping | Scripts, inline CSS `<style>`, `<head>`, `<noscript>`, inline `<svg>`, and HTML comments | Content within these blocks MUST NOT contribute to the programmatic word count. |
| `T2-STRIP-002` | Tag & Attribute Stripping | Elements with complex multiline attributes, data attributes containing text, quotes with `>` (`<div title="> foo">`) | HTML parser must parse tokens accurately without counting attribute values as words. |
| `T2-NORM-001` | Whitespace & Entity Normalization | `&nbsp;`, `&amp;`, line breaks `\r\n`, multiple contiguous spaces, tabs | Converted to single normalized spaces before tokenization. |
| `T2-NORM-002` | ZAR Currency & Hyphen Tokenization | Currency amounts (`R1,000,000`, `R46k`), hyphenated terms (`tax-free`, `in-depth`), percentages (`7.25%`) | Preserved as valid single words; punctuation stripping does not artificially split numbers or destroy words. |
| `T2-DOM-001` | Exact CSS Class Token Matching | Substring class collision (e.g. `bad-placeholder` or `not-ad-placeholder`) | Verified by tokenizing class attribute strings (split by whitespace) to require exact `ad-placeholder` class match. |
| `T2-DOM-002` | DOM Nesting Validity for Ads | Structural placement of ad blocks | Placeholders must not be improperly placed inside inline tags (`<p>`, `<span>`) or table structures (`<table>`, `<tr>`, `<td>`), but inside block containers (`.article-body`, `.calc-wrap`, `.sidebar`). |
| `T2-A11Y-001` | Ad Container Accessibility | Ad containers are supplementary monetized elements | Placeholders must specify `aria-label="Advertisement"` and/or `aria-hidden="true"` to prevent screen reader degradation. |

---

### Tier 3: Cross-Feature Combinations (Integration & Synchronization)

Tier 3 checks that interconnected subsystems remain harmonized when articles expand and ad units are placed.

| Test ID | Test Target | Cross-Feature Interaction | Verification Rule |
|---|---|---|---|
| `T3-TOC-001` | `blog/*.html` | H2 Headings ↔ Sidebar `.toc-list` ↔ `#toc-map` JSON | Every `<h2>` in the article body must have an `id` that matches an entry in `.toc-list` (`a[href="#..."]`) and an entry in the `#toc-map` JSON array. |
| `T3-SCHEMA-001` | `blog/*.html` | JSON-LD Structured Data Validity | `<script type="application/ld+json">` must be valid JSON conforming to Schema.org `Article` and `FAQPage` structures. |
| `T3-SCHEMA-002` | `blog/*.html` | FAQ Accordion ↔ FAQPage Schema Sync | Questions in the visible `.faq-accordion` must correspond to `mainEntity` questions in the `FAQPage` schema. |
| `T3-LAYOUT-001` | `blog/*.html` & Calculators | Ad Placeholder Modifier Classes | Placeholders must bear recognized modifier classes: `.ad-leaderboard`, `.ad-rectangle`, `.ad-in-article`, `.ad-sidebar-sticky`, or `.ad-multiplex`. |
| `T3-CSS-001` | `assets/css/styles.css` | AdSense CSS Architecture & CLS Prevention | CSS must define rules for `.ad-placeholder`, reserve `min-height` (120px+), enforce `max-width: 100%`, and provide unfilled collapse (`:has(ins[data-ad-status="unfilled"])`, `:empty`). |

---

### Tier 4: Real-World Scenarios (Authoritative South African Financial Context)

Tier 4 tests the accuracy, depth, and domain fidelity of the South African financial data embedded in each article.

| Test ID | Financial Topic | Authoritative 2026 Benchmark | Verification Rule | Target Articles |
|---|---|---|---|---|
| `T4-SA-REPO` | SARB Repo Rate | **7.25%** | Verifies mention of SARB repo rate (7.25%) | Articles 1, 2, 5, 6 |
| `T4-SA-PRIME` | Prime Lending Rate | **10.75%** (Repo + 3.50%) | Verifies prime rate (10.75%) | Articles 1, 2, 6 |
| `T4-SA-CPI` | Inflation & SARB Band | **4.4%** CPI; 3%–6% target band (with 3% target) | Verifies CPI inflation and SARB target band | Articles 1, 2, 3, 5, 6 |
| `T4-SA-JSE` | JSE ALSI vs Cash | ALSI ~10.45%–12% nominal vs STeFI ~6.5%–7.5% | Verifies JSE All Share Index and Cash comparison | Articles 1, 3, 5, 6 |
| `T4-SA-TFSA` | SARS Section 12T (TFSA) | R36,000 / R46,000 annual limit, R500,000 lifetime, 40% penalty | Verifies TFSA statutory limits and 40% penalty tax | Articles 1, 3, 4, 6 |
| `T4-SA-RA` | SARS Section 11F & Two-Pot | 27.5% deduction up to R350,000/R430,000; Two-Pot System (Savings & Retirement Pot) | Verifies RA Section 11F tax deduction and Two-Pot rules | Articles 1, 3, 4 |
| `T4-SA-EAC` | Fee Drag Modeling | ASISA EAC / TER comparison (0.25%–0.5% ETF vs 2.5% unit trust) | Verifies compounding impact of fees | Articles 1, 5, 6 |
| `T4-SA-ZAR` | South African Rand Context | Pervasive ZAR / R currency figures | All articles must be denominated in Rands (R / ZAR) | All 6 articles |

---

## 3. Test Runner Architecture (`tests/e2e/run_tests.py`)

The test suite is implemented in clean, modular Python without external dependencies:

```
tests/e2e/
├── __init__.py                # Package initialization
├── word_counter.py           # Robust, compliant HTML parser & word counter
├── tier1_feature_coverage.py  # Tier 1 tests: Word counts, ad-placeholders, scripts
├── tier2_boundary_corner.py   # Tier 2 tests: Parsing edge cases, CSS tokens, DOM nesting
├── tier3_cross_feature.py     # Tier 3 tests: TOC sync, JSON-LD schema, CSS rules
├── tier4_real_world.py        # Tier 4 tests: SA financial metrics & regulatory checks
└── run_tests.py              # CLI test harness, reporter, exit code controller
```

### Execution Command
```bash
python3 tests/e2e/run_tests.py
```

### Expected Behavior
- Discovers and executes all test cases across Tiers 1 through 4.
- Prints clear visual progress with colorized terminal output (PASS/FAIL/SKIP).
- Aggregates metrics (word counts per article, ad placeholder count per page, SA metric coverage).
- Returns **exit code 0** when 100% of tests pass.
- Returns **exit code 1** when any test fails, logging granular failure diagnostics.

---

## 4. Initial Baseline Status (Pre-Implementation)

Before the content expansion and layout modernization milestones are completed, the initial test run establishes the baseline:

1. **Tier 1**:
   - `compound-interest-south-africa.html` PASSES (>1,500 words).
   - `tax-free-savings-account-calculator-south-africa.html` PASSES (>1,500 words).
   - `rule-of-72.html` FAILS (~1,073 words, deficit: ~427 words).
   - `how-long-to-save-1-million-rand.html` FAILS (~1,091 words, deficit: ~409 words).
   - `maximize-compound-interest-monthly-savings.html` FAILS (~1,172 words, deficit: ~328 words).
   - `etfs-vs-traditional-savings-accounts.html` FAILS (~1,020 words, deficit: ~480 words).
   - Ad placeholder tests FAIL across all pages (`ad-placeholder` class not yet added to `.ad-slot`).
2. **Tier 2**:
   - Tag stripping and whitespace normalization PASS.
   - CSS token check FAILS on `ad-placeholder` until added.
3. **Tier 3**:
   - Existing TOC and Schema PASS on baseline articles.
   - CSS `.ad-placeholder` styling rule FAILS until `styles.css` is updated.
4. **Tier 4**:
   - General ZAR and TFSA mentions PASS on some articles.
   - Specific 2026 SARB Repo (7.25%), Prime (10.75%), Two-Pot retirement system, and EAC fee drag FAIL on deficit articles until expanded.

This baseline confirms that the test runner provides an accurate, sensitive, and un-gamed quality gate.
