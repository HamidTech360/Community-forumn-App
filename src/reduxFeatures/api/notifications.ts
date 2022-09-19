import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

// declaring the types for our state
export type App = {
  notificationsData: any;
  notificationsCount: number;
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notificationsData: [],
    notificationsCount: 0
  },
  reducers: {
    setNotificationsData: (state, action: PayloadAction<any>) => {
      state.notificationsData = action.payload;
    },
    setNotificationsCount: (state, action: PayloadAction<any>) => {
      state.notificationsCount = action.payload;
    }
  }
});

export const { setNotificationsData, setNotificationsCount } =
  notificationSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.notification.notificationsData;
export const selectNotificationsCount = (state: RootState) =>
  state.notification.notificationsCount;

export default notificationSlice.reducer;
