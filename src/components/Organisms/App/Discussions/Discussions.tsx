import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";

const Discussions = () => {
  const [gists, setGists] = useState<Record<string, any>[]>();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REST}/buddyboss/v1/topics?_embed=user&order=desc&orderby=ID`
      );
      setGists(data);
    })();
  }, []);
  return (
    <Card
      style={{ border: "none", overflowY: "scroll", height: "80vh" }}
      className="p-2 mb-4"
    >
      <Card.Header className="d-flex justify-content-between gap-2 align-items-center bg-white">
        <span className="bold">Active discussions</span>
        <small className="text-bold text-primary">See more</small>
      </Card.Header>
      <Card.Body>
        {gists &&
          gists?.map((gist) => (
            <div
              key={`discussion-${gist.id}`}
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
                  className="bold"
                  dangerouslySetInnerHTML={{ __html: gist.title.raw }}
                />
                <small className="text-muted">
                  By {gist._embedded.user[0].name}
                </small>
              </div>
            </div>
          ))}
      </Card.Body>
    </Card>
  );
};

export default Discussions;
