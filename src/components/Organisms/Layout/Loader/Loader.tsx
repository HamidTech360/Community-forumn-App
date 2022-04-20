import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      className="m-2 p-2 d-flex justify-content-center"
      style={{
        minHeight: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
