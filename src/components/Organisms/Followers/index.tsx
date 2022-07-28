/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
// import Image from 'next/image'
import axios from 'axios'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store"
import { Button, Container, Col, Image, Row } from 'react-bootstrap';
import styles from "@/styles/explore.module.scss";

import {
    setIsFetching,
    selectIsFetching,
  } from "@/reduxFeatures/api/postSlice";
  import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import { makeSecuredRequest, deleteSecuredRequest } from "@/utils/makeSecuredRequest";


const Followers = () => {
    const user = useSelector(selectUser);
    const isFetching = useSelector(selectIsFetching);
    const dispatch = useDispatch();


    const [users, setUsers] = useState([]);
    const [ follow, setFollow ] = useState(false);


    const postFollow = async (id: string) => {
      try {
          const data = await axios.get(
              `${config.serverUrl}/api/users/${id}/follow`, {
                  headers: {
                      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
              }
            );
      //   window.location.reload();
      setFollow(true)
      console.log("follow:", data);
      } catch (error) {
        console.log("follow Error:", error);
      }
    };
  
    const postUnfollow = async (id: string) => {
      try {
        const data = await axios.delete(
          `${config.serverUrl}/api/users/${id}/follow`, {
              headers: {
                  authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
          }
        );
          setFollow(false)
          console.log("follow:", data);
      } catch (error) {
        console.log("follow Error:", error);
      }
    };
    const postUsers = async () => {
        try {
          const { data } = await axios.get(`${config.serverUrl}/api/users`);
          // console.log(user);
          // console.log("User data:", data);
  
          setUsers(
            data.users
              .filter((person) => {
                return (
                  !person.followers.includes(user._id) ||
                  person._id.toString() !== user._id.toString()
                );
              })
              .slice(0, 10)
          );
        } catch (error) {
          console.log(error.response?.data);
        }
    }
    useEffect(() => {
        postUsers()

        users.filter(element => {
          if (element.followers.includes(user?._id)) {
            setFollow(true)
          }
        
          setFollow(false)
        });
    },[])
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
                  {follow ? (
                    <Button 
                    variant="primary"
                    onClick= {() => postUnfollow(user?._id)}
                    >
                      Unfollow
                  </Button>
                  ) : <Button 
                  variant="outline-primary"
                  onClick= {() => postFollow(user?._id)}
                  >
                    Follow
                </Button>}
                  
                  {/* <Button 
                    variant="outline-primary"
                    onClick= {() => postFollow(user?._id)}
                    >
                      Follow
                  </Button> */}
                </div>
                <hr />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
  )
}

export default Followers