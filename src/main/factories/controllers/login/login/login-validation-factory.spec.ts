import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { makeLoginValidation } from './login-validation-factory'
import { Validation } from '@/presentation/protocols/validation'
import { mockEmailValidator } from '@/validation/tests'
jest.mock('@/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
