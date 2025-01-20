import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateAuthInputs } from "../middlewares/validateInputs/validateInputs";
import { validateUser } from "../middlewares/validateUser";

const router = Router();


router.get("/me",validateUser, AuthController.me);
router.post("/", validateAuthInputs, AuthController.authenticate);

export default router;
