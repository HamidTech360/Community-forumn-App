import React, { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Fade,
  Image,
  Row,
} from "react-bootstrap";
import { Prev } from "react-bootstrap/esm/PageItem";

const Chat = () => {
  const [open, setOpen] = useState(true);
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

  const [messages, setMessages] = useState(initMessages);

  const startChatingWith = (e) => {
    const id = e.target.dataset.nameid;

    const data = messages.filter((message) => {
      return message.id === id && message;
    });

    // If Same Message is selected twice, then the displayed message would be removed from message UI
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
    }
  };
  //   Leave below event for Event Bobbling
  const startChatingWithChild = (e) => {};

  const searchMessages = (e) => {
    let currentMessages = initMessages;

    currentMessages = currentMessages.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setMessages(currentMessages);
  };

  const chatBubble = (message) => {
    const self = `bg-primary text-light mb-5 p-3 ms-auto`;
    const recipient = `bg-secondary text-light mb-5 p-3`;

    const messagingStyle = message.sender === "self" ? self : recipient;

    const self2 = `ms-auto`;
    const messagingStyle2 = message.sender === "self" && self2;

    return (
      <>
        <div
          style={{
            width: "28%",
            height: "auto",
          }}
          className={messagingStyle2}
        >
          {message.dateTime}
        </div>
        <div
          className={messagingStyle}
          style={{
            width: "40%",
            height: "auto",
            borderRadius: "35px 15px 35px 35px",
          }}
        >
          {message.message}
        </div>
      </>
    );
  };

  // const messageRecepient = (e) => {
  //   const chatValue = {
  //     message: document.getElementById("writeMessage").value,
  //     sender: "self",
  //     read: true,
  //     dateTime: new Date().toLocaleString(),
  //   };

  //   let currentReceipiant = selectedMessageToChatTimeline;
  //   // console.log("chatValue:", chatValue);

  //   currentReceipiant.message.push(chatValue);

  //   // initMessages.forEach((user) => {
  //   //   if (user.name === currentReceipiant.name) {
  //   //     console.log(user.name);
  //   //   }
  //   // });

  //   setInitMessages((prev) => {
  //     // console.log("prev:", prev);
  //     prev.forEach((user) => {
  //       if (user.name === currentReceipiant.name) {
  //         // user = currentReceipiant
  //         user.message.push(chatValue);
  //         console.log("user", user);
  //       }
  //     });
  //   });
  //   // console.log("currentReceipiant:", currentReceipiant);

  //   // console.log("initMessages B4:", initMessages);
  //   // setInitMessages({...initMessages, initMessages.message.push(chatValue)})
  //   // console.log("initMessages AFTER:", initMessages);
  // };

  return (
    <section>
      <Container>
        <div className="row shadow">
          <div className="col-12 col-md-4 shadow">
            <div className="row my-4 mx-1">
              <div className="col-9">
                <h4>Messages</h4>
              </div>
              <div
                className="col-3 btn"
                onClick={() => setOpen(!open)}
                aria-controls="toggleMessagingBody"
                aria-expanded={open}
              >
                <i className="bi bi-pencil-square me-2"></i>{" "}
                {!open && (
                  <i
                    id="chevron-double-up"
                    className="bi bi-chevron-double-up ms-auto"
                  ></i>
                )}
                {open && (
                  <i
                    id="chevron-double-down"
                    className="bi bi-chevron-double-down ms-auto"
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
                          onClick={startChatingWith}
                        >
                          <div
                            className="row"
                            data-nameid={message.id}
                            onClick={startChatingWithChild}
                          >
                            <div
                              className="col-12 col-lg-3"
                              data-nameid={message.id}
                              onClick={startChatingWithChild}
                            >
                              <Image
                                src={message.faceImage}
                                alt="image"
                                className="img-fluid"
                                roundedCircle={true}
                                data-nameid={message.id}
                                onClick={startChatingWithChild}
                              ></Image>
                            </div>
                            <div
                              className="col-11 col-lg-9 ms-auto p-0"
                              data-nameid={message.id}
                              onClick={startChatingWithChild}
                            >
                              <div
                                className="col-11 d-flex"
                                data-nameid={message.id}
                                onClick={startChatingWithChild}
                              >
                                <div
                                  className="col-8 fs-5"
                                  data-nameid={message.id}
                                  onClick={startChatingWithChild}
                                >
                                  {message.name}
                                </div>
                                <div
                                  className="col-4 text-muted text-center"
                                  data-nameid={message.id}
                                  onClick={startChatingWithChild}
                                >
                                  {message.message[
                                    message.message.length - 1
                                  ].dateTime.substring(11)}
                                </div>
                              </div>
                              <div
                                className="col-11 d-flex"
                                data-nameid={message.id}
                                onClick={startChatingWithChild}
                              >
                                <p
                                  className="col-10"
                                  data-nameid={message.id}
                                  onClick={startChatingWithChild}
                                >
                                  {message.message[
                                    message.message.length - 1
                                  ].message.substring(0, 26)}
                                  ...
                                </p>
                                <h6
                                  className="col-2 text-center"
                                  data-nameid={message.id}
                                  onClick={startChatingWithChild}
                                >
                                  <span
                                    className="badge bg-primary rounded-pill fw-normal"
                                    data-nameid={message.id}
                                    onClick={startChatingWithChild}
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
                              onClick={startChatingWithChild}
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

          <div
            className="col-12 col-md-8 shadow"
            style={{
              height: "31.6em",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Card className="border-0 d-flex flex-column">
              <Card.Header style={{ backgroundColor: "transparent" }}>
                <h3 className="mt-2">{selectedMessageToChatTimeline.name}</h3>
                {selectedMessageToChatTimeline === "" ? (
                  <div className="row">
                    <div className="col-12">
                      <h3>New message</h3>
                    </div>
                    <div className="col-12 ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type a name or multiple names"
                      />
                    </div>
                  </div>
                ) : selectedMessageToChatTimeline.online === false ? (
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
                ) : selectedMessageToChatTimeline.online === true ? (
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
                {selectedMessageToChatTimeline !== "" && (
                  <>
                    {selectedMessageToChatTimeline.message.map((message) => {
                      return chatBubble(message);
                    })}
                  </>
                )}
              </Card.Body>
              <Card.Footer
                className="row mt-auto border-0"
                style={{ backgroundColor: "transparent" }}
              >
                <h2 className="col-lg-1 text-muted">
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
                    // onClick={messageRecepient}
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
