import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import {
  setPostSearch,
  selectPostSearch,
  setGistSearch,
  selectGistSearch,
  setUserSearch,
  selectUserSearch,
  setGroupSearch,
  selectGroupSearch,
} from "@/reduxFeatures/api/searchSlice";

import { Form, InputGroup, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "@/redux/store";
import {
  PostApiSearch,
  GistApiSearch,
  UserApiSearch,
  GroupApiSearch,
} from "@/components/Organisms/App/ApiSearch/globalApiSearch";
import { FcSearch } from "react-icons/fc";
import { MdOutlineSearchOff } from "react-icons/md";
import { setSearchModal } from "@/reduxFeatures/app/appSlice";
import PostRender from "./PostRender";
import GistRender from "./GistRender";
import UserRender from "./UserRender";
import GroupRender from "./GroupRender";

function SearchTabs() {
  useEffect(() => {
    // Remove Focus From Search input
    document.getElementById("navSearch").blur();

    // Clear search results
    return () => {
      dispatch(setPostSearch([]));
      dispatch(setGistSearch([]));
      dispatch(setUserSearch([]));
      dispatch(setGroupSearch([]));
    };
  }, []);

  const dispatch = useDispatch();
  const postSearch = useSelector(selectPostSearch);
  const gistSearch = useSelector(selectGistSearch);
  const userSearch = useSelector(selectUserSearch);
  const groupSearch = useSelector(selectGroupSearch);

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
      : groupSearch?.length > 0
      ? setKey("group")
      : null;
  }, [postSearch, gistSearch, userSearch, groupSearch]);

  const apiSearch = async (e) => {
    setIsFetching(true);
    const postSearchResult = await PostApiSearch(e);
    const gistSearchResult = await GistApiSearch(e);
    const userSearchResult = await UserApiSearch(e);
    const groupSearchResult = await GroupApiSearch(e);

    setIsFetching(false);

    dispatch(setPostSearch(postSearchResult));
    dispatch(setGistSearch(gistSearchResult));
    dispatch(setUserSearch(userSearchResult));
    dispatch(setGroupSearch(groupSearchResult));

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
            {postSearch.map((search: any, keyIndex) => (
              <PostRender search={search} key={keyIndex} index={keyIndex} />
            ))}
          </Tab>
        )}
        {gistSearch?.length > 0 && (
          <Tab eventKey="gist" title="Gist">
            {gistSearch.map((search: any, keyIndex) => (
              <GistRender search={search} key={keyIndex} index={keyIndex} />
            ))}
          </Tab>
        )}
        {userSearch?.length > 0 && (
          <Tab eventKey="user" title="User">
            {userSearch.map((search: any, keyIndex) => (
              <UserRender search={search} key={keyIndex} index={keyIndex} />
            ))}
          </Tab>
        )}
        {groupSearch?.length > 0 && (
          <Tab eventKey="group" title="Group">
            {/* // <Tab eventKey="user" title="User"> */}
            {groupSearch.map((search: any, keyIndex) => (
              <GroupRender search={search} key={keyIndex} index={keyIndex} />
            ))}
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
