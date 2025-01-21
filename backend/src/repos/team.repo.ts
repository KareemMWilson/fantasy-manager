import { Player, Position, Team } from "@prisma/client";
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
  async getUserTeamById(userId: string): Promise<Team | null> {
    try {
      const team = await prisma.team.findFirst({
        where: {
          userId
        },
        include: {
          players: true
        }
      })
      return team
    } catch (error) {
      console.error("Error assigning team to user:", error);
      throw error;
    }
  }
};
