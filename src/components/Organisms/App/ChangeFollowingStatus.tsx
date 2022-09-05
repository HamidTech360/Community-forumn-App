import config from "@/config";
import { setFollowed } from "@/reduxFeatures/app/appSlice";
import makeSecuredRequest, {
  deleteSecuredRequest
} from "@/utils/makeSecuredRequest";
import { useDispatch } from "react-redux";
import { user as userAuth } from "@/reduxFeatures/authState/authStateSlice";
import axios from "axios";

function ChangeFollowingStatus(post) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   manageFollowingStatus(post);
  // }, []);

  // // const dispatch = useDispatch()
  // const manageFollowingStatus = (post) => {
  if (
    document.getElementById(`followStr-${post?.author?._id}`).innerText ===
    "Follow"
  ) {
    // console.log("++++++++++++++++++");
    HandleFollow(post?.author?._id);
  } else if (
    document.getElementById(`followStr-${post?.author?._id}`).innerText ===
    "Unfollow"
  ) {
    HandleUnFollow(post?.author?._id);
  }
  // };

  // return <></>;
}

export default ChangeFollowingStatus;

export const HandleFollow = async id => {
  const dispatch = useDispatch();

  // Preset following
  // dispatch(setFollowed(true));
  dispatch(setFollowed({ isFollow: true, id }));
  try {
    await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

    // Update Auth User State
    (async function () {
      try {
        const response = await axios.get(`${config.serverUrl}/api/auth`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        dispatch(userAuth(response.data));
      } catch (error) {
        console.error("follow Error:", error);
        localStorage.removeItem("accessToken");
      }
    })();
  } catch (error) {
    // Revert on axios  failure
    // dispatch(setFollowed(false));
    dispatch(setFollowed({ isFollow: false, id }));
    console.error("follow Error:", error);
  }
  // return <></>;
};

export const HandleUnFollow = async id => {
  const dispatch = useDispatch();

  // Preset following
  // dispatch(setFollowed(false));
  dispatch(setFollowed({ isFollow: false, id }));
  try {
    await deleteSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

    // Update Auth User State
    (async function () {
      try {
        const response = await axios.get(`${config.serverUrl}/api/auth`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        dispatch(userAuth(response.data));
      } catch (error) {
        localStorage.removeItem("accessToken");
      }
    })();
  } catch (error) {
    // Revert on axios  failure
    // dispatch(setFollowed(true));
    dispatch(setFollowed({ isFollow: true, id }));
    console.error("follow Error:", error);
  }
  // return <></>;
};
