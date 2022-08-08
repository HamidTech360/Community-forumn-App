/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import config from "@/config";
import About from "@/components/Templates/Profile/About";
import Timeline from "@/components/Templates/Profile/Timeline";
import Friends from "@/components/Templates/Profile/Articles";
import Media from "@/components/Templates/Profile/Media";
import Bookmarks from "@/components/Templates/Profile/Bookmarks";
import {
  Card,
  CardImg,
  Dropdown,
  DropdownButton,
  Image,
  Nav,
} from "react-bootstrap";
import Link from "next/link";

interface IComponents {
  about: ReactNode;
  timeline: ReactNode;

  media: ReactNode;

  connections: ReactNode;
}
const Components: IComponents = {
  timeline: <Timeline Posts={[]} />,
  about: <About />,
  media: <Media />,

  connections: <Friends />,
};

const ProfileView = ({
  handlePath,
  active,
}: {
  active: string;
  handlePath: (path: string) => void;
}) => {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState<Record<string, any>>({});

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.serverUrl}/api/users/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setProfile(response.data);
      // console.log(response.data);
    } catch (error) {
      router.back();
      // console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      <Card className="mt-2 mb-3">
        <CardImg src="/images/formbg.png" className="image3" />
        <Card.Body className="d-flex position-relative justify-content-center align-items-center flex-column ">
          <Image
            width={130}
            height={130}
            src={profile?.images?.avater || "/images/formbg.png"}
            alt="avatar"
            className="top-0 position-absolute"
            style={{
              transform: "translateY(-70%)",
              border: "2px solid black",
            }}
            roundedCircle
          />
          <div className=" mt-4 bold text-center fs-7">
            {profile?.firstName} {profile?.lastName}
          </div>
          <div className="text-muting">@{profile?.firstName}</div>
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
                  <span>{profile.followers?.length}</span>
                  <span>followers</span>
                </div>
              }
            >
              {profile?.followers?.map((item: Record<string, any>) => (
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
                  <span>{profile.following?.length}</span>
                  <span>following</span>
                </div>
              }
            >
              {profile?.following?.map((item: Record<string, any>) => (
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
    </>
  );
};

export default ProfileView;
