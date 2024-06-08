import { configureStore } from "@reduxjs/toolkit";
import { saveMiddleware } from "./middleware";
import { rootReducer } from "./rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveMiddleware),
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
