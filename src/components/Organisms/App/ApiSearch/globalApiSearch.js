import axios from "axios";
import config from "@/config";

const resources = {};

const makeOptimizedRequest = () => {
  let cancel;

  return async query => {
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source();
    try {
      if (resources[query]) {
        // Return result if it exists
        return resources[query];
      }
      const res = await axios.get(query, { cancelToken: cancel.token });

      const result = res;
      // Store response
      resources[query] = result;

      return result;
    } catch (error) {
      // if (axios.isCancel(error)) {
      //   // Handle if request was cancelled
      //   console.log("Request canceled", error.message);
      // } else {
      //   // Handle usual errors
      //   console.log("Something went wrong: ", error.message);
      // }
    }
  };
};

export const search = makeOptimizedRequest();

export const PostApiSearch = async e => {
  e.preventDefault();
  if (e.target.value.trim() === "") return [];
  try {
    // const response = await axios.get(
    const response = await search(
      `${config.serverUrl}/api/search?keyword=${e.target.value}&type=post`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );

    return response.data;
  } catch (error) {
    // console.error("Post Search Error:");
  }
};

export const GistApiSearch = async e => {
  e.preventDefault();
  if (e.target.value.trim() === "") return [];
  try {
    // const response = await axios.get(
    const response = await search(
      `${config.serverUrl}/api/search?keyword=${e.target.value}&type=gist`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );

    return response.data;
  } catch (error) {
    // console.error("Gist Search Error:");
  }
};

export const UserApiSearch = async e => {
  e.preventDefault();
  if (e.target.value.trim() === "") return [];
  try {
    // const response = await axios.get(
    const response = await search(
      `${config.serverUrl}/api/search?keyword=${e.target.value}&type=user`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );

    return response.data;
  } catch (error) {
    // console.error("User Search Error:");
  }
};

export const GroupApiSearch = async e => {
  e.preventDefault();
  if (e.target.value.trim() === "") return [];
  try {
    // const response = await axios.get(
    const response = await search(
      `${config.serverUrl}/api/search?keyword=${e.target.value}&type=group`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );

    // console.log("GROUPS response.data:", response.data);
    return response.data;
  } catch (error) {
    // console.error("GROUPS response.data:", error);
    // console.error("User Search Error:");
  }
};

// For @Mention
export const MentionUserApiSearch = async chars => {
  try {
    // const response = await axios.get(
    const response = await search(
      `${config.serverUrl}/api/search?keyword=${chars}&type=user`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );

    return response.data;
  } catch (error) {
    // console.error("User Search Error:");
  }
};
