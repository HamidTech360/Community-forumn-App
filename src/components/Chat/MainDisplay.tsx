/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import ChatBubble from "./ChatBubble";
import styles from "../../styles/chat.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { BsDot, BsArrowLeft } from "react-icons/bs";
import Editor from "@/components/Organisms/SlateEditor/Editor";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectedUserInChatTimeline,
} from "@/reduxFeatures/app/chatSlice";
import {Button} from 'react-bootstrap'
import {FiSend} from 'react-icons/fi'

const MainDisplay = ({  mainSidebar, mainDisplay, currentChat, messages, sendMessage }) => {

  const selectUserToChatTimeline = useSelector(selectedUserInChatTimeline);
  const scrollRef = useRef();
  const backToSideMessages = (e) => {
    if (window.innerWidth < 768) {
      mainDisplay.current.classList.add("d-none");
      mainSidebar.current.classList.remove("d-none");
    }
  };

  useEffect(()=>{
    scrollRef.current?.scrollIntoView()
    if(scrollRef) console.log(scrollRef);
    
  },[messages, scrollRef])
  

  return (
    <>
      {/* Main Display */}
      <div
        ref={mainDisplay}
        className="col-12 col-md-8 shadow"
      >
        <Card
          // className="border-0 d-flex flex-column"
          style={{ height: "95vh", paddingRight:'0' }}
        >
          <Card.Header>
            <div className="row">
              <h4 className="col-12 mt-2">
                {JSON.stringify(selectUserToChatTimeline[0]) !== "{}" && (
                  <button
                    className="btn btn-lg p-0"
                    onClick={backToSideMessages}
                  >
                    <BsArrowLeft
                      className="me-2 d-inline d-md-none"
                      onClick={backToSideMessages}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </button>
                )}
                {currentChat?.firstName}
              </h4>
            </div>
            {!currentChat? (
              <div className="row">
                <div className="col-12">
                  <h4>
                    <button
                      className="btn btn-lg p-0"
                      onClick={backToSideMessages}
                    >
                      <BsArrowLeft
                        className="me-2 d-inline d-md-none"
                        onClick={backToSideMessages}
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
            ) :       
            <div className="row">
              <h1
                className="col-1 me-2"
                style={{
                  fontSize: "3rem",
                  marginTop: "-1.2rem",
                  marginBottom: "-1.6rem",
                  color: "gray",
                }}
              >
                <span>
                  <BsDot />
                </span>
              </h1>
              <div className={`col-3 ${styles.reduceMargin}`}>
                <span className="h6 text-muted">offline</span>
              </div>
            </div>}
          </Card.Header>
          <Card.Body style={{ overflowY: "auto", overflowX: "hidden" }}>
            {currentChat && 
              <>
                {messages.map((message, index) => 
                    <ChatBubble ref={scrollRef} message={message} />
                )}
             
              </>
            }
          </Card.Body>
          <Card.Footer
            className="row border-0 pb-5 pb-md-2"
            style={{ backgroundColor: "transparent" }}
          >
            <div className="col-10 col-lg-11 d-flex">
              <Editor slim={true} pageAt="/chat" /> 
              <Button onClick={()=>sendMessage()} style={{minWidth:'70px'}}> <FiSend size={22} /> </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default MainDisplay;
