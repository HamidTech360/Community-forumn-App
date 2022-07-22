/* eslint-disable react-hooks/rules-of-hooks */
import useSWRInfinite from "swr/infinite";
import config from "@/config";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const gistPagination = (url: string) => {
    const pageSize = 1;

    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData?.gists?.length) return null; // reached the end

        return `${config.serverUrl}${url}?perPage=${pageSize}&page=${pageIndex}`; // SWR key
    };

    const fetcher = async function (url) {
        const response = await axios.get(`${url}`);
        return response.data;
    };

    const {
        data: gist,
        size,
        setSize,
        error,
        mutate,
        isValidating,
      } = useSWRInfinite(getKey, fetcher, {
        persistSize: true,
      });

      const fetchNextPage = () => setSize((size) => size + 1);

  const paginatedData: any = gist?.flatMap((page) => page?.gists) ?? [];

  const isReachedEnd = gist && gist[gist.length - 1]?.gists?.length < pageSize; // go last batch of data

  const isLoadingInitialData = !gist && !error;
//   console.log("isLoadingInitialData:", isLoadingInitialData);

  const loadingMore =
    isLoadingInitialData ||
    (size > 0 && gist && typeof gist[size - 1] === "undefined");

  return {
    paginatedData,
    isReachedEnd,
    loadingMore,
    // size,
    // setSize,
    error,
    mutate,
    isValidating,
    fetchNextPage,
  };
    
}

export default gistPagination;

export const Loader = () => {
    return (
      <div className="m-2 p-2 d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
};