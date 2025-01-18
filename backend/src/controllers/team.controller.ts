import { TeamService } from "../services/team.service";
import { Team } from "@prisma/client";

export const TeamController = {
  async createTeam(userId: string) {
    try {
      const team: Team = await TeamService.initializingTeam(userId);
      return team;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      };
    }
  },
};
