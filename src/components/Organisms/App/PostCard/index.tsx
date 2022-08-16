/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import strip from "striptags";
import React, { useEffect, useState } from "react";
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

import { MdOutlineCancel } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import {
  ModalRow,
  ModalRowShare,
  useModalWithData,
  useModalWithShare,
} from "@/hooks/useModalWithData";
// import ModalCard from "@/components/Organisms/App/ModalCard";
import truncate from "trunc-html";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RiClipboardFill, RiDeleteBin5Line, RiFlagFill } from "react-icons/ri";
import {
  BsFolderFill,
  BsXCircleFill,
  BsFillBookmarkFill,
  BsBookmark,
} from "react-icons/bs";
import { RiUserFollowFill } from "react-icons/ri";
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegCommentDots, FaThumbsUp } from "react-icons/fa";
import Age from "../../../Atoms/Age";
import DOMPurify from "dompurify";
import styles from "@/styles/profile.module.scss";
import axios from "axios";
import config from "@/config";

import { useDispatch, useSelector } from "@/redux/store";
import {
  selectPost,
  setIsFetching,
  setPosts,
} from "@/reduxFeatures/api/postSlice";
import {
  user as userAuth,
  selectUser,
  // setFollowing,
  selectFollowing,
} from "@/reduxFeatures/authState/authStateSlice";
import {
  // setLikeChanged,
  // selectLikeChanged,
  // setBookMarkChanged,
  // selectBookMarkChanged,
  setLikeChangedModal,
  selectLikeChangedModal,
  setUnLikeChangedModal,
  selectUnLikeChangedModal,
  // setBookMarkChangedModal,
  // selectBookMarkChangedModal,
} from "@/reduxFeatures/app/postModalCardSlice";
import { selectCreatePostModal } from "@/reduxFeatures/app/createPost";
import { selectNewFeed } from "@/reduxFeatures/api/feedSlice";
import { useRouter } from "next/router";
// import Comment from "@/components/Organisms/App/Comment";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
import { FiEdit } from "react-icons/fi";
// import { follow, unFollow } from "../followAndUnFollow";

const PostCard = ({
  // post: postComingIn,
  post,
  trimmed,
  handleDeletePost,
  handleEditPost,
}) => {
  // console.log("PastCard Loaded+++++");
  // console.log("postComingIn:", postComingIn);
  // console.log("post:", post);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const posts = useSelector(selectPost);
  // const likeChanged = useSelector(selectLikeChanged);
  // const bookmarkChanged = useSelector(selectBookMarkChanged);
  const likeChangedModal = useSelector(selectLikeChangedModal);
  const unLikeChangedModal = useSelector(selectUnLikeChangedModal);
  const createPostModal = useSelector(selectCreatePostModal);
  const newFeed = useSelector(selectNewFeed);
  // const bookmarkChangedModal = useSelector(selectBookMarkChangedModal);
  const router = useRouter();

  // const [post, setPostComingIn] = useState(postComingIn);
  const [postReFetched, setPostComingIn] = useState(undefined);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookMarked] = useState(false);
  // const [likedOrBookmarkedChanged, setLikedOrBookmarkedChanged] =
  //   useState(false);
  const sanitizer = DOMPurify.sanitize;

  // - comment section
  const [modalPost, setModalPost] = useState<Record<string, any>>({});
  const [commentPost, setCommentPost] = useState("");
  // const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [noOfLikes, setNoOfLikes] = useState(0)

  // useEffect(()=>{
  //   setNoOfLikes(post?.likes?.length)
  // },[])
  const currentlyFollowing = useSelector(selectFollowing);

  // modal
  const { modalOpen, toggle, selected, setSelected } = useModalWithData();
  const { modalOpenShare, toggleShare, selectedShare, setSelectedShare } =
    useModalWithShare();

  // useEffect(() => {
  //   console.log("POST CHANGED:", post);
  // }, [post]);

  // Monitor Likes In ModalCard & Let It Reflect In PastCard
  useEffect(() => {
    // console.log("modalOpen OPEN");
    if (!modalOpen && likeChangedModal.length > 0) {
      // if (likeChangedModal.includes(postComingIn?._id)) {
      if (likeChangedModal.includes(post?._id)) {
        // Refetch Specific Post So as to get updated like count The false argument is for iit not to sent an axios argument.
        (async () => await likeIt(false))();
      }
    }

    if (!modalOpen && unLikeChangedModal.length > 0) {
      // if (unLikeChangedModal.includes(postComingIn?._id)) {
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
        id: post?.author?._id,
      },
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
      ),
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

  // const postComment = async () => {
  //   const body = {
  //     content: commentPost,
  //   };

  //   setLoading(true);
  //   const res = await axios.post(
  //     `${config.serverUrl}/api/comments?type=feed&id=${post?._id}`,
  //     body,
  //     {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     }
  //   );
  //   // console.log(res);
  //   let comments = post?.comments;
  //   comments?.unshift(res.data);
  //   setModalPost({ ...post, comments });

  //   setLoading(false);
  //   // setShowComment(false);
  // };

  const handleLike = async () => {
    await likeIt(true);
  };

  const handleUnLike = async () => {
    await unLikeIt(true);
  };

  const likeIt = async (bool) => {
    // Pre-Set Like State B4 Axios
    let currentPostState = postReFetched
      ? JSON.parse(JSON.stringify(postReFetched))
      : JSON.parse(JSON.stringify(post));

    let newPostState = { ...currentPostState };
    if (!newPostState?.likes.includes(user?._id)) {
      newPostState.likes.push(user?._id);
    }
    setPostComingIn(newPostState);
    setLiked(true);

    // Axios Like Post
    let type;
    const currentRoute = router.pathname;
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

    // console.log("Post data:", post);
    // try {
    if (bool) {
      try {
        // Like Post
        const likeNew = await axios.get(
          `${config.serverUrl}/api/likes/?type=${type}&id=${post?._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // console.log("likeNew response.data:", likeNew.data);
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
        // console.error(error);
      }
    }
  };

  const unLikeIt = async (bool) => {
    // Pre-Set Unlike State B4 Axios
    let currentPostState = postReFetched
      ? JSON.parse(JSON.stringify(postReFetched))
      : JSON.parse(JSON.stringify(post));

    let newPostState = { ...currentPostState };
    let filterNewPostState = newPostState?.likes;
    if (newPostState?.likes.includes(user?._id)) {
      filterNewPostState = newPostState?.likes.filter((person) => {
        return person !== user?._id;
      });
    }
    newPostState.likes = filterNewPostState;

    setPostComingIn(newPostState);
    setLiked(false);

    // Axios Unlike Post
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

    // try {
    if (bool) {
      // Like Post
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
        // console.log("unlikePost:", unlikePost);
      } catch (error) {
        // Reverse Like Because of Axios Error
        let newPostState = { ...currentPostState };
        if (!newPostState?.likes.includes(user?._id)) {
          newPostState.likes.push(user?._id);
        }

        setPostComingIn(newPostState);
        setLiked(true);
        // console.error(error);
      }
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
        `${config.serverUrl}/api/bookmarks/?id=${post._id}`,
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
      // console.log("fitterStateUser:", fitterStateUser);
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
      await axios.delete(`${config.serverUrl}/api/bookmarks/?id=${post._id}`, {
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
      document.getElementById(`followStr-${post?.author?._id}`).innerText ===
      "Follow"
    ) {
      handleFollow(post?.author?._id);
    } else if (
      document.getElementById(`followStr-${post?.author?._id}`).innerText ===
      "Unfollow"
    ) {
      // let confirmUnFollow = window.confirm(
      //   `Un-Follow ${post?.author?.firstName} ${post?.author?.lastName}`
      // );
      // if (confirmUnFollow) {
      handleUnFollow(post?.author?._id);
      // }
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

  return (
    <>
      <Card
        id={post?.id}
        className="container-fluid my-3 cards"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.125)",
          width: "100%",
        }}
      >
        <Card.Title className={`border-bottom ${styles.title}`}>
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

            <div className="col-6 col-sm-8 ms-4 me-xl-5">
              <div className={styles.div}>
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
                <small
                  style={{
                    marginTop: "10px",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: "gray",
                  }}
                >
                  <Age time={post?.createdAt} />
                </small>
              </div>
            </div>

            <div className="col-1" style={{ marginTop: "-.8rem" }}>
              <NavDropdown
                drop="down"
                title={
                  <Button variant="link" className="text-dark" size="lg">
                    <HiDotsVertical size={25} />
                  </Button>
                }
              >
                <NavDropdown.Item
                  className={styles.item}
                  // style={{ backgroundColor: "rgb(237, 236, 236)" }}
                  style={{ borderBlock: "1px solid gray" }}
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
                  <BsFolderFill /> Open Post
                </NavDropdown.Item>

                {user?._id !== post?.author?._id ? (
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
                      onClick={async () => changeFollowingStatus(post)}
                    >
                      {currentlyFollowing.includes(post?.author?._id) ? (
                        <>
                          <BsXCircleFill />{" "}
                          <span id={`followStr-${post?.author?._id}`}>
                            Unfollow
                          </span>
                        </>
                      ) : (
                        <>
                          <RiUserFollowFill />{" "}
                          <span id={`followStr-${post?.author?._id}`}>
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

        <Card.Body
          style={{
            cursor: "pointer",
          }}
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
          <div>
            {post && Object.keys(post).length !== 0 && (
              <div className="d-flex flex-column">
                <div
                  className="post-content"
                  // No Need for truncate here as it hides some tags like Bold & Underline
                  dangerouslySetInnerHTML={{
                    __html: trimmed
                      ? sanitizer(post?.postBody) || sanitizer(post?.post)
                      : sanitizer(post?.postBody) || sanitizer(post?.post),
                  }}
                />
                {router.asPath === "/feed" ||
                router?.pathname.includes("profile") ? (
                  <small
                    style={{
                      color: "gray",
                      fontSize: "11px",
                      position: "relative",
                      left: "40%",
                      // bottom: "0",
                    }}
                  >
                    {" "}
                    See more...
                  </small>
                ) : null}
              </div>
            )}
          </div>

          {!trimmed && (
            <Image
              className="d-none d-sm-block d-lg-none"
              style={{ borderRadius: 0 }}
              src={"/images/formbg.png"}
              fluid
              alt={""}
            />
          )}
        </Card.Body>
        {post.likes.length > 0 && (
          <div className="text-muted d-flex align-items-center">
            <AiFillLike color="#086a6d" className="mx-2" />
            <span>{likes(post.likes)}</span>
          </div>
        )}

        {/* <Card.Footer
          className={`mx-1 d-flex justify-content-between bg-white ${styles.footer}`}
        > */}
        <Card.Footer className="justify-content-between bg-white px-0">
          <div className="row">
            {postButton.map((item, key) => (
              <div className="col-3" key={key}>
                <Button
                  variant="none"
                  // disabled={item.name === "Like" && post?.likes?.includes(user._id)}
                  // className="d-flex justify-content-center gap-1 align-items-center"
                  className="d-flex justify-content-center align-items-center"
                  onClick={() => {
                    if (item.name === "Like") {
                      if (liked) {
                        // removeLike();
                        handleUnLike();
                      } else {
                        // console.log("POST ID Init:", post?._id);
                        handleLike();
                      }
                    }
                    // if (item.name === "Comment") {
                    //   setShowComment(!showComment);
                    // }

                    if (item.name === "Share") {
                      // modalOpen;
                      toggleShare();
                      setSelectedShare(post);
                      // document.getElementById("dropDownId").click();
                    }
                    if (item.name === "Bookmark") {
                      if (bookmarked) {
                        // If already bookmarked, then remove bookmark
                        removeBookMark();
                      } else {
                        // If not already bookmarked, then add bookmark
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

        {/* {showComment && (
          <section>
            <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
            <div className="row">
              <div className="col-2 col-md-2">
                <Image
                  src={modalPost.authorImage || "/images/imagePlaceholder.jpg"}
                  className="img-fluid"
                  roundedCircle={true}
                  alt="Author's Image"
                />
              </div>
              <div className="col-7 col-md-10">
                <div
                  className="form-floating"
                  style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}
                >
                  <textarea
                    id="articleTextarea"
                    className="form-control"
                    placeholder="."
                    onChange={(e) => setCommentPost(e.target.value)}
                    style={{ height: "100px" }}
                  ></textarea>
                  <label htmlFor="articleTextarea">Comments</label>
                </div>
              </div>
              <div className="col-3 col-md-2 ms-auto d-md-grid">
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
        )} */}
      </Card>
      <Modal
        show={modalOpen}
        className={`${styles.FeedModal}`}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
        scrollable={true}
      >
        <span className={styles.openBtn}>
          {" "}
          <MdOutlineCancel
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggle()}
          />{" "}
        </span>
        <span className={styles.closeBtn}>
          {" "}
          <BiArrowBack
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggle()}
          />{" "}
        </span>
        <ModalRow selected={selected} />
      </Modal>

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

export default PostCard;
