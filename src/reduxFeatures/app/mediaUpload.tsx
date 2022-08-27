import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type MediaUploadState = {
  mediaUpload: any;
  acceptingFiles: any;
};

const initialState: MediaUploadState = {
  mediaUpload: [],
  acceptingFiles: [],
};

export const mediaUploadSlice = createSlice({
  name: "mediaUploadState",
  initialState,
  reducers: {
    setMediaUpload: (state, action: PayloadAction<any>) => {
      state.mediaUpload = action.payload;
    },
    setAcceptingFiles: (state, action: PayloadAction<any>) => {
      state.acceptingFiles = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setMediaUpload, setAcceptingFiles } = mediaUploadSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectMediaUpload = (state: RootState) =>
  state.mediaUpload.mediaUpload;
export const selectAcceptingFiles = (state: RootState) =>
  state.mediaUpload.mediaUpload;

// exporting the reducer here, as we need to add this to the store
export default mediaUploadSlice.reducer;
