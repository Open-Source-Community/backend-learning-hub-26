import { Router, Request, Response } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controller";
import { authentication } from "../middlewares/auth.middleware";

const router = Router();


router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

router.get("/profile", authentication, (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    msg: "You are authenticated",
  });
});

export { router };
