import Link from "next/link";
import strip from "striptags";
import React from "react";
import { Button, Card, Dropdown, Image, NavDropdown } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { RiClipboardFill, RiFlagFill } from "react-icons/ri";
import { BsFolderFill, BsXCircleFill } from "react-icons/bs";

import Age from "../../../Atoms/Age";
import styles from '@/styles/profile.module.scss'

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
    <Card
      id={post?.id}
      className="my-3 cards"
      style={{
        border: "none",
        // padding: "-3rem",
      }}
    >
      <Card.Title
        className="position-relative d-flex justify-content-start gap-2 pb-2 border-bottom"
        style={{ marginLeft: "-1rem" }}
      >
        <Image
          src={post?.user_avatar?.full}
          width={45}
          height={45}
          alt=""
          roundedCircle
        />
        <div className="d-flex flex-column">
          <div className = { styles.div}>
            <small
              style={{ fontSize: "0.8rem" }}
              dangerouslySetInnerHTML={{ __html: post?.title }}
            />
            <span style={{ fontSize: "0.9rem" }}>
               <Age time={post?.date} />
            </span>
          </div>

          <NavDropdown
            className={`position-absolute end-0 ${ styles.dropdown}`}
            drop="down"
            title={
              <Button variant="light" size="sm" className="dot-btn">
                <HiDotsVertical />
              </Button>
            }
          >
            <NavDropdown.Item>
              <RiClipboardFill /> &nbsp; Copy post link
            </NavDropdown.Item>
            <NavDropdown.Item>
              <BsFolderFill /> &nbsp; Open Post
            </NavDropdown.Item>
            <NavDropdown.Item className = {styles.item}>
              {" "}
              <RiFlagFill /> &nbsp; Report post
            </NavDropdown.Item>
            <NavDropdown.Item className = {styles.item}>
              <i className='bi bi-x-circle-fill' /> &nbsp; Unfollow &nbsp;
              {post.name.split(" ")[15]}
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Card.Title>
      <Card.Body
        style={{
          cursor: "pointer",
          marginLeft: "-1.8rem",
          marginRight: "-1.8rem",
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
              // className="post-img"
            />
            <span className="d-none d-md-block">{item.name}</span>
          </Button>
        ))}
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
