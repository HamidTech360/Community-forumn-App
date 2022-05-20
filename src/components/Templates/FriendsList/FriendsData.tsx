import React from 'react';
import { Badge, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import styles from '../../../styles/friends.module.scss';

interface FriendsListProp {
    friendsList: FriendsDataType
  }
  
  export type FriendsDataType = {
    friends : friendType[]
    
  }

  type friendType = {
    id: number,
    image: string,
    name: string,
    number: string,
    menu: string
  }

const FriendsData = (props: FriendsListProp) => {
    
    const { friends } = props.friendsList;

  return (
      <>
            <Row xs={1} md={2} className="g-4" >

                {friends.map((friend) => (
                    <Col md={12} lg = {6}>
                        <Card key= { friend.id} className = {styles.card}>
                            <Card.Body >
                                <ListGroup variant = 'flush'>
                                    <ListGroup.Item  as="li" className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <Image src= {friend.image} alt='debola'/>
                                        </div>
                                        <div className = { styles.title}>
                                                                                                        <Card.Title className = { styles.name}>
                                                {friend.name}
                                            </Card.Title>
                                            <Card.Subtitle className = "mb-2 text-muted">{friend.number} </Card.Subtitle>

                                        </div>

                                        <Badge bg= 'light'>
                                            <Image src = {friend.menu} alt = 'dot'/>
                                        </Badge>
                                    </ListGroup.Item>
                                </ListGroup>
                                                              
                            </Card.Body>
                        </Card>
                    </Col>
                    
                ))}
        </Row>
      </>
    
  )
}

export default FriendsData