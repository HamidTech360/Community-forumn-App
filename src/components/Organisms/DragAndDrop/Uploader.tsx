import React from "react";
import { Form, Formik } from "formik";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import MultipleFileUploadField from "./upload/MultipleFileUploadField";
import { array, object, string } from "yup";

function Uploader() {
  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <Formik
              initialValues={{ files: [] }}
              validationSchema={object({
                files: array(
                  object({
                    url: string().required(),
                  })
                ),
              })}
              onSubmit={(values) => {
                if (values.files.length > 0) {
                  console.log("VALUES+++:", values);
                  return new Promise((res) => setTimeout(res, 2000));
                } else {
                  console.log("Drag & Drop a valid file");
                }
              }}
            >
              {({ values, errors }) => (
                <Form>
                  <Col className="my-2">
                    <MultipleFileUploadField name="files" />
                  </Col>

                  <Col className="mt-5">
                    <Button type="submit">Submit</Button>
                  </Col>

                  <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Uploader;
