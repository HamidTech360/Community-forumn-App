import useSWR from "swr";
import React, { useEffect } from "react";
import config from "@/config";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const pageSize = 6;

const usePaginationBlogAll = (url: string, pageIndex: number) => {
  // const pageSize = 6;
  const getKey = () => {
    return `${config.serverUrl}${url}?perPage=${pageSize}&page=${pageIndex}`; // SWR key
  };
  const fetcher = async function (url) {
    const response = await axios.get(`${url}`);
    return response.data;
  };
  const { data: post, mutate, error } = useSWR(getKey, fetcher);
  const paginatedBlogAll = post;
  const isLoadingBlogAll = !post && !error;
  const mutateBlogAll = mutate;
  const errorBlogAll = error;

  return {
    paginatedBlogAll,
    mutateBlogAll,
    isLoadingBlogAll,
    errorBlogAll,
  };
};

export default usePaginationBlogAll;

export const usePaginationBlogHousing = (url: string, pageIndex: number) => {
  // const pageSize = 6;
  const getKey = () => {
    return `${config.serverUrl}${url}&perPage=${pageSize}&page=${pageIndex}`; // SWR key
    // return `${config.serverUrl}${url}&perPage=${pageSize}&page=${pageIndex}`; // SWR key
    // return `${config.serverUrl}${url}`; // SWR key
  };
  const fetcher = async function (url) {
    const response = await axios.get(`${url}`);
    return response.data;
  };
  const { data: post, mutate, error } = useSWR(getKey, fetcher);
  const paginatedBlogHousing = post;
  const isLoadingBlogHousing = !post && !error;
  const mutateBlogHousing = mutate;
  const errorBlogHousing = error;

  return {
    paginatedBlogHousing,
    mutateBlogHousing,
    isLoadingBlogHousing,
    errorBlogHousing,
  };
};

export const usePaginationStudyAbroad = (url: string, pageIndex: number) => {
  const pageSize = 6;

  const getKey = () => {
    // return `${config.serverUrl}${url}?perPage=${pageSize}&page=${pageIndex}`; // SWR key
    return `${config.serverUrl}${url}`; // SWR key
  };

  const fetcher = async function (url) {
    const response = await axios.get(`${url}`);
    return response.data;
  };

  const { data: post, error } = useSWR(getKey, fetcher);

  const paginatedStudyAbroadData = post;

  const isLoadingStudyAbroadData = !post && !error;

  const errorStudyAbroad = error;

  return {
    paginatedStudyAbroadData,
    isLoadingStudyAbroadData,
    errorStudyAbroad,
  };
};

export const LoaderPage = () => {
  return (
    <div className="container">
      <div className="row m-2 p-2 justify-content-center">
        <div className="col-12">
          <p style={{ textAlign: "center", color: "gray" }}>
            <b>Fetching Post...</b>
          </p>
        </div>
        <div className="col-12" style={{ textAlign: "center", color: "gray" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    </div>
  );
};
