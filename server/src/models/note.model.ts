import mongoose from "mongoose";

const schema = mongoose.Schema;

const noteSchema = new schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    createdUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "notes" }
);

const noteModel = mongoose.model("notes", noteSchema);

export default noteModel;
