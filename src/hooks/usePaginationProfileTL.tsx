import useSWRInfinite from "swr/infinite";
import React, { useEffect } from "react";
import config from "@/config";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const usePaginationProfileTL = (
  url: string,
  dotTitle: string,
  isAuthUserTimeline: boolean
) => {
  const pageSize = 25;

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData[dotTitle].length) return null; // reached the end

    if (isAuthUserTimeline) {
      return `${config.serverUrl}${url}?perPage=${pageSize}&page=${pageIndex}`; // SWR key
    } else {
      return `${config.serverUrl}${url}&perPage=${pageSize}&page=${pageIndex}`; // SWR key
    }
  };

  const fetcher = async function (url) {
    const response = await axios.get(`${url}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    return response.data;
  };

  const {
    data: post,
    size,
    setSize,
    error,
    mutate,
    isValidating
  } = useSWRInfinite(getKey, fetcher, {
    persistSize: true
  });

  const fetchNextPageProfileTL = () => setSize(size => size + 1);

  const paginatedDataProfileTL: any =
    post?.flatMap(page => page[dotTitle]) ?? [];

  const isReachedEndProfileTL =
    post && post[post.length - 1][dotTitle]?.length < pageSize; // got last batch of data

  const isLoadingInitialDataProfileTL = !post && !error;

  return {
    paginatedDataProfileTL,
    isReachedEndProfileTL,
    errorProfileTL: error,
    fetchNextPageProfileTL,
    mutateProfileTL: mutate,
    isValidatingProfileTL: isValidating
  };
};

export default usePaginationProfileTL;

export const Loader = () => {
  return (
    <div className="m-2 p-2 d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
