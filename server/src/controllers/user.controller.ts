import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import getUserDataWithEmail from "../libs/helpers/getDataWithEmail";
import { tokenGenerator } from "../libs/helpers/tokenGenerator";
import userModel from "../models/user.model";
import { ErrorWithStatusCode } from "../libs/types/error.types";

export const userSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const EmailUsersData = await getUserDataWithEmail(email);
    if (!EmailUsersData) {
      const error: ErrorWithStatusCode = new Error("Invalid Credentials");
      error.statusCode = 403;
      throw error;
    }

    const passwdRes = await bcrypt.compare(
      password,
      EmailUsersData.password_hash
    );

    if (!passwdRes) {
      const error: ErrorWithStatusCode = new Error(
        "Password provided is incorrect"
      );
      error.statusCode = 404;
      throw error;
    }
    const token = await tokenGenerator({
      UserId: EmailUsersData.id,
      Email: EmailUsersData.email,
    });

    res.status(200).json({
      token,
      user: {
        id: EmailUsersData.id,
        name: EmailUsersData.name,
        email: EmailUsersData.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password } = req.body;
  try {
    const EmailUsersData = await getUserDataWithEmail(email);

    if (EmailUsersData) {
      const error: ErrorWithStatusCode = new Error(
        "Email is already in use, Try with a different email"
      );
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const NewUser = await userModel.create({
      name,
      email,
      password_hash,
    });

    res.status(201).json({ message: "Created New User" });
  } catch (error) {
    next(error);
  }
};
