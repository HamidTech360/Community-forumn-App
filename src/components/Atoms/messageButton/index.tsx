import React, {useState} from 'react'
import {RiMessage2Fill} from 'react-icons/ri'
import Link from 'next/link'
import { Offcanvas } from 'react-bootstrap'
import axios from 'axios'
import config from '@/config'
import { useRouter } from 'next/router'

const MessageButton = ()=>{
    const router = useRouter()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const [conversations, setConversations] = useState([])
    const handleShow = async () =>{
       //setShow(true)
      router.push('/chat')
    };
    
    return(
     <>
       
      <div className="message-icon-circle" onClick={handleShow} >
        <RiMessage2Fill size={25} color="white" />
      </div>
   
      <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Body>
        
      </Offcanvas.Body>
      </Offcanvas>
     </>
    )
}

export default MessageButton