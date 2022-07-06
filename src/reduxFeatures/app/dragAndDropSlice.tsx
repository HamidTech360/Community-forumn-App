import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type DragAndDropState = {
  files: any;
  filesBase64: any;
};

const initialState: DragAndDropState = {
  files: [],
  filesBase64: [],
};

export const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState,
  reducers: {
    // setFilesAccepted: (state, action: PayloadAction<[]>) => {
    setFilesAccepted: (state, action) => {
      state.files = action.payload;
    },
    // setFilesAcceptedBase64: (state, action: PayloadAction<[]>) => {
    setFilesAcceptedBase64: (state, action) => {
      state.filesBase64 = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setFilesAccepted, setFilesAcceptedBase64 } =
  dragAndDropSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectFiles = (state: RootState) => state.dragAndDrop.files;
export const selectFilesBase64 = (state: RootState) =>
  state.dragAndDrop.filesBase64;

// exporting the reducer here, as we need to add this to the store
export default dragAndDropSlice.reducer;
