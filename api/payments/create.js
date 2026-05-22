import { createMollieClient } from '@mollie/api-client'

const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const { amount, description, redirectUrl, webhookUrl, metadata } = req.body

  try {
    const payment = await mollie.payments.create({
      amount: { currency: 'EUR', value: parseFloat(amount).toFixed(2) },
      description,
      redirectUrl,
      webhookUrl,
      metadata,
    })

    res.json({
      paymentId: payment.id,
      checkoutUrl: payment._links.checkout.href,
      status: payment.status,
    })
  } catch (err) {
    console.error('Mollie payment creation failed:', err.message)
    res.status(500).json({ error: err.message })
  }
}
