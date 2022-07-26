import Link from "next/link";
import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

const Contributors = ({ contributors }: any) => {
  // console.log(contributors[0]);

  return (
    <Card className="p-3 mt-4" style={{ border: "none" }}>
      <Card.Title className="d-flex justify-content-between align-items-center">
        <span> Top Contributors</span>
        <span
          className="text-primary"
          style={{
            fontSize: "0.9rem",
          }}
        >
          {/* &nbsp; < href={`/gist/contributors`}>See more</> */}
        </span>
      </Card.Title>
      {contributors?.map((item, key) => (
        <div
          key={key}
          className="d-flex align-items-center justify-content-start gap-2 m-2"
        >
          <Image
            src={item?.avatar}
            fluid
            alt={item?.firstName}
            roundedCircle
            width={50}
            height={50}
          />

          <h6>{item?.firstName} </h6>
        </div>
      ))}
    </Card>
  );
};

export default Contributors;
