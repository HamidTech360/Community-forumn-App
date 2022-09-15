/* eslint-disable react-hooks/exhaustive-deps */
import config from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import {
  user as userAuth,
  selectUser,
  selectFollowing
} from "@/reduxFeatures/authState/authStateSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { useRouter } from "next/router";
import Avatar from "@/components/Atoms/Avatar";

const Follow = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector(selectUser);

  const currentlyFollowing = useSelector(selectFollowing);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${config.serverUrl}/api/users/connections/all`, {headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }
        );
        console.log("All connections+++++:", response.data);
        setConnections(response.data.connections)
      } catch (error) {
        console.log("ERROR:", error);
      }
    })();
  }, []);

  const handleFollow = async (id: string) => {
    try {
      const response = await axios.get(`${config.serverUrl}/api/users/${id}/follow`, {headers:{
        authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }});
      const remainingConnections = connections.filter(item=>item._id!=id)
      setConnections(remainingConnections);
      dispatch(userAuth(response.data.user));
    } catch (error) {
      // console.error("follow Error:", error);
    }
  };


  return (
    <ListGroup
      className="container-fluid p-0 p-xl-2 radius-10"
      as={Card}
      variant="flush"
      style={{
        width: "100%",
        height: "max-content"
      }}
    >
      <h6 className="text-center">Suggested connections</h6>

      {connections.map((user, key) => (
        <div className="row align-items-center border-0" key={`author-${key}`}>
          <ListGroup.Item
            className="d-flex align-items-center gap-0 gap-xl-2 gap-xxl-3 w-100 justify-content-start border-0 bg-transparent"
          >
            {/* <div className="d-flex gap-2 py-1 align-items-center justify-content-center w-100"> */}
            <div
              className="col-xs-2"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/profile/${user?._id}`)}
            >
              <Avatar
                width={35}
                height={35}
                src={user?.images?.avatar}
                name={user?.firstName}
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
