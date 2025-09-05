import { loginPath, singUpPath } from './paths/'
import { badRequest, unauthorized, serverError, notFound, forbidden } from './components/'
import { accountSchema, loginParamsSchema, errorSchema, signUpParamsSchema } from './schemas/'

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
  }],
  paths: {
    '/login': loginPath,
    '/signup': singUpPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
