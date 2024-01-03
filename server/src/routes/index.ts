import { Application, NextFunction, Request, Response } from "express";
import userRoutes from "./user.routes";
import noteRoutes from "./notes.routes";
import { authmiddleware } from "../middlewares/authentication.middleware";

const RouteHandler = (App: Application) => {
  App.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "This is from the server" });
  });
  App.use("/user", userRoutes);
  App.use("/note", authmiddleware, noteRoutes);
};

export default RouteHandler;
