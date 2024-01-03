import { NextFunction, Request, Response } from "express";
import { ErrorWithStatusCode } from "../libs/types/error.types";

const errorHandler = (
  err: ErrorWithStatusCode,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ error: err.message });
};

export default errorHandler;
