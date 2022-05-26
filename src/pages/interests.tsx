import React, { MouseEventHandler, useEffect, useState } from "react";

import { Container, Card, Button, Image } from "react-bootstrap";

const Interests = () => {
  const initInterests = [
    "Travel abroad",
    "Postgraduate degree",
    "Undergraduate degree",
    "Housing",
    "Work abroad",
    "Find people around you",
    "Find information",
    "Give information",
    "Consultation",
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    // Display User Selected Interest In Btn On Component Load
    if (selectedInterests.length >= 1) {
      console.log("selectedInterests:", selectedInterests);

      selectedInterests.forEach((selectedInt) => {
        document.getElementById(selectedInt.id).classList.add("bg-primary");
        document.getElementById(selectedInt.id).classList.add("text-white");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Select Interest BTN Function

  //@ts-ignore
  const interestSelected = (e: any) => {
    e.preventDefault();

    const id = e.target.id;
    const interestedIn = e.target.textContent;

    if (document.getElementById(id).classList.contains("bg-primary")) {
      //  Interest Already Selected. De-select Interest
      document.getElementById(id).classList.remove("bg-primary");
      document.getElementById(id).classList.remove("text-white");
      setSelectedInterests(() => {
        return selectedInterests.filter((value) => {
          return value.interestedIn !== interestedIn;
        });
      });
    } else {
      //  Interest Not Selected. Select Interest
      document.getElementById(id).classList.add("bg-primary");
      document.getElementById(id).classList.add("text-white");
      setSelectedInterests(() => [...selectedInterests, { id, interestedIn }]);
    }
  };

  // Send Selected Interest To Required Component/Server

  const axiosInterestSelected = () => {
    const interestSelected = selectedInterests;

    if (interestSelected.length < 3) {
      return alert("You Have To Select 3 or More Interest");
    } else {
      // Send with axios

      console.log("interest selected", interestSelected);
    }
  };

  return (
    <section>
      <Container className="mt-3 text-center h1">
        <Card border="0">
          <Card.Header
            className="border-0 fw-4 mb-5 bg-body"
            style={{ backgroundColor: "none" }}
          >
            <Image
              src="/assets/ellipse-intro-top.png"
              className="d-none d-lg-block"
              style={{
                position: "fixed",
                top: "-5%",
                left: "-10%",
              }}
              alt="ellipse-intro-top.png"
            />
            Select interests
            <p className="fs-6 text-secondary d-block mt-3">
              Select a minimum of three things that you plan to use Settlin to
              achieve
            </p>
          </Card.Header>

          <Card.Body style={{ marginTop: "-2rem" }}>
            <div className="row justify-content-center align-items-center">
              {initInterests.map((interest, index) => {
                let idIndex = `initInterests-${index}`;
                let initInterestsLength = initInterests.length;
                let btnWidth =
                  index < initInterestsLength / 3
                    ? "col-sm-5 col-md-4 col-lg-3 btn btn-outline-primary list-group-item me-3 border-1 border-primary rounded-3 mb-3"
                    : index > initInterestsLength / 3 &&
                      index <= initInterestsLength / Number(1.5)
                    ? "col-sm-4 col-md-4 col-lg-3 btn btn-outline-primary list-group-item me-3 border-1 border-primary rounded-3 mb-3"
                    : index >= initInterestsLength / Number(1.5)
                    ? "col-sm-4 col-md-3 col-lg-2 btn btn-outline-primary list-group-item me-3 border-1 border-primary rounded-3 mb-3"
                    : "col-sm-4 col-md-2 col-lg-4 btn btn-outline-primary list-group-item me-3 border-1 border-primary rounded-3 mb-3";
                return (
                  <div
                    id={idIndex}
                    className={btnWidth}
                    key={index}
                    onClick={interestSelected}
                  >
                    {interest}
                  </div>
                );
              })}
            </div>
          </Card.Body>
          <Card.Footer className="border-0 bg-body">
            <Image
              src="/assets/ellipse-intro-right.png"
              className="d-none d-lg-block"
              style={{
                position: "fixed",
                bottom: "-82%",
                right: "-5%",
              }}
              alt="ellipse-intro-right.png"
            />
            <div className="row justify-content-center align-items-center">
              <div className="col-5 d-grid mt-5">
                <Button className="btn btn-lg" onClick={axiosInterestSelected}>
                  Continue
                </Button>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    </section>
  );
};

export default Interests;
