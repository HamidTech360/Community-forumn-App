import React, { useState } from "react";
import styles from "../../../styles/templates/new-group/settings.module.css";
import { Form } from "react-bootstrap";

const Settings = ({handleSelectOption}) => {
  const [privacy, setPrivacy] = useState([
    {
      title: "Public group",
      active: false,
      lists: [
        "Any site member can join this group.",
        "This group will be listed in the groups directory and in search results.",
        " Group content and activity will be visible to any site member.",
      ],
      value:'public'
    },
    {
      title: "Private group",
      active: false,
      lists: [
        "Only people who request membership and are accepted can join the group.",
        "This group will be listed in the groups directory and in search results.",
        "Group content and activity will only be visible to members of the group.",
      ],
      value:'private'
    },
    {
      title: "Public group",
      active: false,
      lists: [
        "Only people who are invited can join the group.",
        " This group will not be listed in the groups directory or search results.",
        "Group content and activity will only be visible to members of the group.",
      ],
      value:'semiPublic'
    },
  ]);

  const [inviteOptions, setInviteOptions] = useState([
    {
      label: "Admin Only",
      active: false,
      value:'admin'
    },
    {
      label: "Admin and moderators",
      active: false,
      value:'moderators'
    },
    {
      label: "Everyone",
      active: false,
      value:'everyone'
    },
  ]);

  const [postOptions, setPostOptions] = useState([
    {
      label: "Admin Only",
      active: false,
      value:'admin'
    },
    {
      label: "Admin and moderators",
      active: false,
      value:'moderators',
    },
    {
      label: "Everyone",
      active: false,
      value:'everyone'
    },
  ]);

  const selectItem = (array, setArray, item, i, name) => {
    const clone = [...array];
    clone.map((item) => (item.active = false));
    clone[i].active = true;
    setArray(clone);
    //console.log(item);
    handleSelectOption(name, item.value)

    
    
  };
  return (
    <div className={styles.settings}>
      <div className={styles.settingsHeader}>Privacy Settings</div>
      <hr />

      {privacy.map((item, i) => (
        <div key={i} className={styles.groupType}>
          <div className={styles.groupTypeHeader}>{item.title}</div>
          <div
            onClick={() => selectItem(privacy, setPrivacy, item, i, 'privacy')}
            className={`${styles.radio} ${
              item.active ? styles.radioActive : ""
            }`}
          />
          <div className={styles.groupDescriptions}>
            <ul>
              {item.lists.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className={styles.settingsHeader} style={{ marginTop: "40px" }}>
        Invites
      </div>
      <hr />
      <div className={styles.inviteContent}>
        <div className={styles.inviteQuestion}>
          Which members of this group are allowed to invite others?
        </div>
        <div className={styles.inviteOptions}>
          {inviteOptions.map((item, i) => (
            <div className={styles.inviteOption}>
              <span className={styles.inviteOptionText}>{item.label}</span>
              <div
                className={`${styles.radio} ${
                  item.active ? styles.radioActive : ""
                }`}
                style={{ marginTop: "0px" }}
                onClick={() =>
                  selectItem(inviteOptions, setInviteOptions, item, i, 'invite')
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.settingsHeader} style={{ marginTop: "40px" }}>
        Posts
      </div>
      <hr />
      <div className={styles.inviteContent}>
        <div className={styles.inviteQuestion}>
          Which members of this group are allowed to post into the activity
          feed?
        </div>
        <div className={styles.inviteOptions}>
          {postOptions.map((item, i) => (
            <div className={styles.inviteOption}>
              <span className={styles.inviteOptionText}>{item.label}</span>
              <div
                className={`${styles.radio} ${
                  item.active ? styles.radioActive : ""
                }`}
                style={{ marginTop: "0px" }}
                onClick={() => selectItem(postOptions, setPostOptions, item, i, 'allowedToPost')}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
