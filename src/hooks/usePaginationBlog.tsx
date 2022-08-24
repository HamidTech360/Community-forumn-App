import useSWR from "swr";
import React, { useEffect } from "react";
import config from "@/config";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const pageSize = 6;

const usePaginationBlogAll = (url: string, pageIndex: number) => {
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

export const usePaginationBlogStudyAbroad = (
  url: string,
  pageIndex: number
) => {
  const getKey = () => {
    return `${config.serverUrl}${url}&perPage=${pageSize}&page=${pageIndex}`; // SWR key
    // return `${config.serverUrl}${url}`; // SWR key
  };

  const fetcher = async function (url) {
    const response = await axios.get(`${url}`);
    return response.data;
  };

  const { data: post, mutate, error } = useSWR(getKey, fetcher);

  const paginatedBlogStudyAbroad = post;
  const isLoadingBlogStudyAbroad = !post && !error;
  const mutateBlogStudyAbroad = mutate;
  const errorBlogStudyAbroad = error;

  return {
    paginatedBlogStudyAbroad,
    isLoadingBlogStudyAbroad,
    mutateBlogStudyAbroad,
    errorBlogStudyAbroad,
  };
};

export const usePaginationBlogWorkAbroad = (url: string, pageIndex: number) => {
  const getKey = () => {
    return `${config.serverUrl}${url}&perPage=${pageSize}&page=${pageIndex}`; // SWR key
    // return `${config.serverUrl}${url}`; // SWR key
  };

  const fetcher = async function (url) {
    const response = await axios.get(`${url}`);
    return response.data;
  };

  const { data: post, mutate, error } = useSWR(getKey, fetcher);

  const paginatedBlogWorkAbroad = post;
  const isLoadingBlogWorkAbroad = !post && !error;
  const mutateBlogWorkAbroad = mutate;
  const errorBlogWorkAbroad = error;

  return {
    paginatedBlogWorkAbroad,
    isLoadingBlogWorkAbroad,
    mutateBlogWorkAbroad,
    errorBlogWorkAbroad,
  };
};

export const usePaginationBlogLiveAbroad = (url: string, pageIndex: number) => {
  const getKey = () => {
    return `${config.serverUrl}${url}&perPage=${pageSize}&page=${pageIndex}`; // SWR key
    // return `${config.serverUrl}${url}`; // SWR key
  };

  const fetcher = async function (url) {
    const response = await axios.get(`${url}`);
    return response.data;
  };

  const { data: post, mutate, error } = useSWR(getKey, fetcher);

  const paginatedBlogLiveAbroad = post;
  const isLoadingBlogLiveAbroad = !post && !error;
  const mutateBlogLiveAbroad = mutate;
  const errorBlogLiveAbroad = error;

  return {
    paginatedBlogLiveAbroad,
    isLoadingBlogLiveAbroad,
    mutateBlogLiveAbroad,
    errorBlogLiveAbroad,
  };
};

export const usePaginationBlogPgStudies = (url: string, pageIndex: number) => {
  const getKey = () => {
    return `${config.serverUrl}${url}&perPage=${pageSize}&page=${pageIndex}`; // SWR key
    // return `${config.serverUrl}${url}`; // SWR key
  };

  const fetcher = async function (url) {
    const response = await axios.get(`${url}`);
    return response.data;
  };

  const { data: post, mutate, error } = useSWR(getKey, fetcher);

  const paginatedBlogPgStudies = post;
  const isLoadingBlogPgStudies = !post && !error;
  const mutateBlogPgStudies = mutate;
  const errorBlogPgStudies = error;

  return {
    paginatedBlogPgStudies,
    isLoadingBlogPgStudies,
    mutateBlogPgStudies,
    errorBlogPgStudies,
  };
};

export const usePaginationBlogPtJobs = (url: string, pageIndex: number) => {
  const getKey = () => {
    return `${config.serverUrl}${url}&perPage=${pageSize}&page=${pageIndex}`; // SWR key
    // return `${config.serverUrl}${url}`; // SWR key
  };

  const fetcher = async function (url) {
    const response = await axios.get(`${url}`);
    return response.data;
  };

  const { data: post, mutate, error } = useSWR(getKey, fetcher);

  const paginatedBlogPtJobs = post;
  const isLoadingBlogPtJobs = !post && !error;
  const mutateBlogPtJobs = mutate;
  const errorBlogPtJobs = error;

  return {
    paginatedBlogPtJobs,
    isLoadingBlogPtJobs,
    mutateBlogPtJobs,
    errorBlogPtJobs,
  };
};

export const usePaginationBlogHousing = (url: string, pageIndex: number) => {
  const getKey = () => {
    return `${config.serverUrl}${url}&perPage=${pageSize}&page=${pageIndex}`; // SWR key
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
