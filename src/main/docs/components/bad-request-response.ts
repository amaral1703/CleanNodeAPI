export const badRequest = {
  description: 'invalid requisition',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
