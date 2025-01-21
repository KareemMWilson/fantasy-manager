import { players } from "./data/players";
import { Position, PrismaClient, TransferStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function resetDatabase() {
  console.log("Resetting database...");

  const tables = ["Transfer", "Player", "Team", "User"];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }

  console.log("Database reset complete.");
}

async function seedDatabase() {
  console.log("Seeding database...");

  // const password1 = await bcrypt.hash("password1", 10);
  // const password2 = await bcrypt.hash("password2", 10);

  // const users = await Promise.all([
  //   prisma.user.create({
  //     data: {
  //       email: "user1@example.com",
  //       password: password1,
  //     },
  //   }),
  //   prisma.user.create({
  //     data: {
  //       email: "user2@example.com",
  //       password: password2,
  //     },
  //   }),
  // ]);

  // for (const user of users) {
  //   const team = await prisma.team.create({
  //     data: {
  //       name: `Team for ${user.email}`,
  //       userId: user.id,
  //     },
  //   });

    const teamPlayers = players.sort(() => Math.random() - 0.5).slice(0, 20);

    for (const player of players) {
      // const isInTransfer = teamPlayers.indexOf(player) < 2;
      const createdPlayer = await prisma.player.create({
        data: {
          name: player.name,
          position: player.position as Position,
          value: player.value,
          club: player.club,
          // teams: {
          //   connect: { id: team.id },
          // },
        },
      });

      // if (isInTransfer) {
      //   await prisma.transfer.create({
      //     data: {
      //       playerId: createdPlayer.id,
      //       askingPrice: Math.floor(player.value * 1.1),
      //       status: TransferStatus.LISTED,
      //       sellerId: team.id,
      //     },
      //   });
      // }
    }
  // }

  console.log("Seeding completed.");
}

async function main() {
  await resetDatabase();
  await seedDatabase();
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
