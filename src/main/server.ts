import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

async function startServer (): Promise<void> {
  const mongoUrl = env.mongoUrl
  // if (!mongoUrl || env.nodeEnv === 'development') {
  //   const mongoServer = await MongoMemoryServer.create()
  //   mongoUrl = mongoServer.getUri()
  // }
  await MongoHelper.connect(mongoUrl)
  const app = (await import('./config/app')).default
  app.listen(env.port, () => console.log(`server running at http://localhost:${env.port} \n mongo URl at ${mongoUrl}`))
}

startServer().catch(console.error)
