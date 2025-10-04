import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./courseSlice";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
// import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    // users: userSlice,
    course: courseSlice,
    auth: authSlice,
    category: categorySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
