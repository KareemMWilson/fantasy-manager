import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateAuthInputs } from "../middlewares/validateInputs/validateInputs";

const router = Router();


router.post("/", validateAuthInputs, AuthController.authenticate);
router.get("/me", AuthController.me);

export default router;
