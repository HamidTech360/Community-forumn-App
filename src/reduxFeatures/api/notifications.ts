import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import config from "@/config";
import axios from 'axios'
import { RootState } from "@/redux/store";


export const notificationSlice = createSlice({
    name:'notifications',
    initialState:{
        data:[]
    },
    reducers:{
        getNotification:  (state, action: PayloadAction<any>) => {
            //console.log(action.payload);
            
            state.data=action.payload
        }
    }


})


export const {getNotification} = notificationSlice.actions
export const selectNotifications = (state: RootState) => state.notification.data;
export default notificationSlice.reducer