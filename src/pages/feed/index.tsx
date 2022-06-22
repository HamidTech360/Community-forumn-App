// import useUser from "@/hooks/useUser";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "@/redux/store";
import { Col, Container, Image, Row, Spinner, Modal, Form, Button } from "react-bootstrap";
import AuthContent from "@/components/Auth/AuthContent";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";
import PostCard from "@/components/Organisms/App/PostCard";
import UserCard from "@/components/Organisms/App/UserCard";
import CreatePost from "@/components/Organisms/CreatePost";
//import Modal from "@/components/Organisms/Layout/Modal/Modal";
import {toast, ToastContainer} from 'react-toastify'
import { FaTimes } from "react-icons/fa";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";

import { usePagination } from "@/hooks/usePagination";
import 'react-toastify/dist/ReactToastify.css';
import styles from "@/styles/feed.module.scss";
import formStyles from '../../styles/templates/new-group/formField.module.css'

const Feed = () => {
  const data = useSelector(selectUser);
  //const { posts, setPage, hasMore, isFetchingMore } = usePagination();

  const [scrollInitialised, setScrollInitialised] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [isFetching, setIsFetching] = useState(true);
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    postTitle:'',
    postBody:''
  })
  const checkScroll = () => {
    if (window.scrollY > 100) {
      setScrollInitialised(true);
    }
  };

   useEffect(() => {

    (async function(){
      try{
        const response = await axios.get(`/api/feed`)
        console.log(response.data);
        
        setPosts(response.data.data)
        setIsFetching(false)
        const userResponse = await axios.get('/api/user', {headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }})
        setUsers(userResponse.data.users)
      }catch(error){
        console.log(error.response?.data);
      }
  })()


    document.body.style.backgroundColor = "#f6f6f6";
    window.addEventListener("scroll", checkScroll);

    return () => {
      document.body.style.backgroundColor = "initial";
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const DisplayModal = ()=>{
    setShowModal(true)
  }

  const handleChange = (e) => {
    const clone = { ...formData };
    clone[e.currentTarget.name] = e.currentTarget.value;
    setFormData(clone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true)
    console.log(formData);
    
    try{
      const response = await axios.post(`/api/posts`, {...formData}, {headers:{
        authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }})
      console.log(response.data);
      toast.success('Post uploaded successfully', {
        position: toast.POSITION.TOP_RIGHT,
        toastId:'1'
      })
      setShowModal(false);
      setUploading(false)
      // fetchPost()
    }catch(error){
      console.log(error.response?.data);
      toast.error('Failed to upload post', {
        position: toast.POSITION.TOP_RIGHT,
        toastId:'1'
      })
      setShowModal(false);
      setUploading(false)
    }
  };


  return (
    <AuthContent>
      <ToastContainer/>
      <Head>
        <title>Feed</title>
      </Head>
      <Container>
        <div className={`mt-3 ${styles.wrapper}`}>
          <>
            <div
              style={{ width: 250 }}
              className="position-fixed d-none d-lg-flex flex-column gap-4 vh-100"
            >
              <UserCard user={data!} />
              <Discussions posts={posts} />
            </div>
          </>

          <main className={styles.posts} id="posts">
            <CreatePost
                DisplayModal = {DisplayModal}
             />
            <div
              id="instersection"
              style={{
                height: "30vh",
                width: "100%",
                position: "fixed",
                bottom: 0,
              }}
            ></div>
            {/* <InfiniteScroll
              dataLength={Number(posts?.length)} //This is important field to render the next data
              next={fetchData}
              hasMore={true}
              initialScrollY={0}
              loader={
                <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                  </p>
                }
              > */}
            {posts?.map((post) => (
              <PostCard 
                post={post} 
                author={users.find((i) => post.user  == i._id)}
                key={`activity-post-${post.id}`} 
                trimmed
              />
            ))}
            {isFetching && (
              <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {/* {!hasMore && (
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            )} */}
            {/* </InfiniteScroll> */}
          </main>
          <div
            style={{ width: 270 }}
            className="position-fixed d-none d-xxxl-flex  end-0 me-5  vh-100 "
          >
            <Discussions />
          </div>
        </div>
      </Container>

      <Modal 
            
            // size="md"  
            show={showModal} 
            className={styles.GistModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
          
         <span className={styles.closeBtn} > <FaTimes color = '#207681'style={{cursor:'pointer'}} size={35} onClick={()=>setShowModal(false)} /> </span>
         <div className={styles.newGistModal}>
             <Form onSubmit={(e)=>handleSubmit(e)}>
                <Form.Group className={formStyles.formGroup}>
                  <Form.Label className={formStyles.formLabel}> Post Title</Form.Label>
                  <Form.Control
                    size="lg"
                    name="postTitle"
                    type="text"
                    required
                    onChange={(e)=>handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className={formStyles.formGroup}>
                  <Form.Control
                    className={formStyles.bigForm}
                    as="textarea"
                    name="postBody"
                    type="text"
                    required
                    placeholder="Write something"
                    onChange={(e)=>handleChange(e)}
                  />
                </Form.Group>


            <Button variant="primary" className="d-flex mx-auto" type="submit">
              {uploading ? "uploading..." : "Continue"}
            </Button>
          </Form>
        </div>
      </Modal>
    </AuthContent>
  );
};

export default Feed;
