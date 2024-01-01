import { userSignin, userSignup } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.post("/signin", userSignin);

router.post("/signup", userSignup);

export default router;
