import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorator/log-controller-decorator-factory'
import { AddSurveyController } from '../../../../presentation/controllers/login/survey/add-survey/add-survey-controller'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makedbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'
export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makedbAddSurvey())
  return makeLogControllerDecorator(controller)
}
