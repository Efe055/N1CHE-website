import { Router } from 'express'
import mollie from '../mollie.js'

const router = Router()

router.post('/create', async (req, res) => {
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
})

router.get('/:id', async (req, res) => {
  try {
    const payment = await mollie.payments.get(req.params.id)
    res.json({ id: payment.id, status: payment.status, metadata: payment.metadata })
  } catch (err) {
    console.error('Mollie payment fetch failed:', err.message)
    res.status(500).json({ error: err.message })
  }
})

export default router
