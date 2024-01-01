import { Request, Response } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: () => void
) => {
  res.status(500).json({ error: "something went wrong lol:)" });
};

export default errorHandler;
