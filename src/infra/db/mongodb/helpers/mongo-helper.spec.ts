import { MongoHelper as sut, MongoMemoryServer } from './mongo-helper'

describe('Mongo Helper', () => {
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await sut.connect(mongoUri)
  })

  afterAll(async () => {
    await sut.disconnect()
    await mongoServer.stop()
  })

  test('should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
