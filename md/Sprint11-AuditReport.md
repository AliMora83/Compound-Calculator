# Sprint 11 / Phase 1 — Editorial Design Rollout Audit
**Date:** 2026-07-25 · **Method:** read-only code audit (styles.css, HTML pages, JS, netlify functions, git history) cross-checked against Sprint11-TransitionLog.md, Roadmap-July2026.md, DesignReview.md, CompCalc-Sprint11-AG.md

**Baseline commit (last pre-Sprint-11):** `65935b2` — Sprint 11 work spans `18279eb` (Phase A) → `e520dfa` (HEAD).

---

## 1. TOKENS — ✅ DONE

`assets/css/styles.css:40–105` contains the full editorial token system: warm paper palette (`--paper #FAF7F2`, `--paper-raised`, `--paper-tint`), ink scale (`--ink #1A1A17`, `--ink-soft`, `--ink-faint`), hairline rules, single deep-green accent (`--accent #1E5B3E` + hover/tint), danger pair, Fraunces/DM Sans/DM Mono font tokens, type scale, spacing/radius/motion.

Legacy aliases are in place (styles.css:88–105): `--bg`, `--bg-card`, `--text`, `--text-muted`, `--border`, `--green`, `--green-light`, etc., plus pre-Sprint-11 keeps (`--bg-surface`, `--green-secondary`, `--shadow: none`, `--amber`/`--blue` documented as unmapped).

**Old hardcoded colors still in use (core files):**
| Location | Values | Status |
|---|---|---|
| styles.css:1908–1924 (retirement "required extra saving" callout) | `#fefce8`, `#fde047`, `#92400e` | Known/documented in transition log — no warning token yet |
| styles.css:1307 | `#6b7280` (fallback in `var(--text-muted, #6b7280)`) | Harmless fallback, minor |
| styles.css `:root` | `--amber`, `--amber-light`, `--blue`, `--blue-light` literals | Deliberate keeps, documented |
| assets/css/blog.css | `#16a34a` family, `#0f1f12`, `#a7f3d0`, `#bbf7d0` etc. (4+ hits) | Scheduled Phase D (blog) — expected |
| netlify/functions/send-pdf.mts:156,168,180,197 | `#16a34a` welcome-email green | Scheduled post-Phase-D — expected |
| assets/js/calculator.js:909 | `setTextColor(22, 163, 74)` jsPDF green | Scheduled post-Phase-D — expected |

`#16a34a`, `#14532d`, `#059669`, `#f0fdf4` are fully absent from styles.css, footer.css, index.html, and all runtime JS.

## 2. FONTS — ✅ DONE (one minor inefficiency)

- Fraunces self-hosted in `assets/fonts/` (fraunces-400/400i/500/600.woff2) with `@font-face` + `font-display: swap` (styles.css:10–13).
- `<link rel="preload" href="/assets/fonts/fraunces-600.woff2" as="font" crossorigin>` present on all 5 core pages (index, retirement, compare, goal, about).
- DM Sans + DM Mono load correctly via Google Fonts `<link>` in each page head.
- **Minor:** styles.css:6 also `@import`s DM Sans/DM Mono from Google Fonts — duplicate of the HTML `<link>` (browser dedupes the fetch, but the render-blocking @import chain is worth removing in a later pass).
- Lora @font-face declarations remain (styles.css:15–36) — intentional until Phase D blog migration.

## 3. RESULTS PANEL — ✅ DONE

Sprint 10 gradient/glassmorphism panel is retired. `.portfolio-header` (styles.css:1115+, commented "Sprint 11 Phase A — replaces Sprint 10 gradient panel") is the ink-ruled editorial block: `--paper-raised` background, 2px `--rule-strong` top border, 1px `--rule` bottom, `border-radius: 0`, `box-shadow: none`. ROI badge explicitly converted (`backdrop-filter: none`, quiet ink outline, styles.css:1188). No `linear-gradient`/`backdrop-filter` remains active anywhere in styles.css. Metric cards use tokens.

## 4. BUTTONS — 🟡 PARTIAL

**Visual convergence achieved (2 looks), class consolidation not:** the target "exactly two classes" state doesn't exist yet.

| Style | Selector(s) | File | Look |
|---|---|---|---|
| Primary (accent-filled) | `.btn-primary, .ec-btn` (styles.css:200) | email form: `index.html:215` (`.ec-btn`) | green fill, white text |
| Primary duplicate | `.btn-calculate` (styles.css:804) | **unused** — Calculate button deleted per spec (auto-calc); dead CSS | same look, separate rule |
| Primary duplicate | `#cookie-banner button` (styles.css:1536) | all 4 calculator pages | same look via element selector, no class |
| Secondary (ink hairline) | `.btn-secondary, .btn-clear, .btn-download, .btn-share` (styles.css:776/791) | index.html:112,119,342–343 + other pages | transparent, 1px ink border |
| Third style (open) | `.pill-btn` (styles.css:1762) | mobile CTA pill `index.html:588` | accent fill, **50px pill radius** — old shape, flagged open in transition log |

**Gap to target:** (a) `.btn-primary` is defined but used by zero HTML elements; (b) cookie-banner button not migrated to `.btn-primary` class (styled by element selector instead — visually correct, structurally off-spec); (c) `.btn-calculate` rule is dead code; (d) `.pill-btn` is a third visual style.
**Deviation:** DesignReview specifies `.btn-primary` as **ink-filled**; implementation is **accent(green)-filled**. Consistent site-wide, but not what the decision doc says.

## 5. ICONS — 🔴 NOT STARTED (sprite) / partial ad-hoc SVGs

No SVG sprite exists (no `<symbol>`/`<use>` anywhere). Clear/Share/scroll-to-top already use inline one-off SVGs (1.5–2px stroke, `currentColor`) — direction-compatible but not the specced sprite.

**Emoji still used as UI icons:**
| Emoji | Location |
|---|---|
| 📩 | index.html:199 (email-capture icon), index.html:585 (mobile CTA pill) |
| ✅ | index.html:228 (ec-success), share.js:117 (Copied!), calculator.js:1145 (ret banner) |
| ⚠️ | index.html:237 (ec-error), calculator.js:1148 (ret banner) |
| ✕ | index.html:243 (ec-dismiss) |
| ⏳ | index.html:316 (cost-of-waiting title), calculator.js:594 (Calculating…) |
| 📄 | index.html:342 (Download PDF) |
| 🎯 | calculator.js:1169, 1173 (retirement milestones) |

(Roadmap note: sprite was added to Sprint 11 scope; component swaps belong to Sprints 13–15. So the sprite itself is the Phase 1 gap.)

## 6. CHART — ✅ DONE

`CHART_COLORS` (calculator.js:24–31) uses the editorial palette exactly: principal `#8B887F` (ink-faint), contributions `#5C5A54` (ink-soft), interest `#1E5B3E` (accent), realValue `#A33B2E` (danger), scenarioA accent / scenarioB ink, grid `#DAD4C8` (rule), ticks `#8B887F`. Flat rgba fills replace canvas gradients. Documented keeps: dark tooltip chrome; `makeGradient()` (calculator.js:190) left unused per no-logic-change rule (dead code, flagged for cleanup).

## 7. GUARDRAILS — ✅ INTACT

- IDs present and referenced: `#ec-email`, `#ec-submit` (index.html:215), `#email-capture`, `#affiliate-cta`, `#growChart` — all in index.html + calculator.js.
- `.milestone-badge` preserved (styles.css:607, calculator.js render; `.milestone-badge-hit` added, base class untouched).
- GA4 events **byte-identical** to pre-Sprint-11 (`git diff 65935b2` on gtag calls: no change): `calculation_run`, `email_capture`, `pdf_download`, `share_url_copied`, `affiliate_click`, `tab_switch`.
- URL param keys unchanged in share.js: `tab, p, m, r, y, n, inf` (+ goal/compare keys `t, ap, am…`).

## 8. REGRESSIONS — ✅ NONE FOUND

Automated cross-reference of every `class=` in the 4 calculator pages + JS-assigned classes against styles.css/footer.css selectors: only unmatched class is `adsbygoogle` (external, styled by AdSense JS — expected). No CSS classes referenced in HTML are missing from stylesheets, no gtag/event/ID drift since `65935b2`.

---

## Transition-log claims vs code

- ✅ Everything claimed RESOLVED for Phases A/B/C verified in code (tokens, masthead, cookie banner, footer, inputs, compare panels, milestones, ad-slot `:has()` collapse, `switchTab` refactor, clearInputs defaults).
- ⚠️ **Log is stale in one place (in your favor):** it lists `renderRetireResults()` inline `#ef4444` as still open, but calculator.js:1140 already uses `var(--green)`/`var(--danger)`. That item is done.
- ⚠️ **Roadmap is stale:** Status Overview (updated 23 July) says "Phase 1 token spec written, not shipped" — but Phases A–C shipped 19–21 July (`18279eb`, `f430ac1`, `5641c4f`). Roadmap also lists switchTab/clearInputs fixes under Sprint 14 — both already landed in Sprint 11C.
- Confirmed still open exactly as logged: amber retirement callout, mobile CTA pill, `.chart-box` cards, blog (Lora + old greens), welcome email + jsPDF palette.

## Deviations from specs (done differently than written)

1. **Primary button is accent-filled, not ink-filled** (DesignReview decision says ink-filled, paper text).
2. **`.input-group`/`.input-money` spec names not introduced** — restyle applied to existing `.field`/`.input-row` classes (logged, sensible).
3. **Ad-slot `min-height` kept** for filled slots instead of spec's `min-height:0` (logged — CLS protection).
4. **Tab-bar tasks had no target elements** (no `.tab-btn` exists post-Phase-B nav) — refactor done at JS level only (logged).
5. **Roadmap Sprint 13/14 scope partially pre-executed** in 11B/11C (nav, footer, cookie banner, hero, both bug fixes) — phases delivered ahead of the written plan.

## Remaining work (dependency order)

1. **SVG icon sprite** (Phase 1 scope, blocks emoji swaps) — build ~10-icon inline sprite (envelope, clock, check, link, close, warning, arrow, download, chart, calendar).
2. **Button class consolidation** — migrate `.ec-btn` markup + cookie-banner buttons to `.btn-primary`; delete dead `.btn-calculate` rule; decide ink-filled vs accent-filled and align with DesignReview; restyle `.pill-btn` (square radius) or fold into `.btn-secondary`.
3. **Emoji → sprite swaps** in calculator UI + JS strings (needs #1; roadmap assigns to Sprints 13–14 but calculator-UI emoji could ship with the sprite).
4. **Warning token** (`--warn`/`--warn-tint`) → convert retirement callout amber literals (unblocks blog warning blocks in Phase D too).
5. **Minor cleanups:** remove Google-Fonts `@import` duplicate (styles.css:6), remove unused `makeGradient()`, `.chart-box` hairline conversion.
6. **Doc hygiene:** update Roadmap status line + Sprint 14 task list; mark ret-gap item resolved in transition log.
7. *(Phase D / post-D, unchanged: blog restyle, welcome email + jsPDF palette.)*
