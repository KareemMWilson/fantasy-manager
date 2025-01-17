import { Request, Response } from 'express';
import { TeamService } from '../services/team.service';

export class TeamController {
  constructor(private teamService: TeamService) {}

  async createTeam(req: Request, res: Response) {
    try{

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  }
} 