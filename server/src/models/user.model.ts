import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password_hash: {
      type: String,
      require: true,
    },
  },
  { collection: "users" }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
