import React, {useState, useEffect} from 'react';
import { Badge, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import {FiMoreVertical} from 'react-icons/fi'
import styles from '../../../styles/friends.module.scss';

// interface FriendsListProp {
//     friendsList: FriendsDataType
//   }
  
//   export type FriendsDataType = {
//     friends : friendType[]
//   }

//   type friendType = {
//     id: number,
//     image: string,
//     name: string,
//     number: string,
//     menu: string
//   }

const FriendsData = ({friendsList}:any) => {
    
   
    // const { friends } = props.friendsList;
    console.log('friend lists are ', friendsList);

  return (
      <>
            <Row xs={1} md={2} className={`g-4 ${styles.row}`} >

                {friendsList?.map((friend) => (
                    <Col md={6} sm={12} lg = {6}>
                        <Card key= { friend.id} className = {styles.card}>
                            <Card.Body >
                                <ListGroup variant = 'flush'>
                                    <ListGroup.Item  as="li" className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <Image 
                                            className = {styles.img}
                                            src= {'/images/imagePlaceholder.jpg'} alt='user'/>
                                        </div>
                                        <div className = { styles.title}>
                                                                                                        <Card.Title className = { styles.firstName}>
                                                {friend.firstName}
                                            </Card.Title>
                                            <Card.Subtitle className = {`mb-2 text-muted ${styles.subtitle}`}> 0 Mutual Friends </Card.Subtitle>

                                        </div>

                                        <Badge bg= 'light'>
                                           
                                            <FiMoreVertical size={20} />
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