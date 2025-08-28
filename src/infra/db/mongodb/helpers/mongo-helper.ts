import { Collection, MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

export { MongoMemoryServer }
export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,
  isConnected: false as boolean,

  async connect (uri: any): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
    this.isConnected = true
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null as unknown as MongoClient
    this.isConnected = false
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.isConnected || this.client === null || this.client === undefined) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  mapArray: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  },
  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
