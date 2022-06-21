import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type PostState = {
  post: any;
};

const initialState: PostState = {
  post: null,
};

export const postSlice = createSlice({
  name: "postState",
  initialState,
  reducers: {
    uploadPost: (state, action: PayloadAction<any>) => {
      alert("Upload post dispatched");
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { uploadPost } = postSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectPost = (state: RootState) => state.post.post;

// exporting the reducer here, as we need to add this to the store
export default postSlice.reducer;
