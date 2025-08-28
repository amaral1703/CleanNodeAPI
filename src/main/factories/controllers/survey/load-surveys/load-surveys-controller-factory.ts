import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorator/log-controller-decorator-factory'
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-survey/load-surveys-controller'
import { makedbLoadSurveys } from '../../../usecases/survey/load-surveys/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makedbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
