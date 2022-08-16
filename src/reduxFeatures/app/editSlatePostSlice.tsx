import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type EditSlatePostState = {
  slatePost: any;
};

const initialState: EditSlatePostState = {
  slatePost: null,
};

export const editSlatePostSlice = createSlice({
  name: "editSlatePostState",
  initialState,
  reducers: {
    setSlatePostToEdit: (state, action: PayloadAction<any>) => {
      state.slatePost = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setSlatePostToEdit } = editSlatePostSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.;
export const selectSlatePostToEdit = (state: RootState) =>
  state.editSlatePost.slatePost;

// exporting the reducer here, as we need to add this to the store
export default editSlatePostSlice.reducer;
