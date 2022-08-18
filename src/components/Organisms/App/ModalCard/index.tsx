/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import strip from "striptags";
import React, { useEffect, useState } from "react";
import { setSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Modal,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { RiClipboardFill, RiDeleteBin5Line, RiFlagFill } from "react-icons/ri";
import {
  BsFolderFill,
  BsXCircleFill,
  BsFillBookmarkFill,
  BsBookmark,
} from "react-icons/bs";
import { RiUserFollowFill } from "react-icons/ri";
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  user as userAuth,
  selectFollowing,
} from "@/reduxFeatures/authState/authStateSlice";

import { FaRegCommentDots } from "react-icons/fa";
import Age from "../../../Atoms/Age";
import DOMPurify from "dompurify";
import styles from "@/styles/profile.module.scss";
import axios from "axios";
import config from "@/config";
import { useDispatch } from "react-redux";
import truncate from "trunc-html";

import {
  selectPost,
  setIsFetching,
  setPosts,
} from "@/reduxFeatures/api/postSlice";
import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import {
  // setLikeChanged,
  // selectLikeChanged,
  // setBookMarkChanged,
  // selectBookMarkChanged,
  setLikeChangedModal,
  selectLikeChangedModal,
  setUnLikeChangedModal,
  selectUnLikeChangedModal,
  selectModalCardPostEdited,
  setModalCardPostEdited,
  // setBookMarkChangedModal,
  // selectBookMarkChangedModal,
} from "@/reduxFeatures/app/postModalCardSlice";
import { useRouter } from "next/router";
import Comment from "@/components/Organisms/App/Comment";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
import { ModalRowShare, useModalWithShare } from "@/hooks/useModalWithData";
import { MdOutlineCancel } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import likes from "@/utils/like";

const ModalCard = ({
  post: postComingIn,
  trimmed,
}: {
  post: Record<string, any>;
  trimmed?: Boolean;
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const posts = useSelector(selectPost);
  // const likeChanged = useSelector(selectLikeChanged);
  // const bookmarkChanged = useSelector(selectBookMarkChanged);
  const likeChangedModal = useSelector(selectLikeChangedModal);
  const unLikeChangedModal = useSelector(selectUnLikeChangedModal);
  const modalCardPostEdited = useSelector(selectModalCardPostEdited);
  // const bookmarkChangedModal = useSelector(selectBookMarkChangedModal);
  const router = useRouter();

  const [post, setPostComingIn] = useState(postComingIn);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookMarked] = useState(false);
  const sanitizer = DOMPurify.sanitize;

  // - comment section
  const [modalPost, setModalPost] = useState<Record<string, any>>({});
  const [commentPost, setCommentPost] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentlyFollowing = useSelector(selectFollowing);

  const { modalOpenShare, toggleShare, selectedShare, setSelectedShare } =
    useModalWithShare();

  useEffect(() => {
    // Update modalPost when post has been edited
    if (modalCardPostEdited) {
      setPostComingIn({ ...post, post: modalCardPostEdited });
    }

    return () => {
      dispatch(setModalCardPostEdited(null));
    };
  }, [modalCardPostEdited]);

  useEffect(() => {
    if (post?.likes?.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post]);

  useEffect(() => {
    if (post?.likes?.includes(user._id)) {
      setLiked(true);
      // dispatch(setLiked(true));
    }
    if (user.bookmarks?.includes(post?._id)) {
      setBookMarked(true);
      // dispatch(setBookMarked(true));
    } else {
      setBookMarked(false);
      // dispatch(setBookMarked(false));
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
      ),
    },
    {
      name: "Share",
      reaction: true,
      icon: <AiOutlineShareAlt size={25} />,
    },
    {
      name: "Comment",
      reaction: true,
      icon: <FaRegCommentDots size={24} />,
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
      ),
    },
  ];

  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: post?.author?._id,
      },
    });
  };

  const handleLike = async () => {
    likeIt(true);
  };

  const handleUnLike = async () => {
    await unLikeIt(true);
  };

  const likeIt = async (bool) => {
    // Pre-Set Like State B4 Axios
    let currentPostState = JSON.parse(JSON.stringify(post));

    let newPostState = { ...currentPostState };
    if (!newPostState?.likes.includes(user?._id)) {
      newPostState.likes.push(user?._id);
    }
    setPostComingIn(newPostState);
    setLiked(true);
    // Notify the PostCard of Changes in the ModalCard
    dispatch(setLikeChangedModal(post?._id));

    let type;
    const currentRoute = router.pathname;
    // console.log("currentRoute:", currentRoute);
    if (currentRoute == "/feed") {
      type = "feed";
    } else if (
      currentRoute == "/groups" ||
      currentRoute == "/groups/[id]/[path]"
    ) {
      // type = "post";
      type = "feed";
    } else if (currentRoute.includes("profile")) {
      type = "post";
    }

    // console.log(type, currentRoute);

    // try {
    if (bool) {
      try {
        // Like Post
        await axios.get(
          `${config.serverUrl}/api/likes/?type=${type}&id=${post?._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      } catch (error) {
        // Reverse Like State Because of Axios Error
        let filterNewPostState = newPostState?.likes;
        if (newPostState?.likes.includes(user?._id)) {
          filterNewPostState = newPostState?.likes.filter((person) => {
            return person !== user?._id;
          });
        }
        newPostState.likes = filterNewPostState;
        setPostComingIn(newPostState);
        setLiked(false);
        // REVERSE Notify the PostCard of Changes in the ModalCard
        if (likeChangedModal.includes(post?._id)) {
          // Trigger Rerender
          dispatch(setLikeChangedModal(""));
        }
        //  Main Render
        dispatch(setUnLikeChangedModal(post?._id));
        // console.error(error);
      }
    }
  };

  const unLikeIt = async (bool) => {
    // Pre-Set Unlike State B4 Axios
    let currentPostState = JSON.parse(JSON.stringify(post));

    let newPostState = { ...currentPostState };
    let filterNewPostState = newPostState?.likes;
    if (newPostState?.likes.includes(user?._id)) {
      // newPostState.likes.push(user?._id);

      filterNewPostState = newPostState?.likes.filter((person) => {
        return person !== user?._id;
      });
    }
    newPostState.likes = filterNewPostState;
    // console.log("filterNewPostState:", filterNewPostState);
    // console.log("newPostState:", newPostState);

    setPostComingIn(newPostState);
    setLiked(false);
    // Notify the PostCard of Changes in the ModalCard
    if (!unLikeChangedModal.includes(post?._id)) {
      dispatch(setUnLikeChangedModal(post?._id));
    }

    let type;
    const currentRoute = router.pathname;
    if (currentRoute == "/feed") {
      type = "feed";
    } else if (
      currentRoute == "/groups" ||
      currentRoute == "/groups/[id]/[path]"
    ) {
      type = "feed";
    } else if (currentRoute.includes("profile")) {
      type = "post";
    }

    if (bool) {
      // Axios Like Post
      try {
        const unlikePost = await axios.delete(
          `${config.serverUrl}/api/likes/?type=${type}&id=${post?._id}`,
          // `${config.serverUrl}/api/${type}/${post?._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      } catch (error) {
        // Reverse Like Because of Axios Error
        let newPostState = { ...currentPostState };
        if (!newPostState?.likes.includes(user?._id)) {
          newPostState.likes.push(user?._id);
        }

        setPostComingIn(newPostState);
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
    const body = {
      content: commentPost,
    };

    if (body.content == "") {
      return toast.error("Comment cannot be empty", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${config.serverUrl}/api/comments?type=feed&id=${post?._id}`,
        body,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // console.log(res);
      let comments = post?.comments;
      comments?.unshift(res.data);
      // console.log("{ ...post, comments }:", { ...post, comments });
      setModalPost({ ...post, comments });
      setPostComingIn({ ...post, comments });
      setLoading(false);
      setShowComment(false);
      setCommentPost("");
      (document.getElementById("articleTextarea") as HTMLInputElement).value =
        "";
    } catch (error) {
      // console.error(error);
    }
  };

  const handleBookMark = async () => {
    /* Pre-Bookmark Post.
     ** This would Auto-Sync Bookmark on both PastCard & ModalCard
     */

    // if (!user?.bookmarks?.includes(post?._id)) {
    let newBookmarks = [...user?.bookmarks, post?._id];
    dispatch(userAuth({ ...user, bookmarks: newBookmarks }));
    // }

    // Axios Bookmark Post
    try {
      await axios.post(
        `${config.serverUrl}/api/bookmarks/?id=${post?._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      // if (user?.bookmarks?.includes(post?._id)) {
      let fitterStateUser = user?.bookmarks.filter((filterUser) => {
        return filterUser !== post?._id;
      });
      // }

      // Reverse Bookmark State
      dispatch(userAuth({ ...user, bookmarks: fitterStateUser }));
      // console.log(error);
    }
  };

  const removeBookMark = async () => {
    /* Pre Remove BookMarked Post.
     ** This would Auto-Sync Bookmark on both PastCard & ModalCard
     */

    let fitterStateUser = user?.bookmarks.filter((filterUser) => {
      return filterUser !== post?._id;
    });
    dispatch(userAuth({ ...user, bookmarks: fitterStateUser }));

    // Axios Remove BookMarked Post
    try {
      await axios.delete(`${config.serverUrl}/api/bookmarks/?id=${post?._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    } catch (error) {
      // Reverse Bookmark Auth User State.
      let reverseBookmarks = [...user?.bookmarks, post?._id];
      dispatch(userAuth({ ...user, bookmarks: reverseBookmarks }));
      // console.log(error.response?.data);
    }
  };

  const changeFollowingStatus = (post) => {
    if (
      document.getElementById(`followStr-modal-${post?.author?._id}`)
        .innerText === "Follow"
    ) {
      handleFollow(post?.author?._id);
    } else if (
      document.getElementById(`followStr-modal-${post?.author?._id}`)
        .innerText === "Unfollow"
    ) {
      let confirmUnFollow = window.confirm(
        `Un-Follow ${post?.author?.firstName} ${post?.author?.lastName}`
      );
      if (confirmUnFollow) {
        handleUnFollow(post?.author?._id);
      }
    }
  };

  const handleFollow = async (id) => {
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
      // console.error("follow Error:", error);
    }
  };

  const handleUnFollow = async (id) => {
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
      // console.error("follow Error:", error);
    }
  };

  const handleDeletePost = async (post) => {
    // const newPosts = posts.filter((el) => el._id !== post._id);
    // console.log(posts, newPosts);
    // setPosts(posts.filter((el) => el._id !== post._id));
    try {
      const { data } = await axios.delete(
        `${config.serverUrl}/api/feed?id=${post._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(data, post._id);
    } catch (error) {
      // console.log(error.response?.data);
    }
  };

  const handleEditPost = async (post) => {
    console.log("post:", post);
    dispatch(setSlatePostToEdit(post));
    document.getElementById("createFeedPost").click();
  };

  return (
    <>
      <Row>
        <Col sm={12} md={12} lg={5} className={`${styles.column} pe-lg-0`}>
          {!trimmed && (
            <Image
              src={"/images/formbg.png"}
              alt={""}
              className={styles.imgModal}
              fluid
            />
          )}
        </Col>

        <Col sm={12} md={12} lg={7} className={`${styles.cardColumn} px-lg-0`}>
          <Card
            id={post?.id}
            className="my-3 cards"
            style={{
              border: "none",
              width: "100%",
              // padding: "-3rem",
            }}
          >
            <Card.Title
              // className={`position-relative d-flex justify-content-start gap-2 pb-2 border-bottom ${styles.title}`}
              className={`border-bottom ${styles.title}`}
            >
              <div className="row">
                <div className="col-1">
                  <Image
                    src={"/images/imagePlaceholder.jpg"}
                    width={45}
                    height={45}
                    alt=""
                    roundedCircle
                    style={{ cursor: "pointer" }}
                    onClick={redirectPage}
                  />
                </div>

                {/* <div className="d-flex flex-column"> */}
                <div className="col-6 col-sm-8 ms-4 ms-lg-3 ms-xl-4 me-xl-0">
                  <div
                    className={styles.div}
                    // onClick={redirectPage}
                    // style={{ cursor: "pointer" }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        cursor: "pointer",
                        color: "var(--bs-primary)",
                      }}
                      onClick={redirectPage}
                      dangerouslySetInnerHTML={{
                        __html: sanitizer(
                          `${post?.author?.firstName} ${post?.author?.lastName}`
                        ),
                      }}
                    />
                    <br />
                    {post?.postTitle || post?.title ? (
                      <>
                        <span
                          style={{
                            marginTop: "5px",
                            fontWeight: 500,
                            fontSize: "18px",
                            color: "black",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: trimmed
                              ? sanitizer(
                                  truncate(post?.postTitle, 250).html
                                ) || sanitizer(truncate(post?.title, 250).html)
                              : sanitizer(
                                  truncate(post?.postTitle, 250).html
                                ) || sanitizer(truncate(post?.title, 250).html),
                          }}
                        />
                        <br />
                      </>
                    ) : null}
                    <small
                      style={{
                        marginTop: "5px",
                        fontWeight: 400,
                        fontSize: "13px",
                        color: "gray",
                      }}
                    >
                      <Age time={post?.createdAt} />
                    </small>
                  </div>
                </div>

                <div className="col-1 col-md-2" style={{ marginTop: "-.8rem" }}>
                  <NavDropdown
                    // className={`position-absolute end-0 ${styles.dropdown}`}
                    drop="down"
                    title={
                      <Button
                        variant="link"
                        // className="dot-btn"
                        className="text-dark"
                        size="lg"
                      >
                        <HiDotsVertical size={25} />
                      </Button>
                    }
                  >
                    {user?._id !== post?.author?._id ? (
                      <>
                        <NavDropdown.Item
                          className={styles.item}
                          style={{ backgroundColor: "rgb(237, 236, 236)" }}
                        >
                          <RiFlagFill className="text-muted" /> Report post
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className={styles.item}
                          onClick={async () => changeFollowingStatus(post)}
                        >
                          {currentlyFollowing.includes(post?.author?._id) ? (
                            <>
                              <BsXCircleFill className="text-muted" />{" "}
                              <span id={`followStr-modal-${post?.author?._id}`}>
                                {/* NOTE: Don't change the "Unfollow" Text From PascalCase, else unfollowing wouldn't work */}
                                Unfollow
                              </span>
                            </>
                          ) : (
                            <>
                              <RiUserFollowFill className="text-muted" />{" "}
                              <span id={`followStr-modal-${post?.author?._id}`}>
                                {/* NOTE: Don't change the "Follow" Text From PascalCase, else following wouldn't work */}
                                Follow
                              </span>
                            </>
                          )}{" "}
                          @{post?.author?.firstName?.split(" ")[0]}
                          {post?.author?.lastName?.substring(0, 1)}
                        </NavDropdown.Item>
                      </>
                    ) : null}
                    {user._id == post.author._id && (
                      <>
                        <NavDropdown.Item
                          className={styles.item}
                          // style={{ marginTop: "8px" }}
                          style={{
                            borderBottom: "1px solid gray",
                          }}
                          onClick={() => handleEditPost(post)}
                        >
                          <FiEdit /> Edit Post
                        </NavDropdown.Item>

                        <NavDropdown.Item
                          // style={{ marginTop: "8px" }}
                          style={{ borderBottom: "1px solid gray" }}
                          onClick={() => handleDeletePost(post)}
                        >
                          <span
                            style={{
                              color: "red",
                              // fontWeight: "500",
                              // marginLeft: "10px",
                            }}
                          >
                            <RiDeleteBin5Line /> Delete Post
                          </span>
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                </div>
              </div>
            </Card.Title>

            <Card.Body>
              {post && Object.keys(post).length !== 0 && (
                <>
                  <div
                    className="post-content"
                    // dangerouslySetInnerHTML={{
                    //   __html: trimmed
                    //     ? sanitizer(truncate(post?.postBody, 250).html) ||
                    //       sanitizer(truncate(post?.post, 250).html)
                    //     : sanitizer(truncate(post?.postBody, 250).html) ||
                    //       sanitizer(truncate(post?.post, 250).html),
                    // }}

                    // No Need for truncate here as it hides some tags like Bold & Underline
                    dangerouslySetInnerHTML={{
                      __html: trimmed
                        ? sanitizer(post?.postBody) || sanitizer(post?.post)
                        : sanitizer(post?.postBody) || sanitizer(post?.post),
                    }}
                    // dangerouslySetInnerHTML={{
                    //   __html: trimmed
                    //     ? post?.postBody?.slice(0, 500) ||
                    //       post?.post?.slice(0, 500) + "..." ||
                    //       post?.postBody
                    //     : post?.postBody || post?.post,
                    // }}
                  />
                  {post.createdAt !== post.updatedAt && (
                    <span>
                      <small style={{ color: "gray", fontSize: "12px" }}>
                        (edited)
                      </small>
                    </span>
                  )}
                </>
              )}

              <div className={styles.trimmed}>
                {!trimmed && (
                  <Image
                    src={"/images/formbg.png"}
                    alt={""}
                    fluid
                    className={styles.imgModal}
                  />
                )}
              </div>
              {post.likes.length > 0 && (
                <div className="text-muted d-flex align-items-center">
                  <AiFillLike color="#086a6d" className="mx-2" />
                  <span>{likes(post.likes)}</span>
                </div>
              )}
            </Card.Body>

            {/* <Card.Footer
            className={`mx-1 d-flex justify-content-between bg-white ${styles.cardFooter}`}
          > */}
            <Card.Footer className="justify-content-between bg-white px-0">
              <div className="row">
                {postButton.map((item, key) => (
                  <div className="col-3" key={key}>
                    <Button
                      // key={key}
                      // onClick={() => item.name === "Like" && handleLike()}
                      variant="none"
                      // disabled={item.name === "Like" && post.likes?.includes(user._id)}
                      // className="d-flex justify-content-center gap-1 align-items-center"
                      className="d-flex justify-content-center align-items-center border-0"
                      onClick={() => {
                        if (item.name === "Like") {
                          if (liked) {
                            // removeLike();
                            handleUnLike();
                          } else {
                            handleLike();
                          }
                        }
                        if (item.name === "Share") {
                          // modalOpen;
                          toggleShare();
                          setSelectedShare(postButton);
                          // document.getElementById("dropDownId").click();
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
                          // onClick={() => setShowComment(!showComment)}
                        >
                          {post?.comments?.length || 0}
                        </span>
                      )}

                      <span
                        // className={`d-none d-md-block ${styles.footerName}`}
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
              <div className="row">
                <div className="d-none d-md-flex col-md-2">
                  <Image
                    src={
                      modalPost.authorImage || "/images/imagePlaceholder.jpg"
                    }
                    width={50}
                    height={50}
                    // className="img-fluid"
                    roundedCircle={true}
                    alt="Author's Image"
                  />
                </div>
                <div className="col-12 col-md-10">
                  {/* <div className="form-floating shadow"> */}
                  <div style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}>
                    <textarea
                      id="articleTextarea"
                      className="form-control"
                      placeholder="."
                      onChange={(e) => setCommentPost(e.target.value)}
                      style={{ height: "100px" }}
                    ></textarea>
                    {/* <label htmlFor="articleTextarea">Comments</label> */}
                  </div>
                </div>
                <div className="col-5 ms-auto d-grid">
                  <button
                    className="btn btn-sm btn-primary mt-3 d-inline"
                    onClick={postComment}
                  >
                    Send
                    {loading && (
                      <div
                        className="spinner-grow spinner-grow-sm text-light"
                        role="status"
                      ></div>
                    )}
                  </button>
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
                      // console.log("comment:", comment);
                      return (
                        <Comment key={`post_${index}`} comment={comment} />
                      );
                    })}
                </div>
              </div>
            </section>
          </Card>
        </Col>
      </Row>

      <Modal
        show={modalOpenShare}
        className={styles.FeedModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="sm"
        scrollable={true}
      >
        <span className={styles.openBtn}>
          {" "}
          <MdOutlineCancel
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggleShare()}
          />{" "}
        </span>
        <span className={styles.closeBtn}>
          {" "}
          <BiArrowBack
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggleShare()}
          />{" "}
        </span>
        <ModalRowShare selectedShare={selectedShare} />
      </Modal>
    </>
  );
};

export default ModalCard;
