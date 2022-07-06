/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { dummyData } from "@/components/BlogPost/dummyData";
import Comment from "@/components/Organisms/App/Comment";
import { useRouter } from "next/router";
import Head from "next/head";
import Age from "@/components/Atoms/Age";
import config from "@/config";
import DOMPurify from "dompurify"

const BlogPost = () => {
  const [blogPost, setBlogPost] = useState<Record<string, any>>({});
  const router = useRouter();

  const sanitizer = DOMPurify.sanitize;
  const FetchData = async () => {
    try {
      const exploreResponse = await axios.get(
        `${config.serverUrl}/api/posts/${router.query.id}`
      );
      setBlogPost(exploreResponse.data.post);
      console.log("exploreResponse.data.post:", exploreResponse.data.post);

      // const userResponse = await axios.get("/api/auth", {
      //   headers: {
      //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
      // });
      // setUser(userResponse.data);
      // console.log(userResponse.data);
      // console.log("user:", user);
    } catch (error) {
      router.back();
      // console.log(error.exploreResponse?.data);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);
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
                <h4 className="card-title text-primary">
                  {blogPost?.postTitle}
                </h4>
                <div className="row">
                  <div className="col-md-9">
                    By{" "}
                    <span>{`${blogPost.author?.firstName} ${blogPost.author?.lastName}`}</span>
                    <small className="text-secondary ms-5">
                      <BsDot />
                      {<Age time={blogPost?.createdAt} />}
                    </small>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {/* {blogPost.keywords.map((keyword, index) => {
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
                    })} */}
                  </div>
                </div>
                <Image
                  src={blogPost.blogImage || "/images/formbg.png"}
                  className="img-fluid shadow-sm mt-2"
                  alt="Blog Post Image"
                ></Image>
              </div>
              <article
                className="my-3"
                dangerouslySetInnerHTML={{ __html: blogPost.postBody}}
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
                  Comments ({blogPost.comments?.length})
                </h6>
                <div className="row">
                  <div className="col-12 mt-4">
                    {blogPost.comments?.length > 1 &&
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
