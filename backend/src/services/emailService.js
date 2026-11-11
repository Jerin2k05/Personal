import nodemailer from 'nodemailer'

const ministryEmail = 'ariseandshineofficial@gmail.com'

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP settings are incomplete.')
  }

  const port = Number(SMTP_PORT)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('SMTP_PORT must be a valid port number.')
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  })
}

export async function sendPrayerNotification(request) {
  const transporter = createTransporter()
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: ministryEmail,
    replyTo: request.email,
    subject: 'New Prayer Request — Arise & Shine Ministries',
    text: [
      'A new prayer request was submitted.',
      '',
      `Name: ${request.fullName}`,
      `Email: ${request.email}`,
      `Submitted: ${request.createdAt.toISOString()}`,
      '',
      'Prayer request:',
      request.prayerRequest,
    ].join('\n'),
  })
}
