import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type PostState = {
  post: any;
  // newPost: object;
  newPost: any;
  modal: boolean;
  postFormData: {
    postTitle: string;
  };
  isFetching: boolean;
};

const initialState: PostState = {
  post: null,
  newPost: {},
  modal: false,
  postFormData: {
    postTitle: "",
  },
  isFetching: false,
};

export const postSlice = createSlice({
  name: "postState",
  initialState,
  reducers: {
    uploadPost: (state, action: PayloadAction<any>) => {
      alert("Upload post dispatched");
    },
    likePost: (state, action: PayloadAction<any>) => {
      alert("Liked Post");
    },
    setPosts: (state, action: PayloadAction<any>) => {
      state.post = action.payload;
    },
    setShowPostModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setPostTitle: (state, action: PayloadAction<string>) => {
      state.postFormData.postTitle = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    // setNewPost: (state, action: PayloadAction<object>) => {
    setNewPost: (state, action: PayloadAction<any>) => {
      state.newPost = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  uploadPost,
  setPosts,
  setNewPost,
  setShowPostModal,
  setPostTitle,
  setIsFetching,
  likePost,
} = postSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectPost = (state: RootState) => state.post.post;
export const selectNewPost = (state: RootState) => state.post.newPost;
export const selectShowPostModal = (state: RootState) => state.post.modal;
export const selectPostTitle = (state: RootState) =>
  state.post.postFormData.postTitle;
export const selectIsFetching = (state: RootState) => state.post.isFetching;

// exporting the reducer here, as we need to add this to the store
export default postSlice.reducer;
