import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helpers'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'
export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication
  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (email == null || email === undefined) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }
      if (password == null || password === undefined) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }
      await this.authentication.auth(email, password)
      return serverError(new Error('Unhandled case'))
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
