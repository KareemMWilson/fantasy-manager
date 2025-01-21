import { Request, Response } from "express";
import { TeamService } from "../services/team.service";
import { Team } from "@prisma/client";

export const TeamController = {
  async createTeam(userId: string) {
    try {
      // I did it only for testing
      await new Promise((resolve) => setTimeout(resolve, 10000));

      const team: Team = await TeamService.initializingTeam(userId);
      return team;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      };
    }
  },
  async getUserTeam(req: Request, res: Response) {
    try {
      const userId = req.user.userId;

      const team = await TeamService.getUserTeamById(userId);
      if (team) {
        res.status(200).json({ success: true, data: team });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
};
