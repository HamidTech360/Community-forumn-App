/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { Container, Card } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const About = ({ data }: { data?: Record<string, any> }) => {
  console.log("data:", data);

  return (
    <section>
      {/* <Container className="shadow-sm"> */}
      <Container>
        <Card className="border-0">
          <div
            className="row g-2"
            // style={{ marginTop: "-2rem" }}
          >
            <div className="col-md-12 col-lg-12">
              <Card.Body
                id="profileMainSide"
                // className="bg-light shadow"
                className="bg-light"
                style={{
                  height: "100%",
                  border: "1px solid rgba(0, 0, 0, 0.125)"
                }}
              >
                <Container>
                  <div className="row">
                    <h5 className="col-10">Group description</h5>
                    <h5 className="col-2 btn" style={{ marginTop: "-.5rem" }}>
                      <BsPencilSquare />
                    </h5>
                  </div>
                  <div className="row">
                    <p className="col-12 text-muted" id="bioText">
                      {data?.description}
                    </p>
                  </div>
                </Container>
              </Card.Body>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default About;
