import { User } from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// register user route:"/api/v1/users/register"
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  const updatedUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User created successfully"));
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email || password)) {
    throw new ApiError(401, "please enter email and password");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(400, "Invalid Email or password");
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new ApiError(401, "Enter valid password");
  }
  const token = user.getJwtToken();
  //console.log(token);
  const createdUser = await User.findById(user._id).select("-password");
  const options = { httpOnly: true, secure: true };
  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, createdUser, "user logged in successfully"));
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  console.log(req.cookies);
  res
    .status(200)
    .cookie("token", "", { http: true })
    .json(new ApiResponse(200, {}, "User loggedout successfully"));
});
