import { PrismaClient, ToolKind } from '@prisma/client'

const db = new PrismaClient()

main()

async function main() {
  const results = await Promise.all(
    [
      {
        name: 'JavaScript',
        kind: 'Language' as ToolKind,
      },
      {
        name: 'Ruby',
        kind: 'Language' as ToolKind,
      },
    ].map((data) => db.tool.create({ data })),
  )

  console.log('Seeded: %j', results)

  db.disconnect()
}
