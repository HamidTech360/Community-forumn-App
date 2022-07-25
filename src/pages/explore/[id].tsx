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
import DOMPurify from "dompurify";

const BlogPost = () => {
  const [blogPost, setBlogPost] = useState<Record<string, any>>({});

  const [commentPost, setCommentPost] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const [queryId, setQueryId] = useState(id);
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

  const sanitizer = DOMPurify.sanitize;
  const FetchData = async () => {
    try {
      const exploreResponse = await axios.get(
        `${config.serverUrl}/api/posts/${router.query.id}`
      );
      setBlogPost(exploreResponse.data.post);
      console.log("This is explore response", exploreResponse.data.post);
    } catch (error) {
      router.back();
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

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
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
                <h4 className="card-title text-primary">
                  {blogPost?.postTitle}
                </h4>
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
                <div className="row">
                  <div className="col"></div>
                </div>
                <Image
                  src={blogPost.blogImage || "/images/formbg.png"}
                  className="img-fluid shadow-sm mt-2"
                  alt="Blog Post Image"
                ></Image>
              </div>
              <article
                className="my-3"
                dangerouslySetInnerHTML={{ __html: blogPost.postBody }}
              />
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
              <section>
                <h6 style={{ fontWeight: "bolder" }}>
                  Comments ({blogPost.comments?.length})
                </h6>
                <div className="row">
                  <div className="col-12 mt-4">
                    {blogPost.comments?.length > 0 &&
                      blogPost.comments?.map((comment, index) => {
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
