import {
  AuthenticationModel,
  LoadAccountByEmailRepository,
  Authentication,
  HashComparer,
  Encrypter,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const validAccount = await this.hashComparer.compare(authentication.password, account.password)
      if (validAccount) {
        const accesToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccesToken(account.id, accesToken)
        return accesToken
      }
    }
    return null as unknown as string
  }
}
