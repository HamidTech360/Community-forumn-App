import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type MediaUploadState = {
  mediaUpload: any;
  postImageUpload: any;
  progressBarNum: number;
  progressBarNumPost: number;
  progressVariant: string;
  progressVariantPost: string;
};

const initialState: MediaUploadState = {
  mediaUpload: [],
  postImageUpload: [],
  progressBarNum: 0,
  progressBarNumPost: 0,
  progressVariant: "primary",
  progressVariantPost: "primary"
};

export const mediaUploadSlice = createSlice({
  name: "mediaUploadState",
  initialState,
  reducers: {
    setMediaUpload: (state, action: PayloadAction<any>) => {
      state.mediaUpload = action.payload;
    },
    setPostImageUpload: (state, action: PayloadAction<any>) => {
      state.postImageUpload = action.payload;
    },
    setProgressBarNum: (state, action: PayloadAction<any>) => {
      state.progressBarNum = action.payload;
    },
    setProgressBarNumPost: (state, action: PayloadAction<any>) => {
      state.progressBarNumPost = action.payload;
    },
    setProgressVariant: (state, action: PayloadAction<any>) => {
      state.progressVariant = action.payload;
    },
    setProgressVariantPost: (state, action: PayloadAction<any>) => {
      state.progressVariantPost = action.payload;
    }
  }
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  setMediaUpload,
  setPostImageUpload,
  setProgressBarNum,
  setProgressBarNumPost,
  setProgressVariant,
  setProgressVariantPost
} = mediaUploadSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectMediaUpload = (state: RootState) =>
  state.mediaUpload.mediaUpload;
export const selectPostImageUpload = (state: RootState) =>
  state.mediaUpload.postImageUpload;
export const selectProgressBarNum = (state: RootState) =>
  state.mediaUpload.progressBarNum;
export const selectProgressBarNumPost = (state: RootState) =>
  state.mediaUpload.progressBarNumPost;
export const selectProgressVariant = (state: RootState) =>
  state.mediaUpload.progressVariant;
export const selectProgressVariantPost = (state: RootState) =>
  state.mediaUpload.progressVariantPost;

// exporting the reducer here, as we need to add this to the store
export default mediaUploadSlice.reducer;
