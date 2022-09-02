/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import Comment from "../../components/Organisms/App/Comment";
import Contributors from "../../components/Organisms/Gist/Contributors";
import GistCard from "../../components/Organisms/Gist/GistCard";
import axios from "axios";
import config from "@/config";

import { useDispatch, useSelector } from "@/redux/store";
import GistPostEditorModal from "@/components/Organisms/App/ModalPopUp/GistPostEditorModal";
import {
  selectGistData,
  selectShowGistModal,
  setTopContributors
} from "@/reduxFeatures/api/gistSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  user as userAuth,
  selectFollowing
} from "@/reduxFeatures/authState/authStateSlice";
import {
  setCommentIsDeleted,
  setEditableComment,
  setShowCommentModal
} from "@/reduxFeatures/app/postModalCardSlice";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import makeSecuredRequest, {
  deleteSecuredRequest
} from "@/utils/makeSecuredRequest";
import Avatar from "@/components/Atoms/Avatar";

const Gist = ({
  gist
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gist: Record<string, any>;
}) => {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Record<string, any>>({});
  const [commentPost, setCommentPost] = useState("");

  const [loading, setLoading] = useState(false);
  const showGistModal = useSelector(selectShowGistModal);
  const gistEdited = useSelector(selectGistData);
  const currentlyFollowing = useSelector(selectFollowing);
  const [queryId, setQueryId] = useState(id);

  // Allow Rerender Bases On ID Change Even When Route Is Same Path
  if (id && id !== queryId) setQueryId(id);

  useEffect(() => {
    // Re-Fetch Post After Editing Post
    if (gistEdited !== null && gistEdited !== undefined) {
      if (Object?.keys(gistEdited).length !== 0) {
        FetchData();
      }
    }
  }, [gistEdited]);

  useEffect(() => {
    FetchData();

    document.body.style.backgroundColor = "#f6f6f6";
    // console.log(replies);
    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, [queryId]);

  const FetchData = async () => {
    try {
      const response = await axios.get(
        `${config.serverUrl}/api/gists/${router.query.id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );

      setData(response.data.gist);
    } catch (error) {
      router.replace("/gist");
    }
  };

  useEffect(() => {
    // Top Contributors Logic
    if (data) {
      // Get Comment
      const arr = data?.comments;

      // Ensure Comment is not  undefined or null
      if (arr) {
        const counts = {};
        (async () => {
          // Comments
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await arr.forEach(async (element: Record<string, any>) => {
            const authorsName = `${element.author?.firstName} ${element.author?.lastName}`;
            const postReplies = element.replies;

            if (counts[authorsName]) {
              counts[authorsName] = {
                num: counts[authorsName]["num"] + 1,
                id: element.author._id
              };
            } else {
              counts[authorsName] = { num: 1, id: element.author._id };
            }

            // Replies
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await postReplies.forEach(async (reply: Record<string, any>) => {
              const commentReply = `${reply?.author?.firstName} ${reply?.author.lastName}`;
              const secondLevelReply = reply.replies;

              if (counts[commentReply]) {
                counts[commentReply] = {
                  num: counts[commentReply]["num"] + 1,
                  id: element.author._id
                };
              } else {
                counts[commentReply] = { num: 1, id: element.author._id };
              }

              // 2nd level replies
              await secondLevelReply.forEach(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                async (element: Record<string, any>) => {
                  const replyAuthorsName = `${element?.author?.firstName} ${element?.author?.lastName}`;

                  if (counts[replyAuthorsName]) {
                    counts[replyAuthorsName] = {
                      num: counts[replyAuthorsName]["num"] + 1,
                      id: element.author._id
                    };
                  } else {
                    counts[replyAuthorsName] = {
                      num: 1,
                      id: element.author._id
                    };
                  }
                }
              );
            });
          });
        })();

        // Split & Sort The Object Values Into An Array
        const sortedContributors = Object.entries(counts).sort(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ([, v1]: any, [, v2]: any) => v2.num - v1.num
        );
        dispatch(setTopContributors(sortedContributors));
      }
    }
  }, [data]);

  const postComment = async () => {
    try {
      const body = {
        content: commentPost
      };

      setLoading(true);
      const res = await axios.post(
        `${config.serverUrl}/api/comments?type=gist&id=${router.query.id}`,
        body,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      // console.log(res);
      const comments = data?.comments;
      comments?.unshift(res.data);
      setData({ ...data, comments });
      (document.getElementById("articleTextarea") as HTMLInputElement).value =
        "";

      setLoading(false);
    } catch (error) {
      console.error(error);
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
      // let confirmUnFollow = window.confirm(
      //   `Un-Follow ${post?.author?.firstName} ${post?.author?.lastName}`
      // );
      // if (confirmUnFollow) {
      handleUnFollow(post?.author?._id);
      // }
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

  const handleEditComment = async comment => {
    // Send Comment To Be Edited To CommentModal
    dispatch(setEditableComment(comment));
    // Show Edit Comment Modal
    dispatch(setShowCommentModal(true));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteComment = async (comment: Record<string, any>) => {
    try {
      await axios.delete(`${config.serverUrl}/api/comments/${comment._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      dispatch(setCommentIsDeleted(comment._id));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <Container>
      <Head>
        <title>{gist?.title.raw.replace("&amp;", "&")}</title>
      </Head>
      <ToastContainer />
      <Row>
        <Col md={3} className="d-none d-md-inline">
          <Contributors data={data} />
        </Col>
        <Col md={9}>
          <GistCard gist={data} primary />
          <section>
            <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
            <div className="row">
              <div className="col-2 col-md-2">
                <Avatar src={user?.images?.avatar} name={user?.firstName} />
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
              Comments ({data?.comments?.length})
            </h6>
            <div className="row">
              <div className="col-12 mt-4">
                {data?.comments?.length > 0 &&
                  [...data?.comments].reverse().map((comment, index) => {
                    return (
                      <Comment
                        key={`data_${index}`}
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
        </Col>
      </Row>

      {/* Open Editor Modal */}
      {showGistModal && <GistPostEditorModal pageAt="/gist" />}
      {/* Open Comment Modal */}
    </Container>
  );
};

export default Gist;
