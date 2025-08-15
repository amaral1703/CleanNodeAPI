import { MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (httpRequest.body.email == null || httpRequest.body.email === undefined) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (httpRequest.body.password == null || httpRequest.body.password === undefined) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
    return serverError(new Error('Unhandled case'))
  }
}
