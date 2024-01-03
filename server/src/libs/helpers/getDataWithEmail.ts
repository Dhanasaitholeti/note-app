import userModel from "../../models/user.model";

const getUserDataWithEmail = async (email: string) => {
  const EmailUserData = await userModel.findOne({ email });
  return EmailUserData;
};

export default getUserDataWithEmail;
