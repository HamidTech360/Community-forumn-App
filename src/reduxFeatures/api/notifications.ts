import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import config from "@/config";
import axios from "axios";
import { RootState } from "@/redux/store";

// declaring the types for our state
export type App = {
  data: any;
};

export const notificationSlice = createSlice({
    name:'notifications',
    initialState:{
        data:[],
        noOfNotifications:0
    },
    reducers:{
        getNotification:  (state, action: PayloadAction<any>) => {
            state.data=action.payload
        },
        updateNumberOfNotifications: (state, action: PayloadAction<any>) => {
            state.noOfNotifications = action.payload.total
        }
    }





export const {getNotification, updateNumberOfNotifications} = notificationSlice.actions
export const selectNotifications = (state: RootState) => state.notification.data;
export default notificationSlice.reducer

