import { Transforms } from "slate";

type createEmojiNode = {
  type: "emoji";
  children: [{ text: "" }];
};

export const insertEmoji = (editor, emoji) => {
  const emojiCreator: createEmojiNode = {
    type: "emoji",
    children: [{ text: emoji }]
  };

  Transforms.insertNodes(editor, emojiCreator);
};
