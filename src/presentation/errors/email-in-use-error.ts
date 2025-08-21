export class EmailInUseError extends Error {
  constructor () {
    super('the recieved email is already in use')
    this.name = 'EmailInUseError'
  }
}
