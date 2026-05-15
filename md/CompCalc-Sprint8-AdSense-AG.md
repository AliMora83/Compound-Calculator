# CompoundCalc — Sprint 8: AdSense Ad Unit Placement
**For:** Antigravity  
**Prepared by:** Ali Mora  
**Status:** AdSense APPROVED ✅ — ready to implement  
**Publisher ID:** `ca-pub-6017523378494978`  
**Date:** May 2026

---

## Overview

AdSense is approved. This sprint places manual ad units in three configurations across the site, with Auto Ads enabled as a fallback to catch any placements we miss. The goal is maximum revenue without degrading the calculator UX — the tool is the product, ads are secondary.

**Rule for every placement:** Ads appear *after* the user has derived value. Never between the user and the calculator inputs. Never in a position that causes layout shift on load.

---

## Part 1 — Enable Auto Ads (do this first, takes 2 minutes)

Auto Ads is Google's automatic placement system. Enable it as a baseline — it will serve ads in positions we haven't manually placed, and it's the fastest path to initial revenue while manual units are being configured.

The AdSense snippet is already in `<head>` of all 11 pages from Sprint 6. Auto Ads is activated simply by logging into AdSense:

1. Log in to `https://adsense.google.com` with Ali's account
2. Go to **Ads → Overview → By site**
3. Click the pencil icon next to `compoundcalc.co.za`
4. Toggle **Auto ads** → **On**
5. Click **Apply to site**

> Auto Ads will begin serving within a few hours. Manual units below take precedence over Auto Ads in the same positions.

---

## Part 2 — Create Ad Units in AdSense Dashboard

Before adding code, create the ad units in AdSense to get the unit IDs.

Go to **Ads → By ad unit → Create new ad unit** and create these four units:

| Unit name | Type | Size |
|---|---|---|
| `cc-calculator-leaderboard` | Display | Responsive (auto) |
| `cc-calculator-rectangle` | Display | Responsive (auto) |
| `cc-blog-in-article` | In-article | Auto-sized |
| `cc-blog-sidebar` | Display | Responsive (auto) |

After creating each unit, AdSense provides a code snippet like:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6017523378494978"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

Copy the `data-ad-slot` value for each unit — you'll need them below.

---

## Part 3 — Calculator Pages (3 pages)

Apply to: `index.html`, `investment-goal-calculator.html`, `compare-investments.html`

### Placement A — Leaderboard below results, above chart

**Position:** Between the metric cards row and the bar chart. Only renders after a calculation has been run (results panel is visible). This is the highest-value position on the calculator — the user has seen their results and is engaged.

**Find this comment in each calculator HTML file:**
```html
<!-- Stacked bar chart -->
```
*(or the div wrapping the chart canvas — look for `id="growChart"` or similar)*

**Insert immediately before it:**
```html
<!-- ══════════════════════════════════════════
     ADSENSE — Leaderboard (below results, above chart)
     Unit: cc-calculator-leaderboard
     ══════════════════════════════════════════ -->
<div class="ad-slot ad-leaderboard" id="ad-leaderboard" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="REPLACE_WITH_LEADERBOARD_SLOT_ID"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

### Placement B — Rectangle below year-by-year table

**Position:** Below the collapsible year-by-year breakdown table, above the footer. User has finished reviewing their data.

**Find:**
```html
<!-- Year-by-year table -->
```
*(or the closing tag of the year-by-year table section)*

**Insert immediately after the closing `</div>` of the table section:**
```html
<!-- ══════════════════════════════════════════
     ADSENSE — Rectangle (below year table)
     Unit: cc-calculator-rectangle
     ══════════════════════════════════════════ -->
<div class="ad-slot ad-rectangle" id="ad-rectangle" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="REPLACE_WITH_RECTANGLE_SLOT_ID"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

---

## Part 4 — Blog Articles (4 pages)

Apply to: `blog/compound-interest-south-africa.html`, `blog/rule-of-72.html`, `blog/how-long-to-save-1-million-rand.html`, and `blog/blog-template.html` (for future articles).

### Placement C — In-article unit after second `<h2>`

**Position:** After the second heading in the article body. This is Google's recommended in-article placement — the reader is engaged but not yet at the CTA.

In each blog article, find the **second** `<h2>` tag in the main article body (not the page title). Insert the ad block immediately after the closing paragraph that follows that heading:

```html
<!-- ══════════════════════════════════════════
     ADSENSE — In-article (after 2nd h2)
     Unit: cc-blog-in-article
     ══════════════════════════════════════════ -->
<div class="ad-slot ad-in-article" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="REPLACE_WITH_IN_ARTICLE_SLOT_ID"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

> **Note:** The in-article format uses `data-ad-layout="in-article"` and `data-ad-format="fluid"` — this is different from display units. Use the `cc-blog-in-article` slot ID here, not the rectangle ID.

### Placement D — Sidebar sticky unit

**Position:** In the blog sidebar, below the existing mini-calculator widget (or Table of Contents if no widget). Sticks as the reader scrolls.

Find the blog sidebar `<aside>` or `<div class="sidebar">` element in each blog article. Add this block at the **bottom** of the sidebar, after any existing widgets:

```html
<!-- ══════════════════════════════════════════
     ADSENSE — Sidebar sticky
     Unit: cc-blog-sidebar
     ══════════════════════════════════════════ -->
<div class="ad-slot ad-sidebar-sticky" aria-hidden="true">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-6017523378494978"
       data-ad-slot="REPLACE_WITH_SIDEBAR_SLOT_ID"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

Add the sticky CSS to `assets/css/blog.css`:

```css
/* ── AdSense sidebar sticky ─────────────────────────── */
.ad-sidebar-sticky {
  position: sticky;
  top: 100px; /* clears the nav bar */
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  /* On mobile the sidebar stacks below article — remove sticky */
  .ad-sidebar-sticky {
    position: static;
  }
}
```

---

## Part 5 — Shared Ad Slot CSS

Add to `assets/css/styles.css` (after existing rules, before the media queries section):

```css
/* ── AdSense ad slots ───────────────────────────────── */
.ad-slot {
  width: 100%;
  overflow: hidden;
  margin: 1.5rem 0;
  /* Collapses cleanly when AdSense returns no fill */
  min-height: 0;
}

.ad-leaderboard {
  /* Max width matches Google's leaderboard; centres on wide screens */
  max-width: 728px;
  margin-left: auto;
  margin-right: auto;
}

.ad-rectangle {
  max-width: 336px;
  margin-left: auto;
  margin-right: auto;
}

.ad-in-article {
  /* Full-width fluid — matches article column */
  margin: 2rem 0;
}

/* Hide ad slots on very small screens if they cause layout issues */
@media (max-width: 360px) {
  .ad-leaderboard,
  .ad-rectangle {
    display: none;
  }
}
```

---

## Part 6 — Slot ID Reference (fill in after creating units in AdSense)

AG: Copy the `data-ad-slot` values from AdSense and fill this in before committing. Share with Ali once done.

| Constant name | AdSense unit | Slot ID |
|---|---|---|
| `REPLACE_WITH_LEADERBOARD_SLOT_ID` | `cc-calculator-leaderboard` | _______________ |
| `REPLACE_WITH_RECTANGLE_SLOT_ID` | `cc-calculator-rectangle` | _______________ |
| `REPLACE_WITH_IN_ARTICLE_SLOT_ID` | `cc-blog-in-article` | _______________ |
| `REPLACE_WITH_SIDEBAR_SLOT_ID` | `cc-blog-sidebar` | _______________ |

---

## QA Checklist

**Ad rendering:**
- [ ] Auto Ads enabled in AdSense dashboard for `compoundcalc.co.za`
- [ ] All four ad units created in AdSense — slot IDs noted
- [ ] All `REPLACE_WITH_*_SLOT_ID` placeholders replaced with real slot IDs
- [ ] Leaderboard renders on calculator pages (check in browser after running a calculation)
- [ ] Rectangle renders below the year-by-year table
- [ ] In-article unit renders in each of the 3 blog articles
- [ ] Sidebar sticky unit renders and scrolls correctly in blog sidebar
- [ ] No ad slot causes horizontal scroll on mobile (375px viewport)
- [ ] No Cumulative Layout Shift on page load (ads collapse gracefully when empty)

**Revenue tracking:**
- [ ] AdSense → Ads → Overview shows impressions within 24hrs of deploy
- [ ] No AdSense policy violations flagged in AdSense dashboard

**Don't break:**
- [ ] Calculator still computes correctly with ad slots in place
- [ ] Affiliate CTA (EasyEquities) still visible and not obscured by ad slots
- [ ] Email capture form still triggers and displays correctly
- [ ] Mobile layout on iOS Safari and Android Chrome — no overlap

**Commit message:** `feat: place AdSense manual ad units on calculator and blog pages`

---

*Questions: ali@openmindi.co.za / +27 62 370 5952*
