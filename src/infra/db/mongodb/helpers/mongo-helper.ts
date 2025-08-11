import { Collection, MongoClient } from 'mongodb'
// import { disconnect } from 'process'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: any): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
