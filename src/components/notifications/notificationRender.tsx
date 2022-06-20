import { Card } from "react-bootstrap";

import { GoPrimitiveDot } from "react-icons/go";
import styles from "../../styles/notifications.module.css";

function NotificationRender({ notification }) {
  return (
    <div className="row">
      <div className="col-1">
        <GoPrimitiveDot size={18} className="text-primary" />{" "}
      </div>
      <div className="col-10 col-sm-11 pe-0">
        <div
          className={`${styles.notificationMessages}`}
          style={{ cursor: "pointer" }}
        >
          <Card.Text> {notification.message}</Card.Text>
          <div>
            <small className="text-muted" style={{ fontSize: "11px" }}>
              <div className="mt-3">
                <Card.Text>{notification.date}</Card.Text>{" "}
              </div>
            </small>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationRender;
