import { schema } from "nexus"
import e from "cors"

schema.objectType({
  name: "OpenGraph",
  definition(t) {
    t.model.id()
    t.model.description()
    t.model.image()
    t.model.title()
    t.model.url()
    t.model.urlhash()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()    
  }
})

schema.objectType({
  name: "User",
  definition(t) {
    t.model.id()
    t.model.auth0Sub()
    t.model.email()
    t.model.productEmail()
    t.model.promotionalEmail()
    t.model.inboundConnections()
    t.model.outboundConnections()
    t.model.profile()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  }
})

schema.objectType({
  name: "Trait",
  definition(t) {
    t.model.id()
    t.model.description()
    t.model.kind()
    t.model.name()
    t.model.preferences()
    t.model.verified()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()    
  }
})

schema.objectType({
  name: "Tool",
  definition(t) {
    t.model.id()
    t.model.description()
    t.model.kind()
    t.model.name()
    t.model.skills()
    t.model.url()
    t.model.verified()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()    
  }
})

schema.objectType({
  name: "Place",
  definition(t) {
    t.model.id()
    t.model.description()
    t.model.experiences()
    t.model.name()
    t.model.kind()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()    
  }
})

schema.objectType({
  name: "Connection",
  definition(t) {
    t.model.id()
    t.model.connected()
    t.model.pin()
    t.model.user()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  }
})

schema.objectType({
  name: "Profile",
  definition(t) {
    t.model.id()
    t.model.location()
    t.model.name()
    t.model.nickname()
    t.model.photo()
    t.model.preferences()
    t.model.preview()
    t.model.pronouns()
    t.model.published()
    t.model.skills()
    t.model.user()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  }
})
      
schema.objectType({
  name: "Preference",
  definition(t) {
    t.model.id()
    t.model.comment()
    t.model.feels()
    t.model.published()
    t.model.trait()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()    
  }
})

schema.objectType({
  name: "Skill",
  definition(t) {
    t.model.id()
    t.model.comment()
    t.model.level()
    t.model.profile()
    t.model.published()
    t.model.tool()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()    
  }
})

schema.objectType({
  name: "Activity",
  definition(t) {
    t.model.id()
    t.model.description()
    t.model.kind()
    t.model.image()
    t.model.profile()
    t.model.published()
    t.model.title()
    t.model.url()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()    
  }
})

schema.objectType({
  name: "External",
  definition(t) {
    t.model.id()
    t.model.profile()
    t.model.nickname()
    t.model.service()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()    
  }
})

schema.objectType({
  name: "Experience",
  definition(t) {
    t.model.id()
    t.model.kind()
    t.model.profile()
    t.model.published()
    t.model.title()
    t.model.start()
    t.model.end()
    t.model.place()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()    
  }
})

schema.queryType({
  definition(t) {
    t.crud.activity()
    t.crud.activities({pagination: true, filtering: true})
    t.crud.experience()
    t.crud.experiences({pagination: true, filtering: true})
    t.crud.place()
    t.crud.places({pagination: true, filtering: true})
    t.crud.preference()
    t.crud.preferences({pagination: true, filtering: true})
    t.crud.profile()
    t.crud.profiles({pagination: true, filtering: true})
    t.crud.skill()
    t.crud.skills({pagination: true, filtering: true})
    t.crud.tool()
    t.crud.tools({pagination: true, filtering: true})
    t.crud.trait()
    t.crud.traits({pagination: true, filtering: true})
    t.crud.user()
    t.crud.users({pagination: true, filtering: true})
  }
})

schema.mutationType({
  definition(t) {
    t.crud.createOneActivity()
    t.crud.updateOneActivity()
    t.crud.deleteOneActivity()
    t.crud.createOneConnection()
    t.crud.updateOneConnection()
    t.crud.deleteOneConnection()
    t.crud.createOneExperience()
    t.crud.updateOneExperience()
    t.crud.deleteOneExperience()
    t.crud.createOneExternal()
    t.crud.updateOneExternal()
    t.crud.deleteOneExternal()
    t.crud.createOneOpenGraph()
    t.crud.updateOneOpenGraph()
    t.crud.deleteOneOpenGraph()
    t.crud.createOnePlace()
    t.crud.updateOnePlace()
    t.crud.deleteOnePlace()
    t.crud.createOnePreference()
    t.crud.updateOnePreference()
    t.crud.deleteOnePreference()
    t.crud.createOneProfile()
    t.crud.updateOneProfile()
    t.crud.deleteOneProfile()
    t.crud.createOneSkill()
    t.crud.updateOneSkill()
    t.crud.deleteOneSkill()
    t.crud.createOneTool()
    t.crud.updateOneTool()
    t.crud.deleteOneTool()
    t.crud.createOneTrait()
    t.crud.updateOneTrait()
    t.crud.deleteOneTrait()
    t.crud.createOneUser()
    t.crud.updateOneUser()
    t.crud.deleteOneUser()
    /* t.field('createOneUser', {
      type: 'User',
      resolve(user, args, ctx) {
        return ctx.db.user.create({
          data: user
        })
      },
    }) */
  }
})


/*

TODO: better document how middleware processes both the Query/Mutation declaration and the returned object/fields

args: {
  data: { ... }
}

info: {
  fieldName: string
}

ctx: {
  user: {
    'https://fizbuz.com/roles': [ ... ]
    sub: string
  }
}

*/

/* Authentication & Authorization Middleware

NOTE: at some point, consider migrating to a library like graphql-shield

Rules:

Queries
- Admin users can execute all queries
- If an object has a "published" field, only return it if it belongs to the autenticated user 
- 

Mutations
- Must be authenticated (user property attached to ctx)
- 

*/

schema.middleware((_config) => {
  const isAdmin = (user: any) => {
    const ROLES_KEY = "https://fizbuz.com/roles";
    return (user && user[ROLES_KEY] && user[ROLES_KEY].indexOf('admin') >= 0)
  }

  return async (root, args, ctx: any, info, next) => {
    const operation = info.operation?.operation
    const fieldName = info.fieldName
    //console.log(root, operation, fieldName)
    if (operation === 'mutation') {
      // if this is the "root" of the mutation (i.e. not one of the returned sub-fields)
      if (root === undefined) {
        if (fieldName === 'createOneUser') {
          console.log('Registering a new user')
          // pass through
        }
        else {
          // check to see if the user is authorized
          if (ctx.user === undefined) {
            console.log("mutation not allowed")
            throw new Error("mutation not allowed")
          }
        } 
      }
      else {
        console.log('not-root ', fieldName);
      }
    }
    else if (operation === 'query') {
      console.log('query ', ctx.user, operation, fieldName)
      if (root === undefined) {
        if (fieldName === 'users') {
          if (!ctx.user || !isAdmin(ctx.user)) {
            throw new Error(`Query for all users not allowed: ${ctx.user}`);
          }
        }
      }
      else {
        if (fieldName === 'email') {
          if (!ctx.user || ctx.user.sub !== root.auth0Sub) {
            return '<redacted>'
          }
        }
      } 
    }

    return await next(root, args, ctx, info)
  }
})


// automatically handle setting timestamps on update and delete mutations
schema.middleware((_config) => {
  return async (root, args, ctx, info, next) => {
    if (info.operation.operation === 'mutation' && args.data && args.where) {
      if (info.fieldName.startsWith('update')) {
        args.data.updatedAt = new Date()
      }
      else if (info.fieldName.startsWith('delete')) {
        args.data.deletedAt = new Date()
      }
    }
    const result = await next(root, args, ctx, info)
    return result
  }
})

// automatically hide objects that have a deletedAt stamp
schema.middleware((_config) => {
  return async (root, args, ctx, info, next) => {
    let result = await next(root, args, ctx, info)
    if (Array.isArray(result)) {
      result = result.filter(obj => obj.deletedAt === null)
    }
    else {
      if (result && result.deletedAt) {
        result = null
      }
    }
    return result
  }
})