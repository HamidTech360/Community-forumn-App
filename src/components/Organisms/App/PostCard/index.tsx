import Link from "next/link";
import strip from "striptags";
import React from "react";
import { Button, Card, Dropdown, Image, NavDropdown } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { RiClipboardFill, RiFlagFill } from "react-icons/ri";
import { BsFolderFill, BsXCircleFill } from "react-icons/bs";
import Age from "../../../Atoms/Age";
import styles from "@/styles/profile.module.scss";
const PostCard = ({
  post,
  trimmed,
  author,
}: {
  post: Record<string, any>;
  trimmed?: Boolean;
  author: any;
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
        width: "100%",
        // padding: "-3rem",
      }}
    >
      <Card.Title
        className={`position-relative d-flex justify-content-start gap-2 pb-2 border-bottom ${styles.title}`}
      >
        <Image
          src={"/images/imagePlaceholder.jpg"}
          width={45}
          height={45}
          alt=""
          roundedCircle
        />
        <div className="d-flex flex-column">
          <div className={styles.div}>
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

          <NavDropdown
            className={`position-absolute end-0 ${styles.dropdown}`}
            drop="down"
            title={
              <Button variant="light" size="sm" className="dot-btn">
                <HiDotsVertical />
              </Button>
            }
          >
            <NavDropdown.Item className={styles.item}>
              <RiClipboardFill /> &nbsp; Copy post link
            </NavDropdown.Item>
            <NavDropdown.Item className={styles.item}>
              <BsFolderFill /> &nbsp; Open Post
            </NavDropdown.Item>
            <NavDropdown.Item className={styles.item}>
              {" "}
              <RiFlagFill /> &nbsp; Report post
            </NavDropdown.Item>
            <NavDropdown.Item className={styles.item}>
              <BsXCircleFill /> &nbsp; Unfollow &nbsp;
              {/* {post.name.split(" ")[0]} */}
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
                    post?.postBody || post?.post,
                    "<p> <strong> <b> <a> <em> <i>"
                  )?.slice(0, 500) + "..."
                : post.postTitle || post.title

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
            key={key}
            variant="none"
            className="d-flex justify-content-center gap-1 align-items-center"
          >
            <Image
              src={`/assets/icons/${item.name.toLowerCase()}.svg`}
              alt=""
              width={20}
              height={20}
              className="post-img"
            />
            <span className="d-none d-md-block">{item.name}</span>
          </Button>
        ))}
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
