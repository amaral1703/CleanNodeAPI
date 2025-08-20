import request from 'supertest'
import app from '../config/app'
import { MongoHelper, MongoMemoryServer } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('login routes', () => {
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
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /singup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'gabriel',
          email: 'gabriel@gmail.com',
          password: '1234',
          passwordConfirmation: '1234'
        })
        .expect(200)
    })
  })
})
