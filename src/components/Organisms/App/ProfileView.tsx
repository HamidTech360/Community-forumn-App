/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, ReactNode} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import config from '@/config'
import About from '@/components/Templates/Profile/About';
import Timeline from '@/components/Templates/Profile/Timeline';
import Friends from '@/components/Templates/Profile/Friends';
import Media from '@/components/Templates/Profile/Media';
import Bookmarks from '@/components/Templates/Profile/Bookmarks';
import { Card, CardImg, Image, Nav } from "react-bootstrap";


interface IComponents {
    about: ReactNode;
    timeline: ReactNode;
    bookmarks: ReactNode;
    media: ReactNode;
    friends: ReactNode;
  }
  const Components: IComponents = {
    timeline: <Timeline Posts={[]} />,
    about: <About />,
    media: <Media />,
    friends: <Friends />,
    bookmarks: <Bookmarks />,
  };

const ProfileView = ({
    handlePath,
    active,
  }: {
    active: string;
    handlePath: (path: string) => void;
  }) => {

    const router = useRouter();
    const [profile, setProfile] = useState<Record<string, any>>({});  

    const fetchData = async () => {
        try {
          const response = await axios.get(
            `${config.serverUrl}/api/users/${router.query.id}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          setProfile(response.data);
          console.log(response.data)
        } catch (error) {
          router.back();
          console.log(error.response?.data);
        }
      }
    
      useEffect(() => {
       fetchData();
      }, [])
  return (
    <>
        <Card className="mt-2 mb-3">
            <CardImg src="/images/formbg.png" className="image3" />
            <Card.Body className="d-flex position-relative justify-content-center align-items-center flex-column ">
                <Image
                width={130}
                height={130}
                src={profile?.avatar?.url || "/images/formbg.png"}
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
                <div className="d-flex flex-column align-items-center">
                    <span>{profile?.followers?.length}</span>
                    <span>following</span>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <span>{profile?.following?.length}</span>
                    <span>following</span>
                </div>
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
  )
}

export default ProfileView