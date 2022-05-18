import React, { useEffect, useState } from "react";

import { Container, Card, Button } from "react-bootstrap";

const Interests = () => {
  const [initInterests, setInitInterests] = useState([
    "Travel abroad",
    "Postgraduate degree",
    "Undergraduate degree",
    "Housing",
    "Work abroad",
    "Find people around you",
    "Find information",
    "Give information",
    "Consultation",
  ]);

  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    // Display User Selected Interest In Btn On Load
    if (selectedInterests.length >= 1) {
      console.log("selectedInterests:", selectedInterests);

      selectedInterests.forEach((selectedInt) => {
        document.getElementById(selectedInt.id).classList.add("bg-success");
        document.getElementById(selectedInt.id).classList.add("text-white");
      });
    }
  }, []);

  const interestSelected = (e) => {
    e.preventDefault();

    const id = e.target.id;
    const interestedIn = e.target.textContent;

    if (document.getElementById(id).classList.contains("bg-success")) {
      //  Interest Already Selected. De-select Interest
      document.getElementById(id).classList.remove("bg-success");
      document.getElementById(id).classList.remove("text-white");
      setSelectedInterests(() => {
        return selectedInterests.filter((value) => {
          return value.interestedIn !== interestedIn;
        });
      });
    } else {
      //  Interest Not Selected. Select Interest
      document.getElementById(id).classList.add("bg-success");
      document.getElementById(id).classList.add("text-white");
      setSelectedInterests(() => [...selectedInterests, { id, interestedIn }]);
    }
  };

  const axiosInterestSelected = (e) => {
    const interestSelected = selectedInterests;

    // Send with axios

    console.log("interest selected", interestSelected);
  };

  return (
    <section>
      <Container
        className="mt-3 text-center h1"
        // style={bg_img}
      >
        <Card border="0">
          <Card.Header className="border-0 fw-4 bg-body mb-5">
            Select interests
            <sub className="fs-6 text-secondary d-block mt-3">
              Select maximum of three things that you plan to use Settlin to
              achieve
            </sub>
          </Card.Header>

          <Card.Body>
            <div className="row justify-content-center align-items-center">
              {initInterests.map((interest, index) => {
                let idIndex = `initInterests-${index}`;
                let initInterestsLength = initInterests.length;
                let btnWidth =
                  index < initInterestsLength / 3
                    ? "col-sm-5 col-md-4 col-lg-3 btn btn-outline-success list-group-item me-3 border-1 border-success rounded-3 mb-3"
                    : index > initInterestsLength / 3 &&
                      index <= initInterestsLength / Number(1.5)
                    ? "col-sm-4 col-md-4 col-lg-3 btn btn-outline-success list-group-item me-3 border-1 border-success rounded-3 mb-3"
                    : index >= initInterestsLength / Number(1.5)
                    ? "col-sm-4 col-md-3 col-lg-2 btn btn-outline-success list-group-item me-3 border-1 border-success rounded-3 mb-3"
                    : "col-sm-4 col-md-2 col-lg-4 btn btn-outline-success list-group-item me-3 border-1 border-success rounded-3 mb-3";
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
            <div className="row justify-content-center align-items-center">
              <div className="col-4 d-grid">
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

// const bg_img = {
//   backgroundImage: "url(./assets/ellipse-intro-top.png)",
//   backgroundRepeat: "no-repeat",
//   backgroundAttachment: "fixed",
//   // backgroundPosition: "left-top",
//   backgroundPosition: "-2% -2%",
// };
