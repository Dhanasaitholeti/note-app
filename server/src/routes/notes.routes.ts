import {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";
import { Router } from "express";

const router = Router();

router.get("/", getAllNotes);

router.get("/:id", getNote);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
