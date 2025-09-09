import { AddSurveyParams, AddSurveyRepository } from '@/data/usecases/add-survey/db-add-survey-protocols'
import { LoadSurveysRepository } from '../protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModels } from '@/domain/test'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(mockSurveyModels()))
    }
  }
  return new LoadSurveysRepositoryStub()
}
