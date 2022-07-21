//@ts-nocheck
import { useRouter } from "next/router";
import React from "react";
import BlogPostFooterBtn from "./BlogPostFooterBtn";
import GistFooterBtn from "./GistFooterBtn";
import ChatFooterBtn from "./ChatFooterBtn";
import FeedFooterBtn from "./FeedFooterBtn";
import GroupsFooterBtn from "./GroupsFooterBtn";

// function FooterButtons({ editorID }:any) {
//   const router = useRouter();

//   return (
//     <>
//       {router.asPath === "/explore" ? (
//         <BlogPostFooterBtn   editorID={editorID} />
//       ) : router.asPath === "/gist" ? (
//         <GistFooterBtn editorID={editorID} />
//       ) : router.asPath === "/chat" ? (
//         <ChatFooterBtn editorID={editorID} />
//       ) : router.asPath === "/feed" ? (
//         <FeedFooterBtn editorID={editorID} />
//       ) : (
//         <BlogPostFooterBtn editorID={editorID} />
//       )}
//     </>
//   );
// }

function FooterButtons({
  editorID,
  pageAt,
}: {
  editorID: any;
  pageAt: string;
}) {
  // console.log("pageAt:", pageAt);

  return (
    <>
      {pageAt === "/explore" ? (
        <BlogPostFooterBtn editorID={editorID} />
      ) : pageAt === "/gist" ? (
        <GistFooterBtn editorID={editorID} />
      ) : pageAt === "/chat" ? (
        <ChatFooterBtn editorID={editorID} />
      ) : pageAt === "/feed" ? (
        <FeedFooterBtn editorID={editorID} />
      ) : pageAt === "/groups" ? (
        <GroupsFooterBtn editorID={editorID} />
      ) : (
        <BlogPostFooterBtn editorID={editorID} />
      )}
    </>
  );
}

export default FooterButtons;
