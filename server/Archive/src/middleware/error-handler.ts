import type {
  Request,
  Response,
  NextFunction,
} from "express";

const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    message: "Requested resource not found",
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

  const message =
  statusCode === 400
    ? "Invalid data"
    : statusCode === 500
      ? "An error has occurred on the server"
      : err.message;

  res.status(statusCode).send({ message });
};

export { notFoundHandler, errorHandler };