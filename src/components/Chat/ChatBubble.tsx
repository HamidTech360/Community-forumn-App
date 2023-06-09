import React from "react";
import DOMPurify from "dompurify";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import { useSelector } from "@/redux/store";

function ChatBubble({ message }) {
  const user = useSelector(selectUser);
  const self2 = `ms-auto`;
  const messagingStyle2 = message.sender === "self" && self2;
  const borderRadiusBubble =
    message.sender === "self" ? "35px 0 15px 35px" : "0 35px 35px 15px";

  const sanitizer = DOMPurify.sanitize;
  //console.log(`sender is ${message.sender._id} and user is ${user._d}`);

  return (
    <div style={{ fontSize: "14px" }}>
      <div
        style={{
          width: "20%",
          height: "auto",
          fontSize: "10px"
        }}
        className={`${messagingStyle2} text-secondary`}
      >
        {message.dateTime}
      </div>
      <div className="d-flex">
        <div
          className={
            message.sender?._id === user._id || message.sender === user._id
              ? "bg-primary text-light mb-3 p-3 ms-auto"
              : "bg-secondary text-light mb-3 p-3"
          }
          style={{
            letterSpacing: "1px",
            maxWidth: "80%",
            height: "auto",
            borderRadius: borderRadiusBubble
          }}
          dangerouslySetInnerHTML={{
            __html: sanitizer(message.message)
          }}
        ></div>
      </div>
    </div>
  );
}

export default ChatBubble;
