import { Controller, HttpRequest, HttpResponse, Authentication } from './login-controller-protocols'
import { Validation } from '@/presentation/protocols/validation'
import { ServerError } from '@/presentation/errors'
import { ok, badRequest, serverError, unauthorized } from '@/presentation/helpers/http/http-helpers'
export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(new ServerError(error as string))
    }
  }
}
