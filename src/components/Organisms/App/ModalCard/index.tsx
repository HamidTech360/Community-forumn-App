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
import { RiClipboardFill, RiFlagFill } from "react-icons/ri";
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
import { useRouter } from "next/router";
import Comment from "@/components/Organisms/App/Comment";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
import { ModalRowShare, useModalWithShare } from "@/hooks/useModalWithData";
import { MdOutlineCancel } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

const ModalCard = ({
  post,
  trimmed,
}: {
  post: Record<string, any>;
  trimmed?: Boolean;
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const posts = useSelector(selectPost);
  const router = useRouter();
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

    console.log(type, currentRoute);

    try {
      const { data } = await axios.get(
        `${config.serverUrl}/api/likes/?type=${type}&id=${post._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setLiked(true);

      // window.location.reload();
    } catch (error) {
      console.log(error.response?.data);
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
    setLoading(true);
    const res = await axios.post(
      `${config.serverUrl}/api/comments?type=feed&id=${post._id}`,
      body,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(res);
    let comments = post?.comments;
    comments?.unshift(res.data);
    setModalPost({ ...post, comments });
    setLoading(false);
    setShowComment(false);
  };

  const handleBookMark = async () => {
    try {
      const { data } = await axios.post(
        `${config.serverUrl}/api/bookmarks/?id=${post._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      //console.log(data);
      setBookMarked(true);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const removeBookMark = async () => {
    try {
      const { data } = await axios.delete(
        `${config.serverUrl}/api/bookmarks/?id=${post._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      //console.log(data);
      setBookMarked(false);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    // console.log(router.pathname);

    if (post.likes?.includes(user._id)) {
      setLiked(true);
    }
    if (user.bookmarks?.includes(post._id)) {
      setBookMarked(true);
    } else {
      setBookMarked(false);
    }
  }, []);

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

  return (
    <>
      <Row>
        <Col sm={12} md={12} lg={5} className={styles.column}>
          {!trimmed && (
            <Image
              src={"/images/formbg.png"}
              alt={""}
              className={styles.imgModal}
              fluid
            />
          )}
        </Col>

        <Col sm={12} md={12} lg={7} className={styles.cardColumn}>
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
                <div className="col-5 col-sm-10 col-md-8 ms-4 me-xl-0">
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
                          `${post.author?.firstName} ${post.author?.lastName}`
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
                  </NavDropdown>
                </div>
              </div>
            </Card.Title>

            <Card.Body>
              {Object.keys(post).length !== 0 && (
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{
                    __html: trimmed
                      ? sanitizer(truncate(post?.postBody, 250).html) ||
                        sanitizer(truncate(post?.post, 250).html)
                      : sanitizer(truncate(post?.postBody, 250).html) ||
                        sanitizer(truncate(post?.post, 250).html),
                  }}
                  // dangerouslySetInnerHTML={{
                  //   __html: trimmed
                  //     ? post?.postBody?.slice(0, 500) ||
                  //       post?.post?.slice(0, 500) + "..." ||
                  //       post?.postBody
                  //     : post?.postBody || post?.post,
                  // }}
                />
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
                      className="d-flex justify-content-center align-items-center"
                      onClick={() => {
                        if (item.name === "Share") {
                          // modalOpen;
                          toggleShare();
                          setSelectedShare(postButton);
                          // document.getElementById("dropDownId").click();
                        }
                      }}
                    >
                      {item.icon}
                      {item.name === "Like" && (
                        <span
                          style={{ marginLeft: "7px" }}
                          className="mx-2 text-secondary"
                        >
                          {post.likes?.length || 0}
                        </span>
                      )}

                      {item.name === "Comment" && (
                        <span
                          style={{ marginLeft: "7px" }}
                          className="mx-2 text-secondary"
                          // onClick={() => setShowComment(!showComment)}
                        >
                          {post.comments?.length || 0}
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
                  <div className="shadow">
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
              <h6 style={{ fontWeight: "bolder" }}>
                Comments ({post.comments?.length})
              </h6>
              <div className="row">
                <div className="col-12 mt-4">
                  {post.comments?.length > 0 &&
                    post.comments?.map((comment, index) => {
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
