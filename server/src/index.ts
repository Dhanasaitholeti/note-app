import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application } from "express";
import bodyParser from "body-parser";
import RouteHandler from "routes";

const App: Application = express();

App.use(cors());
App.use(bodyParser.json());

RouteHandler(App);

App.listen(() => {
    
})
