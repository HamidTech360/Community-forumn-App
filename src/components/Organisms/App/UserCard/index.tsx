import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import { useSelector } from "@/redux/store";

// const UserCard = ({ user }: { user: Record<string, any> }) => {
// const UserCard = ({ data }: { data: Record<string, any> }) => {
const UserCard = () => {
  const data = useSelector(selectUser);

  useEffect(() => {
    console.log("data Changed...");
  }, [data]);
  return (
    <Card
      // className="bg-white radius-10 p-3 user-card position-relative shadow"
      className="bg-white radius-10 p-3 user-card position-relative"
      // style={{ border: "none", height: "200px" }}
      style={{ height: "240px" }}
      // style={{ border: "none", height: "34%" }}
    >
      <div
        className="d-flex justify-content-center  "
        style={{ transform: "translateY(-60%)" }}
      >
        <Image
          className="user-img"
          // src={data?.avatar?.url || "/images/formbg.png"}
          // src={user?.images?.avatar || "/images/formbg.png"}
          src={data?.images?.avatar || "/images/formbg.png"}
          alt=""
          width={70}
          height={70}
          roundedCircle
        />
      </div>

      <p className="text-center bold" style={{ marginTop: "-2rem" }}>
        {/* {user?.firstName}&nbsp; {user?.lastName} */}
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
        className="text-center mt-2"
        style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}
      >
        <Link href={`/profile`}>View Profile</Link>
      </Button>
    </Card>
  );
};

export default UserCard;
