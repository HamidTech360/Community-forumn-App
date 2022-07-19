import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type CreatePostState = {
  modal: boolean;
  newCreatePost: object;
};

const initialState: CreatePostState = {
  modal: false,
  newCreatePost: {},
};

export const createPostSlice = createSlice({
  name: "createPostState",
  initialState,
  reducers: {
    setShowCreatePostModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setNewCreatePost: (state, action: PayloadAction<object>) => {
      state.newCreatePost = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setShowCreatePostModal, setNewCreatePost } =
  createPostSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectCreatePostModal = (state: RootState) =>
  state.createPost.modal;
export const selectNewCreatePost = (state: RootState) =>
  state.createPost.newCreatePost;

// exporting the reducer here, as we need to add this to the store
export default createPostSlice.reducer;
