/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Dropdown, Image, NavDropdown } from "react-bootstrap";
import { HiDotsVertical, HiOutlineArrowLeft } from "react-icons/hi";
import { BsDot, BsFolderFill, BsXCircleFill } from "react-icons/bs";
import Comment from "@/components/Organisms/App/Comment";
import { useRouter } from "next/router";
import Head from "next/head";
import Age from "@/components/Atoms/Age";
import config from "@/config";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectFollowing,
  user as userAuth,
  selectUser,
  setFollowers,
  setFollowing,
} from "@/reduxFeatures/authState/authStateSlice";
import {
  setPosts,
  selectPost,
  setShowPostModal,
  selectShowPostModal,
  setPostTitle,
  selectNewPost,
} from "@/reduxFeatures/api/postSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/profile.module.scss";
import { RiDeleteBin5Line, RiFlagFill, RiUserFollowFill } from "react-icons/ri";
import { setSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import ExplorePostEditorModal from "@/components/Organisms/App/ModalPopUp/ExplorePostEditorModal";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
import PostIsEdited from "@/components/Templates/PostIsEdited";

const BlogPost = () => {
  const user = useSelector(selectUser);
  const [blogPost, setBlogPost] = useState<Record<string, any>>({});
  const [followed, setFollowed] = useState(false);
  const [commentPost, setCommentPost] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const showPostModal = useSelector(selectShowPostModal);
  const postEdited = useSelector(selectNewPost);
  const router = useRouter();
  const { id } = router.query;
  const [queryId, setQueryId] = useState(id);
  const currentlyFollowing = useSelector(selectFollowing);

  useEffect(() => {
    // Re-Fetch Post After Editing Post
    if (postEdited !== null && postEdited !== undefined) {
      if (Object.keys(postEdited).length !== 0) {
        FetchData();
      }
    }
  }, [postEdited]);

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
    if (currentlyFollowing.includes(blogPost?.author?._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [blogPost, currentlyFollowing]);

  // Allow Rerender Bases On ID Change Even When Route Is Same Path
  if (id && id !== queryId) setQueryId(id);

  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: blogPost?.author?._id,
      },
    });
  };

  const FetchData = async () => {
    try {
      const exploreResponse = await axios.get(
        `${config.serverUrl}/api/posts/${router.query.id}`
      );
      setBlogPost(exploreResponse.data.post);
      // console.log("This is explore response", exploreResponse.data.post);
    } catch (error) {
      router.replace("/explore");
    }
  };

  const postComment = async () => {
    const body = {
      content: commentPost,
    };

    setLoading(true);
    const res = await axios.post(
      `${config.serverUrl}/api/comments?type=post&id=${router.query.id}`,
      body,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(res);
    let comments = blogPost?.comments;
    comments.unshift(res.data);
    setBlogPost({ ...blogPost, comments });
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, [queryId]);
  const likeComment = () => {};
  const replyComment = () => {};

  const handleDeletePost = async () => {
    try {
      const { data } = await axios.delete(
        `${config.serverUrl}/api/posts/${router.query.id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // console.log(data);
      router.push("/explore");
    } catch (error) {
      // console.log(error.response?.data);
    }
  };

  const handleEditPost = async (post) => {
    // Notify Slate Editor Of Post Editing
    dispatch(setSlatePostToEdit(post));

    if (router?.pathname.includes("explore") || router.asPath === "/explore") {
      // Open Blog Post Modal
      dispatch(setShowPostModal(true));
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
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center mt-4">
          <div
            className="col-12 col-md-1 justify-content-left align-items-top"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/explore")}
          >
            <HiOutlineArrowLeft className="h3" />
          </div>
          <hr className="d-md-none" />
          <div className="col-12 col-md-8">
            <div className="card mb-3 border-0 mt-md-2 p-md-4">
              <div className="card-Header text-center text-md-start">
                <div className="row">
                  <div className="col-7 col-lg-10">
                    {/* <h4 className="card-title text-primary"> */}
                    <h4 className="text-primary">{blogPost?.postTitle}</h4>
                  </div>
                  <div className="col-1">
                    <NavDropdown
                      drop="start"
                      style={{ marginTop: "-1rem", color: "white" }}
                      title={
                        <Button variant="link" size="sm">
                          <HiDotsVertical size={22} />
                        </Button>
                      }
                    >
                      {blogPost.author?._id === user?._id && (
                        <>
                          <NavDropdown.Item
                            className={styles.item}
                            style={{
                              borderBottom: "1px solid gray",
                            }}
                            onClick={() => handleEditPost(blogPost)}
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

                      {blogPost?.author?._id !== user?._id && (
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
                            onClick={async () =>
                              changeFollowingStatus(blogPost)
                            }
                          >
                            {followed ? (
                              <>
                                <BsXCircleFill />{" "}
                                <span id={`followStr-${blogPost?.author?._id}`}>
                                  Unfollow
                                </span>
                              </>
                            ) : (
                              <>
                                <RiUserFollowFill />{" "}
                                <span id={`followStr-${blogPost?.author?._id}`}>
                                  Follow
                                </span>
                              </>
                            )}{" "}
                            @{blogPost?.author?.firstName?.split(" ")[0]}
                            {blogPost?.author?.lastName?.substring(0, 1)}
                          </NavDropdown.Item>
                        </>
                      )}
                    </NavDropdown>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    By{" "}
                    <span onClick={redirectPage} style={{ cursor: "pointer" }}>
                      {" "}
                      {`${blogPost.author?.firstName} ${blogPost.author?.lastName}`}
                    </span>
                    <small className="text-secondary ms-5">
                      <BsDot />
                      {<Age time={blogPost?.createdAt} />}
                    </small>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-12">
                    <Image
                      src={blogPost.blogImage || "/images/formbg.png"}
                      className="img-fluid shadow-sm mt-2"
                      alt="Blog Post Image"
                    ></Image>
                  </div>
                </div>
              </div>
              <article
                className="my-3"
                dangerouslySetInnerHTML={{ __html: blogPost.postBody }}
              />

              <PostIsEdited post={blogPost} />

              <section>
                <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
                <div className="row">
                  <div className="col-2 col-md-2">
                    <Image
                      src={
                        blogPost.authorImage || "/images/imagePlaceholder.jpg"
                      }
                      className="img-fluid"
                      roundedCircle={true}
                      alt="Author's Image"
                    ></Image>
                  </div>
                  <div className="col-7 col-md-10">
                    {/* <div className="form-floating shadow"> */}
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
              <section>
                <h6 style={{ fontWeight: "bolder" }}>
                  Comments ({blogPost.comments?.length})
                </h6>
                <div className="row">
                  <div className="col-12 mt-4">
                    {blogPost.comments?.length > 0 &&
                      [...blogPost.comments].reverse().map((comment, index) => {
                        return (
                          <Comment
                            key={`blogPost_${index}`}
                            comment={comment}
                          />
                        );
                      })}
                  </div>
                </div>
              </section>

              {/* Open Editor Modal */}
              {showPostModal && <ExplorePostEditorModal pageAt="/explore" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
