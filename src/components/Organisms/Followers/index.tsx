/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import Image from 'next/image'
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import { Button, Container, Col, Image, Row } from "react-bootstrap";
import styles from "@/styles/explore.module.scss";

import { setIsFetching, selectIsFetching } from "@/reduxFeatures/api/postSlice";

import {
  user as userAuth,
  selectUser,
  selectFollowing,
} from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import {
  makeSecuredRequest,
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";

const Followers = () => {
  const user = useSelector(selectUser);
  const isFetching = useSelector(selectIsFetching);
  const dispatch = useDispatch();
  const currentlyFollowing = useSelector(selectFollowing);

  const [users, setUsers] = useState([]);
  const [follow, setFollow] = useState(false);

  const postFollow = async (id: string) => {
    try {
      await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          dispatch(userAuth(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      console.error("follow Error:", error);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/users`);

        await data.users.sort(function (newUser) {
          return 0.5 - Math.random();
        });

        const notFollowing = data.users.filter((person) => {
          if (
            person._id.toString() !== user._id.toString() &&
            !currentlyFollowing.includes(person?._id)
          ) {
            return person;
          }
        });

        if (
          JSON.stringify(currentlyFollowing) !== JSON.stringify(notFollowing)
        ) {
          setUsers(notFollowing);
        }
      } catch (error) {
        console.log(error.response?.data);
      }
    })();
  }, [currentlyFollowing]);
  return (
    <section className={styles.write}>
      <Container>
        <h1 className="d-flex justify-content-center">
          Top writers you should follow
        </h1>
        <Row>
          {users?.map((user, key) => (
            <Col md={6} lg={4} sm={12} key={`author-${key}`} className="mt-4">
              <div className="d-flex gap-3 align-items-center justify-content-evenly">
                <Image
                  width={50}
                  height={50}
                  src="/images/imagePlaceholder.jpg"
                  roundedCircle
                  alt={user?.firstName}
                />

                <span className="mt-1">
                  {user?.firstName} {user?.lastName}
                </span>

                <Button
                  variant="outline-primary"
                  onClick={() => postFollow(user?._id)}
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
