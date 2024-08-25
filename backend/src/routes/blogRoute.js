import Router from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSpecificBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { isAuthenticatedUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/posts").post(isAuthenticatedUser, createBlog);
router.route("/posts").get(getAllBlogs);
router
  .route("/posts/:id")
  .get(getSpecificBlog)
  .put(isAuthenticatedUser, updateBlog)
  .delete(isAuthenticatedUser, deleteBlog);

export default router;
