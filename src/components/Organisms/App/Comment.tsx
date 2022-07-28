/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import Age from "../../Atoms/Age";
import DOMPurify from "dompurify";

import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import axios from 'axios'

const Comment = ({ comment }: Record<string, any>) => {
  const [liked, setLiked] = useState(false);
  const user = useSelector(selectUser);
  const router = useRouter();
  const sanitizer = DOMPurify.sanitize;

  const handleLike = async () => {
    try {
      const { data } = await axios.get(
        `${config.serverUrl}/api/likes/?type=comment&id=${comment?._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setLiked(true);
        console.log(liked)
      // window.location.reload();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const postButton = [
    {
      name: liked ? (<p>Liked</p>) : (<p onClick={() => handleLike()}>Like</p>),
      reaction: true,
    },
    {
      name: "replies",
      reaction: true
    }
  ]

  const [modalPost, setModalPost] = useState<Record<string, any>>({});
  const [commentPost, setCommentPost] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(false);

  const postComment = async () => {
    const body = {
      content: commentPost,
    };

   
    setLoading(true);
    const res = await axios.post(
      `${config.serverUrl}/api/comments?type=reply&id=.dskaf,dsfasdfdasf`,
      body,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(res);
    let comments = comment?.replies;
    comments?.unshift(res.data);
    setModalPost({ ...comment, comments });

    setLoading(false);
    setShowComment(false);
  };
  

  useEffect(()=>{
    // console.log(router.pathname);
     
     if(comment?.likes?.includes(user._id)){
       setLiked(true) 
     }
     
     
   },[])

  return (
    <Card
      className="px-2"
      style={{ border: "none", background: "none", lineHeight: "1.2" }}
    >
      <div className="d-flex align-items-center justify-content-start gap-2 mt-1">
        <Image
          src="/images/friends3.png"
          alt="User avatar"
          width={50}
          height={50}
          fluid
          roundedCircle
        />
        <div>
          <h6 style={{ fontWeight: "bold" }}>
            {comment?.author?.firstName && comment?.author?.firstName}{" "}
            {comment?.author?.lastName && comment?.author?.lastName}
          </h6>
          <small>
            <Age time={comment.createdAt} />
          </small>
        </div>
      </div>
      <Card.Body
        dangerouslySetInnerHTML={{
          __html: sanitizer(comment?.content),
        }}
      />
      <div className = "buttons d-flex gap-2 justify-content-end mr-4">
        {postButton.map((item, key) => (
          
        ))}
      </div>
      {/* <div className="buttons d-flex gap-2 justify-content-end mr-4">

       {liked ? (  <small className="text-muted"  style={{cursor: "pointer", fontWeight: 700}} >
          {comment.likes?.length > 0 && (
           <small className="badge rounded-pill bg-primary px-2 py-1 text-white">
             {comment.likes?.length}
           </small>
         )} Like
         
       </small>) : (  <small className="text-muted"  style={{cursor: "pointer" }} onClick = {() => handleLike()}>
          {comment.likes?.length > 0 && (
           <small className="badge rounded-pill bg-primary px-2 py-1 text-white">
             {comment.likes?.length}
           </small>
         )} Like
         
       </small>)}
        
        <small className="text-muted" onClick={() => setShowComment(!showComment)}>
          Reply{" "}
          {comment.replies?.length > 0 && (
            <small className="badge rounded-pill bg-primary px-2 py-1 text-white">
              {comment.replies?.length}
            </small>
          )}
        </small>
      </div> */}

      {showComment && (
        <section>
          <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
          <div className="row">
            <div className="col-2 col-md-2">
              <Image
                src={modalPost.authorImage || "/images/imagePlaceholder.jpg"}
                className="img-fluid"
                roundedCircle={true}
                alt="Author's Image"
              />
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
      )}
    </Card>
  );
};

export default Comment;
