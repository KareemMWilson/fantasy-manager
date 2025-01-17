import { PrismaClient, Team, User } from '@prisma/client';
import { TeamInput } from '../validations/team.validation';

const prisma = new PrismaClient();

export class TeamRepo {
  async createUser(data: TeamInput): Promise<Team[]> {
    return []
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
} 