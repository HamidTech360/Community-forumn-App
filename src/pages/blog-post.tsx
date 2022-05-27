import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { dummyData } from "../components/BlogPost/dummyData";

const BlogPost = () => {
  const [blogPost, setBlogPost] = useState(dummyData);

  const addComment = () => {
    const comment = (
      document.getElementById("articleTextarea") as HTMLTextAreaElement
    ).value;

    let newComment = {
      name: "Elisabet Lusi",
      image: "/images/friends3.png",
      time: new Date(),
      comment,
      like: [],
      reply: [],
    };

    let comments = blogPost.comments;
    comments.unshift(newComment);
    setBlogPost({ ...blogPost, comments });
  };

  const likeComment = () => {};
  const replyComment = () => {};

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        <div
          className="col-1 justify-content-left align-items-top"
          style={{ cursor: "pointer" }}
        >
          <HiOutlineArrowLeft className="h3" />
        </div>
        <div className="col-7">
          <div className="card mb-3 border-0">
            <div className="card-Header">
              <h4 className="card-title text-primary">{blogPost.title}</h4>
              <div className="row">
                <div className="col-md-3">
                  <p>
                    By <span>{blogPost.author}</span>
                  </p>
                </div>
                <div className="col-md-3">
                  <BsDot />
                  <small className="text-secondary">
                    {blogPost.time.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </small>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {blogPost.keywords.map((keyword, index) => {
                    return (
                      <div
                        key={index}
                        className="d-inline-flex text-secondary me-2 p-1"
                        style={{
                          fontSize: "14px",
                          backgroundColor: "lightgray",
                          cursor: "pointer",
                        }}
                      >
                        <small>{keyword}</small>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Image
                src={blogPost.blogImage}
                className="img-fluid"
                alt="Blog Post Image"
              ></Image>
            </div>
            <article className="my-3">{blogPost.article}</article>
            <section>
              <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
              <div className="row">
                <div className="col-md-2">
                  <Image
                    src={blogPost.authorImage}
                    className="img-fluid"
                    roundedCircle={true}
                    alt="Author's Image"
                  ></Image>
                </div>
                <div className="col-md-10">
                  <div className="form-floating">
                    <textarea
                      id="articleTextarea"
                      className="form-control"
                      placeholder="."
                      style={{ height: "100px" }}
                    ></textarea>
                    <label htmlFor="articleTextarea">Comments</label>
                    <button
                      className="btn btn-sm btn-primary mt-2"
                      onClick={addComment}
                    >
                      Add a comment
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section className="">
              <h6 style={{ fontWeight: "bolder" }}>
                Comments ({blogPost.comments.length})
              </h6>
              <div className="row">
                <div className="col mt-4">
                  {blogPost.comments.length > 1 &&
                    blogPost.comments.map((comment, index) => {
                      return (
                        <div className="row mb-4" key={index}>
                          <div className="col-md-2">
                            <Image
                              src={comment.image}
                              className="img-fluid"
                              roundedCircle={true}
                              alt="Author's Image"
                            ></Image>
                          </div>
                          <div className="col-md-10">
                            <div className="row">
                              <div
                                className="col-md-12 h6"
                                style={{ fontWeight: "bold" }}
                              >
                                {comment.name}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="col-md-12 text-secondary"
                                style={{ fontSize: "14px" }}
                              >
                                {comment.time.toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <p>{comment.comment}</p>
                            </div>
                          </div>
                          <div className="row justify-content-end mb-3">
                            <div className="col-12 col-lg-2 text-muted mb-1">
                              <div
                                onClick={likeComment}
                                style={{ cursor: "pointer" }}
                              >
                                like{" "}
                                {comment.like.length > 0 && (
                                  <span className="badge rounded-pill bg-primary">
                                    {comment.like.length}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-12 col-lg-2 text-muted">
                              <div
                                onClick={replyComment}
                                style={{ cursor: "pointer" }}
                              >
                                reply{" "}
                                {comment.reply.length > 0 && (
                                  <span className="badge rounded-pill bg-primary">
                                    {comment.reply.length}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
