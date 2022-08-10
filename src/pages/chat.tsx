/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import AuthContent from "@/components/Auth/AuthContent";
import React, { useState, useRef, useEffect } from "react";
import { Form, Row, Button, Card } from "react-bootstrap";
import {FiSend} from 'react-icons/fi'
import { BsArrowLeft, BsDot } from "react-icons/bs";
import Editor from "@/components/Organisms/SlateEditor/Editor";
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import config from "@/config";
import {  useSelector } from "@/redux/store";
import SideBar from "@/components/Chat/SideBar";
import MainDisplay from "@/components/Chat/MainDisplay";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import { io } from 'socket.io-client';
import chatStyles from '@/styles/chat.module.scss'
import styles from '@/styles/templates/chatEditor.module.scss'

const Chat = () => {
  const user = useSelector(selectUser)
  // const mainDisplay = useRef();
  // const mainSidebar = useRef();
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [receivedMessage, setReceivedMessage] = useState(null)
  const [showConversationList, setShowConversationList] = useState(true)
  const [showMsgArea, setShowMsgArea] = useState(false)
  const [newMsg, setNewMsg] = useState('')
  const socket:any = useRef()

  let emptyEditorInnerHtml =
      '<div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-placeholder="true" contenteditable="false" style="position: absolute; pointer-events: none; width: 100%; max-width: 100%; display: block; opacity: 0.333; user-select: none; text-decoration: none;">Start writing your thoughts</span><span data-slate-zero-width="n" data-slate-length="0">﻿<br></span></span></span></div>';

  useEffect(()=>{
    socket.current = io("ws://localhost:8900")
  },[])

  useEffect(() => { 
    
    if(typeof window === "undefined") return
    console.log(window?.innerWidth);
    if(window.innerWidth <=768 ){
      setShowMsgArea(false)
    }else{
      setShowMsgArea(true)
    }
  }, []);

  useEffect(()=>{
    socket.current.on("getMessage", data=>{
       //console.log('get message emission received');   
       setReceivedMessage({
           sender:data.senderId,
           message:data.message,
           createdAt:'Just now'
       })
       // console.log('new data', data);    
   })
},[])


useEffect(()=>{
  console.log(receivedMessage);
  
  const currentConversation = conversations.find(item=>item.sender._id===currentChat?._id || item.receiver._id===currentChat?._id)
  console.log(`current conversation is`, currentConversation);
  receivedMessage && currentConversation?.members.includes(receivedMessage.sender) &&
  setMessages((prev)=>[...prev, receivedMessage])
  
  //receivedMessage
},[receivedMessage, user])

  useEffect(() => {
    if(!user?._id) return
    
    socket.current.emit("addUser", user?._id)
    socket.current.on("getUsers", users=>{
        console.log('connected users are ', users );   
    })
   
  }, [user]);




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
const sendMessage = async (e)=>{
  e.preventDefault()
  console.log(newMsg);
  // alert(newMsg)
  
  
  if(!currentChat) return
  if(newMsg===""){
    return
  }
  
  
  socket.current.emit("sendMessage", {
      senderId:user?._id,
      receiverId:currentChat._id,
      message:newMsg
  })

  try{
      const {data}= await axios.post(`${config.serverUrl}/api/chats/?mate=${currentChat._id}`, {message:newMsg}, {headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }})
      console.log(data);
      setMessages([...messages, data.newMessage])
     // document.getElementById('/chat-slateRefId').innerHTML = emptyEditorInnerHtml
       setNewMsg('')
  }catch(error){
      console.log(error.response?.data);
      
  }
}

const backToConversationList = ()=>{
  setCurrentChat(null)
  setShowConversationList(true)
  if(window.innerWidth <= 768){
    setShowMsgArea(false)
  }
}

  return (
    <AuthContent>
      <Head>
        <title>Chat</title>
      </Head>
      <div className="" style={{  maxHeight:'84vh' }}>
        
        <div className="row" >
           
          {showConversationList &&
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 shadow" style={{overflowY:'hidden'}}>
            <SideBar 
                conversations={conversations} 
                selectChat={selectChat} 
            />
          </div>
          }

      
          {showMsgArea &&
          <div className={`${chatStyles.messageAreaCol} col-lg-8 col-md-8 col-sm-12 col-xs-12 `} style={{overflowX:'hidden'}}>
            {currentChat?
              <Card.Header style={{border:'1px solid lightgrey', borderBottom:'0px', width:'100%'}} className={styles.activeChat}>
                  <div className="">
                    <BsArrowLeft
                      style={{
                        cursor: "pointer",
                        marginRight:'10px'
                      }}
                      onClick={()=>backToConversationList()}
                    />     
                    {currentChat?.firstName}
                  </div>

                  <div>
                    <BsDot size={40} />
                    <span className="">offline</span>
                  </div>
              </Card.Header >
                    :
              <Card.Header className={styles.messageHeader}>
                <div className="row">
                  <div className="col-12">
                    <h4>
                      <button className="btn btn-lg p-0" >
                        <BsArrowLeft
                          className="me-2 d-inline d-md-none"
                          //onClick={backToSideMessages}
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </button>
                      New message
                    </h4>
                  </div>
                  <div className="col-12 ">
                    <input
                      id="sendTo"
                      type="text"
                      className="form-control border"
                      placeholder="Type a name or multiple names separated by comma"
                    />
                  </div>
                </div>
            
              </Card.Header>
            }

            <MainDisplay
                currentChat={currentChat}
                messages={messages}
                sendMessage={sendMessage}
            />

            {currentChat && 
              <div className={styles.chatBox} style={{marginTop:'10px'}}>
               
                <Form.Control
                  as="textarea" 
                  style={{marginRight:'10px'}}
                  placeholder="Write something"
                  value={newMsg}
                  onChange={(e)=>handleChange(e)}
                />
                <Button onClick={(e)=>sendMessage(e)} style={{minWidth:'70px'}}> <FiSend size={22} /> </Button>
              </div>
            }
          </div>
          }
           
         
        </div>
      </div>
    </AuthContent>
  );
};

export default Chat;
