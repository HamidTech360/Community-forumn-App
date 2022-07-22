/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import AuthContent from "@/components/Auth/AuthContent";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Editor from "@/components/Organisms/SlateEditor/Editor";
import config from "@/config";
import {  useSelector } from "@/redux/store";
import SideBar from "@/components/Chat/SideBar";
import MainDisplay from "@/components/Chat/MainDisplay";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";

const Chat = () => {
  const user = useSelector(selectUser)
  const unreadChat = useRef();
  const readChat = useRef();
  const mainDisplay = useRef();
  const mainSidebar = useRef();
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [showConversationList, setShowConversationList] = useState(true)
  const [showMsgArea, setShowMsgArea] = useState(true)
  const [newMsg, setNewMsg] = useState('')

  useEffect(() => {
    
    if(typeof window === "undefined") return
    console.log(window?.innerWidth);
    if(window.innerWidth <=768 ){
      setShowMsgArea(false)

    }
  }, []);

  useEffect(() => {
    // Focus Unread Message
   
  }, []);




  useEffect(()=>{
    (async ()=>{
      try{
        const {data} = await axios.get(`${config.serverUrl}/api/chats/conversations`, {headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }})
        console.log(data);
        setConversations(data.conversations)
      }catch(error){
        console.log(error.response?.data); 
      }
    })()
  },[])

  const selectChat = async (activeChat)=>{
    console.log(activeChat);
    setCurrentChat(activeChat)
    setMessages([])
    try{
        const {data} = await axios.get(`${config.serverUrl}/api/chats/?mate=${activeChat._id}`, {headers:{
            authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }})
        console.log(data);
        setMessages(data.messages)
        if ( window.innerWidth <= 768){
          setShowConversationList(false)
          setShowMsgArea(true)
        }
        
    }catch(error){
        console.log(error.response?.data);
    }
}
const handleChange = (e)=>{
  setNewMsg(e.currentTarget.value)
  console.log(newMsg);
  
}
const sendMessage = async ()=>{
  
  if(!currentChat) return
  
  // socket.current.emit("sendMessage", {
  //     senderId:user?._id,
  //     receiverId:currentChat,
  //     message:newMsg
  // })
  try{
      const {data}= await axios.post(`${config.serverUrl}/api/chats/?mate=${currentChat._id}`, {message:newMsg}, {headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }})
      console.log(data);
      setMessages([...messages, data.newMessage])
      setNewMsg('')
  }catch(error){
      console.log(error.response?.data);
      
  }
}



  return (
    <AuthContent>
      <Head>
        <title>Chat</title>
      </Head>
      <div className="mt-lg-3" style={{ marginBottom: "-9.3vh" }}>
        <ToastContainer />
        <div className="row" style={{ minHeight: "87vh" }}>
          {/* SideBar */}
          {showConversationList && 
          <SideBar 
              conversations={conversations} 
              selectChat={selectChat} 
          />}

          {/* Main Display */}
         {showMsgArea && 
           <MainDisplay
            currentChat={currentChat}
            messages={messages}
            mainSidebar={mainSidebar}
            mainDisplay={mainDisplay}
            handleChange={handleChange}
          />
         }
        </div>
      </div>
    </AuthContent>
  );
};

export default Chat;
