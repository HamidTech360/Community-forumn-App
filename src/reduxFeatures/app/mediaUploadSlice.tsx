import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type MediaUploadState = {
  mediaUpload: any;
  progressBarNum: number;
  progressVariant: string;
};

const initialState: MediaUploadState = {
  mediaUpload: [],
  progressBarNum: 0,
  progressVariant: "primary"
};

export const mediaUploadSlice = createSlice({
  name: "mediaUploadState",
  initialState,
  reducers: {
    setMediaUpload: (state, action: PayloadAction<any>) => {
      state.mediaUpload = action.payload;
    },
    setProgressBarNum: (state, action: PayloadAction<any>) => {
      state.progressBarNum = action.payload;
    },
    setProgressVariant: (state, action: PayloadAction<any>) => {
      state.progressVariant = action.payload;
    }
  }
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setMediaUpload, setProgressBarNum, setProgressVariant } =
  mediaUploadSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectMediaUpload = (state: RootState) =>
  state.mediaUpload.mediaUpload;
export const selectProgressBarNum = (state: RootState) =>
  state.mediaUpload.progressBarNum;
export const selectProgressVariant = (state: RootState) =>
  state.mediaUpload.progressVariant;

// exporting the reducer here, as we need to add this to the store
export default mediaUploadSlice.reducer;
