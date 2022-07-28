/* eslint-disable react-hooks/exhaustive-deps */
import config from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Image, ListGroup } from "react-bootstrap";
import {
  user as userAuth,
  selectUser,
  selectFollowers,
  setFollowing,
  selectFollowing,
} from "@/reduxFeatures/authState/authStateSlice";
// import { useSelector } from "react-redux";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
import { useDispatch, useSelector } from "@/redux/store";
import appSlice from "@/reduxFeatures/app/appSlice";
import { useRouter } from "next/router";

const Follow = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const user = useSelector(selectUser);
  const userMapper = useSelector(selectUser);
  const currentlyFollowing = useSelector(selectFollowing);
  const dispatch = useDispatch();

  const handleFollow = async (id: string) => {
    try {
      await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      // Update Auth User State
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

        // document.getElementById(`followBtn-${id}`).style.display = "none";
      })();
    } catch (error) {
      // console.error("follow Error:", error);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        // users.length === undefined || users.length === 0
        // console.log("users.length", users.length);
        // if (users.length === undefined) {
        //   console.log("users.length is undefined");
        // }
        const { data } = await axios.get(`${config.serverUrl}/api/users`);

        let sliceNum = 0;
        if (window.innerHeight > 777) {
          sliceNum = 10;
        } else {
          sliceNum = 5;
        }

        await data.users.sort(function (newUser) {
          return 0.5 - Math.random();
        });

        // setUsers(
        //   data.users
        //     .filter((person) => {
        //       return (
        //         // !person.followers.includes(user._id) ||
        //         person._id.toString() !== user._id.toString()
        //       );
        //     })
        //     // .slice(0, 10)
        //     .slice(0, sliceNum)
        // );

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
          setUsers(notFollowing.slice(0, sliceNum));
        }
      } catch (error) {
        // console.log(error.response?.data);
      }
    })();
    // }, [window.innerHeight]);
  }, [currentlyFollowing]);
  return (
    <ListGroup
      className="container-fluid p-0 p-xl-2 radius-10 shadow"
      as={Card}
      variant="flush"
      style={{
        border: "none",
        width: "100%",
        height: "max-content",
      }}
    >
      <h6 className="text-center">Suggested connections</h6>

      {users.map((user, key) => (
        <div className="row align-items-center border-0" key={`author-${key}`}>
          <ListGroup.Item
            // key={`author-${key}`}
            // style={{ boxSizing: "border-box" }}
            className="d-flex align-items-center gap-0 gap-xl-2 gap-xxl-3 w-100 justify-content-start border-0 bg-transparent"
          >
            {/* <div className="d-flex gap-2 py-1 align-items-center justify-content-center w-100"> */}
            <div
              className="col-xs-2"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/profile/${user?._id}`)}
            >
              <Image
                width={35}
                height={35}
                src={`/images/friends${key + 1}.png`}
                roundedCircle
                alt={user?.firstName}
              />
            </div>

            <div
              className="col-xs-7 px-1"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/profile/${user?._id}`)}
            >
              <small className="mt-1" style={{ width: "90%" }}>
                {user?.firstName} {user?.lastName.split(" ")[0]}
              </small>
            </div>

            <div className="col-xs-3 ms-auto">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleFollow(user?._id)}
              >
                Follow
              </Button>
            </div>
          </ListGroup.Item>
          {/* <hr style={{ width: "90%" }} /> */}
          <hr className="w-75 mx-auto" />
        </div>
      ))}

      <div className="row justify-content-center">
        <div className="col">
          <button
            className="btn btn-link btn-sm"
            style={{ textDecoration: "none" }}
          >
            See More
          </button>
        </div>
      </div>
    </ListGroup>
  );
};

export default Follow;
