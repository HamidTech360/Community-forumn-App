import React, {useState, useEffect} from "react";
import Timeline from "./Timeline";
import axios from 'axios'
import config from "@/config";

const Bookmarks = () => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    (async ()=>{
      try{
        const {data} = await axios.get(`${config.serverUrl}/api/bookmarks`, {headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }})
        console.log(data);
        setPosts(data.posts.bookmarks)
        
      }catch(error){
        console.log(error.response.data);
      }
    })()
  },[])
  return (
    <div>
      <Timeline Posts={posts} />
    </div>
  );
};

export default Bookmarks;
