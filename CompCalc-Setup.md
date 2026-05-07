# CompoundCalc.co.za — Developer Handoff & Build Guide
**Prepared for:** Antigravity  
**Prepared by:** Ali (ali@openmindi.co.za)  
**Domain:** `compoundcalc.co.za` (registered & active on Hostinger)  
**Registrar account:** Hostinger — contact Ali for credentials  
**Reference code:** `compound-interest.html` (attached)

---

## Project Summary

CompoundCalc is a single-page application (SPA) built around an interactive, multi-tab compound interest calculator. The attached `compound-interest.html` is the **fully functional reference build** — all logic, UI, and charting is working and tested. Your job is to deploy this as a production-quality site on `compoundcalc.co.za`, add the supporting pages required for SEO and AdSense approval, and configure the domain correctly on Hostinger.

The site must remain **fast, minimal, and dependency-light** — no heavy frameworks (no React, no Next.js). The current stack is intentional: vanilla HTML, CSS, and JavaScript with Chart.js loaded from CDN. Keep it this way.

---

## Deliverables Checklist

- [ ] Site live at `https://compoundcalc.co.za` with valid SSL
- [ ] Calculator live at `/` (homepage)
- [ ] Separate routable URLs for each calculator tab
- [ ] All supporting pages created (listed below)
- [ ] Google Analytics 4 tag installed
- [ ] Google Search Console verified
- [ ] AdSense code slot ready (pending Ali's AdSense approval — code will be provided)
- [ ] `sitemap.xml` generated and submitted
- [ ] `robots.txt` configured
- [ ] Lighthouse score: 90+ Performance, 100 Accessibility, 100 Best Practices
- [ ] Fully responsive on iOS Safari and Android Chrome
- [ ] All internal links working — no 404s

---

## Part 1 — Hostinger Setup

### 1.1 Current Domain State
The domain `compoundcalc.co.za` is registered and active on Hostinger. The nameservers are currently set to Hostinger's DNS parking servers:
- `athena.dns-parking.com`
- `apollo.dns-parking.com`

This means the domain is registered but **not yet pointed to a live website**. You need to either:

**Option A — Use Hostinger Hosting (recommended for simplicity)**
1. Log in to Hostinger with Ali's credentials
2. Go to **Websites → Add Website**
3. Select the `compoundcalc.co.za` domain
4. Choose **Static Website** or **Other** (not WordPress)
5. Upload files via the File Manager or connect via FTP/SFTP
6. Hostinger will automatically issue an SSL certificate via Let's Encrypt — enable it under **SSL → Force HTTPS**

**Option B — Deploy to Netlify / Cloudflare Pages (recommended for performance)**
1. Deploy the site on Netlify or Cloudflare Pages (free tier is sufficient)
2. Go to Hostinger → **DNS / Nameservers**
3. Click **Edit** on DNS/Nameservers
4. Replace the current parking nameservers with Netlify's or Cloudflare's nameservers (provided during their setup flow)
5. DNS propagation takes 24–48 hours — use `https://dnschecker.org` to monitor

> **Ali's preference:** Option B (Netlify or Cloudflare Pages) is preferred for automatic deployments, free SSL, global CDN, and easy Git-based updates. Check with Ali before choosing.

---

### 1.2 Business Email
Hostinger offers a `@compoundcalc.co.za` email account. Set up `hello@compoundcalc.co.za` as the business contact email. This will be used on the Privacy Policy and About pages.

---

## Part 2 — File & Folder Structure

Set up the project with the following structure. The attached `compound-interest.html` should be broken into modular files as described:

```
compoundcalc.co.za/
│
├── index.html                  ← Homepage (Grow Savings tab, default view)
├── savings-calculator.html     ← Mirrors index.html, Grow tab pre-selected
├── investment-goal-calculator.html  ← Goal tab pre-selected on load
├── compare-investments.html    ← Compare tab pre-selected on load
│
├── about.html
├── privacy-policy.html
├── terms-of-service.html
│
├── blog/
│   └── index.html              ← Blog listing page (placeholder, 3 articles minimum)
│   └── compound-interest-south-africa.html
│   └── rule-of-72.html
│   └── how-long-to-save-1-million-rand.html
│
├── assets/
│   ├── css/
│   │   └── styles.css          ← Extract all <style> from compound-interest.html
│   ├── js/
│   │   └── calculator.js       ← Extract all <script> logic
│   │   └── share.js            ← Shareable URL encoding/decoding logic
│   └── fonts/                  ← Self-host DM Sans + DM Mono (see Part 3)
│
├── sitemap.xml
└── robots.txt
```

> **Important:** Each calculator tab page (`savings-calculator.html`, `investment-goal-calculator.html`, `compare-investments.html`) is the **same calculator** with a JavaScript parameter that auto-selects the correct tab on load. Use a URL hash or query param: e.g. `compare-investments.html` calls `switchTab('compare')` on `DOMContentLoaded`. This avoids duplicating the calculator logic.

---

## Part 3 — Performance Requirements

### 3.1 Self-Host the Google Fonts
The current build loads DM Sans and DM Mono from Google Fonts CDN. For GDPR/POPIA compliance and performance, self-host them:

1. Go to `https://gwfh.mranftl.com/fonts` (Google Webfonts Helper)
2. Download DM Sans (weights: 300, 400, 500, 600) and DM Mono (weights: 400, 500)
3. Place `.woff2` files in `/assets/fonts/`
4. Replace the Google Fonts `<link>` tag in `<head>` with a local `@font-face` block in `styles.css`

```css
/* Example — repeat for each weight */
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/dm-sans-400.woff2') format('woff2');
}
```

### 3.2 Chart.js
Chart.js is currently loaded from `cdnjs.cloudflare.com`. This is acceptable for production — Cloudflare's CDN is fast and reliable. Keep it as-is unless Lighthouse flags it.

### 3.3 Critical CSS
Inline the above-the-fold CSS (everything needed to render the calculator inputs and metric cards) directly in `<head>` as a `<style>` block. Load the rest of `styles.css` as a deferred stylesheet. This eliminates render-blocking CSS.

### 3.4 Image Optimisation
There are no images in the current build. If any are added (blog thumbnails, OG images), deliver them as `.webp` with a `.jpg` fallback and explicit `width` and `height` attributes.

---

## Part 4 — SEO Configuration

### 4.1 Meta Tags — Calculator Pages
Add these to the `<head>` of each calculator page. Replace placeholders with page-specific content:

```html
<!-- Primary SEO -->
<title>Compound Interest Calculator South Africa | CompoundCalc</title>
<meta name="description" content="Free compound interest calculator for South African investors. See how your savings grow with monthly contributions, inflation adjustment, and a year-by-year breakdown. No sign-up needed.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://compoundcalc.co.za/">

<!-- Open Graph (for social sharing) -->
<meta property="og:title" content="Compound Interest Calculator — CompoundCalc.co.za">
<meta property="og:description" content="See what your money could be worth in 10, 20, or 30 years. Free interactive calculator for SA investors.">
<meta property="og:image" content="https://compoundcalc.co.za/assets/og-image.png">
<meta property="og:url" content="https://compoundcalc.co.za/">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Compound Interest Calculator — CompoundCalc.co.za">
<meta name="twitter:description" content="Free calculator for SA investors. Monthly contributions, inflation toggle, downloadable PDF.">
<meta name="twitter:image" content="https://compoundcalc.co.za/assets/og-image.png">
```

> **OG Image:** Create a single `og-image.png` at 1200×630px — a clean branded image showing the calculator UI with the CompoundCalc logo. Used for all social link previews.

### 4.2 Structured Data (Schema.org)
Add this JSON-LD block inside a `<script type="application/ld+json">` tag on the homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CompoundCalc — Compound Interest Calculator",
  "url": "https://compoundcalc.co.za",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "ZAR"
  },
  "description": "Free South African compound interest calculator with monthly contributions, savings goal reverse-calculator, scenario comparison, inflation adjustment, and downloadable PDF summary.",
  "inLanguage": "en-ZA"
}
```

### 4.3 Sitemap
Generate `sitemap.xml` to include all pages. Update `lastmod` dates on deploy:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://compoundcalc.co.za/</loc><priority>1.0</priority></url>
  <url><loc>https://compoundcalc.co.za/savings-calculator</loc><priority>0.9</priority></url>
  <url><loc>https://compoundcalc.co.za/investment-goal-calculator</loc><priority>0.9</priority></url>
  <url><loc>https://compoundcalc.co.za/compare-investments</loc><priority>0.9</priority></url>
  <url><loc>https://compoundcalc.co.za/blog/compound-interest-south-africa</loc><priority>0.7</priority></url>
  <url><loc>https://compoundcalc.co.za/blog/rule-of-72</loc><priority>0.7</priority></url>
  <url><loc>https://compoundcalc.co.za/blog/how-long-to-save-1-million-rand</loc><priority>0.7</priority></url>
  <url><loc>https://compoundcalc.co.za/about</loc><priority>0.4</priority></url>
  <url><loc>https://compoundcalc.co.za/privacy-policy</loc><priority>0.3</priority></url>
  <url><loc>https://compoundcalc.co.za/terms-of-service</loc><priority>0.3</priority></url>
</urlset>
```

### 4.4 robots.txt

```
User-agent: *
Allow: /
Disallow: /assets/

Sitemap: https://compoundcalc.co.za/sitemap.xml
```

---

## Part 5 — Supporting Pages

These pages are **required for Google AdSense approval**. They must exist before Ali submits the AdSense application. Content stubs are provided below — Antigravity should style them to match the calculator's clean minimal design.

---

### 5.1 About Page (`/about.html`)

**Content to include:**
- 2–3 paragraph description of what CompoundCalc is and who it's for
- Statement that the tool is free and requires no sign-up
- The tool was built for South African investors but works globally
- Contact email: `hello@compoundcalc.co.za`
- Brief affiliate disclosure: "Some pages on this site contain affiliate links. We may earn a commission if you open an account with a recommended platform. This never affects our tool's recommendations or outputs."

---

### 5.2 Privacy Policy (`/privacy-policy.html`)

**Must cover (for POPIA compliance + AdSense):**
- What data is collected (Google Analytics: anonymous usage data, no PII)
- Cookie usage: Analytics cookies (GA4), AdSense cookies (once live)
- No personal data is stored by the calculator — all inputs are local to the user's browser session
- Third-party services: Google Analytics, Google AdSense, affiliate platforms (EasyEquities, Trading 212)
- User rights under POPIA: right to access, correct, or delete data — contact `hello@compoundcalc.co.za`
- Cookie consent banner (see Part 6)

> **Tip:** Use `https://www.iubenda.com` to generate a POPIA-compliant privacy policy for free. It auto-includes clauses for GA4 and AdSense.

---

### 5.3 Terms of Service (`/terms-of-service.html`)

**Must cover:**
- The calculator is for informational purposes only and does not constitute financial advice
- CompoundCalc is not a registered financial services provider (FSP) under the South African FAIS Act
- Users should consult a qualified financial advisor before making investment decisions
- No guarantee of accuracy — users use the tool at their own risk
- Intellectual property: all calculator code and content is owned by CompoundCalc / Ali Swarts

---

## Part 6 — Cookie Consent Banner

Required for POPIA compliance and AdSense. Implement a lightweight cookie consent banner — **do not use a heavy CMP library**. A simple custom implementation is fine:

```html
<!-- Cookie banner — add to every page, just before </body> -->
<div id="cookie-banner" style="display:none; position:fixed; bottom:0; left:0; right:0; 
  background:#111827; color:#f9fafb; padding:1rem 1.5rem; 
  display:flex; align-items:center; justify-content:space-between; 
  font-size:0.85rem; z-index:9999; gap:1rem;">
  <span>We use cookies to analyse site traffic and serve relevant ads. 
    <a href="/privacy-policy" style="color:#86efac;">Privacy Policy</a>
  </span>
  <button onclick="acceptCookies()" style="background:#16a34a; color:white; 
    border:none; padding:8px 18px; border-radius:6px; cursor:pointer; 
    font-family:inherit; font-size:0.85rem; white-space:nowrap;">
    Got it
  </button>
</div>

<script>
  function acceptCookies() {
    localStorage.setItem('cc_accepted', '1');
    document.getElementById('cookie-banner').style.display = 'none';
  }
  if (!localStorage.getItem('cc_accepted')) {
    document.getElementById('cookie-banner').style.display = 'flex';
  }
</script>
```

---

## Part 7 — Analytics & Tracking Setup

### 7.1 Google Analytics 4
1. Ali will create a GA4 property at `analytics.google.com` and provide a Measurement ID (format: `G-XXXXXXXXXX`)
2. Add the GA4 tag to `<head>` of **every page**:

```html
<!-- Google Analytics 4 — replace G-XXXXXXXXXX with Ali's Measurement ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

3. Set up the following custom events in `calculator.js`:

```javascript
// Fire these GA4 events at the relevant points in the calculator logic:

// When any tab is switched
gtag('event', 'tab_switch', { tab_name: tabName });

// When a calculation is run (debounced — fire after 1s of no input change)
gtag('event', 'calculation_run', {
  tab: activeTab,
  principal: principalValue,
  years: yearsValue,
  rate: rateValue
});

// When PDF is downloaded
gtag('event', 'pdf_download', { tab: activeTab });

// When share URL is copied
gtag('event', 'share_url_copied');

// When an affiliate CTA is clicked (add to each affiliate link)
gtag('event', 'affiliate_click', { platform: 'easyequities' });
```

### 7.2 Google Search Console
1. Ali will verify Search Console ownership — the easiest method on Hostinger/Netlify is the **HTML file** verification method
2. Ali will provide the verification file — upload it to the root of the site (e.g. `google1234abcd.html`)
3. After verification, submit `https://compoundcalc.co.za/sitemap.xml` in Search Console

### 7.3 Google AdSense (Pending)
Ali is applying for AdSense separately. Once approved, she will provide:
- A publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
- Ad unit code snippets for specific placements

**Pre-wire the following ad slots** as empty `<div>` placeholders with IDs so they're easy to activate:

```html
<!-- Leaderboard — below metric cards, above chart -->
<div id="ad-leaderboard" class="ad-slot">
  <!-- AdSense leaderboard 728×90 will go here -->
</div>

<!-- Rectangle — below year-by-year table -->
<div id="ad-rectangle" class="ad-slot">
  <!-- AdSense rectangle 300×250 will go here -->
</div>
```

```css
.ad-slot {
  min-height: 0; /* collapses when empty */
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
```

---

## Part 8 — Calculator Feature Additions

The reference `compound-interest.html` is complete and working. The following **additional features** need to be added during the build. Each is described with enough detail to implement without further briefing.

---

### 8.1 Shareable URL
When a user runs a calculation, encode their inputs as URL query parameters so they can share or bookmark their exact scenario.

**Implementation:**

```javascript
// After every calculation, update the browser URL without a page reload:
function updateShareableURL() {
  const params = new URLSearchParams({
    tab: activeTab,        // 'grow', 'goal', or 'compare'
    p: principalValue,
    m: monthlyValue,
    r: rateValue,
    y: yearsValue,
    n: freqValue,
    inf: inflationToggle ? inflationRate : 0
  });
  window.history.replaceState({}, '', `?${params.toString()}`);
}

// On page load, read URL params and pre-populate fields:
function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('p')) document.getElementById('g-principal').value = params.get('p');
  if (params.get('r')) document.getElementById('g-rate').value = params.get('r');
  // ... etc for all fields
  if (params.get('tab')) switchTab(params.get('tab'));
}

document.addEventListener('DOMContentLoaded', loadFromURL);
```

Add a **"Copy link"** button next to the Download CSV button:
```html
<button class="btn-share" onclick="copyShareLink()">🔗 Copy link</button>
```
```javascript
function copyShareLink() {
  navigator.clipboard.writeText(window.location.href);
  // Show brief "Copied!" tooltip for 2 seconds
}
```

---

### 8.2 "What If I Started Earlier?" Panel
Add a collapsible panel below the Grow Savings chart showing the cost of delaying. This is one of the highest-engagement features in personal finance tools.

**Logic:** Run three additional simulations using the same inputs but with start dates of 1 year ago, 3 years ago, and 5 years ago. Display the difference in final balance.

```javascript
function computeDelayCost() {
  const base = growData[growData.length - 1].balance;
  const delays = [1, 3, 5];
  return delays.map(d => {
    const earlier = simulate(P, monthly, rate, years + d, n);
    const earlyBalance = earlier[earlier.length - 1].balance;
    return { years: d, extraBalance: earlyBalance - base };
  });
}
```

**Display:**
```
┌─────────────────────────────────────────────────────┐
│  ⏳ The cost of waiting                              │
│                                                     │
│  If you had started 1 year earlier:  +R28,400       │
│  If you had started 3 years earlier: +R94,200       │
│  If you had started 5 years earlier: +R178,600      │
└─────────────────────────────────────────────────────┘
```

---

### 8.3 Currency Selector
Add a currency toggle to the top of the input panel. Switching currency updates all `$` prefixes in the UI and reformats all displayed numbers.

**Supported currencies:**
```javascript
const currencies = {
  ZAR: { symbol: 'R',  locale: 'en-ZA' },
  USD: { symbol: '$',  locale: 'en-US' },
  GBP: { symbol: '£',  locale: 'en-GB' },
  EUR: { symbol: '€',  locale: 'de-DE' }
};
```

Default to **ZAR** since the domain is `.co.za`. Store the selection in `localStorage` so it persists across visits.

---

### 8.4 PDF Export Enhancement
The reference build has a basic Download CSV. Upgrade the PDF export using `jsPDF` + `html2canvas`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

The PDF should include on one page:
1. CompoundCalc logo + URL header
2. The four metric cards (final balance, interest earned, total contributed, ROI)
3. A snapshot of the bar chart (use `html2canvas` to capture the canvas element)
4. The milestone badges
5. Footer: "Generated by compoundcalc.co.za — for informational purposes only, not financial advice"

---

### 8.5 Affiliate CTAs
Add contextual affiliate call-to-action banners that appear **after a calculation is run**. These should feel like a natural next step, not an ad.

**Placement:** Between the metric cards and the milestone badges, only visible after first calculation.

**Default CTA (ZAR currency selected):**
```html
<div class="affiliate-cta" id="affiliate-cta" style="display:none;">
  <p>Ready to put this plan in motion?</p>
  <a href="[EASYEQUITIES_AFFILIATE_LINK]" target="_blank" rel="noopener sponsored"
     onclick="gtag('event','affiliate_click',{platform:'easyequities'})">
    Open a free EasyEquities account →
  </a>
  <small>Affiliate disclosure: we may earn a commission at no cost to you.</small>
</div>
```

Show after first calculation:
```javascript
document.getElementById('affiliate-cta').style.display = 'block';
```

> **Ali will provide:** affiliate links for EasyEquities and Trading 212. Use placeholder `href="#"` until received.

---

## Part 9 — Blog Pages

Three blog articles are required for AdSense approval and initial SEO. Antigravity builds the template; Ali provides final copy. Use the following briefs to build the layout and placeholder content.

### Blog page template requirements:
- Consistent header/footer with calculator link (CTA: "Use the free calculator →")
- Reading time estimate
- Author: "CompoundCalc Team"
- Social share buttons (Twitter/X, WhatsApp, copy link)
- Related calculator widget at the end of each article — a mini single-field version: "Enter a monthly amount to see your 20-year projection" → links to the full calculator

### Article 1: `/blog/compound-interest-south-africa`
- **Title:** "Compound Interest Calculator South Africa (2025 Guide)"
- **Target keyword:** `compound interest calculator south africa`
- **Length:** 600–800 words
- **Structure:** What is compound interest → formula explained → worked example in ZAR → how to use CompoundCalc → FAQ (5 questions with schema markup)

### Article 2: `/blog/rule-of-72`
- **Title:** "The Rule of 72: How to Calculate When Your Money Doubles"
- **Target keyword:** `rule of 72 calculator`
- **Length:** 500–700 words
- **Structure:** What the rule of 72 is → formula → table of doubling times at common rates → connection to the calculator's milestone badges

### Article 3: `/blog/how-long-to-save-1-million-rand`
- **Title:** "How Long to Save R1 Million? (Calculator + Real Examples)"
- **Target keyword:** `how long to save 1 million rand`
- **Length:** 600–800 words
- **Structure:** The goal → three scenarios (low/medium/high contribution) → worked examples using the Goal tab → CTA to use the calculator

---

## Part 10 — Navigation & Footer

### Global Navigation (all pages):
```
[CompoundCalc logo]    Savings Calculator | Goal Calculator | Compare | Blog    [compoundcalc.co.za]
```
- Logo: text-based initially — "CompoundCalc" in DM Sans 600, with a small green dot or growth arrow icon
- Active page highlighted in green
- Mobile: hamburger menu collapsing to full-screen nav overlay

### Global Footer (all pages):
```
CompoundCalc.co.za
Free compound interest calculator for South African investors.

[Savings Calculator]  [Goal Calculator]  [Compare]  [Blog]
[About]  [Privacy Policy]  [Terms of Service]

Disclaimer: This tool is for informational purposes only and does not 
constitute financial advice. CompoundCalc is not a registered FSP.

© 2026 CompoundCalc. Built in South Africa. 🇿🇦
```

---

## Part 11 — Quality Assurance Checklist

Before handing over to Ali, Antigravity must verify:

**Functionality:**
- [ ] All three calculator tabs compute correctly (verify against manual calculations)
- [ ] Shareable URL populates all fields correctly on load
- [ ] PDF downloads cleanly on mobile and desktop
- [ ] CSV download works in all browsers
- [ ] Inflation toggle shows/hides correctly and affects all relevant outputs
- [ ] Currency selector persists on page refresh

**SEO:**
- [ ] All pages have unique `<title>` and `<meta description>` tags
- [ ] Canonical URLs set on all pages
- [ ] No duplicate content across tab pages
- [ ] Structured data validates at `https://validator.schema.org`
- [ ] sitemap.xml submitted to Search Console

**Performance:**
- [ ] Lighthouse score 90+ on mobile (the harder target)
- [ ] No render-blocking resources
- [ ] Fonts loading from local `/assets/fonts/`
- [ ] Core Web Vitals all green in Search Console

**Legal & Compliance:**
- [ ] Cookie banner shows on first visit, hides after acceptance
- [ ] Privacy Policy covers GA4 and AdSense
- [ ] Affiliate disclosure visible on all pages with affiliate links
- [ ] Disclaimer visible in footer and on Terms page

**Cross-browser:**
- [ ] Chrome (latest), Safari (iOS 16+), Firefox, Samsung Internet
- [ ] Test on actual mobile devices — not just browser DevTools

---

## Part 12 — Handover to Ali

When the site is ready for review, provide Ali with:

1. **Staging URL** — a preview link before DNS is pointed (Netlify and Cloudflare Pages both provide a free `*.netlify.app` or `*.pages.dev` staging URL)
2. **Lighthouse report** — screenshot of the final scores
3. **GA4 confirmation** — screenshot showing data flowing in Search Console / Analytics
4. **List of any deferred items** — anything not completed, with reason and estimated time
5. **Login credentials** — for any new accounts created on Ali's behalf (hosting, Netlify, etc.) — use `ali@openmindi.co.za` as the account email throughout

---

## Contact & Credentials

| Item | Detail |
|------|--------|
| Domain registrar | Hostinger |
| Registrar login | Ali to share directly — do not put in writing here |
| Domain | `compoundcalc.co.za` |
| Business email | `hello@compoundcalc.co.za` (to be set up) |
| Ali's contact | `ali@openmindi.co.za` / +27 62 370 5952 |
| Reference code | `compound-interest.html` (attached to this brief) |
| AdSense | Pending — Ali applying independently |
| Affiliate links | EasyEquities + Trading 212 — Ali to provide |
| GA4 Measurement ID | Ali to provide after creating property |

---

*Document version: 1.0*  
*Prepared: May 2026*  
*Questions? Contact Ali at ali@openmindi.co.za before starting any work.*
