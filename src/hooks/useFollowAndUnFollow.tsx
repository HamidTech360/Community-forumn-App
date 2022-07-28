import config from "@/config";
import { useDispatch } from "@/redux/store";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";

import { user as userAuth } from "@/reduxFeatures/authState/authStateSlice";
import axios from "axios";

export const useFollow = async (id) => {
  const dispatch = useDispatch();

  try {
    await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

    // Update Auth User State
    (async function () {
      try {
        const response = await axios.get(`${config.serverUrl}/api/auth`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        dispatch(userAuth(response.data));
      } catch (error) {
        localStorage.removeItem("accessToken");
      }
    })();
  } catch (error) {
    // console.error("follow Error:", error);
  }

  return <></>;
};

export const useUnFollow = async (id) => {
  const dispatch = useDispatch();

  try {
    await deleteSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

    // Update Auth User State
    (async function () {
      try {
        const response = await axios.get(`${config.serverUrl}/api/auth`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        dispatch(userAuth(response.data));
      } catch (error) {
        localStorage.removeItem("accessToken");
      }
    })();
  } catch (error) {
    // console.error("follow Error:", error);
  }

  return {};
};
