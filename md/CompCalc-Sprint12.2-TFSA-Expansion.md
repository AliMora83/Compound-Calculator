# Sprint 12.2 — Article Expansion: tax-free-savings-account-calculator-south-africa.html
**Supersedes Sprint 12.1b** — the R46,000 fix is built into this larger rewrite, so 12.1b's Task 1 is absorbed here. 12.1b's sitemap task (Task 2) moves into this spec as Task 5. Do NOT run 12.1b separately.

**Goal:** Expand to ~1,900 words of genuine depth AND correct the R36,000 → R46,000 change throughout. The R46,000 update is the single freshest hook available — most competing TFSA articles predate the March 2026 budget. Lead with it.

**Voice:** md/CompoundCalc-BrandVoice.md — plainspoken, number-led, thought experiment → uncomfortable truth. No hype, no exclamation marks.

## Verified facts (confirmed July 2026 via multiple SARS-referencing sources — authority is Ali's confirmation)
- TFSA annual limit **R46,000** for 2026/27 tax year, effective 1 March 2026 (up from R36,000; first rise since 2021). Framing: "R46,000 per tax year (2026/27, from 1 March 2026)."
- Lifetime cap **R500,000** — unchanged.
- Over-contribution penalty **40%** on the excess (across all providers combined — SARS aggregates).
- R46,000 ÷ 12 = **R3,833/month** to max the annual limit.
- R500,000 ÷ R46,000 = **10.87 years** of max contributions to reach the lifetime cap (was ~13.9 at R36,000).
- Interest exemption outside a TFSA: R23,800 (under 65) / R34,500 (65+).
- 2025/26 (year of assessment 2026) was still R36,000 — so any dated historical reference stays R36,000; only the *current* limit becomes R46,000.

---

## ⚠️ CRITICAL — functional machinery, not copy (Ali's catch)

The sidebar TFSA mini-calculator has hard-coded constants tied to the old R36,000 limit. These are FUNCTIONAL and must change in sync, not just the visible text:

1. **`max="3000"` input attribute** → `max="3833"` (R46,000 ÷ 12, rounded down).
2. **Grep the sidebar JS for any second constant** enforcing the cap: a monthly max, an annual-limit variable (e.g. `36000`, `3000`, `TFSA_ANNUAL`, `annualLimit`), or a slider `step`/ceiling. If the mini-calculator programmatically caps contributions, that constant must move to `46000` / `3833` too. **Change the attribute and the JS constant together, or the input and the validation will disagree.**
3. If no JS constant exists (attribute is cosmetic only), note that in the QA report so we know the input isn't actually enforced.

**Do NOT hand-edit any computed output.** Every rand figure below marked ⟳ must be produced by running the inputs through the production `simulate()` function and publishing its actual result — same rule as Sprint 12.1.

---

## Task 1 — Reconcile the existing internal contradiction

The article currently disagrees with itself: JSON-LD says "13 years" to reach the cap, visible FAQ says "13.8 years". Both are now superseded by **~10.9 years** at R46,000. Set both locations to the same recomputed figure. After this task, grep the file for "13 years", "13.8", "36,000", "3,000" — no current-limit hit should remain (only dated historical references survive).

## Task 2 — New/rewritten body sections

Merge these in. Keep hero, sidebar mini-calculator (with the machinery fix above), TOC machinery, share buttons, affiliate CTA, existing GA4 hooks. Replace matching sections; insert new ones in order; update TOC anchors.

### Intro (replace opening — lead with the news hook)

```html
<p>From 1 March 2026, the amount you can put into a Tax-Free Savings Account each year rose from R36,000 to <strong>R46,000</strong> — the first increase since 2021. If you have a TFSA and haven't adjusted your debit order, you're leaving R10,000 of tax-free room on the table this year.</p>

<p>This guide covers the 2026/27 rules in full: the annual and lifetime limits, the 40% penalty that catches people out, and — the part most articles skip — what "tax-free" is actually worth in rand once compounding runs for a few decades. Every figure can be tested in the <a href="/">calculator</a>.</p>
```

### What a TFSA actually is (new — SARS calls it "tax-free investment")

```html
<h2 id="what-is-tfsa">What a TFSA is (and what SARS actually calls it)</h2>

<p>A Tax-Free Savings Account is a wrapper, not a product. Inside it, every tax that normally applies to investing is switched off: no tax on interest, no dividends tax, no capital gains tax — ever, and on withdrawal too. SARS's own term is "tax-free investment", which is the more honest name: the wrapper can hold cash, but it's wasted on cash.</p>

<p>Contributions are made with after-tax money — a TFSA doesn't reduce this year's taxable income the way a retirement annuity does. Its entire advantage sits on the growth side, and that advantage compounds.</p>
```

### The 2026/27 limits (new — the core reference section)

```html
<h2 id="limits">The 2026/27 limits, plainly</h2>

<ul>
<li><strong>Annual limit: R46,000</strong> per tax year (1 March 2026 to 28 February 2027). That's R3,833 a month to max it.</li>
<li><strong>Lifetime limit: R500,000</strong> — unchanged. This counts contributions only, never growth. An account can grow to R2 million and stay entirely tax-free; the cap only ever measures what you put in.</li>
<li><strong>Over-contribution penalty: 40%</strong> of the excess. Put in R56,000 in one year and SARS takes 40% of the R10,000 overshoot — R4,000 — in a product designed to never lose a cent to tax.</li>
</ul>

<p>Two rules quietly catch people out. First, <strong>unused annual room does not roll over</strong>: contribute R20,000 this year and the other R26,000 is gone, not banked for later. Second, <strong>the limits belong to you, not the account</strong> — a TFSA at your bank and another at an investment platform share the same R46,000 and R500,000, and neither provider sees the other. SARS adds them up at assessment. That's exactly how accidental over-contributions happen.</p>
```

### What tax-free is worth in rand (new — core depth, ⟳ recompute all)

```html
<h2 id="what-its-worth">What "tax-free" is actually worth</h2>

<p>The phrase "tax-free" is easy to nod at and hard to feel. Here's the number.</p>

<p>Take someone maxing the annual limit — R3,833 a month — at a 10% long-term return, held for 20 years:</p>

<ul>
<li><strong>Inside a TFSA:</strong> ⟳[run simulate(): R0 initial, R3,833/month, 10%, 20y, monthly] — every rand tax-free.</li>
<li><strong>In an equivalent taxable account:</strong> the same contributions, but interest above R23,800/year taxed at your marginal rate and capital gains taxed on withdrawal. Over 20 years that drag compounds into a materially smaller balance.</li>
</ul>

<p>The gap is the whole point of the wrapper. It isn't dramatic in year one. It's decisive by year twenty — because the tax you didn't pay stayed invested and earned its own returns, every year, on top of itself.</p>

<p><a href="/">Run your own contribution in the calculator</a> to see your tax-free projection, and switch on the inflation toggle to see it in today's money.</p>
```

### Reaching the lifetime cap — the rewritten narrative (⟳ recompute)

**This is the paragraph that changes shape.** At R46,000/year the accumulation window is ~10.9 years, not ~13.8. Rewrite, don't patch:

```html
<h2 id="lifetime-cap">Reaching the R500,000 cap — and what happens after</h2>

<p>Max the annual limit every year and you hit the R500,000 lifetime cap in just under <strong>11 years</strong> (R500,000 ÷ R46,000 = 10.9). Under the old R36,000 limit it took nearly 14 — so the 2026 increase pulls the finish line forward by roughly three years.</p>

<p>Here's the part that matters, and the part the shorter contribution window actually improves: <strong>once you hit the cap, you stop contributing — but the account doesn't stop growing.</strong> The balance keeps compounding tax-free with no further deposits and no further limit. Reaching the cap sooner means the compounding-only phase — the tax-free runway — starts sooner and runs longer.</p>

<p>⟳[run simulate(): R3,833/month for 10.9y then R0/month to year 30, 10% monthly — publish the balance at the cap AND at year 30 to show the post-cap tax-free growth]</p>

<p>That's the quiet power of the wrapper: you do the work for eleven years, and tax-free compounding does the rest for as long as you leave it alone.</p>
```

### Where to hold it (new — natural affiliate context)

```html
<h2 id="where-to-hold">Cash TFSA vs equity TFSA: the choice that matters most</h2>

<p>The single biggest TFSA mistake isn't over-contributing — it's holding cash. A tax-free wrapper around a 6% bank account saves you tax on 6%. The same wrapper around a diversified equity ETF returning ~10% over the long run saves you tax on far more, for decades. The wrapper is most valuable exactly when it holds long-term growth assets.</p>

<p>Platforms like EasyEquities let you open a TFSA and hold ETFs from as little as R50, which is where many South Africans start. Whatever you choose, the rule holds: a TFSA is wasted on money you'll need next year, and most powerful on money you can leave for ten.</p>
```

## Task 3 — FAQ (replace/expand, with schema; reconcile the 13-year figure here)

Five questions, 40–80 words each, same voice. Recompute any figure ⟳.

1. **What's the TFSA limit for 2026?** R46,000 per tax year from 1 March 2026 (up from R36,000), with a R500,000 lifetime cap. Both count contributions, not growth. Unused annual room doesn't roll over.
2. **How long to reach the R500,000 lifetime limit?** Maxing R46,000 a year, just under 11 years — about three years faster than under the old R36,000 limit. After that the balance keeps compounding tax-free with no further contributions.
3. **What happens if I over-contribute?** SARS charges 40% of the excess as a penalty. The limits combine across every TFSA you hold — providers can't see each other, so track your own total.
4. **Can I withdraw and re-contribute?** You can withdraw anytime, but withdrawals don't restore contribution room. Re-depositing counts as a fresh contribution against both limits — an easy way to accidentally burn allowance.
5. **Cash or investments in a TFSA?** Investments, almost always. The tax saving on a 6% cash account is small; on a ~10% equity ETF held for decades it's substantial. A TFSA is strongest holding long-term growth assets. See our <a href="/blog/compound-interest-south-africa">compound interest guide</a>.

**JSON-LD:** regenerate `FAQPage` from final copy verbatim. **Ensure the reach-the-cap figure in JSON-LD matches the visible FAQ exactly** (~11 years both places — this is the contradiction being fixed).

## Task 4 — Metadata + cross-links
- `<title>`: `TFSA Calculator South Africa 2026 — R46,000 Limit Explained | CompoundCalc`
- Meta description: `The 2026/27 TFSA rules in full — the new R46,000 annual limit, R500,000 lifetime cap, the 40% penalty, and what tax-free is actually worth in rand. Free calculator.`
- Update `Article` JSON-LD `dateModified`.
- Add back-link from compound-interest article already done in 12.1 — verify it still resolves.
- Confirm the compound-interest article's TFSA section (R46,000) and this article now agree.

## Task 5 — Sitemap (absorbed from 12.1b, expanded per Ali's decision)

**Align all sitemap URLs to canonicals — drop `.html` everywhere.** The canonical tags omit `.html`; the sitemap currently includes it, which Search Console can read as duplicate URLs. Fix the whole file for consistency:

1. **Precondition check:** confirm the site serves extensionless URLs with a **200, not a redirect** (Netlify pretty-URLs usually do this). Fetch `/blog/compound-interest-south-africa` (no `.html`) and verify 200. **If it 301/302 redirects to `.html`, STOP and flag** — do not ship a sitemap of redirecting URLs; we'd instead keep `.html` and fix canonicals separately.
2. If 200 confirmed: strip `.html` from every existing sitemap entry.
3. Add the three missing Sprint 7 articles (all extensionless): `tax-free-savings-account-calculator-south-africa`, `etfs-vs-traditional-savings-accounts`, `maximize-compound-interest-monthly-savings`. `<priority>0.7</priority>`, `<lastmod>` today.
4. Bump `<lastmod>` on this TFSA entry and the compound-interest entry to today (both edited).

## Task 6 — Doc sync
- `md/Master.md`: sprint log entry; mark sitemap blog-gap + URL-format inconsistency resolved in Known Issues.
- Roadmap/transition log: Sprint 12.2 done; note 12.1b was absorbed here (not run separately); TFSA R46,000 verified date.

---

## QA
- [ ] `max="3833"` set; sidebar JS cap constant found-and-synced OR confirmed cosmetic (report which)
- [ ] Mini-calculator still computes correctly after the constant change — run a test contribution
- [ ] Every ⟳ figure produced by live `simulate()`, not hand-typed; two spot-checked
- [ ] Grep: no "36,000" / "3,000" / "13 years" / "13.8" as a *current* claim anywhere in file
- [ ] JSON-LD reach-cap figure == visible FAQ figure (~11 years)
- [ ] compound-interest article and TFSA article agree on R46,000
- [ ] FAQ schema valid JSON-LD in the @graph; 5 Q&A match on-page verbatim
- [ ] Sitemap: extensionless URLs confirmed 200 (not redirect) BEFORE stripping; all 6 blog articles listed; both edited entries lastmod = today
- [ ] TOC anchors match new h2s; smooth-scroll works
- [ ] Word count ≥1,800; reading-time estimate updated
- [ ] No emoji, no exclamation marks; affiliate CTA + hero + share bar untouched
- [ ] Mobile 360px render check

## Commit
`content: expand TFSA guide + fix R46,000 limit + machinery + sitemap canonicals (Sprint 12.2)`
