import type {
  Request,
  Response,
  NextFunction,
} from "express";
import { MongoServerError } from "mongodb";

const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    message: "Ruta no encontrada",
  });
};

const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(err);

  let { statusCode = 500 } = err;

  if (
    err.name === "ValidationError" ||
    err.name === "CastError"
  ) {
    statusCode = 400;
  }
  if (
    err instanceof MongoServerError && 
    err.code === 11000
  ) {
    statusCode = 409;
  }

 const message =
  statusCode === 400
    ? "Datos de entrada inválidos"
    : statusCode === 409
      ? "Correo electrónico ya registrado"
      : statusCode === 500
        ? "A ocurrido un error en el servidor"
        : err.message;

  res.status(statusCode).send({ message });
};

export { notFoundHandler, errorHandler };