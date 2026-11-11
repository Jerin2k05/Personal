import PrayerRequest from '../models/PrayerRequest.js'
import { sendPrayerNotification } from '../services/emailService.js'

const MAX_WORDS = 2000
const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i

function cleanText(value, preserveWhitespace = false) {
  const controlCharacters = preserveWhitespace
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
    : /[\u0000-\u001F\u007F]/g
  return value
    .normalize('NFC')
    .replace(controlCharacters, '')
    .trim()
}

function wordCount(value) {
  return value.trim() ? value.trim().split(/\s+/).length : 0
}

export function validateRequest(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'A valid request body is required.' }
  }

  if (
    typeof body.fullName !== 'string'
    || typeof body.email !== 'string'
    || typeof body.prayerRequest !== 'string'
  ) {
    return { error: 'Full name, email address, and prayer request are required.' }
  }

  const fullName = cleanText(body.fullName).replace(/\s+/g, ' ')
  const email = body.email.normalize('NFC').trim()
  const prayer = cleanText(body.prayerRequest, true)

  if (!fullName || fullName.length > 100) {
    return { error: 'Full name is required and must be 100 characters or fewer.' }
  }

  const [emailLocalPart] = email.split('@')
  if (
    email.length > 254
    || /\s/.test(email)
    || !EMAIL_PATTERN.test(email)
    || emailLocalPart.startsWith('.')
    || emailLocalPart.endsWith('.')
    || emailLocalPart.includes('..')
  ) {
    return { error: 'Please provide a valid email address.' }
  }

  if (!prayer) {
    return { error: 'Prayer request is required.' }
  }

  if (wordCount(prayer) > MAX_WORDS) {
    return { error: `Prayer requests must be ${MAX_WORDS} words or fewer.` }
  }

  return {
    value: {
      fullName,
      email: email.toLowerCase(),
      prayerRequest: prayer,
    },
  }
}

export async function createPrayerRequest(request, response, next) {
  try {
    const validation = validateRequest(request.body)
    if (validation.error) {
      return response.status(400).json({ message: validation.error })
    }

    const savedRequest = await PrayerRequest.create(validation.value)

    try {
      await sendPrayerNotification(savedRequest)
    } catch (emailError) {
      savedRequest.notificationStatus = 'failed'
      savedRequest.notificationAttempts = 1
      savedRequest.nextNotificationAttempt = new Date(Date.now() + 60_000)
      await savedRequest.save()
      console.error('Prayer notification failed; request remains saved:', emailError.message)
      return response.status(503).json({
        saved: true,
        message: 'Your prayer request was saved, but we could not send the ministry notification yet. We will retry automatically.',
      })
    }

    savedRequest.notificationStatus = 'sent'
    savedRequest.notificationAttempts = 1
    await savedRequest.save()
    return response.status(201).json({
      message: 'Thank you. Your prayer request has been received and the ministry has been notified.',
    })
  } catch (error) {
    return next(error)
  }
}
