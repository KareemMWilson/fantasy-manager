#!/bin/sh
set -e

echo "=== Waiting for database ==="
pnpm prisma db push
pnpm prisma generate

echo "=== Attempting to seed database ==="
# Temporarily allow failures so the script won't exit if `pnpm run seed` fails
SEED_OUTPUT="$(set +e; pnpm run seed 2>&1; exit_code=$?; echo "$exit_code" >&2)"
EXIT_CODE="$(echo "$SEED_OUTPUT" | tail -n1)"
SEED_LOG="$(echo "$SEED_OUTPUT" | head -n -1)"
set -e

# Print the seeding output (except for the last line that contains our exit code)
echo "$SEED_LOG"

# Check if the seed output contained "P2002"
echo "$SEED_LOG" | grep -q "P2002" && echo "Seeding skipped - data already exists"

# The script will continue either way
# (If you need to handle other exit codes differently, check $EXIT_CODE here)

echo "=== Starting application ==="
pnpm start