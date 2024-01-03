import jwt, { JwtPayload } from "jsonwebtoken";
import express, { NextFunction } from "express";
import getUserDataWithEmail from "../libs/helpers/getDataWithEmail";

interface UserData {
  id: string;
  email: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      userData: UserData | null;
    }
  }
}

export const authmiddleware = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY) as JwtPayload;
      const data = await getUserDataWithEmail(decoded.Email);
      req.userData = {
        ...req.userData,
        ...{ id: data.id, email: data.email, name: data.name },
      };
      next();
    } catch (error) {
      res.status(400).send("please try to login");
    }
  } else {
    res.status(401).send("please try to login");
  }
};
