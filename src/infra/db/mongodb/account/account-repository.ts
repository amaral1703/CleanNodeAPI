import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '../../../../data/usecases/authentication/db-authentication-protocols'
import { ObjectId } from 'mongodb'
import { LoadAccountByTokenRepository } from '../../../../data/protocols/db/account/load-account-by-token-repository'
export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(await accountCollection.findOne({ _id: result.insertedId }))
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    if (account != null) {
      return MongoHelper.map(account)
    }
    return null as unknown as AccountModel
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
      role
    })
    if (account != null) {
      return MongoHelper.map(account)
    }
    return null
  }
}
