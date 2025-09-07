
export const surveyPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Survey'],
    summary: 'API para listar todas as enquetes',
    requestBody: {
      content: {
        'application/json': {
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
