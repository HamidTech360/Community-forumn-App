import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type AuthState = {
  // data: object;
  user: any;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  // data: {},
  user: null,
  isAuthenticated: false,
};

export const authStateSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    // userAuthenticated: (state, action: PayloadAction<boolean>) => {
    //   state.isAuthenticated = action.payload;
    // },
    user: (state, action: PayloadAction<object>) => {
      //alert('User dispatched');
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      // state.data = {};
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { user, logout } = authStateSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.

export const selectIsAuthenticated = (state: RootState) =>
  state.authState.isAuthenticated;

export const selectUser = (state: RootState) => state.authState.user;

// exporting the reducer here, as we need to add this to the store
export default authStateSlice.reducer;
