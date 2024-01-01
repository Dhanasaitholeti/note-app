import mongoose from "mongoose";

const schema = mongoose.Schema;

const noteSchema = new schema({}, { collection: "notes" });

const noteModel = mongoose.model("notes", noteSchema);

export default noteModel;
