import { schema } from "nexus";

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