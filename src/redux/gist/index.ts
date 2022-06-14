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
        // uploadgist:  (state, action)=>{
            
        //     state.isLoading = true;
        //     (async function(){
        //         console.log(action.payload);
        //         // const dispatch = useDispatch()
        //         try{
        //             const response = await axios.post(`/api/gists`, {...action.payload}, {headers:{
        //                 Authorization:`Bearer ${localStorage.getItem('authToken')}`
        //             }})

        //             console.log(response.data);
        //             state.data = response.data
        //        }catch(error){
        //             //  dispatch(uploadFailed({error}))
        //             console.log(error.response?.data);                
        //        }
              
        //     })()
        // },
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
        }

    }
})

export const {uploadSuccess ,uploadFailed, uploadStart} = gistSlice.actions
export default gistSlice.reducer