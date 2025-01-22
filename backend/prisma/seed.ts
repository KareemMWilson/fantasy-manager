import { PrismaClient, Position, TransferStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { players } from "./data/players";

const prisma = new PrismaClient();

const POSITION_POOL = ["GOALKEEPER", "DEFENDER", "MIDFIELDER", "ATTACKER"];

export const allPlayers = [
  ...players,
  ...Array.from({ length: 40 }, (_, i) => {
    const randomPosition =
      POSITION_POOL[Math.floor(Math.random() * POSITION_POOL.length)];

    return {
      name: `Unique Player ${i + 1}`,      // ensures unique names
      position: randomPosition,            // random position
      value: 500_000 + i * 10_000,         // or any logic for value
      club: "Fantasy FC",                  // or any club name
    };
  }),
];

async function resetDatabase() {
  console.log("Resetting database...");

  const tables = ["Transfer", "Player", "Team", "User"];
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }

  console.log("Database reset complete.");
}

async function seedPlayers() {
  console.log("Seeding 100 players...");

  // Bulk create all players
  await prisma.player.createMany({
    data: allPlayers.map((p) => ({
      name: p.name,
      position: p.position as Position,
      value: p.value,
      club: p.club,
    })),
  });

  console.log("100 players created.");
}

async function seedUsersAndTeams() {
  console.log("Creating users and their teams...");

  // Create 2 users with hashed passwords
  const [user1, user2] = await Promise.all([
    prisma.user.create({
      data: {
        email: "user1@example.com",
        password: await bcrypt.hash("password1", 10),
      },
    }),
    prisma.user.create({
      data: {
        email: "user2@example.com",
        password: await bcrypt.hash("password2", 10),
      },
    }),
  ]);

  // Create a team for each user
  const [team1, team2] = await Promise.all([
    prisma.team.create({
      data: {
        name: `Team for ${user1.email}`,
        userId: user1.id,
      },
    }),
    prisma.team.create({
      data: {
        name: `Team for ${user2.email}`,
        userId: user2.id,
      },
    }),
  ]);

  const allCreatedPlayers = await prisma.player.findMany();

  function pickRandomPlayers(array: typeof allCreatedPlayers, count: number) {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  const team1Players = pickRandomPlayers(allCreatedPlayers, 20);
  const team2Players = pickRandomPlayers(allCreatedPlayers, 20);

  await prisma.team.update({
    where: { id: team1.id },
    data: {
      players: {
        connect: team1Players.map((p) => ({ id: p.id })),
      },
    },
  });

  await prisma.team.update({
    where: { id: team2.id },
    data: {
      players: {
        connect: team2Players.map((p) => ({ id: p.id })),
      },
    },
  });

  const [team1TransferList, team2TransferList] = [
    pickRandomPlayers(team1Players, 4),
    pickRandomPlayers(team2Players, 4),
  ];

  for (const player of team1TransferList) {
    await prisma.transfer.create({
      data: {
        playerId: player.id,
        askingPrice: Math.floor(player.value * 1.1),
        status: TransferStatus.LISTED,
        sellerId: team1.id,
      },
    });
  }

  for (const player of team2TransferList) {
    await prisma.transfer.create({
      data: {
        playerId: player.id,
        askingPrice: Math.floor(player.value * 1.1),
        status: TransferStatus.LISTED,
        sellerId: team2.id,
      },
    });
  }

  console.log("Users, teams, and transfers created.");
}

async function main() {
  // await resetDatabase();
  await seedPlayers();
  await seedUsersAndTeams();
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
