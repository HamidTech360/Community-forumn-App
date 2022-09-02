import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "@/redux/store";
import {
  selectSearch,
  setFollowedUserDetails,
  selectFollowedUserDetails,
} from "@/reduxFeatures/app/mentionsSlice";

const useMentionUsers = async () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const search = useSelector(selectSearch);
  const followedUsersState = useSelector(selectFollowedUserDetails);
  const followedUsers = user.following;

  if (!followedUsersState) {
    const chars = [];
    await followedUsers.filter((user) => {
      const firstLastName = `${user?.firstName} ${user?.lastName}`;
      let followedUserName = user?.username ? user?.username : firstLastName;
      followedUserName.toLowerCase().startsWith(search.toLowerCase());
      // .slice(0, 10);

      chars.push({
        userName: followedUserName,
        userId: user?._id,
      });
    });
    console.log("chars", chars);

    dispatch(setFollowedUserDetails(chars));
    return { followedUsersState };
  }
};

export default useMentionUsers;
