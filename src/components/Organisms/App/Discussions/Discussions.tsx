import config from "@/config";
import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Card, Image, Modal } from "react-bootstrap";
import truncate from "trunc-html";
import { useModalWithData, ModalRow } from "@/hooks/useModalWithData";
import { MdOutlineCancel } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import styles from "@/styles/profile.module.scss";

const Discussions = ({ posts }: any) => {
  const [gists, setGists] = useState<Record<string, any>[]>();
  const [users, setUsers] = useState([]);
  const sanitizer = DOMPurify.sanitize;
  // modal
  const { modalOpen, toggle, selected, setSelected } = useModalWithData();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${config.serverUrl}/api/gists`);
      setGists(data);
    })();
  }, []);

  return (
    <Card
      // style={{ border: "none", overflowY: "scroll", height: "450px" }}
      style={{ border: "none", overflowY: "scroll", height: "18%" }}
      className="pb-5 mb-4 mt-4 shadow"
    >
      <Card.Header
        className="d-flex justify-content-between gap-2 align-items-center bg-white shadow-sm sticky-top"
        style={{ fontSize: "14px" }}
      >
        <span className="bold">Active discussions</span>
        <small className="text-bold text-primary">See more</small>
      </Card.Header>
      <Card.Body>
        {posts &&
          posts?.map((post, index) => (
            <div
              key={`discussion-${post?._id}-${index}`}
              className="d-flex gap-3 mt-2 py-1 px-1 border-bottom"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelected(post);
                toggle();
              }}
            >
              <div>
                <Image
                  src={"/images/formbg.png"}
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
                    __html: sanitizer(truncate(post?.post, 25).html),
                  }}
                />
                <small className="text-muted" style={{ fontSize: "11px" }}>
                  By {`${post?.author?.firstName} ${post?.author?.lastName}`}
                </small>
              </div>
            </div>
          ))}
      </Card.Body>

      <Modal
        show={modalOpen}
        className={styles.FeedModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
        scrollable={true}
      >
        <span className={styles.openBtn}>
          {" "}
          <MdOutlineCancel
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggle()}
          />{" "}
        </span>
        <span className={styles.closeBtn}>
          {" "}
          <BiArrowBack
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggle()}
          />{" "}
        </span>
        <ModalRow selected={selected} />
      </Modal>
    </Card>
  );
};

export default Discussions;
