#!/bin/sh
set -e

echo "=== Entrypoint: Running Prisma migrations, seeding, and starting the app ==="

pnpm prisma db push

pnpm prisma generate

pnpm run seed

pnpm start
