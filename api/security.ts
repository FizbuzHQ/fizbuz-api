import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'

// Auth0 configuration
const authConfig = {
  issuer: 'https://fizbuz.auth0.com/',
  audience: 'https://api.fizbuz.com',
  algorithms: ['RS256'],
}

const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${authConfig.issuer}.well-known/jwks.json`,
})

const authenticated = jwt({ secret, ...authConfig })

export default authenticated
