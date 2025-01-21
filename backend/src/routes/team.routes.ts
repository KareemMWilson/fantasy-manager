import { Router } from 'express';
import { TeamController } from '../controllers/team.controller';
import { validateUser } from '../middlewares/validateUser';

const router = Router();


router.get('/myteam', validateUser, TeamController.getUserTeam)

export default router; 