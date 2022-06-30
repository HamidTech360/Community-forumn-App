//@ts-nocheck
import { Transforms } from "slate";

type emojiCreator = Object;

type createEmojiNode = {
  type: "emoji";
  emoji: string;
  children: [{ text: "" }];
};

export const insertEmoji = (editor, emoji) => {
  const emojiCreator: createEmojiNode = {
    type: "emoji",
    emoji,
    children: [{ text: emoji }],
  };

  Transforms.insertNodes(editor, emojiCreator);
};
