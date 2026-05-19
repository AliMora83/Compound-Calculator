/**
 * calculator.js - Core logic for CompoundCalc.co.za
 * Includes: Grow, Goal, and Compare tabs, Currency support, and new features.
 */

const $ = id => document.getElementById(id);

// --- State ---
let currentCurrency = localStorage.getItem('cc_currency') || 'ZAR';
const currencies = {
  ZAR: { symbol: 'R', locale: 'en-ZA' },
  USD: { symbol: '$', locale: 'en-US' },
  GBP: { symbol: '£', locale: 'en-GB' },
  EUR: { symbol: '€', locale: 'de-DE' }
};

// ── Email capture state ────────────────────────────────
const EC_STORAGE_KEY  = 'cc_email_captured'; // localStorage key
let ecCalculationRan  = false;               // true after first calc runs
let ecTimerFired      = false;               // true after 30s on page
let ecShown           = false;               // true once form has been shown
let ecDismissed       = false;               // true if user dismissed it

// --- Helpers ---
const fmt = n => {
  const c = currencies[currentCurrency];
  return c.symbol + Math.round(n).toLocaleString(c.locale);
};
const pct = n => (Math.round(n * 10) / 10).toFixed(1) + '%';

// Toast System
let toastTimer;
function showToast(msg) {
  let t = $('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  clearTimeout(toastTimer);
  t.classList.add('show');
  toastTimer = setTimeout(() => { t.classList.remove('show'); }, 3000);
}

// Kinetic Feedback
function triggerKineticFeedback() {
  document.querySelectorAll('.metric-value').forEach(el => {
    el.classList.add('updating');
    setTimeout(() => el.classList.remove('updating'), 400);
  });
}

function simulate(P, monthly, annualRate, years, n) {
  const rp = annualRate / 100 / n;
  const mpp = 12 / n;
  let bal = P;
  let contrib = P;
  const rows = [{ year: 0, balance: P, contributions: P, interest: 0 }];
  let month = 0;
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      bal += monthly;
      contrib += monthly;
      month++;
      if (month % mpp < 1) bal *= (1 + rp);
    }
    rows.push({ year: y, balance: Math.max(0, bal), contributions: contrib, interest: Math.max(0, bal - contrib) });
  }
  return rows;
}

function realValue(nominal, inflationRate, years) {
  return nominal / Math.pow(1 + inflationRate / 100, years);
}

// --- Currency Selector ---
function setCurrency(code) {
  currentCurrency = code;
  localStorage.setItem('cc_currency', code);
  
  // Sync the currency dropdown if present
  const selectEl = document.getElementById('currency-select');
  if (selectEl && selectEl.value !== code) {
    selectEl.value = code;
  }
  
  // Update prefixes in UI
  const symbol = currencies[code].symbol;
  document.querySelectorAll('.input-prefix').forEach(el => {
    if (el.textContent === '$' || el.textContent === 'R' || el.textContent === '£' || el.textContent === '€') {
      el.textContent = symbol;
    }
  });
  
  // Re-run current calculation
  const activeBtn = document.querySelector('.tab-btn.active');
  if (!activeBtn) return;
  const match = activeBtn.getAttribute('onclick')?.match(/'([^']+)'/);
  if (!match) return;
  const activeTab = match[1];
  if (activeTab === 'grow') computeGrow();
  if (activeTab === 'goal') computeGoal();
  if (activeTab === 'compare') computeCompare();
}

// --- Debounced GA4 Events ---
let calcTimeout;
function trackCalculation(tabName, data) {
  clearTimeout(calcTimeout);
  calcTimeout = setTimeout(() => {
    if (typeof gtag === 'function') {
      gtag('event', 'calculation_run', {
        tab: tabName,
        principal: data.p,
        years: data.y,
        rate: data.r
      });
    }
    // Show affiliate CTA after first run
    const cta = $('affiliate-cta');
    if (cta) cta.style.display = 'block';

    // ── Email capture trigger ──
    ecCalculationRan = true;
    if (typeof maybeShowEmailCapture === 'function') {
      maybeShowEmailCapture();
    }
  }, 1000);
}

// --- Grow tab ---
let growChart, growData;

function computeGrow() {
  const P = Math.max(0, +$('g-principal').value || 0);
  const monthly = Math.max(0, +$('g-monthly').value || 0);
  const rate = Math.max(0, +$('g-rate').value || 0);
  const years = Math.max(1, +$('g-years').value || 1);
  
  // Sync back to UI if corrected
  if (+$('g-years').value < 1) $('g-years').value = 1;

  const n = +$('g-freq').value;
  const useInflation = $('g-inflation-toggle').checked;
  const inflationRate = Math.max(0, +$('g-inflation').value || 0);

  growData = simulate(P, monthly, rate, years, n);
  const last = growData[growData.length - 1];

  animateValue('result-balance', last.balance, true);
  animateValue('result-interest', last.interest, true);
  animateValue('result-contributions', last.contributions, true);
  const roi = last.contributions > 0 ? ((last.balance - last.contributions) / last.contributions * 100) : 0;
  $('result-roi').textContent = pct(roi);

  if (useInflation) {
    const real = realValue(last.balance, inflationRate, years);
    $('g-real').textContent = fmt(real);
    $('g-real-row').style.display = '';
    $('legend-real').style.display = '';
  } else {
    $('g-real-row').style.display = 'none';
    $('legend-real').style.display = 'none';
  }

  // Milestones
  const milestones = [];
  const targets = [{ mult: 2, cls: 'm2', label: '2× your money' }, { mult: 5, cls: 'm5', label: '5×' }, { mult: 10, cls: 'm10', label: '10×' }];
  for (const t of targets) {
    const threshold = P * t.mult;
    const hit = growData.find(r => r.balance >= threshold);
    if (hit) milestones.push({ year: hit.year, ...t });
  }
  const mBox = $('g-milestones');
  if (mBox) {
    mBox.innerHTML = milestones.map((m, i) =>
      `<span class="milestone-badge ${m.cls}" style="animation-delay:${i * 0.08}s">
        <span class="milestone-dot"></span>
        ${m.label} — year ${m.year}
      </span>`
    ).join('');
  }

  // Chart
  renderGrowChart(growData, P, useInflation, inflationRate);
  
  // Table
  buildGrowTable(growData, P, useInflation, inflationRate);
  
  // Delay Cost
  computeDelayCost(P, monthly, rate, years, n);

  trackCalculation('grow', { p: P, y: years, r: rate });
}

function renderGrowChart(data, P, useInflation, inflationRate) {
  const labels = data.map(r => r.year === 0 ? 'Start' : `Yr ${r.year}`);
  const principalArr = data.map(() => Math.round(P));
  const contribArr = data.map(r => Math.round(Math.max(0, r.contributions - P)));
  const interestArr = data.map(r => Math.round(r.interest));
  const realArr = useInflation ? data.map(r => Math.round(realValue(r.balance, inflationRate, r.year))) : null;

  if (growChart) {
    growChart.destroy();
  }

  const canvas = $('growChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function makeGradient(colorTop, colorBottom) {
    const grad = ctx.createLinearGradient(0, 0, 0, 340);
    grad.addColorStop(0, colorTop);
    grad.addColorStop(1, colorBottom);
    return grad;
  }

  const datasets = [
    {
      label: 'Interest',
      data: interestArr,
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
      data: contribArr,
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
      data: principalArr,
      backgroundColor: makeGradient('rgba(209, 250, 229, 0.7)', 'rgba(209, 250, 229, 0.15)'),
      borderColor: '#bbf7d0',
      borderWidth: 1,
      fill: 'origin',
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: '#86efac',
    }
  ];

  if (realArr) {
    datasets.push({
      label: 'Real value',
      data: realArr,
      borderColor: '#f97316',
      borderWidth: 2.5,
      type: 'line',
      fill: false,
      stack: 'real',
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#f97316',
    });
  }

  growChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
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
          display: false,
        },
        tooltip: {
          backgroundColor: '#111827',
          titleColor: '#f9fafb',
          bodyColor: '#d1d5db',
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            title: (items) => `Year ${items[0].label.replace('Yr ', '')}`,
            label: (item) => {
              const sym = getCurrentCurrencySymbol();
              return ` ${item.dataset.label}: ${sym}${Math.round(item.raw).toLocaleString()}`;
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
}

function buildGrowTable(data, P, useInflation, inflationRate) {
  const tbody = $('g-table-body');
  if (!tbody) return;
  const milestoneYears = {};
  const targets = [{ mult: 2, label: '2×' }, { mult: 5, label: '5×' }, { mult: 10, label: '10×' }];
  for (const t of targets) {
    const hit = data.find(r => r.balance >= P * t.mult);
    if (hit && !milestoneYears[hit.year]) milestoneYears[hit.year] = t.label;
  }

  tbody.innerHTML = data.slice(1).map(r => {
    const prev = data[r.year - 1];
    const growth = prev.balance > 0 ? ((r.balance - prev.balance) / prev.balance * 100) : 0;
    const isMilestone = milestoneYears[r.year];
    return `<tr class="${isMilestone ? 'milestone-row' : ''}">
      <td data-badge="${isMilestone || ''}">Year ${r.year}</td>
      <td>${fmt(r.balance)}</td>
      <td>${fmt(r.contributions)}</td>
      <td>${fmt(r.interest)}</td>
      <td>${pct(growth)}</td>
    </tr>`;
  }).join('');
}

function computeDelayCost(P, monthly, rate, years, n) {
  const panel = $('delay-list');
  if (!panel) return;
  
  const baseBalance = growData[growData.length - 1].balance;
  const delays = [1, 3, 5];
  
  panel.innerHTML = delays.map(d => {
    const earlier = simulate(P, monthly, rate, years + d, n);
    const earlyBalance = earlier[earlier.length - 1].balance;
    const diff = earlyBalance - baseBalance;
    return `<div class="delay-item">
      <span class="delay-label">If you had started ${d} year${d > 1 ? 's' : ''} earlier:</span>
      <span class="delay-value">+${fmt(diff)}</span>
    </div>`;
  }).join('');
}

// --- Goal tab ---
let goalChart;

function computeGoal() {
  const target = Math.max(0, +$('goal-target').value || 0);
  const P = Math.max(0, +$('goal-principal').value || 0);
  const monthly = Math.max(0, +$('goal-monthly').value || 0);
  const rate = Math.max(0, +$('goal-rate').value || 0);
  const n = +$('goal-freq').value;

  if (target <= 0 || rate <= 0) return;

  const maxYears = 100;
  const data = simulate(P, monthly, rate, maxYears, n);
  const hitIdx = data.findIndex(r => r.balance >= target);

  if (hitIdx === -1) {
    $('goal-years-num').textContent = '100+';
    $('goal-years-label').textContent = 'years — consider increasing contribution';
    $('goal-prog-fill').style.width = '100%';
    return;
  }

  const yearsNeeded = hitIdx;
  $('goal-years-num').textContent = yearsNeeded;
  $('goal-years-label').textContent = yearsNeeded === 1 ? 'year to reach your goal' : 'years to reach your goal';

  const last = data[hitIdx];
  const progPct = Math.min(100, (hitIdx / 50) * 100); // Visual scaling
  $('goal-prog-fill').style.width = Math.min(100, 100 - (hitIdx * 2)) + '%'; // Arbitrary fun progress
  $('goal-prog-label').textContent = `${fmt(last.contributions)} contributed, ${fmt(last.interest)} from interest`;

  animateValue('goal-contribute-total', last.contributions, true);
  animateValue('goal-interest-covers', last.interest, true);
  $('goal-interest-pct').textContent = last.balance > 0 ? pct((last.interest / last.balance) * 100) : '—';

  // Chart
  const showYears = Math.min(hitIdx + 5, maxYears);
  const slice = data.slice(0, showYears + 1);
  const labels = slice.map(r => r.year === 0 ? 'Start' : `Yr ${r.year}`);
  const datasets = [
    { label: 'Interest', data: slice.map(r => Math.round(r.interest)), backgroundColor: '#16a34a', stack: 's' },
    { label: 'Contributions', data: slice.map(r => Math.round(r.contributions - P)), backgroundColor: '#86efac', stack: 's' },
    { label: 'Principal', data: slice.map(() => Math.round(P)), backgroundColor: '#d1d5db', stack: 's' },
    { label: 'Target', data: slice.map(() => Math.round(target)), borderColor: '#ef4444', borderWidth: 1.5, borderDash: [4,4], type: 'line', stack: undefined, pointRadius: 0, fill: false }
  ];

  if (goalChart) {
    goalChart.data.labels = labels;
    goalChart.data.datasets = datasets;
    goalChart.update('active');
  } else {
    const ctx = $('goalChart');
    if (ctx) goalChart = new Chart(ctx, { type: 'bar', data: { labels, datasets }, options: chartOpts() });
  }

  trackCalculation('goal', { p: P, y: yearsNeeded, r: rate });
}

// --- Compare tab ---
let compareChart;

function computeCompare() {
  const n = +$('c-freq').value;
  const yearsA = Math.max(1, +$('ca-years').value || 20);
  const yearsB = Math.max(1, +$('cb-years').value || 20);
  const maxYears = Math.max(yearsA, yearsB);

  const dataA = simulate(Math.max(0, +$('ca-principal').value || 0), Math.max(0, +$('ca-monthly').value || 0), Math.max(0, +$('ca-rate').value || 0), yearsA, n);
  const dataB = simulate(Math.max(0, +$('cb-principal').value || 0), Math.max(0, +$('cb-monthly').value || 0), Math.max(0, +$('cb-rate').value || 0), yearsB, n);

  const lastA = dataA[dataA.length - 1];
  const lastB = dataB[dataB.length - 1];

  $('ca-final').textContent = fmt(lastA.balance);
  $('ca-sub').textContent = `${fmt(lastA.interest)} interest on ${fmt(lastA.contributions)} contributed`;
  $('cb-final').textContent = fmt(lastB.balance);
  $('cb-sub').textContent = `${fmt(lastB.interest)} interest on ${fmt(lastB.contributions)} contributed`;

  const winnerBox = $('compare-winner-box');
  if (Math.abs(lastA.balance - lastB.balance) > 1) {
    const winner = lastA.balance > lastB.balance ? 'A' : 'B';
    const diff = Math.abs(lastA.balance - lastB.balance);
    winnerBox.innerHTML = `<span class="compare-winner">Scenario ${winner} wins by ${fmt(diff)}</span>`;
  } else {
    winnerBox.innerHTML = '';
  }

  // Chart
  const labels = Array.from({ length: maxYears + 1 }, (_, i) => i === 0 ? 'Start' : `Yr ${i}`);
  const datasets = [
    { label: 'Scenario A', data: labels.map((_, i) => dataA[i] ? Math.round(dataA[i].balance) : null), borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.08)', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 },
    { label: 'Scenario B', data: labels.map((_, i) => dataB[i] ? Math.round(dataB[i].balance) : null), borderColor: '#d97706', backgroundColor: 'rgba(217,119,6,0.08)', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 }
  ];

  if (compareChart) {
    compareChart.data.labels = labels;
    compareChart.data.datasets = datasets;
    compareChart.update('active');
  } else {
    const ctx = $('compareChart');
    if (ctx) compareChart = new Chart(ctx, { type: 'line', data: { labels, datasets }, options: { ...chartOpts(), scales: { x: { stacked: false, ticks: { autoSkip: true, maxTicksLimit: 10, font: { size: 11 }, color: '#9ca3af' }, grid: { display: false } }, y: { stacked: false, ticks: { callback: v => currencies[currentCurrency].symbol + (v >= 1000000 ? (v/1000000).toFixed(1)+'M' : v >= 1000 ? (v/1000).toFixed(0)+'k' : v), font: { size: 11 }, color: '#9ca3af' }, grid: { color: '#f3f4f6' } } } } });
  }

  trackCalculation('compare', { p: Math.max(+$('ca-principal').value, +$('cb-principal').value), y: maxYears, r: Math.max(+$('ca-rate').value, +$('cb-rate').value) });
}

// --- Shared Utilities ---
function chartOpts() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 600, easing: 'easeInOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: item => ` ${item.dataset.label}: ${item.raw !== null ? fmt(item.raw) : '—'}`
        }
      }
    },
    scales: {
      x: { stacked: true, ticks: { autoSkip: true, maxTicksLimit: 10, font: { size: 11 }, color: '#9ca3af' }, grid: { display: false } },
      y: { stacked: true, ticks: { callback: v => currencies[currentCurrency].symbol + (v >= 1000000 ? (v/1000000).toFixed(1)+'M' : v >= 1000 ? (v/1000).toFixed(0)+'k' : v), font: { size: 11 }, color: '#9ca3af' }, grid: { color: '#f3f4f6' } }
    }
  };
}

function animateValue(id, target, isCurrency) {
  const el = $(id);
  if (!el) return;
  // Parse current displayed value to animate from it (avoids 0 → target flash)
  const raw = el.textContent.replace(/[^0-9.-]/g, '');
  const start = parseFloat(raw) || 0;
  const duration = 600;
  const startTime = performance.now();
  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;
    el.textContent = isCurrency ? fmt(current) : Math.round(current);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function toggleInflation() {
  const on = $('g-inflation-toggle').checked;
  $('inflation-sub').classList.toggle('visible', on);
  computeGrow();
}

function toggleTable(tab) {
  const toggle = $(`table-toggle-${tab}`);
  const wrap = $(`table-wrap-${tab}`);
  toggle.classList.toggle('open');
  wrap.classList.toggle('open');
}

function switchTab(name) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  const panel = $(`tab-${name}`);
  const btn = document.querySelector(`.tab-btn[onclick*="${name}"]`);
  
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
  
  if (name === 'grow') computeGrow();
  if (name === 'goal') computeGoal();
  if (name === 'compare') computeCompare();
  
  // GA4 event
  if (typeof gtag === 'function') {
    gtag('event', 'tab_switch', { tab_name: name });
  }
}

// --- Downloads ---
function downloadCSV() {
  if (!growData) return;
  const header = ['Year', 'Balance', 'Total Contributed', 'Interest Earned'];
  const rows = growData.map(r => [r.year, Math.round(r.balance), Math.round(r.contributions), Math.round(r.interest)]);
  const csv = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'compound-interest-export.csv';
  a.click();
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const canvas = await html2canvas($('tab-grow'), { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('compound-calc-summary.pdf');
  
  if (typeof gtag === 'function') {
    gtag('event', 'pdf_download', { tab: 'grow' });
  }
}

function calculateNow() {
  computeGrow();
  computeGoal();
  computeCompare();
  triggerKineticFeedback();
  showToast('Calculations updated!');
}

function handleCalculate() {
  const btn = document.getElementById('calculate-btn');
  if (!btn) { calculateNow(); return; }
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '⏳ Calculating…';

  setTimeout(() => {
    calculateNow();
    // Use the standard dual-gate (timer + calc) instead of bypassing
    ecCalculationRan = true;
    maybeShowEmailCapture();

    btn.disabled = false;
    btn.innerHTML = originalText;
  }, 0);
}

function clearInputs() {
  const activeTabPanel = document.querySelector('.tab-panel.active');
  const activeTabId = activeTabPanel ? activeTabPanel.id : 'tab-grow';

  if (activeTabId === 'tab-grow') {
    $('g-principal').value = 10000;
    $('g-monthly').value = 500;
    $('g-rate').value = 8;
    $('g-years').value = 10;
    computeGrow();
  } else if (activeTabId === 'tab-goal') {
    $('goal-target').value = 1000000;
    $('goal-principal').value = 0;
    $('goal-monthly').value = 1000;
    $('goal-rate').value = 8;
    computeGoal();
  } else {
    ['ca','cb'].forEach(p => {
      $(p+'-principal').value = 10000;
      $(p+'-monthly').value = 500;
      $(p+'-rate').value = 8;
      $(p+'-years').value = 10;
    });
    computeCompare();
  }
  triggerKineticFeedback();
  showToast('Values reset to defaults');
}

// ── Email Capture Logic ────────────────────────────────

function triggerEmailCaptureNow() {
  if (ecShown) return;
  if (ecDismissed) return;
  if (localStorage.getItem(EC_STORAGE_KEY)) return;
  const dismissCount = parseInt(localStorage.getItem('cc_dismiss_count') || '0', 10);
  if (dismissCount >= 2) return;

  setTimeout(() => {
    showEmailCapture();
  }, 800);
}

function maybeShowEmailCapture() {
  // Don't show if already shown, dismissed, or previously submitted
  if (ecShown || ecDismissed) return;
  if (localStorage.getItem(EC_STORAGE_KEY)) return;
  const dismissCount = parseInt(localStorage.getItem('cc_dismiss_count') || '0', 10);
  if (dismissCount >= 2) return;

  // Both conditions must be true
  if (ecCalculationRan && ecTimerFired) {
    showEmailCapture();
  }
}

function showEmailCapture() {
  const el = document.getElementById('email-capture');
  if (!el) return;
  el.classList.remove('hidden');
  ecShown = true;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Hide mobile floating pill if the capture form is shown
  hideMobilePill();
}

function dismissEmailCapture() {
  const el = document.getElementById('email-capture');
  if (el) el.classList.add('hidden');
  ecDismissed = true;
  
  // Increment dismissal count for pop-up suppression
  let dismissCount = parseInt(localStorage.getItem('cc_dismiss_count') || '0', 10);
  dismissCount++;
  localStorage.setItem('cc_dismiss_count', dismissCount.toString());
  
  // Hide mobile floating pill on dismissal
  hideMobilePill();
}

function scrollToEmailCapture() {
  const form = document.getElementById('email-capture');
  const pill = document.getElementById('mobile-cta-pill');

  if (form && !form.classList.contains('hidden')) {
    // Form already visible — just scroll to it
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    // Force-show the email form, then scroll to it
    showEmailCapture();
    setTimeout(() => {
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 450); // wait for slide-in animation
  }

  // Hide the pill once tapped
  if (pill) pill.classList.add('hidden');
}

function hideMobilePill() {
  const pill = document.getElementById('mobile-cta-pill');
  if (pill) pill.classList.add('hidden');
}

function initMobilePill() {
  // Mobile only check (<= 640px)
  if (window.innerWidth > 640) return;

  setTimeout(() => {
    // Don't show if email already captured or dismissed >= 2 times
    if (localStorage.getItem(EC_STORAGE_KEY)) return;
    const dismissCount = parseInt(localStorage.getItem('cc_dismiss_count') || '0', 10);
    if (dismissCount >= 2) return;
    
    // Also don't show if the email capture container is already visible
    const ecContainer = document.getElementById('email-capture');
    if (ecContainer && !ecContainer.classList.contains('hidden')) return;

    const pill = document.getElementById('mobile-cta-pill');
    if (pill) {
      pill.classList.remove('hidden');
    }
  }, 4000);
}

function acceptCookies() {
  localStorage.setItem('cc_accepted', '1');
  document.getElementById('cookie-banner').style.display = 'none';
  if (typeof showToast === 'function') showToast('Preferences saved!');
}

// --- Init (single consolidated listener) ---
document.addEventListener('DOMContentLoaded', () => {
  // Bind calculator inputs
  ['g-principal','g-monthly','g-rate','g-years','g-freq','g-inflation'].forEach(id => {
    if ($(id)) $(id).addEventListener('input', () => { computeGrow(); triggerKineticFeedback(); });
  });
  ['goal-target','goal-principal','goal-monthly','goal-rate','goal-freq'].forEach(id => {
    if ($(id)) $(id).addEventListener('input', () => { computeGoal(); triggerKineticFeedback(); });
  });
  ['ca-principal','ca-monthly','ca-rate','ca-years','cb-principal','cb-monthly','cb-rate','cb-years','c-freq'].forEach(id => {
    if ($(id)) $(id).addEventListener('input', () => { computeCompare(); triggerKineticFeedback(); });
  });

  // Mobile Menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      mobileMenuBtn.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });
  }

  // Load from URL if present
  if (typeof loadFromURL === 'function') loadFromURL();
  
  // Set initial currency UI
  setCurrency(currentCurrency);
  
  // Default run
  computeGrow();

  // Cookie banner
  if (!localStorage.getItem('cc_accepted')) {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'flex';
  }

  // Email capture 30-second timer
  setTimeout(() => {
    ecTimerFired = true;
    maybeShowEmailCapture();
  }, 30000);

  // Initialize Mobile CTA Floating Pill
  initMobilePill();
});

// ── CONFIGURATION ─────────────────────────────────────
// Brevo API calls are proxied securely via Netlify Serverless Function
// ─────────────────────────────────────────────────────

async function submitEmailCapture() {
  const input   = document.getElementById('ec-email');
  const btn     = document.getElementById('ec-submit');
  const email   = input.value.trim();

  // ── Validate ──
  if (!isValidEmail(email)) {
    input.classList.add('invalid');
    input.focus();
    setTimeout(() => input.classList.remove('invalid'), 2000);
    return;
  }

  // ── Loading state ──
  btn.disabled    = true;
  const originalText = btn.textContent;
  btn.textContent = 'Sending…';

  try {
    // ── Step 1: Generate the PDF ──
    const pdfBase64 = await generateProjectionPDFForEmail();

    // ── Step 2: Send to serverless proxy (handles both contact + email) ──
    const last       = growData ? growData[growData.length - 1] : null;
    const currency   = getCurrentCurrencySymbol();
    const finalBal   = last ? currency + Math.round(last.balance).toLocaleString('en-ZA') : '';
    const shareURL   = window.location.href;

    const proxyRes = await fetch('/api/send-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:        email,
        pdfBase64:    pdfBase64,
        finalBalance: finalBal,
        shareURL:     shareURL,
      }),
    });

    if (!proxyRes.ok) {
      const err = await proxyRes.json();
      throw new Error(err.error || 'Failed to send email.');
    }

    // ── Step 4: Success state ──
    showECSuccess();

    // ── Step 5: Persist so we don't show the form again ──
    localStorage.setItem(EC_STORAGE_KEY, '1');

    // ── Step 6: Fire GA4 event ──
    if (typeof gtag !== 'undefined') {
      const activeTab = document.querySelector('.tab-btn.active').getAttribute('onclick').match(/'([^']+)'/)[1];
      gtag('event', 'email_capture', {
        method:      'pdf_projection',
        tab_active:  activeTab || 'grow'
      });
    }

  } catch (err) {
    showECError(err.message || 'Something went wrong. Please try again.');
    btn.disabled    = false;
    btn.textContent = originalText;
    console.error('Email capture error:', err);
  }
}

// ── Email validation ───────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Show success / error ───────────────────────────────
function showECSuccess() {
  document.getElementById('ec-form-state').classList.add('hidden');
  document.getElementById('ec-success-state').classList.remove('hidden');
  document.getElementById('ec-error-state').classList.add('hidden');
  hideMobilePill();
}

function showECError(msg) {
  const errEl = document.getElementById('ec-error-msg');
  if (errEl) errEl.textContent = msg;
  document.getElementById('ec-error-state').classList.remove('hidden');
}

// Helper to get currency symbol for current context
function getCurrentCurrencySymbol() {
  return currencies[currentCurrency].symbol;
}

// ── PDF Generation for Email ──────────────────────────
async function generateProjectionPDFForEmail() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageW    = 210;
  const margin   = 16;
  const contentW = pageW - margin * 2;
  let   y        = margin;

  // ── Header ──────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(22, 163, 74); // green
  doc.text('CompoundCalc.co.za', margin, y);

  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128); // muted
  doc.text('Your Investment Projection — generated ' + new Date().toLocaleDateString('en-ZA'), margin, y);

  // ── Divider ──────────────────────────────────────────
  y += 5;
  doc.setDrawColor(229, 231, 235);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  // ── Metric cards (2×2 grid) ──────────────────────────
  const last     = growData ? growData[growData.length - 1] : null;
  const currency = getCurrentCurrencySymbol();

  if (last) {
    const cards = [
      { label: 'Final Balance',       value: currency + Math.round(last.balance).toLocaleString('en-ZA'),       accent: true },
      { label: 'Interest Earned',     value: currency + Math.round(last.interest).toLocaleString('en-ZA'),      accent: false },
      { label: 'Total Contributed',   value: currency + Math.round(last.contributions).toLocaleString('en-ZA'), accent: false },
      { label: 'Return on Investment',value: pct((last.balance - last.contributions) / last.contributions * 100),accent: false },
    ];

    const cardW = (contentW - 6) / 2;
    const cardH = 18;

    cards.forEach((card, i) => {
      const cx = margin + (i % 2) * (cardW + 6);
      const cy = y + Math.floor(i / 2) * (cardH + 4);

      // Card background
      doc.setFillColor(card.accent ? 220 : 249, card.accent ? 252 : 250, card.accent ? 231 : 251);
      doc.roundedRect(cx, cy, cardW, cardH, 2, 2, 'F');

      // Label
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(156, 163, 175);
      doc.text(card.label.toUpperCase(), cx + 4, cy + 5.5);

      // Value
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(card.accent ? 20 : 17, card.accent ? 83 : 24, card.accent ? 45 : 39);
      doc.text(card.value, cx + 4, cy + 13);
    });

    y += cardH * 2 + 8 + 4;
  }

  // ── Chart image ──────────────────────────────────────
  const chartCanvas = document.getElementById('growChart');
  if (chartCanvas) {
    const chartImg = chartCanvas.toDataURL('image/png', 0.9);
    const imgH     = contentW * (chartCanvas.height / chartCanvas.width);
    doc.addImage(chartImg, 'PNG', margin, y, contentW, Math.min(imgH, 70));
    y += Math.min(imgH, 70) + 8;
  }

  // ── Milestone badges ────────────────────────────────
  const badges = document.querySelectorAll('.milestone-badge');
  if (badges.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(17, 24, 39);
    doc.text('Milestones', margin, y);
    y += 5;

    badges.forEach(badge => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(107, 114, 128);
      doc.text('• ' + badge.textContent.trim(), margin + 2, y);
      y += 5;
    });
    y += 4;
  }

  // ── Year-by-year table (first 10 rows) ───────────────
  if (growData && growData.length > 1) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(17, 24, 39);
    doc.text('Year-by-Year Summary', margin, y);
    y += 5;

    const headers = ['Year', 'Balance', 'Contributed', 'Interest'];
    const colW    = contentW / headers.length;

    // Header row
    doc.setFillColor(249, 250, 251);
    doc.rect(margin, y, contentW, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(156, 163, 175);
    headers.forEach((h, i) => doc.text(h, margin + i * colW + 2, y + 4));
    y += 7;

    // Data rows (max 10)
    const rows = growData.slice(1, 11);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    rows.forEach((row, idx) => {
      const bg = idx % 2 === 0 ? [255,255,255] : [249,250,251];
      doc.setFillColor(...bg);
      doc.rect(margin, y, contentW, 5.5, 'F');
      doc.setTextColor(55, 65, 81);

      const cells = [
        'Year ' + row.year,
        currency + Math.round(row.balance).toLocaleString('en-ZA'),
        currency + Math.round(row.contributions).toLocaleString('en-ZA'),
        currency + Math.round(row.interest).toLocaleString('en-ZA'),
      ];
      cells.forEach((c, i) => doc.text(c, margin + i * colW + 2, y + 4));
      y += 5.5;
    });

    if (growData.length > 11) {
      y += 3;
      doc.setFontSize(7);
      doc.setTextColor(156, 163, 175);
      doc.text(`Full ${growData.length - 1}-year breakdown available at compoundcalc.co.za`, margin, y);
    }
  }

  // ── Footer ───────────────────────────────────────────
  const footerY = 287;
  doc.setDrawColor(229, 231, 235);
  doc.line(margin, footerY - 4, pageW - margin, footerY - 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(156, 163, 175);
  doc.text(
    'For informational purposes only. Not financial advice. CompoundCalc is not a registered FSP. | compoundcalc.co.za',
    margin, footerY
  );

  // ── Return as base64 (no download) ───────────────────
  return doc.output('datauristring').split(',')[1];
}

