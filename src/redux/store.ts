import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/reduxFeatures/app/appSlice";
import chatReducer from "@/reduxFeatures/app/chatSlice";
import authStateReducer from "@/reduxFeatures/authState/authStateSlice";
import postReducer from "@/reduxFeatures/api/postSlice";
import gistReducer from "@/reduxFeatures/api/gistSlice";
import feedReducer from "@/reduxFeatures/api/feedSlice";
import groupReducer from "@/reduxFeatures/api/groupSlice";
import createPostReducer from "@/reduxFeatures/app/createPost";
import dragAndDropReducer from "@/reduxFeatures/app/dragAndDropSlice";
import searchReducer from "@/reduxFeatures/api/searchSlice";
import postModalCardReducer from "@/reduxFeatures/app/postModalCardSlice";
import notificationReducer from "@/reduxFeatures/api/notifications";

import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";

/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
  reducer: {
    post: postReducer,
    gist: gistReducer,
    feed: feedReducer,
    group: groupReducer,
    createPost: createPostReducer,
    app: appReducer,
    chat: chatReducer,
    authState: authStateReducer,
    dragAndDrop: dragAndDropReducer,
    search: searchReducer,
    postModalCard: postModalCardReducer,
    notification: notificationReducer,
  },

  // Prevent Age (dateTime) from returning unSterilized error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState}
type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
