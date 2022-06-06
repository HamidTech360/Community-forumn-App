import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
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

const GroupInfoCard = () => {
  const { path, id } = useRouter().query;

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
            <text className="bold">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit,
              atque!
            </text>
            <small className="text-mute">Public Group</small>
            <div className="mb-div mb-2">
              <Button variant="primary" className="mb-btns">
                Joined{" "}
                <Image
                  src="/images/Stroke-1.png"
                  alt="down"
                  className="image1"
                />
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
              className={item === path ? "text-primary" : "text-muted"}
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
