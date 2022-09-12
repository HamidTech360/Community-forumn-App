/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import Image from 'next/image'
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import { Button, Container, Col, Image, Row } from "react-bootstrap";
import styles from "@/styles/explore.module.scss";

import {
  user as userAuth,
  selectUser
} from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import { makeSecuredRequest } from "@/utils/makeSecuredRequest";

const Followers = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [topWriters, setTopWriters] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          });
          dispatch(userAuth(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      console.error("User Fetch Error", error);
    }
  }, []);

  const topWriterToFollow = async (id: string) => {
    try {
      await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);
      // console.log("NOW FOLLOWING");
      // Update Auth User State
      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          });
          dispatch(userAuth(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();

      const newTopWritersToFollow = topWriters.filter(writer => {
        if (writer?._id !== id) {
          console.log("writer?._id:", writer?._id);
          return writer;
        }
      });
      setTopWriters(newTopWritersToFollow);
    } catch (error) {
      console.error("follow Error:", error);
    }
  };

  useEffect(() => {
    // Set Top Writers Display
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

          console.log("topWriters:::", data);

          const topWritersSlice = data.users.slice(0, 30);
          const followTopWriters = await topWritersSlice.filter(person => {
            // console.log("person?._id", person?._id);
            // console.log("user?._id", user?._id);
            if (person?._id !== user?._id) {
              return person;
            }
          });

          setTopWriters(followTopWriters);
        } catch (error) {
          // console.error("topwriters ERROR:", error);
        }
      })();
    }
  }, [user]);

  useEffect(() => {
    console.log("topWriters:", topWriters);
    if (topWriters.length > 0) {
      const sliceNum = 9;
      setUsers(topWriters?.slice(0, sliceNum));
    }
  }, [topWriters]);

  return (
    <section className={styles.write}>
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
    </section>
  );
};

export default Followers;
