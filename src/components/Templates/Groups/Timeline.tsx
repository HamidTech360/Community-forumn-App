import React from "react";
import CreatePost from "./Cards/CreatePost";
import PostCard from "./Cards/PostCard";
import styles from '../../../styles/timeline.module.scss';


const Timeline = () => {

  return (
    <>
        <div>
            <h5 className = {styles.head}>Posts</h5>
            <CreatePost />  
            <PostCard /> 
            <CreatePost />  
            <PostCard /> 

        </div>
    </>
  )
}

export default Timeline