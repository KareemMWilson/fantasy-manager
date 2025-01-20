import { User } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { config } from "../config";
import { AuthRepo } from "../repos/auth.repo";
import { AuthInput } from "../validations/auth.validation";

type SafeUser = Omit<User, "updatedAt" | "createdAt" | "password">;

export const AuthService = {
  authenticate: async (
    input: AuthInput
  ): Promise<{ user: SafeUser; token: string; isNewUser: boolean }> => {
    const existingUser = await AuthRepo.findUserByEmail(input.email);

    if (existingUser) {
      const isPasswordValid = await compare(input.password, existingUser.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }
      const token = generateToken(existingUser);
      return { user: toSafeUser(existingUser), token, isNewUser: false };
    } else {
      const hashedPassword = await hash(input.password, 10);
      const newUser = await AuthRepo.createUser({
        ...input,
        password: hashedPassword,
      });

      const token = generateToken(newUser);
      return { user: toSafeUser(newUser), token, isNewUser: true };
    }
  },

  me: async (accessToken: string): Promise<User> => {
    const decoded = verify(accessToken, config.jwt.secret) as { userId: string };
    const userId = decoded.userId;
    const user = await AuthRepo.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
}

const generateToken = (user: User): string => {
  return sign({ userId: user.id, email: user.email }, config.jwt.secret, {
    expiresIn: "1d",
  });
};

const toSafeUser = (user: User): SafeUser => {
  const { password, createdAt, updatedAt, ...safeUser } = user;
  return safeUser;
};
