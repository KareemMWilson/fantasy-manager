import { Router } from 'express';
import { TeamController } from '../controllers/team.controller';
import { TeamRepo } from '../repos/team.repo';
import { TeamService } from '../services/team.service';

const router = Router();
const teamRepo = new TeamRepo();
const teamService = new TeamService(teamRepo);
const teamController = new TeamController(teamService);

router.post('/create-team', (req, res) => teamController.createTeam(req, res));

export default router; 