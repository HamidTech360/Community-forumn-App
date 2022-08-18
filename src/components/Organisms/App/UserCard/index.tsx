import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import { useSelector } from "@/redux/store";

const UserCard = () => {
  const data = useSelector(selectUser);

  useEffect(() => {
    console.log("data Changed...");
  }, [data]);
  return (
    <Card
      className="bg-white radius-10 pt-1 pb-2 px-2 user-card position-relative"
      style={{ height: "240px" }}
    >
      <div
        className="d-flex justify-content-center  "
        style={{ transform: "translateY(-60%)" }}
      >
        <Image
          className="user-img"
          src={data?.images?.avatar || "/images/formbg.png"}
          alt=""
          width={70}
          height={70}
          roundedCircle
        />
      </div>

      <p className="text-center bold" style={{ marginTop: "-2rem" }}>
        {data?.firstName}&nbsp; {data?.lastName}
      </p>
      <small
        className="text-center text-muted"
        style={{ marginTop: "-1.2rem", fontSize: "12px" }}
      >
        @{data?.username || data?.firstName}
      </small>
      <small
        className="row text-muted mx-auto mt-2 text-center"
        style={{ fontSize: "12px" }}
      >
        {data?.bio || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit perspiciatis.'}
      </small>
      <div
        className="d-flex justify-content-between"
        style={{ fontSize: "12px" }}
      >
        <div className="d-flex flex-column align-items-center">
          {/* <span>{user.following?.length}</span> */}
          <span>{data?.following?.length}</span>
          <small>following</small>
        </div>
        <div className="d-flex flex-column align-items-center ">
          {/* <span>{user.followers?.length}</span> */}
          <span>{data?.followers?.length}</span>
          <small>followers</small>
        </div>
      </div>
      <Button
        variant="light"
        className="text-center my-2"
        style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}
      >
        <Link href={`/profile`}>View Profile</Link>
      </Button>
    </Card>
  );
};

export default UserCard;
