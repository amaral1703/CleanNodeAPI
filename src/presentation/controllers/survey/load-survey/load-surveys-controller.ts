import { Controller, HttpRequest, HttpResponse, LoadSurveys, ok, serverError } from './load-survey-controller-protocols'
export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return ok(surveys)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
