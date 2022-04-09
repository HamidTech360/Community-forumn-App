import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthContent from "../../components/Auth/AuthContent";
import UserCard from "../../components/Organisms/App/UserCard";
import CreatePost from "../../components/Organisms/CreatePost";
import useAuth from "../../hooks/useAuth";
const Feed = () => {
  const { user } = useAuth();
  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);
  return (
    <AuthContent>
      <Container>
        <Row className="py-3">
          <Col md={3}>
            <UserCard user={user!} />
          </Col>
          <Col md={6}>
            <main>
              <CreatePost />
            </main>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </AuthContent>
  );
};

export default Feed;
