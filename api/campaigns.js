async function kv(command) {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  const res = await fetch(`${url}/${command.join('/')}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

function nanoid(len = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < len; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { managementEmails, subject, draft, buildingName, recipientStrategy } = req.body

  if (!managementEmails?.length || !subject || !draft) {
    return res.status(400).json({ error: 'managementEmails, subject, and draft are required' })
  }

  const id = nanoid()
  const campaign = {
    id,
    managementEmails,
    subject,
    draft,
    buildingName: buildingName || '',
    recipientStrategy: recipientStrategy || 'all',
    createdAt: Date.now(),
    sendCount: 0,
  }

  await kv(['set', `campaign:${id}`, encodeURIComponent(JSON.stringify(campaign))])
  return res.json({ id })
}
