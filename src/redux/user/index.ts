import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        data:null,
        isAuthenticated:false
    },
    reducers:{
        user:(state, action)=>{
            //alert('User dispatched'); 
            state.data = action.payload
            state.isAuthenticated=true 
        },
        logout:(state, action)=>{
            state.data= null
            state.isAuthenticated= false
            localStorage.removeItem('accessToken')
        }
    }
})

export const {user, logout} = userSlice.actions
export default userSlice.reducer