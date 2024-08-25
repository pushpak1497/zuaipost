import { User } from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "Please login to access the resource");
  }
  const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedUserData);
  req.user = await User.findById(decodedUserData.id);
  next();
});
