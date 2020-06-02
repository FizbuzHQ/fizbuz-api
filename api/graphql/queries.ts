import { schema } from 'nexus'

schema.queryType({
  definition(t) {
    t.crud.user()
    t.crud.profile()
    //t.crud.profiles({ pagination: true, filtering: true })
    t.crud.identity()
    t.crud.tools({ pagination: true, filtering: true })
    t.field('currentUser', {
      type: 'User',
      args: {},
      async resolve(root, args, ctx) {
        const data = await ctx.db.user.findMany({
          where: { identities: { some: { auth0Sub: ctx.user.sub } } },
        })
        return data && data.length === 1 ? data[0] : null
      },
    })
  },
})
