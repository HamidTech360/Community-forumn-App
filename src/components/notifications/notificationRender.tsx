import { Card } from "react-bootstrap";

import { GoPrimitiveDot } from "react-icons/go";
import styles from "../../styles/notifications.module.css";

function NotificationRender({ notification }) {
  return (
    <div className={styles.notificationListItem}>
      <div className={styles.notificationDot}>
        <GoPrimitiveDot
          size={globalThis.innerWidth < 768 ? 10 : 30}
          className="text-primary"
        />{" "}
      </div>
      <div>
        <div
          className={`${styles.notificationMessages}`}
          style={{ cursor: "pointer" }}
        >
          <Card.Text> {notification.message}</Card.Text>
          <div className={styles.notificationTime}>
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
