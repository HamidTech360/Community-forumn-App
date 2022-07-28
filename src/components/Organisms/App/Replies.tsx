/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, {useState, useEffect} from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Age from "../../Atoms/Age";
import DOMPurify from "dompurify";
import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import axios from 'axios'

import styles from '@/styles/utils.module.scss'

const Replies = ({ reply }: Record<string, any>) => {
  const [liked, setLiked] = useState(false);
  const user = useSelector(selectUser);
  const sanitizer = DOMPurify.sanitize;

  const handleLike = async () => {
    try {
      const { data } = await axios.get(
        `${config.serverUrl}/api/likes/?type=comment&id=${reply?._id}`,
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

  useEffect(()=>{

    if (reply?.likes?.includes(user?._id)) {
      setLiked(true);
    }

   },[])
  return (
    <Card
        className = {styles.replies}
        style={{ border: "none", 
        width: "90%",
        background: "none", lineHeight: "1.2" }}
    >
      <div className="d-flex align-items-center justify-content-start gap-2 mt-1">
        <Image
          src="/images/friends3.png"
          alt="User avatar"
          width={50}
          height={50}
          fluid
          roundedCircle
        />
        <div>
          <h6 style={{ fontWeight: "bold" }}>
            {reply?.author?.firstName && reply?.author?.firstName}{" "}
            {reply?.author?.lastName && reply?.author?.lastName}
          </h6>
          <small>
            <Age time={reply?.createdAt} />
          </small>
        </div>
      </div>
      <Card.Body
        dangerouslySetInnerHTML={{
          __html: sanitizer(reply?.content),
        }}
      />

      <div className="buttons d-flex gap-2 justify-content-end mr-4">
      <small className="text-muted"  style={{cursor: "pointer" }} onClick = {() => handleLike()}>
          {reply.likes?.length > 0 && (
           <small className="badge rounded-pill bg-primary px-2 py-1 text-white">
             {reply.likes?.length}
           </small>
         )} Like
         
       </small>
       
      </div>
    </Card>
  );
};

export default Replies;