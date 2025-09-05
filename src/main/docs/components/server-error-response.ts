export const serverError = {
  description: 'server problem',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
