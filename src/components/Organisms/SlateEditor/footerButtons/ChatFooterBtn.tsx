//@ts-nocheck
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "@/redux/store";
import {
  setUserToChatTimeline,
  selectedUserInChatTimeline,
  setInitMessages,
  selectInitMessages,
  setMessages,
  selectMessages,
} from "@/reduxFeatures/app/chatSlice";

import { setReFocusChatEditor } from "@/reduxFeatures/app/chatSlice";

import { RiSendPlaneFill } from "react-icons/ri";
import Age from "@/components/Atoms/Age";

function ChatFooterBtn({ editorID }) {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const initMessages = useSelector(selectInitMessages);
  const selectUserToChatTimeline = useSelector(selectedUserInChatTimeline);

  const sendMessageToRecipient = (e) => {
    const editorInnerHtml = (
      document.getElementById(editorID) as HTMLInputElement
    ).innerHTML;

    let emptyEditorInnerHtml =
      '<div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-placeholder="true" contenteditable="false" style="position: absolute; pointer-events: none; width: 100%; max-width: 100%; display: block; opacity: 0.333; user-select: none; text-decoration: none;">Start writing your thoughts</span><span data-slate-zero-width="n" data-slate-length="0">﻿<br></span></span></span></div>';

    if (editorInnerHtml === emptyEditorInnerHtml) {
      toast.warn("Type your message to proceed", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
      return;
    }

    if (editorInnerHtml.trim() !== "") {
      if (JSON.stringify(selectUserToChatTimeline[0]) === "{}") {
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
            dateTime: <Age time={new Date().toLocaleString()} />,
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
          // console.log("previousChatWithUser:", previousChatWithUser);
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
            previousChatWithUser.forEach((recurringUserChat, index) => {
              console.log("previousChatWithUser-0:", previousChatWithUser);
              let updateRecurringUserChat;
              // Update UnreadMessage Count By 1 If Any So As Not To Be Diminished By New Chat
              if (recurringUserChat.unreadMessage > 0) {
                updateRecurringUserChat = {
                  ...recurringUserChat,
                  message: [...recurringUserChat.message, chatValue],
                  unreadMessage: recurringUserChat.unreadMessage + 1,
                };
              } else {
                updateRecurringUserChat = {
                  ...recurringUserChat,
                  message: [...recurringUserChat.message, chatValue],
                };
              }
              // Store Updated User
              displayCurrentUserInTimeline = updateRecurringUserChat;
              // Update initMessages with the updated current Recipient
              tempInitMessages.push(updateRecurringUserChat);
              tempInitName.push(updateRecurringUserChat.name);
            });
            // Last name in the list should come first
            tempInitMessages.reverse();
            initMessages.forEach((init) => {
              if (!tempInitName.includes(init.name)) {
                tempInitMessages.push(init);
              }
            });
            // Set State
            dispatch(setInitMessages(tempInitMessages));
            dispatch(setMessages(tempInitMessages));
            dispatch(
              setUserToChatTimeline([
                displayCurrentUserInTimeline,
                displayCurrentUserInTimeline.unreadMessage,
              ])
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
                    dateTime: <Age time={new Date().toLocaleString()} />,
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
            dispatch(setInitMessages(tempNewUserInitMessages));
            dispatch(setMessages(tempNewUserInitMessages));
            dispatch(setUserToChatTimeline([tempNewUserInitMessages[0], 0]));
          }
          (
            document.getElementById("searchMessages") as HTMLInputElement
          ).value = "";
          (document.getElementById("sendTo") as HTMLInputElement).value = "";
          //   Delete Slate Editor innerHTML
          dispatch(setReFocusChatEditor());
        } else {
          toast.warn(
            "Enter a new user OR select an existing user to proceed!!!",
            {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1",
            }
          );
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
          dateTime: <Age time={new Date().toLocaleString()} />,
        };
        // Update Current Recipient with new Chat
        let currentRecipient = {
          ...selectUserToChatTimeline[0],
          message: [...selectUserToChatTimeline[0].message, chatValue],
          unreadMessage: 0,
        };
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
        dispatch(setInitMessages(tempInitMessages));
        dispatch(setMessages(tempInitMessages));
        dispatch(
          setUserToChatTimeline([
            currentRecipient,
            currentRecipient.unreadMessage,
          ])
        );
        (document.getElementById("searchMessages") as HTMLInputElement).value =
          "";
        //   Delete Slate Editor innerHTML
        dispatch(setReFocusChatEditor());
      }
    } else {
      toast.warn("Type your message to proceed", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
    }
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      style={{ borderRadius: "15%" }}
      onClick={sendMessageToRecipient}
    >
      <RiSendPlaneFill size={25} />
    </button>
  );
}

export default ChatFooterBtn;
