import { schema } from "nexus";

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