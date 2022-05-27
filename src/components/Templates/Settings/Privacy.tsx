import React from "react";
import { Container, Form} from "react-bootstrap";
import styles from '../../../styles/privacy.module.scss'

const Privacy = () => {
  return (
    <>
      <Container className= {styles.container}>
          <Form className = {styles.form1}>
            <div>
              <Form.Label className = {styles.name}>
                Who can see your future posts?
              </Form.Label>

              <Form.Select aria-label="Default select example" className= {styles.select}>
                <option>Everyone</option>
              </Form.Select>
              <br />
            </div>


            <div>
              <Form.Label className = {styles.name}>
                Who can tag you in a post?  
              </Form.Label>

              <Form.Select aria-label="Default select example" className= {styles.select}>
                <option>Everyone</option>
              </Form.Select>
              <br />
            </div>

            <div>
              <Form.Label className = {styles.name}>
                Who can add you to a group?
              </Form.Label>

              <Form.Select aria-label="Default select example" className= {styles.select}>
                <option>Everyone</option>
              </Form.Select>
              <br />
            </div>

              <div>
              <Form.Label className = {styles.name}>
                Who can see your friend list?
              </Form.Label>

              <Form.Select aria-label="Default select example" className= {styles.select}>
                <option>Everyone</option>
              </Form.Select>
              <br />
            </div>

            <div>
              <Form.Label className = {styles.name}>
                Who can send you a message?
              </Form.Label>

              <Form.Select aria-label="Default select example" className= {styles.select}>
                <option>Everyone</option>
              </Form.Select>
              <br />
            </div>
          </Form>
      </Container>
    </>
  )
};

export default Privacy;
