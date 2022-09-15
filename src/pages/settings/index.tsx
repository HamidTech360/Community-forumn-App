import { useState, useEffect } from "react";
import Delete from "@/components/Templates/Settings/Delete";
import General from "@/components/Templates/Settings/General";
import Notifications from "@/components/Templates/Settings/Notifications";
import Privacy from "@/components/Templates/Settings/Privacy";
import Security from "@/components/Templates/Settings/Security";
import AuthContent from "@/components/Auth/AuthContent";
import React from "react";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";

import { VscSettingsGear } from "react-icons/vsc";
import { BsLock, BsBell, BsShieldCheck, BsTrash } from "react-icons/bs";
import Head from "next/head";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectActiveTab,
  setActiveTab
} from "@/reduxFeatures/app/settingsSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  const tabs = {
    general: { component: <General />, icon: <VscSettingsGear /> },
    security: { component: <Security />, icon: <BsLock /> },
    notifications: { component: <Notifications />, icon: <BsBell /> },
    privacy: { component: <Privacy />, icon: <BsShieldCheck /> },
    "delete account": { component: <Delete />, icon: <BsTrash /> }
  };

  const names = Object.keys(tabs);
  const [current, setCurrent] = useState(names[0]);

  useEffect(() => {
    // Set Active Tab From State
    setCurrent(activeTab);
    return () => {
      // Reset Active Tab
      dispatch(setActiveTab("general"));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <AuthContent>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="mt-5">
        <Container>
          <Card style={{ border: "1px solid #e0e0e0" }}>
            <Card.Body>
              <Row>
                <Col xs={12} md={3}>
                  <h5 className="ms-3 bold">Settings</h5>
                  <Nav className="d-flex  flex-md-column justify-content-around text-capitalize">
                    {names.map((name, index) => (
                      <Nav.Link
                        className={`text-secondary tab-item ${
                          current === names[index]
                            ? "bg-primary text-light"
                            : null
                        }`}
                        key={name}
                        onClick={() => setCurrent(names[index])}
                      >
                        <span className="pe-3">{tabs[name].icon}</span>
                        <span className="d-none d-md-inline">{name}</span>
                      </Nav.Link>
                    ))}
                  </Nav>
                </Col>
                <Col xs={12} md={9}>
                  {tabs[current].component}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </AuthContent>
  );
};

export default Settings;
