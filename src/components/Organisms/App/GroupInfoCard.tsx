import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useState} from "react";
import axios from "axios";
import config from "@/config";
import Spinner from 'react-spinner-material'
import {
  Button,
  Card,
  CardImg,
  Col,
  Dropdown,
  Image,
  Nav,
  Row,
} from "react-bootstrap";
import About from "../../Templates/Groups/About";
import Bookmarks from "../../Templates/Profile/Bookmarks";
import Friends from "../../Templates/Groups/Friends";
import Media from "../../Templates/Groups/Media";
import Timeline from "../../Templates/Groups/Timeline";
import {useDispatch, useSelector} from '@/redux/store'
import {selectUser} from '@/reduxFeatures/authState/authStateSlice'

interface IComponents {
  about: ReactNode;
  timeline: ReactNode;
  videos: ReactNode;
  photos: ReactNode;
  members: ReactNode;
}
const Components: IComponents = {
  timeline: <Timeline />,
  about: <About />,
  photos: <Media />,
  members: <Friends />,
  videos: <Media />,
};

const GroupInfoCard = ({data}:any) => {
  const { path, id } = useRouter().query;
  const [joined, setJoined] = useState(false)
  const [joining, setJoining] = useState(false)
  const user = useSelector(selectUser)
 
  const handleJoin = async ()=>{
    if( data.groupMembers?.find(e=>e._id===user._id) || joined ) return
  
    setJoining(true)
    try{
      const response = await axios.patch(`${config.serverUrl}/api/groups/group/${data._id}`, {}, {headers:{
        authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }})
      console.log(response.data)
      setJoining(false)
      setJoined(true)
      
    }catch(error){
      console.log(error.response?.data);
      setJoining(false)
    }
  }
  

  return (
    <Card className="mb-3">
      <CardImg
        src="/images/formbg.png"
        height={150}
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Row>
          <Col xs={2}>
            <Image
              src="/images/article.png"
              className="pic"
              width={80}
              height={80}
              alt=""
              style={{ transform: "translateY(-40%)" }}
              roundedCircle
            />
          </Col>
          <Col xs={10} className="d-flex flex-column">
            {" "}
            <p className="bold">
              {data?.name}
            </p>
            <small className="text-mute">{data?.privacy} Group</small>
            <div className="mb-div mb-2">
              <Button onClick={()=>handleJoin()} variant="primary" className="mb-btns">
                  {joining?
                    <Spinner radius={22} color={"lightgray"} stroke={2} visible={true} />
                        :
                     data.groupMembers?.find(e=>e._id===user._id) || joined ?'Joined':'Join'
                  }               
              </Button>{" "}
              <Button variant="outline-primary" className="mb-btns">
                Invite{" "}
                <Image
                  src="/images/invite.png"
                  alt="invite"
                  className="image2"
                />
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        {" "}
        <Nav className="d-flex justify-content-around  text-capitalize">
          {Object.keys(Components).map((item, index) => (
            <Nav.Item
              key={item}
              className={item === path ? "text-primaries" : "textMute"}
            >
              <Link href={`/groups/${id}/${item}`}>{item}</Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Footer>
    </Card>
  );
};

export default GroupInfoCard;
