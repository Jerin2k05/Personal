import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import prayerRoutes from './routes/prayerRoutes.js'
import { connectDatabase } from './config/database.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { retryFailedNotifications } from './services/retryNotifications.js'

const app = express()
const port = Number(process.env.PORT) || 5000
const configuredOrigins = process.env.CORS_ORIGINS
  ?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const allowedOrigins = configuredOrigins?.length
  ? configuredOrigins
  : ['http://localhost:5173', 'http://localhost:4173']

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(null, false)
  },
}))
app.use(express.json({ limit: '128kb', strict: true }))

app.get('/api/health', (_request, response) => {
  const databaseConnected = mongoose.connection.readyState === 1
  response.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? 'ok' : 'unavailable',
    database: databaseConnected ? 'connected' : 'disconnected',
  })
})

app.use('/api/prayer-requests', prayerRoutes)
app.use(notFoundHandler)
app.use(errorHandler)

let server
let retryTimer
let retryJobRunning = false

async function start() {
  try {
    await connectDatabase()
    server = app.listen(port, () => {
      console.info(`Arise & Shine API listening on port ${port}.`)
    })
    retryTimer = setInterval(async () => {
      if (retryJobRunning) return
      retryJobRunning = true
      try {
        await retryFailedNotifications()
      } catch (error) {
        console.error('Prayer notification retry job failed:', error.message)
      } finally {
        retryJobRunning = false
      }
    }, 60_000)
    retryTimer.unref()
  } catch (error) {
    console.error('Backend startup failed:', error.message)
    process.exitCode = 1
  }
}

async function shutdown() {
  if (retryTimer) clearInterval(retryTimer)
  if (server) {
    server.close(async () => {
      await mongoose.disconnect()
      process.exit(0)
    })
  } else {
    await mongoose.disconnect()
  }
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

start()
