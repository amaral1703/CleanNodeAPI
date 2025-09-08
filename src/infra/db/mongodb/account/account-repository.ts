import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/usecases/authentication/db-authentication-protocols'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/domain/models/account'
import { MongoHelper } from '@/infra/db/mongodb//helpers/mongo-helper'
import { ObjectId } from 'mongodb'
export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(await accountCollection.findOne({ _id: result.insertedId }))
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    if (account != null) {
      return MongoHelper.map(account)
    }
    return null
  }

  async updateAccesToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role

      }, {
        role: 'admin'
      }]
    })
    if (account != null) {
      return MongoHelper.map(account)
    }
    return null
  }
}
