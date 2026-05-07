/**
 * share.js - URL parameter encoding/decoding for CompoundCalc.co.za
 */

function updateShareableURL() {
  const activeTab = document.querySelector('.tab-btn.active').getAttribute('onclick').match(/'([^']+)'/)[1];
  
  let params = new URLSearchParams();
  params.set('tab', activeTab);

  if (activeTab === 'grow') {
    params.set('p', document.getElementById('g-principal').value);
    params.set('m', document.getElementById('g-monthly').value);
    params.set('r', document.getElementById('g-rate').value);
    params.set('y', document.getElementById('g-years').value);
    params.set('n', document.getElementById('g-freq').value);
    params.set('inf', document.getElementById('g-inflation-toggle').checked ? document.getElementById('g-inflation').value : '0');
  } else if (activeTab === 'goal') {
    params.set('t', document.getElementById('goal-target').value);
    params.set('p', document.getElementById('goal-principal').value);
    params.set('m', document.getElementById('goal-monthly').value);
    params.set('r', document.getElementById('goal-rate').value);
    params.set('n', document.getElementById('goal-freq').value);
  } else if (activeTab === 'compare') {
    params.set('ap', document.getElementById('ca-principal').value);
    params.set('am', document.getElementById('ca-monthly').value);
    params.set('ar', document.getElementById('ca-rate').value);
    params.set('ay', document.getElementById('ca-years').value);
    params.set('bp', document.getElementById('cb-principal').value);
    params.set('bm', document.getElementById('cb-monthly').value);
    params.set('br', document.getElementById('cb-rate').value);
    params.set('by', document.getElementById('cb-years').value);
    params.set('n', document.getElementById('c-freq').value);
  }

  const cur = localStorage.getItem('cc_currency') || 'ZAR';
  params.set('c', cur);

  window.history.replaceState({}, '', `?${params.toString()}`);
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('tab')) return;

  const tab = params.get('tab');
  
  if (tab === 'grow') {
    if (params.has('p')) document.getElementById('g-principal').value = params.get('p');
    if (params.has('m')) document.getElementById('g-monthly').value = params.get('m');
    if (params.has('r')) document.getElementById('g-rate').value = params.get('r');
    if (params.has('y')) document.getElementById('g-years').value = params.get('y');
    if (params.has('n')) document.getElementById('g-freq').value = params.get('n');
    if (params.has('inf')) {
      const inf = params.get('inf');
      if (inf !== '0') {
        document.getElementById('g-inflation-toggle').checked = true;
        document.getElementById('g-inflation').value = inf;
        document.getElementById('inflation-sub').classList.add('visible');
      }
    }
  } else if (tab === 'goal') {
    if (params.has('t')) document.getElementById('goal-target').value = params.get('t');
    if (params.has('p')) document.getElementById('goal-principal').value = params.get('p');
    if (params.has('m')) document.getElementById('goal-monthly').value = params.get('m');
    if (params.has('r')) document.getElementById('goal-rate').value = params.get('r');
    if (params.has('n')) document.getElementById('goal-freq').value = params.get('n');
  } else if (tab === 'compare') {
    if (params.has('ap')) document.getElementById('ca-principal').value = params.get('ap');
    if (params.has('am')) document.getElementById('ca-monthly').value = params.get('am');
    if (params.has('ar')) document.getElementById('ca-rate').value = params.get('ar');
    if (params.has('ay')) document.getElementById('ca-years').value = params.get('ay');
    if (params.has('bp')) document.getElementById('cb-principal').value = params.get('bp');
    if (params.has('bm')) document.getElementById('cb-monthly').value = params.get('bm');
    if (params.has('br')) document.getElementById('cb-rate').value = params.get('br');
    if (params.has('by')) document.getElementById('cb-years').value = params.get('by');
    if (params.has('n')) document.getElementById('c-freq').value = params.get('n');
  }

  if (params.has('c')) {
    const cur = params.get('c');
    setCurrency(cur);
  }

  // Switch tab after loading values
  switchTab(tab);
}

function copyShareLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const btn = document.querySelector('.btn-share');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Copied!';
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2000);
    
    // GA4 event
    if (typeof gtag === 'function') {
      gtag('event', 'share_url_copied');
    }
  });
}
