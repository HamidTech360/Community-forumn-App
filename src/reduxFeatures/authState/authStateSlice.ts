import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type AuthState = {
  // data: object;
  user: any;
  isAuthenticated: boolean;
  followers: any;
  following: any;
};

const initialState: AuthState = {
  // data: {},
  user: null,
  isAuthenticated: false,
  followers: [],
  following: [],
};

export const authStateSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    
    user: (state, action: PayloadAction<object>) => {
      
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
    setFollowers: (state, action: PayloadAction<any>) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action: PayloadAction<any>) => {
      state.following = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { user, logout, setFollowers, setFollowing } =
  authStateSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.

export const selectIsAuthenticated = (state: RootState) =>
  state.authState.isAuthenticated;

export const selectUser = (state: RootState) => state.authState.user;

export const selectFollowers = (state: RootState) => state.authState.followers;
export const selectFollowing = (state: RootState) => state.authState.following;

// exporting the reducer here, as we need to add this to the store
export default authStateSlice.reducer;
