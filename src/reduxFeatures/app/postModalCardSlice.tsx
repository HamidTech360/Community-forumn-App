import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type PostModalCardState = {
  // likeChanged: any;
  // bookmarkChanged: any;
  likeChangedModal: string;
  unLikeChangedModal: string;
  modalCardPostEdited: any;
  // bookmarkChangedModal: any;
  commentModal: boolean;
  editableComment: any;
  commentIsEdited: any;
  commentIsDeleted: any;
  imageModalOpen: boolean;
  imageModalImg: { media: any; activeIndex: number };
};

const initialState: PostModalCardState = {
  // likeChanged: [],
  // bookmarkChanged: [],
  likeChangedModal: "",
  unLikeChangedModal: "",
  modalCardPostEdited: null,
  // bookmarkChangedModal: [],
  commentModal: false,
  editableComment: null,
  commentIsEdited: null,
  commentIsDeleted: null,
  imageModalOpen: false,
  imageModalImg: { media: [], activeIndex: 0 },
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
    setModalCardPostEdited: (state, action: PayloadAction<any>) => {
      state.modalCardPostEdited = action.payload;
    },
    // setBookMarkChangedModal: (state, action: PayloadAction<any>) => {
    //   state.bookmarkChangedModal = action.payload;
    // },
    setShowCommentModal: (state, action: PayloadAction<boolean>) => {
      state.commentModal = action.payload;
    },
    setEditableComment: (state, action: PayloadAction<any>) => {
      state.editableComment = action.payload;
    },
    setCommentIsEdited: (state, action: PayloadAction<any>) => {
      state.commentIsEdited = action.payload;
    },
    setCommentIsDeleted: (state, action: PayloadAction<any>) => {
      state.commentIsDeleted = action.payload;
    },
    setImageModalOpen: (state, action: PayloadAction<boolean>) => {
      state.imageModalOpen = action.payload;
    },
    setImageModalImg: (
      state,
      action: PayloadAction<{ media: any; activeIndex: number }>
    ) => {
      state.imageModalImg = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  // setLikeChanged,
  // setBookMarkChanged,
  setLikeChangedModal,
  setUnLikeChangedModal,
  setModalCardPostEdited,
  // setBookMarkChangedModal,
  setShowCommentModal,
  setEditableComment,
  setCommentIsEdited,
  setCommentIsDeleted,
  setImageModalOpen,
  setImageModalImg,
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
export const selectModalCardPostEdited = (state: RootState) =>
  state.postModalCard.modalCardPostEdited;
// export const selectBookMarkChangedModal = (state: RootState) =>
//   state.postModalCard.bookmarkChangedModal;
export const selectShowCommentModal = (state: RootState) =>
  state.postModalCard.commentModal;
export const selectEditableComment = (state: RootState) =>
  state.postModalCard.editableComment;
export const selectCommentIsEdited = (state: RootState) =>
  state.postModalCard.commentIsEdited;
export const selectCommentIsDeleted = (state: RootState) =>
  state.postModalCard.commentIsDeleted;
export const selectImageModalOpen = (state: RootState) =>
  state.postModalCard.imageModalOpen;
export const selectImageModalImg = (state: RootState) =>
  state.postModalCard.imageModalImg;

// exporting the reducer here, as we need to add this to the store
export default postModalCardSlice.reducer;
