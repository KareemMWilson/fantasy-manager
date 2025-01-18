import { User } from "@prisma/client";

import { AuthRepo } from "../repos/auth.repo";
import { AuthInput } from "../validations/auth.validation";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config";
import jwt from "jsonwebtoken";

type SafeUser = Omit<User, "updatedAt" | "createdAt" | "password">;
export class AuthService {
  constructor(private authRepo: AuthRepo) {}

  async authenticate(
    input: AuthInput
  ): Promise<{ user: SafeUser; token: string; isNewUser: boolean }> {
    let existingUser = await this.authRepo.findUserByEmail(input.email);

    if (existingUser) {
      const isPasswordValid = await compare(
        input.password,
        existingUser.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const token = this.generateToken(existingUser);
      return { user: this.toSafeUser(existingUser), token, isNewUser: false };
    } else {
      const hashedPassword = await hash(input.password, 10);
      const newUser = await this.authRepo.createUser({
        ...input,
        password: hashedPassword,
      });

      const token = this.generateToken(newUser);
      return { user: this.toSafeUser(newUser), token, isNewUser: true };
    }
  }

  async me(accessToken: string): Promise<User> {
    const decoded = jwt.verify(accessToken, config.jwt.secret) as {
      userId: string;
    };

    const userId = decoded.userId;
    const user = this.authRepo.getUserById(userId);

    return user;
  }

  private generateToken(user: User): string {
    return sign({ userId: user.id, email: user.email }, config.jwt.secret, {
      expiresIn: "1d",
    });
  }

  private toSafeUser(user: User): SafeUser {
    const { password, createdAt, updatedAt, ...safeUser } = user;
    return safeUser;
  }
}
