//@ts-nocheck
import React, { useState } from "react";
import { Card, Container, Fade, Image, Row } from "react-bootstrap";
import ChatBubble from "../components/Chat/ChatBubble";
import { dummyData } from "../components/Chat/dummyData";

const Chat = () => {
  const [open, setOpen] = useState(true);
<<<<<<< HEAD
  const [selectUserToChatTimeline, setSelectUserToChatTimeline] = useState("");
  const [initMessages, setInitMessages] = useState(dummyData);
=======
  const [chatingWith, setChatingWith] = useState("");
  // const [selectedMessage, setSelectedMessage] = useState("");
  // const [chatTimeline, setChatTimeline] = useState("");
  const [selectedMessageToChatTimeline, setSelectedMessageToChatTimeline] =
    useState();
  const [initMessages, setInitMessages] = useState([
    {
      name: "Arwen Undomiel",
      id: "1",
      faceImage: "/images/girl-reading.png",
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "recipient",
          read: false,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur culpa alias aspernatur expedita ut delectus placeat qui, illo distinctio. Repellendus, ipsa reiciendis.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "9",
      online: true,
    },
    {
      name: "Bilbo Baggins",
      id: "2",
      faceImage: "/images/girl-reading1.png",
      dateTime: new Date().toLocaleString(),
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "recipient",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "recipient",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur culpa alias aspernatur expedita ut delectus placeat qui, illo distinctio. Repellendus, ipsa reiciendis.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: true,
        },
        {
          message:
            "Please note that popular names listed below are not necessarily consistently popular in every year.",
          sender: "self",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "",
      online: true,
    },
    {
      name: "Barliman Butterbur",
      id: "3",
      faceImage: "/images/formbg.png",
      dateTime: new Date().toLocaleString(),
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "recipient",
          read: false,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur culpa alias aspernatur expedita ut delectus placeat qui, illo distinctio. Repellendus, ipsa reiciendis.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
        {
          message:
            "Lists of given names organized by letter, gender, language and more.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "",
      online: false,
    },
    {
      name: "Elbereth Githoniel",
      id: "4",
      faceImage: "/images/masonry1.png",
      dateTime: new Date().toLocaleString(),
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "recipient",
          read: false,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur culpa alias aspernatur expedita ut delectus placeat qui, illo distinctio. Repellendus, ipsa reiciendis.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
        {
          message:
            "Here we list out such baby girl names that have been popular forever.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "2",
      online: false,
    },
    {
      name: "Elrond Halfelven",
      id: "5",
      faceImage: "/images/masonry2.png",
      dateTime: new Date().toLocaleString(),
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "recipient",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: false,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur culpa alias aspernatur expedita ut delectus placeat qui, illo distinctio. Repellendus, ipsa reiciendis.",
          sender: "sellf",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
        {
          message:
            "Name lists allow you to explore baby names by styles and themes, gather inspiration, and discover names you may not otherwise have thought of.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "8",
      online: true,
    },
    {
      name: "Frodo Baggins",
      id: "6",
      faceImage: "/images/masonry3.png",
      dateTime: new Date().toLocaleString(),
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "recipient",
          read: false,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur culpa alias aspernatur expedita ut delectus placeat qui, illo distinctio. Repellendus, ipsa reiciendis.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
        {
          message: "Top 1,000 Baby Boy Names of 2020",
          sender: "self",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "1",
      online: false,
    },
    {
      name: "Meriadoc Brandybuck",
      id: "7",
      faceImage: "/images/masonry4.png",
      dateTime: new Date().toLocaleString(),
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero soluta perferendis numquam perspiciatis dolor nisi?",
          sender: "recipient",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message: "Lorem ipsum dolor sit amet.",
          sender: "self",
          read: false,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus iste distinctio, obcaecati iure ab, dolorem non assumenda cum esse, reprehenderit fugiat cumque.",
          sender: "self",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut? ",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "",
      online: true,
    },
    {
      name: "Samwise Gamgee",
      id: "8",
      faceImage: "/images/about.png",
      dateTime: new Date().toLocaleString(),
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "recipient",
          read: "self",
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur culpa alias aspernatur expedita ut delectus placeat qui, illo distinctio. Repellendus, ipsa reiciendis.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
        {
          message: "Hello World.",
          sender: "self",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "3",
      online: false,
    },
    {
      name: "Aragorn",
      id: "9",
      faceImage: "/images/article.png",
      dateTime: new Date().toLocaleString(),
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "recipient",
          read: false,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur culpa alias aspernatur expedita ut delectus placeat qui, illo distinctio. Repellendus, ipsa reiciendis.",
          sender: "self",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
        {
          message:
            "The SSA top 20 baby names of 2021 are sure to dazzle, giving any parent the cream of the crop to choose from.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "",
      online: false,
    },
    {
      name: "Eowyn",
      id: "10",
      faceImage: "/images/google.png",
      dateTime: new Date().toLocaleString(),
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: false,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur culpa alias aspernatur expedita ut delectus placeat qui, illo distinctio. Repellendus, ipsa reiciendis.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
        {
          message:
            "1,000 Baby Boy Names to Inspire You. There's so much to do when preparing for the birth of your baby boy, and finding the perfect name is probably right near the top of the list.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "",
      online: true,
    },
    {
      name: "Fangorn",
      id: "11",
      faceImage: "/images/linkedin.png",
      dateTime: new Date().toLocaleString(),
      message: [
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolore!",
          sender: "self",
          read: false,
          dateTime: new Date().toLocaleString(),
        },
        {
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur culpa alias aspernatur expedita ut delectus placeat qui, illo distinctio. Repellendus, ipsa reiciendis.",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
        {
          message: "List of Boy Names (A-Z)",
          sender: "recipient",
          dateTime: new Date().toLocaleString(),
          read: false,
        },
      ],
      unreadMessage: "",
      online: true,
    },
  ]);
>>>>>>> 1c859757d875e97fb0bf9cf8f20d852e121b9d95

  const [messages, setMessages] = useState(initMessages);

  const backToSideMessages = (e) => {
    if (window.innerWidth < 768) {
      document.querySelector("#mainDisplay").classList.add("d-none");
      document.querySelector("#mainSidebar").classList.remove("d-none");
    }
  };

  const startChat = () => {
    setSelectUserToChatTimeline("");

    // Mid Point Display (using Bootstrap d-md-block)
    if (window.innerWidth < 768) {
      document.querySelector("#mainDisplay").classList.remove("d-none");
      document.querySelector("#mainSidebar").classList.add("d-none");
    } else if (window.innerWidth >= 768) {
      document.querySelector("#mainDisplay").classList.remove("d-none");
      document.querySelector("#mainSidebar").classList.remove("d-none");
    }
  };

  const startChattingWith = (e) => {
    // Mid Point Display (using Bootstrap d-md-block)
    if (window.innerWidth < 768) {
      document.querySelector("#mainDisplay").classList.remove("d-none");
      document.querySelector("#mainSidebar").classList.add("d-none");
    } else if (window.innerWidth >= 768) {
      document.querySelector("#mainDisplay").classList.remove("d-none");
      document.querySelector("#mainSidebar").classList.remove("d-none");
    }

    // get data of custom attribute
    const id = e.target.dataset.nameid;

    // Get current user
    const user = messages.filter((message) => {
      return message.id === id && message;
    });

    // If Same Message is selected twice, then the displayed message would be removed from message UI
<<<<<<< HEAD
    if (JSON.stringify(selectUserToChatTimeline) === JSON.stringify(user[0])) {
      setSelectUserToChatTimeline("");
    } else {
      // change unread message to "" because it is now been read
      user[0].unreadMessage = "";
      setSelectUserToChatTimeline(user[0]);
=======
    if (selectedMessageToChatTimeline === data[0].message) {
      // setSelectedMessage("");
      // setChatTimeline("");
      setSelectedMessageToChatTimeline("");
    } else {
      // change unread message to "" because it is noe been read
      data[0].unreadMessage = "";

      // setSelectedMessage(data[0]);
      // setChatTimeline(data[0]);
      setSelectedMessageToChatTimeline(data[0].message);
>>>>>>> 1c859757d875e97fb0bf9cf8f20d852e121b9d95
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
    const text = document.getElementById("writeMessage").value;
    if (text !== "") {
      if (selectUserToChatTimeline === "") {
        /*
         ** No Previous Chat Is Selected On Sidebar
         ** Compose Chat & Manually Type in recipient Name
         */
        let sendTo = document.getElementById("sendTo").value;

        if (sendTo !== "") {
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

          // .... Recurring Chat ....
          let tempInitMessages = [];
          let tempInitName = [];
          previousChatWithUser.forEach((user) => {
            // Update Previous Chat Array/Timeline of Recipient with new Chat
            user.message.push(chatValue);

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

          // ....... For New Users Chat .......
          let tempNewUserInitMessages = [];
          noPreviousChatWithUser.forEach((user, index) => {
            // Create a new Message for user
            let newUser = {
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
              unreadMessage: "",
              online: true,
            };
            // Update Temp Message with the updated current Recipient Message
            tempNewUserInitMessages.push(newUser);
          });
          // Last name in the list should come first
          tempNewUserInitMessages.reverse();
          tempNewUserInitMessages = [
            ...tempNewUserInitMessages,
            ...tempInitMessages,
          ];

          // Set State
          setInitMessages(tempNewUserInitMessages);
          setMessages(tempNewUserInitMessages);

          // Clear Input Values
          document.getElementById("writeMessage").value = "";
          document.getElementById("searchMessages").value = "";
          document.getElementById("sendTo").value = "";
        }
      } else {
        /*
         ** Has Previous Chat With User
         ** Compose Chat for Recurring recipient chosen at sidebar
         */
        const chatValue = {
          message: text,
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        };
        let currentRecipient = selectUserToChatTimeline;
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
        document.getElementById("writeMessage").value = "";
        document.getElementById("searchMessages").value = "";
      }
    }
  };

  return (
    <section>
      <Container>
        <div className="row shadow">
          {/* SideBar */}
          <div id="mainSidebar" className="d-md-block col-12 col-md-4 shadow">
            <div className="row my-4 mx-1">
              <div className="col-8">
                <h4>Messages</h4>
              </div>
              <div
                className="col-2 mt-2"
                style={{
                  cursor: "pointer",
                }}
              >
                <i className="bi bi-pencil-square me-2" onClick={startChat}></i>{" "}
              </div>
              <div
                className="col-2 btn"
                onClick={() => setOpen(!open)}
                aria-controls="toggleMessagingBody"
                aria-expanded={open}
              >
                {!open && (
                  <i
                    id="chevron-double-up"
                    className="d-none d-md-inline bi bi-chevron-double-up ms-auto"
                  ></i>
                )}
                {open && (
                  <i
                    id="chevron-double-down"
                    className="d-none d-md-inline bi bi-chevron-double-down ms-auto"
                  ></i>
                )}
              </div>
              <Fade in={open}>
                <div
                  id="toggleMessagingBody"
                  style={{
                    height: "26.3rem",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  <input
                    id="searchMessages"
                    type="search"
                    className="form-control my-2 mb-3"
                    placeholder="&#128269; Search"
                    aria-label="Search Message"
                    onChange={searchMessages}
                  />
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
                            className="row"
                            data-nameid={message.id}
                            onClick={startChattingWithChild}
                          >
                            <div
                              className="col-12 col-lg-3"
                              data-nameid={message.id}
                              onClick={startChattingWithChild}
                            >
                              <Image
                                src={message.faceImage}
                                alt="image"
                                className="img-fluid"
                                roundedCircle={true}
                                data-nameid={message.id}
                                onClick={startChattingWithChild}
                              ></Image>
                            </div>
                            <div
                              className="col-11 col-lg-9 ms-auto p-0"
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
                                >
                                  {message.message[
                                    message.message.length - 1
                                  ].dateTime.substring(11)}
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
                                    {message.unreadMessage}
                                  </span>
                                </h6>
                              </div>
                            </div>

                            <hr
                              className="mx-auto"
                              style={{ width: "75%", marginTop: "-.9rem" }}
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
            id="mainDisplay"
            className="d-none d-md-block col-12 col-md-8 shadow"
            style={{
              height: "31.6em",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Card
              className="border-0 d-flex flex-column"
              style={{ height: "500px" }}
            >
              <Card.Header className="sticky-top bg-light">
                <div className="row">
                  <h3 className="col-12 mt-2">
                    {selectUserToChatTimeline !== "" && (
                      <i
                        className="bi bi-arrow-left me-2 d-inline d-md-none"
                        onClick={backToSideMessages}
                        style={{
                          cursor: "pointer",
                        }}
                      ></i>
                    )}
                    {selectUserToChatTimeline.name}
                  </h3>
                </div>
                {selectUserToChatTimeline === "" ? (
                  <div className="row">
                    <div className="col-12">
                      <h3>
                        {" "}
                        <i
                          className="bi bi-arrow-left me-2 d-inline d-md-none"
                          onClick={backToSideMessages}
                          style={{
                            cursor: "pointer",
                          }}
                        ></i>
                        New message
                      </h3>
                    </div>
                    <div className="col-12 ">
                      <input
                        id="sendTo"
                        type="text"
                        className="form-control"
                        placeholder="Type a name or multiple names seperated by comma"
                      />
                    </div>
                  </div>
                ) : selectUserToChatTimeline.online === false ? (
                  <div className="row">
                    <h1
                      className="col-sm-1"
                      style={{
                        fontSize: "3rem",
                        margin: "-.9rem -.5rem",
                        color: "white",
                        WebkitTextStroke: "",
                        WebkitTextStrokeColor: "black",
                        WebkitTextStrokeWidth: "1px",
                      }}
                    >
                      <i className="bi bi-dot"></i>
                    </h1>
                    <div className="col-sm-2">
                      <span className="h6 text-muted">offline</span>
                    </div>
                  </div>
                ) : selectUserToChatTimeline.online === true ? (
                  <div className="row">
                    <h1
                      className="col-1"
                      style={{
                        fontSize: "3rem",
                        margin: "-.9rem -.5rem",
                        color: "#4c959f",
                      }}
                    >
                      <i className="bi bi-dot"></i>
                    </h1>
                    <div className="col-2">
                      <span className="h6 text-muted">online</span>
                    </div>
                  </div>
                ) : null}
              </Card.Header>
              <Card.Body>
                {selectUserToChatTimeline !== "" && (
                  <>
                    {selectUserToChatTimeline.message.map((message, index) => {
                      return ChatBubble(message, index);
                    })}
                  </>
                )}
              </Card.Body>
              <Card.Footer
                className="row mt-auto border-0"
                style={{ backgroundColor: "transparent" }}
              >
                <h2
                  className="col-lg-1 text-muted"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-link-45deg"></i>
                </h2>
                <div className="col-lg-9 mb-3">
                  <textarea
                    id="writeMessage"
                    className="form-control"
                    placeholder=" &#128522; Write something..."
                  ></textarea>
                </div>
                <div className="col-lg-2 d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ borderRadius: "15%" }}
                    onClick={sendMessageToRecipient}
                  >
                    Send
                  </button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Chat;
