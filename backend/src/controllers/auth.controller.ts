import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { authSchema } from '../validations/auth.validation';
import TeamCreationService from '../integrations/Bull';



const teamCreationService = new TeamCreationService()
export class AuthController {
  constructor(private authService: AuthService) {}

  async authenticate(req: Request, res: Response) {
    try {
      const input = authSchema.parse(req.body);
      const result = await this.authService.authenticate(input);
      
      res.status(result.isNewUser ? 201 : 200).json({
        success: true,
        data: {
          user: result.user,
          token: result.token,
          isNewUser: result.isNewUser
        },
      });
      if (result.isNewUser) {
        return teamCreationService.addTeamCreationJob(result.user.id)
      }
      return
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
  
      if (!accessToken) {
        return res.status(401).json({
          success: false,
          error: "Access token is missing",
        });
      }
  
      const user = this.authService.me(accessToken)
  
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
  }
  
} 