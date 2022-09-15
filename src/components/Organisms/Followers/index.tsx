/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "@/redux/store";
import { Button, Container, Col, Image, Row } from "react-bootstrap";
import styles from "@/styles/explore.module.scss";

import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import { makeSecuredRequest } from "@/utils/makeSecuredRequest";

const Followers = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [topWriters, setTopWriters] = useState([]);

  const [users, setUsers] = useState([]);

  // Set Top Writers To Display Once
  useEffect(() => {
    if (user && topWriters.length === 0) {
      (async function () {
        try {
          const { data } = await axios.get(
            `${config.serverUrl}/api/users/topwriters/all`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            }
          );

          // Work with the top 30 writers
          const topWritersSlice = data.users.slice(0, 30);

          setTopWriters(topWritersSlice);
        } catch (error) {
          // console.error("topWriters ERROR:", error);
        }
      })();
    }
  }, [user]);

  // Once a writer Has been followed Add another writer from the list in State
  useEffect(() => {
    if (topWriters.length > 0) {
      const sliceNum = 9;
      setUsers(topWriters?.slice(0, sliceNum));
    }
  }, [topWriters]);

  const topWriterToFollow = async (id: string) => {
    try {
      await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      const newTopWritersToFollow = topWriters.filter(writer => {
        if (writer?._id !== id) {
          return writer;
        }
      });
      setTopWriters(newTopWritersToFollow);
    } catch (error) {
      // console.error("follow Error:", error);
    }
  };

  return (
    <section className={styles.write}>
      {topWriters.length !== 0 && (
        <Container>
          <h1 className="d-flex justify-content-center">
            Top writers you should follow
          </h1>
          <Row>
            {users?.map((user, key) => (
              <Col sm={12} md={6} lg={4} key={`author-${key}`} className="mt-4">
                <div className="d-flex gap-3 align-items-center justify-content-between">
                  <Image
                    width={50}
                    height={50}
                    src={user?.images?.avatar || "/images/imagePlaceholder.jpg"}
                    roundedCircle
                    alt={user?.firstName}
                  />

                  <span
                    className="mt-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push(`/profile/${user?._id}`)}
                  >
                    {user?.firstName} {user?.lastName}
                  </span>

                  <Button
                    variant="outline-primary"
                    onClick={() => topWriterToFollow(user?._id)}
                  >
                    Follow
                  </Button>
                </div>
                <hr />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </section>
  );
};

export default Followers;
