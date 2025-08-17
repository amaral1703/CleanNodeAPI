export class NoError extends Error {
  constructor () {
    super('No Error')
    this.name = 'NoError'
  }
}
