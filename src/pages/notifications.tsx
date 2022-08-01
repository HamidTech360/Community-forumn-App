//@ts-nocheck
import AuthContent from "@/components/Auth/AuthContent";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/notifications.module.css";
import { dummyData } from "@/components/notifications/dummyData";
import NotificationRender from "@/components/notifications/notificationRender";
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
  ToggleButton,
} from "react-bootstrap";
import { useRouter } from "next/router";
import {selectNotifications} from '@/reduxFeatures/api/notifications'
import { getNotification } from "@/reduxFeatures/api/notifications";

import Link from "next/link";

const Notifications = () => {
  const notifications = dummyData;

  const [radioValue, setRadioValue] = useState("1");
  const [Notifications, setNotifications] = useState([])
  let router = useRouter(null);
  const allNotifications = useSelector(state=>state.notification)
  console.log((allNotifications));
  
  //console.log('original notif', allNotifications);
  
  const dispatch = useDispatch();
  useEffect(()=>{
    (async ()=>{
      try{
        const response = await axios.get(`${config.serverUrl}/api/notifications`, {headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }})
        console.log(response.data);
        setNotifications(response.data.notifications)
      }catch(error){
        console.log(error.response?.data); 
      }
    })()
    //dispatch(getNotification([1,5]))
  },[])
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

  const navigateToItem = (item)=>{
 
    if(item.forItem==="post"){
      router.push(`/explore/${item.itemId}`)
    }else if(item.forItem === "gist"){
      router.push(`/gist/${item.itemId}`)
    }else if(item.forItem==="follow"){
      //console.log(item);
      router.push(`/profile/${item.itemId}`)
    }
    
    dispatch(notificationsOffcanvas(false))

  }

  const newAndEarlierStatus = (receivedDate) => {
    const today = new Date().toGMTString();
    let todaysDateStr = "";
    let receivedDateStr = "";

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
          <Button variant="outline-primary" style={{ textAlign: "start" }}>
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
        style={{ marginTop: "-.3rem" }}
      >
        <div
          className={`${
            router.asPath === "/notifications"
              ? "col-12 col-md-9 col-lg-6"
              : "col-12 p-0"
          }`}
        >
          <Card
            className={
              router.asPath === "/notifications"
                ? "shadow  border-0 px-4"
                : " border-0"
                
            }
            style={{minHeight:'90vh'}}
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
                          border: "none",
                        }}
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
                {Notifications.map((notification, index) => (
                  <div key={index} onClick={()=>navigateToItem(notification)} >
                      <NotificationRender notification={notification} />
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
