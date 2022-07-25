import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type SearchState = {
  postSearch: [];
  gistSearch: [];
  userSearch: [];
  groupSearch: [];
};

const initialState: SearchState = {
  postSearch: [],
  gistSearch: [],
  userSearch: [],
  groupSearch: [],
};

export const searchSlice = createSlice({
  name: "searchState",
  initialState,
  reducers: {
    setPostSearch: (state, action: PayloadAction<[]>) => {
      state.postSearch = action.payload;
    },
    setGistSearch: (state, action: PayloadAction<[]>) => {
      state.gistSearch = action.payload;
    },
    setUserSearch: (state, action: PayloadAction<[]>) => {
      state.userSearch = action.payload;
    },
    setGroupSearch: (state, action: PayloadAction<[]>) => {
      state.groupSearch = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setPostSearch, setGistSearch, setUserSearch, setGroupSearch } =
  searchSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectPostSearch = (state: RootState) => state.search.postSearch;
export const selectGistSearch = (state: RootState) => state.search.gistSearch;
export const selectUserSearch = (state: RootState) => state.search.userSearch;
export const selectGroupSearch = (state: RootState) => state.search.groupSearch;

// exporting the reducer here, as we need to add this to the store
export default searchSlice.reducer;
