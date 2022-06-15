import React from "react";
import { Button, Card, Container, Image } from "react-bootstrap";
import styles from "../../../styles/delete.module.scss"

const Delete = () => {
  return (
    <>
      <Container className = {styles.container}>
        <Card className= {styles.card}>
          <Card.Body>
            <Card.Title className = {styles.title}>Confirmation</Card.Title>
            <Image src= './assets/Warning.png' alt= 'warning' className = {styles.img}/>
            <Card.Text className= {styles.text}>
              Deleting your account will delete all of the content you have created. 
              It will be completely irrecoverable.
            </Card.Text>

            <div>
              <Button className= {styles.btn1}>
                Cancel
              </Button>
              <Button className= {styles.btn2}>
                <Image src = './assets/Delete.png' alt = 'delete' className = {styles.img2}/>  Confirm
              </Button>
            </div>
    
          </Card.Body>
        </Card>
      </Container>
    </>
  )
};

export default Delete;
