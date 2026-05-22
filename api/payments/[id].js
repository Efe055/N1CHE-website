import { createMollieClient } from '@mollie/api-client'

const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const payment = await mollie.payments.get(req.query.id)
    res.json({ id: payment.id, status: payment.status, metadata: payment.metadata })
  } catch (err) {
    console.error('Mollie payment fetch failed:', err.message)
    res.status(500).json({ error: err.message })
  }
}
