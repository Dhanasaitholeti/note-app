import { Response, Request, NextFunction } from "express";
import noteModel from "../models/note.model";
import { noteType } from "../libs/types/notes.types";
import { ErrorWithStatusCode } from "../libs/types/error.types";
import validateInputs from "../libs/helpers/validateInputs";

export const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await noteModel.find({});
    res.status(200).json({ notes });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const note = await noteModel.findById(id);
    if (!note) {
      const error: ErrorWithStatusCode = new Error(
        "Note you are looking for doesn't exist"
      );
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ notes: note });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content }: noteType = req.body;

  try {
    const error = validateInputs(title, content);

    if (error) throw error;

    const newNote = await noteModel.create({
      title,
      content,
      createdUser: req.userData.id,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    });

    res.status(201).json({ message: "new note created", notes: newNote });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content }: noteType = req.body;
  try {
    const error = validateInputs(title, content);

    if (error) throw error;
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const note = await noteModel.findById(id);
    if (!note) {
      const error: ErrorWithStatusCode = new Error(
        "Note you are looking for doesn't exist"
      );
      error.statusCode = 404;
      throw error;
    }
    await noteModel.findByIdAndDelete(id);
    res.json;
  } catch (error) {
    next(error);
  }
};
