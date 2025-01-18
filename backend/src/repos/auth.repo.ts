import { PrismaClient, User } from "@prisma/client";
import { AuthInput } from "../validations/auth.validation";
import { prisma } from "../db/prisma";

// AuthRepo Namespace
export const AuthRepo = {
  createUser: async (data: AuthInput): Promise<User> => {
    return prisma.user.create({
      data,
    });
  },

  findUserByEmail: async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  getUserById: async (userId: string): Promise<User> => {
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
  },
};
