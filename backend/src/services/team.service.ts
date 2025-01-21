import { Player, Position, Team } from "@prisma/client";
import { TeamRepo } from "../repos/team.repo";

export const TeamService = {
  async initializingTeam(userId: string): Promise<Team> {
    const randomPlayers = await this.getTeamPlayersForNewUser();
    const teamAssigned = await TeamRepo.assignTeamToUser(randomPlayers, userId);

    return teamAssigned;
  },

  async getTeamPlayersForNewUser(): Promise<Player[]> {
    const requiredPlayersForNewUser: Record<Position, number> = {
      GOALKEEPER: 3,
      DEFENDER: 6,
      MIDFIELDER: 6,
      ATTACKER: 5,
    };

    const playerPromises = Object.entries(requiredPlayersForNewUser).map(
      async ([position, count]) => {
        return TeamRepo.getRandomPlayers(position as Position, count);
      }
    );

    const playersByPosition = await Promise.all(playerPromises);

    return playersByPosition.flat();
  },
  async getUserTeamById(userId: string): Promise<Team | null> {
    const team = await TeamRepo.getUserTeamById(userId);

    return team;
  },
};
