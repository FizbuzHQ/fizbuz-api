import { schema } from 'nexus'
//import { CustomContext, ROLES_KEY } from '../context'

/*

TODO: better document how middleware processes both the Query/Mutation declaration and the returned objects/fields

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

// automatically filter out non-published records for non-authenticated API calls
schema.middleware((_config) => {
  return async (root, args, ctx: any, info, next) => {
    let result = await next(root, args, ctx, info)
    // if the request is not authenticated
    if (ctx.user === undefined) {
      if (Array.isArray(result)) {
        result = result.filter(
          (obj) => !(obj.published && obj.published === false),
        )
      } else if (typeof result === 'object') {
        if (result && result.published === false) {
          result = null
        }
      }
    }
    return result
  }
})

// automatically handle setting timestamps on update and delete mutations
schema.middleware((_config) => {
  return async (root, args, ctx, info, next) => {
    if (info.operation.operation === 'mutation' && args.data && args.where) {
      if (info.fieldName.startsWith('update')) {
        args.data.updatedAt = new Date()
      } else if (info.fieldName.startsWith('delete')) {
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
      result = result.filter((obj) => obj.deletedAt === null)
    } else {
      if (result && result.deletedAt) {
        result = null
      }
    }
    return result
  }
})
