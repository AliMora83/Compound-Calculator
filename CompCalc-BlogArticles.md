# CompoundCalc — Blog Articles (SEO Seed Content)
**Prepared for:** Antigravity / Jules  
**Prepared by:** Ali (ali@openmindi.co.za)  
**Purpose:** AdSense approval + initial organic search traffic  
**Status:** Ready to publish — drop into blog template as-is

---

## Implementation Notes for Jules / AG

Each article below is ready-to-paste HTML for the `<main>` content area of the blog template (as defined in `CompCalc-Setup.md` Part 9). The template should already include:
- Global header/nav
- Global footer with disclaimer
- Reading time estimate (calculate from word count: ~200 words/min)
- Author byline: "CompoundCalc Team"
- Social share buttons (Twitter/X, WhatsApp, copy link)
- Related calculator mini-widget at the bottom of each article

**Do not alter the article copy** — the keyword placement, heading structure, and internal link targets are intentional for SEO.

Update `sitemap.xml` with `<lastmod>` set to the publish date for each article.

---

---

# Article 1

**File:** `/blog/compound-interest-south-africa.html`  
**Title tag:** `Compound Interest Calculator South Africa (2026 Guide) | CompoundCalc`  
**Meta description:** `Use South Africa's free compound interest calculator to see exactly how your savings grow. Includes monthly contributions, inflation adjustment, and a year-by-year breakdown. No sign-up needed.`  
**Target keyword:** `compound interest calculator south africa`  
**Reading time:** ~5 min  

---

```html
<article>

  <header class="blog-header">
    <h1>Compound Interest Calculator South Africa (2026 Guide)</h1>
    <p class="blog-meta">By CompoundCalc Team · 5 min read · Updated May 2026</p>
  </header>

  <p>
    If you've ever wondered what your savings could actually be worth in 10, 20, or 30 years,
    you need a compound interest calculator. Not a rough estimate — a real number, built on
    your exact monthly contribution, your interest rate, and your time horizon.
  </p>
  <p>
    This guide explains how compound interest works, shows you the maths with South African
    rand examples, and walks you through how to use the
    <a href="/">free CompoundCalc calculator</a> to model your own projection.
  </p>

  <h2>What Is Compound Interest?</h2>
  <p>
    Compound interest is interest calculated on both your original principal <em>and</em> the
    interest you've already earned. In plain terms: your money earns interest, and then that
    interest earns interest too. Over time, this creates exponential growth — the longer you
    wait, the faster the curve climbs.
  </p>
  <p>
    This is different from <strong>simple interest</strong>, which only ever calculates on the
    original principal. With simple interest, R10,000 at 10% per year earns R1,000 every
    single year — flat. With compound interest, that same R10,000 earns R1,000 in year one,
    then R1,100 in year two (because you're now earning 10% on R11,000), and so on.
  </p>

  <h2>The Formula</h2>
  <p>The standard compound interest formula is:</p>

  <div class="formula-block">
    <p><strong>A = P(1 + r/n)<sup>nt</sup></strong></p>
    <ul>
      <li><strong>A</strong> = final amount</li>
      <li><strong>P</strong> = starting principal</li>
      <li><strong>r</strong> = annual interest rate (as a decimal, e.g. 0.10 for 10%)</li>
      <li><strong>n</strong> = number of times interest compounds per year</li>
      <li><strong>t</strong> = number of years</li>
    </ul>
  </div>

  <p>
    When you add monthly contributions, the formula becomes more involved — which is exactly
    why a calculator is more useful than trying to work it out by hand.
  </p>

  <h2>A Worked Example in ZAR</h2>
  <p>
    Let's say you're 30 years old. You invest an initial lump sum of
    <strong>R20,000</strong>, then contribute <strong>R1,500 per month</strong>,
    earning an average annual return of <strong>10%</strong> (roughly in line with
    long-term JSE equity returns), compounded monthly. You plan to leave it for
    <strong>25 years</strong>.
  </p>

  <table class="blog-table">
    <thead>
      <tr>
        <th>Input</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Starting principal</td><td>R20,000</td></tr>
      <tr><td>Monthly contribution</td><td>R1,500</td></tr>
      <tr><td>Annual interest rate</td><td>10%</td></tr>
      <tr><td>Compounding frequency</td><td>Monthly</td></tr>
      <tr><td>Time horizon</td><td>25 years</td></tr>
    </tbody>
  </table>

  <p>After 25 years:</p>

  <table class="blog-table">
    <thead>
      <tr>
        <th>Metric</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Total you contributed</td><td>R470,000</td></tr>
      <tr><td>Interest earned</td><td>R1,323,000</td></tr>
      <tr><td>Final balance</td><td><strong>R1,793,000</strong></td></tr>
    </tbody>
  </table>

  <p>
    You put in under half a million rand. You end up with nearly R1.8 million.
    That gap — R1.3 million you never contributed — is compound interest doing its job.
  </p>
  <p>
    <a href="/" class="cta-inline">Try this scenario in the calculator →</a>
  </p>

  <h2>Why Time Is the Most Important Variable</h2>
  <p>
    Of all the inputs you can control — principal, monthly contribution, interest rate —
    <strong>time is the one that matters most</strong>. The compounding effect is non-linear.
    The last 5 years of a 30-year investment contribute more to your final balance than the
    first 10 years combined.
  </p>
  <p>
    This is why starting at 25 vs. starting at 35 makes such a large difference. A 10-year
    head start with the same R1,500/month contribution at 10% per year produces roughly
    double the final balance. Not 25% more. Double.
  </p>
  <p>
    CompoundCalc's <strong>"Cost of Waiting"</strong> panel shows you exactly what
    starting 1, 3, and 5 years earlier would have meant for your specific numbers.
  </p>

  <h2>Compound Interest and Inflation in South Africa</h2>
  <p>
    South Africa's inflation rate has averaged around 5–6% per year over the past decade.
    This matters because a 10% nominal return is only a <strong>~4–5% real return</strong>
    once inflation is stripped out. Your balance grows — but so does the cost of living.
  </p>
  <p>
    CompoundCalc has an <strong>inflation adjustment toggle</strong> built into the calculator.
    Turn it on, enter the current inflation rate (check the
    <a href="https://www.resbank.co.za" target="_blank" rel="noopener">SARB website</a>
    for the latest figure), and the results panel will show you what your final balance is
    worth in today's money — not just the nominal figure.
  </p>
  <p>This is one of the most important features for South African investors to use.</p>

  <h2>How to Use the CompoundCalc Calculator</h2>
  <ol>
    <li>
      <strong>Set your starting principal</strong> — the lump sum you're investing today.
      If you're starting from zero, enter R0.
    </li>
    <li>
      <strong>Enter your monthly contribution</strong> — even R500/month makes a meaningful
      difference over 20 years.
    </li>
    <li>
      <strong>Set your annual interest rate</strong> — for a diversified JSE equity ETF,
      a conservative estimate is 9–11%. For a money market account, use the current rate
      (typically 7–8% in 2026).
    </li>
    <li>
      <strong>Choose your time horizon</strong> — how many years until you want to access
      the money.
    </li>
    <li>
      <strong>Select compounding frequency</strong> — monthly is the most common for
      South African investment accounts.
    </li>
    <li>
      <strong>Hit Calculate</strong> — your full projection renders instantly, including
      the chart, milestone badges, and year-by-year breakdown table.
    </li>
  </ol>
  <p>
    You can also use the <strong>Goal Calculator</strong> tab — enter a target amount
    (e.g. R1,000,000) and it works backwards to tell you how many years it will take.
  </p>

  <p>
    <a href="/" class="btn-cta">Use the free calculator →</a>
  </p>

  <h2>Frequently Asked Questions</h2>

  <div class="faq-item">
    <h3>What is the best compound interest account in South Africa?</h3>
    <p>
      For long-term growth, a Tax-Free Savings Account (TFSA) invested in a low-cost ETF
      (such as the Satrix 40 or Satrix MSCI World) is widely considered the most effective
      vehicle for South African retail investors. TFSAs allow up to R36,000 per year
      (R500,000 lifetime) in contributions, and all growth, dividends, and withdrawals are
      completely tax-free. Platforms like EasyEquities make it straightforward to open a
      TFSA and start investing from as little as R50.
    </p>
  </div>

  <div class="faq-item">
    <h3>Is 10% a realistic interest rate for South African investors?</h3>
    <p>
      Over long periods (10+ years), the JSE All Share Index has historically delivered
      annualised returns in the range of 10–13% in nominal terms. For conservative
      modelling, 9–10% is a reasonable assumption for a diversified equity portfolio.
      Money market and fixed deposit accounts typically return 7–9% in the current
      (2026) environment, in line with the prime lending rate. Always use the inflation
      toggle to see real (inflation-adjusted) returns.
    </p>
  </div>

  <div class="faq-item">
    <h3>How often does compound interest compound?</h3>
    <p>
      The more frequently interest compounds, the faster your money grows — but the
      difference between monthly and daily compounding is small in practice. Most South
      African investment accounts compound monthly. Unit trust funds and ETFs effectively
      compound continuously as reinvested dividends are added to the unit price.
    </p>
  </div>

  <div class="faq-item">
    <h3>Does compound interest apply to debt too?</h3>
    <p>
      Yes — and this is exactly why high-interest debt (credit cards, personal loans)
      is so damaging. A credit card charging 22% per year, compounded monthly, works
      against you in exactly the same way compound interest works for you in an
      investment account. Paying off high-interest debt before investing is almost always
      the mathematically correct move.
    </p>
  </div>

  <div class="faq-item">
    <h3>What is the difference between APR and APY?</h3>
    <p>
      APR (Annual Percentage Rate) is the simple annual rate before compounding.
      APY (Annual Percentage Yield) is the effective rate after compounding is applied.
      A 10% APR compounded monthly produces an APY of approximately 10.47%.
      When comparing investment accounts, always compare APY — it's the number that
      reflects what you actually earn.
    </p>
  </div>

</article>

<!-- FAQ Schema Markup — place inside <script type="application/ld+json"> -->
```

**FAQ Schema — add inside `<script type="application/ld+json">` in the `<head>`:**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best compound interest account in South Africa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For long-term growth, a Tax-Free Savings Account (TFSA) invested in a low-cost ETF (such as the Satrix 40 or Satrix MSCI World) is widely considered the most effective vehicle for South African retail investors. TFSAs allow up to R36,000 per year (R500,000 lifetime) in contributions, and all growth, dividends, and withdrawals are completely tax-free."
      }
    },
    {
      "@type": "Question",
      "name": "Is 10% a realistic interest rate for South African investors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Over long periods (10+ years), the JSE All Share Index has historically delivered annualised returns in the range of 10–13% in nominal terms. For conservative modelling, 9–10% is a reasonable assumption for a diversified equity portfolio."
      }
    },
    {
      "@type": "Question",
      "name": "How often does compound interest compound?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The more frequently interest compounds, the faster your money grows. Most South African investment accounts compound monthly. Unit trust funds and ETFs effectively compound continuously as reinvested dividends are added to the unit price."
      }
    },
    {
      "@type": "Question",
      "name": "Does compound interest apply to debt too?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — a credit card charging 22% per year, compounded monthly, works against you in exactly the same way compound interest works for you in an investment account. Paying off high-interest debt before investing is almost always the mathematically correct move."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between APR and APY?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "APR (Annual Percentage Rate) is the simple annual rate before compounding. APY (Annual Percentage Yield) is the effective rate after compounding is applied. A 10% APR compounded monthly produces an APY of approximately 10.47%."
      }
    }
  ]
}
```

---

---

# Article 2

**File:** `/blog/rule-of-72.html`  
**Title tag:** `The Rule of 72: How to Calculate When Your Money Doubles | CompoundCalc`  
**Meta description:** `The Rule of 72 is the fastest way to estimate how long it takes your money to double. Learn the formula, see ZAR examples, and check your own scenario with CompoundCalc.`  
**Target keyword:** `rule of 72 calculator`  
**Reading time:** ~4 min  

---

```html
<article>

  <header class="blog-header">
    <h1>The Rule of 72: How to Calculate When Your Money Doubles</h1>
    <p class="blog-meta">By CompoundCalc Team · 4 min read · Updated May 2026</p>
  </header>

  <p>
    The Rule of 72 is one of the most useful shortcuts in personal finance. It tells you,
    almost instantly and without a calculator, roughly how many years it will take for
    your money to double at a given interest rate.
  </p>
  <p>
    It's not perfectly precise — but it's close enough to be genuinely useful for
    quick comparisons, back-of-envelope planning, and understanding the real cost
    of inflation.
  </p>

  <h2>The Formula</h2>
  <p>Divide 72 by your annual interest rate:</p>

  <div class="formula-block">
    <p><strong>Years to double = 72 ÷ annual interest rate (%)</strong></p>
  </div>

  <p>
    That's it. If your investment earns 9% per year, your money doubles in roughly
    72 ÷ 9 = <strong>8 years</strong>. If it earns 6%, it doubles in
    72 ÷ 6 = <strong>12 years</strong>.
  </p>

  <h2>Doubling Times at Common Rates</h2>
  <p>
    Here's how the rule plays out across the interest rates most relevant to South
    African investors in 2026:
  </p>

  <table class="blog-table">
    <thead>
      <tr>
        <th>Annual Return</th>
        <th>Years to Double (Rule of 72)</th>
        <th>Typical SA context</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>5%</td>
        <td>14.4 years</td>
        <td>High-yield savings account</td>
      </tr>
      <tr>
        <td>7%</td>
        <td>10.3 years</td>
        <td>Money market / fixed deposit</td>
      </tr>
      <tr>
        <td>9%</td>
        <td>8 years</td>
        <td>Conservative equity portfolio</td>
      </tr>
      <tr>
        <td>10%</td>
        <td>7.2 years</td>
        <td>JSE All Share (long-term average)</td>
      </tr>
      <tr>
        <td>12%</td>
        <td>6 years</td>
        <td>Aggressive equity / small cap</td>
      </tr>
      <tr>
        <td>22%</td>
        <td>3.3 years</td>
        <td>Credit card debt — working against you</td>
      </tr>
    </tbody>
  </table>

  <p>
    That last row is worth sitting with. The same rule that tells you your
    investment doubles in 7 years at 10% also tells you that unpaid credit card
    debt at 22% doubles in just over 3 years.
  </p>

  <h2>A South African Rand Example</h2>
  <p>
    You invest <strong>R50,000</strong> in a diversified equity ETF returning an
    average of <strong>10% per year</strong>. Using the Rule of 72:
  </p>
  <p>
    72 ÷ 10 = <strong>7.2 years</strong> to double.
  </p>
  <p>So the rough milestones look like this:</p>

  <table class="blog-table">
    <thead>
      <tr>
        <th>After approximately</th>
        <th>Your R50,000 becomes</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>7 years</td><td>~R100,000</td></tr>
      <tr><td>14 years</td><td>~R200,000</td></tr>
      <tr><td>21 years</td><td>~R400,000</td></tr>
      <tr><td>28 years</td><td>~R800,000</td></tr>
    </tbody>
  </table>

  <p>
    That's a single lump sum — no additional contributions — growing to 16× its
    original value over 28 years. The doubling interval stays constant as long
    as the rate stays constant, which is why the Rule of 72 reveals the
    exponential pattern so clearly.
  </p>

  <h2>Using It to Understand Inflation</h2>
  <p>
    The Rule of 72 works in reverse too. If South Africa's inflation rate is
    running at 5.5%, then the purchasing power of R100,000 in cash
    halves in approximately 72 ÷ 5.5 = <strong>13 years</strong>.
  </p>
  <p>
    This is why leaving large sums in a standard bank account — even one paying
    5% interest — quietly erodes your wealth when real inflation is at 5.5%.
    Your balance grows in nominal terms. Your purchasing power shrinks.
  </p>
  <p>
    Use the inflation adjustment toggle in the
    <a href="/">CompoundCalc calculator</a> to see this effect applied to
    your own projection.
  </p>

  <h2>How Accurate Is the Rule?</h2>
  <p>
    Very accurate for rates between 6% and 12%. Outside that range it drifts
    slightly — at very high rates, 69.3 is a more precise divisor (derived
    from the natural log of 2). But for everyday planning, 72 is close enough
    and far easier to divide mentally.
  </p>

  <table class="blog-table">
    <thead>
      <tr>
        <th>Rate</th>
        <th>Rule of 72 (years)</th>
        <th>Exact (years)</th>
        <th>Difference</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>3%</td><td>24.0</td><td>23.4</td><td>+0.6</td></tr>
      <tr><td>6%</td><td>12.0</td><td>11.9</td><td>+0.1</td></tr>
      <tr><td>9%</td><td>8.0</td><td>8.0</td><td>0.0</td></tr>
      <tr><td>12%</td><td>6.0</td><td>6.1</td><td>-0.1</td></tr>
      <tr><td>20%</td><td>3.6</td><td>3.8</td><td>-0.2</td></tr>
    </tbody>
  </table>

  <p>At 9%, the rule is exact. It's deliberately tuned for that range.</p>

  <h2>The Connection to CompoundCalc's Milestone Badges</h2>
  <p>
    When you run a calculation in the Grow Savings tab, CompoundCalc shows
    you <strong>milestone badges</strong> — the exact year your balance hits
    2×, 5×, and 10× your initial investment. The 2× badge is the Rule of 72
    in action, calculated precisely from your exact inputs rather than the
    approximation.
  </p>
  <p>
    For quick mental estimates before running the full projection, the Rule of 72
    is your starting point. For the precise figure, the calculator does the rest.
  </p>

  <p>
    <a href="/" class="btn-cta">Check your own doubling time →</a>
  </p>

</article>
```

---

---

# Article 3

**File:** `/blog/how-long-to-save-1-million-rand.html`  
**Title tag:** `How Long to Save R1 Million? Real Examples + Calculator | CompoundCalc`  
**Meta description:** `How long does it actually take to save R1 million in South Africa? We run three realistic scenarios at different contribution levels — and show you how to calculate your own.`  
**Target keyword:** `how long to save 1 million rand`  
**Reading time:** ~5 min  

---

```html
<article>

  <header class="blog-header">
    <h1>How Long to Save R1 Million? (Real Examples + Calculator)</h1>
    <p class="blog-meta">By CompoundCalc Team · 5 min read · Updated May 2026</p>
  </header>

  <p>
    R1 million. For most South Africans, it's the first meaningful savings milestone —
    the number that feels large enough to matter. But how long does it actually take
    to get there?
  </p>
  <p>
    The answer depends almost entirely on three things: how much you contribute each month,
    what return you earn, and how early you start. Below we run three realistic scenarios —
    conservative, moderate, and aggressive — using the
    <a href="/investment-goal-calculator">CompoundCalc Goal Calculator</a>.
  </p>

  <h2>The Goal Calculator: How It Works</h2>
  <p>
    Most calculators start with a time horizon and tell you the final balance.
    The <a href="/investment-goal-calculator">Goal tab</a> works in reverse:
    you enter a target amount (R1,000,000), your monthly contribution, and your
    expected return — and it tells you exactly how many years it will take to
    get there. No guesswork.
  </p>

  <h2>Scenario 1: The Cautious Saver (Low Contribution)</h2>

  <table class="blog-table">
    <thead>
      <tr><th>Input</th><th>Value</th></tr>
    </thead>
    <tbody>
      <tr><td>Starting balance</td><td>R0</td></tr>
      <tr><td>Monthly contribution</td><td>R1,000</td></tr>
      <tr><td>Annual return</td><td>8% (money market / fixed deposit)</td></tr>
      <tr><td>Goal</td><td>R1,000,000</td></tr>
    </tbody>
  </table>

  <p><strong>Result: approximately 26.5 years</strong></p>

  <p>
    R1,000/month is achievable for most working South Africans — it's roughly the cost
    of a basic gym membership and one meal out per week. At 8%, the journey to R1 million
    takes just over 26 years. Start at 25, arrive at 51.
  </p>
  <p>
    Over that period you contribute a total of R318,000. The remaining R682,000 is
    compound interest — more than double what you put in.
  </p>

  <h2>Scenario 2: The Consistent Investor (Moderate Contribution)</h2>

  <table class="blog-table">
    <thead>
      <tr><th>Input</th><th>Value</th></tr>
    </thead>
    <tbody>
      <tr><td>Starting balance</td><td>R10,000</td></tr>
      <tr><td>Monthly contribution</td><td>R2,500</td></tr>
      <tr><td>Annual return</td><td>10% (diversified equity ETF)</td></tr>
      <tr><td>Goal</td><td>R1,000,000</td></tr>
    </tbody>
  </table>

  <p><strong>Result: approximately 17.5 years</strong></p>

  <p>
    A R2,500 monthly contribution is within reach for someone in a stable salaried
    position — it's roughly what a debit order into a TFSA might look like for a
    mid-career professional. With a R10,000 head-start and 10% returns, R1 million
    arrives in under 18 years.
  </p>
  <p>
    Start at 28, arrive before your 46th birthday, with a total personal
    contribution of approximately R535,000 and over R465,000 generated by
    compounding alone.
  </p>

  <h2>Scenario 3: The Serious Builder (Higher Contribution)</h2>

  <table class="blog-table">
    <thead>
      <tr><th>Input</th><th>Value</th></tr>
    </thead>
    <tbody>
      <tr><td>Starting balance</td><td>R30,000</td></tr>
      <tr><td>Monthly contribution</td><td>R5,000</td></tr>
      <tr><td>Annual return</td><td>10%</td></tr>
      <tr><td>Goal</td><td>R1,000,000</td></tr>
    </tbody>
  </table>

  <p><strong>Result: approximately 11 years</strong></p>

  <p>
    R5,000/month is meaningful but not unrealistic for a dual-income household or a
    professional making intentional trade-offs. With a R30,000 starting position and
    consistent 10% returns, R1 million is achievable in just over a decade.
  </p>
  <p>
    Total contributions over 11 years: approximately R690,000.
    Interest generated: approximately R310,000. The shorter time horizon means
    compounding has less time to do its job — which highlights an important insight.
  </p>

  <h2>The Key Insight: Earlier Beats Harder</h2>
  <p>
    Compare Scenario 1 and Scenario 3 side by side:
  </p>

  <table class="blog-table">
    <thead>
      <tr>
        <th></th>
        <th>Scenario 1</th>
        <th>Scenario 3</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Monthly contribution</td><td>R1,000</td><td>R5,000</td></tr>
      <tr><td>Years to R1 million</td><td>26.5</td><td>11</td></tr>
      <tr><td>Total contributed</td><td>R318,000</td><td>R690,000</td></tr>
      <tr><td>Interest generated</td><td>R682,000</td><td>R310,000</td></tr>
    </tbody>
  </table>

  <p>
    Scenario 3 contributes more than twice as much money as Scenario 1 — and still
    generates less interest. Because the time horizon is shorter, compounding has
    fewer years to run. The cautious saver who starts early and leaves money
    untouched for 26 years ends up with the same R1 million, having put in less
    than half the cash.
  </p>
  <p>
    <strong>The best contribution is the one you start making today</strong>, not the
    largest one you might make someday.
  </p>

  <h2>What Happens If You Start a Year Later?</h2>
  <p>
    In Scenario 2 (R2,500/month, 10%, starting from R10,000), delaying by just
    one year means you'd need to contribute approximately R2,780/month instead of
    R2,500 to still reach R1 million at the same age. That's an extra R280/month —
    or R3,360/year — just to cover the cost of one year's delay.
  </p>
  <p>
    CompoundCalc's <strong>"Cost of Waiting" panel</strong> shows this calculation
    for your specific inputs automatically.
  </p>

  <h2>Try Your Own Numbers</h2>
  <p>
    The three scenarios above are starting points. Your actual timeline depends on
    your contribution, your starting balance, the return you earn, and when you begin.
  </p>
  <p>Use the Goal Calculator to enter your exact numbers:</p>
  <ol>
    <li>Go to the <a href="/investment-goal-calculator">Goal Calculator tab</a></li>
    <li>Enter <strong>R1,000,000</strong> as your target</li>
    <li>Enter your monthly contribution</li>
    <li>Set your expected annual return</li>
    <li>Hit Calculate — your timeline renders instantly</li>
  </ol>
  <p>
    You can also use the <strong>inflation toggle</strong> to see what R1 million
    will actually be worth in today's money when you reach it — accounting for the
    fact that South African inflation erodes purchasing power over time.
  </p>

  <p>
    <a href="/investment-goal-calculator" class="btn-cta">Calculate your timeline →</a>
  </p>

  <h2>A Note on Investment Platforms</h2>
  <p>
    The scenarios above assume a consistent annual return, which requires your money
    to be invested — not sitting in a standard bank account. For South African investors
    looking to start, a Tax-Free Savings Account (TFSA) in a low-cost index ETF is
    the most tax-efficient starting point. Contributions up to R36,000/year are
    sheltered from tax on growth and dividends entirely.
  </p>
  <p>
    Platforms like <a href="EASYEQUITIES_AFFILIATE_LINK" target="_blank" rel="noopener sponsored"
    onclick="gtag('event','affiliate_click',{platform:'easyequities'})">EasyEquities</a>
    allow you to open a TFSA and start investing in JSE-listed ETFs from as little
    as R50. No minimums, no complicated paperwork.
  </p>
  <small class="affiliate-note">
    Affiliate disclosure: we may earn a small commission if you open an account.
    This does not affect our calculator's outputs or recommendations.
  </small>

</article>
```

---

---

## Sitemap Additions

Add these three entries to `sitemap.xml` with the publish date as `<lastmod>`:

```xml
<url>
  <loc>https://compoundcalc.co.za/blog/compound-interest-south-africa</loc>
  <lastmod>2026-05-12</lastmod>
  <priority>0.7</priority>
</url>
<url>
  <loc>https://compoundcalc.co.za/blog/rule-of-72</loc>
  <lastmod>2026-05-12</lastmod>
  <priority>0.7</priority>
</url>
<url>
  <loc>https://compoundcalc.co.za/blog/how-long-to-save-1-million-rand</loc>
  <lastmod>2026-05-12</lastmod>
  <priority>0.7</priority>
</url>
```

---

## Blog Listing Page (`/blog/index.html`)

Update the blog listing page with these three cards. Each card needs:
- Article title (h2 or h3)
- One-sentence description (from the meta description)
- Reading time
- Publish date
- Link to the article

---

## QA Checklist

- [ ] All three articles live at their correct URLs with no 404s
- [ ] Title tags and meta descriptions match those specified above
- [ ] FAQ schema JSON-LD added to Article 1's `<head>` and validates at `https://validator.schema.org`
- [ ] All internal links (`/`, `/investment-goal-calculator`) resolve correctly
- [ ] `EASYEQUITIES_AFFILIATE_LINK` placeholder replaced with Ali's real affiliate URL in Article 3
- [ ] Affiliate disclosure note visible below the EasyEquities link in Article 3
- [ ] `gtag` affiliate click event fires on the EasyEquities link (verify in GA4 DebugView)
- [ ] Blog listing page (`/blog/`) updated with all three article cards
- [ ] `sitemap.xml` updated with all three URLs and submitted to Google Search Console
- [ ] Articles are fully responsive on mobile — tables scroll horizontally on small screens
- [ ] Formula blocks, tables, and FAQ sections styled consistently with site design
- [ ] No Lorem Ipsum or placeholder text anywhere in the three articles
- [ ] Reading time estimates display correctly in the blog template
- [ ] Canonical URLs set on each article page

---

## After Publishing: AdSense Application

Once these three articles and the legal pages (see `CompCalc-LegalPages-Update.md`) are live, the site meets Google's minimum content requirements for AdSense approval. Ali should then:

1. Go to `https://adsense.google.com` and submit `compoundcalc.co.za`
2. Paste the AdSense verification code snippet into the `<head>` of every page
3. Wait for Google's review (typically 1–14 days for new sites)
4. Once approved, replace the `<div id="ad-leaderboard">` and `<div id="ad-rectangle">` placeholder slots (already in the HTML per `CompCalc-Setup.md` Part 7.3) with the actual AdSense ad unit code

---

*Document version: 1.0*  
*Prepared: May 2026*  
*Questions: ali@openmindi.co.za / +27 62 370 5952*
