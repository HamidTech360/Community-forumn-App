import React from "react";

function ChatBubble(message, index) {
  const self = `bg-primary text-light mb-5 p-3 ms-auto`;
  const self2 = `ms-auto`;
  const recipient = `bg-secondary text-light mb-5 p-3`;
  const messagingStyle = message.sender === "self" ? self : recipient;
  const messagingStyle2 = message.sender === "self" && self2;
  const borderRadiusBubble =
    message.sender === "self" ? "35px 0 15px 35px" : "0 35px 35px 15px";

  return (
    <div key={index} style={{ fontSize: "14px" }}>
      <div
        style={{
          width: "28%",
          height: "auto",
          fontSize: "11px",
        }}
        className={`${messagingStyle2} text-secondary`}
      >
        {message.dateTime}
      </div>
      <div
        className={messagingStyle}
        style={{
          width: "82%",
          letterSpacing: "1px",
          height: "auto",
          borderRadius: borderRadiusBubble,
        }}
      >
        {message.message}
      </div>
    </div>
  );
}

export default ChatBubble;
