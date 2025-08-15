import { MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helpers'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'
export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (httpRequest.body.email == null || httpRequest.body.email === undefined) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (httpRequest.body.password == null || httpRequest.body.password === undefined) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
    this.emailValidator.isValid('email@mail.com')
    return serverError(new Error('Unhandled case'))
  }
}
