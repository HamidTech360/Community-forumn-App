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
import truncate from "truncate-html";
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
import { setShowGistModal, uploadSuccess } from "@/reduxFeatures/api/gistSlice";
import axios from "axios";
// import ChangeFollowingStatus from "../../../Organisms/App/ChangeFollowingStatus";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
import { setFollowed, selectFollowed } from "@/reduxFeatures/app/appSlice";
import PostIsEdited from "@/components/Templates/PostIsEdited";
import { PostMenu } from "../../App/PostMenu";

import Avatar from "@/components/Atoms/Avatar";

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
  console.log(gist);
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
    // console.log("router.query.id:", router.query.id);
    // console.log("gist_id:", gist._id);
    try {
      // Delete while on /gist or /gist/:id
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
      // Auto update & Rerender Groups Post
      dispatch(uploadSuccess({ postEdited: Math.random() * 50 }));
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
          <div className="d-flex g-2">
            <div>
              <Avatar
                src={gist?.author?.images?.avatar}
                name={gist?.author?.firstName}
              />
            </div>

            <div className="d-flex flex-column justify-content-center me-auto">
              <small
                className={`${styles.title} text-secondary text-capitalize `}
                onClick={redirectPage}
                style={{ cursor: "pointer", fontSize: "14px" }}
              >
                Started by: {gist?.author?.firstName} {gist?.author?.lastName}
              </small>
              <div>
                <h5 className={`text-primary mt-1 ${styles.title}`}>
                  {gist?.title?.replace("&amp;", "&")}
                </h5>
              </div>
            </div>

            <div className=" ms-auto p-0">
              {/* Menu Dots */}
              <PostMenu
                user={user}
                currentlyFollowing={currentlyFollowing}
                post={gist}
                handleEditPost={handleEditPost}
                handleDeletePost={handleDeletePost}
                changeFollowingStatus={changeFollowingStatus}
              />
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
                  trimmed ? truncate(gist.post, 100) : truncate(gist.post)
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
    </div>
  );
};

export default GistCard;
