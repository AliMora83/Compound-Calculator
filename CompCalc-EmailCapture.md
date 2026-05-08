# CompoundCalc — Email Capture Implementation
**Addendum to:** `CompCalc-Setup.md`
**Platform:** Brevo (formerly Sendinblue)
**Trigger:** Inline, below EasyEquities CTA — fires after 30s on page + at least 1 calculation run
**Lead magnet:** PDF of the user's exact projection (auto-generated, already built)

---

## Overview

When a user has been on the page for 30+ seconds AND has run at least one calculation, an inline email capture form slides in below the EasyEquities CTA. The offer is specific and tangible: *"We'll email you this projection as a PDF."* On submit, two things happen simultaneously:
1. The email is added to a Brevo contact list via API
2. The PDF is generated client-side and sent as a base64 attachment via the Brevo Transactional Email API

No backend server required. Everything runs in the browser and talks directly to Brevo's API.

---

## Part 1 — Brevo Account Setup (Ali does this, ~10 minutes)

### 1.1 Create the Account
1. Go to `https://app.brevo.com` → Sign up with `ali@openmindi.co.za`
2. Verify email → complete onboarding (select "Small Business", skip the paid plan)
3. Free tier includes: 300 emails/day, unlimited contacts, automation sequences — sufficient for Phase 1

### 1.2 Get the API Key
1. Top-right menu → **My Account → SMTP & API → API Keys**
2. Click **Generate a new API key** → name it `CompoundCalc Production`
3. Copy the key — format: `xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
4. **This is the only credential Antigravity needs.** Share it securely (not over email — use a password manager share or WhatsApp).

> ⚠️ **Security note for Antigravity:** This API key will be exposed in client-side JavaScript. That is acceptable here because we are only using it for two restricted operations: adding a contact and sending a transactional email. Create the key with **only** these permissions enabled: `contacts.write` and `smtp.email`. Do not enable read or delete permissions.

### 1.3 Create the Contact List
1. In Brevo → **Contacts → Lists → Create a list**
2. Name it: `CompoundCalc Subscribers`
3. Note the **List ID** (a number, e.g. `4`) — Antigravity needs this

### 1.4 Create a Contact Attribute
1. **Contacts → Settings → Contact Attributes → Add new attribute**
2. Add: `PROJECTION_URL` (type: Text) — this stores the shareable URL of the user's calculation so the welcome email can link back to their exact scenario

### 1.5 Verify the Sending Domain
1. **Senders & IP → Domains → Add a domain** → enter `compoundcalc.co.za`
2. Brevo will provide DNS records (TXT + CNAME) to add in Hostinger
3. In Hostinger → **DNS / Nameservers → Advanced DNS** → add the records Brevo provides
4. Back in Brevo → click **Verify** (can take up to 24hrs to propagate)
5. Set the sender name: `CompoundCalc` / sender email: `hello@compoundcalc.co.za`

---

## Part 2 — The Form UI

### 2.1 HTML
Add this block immediately after the `#affiliate-cta` div in the calculator HTML. It starts hidden and slides in via JavaScript trigger.

```html
<!-- ══════════════════════════════════════════════════
     EMAIL CAPTURE — slides in after trigger conditions met
     Position: below #affiliate-cta, above milestone badges
     ══════════════════════════════════════════════════ -->
<div id="email-capture" class="email-capture hidden" aria-live="polite">

  <div class="email-capture-inner">

    <!-- Left: copy -->
    <div class="email-capture-copy">
      <div class="email-capture-icon">📩</div>
      <div>
        <p class="email-capture-headline">Want to save this projection?</p>
        <p class="email-capture-sub">
          We'll send your full results as a PDF — chart, year-by-year breakdown,
          and final balance. Free, no spam.
        </p>
      </div>
    </div>

    <!-- Right: form -->
    <div class="email-capture-form-wrap">
      <div id="ec-form-state">
        <div class="ec-input-row">
          <input
            type="email"
            id="ec-email"
            class="ec-input"
            placeholder="your@email.com"
            autocomplete="email"
            inputmode="email"
            aria-label="Email address"
          />
          <button
            id="ec-submit"
            class="ec-btn"
            onclick="submitEmailCapture()"
            type="button"
          >
            Send my PDF
          </button>
        </div>
        <p class="ec-disclaimer">
          By submitting you agree to our
          <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
          Unsubscribe anytime.
        </p>
      </div>

      <!-- Success state — shown after submit -->
      <div id="ec-success-state" class="ec-success hidden">
        <span class="ec-success-icon">✅</span>
        <div>
          <p class="ec-success-headline">On its way!</p>
          <p class="ec-success-sub">Check your inbox in the next few minutes.</p>
        </div>
      </div>

      <!-- Error state -->
      <div id="ec-error-state" class="ec-error hidden">
        <span>⚠️</span>
        <p id="ec-error-msg">Something went wrong — please try again.</p>
      </div>
    </div>

    <!-- Dismiss -->
    <button
      class="ec-dismiss"
      onclick="dismissEmailCapture()"
      aria-label="Dismiss"
      type="button"
    >✕</button>

  </div>
</div>
```

---

### 2.2 CSS
Add to `styles.css` (or inside a `<style>` block if still single-file):

```css
/* ── Email Capture ─────────────────────────────────────── */
.email-capture {
  border: 1.5px dashed var(--green-muted);
  background: linear-gradient(135deg, #f0fdf4 0%, #f9fafb 100%);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  margin-top: 1rem;
  position: relative;

  /* Slide-in animation */
  animation: ec-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  transform-origin: top center;
}

@keyframes ec-slide-in {
  from {
    opacity: 0;
    transform: translateY(-12px) scaleY(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

.email-capture.hidden {
  display: none;
}

.email-capture-inner {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.email-capture-copy {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 1;
  min-width: 220px;
}

.email-capture-icon {
  font-size: 1.4rem;
  line-height: 1;
  margin-top: 2px;
}

.email-capture-headline {
  font-size: 0.925rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 3px;
}

.email-capture-sub {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.email-capture-form-wrap {
  flex: 1;
  min-width: 260px;
}

.ec-input-row {
  display: flex;
  gap: 8px;
}

.ec-input {
  flex: 1;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 9px 12px;
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--text);
  background: var(--bg);
  outline: none;
  transition: border-color 0.15s;
  min-width: 0;
}

.ec-input:focus {
  border-color: var(--border-focus);
}

.ec-input.invalid {
  border-color: #ef4444;
}

.ec-btn {
  padding: 9px 16px;
  background: var(--green);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.15s, opacity 0.15s;
}

.ec-btn:hover {
  background: #15803d;
}

.ec-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ec-disclaimer {
  font-size: 0.72rem;
  color: var(--text-faint);
  margin-top: 6px;
  line-height: 1.4;
}

.ec-disclaimer a {
  color: var(--text-muted);
  text-decoration: underline;
}

/* Success / Error states */
.ec-success,
.ec-error {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
}

.ec-success.hidden,
.ec-error.hidden {
  display: none;
}

.ec-success-icon {
  font-size: 1.4rem;
}

.ec-success-headline {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--green);
}

.ec-success-sub {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.ec-error {
  color: #b91c1c;
  font-size: 0.82rem;
}

/* Dismiss button */
.ec-dismiss {
  position: absolute;
  top: 10px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--text-faint);
  padding: 4px;
  line-height: 1;
  transition: color 0.15s;
}

.ec-dismiss:hover {
  color: var(--text-muted);
}

/* Mobile */
@media (max-width: 600px) {
  .email-capture-inner {
    flex-direction: column;
    gap: 1rem;
  }

  .email-capture-form-wrap {
    width: 100%;
  }

  .ec-input-row {
    flex-direction: column;
  }

  .ec-btn {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
  }
}
```

---

## Part 3 — Trigger Logic

### 3.1 State Tracking
Add these variables at the top of `calculator.js` alongside the existing state variables:

```javascript
// ── Email capture state ────────────────────────────────
const EC_STORAGE_KEY  = 'cc_email_captured'; // localStorage key
let ecCalculationRan  = false;               // true after first calc runs
let ecTimerFired      = false;               // true after 30s on page
let ecShown           = false;               // true once form has been shown
let ecDismissed       = false;               // true if user dismissed it
```

### 3.2 Modified Calculation Function
In `computeGrow()` (and `computeGoal()`, `computeCompare()`), add a single line at the very end of each function:

```javascript
function computeGrow() {
  // ... all existing calculation code ...

  // ── Email capture trigger ──
  ecCalculationRan = true;
  maybeShowEmailCapture();
}
```

Add the same call to `computeGoal()` and `computeCompare()`.

### 3.3 Trigger Gate Function

```javascript
function maybeShowEmailCapture() {
  // Don't show if:
  // - already shown this session
  // - user dismissed it
  // - user already submitted (stored in localStorage)
  if (ecShown || ecDismissed) return;
  if (localStorage.getItem(EC_STORAGE_KEY)) return;

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

  // Smooth scroll to bring it into view (don't force-jump)
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function dismissEmailCapture() {
  const el = document.getElementById('email-capture');
  if (el) el.classList.add('hidden');
  ecDismissed = true;
  // Don't set localStorage — show again on next visit
}

// 30-second timer — starts on page load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    ecTimerFired = true;
    maybeShowEmailCapture();
  }, 30000); // 30,000ms = 30 seconds
});
```

---

## Part 4 — Submission Handler

This is the core function. On submit it:
1. Validates the email
2. Generates the PDF using the existing `jsPDF` setup
3. Converts the PDF to base64
4. Sends two simultaneous Brevo API calls (add contact + send email)

```javascript
// ── CONFIGURATION — fill in before deploying ──────────
const BREVO_API_KEY   = 'xkeysib-Key'; // from Ali
const BREVO_LIST_ID   = 4;          // replace with actual list ID from Brevo
const BREVO_SENDER    = { name: 'CompoundCalc', email: 'ali.mora@namka.cloud' };
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
  btn.textContent = 'Sending…';

  try {
    // ── Step 1: Generate the PDF ──
    const pdfBase64 = await generateProjectionPDF();

    // ── Step 2: Add contact to Brevo list ──
    await addBrevoContact(email);

    // ── Step 3: Send the PDF via Brevo transactional email ──
    await sendBrevoEmail(email, pdfBase64);

    // ── Step 4: Success state ──
    showECSuccess();

    // ── Step 5: Persist so we don't show the form again ──
    localStorage.setItem(EC_STORAGE_KEY, '1');

    // ── Step 6: Fire GA4 event ──
    if (typeof gtag !== 'undefined') {
      gtag('event', 'email_capture', {
        method:      'pdf_projection',
        tab_active:  activeTab || 'grow'
      });
    }

  } catch (err) {
    showECError(err.message || 'Something went wrong. Please try again.');
    btn.disabled    = false;
    btn.textContent = 'Send my PDF';
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
}

function showECError(msg) {
  document.getElementById('ec-error-msg').textContent = msg;
  document.getElementById('ec-error-state').classList.remove('hidden');
}
```

---

## Part 5 — PDF Generation for Email

The existing `generateProjectionPDF()` function produces a download. For email delivery we need the same output as a **base64 string** instead of a file download. Add this variant:

```javascript
async function generateProjectionPDF() {
  // Uses jsPDF (already loaded) and html2canvas (already loaded)
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
  const currency = getCurrentCurrencySymbol(); // returns 'R', '$', '£', '€'

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
```

---

## Part 6 — Brevo API Calls

### 6.1 Add Contact to List

```javascript
async function addBrevoContact(email) {
  const shareableURL = window.location.href; // includes current calc params

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key':      BREVO_API_KEY,
      'Content-Type': 'application/json',
      'Accept':       'application/json',
    },
    body: JSON.stringify({
      email:          email,
      listIds:        [BREVO_LIST_ID],
      updateEnabled:  true, // silently updates if contact already exists
      attributes: {
        PROJECTION_URL: shareableURL,
        SOURCE:         'CompoundCalc Calculator',
      }
    })
  });

  // 201 = created, 204 = updated (existing contact) — both are success
  if (response.status !== 201 && response.status !== 204) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to save your email.');
  }
}
```

### 6.2 Send the PDF via Transactional Email

```javascript
async function sendBrevoEmail(email, pdfBase64) {
  // Pull the user's final balance for personalising the subject line
  const last        = growData ? growData[growData.length - 1] : null;
  const currency    = getCurrentCurrencySymbol();
  const finalBal    = last ? currency + Math.round(last.balance).toLocaleString('en-ZA') : 'your projection';
  const shareURL    = window.location.href;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key':      BREVO_API_KEY,
      'Content-Type': 'application/json',
      'Accept':       'application/json',
    },
    body: JSON.stringify({
      sender:  BREVO_SENDER,
      to: [{ email: email }],

      subject: `Your projection: ${finalBal} — CompoundCalc`,

      htmlContent: buildWelcomeEmailHTML(finalBal, shareURL),

      attachment: [{
        content: pdfBase64,
        name:    'compoundcalc-projection.pdf',
      }]
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to send the email.');
  }
}
```

---

## Part 7 — Welcome Email HTML

This is the HTML body of the transactional email. Clean, minimal, mobile-first, on-brand.

```javascript
function buildWelcomeEmailHTML(finalBalance, shareURL) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your CompoundCalc Projection</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0"
               style="max-width:560px;background:#ffffff;border-radius:12px;
                      border:1px solid #e5e7eb;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#16a34a;padding:24px 32px;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;
                        letter-spacing:-0.02em;">CompoundCalc</p>
              <p style="margin:4px 0 0;font-size:13px;color:#bbf7d0;">
                compoundcalc.co.za
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <p style="margin:0 0 8px;font-size:22px;font-weight:700;
                        color:#111827;letter-spacing:-0.02em;">
                Your projection is attached 📎
              </p>

              <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
                Based on your inputs, your investment could grow to
                <strong style="color:#16a34a;">${finalBalance}</strong>.
                We've attached a full PDF with your chart, year-by-year breakdown,
                and milestone markers.
              </p>

              <!-- CTA Box -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f0fdf4;border:1px solid #86efac;
                            border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:14px;font-weight:600;
                              color:#14532d;">
                      Your saved projection
                    </p>
                    <p style="margin:0 0 16px;font-size:13px;color:#166534;
                              line-height:1.5;">
                      Your exact inputs are saved in the link below.
                      Open it anytime to continue adjusting your numbers.
                    </p>
                    <a href="${shareURL}"
                       style="display:inline-block;background:#16a34a;color:#ffffff;
                              padding:10px 20px;border-radius:6px;font-size:14px;
                              font-weight:500;text-decoration:none;">
                      Open my projection →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- 3 tips -->
              <p style="margin:0 0 16px;font-size:15px;font-weight:600;
                        color:#111827;">
                3 things that move the needle most
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;
                             vertical-align:top;">
                    <span style="font-size:18px;">⏰</span>
                    <span style="font-size:14px;color:#374151;margin-left:10px;">
                      <strong>Start earlier.</strong> Every year you wait costs more
                      than a year's worth of contributions.
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;
                             vertical-align:top;">
                    <span style="font-size:18px;">📈</span>
                    <span style="font-size:14px;color:#374151;margin-left:10px;">
                      <strong>Rate matters.</strong> A 3% difference in return
                      can double your final balance over 20 years.
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;vertical-align:top;">
                    <span style="font-size:18px;">🔁</span>
                    <span style="font-size:14px;color:#374151;margin-left:10px;">
                      <strong>Automate it.</strong> Set a monthly debit order
                      and remove the decision from your hands entirely.
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Secondary CTA -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f9fafb;border:1px solid #e5e7eb;
                            border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:18px 24px;">
                    <p style="margin:0 0 4px;font-size:14px;font-weight:600;
                              color:#111827;">
                      Ready to start investing?
                    </p>
                    <p style="margin:0 0 12px;font-size:13px;color:#6b7280;">
                      EasyEquities lets you start with R50, no minimum balance,
                      TFSA included. It's where many South Africans start.
                    </p>
                    <a href="EASYEQUITIES_AFFILIATE_LINK"
                       style="font-size:13px;color:#16a34a;font-weight:500;">
                      Open a free EasyEquities account →
                    </a>
                    <p style="margin:8px 0 0;font-size:11px;color:#9ca3af;">
                      Affiliate disclosure: we may earn a small commission if
                      you open an account. This doesn't affect our projections.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background:#f9fafb;
                       border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 6px;font-size:12px;color:#9ca3af;line-height:1.5;">
                You're receiving this because you requested a PDF projection at
                compoundcalc.co.za.<br>
                <a href="UNSUBSCRIBE_LINK"
                   style="color:#9ca3af;">Unsubscribe</a> ·
                <a href="https://compoundcalc.co.za/privacy-policy"
                   style="color:#9ca3af;">Privacy Policy</a>
              </p>
              <p style="margin:0;font-size:11px;color:#d1d5db;">
                CompoundCalc is for informational purposes only and does not
                constitute financial advice.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
```

> **Before deploying:** Replace `EASYEQUITIES_AFFILIATE_LINK` with Ali's actual affiliate URL. Replace `UNSUBSCRIBE_LINK` with the Brevo unsubscribe token — in Brevo's template editor this is `{{ unsubscribe }}`. Since this is sent via the raw API (not a template), add a plain-text footer note and handle unsubscribes via Brevo's contact management.

---

## Part 8 — Brevo Automation Sequence

Set this up in **Brevo → Automations → Create a workflow** after the contact list is live.

### Sequence: "CompoundCalc Welcome Series"
**Trigger:** Contact added to list `CompoundCalc Subscribers`

```
[Trigger: Contact added to list]
        │
        ▼
[Wait: 0 minutes]
[Email 1: "Your projection is attached"] ← this is the transactional email above
        │
        ▼
[Wait: 3 days]
[Email 2: "The cost of waiting one year"]
        │
        ▼
[Wait: 4 days]
[Email 3: "How to actually beat inflation in SA"]
        │
        ▼
[Add to: Monthly Newsletter list]
```

**Note:** Email 1 is sent via the transactional API (Part 6 above) at the moment of form submit — it's not part of the automation sequence. The automation triggers from day 3 onward.

---

### Email 2 — Day 3: "The cost of waiting one year"

**Subject:** `Waiting one year costs more than you think`  
**Preview text:** `Here's the maths that changed how I think about time`

**Body copy:**

> Here's a quick thought experiment.
>
> Take your projection — the one attached to your first email. Now imagine you had started exactly one year earlier, with the same monthly contribution, the same interest rate.
>
> For most people, that one extra year adds between 8–15% to the final balance. Not because of anything complicated. Just because compound interest had one more year to run.
>
> The flip side is the uncomfortable part: every month you delay is a month of growth that never happens. It doesn't catch up later. It's just gone.
>
> **Go update your projection →** [Open my projection]({{ attributes.PROJECTION_URL }})
>
> Try adjusting the years slider up by one year. That's the number.
>
> — CompoundCalc

---

### Email 3 — Day 7: "How to actually beat inflation in SA"

**Subject:** `Your savings account is quietly losing`  
**Preview text:** `SA inflation vs your interest rate — check the gap`

**Body copy:**

> If your savings account is paying you 5% interest and SA inflation is running at 5.5%, you are losing purchasing power every month. Your balance goes up. Your money buys less.
>
> The fix is straightforward — you need your return to consistently beat inflation. Over time, most broad-market ETFs have done this. A simple Satrix 40 or MSCI World ETF tracked significantly above inflation over any 10-year period in recent history.
>
> **How to check yours:**
>
> 1. Go to your projection at compoundcalc.co.za
> 2. Turn on the **Inflation Adjustment** toggle in the inputs panel
> 3. Type in the current inflation rate (check SARB's site for the latest)
> 4. See what your balance is actually worth in today's money
>
> It's a bit sobering. But better to know.
>
> [Open the inflation toggle →]({{ attributes.PROJECTION_URL }})
>
> — CompoundCalc

---

## Part 9 — Checklist for Antigravity

- [ ] Brevo API key received from Ali and added to `calculator.js` as `BREVO_API_KEY`
- [ ] Brevo List ID confirmed and set as `BREVO_LIST_ID`
- [ ] `compoundcalc.co.za` domain verified in Brevo (DNS records added in Hostinger)
- [ ] `PROJECTION_URL` contact attribute created in Brevo
- [ ] HTML form added below `#affiliate-cta` in calculator
- [ ] CSS added to `styles.css`
- [ ] Trigger logic added to `calculator.js` (state variables, `maybeShowEmailCapture`, 30s timer)
- [ ] `submitEmailCapture()` function added and wired to submit button
- [ ] `generateProjectionPDF()` updated to return base64 string (not trigger download)
- [ ] `addBrevoContact()` and `sendBrevoEmail()` functions added
- [ ] `buildWelcomeEmailHTML()` function added with affiliate link replaced
- [ ] Welcome email tested end-to-end: form submit → Brevo contact created → PDF email received
- [ ] PDF attachment opens correctly and renders the chart cleanly
- [ ] Success / error states display correctly
- [ ] Dismiss button hides the form without setting localStorage
- [ ] Form does not re-appear if `cc_email_captured` is set in localStorage
- [ ] GA4 `email_capture` event fires on successful submit (verify in GA4 DebugView)
- [ ] Brevo automation sequence set up: Email 2 (day 3) and Email 3 (day 7) created
- [ ] `UNSUBSCRIBE_LINK` handled — either via Brevo template token or manual footer link
- [ ] Tested on mobile: form layout stacks correctly, button is full-width
- [ ] Tested with an invalid email: shows validation state without submitting

---

*Addendum version: 1.0*  
*Parent document: CompCalc-Setup.md*  
*Questions: ali@openmindi.co.za / +27 62 370 5952*
