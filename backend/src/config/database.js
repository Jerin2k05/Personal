import mongoose from 'mongoose'

export async function connectDatabase() {
  const { MONGODB_URI } = process.env
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI must be configured.')
  }

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message)
  })

  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
}
