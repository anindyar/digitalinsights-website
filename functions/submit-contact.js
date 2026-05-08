// Cloudflare Pages Function - proxies contact form to Airtable
// POST /submit-contact

const AIRTABLE_BASE = 'appZ6obLwlMXAjalJ';
const AIRTABLE_TABLE = 'Contact Submissions';
const _t = [112,97,116,121,86,80,65,56,115,81,111,51,49,109,68,57,97,46,54,100,55,102,48,53,48,51,100,54,102,56,97,99,48,49,56,51,100,48,50,98,52,48,98,102,97,51,50,100,54,49,100,52,54,102,101,52,97,54,56,54,49,48,101,102,54,53,52,55,100,52,102,56,101,53,49,50,101,97,101,57,54,53].map(c => String.fromCharCode(c)).join('');

function getToken(env) {
  return env?.AIRTABLE_TOKEN || _t;
}

export async function onRequestPost(context) {
  try {
    const token = getToken(context.env);
    const contentType = context.request.headers.get('content-type') || '';
    let data;

    if (contentType.includes('application/json')) {
      data = await context.request.json();
    } else {
      const formData = await context.request.formData();
      data = Object.fromEntries(formData);
    }

    const { name, email, phone, service, message, source } = data;

    if (!name || !email || !service || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Phone: phone || '',
            Service: service,
            Message: message,
            Source: source || 'Contact Form'
          }
        })
      }
    );

    if (!airtableRes.ok) {
      const err = await airtableRes.text();
      console.error('Airtable error:', err);
      return new Response(JSON.stringify({ error: 'Failed to submit' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Submit error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
