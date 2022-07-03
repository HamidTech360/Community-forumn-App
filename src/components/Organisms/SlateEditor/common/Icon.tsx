//@ts-nocheck
import {
  MdFormatBold,
  MdFormatItalic,
  MdStrikethroughS,
  MdFormatUnderlined,
  MdFormatQuote,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdAdd,
} from "react-icons/md";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaSuperscript, FaSubscript, FaVideo } from "react-icons/fa";
import { AiOutlineUpload, AiOutlineArrowsAlt } from "react-icons/ai";
import { HiCode } from "react-icons/hi";
import { BiHeading } from "react-icons/bi";
import { FiLink } from "react-icons/fi";
import { BsFillImageFill, BsEmojiSmile } from "react-icons/bs";

const iconList = {
  bold: <MdFormatBold size={20} />,
  italic: <MdFormatItalic size={20} />,
  strikethrough: <MdStrikethroughS size={20} />,
  underline: <MdFormatUnderlined size={20} />,
  heading: <BiHeading size={20} />,

  code: <HiCode size={20} />,

  blockquote: <MdFormatQuote size={20} />,
  superscript: <FaSuperscript size={15} />,
  subscript: <FaSubscript size={15} />,
  alignLeft: <MdFormatAlignLeft size={20} />,
  alignCenter: <MdFormatAlignCenter size={20} />,
  alignRight: <MdFormatAlignRight size={20} />,
  orderedList: <MdFormatListNumbered size={20} />,
  unorderedList: <MdFormatListBulleted size={20} />,
  link: <FiLink size={20} />,
  image: <BsFillImageFill size={20} />,
  video: <FaVideo size={20} />,
  add: <MdAdd size={20} />,
  upload: <AiOutlineUpload size={20} />,
  resize: <AiOutlineArrowsAlt size={20} />,
  videoPlayer: <BsCameraVideoFill size={20} />,
  emoji: <BsEmojiSmile size={20} />,
};

const Icon = (props) => {
  const { icon } = props;
  return iconList[icon];
};

export default Icon;
