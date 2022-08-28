/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import config from "@/config";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectUser,
  user as authUser,
  setFollowing,
  selectFollowing,
} from "@/reduxFeatures/authState/authStateSlice";
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
import { BsXCircleFill } from "react-icons/bs";
import {
  RiUserFollowFill,
  RiMessage2Fill,
  RiMessage2Line,
} from "react-icons/ri";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";

import styles from "@/styles/profile.module.scss";
import { datacatalog } from "googleapis/build/src/apis/datacatalog";
import Avatar from "@/components/Atoms/Avatar";

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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const following = useSelector(selectFollowing);

  const [profile, setProfile] = useState<Record<string, any>>({});
  const [followStatus, setFollowStatus] = useState(false);

  useEffect(() => {
    // Compile following Array
    if (user) {
      const currentlyFollowing = user.following.map((follow) => {
        return follow._id;
      });
      // const currentFollowers = user.followers.map((follow) => {
      //   return follow._id;
      // });

      // dispatch(setFollowers(currentFollowers));
      dispatch(setFollowing(currentlyFollowing));
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (following) {
      if (following.includes(id)) {
        setFollowStatus(true);
      } else {
        setFollowStatus(false);
      }
    }
  }, [following, id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.serverUrl}/api/users/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setProfile(response.data);
      console.log("setProfile:", response.data);
    } catch (error) {
      router.back();
      // console.log(error.response?.data);
    }
  };

  const handleFollow = async (id) => {
    // Preset Following
    setFollowStatus(true);
    try {
      await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      // Update Auth User State
      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          dispatch(authUser(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      // Reverse Following
      setFollowStatus(false);
      // console.error("follow Error:", error);
    }
  };

  const handleUnFollow = async (id) => {
    // Preset Un-Following
    setFollowStatus(false);
    try {
      await deleteSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      // Update Auth User State
      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          dispatch(authUser(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      // Reverse Un-Following
      setFollowStatus(true);
      // console.error("follow Error:", error);
    }
  };

  const followStatusFunc = () => {
    if (followStatus) {
      // Already following user. UnFollow Now...
      handleUnFollow(id);
    } else {
      // Not following user. Follow Now...
      handleFollow(id);
    }
  };

  return (
    <>
      <Card className="mt-2 mb-3">
        <CardImg
          src={profile?.images?.cover || "/images/formbg.png"}
          className="image3"
        />
        <Card.Body className="d-flex position-relative justify-content-center align-items-center flex-column ">
          <div className="position-absolute top-0">
            <Avatar
              src={profile?.images?.avatar}
              name={profile.firstName}
              width={130}
              height={130}
            />
          </div>
          <div className=" mt-4 bold text-center fs-7">
            {profile?.firstName} {profile?.lastName}
          </div>
          <div className="text-muting">
            @{profile.username || profile?.firstName}
          </div>

          {/* Don't Display Below Option For Logged-in Users */}
          {profile?._id !== user?._id && (
            <div className="container">
              <div className="row justify-content-center mx-auto">
                <div
                  className="col-5 col-sm-3 col-lg-2 btn btn-sm btn-outline-primary mx-1 p-0"
                  onClick={followStatusFunc}
                  // style={{ cursor: "pointer" }}
                >
                  {followStatus === true ? (
                    <>
                      <BsXCircleFill className={styles.mouseOverBtn} />{" "}
                      <span>Unfollow</span>
                    </>
                  ) : (
                    <>
                      <RiUserFollowFill className={styles.mouseOverBtn} />{" "}
                      <span>Follow</span>
                    </>
                  )}
                </div>
                <Link href={`/chat?active=${profile?._id}`}>
                  <div className="col-5 col-sm-3 col-lg-2 btn btn-sm btn-outline-primary mx-1 p-0">
                    <RiMessage2Fill className={styles.mouseOverBtn} />{" "}
                    <span> message</span>
                  </div>
                </Link>
              </div>
            </div>
          )}

          <div className="text-muted text-center">
            {profile?.bio ||
              " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapienteillum quasi voluptatem explicabo, tempore enim!"}
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
                <div key={item._id}>
                  <Link href={`/profile/${item._id}`} passHref>
                    <Dropdown.Item key={item._id}>
                      <Image
                        src={
                          item?.avatar?.url || "/images/imagePlaceholder.jpg"
                        }
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
                </div>
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
                <div key={item._id}>
                  <Link href={`/profile/${item._id}`} passHref>
                    <Dropdown.Item key={item._id}>
                      <Image
                        src={
                          item?.avatar?.url || "/images/imagePlaceholder.jpg"
                        }
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
                </div>
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
