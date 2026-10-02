# CompoundCalc — Design & UX Review
**Scope:** Current live site vs Sprint 11 editorial direction · July 2026
**Purpose:** Feed findings into Phase 2–4 specs so the redesign fixes real UX issues, not just aesthetics.

---

## Overall Impression

The core product is strong: fast, dense with genuinely useful features (milestones, cost-of-waiting, compare). The gap is coherence — Sprint 10's gradient results panel modernised one component while the rest of the site stayed in the original style, and the page carries a lot of competing conversion elements. Direction 3 (editorial) solves the visual half; the recommendations below cover the UX half so Phases 2–4 fix both at once.

## Usability Findings

| Finding | Severity | Fix (fold into phase) |
|---|---|---|
| Left column stacks inputs + affiliate CTA + email capture + disclaimers — three asks compete before the user has even calculated | 🔴 Critical | **Phase 3:** Move affiliate CTA and email capture *below results flow*, sequenced: results → milestones → email capture → affiliate. Ask for value only after delivering value |
| Email capture triggers on 30s + 1 calc — can interrupt someone mid-comparison | 🟡 Moderate | **Phase 3:** Add a third condition: user has scrolled past the chart (signal of having consumed results). One-line JS gate |
| Currency selector, Calculate/Clear/Share all live in a header row — action hierarchy is flat | 🟡 Moderate | **Phase 3:** Calculate becomes the single primary (ink-filled) button; Clear and Share demoted to text-style secondary actions per editorial spec |
| Year-by-year table collapsed by default hides the most AdSense-friendly long-scroll content | 🟡 Moderate | **Phase 3:** Default to first 10 rows visible + "Show all years". Longer pages = more ad viewability + dwell time |
| Blog cards (AI-generated images) will clash hardest with the editorial direction | 🟡 Moderate | **Phase 4:** Replace image cards with typographic cards — Fraunces headline, hairline rule, reading time. Cheaper than regenerating images and more on-direction |
| Mobile: two-column layout collapse ordering untested against new editorial density | 🟡 Moderate | **Phase 2/3 QA:** Add explicit mobile viewport checks (360px) to every phase checklist |

## Consistency (the Sprint 11 core problem — confirmed)

| Element | Current issue | Resolution |
|---|---|---|
| Results panel | Gradient/glassmorphism vs flat everything else | Phase 1 retires it — already specced ✅ |
| Buttons | At least 3 styles across calculator, email form, cookie banner | **DECIDED — fix in Phase 1 (tokens).** Exactly two variants: `.btn-primary` (ink-filled, paper text — Calculate, Send my PDF, cookie accept) and `.btn-secondary` (transparent, hairline ink border — Clear, Share, Show all years). All buttons site-wide migrate to these classes; the inline-styled cookie banner button is explicitly in scope. Guardrail: existing IDs (`ec-submit` etc.) keep their IDs, only classes change |
| Emoji as icons (📩 ⏳ ✅ 🔗 ✕ ⚠️ + email HTML emoji) | Reads casual against Fraunces editorial type | **DECIDED — replace ALL emoji with thin-stroke line icons.** Single inline SVG sprite (1.5px stroke, `currentColor`), ~10 icons: envelope, hourglass/clock, check, link, close, warning, arrow-right, download, chart, calendar. Scope: calculator UI, email capture form, cookie banner, blog share buttons, footer, and the Brevo welcome email HTML (email uses the same icons as inline base64 PNGs or unicode arrows for client compatibility). Rollout: sprite lands in Phase 1; components swap as each phase touches them |
| Email capture form | Dashed border + green gradient background — the most off-direction component after the results panel | Phase 3: restyle to paper background + hairline ink border |

## Accessibility Checks to Bake Into Phase 1

- **Deep green on warm paper:** verify ≥4.5:1 contrast for body-size text (deep greens on cream frequently land ~4.2:1 — check the exact token pair before rollout)
- **Fraunces at small sizes:** keep Fraunces ≥20px display-only; body stays in the sans. High-contrast serifs degrade below that
- **Hairline rules:** decorative only — never the sole boundary of an interactive element (WCAG non-text contrast 1.4.11)
- **Focus states:** the editorial spec must define a visible focus token (e.g. 2px ink outline) — minimal aesthetics often accidentally delete them

## What Works Well — Protect These

- Cost-of-waiting panel: best emotional hook on the site; give it prime typographic treatment in Phase 3
- Milestone badges: distinctive feature — style as editorial "pull-quote" moments, not pills
- Speed: no framework, fast loads. Fraunces self-hosting with `font-display: swap` + preload keeps it that way
- Selector/ID guardrail list in specs: keep enforcing it every phase

## Priority Recommendations

1. **Re-sequence the conversion stack (Phase 3)** — results before asks. Likely the single biggest conversion improvement available, and free since Phase 3 touches that layout anyway.
2. **Add the cookie banner + emoji-icon replacement to the Phase 2 spec explicitly** — the two components most likely to survive the redesign by accident and break coherence.
3. **Run the contrast check on the green/paper token pair before Phase 1 ships** — cheapest possible moment to adjust; expensive after rollout.
