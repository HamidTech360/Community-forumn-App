import React from "react";

function ChatBubble(message, index) {
  const self = `bg-primary text-light mb-5 p-3 ms-auto`;
  const self2 = `ms-auto`;
  const recipient = `bg-secondary text-light mb-5 p-3`;
  const messagingStyle = message.sender === "self" ? self : recipient;
  const messagingStyle2 = message.sender === "self" && self2;

  return (
    <div key={index}>
      <div
        style={{
          width: "28%",
          height: "auto",
        }}
        className={messagingStyle2}
      >
        {message.dateTime}
      </div>
      <div
        className={messagingStyle}
        style={{
          width: "40%",
          height: "auto",
          borderRadius: "35px 15px 35px 35px",
        }}
      >
        {message.message}
      </div>
    </div>
  );
}

export default ChatBubble;
