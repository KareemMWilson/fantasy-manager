import { players } from "./data/players";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  for (const player of players) {
    await prisma.player.create({
      data: {
        ...player,
      },
    });
  }

  const playersToList = await prisma.player.findMany({
    take: Math.floor(players.length * 0.2),
    orderBy: { value: "desc" },
  });

  for (const player of playersToList) {
    await prisma.transfer.create({
      data: {
        playerId: player.id,
        askingPrice: Math.floor(player.value * 1.2),
        sellerId: player.teamId,
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
