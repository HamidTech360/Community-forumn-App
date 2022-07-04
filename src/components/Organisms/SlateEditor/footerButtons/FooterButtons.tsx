//@ts-nocheck
import { useRouter } from "next/router";
import React from "react";
import BlogPostFooterBtn from "./BlogPostFooterBtn";
import GistFooterBtn from "./GistFooterBtn";
import ChatFooterBtn from "./ChatFooterBtn";

function FooterButtons({ editorID }) {
  const router = useRouter();

  return (
    <>
      {router.asPath === "/explore" ? (
        <BlogPostFooterBtn editorID={editorID} />
      ) : router.asPath === "/gist" ? (
        <GistFooterBtn editorID={editorID} />
      ) : router.asPath === "/chat" ? (
        <ChatFooterBtn editorID={editorID} />
      ) : (
        <BlogPostFooterBtn editorID={editorID} />
      )}
    </>
  );
}

export default FooterButtons;
