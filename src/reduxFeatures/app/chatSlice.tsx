import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

import { useDispatch, useSelector } from "@/redux/store";

// declaring the types for our state
export type Chat = {
  userToChatTimeline: [object, number];
};

const initialState: Chat = {
  userToChatTimeline: [{}, 0],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectUserToChatTimeline: (
      state,
      action: PayloadAction<[object, number]>
    ) => {
      state.userToChatTimeline = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setSelectUserToChatTimeline } = chatSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectUserToChatTimeline = (state: RootState) =>
  state.chat.userToChatTimeline;

// exporting the reducer here, as we need to add this to the store
export default chatSlice.reducer;
