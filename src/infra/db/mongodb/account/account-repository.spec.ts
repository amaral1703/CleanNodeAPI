import { Collection } from 'mongodb'
import { MongoHelper, MongoMemoryServer } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-repository'

let accountCollection: Collection
describe('account MongoDb', () => {
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

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }
  describe('add()', () => {
    test('should return an account on add succes', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('should return an account on LoadByEmal succes', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
    test('should return null if LoadByEmal fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('UpdateAccessToken()', () => {
    test('should update the account accessToken on UpdateAccessToken succes', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const fakeAccount = await accountCollection.findOne({ _id: res.insertedId})
      expect(fakeAccount).toBeTruthy()
      if (fakeAccount) {
        expect(fakeAccount.accessToken).toBeFalsy()
        await sut.updateAccesToken(fakeAccount._id.toHexString(), 'any_token')
        const account = await accountCollection.findOne({ _id: fakeAccount._id })
        expect(account).toBeTruthy()
        if (account) {
          expect(account.accessToken).toBe('any_token')
        }
      }
    })
  })
  describe('loadByToken()', () => {
    test('should return an account on LoadByToken without role succes', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      if (account != null) {
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@mail.com')
        expect(account.password).toBe('any_password')
      }
    })

    test('should return an account on LoadByToken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      if (account != null) {
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@mail.com')
        expect(account.password).toBe('any_password')
      }
    })

    test('should return null on LoadByToken with an invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeFalsy()
    })

    test('should return an account on LoadByToken with if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      if (account != null) {
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@mail.com')
        expect(account.password).toBe('any_password')
      }
    })
    
    test('should return null if LoadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeFalsy()
    })
  })
})
