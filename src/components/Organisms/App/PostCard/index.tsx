/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

import { useModalWithData, useModalWithShare } from "@/hooks/useModalWithData";
// import ModalCard from "@/components/Organisms/App/ModalCard";
import truncate from "truncate-html";
import "react-toastify/dist/ReactToastify.css";

import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import Age from "../../../Atoms/Age";
import DOMPurify from "dompurify";
import styles from "@/styles/profile.module.scss";
import axios from "axios";
import config from "@/config";

import { useDispatch, useSelector } from "@/redux/store";

import {
  user as userAuth,
  selectUser,
  setFollowing,
  selectFollowing
} from "@/reduxFeatures/authState/authStateSlice";
import {
  setLikeChangedModal,
  selectLikeChangedModal,
  setUnLikeChangedModal,
  selectUnLikeChangedModal
} from "@/reduxFeatures/app/postModalCardSlice";
import { selectNewFeed } from "@/reduxFeatures/api/feedSlice";

import { selectImageModalOpen } from "@/reduxFeatures/app/postModalCardSlice";
import ImageModal from "../ModalPopUp/ImageModal";
// import { setFollowed, selectFollowed } from "@/reduxFeatures/app/appSlice";

import { useRouter } from "next/router";
import makeSecuredRequest, {
  deleteSecuredRequest
} from "@/utils/makeSecuredRequest";
import likes from "@/utils/like";
import PostIsEdited from "@/components/Templates/PostIsEdited";
import { FeedPostEditorModal_Modal } from "../ModalPopUp/FeedPostEditorModal";
import OpenShareModal from "../ModalPopUp/OpenShareModal";
import PostCardMenu from "../PostMenu";

import Avatar from "@/components/Atoms/Avatar";

import MediaDisplay from "../MediaMasonry";
// import { follow, unFollow } from "../followAndUnFollow";

const PostCard = ({
  post,
  trimmed,
  handleDeletePost,
  handleEditPost,
  mutate
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const likeChangedModal = useSelector(selectLikeChangedModal);
  const unLikeChangedModal = useSelector(selectUnLikeChangedModal);
  const newFeed = useSelector(selectNewFeed);

  const router = useRouter();
  const [followed, setFollowed] = useState(false);

  const [postReFetched, setPostComingIn] = useState(undefined);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookMarked] = useState(false);

  const sanitizer = DOMPurify.sanitize;

  // - comment section

  const [seeMore, setSeeMore] = useState(false);
  const [postLength, setPostLength] = useState(0);
  const [truncateLength] = useState(500);

  const currentlyFollowing = useSelector(selectFollowing);
  const imageModalOpen = useSelector(selectImageModalOpen);

  // modal
  const { modalOpen, toggle, selected, setSelected } = useModalWithData();
  const { modalOpenShare, toggleShare, selectedShare, setSelectedShare } =
    useModalWithShare();

   

  useEffect(() => {
    if (post) {
      const postType = post?.post ? post?.post : post?.postBody;
      const postTypeLength = sanitizer(
        truncate(postType, truncateLength, { stripTags: true })
      ).length;

      if (postTypeLength > truncateLength) {
        setSeeMore(true);
      } else {
        setSeeMore(false);
      }

      setPostLength(postTypeLength);
    }
  }, [post]);

  // Update users following in AuthUser because it's a frontend resolved data
  useEffect(() => {
    if (user) {
      const currentlyFollowing = user.following.map(follow => {
        return follow._id;
      });
      dispatch(setFollowing(currentlyFollowing));
    }
  }, [user]);

  // Set Following Status
  useEffect(() => {
    if (currentlyFollowing.includes(post?.author?._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [post, currentlyFollowing]);

  // Monitor Likes In ModalCard & Let It Reflect In PastCard
  useEffect(() => {
    if (!modalOpen && likeChangedModal.length > 0) {
      if (likeChangedModal.includes(post?._id)) {
        // Refetch Specific Post So as to get updated like count The false argument is for iit not to sent an axios argument.
        (async () => await likeIt(false))();
      }
    }

    if (!modalOpen && unLikeChangedModal.length > 0) {
      if (unLikeChangedModal.includes(post?._id)) {
        // Refetch Specific Post So as to get updated like count. The false argument is for iit not to sent an axios argument.
        (async () => await unLikeIt(false))();
      }
    }

    // Clear Redux State On componentWillUnMount
    return () => {
      dispatch(setLikeChangedModal(""));
      dispatch(setUnLikeChangedModal(""));
      // dispatch(setBookMarkChangedModal(""));
    };
  }, [modalOpen]);

  /* Don't Integrate with below useEffect. Leave them apart.
   ** This fixes the bug  of displaying colored icon for both like & bookmark (on making new post) once there was a previous like or bookmark click.
   */
  useEffect(() => {
    if (post?.likes?.includes(user?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    if (user?.bookmarks?.includes(post?._id)) {
      setBookMarked(true);
    } else {
      setBookMarked(false);
    }
  }, [post, newFeed]);

  // Don't Integrate with above useEffect. Leave them apart.
  useEffect(() => {
    if (user?.bookmarks?.includes(post?._id)) {
      setBookMarked(true);
    } else {
      setBookMarked(false);
    }
  }, [user]);

  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: post?.author?._id
      }
    });
  };

  const postButton = [
    {
      name: "Like",
      reaction: true,
      icon: liked ? (
        <AiFillLike color="#086a6d " size={25} onClick={() => handleUnLike()} />
      ) : (
        <AiOutlineLike size={25} onClick={() => handleLike()} />
      )
    },
    {
      name: "Share",
      reaction: true,
      icon: <AiOutlineShareAlt size={25} />
    },
    {
      name: "Comment",
      reaction: true,
      icon: (
        <FaRegCommentDots
          size={24}
          onClick={async () => {
            if (postReFetched) {
              if (postReFetched?._id === post?._id) {
                setSelected(postReFetched);
                toggle();
              } else {
                setSelected(post);
                toggle();
              }
            } else {
              setSelected(post);
              toggle();
            }
          }}
        />
      )
    },
    {
      name: "Bookmark",
      reaction: true,
      icon: bookmarked ? (
        <BsFillBookmarkFill
          color="#086a6d "
          onClick={() => removeBookMark()}
          size={22}
        />
      ) : (
        <BsBookmark onClick={() => handleBookMark()} size={22} />
      )
    }
  ];

  const handleLike = async () => {
    await likeIt(true);
  };

  const handleUnLike = async () => {
    await unLikeIt(true);
  };

  const likeIt = async bool => {
    // Pre-Set Like State B4 Axios
    const currentPostState = postReFetched
      ? JSON.parse(JSON.stringify(postReFetched))
      : JSON.parse(JSON.stringify(post));

    const newPostState = { ...currentPostState };
    if (!newPostState?.likes.includes(user?._id)) {
      newPostState.likes.push(user?._id);
    }
    setPostComingIn(newPostState);
    setLiked(true);

    // Axios Like Post

    if (bool) {
      try {
        await axios.get(
          `${config.serverUrl}/api/likes/?type=${"feed"}&id=${post?._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }
        );
      } catch (error) {
        // Reverse Like State Because of Axios Error
        let filterNewPostState = newPostState?.likes;
        if (newPostState?.likes.includes(user?._id)) {
          filterNewPostState = newPostState?.likes.filter(person => {
            return person !== user?._id;
          });
        }
        newPostState.likes = filterNewPostState;
        setPostComingIn(newPostState);
        setLiked(false);
      }
    }
  };

  const unLikeIt = async bool => {
    // Pre-Set Unlike State B4 Axios
    const currentPostState = postReFetched
      ? JSON.parse(JSON.stringify(postReFetched))
      : JSON.parse(JSON.stringify(post));

    const newPostState = { ...currentPostState };
    let filterNewPostState = newPostState?.likes;
    if (newPostState?.likes.includes(user?._id)) {
      filterNewPostState = newPostState?.likes.filter(person => {
        return person !== user?._id;
      });
    }
    newPostState.likes = filterNewPostState;

    setPostComingIn(newPostState);
    setLiked(false);

    if (bool) {
      // Like Post
      try {
        await axios.delete(
          `${config.serverUrl}/api/likes/?type=${"feed"}&id=${post?._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }
        );
      } catch (error) {
        // Reverse Like Because of Axios Error
        const newPostState = { ...currentPostState };
        if (!newPostState?.likes.includes(user?._id)) {
          newPostState.likes.push(user?._id);
        }

        setPostComingIn(newPostState);
        setLiked(true);
      }
    }
  };

  const handleBookMark = async () => {
    /* Pre-Bookmark Post.
     ** This would Auto-Sync Bookmark on both PastCard & ModalCard
     */

    const newBookmarks = [...user?.bookmarks, post?._id];
    dispatch(userAuth({ ...user, bookmarks: newBookmarks }));

    // Axios Bookmark Post
    try {
      await axios.post(
        `${config.serverUrl}/api/bookmarks/?id=${post._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
    } catch (error) {
      const fitterStateUser = user?.bookmarks.filter(filterUser => {
        return filterUser !== post?._id;
      });

      // Reverse Bookmark State
      dispatch(userAuth({ ...user, bookmarks: fitterStateUser }));
    }
  };

  const removeBookMark = async () => {
    /* Pre Remove BookMarked Post.
     ** This would Auto-Sync Bookmark on both PastCard & ModalCard
     */

    const fitterStateUser = user?.bookmarks.filter(filterUser => {
      return filterUser !== post?._id;
    });
    dispatch(userAuth({ ...user, bookmarks: fitterStateUser }));

    // Axios Remove BookMarked Post
    try {
      await axios.delete(`${config.serverUrl}/api/bookmarks/?id=${post._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
    } catch (error) {
      // Reverse Bookmark Auth User State.
      const reverseBookmarks = [...user?.bookmarks, post?._id];
      dispatch(userAuth({ ...user, bookmarks: reverseBookmarks }));
    }
  };

  const changeFollowingStatus = post => {
    console.log("post:", post);
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
    setFollowed(true);
    try {
      await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

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
      setFollowed(false);
    }
  };

  const handleUnFollow = async id => {
    setFollowed(false);
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
      setFollowed(true);
    }
  };

  return (
    <>
      <Card
        id={post?.id}
        className="container-fluid my-3 cards w-100"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.125)",
          width: "100%"
        }}
      >
        <Card.Title className={`border-bottom ${styles.title}`}>
          <div className="d-flex align-items-center justify-content-start gap-2">
            <Avatar
              src={post?.author?.images?.avatar}
              name={post?.author?.firstName}
            />

            <div className={styles.div}>
              <span
                style={{
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "var(--bs-primary)"
                }}
                onClick={redirectPage}
                dangerouslySetInnerHTML={{
                  __html: sanitizer(
                    `${post?.author?.firstName} ${post?.author?.lastName}`
                  )
                }}
              />
              <br />
              <small
                style={{
                  marginTop: "10px",
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  color: "gray"
                }}
              >
                <Age time={post?.createdAt} />
              </small>
            </div>

            <div className="ms-auto" style={{ marginTop: "-.8rem" }}>
              <PostCardMenu
                user={user}
                post={post}
                followed={followed}
                changeFollowingStatus={changeFollowingStatus}
                postReFetched={postReFetched}
                setSelected={setSelected}
                toggle={toggle}
                handleEditPost={handleEditPost}
                handleDeletePost={handleDeletePost}
              />
            </div>
          </div>
        </Card.Title>

        <Card.Body
          style={{
            // Only Display Cursor Pointer When postLength Is Greater Than truncateLength
            cursor: postLength > truncateLength && "pointer"
          }}
          onClick={async () => {
            // Only Toggle If Post Is Greater Than truncateLength
            if (postLength > truncateLength) {
              setSeeMore(!seeMore);
            }
          }}
        >
          <div>
            {post && Object.keys(post).length !== 0 && (
              <>
                <div className="d-flex flex-column">
                  <div
                    className="post-content"
                    dangerouslySetInnerHTML={{
                      __html: trimmed
                        ? sanitizer(
                            truncate(post?.postBody, seeMore && truncateLength)
                          ) ||
                          sanitizer(
                            truncate(post?.post, seeMore && truncateLength)
                          )
                        : sanitizer(
                            truncate(post?.postBody, seeMore && truncateLength)
                          ) ||
                          sanitizer(
                            truncate(post?.post, seeMore && truncateLength)
                          )
                    }}
                  />
                  <PostIsEdited post={post} />
                </div>

                {/* Display Media */}
                {post?.media?.length > 0 && (
                  <MediaDisplay media={post.media} breakPoint={2} />
                )}

                {seeMore && postLength > truncateLength ? (
                  router.asPath === "/feed" ||
                  router?.pathname.includes("profile") ||
                  router?.pathname.includes("groups") ? (
                    <div>
                      <small
                        style={{
                          color: "gray",
                          fontSize: "11px",
                          position: "relative",
                          left: "42%"
                        }}
                      >
                        {" "}
                        See more...
                      </small>
                    </div>
                  ) : null
                ) : null}
              </>
            )}
          </div>
        </Card.Body>
        {post.likes.length > 0 && (
          <div className="text-muted d-flex align-items-center">
            <AiFillLike color="#086a6d" className="mx-2" />
            <span>{likes(post.likes)}</span>
          </div>
        )}

        <Card.Footer className="justify-content-between bg-white px-0">
          <div className="row">
            {postButton.map((item, key) => (
              <div className="col-3" key={key}>
                <Button
                  variant="none"
                  className="d-flex justify-content-center align-items-center"
                  onClick={() => {
                    if (item.name === "Like") {
                      if (liked) {
                        handleUnLike();
                      } else {
                        handleLike();
                      }
                    }

                    if (item.name === "Share") {
                      toggleShare();
                      setSelectedShare(post);
                    }
                    if (item.name === "Bookmark") {
                      if (bookmarked) {
                        removeBookMark();
                      } else {
                        handleBookMark();
                      }
                    }
                  }}
                >
                  {item.icon}
                  {item.name === "Like" && (
                    <span
                      style={{ marginLeft: "7px" }}
                      className="mx-2 text-secondary"
                    >
                      {postReFetched
                        ? postReFetched?._id === post?._id
                          ? postReFetched?.likes?.length || 0
                          : post?.likes?.length || 0
                        : post?.likes?.length || 0}
                    </span>
                  )}

                  {item.name === "Comment" && (
                    <>
                      <span
                        style={{ marginLeft: "7px" }}
                        className="mx-2 text-secondary"
                        onClick={async () => {
                          if (postReFetched) {
                            if (postReFetched?._id === post?._id) {
                              setSelected(postReFetched);
                              toggle();
                            } else {
                              setSelected(post);
                              toggle();
                            }
                          } else {
                            setSelected(post);
                            toggle();
                          }
                        }}
                      >
                        {post?.comments?.length || 0}
                      </span>
                      <span
                        className="d-none d-xl-block"
                        style={{ marginLeft: "7px" }}
                        onClick={async () => {
                          if (postReFetched) {
                            if (postReFetched?._id === post?._id) {
                              setSelected(postReFetched);
                              toggle();
                            } else {
                              setSelected(post);
                              toggle();
                            }
                          } else {
                            setSelected(post);
                            toggle();
                          }
                        }}
                      >
                        {item.name}
                      </span>
                    </>
                  )}

                  {item.name !== "Comment" && (
                    <span
                      className="d-none d-xl-block"
                      style={{ marginLeft: "7px" }}
                    >
                      {item.name}
                    </span>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Card.Footer>
      </Card>

      {/* // Open Feed Post Modal Body For Reading More */}
      {modalOpen && (
        <FeedPostEditorModal_Modal
          modalOpen={modalOpen}
          selected={selected}
          modalToggle={toggle}
          mutate={mutate}
        />
      )}

      {/* Open Social Media Modal */}
      {modalOpenShare && (
        <OpenShareModal
          modalOpenShare={modalOpenShare}
          toggleShare={toggleShare}
          selectedShare={selectedShare}
        />
      )}

      {/* Post Image Modal */}
      {imageModalOpen && <ImageModal />}
    </>
  );
};

export default PostCard;
