import React from "react";

function ChatBubble(message) {
  const self = `bg-primary text-light mb-3 p-3 ms-auto`;
  const self2 = `ms-auto`;
  const recipient = `bg-secondary text-light mb-3 p-3`;
  const messagingStyle = message.sender === "self" ? self : recipient;
  const messagingStyle2 = message.sender === "self" && self2;
  const borderRadiusBubble =
    message.sender === "self" ? "35px 0 15px 35px" : "0 35px 35px 15px";

  return (
    <div style={{ fontSize: "14px" }}>
      <div
        style={{
          width: "35%",
          height: "auto",
          fontSize: "10px",
        }}
        className={`${messagingStyle2} text-secondary`}
      >
        {message.dateTime}
      </div>
      <div
        className={messagingStyle}
        style={{
          letterSpacing: "1px",
          minWidth: "35%",
          maxWidth: "80%",
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
