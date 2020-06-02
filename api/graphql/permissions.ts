import { use } from 'nexus'
import {
  shield,
  rule,
  inputRule,
  deny,
  or,
  and,
  allow,
} from 'nexus-plugin-shield'
import { CustomContext, ROLES_KEY } from '../context'
import {
  nicknameCheckSchema,
  auth0SubCheckSchema,
  signupInputSchema,
  onboardingProfileUpdateSchema,
  onboardingSkillsUpdateSchema,
} from '../validation'

/*const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx: CustomContext) => {
    const user = ctx.user
    const pass =
      user && user[ROLES_KEY] && user[ROLES_KEY].indexOf('admin') >= 0
    console.log('isAdmin rule: ', pass)
    return pass || 'not admin'
  },
)*/

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx: CustomContext, info) => {
    const pass = ctx.user !== undefined
    console.log('isAuthenticated rule: ', pass)
    return pass || 'not authenticated'
  },
)

// This rule checks the parent object for ownership.
const isOwner = rule({ cache: 'contextual' })(
  async (parent, args, ctx: CustomContext, info) => {
    //console.log(parent, args, ctx.user)
    //console.log(ctx.user.sub)
    let pass = false
    //console.log(parent, args)
    if (!parent.auth0Sub) {
      // look up userId by ctx.user.sub, hard-code for now
      const data = await ctx.db.user.findMany({
        where: { identities: { some: { auth0Sub: ctx.user.sub } } },
      })
      if (data.length > 0) {
        // see if the record being requested belongs to this user
        pass = parent.id === data[0].id
      }
    } else {
      pass = parent.auth0Sub === ctx.user.sub
    }

    console.log('isOwner rule: ', pass)
    return pass
  },
)

const isSignupCheck = rule({ cache: 'contextual' })(
  async (parent, args, ctx: CustomContext) => {
    const sub =
      args.where?.identities.some.auth0Sub.equals ||
      args.data?.identities.create[0].auth0Sub
    const pass = sub === ctx.user.sub
    console.log('isSignupCheck rule: ', pass)
    return (
      pass ||
      'Can only query/create a User account for your own Auth0 sub value'
    )
  },
)

const isSignupMutation = inputRule()(signupInputSchema, {
  abortEarly: true,
})

const isNicknameCheck = inputRule()(nicknameCheckSchema, {
  abortEarly: true,
})

const isAuth0SubCheck = inputRule()(auth0SubCheckSchema, {
  abortEarly: true,
})

const isOnboardingProfileUpdate = inputRule()(onboardingProfileUpdateSchema, {
  abortEarly: true,
})

const isOnboardingSkillsUpdate = inputRule()(onboardingSkillsUpdateSchema, {
  abortEarly: true,
})

const debug = rule({ cache: 'contextual' })(
  async (parent, args, ctx: CustomContext) => {
    console.log('Debug', parent, args)
    return true
  },
)

const permissions = shield({
  rules: {
    Query: {
      // default deny
      '*': deny,
      tools: allow,
      currentUser: isAuthenticated,
      user: isAuthenticated,
      profile: isNicknameCheck,
      identity: isAuth0SubCheck,
    },
    User: and(isAuthenticated, isOwner),
    Mutation: {
      // default deny
      '*': deny,
      createOneUser: and(isSignupMutation, isSignupCheck),
      updateOneProfile: or(isOnboardingProfileUpdate, isOnboardingSkillsUpdate),
    },
  },
  options: {
    debug: true,
    allowExternalErrors: true,
  },
})

use(permissions)
