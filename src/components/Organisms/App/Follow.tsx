/* eslint-disable react-hooks/exhaustive-deps */
import config from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Image, ListGroup } from "react-bootstrap";
import {
  user as userAuth,
  selectUser,
} from "@/reduxFeatures/authState/authStateSlice";
// import { useSelector } from "react-redux";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
import { useDispatch, useSelector } from "@/redux/store";
import appSlice from "@/reduxFeatures/app/appSlice";

const Follow = () => {
  const [users, setUsers] = useState([]);
  const user = useSelector(selectUser);
  const userMapper = useSelector(selectUser);
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

        document.getElementById(`followBtn-${id}`).style.display = "none";
      })();
    } catch (error) {
      // console.error("follow Error:", error);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/users`);
        // console.log(user);
        // console.log("User data:", data);

        let sliceNum = 0;
        if (window.innerHeight > 777) {
          sliceNum = 10;
        } else {
          sliceNum = 5;
        }

        await data.users.sort(function (newUser) {
          console.log("newUser:", newUser?._id);
          return 0.5 - Math.random();
        });

        setUsers(
          data.users
            .filter((person) => {
              return (
                // !person.followers.includes(user._id) ||
                person._id.toString() !== user._id.toString()
              );
            })
            // .slice(0, 10)
            .slice(0, sliceNum)
        );
      } catch (error) {
        console.log(error.response?.data);
      }
    })();
  }, [window.innerHeight]);
  return (
    <ListGroup
      className="container p-0 p-xl-2 radius-10 shadow"
      as={Card}
      variant="flush"
      style={{
        border: "none",
        width: "100%",
        height: "max-content",
      }}
    >
      <h6 className="text-center">Suggested connections</h6>

      {/* <> */}
      {/* {console.log("users:::", users)} */}
      {users.map((user, key) => (
        <div
          className="row align-items-center justify-content-center border-0"
          key={`author-${key}`}
        >
          <ListGroup.Item
            // key={`author-${key}`}
            // style={{ boxSizing: "border-box" }}
            className="d-flex align-items-center gap-1 w-100 justify-content-between border-0 bg-transparent"
          >
            {/* <div className="d-flex gap-2 py-1 align-items-center justify-content-center w-100"> */}
            <div className="col-xs-2">
              <Image
                width={35}
                height={35}
                src={`/images/friends${key + 1}.png`}
                roundedCircle
                alt={user?.firstName}
              />
            </div>

            <div className="col-xs-7">
              <small className="mt-1" style={{ width: "90%" }}>
                {user?.firstName} {user?.lastName.split(" ")[0]}
              </small>
            </div>

            <div className="col-xs-3 justify-content-end">
              <Button
                id={`followBtn-${user?._id}`}
                variant="outline-primary"
                size="sm"
                onClick={() => handleFollow(user?._id)}
              >
                {/* {console.log("user._id", user?._id)} */}
                {/* {user?._id === user?.following} */}
                {/* {user?._id} */}
                {/* {userMapper?.following?.map((obj) =>
                  obj?._id === user?._id ? (
                    <span>Followed</span>
                  ) : (
                    <span>Follow</span>
                  )
                )} */}
                {/* {userMapper?.following?.some((item) => {
                  // console.log("item?._id:", item?._id);
                  // console.log("user?._id:", user?._id);
                  item?._id === user?._id ? (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleFollow(user?._id)}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleFollow(user?._id)}
                    >
                      Follow
                    </Button>
                  );
                })} */}
                Follow
              </Button>
            </div>
          </ListGroup.Item>
          <hr style={{ width: "90%" }} />
        </div>
      ))}
      {/* </> */}
    </ListGroup>
  );
};

export default Follow;
