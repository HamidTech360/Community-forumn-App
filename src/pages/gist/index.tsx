import Head from "next/head";
import { useEffect , useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "@/redux/store";
import { Col, Container, Card as BCard, Row, Modal , Form, Button, Alert} from "react-bootstrap";
import Card from "../../components/Organisms/Gist";
import EndlessCarousel from "../../components/Molecules/Carousel";
import GistCard from "../../components/Organisms/Gist/GistCard";
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify';
import {FaTimes} from 'react-icons/fa'
import styles from "../../styles/gist.module.scss";
import formStyles from '../../styles/templates/new-group/formField.module.css'

import axios from "axios";

//redux actions
import { uploadFailed, uploadStart, uploadSuccess } from "@/redux/gist";

const Gist = ({ gists }: { gists: Record<string, any>[] }) => {
 
  useEffect(() => {
    toast.success('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

 

  const dispatch = useDispatch()
  const state = useSelector(s=>s.gist)
  
  
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title:'',
    post:''
  })
  
 
  useEffect(()=>{
    
    // if(state.isSuccess){
    //   alert('upload was successful')
    // }else if(state.error){
    //   alert('action failed')
    // }
  },[state])
  

  const handleChange = (e)=>{
    const clone = {...formData}
    clone[e.currentTarget.name] = e.currentTarget.value
    setFormData(clone)
  
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch(uploadStart({}))
    
    try{
      const response = await axios.post(`/api/gists`, formData, {headers:{
        authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }})
      console.log(response.data);
      dispatch(uploadSuccess(response.data))
      console.log(state);
      
      
    }catch(error){
      console.log(error.response?.data);
      dispatch(uploadFailed(error.response?.data))

    }
  }

  return (
    <section className={styles.gist} style={{ marginBottom: "-2.4rem" }}>
      <Head>
        <title>Gists</title>
      </Head>
      
      <h1 className="d-flex justify-content-center align-center">Gist</h1>
      <Container>
        <h2>Popular Gists</h2>
        <div>
          <EndlessCarousel gap="mx-auto">
            {gists?.map((post, key) => (
              <Card
                key={`article-${key}`}
                id={post?.id}
                image={
                  post?.bbp_media
                    ? post?.bbp_media[0]!.attachment_data?.thumb
                    : "/images/formbg.png"
                }
                title={post?.title}
                author={post?._embedded?.user[0].name}
              />
            ))}
          </EndlessCarousel>
        </div>
        <Row className="mt-5">
          <Col md={3} className="desktop-only">
            <BCard
              className={`pt-1 px-1 shadow-sm ${styles.wrapper}`}
              style={{ position: "sticky", top: "5rem" }}
            >
              <BCard.Header className="shadow-sm border-0">
                <h5>Browse categories</h5>
              </BCard.Header>

              <BCard.Body className="mt-3">
                <p style={{ listStyleType: "none" }}>
                  {[1, 2, 3, 4, 5].map((item, key) => (
                    <li key={`category-${key}`}>Lorem, ipsum - {key}.</li>
                  ))}
                </p>
              </BCard.Body>
            </BCard>
          </Col>
          <Col md={9}>
            <BCard.Header className="shadow-sm border-0">
              <div className="d-flex justify-content-between">
                {/* <h2>New Gists</h2> */}
                <AiOutlinePlusCircle onClick={()=>setShowModal(true)} size={35} style={{cursor:'pointer'}} />
                <select className="outline-primary">
                  <option>Canada</option>
                </select>
              </div>
            </BCard.Header>
            <BCard.Body className={styles.cardBody}>
              {gists.map((post, key) => (
                <GistCard gist={post} key={`gist-${key}`} />
              ))}
            </BCard.Body>
          </Col>
        </Row>
      </Container>


        <Modal 
            size="lg" 
            show={showModal} 
            className="modal"
           
          >
          
         <span className={styles.closeBtn} > <FaTimes style={{cursor:'pointer'}} size={35} onClick={()=>setShowModal(false)} /> </span>
         <div className={styles.newGistModal}>
             <Form onSubmit={(e)=>handleSubmit(e)}>
                <Form.Group className={formStyles.formGroup}>
                  <Form.Label className={formStyles.formLabel}> Gist Title</Form.Label>
                  <Form.Control
                    size="lg"
                    name="title"
                    type="text"
                    required
                    onChange={(e)=>handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className={formStyles.formGroup}>
                  <Form.Control
                    className={formStyles.bigForm}
                    as="textarea"
                    name="post"
                    type="text"
                    required
                    placeholder="Write something"
                    onChange={(e)=>handleChange(e)}
                  />
                </Form.Group>

                
                
                <Button variant="primary" className="d-flex mx-auto" type="submit">
                 
                  {state.isLoading?'uploading...':'continue'} 
                </Button>
              </Form>

              {state.isSuccess && <Alert style={{marginTop:'20px', textAlign:'center'}} variant="success">Upload successfull</Alert>}
              {state.error && <Alert style={{marginTop:'20px', textAlign:'center'}} variant="danger">Upload failed</Alert>}
          </div>
          
        </Modal>
      
    </section>
  );
};

export async function getStaticProps() {
  const gistsFetch = await fetch(
    `${process.env.REST}/buddyboss/v1/topics?_embed=user&order=desc&orderby=ID
    &per_page=10`,
    { method: "GET" }
  );
  const gists = await gistsFetch.json();

  return {
    props: {
      gists,

      revalidate: 1,
    },
  };
}

export default Gist;
