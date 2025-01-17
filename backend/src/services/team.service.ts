import { User } from "@prisma/client";
import { TeamRepo } from "../repos/team.repo";
import { TeamInput } from "../validations/team.validation";

type SafeUser = Omit<User, 'updatedAt' | 'createdAt' | 'password'>;
export class TeamService {
  constructor(private teamRepository: TeamRepo) {}

  async createTeamForUser(
    input: TeamInput
  ) {
    
  }

}
