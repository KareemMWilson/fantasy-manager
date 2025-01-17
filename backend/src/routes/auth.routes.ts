import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthRepo } from '../repos/auth.repo';
import { validateAuthInputs } from '../middlewares/validateInputs/validateInputs';

const router = Router();
const authRepo = new AuthRepo();
const authService = new AuthService(authRepo);
const authController = new AuthController(authService);

router.post('/', validateAuthInputs, (req, res) => authController.authenticate(req, res));

export default router; 