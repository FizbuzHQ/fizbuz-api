import { schema } from 'nexus'

schema.objectType({
  name: 'OpenGraph',
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
  },
})

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.productEmail()
    t.model.promotionalEmail()
    t.model.inboundConnections()
    t.model.outboundConnections()
    t.model.identities()
    t.model.profile()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  },
})

schema.objectType({
  name: 'Identity',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.auth0Sub()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  },
})

schema.objectType({
  name: 'Trait',
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
  },
})

schema.objectType({
  name: 'Tool',
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
  },
})

schema.objectType({
  name: 'Place',
  definition(t) {
    t.model.id()
    t.model.description()
    t.model.experiences()
    t.model.name()
    t.model.kind()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  },
})

schema.objectType({
  name: 'Connection',
  definition(t) {
    t.model.id()
    t.model.connected()
    t.model.pin()
    t.model.user()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  },
})

schema.objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.location()
    t.model.name()
    t.model.nickname()
    t.model.photo()
    t.model.about()
    t.model.preferences()
    t.model.preview()
    t.model.pronouns()
    t.model.published()
    t.model.skills()
    t.model.user()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  },
})

schema.objectType({
  name: 'Preference',
  definition(t) {
    t.model.id()
    t.model.comment()
    t.model.feels()
    t.model.published()
    t.model.trait()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  },
})

schema.objectType({
  name: 'Skill',
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
  },
})

schema.objectType({
  name: 'Activity',
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
  },
})

schema.objectType({
  name: 'External',
  definition(t) {
    t.model.id()
    t.model.profile()
    t.model.nickname()
    t.model.service()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  },
})

schema.objectType({
  name: 'Experience',
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
  },
})
