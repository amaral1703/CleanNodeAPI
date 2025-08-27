import request from 'supertest'
import app from '../config/app'
import { MongoHelper, MongoMemoryServer } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let surveyCollection: Collection
describe('survey routes', () => {
  let mongoServer: MongoMemoryServer
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await MongoHelper.connect(mongoUri)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
    await mongoServer.stop()
  })
  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })
  describe('POST /surveys', () => {
    test('Should return 403 on AddSurvey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'answer_1',
            image: 'http://drive.com/image_1'
          }, {
            answer: 'answer_2'
          }]
        })
        .expect(403)
    })
  })
})
