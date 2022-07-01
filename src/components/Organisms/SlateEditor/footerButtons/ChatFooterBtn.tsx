//@ts-nocheck
import React, { useState } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectUserToChatTimeline,
  setSelectUserToChatTimeline,
} from "@/reduxFeatures/app/chatSlice";

import { RiSendPlaneFill } from "react-icons/ri";

function ChatFooterBtn({ editorID }) {
  console.log("editorID:", editorID);
  const dispatch = useDispatch();
  const stateSelectUserToChatTimeline = useSelector(selectUserToChatTimeline);

  const sendMessageToRecipient = (e) => {
    e.preventDefault();

    const editorInnerHtml = document.getElementById(editorID).innerHTML;

    if (editorInnerHtml !== "") {
      if (JSON.stringify(stateSelectUserToChatTimeline[0]) === "{}") {
        /*
         ** No Previous Chat Is Selected On Sidebar
         ** Compose Chat By Manually Typing in recipient Name
         */
        let sendTo = (document.getElementById("sendTo") as HTMLInputElement)
          .value;

        if (sendTo.trim() !== "") {
          let sendToRecipients = sendTo.split(",");
          let chatValue = {
            message: editorInnerHtml,
            sender: "self",
            read: true,
            dateTime: new Date().toLocaleString(),
          };

          let previousChatWithUser = [];
          let noPreviousChatWithUser = [];
          let trimmedSendToRecipients = sendToRecipients.map((recipient) => {
            return recipient.trim();
          });
          let allUsers = [];

          // Check if recipient had previous chat
          initMessages.forEach((user) => {
            let trimmedUser = user.name.trim();
            allUsers.push(trimmedUser);
            if (trimmedSendToRecipients.includes(trimmedUser)) {
              // User Had Previous Chat
              previousChatWithUser.push(user);
            }
          });

          // New User Chat
          trimmedSendToRecipients.forEach((user) => {
            if (!allUsers.includes(user)) {
              noPreviousChatWithUser.push(user);
            }
          });

          // .... Recurring User Chat ....
          let tempInitMessages = [];
          if (previousChatWithUser.length > 0) {
            let tempInitName = [];
            let displayCurrentUserInTimeline = {};
            previousChatWithUser.forEach((user) => {
              // Update Previous Chat Array/Timeline of Recipient with new Chat
              user.message.push(chatValue);

              // Update UnreadMessage Count By 1 If Any So As Not To Be Diminished By New Chat
              if (user.unreadMessage > 0) {
                user.unreadMessage = user.unreadMessage + 1;
              }
              // Store Updated User
              displayCurrentUserInTimeline = user;

              // Update initMessages with the updated current Recipient
              tempInitMessages.push(user);
              tempInitName.push(user.name);
            });
            // Last name in the list should come first
            tempInitMessages.reverse();
            initMessages.forEach((init) => {
              if (!tempInitName.includes(init.name)) {
                tempInitMessages.push(init);
              }
            });

            // Set State
            setInitMessages(tempInitMessages);
            setMessages(tempInitMessages);
            dispatch(
              setSelectUserToChatTimeline([displayCurrentUserInTimeline, 0])
            );
          }

          // ....... For New Users Chat .......
          if (noPreviousChatWithUser.length > 0) {
            let tempNewUserInitMessages = [];
            let newUser;
            noPreviousChatWithUser.forEach((user, index) => {
              // Create a new Message for user
              newUser = {
                name: user,
                id: `${new Date()}${index}`,
                faceImage: "https://source.unsplash.com/random",
                message: [
                  {
                    message: editorInnerHtml,
                    sender: "self",
                    read: true,
                    dateTime: new Date().toLocaleString(),
                  },
                ],
                unreadMessage: 0,
                online: true,
              };
              // Update Temp Message with the updated current Recipient Message
              tempNewUserInitMessages.push(newUser);
            });
            // Last name in the list should come first
            tempNewUserInitMessages.reverse();

            // Enable previousChatWithUser message to also move to top when available
            let sudoTempInitMessages =
              tempInitMessages.length > 0 ? tempInitMessages : initMessages;
            tempNewUserInitMessages = [
              ...tempNewUserInitMessages,
              ...sudoTempInitMessages,
            ];

            // Set State
            setInitMessages(tempNewUserInitMessages);
            setMessages(tempNewUserInitMessages);
            dispatch(
              setSelectUserToChatTimeline([tempNewUserInitMessages[0], 0])
            );
          }

          // Clear Input Values
          (
            document.getElementById("writeMessage") as HTMLTextAreaElement
          ).value = "";
          (
            document.getElementById("searchMessages") as HTMLInputElement
          ).value = "";
          (document.getElementById("sendTo") as HTMLInputElement).value = "";
        }
      } else {
        /*
         ** Previous Chat With User Selected
         ** Compose Chat for Recurring recipient chosen from sidebar
         */
        const chatValue = {
          message: editorInnerHtml,
          sender: "self",
          read: true,
          dateTime: new Date().toLocaleString(),
        };
        let currentRecipient = stateSelectUserToChatTimeline[0];
        // Update Current Recipient with new Chat
        currentRecipient.message.push(chatValue);
        // Update initMessages with the updated current Recipient
        let tempInitMessages = [];
        // Add new chat to top
        tempInitMessages.push(currentRecipient);
        // Other chat to follow
        initMessages.forEach((user) => {
          if (user.name !== currentRecipient.name) {
            tempInitMessages.push(user);
          }
        });

        // Set State
        setInitMessages(tempInitMessages);
        setMessages(tempInitMessages);

        // Clear Input Values
        (document.getElementById("writeMessage") as HTMLTextAreaElement).value =
          "";
        (document.getElementById("searchMessages") as HTMLInputElement).value =
          "";
      }
    }
  };

  return (
    <div
      className="col-1"
      style={{
        alignSelf: "flex-end",
        marginLeft: "-1.5rem",
        marginBottom: "1rem",
      }}
    >
      <button
        type="button"
        className="btn btn-primary"
        style={{ borderRadius: "15%" }}
        onClick={sendMessageToRecipient}
      >
        <RiSendPlaneFill size={25} />
      </button>
    </div>
  );
}

export default ChatFooterBtn;
