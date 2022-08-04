import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import styles from "../../styles/notifications.module.css";

function NotificationRender({ notification }) {

  const [author, setAuthor] = useState([])
  const [otherStrings, setOtherStrings] = useState([])

  useEffect(()=>{
    const strings = notification.content.split(" ")
    setAuthor(strings.slice(0,2))
    setOtherStrings(strings.slice(2, strings.length))
  },[notification])
//  console.log(otherStrings);
  
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
          <Card.Text className={styles.notificationMessages} > 
              <span className={styles.authorName}>{`${author[0]} ${author[1]} `}</span>
              {otherStrings.map((string, i)=>
                <span>{string} </span>
              )}
          </Card.Text>
          <hr />
          {/* <div>
            <small className="text-muted" style={{ fontSize: "11px" }}>
              <div className="mt-3">
                <Card.Text>{notification.date}</Card.Text>{" "}
              </div>
            </small>{" "}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default NotificationRender;
