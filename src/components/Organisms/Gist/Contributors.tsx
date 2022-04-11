import Link from "next/link";
import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

const Contributors = ({
  contributors,
}: {
  contributors: { name: string; avatar: string }[];
}) => {
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
          &nbsp; <Link href={`/gist/contributors`}>See more</Link>
        </span>
      </Card.Title>
      {contributors?.map((item, key) => (
        <div className="d-flex align-items-center justify-content-start gap-2 m-2">
          <Image
            src={item?.avatar}
            fluid
            alt={item?.name}
            roundedCircle
            width={50}
            height={50}
          />

          <h6>{item?.name}</h6>
        </div>
      ))}
    </Card>
  );
};

export default Contributors;
