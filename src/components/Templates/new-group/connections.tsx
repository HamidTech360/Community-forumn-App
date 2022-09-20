import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/templates/new-group/connection.module.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "@/redux/store";
import { GiCheckMark } from "react-icons/gi";

const AddConnections = ({
  handleSubmit,
  isLoading,
  chooseConnections,
  data
}) => {
  //ts-ignore
  const user = useSelector(s => s.authState.user);
  

  const [connections, setConnections] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const connectionList =  [...user.followers]
    user?.following?.map(item=>{
     const index = connectionList.find(el=>el._id==item._id)
     if(!index){
      connectionList.push(item)
     }
    })
    
    const addSelectionProps = connectionList.map(
      el => ({ ...el, isSelected: false })
    );
     
    data.groupMembers.map(item=>{
      const findItem = addSelectionProps.find(el=>el._id==item)
      const index = addSelectionProps.indexOf(findItem)
      if(index>-1){
        addSelectionProps[index].isSelected=true
      }
    })
    setConnections(addSelectionProps);
  }, [ user.followers, user.following]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelection = (item: any, i: any) => {
    console.log(i)
    const clone = [...connections];
    clone[i].isSelected = !clone[i].isSelected
    setConnections(clone);
    const selectedConnections = connections.filter(
      el => el.isSelected
    );
    
    const connectionIds = selectedConnections.map(item => item._id); 
   
    chooseConnections(connectionIds);
    
  };

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
            key={i} lg="3" md="3" sm="5" xs="5"
            className={styles.connectionItem}
            onClick={() => handleSelection(item, i)}
          >
            <div>
              <Image
                src={item.images?.avatar || `/images/imagePlaceholder.jpg`}
                alt="profile"
                className={styles.profilePics}
                width={60}
                height={60}
              />
            </div>
            <div className={styles.userNameBox}>
              <span className={styles.userName}>
                {`${item.firstName} ${item.lastName}`}
                {item.isSelected ? (
                  <GiCheckMark
                    size={23}
                    style={{ color: "green", marginLeft: "10px" }}
                  />
                ) : (
                  ""
                )}
              </span>
            </div>
          </Col>
        ))}
      </Row>

      <div className="text-center">
        <Button onClick={() => handleSubmit()} className={styles.createBtn}>
          {" "}
          {isLoading ? "creating..." : "Create group"}{" "}
        </Button>
      </div>
    </div>
  );
};

export default AddConnections;
