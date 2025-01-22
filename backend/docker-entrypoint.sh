#!/bin/sh
set -e

echo "=== Waiting for database ==="
pnpm prisma db push
pnpm prisma generate

echo "=== Attempting to seed database ==="
pnpm run seed 2>&1 | grep -q "P2002" && echo "Seeding skipped - data already exists" || true

echo "=== Starting application ==="
pnpm start