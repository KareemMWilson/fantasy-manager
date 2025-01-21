import { Player, Position, Prisma, Team } from "@prisma/client";
import { prisma } from "../db/prisma";

export const TeamRepo = {
  async getRandomPlayers(position: Position, count: number): Promise<Player[]> {
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
      console.error("Error fetching random players:", error);
      return [];
    }
  },

  async assignTeamToUser(players: Player[], userId: string): Promise<Team> {
    try {
      const team = await prisma.team.create({
        data: {
          userId: userId,
          players: {
            connect: players.map((player) => ({ id: player.id })),
          },
        },
      });
      return team;
    } catch (error) {
      console.error("Error assigning team to user:", error);
      throw error;
    }
  },
  async getUserTeamById(userId: string): Promise<Prisma.TeamGetPayload<{
    include: { players: { include: { transfers: true } } };
  }> | null> {
    try {
      const team = await prisma.team.findFirst({
        where: {
          userId,
        },
      });

      if (!team) return null;

      return await prisma.team.findFirst({
        where: {
          id: team.id,
        },
        include: {
          players: {
            include: {
              transfers: {
                where: {
                  AND: [{ status: "LISTED" }, { sellerId: team.id }],
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Error assigning team to user:", error);
      throw error;
    }
  },
  chechPlayerExistanceInATeam: async (teamId: string, playerId: string) => {
    const player = await prisma.team.findFirst({
      where: {
        id: teamId,
        players: {
          some: {
            id: playerId,
          },
        },
      },
    });
    return player !== null
  },
};
