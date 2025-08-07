import { AccountModel, AddAccount, AddAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountReposiroty: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountReposiroty = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    // return new Promise(resolve => resolve(null))
    await this.addAccountReposiroty.add(Object.assign( {}, accountData, { password: hashedPassword }))
    return {
      name: accountData.name,
      email: accountData.email,
      password: hashedPassword
    }
  }
}
