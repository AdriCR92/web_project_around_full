import { rateLimit } from "express-rate-limit";

export const signinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
});

export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
});