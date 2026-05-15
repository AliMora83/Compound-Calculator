# CompoundCalc — Master Project Log

**Site:** [compoundcalc.co.za](https://compoundcalc.co.za)  
**Repo:** [github.com/AliMora83/Compound-Calculator](https://github.com/AliMora83/Compound-Calculator)  
**Stack:** Vanilla HTML · CSS · JavaScript (no framework)  
**Hosting:** Netlify  
**Owner:** Ali Mora · ali@openmindi.co.za  
**Last updated:** 2026-05-15

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
- **Blog** — 3 live SEO articles covering compound interest, the Rule of 72, and saving R1 million

---

## 2. Technology & Architecture

| Layer | Implementation |
|---|---|
| Markup | Vanilla HTML5 (multi-page, no framework) |
| Styling | Vanilla CSS3 — `styles.css` (global), `footer.css` (footer/scroll-to-top), `blog.css` (blog layout) |
| Logic | Vanilla JS ES6+ — `calculator.js` (core logic), `ui.js` (scroll-to-top + mobile menu), `blog.js` (TOC + share) |
| Charting | Chart.js via CDN |
| PDF | jsPDF + html2canvas via CDN |
| Email / CRM | Brevo API (contacts sync + transactional SMTP) |
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
- ⚠️ **Known issue**: Brevo API key is currently hardcoded in `calculator.js` — must be moved to a server-side proxy before high-traffic launch

### Sprint 3 — Blog & SEO
**Status:** ✅ Complete  
- Created `/blog/` section with listing page and 3 SEO-optimised articles:
  - `compound-interest-south-africa.html` — 5 min read, targets "compound interest calculator South Africa"
  - `rule-of-72.html` — 4 min read, targets "rule of 72"
  - `how-long-to-save-1-million-rand.html` — 5 min read, targets "how long to save 1 million rand"
- Each article has: article hero, two-column layout (article body + sidebar), inline Rule-of-72 mini-calculator (sidebar), TOC with smooth-scroll via `blog.js`, WhatsApp share + copy-link buttons
- Blog listing redesigned to 3-column card grid with generated images
- `sitemap.xml` updated to include all blog URLs
- `robots.txt` in place

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
- Created `assets/js/ui.js` — handles scroll-to-top visibility (800 px threshold) and mobile menu toggle
- Standardised footer design across **all 11 pages**: dark green `#14532d` background, white text, two-column link layout (Quick Menu + Company), copyright + disclaimer bar
- Standardised scroll-to-top button markup across all pages (`scroll-top-wrap` / `scroll-top-btn` / `scroll-top-circle`)
- Fixed `rule-of-72.html` legacy issues: old footer classes, `.html` nav extensions (404 risk), broken JSON in `#toc-map`, missing `ui.js` script
- Fixed `about.html`: duplicate inline mobile-menu `<script>` block removed (was causing double-toggle bug)
- Fixed sidebar ID mismatch in `how-long-to-save-1-million-rand.html` (`goal-monthly` → `sidebar-goal-monthly`)
- Added SEO meta tags to `about.html`: `robots`, `canonical`, Open Graph, Twitter Card

### Sprint 6 — Monetisation Setup
**Status:** ✅ Complete  
- Google AdSense snippet (`ca-pub-6017523378494978`) added to `<head>` of all 11 HTML pages
- Site submitted for AdSense review ("Your site needs review" status — awaiting Google approval)

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
│   ├── index.html                    # Blog listing (3-column card grid)
│   ├── compound-interest-south-africa.html
│   ├── rule-of-72.html
│   ├── how-long-to-save-1-million-rand.html
│   └── blog-template.html            # Blank template for new articles
└── md/
    ├── Master.md                     # THIS FILE
    └── CompCalc-Footer-AG.md         # Footer design specification (archived)
```

---

## 5. Known Issues & Tech Debt

| Priority | Issue | Location | Notes |
|---|---|---|---|
| 🔴 High | Brevo API key hardcoded in client-side JS | `assets/js/calculator.js` | Must move to Netlify serverless function before scaling traffic |
| 🟡 Medium | GA4 Measurement ID is placeholder `G-XXXXXXXXXX` | All HTML pages | Replace with live GA4 ID once property is fully configured |
| 🟡 Medium | `switchTab()` detects active tab by reading `onclick` string | `calculator.js` | Fragile — refactor to use `data-tab` attribute |
| 🟡 Medium | `clearInputs()` resets Compare tab rates incorrectly | `calculator.js` | Should restore original defaults (5% / 8%) not `8` / `8` |
| 🟢 Low | `<br />` used for vertical spacing in prose pages | `about.html`, `terms-of-service.html`, `privacy-policy.html` | Replace with CSS `margin-top` on headings |
| 🟢 Low | Missing OG/Twitter Card meta on `privacy-policy.html`, `terms-of-service.html`, blog pages | Multiple | Add for social sharing previews |
| 🟢 Low | AdSense status pending — no ad units placed yet | All pages | Place `<ins class="adsbygoogle">` units once account approved |

---

## 6. Next Sprint — Recommendations

### Sprint 7: SEO & Content Expansion (Highest Impact)

The site has strong technical SEO foundations (sitemap, robots.txt, canonical tags, OG tags on key pages). The next lever for organic growth is content and backlinks.

**Recommended tasks:**

1. **Add 2–3 new blog articles** targeting high-volume ZA personal finance keywords:
   - "Tax-free savings account calculator South Africa" (TFSA)
   - "ETF vs savings account South Africa"
   - "How much should I save per month South Africa"

2. **Internal linking** — weave more `<a href="/">` CTA links within blog article body copy pointing back to the calculator

3. **Schema markup** — add `FAQPage` and `HowTo` JSON-LD structured data to blog articles to improve Google rich-result eligibility

4. **Google Search Console** — submit `sitemap.xml`, monitor index coverage and Core Web Vitals

### Sprint 8: AdSense & Revenue Setup

1. Check AdSense approval status
2. Once approved, design and place ad units:
   - Leaderboard (`728×90`) below the main nav on calculator pages
   - In-article rectangle (`336×280`) after the second `<h2>` in blog articles
   - Sidebar sticky unit (`300×250`) in blog sidebar
3. Implement Auto Ads as fallback

### Sprint 9: Brevo API Security

1. Create a Netlify serverless function (`/netlify/functions/send-pdf.js`) to proxy Brevo API calls
2. Move API key to Netlify environment variable (`BREVO_API_KEY`)
3. Update `calculator.js` to call `/api/send-pdf` instead of Brevo directly
4. Test end-to-end email delivery in staging

### Sprint 10: Conversion Rate Optimisation (CRO)

1. A/B test email capture trigger: currently 30 s + 1 calculation — try "after chart renders" as alternative
2. Add a persistent "Get your free projection" floating CTA (mobile-friendly pill button)
3. Add affiliate CTA cards (EasyEquities, Trading 212) inline within blog articles and below the calculator results panel
4. Implement `localStorage` to remember returning visitors and suppress email form on repeat visits

---

## 7. Affiliate Integrations (Planned)

| Partner | Link Type | Placement |
|---|---|---|
| EasyEquities | CPA referral | Calculator results panel + blog articles |
| Trading 212 | CPA referral | Calculator results panel + blog articles |
| 10X Investments | Display/referral | Blog sidebar |

---

## 8. Monetisation Status

| Channel | Status |
|---|---|
| Google AdSense | ⏳ Pending review |
| EasyEquities affiliate | 🔲 Not yet applied |
| Trading 212 affiliate | 🔲 Not yet applied |
| Direct sponsorship | 🔲 Not explored |

---

## 9. Commit History Summary

| Commit | Summary |
|---|---|
| `a2ee60a` | feat: add Google AdSense script to all pages |
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
