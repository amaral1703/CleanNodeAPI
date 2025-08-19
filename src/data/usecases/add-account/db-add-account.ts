import { AccountModel, AddAccount, AddAccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountReposiroty: AddAccountRepository
  constructor (hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountReposiroty = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    // return new Promise(resolve => resolve(null))
    const account = await this.addAccountReposiroty.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
