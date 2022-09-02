import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type MentionsState = {
  search: string;
  index: number;
  target: any;
  followedUserDetails: any;
};

const initialState: MentionsState = {
  search: "",
  index: 0,
  target: undefined,
  followedUserDetails: undefined,
};

export const mentionsSlice = createSlice({
  name: "mentionsState",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setTarget: (state, action: PayloadAction<any>) => {
      state.target = action.payload;
    },
    setFollowedUserDetails: (state, action: PayloadAction<any>) => {
      state.followedUserDetails = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setSearch, setIndex, setTarget, setFollowedUserDetails } =
  mentionsSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectSearch = (state: RootState) => state.mentions.search;
export const selectIndex = (state: RootState) => state.mentions.index;
export const selectTarget = (state: RootState) => state.mentions.target;
export const selectFollowedUserDetails = (state: RootState) =>
  state.mentions.followedUserDetails;

// exporting the reducer here, as we need to add this to the store
export default mentionsSlice.reducer;
