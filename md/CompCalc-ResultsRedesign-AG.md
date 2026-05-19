# CompoundCalc — Results Panel Redesign
**For:** Jules  
**Requested by:** Ali  
**Scope:** `index.html`, `assets/css/styles.css`, `assets/js/calculator.js`  
**Reference:** EasyEquities portfolio dashboard layout (see screenshot)  
**Status:** Ready to implement

---

## Overview

Three visual changes in one sprint:

1. **Unified metrics container** — replace the 4 separate metric cards with a single gradient header card (dark green → emerald), matching the EasyEquities bold portfolio header style. ROI shown as a floating badge top-right.
2. **All amounts in one container** — Final Balance (large, primary), You Contribute + Interest Earned as secondary metrics below, all inside the same card.
3. **Stacked area chart** — convert the existing Chart.js stacked bar chart to a smooth stacked area chart with gradient fills, positioned directly below the metrics container with no gap.

---

## Change 1 — HTML: Replace metric cards with `portfolio-header`

### Find (in `index.html`) — the 4 separate result cards:

The exact markup will vary slightly but look for a block like this inside the results column:

```html
<!-- FIND THIS PATTERN — four separate metric cards -->
<div class="metric-card highlight" id="...">
  <span class="metric-label">FINAL BALANCE</span>
  ...
</div>
<div class="metric-card" id="...">
  <span class="metric-label">YOU CONTRIBUTE</span>
  ...
</div>
<div class="metric-card" id="...">
  <span class="metric-label">INTEREST EARNED</span>
  ...
</div>
<div class="metric-card" id="...">
  <span class="metric-label">RETURN ON INVESTMENT</span>
  ...
</div>
```

Also find and **delete** the ad placeholder that sits between the metrics and the chart:

```html
<!-- DELETE THIS BLOCK ENTIRELY -->
<div id="ad-leaderboard" class="ad-slot">
  <!-- AdSense leaderboard 728×90 will go here -->
</div>
```

### Replace with (paste in place of the 4 cards):

```html
<!-- ══════════════════════════════════════════════════
     PORTFOLIO HEADER — unified metrics container
     Replaces: 4 separate metric cards + ad-leaderboard slot
     ══════════════════════════════════════════════════ -->
<div class="portfolio-header" id="results-container">

  <!-- Top row: primary value + ROI badge -->
  <div class="portfolio-header-top">
    <div class="portfolio-primary">
      <span class="portfolio-label">FINAL BALANCE</span>
      <span class="portfolio-value" id="result-balance">—</span>
    </div>
    <div class="portfolio-roi-badge" id="result-roi-badge">
      <span id="result-roi">0%</span>
      <span class="roi-sublabel">ROI</span>
    </div>
  </div>

  <!-- Divider -->
  <div class="portfolio-divider"></div>

  <!-- Bottom row: secondary metrics -->
  <div class="portfolio-secondary-row">
    <div class="portfolio-secondary-metric">
      <span class="portfolio-secondary-label">YOU CONTRIBUTE</span>
      <span class="portfolio-secondary-value" id="result-contributions">—</span>
    </div>
    <div class="portfolio-secondary-metric">
      <span class="portfolio-secondary-label">INTEREST EARNED</span>
      <span class="portfolio-secondary-value" id="result-interest">—</span>
    </div>
  </div>

</div>
<!-- END PORTFOLIO HEADER -->
```

> **Note on IDs:** The JS references `result-balance`, `result-contributions`, `result-interest`, and `result-roi`. Check `calculator.js` and update any `getElementById` calls that pointed to the old card IDs. See Change 3 below.

---

## Change 2 — CSS: Portfolio header styles

Add this entire block to the **bottom of `styles.css`** (or just before the `/* Mobile */` media query section if one exists at the end):

```css
/* ══════════════════════════════════════════════════
   PORTFOLIO HEADER — unified results card
   ══════════════════════════════════════════════════ */

.portfolio-header {
  background: linear-gradient(135deg, #14532d 0%, #16a34a 55%, #059669 100%);
  border-radius: 16px;
  padding: 1.5rem 1.75rem 1.25rem;
  margin-bottom: 0; /* flush with chart below */
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
  overflow: hidden;
}

/* Subtle noise/grain texture overlay for depth */
.portfolio-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  border-radius: inherit;
  opacity: 0.6;
}

/* Top row */
.portfolio-header-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

/* Primary label (FINAL BALANCE) */
.portfolio-label {
  display: block;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  margin-bottom: 6px;
}

/* Primary value */
.portfolio-value {
  display: block;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.03em;
  line-height: 1;
}

/* ROI badge — top right */
.portfolio-roi-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px 14px;
  min-width: 90px;
  text-align: right;
  flex-shrink: 0;
}

.portfolio-roi-badge #result-roi {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1;
}

.roi-sublabel {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  margin-top: 3px;
}

/* Divider */
.portfolio-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.18);
  margin: 1.1rem 0 1rem;
}

/* Secondary metrics row */
.portfolio-secondary-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.portfolio-secondary-metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.portfolio-secondary-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
}

.portfolio-secondary-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.02em;
}

/* ── Chart wrapper — flush below portfolio header ── */
.chart-wrapper {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-top: none; /* flush join with header above */
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 1.25rem 1.5rem 1rem;
  margin-bottom: 1.25rem;
}

/* Chart legend inside the wrapper */
.chart-legend-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.chart-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-muted, #6b7280);
}

.chart-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  flex-shrink: 0;
}

/* ── Mobile adjustments ── */
@media (max-width: 640px) {
  .portfolio-header {
    padding: 1.25rem 1.25rem 1rem;
  }

  .portfolio-value {
    font-size: 2rem;
  }

  .portfolio-header-top {
    flex-direction: row; /* keep badge visible on mobile */
    align-items: center;
  }

  .portfolio-roi-badge {
    min-width: 80px;
    padding: 8px 10px;
  }

  .portfolio-roi-badge #result-roi {
    font-size: 1rem;
  }

  .portfolio-secondary-row {
    gap: 1.5rem;
  }
}
```

---

## Change 3 — JS: Update result ID references in `calculator.js`

The JS needs to write to the new element IDs. Find the section of `calculator.js` where results are rendered (look for `innerHTML`, `textContent`, or `innerText` assignments for the old metric card IDs).

### Pattern to find and update:

Check the existing result-rendering function (likely `renderGrowResults()` or `displayResults()`). The old code probably does something like:

```javascript
// OLD — find these patterns and update the IDs to match new HTML
document.getElementById('g-final-balance').textContent  = fmt(balance);
document.getElementById('g-contributions').textContent  = fmt(totalContrib);
document.getElementById('g-interest').textContent       = fmt(interest);
document.getElementById('g-roi').textContent            = roi.toFixed(1) + '%';
```

### Replace the ID targets with the new unified IDs:

```javascript
// NEW — use these IDs (matching the portfolio-header HTML above)
document.getElementById('result-balance').textContent      = fmt(balance);
document.getElementById('result-contributions').textContent = fmt(totalContrib);
document.getElementById('result-interest').textContent     = fmt(interest);
document.getElementById('result-roi').textContent          = roi.toFixed(1) + '%';
```

> **`fmt()` helper**: This should already exist in `calculator.js` for currency formatting. If the function name is different in your codebase, just use whatever formats numbers with the currency symbol.

---

## Change 4 — JS: Convert bar chart to stacked area chart

In `calculator.js`, find the `Chart` initialisation for the grow chart. It will look something like:

```javascript
// FIND — existing bar chart init (approximate)
growChartInstance = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [
      { label: 'Interest',      data: interestData,      backgroundColor: '#16a34a', stack: 'stack' },
      { label: 'Contributions', data: contributionsData, backgroundColor: '#86efac', stack: 'stack' },
      { label: 'Principal',     data: principalData,     backgroundColor: '#d1fae5', stack: 'stack' },
    ]
  },
  options: { ... }
});
```

### Replace the entire Chart init block with:

```javascript
// ── Build gradient fills (must run after canvas is in the DOM) ──────
const ctx = document.getElementById('growChart').getContext('2d');

function makeGradient(colorTop, colorBottom) {
  const grad = ctx.createLinearGradient(0, 0, 0, 340);
  grad.addColorStop(0,   colorTop);
  grad.addColorStop(1,   colorBottom);
  return grad;
}

growChartInstance = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,   // year labels — keep existing logic
    datasets: [
      {
        label: 'Interest',
        data: interestData,
        backgroundColor: makeGradient('rgba(22, 163, 74, 0.55)', 'rgba(22, 163, 74, 0.05)'),
        borderColor: '#16a34a',
        borderWidth: 2,
        fill: 'stack',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#16a34a',
      },
      {
        label: 'Contributions',
        data: contributionsData,
        backgroundColor: makeGradient('rgba(134, 239, 172, 0.6)', 'rgba(134, 239, 172, 0.08)'),
        borderColor: '#4ade80',
        borderWidth: 1.5,
        fill: 'stack',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#4ade80',
      },
      {
        label: 'Principal',
        data: principalData,
        backgroundColor: makeGradient('rgba(209, 250, 229, 0.7)', 'rgba(209, 250, 229, 0.15)'),
        borderColor: '#bbf7d0',
        borderWidth: 1,
        fill: 'origin',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#86efac',
      },
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.4,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false, // we render our own legend (see HTML change below)
      },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (items) => `Year ${items[0].label}`,
          label: (item) => {
            const sym = getCurrentCurrencySymbol(); // existing helper
            return ` ${item.dataset.label}: ${sym}${Math.round(item.raw).toLocaleString('en-ZA')}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: '#9ca3af',
          font: { size: 11 },
          maxTicksLimit: 8,
          maxRotation: 0,
        }
      },
      y: {
        stacked: true,
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        },
        border: { display: false, dash: [4, 4] },
        ticks: {
          color: '#9ca3af',
          font: { size: 11 },
          callback: (val) => {
            const sym = getCurrentCurrencySymbol();
            if (val >= 1_000_000) return sym + (val / 1_000_000).toFixed(1) + 'M';
            if (val >= 1_000)     return sym + (val / 1_000).toFixed(0) + 'k';
            return sym + val;
          }
        }
      }
    }
  }
});
```

> **Stacked area note:** Chart.js needs `fill: 'stack'` on the datasets AND `stacked: true` on both axes for the areas to stack correctly. The order matters — `Interest` first (top), `Principal` last (bottom). Reverse the dataset order from the original bar chart if needed.

---

## Change 5 — HTML: Add custom legend + wrap chart in `.chart-wrapper`

Find the existing `<canvas id="growChart">` element and its immediate parent. Replace with:

```html
<!-- FIND and REPLACE the chart canvas and its parent div with this -->
<div class="chart-wrapper">

  <!-- Custom legend -->
  <div class="chart-legend-row">
    <div class="chart-legend-item">
      <span class="chart-legend-dot" style="background:#16a34a;"></span>
      Interest
    </div>
    <div class="chart-legend-item">
      <span class="chart-legend-dot" style="background:#4ade80;"></span>
      Contributions
    </div>
    <div class="chart-legend-item">
      <span class="chart-legend-dot" style="background:#bbf7d0; border: 1px solid #86efac;"></span>
      Principal
    </div>
  </div>

  <canvas id="growChart"></canvas>

</div>
```

---

## Change 6 — CSS: Hide old `.metric-card` styles (safety net)

The old card styles won't cause visual harm once the HTML is replaced, but add this to the bottom of `styles.css` to explicitly suppress them in case any lingering markup survives:

```css
/* Safety: suppress old metric cards if any survive in markup */
.metric-card {
  display: none !important;
}
```

> Remove this rule once you've confirmed the old cards are fully gone from the HTML.

---

## QA Checklist

- [ ] Metrics container has green gradient background — no white cards visible
- [ ] Final Balance appears large (≥2rem) in white text, top-left of header
- [ ] ROI badge appears top-right inside the header card
- [ ] "You Contribute" and "Interest Earned" appear in the secondary row below the divider
- [ ] No gap visible between the portfolio header and the chart (borders flush)
- [ ] Chart is a smooth area chart with three gradient-filled layers, not bars
- [ ] Chart tooltip shows on hover with dark background, formatted values, "Year X" title
- [ ] Custom legend (Interest / Contributions / Principal) shows above the chart
- [ ] Y-axis labels use the active currency symbol (R / $ / £ / €)
- [ ] On mobile (≤640px): header stacks cleanly, values readable, chart fits viewport
- [ ] `result-balance`, `result-contributions`, `result-interest`, `result-roi` all update when Calculate is pressed
- [ ] Chart re-renders correctly on subsequent calculations (no duplicate charts — confirm `growChartInstance.destroy()` is called before re-init)
- [ ] Milestone badges still appear below the chart wrapper
- [ ] `ad-leaderboard` div is gone from the DOM

---

## Notes for Jules

- **Do not change the chart ID** (`growChart`) — it's referenced by the PDF export function (`html2canvas` captures it by ID).
- **`getCurrentCurrencySymbol()`** — this helper already exists in `calculator.js`. Use it in the tooltip callback and y-axis tick callback exactly as shown.
- **Chart destroy pattern** — before re-initialising the chart on recalculation, the existing code likely calls `growChartInstance.destroy()`. Keep that. The gradient `makeGradient()` call must happen inside the function that initialises the chart (after destroy), not at module level, because `createLinearGradient` needs the canvas dimensions to be set.
- The `ad-leaderboard` placeholder is being removed here. When AdSense is eventually approved, place the leaderboard ad **below** the chart wrapper, not between the header and chart.

---

*Document version: 1.0*  
*Sprint: Results Panel Redesign*  
*Contact: ali@openmindi.co.za*
