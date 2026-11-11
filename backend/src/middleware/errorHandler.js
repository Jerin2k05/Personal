export function notFoundHandler(_request, response) {
  response.status(404).json({ message: 'The requested endpoint was not found.' })
}

export function errorHandler(error, _request, response, _next) {
  if (error.type === 'entity.too.large') {
    return response.status(413).json({ message: 'The submitted data is too large.' })
  }

  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({ message: 'The request body must be valid JSON.' })
  }

  console.error('Unhandled API error:', error.message)
  return response.status(500).json({ message: 'An unexpected server error occurred.' })
}
