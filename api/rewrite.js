export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { draft, subject } = req.body
  if (!draft || !subject) {
    return res.status(400).json({ error: 'Missing draft or subject' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 600,
        messages: [
          {
            role: 'user',
            content: `Rewrite this email and its subject line in a unique, natural way. Keep the same meaning, tone, and request. Same approximate length. Do not add greetings or sign-offs — preserve what's there.

Return your response in this exact format:
SUBJECT: <rewritten subject line>
BODY:
<rewritten email body>

Subject: ${subject}

Email:
${draft}`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      return res.status(502).json({ error: err?.error?.message || 'Claude API error' })
    }

    const data = await response.json()
    const text = data.content[0].text
    const subjectMatch = text.match(/^SUBJECT:\s*(.+)$/m)
    const bodyMatch = text.match(/^BODY:\s*\n([\s\S]+)$/m)
    const rewrittenSubject = subjectMatch ? subjectMatch[1].trim() : subject
    const rewrittenBody = bodyMatch ? bodyMatch[1].trim() : text

    return res.json({ rewritten: rewrittenBody, subject: rewrittenSubject })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}
