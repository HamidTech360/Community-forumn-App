import Link from "next/link";
import strip from "striptags";
import React, { useEffect } from "react";
import { Button, Card, Dropdown, Image, NavDropdown } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { RiClipboardFill, RiFlagFill } from "react-icons/ri";
import { BsFolderFill, BsXCircleFill } from "react-icons/bs";
import Age from "../../../Atoms/Age";
import DOMPurify from "dompurify";
import styles from "@/styles/profile.module.scss";
import axios from "axios";
import config from "@/config";
import { useDispatch } from "react-redux";
import {
  selectPost,
  setIsFetching,
  setPosts,
} from "@/reduxFeatures/api/postSlice";
import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import { useRouter } from "next/router";

const PostCard = ({
  post,
  trimmed,
}: {
  post: Record<string, any>;
  trimmed?: Boolean;
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const posts = useSelector(selectPost);
  const router = useRouter();
  const sanitizer = DOMPurify.sanitize;
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

  const redirectPage = () => {

    router.push({
      pathname: `/profile/[id]`,
      query: { 
        id: post?.author?._id,
      },
    })
  }

  const handleLike = async () => {
    try {
      const { data } = await axios.get(
        `${config.serverUrl}/api/posts/${post._id}/like`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
          style={{cursor: "pointer" }}
          onClick={redirectPage}
        />
        <div className="d-flex flex-column">
          <div className={styles.div} onClick={redirectPage} style={{cursor: "pointer" }}>
           <small dangerouslySetInnerHTML={{
              __html: sanitizer(`${post.author?.firstName} ${post.author?.lastName}`),
            }} />
            <br />
            <span style={{ marginTop: "10px" }}>
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
        {Object.keys(post).length !== 0 && (
          <div
            className="post-content"
            // dangerouslySetInnerHTML={{
            //   __html: trimmed
            //     ? (
            //         DOMPurify.sanitize(post?.postBody) ||
            //         DOMPurify.sanitize(post?.post)
            //       )?.slice(0, 500) + "..."
            //     : DOMPurify.sanitize(post?.postTitle) ||
            //       DOMPurify.sanitize(post?.postTitle),
            // }}
            dangerouslySetInnerHTML={{
              __html: sanitizer(trimmed
                ? post?.postBody || post?.post?.slice(0, 500) + "..."
                : post?.postTitle || post?.postTitle),
            }}
          />
        )}
        {/* <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: trimmed
              ? strip(
                  post?.postBody || post?.post,
                  "<p> <strong> <b> <a> <em> <i>"
                )?.slice(0, 500) + "..."
              : post.postTitle || post.postTitle,
          }}
        /> */}

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

      <Card.Footer className="mx-1 d-flex justify-content-between bg-white">
        {postButton.map((item, key) => (
          <Button
            key={key}
            onClick={() => item.name === "Like" && handleLike()}
            variant="none"
            disabled={item.name === "Like" && post.likes?.includes(user._id)}
            className="d-flex justify-content-center gap-1 align-items-center"
          >
            <Image
              src={`/assets/icons/${item.name.toLowerCase()}.svg`}
              alt=""
              width={20}
              height={20}
              className="post-img"
            />
            {item.name === "Like" && (
              <span className="mx-2 text-secondary">
                {post.likes?.length || 0}
              </span>
            )}

            <span className="d-none d-md-block">{item.name}</span>
          </Button>
        ))}
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
