import { ErrorWithStatusCode } from "../../libs/types/error.types";

const validateInputs = (title: String, content: String) => {
  if (title.length < 20 || content.length < 40) {
    const error: ErrorWithStatusCode = new Error(
      "Please ensure title and content are required length"
    );
    error.statusCode = 400;
    return error;
  }
  return false;
};

export default validateInputs;
