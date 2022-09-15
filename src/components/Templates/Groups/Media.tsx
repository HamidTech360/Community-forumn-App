import React,{useEffect, useState} from "react";
import { Image } from "react-bootstrap";
import axios from "axios";
import config from "@/config";
import { useRouter } from "next/router";
import styles from "@/styles/mediaTemplate.module.scss";

const Media = () => {

  const router = useRouter()
  const [media, setMedia] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    console.log(router.query?.path);
    if(!router.query.id) return
    (async ()=>{
      try{
        const response = await axios.get(`${config.serverUrl}/api/groups/media/${router.query.id}?type=${router.query.path=='photos'?'image':'video'}`)
        setMedia(response.data.media)
        setIsLoading(false)
      }catch(error){
        console.log(error.response?.data)
        setIsLoading(false)
      }
    })()
  },[router.query.id, router.query.path])
  return (
    <div
      className={`row d-flex justify-content-start justify-content-sm-evenly ${styles.media}`}
    >
      {isLoading && <div className="text-center" style={{fontWeight:'bolder'}}>Fetching...</div>}
      {media.map((item, i) => (
        <div
          key={i}
          className={`col-6 col-sm-4 col-md-3 col-lg-2 my-2 mx-1 ms-4 ms-sm-0 ${styles.imgLink}`}
        >
          <Image
            src={item}
            // className={`${styles.image} shadow-sm`}
            className={`${styles.image}`}
            style={{
              border: "1px solid rgba(0, 0, 0, 0.125)",
              borderRadius: "5px",
            }}
            alt="placeholder"
          />
        </div>
      ))}
    </div>
  );
};

export default Media;
