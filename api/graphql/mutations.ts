import { schema } from 'nexus'

schema.mutationType({
  definition(t) {
    // public records
    /*t.crud.createOneOpenGraph()
    t.crud.updateOneOpenGraph()
    t.crud.deleteOneOpenGraph()
    t.crud.createOnePlace()
    t.crud.updateOnePlace()
    t.crud.deleteOnePlace()
    t.crud.createOneTool()
    t.crud.updateOneTool()
    t.crud.deleteOneTool()
    t.crud.createOneTrait()
    t.crud.updateOneTrait()
    t.crud.deleteOneTrait()*/
    // user records
    t.crud.createOneUser()
    //t.crud.updateOneUser()
    //t.crud.deleteOneUser()
    // user-owned records
    /*t.crud.createOneActivity()
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
    t.crud.createOnePreference()
    t.crud.updateOnePreference()
    t.crud.deleteOnePreference()
    t.crud.createOneProfile()*/
    t.crud.updateOneProfile()
    /*t.crud.deleteOneProfile()
    t.crud.createOneSkill()
    t.crud.updateOneSkill()
    t.crud.deleteOneSkill()*/
    // custom resolvers
    /*
      t.field('upsertManySkills', {
        type: 'Skill',
        args: { skillIds: schema.arg({ list: true, type: "String", required: true})},
        resolve(root, args, ctx) {
          console.log(root, args)
          let profileId = "cka029fuy000080ar5ply1h31";
          let toolId = "cka9uwfi60001e6argwxho1cn";
          return ctx.db.skill.upsert({
            create: {
              level: 1,
              tool: { connect: {id: toolId}},
              profile: { connect: {id: profileId}}
            },
            update: {
              tool: { connect: {id: toolId}},
              profile: { connect: {id: profileId}}
            },
            where: {
              profileId_toolId: { profileId, toolId }
            }
          })
          //return []
        },
      })*/
    /* t.field('createOneUser', {
        type: 'User',
        resolve(user, args, ctx) {
          return ctx.db.user.create({
            data: user
          })
        },
      }) */
  },
})
