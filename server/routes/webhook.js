import { Router } from 'express'
import mollie from '../mollie.js'

const router = Router()

router.post('/mollie', async (req, res) => {
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
})

export default router
