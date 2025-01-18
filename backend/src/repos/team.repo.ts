import { Player, Position, PrismaClient, Team, User } from '@prisma/client';

const prisma = new PrismaClient();

export class TeamRepo {
  static async getRandomPlayers(position: Position, count: number): Promise<Player[]> {
    try {
      const players = await prisma.$queryRaw<Player[]>`
        SELECT *
        FROM "Player"
        WHERE position = ${position}::"Position"
        ORDER BY RANDOM()
        LIMIT ${count}
      `;
      return players;
    } catch (error) {
      console.log({ error });
      return [];
    }
  }

  static async assignTeamToUser(players: Player[], userId: string): Promise<Team>{
    const team = await prisma.team.create({
      data: {
      userId: userId,
      players: {
        connect: players.map(player => ({ id: player.id }))
      }
      }
    });
  
    return team;
  }

  
} 