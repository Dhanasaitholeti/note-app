import { NextFunction, Request, Response } from "express";
import { ErrorWithStatusCode } from "../libs/types/error.types";

const errorHandler = (
  err: ErrorWithStatusCode,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = err.statusCode || 500;

  if (err.name == "CastError") {
    statusCode = 400;
    err.message =
      "Id you have provided doesn't exist,Try to Provide a Valid Id";
  }

  res.status(statusCode).json({ error: err.message });
};

export default errorHandler;
