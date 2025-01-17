import { PrismaClient, User } from '@prisma/client';
import { AuthInput } from '../validations/auth.validation';

const prisma = new PrismaClient();

export class AuthRepo {
  async createUser(data: AuthInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
} 