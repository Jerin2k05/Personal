import assert from 'node:assert/strict'
import test from 'node:test'
import { validateRequest } from '../src/controllers/prayerController.js'

const validSubmission = {
  fullName: '  Alex Example  ',
  email: '  Alex@example.com ',
  prayerRequest: 'Please pray for my family.',
}

test('validates and normalizes a prayer request', () => {
  const result = validateRequest(validSubmission)

  assert.deepEqual(result, {
    value: {
      fullName: 'Alex Example',
      email: 'alex@example.com',
      prayerRequest: 'Please pray for my family.',
    },
  })
})

test('accepts 2,000 words and rejects 2,001 words', () => {
  const twoThousandWords = Array.from({ length: 2000 }, () => 'hope').join(' ')
  const withinLimit = validateRequest({ ...validSubmission, prayerRequest: twoThousandWords })
  const overLimit = validateRequest({
    ...validSubmission,
    prayerRequest: `${twoThousandWords} hope`,
  })

  assert.equal(withinLimit.error, undefined)
  assert.match(overLimit.error, /2000 words or fewer/)
})

test('rejects missing fields and malformed email addresses', () => {
  assert.match(validateRequest({}).error, /required/)
  assert.match(
    validateRequest({ ...validSubmission, email: 'alex @example.com' }).error,
    /valid email/,
  )
})

test('preserves prayer request line breaks', () => {
  const result = validateRequest({
    ...validSubmission,
    prayerRequest: 'Please pray for us.\n\nWe are grateful.',
  })

  assert.equal(result.value.prayerRequest, 'Please pray for us.\n\nWe are grateful.')
})
