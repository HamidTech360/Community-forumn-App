import useSWRInfinite from "swr/infinite";
import config from "@/config";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const pageSize = 25;
const usePagination = (url: string, pageIndex) => {
  let numPages;

  const getKey = (pageIndexX: number, previousPageData: any) => {
    // pageIndex = pageIndex + 1;
    console.log("pageIndex:", pageIndex);
    console.log("previousPageData:", previousPageData);
    // console.log("sSIZEe:", size);
    if (previousPageData && !previousPageData.length) return null; // reached the end

    return `${config.serverUrl}${url}?perPage=${pageSize}&page=${pageIndex}`; // SWR key
  };

  const fetcher = async function (url) {
    const response = await axios.get(`${url}`);
    numPages = response.data.numPages;
    return response.data;
  };

  const {
    data: post,
    size,
    setSize,
    error,
    mutate,
    isValidating,
  } = useSWRInfinite(getKey, fetcher);

  console.log("SIZZZE:", size);

  const paginatedData: any = post?.flat();

  //   console.log("POST:::", post[post.length - 1].feed);
  //   console.log("post[size - 1]:::", post[size - 1]?.feed);

  const isReachedEnd = post && post[post.length - 1]?.feed?.length < pageSize; // go last batch of data
  const loadingMore = post && typeof post[size - 1] === "undefined";
  //   const loadingMore = post && typeof post[numPages - 1] === "undefined";

  //   const issues = post ? [].concat(...post) : [];
  //   console.log("issues:", issues);

  //   const isLoadingInitialData = !post && !error;
  //   console.log("isLoadingInitialData:", isLoadingInitialData);

  return {
    paginatedData,
    isReachedEnd,
    loadingMore,
    size,
    setSize,
    error,
    mutate,
    isValidating,
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
