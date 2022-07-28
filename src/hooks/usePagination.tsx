import useSWRInfinite from "swr/infinite";
import React, {useEffect} from 'react'
import config from "@/config";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const usePagination = (url: string, dotTitle: string) => {
  const pageSize = 4;

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData[dotTitle].length) return null; // reached the end

    return `${config.serverUrl}${url}?perPage=${pageSize}&page=${pageIndex}`; // SWR key
  };

  const fetcher = async function (url) {
    const response = await axios.get(`${url}`);
    return response.data;
  };
  

  const {
    data: post,
    size,
    setSize,
    error,
    // mutate,
    isValidating,
  } = useSWRInfinite(getKey, fetcher, {
    persistSize: true,
  });

  const fetchNextPage = () => setSize((size) => size + 1);

  const paginatedData: any = post?.flatMap((page) => page[dotTitle]) ?? [];

  const isReachedEnd =
    post && post[post.length - 1][dotTitle]?.length < pageSize; // got last batch of data

  const isLoadingInitialData = !post && !error;

  const loadingMore =
    isLoadingInitialData ||
    (size > 0 && post && typeof post[size - 1] === "undefined");

  return {
    paginatedData,
    isReachedEnd,
    error,
    fetchNextPage,
    // size,
    // setSize,
    // mutate,
    isValidating,
    // loadingMore,
  };
};

export default usePagination;

export const Loader = () => {
  return (
    <div className="m-2 p-2 d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
