import React, { useEffect, useState} from "react";
import Image from "next/image";
import styles from "../../../styles/templates/new-group/connection.module.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "@/redux/store";
import {GiCheckMark} from 'react-icons/gi'

const AddConnections = ({handleSubmit, isLoading, chooseConnections, data}) => {
  //ts-ignore
  const user = useSelector(s=>s.authState.user)
  console.log('user data from connection is', user);
  
  
  const [connections, setConnections]= useState([])
  useEffect(()=>{
    const addSelectionProps = [...user.followers, ...user.following, {_id:'12345', firstName:'Hammed', lastName:'Owolabi'}].map(el=>({...el, isSelected:false}))
    addSelectionProps.map((item)=>{
      const index = data.groupMembers.indexOf(item._id)
      if(index>-1){
        addSelectionProps[index].isSelected = true
      }
      //console.log(index, 'item is', item);
      //console.log('data from conn',data);
      
    })
    setConnections(addSelectionProps) 

  },[])

  const handleSelection = (item:any, i:any)=>{
    let clone = [...connections]
    clone[i].isSelected? clone[i].isSelected =false:clone[i].isSelected = true
    setConnections(clone)
    const selectedConnections = connections.filter(el=>el.isSelected===true)
    const connectionIds = selectedConnections.map(item=>item._id)
    console.log('selected Ids are', connectionIds);
    chooseConnections(connectionIds)
   //console.log(clone, connections);
    
  }
  
  return (
    <div className={styles.Conections}>
      <div className={`${styles.ConnectionHeader}`}>Add Connections</div>
      <Form.Control
        size="lg"
        name="connection"
        type="text"
        className={styles.searchBox}
        placeholder="Type a connections name and use the enter key to add"
        // onChange={handleChange}
      />

      <Row className={styles.connectionLists}>
        {connections.map((item, i) => (
          <Col
            key={i}
            lg="3"
            md="3"
            sm="5"
            xs="5"
            className={styles.connectionItem}
            onClick={()=>handleSelection(item, i)}
          >
            <Image
              src={`/images/friends${i + 1}.png`}
              alt="profile"
              className={styles.profilePics}
            />
            <span className={styles.userName}>
              {`${item.firstName} ${item.lastName}`} 
             {item.isSelected?  <GiCheckMark size={23} style={{color:'green', marginLeft:'10px'}}/> :""}
            </span>
          </Col>
        ))}
      </Row>

      <div className="text-center">
        <Button onClick={()=>handleSubmit()} className={styles.createBtn}> {isLoading?'creating...':'Create group'} </Button>
      </div>
    </div>
  );
};

export default AddConnections;
