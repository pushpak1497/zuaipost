import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name "],
      maxLength: [30, "name should not exceed 30 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "please enter your email"],
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
      minLength: [8, "password must be larger than 8 characters"],
      select: false,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};
userSchema.methods.comparePassword = async function (password) {
  console.log(password);
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
