# CompoundCalc — Sprint 7: Blog Article Briefs (Articles 4, 5 & 6)
**For:** Antigravity  
**Prepared by:** Ali Mora  
**Date:** May 2026  
**Purpose:** Three new SEO articles to expand organic traffic and support AdSense revenue. Build using `blog/blog-template.html` as the base. Ali provides final copy — AG builds the page structure, metadata, schema, and sidebar widget per each brief below.

---

## How to Use These Briefs

Each brief contains:
- **Target keyword** — the primary phrase to optimise for (use in title, first paragraph, at least two subheadings, and meta description)
- **Title, slug, and meta** — copy exactly as written
- **Article outline** — section-by-section structure with word count guides
- **Schema type** — the JSON-LD block to add (template provided)
- **Sidebar widget** — the interactive mini-calculator to embed
- **Internal links** — exact anchor text and destinations to wire in
- **CTA placements** — where to place calculator and affiliate CTAs

Use `blog/blog-template.html` as the starting file for each article. The template already has the correct two-column layout (article body + sidebar), TOC wiring, footer, and nav.

---

---

# Article 4 — Tax-Free Savings Account Calculator South Africa

## File & URL
- **Filename:** `blog/tax-free-savings-account-calculator-south-africa.html`
- **Live URL:** `https://compoundcalc.co.za/blog/tax-free-savings-account-calculator-south-africa`
- **Add to `sitemap.xml`:**
```xml
<url>
  <loc>https://compoundcalc.co.za/blog/tax-free-savings-account-calculator-south-africa</loc>
  <priority>0.7</priority>
  <lastmod>2026-05-15</lastmod>
</url>
```

## SEO Metadata
```html
<title>Tax-Free Savings Account Calculator South Africa (2026 Guide) | CompoundCalc</title>
<meta name="description" content="Calculate how much your TFSA could grow tax-free. South Africa allows R36,000/year up to a R500,000 lifetime limit. See the numbers with our free compound interest calculator.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://compoundcalc.co.za/blog/tax-free-savings-account-calculator-south-africa">

<meta property="og:title" content="Tax-Free Savings Account Calculator South Africa (2026)">
<meta property="og:description" content="R36,000/year, R500,000 lifetime limit — see exactly what your TFSA could be worth with our free compound interest calculator.">
<meta property="og:image" content="https://compoundcalc.co.za/assets/images/blog-tfsa.webp">
<meta property="og:url" content="https://compoundcalc.co.za/blog/tax-free-savings-account-calculator-south-africa">
<meta property="og:type" content="article">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Tax-Free Savings Account Calculator South Africa (2026)">
<meta name="twitter:description" content="Calculate your TFSA growth — free, no sign-up, ZAR default.">
<meta name="twitter:image" content="https://compoundcalc.co.za/assets/images/blog-tfsa.webp">
```

## Schema — FAQPage + Article JSON-LD
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Tax-Free Savings Account Calculator South Africa (2026 Guide)",
      "description": "How to calculate TFSA growth in South Africa, including the R36,000 annual and R500,000 lifetime limits.",
      "url": "https://compoundcalc.co.za/blog/tax-free-savings-account-calculator-south-africa",
      "author": { "@type": "Organization", "name": "CompoundCalc" },
      "publisher": { "@type": "Organization", "name": "CompoundCalc", "url": "https://compoundcalc.co.za" },
      "inLanguage": "en-ZA"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the annual TFSA contribution limit in South Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "R36,000 per tax year (1 March to 28/29 February). Contributing more than this attracts a 40% penalty tax on the excess." }
        },
        {
          "@type": "Question",
          "name": "What is the lifetime TFSA limit in South Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "R500,000. Once you reach the lifetime limit you cannot contribute further, but your existing balance continues to grow tax-free." }
        },
        {
          "@type": "Question",
          "name": "Can I withdraw from my TFSA at any time?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, but withdrawals do not restore your contribution room. If you withdraw R20,000, you cannot re-contribute that R20,000 — it permanently reduces your remaining lifetime allowance." }
        },
        {
          "@type": "Question",
          "name": "Is interest earned in a TFSA taxable?",
          "acceptedAnswer": { "@type": "Answer", "text": "No. All growth inside a TFSA — interest, dividends, and capital gains — is completely tax-free. This is the core benefit of the account type." }
        },
        {
          "@type": "Question",
          "name": "How long does it take to reach the R500,000 TFSA lifetime limit?",
          "acceptedAnswer": { "@type": "Answer", "text": "Contributing the full R36,000 per year, it takes approximately 13 years to reach the R500,000 limit. With investment growth, your balance will exceed R500,000 before you hit the limit." }
        }
      ]
    }
  ]
}
</script>
```

## Reading Time & Author
- **Reading time:** 5 min
- **Author:** CompoundCalc Team

## Article Outline

### Hero / Intro (80–100 words)
Open with the core value proposition: a TFSA is the most powerful savings vehicle available to South African investors because every rand of growth is tax-free. Introduce the two limits (R36,000/year, R500,000 lifetime). State that this article will show how to calculate TFSA growth and link immediately to the calculator.

**Internal link here:** Anchor text `"compound interest calculator"` → `https://compoundcalc.co.za`

---

### H2: What Is a Tax-Free Savings Account? (120–150 words)
Explain that a TFSA (Tax-Free Savings Account) was introduced by SARS in 2015. Key points:
- All growth — interest, dividends, and capital gains — is 100% tax-free
- Annual contribution limit: R36,000 per tax year (1 March – 28 February)
- Lifetime contribution limit: R500,000
- Exceeding the annual limit incurs a 40% penalty tax on the excess amount
- Available from most banks and investment platforms (EasyEquities, Allan Gray, Sygnia, Ninety One)
- Not to be confused with a regular savings account — the tax exemption is the differentiator

---

### H2: How to Calculate TFSA Growth (150–180 words)
Walk through the compound interest formula in plain language. Three worked examples using realistic ZAR figures:

**Example 1 — Conservative (bank savings rate)**
- Monthly contribution: R3,000 (= R36,000/year, full annual limit)
- Annual return: 8% (bank money market / high-yield savings)
- Time horizon: 13 years (to reach lifetime limit)
- Projected balance at year 13: show the output from CompoundCalc
- Tax saving vs a standard account: estimate the difference

**Example 2 — Growth (ETF / broad market)**
- Monthly contribution: R3,000
- Annual return: 11% (Satrix 40 / MSCI World historical average)
- Time horizon: 20 years
- Note: balance grows beyond R500,000 contribution limit — growth is unlimited

**Example 3 — Partial contribution**
- Monthly contribution: R1,500 (more accessible for most earners)
- Annual return: 10%
- Time horizon: 20 years

After each example, place an inline CTA:
```html
<p class="article-cta">
  <a href="https://compoundcalc.co.za/?p=0&m=3000&r=8&y=13&n=12" class="btn-article-cta">
    Run this scenario in CompoundCalc →
  </a>
</p>
```
*(Adjust query params per scenario — these pre-populate the calculator)*

---

### H2: TFSA vs Regular Savings Account — The Tax Difference (120–150 words)
Concrete comparison table:

| | TFSA | Regular Savings Account |
|---|---|---|
| Interest taxed? | No | Yes (above R23,800 exemption) |
| Capital gains taxed? | No | Yes |
| Dividends taxed? | No | Yes (20% dividends withholding tax) |
| Annual contribution limit | R36,000 | None |
| Withdraw anytime? | Yes | Yes |

Follow with a short paragraph: the compounding effect of not losing 18–45% of your growth to tax every year is significant. The longer the horizon, the larger the gap.

---

### H2: How to Use the CompoundCalc TFSA Calculator (100–120 words)
Step-by-step instructions for using the calculator in the context of TFSA planning:
1. Set **Starting Principal** to your current TFSA balance (or R0 if starting fresh)
2. Set **Monthly Contribution** to your planned monthly amount (max R3,000 to stay within annual limit)
3. Set **Annual Interest Rate** to your expected return (8% for cash, 10–12% for ETFs)
4. Set **Time Horizon** to your target years
5. Enable the **Inflation Adjustment** toggle to see real purchasing power
6. Click **Calculate**

**Internal link:** Anchor text `"investment goal calculator"` → `https://compoundcalc.co.za/investment-goal-calculator`

---

### H2: Which Platforms Offer TFSAs in South Africa? (100–120 words)
Brief overview (not a full review — keep it factual):
- **EasyEquities TFSA** — invest in ETFs and shares from R50. No minimum balance.
- **Sygnia** — low-cost passive funds
- **Allan Gray** — actively managed options
- **Ninety One** — unit trusts
- **Standard Bank / FNB / Nedbank** — bank-based options, typically lower returns (cash/money market)

**Affiliate CTA block here** (after the list, before the FAQ):
```html
<div class="article-affiliate-cta">
  <p><strong>Starting with a TFSA?</strong> EasyEquities is one of the easiest ways to open one — 
  from R50, no minimum balance, and full ETF access.</p>
  <a href="https://bit.ly/4wsBTNT" target="_blank" rel="noopener sponsored"
     onclick="gtag('event','affiliate_click',{platform:'easyequities',page:'blog-tfsa'})">
    Open a free EasyEquities account →
  </a>
  <small>Affiliate disclosure: we may earn a commission at no cost to you.</small>
</div>
```

---

### H2: Frequently Asked Questions (use the FAQ schema questions above)
Five Q&A blocks matching the FAQPage schema exactly. Each answer is 2–4 sentences.

---

### Closing CTA (40–60 words)
"See what your TFSA could be worth. Enter your monthly contribution, expected return, and years — the calculator does the rest."

**CTA button:**
```html
<a href="https://compoundcalc.co.za" class="btn-article-cta-large">
  Use the free TFSA calculator →
</a>
```

---

## Sidebar Widget — TFSA Quick Calculator

In the sidebar `<aside>`, below the TOC, add a mini calculator widget:

```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget-title">TFSA Quick Estimate</h3>
  <p class="sidebar-widget-sub">Monthly contribution (max R3,000/month)</p>
  <div class="sidebar-input-row">
    <span class="sidebar-currency">R</span>
    <input type="number" id="tfsa-monthly" value="3000" min="0" max="3000"
           class="sidebar-input" oninput="calcTFSA()">
  </div>
  <div class="sidebar-result" id="tfsa-result">
    After 20 years at 10%: <strong id="tfsa-output">R2,063,190</strong>
  </div>
  <a href="https://compoundcalc.co.za/?m=3000&r=10&y=20&n=12"
     id="tfsa-calc-link" class="sidebar-cta-btn">
    See full projection →
  </a>
</div>

<script>
function calcTFSA() {
  const monthly = parseFloat(document.getElementById('tfsa-monthly').value) || 0;
  const r = 0.10 / 12;
  const n = 20 * 12;
  const fv = monthly * ((Math.pow(1 + r, n) - 1) / r);
  document.getElementById('tfsa-output').textContent =
    'R' + Math.round(fv).toLocaleString('en-ZA');
  document.getElementById('tfsa-calc-link').href =
    'https://compoundcalc.co.za/?m=' + monthly + '&r=10&y=20&n=12';
}
calcTFSA();
</script>
```

---

## Blog Card (for `blog/index.html` listing)
```html
<div class="blog-card">
  <img src="/assets/images/blog-tfsa.webp" alt="Tax-free savings account calculator South Africa" width="400" height="250" loading="lazy">
  <div class="blog-card-body">
    <span class="blog-card-tag">Investing</span>
    <h3><a href="/blog/tax-free-savings-account-calculator-south-africa">
      Tax-Free Savings Account Calculator South Africa (2026 Guide)
    </a></h3>
    <p>R36,000/year, R500,000 lifetime. See exactly what your TFSA could be worth — with the tax-free compounding effect calculated.</p>
    <span class="blog-card-meta">5 min read · CompoundCalc Team</span>
  </div>
</div>
```

---
---

# Article 5 — How Much Should I Save Per Month South Africa

## File & URL
- **Filename:** `blog/how-much-should-i-save-per-month-south-africa.html`
- **Live URL:** `https://compoundcalc.co.za/blog/how-much-should-i-save-per-month-south-africa`
- **Add to `sitemap.xml`:**
```xml
<url>
  <loc>https://compoundcalc.co.za/blog/how-much-should-i-save-per-month-south-africa</loc>
  <priority>0.7</priority>
  <lastmod>2026-05-15</lastmod>
</url>
```

## SEO Metadata
```html
<title>How Much Should I Save Per Month? South Africa Guide (2026) | CompoundCalc</title>
<meta name="description" content="The 50/30/20 rule, savings benchmarks by age, and a free calculator to find your exact monthly savings target. For South African earners in 2026.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://compoundcalc.co.za/blog/how-much-should-i-save-per-month-south-africa">

<meta property="og:title" content="How Much Should I Save Per Month? South Africa Guide (2026)">
<meta property="og:description" content="Savings benchmarks by income, the 50/30/20 rule, and a free monthly savings calculator for South African earners.">
<meta property="og:image" content="https://compoundcalc.co.za/assets/images/blog-monthly-savings.webp">
<meta property="og:url" content="https://compoundcalc.co.za/blog/how-much-should-i-save-per-month-south-africa">
<meta property="og:type" content="article">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="How Much Should I Save Per Month? SA Guide">
<meta name="twitter:description" content="50/30/20 rule, age benchmarks, and a free calculator. South Africa-specific.">
<meta name="twitter:image" content="https://compoundcalc.co.za/assets/images/blog-monthly-savings.webp">
```

## Schema — FAQPage + HowTo JSON-LD
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "How Much Should I Save Per Month? South Africa Guide (2026)",
      "description": "Savings benchmarks, the 50/30/20 rule, and how to calculate a monthly savings target for South African earners.",
      "url": "https://compoundcalc.co.za/blog/how-much-should-i-save-per-month-south-africa",
      "author": { "@type": "Organization", "name": "CompoundCalc" },
      "publisher": { "@type": "Organization", "name": "CompoundCalc", "url": "https://compoundcalc.co.za" },
      "inLanguage": "en-ZA"
    },
    {
      "@type": "HowTo",
      "name": "How to Calculate Your Monthly Savings Target",
      "description": "A step-by-step method for South African earners to determine how much to save each month.",
      "step": [
        { "@type": "HowToStep", "name": "Calculate your take-home pay", "text": "Start with your net monthly income after tax and deductions." },
        { "@type": "HowToStep", "name": "List your fixed expenses", "text": "Rent/bond, car repayment, insurance, subscriptions — expenses that don't change month to month." },
        { "@type": "HowToStep", "name": "Apply the 20% savings rule", "text": "Set a target of saving at least 20% of your net income. Adjust up or down based on your goals and timeline." },
        { "@type": "HowToStep", "name": "Set a goal and reverse-engineer it", "text": "Use the CompoundCalc Goal Calculator to input your target amount and time horizon — it tells you the exact monthly contribution needed." },
        { "@type": "HowToStep", "name": "Automate the contribution", "text": "Set a debit order for your savings amount on the day your salary arrives. Remove the decision from your hands." }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What percentage of my salary should I save in South Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "A widely used guideline is 20% of net (after-tax) income. South Africa's low household savings rate (historically under 1% of disposable income nationally) means most people are significantly under-saving. Even starting at 10% is meaningful." }
        },
        {
          "@type": "Question",
          "name": "How much should I have saved by age 30 in South Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "A common benchmark is 1× your annual salary by age 30. If you earn R25,000/month, aim to have R300,000 in savings and investments by 30. This is a guide, not a rule — starting at any age is better than not starting." }
        },
        {
          "@type": "Question",
          "name": "What is the 50/30/20 rule?",
          "acceptedAnswer": { "@type": "Answer", "text": "A budgeting framework: 50% of net income goes to needs (rent, food, utilities), 30% to wants (dining, entertainment, travel), and 20% to savings and investments. It's a starting point — the exact percentages should be adjusted for your income level and goals." }
        },
        {
          "@type": "Question",
          "name": "Is R500 per month enough to save in South Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "R500/month invested at 10% annual return over 20 years grows to approximately R381,000. It is enough to start building meaningful wealth, especially within a TFSA. The amount matters less than the consistency." }
        }
      ]
    }
  ]
}
</script>
```

## Reading Time & Author
- **Reading time:** 5 min
- **Author:** CompoundCalc Team

## Article Outline

### Hero / Intro (80–100 words)
Open by addressing the question directly: there's no single correct answer, but there are clear frameworks — and a better question is "how much do I need to reach my goal, and by when?" That's exactly what the Goal Calculator solves. Set up the article as a combination of guideline + tool.

**Internal link here:** Anchor text `"investment goal calculator"` → `https://compoundcalc.co.za/investment-goal-calculator`

---

### H2: The 50/30/20 Rule — A Starting Framework (120–150 words)
Explain the rule: 50% needs, 30% wants, 20% savings. Apply it to realistic South African salaries:

| Monthly salary (net) | 20% savings target |
|---|---|
| R10,000 | R2,000/month |
| R20,000 | R4,000/month |
| R35,000 | R7,000/month |
| R60,000 | R12,000/month |

Note that for lower-income earners, 20% may not be achievable — start with 5–10% and increase by 1% every six months. The compounding effect of consistency over time beats trying to find a large lump sum later.

---

### H2: Savings Benchmarks by Age (150–180 words)
A reference table — what you ideally have saved/invested at each age, expressed as a multiple of annual salary:

| Age | Target savings | Based on R25k/month salary |
|---|---|---|
| 25 | 0.5× annual salary | R150,000 |
| 30 | 1× annual salary | R300,000 |
| 35 | 2× annual salary | R600,000 |
| 40 | 3× annual salary | R900,000 |
| 45 | 4× annual salary | R1,200,000 |
| 50 | 6× annual salary | R1,800,000 |
| 55 | 8× annual salary | R2,400,000 |
| 60 | 10× annual salary | R3,000,000 |

These are guidelines from broad international retirement research, adapted for ZA context. Note that SA's cost of living in retirement (medical aid, load shedding-proofing, etc.) may require higher multiples.

**Internal link:** Anchor text `"see how long it takes to save R1 million"` → `https://compoundcalc.co.za/blog/how-long-to-save-1-million-rand`

---

### H2: The Better Question — How Much Do I Need for My Goal? (150–180 words)
Reframe from "how much should I save" to "how much do I need to save to reach X by Y." Introduce three scenarios:

**Scenario A — Retirement at 65 with R5 million**
- Current age: 30 → 35 years to invest
- Expected return: 10%
- Required monthly contribution: *show the output from the Goal Calculator*
- Link: pre-populated Goal Calculator URL

**Scenario B — First property deposit (R200,000 in 5 years)**
- Expected return: 8% (low risk, shorter horizon)
- Required monthly contribution: *show the output*

**Scenario C — Emergency fund (3 months' expenses = R75,000 in 2 years)**
- Expected return: 6% (cash equivalent)
- Required monthly contribution: *show the output*

After each scenario:
```html
<a href="https://compoundcalc.co.za/investment-goal-calculator?..." class="btn-article-cta">
  Calculate my monthly target →
</a>
```

---

### H2: How to Use the CompoundCalc Goal Calculator (100–120 words)
Step-by-step:
1. Click the **Goal Calculator** tab at the top of the calculator
2. Enter your **target amount** (e.g. R1,000,000)
3. Enter your **starting balance** (what you already have)
4. Enter your **expected annual return** (8% conservative, 10–12% for ETFs)
5. Enter your **time horizon** in years
6. Click **Calculate** — the calculator shows the monthly contribution required

**Internal link:** Anchor text `"compound interest calculator"` → `https://compoundcalc.co.za`

---

### H2: HowTo — 5 Steps to Set Your Monthly Savings Target
*(Matches the HowTo schema above — structure as a numbered list)*

1. Calculate your take-home pay
2. List your fixed expenses
3. Apply the 20% savings rule as a starting target
4. Set a goal and use the Goal Calculator to reverse-engineer the monthly number
5. Automate the contribution via debit order on salary day

**Affiliate CTA block** after step 5:
```html
<div class="article-affiliate-cta">
  <p><strong>Ready to start?</strong> EasyEquities lets you open a TFSA or investment 
  account from R50. No minimum balance, no lock-in.</p>
  <a href="https://bit.ly/4wsBTNT" target="_blank" rel="noopener sponsored"
     onclick="gtag('event','affiliate_click',{platform:'easyequities',page:'blog-monthly-savings'})">
    Open a free EasyEquities account →
  </a>
  <small>Affiliate disclosure: we may earn a commission at no cost to you.</small>
</div>
```

---

### H2: Frequently Asked Questions
Four Q&A blocks matching the FAQPage schema exactly.

---

### Closing CTA (40–60 words)
"Enter your goal, your timeline, and your expected return. The calculator tells you the exact monthly amount — no spreadsheet needed."

```html
<a href="https://compoundcalc.co.za/investment-goal-calculator" class="btn-article-cta-large">
  Find my monthly savings target →
</a>
```

---

## Sidebar Widget — Monthly Savings Reverse Calculator

```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget-title">What's my monthly target?</h3>
  <p class="sidebar-widget-sub">Goal amount</p>
  <div class="sidebar-input-row">
    <span class="sidebar-currency">R</span>
    <input type="number" id="sw-goal" value="1000000" class="sidebar-input" oninput="calcMonthly()">
  </div>
  <p class="sidebar-widget-sub" style="margin-top:8px;">Years to save</p>
  <input type="number" id="sw-years" value="20" min="1" max="50"
         class="sidebar-input" style="width:80px;" oninput="calcMonthly()">
  <div class="sidebar-result" id="sw-result" style="margin-top:12px;">
    At 10%/year: <strong id="sw-output">R1,317/month</strong>
  </div>
  <a href="https://compoundcalc.co.za/investment-goal-calculator"
     id="sw-calc-link" class="sidebar-cta-btn">
    See full breakdown →
  </a>
</div>

<script>
function calcMonthly() {
  const goal  = parseFloat(document.getElementById('sw-goal').value)  || 0;
  const years = parseFloat(document.getElementById('sw-years').value) || 1;
  const r = 0.10 / 12;
  const n = years * 12;
  const pmt = goal * r / (Math.pow(1 + r, n) - 1);
  document.getElementById('sw-output').textContent =
    'R' + Math.round(pmt).toLocaleString('en-ZA') + '/month';
}
calcMonthly();
</script>
```

---

## Blog Card (for `blog/index.html` listing)
```html
<div class="blog-card">
  <img src="/assets/images/blog-monthly-savings.webp" alt="How much should I save per month South Africa" width="400" height="250" loading="lazy">
  <div class="blog-card-body">
    <span class="blog-card-tag">Planning</span>
    <h3><a href="/blog/how-much-should-i-save-per-month-south-africa">
      How Much Should I Save Per Month? South Africa Guide (2026)
    </a></h3>
    <p>The 50/30/20 rule, age benchmarks, and a Goal Calculator that tells you the exact monthly number for your target.</p>
    <span class="blog-card-meta">5 min read · CompoundCalc Team</span>
  </div>
</div>
```

---
---

# Article 6 — ETF vs Savings Account South Africa

## File & URL
- **Filename:** `blog/etf-vs-savings-account-south-africa.html`
- **Live URL:** `https://compoundcalc.co.za/blog/etf-vs-savings-account-south-africa`
- **Add to `sitemap.xml`:**
```xml
<url>
  <loc>https://compoundcalc.co.za/blog/etf-vs-savings-account-south-africa</loc>
  <priority>0.7</priority>
  <lastmod>2026-05-15</lastmod>
</url>
```

## SEO Metadata
```html
<title>ETF vs Savings Account South Africa: Which Grows Your Money Faster? (2026) | CompoundCalc</title>
<meta name="description" content="ETFs vs savings accounts — a side-by-side compound interest comparison for South African investors. See the 20-year difference in our free calculator.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://compoundcalc.co.za/blog/etf-vs-savings-account-south-africa">

<meta property="og:title" content="ETF vs Savings Account South Africa (2026): The Numbers Side by Side">
<meta property="og:description" content="Compare ETF returns vs savings account interest over 20 years in ZAR. The compounding gap is larger than most people expect.">
<meta property="og:image" content="https://compoundcalc.co.za/assets/images/blog-etf-vs-savings.webp">
<meta property="og:url" content="https://compoundcalc.co.za/blog/etf-vs-savings-account-south-africa">
<meta property="og:type" content="article">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="ETF vs Savings Account South Africa (2026)">
<meta name="twitter:description" content="See the 20-year compounding difference between ETFs and a savings account. Free calculator included.">
<meta name="twitter:image" content="https://compoundcalc.co.za/assets/images/blog-etf-vs-savings.webp">
```

## Schema — FAQPage + Article JSON-LD
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "ETF vs Savings Account South Africa: Which Grows Your Money Faster? (2026)",
      "description": "A compound interest comparison of ETFs vs high-yield savings accounts for South African investors, with worked examples in ZAR.",
      "url": "https://compoundcalc.co.za/blog/etf-vs-savings-account-south-africa",
      "author": { "@type": "Organization", "name": "CompoundCalc" },
      "publisher": { "@type": "Organization", "name": "CompoundCalc", "url": "https://compoundcalc.co.za" },
      "inLanguage": "en-ZA"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an ETF in South Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "An ETF (Exchange Traded Fund) is a basket of shares or assets that trades on the JSE like a single share. Popular South African ETFs include the Satrix 40 (tracks the top 40 JSE companies) and the Satrix MSCI World (tracks global markets). They offer diversification at very low cost." }
        },
        {
          "@type": "Question",
          "name": "What return can I expect from a South African savings account?",
          "acceptedAnswer": { "@type": "Answer", "text": "In 2026, South African high-yield savings accounts and money market accounts are paying roughly 8–9% per annum. This is better than it has been historically, largely because the prime lending rate remains elevated. However, these rates are not guaranteed and will decline when the SARB cuts rates." }
        },
        {
          "@type": "Question",
          "name": "What return can I expect from a South African ETF?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Satrix 40 has returned approximately 12–14% per annum over the past 20 years (nominal, including dividends reinvested). Global ETFs like MSCI World have returned roughly 10–12% per annum in ZAR terms over the same period. Past performance does not guarantee future returns." }
        },
        {
          "@type": "Question",
          "name": "Is an ETF safer than a savings account?",
          "acceptedAnswer": { "@type": "Answer", "text": "No. A savings account at a registered bank is protected by the South African Deposit Insurance Scheme (SADI) up to R100,000 per depositor per bank. ETFs carry market risk — their value fluctuates and can drop significantly in the short term. Over long horizons (10+ years), broad-market ETFs have historically recovered and grown, but they are not capital-guaranteed." }
        },
        {
          "@type": "Question",
          "name": "Should I put my emergency fund in an ETF or a savings account?",
          "acceptedAnswer": { "@type": "Answer", "text": "A savings account (or money market fund). Your emergency fund needs to be liquid and not subject to market volatility — you cannot afford to withdraw it at a 30% loss if the market is down. Keep 3–6 months of expenses in a high-yield savings account, and invest everything beyond that in ETFs for the long term." }
        }
      ]
    }
  ]
}
</script>
```

## Reading Time & Author
- **Reading time:** 6 min
- **Author:** CompoundCalc Team

## Article Outline

### Hero / Intro (80–100 words)
The article's hook: at current rates, a South African savings account pays around 8–9%. A broad-market ETF has historically returned 11–13% per annum. That 3–4% gap sounds small. Over 20 years with a R2,000/month contribution, the difference is hundreds of thousands of rands. This article shows the comparison side by side, explains when each is the right choice, and links to the Compare Scenarios tool.

**Internal link here:** Anchor text `"Compare Scenarios calculator"` → `https://compoundcalc.co.za/compare-investments`

---

### H2: What's the Difference Between an ETF and a Savings Account? (150–180 words)
Plain-language explanation:

**Savings Account:**
- Cash held at a bank, earns interest at a set rate
- Capital guaranteed (SADI protection up to R100k)
- Rate changes with SARB repo rate
- Fully liquid — withdraw anytime, no market risk
- Best for: emergency fund, short-term goals (under 3 years)

**ETF (Exchange Traded Fund):**
- Basket of shares/assets, trades on the JSE
- No capital guarantee — value fluctuates daily
- Historically higher returns over long periods
- Some illiquidity (T+3 settlement), though practically accessible
- Best for: long-term wealth building (5+ years), retirement, TFSA investing

Key point: these aren't competitors — they serve different purposes at different time horizons.

---

### H2: The Numbers — A 20-Year Comparison in ZAR (200–250 words)
This is the core section. Use three side-by-side comparisons with real ZAR figures. Introduce each as a scenario the reader can replicate in the Compare Scenarios tab.

**Same inputs for all scenarios:**
- Starting principal: R0
- Monthly contribution: R2,000
- Time horizon: 20 years
- Compounding: monthly

**Scenario 1 — Savings account (8%) vs ETF (12%)**
| | Savings Account (8%) | ETF (12%) |
|---|---|---|
| Final balance | R ~1,189,000 | R ~1,960,000 |
| Total contributed | R480,000 | R480,000 |
| Interest / growth | R ~709,000 | R ~1,480,000 |
| Difference | — | **+R771,000** |

**Scenario 2 — High-yield savings (9%) vs MSCI World ETF (11%)**
(Same inputs — shows even a 2% gap is significant)

**Scenario 3 — Long horizon: 30 years, R1,500/month**
(Emphasises how the gap widens dramatically over longer periods)

After the table:
```html
<a href="https://compoundcalc.co.za/compare-investments?..." class="btn-article-cta">
  Run this comparison yourself →
</a>
```
*(Pre-populate the Compare tab with Scenario 1's inputs via query params)*

**Internal link:** Anchor text `"inflation adjustment toggle"` → `https://compoundcalc.co.za` (mention that real returns after inflation narrow the gap but ETFs still win on long horizons)

---

### H2: When a Savings Account Is the Right Choice (120–150 words)
Don't present ETFs as always superior. Savings accounts win when:
- **Time horizon is under 3 years** — market volatility risk is too high
- **Emergency fund** — must be liquid and capital-stable
- **Specific short-term goal** — property deposit, wedding, car
- **Risk tolerance is very low** — peace of mind has value
- **Current rates are high** — when savings accounts pay 8–9%, the risk-adjusted case for ETFs is weaker than at 4–5% rates

---

### H2: When an ETF Is the Right Choice (120–150 words)
ETFs win when:
- **Time horizon is 5+ years** — enough time to ride out volatility
- **Retirement savings** — especially inside a TFSA for tax-free compounding
- **Building long-term wealth** — the compounding returns make a meaningful difference
- **Inflation-beating returns** — at 11–13%, ETFs consistently beat SA inflation (currently ~5–5.5%)

Mention that the Satrix 40 and Satrix MSCI World are the most commonly used starting points for South African retail investors. Low fees (TERs under 0.3%) mean more of the return compounds.

**Affiliate CTA block here:**
```html
<div class="article-affiliate-cta">
  <p><strong>Want to invest in ETFs?</strong> EasyEquities is the most accessible 
  platform for South African retail investors — start with R50, hold Satrix ETFs 
  inside a TFSA.</p>
  <a href="https://bit.ly/4wsBTNT" target="_blank" rel="noopener sponsored"
     onclick="gtag('event','affiliate_click',{platform:'easyequities',page:'blog-etf-vs-savings'})">
    Open a free EasyEquities account →
  </a>
  <small>Affiliate disclosure: we may earn a commission at no cost to you.</small>
</div>
```

---

### H2: How to Compare Both Scenarios in CompoundCalc (100–120 words)
Direct instructions for the Compare Scenarios tab:
1. Go to the **Compare** tab
2. In **Scenario A** — enter R2,000/month, 8% rate, 20 years (savings account)
3. In **Scenario B** — enter R2,000/month, 12% rate, 20 years (ETF)
4. Click **Calculate** — the chart overlays both lines and shows which wins by how much
5. Adjust the rates to match your actual savings account offer and expected ETF return

**Internal link:** Anchor text `"compound interest calculator"` → `https://compoundcalc.co.za`

---

### H2: Frequently Asked Questions
Five Q&A blocks matching the FAQPage schema exactly.

---

### Closing CTA (40–60 words)
"See your own ETF vs savings account comparison — enter your monthly amount and rates. The chart makes the difference impossible to ignore."

```html
<a href="https://compoundcalc.co.za/compare-investments" class="btn-article-cta-large">
  Compare ETF vs savings account →
</a>
```

---

## Sidebar Widget — ETF vs Savings Quick Compare

```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget-title">Quick compare</h3>
  <p class="sidebar-widget-sub">Monthly investment</p>
  <div class="sidebar-input-row">
    <span class="sidebar-currency">R</span>
    <input type="number" id="cmp-monthly" value="2000" class="sidebar-input" oninput="calcCompare()">
  </div>
  <p class="sidebar-widget-sub" style="margin-top:8px;">Years</p>
  <input type="number" id="cmp-years" value="20" min="1" max="40"
         class="sidebar-input" style="width:80px;" oninput="calcCompare()">
  <div class="sidebar-result" id="cmp-result" style="margin-top:12px;line-height:1.8;">
    Savings (8%): <strong id="cmp-savings">R1,189,147</strong><br>
    ETF (12%): <strong id="cmp-etf" style="color:#16a34a;">R1,960,354</strong><br>
    <span style="font-size:0.8rem;color:#6b7280;">Difference: <strong id="cmp-diff">R771,207</strong></span>
  </div>
  <a href="https://compoundcalc.co.za/compare-investments" class="sidebar-cta-btn">
    See full comparison →
  </a>
</div>

<script>
function fv(monthly, annualRate, years) {
  const r = annualRate / 12;
  const n = years * 12;
  return monthly * ((Math.pow(1 + r, n) - 1) / r);
}
function calcCompare() {
  const m = parseFloat(document.getElementById('cmp-monthly').value) || 0;
  const y = parseFloat(document.getElementById('cmp-years').value)   || 1;
  const savings = fv(m, 0.08, y);
  const etf     = fv(m, 0.12, y);
  const fmt = v => 'R' + Math.round(v).toLocaleString('en-ZA');
  document.getElementById('cmp-savings').textContent = fmt(savings);
  document.getElementById('cmp-etf').textContent     = fmt(etf);
  document.getElementById('cmp-diff').textContent    = fmt(etf - savings);
}
calcCompare();
</script>
```

---

## Blog Card (for `blog/index.html` listing)
```html
<div class="blog-card">
  <img src="/assets/images/blog-etf-vs-savings.webp" alt="ETF vs savings account South Africa comparison" width="400" height="250" loading="lazy">
  <div class="blog-card-body">
    <span class="blog-card-tag">Investing</span>
    <h3><a href="/blog/etf-vs-savings-account-south-africa">
      ETF vs Savings Account South Africa: Which Grows Your Money Faster?
    </a></h3>
    <p>At 8% vs 12% over 20 years on R2,000/month, the difference is over R770,000. Here's when to use each — and how to compare them.</p>
    <span class="blog-card-meta">6 min read · CompoundCalc Team</span>
  </div>
</div>
```

---
---

## Global QA Checklist — All Three Articles

**Before publishing each article:**
- [ ] HTML file created from `blog/blog-template.html`
- [ ] All SEO `<meta>` tags added exactly as written above
- [ ] `<link rel="canonical">` set correctly
- [ ] JSON-LD schema block added and validated at `https://validator.schema.org`
- [ ] FAQ schema answers match the article body text exactly
- [ ] HowTo schema (Article 5 only) steps match the numbered list in the article
- [ ] TOC links scroll smoothly to each `<h2>` section
- [ ] Sidebar widget JS calculates correctly (test with several input values)
- [ ] Sidebar widget "See full projection/breakdown" link opens correct calculator tab
- [ ] All inline `<a href="https://compoundcalc.co.za/...">` internal links resolve without 404
- [ ] Affiliate CTA links point to `https://bit.ly/4wsBTNT`
- [ ] `gtag('event', 'affiliate_click', ...)` fires on affiliate link click (verify in GA4 DebugView)
- [ ] Article added to `blog/index.html` card grid
- [ ] URL added to `sitemap.xml`
- [ ] Meta image placeholder (`blog-tfsa.webp` / `blog-monthly-savings.webp` / `blog-etf-vs-savings.webp`) — Ali to provide images; use a solid green `#16a34a` placeholder with article title text until images are ready
- [ ] Reading time shown correctly in article header
- [ ] Page renders correctly on mobile (375px viewport) — sidebar stacks below article
- [ ] Lighthouse SEO score 90+ on each article page

**Commit message (one commit per article):**
- `feat: add blog article — TFSA calculator South Africa`
- `feat: add blog article — how much to save per month SA`
- `feat: add blog article — ETF vs savings account SA`

---

*Questions: ali@openmindi.co.za / +27 62 370 5952*
