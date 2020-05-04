const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Auth0 configuration
const authConfig = {
  issuer: 'https://fizbuz.auth0.com/',
  audience: 'https://alpha.fizbuz.com',
  algorithm: ['RS256'],
};

const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${authConfig.issuer}.well-known/jwks.json`,
});

const authenticated = jwt({ secret, ...authConfig });

export default authenticated;