// Cloudflare Pages Function - proxies contact form to Airtable
// POST /submit-contact
// Set AIRTABLE_TOKEN in Cloudflare Pages environment variables

const AIRTABLE_BASE = 'appZ6obLwlMXAjalJ';
const AIRTABLE_TABLE = 'Contact Submissions';

export async function onRequestPost(context) {
  try {
    const token = context.env?.AIRTABLE_TOKEN;
    if (!token) {
      console.error('AIRTABLE_TOKEN not set in environment');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const contentType = context.request.headers.get('content-type') || '';
    let data;

    if (contentType.includes('application/json')) {
      data = await context.request.json();
    } else {
      const formData = await context.request.formData();
      data = Object.fromEntries(formData);
    }

    const { name, email, phone, service, message, source } = data;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Submit to Airtable
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
