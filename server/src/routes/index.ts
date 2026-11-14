import { Router } from "express";
import { cardsRouter } from "./cards.js";
import { usersRouter } from "./users.js";
import { createUser, login } from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", auth, usersRouter);
router.use("/cards", auth, cardsRouter);

export { router };