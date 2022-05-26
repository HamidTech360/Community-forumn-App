import React from 'react'
// import Age from "../../Atoms/Age";
import { Button, Card, Col, Container, Image, NavDropdown, Row } from 'react-bootstrap';
import styles from '../../../../styles/timeline.module.scss';

const PostCard = () => {
  const postButton = [
    {
      name: "Like",
      reaction: true,
    },
    {
      name: "Share",
      reaction: true,
    },
    {
      name: "Comment",
      reaction: true,
    },
    {
      name: "Bookmark",
      reaction: true,
    },
  ];
  return (
    <>
       <Container className = {styles.container}>
                <Card className= {styles.card}>
                    <Card.Title>
                        <Row className= {styles.row}>
                            <Col xs={2} md={3}>
                                <Image src = '/images/timeline.png' alt = 'timeline ' className = {styles.img1}/>
                            </Col>
                            <Col xs={8} md={8} className= {styles.col}>
                                <div>
                                    <h4>
                                        Job market for international professionals in Germany
                                    </h4>
                                    <small>
                                        Posted by Ephraim Nkonam     . 3 hours ago
                                        </small>
                                </div>
                            </Col>
                            <Col xs={2} md={1}>
                                <NavDropdown  className="position-absolute end-0"
                                drop="down"
                                title={
                                <Button variant="light" size="sm">
                                    <Image src= '/images/dots.png' alt= 'dots' className= {styles.img2}/>
                                </Button>
                                }>
                                     <NavDropdown.Item>
                                    <i className="bi bi-clipboard-fill" /> &nbsp; Copy post link
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                    <i className="bi bi-folder-fill" /> &nbsp; Open Post
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                    {" "}
                                    <i className="bi bi-flag-fill" /> &nbsp; Report post
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                    <i className="bi bi-x-circle-fill" /> &nbsp; Unfollow &nbsp;
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Col>
                        </Row>
                    </Card.Title>

                    <Card.Body className={styles.body}>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing fermentum, ut duis lorem facilisi enim, quis a neque. Urna, pretium pulvinar diam tincidunt pretium elit elementum. Sagittis faucibus augue mi elementum faucibus quis tristique varius. Suspendisse rhoncus, integer at ut lectus sed.</p>
                        </div>
                    </Card.Body>

                    <Card.Footer className="mx-2 d-flex justify-content-between bg-white">
                        {postButton.map((item, key) => (
                        <Button
                            variant="none"
                            className="d-flex justify-content-center gap-1 align-items-center"
                        >
                            <Image
                            src={`/assets/icons/${item.name.toLowerCase()}.svg`}
                            alt=""
                            width={20}
                            height={20}
                            />
                            <span className="d-none d-md-block">{item.name}</span>
                        </Button>
                        ))}
                    </Card.Footer>
                </Card>
            </Container>
    </>
  )
}

export default PostCard