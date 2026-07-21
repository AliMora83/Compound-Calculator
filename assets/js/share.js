/**
 * share.js - URL parameter encoding/decoding for CompoundCalc.co.za
 */

function getShareableURL() {
  const activePanel = document.querySelector('.tab-panel.active');
  const activeTab = activePanel ? activePanel.id.replace('tab-', '') : 'grow';

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
  } else if (activeTab === 'retire') {
    params.set('age', document.getElementById('ret-current-age').value);
    params.set('rage', document.getElementById('ret-retirement-age').value);
    params.set('cs', document.getElementById('ret-current-savings').value);
    params.set('mc', document.getElementById('ret-monthly-contribution').value);
    params.set('ar', document.getElementById('ret-annual-return').value);
    params.set('me', document.getElementById('ret-monthly-expenses').value);
    params.set('ir', document.getElementById('ret-inflation-rate').value);
    params.set('le', document.getElementById('ret-life-expectancy').value);
    params.set('pr', document.getElementById('ret-post-return').value);
  }

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

// Previously automatic, now explicitly called if needed or removed from auto-listeners
function updateShareableURL() {
  // We no longer update the history state automatically to keep the URL clean
  // window.history.replaceState({}, '', `?${params.toString()}`);
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
  } else if (tab === 'retire') {
    if (params.has('age')) document.getElementById('ret-current-age').value = params.get('age');
    if (params.has('rage')) document.getElementById('ret-retirement-age').value = params.get('rage');
    if (params.has('cs')) document.getElementById('ret-current-savings').value = params.get('cs');
    if (params.has('mc')) document.getElementById('ret-monthly-contribution').value = params.get('mc');
    if (params.has('ar')) document.getElementById('ret-annual-return').value = params.get('ar');
    if (params.has('me')) document.getElementById('ret-monthly-expenses').value = params.get('me');
    if (params.has('ir')) document.getElementById('ret-inflation-rate').value = params.get('ir');
    if (params.has('le')) document.getElementById('ret-life-expectancy').value = params.get('le');
    if (params.has('pr')) document.getElementById('ret-post-return').value = params.get('pr');
  }

  // Legacy 'c' currency param in old shared URLs is deliberately ignored (ZAR-only).

  // Switch tab after loading values
  if (typeof switchTab === 'function') switchTab(tab);
}

function copyShareLink() {
  const shareableURL = getShareableURL();
  
  navigator.clipboard.writeText(shareableURL).then(() => {
    const btns = document.querySelectorAll('.btn-share');
    btns.forEach(btn => {
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>✅ Copied!</span>';
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    });
    
    if (typeof showToast === 'function') showToast('Link copied to clipboard!');

    // GA4 event
    if (typeof gtag === 'function') {
      gtag('event', 'share_url_copied');
    }
  }).catch(err => {
    console.error('Failed to copy link: ', err);
  });
}
