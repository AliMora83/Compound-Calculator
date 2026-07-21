# CompoundCalc — Sprint 11 C.5 Mobile Overflow Diagnostic

**Method:** `netlify dev` (localhost:8888), Chrome-engine preview pane resized to the
**320 px** hard floor (deliberately narrower than the iPhone-SE 375 the spec suggests, so
any fix clears the harder case). Overflow detected programmatically: for every element,
`getBoundingClientRect().right > innerWidth`, then filtered to **leaf offenders** (elements
whose children do *not* also overflow) to isolate true causes from inherited width.

**Headline finding — the single dominant root cause:**
`document.scrollWidth` exceeds the viewport on every **calculator** page *once results are
populated*. The driver is not any one wide element — it is the **`.layout` CSS grid failing
to shrink its `1fr` track below `min-content`**. Grid (and flex) items default to
`min-width: auto`, so the track refuses to go narrower than its widest descendant and the
whole panel is pinned ~348 px wide inside a ~272 px content box. Live experiment: setting
`min-width: 0` on the `.layout` children collapsed `scrollWidth` from 372 → 348, leaving only
the stale chart canvas behind. This one fix (`minmax(0,1fr)` / `min-width:0`) resolves the
bulk of the overflow across index, retirement, goal, and compare.

**Pages that were already clean at 320 px (fresh load):** `compare-investments.html`,
`blog/index.html`, `blog/*.html` article layout, legal pages — their grids already collapse
to a single column via existing `max-width` queries. They still receive the mobile-first
refactor + iOS gotchas in commit 3, but showed **no horizontal scroll** in the audit.

**No structural surprise found.** Every fixed dimension in the CSS is a `max-width` *cap*
(`.nav-container` 1100, `.calc-wrap` 960, `.footer-inner` 1160, ad slots 728/336). The only
fixed track — `.layout { grid-template-columns: 300px 1fr }` — applies only above 680 px where
the viewport can afford it. There is **no** hardcoded `width: 1200px` section wrapper predating
Phase A. Safe to proceed to commit 3 without a stop-and-flag.

---

### Homepage (index.html) — Grow tab, results populated

- `.layout` in `assets/css/styles.css:324` — `grid-template-columns: 1fr` (≤680) but grid item `min-width:auto` keeps the track at `min-content` (~348 px) inside a 272 px box → **primary overflow**. Fix: `grid-template-columns: minmax(0,1fr)` and/or `min-width:0` on `.input-panel` + `.results-panel`.
- `#growChart` canvas in `index.html:308` / config `assets/js/calculator.js:261` — `maintainAspectRatio:true, aspectRatio:2.4` leaves a stale explicit canvas width (300 px) that does not track the narrowed container. Fix (Task 3.7): `maintainAspectRatio:false` + explicit responsive height on `.chart-wrapper`/`.chart-container`.
- `.portfolio-header-top` in `styles.css:1086` — balance figure + ROI badge in one `space-between` row; `min-content` (badge `min-width:80px` + hero figure) forces width. Fix: stack under 480, row ≥480 (Task 3.6).
- `.portfolio-secondary-row` in `styles.css:1173` — two metrics with `gap:2rem` + `padding-left:2rem` + `border-left`; `min-content` ~308 px. Fix: stack vertically <480, side-by-side ≥480.
- `.portfolio-roi-badge` in `styles.css:1130` — `min-width:90px` (80 on mobile) is a hard floor that participates in the parent's min-content. Acceptable once parent stacks; verify.
- `#cookie-banner` in `styles.css:1437` — `position:fixed; display:flex; flex-wrap:nowrap; justify-content:space-between`; measured **372 px wide at 320 px viewport** → a fixed element wider than the viewport creates page-level horizontal scroll on first visit (before `cc_accepted`). Existing `@media (max-width:600px)` sets `flex-direction:column` but nowrap + the nowrap button still blow out the cross-size. Fix (Task 3.18): mobile-first stack, button full-width, `flex-wrap:wrap`.
- `#scrollTopWrap` in `assets/css/footer.css:115` — `position:fixed; right:1rem` (≤480); right edge measured past the viewport under horizontal-overflow conditions. Verify against right edge + add `env(safe-area-inset-*)` (Task 4).
- `.hero-eyebrow` (`styles.css:295`) and `.calc-header h1` (`styles.css:303`) — **NOT overflowing** at 320 (right edge 296 < 320); the existing `--text-hero` `clamp()` already scales the Fraunces H1. No `white-space:nowrap` present. The spec's "hero clips at 430" symptom is a downstream artifact of the grid blow-out, not the hero itself. Will still normalise per Task 3.1 (eyebrow wrap allowed, subtitle `ch` cap) but no forced-width bug here.
- `.action-bar` (`styles.css:824`) — already `flex-wrap:wrap`; fits at 272. Verify tap-target height ≥44px on Clear/Share (Task 3.2/4).
- `.milestones` (`styles.css:555`) — already `flex-wrap:wrap`; OK.
- `.delay-cost-panel` rows (`styles.css:802`) — `justify-content:space-between`, values right-aligned; ride along on the grid width, no independent overflow once track shrinks.
- Year-by-year table `.table-wrap` (`styles.css:659`) — already `overflow-x:auto` (Task 3.10 Option A effectively present); confirm the inner `<table>` scrolls within the wrapper, add edge fade + ensure the wrapper itself is `min-width:0`.
- Email capture (`styles.css:877`) — `.ec-input-row` already `flex-direction:column`; `.ec-btn white-space:nowrap` fine once parent width correct.

### Goal tab / investment-goal-calculator.html

- Same `.layout` grid blow-out as homepage once results populate.
- `.goal-breakdown` (`styles.css:1593`) — `grid-template-columns:1fr 1fr 1fr`; collapses to `1fr` only at `max-width:500`. Refactor mobile-first (base 1fr, ≥480 three-up).
- `#goalChart` uses `chartOpts()` → already `maintainAspectRatio:false` in `.chart-container` (height 220). OK; bump responsive height per Task 3.7.

### compare-investments.html + homepage Compare tab (highest-risk surface)

- **Clean at 320 fresh-load** — `.compare-grid` (`styles.css:1492`) collapses to single column via `@media (max-width:600px)`.
- Refactor to mobile-first and move the collapse breakpoint to **768** per spec Task 3.5 (base 1fr; `≥768` → `1fr 1fr`). Scenario A, then B, then winner callout full-width on mobile.
- `.compare-winner` callout (`styles.css:1534`) — inline-flex pill; fine, ensure full-width span at mobile.
- `#compareChart` — `chartOpts()` `maintainAspectRatio:false`; OK.

### retirement-calculator.html

- **Overflows at 320 (scrollWidth 366)** — identical `.layout` grid blow-out; inputs pinned 292 px inside a 272 box.
- `.ret-stat-row` (`styles.css:1747`) — flex row; already stacks at `max-width:640`. Refactor mobile-first.
- `.portfolio-roi-badge:has(.roi-value)` "YRS AWAY" pill (`styles.css:1728`) — verify it doesn't collide with the Fraunces balance in `.portfolio-header-top` at <480; stack per Task 3.6.
- `#retireChart` config `calculator.js:1217` — `maintainAspectRatio:true`; switch to `false` (Task 3.7) + responsive `.chart-container` height.
- `.ret-saving-callout` (`styles.css:1805`) uses raw hex (`#fefce8`, `#fde047`, `#92400e`) — **pre-existing tech debt, out of scope** (guardrail: no *new* hex; these are not introduced by this sprint). Logged, not touched.

### Blog listing (blog/index.html)

- Clean at 320. Card grid already collapses to a single column (blog.css). Refactor mobile-first: base `1fr`, `≥768` two-up, `≥1024` three-up; `aspect-ratio` + `object-fit:cover` on card images; 3-line `-webkit-line-clamp` on titles (Task 3.14).

### Blog article (blog/rule-of-72.html)

- Clean at 320. `.article-layout` grid collapses to single column. Refactor mobile-first, sidebar below article; mini Rule-of-72 calculator inherits `.input-*` treatment; TOC to top / collapsible on mobile; article H1 `clamp()`; prose `max-width:65ch` at desktop only (Task 3.15).

### Legal pages (about / privacy-policy / terms-of-service)

- Prose-only, no grid; clean at 320. Verify no `<br>` chains create odd gaps (Master.md tech-debt note) — log if non-trivial, don't chase (Task 3.16).

### Footer + cookie banner (all pages)

- Footer (`footer.css`) already collapses 3→2→1 col via `max-width:768/480`; refactor mobile-first, headings visible at all widths (Task 3.17).
- Cookie banner — see homepage entry; fixed-width blow-out on first visit is the real bug (Task 3.18).

---

## Fix priority (for commit 3)

1. **`.layout` grid `minmax(0,1fr)` / `min-width:0`** — kills the dominant overflow on all four calculator surfaces. *(Highest impact.)*
2. **Chart.js `maintainAspectRatio:false`** on `growChart` + `retireChart` (goal/compare already done) + responsive container heights.
3. **`#cookie-banner`** mobile-first stack (fixed-element viewport blow-out).
4. **`.portfolio-header-top` + `.portfolio-secondary-row`** stack <480.
5. **Fixed elements** (`#scrollTopWrap`, `#mobile-cta-pill`, cookie banner) — `env(safe-area-inset-*)`, right-edge safety.
6. **Breakpoint migration** to mobile-first `min-width` at 480/768/1024 for compare, goal-breakdown, footer, blog grids.
7. **iOS gotchas** — 16px input font-size, `100svh`, `-webkit-tap-highlight-color:transparent`.

*Diagnostic captured at 320 px (hard floor). Spec version 1.0, prerequisite `052d096`.*
