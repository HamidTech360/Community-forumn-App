import AuthContent from "@/components/Auth/AuthContent";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/notifications.module.css";

import NotificationRenderer from "@/components/notifications/NotificationRenderer";
import config from "@/config";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import { notificationsOffcanvas } from "@/reduxFeatures/app/appSlice";

import { BsThreeDots } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { TiDeviceDesktop } from "react-icons/ti";

import {
  Button,
  ButtonGroup,
  Card,
  OverlayTrigger,
  Popover,
  ToggleButton
} from "react-bootstrap";
import { useRouter } from "next/router";

import {
  selectNotifications,
  selectNotificationsCount,
  setNotificationsData
} from "@/reduxFeatures/api/notifications";
import { setActiveTab } from "@/reduxFeatures/app/settingsSlice";

const Notifications = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState("1");

  const allNotificationsState = useSelector(selectNotifications);
  const totalNotificationsState = useSelector(selectNotificationsCount);

  const [allNotifications, setAllNotifications] = useState([]);
  const [, setTotalNotifications] = useState(0);
  const [unReadNotifications, setUnReadNotifications] = useState(undefined);

  const radios = [
    { name: "All", value: "1" },
    { name: "Unread", value: "2" }
  ];

  // Manage All & Unread Radio Button
  useEffect(() => {
    if (radioValue === "1") {
      setAllNotifications(allNotificationsState);
      setTotalNotifications(totalNotificationsState);
    } else if (radioValue === "2") {
      // Filter Unread Notifications Once
      if (!unReadNotifications) {
        const unRead = allNotificationsState.filter(item => !item.read);
        setAllNotifications(unRead);
        setUnReadNotifications(unRead);
        setTotalNotifications(unRead.length);
      } else {
        setAllNotifications(unReadNotifications);
        setTotalNotifications(unReadNotifications.length);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  const navigateToItem = async item => {
    // // Update Unread Notification Count
    // dispatch(setNotificationsCount(totalNotifications - 1));

    const index = allNotifications.indexOf(item);

    try {
      await axios.delete(
        `${config.serverUrl}/api/notifications?id=${item._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );

      const notifications_c = [...allNotifications];
      notifications_c[index] = { ...notifications_c[index], read: true };
      dispatch(setNotificationsData(notifications_c));

      if (item.forItem === "post") {
        router.push(`/explore/${item.itemId}`);
      } else if (item.forItem === "gist") {
        router.push(`/gist/${item.itemId}`);
      } else if (item.forItem === "follow") {
        router.push(`/profile/${item.itemId}`);
      } else if (item.forItem == "feed") {
        router.push(`/feed?active=${item.itemId}`);
      }
    } catch (error) {
      // console.log(error.response?.data);
    }

    dispatch(notificationsOffcanvas(false));
  };

  const closeNotificationOffcanvas = () => {
    dispatch(notificationsOffcanvas(false));
    router.push("/notifications");
  };

  const popover = (
    <Popover id="popover-positioned-bottom-end">
      <Popover.Body>
        <div className="d-grid">
          <Button variant="outline-primary" style={{ textAlign: "start" }}>
            <GiCheckMark /> Mark all as read
          </Button>
          <Button
            variant="outline-primary"
            style={{ textAlign: "start" }}
            onClick={() => {
              // Set Settings Page Active Tab
              dispatch(setActiveTab("notifications"));
              router.push("/settings");
              // Close Notification Canvas
              dispatch(notificationsOffcanvas(false));
            }}
          >
            <FiSettings /> Notification settings
          </Button>
          {router.asPath !== "/notifications" && (
            <Button
              variant="outline-primary"
              style={{ textAlign: "start" }}
              onClick={closeNotificationOffcanvas}
            >
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
        className={`${
          router.asPath === "/notifications"
            ? "row justify-content-center mt-md-2 mb-0 mb-lg-0 pb-3 pb-lg-0"
            : "row justify-content-center pe-2"
        }`}
        style={{ marginTop: "-.3rem", backgroundColor: "#f6f6f6" }}
      >
        <div
          className={`${
            router.asPath === "/notifications"
              ? "col-12 col-md-9 col-lg-6"
              : "col-12 p-0"
          }`}
        >
          <Card
            className={router.asPath === "/notifications" ? "px-4" : "border-0"}
            style={{
              minHeight: "90vh",
              border: "1px solid rgba(0, 0, 0, 0.125)"
            }}
          >
            <Card.Body className="p-3">
              <Card.Title className={`${styles.notificationHeaderText}`}>
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
                      <ToggleButton
                        key={idx}
                        className={`${styles.markAsRead} me-3`}
                        style={{
                          borderRadius: "10%",
                          border: "none"
                        }}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-success"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={e => setRadioValue(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </div>
              </Card.Title>

              <div>
                <div className="d-flex">
                  <h5>New</h5>
                  {router.asPath !== "/notifications" && (
                    <h6
                      className="ms-auto btn"
                      style={{ color: "blue", marginTop: "-.6rem" }}
                      onClick={closeNotificationOffcanvas}
                    >
                      See all
                    </h6>
                  )}
                </div>

                {allNotifications?.map((notification, index) => (
                  <div
                    className={notification.read ? "text-muted" : ""}
                    key={index}
                    onClick={() => navigateToItem(notification)}
                  >
                    <NotificationRenderer notification={notification} />
                  </div>
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
