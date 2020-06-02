# Migration `20200515152941-added-place-experiences-relationship`

This migration has been generated by Carter Rabasa at 5/15/2020, 3:29:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200515152526-added-auth0sub-unique-constraint..20200515152941-added-place-experiences-relationship
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator prisma_client {
   provider = "prisma-client-js"
@@ -160,8 +160,9 @@
 	kind        				PlaceKind
 	name        				String       @unique
 	url         				String?
 	description 				String?
+	experiences					Experience[] @relation
 	verified    				Boolean      @default(false)
 	createdAt   				DateTime     @default(now())
 	updatedAt   				DateTime?
 	deletedAt   				DateTime?
```

