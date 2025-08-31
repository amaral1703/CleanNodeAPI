import { SignUpController } from '@/presentation/controllers/login/singnup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makedbauthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makedbAddAccount } from '@/main/factories/usecases/account/add-acount/db-add-account-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorator/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makedbAddAccount(), makeSignUpValidation(), makedbauthentication())
  return makeLogControllerDecorator(controller)
}
