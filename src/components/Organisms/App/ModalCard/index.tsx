import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { BsFillBookmarkFill } from "react-icons/bs";
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import axios from 'axios';
import config from "@/config";

import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";

const ModalCard = ({ feed, trimmed }: any) => {

  const router = useRouter();
  const user = useSelector(selectUser);
  const [liked, setLiked] = useState(false);

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
      icon: <BsFillBookmarkFill />,
    },
  ];


  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: feed?.author?._id,
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
        `${config.serverUrl}/api/likes/?type=${type}&id=${feed._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log(data);
      setLiked(true);

      // window.location.reload();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    // console.log(router.pathname);

    if (feed?.likes?.includes(user._id)) {
      setLiked(true);
    }
  }, []);

  return (
    <div>ModalCard</div>
  )
}

export default ModalCard