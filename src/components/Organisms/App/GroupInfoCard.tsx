import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useState, useRef, useEffect } from "react";
import axios from "axios";
import config from "@/config";
import Spinner from "react-spinner-material";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Card,
  CardImg,
  Col,
  OverlayTrigger,
  Popover,
  Image,
  Nav,
  Row
} from "react-bootstrap";
import About from "../../Templates/Groups/About";
import Friends from "../../Templates/Groups/Friends";
import Media from "../../Templates/Groups/Media";
import Timeline from "../../Templates/Groups/Timeline";
import { useSelector } from "@/redux/store";
import { AiFillEdit } from "react-icons/ai";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";

import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/templates/profile/groupcard.module.scss";

interface IComponents {
  about: ReactNode;
  timeline: ReactNode;
  videos: ReactNode;
  photos: ReactNode;
  members: ReactNode;
}
const Components: IComponents = {
  timeline: <Timeline />,
  about: <About />,
  photos: <Media />,
  members: <Friends />,
  videos: <Media />
};

const popOverStyle = {
  cursor: "pointer",
  fontWeight: "700"
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GroupInfoCard = ({ data }: any) => {
  const { path, id } = useRouter().query;
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  const [showUpdateImgBtn, setShowUpdateImgBtn] = useState(false);
  const [showUpdateCoverBtn, setShowUpdateCoverBtn] = useState(false);
  const [profileImg, setProfileImg] = useState(
    data?.images?.avatar || "/images/article.png"
  );
  const [coverImg, setCoverImg] = useState(
    data?.images?.cover || "/images/formbg.png"
  );
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const fileInput = useRef<HTMLInputElement>();
  const coverFileInpt = useRef<HTMLInputElement>();

  useEffect(() => {
    data.images?.avatar && setProfileImg(data?.images?.avatar);
    data.images?.cover && setCoverImg(data?.images?.cover);
    console.log(data.groupMembers?.find(e => e._id === user._id))
  }, [data?.images]);

  const [selectedImg, setSelectedImg] = useState({
    file: "",
    fileURL: null
  });
  const [selectedCoverImage, setSelectedCoverImage] = useState({
    file: "",
    fileURL: null
  });

  const handleJoin = async () => {
    if (data.groupMembers?.find(e => e._id === user._id) || joined) return;

    setJoining(true);
    try {
      const response = await axios.patch(
        `${config.serverUrl}/api/groups/group/${data._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      console.log(response.data);
      setJoining(false);
      setJoined(true);
    } catch (error) {
      console.log(error.response?.data);
      setJoining(false);
    }
  };

  const triggerClick = item => {
    item?.current?.click();
    setShow(false);
  };

  const handleImgSelection = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(e.target.name);

    reader.onloadend = () => {
      if (e.target.name == "image") {
        const selectedImg_c = { ...selectedImg };
        selectedImg_c["file"] = file;
        selectedImg_c["fileURL"] = reader.result;
        setSelectedImg(selectedImg_c);
        setProfileImg(reader.result);
        setShowUpdateImgBtn(true);
        console.log(file);
      } else if (e.target.name == "cover") {
        const selectedImg_c = { ...selectedCoverImage };
        selectedImg_c["file"] = file;
        selectedImg_c["fileURL"] = reader.result;
        setSelectedCoverImage(selectedImg_c);
        setCoverImg(reader.result);
        setShowUpdateCoverBtn(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async item => {
    item == "avatar" ? setProgress1(true) : setProgress2(true);
    const formData = new FormData();
    formData.append(
      "avatar",
      item == "avatar" ? selectedImg.file : selectedCoverImage.file
    );
    console.log(selectedImg);

    try {
      const response = await axios.put(
        `${config.serverUrl}/api/groups/group/${data._id}?imageType=${item}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(response.data);
      toast.success("Image uploaded", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
      });
      setProgress1(false);
      setProgress2(false);
      item == "avatar"
        ? setShowUpdateImgBtn(false)
        : setShowUpdateCoverBtn(false);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Image uploade failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
      });
      setProgress1(false);
      setProgress2(false);
    }
  };

  return (
    <Card className="mb-3">
      <ToastContainer />
      <input
        onChange={e => handleImgSelection(e)}
        name="image"
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
      />
      <input
        onChange={e => handleImgSelection(e)}
        name="cover"
        type="file"
        ref={coverFileInpt}
        style={{ display: "none" }}
      />
      <CardImg src={coverImg} height={150} style={{ objectFit: "cover" }} />
      {data?.admin?._id == user._id && (
        <OverlayTrigger
          trigger="click"
          placement={"bottom"}
          overlay={
            <Popover show={false} id={`popover-positioned-bottom`}>
              <Popover.Body
                style={popOverStyle}
                onClick={() => triggerClick(fileInput)}
              >
                Select Profile Image
              </Popover.Body>
              <Popover.Body
                style={popOverStyle}
                onClick={() => triggerClick(coverFileInpt)}
              >
                Select Cover Photo
              </Popover.Body>
            </Popover>
          }
          show={show}
        >
          <div className={styles.editCoverTab}>
            <span onClick={() => setShow(!show)}>
              Edit <AiFillEdit />
            </span>
            {showUpdateImgBtn && (
              <Button
                onClick={() => handleImageUpload("avatar")}
                style={{ marginLeft: "10px", fontSize: "12px" }}
              >
                {progress1 ? (
                  <Spinner
                    radius={22}
                    color={"lightgray"}
                    stroke={2}
                    visible={true}
                  />
                ) : (
                  " update avatar"
                )}
              </Button>
            )}
            {showUpdateCoverBtn && (
              <Button
                onClick={() => handleImageUpload("cover")}
                style={{ marginLeft: "10px", fontSize: "12px" }}
              >
                {progress2 ? (
                  <Spinner
                    radius={22}
                    color={"lightgray"}
                    stroke={2}
                    visible={true}
                  />
                ) : (
                  " update cover"
                )}
              </Button>
            )}
          </div>
        </OverlayTrigger>
      )}

      <Card.Body>
        <Row>
          <Col xs={2}>
            <Image
              src={profileImg}
              className="pic"
              width={80}
              height={80}
              alt=""
              style={{ transform: "translateY(-100%)" }}
              roundedCircle
            />
          </Col>
          <Col xs={10} className="d-flex flex-column">
            {" "}
            <p className="bold">{data?.name}</p>
            <small className="text-mute">{data?.privacy} Group</small>
            <div className="mb-div mb-2">
              <Button
                onClick={() => handleJoin()}
                variant="primary"
                className="mb-btns"
              >
                {joining ? (
                  <Spinner
                    radius={22}
                    color={"lightgray"}
                    stroke={2}
                    visible={true}
                  />
                ) : data.groupMembers?.find(e => e._id === user._id) ||
                  joined ? (
                  "Joined"
                ) : (
                  "Join"
                )}
              </Button>{" "}
              <Button variant="outline-primary" className="mb-btns">
                Invite{" "}
                <Image
                  src="/images/invite.png"
                  alt="invite"
                  className="image2"
                />
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Nav className="d-flex justify-content-around  text-capitalize">
          {Object.keys(Components).map(item => (
            <Nav.Item
              key={item}
              className={
                item === path ? "text-primary fs-5" : "text-secondary fs-6"
              }
            >
              <Link href={`/groups/${id}/${item}`}>{item}</Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Footer>
    </Card>
  );
};

export default GroupInfoCard;
