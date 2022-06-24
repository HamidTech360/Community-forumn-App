import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";

const Discussions = ({ posts }: any) => {
  const [gists, setGists] = useState<Record<string, any>[]>();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REST}/buddyboss/v1/topics?_embed=user&order=desc&orderby=ID`
      );
      setGists(data);
      const userResponse = await axios.get("/api/user", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUsers(userResponse.data.users);
    })();
  }, []);
  return (
    <Card
      style={{ border: "none", overflowY: "scroll", height: "450px" }}
      className="pb-5 mb-4"
    >
      <Card.Header
        className="d-flex justify-content-between gap-2 align-items-center bg-white shadow-sm sticky-top"
        style={{ fontSize: "14px" }}
      >
        <span className="bold">Active discussions</span>
        <small className="text-bold text-primary">See more</small>
      </Card.Header>
      <Card.Body>
        {posts &&
          posts?.map((post) => (
            <div
              key={`discussion-${post._id}`}
              className="d-flex gap-3 mt-2 py-1 border-bottom"
            >
              <div>
                <Image
                  src={"/images/formbg.png"}
                  width={40}
                  height={40}
                  alt=""
                  roundedCircle
                />
              </div>
              <div className="d-flex flex-column">
                <small
                  className="bolden"
                  dangerouslySetInnerHTML={{ __html: post.postTitle }}
                />
                <small className="text-muted">
                  By {users.find((i) => post.userId == i._id)?.firstName}
                </small>
              </div>
            </div>
          ))}
      </Card.Body>
    </Card>
  );
};

export default Discussions;
