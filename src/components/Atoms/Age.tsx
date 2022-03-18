import React from "react";
import Time from "react-timeago";
const Age = ({ time }: { time: string }) => {
  return <Time date={time} />;
};

export default Age;
