import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type Chat = {
  userToChatTimeline: [object, number];
  initMessages: Record<string, string>[];
  messages: Record<string, string>[];
  reFocusChatEditor: boolean;
};

const initialState: Chat = {
  userToChatTimeline: [{}, 0],
  initMessages: [],
  messages: [],
  reFocusChatEditor: false
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserToChatTimeline: (state, action: PayloadAction<[object, number]>) => {
      state.userToChatTimeline = action.payload;
    },
    setInitMessages: (
      state,
      action: PayloadAction<Record<string, string>[]>
    ) => {
      state.initMessages = action.payload;
    },
    setMessages: (state, action: PayloadAction<Record<string, string>[]>) => {
      state.messages = action.payload;
    },
    setReFocusChatEditor: state => {
      state.reFocusChatEditor = !state.reFocusChatEditor;
    }
  }
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setUserToChatTimeline,
  setInitMessages,
  setMessages,
  setReFocusChatEditor
} = chatSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectedUserInChatTimeline = (state: RootState) =>
  state.chat.userToChatTimeline;
export const selectInitMessages = (state: RootState) => state.chat.initMessages;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectReFocusChatEditor = (state: RootState) =>
  state.chat.reFocusChatEditor;

// exporting the reducer here, as we need to add this to the store
export default chatSlice.reducer;
