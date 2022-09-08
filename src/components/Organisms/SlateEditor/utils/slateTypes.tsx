import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

// Best Practice Is To Declear & Export Custom Types
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement | MentionElement;

export type MentionElement = {
  type: "mention";
  character: string;
  children: CustomText[];
};

export type FormattedText = { text: string; bold?: true; italic?: true };

// In this example, CustomText is equal to FormattedText but in other editors, there can be more types of text like text in a code block which may not allow formatting.
export type CustomText = FormattedText;

export type EmptyText = {
  text: string;
};
