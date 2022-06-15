import React from "react";

import { useRouter } from "next/router";

import { useDispatch } from "@/redux/store";
import { notificationsOffcanvas } from "@/reduxFeatures/app/appSlice";

import { Button, Popover } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";
import { TiDeviceDesktop } from "react-icons/ti";

function PopoverRender() {
  let router = useRouter(null);

  const dispatch = useDispatch();

  const closeNotificationOffcanvas = () => {
    dispatch(notificationsOffcanvas(false));
    router.push("/notifications");
  };
  return (
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
}

export default PopoverRender;
