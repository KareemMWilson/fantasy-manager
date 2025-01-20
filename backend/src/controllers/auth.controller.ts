import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { authSchema } from "../validations/auth.validation";
import { TeamCreationService } from "../integrations/Bull";

export const AuthController ={
  authenticate: async (req: Request, res: Response) => {
    try {
      const input = authSchema.parse(req.body);
      const result = await AuthService.authenticate(input);

      res.status(result.isNewUser ? 201 : 200).json({
        success: true,
        data: {
          user: result.user,
          token: result.token,
          isNewUser: result.isNewUser,
        },
      });

      if (result.isNewUser) {
        await TeamCreationService.addTeamCreationJob(result.user.id);
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  },

  me: async (req: Request, res: Response) => {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];

      const user = await AuthService.me(accessToken!);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (error) {
      console.error("Error in me function:", error);

      return res.status(500).json({
        success: false,
        error: "Something went wrong",
      });
    }
  },
}
