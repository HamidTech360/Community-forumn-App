import React from "react";
import { Button, Container, Form, Image} from "react-bootstrap";
import styles from "../../../styles/settings.module.scss"


const Security = () => {
  return (
    <>
      <Container className = {styles.container}>
        <h4>Reset Password</h4>

        <Form className = {styles.form}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className = { styles.label}>Old Password</Form.Label>

            <Form.Control type="password" placeholder="Password" className = {styles.input}/>
            <Image src="./assets/Vector.png" alt="" className={styles.img1} />
          </Form.Group>
      

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className = { styles.label}>New Password</Form.Label>

            <Form.Control type="password" placeholder="enter password" className = {styles.input}/>
            <Image src="./assets/Vector.png" alt="" className={styles.img2} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className = { styles.label}>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="enter password" className = {styles.input}/>
            <Image src="./assets/Vector.png" alt="" className={styles.img3} />
          </Form.Group>
          

          <div className = {styles.div}>
            <Button variant="primary" type="submit" className = {styles.btn}>
              Update
            </Button>
          </div>
          
        </Form>

        
      </Container>
    </>
    )
};

export default Security;
