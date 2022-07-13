import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styles from "@/styles/searchTabs.module.scss";

import {
  setPostSearch,
  selectPostSearch,
  setGistSearch,
  selectGistSearch,
  setUserSearch,
  selectUserSearch,
} from "@/reduxFeatures/api/searchSlice";

import { Form, InputGroup, Spinner } from "react-bootstrap";
import DOMPurify from "dompurify";
import truncate from "trunc-html";

import { useDispatch, useSelector } from "@/redux/store";
import {
  PostApiSearch,
  GistApiSearch,
  UserApiSearch,
} from "@/components/Organisms/App/ApiSearch/globalApiSearch";
import { FcSearch } from "react-icons/fc";
import { MdOutlineSearchOff } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { setSearchModal } from "@/reduxFeatures/app/appSlice";

function SearchTabs() {
  const router = useRouter();
  const sanitizer = DOMPurify.sanitize;
  useEffect(() => {
    // Remove Focus From Search input
    document.getElementById("navSearch").blur();

    // Clear search results
    return () => {
      dispatch(setPostSearch([]));
      dispatch(setGistSearch([]));
      dispatch(setUserSearch([]));
    };
  }, []);

  const dispatch = useDispatch();
  const postSearch = useSelector(selectPostSearch);
  const gistSearch = useSelector(selectGistSearch);
  const userSearch = useSelector(selectUserSearch);

  const [key, setKey] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    postSearch?.length > 0
      ? setKey("post")
      : gistSearch?.length > 0
      ? setKey("gist")
      : userSearch?.length > 0
      ? setKey("user")
      : null;
  }, [postSearch, gistSearch, userSearch]);

  const apiSearch = async (e) => {
    setIsFetching(true);
    const postSearchResult = await PostApiSearch(e);
    const gistSearchResult = await GistApiSearch(e);
    const userSearchResult = await UserApiSearch(e);

    setIsFetching(false);

    dispatch(setPostSearch(postSearchResult));
    dispatch(setGistSearch(gistSearchResult));
    dispatch(setUserSearch(userSearchResult));

    setSearchInput(e.target.value);
  };

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="Nav-search">
          {isFetching ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <FcSearch />
          )}
        </InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="Nav-search"
          onChange={apiSearch}
          autoFocus
        />
      </InputGroup>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-0 border-0"
      >
        {postSearch?.length > 0 && (
          <Tab eventKey="post" title="Post">
            <div>
              {postSearch.map((search: any, keyIndex) => (
                <li
                  key={keyIndex}
                  className={`${styles.tabLi} ${
                    keyIndex % 2 === 0 && styles.tabLiBg
                  } px-3`}
                  style={{ margin: "-.3rem 0 -.3rem 0", paddingBottom: "4px" }}
                  onClick={() => {
                    router.push(`/explore/${search?._id}`);
                    dispatch(setSearchModal(false));
                  }}
                >
                  <span className="h6">{search?.postTitle}:</span>
                  <div
                    className="ms-5"
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(truncate(search?.postBody, 50).html),
                    }}
                  />
                </li>
              ))}
            </div>
          </Tab>
        )}
        {gistSearch?.length > 0 && (
          <Tab eventKey="gist" title="Gist">
            <div>
              {gistSearch.map((search: any, keyIndex) => (
                <li
                  key={keyIndex}
                  className={`${styles.tabLi} ${
                    keyIndex % 2 === 0 && styles.tabLiBg
                  } px-3`}
                  style={{ margin: "-.3rem 0 -.3rem 0", paddingBottom: "4px" }}
                  onClick={() => {
                    router.push(`/gist/${search?._id}`);
                    dispatch(setSearchModal(false));
                  }}
                >
                  <span className="h6">{search?.title}:</span>
                  <div
                    className="ms-5"
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(truncate(search?.post, 50).html),
                    }}
                  />
                </li>
              ))}
            </div>
          </Tab>
        )}
        {userSearch?.length > 0 && (
          <Tab eventKey="user" title="User">
            <div>
              {userSearch.map((search: any, keyIndex) => (
                <li
                  key={keyIndex}
                  className={`${styles.tabLi} ${
                    keyIndex % 2 === 0 && styles.tabLiBg
                  } px-3`}
                  style={{ margin: "-.3rem 0 -.3rem 0", paddingBottom: "4px" }}
                  onClick={() => console.log("SEARCH:", search)}
                >
                  <span className="h6">
                    {search?.firstName} {search?.lastName}
                  </span>
                </li>
              ))}
            </div>
          </Tab>
        )}
      </Tabs>
      {postSearch?.length === 0 &&
      gistSearch?.length === 0 &&
      userSearch?.length === 0 &&
      searchInput.trim() !== "" ? (
        <div className="container">
          <div className="row">
            <div className="col-6 mx-auto">
              <MdOutlineSearchOff size="50" className="col-10 mx-auto" />
              <p>
                No Result For &quot;
                <span style={{ fontWeight: "bold" }}>
                  {String(searchInput)}
                </span>
                &quot;
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SearchTabs;
