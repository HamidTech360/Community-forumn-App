import React, { useEffect, useState } from "react";
import timeAge from "time-age";
import { useRouter } from "next/router";
import { Button, Card, Col, Row, Image, NavDropdown } from "react-bootstrap";
import { BsBookmarkDash, BsFolderFill, BsXCircleFill } from "react-icons/bs";
import Link from "next/link";
import Age from "../../../Atoms/Age";
import config from "@/config";
import striptags from "striptags";
import DOMPurify from "dompurify";
import {
  selectFollowing,
  user as userAuth,
  selectUser,
  setFollowers,
  setFollowing,
} from "@/reduxFeatures/authState/authStateSlice";
//import { DirectiveLocation } from "graphql";
import styles from "@/styles/gist.module.scss";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin5Line, RiFlagFill, RiUserFollowFill } from "react-icons/ri";
import { useDispatch, useSelector } from "@/redux/store";
import { setSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import { setShowGistModal } from "@/reduxFeatures/api/gistSlice";
import axios from "axios";
// import ChangeFollowingStatus from "../../../Organisms/App/ChangeFollowingStatus";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
import { setFollowed, selectFollowed } from "@/reduxFeatures/app/appSlice";
import PostIsEdited from "@/components/Templates/PostIsEdited";
// interface IGist {
//   gist: {
//     author: {
//       author?: string;
//       image?: string;
//     };
//     title: string;
//     date: string;
//     body: string;
//   };
// }
const GistCard = ({ gist, primary, trimmed }: any) => {
  // console.log(gist);
  const sanitizer = DOMPurify.sanitize;
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const followed = useSelector(selectFollowed);
  const [followed, setFollowed] = useState(false);
  const currentlyFollowing = useSelector(selectFollowing);

  // Update users following in AuthUser because it's a frontend resolved data
  useEffect(() => {
    if (user) {
      const currentlyFollowing = user.following.map((follow) => {
        return follow._id;
      });
      dispatch(setFollowing(currentlyFollowing));
    }
  }, [user]);

  // Set Following Status
  useEffect(() => {
    if (currentlyFollowing.includes(gist?.author?._id)) {
      setFollowed(true);
      // dispatch(setFollowed(true));
    } else {
      setFollowed(false);
      // dispatch(setFollowed(false));
    }
  }, [gist, currentlyFollowing]);

  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: gist?.author?._id,
      },
    });
  };

  const handleDeletePost = async () => {
    console.log("router.query.id:", router.query.id);
    console.log("gist_id:", gist._id);
    try {
      const { data } = await axios.delete(
        `${config.serverUrl}/api/gists/${
          router.query.id ? router.query.id : gist._id
        }`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (router.query.id) {
        // Go to the gist page when viewing an individual post
        router.push("/gist");
      }
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const handleEditPost = async (post) => {
    // Notify Slate Editor Of Post Editing
    dispatch(setSlatePostToEdit(post));

    // console.log("post:", post);
    if (router?.pathname.includes("gist") || router.asPath === "/gist") {
      // Open Blog Post Modal
      dispatch(setShowGistModal(true));
    }
  };

  const changeFollowingStatus = (post) => {
    if (
      document.getElementById(`followStr-${post?.author?._id}`).innerText ===
      "Follow"
    ) {
      handleFollow(post?.author?._id);
    } else if (
      document.getElementById(`followStr-${post?.author?._id}`).innerText ===
      "Unfollow"
    ) {
      handleUnFollow(post?.author?._id);
    }
  };

  const handleFollow = async (id) => {
    // Preset following
    setFollowed(true);
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
          dispatch(userAuth(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      // Revert on axios  failure
      setFollowed(false);
      // console.error("follow Error:", error);
    }
  };

  const handleUnFollow = async (id) => {
    // Preset following
    setFollowed(false);
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
          dispatch(userAuth(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      // Revert on axios  failure
      setFollowed(true);
      // console.error("follow Error:", error);
    }
  };

  return (
    <div className="container-fluid">
      <Card
        className="row mt-4 p-3 w-100"
        style={{
          borderRadius: "10px",
        }}
      >
        <Card.Title>
          <div className="row">
            <div className="col-2 pt-2 pt-md-3 align-items-center">
              <Image
                src={"/images/imagePlaceholder.jpg"}
                width={50}
                height={50}
                alt="Avatar"
                roundedCircle
                className={styles.img}
                onClick={redirectPage}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="col-7">
              <div className="row">
                <div className="col-9 col-sm-10 p-md-0">
                  <div className={` ${styles.div}`}>
                    <small
                      className={`${styles.title} text-secondary text-capitalize `}
                      onClick={redirectPage}
                      style={{ cursor: "pointer", fontSize: "14px" }}
                    >
                      Started by: {gist?.author?.firstName}{" "}
                      {gist?.author?.lastName}
                    </small>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 p-md-0">
                    <h5 className={`text-primary mt-1 ${styles.title}`}>
                      {gist?.title?.replace("&amp;", "&")}
                    </h5>
                  </div>
                  <div className="col-12 p-md-0">
                    <div className="ms-auto mb-2 text-muted">
                      <small
                        className={`d-flex text-center ${styles.time}`}
                        style={{ fontSize: "14px" }}
                      >
                        <Age time={gist?.createdAt} />{" "}
                        <BsBookmarkDash className="ms-2" />
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 col-sm-2 ms-auto p-0">
              <NavDropdown
                className="p-0"
                style={{ color: "white" }}
                drop="start"
                title={
                  <Button variant="link" size="sm">
                    <HiDotsVertical size={22} />
                  </Button>
                }
                // style={{ marginTop: "-1rem" }}
              >
                {gist?.author?._id === user?._id && (
                  <>
                    <NavDropdown.Item
                      className={styles.item}
                      style={{
                        borderBottom: "1px solid gray",
                      }}
                      onClick={() => handleEditPost(gist)}
                    >
                      <BsFolderFill /> Edit Post
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      style={{ borderBottom: "1px solid gray" }}
                      onClick={() => handleDeletePost()}
                    >
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        <RiDeleteBin5Line /> Delete Post
                      </span>
                    </NavDropdown.Item>
                  </>
                )}

                {gist?.author?._id !== user?._id && (
                  <>
                    <NavDropdown.Item
                      className={styles.item}
                      style={{ borderBottom: "1px solid gray" }}
                    >
                      <RiFlagFill /> Report post
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      className={styles.item}
                      style={{ borderBottom: "1px solid gray" }}
                      onClick={async () => changeFollowingStatus(gist)}
                      // onClick={async () => (
                      //   <ChangeFollowingStatus post={gist} />
                      // )}
                    >
                      {followed ? (
                        <>
                          <BsXCircleFill />{" "}
                          <span id={`followStr-${gist?.author?._id}`}>
                            Unfollow
                          </span>
                        </>
                      ) : (
                        <>
                          <RiUserFollowFill />{" "}
                          <span id={`followStr-${gist?.author?._id}`}>
                            Follow
                          </span>
                        </>
                      )}{" "}
                      @{gist?.author?.firstName?.split(" ")[0]}
                      {gist?.author?.lastName?.substring(0, 1)}
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </div>
          </div>
        </Card.Title>
        <Card.Body
          className="px-3 py-0 mt-3"
          // align="justify"
        >
          {gist?.post && (
            <Card.Body
              dangerouslySetInnerHTML={{
                __html: sanitizer(
                  trimmed
                    ? gist.post.slice(0, 300) || gist.post.slice(0, 300)
                    : gist.post || gist.post
                ),
              }}
              style={{
                marginTop: "-1rem",
                lineHeight: "1.3rem",
                whiteSpace: "pre-line",
              }}
            />
          )}

          <PostIsEdited post={gist} />

          {!primary && (
            <div className="d-flex justify-content-end mt-2">
              <Link href={`/gist/${gist?._id}`} passHref>
                <Button variant="primary">Join conversation</Button>
              </Link>
            </div>
          )}
        </Card.Body>
      </Card>
      {/* </div> */}
    </div>
  );
};

export default GistCard;
