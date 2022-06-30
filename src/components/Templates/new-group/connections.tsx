import React from "react";
import styles from "../../../styles/templates/new-group/connection.module.css";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddConnections = ({handleSubmit, isLoading}) => {
  const connections = [
    {
      username: "Hammed Owolabi",
      image: "",
    },
    {
      username: "Hammed Owolabi",
      image: "",
    },
    {
      username: "Hammed Owolabi",
      image: "",
    },
    {
      username: "Hammed Owolabi",
      image: "",
    },
    {
      username: "Hammed Owolabi",
      image: "",
    },
    {
      username: "Hammed Owolabi",
      image: "",
    },
    {
      username: "Hammed Owolabi",
      image: "",
    },
    {
      username: "Hammed Owolabi",
      image: "",
    },
    {
      username: "Hammed Owolabi",
      image: "",
    },
  ];
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
          >
            <img
              src={`/images/friends${i + 1}.png`}
              alt="profile"
              className={styles.profilePics}
            />
            <span className={styles.userName}>{item.username}</span>
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
