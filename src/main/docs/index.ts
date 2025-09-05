import { loginPath } from './paths/'
import { badRequest, unauthorized, serverError, notFound } from './components/'
import { accountSchema, loginParamsSchema, errorSchema } from './schemas/'

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
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
