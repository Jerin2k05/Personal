const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export async function submitPrayerRequest(request) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}/prayer-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
  } catch {
    throw new Error('We could not reach the prayer request service. Please try again.')
  }

  let result
  try {
    result = await response.json()
  } catch {
    throw new Error('The server returned an invalid response. Please try again later.')
  }

  if (!response.ok) {
    const error = new Error(result.message || 'Your request could not be submitted.')
    error.saved = result.saved === true
    throw error
  }

  return result
}
