import React from "react";
import DOMPurify from "dompurify";

function ChatBubble(message) {
  const self = `bg-primary text-light mb-3 p-3 ms-auto`;
  const self2 = `ms-auto`;
  const recipient = `bg-secondary text-light mb-3 p-3`;
  const messagingStyle = message.sender === "self" ? self : recipient;
  const messagingStyle2 = message.sender === "self" && self2;
  const borderRadiusBubble =
    message.sender === "self" ? "35px 0 15px 35px" : "0 35px 35px 15px";

  const sanitizer = DOMPurify.sanitize;

  return (
    <div style={{ fontSize: "14px" }}>
      <div
        style={{
          width: "20%",
          height: "auto",
          fontSize: "10px",
        }}
        className={`${messagingStyle2} text-secondary`}
      >
        {message.dateTime}
      </div>
      <div className="d-flex">
        <div
          className={messagingStyle}
          style={{
            letterSpacing: "1px",
            maxWidth: "80%",
            height: "auto",
            borderRadius: borderRadiusBubble,
          }}
          dangerouslySetInnerHTML={{
            __html: sanitizer(message.message),
          }}
        ></div>
      </div>
    </div>
  );
}

export default ChatBubble;
