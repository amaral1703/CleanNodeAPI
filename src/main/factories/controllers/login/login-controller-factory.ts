import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../../presentation/protocols'
// import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { LoginController } from '../../../../presentation/controllers/login/login/login-controller'
import { makedbauthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorator/log-controller-decorator-factory'
export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeLoginValidation(), makedbauthentication())
  return makeLogControllerDecorator(controller)
}
