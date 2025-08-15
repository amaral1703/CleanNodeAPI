import { LoginController } from './login'
import { badRequest } from '../../helpers/http-helpers'
import { MissingParamError } from '../../errors'
describe('Login Controller', () => {
  test('should return 400 if no email if provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})