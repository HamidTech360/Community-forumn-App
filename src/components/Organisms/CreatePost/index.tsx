import React from "react";
import { Card, Col, Form, Image, Row } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import Editor from "../Editor";

const CreatePost = () => {
  const { user } = useAuth();
  return (
    <Card className="p-2 py-4" style={{ border: "none" }}>
      <div className="mx-2 d-flex gap-2 align-items-center bg-white radius-10">
        <>
          <Image
            src={user?.avatar?.url || "/images/formbg.png"}
            width={50}
            height={50}
            alt=""
            roundedCircle
          />
        </>
        <>
          <Form style={{ width: "100%" }}>
            <Form.Control
              className="radius-20"
              style={{ width: "100%" }}
              placeholder={`Hey ${
                user?.firstName.split(" ")[0]
              }, wanna say something?`}
            />
          </Form>
        </>
      </div>
    </Card>
  );
};

export default CreatePost;
