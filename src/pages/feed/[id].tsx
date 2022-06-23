/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import GistCard from '@/components/Organisms/Gist/GistCard';
import PostCard from "@/components/Organisms/App/PostCard";
import axios from "axios";
import { responsePathAsArray } from 'graphql';


const Feed = ({
  gist,
  replies,
  post,
  author
}: {
  gist: Record<string, any>;
  replies: Record<string, any>[];
  post: Record<string, any>;
  author: any
}) => {
  const router = useRouter();
  // const [ data, setData] = useState({});
  const [ user, setUser ] = useState({});
  const [ feed, setFeed ] = useState(null);


  const feedId = router.query.id;

  const FetchPost = async () => {
  //   ( await axios
  //     .get(`/api/posts/post/${feedId}`, {headers:{
  //       authorization:`Bearer ${localStorage.getItem('accessToken')}`
  //     }})
  //     .then((postResponse) => {
  //       setFeed(postResponse.data.post)
  //       console.log(postResponse.data.post)
  //     })
  //     .catch((error) => {
  //       // router.back()
  //       console.log(error.postResponse?.data)
  //     })
  // )}

  }

  const FetchData = async () => {
  //   (await axios
  //     .get(`/api/gists/gist/${feedId}`, {headers:{
  //     authorization:`Bearer ${localStorage.getItem('accessToken')}`
  //   }})
  //     .then ((gistResponse) => {
  //       setFeed(gistResponse.data.gist)
  //       console.log(gistResponse.data)
  //     })
  //     .catch((error) => {
  //       // router.back()
  //       console.log(error.gistResponse?.data)
  //     })
  // )}
  }

  const FetchOne = async () => {
    return axios.get(`/api/gists/gist/${feedId}`, {headers:{
      authorization:`Bearer ${localStorage.getItem('accessToken')}`
     }})
    .then((postResponse) => {
      if (postResponse.data.gist.type === 'gist'){
        let response = postResponse.data.gist;
        setFeed(response)
      }else {
          return axios.get(`/api/posts/post/${feedId}`, {
            headers: {
              authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
          })
            .then((gistResponse) => {
              
            })
      }
    })
  }

  const FetchUser = () => {

  }

  useEffect(() => {

   
   FetchOne()
  //  FetchUser()
  }, [])
  return (
    <>
      <Container>
        <Head>
          <title>Feed</title>
        </Head>
      </Container>
    </>
  )
}

export default Feed