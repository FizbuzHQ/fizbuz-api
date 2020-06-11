import { PrismaClient, ToolKind } from '@prisma/client'
import tools from './data/tools.json'

const db = new PrismaClient()

async function loadTools() {
  for (const i in tools) {
    const record = tools[i]
    //console.log(record)
    // transform the exported data
    const tool = {
      data: {
        name: record.name,
        nameSearch: record.nameSEARCH,
        kind: record.kind as ToolKind, // needed to deal with enum value
        description: record.description,
        url: record.url,
        verified: record.verified,
        createdAt: record.created ? new Date(parseInt(record.created)) : null,
        updatedAt: record.updated ? new Date(parseInt(record.updated)) : null,
      },
    }
    try {
      const saved = await db.tool.create(tool)
      console.log(`Record imported: ${saved.id} ${saved.name}`)
    } catch (err) {
      console.log('Record failed to import: ', record, err)
    }
  }
}

async function main() {
  await loadTools()
  db.disconnect()
}

main()
