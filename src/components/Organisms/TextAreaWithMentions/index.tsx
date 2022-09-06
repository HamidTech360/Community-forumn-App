// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import React, { useEffect, useState } from "react";
import Mentions from "rc-mentions";
import { useSelector } from "react-redux";
import { MentionUserApiSearch } from "@/components/Organisms/App/ApiSearch/globalApiSearch";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import Avatar from "@/components/Atoms/Avatar";

const TextAreaWithMentions = () => {
  const authUser = useSelector(selectUser);
  const { Option } = Mentions;

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [listMention, setListMention] = useState([]);
  const [mentionedUsersList, setMentionedUsersList] = useState([]);

  useEffect(() => {
    if (listMention?.length > 0) {
      // Populate Users For @Mentions
      const usersList = [];
      listMention?.filter(user => {
        const firstLastName = `${user?.firstName.trim()} ${user?.lastName.trim()}`;
        firstLastName.toLowerCase().startsWith(search.toLowerCase());

        // Auth User Can not mention His/Her self
        if (user?._id !== authUser?._id) {
          usersList.push({
            userName: firstLastName,
            userId: user?._id,
            avatar: user?.images?.avatar
          });
        }
      });

      // Users to display
      setMentionedUsersList(usersList);
      setLoading(false);
    } else {
      setMentionedUsersList([]);
      setLoading(false);
    }
  }, [listMention, search, authUser]);

  // useEffect(() => {
  //   console.log("mentionedUsersList:", mentionedUsersList);
  // }, [mentionedUsersList]);

  const onSearch = async searching => {
    setSearch(searching);
    setLoading(!!searching);

    // Axios fetch users by search
    if (searching?.length > 0) {
      const mentionUser = await MentionUserApiSearch(search);
      setListMention(mentionUser);
    } else {
      setListMention([]);
    }
  };

  return (
    <Mentions
      onSearch={onSearch}
      style={{
        width: "100%"
      }}
      autoFocus
      autoSize={{ minRows: 6, maxRows: 6 }}
    >
      {loading ? (
        <Option value={search} disabled>
          Searching {`'${search}'`}...
        </Option>
      ) : (
        mentionedUsersList.map((user, userId) => (
          <Option key={userId.toString()} value={user.userName}>
            <div className="d-flex align-items-center justify-content-start gap-2">
              <Avatar
                src={user?.avatar || "/logo.png"}
                width={40}
                height={40}
                name={user.userName}
              />
              <span>{user.userName}</span>
            </div>
          </Option>
        ))
      )}
    </Mentions>
  );
};

export default TextAreaWithMentions;
