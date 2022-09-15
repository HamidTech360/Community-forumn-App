import React, { useState, useEffect } from "react";
import { RiMessage2Fill } from "react-icons/ri";
import axios from "axios";
import config from "@/config";
import { Offcanvas } from "react-bootstrap";
import { useRouter } from "next/router";
import SideBar from "@/components/Chat/SideBar";

const MessageButton = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [conversations, setConversations] = useState([])
  const handleClose = () => setShow(false);

  useEffect(()=>{
    (async ()=>{
      try{
        const response = await axios.get(`${config.serverUrl}/api/chats/conversations`, {headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }})
        setConversations(response.data.conversations)
      }catch(error){
        console.log(error.response?.data)
      }
    })()
  },[])

  const handleShow = async () => {
    setShow(true)
    // router.push("/chat");
  };

  const selectChat = (item)=>{
    router.push(`/chat?active=${item?._id}`)
  }
  

  return (
    <>
      <div className="message-icon-circle" onClick={handleShow}>
        <RiMessage2Fill size={25} color="white" />
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Body>
          <div style={{cursor:'pointer'}} onClick={()=>setShow(false)}>
            <b>close</b>
          </div>
          <SideBar conversations={conversations} selectChat={selectChat} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MessageButton;
