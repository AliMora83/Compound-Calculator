# Sprint 12.1 — Article Expansion: compound-interest-south-africa.html
**Goal:** Expand from ~700 to ~1,900 words of genuinely new depth. This is the primary-keyword article and the most likely cause of the AdSense "low value content" rejection.
**Voice:** Per md/CompoundCalc-BrandVoice.md — plainspoken, number-led, thought experiment → uncomfortable truth. No hype, no exclamation marks.

## ⚠️ Ali verify before publish (rates change)
- [ ] TFSA annual limit: one 2026 source reports it was **raised to R46,000** for the 2026/27 tax year (from R36,000; lifetime cap unchanged at R500,000). Confirm on SARS.gov.za and update §5 figures if needed — I've drafted with R46,000 + a fallback note.
- [ ] SARB repo rate reference (drafted as "around 7%") — confirm current on resbank.co.za.
- [ ] CPI inflation figure (drafted as "4–6% range") — confirm latest StatsSA print.

## Instructions for Claude Code
Merge these sections into the existing article. Keep: hero, sidebar, TOC machinery, share buttons, affiliate CTA block, existing GA4 hooks. Replace body sections where headings match; insert new sections in the order below. Update TOC anchors to match. Word-count target means keeping existing intro/formula copy where it's good — merge, don't blindly overwrite.

---

## SECTION 1 — Intro (replace existing opening)

```html
<p>Compound interest is interest earned on interest. That three-word definition hides the single most important idea in personal finance — and the reason a 25-year-old putting away R500 a month will usually end up wealthier than a 35-year-old putting away R1,000.</p>

<p>This guide covers how compounding actually works, the formula behind it, what it looks like in rand terms at realistic South African rates, and how to use it — through a TFSA, an ETF, or even just a better savings account. Every example below can be tested yourself in the <a href="/">free calculator</a>.</p>
```

## SECTION 2 — Simple vs compound (new)

```html
<h2 id="simple-vs-compound">Simple vs compound interest: the R100,000 difference</h2>

<p>Simple interest pays you on your original deposit only. Compound interest pays you on your deposit <em>plus</em> everything it has already earned. Early on, the difference is small enough to ignore. Over decades, it isn't.</p>

<p>Take R50,000 invested at 9% a year for 25 years:</p>

<ul>
<li><strong>Simple interest:</strong> R50,000 + (R4,500 × 25) = <strong>R162,500</strong></li>
<li><strong>Compound interest (annual):</strong> R50,000 × 1.09²⁵ = <strong>R431,154</strong></li>
</ul>

<p>Same deposit, same rate, same 25 years — R268,654 apart. Nothing extra was contributed. The compounding version simply kept paying interest on the interest, year after year, and that loop is where the growth lives.</p>

<p>Most SA savings and investment products compound. Where the distinction bites is on the other side of the ledger: store cards and personal loans compound against you at 20%+ — the same snowball, rolling the wrong way.</p>
```

## SECTION 3 — Formula (keep existing, append worked breakdown)

```html
<p>Here is the formula with real numbers. R10,000 at 10% a year, compounded monthly, for 10 years:</p>

<p><code>A = 10,000 × (1 + 0.10/12)^(12×10) = R27,070</code></p>

<p>Notice the compounding frequency did some quiet work: at annual compounding the answer is R25,937. Monthly compounding adds R1,133 for free — same rate, just credited more often. The calculator's frequency selector lets you test this on your own numbers.</p>
```

## SECTION 4 — Three ZAR scenarios (new, core depth)

```html
<h2 id="three-scenarios">What compounding looks like in rand: three realistic scenarios</h2>

<p>Percentages are abstract. Here is what monthly investing actually produces at rates South Africans can realistically get (all monthly compounding, nominal returns):</p>

<h3>Scenario 1 — The cautious saver: R1,000/month at 7%</h3>
<p>Roughly what a good fixed deposit or money-market account pays while the repo rate sits around 7%.</p>
<ul>
<li>10 years: <strong>R173,000</strong> (you put in R120,000)</li>
<li>20 years: <strong>R521,000</strong> (you put in R240,000)</li>
<li>30 years: <strong>R1.22 million</strong> (you put in R360,000)</li>
</ul>

<h3>Scenario 2 — The index investor: R1,000/month at 10%</h3>
<p>In line with the JSE All Share's long-term total return. Not guaranteed — but a defensible planning assumption for a diversified equity ETF held for decades.</p>
<ul>
<li>10 years: <strong>R205,000</strong></li>
<li>20 years: <strong>R766,000</strong></li>
<li>30 years: <strong>R2.26 million</strong></li>
</ul>

<h3>Scenario 3 — The early starter: R500/month at 10%, from age 25</h3>
<p>Half the contribution of Scenario 2 — but with a 40-year runway to 65, it reaches roughly <strong>R3.16 million</strong>. The person who starts at 35 with double the monthly amount ends up with less. Read that again: half the money, started ten years earlier, wins.</p>

<p>That is the uncomfortable truth of compounding. The biggest input isn't the rate or even the amount. It's how early you start — and every year you wait is a year of growth that never happens. It doesn't catch up later. It's just gone.</p>

<p><a href="/">Run your own numbers in the calculator</a> — the milestone badges will show you the exact year your money doubles, and the cost-of-waiting panel puts a rand figure on delay.</p>
```

## SECTION 5 — TFSA (new)

```html
<h2 id="tfsa">Compounding tax-free: the TFSA advantage</h2>

<p>Outside a tax wrapper, SARS taxes your interest above the annual exemption (R23,800 if you're under 65) and takes capital gains tax when you sell. Every rand paid in tax is a rand removed from the compounding loop — a small leak that compounds into a large one.</p>

<p>A Tax-Free Savings Account closes the leak entirely: no tax on interest, dividends, or capital gains, ever. For the 2026/27 tax year you can contribute up to <strong>R46,000 per year</strong>, with a lifetime cap of R500,000. (This annual limit was raised from R36,000 — the first increase since 2021.)</p>

<p>The compounding effect of paying zero tax is bigger than it sounds. And once you hit the R500,000 lifetime contribution cap, the balance keeps compounding tax-free indefinitely — the cap limits what you put in, not what it grows to.</p>

<p>One warning: over-contributing draws a 40% SARS penalty on the excess. Track your lifetime total across all providers.</p>

<p>We cover the strategy in detail in our <a href="/blog/tax-free-savings-account-calculator-south-africa">TFSA guide</a>.</p>
```

## SECTION 6 — Inflation (new)

```html
<h2 id="inflation">The part nobody mentions: inflation compounds too</h2>

<p>Here is the quiet counterweight to everything above. SA inflation has generally run in the 4–6% range. It compounds with exactly the same mathematics as your investments — but against you.</p>

<p>If your savings account pays 5% while inflation runs 5.5%, your balance rises every month while your purchasing power falls. You are getting nominally richer and actually poorer at the same time.</p>

<p>This is why the gap between 7% and 10% returns matters far more than three percentage points suggest: at 5% inflation, the cautious saver earns a real return of about 2%; the index investor about 5% — two and a half times the real growth rate, compounding for decades.</p>

<p>The calculator has an <a href="/">inflation toggle</a> that overlays today's-money value on every projection. It's a bit sobering. But better to know.</p>
```

## SECTION 7 — Where SA investors actually get compound growth (new)

```html
<h2 id="where-to-compound">Where South Africans can put compounding to work</h2>

<p>The calculator tells you what a rate produces. Here's where those rates realistically come from, lowest risk first:</p>

<ul>
<li><strong>Bank savings / money market (± repo rate):</strong> Safe, liquid, but historically close to inflation — fine for an emergency fund, weak for wealth building.</li>
<li><strong>Fixed deposits (7–9%):</strong> Guaranteed rate for a locked term. Compounding is certain; the ceiling is low.</li>
<li><strong>Broad-market ETFs (±10% long-term average):</strong> A Satrix 40 or MSCI World tracker. Volatile year to year, but over 15+ year horizons this is where SA's serious compounding has historically happened. Platforms like EasyEquities let you start from R50.</li>
<li><strong>Retirement annuities:</strong> Compounding plus a tax deduction on contributions — a different article's worth of rules, but the same engine underneath.</li>
</ul>

<p>Historical averages are not guarantees. The point is not to predict returns — it's that whichever vehicle you choose, the mathematics of this article is doing the work, and starting matters more than optimising.</p>
```

## SECTION 8 — FAQ (replace/expand existing, with schema)

Questions (full answers drafted for direct insert — each 40–80 words, same voice):

1. **How often should interest compound for the best return?** More often is better, but the effect is modest: R100,000 at 10% for 10 years grows to R259,374 compounded annually and R270,704 monthly. Frequency fine-tunes; rate and time drive.
2. **What rate should I use in the calculator?** For savings accounts, use the quoted nominal rate. For long-term equity investing, 9–11% is a defensible planning range based on JSE history — and run a pessimistic 7% scenario alongside it using the Compare tab.
3. **Is compound interest taxed in South Africa?** Outside a TFSA, yes — interest above R23,800/year (under 65) is taxed at your marginal rate. Inside a TFSA, no tax at all. That's the whole case for using one.
4. **Can compound interest work against me?** Yes, on debt. Credit cards and store accounts compound at 20%+ against you. Paying off a 21% store card is mathematically identical to earning a guaranteed 21% return — usually the best "investment" available to anyone carrying that debt.
5. **How long until my money doubles?** Divide 72 by your rate: at 10%, roughly 7.2 years. The calculator's milestone badges show your exact doubling year. Full explanation in our <a href="/blog/rule-of-72">Rule of 72 guide</a>.

**JSON-LD:** wrap all 5 in a `FAQPage` schema block (`mainEntity` array of `Question`/`Answer`). Claude Code: generate from the final copy verbatim.

## METADATA UPDATES
- `<title>`: `Compound Interest Calculator South Africa (2026 Guide) | CompoundCalc`
- Meta description: `How compound interest works in South Africa — the formula, worked rand examples at realistic rates, TFSA limits for 2026/27, and the real cost of waiting. Free calculator included.`
- Update `Article` JSON-LD `dateModified`; update sitemap `lastmod`.
- Internal links added in copy above: home/calculator ×3, TFSA article, Rule of 72 article. Also add a link TO this article from the TFSA and Rule of 72 articles' intros (one line each — Claude Code can add: `<p>New to compounding? Start with our <a href="/blog/compound-interest-south-africa">complete guide to compound interest in South Africa</a>.</p>`).

## QA
- [ ] All calculator figures verified (they're computed with A = P(1+r/n)^nt and standard annuity-due-free monthly contribution formula — spot-check two in the live calculator)
- [ ] Ali's three rate verifications done (top of doc)
- [ ] FAQ schema validates at validator.schema.org
- [ ] TOC anchors match new headings; smooth-scroll works
- [ ] Word count ≥1,800; reading time estimate updated
- [ ] No emoji introduced; no exclamation marks; affiliate CTA block untouched
- [ ] Mobile render check
