import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

// declaring the types for our state
export type App = {
  notificationOffcanvas: { show: boolean };
  searchModal: { show: boolean };
  followed: { isFollow: boolean; id: any };
};

const initialState: App = {
  notificationOffcanvas: {
    show: false,
  },
  searchModal: {
    show: false,
  },
  followed: { isFollow: false, id: null },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    notificationsOffcanvas: (state, action: PayloadAction<boolean>) => {
      state.notificationOffcanvas.show = action.payload;
    },
    setSearchModal: (state, action: PayloadAction<boolean>) => {
      state.searchModal.show = action.payload;
    },
    setFollowed: (
      state,
      action: PayloadAction<{ isFollow: boolean; id: any }>
    ) => {
      state.followed = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { notificationsOffcanvas, setSearchModal, setFollowed } =
  appSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectNotificationOffcanvas = (state: RootState) =>
  state.app.notificationOffcanvas.show;
export const selectSearchModal = (state: RootState) =>
  state.app.searchModal.show;
export const selectFollowed = (state: RootState) => state.app.followed;

// exporting the reducer here, as we need to add this to the store
export default appSlice.reducer;
