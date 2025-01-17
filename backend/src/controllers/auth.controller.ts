import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { authSchema } from '../validations/auth.validation';

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
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  }
} 