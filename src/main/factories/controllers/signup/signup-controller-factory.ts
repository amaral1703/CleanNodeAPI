import { SignUpController } from '../../../../presentation/controllers/login/singnup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makedbauthentication } from '../../usecases/authentication/db-authentication-factory'
import { makedbAddAccount } from '../../usecases/add-acount/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorator/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makedbAddAccount(), makeSignUpValidation(), makedbauthentication())
  return makeLogControllerDecorator(controller)
}
