import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

// const dispatch = useDispatch()

export const gistSlice = createSlice({
    name:'gist',
    initialState:{
        data:null,
        isLoading:false,
        error:null,
        isSuccess:false
    },
    reducers:{
     
        uploadStart:(state, action)=>{
            state.isLoading = true
        },
        uploadFailed:(state, action)=>{
            // const dispatch = useDispatch()
            state.isLoading = false
            state.error = action.payload
            state.isSuccess = false
        },
        uploadSuccess:(state, action)=>{
            state.data = action.payload
            state.isLoading = false
            state.isSuccess= true
        },
        uploadCleanUp:(state, action)=>{
            state.isSuccess=false
            state.isLoading=false
        }

    }
})

export const {uploadSuccess ,uploadFailed, uploadStart, uploadCleanUp} = gistSlice.actions
export default gistSlice.reducer