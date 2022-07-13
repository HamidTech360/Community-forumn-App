/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useState } from "react";
import { Card, Fade, Image } from "react-bootstrap";

import styles from "../../styles/chat.module.scss";
import "react-toastify/dist/ReactToastify.css";

import { FiEdit } from "react-icons/fi";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";

import { useDispatch, useSelector } from "@/redux/store";
import {
  setUserToChatTimeline,
  selectedUserInChatTimeline,
  setInitMessages,
  selectInitMessages,
  setMessages,
  selectMessages,
} from "@/reduxFeatures/app/chatSlice";
import { useRouter } from "next/router";
import DOMPurify from "dompurify";
import truncate from "trunc-html";

const SideBar = ({ mainSidebar, mainDisplay }) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const initMessages = useSelector(selectInitMessages);
  const selectUserToChatTimeline = useSelector(selectedUserInChatTimeline);

  const sanitizer = DOMPurify.sanitize;

  const startChat = () => {
    dispatch(setUserToChatTimeline([{}, 0]));

    if (router.asPath !== "/chat") {
      console.log("Brrrrrrrrrrr-0");
      // mainDisplay.current.classList.remove("d-none");
      // mainSidebar.current.classList.add("d-none");
    }

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
    if (router.asPath !== "/chat") {
      console.log("Brrrrrrrrrrr");
      // mainDisplay.current.classList.remove("d-none");
      // mainSidebar.current.classList.add("d-none");
    }

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

  return (
    <>
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
                              dangerouslySetInnerHTML={{
                                __html: sanitizer(
                                  truncate(
                                    message.message[message.message.length - 1]
                                      .message,
                                    26
                                  ).html
                                ),
                              }}
                            ></p>
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
    </>
  );
};

export default SideBar;
