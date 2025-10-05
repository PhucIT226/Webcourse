import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./courseSlice";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
// import userSlice from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: persistedReducer,
    // users: userSlice,
    course: courseSlice,
    category: categorySlice,
  },
});
export const persitor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
