import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "@/redux/store";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../../styles/settings.module.scss"
import 'react-toastify/dist/ReactToastify.css';

const General = () => {
  const {data} = useSelector(s=>s.user)
  console.log(data);

  useEffect(()=>{
    const clone = {...formData}
    clone['email'] = data?.email
    setFormData(clone)
  },[data])
  
 const router = useRouter()
 const [progress, setProgress] = useState(false)
 const [formData, setFormData] = useState({
    email:''
  }) 

  const handleChange =  (e)=>{
    const clone = {...formData}
    clone[e.currentTarget.name] = e.currentTarget.value
    setFormData(clone)
    console.log(formData);
    
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setProgress(true)
    if(data?.email===formData.email){
      setProgress(false)
      return toast.warning('No change was made',{
        position: toast.POSITION.TOP_RIGHT,
        autoClose:7000,
        toastId:'toast1'
      })
      
    }
    if (formData.email=="") {
      setProgress(false)
      return toast.error('Field cannot be empty',{
        position: toast.POSITION.TOP_RIGHT,
        autoClose:7000,
        toastId:'toast2'
      })
    }

    const comfirm = window.confirm('Are you sure to continue wuth this action?')
    if(!comfirm){
      setProgress(false)
      return
    }
       
    try{
      const response = await axios.put(`/api/user`, {...formData}, {
        headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      console.log(response.data);
      

      toast.success('Update successful', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose:7000,
        toastId:'toast3'
      })
      setProgress(false)
      
      setTimeout(()=>{
        localStorage.removeItem('accessToken')
        router.push('/login')
      },3000)
    }catch(error){
      toast.error('Update failed', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose:7000,
        toastId:'toast4'
      })
      setProgress(false)
      console.log(error.response?.data);
      
    }
    


  }
  
  return(
    <>
      <ToastContainer/>
      <Container className = {styles.container}>

        <Form className = {styles.form}>
          <Form.Group className={`mb-3 ${styles.group}`} controlId="exampleForm.ControlInput1">
         <Form.Label className = { styles.label}>Full Name</Form.Label>

            <Form.Control type="text" readOnly={true} defaultValue={`${data?.firstName} ${data?.lastName}`}  className = {styles.input} />
          </Form.Group>


          <Form.Group className={`mb-3 ${styles.group}`} controlId="exampleForm.ControlInput1">
            <Form.Label className = { styles.label}>Username</Form.Label>

            <Form.Control type="text" readOnly={true} defaultValue={data?.firstName} placeholder={data?.firstName} className = { styles.input }/>
          </Form.Group>


          <Form.Group  className={`mb-3 ${styles.group}`}controlId="formBasicEmail">
            <Form.Label className = { styles.label}>Email Address</Form.Label>

            <Form.Control  name="email" onChange={(e)=>handleChange(e)} type="email" value={formData.email}  className = {styles.input} />
          </Form.Group>

          
          <div className = {styles.div}>
            <Button onClick={(e)=>handleSubmit(e)} variant="primary" type="submit" className = {styles.btn}>
              {progress?'Updating...':'Update'}
            </Button>
          </div>
          
        </Form>
      </Container>
    </>
    ) ;
};

export default General;
