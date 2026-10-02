# Sprint 12.1b — Post-Expansion Cleanup
**Trigger:** Follow-up to commit 7324246. Closes the two items Claude Code flagged + records verified rates.
**Size:** Small. Three edits, no new content.

## Verified facts (confirmed via multiple SARS-referencing sources, July 2026)
- **TFSA annual limit R46,000** for 2026/27 tax year, effective 1 March 2026 (up from R36,000). ✅ CONFIRMED — the live figure in the compound-interest article is correct, no change needed there.
- **TFSA lifetime cap R500,000** — unchanged. ✅
- **Over-contribution penalty 40%** on the excess. ✅
- Correct framing: "R46,000 for the 2026/27 tax year (from 1 March 2026)". The 2025/26 year was still R36,000 — so any historical reference to R36,000 should be dated, not deleted, if context is pre-March-2026.

Repo rate (~7%) and CPI (4–6%) in the compound-interest article: phrased as approximate ranges ("around 7%", "4–6% range") which remain accurate and are not date-pinned. No edit required now; re-confirm at next content pass.

---

## Task 1 — Resolve the TFSA contradiction

`blog/tax-free-savings-account-calculator-south-africa.html` currently states R36,000 (line ~135) and any dependent worked examples.

1. Update the annual limit to **R46,000** with framing: "R46,000 per tax year (2026/27, effective 1 March 2026)".
2. Recompute any worked examples that used R36,000 or R3,000/month:
   - R46,000 ÷ 12 = **R3,833/month** to max the annual limit.
   - "Years to reach R500,000 lifetime cap at max contributions": now **~10.8 years** (was ~13.9 at R36,000). Use this if the article makes the claim.
   - Any figure derived from the old R3,000/month max must be rerun through the production `simulate()` function — do NOT hand-edit. Publish the calculator's actual output, same rule as 12.1.
3. If the article references the R36,000 → R46,000 *change* as news, keep both numbers with dates ("raised from R36,000 to R46,000 from 1 March 2026"). Otherwise just state R46,000.

## Task 2 — Fix the sitemap gap

`sitemap.xml` is missing entries for all three Sprint 7 articles, not only TFSA. Add all that are absent:
- `/blog/tax-free-savings-account-calculator-south-africa`
- `/blog/etfs-vs-traditional-savings-accounts`
- `/blog/maximize-compound-interest-monthly-savings`

Each: `<priority>0.7</priority>` (matching existing blog entries) and today's `<lastmod>`. Bump the TFSA entry's lastmod specifically so Google is signalled to recrawl the corrected figure.

## Task 3 — Doc sync

- `md/Master.md`: note under the Known Issues table that the sitemap blog-entry gap (Sprint 7 articles) is resolved.
- Append to the transition log or roadmap: TFSA R46,000 verified against SARS sources on this date; repo/CPI phrased as ranges, re-confirm next pass.

---

## QA
- [ ] Grep both TFSA article and compound-interest article for "36,000" — only remaining hits should be dated historical references ("up from R36,000"), never a current-limit claim
- [ ] Any recomputed TFSA figures spot-checked against live calculator
- [ ] sitemap.xml valid XML; all 6 blog articles now listed; TFSA lastmod = today
- [ ] No emoji, no exclamation marks introduced; affiliate CTA and machinery untouched
- [ ] Both articles now agree on R46,000

## Commit
`content: fix TFSA limit to R46,000 (2026/27), close sitemap blog gap (Sprint 12.1b)`
