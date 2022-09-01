import Head from "next/head";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import styles from '@/styles/interests.module.scss'
import Spinner from 'react-spinner-material'
import config from "@/config";
import axios from "axios";
import { Container, Card, Button, Image } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { user } from "@/reduxFeatures/authState/authStateSlice";
import "react-toastify/dist/ReactToastify.css";

const Interests = () => {
const router = useRouter()
  const [initInterests, setInterests] = useState([
    {
      selected:false,
      label:"Travel abroad",
    },
    {
      selected:false,
      label: "Postgraduate degree",
    },
    {
      selected:false,
      label:"Undergraduate degree",
    },
    {
      selected:false,
      label: "Housing",
    },
    {
      selected:false,
      label:  "Work abroad",
    },
    {
      selected:false,
      label:"Find people around you",
    },
    {
      selected:false,
      label: "Find information",
    },
    {
      selected:false,
      label:  "Give information",
    },
    {
      selected:false,
      label:"Consultation",
    },
  ])
  const [showProgress, setShowProgress] = useState(false)

  
  //@ts-ignore
  const interestSelected = (item) => {
    const index = initInterests.indexOf(item)
    const interests__c = [...initInterests]
    interests__c[index].selected = !interests__c[index].selected
    setInterests(interests__c)

  };

  const handleSubmit =async () => {
    const selectedItems = []
    const filtered = initInterests.filter(item=>item.selected)
    if (filtered.length<=0) {
      return  toast.error("Select an Item", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }

    setShowProgress(true)
    filtered.map(item=>{
      return selectedItems.push(item.label)
    })
    console.log(selectedItems.join(","))
    try{
      const {data} = await axios.put(`${config.serverUrl}/api/users`, {interests:selectedItems.join(",")}, {
        headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      console.log(data)
      setShowProgress(false)
      router.push('/feed')
    }catch(error){
      console.log(error.response?.data)
      setShowProgress(false)
    }

  };

  return (
    <>
      <Head>
        <title>Interests</title>
      </Head>
      <ToastContainer/>
      <section>
        <Container fluid className="row mt-3 text-center h1 mx-3">
          <Card border="0 bg-transparent">
            <Card.Header
              className="border-0 fw-4 h1 mb-5 bg-transparent"
              style={{ backgroundColor: "none" }}
            >
              <Image
                src="/assets/ellipse-intro-top.png"
                className="d-none d-md-block"
                style={{
                  position: "fixed",
                  top: "-5%",
                  left: "-10%",
                  zIndex: "-1",
                }}
                alt="ellipse-intro-top.png"
              />
              Select interests
              <p className="fs-6 text-secondary d-block mt-3">
                Select a minimum of three things that you plan to use Settlin to
                achieve
              </p>
            </Card.Header>

            <Card.Body style={{ marginTop: "-2rem" }}>
              <div className="row justify-content-center align-items-center">
                {initInterests.map((interest, index) => {
                  
                  return (
                    <div
                      className={`btn btn-outline-primary list-group-item me-3 border-1 border-primary rounded-3 mb-3 ${styles.itemBox} ${interest.selected?'bg-primary':''}`}
                      key={index}
                      style={{color:interest.selected?'white':''}}
                      onClick={()=>interestSelected(interest)}
                    >
                      {interest.label}
                    </div>
                  );
                })}
              </div>
            </Card.Body>
            <Card.Footer className="border-0 bg-transparent">
              <Image
                src="/assets/ellipse-intro-right.png"
                className="d-none d-md-block"
                style={{
                  position: "fixed",
                  bottom: "-82%",
                  right: "-5%",
                  zIndex: "-1",
                }}
                alt="ellipse-intro-right.png"
              />
              <div className="row justify-content-center">
                <div className="col-5 mt-5 d-grid">
                  <Button
                    className="btn btn-lg"
                    onClick={()=>handleSubmit()}
                  >
                    {showProgress?<Spinner style={{margin:'auto'}} radius={22} color={"lightgray"} stroke={2} visible={true} />:'Continue'}
                  </Button>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Container>
      </section>
    </>
  );
};

export default Interests;
