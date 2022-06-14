import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/reduxFeatures/app/appSlice";
import authStateReducer from "@/reduxFeatures/authState/authStateSlice";

import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";

import postReducer from './post'
import gistReducer from './gist'

/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
  reducer: {
    post:postReducer,
    gist:gistReducer,
    app: appReducer,
    authState: authStateReducer,
  },
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
