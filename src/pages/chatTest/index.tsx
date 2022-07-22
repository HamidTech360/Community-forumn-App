import React, {useState, useEffect, useRef} from 'react'
import { Row, Col, FormControl, Button } from 'react-bootstrap'
import axios from 'axios'
import config from '@/config'
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';


const ChatPage = ()=>{
    const [newMsg, setNewMsg]= useState('')
   const [receivedMessage, setReceivedMessage] = useState(null)
    const [messages, setMessages ] = useState([])
    const [conversations, setConversations ] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const user = useSelector(selectUser);
    
    const socket:any = useRef()
    //const scrollRef:any = useRef()
    //console.log(socket);
    

    useEffect(()=>{
        socket.current = io("ws://localhost:8900")
       
    },[])
    useEffect(()=>{
         socket.current.on("getMessage", data=>{
            //console.log('get message emission received');
            
            setReceivedMessage({
                sender:data.senderId,
                message:data.message,
                createdAt:'Just now'
            })
            // console.log('new data', data);
            
        })
    },[])
    
    useEffect(()=>{
        console.log(receivedMessage);
        
        const currentConversation = conversations.find(item=>item.sender._id===currentChat || item.receiver._id===currentChat)
        console.log(`current conversation is`, currentConversation);
        receivedMessage && currentConversation?.members.includes(receivedMessage.sender) &&
        setMessages((prev)=>[...prev, receivedMessage])
        
        //receivedMessage
    },[receivedMessage])

    useEffect(()=>{
        console.log(`user id is ${user?._id}`);
        if(!user?._id) return
        
        socket.current.emit("addUser", user?._id)
        socket.current.on("getUsers", users=>{
            console.log(users );
            
        })
    },[user])
    
    useEffect(()=>{
        (async function(){
            try{
                const {data} = await axios.get(`${config.serverUrl}/api/chats/conversations`, {headers:{
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }})
                //console.log(data);
                setConversations(data.conversations)
                
            }catch(error){
                console.log(error.response?.data);
            }
        })()
    },[])

    const selectChat = async (id)=>{
        console.log(id);
        setCurrentChat(id)
        try{
            const {data} = await axios.get(`${config.serverUrl}/api/chats/?mate=${id}`, {headers:{
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }})
            console.log(data);
            setMessages(data.messages)
            
        }catch(error){
            console.log(error.response?.data);
        }
    }
    const handleChange = (e)=>{
        setNewMsg(e.currentTarget.value)
        //console.log(newMsg);
        
    }
    
    const sendMessage = async ()=>{
        console.log(`current chat is ${currentChat}`);
        if(!currentChat) return
        
        socket.current.emit("sendMessage", {
            senderId:user?._id,
            receiverId:currentChat,
            message:newMsg
        })
        try{
            const {data}= await axios.post(`${config.serverUrl}/api/chats/?mate=${currentChat}`, {message:newMsg}, {headers:{
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }})
            console.log(data);
            setMessages([...messages, data.newMessage])
            setNewMsg('')
        }catch(error){
            console.log(error.response?.data);
            
        }
    }
    return(
        <div style={{marginTop:'30px'}}>
            <Row>
                <Col lg={3}>
                    <h2>Coversations</h2>
                    {conversations.map((item, i)=>
                        <div key={i} onClick={()=>selectChat(item.sender._id==user?._id?item.receiver._id:item.sender._id)} style={{background:'lightgray', padding:'20px', marginBottom:'20px'}}>
                        {item.sender._id==user._id?item.receiver.firstName:item.sender.firstName}
                    </div>
                    )}
                </Col>
                <Col lg={7} >
                    <h2>Chat Area</h2>
                    <div className="chatArea" style={{height:'400px', border:'1px solid lightgrey', overflow:'scroll', marginBottom:'20px', padding:'20px'}}>
                        {messages.map((item, i)=>
                        <div key={i} style={{background:'lightgrey', padding:'20px', marginBottom:'20px'}}>
                             <h6>{item.sender.firstName}</h6>
                            {item.message} <br />
                           <span style={{fontSize:'11px'}}>{item.createdAt}</span>
                        </div>
                        )}
                    </div>
                    <div className="form-box">
                        <FormControl value={newMsg} onChange={(e)=>handleChange(e)} ></FormControl>
                        <Button variant='success' onClick={()=>sendMessage()} >Send</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default ChatPage