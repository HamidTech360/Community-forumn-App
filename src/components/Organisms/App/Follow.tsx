/* eslint-disable react-hooks/exhaustive-deps */
import config from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Image, ListGroup } from "react-bootstrap";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import { useSelector } from "react-redux";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { useDispatch } from "@/redux/store";
import appSlice from "@/reduxFeatures/app/appSlice";

const Follow = () => {
  const [users, setUsers] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleFollow = async (id: string) => {
    try {
      const data = await makeSecuredRequest(
        `${config.serverUrl}/api/users/${id}/follow`
      );
      console.log("follow:", data);
      // window.location.reload();
    } catch (error) {
      console.log("follow Error:", error);
    }
  };
  useEffect(() => {
    //alert('fetching');

    (async function () {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/users`);
        // console.log(user);
        // console.log("User data:", data);

        setUsers(
          data.users
            .filter((person) => {
              return (
                !person.followers.includes(user._id) &&
                person._id.toString() !== user._id.toString()
              );
            })
            .slice(0, 10)
        );
      } catch (error) {
        console.log(error.response?.data);
      }
    })();
  }, []);
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
                variant="outline-primary"
                size="sm"
                onClick={() => handleFollow(user._id)}
              >
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
