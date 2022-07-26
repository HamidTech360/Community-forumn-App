import Link from "next/link";
import React from "react";
import { Button, Card, Image } from "react-bootstrap";

const UserCard = ({ user }: { user: Record<string, any> }) => {
  return (
    <Card
      className="bg-white radius-10 p-3 user-card position-relative shadow"
      // style={{ border: "none", height: "200px" }}
      style={{ border: "none", height: "240px" }}
      // style={{ border: "none", height: "34%" }}
    >
      <div
        className="d-flex justify-content-center  "
        style={{ transform: "translateY(-60%)" }}
      >
        <Image
          className="user-img"
          src={user?.images?.avatar || "/images/formbg.png"}
          alt=""
          width={70}
          height={70}
          roundedCircle
        />
      </div>

      <p className="text-center bold" style={{ marginTop: "-2rem" }}>
        {user?.firstName}&nbsp; {user?.lastName}
      </p>
      <small
        className="text-center text-muted"
        style={{ marginTop: "-1.2rem", fontSize: "12px" }}
      >
        @{user?.firstName}
        {(user?.lastName).substring(0, 1)}
      </small>
      <small
        className="row text-muted mx-auto mt-2 text-center"
        style={{ fontSize: "12px" }}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
        perspiciatis.
      </small>
      <div
        className="d-flex justify-content-between"
        style={{ fontSize: "12px" }}
      >
        <div className="d-flex flex-column align-items-center">
          <span>{user.following?.length}</span>
          <small>following</small>
        </div>
        <div className="d-flex flex-column align-items-center ">
          <span>{user.followers?.length}</span>
          <small>followers</small>
        </div>
      </div>
      <Button variant="light" className="text-center mt-2">
        <Link href={`/profile`}>View Profile</Link>
      </Button>
    </Card>
  );
};

export default UserCard;
