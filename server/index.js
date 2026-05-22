import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import paymentsRouter from './routes/payments.js'
import webhookRouter from './routes/webhook.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/payments', paymentsRouter)
app.use('/api/webhooks', webhookRouter)

app.listen(PORT, () => {
  console.log(`N1CHE server running on http://localhost:${PORT}`)
})
