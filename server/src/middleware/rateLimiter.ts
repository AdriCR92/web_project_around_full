import { rateLimit } from "express-rate-limit";

export const signinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message:{
    message: "Demasiados intentos de inicio de sesión, por favor intente nuevamente después de 15 minutos.",
  }
});

export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  message:{
    message: "Demasiados intentos de registro, por favor intente nuevamente después de 1 hora.",
  }
});