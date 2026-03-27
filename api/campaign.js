import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) return res.status(400).json({ error: 'Missing campaign id' })

  if (req.method === 'GET') {
    const raw = await redis.get(`campaign:${id}`)
    if (!raw) return res.status(404).json({ error: 'Campaign not found' })
    const campaign = typeof raw === 'string' ? JSON.parse(raw) : raw
    return res.json(campaign)
  }

  if (req.method === 'POST' && req.query.action === 'increment') {
    const raw = await redis.get(`campaign:${id}`)
    if (!raw) return res.status(404).json({ error: 'Campaign not found' })
    const campaign = typeof raw === 'string' ? JSON.parse(raw) : raw
    campaign.sendCount = (campaign.sendCount || 0) + 1
    await redis.set(`campaign:${id}`, JSON.stringify(campaign))
    return res.json({ sendCount: campaign.sendCount })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
