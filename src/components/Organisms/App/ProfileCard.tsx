import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Card,
  CardImg,
  Dropdown,
  DropdownButton,
  Image,
  Nav,
} from "react-bootstrap";
import About from "../../Templates/Profile/About";
import Bookmarks from "../../Templates/Profile/Bookmarks";
import Articles from "../../Templates/Profile/Articles";
import Media from "../../Templates/Profile/Media";
import Timeline from "../../Templates/Profile/Timeline";
import { useSelector } from "@/redux/store";
import { selectUser, user } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import Friends from "../../Templates/Profile/Friends";

interface IComponents {
  about: ReactNode;
  timeline: ReactNode;
  bookmarks: ReactNode;
  media: ReactNode;
  articles: ReactNode;
  connections: ReactNode;
}

const ProfileCard = ({
  handlePath,
  active,
}: {
  active: string;
  handlePath: (path: string) => void;
}) => {
  // const {data} = useSelector(s=>s.user)

  const data = useSelector(selectUser);
  // console.log(data);

  const Components: IComponents = {
    timeline: <Timeline Posts={[]} />,
    about: <About />,
    media: <Media />,
    articles: <Articles />,
    bookmarks: <Bookmarks />,
    connections: <Friends user={user} />,
  };
  return (
    <Card className="mt-2 mb-3">
      <CardImg src="/images/formbg.png" className="image3" />
      <Card.Body className="d-flex position-relative justify-content-center align-items-center flex-column ">
        <Image
          width={130}
          height={130}
          src={data?.avatar?.url || "/images/formbg.png"}
          alt="avatar"
          className="top-0 position-absolute"
          style={{
            transform: "translateY(-70%)",
            border: "2px solid black",
          }}
          roundedCircle
        />
        <div className=" mt-4 bold text-center fs-7">
          {data?.firstName} {data?.lastName}
        </div>
        <div className="text-muting">@{data?.username || data?.firstName}</div>
        <div className="text-muted text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          illum quasi voluptatem explicabo, tempore enim!
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ width: "60%" }}
        >
          <DropdownButton
            variant="light"
            title={
              <div className="d-flex flex-column align-items-center">
                <span>{data.followers?.length}</span>
                <span>followers</span>
              </div>
            }
          >
            {data.followers.map((item: Record<string, any>) => (
              <Link href={`/profile/${item._id}`} passHref>
                <Dropdown.Item key={item._id}>
                  <Image
                    src={item?.avatar?.url || "/images/imagePlaceholder.jpg"}
                    alt=""
                    roundedCircle
                    width={15}
                    height={15}
                  />
                  <span>
                    {item.firstName} {item.lastName}
                  </span>
                </Dropdown.Item>
              </Link>
            ))}
          </DropdownButton>
          <DropdownButton
            variant="light"
            title={
              <div className="d-flex flex-column align-items-center">
                <span>{data.following?.length}</span>
                <span>following</span>
              </div>
            }
          >
            {data.following.map((item: Record<string, any>) => (
              <Link href={`/profile/${item._id}`} passHref>
                <Dropdown.Item key={item._id}>
                  <Image
                    src={item?.avatar?.url || "/images/imagePlaceholder.jpg"}
                    alt=""
                    roundedCircle
                    width={15}
                    height={15}
                  />
                  <span>
                    {item.firstName} {item.lastName}
                  </span>
                </Dropdown.Item>
              </Link>
            ))}
          </DropdownButton>
        </div>
      </Card.Body>
      <Card.Footer>
        {" "}
        <Nav className="d-flex justify-content-around  text-capitalize">
          {Object.keys(Components).map((item, index) => (
            <Nav.Item
              key={item}
              onClick={() => handlePath(item.toLowerCase())}
              className={item === active ? "text-primary" : "text-secondary"}
            >
              {item}
            </Nav.Item>
          ))}
        </Nav>
      </Card.Footer>
    </Card>
  );
};

export default ProfileCard;
