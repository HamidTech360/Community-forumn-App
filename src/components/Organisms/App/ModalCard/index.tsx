/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { setSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  user as userAuth,
  selectFollowing
} from "@/reduxFeatures/authState/authStateSlice";

import { FaRegCommentDots } from "react-icons/fa";
import Age from "../../../Atoms/Age";
import DOMPurify from "dompurify";
import styles from "@/styles/profile.module.scss";

import axios from "axios";
import config from "@/config";
import { useDispatch } from "react-redux";

import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import {
  setLikeChangedModal,
  selectLikeChangedModal,
  setUnLikeChangedModal,
  selectUnLikeChangedModal,
  selectModalCardPostEdited,
  setModalCardPostEdited,
  setShowCommentModal,
  setEditableComment,
  setCommentIsDeleted
} from "@/reduxFeatures/app/postModalCardSlice";
import { useRouter } from "next/router";
import Comment from "@/components/Organisms/App/Comment";
import makeSecuredRequest, {
  deleteSecuredRequest
} from "@/utils/makeSecuredRequest";
import { useModalWithShare } from "@/hooks/useModalWithData";
import likes from "@/utils/like";
import PostIsEdited from "@/components/Templates/PostIsEdited";
import {
  selectCreatePostModal,
  setShowCreatePostModal
} from "@/reduxFeatures/app/createPost";
import OpenShareModal from "../ModalPopUp/OpenShareModal";
import FeedPostEditorModal from "../ModalPopUp/FeedPostEditorModal";
import { PostMenu } from "../PostMenu";
import { selectImageModalOpen } from "@/reduxFeatures/app/postModalCardSlice";
import ImageModal from "../ModalPopUp/ImageModal";
import MediaDisplay from "../MediaMasonry";
import Avatar from "@/components/Atoms/Avatar";
import TextAreaWithMentions from "../../TextAreaWithMentions";
import {
  selectMentionedUsers,
  setMentionedUsers
} from "@/reduxFeatures/app/mentionsSlice";

const ModalCard = ({
  post: postComingIn,
  modalToggle,
  mutate,
  trimmed
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: Record<string, any>;
  modalToggle?: () => void;
  mutate?: () => void;
  trimmed?: boolean;
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [resetTextAreaValue, setResetTextAreaValue] = useState(0);
  const likeChangedModal = useSelector(selectLikeChangedModal);
  const unLikeChangedModal = useSelector(selectUnLikeChangedModal);
  const modalCardPostEdited = useSelector(selectModalCardPostEdited);
  const router = useRouter();

  const [post, setPostComingIn] = useState(postComingIn);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookMarked] = useState(false);
  const sanitizer = DOMPurify.sanitize;

  // - comment section
  const [commentPost, setCommentPost] = useState("");

  const [loading, setLoading] = useState(false);
  const currentlyFollowing = useSelector(selectFollowing);
  const showModal = useSelector(selectCreatePostModal);

  const { modalOpenShare, toggleShare, selectedShare, setSelectedShare } =
    useModalWithShare();

  const imageModalOpen = useSelector(selectImageModalOpen);
  const mentionedUsers = useSelector(selectMentionedUsers);

  useEffect(() => {
    // Update modalPost when post has been edited
    if (modalCardPostEdited) {
      setPostComingIn({ ...post, post: modalCardPostEdited });
    }

    return () => {
      dispatch(setModalCardPostEdited(null));
      // Reset Mentioned Users
      dispatch(setMentionedUsers([]));
    };
  }, [modalCardPostEdited]);

  useEffect(() => {
    if (JSON.stringify(post?.likes)?.includes(user?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post]);

  useEffect(() => {
    if (JSON.stringify(post?.likes)?.includes(user?._id)) {
      setLiked(true);
    }

    if (user?.bookmarks?.includes(post?._id)) {
      setBookMarked(true);
    } else {
      setBookMarked(false);
    }
  }, [user]);

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
      icon: <FaRegCommentDots size={24} />
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

  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: post?.author?._id
      }
    });
  };

  const handleLike = async () => {
    likeIt(true);
  };

  const handleUnLike = async () => {
    await unLikeIt(true);
  };

  const likeIt = async bool => {
    // Pre-Set Like State B4 Axios
    const currentPostState = { ...JSON.parse(JSON.stringify(post)) };

    // Copy Object Full Dept For manipulation
    const newPostState = { ...JSON.parse(JSON.stringify(currentPostState)) };
    if (!JSON.stringify(newPostState?.likes)?.includes(user?._id)) {
      newPostState.likes.push({
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName
      });
    }
    setPostComingIn(newPostState);
    setLiked(true);
    // Notify the PostCard of Changes in the ModalCard
    dispatch(setLikeChangedModal(post?._id));

    if (bool) {
      try {
        // Like Post
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
        setPostComingIn(currentPostState);
        setLiked(false);
        // REVERSE Notify the PostCard of Changes in the ModalCard
        if (likeChangedModal.includes(post?._id)) {
          // Trigger Rerender
          dispatch(setLikeChangedModal(""));
        }
        //  Main Render
        dispatch(setUnLikeChangedModal(post?._id));
      }
    }
  };

  const unLikeIt = async bool => {
    // Pre-Set Unlike State B4 Axios
    const currentPostState = { ...JSON.parse(JSON.stringify(post)) };

    // Copy Object Full Dept For manipulation
    const newPostState = { ...JSON.parse(JSON.stringify(currentPostState)) };
    let filterNewPostState = newPostState?.likes;
    if (JSON.stringify(newPostState?.likes)?.includes(user?._id)) {
      filterNewPostState = newPostState?.likes.filter(person => {
        return person?._id !== user?._id;
      });
    }
    newPostState.likes = filterNewPostState;

    setPostComingIn(newPostState);
    setLiked(false);
    // Notify the PostCard of Changes in the ModalCard
    if (!unLikeChangedModal.includes(post?._id)) {
      dispatch(setUnLikeChangedModal(post?._id));
    }

    if (bool) {
      // Axios Like Post
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
        setPostComingIn(currentPostState);
        setLiked(true);

        // REVERSE Notify the PostCard of Changes in the ModalCard
        if (unLikeChangedModal.includes(post?._id)) {
          // Trigger Rerender
          dispatch(setUnLikeChangedModal(""));
        }
        //  Main Render
        dispatch(setLikeChangedModal(post?._id));
        // console.error(error);
      }
    }
  };

  const postComment = async () => {
    /*
     ** Mentioned Users To Send Notification
     ** Below Map() Is Important To Confirm The Mentioned User Hasn't Been Deleted
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const usersToSendNotification: any = [];
    if (mentionedUsers.length > 0) {
      await mentionedUsers.forEach(user => {
        if (commentPost?.includes(user.userName)) {
          usersToSendNotification.push(user?.userId);
        }
      });
    }

    const body = {
      content: commentPost,
      mentions: usersToSendNotification
    };

    if (body.content == "") {
      return toast.error("Comment cannot be empty", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1"
      });
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${config.serverUrl}/api/comments?type=feed&id=${post?._id}`,
        body,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      const comments = post?.comments;
      comments?.unshift(res.data);
      setPostComingIn({ ...post, comments });
      setLoading(false);
      // Reset TextAreaWithMentions value
      setResetTextAreaValue(Math.random() * 10);
      // Reset Mentioned Users
      dispatch(setMentionedUsers([]));
    } catch (error) {
      // console.error(error);
    }
  };

  const handleBookMark = async () => {
    /* Pre-Bookmark Post.
     ** This would Auto-Sync Bookmark on both PastCard & ModalCard
     */

    // if (!user?.bookmarks?.includes(post?._id)) {
    const newBookmarks = [...user?.bookmarks, post?._id];
    dispatch(userAuth({ ...user, bookmarks: newBookmarks }));
    // }

    // Axios Bookmark Post
    try {
      await axios.post(
        `${config.serverUrl}/api/bookmarks/?id=${post?._id}`,
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
      await axios.delete(`${config.serverUrl}/api/bookmarks/?id=${post?._id}`, {
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
    if (
      document.getElementById(`followStr-modal-${post?.author?._id}`)
        .innerText === "Follow"
    ) {
      handleFollow(post?.author?._id);
    } else if (
      document.getElementById(`followStr-modal-${post?.author?._id}`)
        .innerText === "Unfollow"
    ) {
      handleUnFollow(post?.author?._id);
    }
  };

  const handleFollow = async id => {
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
    } catch (error) {
      // console.error("follow Error:", error);
    }
  };

  const handleUnFollow = async id => {
    try {
      await deleteSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

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
    } catch (error) {
      // console.error("follow Error:", error);
    }
  };

  const handleDeletePost = async post => {
    try {
      await axios.delete(`${config.serverUrl}/api/feed?id=${post._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      // Close Modal
      modalToggle();
      // Re-render Update Post From SWR
      mutate();
    } catch (error) {
      // console.log(error.response?.data);
    }
  };

  const handleEditPost = async post => {
    // Notify Slate Editor Of Post Editing
    dispatch(setSlatePostToEdit(post));
    dispatch(setShowCreatePostModal(true));
  };

  const handleEditComment = async comment => {
    // Send Comment To Be Edited To CommentModal
    dispatch(setEditableComment(comment));
    // Show CommentModal Editor
    dispatch(setShowCommentModal(true));
  };

  const handleDeleteComment = async comment => {
    try {
      await axios.delete(`${config.serverUrl}/api/comments/${comment?._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      dispatch(setCommentIsDeleted(comment?._id));
    } catch (error) {
      // console.log(error.response?.data);
    }
  };

  return (
    <>
      <Row>
        {post?.media?.length > 0 && (
          <Col
            sm={12}
            md={12}
            // If only 1 or 2 medias are included, then return 5 cols else return 6 cols
            lg={post.media.length <= 2 ? 5 : 6}
            className={styles.column}
          >
            {!trimmed && (
              <div
                className="row"
                style={{
                  maxHeight: post?.media?.length === 1 ? "390px" : "390px",
                  overflowY: "auto"
                }}
              >
                {/* Display Media */}
                {post?.media?.length > 0 && (
                  <MediaDisplay
                    media={post.media}
                    /*  If 1 or 2 medias are included, then return media with full width row
                     ** else
                     ** Return 2 columnsCountBreakPoints
                     */
                    breakPoint={post.media.length <= 2 ? 1 : 2}
                  />
                )}
              </div>
            )}
          </Col>
        )}

        <Col
          sm={12}
          md={12}
          /*  If there is media & media length is 1 or 2 (return 7cols else return 6 cols),
           ** else
           ** If there is no media ( return 12 cols)
           */
          lg={post?.media?.length > 0 ? (post.media.length <= 2 ? 7 : 6) : 12}
          className={`${styles.cardColumn} px-lg-0`}
        >
          <Card
            id={post?.id}
            className="my-3 cards"
            style={{
              border: "none",
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
                  <PostMenu
                    user={user}
                    currentlyFollowing={currentlyFollowing}
                    post={post}
                    handleEditPost={handleEditPost}
                    handleDeletePost={handleDeletePost}
                    changeFollowingStatus={changeFollowingStatus}
                  />
                </div>
              </div>
            </Card.Title>

            <Card.Body>
              {post && Object.keys(post).length !== 0 && (
                <>
                  <div
                    className="post-content"
                    dangerouslySetInnerHTML={{
                      __html: trimmed
                        ? sanitizer(post?.postBody) || sanitizer(post?.post)
                        : sanitizer(post?.postBody) || sanitizer(post?.post)
                    }}
                  />

                  <PostIsEdited post={post} />
                </>
              )}

              <div className={`${styles.trimmed} row justify-content-center`}>
                {/* Display Feature Image */}
                {post?.media?.length > 0 && (
                  <MediaDisplay media={post.media} breakPoint={2} />
                )}
              </div>
              {post?.likes?.length > 0 && (
                <div className="text-muted d-flex align-items-center">
                  <AiFillLike color="#086a6d" className="mx-2" />
                  <span>{likes(post?.likes)}</span>
                </div>
              )}
            </Card.Body>

            <Card.Footer className="justify-content-between bg-white px-0">
              <div className="row">
                {postButton.map((item, key) => (
                  <div className="col-3" key={key}>
                    <Button
                      variant="none"
                      className="d-flex justify-content-center align-items-center border-0"
                      onClick={() => {
                        if (item.name === "Like") {
                          if (liked) {
                            handleUnLike();
                          } else {
                            handleLike();
                          }
                        }
                        if (item.name === "Share") {
                          // modalOpen;
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
                          {post?.likes?.length || 0}
                        </span>
                      )}

                      {item.name === "Comment" && (
                        <span
                          style={{ marginLeft: "7px" }}
                          className="mx-2 text-secondary"
                        >
                          {post?.comments?.length || 0}
                        </span>
                      )}

                      <span
                        className="d-none d-xl-block"
                        style={{ marginLeft: "7px" }}
                      >
                        {item.name}
                      </span>
                    </Button>
                  </div>
                ))}
              </div>
            </Card.Footer>

            <section>
              <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
              <div className="d-flex justify-content-start gap-2 align-items-center">
                <Avatar
                  src={user?.images?.avatar || "/images/imagePlaceholder.jpg"}
                  name={user?.firstName}
                />

                <div
                  style={{ width: "100%" }}
                  className="flex-column justify-content-center"
                >
                  <div
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.125)"
                    }}
                  >
                    {/* TextArea */}
                    <TextAreaWithMentions
                      commentChanging={setCommentPost}
                      resetTextAreaValue={resetTextAreaValue}
                    />
                  </div>

                  <div className="col-5 ms-auto d-md-grid">
                    <Button
                      className="btn btn-sm btn-primary mt-3 d-inline-block"
                      onClick={postComment}
                    >
                      Send
                      {loading && (
                        <div
                          className="spinner-grow spinner-grow-sm text-light"
                          role="status"
                        ></div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h6 style={{ fontWeight: "bolder", marginBottom: "-1.2rem" }}>
                Comments ({post?.comments?.length})
              </h6>
              <div className="row">
                <div className="col-12 mt-4">
                  {post?.comments?.length > 0 &&
                    post?.comments?.map((comment, index) => {
                      return (
                        <Comment
                          key={`post_${index}`}
                          comment={comment}
                          currentlyFollowing={currentlyFollowing}
                          handleEditComment={handleEditComment}
                          handleDeleteComment={handleDeleteComment}
                          changeFollowingStatus={changeFollowingStatus}
                        />
                      );
                    })}
                </div>
              </div>
            </section>
          </Card>
        </Col>
      </Row>

      {/* Open Editor Modal */}
      {showModal && <FeedPostEditorModal pageAt={router.asPath} />}

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

export default ModalCard;
