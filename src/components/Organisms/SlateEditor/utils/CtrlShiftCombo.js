import { toggleBlock, toggleMark } from "./SlateUtilityFunctions";

export const CtrlShiftCombo = (event, editor) => {
  // if (!event.ctrlKey) {
  //   return;
  // }

  // When the case key is pressed, apply logic.
  if (event.shiftKey) {
    switch (event.key) {
      case ">": {
        event.preventDefault();
        toggleBlock(editor, "blockquote");
        break;
      }
      case "&": {
        event.preventDefault();
        toggleBlock(editor, "orderedList");
        break;
      }
      case "*": {
        event.preventDefault();
        toggleBlock(editor, "unorderedList");
        break;
      }
      case "X": {
        event.preventDefault();
        toggleMark(editor, "strikethrough");
        break;
      }
      default:
        return null;
    }
  }

  if (event.ctrlKey) {
    switch (event.key) {
      case "e": {
        event.preventDefault();
        toggleMark(editor, "code");
        break;
      }

      case "b": {
        event.preventDefault();
        toggleMark(editor, "bold");
        break;
      }
      case "i": {
        event.preventDefault();
        toggleMark(editor, "italic");
        break;
      }
      case "u": {
        event.preventDefault();
        toggleMark(editor, "underline");
        break;
      }
      default:
        return null;
    }
  }
};
