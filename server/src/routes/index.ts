import { Router } from "express";
import { cardsRouter } from "./cards.js";
import { usersRouter } from "./users.js";
import { createUser, login } from "../controllers/users.js";
import { auth } from "../middleware/auth.js";
import { signinLimiter, signupLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/signup", signupLimiter, createUser);
router.post("/signin", signinLimiter, login);

router.use("/users", auth, usersRouter);
router.use("/cards", auth, cardsRouter);

export { router };