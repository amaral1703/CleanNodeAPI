import { loginPath, singUpPath, surveyPath } from './paths/'
import { badRequest, unauthorized, serverError, notFound, forbidden } from './components/'
import { accountSchema, loginParamsSchema, errorSchema, apiKeyAuthSchema, signUpParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema, addSurveyParamsSchema } from './schemas/'

export default {
  openapi: '3.0.0',
  info: {
    title: 'clean Node API',
    description: 'API desenvolvida Para Estudos de Api que realiza Enquetes',
    version: '1.0.0'
  },
  // license: {
  //   name: 'GPL3.0',
  //   url: 'gpl link here'
  // },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Survey'
  }],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath,
    '/signup': singUpPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
