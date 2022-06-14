import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name:'post',
    initialState:{
        data:null
    },
    reducers:{
        uploadPost:(state, action)=>{
            alert('Upload post dispatched');  
        }
    }
})

export const {uploadPost} = postSlice.actions
export default postSlice.reducer