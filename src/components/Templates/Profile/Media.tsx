import React, {useState, useEffect} from "react";
import axios from "axios";
import config from "@/config";
import { Image } from "react-bootstrap";
import styles from "@/styles/mediaTemplate.module.scss";

const Media = () => {
  const imageList = [
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
  ];
  const [images, setImages] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  useEffect(()=>{
   (async ()=>{
    try{
      const response = await axios.get(`${config.serverUrl}/api/users/media/all`, {headers:{
        authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }})
      console.log(response.data)
      setImages(response.data.media)
      setIsFetching(false)
    }catch(error){
      console.log(error.response?.data)
      setIsFetching(false)
    }
   })()
  },[])
  return (
    <div
      className={`row d-flex justify-content-start justify-content-sm-evenly ${styles.media}`}
    >
      {isFetching && <div className="text-center" style={{fontWeight:'bolder'}}>Fetching...</div>}
      {images.map((item, i) => (
        <div
          key={i}
          className={`col-6 col-sm-4 col-md-3 col-lg-2 my-2 mx-1 ms-4 ms-sm-0 ${styles.imgLink}`}
        >
          <Image
            src={item}
            className={`${styles.image}`}
            style={{
              border: "1px solid rgba(0, 0, 0, 0.125)",
              borderRadius: "5px",
              objectFit:'cover'
            }}
            alt="placeholder"
          />
        </div>
      ))}
    </div>
  );
};

export default Media;
