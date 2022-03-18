import React from "react";

interface ITypoGraphyProps {
  text: string;
  center?: boolean;
  heading?: string;
}
const index = ({ text, center, heading }: ITypoGraphyProps) => {
  return (
    <>
      <div>
        {heading && <h2>{heading}</h2>}
        <p>{text}</p>
      </div>
      <style jsx>{`
        div {
          max-width: 836px;
          ${center && `text-align: center;`}
        }
        p {
        }
        h2 {
          color: #0b5351;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 1.5rem;
        }
      `}</style>
    </>
  );
};

export default index;
