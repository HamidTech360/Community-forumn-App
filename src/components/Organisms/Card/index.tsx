import React, {useState} from 'react'
import { 
    Card as ICard,
    Image 
} from 'react-bootstrap'
import { dummyData } from './dummyData'
import { BsDot } from "react-icons/bs";
import striptags from "striptags";
import Comment from "@/components/Organisms/App/Comment";

import Age from "@/components/Atoms/Age";


const Card = ( {post,
    trimmed,
    author,
    // onNavigate,
  }: {
    post: Record<string, any>;
    trimmed?: Boolean;
    author: any;
    // onNavigate?: (params?: any) => void;
  }) => {

  const [explorePost, setExplorePost] = useState(dummyData);

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

    let comments = explorePost.comments;
    comments.unshift(newComment);
    setExplorePost({ ...explorePost, comments });
  };

  const likeComment = () => {};
  const replyComment = () => {};

  return (
    <>
     <div className="container" id={post?.id}>
        <div className="row justify-content-center mt-4">
        
          <hr className="d-md-none" />
          <div className="col-12 col-md-8">
            <div className="card mb-3 border-0 mt-md-2 p-md-4">
              <div className="card-Header text-center text-md-start">
                <h4 className="card-title text-primary">{post?.postTitle}</h4>
                <div className="row">
                  <div className="col-md-9">
                    By <span dangerouslySetInnerHTML={{
                                __html: `${author?.firstName} ${author?.lastName}`,
                            }} />
                    <small className="text-secondary ms-5">
                      <BsDot />
                      {
                        <Age
                          time={post?.createdAt}
                        />
                      }
                    </small>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {explorePost.keywords.map((keyword, index) => {
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
                  src="/assets/blog-post/pana.svg"
                  className="img-fluid shadow-sm mt-2"
                  alt="Blog Post Image"
                ></Image>
              </div>
              <article className="my-3" dangerouslySetInnerHTML={{
                            __html: trimmed
              
                              ? striptags(
                                  post?.postBody || post?.post,
                                  "<p> <strong> <b> <a> <em> <i>"
                                )?.slice(0, 500) + "..."
                              : post?.postTitle || post?.title
              
                          }} />
              <section>
                <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
                <div className="row">
                  <div className="col-2 col-md-2">
                    <Image
                      src={"/images/imagePlaceholder.jpg"}
                      width={45}
                      height={45}
                      alt=""
                      roundedCircle
                    />
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
                  Comments ({explorePost.comments.length})
                </h6>
                <div className="row">
                  <div className="col-12 mt-4">
                    {explorePost.comments.length > 1 &&
                      explorePost.comments.map((comment, index) => {
                        return (
                          <Comment
                            key={`explorePost_${index}`}
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
        {/* <ICard
        id={post?.id}
        className="my-3 cards"
        style={{
          border: "none",
        }}>
            <div>
                <ICard.Title
                    className={`position-relative d-flex justify-content-start gap-2 pb-2 border-bottom`}
                >
                    <Image
                    src={"/images/imagePlaceholder.jpg"}
                    width={45}
                    height={45}
                    alt=""
                    roundedCircle
                    />
                    <div className="d-flex flex-column">
                    <div>
                            <small
                            dangerouslySetInnerHTML={{
                                __html: `${author?.firstName} ${author?.lastName}`,
                            }}
                            />
                            <br />
                            <span style={{ marginTop: "10px", fontSize: "13px" }}>
                            <Age time={post?.createdAt} />
                            </span>
                        </div>
                    </div>
                </ICard.Title>
            </div>
            <ICard.Body>
                

                <ICard.Text>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: trimmed
              
                              ? striptags(
                                  post?.postBody || post?.post,
                                  "<p> <strong> <b> <a> <em> <i>"
                                )?.slice(0, 500) + "..."
                              : post?.postTitle || post?.title
              
                          }}
                    />
                </ICard.Text>

                {!trimmed && (
                <Image
                    className="d-none d-sm-block d-lg-none"
                    style={{ borderRadius: 0 }}
                    src={"/images/formbg.png"}
                    fluid
                    alt={""}
                />
                )}
                
            </ICard.Body>
        </ICard> */}
    </>
  )
}

export default Card