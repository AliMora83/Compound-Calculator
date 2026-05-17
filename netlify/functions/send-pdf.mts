// netlify/functions/send-pdf.mts
// Proxies Brevo API calls for:
//   1. Adding a contact to the CompoundCalc Subscribers list
//   2. Sending the PDF projection email

export default async (req: Request) => {
  // ── Only allow POST ──────────────────────────────────
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // ── CORS headers (allow requests from our domain only) ──
  const headers = new Headers({
    'Access-Control-Allow-Origin': 'https://compoundcalc.co.za',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  });

  // ── Parse the request body ───────────────────────────
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers,
    });
  }

  const { email, pdfBase64, finalBalance, shareURL } = body;

  // ── Validate required fields ─────────────────────────
  if (!email || !pdfBase64) {
    return new Response(JSON.stringify({ error: 'email and pdfBase64 are required' }), {
      status: 400,
      headers,
    });
  }

  // ── Read credentials from environment variables ──────
  // Use modern Netlify.env.get() as per Netlify guidelines
  const BREVO_API_KEY = Netlify.env.get('BREVO_API_KEY');
  const BREVO_LIST_ID = parseInt(Netlify.env.get('BREVO_LIST_ID') || '4', 10);

  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY environment variable is not set');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers,
    });
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
      return new Response(JSON.stringify({ error: err.message || 'Failed to save contact' }), {
        status: 502,
        headers,
      });
    }
  } catch (err: any) {
    console.error('Brevo contact fetch error:', err);
    return new Response(JSON.stringify({ error: 'Contact API unreachable' }), {
      status: 502,
      headers,
    });
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
      return new Response(JSON.stringify({ error: err.message || 'Failed to send email' }), {
        status: 502,
        headers,
      });
    }
  } catch (err: any) {
    console.error('Brevo email fetch error:', err);
    return new Response(JSON.stringify({ error: 'Email API unreachable' }), {
      status: 502,
      headers,
    });
  }

  // ── Success ───────────────────────────────────────────
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers,
  });
};

// ── Email HTML builder ────────────────────────────────
function buildEmailHTML(finalBalance: string, shareURL: string) {
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
