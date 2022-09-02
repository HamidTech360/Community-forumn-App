import React from "react";
import BlogPostFooterBtn from "./BlogPostFooterBtn";
import GistFooterBtn from "./GistFooterBtn";

import FeedFooterBtn from "./FeedFooterBtn";
import GroupsFooterBtn from "./GroupsFooterBtn";
import { Descendant } from "slate";

function FooterButtons({
  editorID,
  pageAt,
  editorContentValue
}: {
  editorID: string;
  pageAt: string;
  editorContentValue: Descendant[];
}) {
  return (
    <>
      {pageAt === "/explore" ? (
        <BlogPostFooterBtn
          editorID={editorID}
          editorContentValue={editorContentValue}
        />
      ) : pageAt === "/gist" ? (
        <GistFooterBtn
          editorID={editorID}
          editorContentValue={editorContentValue}
        />
      ) : pageAt === "/chat" ? null : pageAt === "/feed" ? (
        <FeedFooterBtn
          editorID={editorID}
          editorContentValue={editorContentValue}
        />
      ) : pageAt === "/groups" ? (
        <GroupsFooterBtn
          editorID={editorID}
          editorContentValue={editorContentValue}
        />
      ) : (
        <BlogPostFooterBtn
          editorID={editorID}
          editorContentValue={editorContentValue}
        />
      )}
    </>
  );
}

export default FooterButtons;
