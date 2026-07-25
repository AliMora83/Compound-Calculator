# Sprint 11.1 — Phase 1 Completion Delta
**Scope:** Only the gaps from md/Sprint11-AuditReport.md. Tokens, fonts, results panel, chart palette are DONE — do not touch them.
**Reference:** md/CompoundCalc-DesignReview.md (button + icon decisions), md/Sprint11-AuditReport.md (current state).

---

## Guardrails — MUST NOT change
IDs: `#ec-email`, `#ec-submit`, `#email-capture`, `#affiliate-cta`, `#growChart`
Classes with JS/PDF dependencies: `.milestone-badge`
All GA4 `gtag()` event names and parameters
URL param keys: `tab, p, m, r, y, n, inf`
localStorage keys: `cc_email_captured`, `cc_accepted`
Only visual classes and markup around these may change; the hooks themselves stay.

---

## Task 1 — SVG Icon Sprite

Create the sprite as an inline `<svg>` block at the top of `<body>` in `index.html` (and any other page that uses icons), hidden with `display:none`. Inline (not external file) so `currentColor` inheritance works everywhere with zero extra requests.

```html
<!-- ═══ CompoundCalc Icon Sprite — editorial line icons, 1.5px stroke ═══ -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
  <defs>
    <g id="ic-envelope"><rect x="2" y="4" width="20" height="16" rx="1.5"/><path d="M2 6l10 7 10-7"/></g>
    <g id="ic-clock"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></g>
    <g id="ic-check"><path d="M4 12.5l5 5L20 6.5"/></g>
    <g id="ic-link"><path d="M9.5 14.5l5-5"/><path d="M8 16l-2 2a3.5 3.5 0 01-5-5l.5-.5M16 8l2-2a3.5 3.5 0 015 5l-.5.5" transform="translate(1.5 0)"/></g>
    <g id="ic-close"><path d="M6 6l12 12M18 6L6 18"/></g>
    <g id="ic-warning"><path d="M12 3L2.5 20h19L12 3z"/><path d="M12 10v4"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></g>
    <g id="ic-arrow-right"><path d="M4 12h16M14 6l6 6-6 6"/></g>
    <g id="ic-download"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 20h16"/></g>
    <g id="ic-chart"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/></g>
    <g id="ic-hourglass"><path d="M6 3h12M6 21h12M7 3c0 5 5 5.5 5 9s-5 4-5 9M17 3c0 5-5 5.5-5 9s5 4 5 9"/></g>
  </defs>
</svg>
```

Add to `assets/css/styles.css`:

```css
/* ── Line icons ─────────────────────────────── */
.ic {
  width: 1.1em;
  height: 1.1em;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  vertical-align: -0.15em;
  flex-shrink: 0;
}
.ic--lg { width: 1.4em; height: 1.4em; }
```

Usage pattern:
```html
<svg class="ic" viewBox="0 0 24 24"><use href="#ic-envelope"/></svg>
```

### Emoji swap map (all ~14 instances per audit — grep each file to catch strays)

| Emoji | Replace with | Locations (verify with grep) |
|---|---|---|
| 📩 | `#ic-envelope` (`.ic--lg`) | `.email-capture-icon` div |
| ✅ | `#ic-check` | `#ec-success-state` |
| ⚠️ | `#ic-warning` | `#ec-error-state` |
| ✕ | `#ic-close` | `.ec-dismiss` button |
| 🔗 | `#ic-link` | Share/copy-link button |
| ⏳ | `#ic-hourglass` | Cost-of-waiting panel heading |
| → in CTAs | Keep as text arrow (on-brand editorial mark) | No change |

Rules:
- Decorative icons: add `aria-hidden="true"` to the `<svg>`; the adjacent text carries meaning.
- Icon-only buttons (`.ec-dismiss`): keep the existing `aria-label` — that's the accessible name.
- **JS-injected emoji:** grep `calculator.js` for emoji in template strings and swap to the same `<use>` markup.
- **Do NOT touch** the Brevo email HTML in this sprint (`buildWelcomeEmailHTML` / serverless function) — email clients can't use SVG sprites; that's a separate later task.
- **Do NOT touch** blog pages — icons there land in Sprint 15.

## Task 2 — Button Class Consolidation

Target: exactly two classes, everything else deleted.

1. `.btn-primary` — audit says defined but unused. Verify it is **ink-filled** (ink background, paper text) per the design review — not green-filled. Apply to: Calculate button, `#ec-submit` (add class, keep ID and existing `.ec-btn` hooks removed only if no JS references them — grep first), cookie-banner accept button.
2. `.btn-secondary` — transparent, hairline ink border. Apply to: Clear, Share/Copy-link, and any "Show all" toggles.
3. **Cookie banner:** currently styled by element selector/inline styles. Move the accept button to `class="btn-primary"`, strip its inline styles, keep `onclick="acceptCookies()"`.
4. **Mobile pill (third style, green-filled):** restyle to ink-filled `.btn-primary` (add a `.btn-pill` modifier for border-radius only — no new colors).
5. Delete the now-orphaned button rules (`.ec-btn` styling block if fully migrated, cookie inline styles, old pill styles). Grep for each removed class in HTML + JS before deleting.

## Task 3 — Contrast Verification (5 min)

The audit didn't cover this. Check the live token pair: deep green accent on warm paper background at body-text size. If the ratio is < 4.5:1, darken the green token until it passes (adjust the token only — one line). Also confirm every `.btn-primary` and `.btn-secondary` has a visible `:focus-visible` outline (2px ink offset outline if missing).

## Task 4 — Doc Sync

1. `md/CompoundCalc-Roadmap-July2026.md`: mark Sprint 11 tasks DONE except icons/buttons (this sprint); note Sprint 14's two bug fixes (`switchTab()` data-tab, `clearInputs()` defaults) already landed — remove from Sprint 14 scope.
2. `md/Sprint11-TransitionLog.md`: close the `#ef4444` item (code already uses `var(--danger)`); append a Sprint 11.1 entry when this sprint completes.
3. `md/Master.md`: append Sprint 11 summary to the sprint log per its convention.

---

## QA Checklist

- [ ] Zero emoji remain in `index.html`, `calculator.js`, `ui.js` (grep for each emoji char)
- [ ] All icons render at correct size in Chrome + iOS Safari (Safari `<use>` needs same-document refs — inline sprite satisfies this)
- [ ] Exactly 2 button classes in CSS; grep confirms no orphaned button classes in HTML/JS
- [ ] Email capture full flow: form shows after trigger → submit → success state (with new check icon) → PDF email received
- [ ] Dismiss (new close icon) hides form; error state renders with warning icon
- [ ] Cookie banner: shows on fresh profile, accept persists, button is ink-filled
- [ ] Mobile 360px: pill CTA ink-filled, icons not clipped
- [ ] GA4 DebugView: email_capture, affiliate_click, share_url_copied still fire
- [ ] Share URL, PDF export, CSV download unaffected
- [ ] Contrast: green-on-paper ≥ 4.5:1; focus-visible outlines present
- [ ] Lighthouse: no score drop vs pre-sprint
