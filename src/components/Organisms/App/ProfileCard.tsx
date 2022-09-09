/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { ReactNode, useState, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Card, Button, Image, Nav } from "react-bootstrap";
import About from "../../Templates/Profile/About";
import Bookmarks from "../../Templates/Profile/Bookmarks";
import Articles from "../../Templates/Profile/Articles";
import Media from "../../Templates/Profile/Media";
import Timeline from "../../Templates/Profile/Timeline";
import { useSelector } from "@/redux/store";
import { selectUser, user } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import Friends from "../../Templates/Profile/Friends";
import styles from "@/styles/templates/profile/profilecard.module.scss";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "react-spinner-material";

import "react-toastify/dist/ReactToastify.css";
interface IComponents {
  about: ReactNode;
  timeline: ReactNode;
  bookmarks: ReactNode;
  media: ReactNode;
  articles: ReactNode;
  connections: ReactNode;
}

const ProfileCard = ({
  handlePath,
  active
}: {
  active: string;
  handlePath: (path: string) => void;
}) => {
  const data = useSelector(selectUser);
  const [profileImg, setProfileImg] = useState(
    data?.images?.avatar || "/images/formbg.png"
  );
  const [coverImg, setCoverImg] = useState(
    data?.images?.cover || "/images/formbg.png"
  );
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);

  const [selectedImg, setSelectedImg] = useState({
    file: "",
    fileURL: null
  });
  const [selectedCoverImage, setSelectedCoverImage] = useState({
    file: "",
    fileURL: null
  });
  const [showUpdateImgBtn, setShowUpdateImgBtn] = useState(false);
  const [showUpdateCoverBtn, setShowUpdateCoverBtn] = useState(false);
  const fileInput = useRef<any>();
  const coverFileInpt = useRef<any>();

  const triggerClick = item => {
    item?.current?.click();
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

    try {
      await axios.put(
        `${config.serverUrl}/api/users/${data._id}?imageType=${item}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      // console.log(response.data);
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
      // console.log(error.response?.data)
      toast.error("Image uploade failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000
      });
      setProgress1(false);
      setProgress2(false);
    }
  };

  const Components: IComponents = {
    timeline: (
      <Timeline
        Posts={[]}
        paginatedData={null}
        isReachedEnd={true}
        error={null}
        fetchNextPage={null}
        mutate={null}
        isValidating={null}
      />
    ),
    about: <About />,
    media: <Media />,
    articles: <Articles />,
    bookmarks: <Bookmarks />,
    connections: <Friends user={user} />
  };
  return (
    <Card className="mt-2 mb-3">
      <ToastContainer />
      <Image src={coverImg} className="image3" alt="Cover Image" />

      <div className={styles.editCoverTab}>
        <div onClick={() => triggerClick(coverFileInpt)}>
          <span style={{ color: "#32324D" }}>Edit</span>{" "}
          <AiFillEdit size={23} color="#32324D" />
        </div>
        {showUpdateCoverBtn && (
          <Button
            style={{ fontSize: "13px", maxWidth: "200px" }}
            onClick={() => handleImageUpload("cover")}
            className={styles.editTab}
          >
            {!progress2 ? (
              "Update cover "
            ) : (
              <Spinner
                radius={22}
                color={"lightgray"}
                stroke={2}
                visible={true}
              />
            )}
          </Button>
        )}
      </div>

      <Card.Body className="d-flex position-relative justify-content-center align-items-center flex-column ">
        <Image
          width={130}
          height={130}
          src={profileImg}
          alt="avatar"
          className="top-0 position-absolute"
          style={{
            border: "2px solid black"
          }}
          roundedCircle
        />

        <div onClick={() => triggerClick(fileInput)} className={styles.editTab}>
          <span style={{ color: "32324D" }}>Edit</span>{" "}
          <AiFillEdit size={23} color="#32324D" />
        </div>
        {showUpdateImgBtn && (
          <Button
            style={{ fontSize: "13px", marginTop: "10px" }}
            onClick={() => handleImageUpload("avatar")}
          >
            {!progress1 ? (
              "Update cover "
            ) : (
              <Spinner
                radius={22}
                color={"lightgray"}
                stroke={2}
                visible={true}
              />
            )}
          </Button>
        )}

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
        <div className=" mt-4 bold text-center fs-7">
          {data?.firstName} {data?.lastName}
        </div>
        <div className="text-muting">@{data?.username || data?.firstName}</div>
        <div className="text-muted text-center">
          {data.bio ||
            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapienteillum quasi voluptatem explicabo, tempore enim!"}
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ width: "60%" }}
        >
          <div
            className="d-flex flex-column align-items-center"
            onClick={() => handlePath("connections")}
          >
            <span>{data.followers?.length}</span>
            <span>followers</span>
          </div>
          <div
            className="d-flex flex-column align-items-center"
            onClick={() => handlePath("connections")}
          >
            <span>{data.following?.length}</span>
            <span>following</span>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        {" "}
        <Nav className="d-flex justify-content-around  text-capitalize">
          {Object.keys(Components).map(item => (
            <Nav.Item
              key={item}
              style={{ cursor: "pointer" }}
              onClick={() => handlePath(item.toLowerCase())}
              className={item === active ? "text-primary" : "text-secondary"}
            >
              {item}
            </Nav.Item>
          ))}
        </Nav>
      </Card.Footer>
    </Card>
  );
};

export default ProfileCard;
