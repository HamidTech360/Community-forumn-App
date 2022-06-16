import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
//import useUser from "../../hooks/useUser";
import Loader from "../Organisms/Layout/Loader/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";

export default function UnAuthContent({ children }: { children: ReactNode }) {
  // const { isAuthenticated, authenticating } = useUser();
  const router = useRouter();
  const state = useSelector(s=>s.user)




  // Navigate unauthenticated users to Log In page.
  useEffect(() => {

  

    if(localStorage.getItem('accessToken') || state.isAuthenticated){
      router.push('/feed')
    }
    
  

  
  }, []);

 
    return <div>{children}</div>;
  

  return <Loader />;
}
