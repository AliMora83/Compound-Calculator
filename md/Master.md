# CompoundCalc — Master Project Log

**Site:** [compoundcalc.co.za](https://compoundcalc.co.za)  
**Repo:** [github.com/AliMora83/Compound-Calculator](https://github.com/AliMora83/Compound-Calculator)  
**Stack:** Vanilla HTML · CSS · JavaScript (no framework)  
**Hosting:** Netlify  
**Owner:** Ali Mora · ali@openmindi.co.za  
**Last updated:** 2026-05-19

> **Purpose of this file**  
> This is the single source of truth for what has been built, what decisions were made, and what still needs to be done. It is written so that an AI assistant (Claude, Antigravity, or similar) can read it cold and immediately guide the next sprint without needing prior context.

---

## 1. Project Overview

CompoundCalc is a free, production-ready compound interest calculator built for South African retail investors. The tool offers:

- **Compound interest projection** with monthly contributions, inflation toggle, and currency selector (ZAR / USD / GBP / EUR)
- **Investment Goal calculator** — reverse-engineer the monthly saving required to reach a target amount
- **Compare Investments** — side-by-side two-scenario comparison
- **Milestone badges** — auto-calculates the year your balance hits 2×, 5×, and 10× your initial investment
- **Lead capture + PDF delivery** — slide-in email form (triggered after 30 s engagement + 1 calculation) generates a custom PDF via `jsPDF` + `html2canvas` and delivers it via Brevo transactional email
- **Blog** — 6 live SEO-optimized articles covering compound interest, the Rule of 72, TFSA, ETFs, and monthly saving tips

---

## 2. Technology & Architecture

| Layer | Implementation |
|---|---|
| Markup | Vanilla HTML5 (multi-page, no framework) |
| Styling | Vanilla CSS3 — `styles.css` (global), `footer.css` (footer/scroll-to-top), `blog.css` (blog layout) |
| Logic | Vanilla JS ES6+ — `calculator.js` (core financial logic, charts, custom legends, and email capture), `ui.js` (scroll-to-top + mobile menu), `blog.js` (TOC + share) |
| Charting | Chart.js via CDN |
| PDF | jsPDF + html2canvas via CDN |
| Email / CRM | Brevo API (contacts sync + transactional SMTP via Netlify Serverless Function proxy) |
| Analytics | Google Analytics 4 — `G-NJMYWPLFSH` ✅ |
| Ads | Google AdSense — `ca-pub-6017523378494978` (pending review) |
| Fonts | DM Sans + DM Mono (Google Fonts) |

---

## 3. Completed Sprints

### Sprint 1 — Core Calculator Build
**Status:** ✅ Complete  
- Built initial compound interest calculator (Grow Savings tab) with chart, year-by-year breakdown table, and milestone badges
- Implemented multi-tab UI: Grow Savings, Investment Goal, Compare Investments
- Added inflation toggle, currency selector (ZAR/USD/GBP/EUR), shareable URL encoding
- Kinetic typography — numeric outputs animate on calculation
- Responsive mobile layout with hamburger navigation menu
- Calculate and Clear action buttons added to the toolbar

### Sprint 2 — Lead Generation & PDF Delivery
**Status:** ✅ Complete  
- Email capture form: slide-in panel triggered after 30 s on-page + 1 completed calculation
- PDF projection report generated client-side (jsPDF + html2canvas): includes scenario metrics, chart snapshot, milestone badges, and year-by-year table
- Brevo integration: auto-sync new contacts and send PDF via transactional email
- GA4 custom event tracking wired to calculation and PDF download actions

### Sprint 3 — Blog & SEO
**Status:** ✅ Complete  
- Created `/blog/` section with listing page and 3 SEO-optimised articles:
  - `compound-interest-south-africa.html` — targets "compound interest calculator South Africa"
  - `rule-of-72.html` — targets "rule of 72"
  - `how-long-to-save-1-million-rand.html` — targets "how long to save 1 million rand"
- Each article has: article hero, two-column layout (article body + sidebar), inline Rule-of-72 mini-calculator (sidebar), TOC with smooth-scroll, share options
- Blog listing redesigned to 3-column card grid with generated images
- `sitemap.xml` updated to include all blog URLs; `robots.txt` in place

### Sprint 4 — UI Polish & Global Refactor
**Status:** ✅ Complete  
- Deleted redundant `savings-calculator.html` page (duplicate of home)
- Removed old tab navigation buttons from main nav
- Updated all "Savings Calculator" nav links to `/`
- Standardised currency selector to a `<select>` dropdown across all calculator pages
- Full 18-item codebase audit and cleanup

### Sprint 5 — Footer & Scroll-to-Top Standardisation
**Status:** ✅ Complete  
- Extracted footer styles into dedicated `assets/css/footer.css`
- Created `assets/js/ui.js` — handles scroll-to-top visibility and mobile menu toggle
- Standardised footer design across **all 11 pages**
- Standardised scroll-to-top button markup across all pages
- Fixed legacy issues in `rule-of-72.html` and duplication in `about.html`
- Added SEO meta tags to `about.html`

### Sprint 6 — Monetisation Setup
**Status:** ✅ Complete  
- Google AdSense snippet (`ca-pub-6017523378494978`) added to `<head>` of all 11 HTML pages
- Site submitted for AdSense review

### Sprint 7 — SEO & Content Expansion
**Status:** ✅ Complete  
- Created 3 new SEO-optimized blog articles targeting ZA-specific personal finance keywords:
  - `tax-free-savings-account-calculator-south-africa.html` (TFSA)
  - `etfs-vs-traditional-savings-accounts.html` (ETFs vs Savings)
  - `maximize-compound-interest-monthly-savings.html` (Monthly savings optimization)
- Added custom AI-generated graphics for new blog cards (`blog_tfsa.png`, `blog_etf_vs_savings.png`, `blog_monthly_savings.png`).
- Set up linking keywords back to the main compound interest calculator.

### Sprint 8 — Quick Fixes & Affiliate Integrations
**Status:** ✅ Complete  
- Replaced Google Analytics 4 placeholders with the live Measurement ID (`G-NJMYWPLFSH`) across all 11 HTML pages.
- Swapped temporary affiliate links for the active EasyEquities URL (`https://bit.ly/4wsBTNT`) in `index.html`, `calculator.js`, and `generate_blogs.py`.
- Solved layout & overflow issues with the email capture form inside the fixed `300px` sidebar by restructuring it into a vertical column stack with proper `box-sizing: border-box`.

### Sprint 9 — Brevo API Security (Serverless Proxy)
**Status:** ✅ Complete  
- Created a Netlify serverless function (`netlify/functions/send-pdf.mts`) to proxy Brevo API calls safely.
- Moved the sensitive Brevo API Key into Netlify environment configuration (`BREVO_API_KEY`), removing all client-side security leaks.
- Refactored `calculator.js` to trigger proxy endpoint (`/api/send-pdf`) seamlessly.

### Sprint 10 — Results Panel Redesign
**Status:** ✅ Complete  
- **Unified Portfolio Header**: Replaced 4 isolated metric cards with a cohesive dark-green-to-emerald gradient dashboard (`#14532d` to `#059669`).
- **Glassmorphism ROI Badge**: Positioned ROI as an interactive floating badge in the top-right corner.
- **Fluid Typography**: Engineered the Final Balance as the primary focal metric using `clamp()` for elegant cross-device scaling.
- **Balanced Layout**: Split "You Contribute" and "Interest Earned" as balanced, secondary metrics below a clean white separator line.
- **Stacked Area Chart**: Replaced standard bar charts with a smooth line stacked area chart using Chart.js with bezier curves (`tension: 0.4`), zero-point markers, and translucent color gradients.
- **Interactive Legends**: Implemented a responsive custom HTML legend row supporting instant toggling of the inflation-adjusted "Real value" overlay layer.

---

## 4. Current File Structure

```
CompCalc/
├── index.html                        # Home — Compound Interest Calculator (3 tabs)
├── investment-goal-calculator.html   # Goal Calculator page
├── compare-investments.html          # Compare Investments page
├── about.html                        # About + Disclaimer
├── privacy-policy.html               # POPIA-compliant Privacy Policy
├── terms-of-service.html             # Terms of Service
├── sitemap.xml
├── robots.txt
├── assets/
│   ├── css/
│   │   ├── styles.css                # Global styles
│   │   ├── footer.css                # Footer + scroll-to-top
│   │   └── blog.css                  # Blog layout
│   ├── js/
│   │   ├── calculator.js             # Core financial logic + PDF + email capture
│   │   ├── ui.js                     # Scroll-to-top + mobile menu
│   │   └── blog.js                   # TOC smooth-scroll + share buttons
│   ├── images/                       # Blog card images (AI-generated)
│   ├── fonts/                        # Self-hosted font fallbacks
│   ├── logo.png
│   └── favicon.png
├── blog/
│   ├── index.html                    # Blog listing (6-column card grid)
│   ├── compound-interest-south-africa.html
│   ├── rule-of-72.html
│   ├── how-long-to-save-1-million-rand.html
│   ├── tax-free-savings-account-calculator-south-africa.html
│   ├── etfs-vs-traditional-savings-accounts.html
│   ├── maximize-compound-interest-monthly-savings.html
│   └── blog-template.html            # Blank template for new articles
├── netlify/
│   └── functions/
│       └── send-pdf.mts              # Serverless Brevo Proxy function
└── md/
    ├── Master.md                     # THIS FILE
    ├── CompCalc-Footer-AG.md         # Footer design specification (archived)
    └── CompCalc-ResultsRedesign-AG.md # Results layout specification (archived)
```

---

## 5. Known Issues & Tech Debt

| Priority | Issue | Location | Notes |
|---|---|---|---|
| 🟡 Medium | `switchTab()` detects active tab by reading `onclick` string | `calculator.js` | Fragile — refactor to use `data-tab` attribute |
| 🟡 Medium | `clearInputs()` resets Compare tab rates incorrectly | `calculator.js` | Should restore original defaults (5% / 8%) not `8` / `8` |
| 🟢 Low | `<br />` used for vertical spacing in prose pages | `about.html`, `terms-of-service.html`, `privacy-policy.html` | Replace with CSS `margin-top` on headings |
| 🟢 Low | Missing OG/Twitter Card meta on `privacy-policy.html`, `terms-of-service.html`, blog pages | Multiple | Add for social sharing previews |
| 🟢 Low | AdSense status pending — no ad units placed yet | All pages | Place `<ins class="adsbygoogle">` units once account approved |
| 🟢 Low | Brevo API key hardcoded in client-side JS | `assets/js/calculator.js` | ✅ Resolved in Sprint 9 via Netlify serverless function proxy |
| 🟢 Low | GA4 Measurement ID is placeholder `G-XXXXXXXXXX` | All HTML pages | ✅ Resolved in Sprint 8 with live measurement ID |

---

## 6. Next Sprint — Recommendations

### Sprint 11: Conversion Rate Optimisation (CRO) & Personalisation

1. **A/B test email capture trigger**: try displaying the slide-in form based on scroll depth or after a user updates input values multiple times.
2. **Persistent CTA**: add a persistent "Get your free projection" floating pill CTA on mobile screens.
3. **Suppress Form for Returning Users**: implement `localStorage` to remember returning visitors who have already subscribed, avoiding intrusive form popups.
4. **Integrate EasyEquities Referral Callouts**: place clean, native referral banners inside relevant blog articles and directly below the main calculator results card.

### Sprint 12: Refactoring & Technical Debt Resolution

1. **Robust Tab Switcher**: Refactor `switchTab()` to read `data-tab` attributes on trigger buttons rather than parsing raw string contents from the `onclick` handler.
2. **Fix Default Reset Logic**: Fix `clearInputs()` to properly restore Compare tab defaults to their correct original state (`5%` / `8%`).
3. **Clean Spacing**: Remove legacy `<br />` breaks on legal and about pages, standardizing visual layout with semantic CSS margins.

---

## 7. Affiliate Integrations

| Partner | Link Type | Placement | Status |
|---|---|---|---|
| EasyEquities | CPA referral | Calculator results panel + blog articles | ✅ Live (`https://bit.ly/4wsBTNT`) |
| Trading 212 | CPA referral | Calculator results panel + blog articles | 🔲 Not yet applied |
| 10X Investments | Display/referral | Blog sidebar | 🔲 Not yet applied |

---

## 8. Monetisation Status

| Channel | Status |
|---|---|
| Google AdSense | ⏳ Pending review |
| EasyEquities affiliate | ✅ Live (Sprint 8) |
| Trading 212 affiliate | 🔲 Not yet applied |
| Direct sponsorship | 🔲 Not explored |

---

## 9. Commit History Summary

| Commit | Summary |
|---|---|
| `5be8071` | Fix email capture form layout and overflow issues (Sprint 8) |
| `3a3d2e2` | feat: move Brevo API calls to Netlify serverless proxy (Sprint 9) |
| `9a6e591` | fix: replace GA4 placeholder and EasyEquities affiliate link (Sprint 8) |
| `a2ee60a` | feat: add Google AdSense script to all pages (Sprint 6) |
| `4313eda` | feat: standardise footer, scroll-to-top, and nav across all pages |
| `6b9cf54` | refactor: delete savings-calculator.html and remove tab nav buttons |
| `44def78` | fix: standardise currency selector to dropdown across all calculator pages |
| `0aae6ae` | refactor: major codebase cleanup — 18-item audit |
| `a146cc3` | Ensure correct favicon is used across all pages |
| `88ec766` | Update blog listing layout to new 3-column grid design |
| `e449078` | feat: complete blog implementation from CompCalc-BlogStyle-AG.md |
| `f357970` | feat: redesign blog layout, add SEO blog articles, update legal pages |
| `9f61485` | feat: implement email capture and PDF delivery system with Brevo integration |
| `735c269` | Finalize UI/UX: logo/favicon, Calculate/Clear buttons, mobile menu, kinetic feedback |
| `7dfc2dd` | feat: production-ready compound interest calculator build |

---

*This file should be updated at the end of every sprint. Do not delete completed sprints — the history is valuable context.*
