import { useState } from 'react'
import { HeartHandshake, Send } from 'lucide-react'
import { submitPrayerRequest } from '../../../services/prayerApi.js'
import './Req.css'

const WORD_LIMIT = 2000

function countWords(value) {
  const trimmed = value.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

function PrayerRequest() {
  const [form, setForm] = useState({ fullName: '', email: '', prayerRequest: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const wordCount = countWords(form.prayerRequest)

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setFeedback(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (isSubmitting) return

    if (wordCount > WORD_LIMIT) {
      setFeedback({ type: 'error', text: `Please keep your request within ${WORD_LIMIT.toLocaleString()} words.` })
      return
    }

    setIsSubmitting(true)
    setFeedback(null)
    try {
      const result = await submitPrayerRequest({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        prayerRequest: form.prayerRequest.trim(),
      })
      setForm({ fullName: '', email: '', prayerRequest: '' })
      setFeedback({ type: 'success', text: result.message })
    } catch (error) {
      setFeedback({
        type: error.saved ? 'partial' : 'error',
        text: error.message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="request-page">
      <div className="request-banner">
        <div className="page-width">
          <p className="eyebrow">We would be honored to pray with you</p>
          <h1 className="page-heading">Prayer Request</h1>
          <p>Whatever is on your heart, you are welcome to share it with us.</p>
        </div>
      </div>

      <div className="request-layout page-width">
        <aside className="request-aside">
          <div className="request-aside-icon"><HeartHandshake size={28} aria-hidden="true" /></div>
          <h2>You are not alone.</h2>
          <p>
            Our ministry believes in the power of prayer. Share as much or as
            little as you feel comfortable, and our team will hold your request
            in prayer.
          </p>
          <blockquote>“The prayer of a righteous person is powerful and effective.”</blockquote>
          <span>James 5:16</span>
        </aside>

        <form className="request-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <p className="eyebrow">Share your need</p>
            <h2>How can we pray for you?</h2>
            <p>All fields are required. Your information is only used to support your request.</p>
          </div>
          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              maxLength={100}
              required
              value={form.fullName}
              onChange={updateField}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              value={form.email}
              onChange={updateField}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-field">
            <div className="field-label-row">
              <label htmlFor="prayerRequest">Prayer Request</label>
              <span className={wordCount > WORD_LIMIT ? 'word-count over-limit' : 'word-count'} aria-live="polite">
                {wordCount.toLocaleString()} / {WORD_LIMIT.toLocaleString()} words
              </span>
            </div>
            <textarea
              id="prayerRequest"
              name="prayerRequest"
              rows={7}
              required
              value={form.prayerRequest}
              onChange={updateField}
              disabled={isSubmitting}
              aria-describedby="prayer-help"
            />
            <span className="field-help" id="prayer-help">Please do not include highly sensitive personal or financial information.</span>
          </div>
          {feedback && (
            <div
              className={`form-feedback ${feedback.type}`}
              role="status"
              aria-live="polite"
            >
              {feedback.text}
            </div>
          )}
          <button
            className="primary-button submit-button"
            type="submit"
            disabled={isSubmitting || wordCount > WORD_LIMIT}
          >
            {isSubmitting ? 'Submitting your request…' : 'Send Prayer Request'}
            {!isSubmitting && <Send size={17} aria-hidden="true" />}
          </button>
        </form>
      </div>
    </section>
  )
}

export default PrayerRequest
