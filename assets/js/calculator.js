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

// --- Helpers ---
const fmt = n => {
  const c = currencies[currentCurrency];
  return c.symbol + Math.round(n).toLocaleString(c.locale);
};
const pct = n => (Math.round(n * 10) / 10).toFixed(1) + '%';

// Toast System
function showToast(msg) {
  let t = $('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#111827;color:white;padding:10px 20px;border-radius:30px;font-size:0.85rem;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.15);display:none;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.display = 'block';
  t.classList.add('animated');
  setTimeout(() => { t.style.display = 'none'; }, 3000);
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
  
  document.querySelectorAll('.currency-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cur === code);
  });
  
  // Update prefixes in UI
  const symbol = currencies[code].symbol;
  document.querySelectorAll('.input-prefix').forEach(el => {
    if (el.textContent === '$' || el.textContent === 'R' || el.textContent === '£' || el.textContent === '€') {
      el.textContent = symbol;
    }
  });
  
  // Re-run current calculation
  const activeTab = document.querySelector('.tab-btn.active').getAttribute('onclick').match(/'([^']+)'/)[1];
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

  animateValue('g-final', last.balance, true);
  animateValue('g-interest', last.interest, true);
  animateValue('g-contributed', last.contributions, true);
  const roi = last.contributions > 0 ? ((last.balance - last.contributions) / last.contributions * 100) : 0;
  $('g-roi').textContent = pct(roi);

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

  // Sync
  if (typeof updateShareableURL === 'function') updateShareableURL();
  trackCalculation('grow', { p: P, y: years, r: rate });
}

function renderGrowChart(data, P, useInflation, inflationRate) {
  const labels = data.map(r => r.year === 0 ? 'Start' : `Yr ${r.year}`);
  const principalArr = data.map(() => Math.round(P));
  const contribArr = data.map(r => Math.round(Math.max(0, r.contributions - P)));
  const interestArr = data.map(r => Math.round(r.interest));
  const realArr = useInflation ? data.map(r => Math.round(realValue(r.balance, inflationRate, r.year))) : null;

  const datasets = [
    { label: 'Interest', data: interestArr, backgroundColor: '#16a34a', stack: 's' },
    { label: 'Contributions', data: contribArr, backgroundColor: '#86efac', stack: 's' },
    { label: 'Principal', data: principalArr, backgroundColor: '#d1d5db', stack: 's' }
  ];
  if (realArr) datasets.push({ label: 'Real value', data: realArr, backgroundColor: 'rgba(249,115,22,0.15)', borderColor: '#f97316', borderWidth: 2, type: 'line', stack: undefined, tension: 0.4, pointRadius: 0 });

  if (growChart) {
    growChart.data.labels = labels;
    growChart.data.datasets = datasets;
    growChart.update('active');
  } else {
    const ctx = $('growChart');
    if (ctx) {
      growChart = new Chart(ctx, { type: 'bar', data: { labels, datasets }, options: chartOpts() });
    }
  }
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

  if (typeof updateShareableURL === 'function') updateShareableURL();
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

  if (typeof updateShareableURL === 'function') updateShareableURL();
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
  const start = 0;
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

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  // Bind inputs
  ['g-principal','g-monthly','g-rate','g-years','g-freq','g-inflation'].forEach(id => {
    if ($(id)) $(id).addEventListener('input', computeGrow);
  });
  ['goal-target','goal-principal','goal-monthly','goal-rate','goal-freq'].forEach(id => {
    if ($(id)) $(id).addEventListener('input', computeGoal);
  });
  ['ca-principal','ca-monthly','ca-rate','ca-years','cb-principal','cb-monthly','cb-rate','cb-years','c-freq'].forEach(id => {
    if ($(id)) $(id).addEventListener('input', computeCompare);
  });

  // Load from URL if present
  if (typeof loadFromURL === 'function') loadFromURL();
  
  // Set initial currency UI
  setCurrency(currentCurrency);
  
  // Default run
  computeGrow();
});

function acceptCookies() {
  localStorage.setItem('cc_accepted', '1');
  document.getElementById('cookie-banner').style.display = 'none';
  if (typeof showToast === 'function') showToast('Preferences saved!');
}
if (!localStorage.getItem('cc_accepted')) {
  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'flex';
  });
}
