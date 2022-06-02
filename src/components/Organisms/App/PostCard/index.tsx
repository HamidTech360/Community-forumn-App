import Link from "next/link";
import strip from "striptags";
import React from "react";
import { Button, Card, Dropdown, Image, NavDropdown } from "react-bootstrap";
import { HiDotsVertical } from 'react-icons/hi'
import Age from "../../../Atoms/Age";

const PostCard = ({
  post,
  trimmed,
}: {
  post: Record<string, any>;
  trimmed?: Boolean;
}) => {
  const postButton = [
    {
      name: "Like",
      reaction: true,
    },
    {
      name: "Share",
      reaction: true,
    },
    {
      name: "Comment",
      reaction: true,
    },
    {
      name: "Bookmark",
      reaction: true,
    },
  ];
  return (
    <Card id={post?.id} className="my-3 post-card cards" style={{ border: "none" }}>
      <Card.Title className="position-relative mx-2 d-flex justify-content-start gap-2 p-2 border-bottom">
        <Image
          src={post?.user_avatar?.full}
          width={45}
          height={45}
          alt=""
          roundedCircle
        />
        <div className="d-flex flex-column">
          <small
            style={{ fontSize: "0.8rem" }}
            dangerouslySetInnerHTML={{ __html: post?.title }}
          />
          <span style={{ fontSize: "0.9rem" }}>
            <Age time={post?.date} />
          </span>
          <NavDropdown
            className="position-absolute end-0"
            drop="down"
            title={
              <Button variant="light" size="sm" className='dot-btn'>
               <HiDotsVertical />
              </Button>
            }
          >
            <NavDropdown.Item>
              <i className="bi bi-clipboard-fill" /> &nbsp; Copy post link
            </NavDropdown.Item>
            <NavDropdown.Item>
              <i className="bi bi-folder-fill" /> &nbsp; Open Post
            </NavDropdown.Item>
            <NavDropdown.Item>
              {" "}
              <i className="bi bi-flag-fill" /> &nbsp; Report post
            </NavDropdown.Item>
            <NavDropdown.Item>
              <i className="bi bi-x-circle-fill" /> &nbsp; Unfollow &nbsp;
              {post.name.split(" ")[0]}
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Card.Title>
      <Card.Body
        style={{
          cursor: "pointer",
        }}
      >
        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: trimmed
              ? strip(
                  post.content.rendered,
                  "<p> <strong> <b> <a> <em> <i>"
                )?.slice(0, 500) + "..."
              : post.content.rendered,
          }}
        />
        {!trimmed && (
          <Image
            className="d-none d-sm-block d-lg-none"
            style={{ borderRadius: 0 }}
            src={"/images/formbg.png"}
            fluid
            alt={""}
          />
        )}
      </Card.Body>

      <Card.Footer className="mx-2 d-flex justify-content-between bg-white">
        {postButton.map((item, key) => (
          <Button
            variant="none"
            className="d-flex justify-content-center gap-1 align-items-center"
          >
            <Image
              src={`/assets/icons/${item.name.toLowerCase()}.svg`}
              alt=""
              width={20}
              height={20}
              className = 'post-img'
            />
            <span className="d-none d-md-block">{item.name}</span>
          </Button>
        ))}
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
