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
        `${config.serverUrl}/api/user/${id}/follow`
      );
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //alert('fetching');

    (async function () {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/user`);
        console.log(user);

        setUsers(
          data
            .filter((person) => {
              return (
                !person.followers.includes(user._id) &&
                person._id.toString() !== user._id.toString()
              );
            })
            .slice(0, 10)
        );
      } catch (error) {
        console.log(error.ressponse?.data);
      }
    })();
  }, []);
  return (
    <ListGroup
      className="p-2 radius-10"
      as={Card}
      variant="flush"
      style={{
        border: "none",
        width: "100%",
        height: "max-content",
      }}
    >
      <h6 className="text-center">Suggested connections</h6>

      <>
        {users.map((user, key) => (
          <ListGroup.Item key={`author-${key}`}>
            <div className="d-flex gap-2 py-1 align-items-center justify-content-center w-100">
              <Image
                width={30}
                height={30}
                src={`/images/friends${key + 1}.png`}
                roundedCircle
                alt={user?.firstName}
              />

              <small className="mt-1" style={{ width: "70%" }}>
                {user?.firstName} {user?.lastName.split(" ")[0]}
              </small>

              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleFollow(user._id)}
              >
                Follow
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </>
    </ListGroup>
  );
};

export default Follow;
