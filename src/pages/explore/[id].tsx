/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Comment from "../../components/Organisms/App/Comment";
import Card from "@/components/Organisms/Card";
import styles from "@/styles/explore.module.scss";
import { useDispatch, useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";

const Explore = ({
  post,
  replies,
}: {
  post: Record<string, any>;
  replies: Record<string, any>[];
}) => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const [data, setData] = useState({});
  // const [user, setUser] = useState({});

  const FetchData = async () => {
    try {
      const exploreResponse = await axios.get(
        `/api/posts/post/${router.query.id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setData(exploreResponse.data.post);
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

  return (
    <>
      <Container>
        <Head>
          <title>{post?.postTitle}</title>
        </Head>
        {/* {console.log("data000000000:", data)} */}
        {/* <Card post={data} author={user} trimmed /> */}
        {Object.keys(data).length !== 0 && <Card post={data} author={user} />}

        <h5 className={`px-2 m-2 ${styles.comment}`}>Comments({"0"})</h5>
        <div className="mt-2">
          {replies?.map((reply, key) => (
            <Comment comment={reply} key={`comment-${key}`} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Explore;
