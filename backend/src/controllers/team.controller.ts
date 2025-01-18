import { Request, Response } from 'express';
import { TeamService } from '../services/team.service';
import { Team } from '@prisma/client';

export class TeamController {
  constructor(private teamService: TeamService) {}

  static async createTeam(userId: string) {
    try{
      console.log(`Start creating Team for user with id: ${userId}`)
      const team: Team = await TeamService.initializingTeam(userId)
      console.log(`Finish creating Team for ${userId}`)
      return team
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong',
      }
    }
  }
} 