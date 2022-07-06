/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import AuthContent from "@/components/Auth/AuthContent";
import React, { useState, useRef, useEffect } from "react";
import { Card, Container, Fade, Image } from "react-bootstrap";
import ChatBubble from "../components/Chat/ChatBubble";
import { ToastContainer } from "react-toastify";
import { dummyData } from "../components/Chat/dummyData";

import styles from "../styles/chat.module.scss";
import "react-toastify/dist/ReactToastify.css";

import { FiEdit } from "react-icons/fi";
import {
  BsChevronDoubleDown,
  BsChevronDoubleUp,
  BsDot,
  BsArrowLeft,
} from "react-icons/bs";
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

const Chat = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const initMessages = useSelector(selectInitMessages);
  const selectUserToChatTimeline = useSelector(selectedUserInChatTimeline);

  useEffect(() => {
    // Change dummyData data to data from backend
    dispatch(setInitMessages(dummyData));
    dispatch(setMessages(dummyData));
  }, []);

  const unreadChat = useRef();
  const readChat = useRef();
  const mainDisplay = useRef();
  const mainSidebar = useRef();

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

  const backToSideMessages = (e) => {
    if (window.innerWidth < 768) {
      mainDisplay.current.classList.add("d-none");
      mainSidebar.current.classList.remove("d-none");
    }
  };

  const startChat = () => {
    dispatch(setUserToChatTimeline([{}, 0]));

    // Mid Point Display (using Bootstrap d-md-block)
    if (window.innerWidth < 768) {
      mainDisplay.current.classList.remove("d-none");
      mainSidebar.current.classList.add("d-none");
    } else if (window.innerWidth >= 768) {
      mainDisplay.current.classList.remove("d-none");
      mainSidebar.current.classList.remove("d-none");
    }
  };

  const startChattingWith = (e) => {
    // Mid Point Display (using Bootstrap d-md-block)
    if (window.innerWidth < 768) {
      mainDisplay.current.classList.remove("d-none");
      mainSidebar.current.classList.add("d-none");
    } else if (window.innerWidth >= 768) {
      mainDisplay.current.classList.remove("d-none");
      mainSidebar.current.classList.remove("d-none");
    }

    // get data of custom attribute
    const id = e.target.dataset.nameid;

    let timelineUnreadMessages = 0;
    const updatedMessages = [];
    let currentChat = {};

    messages.forEach((message) => {
      if (message.id === id) {
        timelineUnreadMessages = message.unreadMessage;
        // Set unread message to 0
        const currentChatTimeline = {
          ...message,
          unreadMessage: 0,
        };
        currentChat = { ...currentChatTimeline };
        updatedMessages.push(currentChatTimeline);
      } else {
        updatedMessages.push(message);
      }
    });

    // If Same Message is selected twice, Do nothing
    if (
      JSON.stringify(selectUserToChatTimeline[0]) ===
      JSON.stringify(currentChat)
    ) {
      return;
    } else {
      dispatch(setUserToChatTimeline([currentChat, timelineUnreadMessages]));
      dispatch(setMessages(updatedMessages));
    }
  };
  //   Leave below event for Event Bobbling
  const startChattingWithChild = (e) => {};

  const searchMessages = (e) => {
    let currentMessages = [...initMessages];

    currentMessages = currentMessages.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    dispatch(setMessages(currentMessages));
  };

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
          <div ref={mainSidebar} className="d-md-block col-12 col-md-4 shadow">
            <div className="row">
              <div className="d-flex py-3">
                <div className="col-8">
                  <h4>Messages</h4>
                </div>
                <div
                  className="col-2 mt-2 ms-auto"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <FiEdit size="20" className="me-2" onClick={startChat} />{" "}
                </div>
                <div
                  className="col-2 btn d-none d-md-inline"
                  onClick={() => setOpen(!open)}
                  aria-controls="toggleMessagingBody"
                  aria-expanded={open}
                >
                  {!open && (
                    <BsChevronDoubleUp
                      size={20}
                      className="d-none d-md-inline ms-auto"
                    />
                  )}
                  {open && (
                    <BsChevronDoubleDown
                      size={20}
                      className="d-none d-md-inline ms-auto"
                    />
                  )}
                </div>
              </div>
              <div>
                <input
                  id="searchMessages"
                  type="search"
                  className="form-control my-2 mb-3 border"
                  placeholder="&#128269; Search"
                  aria-label="Search Message"
                  onChange={searchMessages}
                />
              </div>
              <Fade in={open}>
                <div
                  id="toggleMessagingBody"
                  className="pt-2"
                  style={{
                    height: "75vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <Card
                    className="border-0 navbar-nav"
                    style={{ margin: "-.5rem" }}
                  >
                    {messages.map((message, index) => {
                      return (
                        <Card.Body
                          key={message.id}
                          className="nav-item nav-link"
                          style={{
                            margin: "-.8rem 0",
                            cursor: "pointer",
                          }}
                          data-nameid={message.id}
                          onClick={startChattingWith}
                        >
                          <div
                            className={`row pb-2 ${
                              selectUserToChatTimeline[0].id === message.id &&
                              styles.activeChat
                            }`}
                            data-nameid={message.id}
                            onClick={startChattingWithChild}
                          >
                            <div
                              className="col-2"
                              data-nameid={message.id}
                              onClick={startChattingWithChild}
                            >
                              <Image
                                src={message.faceImage}
                                alt="image"
                                width={60}
                                height={60}
                                roundedCircle={true}
                                data-nameid={message.id}
                                onClick={startChattingWithChild}
                              ></Image>
                            </div>
                            <div
                              className="col-9 col-sm-10 col-md-8 col-lg-9 ms-auto p-0"
                              data-nameid={message.id}
                              onClick={startChattingWithChild}
                            >
                              <div
                                className="col-11 d-flex"
                                data-nameid={message.id}
                                onClick={startChattingWithChild}
                              >
                                <div
                                  className="col-8 fs-6"
                                  data-nameid={message.id}
                                  onClick={startChattingWithChild}
                                >
                                  {message.name}
                                </div>
                                <div
                                  className="col-4 text-muted text-center"
                                  data-nameid={message.id}
                                  onClick={startChattingWithChild}
                                  style={{ fontSize: "11px" }}
                                >
                                  {
                                    message.message[message.message.length - 1]
                                      .dateTime
                                  }
                                </div>
                              </div>
                              <div
                                className="col-11 d-flex"
                                data-nameid={message.id}
                                onClick={startChattingWithChild}
                              >
                                <p
                                  className="col-10"
                                  data-nameid={message.id}
                                  onClick={startChattingWithChild}
                                  // dangerouslySetInnerHTML={{
                                  //   __html: messageInt(message),
                                  // }}
                                  // dangerouslySetInnerHTML={{
                                  //   __html: message.message[
                                  //     message.message.length - 1
                                  //   ].message.substring(0, 26),
                                  // }}
                                >
                                  {/* {messageInt(message)} */}
                                  {/* {console.log(
                                    "+++",
                                    message.message[
                                      message.message.length - 1
                                    ].message.substring(0, 26)
                                  )} */}
                                  {message.message[
                                    message.message.length - 1
                                  ].message.substring(0, 26)}
                                  {message.message[message.message.length - 1]
                                    .message.length > 26 && <span>...</span>}
                                </p>
                                <small
                                  className="col-2 text-center"
                                  data-nameid={message.id}
                                  onClick={startChattingWithChild}
                                >
                                  <span
                                    className={` ${
                                      message.unreadMessage !== 0 && "p-1"
                                    } badge bg-primary rounded-pill text-white`}
                                    style={{ fontSize: "9px" }}
                                    data-nameid={message.id}
                                    onClick={startChattingWithChild}
                                  >
                                    {message.unreadMessage !== 0 &&
                                      message.unreadMessage}
                                  </span>
                                </small>
                              </div>
                            </div>

                            <hr
                              className="mx-auto"
                              style={{ width: "55%", marginTop: "-.7rem" }}
                              data-nameid={message.id}
                              onClick={startChattingWithChild}
                            />
                          </div>
                        </Card.Body>
                      );
                    })}
                  </Card>
                </div>
              </Fade>
            </div>
          </div>

          {/* Main Display */}
          <div
            ref={mainDisplay}
            className="d-none d-md-block col-12 col-md-8 shadow"
          >
            <Card
              className="border-0 d-flex flex-column"
              style={{ height: "95vh" }}
            >
              <Card.Header>
                <div className="row">
                  <h4 className="col-12 mt-2">
                    {JSON.stringify(selectUserToChatTimeline[0]) !== "{}" && (
                      <BsArrowLeft
                        className="me-2 d-inline d-md-none"
                        onClick={backToSideMessages}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    )}
                    {selectUserToChatTimeline[0].name}
                  </h4>
                </div>
                {JSON.stringify(selectUserToChatTimeline[0]) === "{}" ? (
                  <div className="row">
                    <div className="col-12">
                      <h4>
                        {" "}
                        <BsArrowLeft
                          className="me-2 d-inline d-md-none"
                          onClick={backToSideMessages}
                          style={{
                            cursor: "pointer",
                          }}
                        />
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
                ) : selectUserToChatTimeline[0].online === false ? (
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
                  </div>
                ) : selectUserToChatTimeline[0].online === true ? (
                  <div className="row">
                    <h1
                      className="col-1 me-2"
                      style={{
                        fontSize: "3rem",
                        marginTop: "-1.2rem",
                        marginBottom: "-1.6rem",
                        color: "#4c959f",
                      }}
                    >
                      <BsDot />
                    </h1>
                    <div className={`col-3 ${styles.reduceMargin}`}>
                      <span className="h6 text-muted">online</span>
                    </div>
                  </div>
                ) : null}
              </Card.Header>
              <Card.Body style={{ overflowY: "auto", overflowX: "hidden" }}>
                {JSON.stringify(selectUserToChatTimeline[0]) !== "{}" && (
                  <>
                    {selectUserToChatTimeline[0].message.map(
                      (message, index) => {
                        const unreadMessagePoint = selectUserToChatTimeline[1];

                        const readMessagesFromPoint =
                          selectUserToChatTimeline[0].message.length -
                          unreadMessagePoint;

                        if (readMessagesFromPoint === index) {
                          return (
                            // Focus unread messages
                            <div key={index}>
                              <div className="row justify-content-center text-muted">
                                <div className="col-3">
                                  <hr />
                                </div>
                                <div
                                  ref={unreadChat}
                                  className="col-5 text-center"
                                >
                                  <p>{unreadMessagePoint} unread messages</p>
                                </div>
                                <div className="col-3">
                                  <hr />
                                </div>
                              </div>
                              {ChatBubble(message)}
                            </div>
                          );
                        } else {
                          if (
                            selectUserToChatTimeline[1] === 0 &&
                            selectUserToChatTimeline[0].message.length ===
                              index + 1
                          ) {
                            // No unread message
                            return (
                              <div key={index} ref={readChat}>
                                {ChatBubble(message)}
                              </div>
                            );
                          } else {
                            /*
                             ** No need to Focus as focus has already been made above
                             ** Maintain Read State
                             */
                            return <div key={index}>{ChatBubble(message)}</div>;
                          }
                        }
                      }
                    )}
                  </>
                )}
              </Card.Body>
              <Card.Footer
                className="row border-0 pb-5 pb-md-2"
                style={{ backgroundColor: "transparent" }}
              >
                <div className="col-10 col-lg-11">
                  <Editor slim={true} />
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </Container>
    </AuthContent>
  );
};

export default Chat;
