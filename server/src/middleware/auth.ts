import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  
  const { authorization } = req.headers;
  if (!authorization) {
    return next(
      Object.assign(new Error("Acceso no autorizado"), { statusCode: 401 })
    );
  }
  if (!authorization.startsWith("Bearer ")) {
    return next(
      Object.assign(new Error("Acceso no autorizado"), { statusCode: 401 })
    );
  }

  const token = authorization.split(" ")[1];
  
  if (!token) {
    return next(
      Object.assign(new Error("Acceso no autorizado"), { statusCode: 401 })
    );
  }
  
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return next(
      Object.assign(new Error("Error de configuración del servidor"), { statusCode: 500 })
    );
  }

let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch {
    return next(
      Object.assign(new Error("Token inválido"), { statusCode: 401 })
    );

  }

  if (
    typeof payload === "string" || 
    typeof payload._id !== "string" 
   ) {
    return next(
      Object.assign(new Error("Token inválido"), { statusCode: 401 })
    );
  }

  req.user = { _id: payload._id };
  next();
};

export { auth };