import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: "Acceso no autorizado" });
    return;
  }
  if (!authorization.startsWith("Bearer ")) {
    res.status(401).json({ message: "Acceso no autorizado" });
    return;
  }

  const token = authorization.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ message: "Acceso no autorizado" });
    return;
  }
  
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).json({ message: "Error de configuración del servidor" });
    return;
  }

let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch {
    res.status(401).json({ message: "Token inválido" });
    return;
  }

  if (
    typeof payload === "string" || 
    typeof payload._id !== "string" 
   ) {
    res.status(401).json({ message: "Token inválido" });
    return;
  }

  req.user = { _id: payload._id };
  next();
};

export { auth };