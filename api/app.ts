import cors from 'cors'
import { settings, server, use, schema } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import authenticated from './security'

// Prisma is our connection to the underlying database
use(prisma())

// Enables CORS for our GraphQL API server
server.express.use(cors())

// Authenticates requests using Auth0
server.express.use((req: any, res, next) => {
  authenticated(req, res, () => {
    const { user } = req
    console.log(user)
    schema.addToContext(() => {
      return { user }
    })
    next()
  })
})

settings.change({
  server: {
    playground: true,
  },
})
