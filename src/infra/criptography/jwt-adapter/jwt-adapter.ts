import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {
  }

  async encrypt (value: string): Promise<string> {
    const accesToken = await jwt.sign({ id: value }, this.secret)
    return accesToken
  }

  async decrypt (token: string): Promise<string | null> {
    const value: any = await jwt.verify(token, this.secret)
    return value
  }
}
