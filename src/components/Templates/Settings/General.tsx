import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import styles from "../../../styles/settings.module.scss"


const General = () => {
  return(
    <>
      <Container className = {styles.container}>
        <Form className = {styles.form}>
          <Form.Group className={`mb-3 ${styles.group}`} controlId="exampleForm.ControlInput1">
            <Form.Label className = { styles.label}>Full Name</Form.Label>

            <Form.Control type="email" placeholder="Mike Dike" className = {styles.input} />
          </Form.Group>


          <Form.Group className={`mb-3 ${styles.group}`} controlId="exampleForm.ControlInput1">
            <Form.Label className = { styles.label}>Username</Form.Label>

            <Form.Control type="password" placeholder="Mikengdike" className = { styles.input }/>
          </Form.Group>


          <Form.Group  className={`mb-3 ${styles.group}`}controlId="formBasicEmail">
            <Form.Label className = { styles.label}>Email Address</Form.Label>

            <Form.Control type="email" placeholder="Mikedike@gmail.com" className = {styles.input} />
          </Form.Group>

          
          <div className = {styles.div}>
            <Button variant="primary" type="submit" className = {styles.btn}>
              Update
            </Button>
          </div>
          
        </Form>
      </Container>
    </>
    ) ;
};

export default General;
