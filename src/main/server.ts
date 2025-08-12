import { MongoHelper, MongoMemoryServer } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

async function startServer (): Promise<void> {
  let mongoUrl = env.mongoUrl
  if (!mongoUrl || env.nodeEnv === 'development') {
    const mongoServer = await MongoMemoryServer.create()
    mongoUrl = mongoServer.getUri()
  }
  await MongoHelper.connect(mongoUrl)
  const app = (await import('./config/app')).default
  app.listen(env.port, () => console.log(`server running at http://localhost:${env.port}`))
}
// MongoHelper.connect(env.mongoUrl).then(() => {

// })

startServer().catch(console.error)
