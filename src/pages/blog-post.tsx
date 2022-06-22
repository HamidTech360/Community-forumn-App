import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { dummyData } from "../components/BlogPost/dummyData";
import Comment from "../components/Organisms/App/Comment";
import { useRouter } from "next/router";
import Head from "next/head";

const BlogPost = () => {
  const [blogPost, setBlogPost] = useState(dummyData);
  const router = useRouter();

  const addComment = () => {
    const content = (
      document.getElementById("articleTextarea") as HTMLTextAreaElement
    ).value;

    let newComment = {
      name: "Elisabet Lusi",
      image: "/images/friends3.png",
      date: new Date(),
      content,
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
                <h4 className="card-title text-primary">{blogPost.title}</h4>
                <div className="row">
                  <div className="col-md-9">
                    By <span>{blogPost.author}</span>
                    <small className="text-secondary ms-5">
                      <BsDot />
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
                  className="img-fluid shadow-sm mt-2"
                  alt="Blog Post Image"
                ></Image>
              </div>
              <article className="my-3">{blogPost.article}</article>
              <section>
                <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
                <div className="row">
                  <div className="col-2 col-md-2">
                    <Image
                      src={blogPost.authorImage}
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
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="articleTextarea">Comments</label>
                    </div>
                  </div>
                  <div className="col-3 col-md-2 ms-auto d-md-grid">
                    <button
                      className="btn btn-sm btn-primary mt-3 d-inline"
                      onClick={addComment}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </section>
              <section>
                <h6 style={{ fontWeight: "bolder" }}>
                  Comments ({blogPost.comments.length})
                </h6>
                <div className="row">
                  <div className="col-12 mt-4">
                    {blogPost.comments.length > 1 &&
                      blogPost.comments.map((comment, index) => {
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
