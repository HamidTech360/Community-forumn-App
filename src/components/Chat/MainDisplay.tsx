/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import AuthContent from "@/components/Auth/AuthContent";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import ChatBubble from "./ChatBubble";

import styles from "../../styles/chat.module.scss";
import "react-toastify/dist/ReactToastify.css";

import { BsDot, BsArrowLeft } from "react-icons/bs";

import Editor from "@/components/Organisms/SlateEditor/Editor";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectedUserInChatTimeline,
  selectInitMessages,
  selectMessages,
} from "@/reduxFeatures/app/chatSlice";
import { useRouter } from "next/router";

const MainDisplay = ({ unreadChat, readChat, mainSidebar, mainDisplay }) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const initMessages = useSelector(selectInitMessages);
  const selectUserToChatTimeline = useSelector(selectedUserInChatTimeline);

  const backToSideMessages = (e) => {
    if (window.innerWidth < 768) {
      mainDisplay.current.classList.add("d-none");
      mainSidebar.current.classList.remove("d-none");
    }
  };

  return (
    <>
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
                {selectUserToChatTimeline[0].message.map((message, index) => {
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
                          <div ref={unreadChat} className="col-5 text-center">
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
                      selectUserToChatTimeline[0].message.length === index + 1
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
                })}
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
    </>
  );
};

export default MainDisplay;
