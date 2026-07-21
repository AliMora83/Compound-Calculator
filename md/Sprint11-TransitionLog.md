# Sprint 11 — Phase A Transition Log

Phase A (editorial design tokens) is live. This log records everything that now looks
visually inconsistent but is **deliberately not fixed** because it belongs to a later
phase. Do not "clean these up" ad-hoc — they are scheduled work.

Date: 2026-07-19

---

## ~~Scheduled for Phase B~~ — RESOLVED 2026-07-20 (Sprint 11B)

- ~~Nav and logo old style~~ → Fraunces text logo (`.nav-logo`), masthead nav with
  1.5px ink rule, accent-underline active state, editorial mobile menu (Fraunces links,
  hairline separators). `logo.png` file kept for OG/PDF use; only nav markup swapped.
- ~~Hero/intro~~ → `.calc-header` is now the editorial hero (text-hero Fraunces H1,
  eyebrow micro-label, ink-soft sub, hairline bottom rule). **SEO H1 text untouched.**
- ~~Cookie banner dark style~~ → paper-raised + ink rule + accent button; inline styles
  moved to styles.css; `display:none` inline + JS toggle mechanics preserved.
- ~~Footer dark green~~ → paper background, rule-strong top border, ink-soft links with
  accent hover, legal micro-text band.
- ~~Scroll-to-top~~ → square (2px radius) ink-outline button, inverts on hover; SVG
  arrow stroke changed `white` → `currentColor` (visual only, mechanics untouched).

Phase B additions:
- **Retirement nav link added** to `compare-investments.html` and `debug-adsense.html` —
  they were the only pages missing it; spec requires identical nav on all 16 pages.
- **Blog safety aliases added** (Task 0) in blog.css `:root`: `--text-mid`→ink-soft,
  `--bg-soft`/`--green-faint`→paper-tint/accent-tint, `--bg-tint`→accent-tint,
  `--radius-lg`→radius, `--green-dark`→accent, `--green-mid`→accent-hover. These vars
  were previously undefined (resolved to initial values).
- **Mobile floating CTA pill** still old pill shape + shadow (still open after Phase C).
- ~~`.ad-slot` chrome~~ → resolved in Phase C (see below).

## ~~Scheduled for Phase C~~ — RESOLVED 2026-07-21 (Sprint 11C)

- ~~Input panel / tables card-based~~ → underline-only inputs, hairline-separated `.field`
  groups, DM Mono figures; year table restyled (mono body, rule-strong header, paper-tint
  even rows, plain-accent collapse link). Applied to the **existing** classes (`.field`,
  `.input-row`, `.input-prefix`, `select`, `table`) — the spec's `.input-group`/`.input-money`
  names were not introduced (would duplicate the live markup).
- ~~Compare blue/amber~~ → panels are paper-raised, distinguished by a left rule only
  (`[data-scenario="a"]`=accent, `="b"`=ink). The five blue/amber literals
  (`#eff6ff`/`#bfdbfe`/`#fffbeb`/`#fde68a`/`#fbbf24`) are deleted. Chart lines now match.
- ~~Milestone row~~ → `.milestones` container gets padding + hairline (only when non-empty);
  every rendered badge is a reached-milestone so carries `.milestone-badge-hit` (accent
  outline). `.milestone-badge` class name preserved (PDF capture).
- ~~Cost-of-waiting~~ → hairline-bounded, display-font title, dotted row separators, mono
  accent values (restyled the existing `.delay-*` classes).
- ~~Ad-slot chrome~~ → unfilled/empty slots collapse via
  `:has(ins[data-ad-status="unfilled"])` / `:empty`. **Deviation:** kept `min-height` for
  filled/loading slots (CLS protection, a Phase A perf goal) rather than the spec's literal
  `min-height:0`; the `:has(unfilled)` collapse achieves the "no gap" intent without CLS risk.
  On localhost (no AdSense) the placeholder box still shows — expected.
- ~~Tab-tracker fragility + `calculator.js:850` TypeError~~ → `switchTab()` no longer parses
  `onclick` strings; a module-level `activeTab` is the single source of truth, and the
  email-capture success path reads it (null-deref gone — verified zero console errors on the
  success branch under stubbed fetch). Note: **no tab-bar/`.tab-btn` exists** in the current
  site (the Phase B top nav navigates between separate pages), so Task 1's tab-bar restyle
  and Task 6's `data-tab` HTML additions had no trigger elements to target — the refactor was
  done at the JS level (switchTab + a generic `[data-tab]` sync loop for future-proofing).
- ~~`clearInputs()` Compare defaults~~ → restored to Scenario A 5% / Scenario B 8%.

Still open after Phase C (unchanged scope):
- **Retirement "required extra saving" callout** keeps amber warning colours
  (`#fefce8`, `#fde047`, `#92400e`) — no editorial "warning" token yet.
- **`renderRetireResults()` inline `#ef4444`** deficit colour on `#ret-gap` — JS was
  restricted to Task 6 this phase; convert to `--danger` in a later JS pass.
- **`.chart-box`** (goal/compare/retire chart wrappers) still a bordered card — not in
  Phase C's task list; tokenised but not converted to hairline. Minor.
- **Mobile floating CTA pill** still old pill shape + shadow.

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
