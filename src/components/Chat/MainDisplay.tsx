import React, { useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import ChatBubble from "./ChatBubble";
import styles from "../../styles/chat.module.scss";
import "react-toastify/dist/ReactToastify.css";

const MainDisplay = ({ currentChat, messages }) => {
  const scrollRef = useRef<HTMLDivElement>();

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <Card
        className={styles.cardBody}
        style={{ marginRight: "0px", overflow: "scroll", overflowX: "hidden" }}
      >
        <Card.Body className={styles.messageArea}>
          {currentChat && (
            <>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
              {messages.map((message: Record<string, any>, index: number) => (
                <div key={`message-${index}`}>
                  <ChatBubble message={message} />
                </div>
              ))}
              <div ref={scrollRef}></div>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default MainDisplay;
