import request from "supertest";
import express from "express";
import RouteHandler from "../routes";

describe("Test the root path", () => {
  
  const app = express();
  RouteHandler(app);

  it("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("This is from the server");
  });
});


