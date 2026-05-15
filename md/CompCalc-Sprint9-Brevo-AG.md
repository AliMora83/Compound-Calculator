# CompoundCalc — Sprint 9: Brevo API Security (Netlify Serverless Proxy)
**For:** Antigravity  
**Prepared by:** Ali Mora  
**Priority:** 🔴 High — API key is currently exposed in client-side JS  
**Date:** May 2026

---

## The Problem

`calculator.js` currently makes Brevo API calls directly from the browser with the API key hardcoded in the JavaScript source:

```javascript
const BREVO_API_KEY = 'xkeysib-...'; // ← visible to anyone who views source
```

Anyone can open DevTools → Sources, copy this key, and use it to send unlimited emails from your Brevo account or scrape your contact list. This needs to be fixed before traffic scales.

## The Solution

Move the Brevo API calls to a **Netlify serverless function**. The browser calls your own Netlify endpoint (`/api/send-pdf`). The serverless function holds the API key securely as a Netlify environment variable and proxies the request to Brevo. The key never reaches the browser.

**Before:**
```
Browser → Brevo API (key exposed in JS)
```

**After:**
```
Browser → Netlify Function (/api/send-pdf) → Brevo API (key in env var, never in browser)
```

---

## Part 1 — Set the Environment Variable in Netlify

Do this before writing any code.

1. Log in to `https://app.netlify.com` → open the CompoundCalc site
2. Go to **Site configuration → Environment variables → Add variable**
3. Add:
   - **Key:** `BREVO_API_KEY`
   - **Value:** *(the full `xkeysib-...` string currently in `calculator.js`)*
4. Click **Save**
5. Also add a second variable for the List ID (cleaner than hardcoding):
   - **Key:** `BREVO_LIST_ID`
   - **Value:** `4` *(or the actual list ID — check Brevo if unsure)*

> ⚠️ **Ali:** After AG sets the environment variable, delete the hardcoded key from `calculator.js` and rotate the Brevo API key (generate a new one in Brevo → SMTP & API → API Keys). The old key will be in Git history — rotating it ensures the exposed key is dead.

---

## Part 2 — Create the Netlify Functions Folder

Netlify serverless functions live in a `/netlify/functions/` folder at the repo root.

```bash
mkdir -p netlify/functions
```

The repo structure addition:
```
CompCalc/
├── netlify/
│   └── functions/
│       └── send-pdf.js    ← new file (created below)
├── netlify.toml           ← new file (created below)
├── index.html
...
```

---

## Part 3 — Create `netlify.toml`

If a `netlify.toml` doesn't already exist at the repo root, create it. If it does exist, add the `[functions]` block.

```toml
# netlify.toml

[build]
  publish = "."

[functions]
  directory = "netlify/functions"

# Redirect /api/* to the functions
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

> The redirect rule means `calculator.js` can call `/api/send-pdf` rather than the verbose `/.netlify/functions/send-pdf` path.

---

## Part 4 — Create `netlify/functions/send-pdf.js`

This is the serverless function. It receives a POST request from the browser with the email address and PDF base64 string, then calls Brevo's API using the server-side environment variable.

```javascript
// netlify/functions/send-pdf.js
// Proxies Brevo API calls for:
//   1. Adding a contact to the CompoundCalc Subscribers list
//   2. Sending the PDF projection email

exports.handler = async function (event) {
  // ── Only allow POST ──────────────────────────────────
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // ── CORS headers (allow requests from our domain only) ──
  const headers = {
    'Access-Control-Allow-Origin': 'https://compoundcalc.co.za',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // ── Parse the request body ───────────────────────────
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { email, pdfBase64, finalBalance, shareURL } = body;

  // ── Validate required fields ─────────────────────────
  if (!email || !pdfBase64) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'email and pdfBase64 are required' }),
    };
  }

  // ── Read credentials from environment variables ──────
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '4', 10);

  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY environment variable is not set');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  const brevoHeaders = {
    'api-key': BREVO_API_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // ── Step 1: Add contact to Brevo list ────────────────
  try {
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: brevoHeaders,
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
        attributes: {
          PROJECTION_URL: shareURL || '',
          SOURCE: 'CompoundCalc Calculator',
        },
      }),
    });

    // 201 = created, 204 = updated existing contact — both are success
    if (contactRes.status !== 201 && contactRes.status !== 204) {
      const err = await contactRes.json();
      console.error('Brevo contact error:', err);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: err.message || 'Failed to save contact' }),
      };
    }
  } catch (err) {
    console.error('Brevo contact fetch error:', err);
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Contact API unreachable' }) };
  }

  // ── Step 2: Send the PDF email ────────────────────────
  const senderName  = 'CompoundCalc';
  const senderEmail = 'hello@compoundcalc.co.za';
  const subject     = `Your projection: ${finalBalance || 'ready'} — CompoundCalc`;

  const htmlBody = buildEmailHTML(finalBalance, shareURL);

  try {
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: brevoHeaders,
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email }],
        subject,
        htmlContent: htmlBody,
        attachment: [{
          content: pdfBase64,
          name: 'compoundcalc-projection.pdf',
        }],
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.json();
      console.error('Brevo email error:', err);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: err.message || 'Failed to send email' }),
      };
    }
  } catch (err) {
    console.error('Brevo email fetch error:', err);
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Email API unreachable' }) };
  }

  // ── Success ───────────────────────────────────────────
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ success: true }),
  };
};

// ── Email HTML builder ────────────────────────────────
// Duplicated from calculator.js so the server renders it
// (the client no longer needs to send the full HTML body)
function buildEmailHTML(finalBalance, shareURL) {
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
          <tr>
            <td style="background:#16a34a;padding:24px 32px;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">CompoundCalc</p>
              <p style="margin:4px 0 0;font-size:13px;color:#bbf7d0;">compoundcalc.co.za</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">
                Your projection is attached 📎
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
                Based on your inputs, your investment could grow to
                <strong style="color:#16a34a;">${finalBalance || 'a significant amount'}</strong>.
                Your full PDF is attached — chart, year-by-year breakdown, and milestone markers.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#14532d;">Your saved projection</p>
                    <p style="margin:0 0 16px;font-size:13px;color:#166534;line-height:1.5;">
                      Your exact inputs are saved in this link. Open it anytime to adjust your numbers.
                    </p>
                    <a href="${shareURL || 'https://compoundcalc.co.za'}"
                       style="display:inline-block;background:#16a34a;color:#ffffff;
                              padding:10px 20px;border-radius:6px;font-size:14px;
                              font-weight:500;text-decoration:none;">
                      Open my projection →
                    </a>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:28px;">
                <tr>
                  <td style="padding:18px 24px;">
                    <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#111827;">Ready to start investing?</p>
                    <p style="margin:0 0 12px;font-size:13px;color:#6b7280;">
                      EasyEquities lets you start with R50, no minimum balance, TFSA included.
                    </p>
                    <a href="https://bit.ly/4wsBTNT"
                       style="font-size:13px;color:#16a34a;font-weight:500;">
                      Open a free EasyEquities account →
                    </a>
                    <p style="margin:8px 0 0;font-size:11px;color:#9ca3af;">
                      Affiliate disclosure: we may earn a small commission if you open an account.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
                You're receiving this because you requested a PDF projection at compoundcalc.co.za.<br>
                <a href="https://compoundcalc.co.za/privacy-policy" style="color:#9ca3af;">Privacy Policy</a>
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#d1d5db;">
                CompoundCalc is for informational purposes only and does not constitute financial advice.
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

---

## Part 5 — Update `calculator.js`

### 5.1 Remove the hardcoded credentials

**Find and delete these three lines** near the top of `calculator.js`:
```javascript
const BREVO_API_KEY   = 'xkeysib-Key';
const BREVO_LIST_ID   = 4;
const BREVO_SENDER    = { name: 'CompoundCalc', email: 'ali.mora@namka.cloud' };
```

### 5.2 Replace `submitEmailCapture()` API calls

The `submitEmailCapture()` function currently calls `addBrevoContact(email)` and `sendBrevoEmail(email, pdfBase64)` separately. Replace both calls with a **single call to the Netlify proxy**:

**Find** the `try` block inside `submitEmailCapture()` that contains:
```javascript
    // ── Step 2: Add contact to Brevo list ──
    await addBrevoContact(email);

    // ── Step 3: Send the PDF via Brevo transactional email ──
    await sendBrevoEmail(email, pdfBase64);
```

**Replace with:**
```javascript
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
```

### 5.3 Remove the now-redundant functions

Delete the following functions from `calculator.js` — their logic has moved to the serverless function:
- `addBrevoContact(email)`
- `sendBrevoEmail(email, pdfBase64)`
- `buildWelcomeEmailHTML(finalBalance, shareURL)`

> **Note:** `generateProjectionPDF()` stays in `calculator.js` — the PDF is still generated client-side. Only the API calls move server-side.

---

## Part 6 — Local Testing

Netlify Functions can be tested locally using the Netlify CLI.

```bash
# Install Netlify CLI (one-time)
npm install -g netlify-cli

# From repo root — starts local dev server with functions
netlify dev
```

The local server runs at `http://localhost:8888`. The function is accessible at `http://localhost:8888/api/send-pdf`.

Set local environment variables by creating a `.env` file at the repo root (this file must be in `.gitignore`):
```
BREVO_API_KEY=xkeysib-your-actual-key-here
BREVO_LIST_ID=4
```

> ⚠️ **Verify `.gitignore` contains `.env`** before committing. Run `git status` and confirm `.env` does not appear as a tracked file.

---

## QA Checklist

**Security:**
- [ ] `.env` file is in `.gitignore` and does not appear in `git status`
- [ ] `BREVO_API_KEY` and `BREVO_LIST_ID` set in Netlify dashboard environment variables
- [ ] `calculator.js` contains zero occurrences of `xkeysib-` (search the file)
- [ ] Old Brevo API key rotated in Brevo dashboard (generate new key, old one deactivated)

**Functionality (test with a real email address):**
- [ ] Email capture form triggers after 30s + calculation
- [ ] Submitting a valid email → success state shown ("On its way!")
- [ ] Brevo contact list shows the new contact within 2 minutes
- [ ] PDF email received with correct attachment (opens cleanly, chart renders)
- [ ] `finalBalance` in email subject line matches the calculator output
- [ ] Shareable URL in email links back to the correct projection
- [ ] `cc_email_captured` set in localStorage — form doesn't re-appear on refresh
- [ ] Invalid email → validation error shown, no API call made
- [ ] Dismiss button hides form without triggering API call

**Error handling:**
- [ ] Test with Netlify function temporarily offline → error state shows in form
- [ ] Network tab shows POST to `/api/send-pdf`, not directly to `api.brevo.com`

**Commit message:** `feat: move Brevo API calls to Netlify serverless proxy (Sprint 9)`

---

## After Deploying

Ali: In Brevo dashboard, generate a new API key named `CompoundCalc Production v2` with only `contacts.write` and `smtp.email` permissions. Update the Netlify environment variable with the new key. The old key (currently in Git history) should be deleted in Brevo.

---

*Questions: ali@openmindi.co.za / +27 62 370 5952*
