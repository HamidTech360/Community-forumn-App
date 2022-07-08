/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import AuthContent from "@/components/Auth/AuthContent";
import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { dummyData } from "../components/Chat/dummyData";

import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";

import Editor from "@/components/Organisms/SlateEditor/Editor";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setUserToChatTimeline,
  selectedUserInChatTimeline,
  setInitMessages,
  selectInitMessages,
  setMessages,
  selectMessages,
} from "@/reduxFeatures/app/chatSlice";
import SideBar from "@/components/Chat/SideBar";
import MainDisplay from "@/components/Chat/MainDisplay";

const Chat = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const initMessages = useSelector(selectInitMessages);
  const selectUserToChatTimeline = useSelector(selectedUserInChatTimeline);

  const unreadChat = useRef();
  const readChat = useRef();
  const mainDisplay = useRef();
  const mainSidebar = useRef();

  useEffect(() => {
    // Change dummyData data to data from backend
    dispatch(setInitMessages(dummyData));
    dispatch(setMessages(dummyData));
  }, []);

  useEffect(() => {
    // Focus Unread Message
    if (unreadChat.current) {
      unreadChat.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
    // Focus read Message
    if (readChat.current) {
      readChat.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "start",
      });
    }
  }, [selectUserToChatTimeline, messages]);

  // const messageInt = (message) => {
  //   // const init = {
  //   //   messageInit: message.message[
  //   //     message.message.length - 1
  //   //   ].message.substring(0, 26),
  //   //   continue:
  //   //     message.message[message.message.length - 1].message.length > 26 &&
  //   //     "...",
  //   // 26 && <span>...</span>,

  //   // const tip = messageTip(message)

  //   // console.log('tip:'tip)
  //   // };

  //   // console.log("init.messageInit:", init.messageInit);

  //   // // return init.messageInit + init.continue;
  //   // return init.messageInit;

  //   const newMessage = messageTip(message);
  //   const displayMessage = newMessage.props.dangerouslySetInnerHTML.__html;
  //   console.log("newMessage:", newMessage.props.dangerouslySetInnerHTML.__html);
  //   // if (displayMessage.length > 26) {
  //   //   console.log(
  //   //     'displayMessage.substring(0, 26) + "...":',
  //   //     displayMessage.substring(0, 26) + "..."
  //   //   );
  //   //   return displayMessage.substring(0, 26) + "...";
  //   // } else {
  //   //   console.log("displayMessage:", displayMessage);
  //   //   return displayMessage;
  //   // }
  // };

  const messageTip = (message) => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: message.message[message.message.length - 1].message,
        }}
      ></div>
    );
  };

  return (
    <AuthContent>
      <Head>
        <title>Chat</title>
      </Head>
      <Container className="mt-lg-3" style={{ marginBottom: "-9.3vh" }}>
        <ToastContainer />
        <div className="row" style={{ minHeight: "87vh" }}>
          {/* SideBar */}
          <SideBar mainSidebar={mainSidebar} mainDisplay={mainDisplay} />

          {/* Main Display */}
          <MainDisplay
            unreadChat={unreadChat}
            readChat={readChat}
            mainSidebar={mainSidebar}
            mainDisplay={mainDisplay}
          />
        </div>
      </Container>
    </AuthContent>
  );
};

export default Chat;
