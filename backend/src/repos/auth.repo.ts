import { PrismaClient, User } from '@prisma/client';
import { AuthInput } from '../validations/auth.validation';
import { prisma } from '../db/prisma';


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

  async getUserById(userId: string): Promise<User>{
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        team: true,
      },
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user;
  }
} 