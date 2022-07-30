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

import { user as userAuth } from "@/reduxFeatures/authState/authStateSlice";

import { RiClipboardFill, RiFlagFill } from "react-icons/ri";
import {
  BsFolderFill,
  BsXCircleFill,
  BsFillBookmarkFill,
  BsBookmark,
} from "react-icons/bs";
import { RiUserFollowFill } from "react-icons/ri";
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
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
  selectUser,
  setFollowing,
  selectFollowing,
} from "@/reduxFeatures/authState/authStateSlice";
import {
  // setLikeChanged,
  // selectLikeChanged,
  // setBookMarkChanged,
  // selectBookMarkChanged,
  setLikeChangedModal,
  selectLikeChangedModal,
  // setBookMarkChangedModal,
  // selectBookMarkChangedModal,
} from "@/reduxFeatures/app/postModalCardSlice";
import { useRouter } from "next/router";
import Comment from "@/components/Organisms/App/Comment";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
// import { follow, unFollow } from "../followAndUnFollow";

const PostCard = ({
  post: postComingIn,
  trimmed,
}: {
  post: Record<string, any>;
  trimmed?: Boolean;
}) => {
  // console.log("PastCard Loaded+++++");
  // console.log("postComingIn:", postComingIn);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const posts = useSelector(selectPost);
  // const likeChanged = useSelector(selectLikeChanged);
  // const bookmarkChanged = useSelector(selectBookMarkChanged);
  const likeChangedModal = useSelector(selectLikeChangedModal);
  // const bookmarkChangedModal = useSelector(selectBookMarkChangedModal);
  const router = useRouter();

  const [post, setPostComingIn] = useState(postComingIn);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookMarked] = useState(false);
  // const [likedOrBookmarkedChanged, setLikedOrBookmarkedChanged] =
  //   useState(false);
  const sanitizer = DOMPurify.sanitize;

  // - comment section
  const [modalPost, setModalPost] = useState<Record<string, any>>({});
  const [commentPost, setCommentPost] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentlyFollowing = useSelector(selectFollowing);

  // modal
  const { modalOpen, toggle, selected, setSelected } = useModalWithData();
  const { modalOpenShare, toggleShare, selectedShare, setSelectedShare } =
    useModalWithShare();

  // Monitor Likes In ModalCard & Let It Reflect In PastCard
  useEffect(() => {
    if (!modalOpen && likeChangedModal.length > 0) {
      if (likeChangedModal.includes(postComingIn?._id)) {
        // Refetch Specific Post So as to get updated like count
        (async () => await likeIt(false))();
      }
    }

    // Clear Redux State On componentWillUnMount
    return () => {
      dispatch(setLikeChangedModal(""));
      // dispatch(setBookMarkChangedModal(""));
    };
  }, [modalOpen]);

  const postComment = async () => {
    const body = {
      content: commentPost,
    };

   
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
    setModalPost({ ...post, comments });

    setLoading(false);
    setShowComment(false);
  };

  const likeIt = async (bool) => {
    let type;
    const currentRoute = router.pathname;
    if (currentRoute == "/feed") {
      type = "feed";
    } else if (
      currentRoute == "/groups" ||
      currentRoute == "/groups/[id]/[path]"
    ) {
      type = "post";
    } else if (currentRoute.includes("profile")) {
      type = "post";
    }

    try {
      if (bool) {
        // Like Post
        await axios.get(
          `${config.serverUrl}/api/likes/?type=${type}&id=${post?._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      }

      // Refetch Specific Post So as to get updated like count
      if (currentRoute == "/feed") {
        const response = await axios.get(
          `${config.serverUrl}/api/${type}/${postComingIn?._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setPostComingIn(response.data);
        setLiked(true);
      } else if (
        currentRoute == "/groups" ||
        currentRoute == "/groups/[id]/[path]"
      ) {
        // console.log(
        //   "GROUPS",
        //   `${config.serverUrl}/api/feed/groups/${postComingIn?.group}/${postComingIn?._id}`
        // );
        try {
          const response = await axios.get(
            `${config.serverUrl}/api/feed/groups/${postComingIn?.group}/${postComingIn?._id}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          // console.log("response.data:", response.data);
          // setPostComingIn(response.data);
          setLiked(true);
        } catch (error) {
          console.error(error);
        }
      } else if (currentRoute.includes("profile")) {
        const response = await axios.get(
          `${config.serverUrl}/api/${type}s/${postComingIn?._id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // console.log("response.data:", response.data.post);
        setPostComingIn(response.data.post);
        setLiked(true);
      }
    } catch (error) {
      // console.log(error.response?.data);
    }
  };

  const postButton = [
    {
      name: "Like",
      reaction: true,
      icon: liked ? (
        <AiFillLike color="#086a6d " size={25} />
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
    await likeIt(true);
  };

  const handleBookMark = async () => {
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
      // setBookMarked(true);

      // Update Auth User State. This would Auto-Sync Bookmark on both PastCard & ModalCard
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
      // console.log(error.response?.data);
    }
  };

  const removeBookMark = async () => {
    try {
      await axios.delete(`${config.serverUrl}/api/bookmarks/?id=${post._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // setBookMarked(false);

      // Update Auth User State. This would Auto-Sync Bookmark on both PastCard & ModalCard
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
      // console.log(error.response?.data);
    }
  };

  useEffect(() => {
    // console.log(router.pathname);
    // console.log("user?.bookmarks:", user?.bookmarks);

    if (post?.likes?.includes(user._id)) {
      setLiked(true);
      // dispatch(setLiked(true));
    }
    if (user?.bookmarks?.includes(post?._id)) {
      setBookMarked(true);
      // dispatch(setBookMarked(true));
    } else {
      setBookMarked(false);
      // dispatch(setBookMarked(false));
    }
  }, [user]);

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
      let confirmUnFollow = window.confirm(
        `Un-Follow ${post?.author?.firstName} ${post?.author?.lastName}`
      );
      if (confirmUnFollow) {
        handleUnFollow(post?.author?._id);
      }
    }
  };

  return (
    <>
      <Card
        id={post?.id}
        className="container-fluid my-3 cards"
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

            <div className="col-6 col-sm-9 col-xl-10 ms-4 ms-lg-1 ms-xl-0">
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
                // className={`position-absolute end-0 ${styles.dropdown}`}
                // className={`${styles.dropdown}`}
                drop="down"
                title={
                  <Button
                    // variant="light"
                    variant="link"
                    className="text-dark"
                    size="lg"
                    // className="dot-btn"
                    // style={{ background: "none" }}
                  >
                    <HiDotsVertical size={25} />
                  </Button>
                }
              >
                {/* <NavDropdown.Item
                  className={styles.item}
                  style={{ backgroundColor: "rgb(237, 236, 236)" }}
                >
                  <RiClipboardFill /> Copy post link
                </NavDropdown.Item> */}
                <NavDropdown.Item
                  className={styles.item}
                  style={{ backgroundColor: "rgb(237, 236, 236)" }}
                  onClick={async () => {
                    setSelected(post);
                    toggle();
                  }}
                >
                  <BsFolderFill className="text-muted" /> Open Post
                </NavDropdown.Item>

                {user?._id !== post?.author?._id ? (
                  <>
                    <NavDropdown.Item className={styles.item}>
                      <RiFlagFill className="text-muted" /> Report post
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className={styles.item}
                      onClick={async () => changeFollowingStatus(post)}
                    >
                      {currentlyFollowing.includes(post?.author?._id) ? (
                        <>
                          <BsXCircleFill className="text-muted" />{" "}
                          <span id={`followStr-${post?.author?._id}`}>
                            {/* NOTE: Don't change the "Unfollow" Text From PascalCase, else unfollowing wouldn't work */}
                            Unfollow
                          </span>
                        </>
                      ) : (
                        <>
                          <RiUserFollowFill className="text-muted" />{" "}
                          <span id={`followStr-${post?.author?._id}`}>
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
              </NavDropdown>
            </div>
          </div>
        </Card.Title>

        <Card.Body
          style={{
            cursor: "pointer",
          }}
          onClick={async () => {
            if (showComment) {
              setShowComment(!showComment);
            }
            setSelected(post);
            toggle();
          }}
        >
          <div>
            {/* {Object.keys(post).length !== 0 && (
            <div
              className="post-content"
              dangerouslySetInnerHTML={{
                __html: trimmed
                  ? post?.postBody?.slice(0, 500) ||
                    post?.post?.slice(0, 500) + "..." ||
                    post?.postBody
                  : post?.post || post?.post,
              }}
            />
          )} */}
            {post && Object.keys(post).length !== 0 && (
              <div
                className="post-content"
                dangerouslySetInnerHTML={{
                  __html: trimmed
                    ? sanitizer(truncate(post?.postBody, 250).html) ||
                      sanitizer(truncate(post?.post, 250).html)
                    : sanitizer(truncate(post?.postBody, 250).html) ||
                      sanitizer(truncate(post?.post, 250).html),
                }}
              />
            )}
            {/* {Object.keys(post).length !== 0 && (
              <div
                className="post-content"
                dangerouslySetInnerHTML={{
                  __html: trimmed
                    ? sanitizer(truncate(post?.postBody, 250).html) ||
                      sanitizer(truncate(post?.post, 250).html)
                    : sanitizer(truncate(post?.postBody, 250).html) ||
                      sanitizer(truncate(post?.post, 250).html),
                }}
              />
            )} */}
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
                      } else {
                        handleLike();
                      }
                    }
                    if (item.name === "Comment") {
                      setShowComment(!showComment);
                    }

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

        {showComment && (
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
                <div className="form-floating shadow">
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
        )}
      </Card>
      <Modal
        show={modalOpen}
        className={styles.FeedModal}
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
