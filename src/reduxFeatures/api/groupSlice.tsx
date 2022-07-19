import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type GroupState = {
  newGroupFeed: object;
};

const initialState: GroupState = {
  newGroupFeed: {},
};

export const groupSlice = createSlice({
  name: "groupState",
  initialState,
  reducers: {
    setNewGroupFeed: (state, action: PayloadAction<object>) => {
      state.newGroupFeed = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setNewGroupFeed } = groupSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
// export const selectFeedModal = (state: RootState) => state.feed.modal;
export const selectNewGroupFeed = (state: RootState) =>
  state.group.newGroupFeed;

// exporting the reducer here, as we need to add this to the store
export default groupSlice.reducer;
