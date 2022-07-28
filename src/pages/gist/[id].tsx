/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Col, Container, Image, Row } from "react-bootstrap";
import Comment from "../../components/Organisms/App/Comment";
import Contributors from "../../components/Organisms/Gist/Contributors";
import GistCard from "../../components/Organisms/Gist/GistCard";
import axios from "axios";
import styles from "@/styles/gist.module.scss";
import config from "@/config";

import { useDispatch, useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";

const Gist = ({
  gist,
  replies,
  contributors,
}: {
  gist: Record<string, any>;
  replies: Record<string, any>[];
  contributors: { name: string; avatar: string }[];
}) => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<Record<string, any>>({});
  const [commentPost, setCommentPost] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState({});
  const [queryId, setQueryId] = useState(id);
  // Allow Rerender Bases On ID Change Even When Route Is Same Path
  if (id && id !== queryId) setQueryId(id);

  const user = useSelector(selectUser);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `${config.serverUrl}/api/gists/${router.query.id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // const userResponse = await axios.get("/api/auth", {
        //   headers: {
        //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //   },
        // });
        // setUser(userResponse.data);
        //console.log(response.data);
        setData(response.data.gist);
      } catch (error) {
        router.replace("/gist");
        console.log(error.response?.data);
      }
    })();

    document.body.style.backgroundColor = "#f6f6f6";
    // console.log(replies);
    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, [queryId]);

  return (
    <Container>
      <Head>
        <title>{gist?.title.raw.replace("&amp;", "&")}</title>
      </Head>

      <Row>
        <Col md={4} className="desktop-only">
          <Contributors contributors={[user]} />
        </Col>
        <Col md={8}>
          <GistCard gist={data} primary />
          {/* <section>
                <h5 style={{ fontWeight: "bolder" }}>Add a Comment</h5>
                <div className="row">
                  <div className="col-2 col-md-2">
                    <Image
                      src="/images/imagePlaceholder.jpg"
                      
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
              </section> */}
          {/* <h5 className={`px-2 m-2 ${styles.comment}`}>Comments({data?.comments?.length})</h5>
          <div className="mt-2">
            {replies?.map((reply, key) => (
              <Comment comment={reply} key={`comment-${key}`} />
            ))}
          </div> */}
        </Col>
      </Row>
    </Container>
  );
};

// export async function getStaticPaths() {
//   const ids = await fetch(`${process.env.REST}/buddyboss/v1/topics?_fields=id`);

//   let paths = await ids.json();
//   paths = paths.map((id: Record<string, any>) => {
//     return {
//       params: {
//         id: id.id.toString(),
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export const getStaticProps = async ({
//   params,
// }: {
//   params: Partial<Record<string, string>>;
// }) => {
//   const gist = await (
//     await fetch(
//       `${process.env.REST}/buddyboss/v1/topics/${params.id}?_embed=user`,
//       {
//         method: "GET",
//       }
//     )
//   ).json();

//   let replies: Record<string, any>[] = await (
//     await fetch(
//       `${process.env.REST}/buddyboss/v1/reply?parent=${params.id}&per_page=10&_embed=user&_fields=_links,_embedded,link,id,date,content`
//     )
//   ).json();

//   let [] = [
//     {
//       name: gist._embedded.user[0].name,
//       avatar: gist?._embedded?.user[0]?.avatar_urls.full,
//     },
//   ];

//   replies.forEach((reply) => {
//     const newReply = JSON.stringify({
//       name: reply?._embedded?.user[0].name,
//       avatar:
//         reply?._embedded?.user[0]?.avatar_urls?.full || "/images/formbg.png",
//     });

//     if (!contributors.find(({ name }) => name === JSON.parse(newReply).name)) {
//       contributors.push(JSON.parse(newReply));
//     }
//   });

//   return {
//     props: {
//       gist,
//       replies,
//       contributors,
//     },
//   };
// };
export default Gist;
