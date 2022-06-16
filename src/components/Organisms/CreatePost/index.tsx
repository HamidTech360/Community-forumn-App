//import useUser from "@/hooks/useUser";
import React from "react";
import { Card, Col, Form, Image, Row } from "react-bootstrap";

import { useSelector } from "@/redux/store";
import styles from '@/styles/utils.module.scss';


import Editor from "../Editor";

const CreatePost = () => {
 // const { user } = useUser();
 const {data} = useSelector(s=>s.user)
  return (
    <Card className="p-2 py-4" style={{ border: "none" }}>
      <div className="mx-2 d-flex gap-2 align-items-center bg-white radius-10">
        <>
          <Image
            src={data?.avatar?.url || "/images/formbg.png"}
            width={50}
            height={50}
            alt=""
            roundedCircle
          />
        </>
        <>
          <Form style={{ width: "100%" }}>
            <Form.Control
              className={`radius-20  ${styles.form}`}
              style={{ width: "100%" }}
              placeholder={`Hey ${
                data?.firstName.split(" ")[0]
              }! wanna say something?`}
            />
          </Form>
        </>
      </div>
    </Card>
  );
};

export default CreatePost;
