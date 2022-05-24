import React from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import styles from "../../../styles/notifications.module.scss"

const Notifications = () => {
  return (
    <>
      <Container className= {styles.content}>
        <ListGroup variant="flush">
          <ListGroup.Item>
          <h4>Email Notifications preferences</h4>
          </ListGroup.Item>

          <ListGroup.Item>
            <p>ACTIVITY FEED</p>


            <Form className= {styles.form1}>
              <div>
                <Form.Label className = {styles.name}>
                  A member mentions you in an update using "@Esther"	
                </Form.Label>
                  <Form.Check aria-label="option 2"  className= {styles.label}/>
              </div>
              
              <div>
                <Form.Label className = {styles.name}>
                  A member replies to an update or comment you've posted	
                </Form.Label>
                  <Form.Check aria-label="option 2"  className= {styles.label}/>
              </div>
            </Form>

          </ListGroup.Item>
          
          <ListGroup.Item>
            <p>MESSAGES</p>

            <Form className= {styles.form1}>
              <div>
                <Form.Label className = {styles.name}>
                  A member sends you a new message		
                </Form.Label>
                  <Form.Check aria-label="option 2"  className= {styles.label}/>
              </div>
            </Form>

          </ListGroup.Item>

          <ListGroup.Item>
            <p>GROUPS	</p>


            <Form className= {styles.form1}>
              <div>
                <Form.Label className = {styles.name}>
                  A member invites you to join a group		
                </Form.Label>
                  <Form.Check aria-label="option 2"  className= {styles.label}/>
              </div>
              
              <div>
                <Form.Label className = {styles.name}>
                  Group information is updated	
                </Form.Label>
                  <Form.Check aria-label="option 2"  className= {styles.label}/>
              </div>

                
              <div>
                <Form.Label className = {styles.name}>
                  You are promoted to a group organizer or moderator	
                </Form.Label>
                  <Form.Check aria-label="option 2"  className= {styles.label}/>
              </div>

              <div>
                <Form.Label className = {styles.name}>
                  A member requests to join a private group you organize		
                </Form.Label>
                  <Form.Check aria-label="option 2"  className= {styles.label}/>
              </div>

              <div>
                <Form.Label className = {styles.name}>
                  Your request to join a group has been approved or denied		
                </Form.Label>
                  <Form.Check aria-label="option 2"  className= {styles.label}/>
              </div>
            </Form>

          </ListGroup.Item>

          <ListGroup.Item>
            <p>CONNECTIONS</p>


            <Form className= {styles.form1}>
              <div>
                <Form.Label className = {styles.name}>
                  A member invites you to connect		
                </Form.Label>
                  <Form.Check aria-label="option 2"  className= {styles.label}/>
              </div>
              
              <div>
                <Form.Label className = {styles.name}>
                  A member accepts your connection request	
                </Form.Label>
                  <Form.Check aria-label="option 2"  className= {styles.label}/>
              </div>
            </Form>

          </ListGroup.Item>
        </ListGroup>
      </Container>
    </>
    )
  };

export default Notifications;
