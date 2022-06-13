//@ts-nocheck
import AuthContent from "@/components/Auth/AuthContent";
import React, { useState, useRef, useEffect } from "react";
import { Card, Container, Fade, Image, Row } from "react-bootstrap";
import ChatBubble from "../components/Chat/ChatBubble";
import { dummyData } from "../components/Chat/dummyData";
import styles from "../styles/chat.module.scss";

import { FiEdit } from "react-icons/fi";
import {
  BsChevronDoubleDown,
  BsChevronDoubleUp,
  BsLink45Deg,
  BsDot,
  BsArrowLeft,
} from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";

const Chat = () => {
  const [open, setOpen] = useState(true);
  const [selectUserToChatTimeline, setSelectUserToChatTimeline] = useState([
    {},
    0,
  ]);
  const [initMessages, setInitMessages] = useState(dummyData);

  const [messages, setMessages] = useState(initMessages);

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
    setSelectUserToChatTimeline([{}, 0]);

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

    // Get current user
    const user = messages.filter((message) => {
      return message.id === id && message;
    });

    // If Same Message is selected twice, then the displayed message would be removed from message UI
    if (
      JSON.stringify(selectUserToChatTimeline[0]) === JSON.stringify(user[0])
    ) {
      setSelectUserToChatTimeline([{}, 0]);
    } else {
      const unreadMessage = user[0].unreadMessage;
      // change unread message to 0 because it is now been read
      user[0].unreadMessage = 0;
      setSelectUserToChatTimeline([user[0], unreadMessage]);
    }
  };
  //   Leave below event for Event Bobbling
  const startChattingWithChild = (e) => {};

  const searchMessages = (e) => {
    let currentMessages = [...initMessages];

    currentMessages = currentMessages.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setMessages(currentMessages);
  };

  const sendMessageToRecipient = (e) => {
    const text = (
      document.getElementById("writeMessage") as HTMLTextAreaElement
    ).value;
    if (text !== "") {
      if (JSON.stringify(selectUserToChatTimeline[0]) === "{}") {
        /*
         ** No Previous Chat Is Selected On Sidebar
         ** Compose Chat By Manually Typing in recipient Name
         */
        let sendTo = (document.getElementById("sendTo") as HTMLInputElement)
          .value;

        if (sendTo.trim() !== "") {
          let sendToRecipients = sendTo.split(",");
          let chatValue = {
            message: text,
            sender: "self",
            read: true,
            dateTime: new Date().toLocaleString(),
          };

          let previousChatWithUser = [];
          let noPreviousChatWithUser = [];
          let trimmedSendToRecipients = sendToRecipients.map((recipient) => {
            return recipient.trim();
          });
          let allUsers = [];

          // Check if recipient had previous chat
          initMessages.forEach((user) => {
            let trimmedUser = user.name.trim();
            allUsers.push(trimmedUser);
            if (trimmedSendToRecipients.includes(trimmedUser)) {
              // User Had Previous Chat
              previousChatWithUser.push(user);
            }
          });

          // New User Chat
          trimmedSendToRecipients.forEach((user) => {
            if (!allUsers.includes(user)) {
              noPreviousChatWithUser.push(user);
            }
          });

          // .... Recurring User Chat ....
          let tempInitMessages = [];
          if (previousChatWithUser.length > 0) {
            let tempInitName = [];
            let displayCurrentUserInTimeline = {};
            previousChatWithUser.forEach((user) => {
              // Update Previous Chat Array/Timeline of Recipient with new Chat
              user.message.push(chatValue);

              // Update UnreadMessage Count By 1 If Any So As Not To Be Diminished By New Chat
              if (user.unreadMessage > 0) {
                user.unreadMessage = user.unreadMessage + 1;
              }
              // Store Updated User
              displayCurrentUserInTimeline = user;

              // Update initMessages with the updated current Recipient
              tempInitMessages.push(user);
              tempInitName.push(user.name);
            });
            // Last name in the list should come first
            tempInitMessages.reverse();
            initMessages.forEach((init) => {
              if (!tempInitName.includes(init.name)) {
                tempInitMessages.push(init);
              }
            });

            // Set State
            setInitMessages(tempInitMessages);
            setMessages(tempInitMessages);
            setSelectUserToChatTimeline([displayCurrentUserInTimeline, 0]);
          }

          // ....... For New Users Chat .......
          if (noPreviousChatWithUser.length > 0) {
            let tempNewUserInitMessages = [];
            let newUser;
            noPreviousChatWithUser.forEach((user, index) => {
              // Create a new Message for user
              newUser = {
                name: user,
                id: `${new Date()}${index}`,
                faceImage: "https://source.unsplash.com/random",
                message: [
                  {
                    message: text,
                    sender: "self",
                    read: true,
                    dateTime: new Date().toLocaleString(),
                  },
                ],
                unreadMessage: 0,
                online: true,
              };
              // Update Temp Message with the updated current Recipient Message
              tempNewUserInitMessages.push(newUser);
            });
            // Last name in the list should come first
            tempNewUserInitMessages.reverse();

            // Enable previousChatWithUser message to also move to top when available
            let sudoTempInitMessages =
              tempInitMessages.length > 0 ? tempInitMessages : initMessages;
            tempNewUserInitMessages = [
              ...tempNewUserInitMessages,
              ...sudoTempInitMessages,
            ];

            // Set State
            setInitMessages(tempNewUserInitMessages);
            setMessages(tempNewUserInitMessages);
            setSelectUserToChatTimeline([tempNewUserInitMessages[0], 0]);
          }

          // Clear Input Values
          (
            document.getElementById("writeMessage") as HTMLTextAreaElement
          ).value = "";
          (
            document.getElementById("searchMessages") as HTMLInputElement
          ).value = "";
          (document.getElementById("sendTo") as HTMLInputElement).value = "";
        }
      } else {
        /*
         ** Previous Chat With User Selected
         ** Compose Chat for Recurring recipient chosen from sidebar
         */
        const chatValue = {
          message: text,
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        };
        let currentRecipient = selectUserToChatTimeline[0];
        // Update Current Recipient with new Chat
        currentRecipient.message.push(chatValue);
        // Update initMessages with the updated current Recipient
        let tempInitMessages = [];
        // Add new chat to top
        tempInitMessages.push(currentRecipient);
        // Other chat to follow
        initMessages.forEach((user) => {
          if (user.name !== currentRecipient.name) {
            tempInitMessages.push(user);
          }
        });

        // Set State
        setInitMessages(tempInitMessages);
        setMessages(tempInitMessages);

        // Clear Input Values
        (document.getElementById("writeMessage") as HTMLTextAreaElement).value =
          "";
        (document.getElementById("searchMessages") as HTMLInputElement).value =
          "";
      }
    }
  };

  return (
    <AuthContent>
      <Container
        className="mt-3"
        style={{ marginTop: "-1.7rem", marginBottom: "-2.7rem" }}
      >
        <div className="row shadow" style={{ minHeight: "80vh" }}>
          {/* SideBar */}
          <div ref={mainSidebar} className="d-md-block col-12 col-md-4 shadow">
            <div className="row">
              <div
                className="d-flex py-3"
                style={{ backgroundColor: "lightgray" }}
              >
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
                    height: "61vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <Card
                    className="border-0 navbar-nav"
                    style={{ margin: "-.5rem" }}
                  >
                    {messages.map((message) => {
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
                            className="row pb-2"
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
                                  className="col-8 fs-5"
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
                                  {message.message[
                                    message.message.length - 1
                                  ].dateTime.substring(10)}
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
                                >
                                  {message.message[
                                    message.message.length - 1
                                  ].message.substring(0, 26)}
                                  {message.message[message.message.length - 1]
                                    .message.length > 26 && <span>...</span>}
                                </p>
                                <h6
                                  className="col-2 text-center"
                                  data-nameid={message.id}
                                  onClick={startChattingWithChild}
                                >
                                  <span
                                    className="badge bg-primary rounded-pill fw-normal"
                                    data-nameid={message.id}
                                    onClick={startChattingWithChild}
                                  >
                                    {message.unreadMessage !== 0 &&
                                      message.unreadMessage}
                                  </span>
                                </h6>
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
            style={{
              height: "33.8em",
            }}
          >
            <Card
              className="border-0 d-flex flex-column"
              style={{ height: "540px" }}
              // style={{ height: "79vh" }}
            >
              <Card.Header
                className=""
                style={{ backgroundColor: "lightgray" }}
              >
                <div className="row">
                  <h3 className="col-12 mt-2">
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
                  </h3>
                </div>
                {JSON.stringify(selectUserToChatTimeline[0]) === "{}" ? (
                  <div className="row">
                    <div className="col-12">
                      <h3>
                        {" "}
                        <BsArrowLeft
                          className="me-2 d-inline d-md-none"
                          onClick={backToSideMessages}
                          style={{
                            cursor: "pointer",
                          }}
                        />
                        New message
                      </h3>
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
                              {ChatBubble(message, index)}
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
                              <div ref={readChat}>
                                {ChatBubble(message, index)}
                              </div>
                            );
                          } else {
                            /*
                             ** No need to Focus as focus has already been made above
                             ** Maintain Read State
                             */
                            return ChatBubble(message, index);
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
                <div className="col-1">
                  <h2 className="text-muted fs-1" style={{ cursor: "pointer" }}>
                    <BsLink45Deg />
                  </h2>
                </div>
                <div className="col-9">
                  <textarea
                    id="writeMessage"
                    className="form-control border"
                    placeholder=" &#128522; Write something..."
                    rows={2}
                  ></textarea>
                </div>
                <div className="col-1">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ borderRadius: "15%" }}
                    onClick={sendMessageToRecipient}
                  >
                    <RiSendPlaneFill size={25} />
                  </button>
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
