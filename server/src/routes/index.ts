import { Application } from "express";

const RouteHandler = (App: Application) => {
  App.use("/user");
  App.use("/note");
};

export default RouteHandler;
