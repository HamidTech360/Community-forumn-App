import React, {useEffect, useState} from 'react'
import { Row, Col, Image, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios'
import config from '@/config'

import styles from "@/styles/invite.module.scss";

const InviteMembers = ()=>{
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [sentInvites, setSentInvites] = useState([])
    useEffect(() => {
        document.body.style.backgroundColor = "#f6f6f6";
      }, []);

     useEffect(()=>{
        if(!router.query.group) return
        console.log(router.query.group);
        (async ()=>{
            try{
                const response = await axios.get(`${config.serverUrl}/api/groups/invite/${router.query.group}`, {headers:{
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }})
               console.log(response.data)
                setData(response.data.user)
                setSentInvites(response.data.sentInvites)
            }catch(error){
                console.log(error.response?.data)
            }finally{
                setIsLoading(false)
            }
        })()
     },[router.query])

     const handleInvite = async (item)=>{
        console.log(item)
        const payload = {
            groupId:router.query.group,
            groupName:router.query.name,
            userId:item._id
        }
        console.log(payload)
       
        try{
            const response = await axios.post(`${config.serverUrl}/api/groups/invite`,payload, {headers:{
                authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }})
            console.log(response.data)
            const invite__c = [...sentInvites]
            invite__c.push(item._id)
            setSentInvites(invite__c)
        }catch(error){
            console.log(error.response?.data)
        }
     }

    return(
        <div>
            <div className={styles.content}>
                <div className="text-center" style={{marginBottom:'20px'}}> <h2>Invite Members</h2> </div>
                {isLoading &&  <div className="text-center" style={{fontWeight:'bold'}}>Fetching suggestions...</div>}
                <div className={styles.allUsers}>
                    <Row >
                        {data.map((item, i) => (
                        <Col
                            key={i} lg="3" md="3" sm="5" xs="5"
                            className={styles.userBox}
                        >
                            <div  className={`${styles.profilePics} text-center`}>
                            <Image
                                src={item.images?.avatar || `/images/imagePlaceholder.jpg`}
                                alt="profile"
                                width={100}
                                height={100}
                                roundedCircle
                                style={{objectFit:'cover'}}
                            />
                            </div>
                            <div className={`${styles.userNameBox} text-center`}>
                        
                            <div>{`${item.firstName} ${item.lastName}`}</div>
                                {
                                    sentInvites.includes(item._id)?
                                    <div className={styles.inviteText}>Invite sent</div>:
                                    <div onClick={()=>handleInvite(item)} className={styles.inviteText}>Invite</div>
                                }
                            </div>
                        </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default InviteMembers