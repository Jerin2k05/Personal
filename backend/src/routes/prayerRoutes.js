import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { createPrayerRequest } from '../controllers/prayerController.js'

const router = Router()

const prayerRequestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many prayer requests from this connection. Please try again later.' },
})

router.post('/', prayerRequestLimiter, createPrayerRequest)

export default router
