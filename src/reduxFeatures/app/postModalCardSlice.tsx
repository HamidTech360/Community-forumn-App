import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type PostModalCardState = {
  // likeChanged: any;
  // bookmarkChanged: any;
  likeChangedModal: string;
  unLikeChangedModal: string;
  // bookmarkChangedModal: any;
};

const initialState: PostModalCardState = {
  // likeChanged: [],
  // bookmarkChanged: [],
  likeChangedModal: "",
  unLikeChangedModal: "",
  // bookmarkChangedModal: [],
};

export const postModalCardSlice = createSlice({
  name: "postModalCard",
  initialState,
  reducers: {
    // setLikeChanged: (state, action: PayloadAction<any>) => {
    //   state.likeChanged = action.payload;
    // },
    // setBookMarkChanged: (state, action: PayloadAction<any>) => {
    //   state.bookmarkChanged = action.payload;
    // },
    setLikeChangedModal: (state, action: PayloadAction<string>) => {
      state.likeChangedModal = action.payload;
    },
    setUnLikeChangedModal: (state, action: PayloadAction<string>) => {
      state.unLikeChangedModal = action.payload;
    },
    // setBookMarkChangedModal: (state, action: PayloadAction<any>) => {
    //   state.bookmarkChangedModal = action.payload;
    // },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  // setLikeChanged,
  // setBookMarkChanged,
  setLikeChangedModal,
  setUnLikeChangedModal,
  // setBookMarkChangedModal,
} = postModalCardSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
// export const selectLikeChanged = (state: RootState) =>
//   state.postModalCard.likeChanged;
// export const selectBookMarkChanged = (state: RootState) =>
//   state.postModalCard.bookmarkChanged;
export const selectLikeChangedModal = (state: RootState) =>
  state.postModalCard.likeChangedModal;
export const selectUnLikeChangedModal = (state: RootState) =>
  state.postModalCard.unLikeChangedModal;
// export const selectBookMarkChangedModal = (state: RootState) =>
//   state.postModalCard.bookmarkChangedModal;

// exporting the reducer here, as we need to add this to the store
export default postModalCardSlice.reducer;
