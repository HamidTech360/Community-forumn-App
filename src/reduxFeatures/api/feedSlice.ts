import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type FeedState = {
  modal: boolean;
  newFeed: object;
};

const initialState: FeedState = {
  modal: false,
  newFeed: {},
};

export const feedSlice = createSlice({
  name: "feedState",
  initialState,
  reducers: {
    setShowFeedModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setNewFeed: (state, action: PayloadAction<object>) => {
      state.newFeed = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setShowFeedModal, setNewFeed } = feedSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectFeedModal = (state: RootState) => state.feed.modal;
export const selectNewFeed = (state: RootState) => state.feed.newFeed;

// exporting the reducer here, as we need to add this to the store
export default feedSlice.reducer;
