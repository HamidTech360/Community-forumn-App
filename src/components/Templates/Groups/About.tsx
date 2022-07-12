/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Container, Card } from "react-bootstrap";


const About = ({type, data}:any) => {
  const [activeTab, setActiveTab] = useState("bio");
  const [interests, setInterests] = useState([
    "Studying abroad",
    "Internship abroad",
    "Postgraduate study abroad",
    "Housing in Ghana",
  ]);

 

  return (
    <section>
      <Container className="shadow-sm">
        <Card className="border-0">
          <div className="row g-2" style={{ marginTop: "-2rem" }}>
            
            <div className="col-md-12 col-lg-12">
              <Card.Body
                id="profileMainSide"
                className="bg-light shadow"
                style={{ height: "100%" }}
              >
                 <Container>
                    <div className="row">
                      <h5 className="col-10">Group description</h5>
                      <h5 className="col-2 btn" style={{ marginTop: "-.5rem" }}>
                        <i className="bi bi-pencil-square"></i>
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
