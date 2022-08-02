/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import strip from "striptags";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Image, NavDropdown, Row } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { RiClipboardFill, RiFlagFill } from "react-icons/ri";
import { BsFolderFill, BsXCircleFill, BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import {AiOutlineLike, AiFillLike, AiOutlineShareAlt} from 'react-icons/ai'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {FaCommentDots} from 'react-icons/fa'
import Age from "../../../Atoms/Age";
import DOMPurify from "dompurify";
import styles from "@/styles/profile.module.scss";
import axios from "axios";
import config from "@/config";
import { useDispatch } from "react-redux";

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
  // setBookMarkChangedModal,
  // selectBookMarkChangedModal,
} from "@/reduxFeatures/app/postModalCardSlice";
import { useRouter } from "next/router";
import Comment from "@/components/Organisms/App/Comment";


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
  // const bookmarkChangedModal = useSelector(selectBookMarkChangedModal);
  const router = useRouter();

  const [post, setPostComingIn] = useState(postComingIn);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookMarked] = useState(false);
  const sanitizer = DOMPurify.sanitize;

  // - comment section
  const [modalPost, setModalPost] = useState<Record<string, any>>({});
  const [commentPost, setCommentPost] = useState("");
  const [loading, setLoading] = useState(false)
  
 //console.log([...post.comments].reverse());
 

  // useEffect(() => {
  //   // first;

  //   return () => {
  //     dispatch(setLikeChanged([]));
  //     dispatch(setBookMarkChanged([]));
  //   };
  // }, []);

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
      icon: <FaCommentDots size={20} />,
    },
    {
      name: "Bookmark",
      reaction: true,
      icon:bookmarked?<BsFillBookmarkFill color="#086a6d " onClick={()=>removeBookMark()} />:<BsBookmark onClick={()=>handleBookMark()} />

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

  const likeIt = async (bool) => {
    let type;
    const currentRoute = router.pathname;
    // console.log("currentRoute:", currentRoute);
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
          console.error(error);
        }
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

        // console.log("response.data:", response.data);
        setPostComingIn(response.data);
        setLiked(true);

        if (!likeChangedModal.includes(post?._id)) {
          dispatch(setLikeChangedModal(post?._id));
        }
      } else if (
        currentRoute == "/groups" ||
        currentRoute == "/groups/[id]/[path]"
      ) {
        try {
          const response = await axios.get(
            // `${config.serverUrl}/api/feed/groups/${postComingIn?.group}/${postComingIn?._id}`,
            `${config.serverUrl}/api/feed/${postComingIn?._id}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          // console.log("response.data:", response.data);
          setPostComingIn(response.data);
          setLiked(true);

          if (!likeChangedModal.includes(post?._id)) {
            dispatch(setLikeChangedModal(post?._id));
          }
        } catch (error) {
          // console.log(error);
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

        if (!likeChangedModal.includes(post?._id)) {
          dispatch(setLikeChangedModal(post?._id));
        }
      }
    } catch (error) {
      // console.log(error.response?.data);
    }
  };

  const handleLike = async () => {
    likeIt(true);
  };

  const postComment = async () => {
    const body = {
      content: commentPost,
    };

    if((body.content == "")){
      return toast.error('Comment cannot be empty', {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "1",})
    }
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
  };

  const handleBookMark = async () => {
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
  }

  const removeBookMark = async () => {
    try {
      await axios.delete(`${config.serverUrl}/api/bookmarks/?id=${post?._id}`, {
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

  const handleFollow = async (id) => {
    try {
      await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

  useEffect(()=>{
   // console.log(router.pathname);
    
    if(post.likes?.includes(user._id)){
      setLiked(true) 
    }
    if(user.bookmarks?.includes(post._id)){
      setBookMarked(true)
    }else{
      setBookMarked(false)
    }
    
  },[])


  return (
    <Row>
      <Col sm={12} md={12} lg={5} className = {styles.column}>
        
          {!trimmed && (
              <Image
                src={"/images/formbg.png"}
                alt={""}
                className = { styles.imgModal}
                fluid
              />
            )}
      </Col>

      <Col sm={12} md={12} lg={7} className = {styles.cardColumn}>
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
            className={`position-relative d-flex justify-content-start gap-2 pb-2 border-bottom ${styles.title}`}
          >
            <Image
              src={"/images/imagePlaceholder.jpg"}
              width={45}
              height={45}
              alt=""
              roundedCircle
              style={{ cursor: "pointer" }}
              onClick={redirectPage}
            />
            <div className="d-flex flex-column">
              <div
                className={styles.div}
                onClick={redirectPage}
                style={{ cursor: "pointer" }}
              >
                <span
                  style={{ fontWeight: 500, color: "var(--bs-primary)" }}
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(
                      `${post.author?.firstName} ${post.author?.lastName}`
                    ),
                  }}
                />
                <br />
                <small
                  style={{ marginTop: "10px", fontWeight: 400 }}
                >
                  <Age time={post?.createdAt} />
                </small>
              </div>
              <NavDropdown
                className={`position-absolute end-0 ${styles.dropdown}`}
                drop="down"
                title={
                  <Button variant="light" size="sm" className="dot-btn">
                    <HiDotsVertical />
                  </Button>
                }
              >
                <NavDropdown.Item className={styles.item}>
                  <RiClipboardFill /> &nbsp; Copy post link
                </NavDropdown.Item>
                <NavDropdown.Item className={styles.item}>
                  <BsFolderFill /> &nbsp; Open Post
                </NavDropdown.Item>
                <NavDropdown.Item className={styles.item}>
                  {" "}
                  <RiFlagFill /> &nbsp; Report post
                </NavDropdown.Item>
                <NavDropdown.Item className={styles.item}>
                  <BsXCircleFill /> &nbsp; Unfollow &nbsp;
                  {/* {post.name.split(" ")[0]} */}
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Card.Title>
          <Card.Body
            style={{
              cursor: "pointer",
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
                  </NavDropdown>
                </div>
              </div>
            </Card.Title>

            <Card.Body>
              {post && Object.keys(post).length !== 0 && (
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
              )}
            </div>
          </Card.Body>

          <Card.Footer className={`mx-1 d-flex justify-content-between bg-white ${styles.cardFooter}`}>
            {postButton.map((item, key) => (
              <Button
                key={key}
                // onClick={() => item.name === "Like" && handleLike()}
                variant="none"
                // disabled={item.name === "Like" && post.likes?.includes(user._id)}
                className="d-flex justify-content-center gap-1 align-items-center"
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
              <h6 style={{ fontWeight: "bolder" }}>
                Comments ({post?.comments?.length})
              </h6>
              <div className="row">
                <div className="col-12 mt-4">
                  {post?.comments?.length > 0 &&
                    post?.comments?.map((comment, index) => {
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