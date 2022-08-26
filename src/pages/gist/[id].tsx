/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Col, Container, Image, Row } from "react-bootstrap";
import Comment from "../../components/Organisms/App/Comment";
import Contributors from "../../components/Organisms/Gist/Contributors";
import GistCard from "../../components/Organisms/Gist/GistCard";
import axios from "axios";
import styles from "@/styles/gist.module.scss";
import config from "@/config";

import { useDispatch, useSelector } from "@/redux/store";
import GistPostEditorModal from "@/components/Organisms/App/ModalPopUp/GistPostEditorModal";
import {
  selectGistData,
  selectShowGistModal,
  setTopContributors,
} from "@/reduxFeatures/api/gistSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  user as userAuth,
  selectFollowing,
} from "@/reduxFeatures/authState/authStateSlice";
import {
  selectShowCommentModal,
  setCommentIsDeleted,
  setEditableComment,
  setShowCommentModal,
} from "@/reduxFeatures/app/postModalCardSlice";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
import CommentModal from "@/components/Organisms/App/ModalPopUp/CommentModal";

const Gist = ({
  gist,
  replies,
  contributors,
}: {
  gist: Record<string, any>;
  replies: Record<string, any>[];
  contributors: { name: string; avatar: string }[];
}) => {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const [data, setData] = useState<Record<string, any>>({});
  const [commentPost, setCommentPost] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const showGistModal = useSelector(selectShowGistModal);
  const gistEdited = useSelector(selectGistData);
  const currentlyFollowing = useSelector(selectFollowing);
  const [queryId, setQueryId] = useState(id);
  const showCommentModal = useSelector(selectShowCommentModal);

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
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
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
          await arr.forEach(async (element) => {
            let authorsName = `${element.author.firstName} ${element.author.lastName}`;
            let postReplies = element.replies;

            if (counts[authorsName]) {
              counts[authorsName] = {
                num: counts[authorsName]["num"] + 1,
                id: element.author._id,
              };
            } else {
              counts[authorsName] = { num: 1, id: element.author._id };
            }

            // Replies
            await postReplies.forEach(async (reply) => {
              let commentReply = `${reply.author.firstName} ${reply.author.lastName}`;
              let secondLevelReply = reply.replies;

              if (counts[commentReply]) {
                counts[commentReply] = {
                  num: counts[commentReply]["num"] + 1,
                  id: element.author._id,
                };
              } else {
                counts[commentReply] = { num: 1, id: element.author._id };
              }

              // 2nd level replies
              await secondLevelReply.forEach(async (element) => {
                let replyAuthorsName = `${element.author.firstName} ${element.author.lastName}`;

                if (counts[replyAuthorsName]) {
                  counts[replyAuthorsName] = {
                    num: counts[replyAuthorsName]["num"] + 1,
                    id: element.author._id,
                  };
                } else {
                  counts[replyAuthorsName] = { num: 1, id: element.author._id };
                }
              });
            });
          });
        })();

        // Split & Sort The Object Values Into An Array
        const sortedContributors = Object.entries(counts).sort(
          ([, v1]: any, [, v2]: any) => v2.num - v1.num
        );
        dispatch(setTopContributors(sortedContributors));
      }
    }
  }, [data]);

  const postComment = async () => {
    try {
      const body = {
        content: commentPost,
      };

      setLoading(true);
      const res = await axios.post(
        `${config.serverUrl}/api/comments?type=gist&id=${router.query.id}`,
        body,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // console.log(res);
      let comments = data?.comments;
      comments?.unshift(res.data);
      setData({ ...data, comments });
      (document.getElementById("articleTextarea") as HTMLInputElement).value =
        "";

      setLoading(false);
      setShowComment(false);
    } catch (error) {
      console.error(error);
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

  const handleEditComment = async (comment) => {
    // Send Comment To Be Edited To CommentModal
    dispatch(setEditableComment(comment));
    // Show Edit Comment Modal
    dispatch(setShowCommentModal(true));
  };

  const handleDeleteComment = async (comment) => {
    console.log("DelETE NOW");
    // const newPosts = comment.filter((el) => el._id !== comment._id);
    // console.log("comment:", comment);
    try {
      const { data } = await axios.delete(
        `${config.serverUrl}/api/comments/${comment._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

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
        <Col md={4} className="desktop-only">
          <Contributors data={data} />
        </Col>
        <Col md={8}>
          <GistCard gist={data} primary />
          <section>
            <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
            <div className="row">
              <div className="col-2 col-md-2">
                <Image
                  src={user?.images?.avatar || "/images/imagePlaceholder.jpg"}
                  className="img-fluid"
                  roundedCircle={true}
                  alt="Author's Image"
                />
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
              Comments ({data?.comments?.length})
            </h6>
            <div className="row">
              <div className="col-12 mt-4">
                {data?.comments?.length > 0 &&
                  [...data?.comments].reverse().map((comment, index) => {
                    // return <Comment key={`data_${index}`} comment={comment} />;
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
          {/* <h5 className={`px-2 m-2 ${styles.comment}`}>Comments({data?.comments?.length})</h5>
          <div className="mt-2">
            {replies?.map((reply, key) => (
              <Comment comment={reply} key={`comment-${key}`} />
            ))}
          </div> */}
        </Col>
      </Row>

      {/* Open Editor Modal */}
      {showGistModal && <GistPostEditorModal pageAt="/gist" />}
      {/* Open Comment Modal */}
      {/* {showCommentModal && <CommentModal />} */}
    </Container>
  );
};

// export async function getStaticPaths() {
//   const ids = await fetch(`${process.env.REST}/buddyboss/v1/topics?_fields=id`);

//   let paths = await ids.json();
//   paths = paths.map((id: Record<string, any>) => {
//     return {
//       params: {
//         id: id.id.toString(),
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export const getStaticProps = async ({
//   params,
// }: {
//   params: Partial<Record<string, string>>;
// }) => {
//   const gist = await (
//     await fetch(
//       `${process.env.REST}/buddyboss/v1/topics/${params.id}?_embed=user`,
//       {
//         method: "GET",
//       }
//     )
//   ).json();

//   let replies: Record<string, any>[] = await (
//     await fetch(
//       `${process.env.REST}/buddyboss/v1/reply?parent=${params.id}&per_page=10&_embed=user&_fields=_links,_embedded,link,id,date,content`
//     )
//   ).json();

//   let [] = [
//     {
//       name: gist._embedded.user[0].name,
//       avatar: gist?._embedded?.user[0]?.avatar_urls.full,
//     },
//   ];

//   replies.forEach((reply) => {
//     const newReply = JSON.stringify({
//       name: reply?._embedded?.user[0].name,
//       avatar:
//         reply?._embedded?.user[0]?.avatar_urls?.full || "/images/formbg.png",
//     });

//     if (!contributors.find(({ name }) => name === JSON.parse(newReply).name)) {
//       contributors.push(JSON.parse(newReply));
//     }
//   });

//   return {
//     props: {
//       gist,
//       replies,
//       contributors,
//     },
//   };
// };
export default Gist;
