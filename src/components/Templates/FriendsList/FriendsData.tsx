import { useRouter } from "next/router";
import React from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import styles from "../../../styles/friends.module.scss";
import FriendListDotMenu from "./FriendListDotMenu";
import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
const FriendsData = ({
  friendsList
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  friendsList: Record<string, any>[];
}) => {

  // const { friends } = props.friendsList;
  console.log(friendsList)
  const user = useSelector(selectUser);
  const router = useRouter()
  return (
    <>
      <Row xs={1} md={2}>
        {friendsList?.map(friend => (
          <Col key={friend._id}>
          
            <Card key={friend.id} className="mb-3">
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item as="li">
                    <div className="row align-items-center justify-content-start px-2">
                      <div className="col-4 col-sm-3 me-1">
                        <Image
                          src={
                            friend?.images?.avatar ||
                            "/images/imagePlaceholder.jpg"
                          }
                          alt="User Image"
                          width={50}
                          height={50}
                          roundedCircle
                          onClick={() => router.push(`/profile/${friend._id}`)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <div className={`col-4 col-sm-5 ${styles.title}`}>
                        <Card.Title
                          className={styles.firstName}
                          onClick={() => router.push(`/profile/${friend._id}`)}
                          style={{ cursor: "pointer" }}
                        >
                          {friend.firstName} {friend.lastName}
                        </Card.Title>
                      </div>
                    </div>
                      {/* <FiMoreVertical className="ms-auto " /> */}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
          

          </Col>
        ))}
      </Row>
    </>
  );
};

export default FriendsData;
