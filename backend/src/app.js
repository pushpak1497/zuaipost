import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
import blogRouter from "./routes/blogRoute.js";
import userRouter from "./routes/userRoute.js";

app.use(blogRouter);
app.use(userRouter);

export { app };
