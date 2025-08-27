import request from 'supertest'
import app from '../config/app'
import { MongoHelper, MongoMemoryServer } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
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

    test('Should return 403 on AddSurvey with valid accessToken', async () => {
      const password = await hash('1234', 12)
      const res = await accountCollection.insertOne({
        name: 'gabriel',
        email: 'gabriel@gmail.com',
        password,
        role: 'admin'
      })
      const account = await accountCollection.findOne({ _id: res.insertedId })
      const id = account?._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'answer_1',
            image: 'http://drive.com/image_1'
          }, {
            answer: 'answer_2'
          }]
        })
        .expect(204)
    })
  })
})
