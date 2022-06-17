import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
// import useUser from "../../hooks/useUser";
import Loader from "../Organisms/Layout/Loader/Loader";
import axios from "axios";
import { user } from "@/redux/user";
import { useDispatch, useSelector } from "@/redux/store";
import { userAuthenticated } from "@/reduxFeatures/authState/authStateSlice";

export default function AuthContent({ children }: { children: ReactNode }) {
  // const { isAuthenticated, authenticating } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector(s=>s.user)
  //console.log(state);
  
  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if(!localStorage.getItem('accessToken')){
      router.push('/login')
    }
    if(!state.data){
      (async function(){
        try{
         const response = await axios.get(`/api/auth`, {headers:{
           authorization:`Bearer ${localStorage.getItem('accessToken')}`
         }})
         console.log(response.data);
         dispatch(user(response.data))
        }catch(error){
         console.log(error.response?.data);
         localStorage.removeItem('accessToken')
          setTimeout(()=>{
            router.push('/login')
          }, 3000)
        }
     })()
     console.log(state);
     
 
    }
    
      // if (!authenticating && !isAuthenticated) {
      //   // Save current page for redirect
      //   sessionStorage.setItem("pageB4Login", JSON.stringify(router.asPath));

      //   router.push("/login");
      // }
  }, []);





  // if (isAuthenticated) {
  //   // Set isAuthenticated in redux state to true only on Login
  //   if (router.asPath === "/login") {
  //     dispatch(userAuthenticated(true));
  //   }

  //   // Don't Display Register Page While logged-in
  //   if (router.asPath === "/register") {
  //     router.push("/feed");
  //   } else {
  //     return <div>{children}</div>;
  //   }
  // }
  return <div>{children}</div>;

  return <Loader />;
}
