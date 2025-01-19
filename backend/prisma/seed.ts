// import { players } from "./data/players";
// import { Position, PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {

//   for (const player of players) {
//     await prisma.player.create({
//       data: {
//         ...player,
//         position: player.position as Position,
//       },
//     });
//   }
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { players } from "./data/players";
import { Position, PrismaClient, TransferStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const password1 = await bcrypt.hash("password1", 10); 
  const password2 = await bcrypt.hash("password2", 10); 

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "user1@example.com",
        password: password1,
        budget: 5000000,
      },
    }),
    prisma.user.create({
      data: {
        email: "user2@example.com",
        password: password2,
        budget: 6000000,
      },
    }),
  ]);

  const teams = await Promise.all(
    users.map((user, index) =>
      prisma.team.create({
        data: {
          name: `Team ${index + 1}`,
          userId: user.id,
        },
      })
    )
  );

  for (const player of players) {
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];

    const createdPlayer = await prisma.player.create({
      data: {
        name: player.name,
        position: player.position as Position,
        value: player.value,
        club: player.club,
        teamId: randomTeam.id,
      },
    });

    await prisma.transfer.create({
      data: {
        playerId: createdPlayer.id,
        askingPrice: Math.floor(player.value * 1.1),
        status: TransferStatus.LISTED,
        sellerId: randomTeam.id,
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
