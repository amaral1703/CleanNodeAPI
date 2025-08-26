import { LoadAccountByToken, Middleware, HttpRequest, HttpResponse } from './auth-middleware-protocols'
import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http/http-helpers'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accesToken = httpRequest.headers?.['x-access-token']
      if (accesToken) {
        const account = await this.loadAccountByToken.load(accesToken, this.role)
        if (account) {
          return ok({ accountId: account.id})
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
