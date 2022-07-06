import React, {useState, useEffect} from "react";
import styles from "@/styles/timeline.module.scss";
import Posts from "@/components/Templates/Profile/Timeline";
import CreatePost from "@/components/Organisms/CreatePost";
import axios from "axios";
import config from "@/config";

const Timeline = ({groupId}:any) => {

  const [timeLinePosts, setTimeLinePosts] = useState([]) 
  //console.log('group Id from timeline is '+ groupId);
  
  useEffect(()=>{
    (async function (){
      const response = await axios.get(`${config.serverUrl}/api/posts/group/one/${groupId}`, {
        headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      console.log(response.data);
      setTimeLinePosts(response.data.posts)
    })()
  },[])
  return (
    <>
      <div>
        <h5 className={styles.head}>Posts</h5>
        <CreatePost />
        <Posts Posts={timeLinePosts} />
      </div>
    </>
  );
};

export default Timeline;
