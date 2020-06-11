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
import { CustomContext /*, ROLES_KEY*/ } from '../context'
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

/**
 * Rules that operate on the queries/mutation as they come IN to the system
 **/

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx: CustomContext) => {
    const pass = ctx.user !== undefined
    //console.log('isAuthenticated rule: ', pass)
    return pass || 'not authenticated'
  },
)

const isSignupCheck = rule({ cache: 'contextual' })(
  async (parent, args, ctx: CustomContext) => {
    let pass = false
    //console.log('isSignupCheck: ', ctx.user)
    if (ctx.user) {
      const sub =
        args.where?.identities.some.auth0Sub.equals ||
        args.data?.identities.create[0].auth0Sub
      pass = sub === ctx.user.sub
    }
    //console.log('isSignupCheck rule: ', pass)
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

/**
 * Rules that operate on the returned data from the DB
 **/

// Checks that the logged-in user "owns" the object being returned
const matchesUser = rule({ cache: 'contextual' })(
  async (parent, args, ctx: CustomContext) => {
    let pass = false
    if (ctx.user) {
      if (!parent.auth0Sub) {
        // look up userId in the DB
        const user = await ctx.db.identity
          .findOne({
            where: { auth0Sub: ctx.user.sub },
          })
          .user()
        pass = user !== null && user.id === parent.id
      }
    }
    //console.log('matchesUser rule: ', pass)
    return pass
  },
)

// Checks that the logged-in user "owns" the object being returned
const matchesProfile = rule({ cache: 'contextual' })(
  async (parent, args, ctx: CustomContext) => {
    let pass = false
    //console.log(parent)
    if (ctx.user) {
      // look up userId in the DB
      const profile = await ctx.db.identity
        .findOne({ where: { auth0Sub: ctx.user.sub } })
        .user()
        .profile()

      pass = profile !== null && profile.id === parent.profileId
    }
    //console.log('matchesProfile rule: ', pass)
    return pass
  },
)

/*const debug = rule({ cache: 'contextual' })(
  async (parent, args, ctx: CustomContext, info) => {
    console.log('Debug', parent, args)
    return true
  },
)*/

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
      skill: isAuthenticated,
    },
    User: and(isAuthenticated, matchesUser),
    Skill: and(isAuthenticated, matchesProfile),
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
