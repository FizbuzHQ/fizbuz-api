import { schema } from 'nexus'
import { CustomContext } from '../context'

schema.queryType({
  definition(t) {
    t.crud.tools({ pagination: true, filtering: true })
    t.crud.user()
    t.crud.profile()
    t.crud.identity()
    t.crud.skill()
    t.field('currentUser', {
      type: 'User',
      args: {},
      async resolve(root, args, ctx: CustomContext) {
        let user = null
        if (ctx.user) {
          const data = await ctx.db.user.findMany({
            where: {
              identities: { some: { auth0Sub: ctx.user.sub } },
            },
          })
          user = data && data.length === 1 ? data[0] : null
        }
        return user
      },
    })
  },
})
