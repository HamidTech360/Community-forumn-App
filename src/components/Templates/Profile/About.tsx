import React, { useEffect, useState } from "react";

import { Container, Card } from "react-bootstrap";

import { FiEdit } from "react-icons/fi";
import {
  BsPlusCircle,
  BsFillCalendarEventFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { MdCall } from "react-icons/md";

const About = () => {
  const [activeTab, setActiveTab] = useState("bio");
  const [interests, setInterests] = useState([
    "Studying abroad",
    "Internship abroad",
    "Postgraduate study abroad",
    "Housing in Ghana",
  ]);

  useEffect(() => {
    // Set Active Tabs Visibility To Bio
    tabVisibility("bio");
  }, []);

  const tabVisibility = (pageTab) => {
    // Set Tabs Visibility
    document.getElementById(pageTab).classList.add("text-primary");
    for (const key in Components) {
      if (key !== pageTab) {
        document.getElementById(key).classList.remove("text-primary");
      }
    }
  };

  const tabNav = (e) => {
    // Change Active Tab
    const pageTab = e.target.id;

    // Set Active Tabs Visibility
    tabVisibility(pageTab);
    // Display Active Tab
    setActiveTab(pageTab);
  };

  const Components = {
    // ............................. Bio Tab .............................
    bio: (
      <Container>
        <div className="row">
          <h5 className="col-10">Bio</h5>
          <h5 className="col-2 btn" style={{ marginTop: "-.5rem" }}>
            <FiEdit size="15" />
          </h5>
        </div>
        <div className="row">
          <p className="col-12 text-muted" id="bioText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quas,
            pariatur, non ex ea laborum deserunt deleniti error vel adipisci
            fugit harum, illum iusto officia laudantium. Nesciunt fugiat illo
            maxime?
          </p>
        </div>
        <div className="row col-12 mt-4">
          <h5>Interest</h5>
          <div>
            <ul className="text-muted">
              {interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    ),

    // ............................. >Basic info Tab .............................
    basicInfo: (
      <Container>
        <div className="row mb-2">
          <h5 className="col-12">Personal info</h5>
        </div>
        <div className="row">
          <h6 className="col-10" style={{ marginLeft: "-.5rem" }}>
            <BsFillPersonFill size="19" /> <span> Select Gender</span>
          </h6>
          <h5 className="col-2 btn" style={{ marginTop: "-.5rem" }}>
            <FiEdit size="15" />
          </h5>
          <p className="text-muted ms-4" style={{ marginTop: "-.8rem" }}>
            Gender
          </p>
        </div>

        <div className="row">
          <h6 className="col-10" style={{ marginLeft: "-.5rem" }}>
            <BsFillCalendarEventFill size="17" /> <span> Select DOB</span>
          </h6>
          <h5 className="col-2 btn" style={{ marginTop: "-.5rem" }}>
            <FiEdit size="15" />
          </h5>
          <p className="text-muted ms-4" style={{ marginTop: "-.8rem" }}>
            Date of Birth
          </p>
        </div>

        <div className="row mt-4 mb-2">
          <h5 className="col-12">Contact info</h5>
        </div>

        <div className="row">
          <h6 className="col-10 mb-4 fw-light" style={{ marginTop: "-1rem" }}>
            <span className="btn text-primary">
              <BsPlusCircle size="14" />
              <span className=" fw-normal fst-italic"> Add Address</span>
            </span>
          </h6>

          <h6 className="col-10" style={{ marginLeft: "-.5rem" }}>
            <MdCall size="19" /> <span>Input Mobile No.</span>
          </h6>
          <h5 className="col-2 btn" style={{ marginTop: "-.5rem" }}>
            <FiEdit size="15" />
          </h5>
          <p className="text-muted ms-4" style={{ marginTop: "-.8rem" }}>
            Mobile
          </p>
        </div>

        {/* Add Websites */}
        <div className="row mt-4 mb-2">
          <h5 className="col-12">Websites</h5>
        </div>

        <div className="row">
          <h6 className="col-10 fw-light" style={{ marginTop: "-1rem" }}>
            <span className="btn text-primary">
              <BsPlusCircle size="14" />
              <span className="fw-normal fst-italic"> Add Address</span>
            </span>
          </h6>

          <h6 className="col-10 fw-light" style={{ marginTop: "-1rem" }}>
            <span className="btn text-primary">
              <BsPlusCircle size="14" />
              <span className=" fw-normal fst-italic"> Add YouTube</span>
            </span>
          </h6>

          <h6 className="col-10 fw-light" style={{ marginTop: "-1rem" }}>
            <span className="btn text-primary">
              <BsPlusCircle size="14" />
              <span className="fw-normal fst-italic"> Add Instagram</span>
            </span>
          </h6>
        </div>
      </Container>
    ),

    // ............................. >Education History Tab .............................
    educationHistory: <p>Education history page</p>,
  };

  return (
    <section>
      <Container className="shadow-sm">
        <Card className="border-0">
          <div className="row g-2" style={{ marginTop: "-2rem" }}>
            <div className="col-md-12 col-lg-3">
              <Card.Body className="bg-light shadow" style={{ height: "100%" }}>
                <nav className="text-secondary">
                  <a
                    className="nav-link active btn text-start text-secondary"
                    aria-current="page"
                    id="bio"
                    onClick={tabNav}
                  >
                    Bio
                  </a>
                  <a
                    className="nav-link btn text-start text-secondary"
                    id="basicInfo"
                    onClick={tabNav}
                  >
                    Basic Info
                  </a>
                  <a
                    className="nav-link btn text-start text-secondary"
                    id="educationHistory"
                    onClick={tabNav}
                  >
                    Education history
                  </a>
                </nav>
              </Card.Body>
            </div>
            <div className="col-md-12 col-lg-9">
              <Card.Body
                id="profileMainSide"
                className="bg-light shadow"
                style={{ height: "100%" }}
              >
                {Components[activeTab]}
              </Card.Body>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default About;
