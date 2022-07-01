import React from "react";
import { Card as ICard, Image } from "react-bootstrap";
import striptags from "striptags";
import Comment from "@/components/Organisms/App/Comment";

import Age from "@/components/Atoms/Age";
import DOMPurify from "dompurify";

const Card = ({
  post,
  trimmed,
  author,
}: // onNavigate,
{
  post: Record<string, any>;
  trimmed?: Boolean;
  author: any;
  // onNavigate?: (params?: any) => void;
}) => {
  return (
    <>
      <ICard
        id={post?.id}
        className="my-3 cards"
        style={{
          border: "none",
        }}
      >
        <div>
          <div
            className={`position-relative d-flex justify-content-start gap-2 pb-2 border-bottom`}
          >
            {/* <ICard.Title
            className={`position-relative d-flex justify-content-start gap-2 pb-2 border-bottom`}
          > */}
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
                    __html: `${post?.author?.firstName} ${post?.author?.lastName}`,
                  }}
                />
                <br />
                <span style={{ marginTop: "10px", fontSize: "13px" }}>
                  <Age time={post?.createdAt} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <ICard.Body>
          <>
            <h5
              // dangerouslySetInnerHTML={{
              //   __html:
              //     !trimmed &&
              //     (DOMPurify.sanitize(post?.postTitle) ||
              //       DOMPurify.sanitize(post?.title)),
              // }}
              dangerouslySetInnerHTML={{
                __html: (!trimmed && post?.postTitle) || post?.title,
              }}
            />
            <div
              // dangerouslySetInnerHTML={{
              //   __html: trimmed
              //     ? striptags(
              //         post?.postBody || post?.post,
              //         "<p> <strong> <b> <a> <em> <i>"
              //       )?.slice(0, 500) + "..."
              //     : post?.postTitle || post?.title,
              // }}
              // dangerouslySetInnerHTML={{
              //   __html: trimmed
              //     ? DOMPurify.sanitize(post?.postTitle) ||
              //       DOMPurify.sanitize(post?.title)
              //     : DOMPurify.sanitize(post?.postBody) ||
              //       DOMPurify.sanitize(post?.post),
              // }}
              dangerouslySetInnerHTML={{
                __html: trimmed
                  ? post?.postTitle || post?.title
                  : post?.postBody || post?.post,
              }}
            />
          </>

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
      </ICard>
    </>
  );
};

export default Card;
