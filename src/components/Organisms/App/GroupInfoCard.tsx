import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { Card, CardImg, Col, Image, Nav, Row } from "react-bootstrap";
import About from "../../Templates/Profile/About";
import Bookmarks from "../../Templates/Profile/Bookmarks";
import Friends from "../../Templates/Profile/Friends";
import Media from "../../Templates/Profile/Media";
import Timeline from "../../Templates/Profile/Timeline";

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
          <Col xs={4} md={2}>
            <Image
              src="/images/article.png"
              width={80}
              height={80}
              alt=""
              style={{ transform: "translateY(-40%)" }}
              roundedCircle
            />
          </Col>
          <Col xs={8} md={10} className="d-flex flex-column">
            {" "}
            <text className="bold">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit,
              atque!
            </text>
            <small className="text-muted">Public Group</small>
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
