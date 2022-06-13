//@ts-nocheck
import AuthContent from "@/components/Auth/AuthContent";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import styles from "../styles/notifications.module.css";
import { dummyData } from "@/components/notifications/dummyData";

import { BsThreeDots } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { TiDeviceDesktop } from "react-icons/ti";

import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  OverlayTrigger,
  Popover,
  ToggleButton,
} from "react-bootstrap";
import { stat } from "fs";
import { useRouter } from "next/router";
import Link from "next/link";

const Notifications = () => {
  const notifications = dummyData;

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [newAndEarlierStatusState, setNewAndEarlierStatusState] = useState({
    new: false,
    earlier: false,
  });
  // const [newAndEarlierStatusState, setNewAndEarlierStatusState] = useState({
  //   new: null,
  //   earlier: null,
  // });
  let router = useRouter(null);

  const radios = [
    { name: "All", value: "1" },
    { name: "Unread", value: "2" },
  ];

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  const newAndEarlierStatus = (receivedDate) => {
    const today = new Date().toGMTString();
    let todaysDateStr = "";
    let receivedDateStr = "";
    let output = "";

    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      var d = new Date(inputFormat);
      return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
        "/"
      );
    }

    todaysDateStr = convertDate(today);
    receivedDateStr = convertDate(receivedDate);

    let status = "";
    if (todaysDateStr === receivedDateStr) {
      status = "New";
      // let outPut2 = "";
      if (!newAndEarlierStatusState.new) {
        console.log(
          "todaysDateStr === receivedDateStr:",
          todaysDateStr === receivedDateStr
        );
        setNewAndEarlierStatusState({
          ...newAndEarlierStatusState,
          new: status,
        });
        output = status;
        // outPut2 = status;
        // return status;
      }
      // output = outPut2;
    } else if (todaysDateStr !== receivedDateStr) {
      status = "Earlier";
      if (!newAndEarlierStatusState.earlier) {
        // console.log(
        //   "todaysDateStr !== receivedDateStr:",
        //   todaysDateStr !== receivedDateStr
        // );
        setNewAndEarlierStatusState({
          ...newAndEarlierStatusState,
          earlier: status,
        });
        output = status;
        // return status;
      }
    }
    // console.log("output;", output);
    // return output;
  };

  const popover = (
    <Popover id="popover-positioned-bottom-end">
      <Popover.Body>
        <div className="d-grid">
          <Button variant="outline-primary" style={{ textAlign: "start" }}>
            <GiCheckMark /> Mark all as read
          </Button>
          <Button variant="outline-primary" style={{ textAlign: "start" }}>
            <FiSettings /> Notification settings
          </Button>
          {router.asPath !== "/notifications" && (
            <Button variant="outline-primary" style={{ textAlign: "start" }}>
              <TiDeviceDesktop /> Open Notifications
            </Button>
          )}
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <AuthContent>
      <Head>
        <title>Notifications</title>
      </Head>

      <div
        // className="row justify-content-center mt-md-5 mb-5 mb-lg-0 pb-3 pb-lg-0"
        className={`${
          router.asPath === "/notifications"
            ? "row justify-content-center mt-md-5 mb-5 mb-lg-0 pb-3 pb-lg-0"
            : "row justify-content-center"
        }`}
        style={{ marginTop: "-.3rem" }}
      >
        <div
          className={`${
            router.asPath === "/notifications"
              ? "col-12 col-md-9 col-lg-6"
              : "col-12"
          }`}
        >
          <Card className="border-0 shadow px-4">
            <Card.Body>
              <Card.Title className={styles.notificationHeaderText}>
                <span className="h1"> Notifications</span>
                <span className="float-end fs-2">
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom-end"
                    overlay={popover}
                  >
                    <Button
                      variant="none"
                      size="lg"
                      style={{ borderRadius: "100%", fontSize: "1.5rem" }}
                    >
                      <BsThreeDots />
                    </Button>
                  </OverlayTrigger>
                </span>
                <div className={styles.notificationDay}>
                  <ButtonGroup>
                    {radios.map((radio, idx) => (
                      <>
                        <ToggleButton
                          className={`${styles.markAsRead}`}
                          style={{
                            borderRadius: "10%",
                            border: "none",
                          }}
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant="outline-success"
                          name="radio"
                          value={radio.value}
                          checked={radioValue === radio.value}
                          onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                          {radio.name}
                        </ToggleButton>
                        <span className="me-3"></span>
                      </>
                    ))}
                  </ButtonGroup>
                </div>
              </Card.Title>

              <div className={styles.notificationList}>
                <div className="d-flex">
                  <h5>New</h5>
                  {router.asPath !== "/notifications" && (
                    <h6 className="ms-auto">
                      <Link href="/notifications" passHref>
                        See all
                      </Link>
                    </h6>
                  )}
                </div>
                {notifications.map((item, i) => (
                  <>
                    <h5>{newAndEarlierStatus(item.date)}</h5>
                    {/* {newAndEarlierStatusState[1] === 1 &&
                    newAndEarlierStatusState[0]} */}
                    <div className={styles.notificationListItem}>
                      <div className={styles.notificationDot}>
                        {" "}
                        <GoPrimitiveDot
                          size={30}
                          className="text-primary"
                        />{" "}
                      </div>
                      <Card.Text>
                        <div className={`${styles.notificationMessages} lh-1`}>
                          {item.message}
                          <div className={styles.notificationTime}>
                            <small
                              className="text-muted"
                              style={{ fontSize: "11px" }}
                            >
                              <div className="mt-3"> {item.date} </div>
                            </small>{" "}
                          </div>
                        </div>
                      </Card.Text>
                    </div>
                  </>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </AuthContent>
  );
};

export default Notifications;
