import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./api/blogApi";
import { authApi } from "./api/authApi";
import userReducer from "./feature/userSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,

    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([blogApi.middleware, authApi.middleware]),
});
