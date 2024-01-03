import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application } from "express";
import bodyParser from "body-parser";
import RouteHandler from "./routes";
import errorHandler from "./middlewares/errorHandler.middleware";
import connectToDb from "./libs/db";

const port = process.env.PORT || 8000;

const App: Application = express();

App.use(cors());
App.use(bodyParser.json());

connectToDb();
RouteHandler(App);
App.use(errorHandler);

App.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
