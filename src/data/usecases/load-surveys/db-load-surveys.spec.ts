import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveysRepository } from "../../protocols/db/survey/load-surveys-repository"
import { DbLoadSurveys } from './db-load-surveys'
const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }, {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}
// import { } from '../'
describe('DbLoadSurveys', () => {
  test('should call LoadSurveysRepository ', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
      async loadAll (): Promise<SurveyModel[]> {
        return new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }
    const loadSurveysRepositorySutb = new LoadSurveysRepositoryStub()
    const loadAllSpy = jest.spyOn(loadSurveysRepositorySutb, 'loadAll')
    const sut = new DbLoadSurveys(loadSurveysRepositorySutb)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})