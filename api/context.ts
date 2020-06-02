const ROLES_KEY = 'https://fizbuz.com/roles'
const EMAIL_KEY = 'https://fizbuz.com/email'

interface Auth0User {
  sub: string
  'https://fizbuz.com/roles': string[]
  iss: string
  aud: string[]
  iat: number
  exp: number
  azp: string
  scope: string
}

interface CustomContext extends NexusContext {
  user?: Auth0User
}

export { Auth0User, CustomContext, ROLES_KEY, EMAIL_KEY }
