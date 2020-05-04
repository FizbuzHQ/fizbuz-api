# Fizbuz API

## Set-up

- Clone this repo
- yarn install
- `cp prisma/.env.example prisma/.env`
- Update Postgres URL to point to your local Postgres instance
- `yarn prisma migrate save --experimental`
- `yarn prisma migrate up --experimental`

## Run locally

- `yarn nexus dev`
