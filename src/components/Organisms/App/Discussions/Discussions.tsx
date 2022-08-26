import config from "@/config";
import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Card, Image, Modal } from "react-bootstrap";
import truncate from "trunc-html";
import { useModalWithData, ModalRow } from "@/hooks/useModalWithData";
import { MdOutlineCancel } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import styles from "@/styles/feed.module.scss";

import { useDispatch, useSelector } from "@/redux/store";
import {
  // user as userAuth,
  selectUser,
} from "@/reduxFeatures/authState/authStateSlice";
import { useRouter } from "next/router";

const Discussions = () => {
  const router = useRouter();
  const [gists, setGists] = useState<Record<string, any>[]>();
  // const [users, setUsers] = useState([]);
  const user = useSelector(selectUser);
  const sanitizer = DOMPurify.sanitize;

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/gists`);

        await data.gists.sort(function () {
          return 0.5 - Math.random();
        });

        setGists(
          data.gists
            .filter((person) => {
              return person?.author?._id.toString() !== user._id.toString();
            })
            .slice(0, 50)
        );
      } catch (error) {
        // console.log(error.response?.data);
      }
    })();
  }, []);

  return (
    <Card
      // style={{ border: "none", overflowY: "scroll", height: "450px" }}
      style={{
        overflowY: "scroll",
        height: "450px",
        border: "1px solid rgba(0, 0, 0, 0.125)",
      }}
      // className={`pb-5 mb-4 mt-4 shadow ${styles.activeDiscussion}`}
      className={`pb-5 mb-4 mt-4 ${styles.activeDiscussion}`}
    >
      <Card.Header
        // className="d-flex justify-content-between gap-2 align-items-center bg-white shadow-sm sticky-top"
        className="d-flex justify-content-between gap-2 align-items-center bg-white sticky-top"
        style={{ fontSize: "14px" }}
      >
        <span className="bold">Active discussions</span>
        <small
          className="text-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/gist")}
        >
          See more
        </small>
      </Card.Header>
      <Card.Body>
        {gists &&
          gists?.map((gist, index) => (
            <div
              key={`discussion-${gist?._id}-${index}`}
              className="d-flex gap-3 mt-2 py-1 px-1 border-bottom"
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push(`/gist/${gist?._id}`);
              }}
            >
              <div>
                <Image
                  src={gist?.author?.images?.avatar || "/images/formbg.png"}
                  width={40}
                  height={40}
                  alt=""
                  roundedCircle
                />
              </div>
              <div className="d-flex flex-column">
                <small
                  className="bolden"
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(truncate(gist?.title, 50).html),
                  }}
                />
                <small className="text-muted" style={{ fontSize: "11px" }}>
                  By {`${gist?.author?.firstName} ${gist?.author?.lastName}`}
                </small>
              </div>
            </div>
          ))}
      </Card.Body>
    </Card>
  );
};

export default Discussions;
