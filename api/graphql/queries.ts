import { schema } from 'nexus'

schema.queryType({
  definition(t) {
    t.crud.activity()
    t.crud.activities({ pagination: true, filtering: true })
    t.crud.experience()
    t.crud.experiences({ pagination: true, filtering: true })
    t.crud.place()
    t.crud.places({ pagination: true, filtering: true })
    t.crud.openGraph()
    t.crud.openGraphs({ pagination: true, filtering: true })
    t.crud.preference()
    t.crud.preferences({ pagination: true, filtering: true })
    t.crud.profile()
    t.crud.profiles({ pagination: true, filtering: true })
    t.crud.skill()
    t.crud.skills({ pagination: true, filtering: true })
    t.crud.tool()
    t.crud.tools({ pagination: true, filtering: true })
    t.crud.trait()
    t.crud.traits({ pagination: true, filtering: true })
    t.crud.user()
    t.crud.users({ pagination: true, filtering: true })
  },
})
