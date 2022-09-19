import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { useRouter } from "next/router";
import styles from "../../styles/notifications.module.css";

const NotificationRenderer = ({
  notification,
  style
}: {
  notification: Record<string, string>;
  style?: Record<string, string>;
}) => {
  const [author, setAuthor] = useState([]);
  const [otherStrings, setOtherStrings] = useState([]);
  const router = useRouter()
  useEffect(() => {
    const strings = notification.content.split(" ");
    setAuthor(strings.slice(0, 2));
    setOtherStrings(strings.slice(2, strings.length));
  }, [notification]);

  const handleAcceptInvite = ()=>{
    
    router.push(`/groups/${notification.itemId}/timeline`)
  }

  return (
    <div className="row">
      <div className="col-1">
        <GoPrimitiveDot
          size={18}
          className={!notification.read ? "text-primary" : "text-muted"}
        />{" "}
      </div>
      <div className="col-10 col-sm-11 pe-0">
        <div
          className={`${styles.notificationMessages}`}
          style={{ cursor: "pointer", ...style }}
        >
          <Card.Text className={styles.notificationMessages}>
            <span
              className={styles.authorName}
            >{`${author[0]} ${author[1]} `}</span>
            {otherStrings.map((string, i) => (
              <span key={i}>{string} </span>
            ))}
            <div style={{paddingTop:'10px'}}>
              {notification.forItem=='invite'? 
              <>
              <Button onClick={()=>handleAcceptInvite()} style={{marginRight:'20px'}}>View</Button>
              <Button variant="danger" >Decline</Button>
              </>
              :''}
            </div>
          </Card.Text>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default NotificationRenderer;
