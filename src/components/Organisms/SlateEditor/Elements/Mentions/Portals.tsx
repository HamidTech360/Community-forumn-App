import { useDispatch } from "@/redux/store";
import { setSearch, setTarget } from "@/reduxFeatures/app/mentionsSlice";
import ReactDOM from "react-dom";
import { Transforms } from "slate";
import { MentionElement } from "../../utils/slateTypes";

const Portal = ({ children }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export default Portal;

export const PortalDiv = ({
  domRef,
  mentionedUsersList,
  index,
  editor,
  target
}) => {
  const dispatch = useDispatch();
  return (
    <div
      ref={domRef}
      style={{
        top: "-9999px",
        left: "-9999px",
        position: "absolute",
        zIndex: 9999,
        padding: "3px",
        background: "white",
        borderRadius: "4px",
        boxShadow: "0 1px 5px rgba(0,0,0,.2)",
        maxHeight: "350px",
        overflowY: "auto"
      }}
      data-cy="mentions-portal"
    >
      {mentionedUsersList?.map((char, i) => (
        <div
          key={char + i}
          style={{
            padding: "1px 3px",
            borderRadius: "3px",
            background: i === index ? "#B4D5FF" : "transparent",
            borderBottom: "1px solid black"
          }}
          onClick={() => {
            Transforms.select(editor, target);
            insertMention(editor, mentionedUsersList[i]);
            dispatch(setTarget(null));
            dispatch(setSearch(""));
          }}
        >
          {char?.userName}
        </div>
      ))}
    </div>
  );
};

export const insertMention = (editor, character) => {
  const mention: MentionElement = {
    type: "mention",
    character,
    children: [{ text: `${character.userName} ` }]
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};
