# Handoff Report: Specification Mining & South African Financial Data Survey

**Agent**: `spec_miner_survey_1`  
**Working Directory**: `/Users/alikora/dev/AntiG/CompCalc/.agents/teamwork/spec_miner_survey_1/`  
**Milestone**: Requirements & SA Financial Specification Mining  
**Target Date**: 2026-10-01  
**Recipient**: `f5869b68-300f-442a-8f5f-542634ccf79e` (orchestrator)

---

## 1. Observation

### 1.1 Current Blog Article Word Counts & Deficits
Programmatic extraction of text content (excluding HTML `<script>`, `<style>`, and tags) reveals the baseline word count across all 6 blog articles in `/Users/alikora/dev/AntiG/CompCalc/blog/`:

| File Name | Current Words | Word Deficit (<1500) | Status |
| :--- | :---: | :---: | :--- |
| `compound-interest-south-africa.html` | 2,169 | 0 (Exceeds 1500) | Meets volume; needs SA data hardening & ad placeholder |
| `etfs-vs-traditional-savings-accounts.html` | 1,030 | **-470 words** | **CRITICAL DEFICIT** — Needs major content expansion |
| `how-long-to-save-1-million-rand.html` | 1,103 | **-397 words** | **CRITICAL DEFICIT** — Needs major content expansion |
| `maximize-compound-interest-monthly-savings.html` | 1,182 | **-318 words** | **CRITICAL DEFICIT** — Needs major content expansion |
| `rule-of-72.html` | 1,086 | **-414 words** | **CRITICAL DEFICIT** — Needs major content expansion |
| `tax-free-savings-account-calculator-south-africa.html` | 2,049 | 0 (Exceeds 1500) | Meets volume; needs limit reconciliation & ad placeholder |

Total word expansion required across the 4 deficit articles is at minimum **1,600 words** to bring every single article reliably above the 1,500-word Google AdSense threshold.

### 1.2 Current AdSense & Layout Architecture
- **Script Status**: All pages load the baseline AdSense tag:
  `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6017523378494978" crossorigin="anonymous"></script>`.
- **Existing Ad Slots**: Blog articles and calculators include `.ad-slot` divs (`ad-in-article`, `ad-sidebar-sticky`, `ad-leaderboard`, `ad-multiplex`).
- **Missing Required Class**: A grep across the entire codebase confirms that **zero** elements currently have the `ad-placeholder` class specified in the user acceptance criteria (`R3. AdSense Preparation`).
- **CSS Behavior (`assets/css/styles.css:1408–1414`)**:
  ```css
  .ad-slot:has(ins[data-ad-status="unfilled"]),
  .ad-slot:empty {
    display: none;
  }
  ```
  Empty or unfilled ad slots cleanly collapse to prevent awkward white space, while `.ad-slot` reserves `min-height: 120px` to protect against Cumulative Layout Shift (CLS).

### 1.3 Authoritative South African Financial Market Data (Verified 2026)

| Indicator / Metric | Authoritative Value | Source / Statutory Reference | Operational Significance for Content |
| :--- | :--- | :--- | :--- |
| **SARB Repo Rate** | **7.25%** | South African Reserve Bank (SARB) MPC | Base cost of credit set by the Monetary Policy Committee; dictates bank deposit rates and benchmark borrowing. |
| **Prime Lending Rate** | **10.75%** | Commercial Banks Benchmark | Fixed at **Repo + 3.50%** (350 basis points spread). Used to calculate debt doubling times and retail credit costs. |
| **Headline CPI Inflation** | **4.4%** (Aug 2026), **4.3%** (Jul 2026) | Statistics South Africa (Stats SA) | Average for 2025 was 3.2%. Key input for measuring the real erosion of purchasing power. |
| **SARB Inflation Target Band** | **3.0% – 6.0%** (historical band, 4.5% midpoint); **3.0% ±1%** (updated policy target) | SARB & National Treasury Policy | Informs real returns. Over 20 years at 4.5% inflation, purchasing power halves in 16 years. |
| **JSE ALSI Historical Returns** | **~10.45% – 12.0%** annualized nominal total return | FTSE/JSE All Share Index (ALSI) | Over 5-decade horizons, real return above CPI is **5.4% – 8.4%**. ~60%+ of Top 40 revenue is offshore (rand hedge). |
| **STeFI Cash Return** | **~6.5% – 7.5%** annualized nominal | Short-Term Fixed Interest Index | Safe nominal return, but real return after inflation and marginal tax is negative or near 0%. |
| **TFSA Annual Limit** | **R36,000** (statutory baseline) / **R46,000** (2026/27 Budget) | Section 12T of the Income Tax Act | R3,000/mo (at R36k) or R3,833/mo (at R46k). 100% exempt from income tax, DWT, and CGT. |
| **TFSA Lifetime Limit** | **R500,000** | Section 12T of the Income Tax Act | Cumulative contributions cap. Reached in ~10.9 yrs at R46k/yr or ~13.9 yrs at R36k/yr. Unused allowance cannot be rolled over. |
| **TFSA Penalty Tax** | **40% penalty** on excess | Section 12T of the Income Tax Act | SARS assesses 40% on any contribution exceeding annual or lifetime caps. Withdrawals cannot be replaced. |
| **Retirement Annuity (RA) Deductibility** | **27.5%** of taxable income / remuneration | Section 11F of the Income Tax Act | Subject to statutory cap of **R350,000** (increased to R430,000 for 2026/27). Growth inside fund tax-exempt (Reg 28). |
| **Two-Pot Retirement System** | Effective **1 September 2024** | Pension Funds Amendment Act / SARS | 1/3 Savings Pot (1 withdrawal/tax yr, min R2,000, taxed at marginal rate); 2/3 Retirement Pot (locked until 55, annuitized). |
| **Personal Income Tax Brackets** | **18% to 45%** across 7 brackets | SARS Tax Tables 2026/27 | Tax threshold R99,000. Top marginal bracket begins above R1,878,600. |
| **Annual Interest Exemption** | **R23,800** (<65) / **R34,500** (65+) | Section 10(1)(i) of the Income Tax Act | Interest earned in bank accounts above this threshold is taxed at the individual's marginal tax rate. |
| **Dividends Withholding Tax** | Flat **20%** | Part VIII of Income Tax Act | Withheld at source on local company dividends. Exempt within TFSA and RA. |
| **Capital Gains Tax (CGT)** | **40% inclusion rate**; Max effective **18%** | Eighth Schedule to the Income Tax Act | Annual capital gain exclusion: **R50,000** (updated from R40,000). Max effective = 40% × 45% top marginal rate. |
| **ASISA EAC Standard** | **Effective Annual Cost (EAC)** | Association for Savings and Investment SA | 4 components: Investment Management (TER/TIC), Advice, Admin, Other. A 1% extra fee erodes ~25%–35% over 30 yrs. |
| **NCA Maximum Interest Caps** | Credit card: Repo + 14% (**21.25%**); Loans: Repo + 21% (**28.25%**) | National Credit Act (NCA) regulations | Legal interest caps charged by credit providers; explains debt doubling times in 2.5 to 3.4 years. |

---

## 2. Logic Chain

```
[AdSense "Thin Content" Rejection]
         │
         ▼
[Programmatic Word Count Analysis] ──► 4 of 6 articles have 1,030–1,182 words (Deficit: 318–470 words)
         │
         ▼
[Authoritative SA Financial Mining] ──► SARB Repo (7.25%), Prime (10.75%), CPI (4.4%), JSE ALSI, SARS (Sec 12T/11F), EAC
         │
         ▼
[Article Expansion Blueprint] ───────► Target: 1,600–2,200 words each with bespoke SA data, calculations & tables
         │
         ▼
[AdSense Structural Placeholders] ───► Insert class `ad-placeholder` on dedicated ad slots across all 6 blogs & 4 calculators
         │
         ▼
[Zero Layout Regression & SEO] ──────► Update Table of Contents (TOC), JSON-LD schemas, and responsive CSS styling
```

1. **Root Cause Identification**: Google AdSense evaluates content density, originality, and depth. Articles with ~1,000 words that provide basic formulas are flagged as "thin content." Expanding each article to 1,600–2,200 words using specific, localized South African financial figures (ZAR amounts, SARS section numbers, SARB rates) provides incontrovertible proof of high-value editorial content.
2. **Mathematical Coherence**: Financial readers in South Africa quickly identify outdated figures (e.g., citing a 3.5% repo rate from 2020 or omitting the Two-Pot retirement system). By anchoring all 6 articles to current 2026 realities (7.25% repo, 10.75% prime, Section 12T limits, EAC fee drag), the site establishes domain authority and high user engagement.
3. **AdSense Integration Without CLS**: Acceptance Criterion 3 requires dedicated placeholder elements (`div.ad-placeholder`) in natural ad-break locations. Incorporating `ad-placeholder` directly onto `.ad-slot` or wrapping ad containers ensures compatibility with AdSense verification algorithms while retaining the existing anti-CLS and auto-collapse CSS rules.
4. **Interactive Architecture**: Adding new `<h2>` sections requires updating each article's sidebar Table of Contents (`.toc-list`) and the underlying `<script id="toc-map">` JSON mapping, so user navigation remains seamless.

---

## 3. Caveats

1. **TFSA Statutory Limit Transition (R36,000 vs R46,000)**:
   - For multiple tax years (2020 through 2025/26), the Section 12T limit was R36,000 per year (R3,000/month).
   - In the recent 2026/27 budget, this limit was updated to R46,000 per year (R3,833/month).
   - **Guidance for Writers**: Both limits should be clearly contextualized: reference the statutory baseline R36,000 (as stated in the dispatch prompt) and acknowledge the 2026/27 R46,000 threshold so articles remain timeless and accurate.
2. **Retirement Annuity Section 11F Cap (R350,000 vs R430,000)**:
   - The established Section 11F cap of R350,000/year (27.5% of remuneration/taxable income) was updated to R430,000 in the 2026 budget. Both numbers must be explained.
3. **Two-Pot System Nuances**:
   - The Two-Pot system does *not* alter the tax deductibility of contributions under Section 11F; however, withdrawals from the Savings Pot are taxed at marginal income tax rates (18%–45%), which can surprise savers.
4. **JSE ALSI Rand-Hedge Composition**:
   - The JSE All Share Index does not purely reflect the domestic South African economy because heavyweights (Richemont, Naspers/Prosus, Anglo American, BHP, British American Tobacco) earn revenues offshore in USD/EUR/GBP, acting as an organic hedge against Rand depreciation.

---

## 4. Conclusion & Specification Mining Deliverables

### 4.1 Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | R1: Content Volume | Word Count Expansion | All 6 blog articles must have >1,500 words of visible text excluding markup. | HTML files in `blog/` | Formatted body text >1,500 words | AdSense thin-content rejection if <1,500 words | `ORIGINAL_REQUEST.md` § Content Volume |
| 2 | R2: SA Financial Data | SARB Interest Rates | Cite current SARB Repo Rate (7.25%) and Prime Lending Rate (10.75%). | Central bank monetary policy | Accurate borrowing/savings benchmarks | Outdated rates diminish site authority | `DISPATCH.md` Step 2, SARB MPC search |
| 3 | R2: SA Financial Data | CPI & Inflation Target | Document Stats SA CPI (4.4%) and SARB 3–6% inflation band (and new 3% target). | Historical CPI prints | Real return calculations & purchasing power tables | Misleading nominal-only projections | Stats SA & National Treasury policy |
| 4 | R2: SA Financial Data | JSE ALSI Historical Returns | Provide long-term equity returns (~10.45%–12% nominal, 6%–8% real). | Multi-decade market indices | Stock vs cash compounding comparisons | Over-optimistic or under-estimated returns | FTSE/JSE All Share Index search |
| 5 | R2: SA Financial Data | SARS Section 12T (TFSA) | Detail R36,000 / R46,000 annual limit, R500,000 lifetime cap, 40% penalty. | SARS tax rules | Tax-exempt compound interest models | 40% SARS penalty tax on excess contributions | SARS Section 12T legislation |
| 6 | R2: SA Financial Data | SARS Section 11F (RA) | Detail 27.5% deduction up to R350,000 / R430,000 cap and Two-Pot system. | Remuneration / taxable income | Tax rebate & gross retirement accumulation | High marginal tax on premature savings pot withdrawal | SARS Section 11F legislation |
| 7 | R2: SA Financial Data | ASISA EAC Fee Standard | Model compounding drag of 1% to 2% extra EAC over 20–30 years. | EAC percentages (0.5%–2.5%) | Net wealth accumulation tables | 25%–35%+ wealth destruction over 30 years | ASISA EAC Standard |
| 8 | R3: AdSense Layout | Dedicated Ad Placeholders | Integrate dedicated `div.ad-placeholder` elements at natural breaks across site. | HTML container markup | Stable layout placeholders for AdSense tags | Layout shift (CLS) or AdSense crawler rejection | `ORIGINAL_REQUEST.md` § AdSense Readiness |
| 9 | UX & SEO | TOC & toc-map Synchronization | Sync sidebar Table of Contents and `#toc-map` JSON with all new `<h2>` headings. | `<h2>` text and anchor IDs | Functional in-page jumping and active highlight | Broken TOC links if ID missing in `#toc-map` | `assets/js/blog.js:25–40` |
| 10 | UX & SEO | Schema.org Structured Data | Maintain and extend JSON-LD schema (`Article`, `FAQPage`) for new sections. | FAQ and article metadata | Valid Schema.org JSON-LD | Rich snippet invalidation if JSON malformed | Existing blog HTML `<head>` |
| 11 | Financial Logic | Calculator Deep-Linking | Maintain deep-linking URL parameters to live calculator tools (`/?p=&m=&r=&y=`). | Query string parameters | Pre-populated calculator state for reader | Broken link or default reset if params malformed | `assets/js/blog.js:57–80` |

### 4.2 Edge Cases

| # | Feature | Input / Boundary Condition | Observed / Documented Behavior |
|---|---------|----------------------------|--------------------------------|
| 1 | Programmatic Word Count | Article text containing inline SVG icons, JSON scripts, or HTML comments | Must be stripped before counting; naive string splits count code tokens and skew validation. |
| 2 | TFSA Over-contribution | Investor contributes R40,000 in a year with a R36,000 limit (R4,000 excess) | SARS assesses a 40% penalty on the R4,000 excess = **R1,600 tax penalty**, regardless of investment gains/losses. |
| 3 | TFSA Lifetime Cap Reached | Investor hits R500,000 lifetime contributions after 11–14 years | Deposits must cease completely; account remains open and compounds 100% tax-free indefinitely. |
| 4 | TFSA Withdrawal Replacement | Investor withdraws R50,000 for emergency and deposits it back 2 months later | The R50,000 re-deposit counts as a fresh contribution; triggers 40% penalty if annual or lifetime cap is exceeded. |
| 5 | Two-Pot Savings Pot Withdrawal | Saver withdraws R30,000 from Savings Pot while in 36% marginal tax bracket | R30,000 is added to taxable income; SARS withholds R10,800 + admin fee; net received is only ~R19,000. |
| 6 | Interest Exemption Spillover | Investor earns R35,000 interest in retail bank account (under 65 yrs old) | First R23,800 is tax-free; remaining R11,200 is taxed at marginal rate (up to 45% = R5,040 tax drag). |
| 7 | Rule of 72 at Extreme Rates | Micro-lending or unsecured debt at 28.25% or 60% per annum | Rule of 72 becomes slightly inaccurate (real doubling time is faster due to compounding frequency); exact formula required. |
| 8 | Empty Ad Placeholder Display | Ad unit unfilled by Google AdSense network | CSS `.ad-slot:has(ins[data-ad-status="unfilled"])` collapses container to 0px, avoiding blank gaps. |

---

## 5. Article-by-Article Expansion Blueprint

### Article 1: `blog/compound-interest-south-africa.html`
- **Current Word Count**: 2,169 words (Meets >1,500 target).
- **Target Word Count**: 2,200–2,400 words.
- **Editorial Action**: Harden South African financial data references and ensure AdSense placeholders are tagged.
- **Specific SA Data Additions**:
  - Formalize SARB repo rate (7.25%) and prime lending rate (10.75%) in the rate comparison section.
  - Expand on the SARB inflation target framework (3–6% historical band, 4.5% midpoint, and 3% target) with a real vs nominal purchasing power breakdown.
  - Add worked SARS tax drag example: Section 10(1)(i) interest exemption (R23,800) vs Section 12T TFSA tax freedom.
  - Include an ASISA EAC fee impact comparison table: 0.5% vs 1.5% vs 2.5% over 30 years on R1,000/month at 10%.
- **AdSense Placement**: Add `class="ad-slot ad-placeholder ad-in-article"` after the 2nd `<h2>` and ensure sidebar ad slot has `ad-placeholder`.

### Article 2: `blog/etfs-vs-traditional-savings-accounts.html`
- **Current Word Count**: 1,030 words (**Deficit: 470 words**).
- **Target Word Count**: 1,650–1,800 words (**Expand by +650–750 words**).
- **New Sections to Add**:
  1. `<h2>The True Tax Drag: Section 10(1)(i) Interest Exemption vs ETF Capital Gains</h2>` (~200 words):
     - Detail the SARS R23,800 interest exemption for cash. Show how cash interest above this threshold is taxed at marginal rates up to 45%.
     - Detail ETF taxation in taxable accounts: 20% flat Dividends Withholding Tax (DWT) and Capital Gains Tax (40% inclusion above R50,000 exclusion, max 18% effective rate).
     - Contrast with Section 12T TFSA accounts where ETFs incur 0% DWT and 0% CGT.
  2. `<h2>Historical Performance: JSE All Share Index (ALSI) vs Cash (STeFI) Over 20 Years</h2>` (~200 words):
     - Cite long-term JSE ALSI performance (~10.45%–11.5% nominal, ~6%–8% real return).
     - Cite cash index STeFI performance (~6.5%–7.5% nominal, barely 1%–2% real return).
     - Include a comparison table: R100,000 lump sum over 10, 20, and 30 years in cash at 7% vs JSE ALSI at 11%.
  3. `<h2>The Hidden Cost of Fees: Understanding TER and the ASISA EAC Standard</h2>` (~180 words):
     - Explain Total Expense Ratio (TER) of local ETFs (Satrix 40 TER ~0.25%, 10X Total World TER ~0.35%) vs traditional active unit trusts (TER 1.50% + advisor 0.75% + platform 0.25% = EAC 2.50%).
     - Show how a 1.5% EAC fee differential reduces a 30-year investment balance by more than 30%.
  4. `<h2>The Inflation Erosion Trap at Current SARB Interest Rates</h2>` (~150 words):
     - Analyze the current environment: SARB repo at 7.25%, prime at 10.75%, retail bank savings paying 7.0%.
     - Contrast with CPI inflation at 4.4%. After deducting income tax at 31% marginal rate, the net return is 4.83% — barely matching inflation (real return ~0.4%).
- **TOC & Schema Updates**: Add new headings to `.toc-list` and `#toc-map`. Add `ad-placeholder` to ad containers.

### Article 3: `blog/how-long-to-save-1-million-rand.html`
- **Current Word Count**: 1,103 words (**Deficit: 397 words**).
- **Target Word Count**: 1,650–1,800 words (**Expand by +550–650 words**).
- **New Sections to Add**:
  1. `<h2>What Does R1 Million Actually Buy? Inflation and Real Purchasing Power in ZAR</h2>` (~200 words):
     - Address the illusion of the nominal R1M milestone. Explain how compound inflation erodes purchasing power using the SARB 4.5% midpoint.
     - Show that in 20 years at 4.5% CPI, R1 million will only have the purchasing power of ~R414,000 today.
     - Calculate the "Inflation-Adjusted Target": to have today's R1 million purchasing power in 20 years requires R2,411,714.
  2. `<h2>The Tax Speed Bump: How SARS Slows Down Your Journey to R1 Million</h2>` (~180 words):
     - Compare the timeline to R1 million in a standard taxable savings/investment account vs a Section 12T Tax-Free Savings Account (TFSA).
     - Model how paying tax on interest (above R23,800) or dividends (20% DWT) adds 2.5 to 4 years to the timeline.
     - Address the role of Retirement Annuities (Section 11F: 27.5% tax deduction up to R350,000/R430,000) in boosting the initial contribution via SARS tax refunds.
  3. `<h2>Asset Class Timeline Comparison Matrix (Cash, Balanced, Equities)</h2>` (~200 words):
     - Comprehensive comparison table showing years to reach R1 Million at contributions of R1,000, R2,500, R5,000, and R10,000 per month across:
       - Money Market / Fixed Deposit (7.0% nominal)
       - Reg 28 Multi-Asset Balanced Fund (9.5% nominal)
       - JSE All Share Equity Index ETF (11.0% nominal)
       - Global Equity Index ETF in ZAR (12.5% nominal)
  4. `<h2>The Cost of Delay: What Waiting 5 Years Costs in Cold Hard Rand</h2>` (~120 words):
     - Concrete calculation showing the difference between starting at 25 vs 30 to reach R1M by age 45.
- **TOC & Schema Updates**: Add new headings to `.toc-list` and `#toc-map`. Add `ad-placeholder` to ad containers.

### Article 4: `blog/maximize-compound-interest-monthly-savings.html`
- **Current Word Count**: 1,182 words (**Deficit: 318 words**).
- **Target Word Count**: 1,650–1,800 words (**Expand by +500–600 words**).
- **New Sections to Add**:
  1. `<h2>The Compounding Turbocharger: Annual Contribution Escalation</h2>` (~200 words):
     - Explain why a flat monthly debit order loses momentum against inflation.
     - Model an annual savings escalation of 5% or 6% (matching average South African salary increases).
     - Table comparing a flat R2,000/month contribution vs a R2,000/month contribution escalated at 6% per year over 25 years at 10% return (Result: Flat reaches ~R2.65M; Escalated reaches ~R5.12M — nearly double!).
  2. `<h2>Reinvestment Mechanics: DRIP and the 20% Dividend Tax Drag</h2>` (~180 words):
     - Detail how dividend reinvestment plans (DRIP) work on the JSE.
     - Explain why cash drag (leaving dividend payouts sitting in transactional accounts) destroys compounding velocity.
     - Contrast the impact of 20% DWT in taxable accounts vs the 0% DWT inside a Section 12T TFSA.
  3. `<h2>Payday Automation and the 25th of the Month Rule in South Africa</h2>` (~120 words):
     - Tactical implementation in the South African banking context: setting recurring debit orders on the 25th (national salary day) to eliminate behavioral friction.
     - Explain daily interest accrual vs monthly compounding in South African money market and retail accounts.
  4. `<h2>Fixed Fee Traps on Small Monthly Contributions</h2>` (~120 words):
     - Highlight the danger of fixed monthly platform fees (e.g., R25/month account fees). On a R500/month debit order, a R25 fee is an immediate 5% negative drag on capital before investment.
     - Emphasize choosing zero-minimum, percentage-based platforms (ASISA EAC < 0.75%).
- **TOC & Schema Updates**: Add new headings to `.toc-list` and `#toc-map`. Add `ad-placeholder` to ad containers.

### Article 5: `blog/rule-of-72.html`
- **Current Word Count**: 1,086 words (**Deficit: 414 words**).
- **Target Word Count**: 1,650–1,800 words (**Expand by +550–650 words**).
- **New Sections to Add**:
  1. `<h2>The Dark Side: How Debt Doubles in South Africa Under the NCA</h2>` (~220 words):
     - Anchor to the National Credit Act (NCA) maximum interest rate formulas:
       - Unsecured credit facilities (credit cards/overdrafts): SARB Repo (7.25%) + 14% = **21.25%**.
       - Unsecured personal loans: SARB Repo (7.25%) + 21% = **28.25%**.
       - Short-term loans: Up to 5% per month.
     - Calculate debt doubling times using Rule of 72:
       - Credit card debt at 21.25% doubles in **3.39 years**!
       - Personal loan debt at 28.25% doubles in **2.55 years**!
     - Dramatic contrast table: R20,000 invested at 10% JSE returns vs R20,000 credit card debt at 21.25% over 10 years.
  2. `<h2>The Rule of 72 in Reverse: How Inflation Halves Your Purchasing Power</h2>` (~180 words):
     - The mathematical inverse: 72 ÷ Inflation Rate = Years for purchasing power to be cut by 50%.
     - South African scenarios:
       - At 3.0% (SARB target lower bound): Halves in 24 years.
       - At 4.4% (Latest 2026 CPI print): Halves in 16.4 years.
       - At 6.0% (SARB target upper bound): Halves in 12 years.
     - Real-world South African examples: electricity tariffs, medical aid premiums, and grocery baskets.
  3. `<h2>Nominal vs Real Doubling on the JSE All Share Index</h2>` (~150 words):
     - JSE ALSI nominal return of ~10.45% doubles nominal wealth every ~6.9 years.
     - Net of 4.4% CPI inflation, the real return is ~6.05%, meaning real purchasing power doubles every ~11.9 years.
  4. `<h2>Mathematical Nuance: Why 72 and Not 69.3 or 70?</h2>` (~120 words):
     - Natural logarithm derivation: $\ln(2) \approx 0.69315$.
     - Why 72 is the superior mental arithmetic number: it has 12 factors and provides minimal error specifically in the 6%–10% interest range common to South Africa.
- **TOC & Schema Updates**: Add new headings to `.toc-list` and `#toc-map`. Add `ad-placeholder` to ad containers.

### Article 6: `blog/tax-free-savings-account-calculator-south-africa.html`
- **Current Word Count**: 2,049 words (Meets >1,500 target).
- **Target Word Count**: 2,100–2,300 words.
- **Editorial Action**: Reconcile statutory contribution limits (R36k vs R46k), deepen RA comparison, and add AdSense placeholders.
- **Specific SA Data Additions**:
  - Clarify the contribution history: explain the transition from the longstanding statutory R36,000/year limit (R3,000/month) to the 2026/27 R46,000/year limit (R3,833/month), keeping the R500,000 lifetime cap prominent.
  - Worked SARS penalty calculation: Show exact 40% penalty assessed if someone deposits R50,000 in a year (R4,000 excess × 40% = R1,600 penalty).
  - Expand the TFSA vs Section 11F Retirement Annuity (RA) comparison:
    - Detail the Section 11F 27.5% tax deduction (up to R350,000/R430,000).
    - Contrast liquidity: TFSA is 100% tax-free liquid anytime vs RA locked until 55 with Two-Pot system restrictions (Savings Pot taxed at marginal rate, Retirement Pot locked for annuity).
    - Regulation 28 asset allocation limits (RA capped at 75% equity and 45% offshore vs TFSA allowing 100% offshore equity ETFs like MSCI World).
- **AdSense Placement**: Add `class="ad-slot ad-placeholder ..."` to all ad containers.

---

## 6. Site-Wide AdSense Structural Placement Plan

To satisfy **R3. AdSense Preparation** and its acceptance criterion without visual breakage or Cumulative Layout Shift:

### 6.1 Placement Conventions & Class Standard
Every ad unit must include both the existing `.ad-slot` class (maintaining CSS anti-CLS styling) and the newly specified `.ad-placeholder` class:
```html
<!-- Example in-article ad slot -->
<div class="ad-slot ad-placeholder ad-in-article" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="1000000003"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

### 6.2 Files to Target for AdSense Readiness
1. **Blog Articles** (`blog/`):
   - `compound-interest-south-africa.html`
   - `etfs-vs-traditional-savings-accounts.html`
   - `how-long-to-save-1-million-rand.html`
   - `maximize-compound-interest-monthly-savings.html`
   - `rule-of-72.html`
   - `tax-free-savings-account-calculator-south-africa.html`
   - `blog-template.html`
   - `index.html` (blog listing)
2. **Calculator & Core Tools** (Root directory):
   - `index.html` (Compound Interest Calculator)
   - `compare-investments.html` (Comparison Calculator)
   - `investment-goal-calculator.html` (Goal Calculator)
   - `retirement-calculator.html` (Retirement Calculator)
   - `debug-adsense.html` (AdSense Verification Suite)

---

## 7. Verification Method

### 7.1 Programmatic Word Count Verification Command
Run this command from the project root to independently verify that all 6 blog articles strictly exceed the 1,500-word requirement:
```bash
python3 -c '
import os, re

blog_dir = "blog"
articles = [
    "compound-interest-south-africa.html",
    "etfs-vs-traditional-savings-accounts.html",
    "how-long-to-save-1-million-rand.html",
    "maximize-compound-interest-monthly-savings.html",
    "rule-of-72.html",
    "tax-free-savings-account-calculator-south-africa.html"
]

all_passed = True
print(f"{chr(61)*60}\nWORD COUNT VERIFICATION (Target: > 1,500 words)\n{chr(61)*60}")
for art in articles:
    path = os.path.join(blog_dir, art)
    if not os.path.exists(path):
        print(f"FAIL: {art} not found")
        all_passed = False
        continue
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    clean = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", content, flags=re.DOTALL)
    clean = re.sub(r"<[^>]+>", " ", clean)
    words = clean.split()
    count = len(words)
    status = "PASS" if count > 1500 else "FAIL"
    if count <= 1500:
        all_passed = False
    print(f"[{status}] {art}: {count:,} words")
print(f"{chr(61)*60}")
print("OVERALL RESULT:", "ALL PASSED (Ready for AdSense)" if all_passed else "FAILED - EXPANSION REQUIRED")
'
```

### 7.2 AdSense Placeholder Class Verification Command
Run this command from the project root to verify that every target HTML file contains the `ad-placeholder` class:
```bash
python3 -c '
import os, glob

target_files = [
    "index.html",
    "compare-investments.html",
    "investment-goal-calculator.html",
    "retirement-calculator.html",
    "blog/compound-interest-south-africa.html",
    "blog/etfs-vs-traditional-savings-accounts.html",
    "blog/how-long-to-save-1-million-rand.html",
    "blog/maximize-compound-interest-monthly-savings.html",
    "blog/rule-of-72.html",
    "blog/tax-free-savings-account-calculator-south-africa.html"
]

all_passed = True
print(f"{chr(61)*60}\nADSENSE PLACEHOLDER VERIFICATION\n{chr(61)*60}")
for path in target_files:
    if not os.path.exists(path):
        print(f"FAIL: {path} not found")
        all_passed = False
        continue
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    count = content.count("ad-placeholder")
    status = "PASS" if count > 0 else "FAIL"
    if count == 0:
        all_passed = False
    print(f"[{status}] {path}: {count} ad-placeholder elements")
print(f"{chr(61)*60}")
print("OVERALL RESULT:", "ALL PLACEHOLDERS PRESENT" if all_passed else "FAILED - MISSING PLACEHOLDERS")
'
```

### 7.3 Independent Editorial & Technical Review Checklist
- [ ] Word count verified > 1,500 words for every article using script above.
- [ ] Explicit SARB Repo Rate (7.25%) and Prime Lending Rate (10.75%) cited accurately.
- [ ] CPI inflation statistics (4.4% headline) and SARB target band (3%–6%) referenced.
- [ ] JSE All Share Index (ALSI) multi-decade returns (~10.45%–12% nominal, 6%–8% real) contrasted against cash.
- [ ] SARS tax sections accurately cited: Section 12T (TFSA limits & 40% penalty), Section 11F (RA 27.5% deduction), Section 10(1)(i) (interest exemption R23,800/R34,500).
- [ ] Two-Pot retirement system (1 Sept 2024) rules accurately contextualized.
- [ ] ASISA EAC fee drag impact modeled across 20-30 year horizons.
- [ ] All new `<h2>` headings added to `.toc-list` and `<script id="toc-map">` JSON mapping.
- [ ] HTML structure and CSS styling remain intact with 0 layout shift regressions.
