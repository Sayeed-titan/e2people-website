const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed.' })
  }

  const { name = '', email = '', phone = '', company = '', message = '' } = req.body || {}

  const payload = {
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    company: String(company).trim(),
    message: String(message).trim(),
  }

  if (!payload.name || !payload.email || !payload.message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' })
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL || 'hasib@mediklaudltd.com'
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'

  if (!resendApiKey) {
    return res.status(500).json({
      message: 'Form delivery is not configured yet. Add RESEND_API_KEY in Vercel environment variables.',
    })
  }

  const text = [
    'New contact form submission from e2People website',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Company: ${payload.company || 'Not provided'}`,
    '',
    'Message:',
    payload.message,
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin-bottom: 16px;">New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone || 'Not provided')}</p>
      <p><strong>Company:</strong> ${escapeHtml(payload.company || 'Not provided')}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: payload.email,
        subject: `New website inquiry from ${payload.name}`,
        text,
        html,
      }),
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error('Resend API error:', errorText)
      return res.status(502).json({ message: 'We could not deliver your message right now.' })
    }

    return res.status(200).json({ message: 'Message delivered successfully.' })
  } catch (error) {
    console.error('Contact form submission failed:', error)
    return res.status(500).json({ message: 'Unexpected server error while sending message.' })
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
