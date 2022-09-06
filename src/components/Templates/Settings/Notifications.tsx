import React from "react";
import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import axios from "axios";
import config from "@/config";
import { Container, Form, ListGroup } from "react-bootstrap";
import styles from "../../../styles/notifications.module.scss";

const Notifications = () => {
  const user = useSelector(selectUser);
  //console.log(user.notificationOptions);

  const handleCheck = async e => {
    const value = e.currentTarget.checked;
    const name = e.currentTarget.name;

    // console.log(e.currentTarget.defaultChecked);

    const action = value ? "add" : "remove";

    try {
      const { data } = await axios.put(
        `${config.serverUrl}/api/users/notifications/${action}`,
        { option: name },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  return (
    <>
      <Container className={styles.content}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h4>Email Notifications preferences</h4>
          </ListGroup.Item>

          <ListGroup.Item>
            <p>ACTIVITY FEED</p>

            <Form className={styles.form1}>
              <div>
                <Form.Label className={styles.name}>
                  A member mentions you in an update using &quot;@Esther&quot;
                </Form.Label>
                <Form.Check
                  defaultChecked={user.notificationOptions.includes(
                    "memberMention"
                  )}
                  name="memberMention"
                  onClick={e => handleCheck(e)}
                  aria-label="option 2"
                  className={styles.label}
                />
              </div>

              <div>
                <Form.Label className={styles.name}>
                  A member replies to an update or comment you&apos;ve posted
                </Form.Label>
                <Form.Check
                  defaultChecked={user.notificationOptions.includes(
                    "memberComment"
                  )}
                  onClick={e => handleCheck(e)}
                  name="memberComment"
                  aria-label="option 2"
                  className={styles.label}
                />
              </div>
            </Form>
          </ListGroup.Item>

          <ListGroup.Item>
            <p>MESSAGES</p>

            <Form className={styles.form1}>
              <div>
                <Form.Label className={styles.name}>
                  A member sends you a new message
                </Form.Label>
                <Form.Check
                  defaultChecked={user.notificationOptions.includes(
                    "memberSendMessage"
                  )}
                  onClick={e => handleCheck(e)}
                  name="memberSendMessage"
                  aria-label="option 2"
                  className={styles.label}
                />
              </div>
            </Form>
          </ListGroup.Item>

          <ListGroup.Item>
            <p>GROUPS </p>

            <Form className={styles.form1}>
              <div>
                <Form.Label className={styles.name}>
                  A member invites you to join a group
                </Form.Label>
                <Form.Check
                  defaultChecked={user.notificationOptions.includes(
                    "memberInvite"
                  )}
                  onClick={e => handleCheck(e)}
                  name="memberInvite"
                  aria-label="option 2"
                  className={styles.label}
                />
              </div>

              <div>
                <Form.Label className={styles.name}>
                  Group information is updated
                </Form.Label>
                <Form.Check
                  defaultChecked={user.notificationOptions.includes(
                    "GroupInfoUpdated"
                  )}
                  onClick={e => handleCheck(e)}
                  name="GroupInfoUpdated"
                  aria-label="option 2"
                  className={styles.label}
                />
              </div>

              <div>
                <Form.Label className={styles.name}>
                  You are promoted to a group organizer or moderator
                </Form.Label>
                <Form.Check
                  defaultChecked={user.notificationOptions.includes(
                    "promotion"
                  )}
                  onClick={e => handleCheck(e)}
                  name="promotion"
                  aria-label="option 2"
                  className={styles.label}
                />
              </div>

              <div>
                <Form.Label className={styles.name}>
                  A member requests to join a private group you organize
                </Form.Label>
                <Form.Check
                  defaultChecked={user.notificationOptions.includes(
                    "requestToJoinGroup"
                  )}
                  onClick={e => handleCheck(e)}
                  name="requestToJoinGroup"
                  aria-label="option 2"
                  className={styles.label}
                />
              </div>

              <div>
                <Form.Label className={styles.name}>
                  Your request to join a group has been approved or denied
                </Form.Label>
                <Form.Check
                  defaultChecked={user.notificationOptions.includes(
                    "requestToJoinGroupReply"
                  )}
                  onClick={e => handleCheck(e)}
                  name="requestToJoinGroupReply"
                  aria-label="option 2"
                  className={styles.label}
                />
              </div>
            </Form>
          </ListGroup.Item>

          <ListGroup.Item>
            <p>CONNECTIONS</p>

            <Form className={styles.form1}>
              <div>
                <Form.Label className={styles.name}>
                  A member invites you to connect
                </Form.Label>
                <Form.Check
                  defaultChecked={user.notificationOptions.includes(
                    "inviteToConnect"
                  )}
                  onClick={e => handleCheck(e)}
                  name="inviteToConnect"
                  aria-label="option 2"
                  className={styles.label}
                />
              </div>

              <div>
                <Form.Label className={styles.name}>
                  A member accepts your connection request
                </Form.Label>
                <Form.Check
                  defaultChecked={user.notificationOptions.includes(
                    "acceptConnectionRequest"
                  )}
                  onClick={e => handleCheck(e)}
                  name="acceptConnectionRequest"
                  aria-label="option 2"
                  className={styles.label}
                />
              </div>
            </Form>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </>
  );
};

export default Notifications;
