import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import config from "@/config";
import DOMPurify from "dompurify";
import truncate from "truncate-html";
import {
  selectFollowing,
  user as userAuth,
  selectUser,
  setFollowing
} from "@/reduxFeatures/authState/authStateSlice";
//import { DirectiveLocation } from "graphql";
import styles from "@/styles/gist.module.scss";
import { useDispatch, useSelector } from "@/redux/store";
import { setSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import { setShowGistModal, uploadSuccess } from "@/reduxFeatures/api/gistSlice";
import axios from "axios";
// import ChangeFollowingStatus from "../../../Organisms/App/ChangeFollowingStatus";
import makeSecuredRequest, {
  deleteSecuredRequest
} from "@/utils/makeSecuredRequest";
import PostIsEdited from "@/components/Templates/PostIsEdited";
import { PostMenu } from "../../App/PostMenu";

import Avatar from "@/components/Atoms/Avatar";
import MediaDisplay from "../../App/MediaMasonry";

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GistCard = ({ gist, primary, trimmed }: any) => {
  const sanitizer = DOMPurify.sanitize;
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const followed = useSelector(selectFollowed);

  const currentlyFollowing = useSelector(selectFollowing);

  // Update users following in AuthUser because it's a frontend resolved data
  useEffect(() => {
    if (user) {
      const currentlyFollowing = user.following.map(follow => {
        return follow._id;
      });
      dispatch(setFollowing(currentlyFollowing));
    }
  }, [dispatch, user]);

  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: gist?.author?._id
      }
    });
  };

  const handleDeletePost = async () => {
    // console.log("router.query.id:", router.query.id);
    // console.log("gist_id:", gist._id);
    try {
      // Delete while on /gist or /gist/:id
      await axios.delete(
        `${config.serverUrl}/api/gists/${
          router.query.id ? router.query.id : gist._id
        }`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
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

  const handleEditPost = async post => {
    // Notify Slate Editor Of Post Editing
    dispatch(setSlatePostToEdit(post));

    // console.log("post:", post);
    if (router?.pathname.includes("gist") || router.asPath === "/gist") {
      // Open Blog Post Modal
      dispatch(setShowGistModal(true));
    }
  };

  const changeFollowingStatus = post => {
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

  const handleFollow = async id => {
    // Preset following

    try {
      await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      // Update Auth User State
      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          });
          dispatch(userAuth(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {}
  };

  const handleUnFollow = async id => {
    try {
      await deleteSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          });
          dispatch(userAuth(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      // Revert on axios  failure
    }
  };

  return (
    <Card
      className="mt-4 p-3 w-100"
      style={{
        borderRadius: "10px"
      }}
    >
      <Card.Title className="d-flex">
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
        </div>
        <div className="ms-auto">
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
      </Card.Title>
      <Card.Body className="px-3 py-0 mt-3">
         {/* Display Feature Image */}
        <div className="row justify-content-center pb-4">
          <div className="col-12">
            <MediaDisplay media={gist.media} breakPoint={2} />
          </div>
        </div>

        {gist?.post && (
          <Card.Body
            dangerouslySetInnerHTML={{
              __html: sanitizer(
                trimmed ? truncate(gist.post, 100) : truncate(gist.post)
              )
            }}
            style={{
              marginTop: "-1rem",
              lineHeight: "1.3rem",
              whiteSpace: "pre-line"
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
  );
};

export default GistCard;
