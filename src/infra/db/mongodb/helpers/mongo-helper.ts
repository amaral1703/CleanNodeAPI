import { MongoClient } from 'mongodb'
import { disconnect } from 'process'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string) promise<void>{
    this.client = await MongoClient.connect(global.__MONGO_URI__, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
    })
  },

  async disconnect () {
    await this.client.close()
  }
}
