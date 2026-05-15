# CompoundCalc — Quick Fixes: GA4 ID + EasyEquities Affiliate Link
**For:** Antigravity  
**Prepared by:** Ali Mora  
**Priority:** 🔴 Do these first — takes ~15 minutes total  
**Date:** May 2026

---

## Fix 1 — Replace GA4 Placeholder ID

### What
Every HTML page currently has `G-XXXXXXXXXX` as a placeholder. Replace with the live Measurement ID.

**Old value:** `G-XXXXXXXXXX`  
**New value:** `G-NJMYWPLFSH`

### Where — All 11 HTML files
Run a global find-and-replace across the entire repo. Every instance is identical so a single bulk replace is safe.

**Files affected (every `.html` in the repo):**
```
index.html
investment-goal-calculator.html
compare-investments.html
about.html
privacy-policy.html
terms-of-service.html
blog/index.html
blog/compound-interest-south-africa.html
blog/rule-of-72.html
blog/how-long-to-save-1-million-rand.html
blog/blog-template.html
```

### How — VS Code / terminal
```bash
# From repo root — replaces in all HTML files at once
find . -name "*.html" -exec sed -i 's/G-XXXXXXXXXX/G-NJMYWPLFSH/g' {} +
```

Or in VS Code: **Edit → Find in Files** → search `G-XXXXXXXXXX` → replace all with `G-NJMYWPLFSH`.

### Verify
Open any HTML file — both occurrences per page (the `async src` tag and the `gtag('config', ...)` call) should show `G-NJMYWPLFSH`:

```html
<!-- Should look like this after fix: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NJMYWPLFSH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NJMYWPLFSH');
</script>
```

Also update `Master.md` — line:
```
| Analytics | Google Analytics 4 — `G-XXXXXXXXXX` (placeholder, replace with live ID) |
```
Replace with:
```
| Analytics | Google Analytics 4 — `G-NJMYWPLFSH` ✅ |
```

---

## Fix 2 — Replace EasyEquities Affiliate Link Placeholder

### What
The placeholder string `EASYEQUITIES_AFFILIATE_LINK` appears in multiple locations across `calculator.js`. Replace with the live affiliate URL.

**Old value:** `EASYEQUITIES_AFFILIATE_LINK`  
**New value:** `https://bit.ly/4wsBTNT`

### Where — 3 locations in `assets/js/calculator.js`

#### Location 1 — Affiliate CTA div (shown after first calculation)
Find:
```javascript
href="EASYEQUITIES_AFFILIATE_LINK"
```
Replace with:
```javascript
href="https://bit.ly/4wsBTNT"
```

#### Location 2 — Welcome email HTML (inside `buildWelcomeEmailHTML()`)
Find:
```html
<a href="EASYEQUITIES_AFFILIATE_LINK"
```
Replace with:
```html
<a href="https://bit.ly/4wsBTNT"
```

#### Location 3 — Any other inline reference
Run a global search for `EASYEQUITIES_AFFILIATE_LINK` across the entire repo to catch any additional instances added since the original brief:

```bash
grep -r "EASYEQUITIES_AFFILIATE_LINK" .
```

Replace every hit with `https://bit.ly/4wsBTNT`.

### Also check blog articles
The three blog HTML files may have affiliate CTA sections added during Sprint 3. Search and replace there too:

```bash
grep -r "EASYEQUITIES_AFFILIATE_LINK" blog/
```

### Verify
1. Open `index.html` in browser → run a calculation → the EasyEquities CTA should appear with a working link
2. Click the link — it should open EasyEquities (or redirect correctly via the bit.ly shortlink)
3. Check GA4 DebugView confirms `affiliate_click` event fires on click

---

## QA Checklist

- [ ] `G-XXXXXXXXXX` returns zero results in a global repo search
- [ ] `G-NJMYWPLFSH` appears twice per HTML page (gtag src + gtag config)
- [ ] GA4 Realtime report shows active user when loading the site
- [ ] `EASYEQUITIES_AFFILIATE_LINK` returns zero results in a global repo search
- [ ] EasyEquities CTA on calculator → clicking opens `https://bit.ly/4wsBTNT`
- [ ] EasyEquities link in welcome email HTML updated (check `buildWelcomeEmailHTML()`)
- [ ] `Master.md` updated with live GA4 ID
- [ ] Commit message: `fix: replace GA4 placeholder and EasyEquities affiliate link`

---

*Questions: ali@openmindi.co.za / +27 62 370 5952*
