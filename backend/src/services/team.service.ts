import { Player, Position, Team, User } from "@prisma/client";
import { TeamRepo } from "../repos/team.repo";

export class TeamService {
  constructor(private teamRepo: TeamRepo) {}

  static async initializingTeam(userId: string): Promise<Team> {
    const randomPlayers = await this.getTeamPlayers()
    const teamAssigned = await TeamRepo.assignTeamToUser(randomPlayers, userId)
    
    return teamAssigned
  }


  private static async getTeamPlayers(): Promise<Player[]> {
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
  }

}
