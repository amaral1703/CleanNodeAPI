import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'
jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  }
}))
describe('Jwt Adapter', () => {
  test('should call sign with correct values ', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('should return a token on sign succes', async () => {
    const sut = new JwtAdapter('secret')
    const accesToken = await sut.encrypt('any_id')
    expect(accesToken).toBe('any_token')
  })
})
