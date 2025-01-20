import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateAuthInputs } from "../middlewares/validateInputs/validateInputs";

const router = Router();


router.get("/me", AuthController.me);
router.post("/", validateAuthInputs, AuthController.authenticate);

export default router;
