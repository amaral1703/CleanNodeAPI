import request from 'supertest'
import app from '../config/app'
import { MongoHelper, MongoMemoryServer } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection
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
    accountCollection = await MongoHelper.getCollection('accounts')
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
  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('1234', 12)
      await accountCollection.insertOne({
        name: 'gabriel',
        email: 'gabriel@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'gabriel@gmail.com',
          password: '1234'
        })
        .expect(200)
    })
  })
})
