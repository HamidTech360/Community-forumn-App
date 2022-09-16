import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import styles from "../../styles/notifications.module.css";
import { Loader } from "@/hooks/usePagination";

const NotificationRenderer = ({
  notification,
  style
}: {
  notification: Record<string, string>;
  style?: Record<string, string>;
}) => {
  const [author, setAuthor] = useState([]);
  const [otherStrings, setOtherStrings] = useState([]);

  useEffect(() => {
    const strings = notification.content.split(" ");
    setAuthor(strings.slice(0, 2));
    setOtherStrings(strings.slice(2, strings.length));
  }, [notification]);

  return (
    <>
      {author.length > 0 ? (
        <div className="row">
          <div className="col-1">
            <GoPrimitiveDot
              size={18}
              className={!notification.read ? "text-primary" : "text-muted"}
            />{" "}
          </div>
          <div
            className={`col-10 col-sm-11 pe-0 ${
              !notification.read ? "fs-1" : "text-muted fw-normal"
            }`}
          >
            <div style={{ cursor: "pointer", ...style }}>
              <Card.Text className={styles.notificationMessages}>
                <span
                  className={styles.authorName}
                >{`${author[0]} ${author[1]} `}</span>
                {otherStrings.map((string, i) => (
                  <span key={i}>{string} </span>
                ))}
              </Card.Text>
              <hr />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default NotificationRenderer;
