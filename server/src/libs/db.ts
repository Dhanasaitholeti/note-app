import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to Database successfully");
  } catch (error) {
    console.log(error);
    console.log("error occured while connecting to Database");
  }
};

export default connectToDb;
