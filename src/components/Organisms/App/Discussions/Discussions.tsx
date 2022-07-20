import config from "@/config";
import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";

const Discussions = ({ posts }: any) => {
  const [gists, setGists] = useState<Record<string, any>[]>();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${config.serverUrl}/api/gists`);
      setGists(data);
    })();
  }, []);

  const sanitizer = DOMPurify.sanitize;
  return (
    <Card
      // style={{ border: "none", overflowY: "scroll", height: "450px" }}
      style={{ border: "none", overflowY: "scroll", height: "40%" }}
      className="pb-5 mb-4 mt-4"
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
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(post.postTitle),
                  }}
                />
                <small className="text-muted">
                  By {`${post.author?.firstName} ${post.author?.lastName}`}
                </small>
              </div>
            </div>
          ))}
      </Card.Body>
    </Card>
  );
};

export default Discussions;
