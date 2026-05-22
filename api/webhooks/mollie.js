import { createMollieClient } from '@mollie/api-client'

const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { id } = req.body

  if (!id) return res.status(400).send('Missing payment id')

  try {
    const payment = await mollie.payments.get(id)
    const order = payment.metadata?.orderNumber ?? id

    switch (payment.status) {
      case 'paid':
        console.log(`[webhook] Payment ${id} PAID — order #${order}`)
        break
      case 'expired':
      case 'canceled':
      case 'failed':
        console.log(`[webhook] Payment ${id} ${payment.status.toUpperCase()} — order #${order}`)
        break
    }
  } catch (err) {
    console.error('[webhook] Error processing payment:', err.message)
  }

  // Always respond 200 — Mollie retries on non-200
  res.status(200).send('OK')
}
