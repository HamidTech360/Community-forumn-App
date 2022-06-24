import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Image, ListGroup } from "react-bootstrap";

const Follow = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //alert('fetching');

    (async function () {
      try {
        const response = await axios.get(`/api/user`);
        console.log(response.data);
        setUsers(response.data.users.slice(0, 10));
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
        height: 520,
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

              <Button variant="outline-primary" size="sm">
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
