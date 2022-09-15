/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import Comment from "@/components/Organisms/App/Comment";
import { useRouter } from "next/router";
import Head from "next/head";
import Age from "@/components/Atoms/Age";
import config from "@/config";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectFollowing,
  user as userAuth,
  selectUser,
  setFollowing
} from "@/reduxFeatures/authState/authStateSlice";
import {
  setShowPostModal,
  selectShowPostModal,
  selectNewPost
} from "@/reduxFeatures/api/postSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import ExplorePostEditorModal from "@/components/Organisms/App/ModalPopUp/ExplorePostEditorModal";
import makeSecuredRequest, {
  deleteSecuredRequest
} from "@/utils/makeSecuredRequest";
import PostIsEdited from "@/components/Templates/PostIsEdited";
import { PostMenu } from "@/components/Organisms/App/PostMenu";
import {
  setCommentIsDeleted,
  setEditableComment,
  setShowCommentModal
} from "@/reduxFeatures/app/postModalCardSlice";
import MediaDisplay from "../../components/Organisms/App/MediaMasonry";

const BlogPost = () => {
  const user = useSelector(selectUser);
  const [blogPost, setBlogPost] = useState<Record<string, any>>({});

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
      const currentlyFollowing = user.following.map(follow => {
        return follow._id;
      });
      dispatch(setFollowing(currentlyFollowing));
    }
  }, [user]);

  // Allow Rerender Bases On ID Change Even When Route Is Same Path
  if (id && id !== queryId) setQueryId(id);

  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: blogPost?.author?._id
      }
    });
  };

  const FetchData = async () => {
    try {
      const exploreResponse = await axios.get(
        `${config.serverUrl}/api/posts/${router.query.id}`
      );
      setBlogPost(exploreResponse.data.post);
      // console.log("This is explore response", exploreResponse.data);
    } catch (error) {
      router.replace("/explore");
    }
  };

  const postComment = async () => {
    const body = {
      content: commentPost
    };

    setLoading(true);
    const res = await axios.post(
      `${config.serverUrl}/api/comments?type=post&id=${router.query.id}`,
      body,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );
    // console.log(res);
    const comments = blogPost?.comments;
    comments.unshift(res.data);
    setBlogPost({ ...blogPost, comments });
    setLoading(false);
    (document.getElementById("articleTextarea") as HTMLInputElement).value = "";
  };

  useEffect(() => {
    FetchData();
  }, [queryId]);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${config.serverUrl}/api/posts/${router.query.id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      router.back();
    } catch (error) {
      // console.log(error.response?.data);
    }
  };

  const handleEditPost = async post => {
    // Notify Slate Editor Of Post Editing
    dispatch(setSlatePostToEdit(post));

    if (router?.pathname.includes("explore") || router.asPath === "/explore") {
      // Open Blog Post Modal
      dispatch(setShowPostModal(true));
    }
  };

  const handleEditComment = async comment => {
    // Send Comment To Be Edited To CommentModal
    dispatch(setEditableComment(comment));
    // Show CommentModal Editor
    dispatch(setShowCommentModal(true));
  };

  const handleDeleteComment = async comment => {
    // console.log("DelETE NOW");

    // console.log("comment:", comment);
    // console.log("comment._id:", comment?._id);
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
    } catch (error) {
      // Revert on axios  failure
    }
  };

  const handleUnFollow = async id => {
    // Preset following

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
      // Revert on axios  failure
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
            onClick={() => router.back()}
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
                    {/* Menu Dots */}
                    <PostMenu
                      user={user}
                      currentlyFollowing={currentlyFollowing}
                      post={blogPost}
                      handleEditPost={handleEditPost}
                      handleDeletePost={handleDeletePost}
                      changeFollowingStatus={changeFollowingStatus}
                    />
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
                {/* Display Feature Image */}
                <div className="row justify-content-center">
                  <div className="col-12">
                    <MediaDisplay media={blogPost.media} breakPoint={2} />
                  </div>
                </div>
              </div>
              <article
                className="my-3"
                style={{
                  textAlign: "justify"
                }}
                dangerouslySetInnerHTML={{ __html: blogPost.postBody }}
              />

              <PostIsEdited post={blogPost} />

              <section>
                <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
                <div className="row">
                  <div className="col-2 col-md-2">
                    <Image
                      src={
                        user?.images.avatar || "/images/imagePlaceholder.jpg"
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
                        onChange={e => setCommentPost(e.target.value)}
                        style={{ height: "100px" }}
                      ></textarea>
                      {/* <label htmlFor="articleTextarea">Comments</label> */}
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
                          // <Comment
                          //   key={`blogPost_${index}`}
                          //   comment={comment}
                          // />
                          <Comment
                            key={`blogPost_${index}`}
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
