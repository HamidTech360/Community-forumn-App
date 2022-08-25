import { useSelector } from "@/redux/store";
import { selectTopContributors } from "@/reduxFeatures/api/gistSlice";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

const Contributors = ({ data }) => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const topContributors = useSelector(selectTopContributors);

  return (
    <Card className="p-3 mt-4">
      <Card.Title className="d-flex justify-content-between align-items-center">
        <span> Top Contributors</span>
        <span
          className="text-primary"
          style={{
            fontSize: "0.9rem",
          }}
        ></span>
      </Card.Title>
      {/* Author */}
      <div
        className="d-flex align-items-center justify-content-start gap-2 m-2"
        style={{ cursor: "pointer" }}
        onClick={() => router.push(`/profile/${data.author?._id}`)}
      >
        <Image
          src={user?.images?.avatar || "/images/imagePlaceholder.jpg"}
          fluid
          alt={user?.firstName}
          roundedCircle
          width={30}
          height={30}
        />

        <h6>{`${data?.author?.firstName} ${data?.author?.lastName}`} </h6>
      </div>

      {/* Top Contributors */}
      {topContributors?.map((contributor, key) => (
        <div key={key}>
          {contributor[0] !==
            `${data.author?.firstName} ${data.author?.lastName}` && (
            <div
              className="d-flex align-items-center justify-content-start gap-2 m-2"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/profile/${contributor[1].id}`)}
            >
              <>
                <Image
                  src={
                    contributor?.images?.avatar ||
                    "/images/imagePlaceholder.jpg"
                  }
                  fluid
                  alt={contributor?.firstName}
                  roundedCircle
                  width={30}
                  height={30}
                />
                <h6>{contributor[0]}</h6>
              </>
            </div>
          )}
        </div>
      ))}
    </Card>
  );
};

export default Contributors;
