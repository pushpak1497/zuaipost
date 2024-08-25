import { Blog } from "../models/blogModel.js";
import { ApiError } from "../utils/apiError.js";
import ApiFilter from "../utils/apiFilter.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!(title || description)) {
    throw new ApiError(401, "Both fields is required");
  }

  const isBlogPresent = await Blog.findOne({ title });
  if (isBlogPresent) {
    throw new ApiError(401, "Blog Already created with the given title");
  }
  const newBlog = await Blog.create({
    title,
    description,
    owner: req?.user?._id,
  });
  // console.log(newBlog);
  return res
    .status(200)
    .json(new ApiResponse(200, newBlog, "Blog Post created successfully"));
});

export const getAllBlogs = asyncHandler(async (req, res) => {
  const apiFilters = new ApiFilter(Blog, req.query).search();
  const blogs = await apiFilters.query.clone();
  res
    .status(200)
    .json(new ApiResponse(200, blogs, "All Blog Posts fetched successfully"));
});

export const getSpecificBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError(404, "Blog Not present withe the given ID");
  }
  res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog Post fetched successfully"));
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError(404, "Specific Blog is not found in Database");
  }

  const newBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  res
    .status(200)
    .json(new ApiResponse(200, newBlog, "Blog Updated successfully"));
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new ApiError(404, "The Given Blog is not found in Database");
  }

  if (blog?.owner.toString() != req.user._id) {
    throw new ApiError(401, "Only owner has access to delete");
  }

  await Blog.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, "Blog deleted successfully"));
});
