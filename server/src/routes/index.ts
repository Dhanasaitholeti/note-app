import { Application, Request, Response } from "express";
import userRoutes from "./user.routes";
import noteRoutes from "./notes.routes";

const RouteHandler = (App: Application) => {
  App.get("/", (req: Request, res: Response, next: () => void) => {
    throw new Error("bad req");
  });
  App.use("/user", userRoutes);
  App.use("/note", noteRoutes);
};

export default RouteHandler;
