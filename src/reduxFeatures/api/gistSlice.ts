import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type GistState = {
  gist: {
    data: any;
    isLoading: boolean;
    error: any;
    isSuccess: boolean;
    modal: boolean;
    gistFormData: {
      gistTitle: string;
    };
    isFetching: boolean;
  };
};

const initialState: GistState = {
  gist: {
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
    modal: false,
    gistFormData: {
      gistTitle: "",
    },
    isFetching: false,
  },
};

export const gistSlice = createSlice({
  name: "gistState",
  initialState,
  reducers: {
    uploadStart: (state, action) => {
      state.gist.isLoading = true;
    },
    uploadFailed: (state, action) => {
      // const dispatch = useDispatch()
      state.gist.isLoading = false;
      state.gist.error = action.payload;
      state.gist.isSuccess = false;
    },
    uploadSuccess: (state, action) => {
      state.gist.data = action.payload;
      state.gist.isLoading = false;
      state.gist.isSuccess = true;
    },
    uploadCleanUp: (state, action) => {
      state.gist.isSuccess = false;
      state.gist.isLoading = false;
    },
    setShowGistModal: (state, action: PayloadAction<boolean>) => {
      state.gist.modal = action.payload;
    },
    setGistTitle: (state, action: PayloadAction<string>) => {
      state.gist.gistFormData.gistTitle = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.gist.isFetching = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
  uploadStart,
  uploadFailed,
  uploadSuccess,
  uploadCleanUp,
  setShowGistModal,
  setGistTitle,
  setIsFetching,
} = gistSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectGistData = (state: RootState) => state.gist.gist.data;
export const selectGistIsLoading = (state: RootState) =>
  state.gist.gist.isLoading;
export const selectGistError = (state: RootState) => state.gist.gist.error;
export const selectGistIsSuccess = (state: RootState) =>
  state.gist.gist.isSuccess;
export const selectShowGistModal = (state: RootState) => state.gist.gist.modal;
export const selectGistTitle = (state: RootState) =>
  state.gist.gist.gistFormData.gistTitle;
export const selectIsFetching = (state: RootState) =>
  state.gist.gist.isFetching;

// exporting the reducer here, as we need to add this to the store
export default gistSlice.reducer;
