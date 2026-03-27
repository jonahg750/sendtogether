async function kvGet(key) {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  const res = await fetch(`${url}/get/${key}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  if (!data.result) return null
  return JSON.parse(decodeURIComponent(data.result))
}

async function kvSet(key, value) {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  await fetch(`${url}/set/${key}/${encodeURIComponent(JSON.stringify(value))}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export default async function handler(req, res) {
  const { id, action } = req.query

  if (!id) return res.status(400).json({ error: 'Missing campaign id' })

  if (req.method === 'GET') {
    const campaign = await kvGet(`campaign:${id}`)
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' })
    return res.json(campaign)
  }

  if (req.method === 'POST' && action === 'increment') {
    const campaign = await kvGet(`campaign:${id}`)
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' })
    campaign.sendCount = (campaign.sendCount || 0) + 1
    await kvSet(`campaign:${id}`, campaign)
    return res.json({ sendCount: campaign.sendCount })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
