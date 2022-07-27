import ModalCard from "@/components/Organisms/App/ModalCard";
import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { useModal } from "./useModal";

import styles from "@/styles/profile.module.scss";
import { useRouter } from "next/router";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { FacebookShareCount } from "react-share";
import config from "@/config";

export const useModalWithData = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const toggle = () => setModalOpen(!modalOpen);

  const [selected, setSelected] = useState<Record<string, any>>({});
  const setModalState = (state: any) => {
    setModalOpen(state);
    if (state === false) {
      setSelected({});
    }
  };
  return {
    modalOpen,
    toggle,
    selected,
    setSelected,
  };
};

export const useModalWithShare = () => {
  const [modalOpenShare, setModalOpenShare] = useState<boolean>(false);
  const toggleShare = () => setModalOpenShare(!modalOpenShare);

  const [selectedShare, setSelectedShare] = useState<Record<string, any>>({});
  const setModalStateShare = (state: any) => {
    setModalOpenShare(state);
    if (state === false) {
      setSelectedShare({});
    }
  };
  return {
    modalOpenShare,
    toggleShare,
    selectedShare,
    setSelectedShare,
  };
};

export function ModalRow({ selected }) {
  console.log("selected++:", selected);
  return (
    <>
      {selected.images ? (
        <Row>
          <Col lg={6}></Col>
          <Col lg={6}>
            {" "}
            <ModalCard post={selected} />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col lg={12} className="px-5">
            <ModalCard post={selected} />
          </Col>
        </Row>
      )}
    </>
  );
}

export function ModalRowShare({ selectedShare }) {
  // console.log("selectedShare++:", selectedShare);
  const router = useRouter();

  // const shareUrl = `${config.serverUrl}/feed/${selectedShare?._id}`
  const shareUrl = `https://settlin.vercel.app/feed/${selectedShare?._id}`;

  // router.push({
  //   pathname: `/profile/[id]`,
  //   query: {
  //     id: blogPost?.author?._id,
  //   },
  // });

  const changeRoute = () => {
    router.push(`/feed/${selectedShare?._id}`);
  };
  return (
    <>
      <div className="container">
        <h6>
          <em>
            <u>Share Post On</u>
          </em>
          :
        </h6>
        <div className="row justify-content-between align-items-center m-3">
          {/* <div className="col-3">
            <button className="btm" onClick={changeRoute}>
              hi
            </button>
          </div> */}

          <div className="col-3 mb-3">
            <FacebookShareButton
              url={shareUrl}
              quote={"Connect, Explore & Share"}
              hashtag={"#setlinn"}
              // description={"Connect, Explore & Share"}
            >
              <FacebookShareCount url={shareUrl}>
                {(shareCount) => (
                  <span className="myShareCountWrapper">{shareCount}</span>
                )}
              </FacebookShareCount>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
          </div>

          <div className="col-3 mb-3">
            <TwitterShareButton
              url={shareUrl}
              title={"Connect, Explore & Share"}
              hashtags={["setlinn", "AskSetlinn"]}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>
          </div>

          <div className="col-3 mb-3">
            <WhatsappShareButton
              title={"Connect, Explore & Share"}
              url={shareUrl}
              // hashtags={["setlinn", "AskSetlinn"]}
            >
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
