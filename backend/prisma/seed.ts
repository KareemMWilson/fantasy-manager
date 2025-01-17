import { players } from "./data/players";
import { Position, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  for (const player of players) {
    await prisma.player.create({
      data: {
        ...player,
        position: player.position as Position,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
