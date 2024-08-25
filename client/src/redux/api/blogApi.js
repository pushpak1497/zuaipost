import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (params) => ({
        url: "/posts",
        params: {
          keyword: params?.keyword,
        },
      }),
      providesTags: ["Blog"],
    }),
    getBlogDetails: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),
    createblog: builder.mutation({
      query(body) {
        return {
          url: "/posts",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Blog"],
    }),
    updateblog: builder.mutation({
      query({ id, ...body }) {
        console.log(id, body);
        return {
          url: `/posts/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Blog"],
    }),
    deleteblog: builder.mutation({
      query(id) {
        console.log(id);
        return {
          url: `/posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogDetailsQuery,
  useCreateblogMutation,
  useUpdateblogMutation,
  useDeleteblogMutation,
} = blogApi;
