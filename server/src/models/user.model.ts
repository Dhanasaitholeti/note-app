import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({}, { collection: "users" });

const userModel = mongoose.model("users", userSchema);

export default userModel;
