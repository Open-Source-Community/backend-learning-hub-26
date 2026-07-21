import { Router } from "express";
import { getWelcomeMessage } from "../controller/welcomeController";

const router = Router();

router.get("/welcome", getWelcomeMessage);

export default router;
