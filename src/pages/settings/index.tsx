import Delete from "@/components/Templates/Settings/Delete";
import General from "@/components/Templates/Settings/General";
import Notifications from "@/components/Templates/Settings/Notifications";
import Privacy from "@/components/Templates/Settings/Privacy";
import Security from "@/components/Templates/Settings/Security";
import React from "react";
import { useState } from "react";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";

const Settings = () => {
  const tabs = {
    general: { component: <General />, icon: "bi-gear" },
    security: { component: <Security />, icon: "bi-lock" },
    notifications: { component: <Notifications />, icon: "bi-bell" },
    privacy: { component: <Privacy />, icon: "bi-shield-check" },
    delete: { component: <Delete />, icon: "bi-trash3" },
  };

  const names = Object.keys(tabs);
  const [current, setCurrent] = useState(names[0]);
  return (
    <div className="mt-5">
      <Container>
        <Card style={{ border: "1px solid #e0e0e0" }}>
          <Card.Body>
            <Row>
              <Col xs={4} lg={3}>
                <h5 className="ms-3 bold">Settings</h5>
                <Nav className="d-flex flex-column text-capitalize">
                  {names.map((name, index) => (
                    <Nav.Link
                      className="text-secondary tab-item"
                      key={name}
                      onClick={() => setCurrent(names[index])}
                    >
                      <span className="pe-3">
                        <i className={`bi ${tabs[name].icon}`}></i>
                      </span>
                      {name}
                    </Nav.Link>
                  ))}
                </Nav>
              </Col>
              <Col xs={8} lg={9}>
                {tabs[current].component}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Settings;
