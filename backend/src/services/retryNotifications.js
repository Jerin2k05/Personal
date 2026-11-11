import PrayerRequest from '../models/PrayerRequest.js'
import { sendPrayerNotification } from './emailService.js'

const MAX_ATTEMPTS = 5

function nextRetryTime(attempt) {
  const delayMinutes = Math.min(60, 5 * (2 ** Math.max(0, attempt - 1)))
  return new Date(Date.now() + delayMinutes * 60_000)
}

export async function retryFailedNotifications() {
  const dueRequests = await PrayerRequest.find({
    notificationStatus: 'failed',
    notificationAttempts: { $lt: MAX_ATTEMPTS },
    nextNotificationAttempt: { $lte: new Date() },
  }).limit(10)

  for (const prayerRequest of dueRequests) {
    try {
      await sendPrayerNotification(prayerRequest)
      await PrayerRequest.updateOne(
        { _id: prayerRequest._id, notificationStatus: 'failed' },
        {
          $set: { notificationStatus: 'sent', nextNotificationAttempt: null },
          $inc: { notificationAttempts: 1 },
        },
      )
    } catch (error) {
      const attempts = prayerRequest.notificationAttempts + 1
      await PrayerRequest.updateOne(
        { _id: prayerRequest._id, notificationStatus: 'failed' },
        {
          $set: {
            notificationAttempts: attempts,
            nextNotificationAttempt: nextRetryTime(attempts),
          },
        },
      )
      console.error('Prayer notification retry failed:', error.message)
    }
  }
}
