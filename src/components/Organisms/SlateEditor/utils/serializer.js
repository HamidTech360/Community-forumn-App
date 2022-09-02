import escapeHtml from "escape-html";
import { Text } from "slate";
import { jsx } from "slate-hyperscript";

// Serialize Html
export const serialize = node => {
  // console.log("node:", node);
  // console.log("node:", node);
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);

    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    // if (node.underline) {
    //   string = `<u>${string}</u>`;
    // }
    // case "mention":
    //   `<p>${children}</p>`;
    return string;
  }

  // if (node.type === "link") {
  //   return (string = `<a href="${escapeHtml(
  //     node?.href ? node?.href : node?.url
  //   )}" target="_blank" rel="noreferrer">${node.text}</a>`);
  // }

  const children = node?.children?.map(n => serialize(n))?.join("");

  switch (node.type) {
    case "blockquote":
      return `<blockquote style="border-left: 2px solid #ddd;margin-left: 0;margin-right: 0;padding-left: 10px;color: #aaa;font-style: italic">${children}</blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      // console.log("node:", node);
      return `<p><a href="${escapeHtml(
        node?.href ? node?.href : node?.url
      )}" target="_blank" rel="noreferrer">${children}</a></p>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "orderedList":
      return `<p><ol type="1">${children}</ol></p>`;
    case "unorderedList":
      return `<p><ul>${children}</ul></p>`;
    case "emoji":
      return `<p>${children}</p>`;
    case "image":
      return `<img src="${
        node?.url ? node?.url : node?.href
      }" height="150" width="150" alt="${node.alt}">${children}</img>`;
    case "video":
      return `<iframe src="${
        node?.url ? node?.url : node?.href
      }" height="200" width="300" title="${node.alt}" alt="${
        node.alt
      }" frameBorder="0">${children}</iframe>`;
    case "mention":
      console.log("node:", node);
      `<p>${children}</p>`;
      `<p>${node.character}</p>`;
    default:
      return children;
  }
};

// +++++++++++++++++++++++++ deserialize ++++++++++++++++++++++++++++

const ELEMENT_TAGS = {
  P: () => ({ type: "paragraph" }),
  M: () => ({ type: "mention" }),
  A: el => ({
    type: "link",
    url: el.getAttribute("href"),
    target: "_blank",
    rel: "noreferrer"
  }),
  BLOCKQUOTE: () => ({ type: "blockquote" }),
  EMOJI: () => ({ type: "emoji" }),
  IMG: el => ({
    type: "image",
    url: el.getAttribute("src"),
    height: "150",
    width: "150",
    alt: ""
  }),
  IFRAME: el => ({
    type: "video",
    url: el.getAttribute("src"),
    height: "200",
    width: "300",
    title: "",
    frameBorder: "0"
  }),
  LI: () => ({ type: "list-item" }),
  OL: () => ({ type: "orderedList" }),
  UL: () => ({ type: "unorderedList" })
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true })
};

export const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0];
  }
  let children = Array.from(parent.childNodes).map(deserialize).flat();

  if (children.length === 0) {
    children = [{ text: "" }];
  }

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx("element", attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map(child => jsx("text", attrs, child));
  }

  return children;
};

// Deserialize Html
const deserializeFromHtml = html => {
  const document = new window.DOMParser().parseFromString(html, "text/html");
  return deserialize(document.body);
};
export default deserializeFromHtml;
