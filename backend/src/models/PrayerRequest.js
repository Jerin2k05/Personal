import mongoose from 'mongoose'

const prayerRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 254 },
    prayerRequest: { type: String, required: true, maxlength: 100000 },
    notificationStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
      required: true,
    },
    notificationAttempts: { type: Number, default: 0, min: 0 },
    nextNotificationAttempt: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema)

export default PrayerRequest
