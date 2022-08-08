import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Badge, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { FiMoreVertical } from "react-icons/fi";
import styles from "../../../styles/friends.module.scss";

const FriendsData = ({ friendsList }: any) => {
  // const { friends } = props.friendsList;
  console.log("friend lists are ", friendsList);
  const user = useSelector(selectUser);
  return (
    <>
      <Row xs={1} md={2}>
        {friendsList?.map((friend: Record<string, any>) => (
          <Col md={6} sm={12} lg={6}>
            <Link href={`/profile/${friend._id}`} passHref>
              <Card
                key={friend.id}
                className="mb-3"
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      as="li"
                      className="d-flex align-items-center justify-content-start gap-2  px-3"
                    >
                      <div>
                        <Image
                          src={"/images/imagePlaceholder.jpg"}
                          alt="user"
                          width={50}
                          height={50}
                          roundedCircle
                        />
                      </div>
                      <div className={styles.title}>
                        <Card.Title className={styles.firstName}>
                          {friend.firstName} {friend.lastName}
                        </Card.Title>
                        <Card.Subtitle
                          className={`mb-2 text-muted ${styles.subtitle}`}
                        >
                          {friend.following?.includes(user._id) &&
                            "Follows you"}
                        </Card.Subtitle>
                      </div>
                      <FiMoreVertical className="ms-auto " />
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FriendsData;
