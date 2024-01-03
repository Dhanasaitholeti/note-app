import request from "supertest";
import express from "express";
import RouteHandler from "../routes";
import Note from "../models/note.model"; // import your note model
import connectToDb from "../libs/db";
import dotenv from "dotenv";
dotenv.config();

let token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NTk0Y2NmZjU1NTg0ZjMyZWQxYTMwYTgiLCJFbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNzA0MjYzOTA5LCJleHAiOjE3MDQ2OTU5MDl9.BqPnKz9g0lTDiZLeQi5Rfu7FNysya7xLKiI5J377D6Y";

describe("Note Routes", () => {
  jest.setTimeout(30000);

  const app = express();

  beforeAll(async () => {
    await connectToDb(); // Wait for the database connection to be established
    RouteHandler(app);
  });

  beforeEach(async () => {
    await Note.deleteMany({}); // clean up the database before each test
  });

  //   it("should log in and return a token", async () => {
  //     const res = await request(app).post("/user/signin").send({
  //       email: "example@gmail.com",
  //       password: "123456",
  //     });
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body.token).toBeDefined();
  //     token = res.body.token; // Save the token for later use
  //   });

  it("should fetch all notes", async () => {
    const res = await request(app)
      .get("/note")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.notes)).toBeTruthy();
  });

  it("should create a new note", async () => {
    const res = await request(app)
      .post("/note")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "It Is Test Title",
        content: "This Is A Test Content Content That I'm Testing Right Now",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("new note created");
  });

  it("should update a note", async () => {
    let note = new Note({
      title: "This is Old Title",
      content:
        "This is Old Content THat I'm testing to make sure it is working correctly",
    });
    await note.save();

    const res = await request(app)
      .put(`/note/${note._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Title", content: "New Content" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Note updated sucessfully");
  });

  it("should delete a note", async () => {
    let note = new Note({
      title: "Title to be deleted",
      content: "Content to be deleted",
    });
    await note.save();

    const res = await request(app)
      .delete(`/note/${note._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("note successfully deleted");
  });
});
