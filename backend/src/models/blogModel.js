import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: [true, "please provide Title"] },
    description: {
      type: String,
      required: [true, "please provide description"],
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
