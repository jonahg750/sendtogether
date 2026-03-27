export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { draft } = req.body
  if (!draft) {
    return res.status(400).json({ error: 'Missing draft' })
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
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `Rewrite this email in a unique, natural way. Keep the same meaning, tone, and request. Same approximate length. Do not add greetings or sign-offs — preserve what's there. Return only the rewritten email body, nothing else.\n\n${draft}`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      return res.status(502).json({ error: err?.error?.message || 'Claude API error' })
    }

    const data = await response.json()
    return res.json({ rewritten: data.content[0].text })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}
