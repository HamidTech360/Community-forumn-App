import Link from "next/link";
import React from "react";
import { Card, Image } from "react-bootstrap";

const UserCard = ({ user }: { user: Record<string, any> }) => {
  return (
    <Card
      className="bg-white radius-10 p-3 user-card position-relative"
      style={{ border: "none" }}
    >
      <div
        className="d-flex justify-content-center  "
        style={{ transform: "translateY(-60%)" }}
      >
        <Image
          className="user-img"
          src={user.avatar.url}
          alt=""
          width={70}
          height={70}
          roundedCircle
        />
      </div>

      <p className="text-center bold" style={{ marginTop: "-2rem" }}>
        {user.firstName}&nbsp; {user.lastName}
      </p>
      <p className="d-flex justify-content-between">
        <div className="d-flex flex-column align-items-center">
          <span>1000</span>
          <small>following</small>
        </div>
        <div className="d-flex flex-column align-items-center ">
          <span>1000</span>
          <small>followers</small>
        </div>
      </p>
      <p className="text-center text-primary">
        <Link href={`/profile/${user.databaseId}`}>View Profile</Link>
      </p>
    </Card>
  );
};

export default UserCard;
