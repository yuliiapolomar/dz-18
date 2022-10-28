import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import postApi from "./api/posts";
import postSlice from "./api/postsSlice";



export default configureStore({
    reducer: {
        posts: postSlice,
        [postApi.reducerPath]:postApi.reducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware)
  })