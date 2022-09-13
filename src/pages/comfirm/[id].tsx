import Head from "next/head";
import React,{useEffect, useState} from "react";
import { useRouter } from "next/router";
import { Image, Button } from "react-bootstrap";
import axios from 'axios'
import config from "@/config";
import Spinner from "react-spinner-material";
import styles from "../../styles/success-reset.module.scss";


const SuccessReset = () => {
  
  const router = useRouter()
  const [verified, setVerified] = useState(null)
  useEffect(()=>{
    //console.log(router.query.id)
    if(router.query.id){
        (async function (){
            try{
                const response = await axios.post(`${config.serverUrl}/api/auth/verify`, {code:router.query.id})
                console.log(response.data)
                setVerified('success')
            }catch(error){
                console.log(error.response?.data)
                setVerified('failed')
            }
        })()
    }
  },[router.query.id])
  return (
    <>
      <Head>
        <title>Email Verification</title>
      </Head>
      <div className={styles.body}>
        <Image
          src="/assets/ellipse-intro-top.png"
          className={styles.vector1}
          alt=""
        />

        <div className={styles.page}>
          
          {!verified &&
          <>
          <Spinner style={{margin:'auto'}} />
          <p>Please wait while we verify your account</p>
          </>
          }


          {verified=='success' &&
          <>
            <h1>Success!</h1>
            <p>Account verified successfully</p>
          </>
          }

         {verified=='failed' &&
          <>
            <h1>Failed!</h1>
            <p>OOps. Failed to verify your account. Refresh this page to try again</p>
          </>
          }

          <Button onClick={()=>router.push('/login')} style={{fontSize:'14px'}}>Back To Login</Button>
        </div>
        <Image
          src="/assets/ellipse-intro-right.png"
          className={styles.vector2}
          alt=""
        />
      </div>
    </>
  );
};

export default SuccessReset;
