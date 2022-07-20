import Link from "next/link";
import strip from "striptags";
import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Image, NavDropdown } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { RiClipboardFill, RiFlagFill } from "react-icons/ri";
import {
  BsFolderFill,
  BsXCircleFill,
  BsFillBookmarkFill,
  BsBookmark,
} from "react-icons/bs";
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
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
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookMarked] = useState(false);
  const sanitizer = DOMPurify.sanitize;
  const postButton = [
    {
      name: "Like",
      reaction: true,
      icon: liked ? (
        <AiFillLike color="#086a6d " size={25} />
      ) : (
        <AiOutlineLike size={25} onClick={() => handleLike()} />
      ),
    },
    {
      name: "Share",
      reaction: true,
      icon: <AiOutlineShareAlt size={25} />,
    },
    {
      name: "Comment",
      reaction: true,
      icon: <FaCommentDots size={20} />,
    },
    {
      name: "Bookmark",
      reaction: true,
      icon: bookmarked ? (
        <BsFillBookmarkFill color="#086a6d " onClick={() => removeBookMark()} />
      ) : (
        <BsBookmark onClick={() => handleBookMark()} />
      ),
    },
  ];

  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: post?.author?._id,
      },
    });
  };

  const handleLike = async () => {
    let type;
    const currentRoute = router.pathname;
    if (currentRoute == "/feed") {
      type = "feed";
    } else if (
      currentRoute == "/groups" ||
      currentRoute == "/groups/[id]/[path]"
    ) {
      type = "post";
    } else if (currentRoute.includes("profile")) {
      type = "post";
    }

    console.log(type, currentRoute);

    try {
      const { data } = await axios.get(
        `${config.serverUrl}/api/likes/?type=${type}&id=${post._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setLiked(true);

      // window.location.reload();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleBookMark = async () => {
    try {
      const { data } = await axios.post(
        `${config.serverUrl}/api/bookmarks/?id=${post._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      //console.log(data);
      setBookMarked(true);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const removeBookMark = async () => {
    try {
      const { data } = await axios.delete(
        `${config.serverUrl}/api/bookmarks/?id=${post._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      //console.log(data);
      setBookMarked(false);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    // console.log(router.pathname);

    if (post.likes?.includes(user._id)) {
      setLiked(true);
    }
    if (user.bookmarks?.includes(post._id)) {
      setBookMarked(true);
    } else {
      setBookMarked(false);
    }
  }, []);

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
          style={{ cursor: "pointer" }}
          onClick={redirectPage}
        />
        <div className="d-flex flex-column">
          <div
            className={styles.div}
            onClick={redirectPage}
            style={{ cursor: "pointer" }}
          >
            <span
              style={{ fontWeight: 500, color: "var(--bs-primary)" }}
              dangerouslySetInnerHTML={{
                __html: sanitizer(
                  `${post.author?.firstName} ${post.author?.lastName}`
                ),
              }}
            />
            <br />
            <small
              style={{ marginTop: "10px", fontWeight: 400, fontSize: "0.9rem" }}
            >
              <Age time={post?.createdAt} />
            </small>
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
            dangerouslySetInnerHTML={{
              __html: trimmed
                ? post?.postBody?.slice(0, 500) ||
                  post?.post?.slice(0, 500) + "..." ||
                  post?.postBody
                : post?.post || post?.post,
            }}
          />
        )}

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

      {/* <Card.Footer className="mx-1 d-flex justify-content-between bg-white"> */}
      <Card.Footer className="justify-content-between bg-white px-0">
        <div className="row">
          {postButton.map((item, key) => (
            <div className="col-3" key={key}>
              <Button
                // key={key}
                // onClick={() => item.name === "Like" && handleLike()}
                variant="none"
                // disabled={item.name === "Like" && post.likes?.includes(user._id)}
                // className="d-flex justify-content-center gap-1 align-items-center"
                className="d-flex justify-content-center align-items-center"
              >
                {item.icon}
                {item.name === "Like" && (
                  <span
                    style={{ marginLeft: "7px" }}
                    className="mx-2 text-secondary"
                  >
                    {post.likes?.length || 0}
                  </span>
                )}

                <span
                  className="d-none d-md-block"
                  style={{ marginLeft: "7px" }}
                >
                  {item.name}
                </span>
              </Button>
            </div>
          ))}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
