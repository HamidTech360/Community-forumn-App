import React, { useState } from "react";
import { Card, Fade } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit } from "react-icons/fi";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import { useSelector } from "@/redux/store";
import DOMPurify from "dompurify";
import truncate from "truncate-html";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import Age from "../Atoms/Age";
import styles from "@/styles/chat.module.scss";
import axios from "axios";
import config from "@/config";
import Avatar from "../Atoms/Avatar";

const SideBar = ({ conversations, selectChat }) => {
  const [open, setOpen] = useState(true);
  const user = useSelector(selectUser);
  const [allUsers, setAllUsers] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const sanitizer = DOMPurify.sanitize;

  const handleSearch = async e => {
    // console.log(e.currentTarget.value)
    if (e.currentTarget.value !== "") {
      setOpen(false);
      setOpenSearch(true);

      try {
        const { data } = await axios.get(
          `${config.serverUrl}/api/search/?type=user&keyword=${e.currentTarget.value}`
        );
        setAllUsers(data);
      } catch (error) {
        console.log(error.response?.data);
      }
    } else {
      setOpen(true);
      setOpenSearch(false);
    }
  };

  return (
    <>
      {/* SideBar */}

      <div className="row">
        <div className="d-flex py-3">
          <div className="col-8">
            <h4>Messages</h4>
          </div>
          <div
            className="col-2 mt-2 ms-auto"
            style={{
              cursor: "pointer"
            }}
          >
            <FiEdit size="20" className="me-2" />{" "}
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
            onChange={e => handleSearch(e)}
          />
        </div>

        {!openSearch ? (
          <Fade in={open}>
            <div
              id="toggleMessagingBody"
              className={`pt-2 ${styles.sideBarCard}`}
              style={{
                overflowY: "auto",
                overflowX: "hidden"
              }}
            >
              <Card className="border-0 navbar-nav">
                {/* replace with message type */}
                {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                {conversations.map((message: Record<string, any>) => {
                  return (
                    <>
                      <div
                        onClick={() =>
                          selectChat(
                            message.sender._id == user?._id
                              ? message.receiver
                              : message.sender
                          )
                        }
                        className={styles.messageItem}
                        style={{ paddingLeft: "20px" }}
                      >
                        <div className={styles.imageBox}>
                          <Avatar
                            src={message.sender?.images?.avatar}
                            name={message.sender.firstName}
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className={styles.messageTexts}>
                          <div>
                            {message.sender._id == user._id
                              ? message.receiver.firstName
                              : message.sender.firstName}{" "}
                          </div>
                          <div>
                            <p
                              className={styles.lastmessage}
                              dangerouslySetInnerHTML={{
                                __html: sanitizer(truncate(message.message, 26))
                              }}
                            ></p>
                            {/* <small className="col-2 text-center">
                              <span className={` badge bg-primary rounded-pill text-white`} style={{ fontSize: "9px" }} >
                                0
                              </span>
                            </small> */}
                          </div>
                        </div>

                        <span
                          className={styles.date}
                          style={{ justifySelf: "flex-end" }}
                        >
                          {" "}
                          <Age time={message.createdAt} />{" "}
                        </span>
                      </div>
                      <hr
                        className="mx-auto"
                        style={{ width: "70%", marginTop: "-0px" }}
                      />
                    </>
                  );
                })}
              </Card>
            </div>
          </Fade>
        ) : (
          <div className={styles.sideBarCard}>
            {allUsers.map((item, i) => (
              <div
                key={i}
                onClick={() => selectChat(item)}
                className={styles.messageItem}
                style={{ paddingLeft: "20px" }}
              >
                <div className={styles.imageBox}>
                  <Avatar
                    src={item?.images?.avatar}
                    name={item.firstName}
                    width={60}
                    height={60}
                  />
                </div>
                <div className={styles.messageTexts}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "13px"
                    }}
                  >
                    {`${item.firstName} ${item.lastName}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
