import React, { useRef } from "react";

import { useSelector } from "@/redux/store";
import { selectIsAuthenticated } from "@/reduxFeatures/authState/authStateSlice";
import { useRouter } from "next/router";
// import Chat from "@/pages/chat";
// import SideBar from "./SideBar";

const SlimChat = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const mainSidebar = useRef();
  const mainDisplay = useRef();
  return (
    <>
      {isAuthenticated && router.asPath !== "/chat" ? (
        <div className="container position-fixed bottom-0 end-0">
          <div className="row justify-content-right">
            <div className="col-12">
              {/* <Chat /> */}
              {/* <SideBar mainSidebar={mainSidebar} mainDisplay={mainDisplay} /> */}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SlimChat;
