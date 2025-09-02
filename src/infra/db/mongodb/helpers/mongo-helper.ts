import { Collection, MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

export { MongoMemoryServer }
export const MongoHelper = {
  client: null as MongoClient | null,
  uri: null as string | null,
  isConnected: false as boolean,

  async connect (uri: any): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
    this.isConnected = true
  },

  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
    this.client = null
    this.isConnected = false
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.isConnected || !this.client || !this.uri) {
      await this.connect(this.uri)
    }
    if (this.client) {
      return this.client.db().collection(name)
    }
    throw new Error('MongoHelper: getColletion got error')
  },
  mapArray: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  },
  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
