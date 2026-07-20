# Sprint 11 — Phase A Transition Log

Phase A (editorial design tokens) is live. This log records everything that now looks
visually inconsistent but is **deliberately not fixed** because it belongs to a later
phase. Do not "clean these up" ad-hoc — they are scheduled work.

Date: 2026-07-19

---

## Scheduled for Phase B (nav / footer / hero / chrome)

- **Nav and logo still in old style.** Header/nav inherits the new paper/ink palette
  through legacy aliases but keeps the old layout, logo PNG, and DM Sans wordmark.
- **Hero/intro copy still DM Sans.** `.calc-header h1` now inherits Fraunces from the
  base `h1` rule but keeps its old 1.6rem size override; the sub-line is unchanged.
- **Cookie banner still dark `#111827` style** (`#cookie-banner` in styles.css, plus its
  inline-styled "Got it" button in every page's HTML, still `#16a34a`). Left untouched —
  the accept button has an `onclick` and the banner has localStorage-driven display logic.
- **Mobile floating CTA pill** re-mapped to ink/paper/accent tokens but keeps its old
  pill shape and shadow.
- **Footer**: background and scroll-to-top now use `var(--accent)`, but the layout,
  white-on-green text (rgba white values), and column structure are unchanged.
- **`.ad-slot` chrome** (dashed borders, "ADVERTISEMENT" label) inherits tokens but keeps
  the old card-like presentation.

## Scheduled for Phase C (calculator page layout)

- **Input panel / chart boxes / tables** still card-based (`.input-panel`, `.chart-box`,
  `.table-toggle`) — they inherit paper-tint/rule tokens through aliases but keep borders
  + rounded-card structure rather than hairline editorial rules.
- **Compare tab scenario panels** keep their blue/amber identity:
  `.scenario-a` (`#eff6ff`/`#bfdbfe`), `.scenario-b` (`#fffbeb`/`#fde68a`),
  `.compare-panel.b h3` (`#fbbf24`). Note: the compare **chart** now uses the editorial
  palette (Scenario A = accent green, Scenario B = ink), so the chart lines no longer
  colour-match the blue/amber input panels. Resolve in Phase C.
- **Retirement "required extra saving" callout** keeps amber warning colours
  (`#fefce8`, `#fde047`, `#92400e`) — no editorial token for "warning" yet.
- **`renderRetireResults()` in calculator.js** sets an inline `#ef4444` deficit colour on
  `#ret-gap`. Left as-is: JS changes were restricted to chart colours this phase.
- **Kinetic `.metric-value.updating`** flash uses `var(--green)` (now accent) — fine, but
  the scale-pop animation style is pre-editorial.

## Scheduled for Phase D (blog)

- **Blog display face is still Lora.** `blog.css` `:root` overrides
  `--font-display: 'Lora'` for blog pages; Fraunces applies everywhere else. The Lora
  @font-face declarations remain in styles.css until the blog migrates.
- **Blog cards and article pages** partially inherit the palette (titles/links/CTAs now
  token-mapped) but keep old card layout, radii (`--radius-lg` — which is *undefined*,
  see below), shadows, and hover-lift transforms.
- **Dark decorative image slots** keep hardcoded deep-green gradients:
  `.img-text-block .img-slot` (`#0f1f12 → #1a3a24`),
  `.blog-card-img` (`#0b1f14 → #163d22 → #1a4a28`), plus `rgba(22,163,74,…)` grid
  overlays and `#bbf7d0` in the light variant.
- **Formula blocks** keep emerald-on-green text (`#a7f3d0`, `#6ee7b7`) — background now
  follows `--green-secondary` → accent-hover, foregrounds unmapped.
- **Amber "exact"/warning blocks**: `.blog-table .exact` (`#fffbeb`/`#92400e`),
  `.callout.warning` (`#fef9ec`/`#f59e0b`/`#78350f`) — no warning token yet.
- **`.scenario-card:nth-of-type(2) .scenario-narrative`** near-white `#fafffe`, and
  `.blog-affiliate-cta-disclosure` grey-green `#3f6244` — no obvious mapping.
- **Undefined CSS variables used by blog.css** (pre-existing, now partially healed by the
  new tokens): `--ink`, `--font-body`, `--font-mono` now resolve; `--text-mid`,
  `--bg-soft`, `--bg-tint`, `--radius-lg`, `--green-faint`, `--green-dark`, `--green-mid`
  are still undefined and silently fall back to initial values. Define or replace in
  Phase D.
- **Blog affiliate CTA / cards** keep green-tinted `rgba(22,163,74,…)` box-shadows.

## Post-Phase D

- **Welcome email HTML** (inline styles in `netlify/functions/send-pdf.mts` — the
  codebase's equivalent of `buildWelcomeEmailHTML()`) and
  **jsPDF colour values** in `calculator.js` (`generateProjectionPDFForEmail()`,
  metric-card fills, `22,163,74` header green, grey table chrome) still use the old
  bright-green palette. Untouched by instruction — email clients and PDF keep the old
  palette until after Phase D.

## Hardcoded values kept with no obvious token mapping

- `--amber`, `--amber-light`, `--blue`, `--blue-light` kept in `:root` (used by compare
  scenario panels; milestone badges no longer use them after the editorial restyle).
- Chart.js tooltip chrome in `calculator.js` (`#111827` bg, `#f9fafb`/`#d1d5db` text) —
  dark tooltip retained; only dataset/grid/tick colours were in scope.
- All white-on-accent text (`#fff`/`#ffffff` on green/ink surfaces) intentionally stays
  hardcoded white.

## Accessibility notes

- Required QA pairs pass WCAG AA: `--ink-soft` on `--paper` = 6.45:1, white on
  `--accent` = 8.01:1 (also: ink 16.3:1, accent-on-paper 7.5:1, danger-on-tint 5.5:1).
- `--ink-faint` on `--paper` = 3.32:1 — below 4.5:1. It is the spec's caption/disclaimer
  token and is used for small uppercase labels (FINAL BALANCE, secondary-metric labels).
  Fine under WCAG large-text/UI rules where type is large or decorative, but revisit in
  Phase B/C if any body-size copy uses it.
- A global `prefers-reduced-motion: reduce` block was added to styles.css (QA checklist
  item — no such guard existed before).

## Notes on Phase A decisions

- `--shadow` alias now resolves to `none` (hairlines replace shadows); `.ad-multiplex`
  was the only consumer.
- `--bg-surface` and `--bg-active` both map to `--paper-tint`; `--green-secondary` maps
  to `--accent-hover`.
- Milestone badges: `.m2`/`.m5` modifiers now share the quiet outline; `.m10` gets an
  accent outline as the single emphasis. Class names untouched (JS/PDF read
  `.milestone-badge`).
- Select chevron data-URI stroke updated `#6b7280 → #5C5A54` (ink-soft).
- The grow chart's stacked-area fills changed from canvas gradients to flat rgba fills
  (`makeGradient()` in `renderGrowChart` is now unused but left in place — no-logic-change
  rule).
