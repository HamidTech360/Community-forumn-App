import React, { useEffect, useState } from "react";
import joi from "joi-browser";
import Head from "next/head";
import { BsArrowLeft } from "react-icons/bs";
import styles from "@/styles/new-group.module.css";
import { Badge } from "react-bootstrap";
import FormField from "@/components/Templates/new-group/form";
import Settings from "@/components/Templates/new-group/settings";
import AddConnections from "@/components/Templates/new-group/connections";
import AuthContent from "@/components/Auth/AuthContent";
import { toast, ToastContainer } from "react-toastify";
import config from "@/config";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CreateNewGroup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    privacy: "",
    invite: "",
    allowedToPost: "",
    groupMembers: []
  });

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  const moveToNewTab = tabIndex => {
    setActiveTab(tabIndex);
  };

  const handleChange = e => {
    const clone = { ...data };
    clone[e.currentTarget.name] = e.currentTarget.value;
    setData(clone);
  };

  const handleSelectOption = (arrayName, value) => {
    const clone = { ...data };
    if (arrayName === "privacy") {
      clone["privacy"] = value;
      setData(clone);
    } else if (arrayName === "invite") {
      clone["invite"] = value;
      setData(clone);
    } else if (arrayName === "allowedToPost") {
      clone["allowedToPost"] = value;
      setData(clone);
    }
  };

  const chooseConnections = connectionIds => {
    const clone = { ...data };
    clone["groupMembers"] = connectionIds;
    setData(clone);
  };

  const validateGroupData = data => {
    const schema = {
      name: joi.string().required(),
      description: joi.string().required(),
      privacy: joi.string().required(),
      invite: joi.string().required(),
      allowedToPost: joi.string().required(),
      groupMembers: joi.array()
    };
    return joi.validate(data, schema);
  };

  const handleSubmit = async () => {
    const { error } = validateGroupData(data);
    if (error) {
      toast.error(error.details[0].message, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "2"
      });
      return console.log(error.details[0].message);
    }

    setIsLoading(true);

    console.log("Final group data is ", data);
   
    try {
      const response = await axios.post(`${config.serverUrl}/api/groups`, data, {headers:{
        authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }})
      console.log(response.data);
      setIsLoading(false);
      toast.success("Group created successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
        autoClose: 7000
      });
      setTimeout(() => {
        router.push("/groups");
      }, 3000);
    } catch (error) {
      // console.log(error.response?.data);
      setIsLoading(false);
      toast.error("Failed to create group", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "2"
      });
    }
  };

  const goBack = () => {
    if (activeTab == 0) {
      return router.push("/groups");
    }
    setActiveTab(activeTab - 1);
  };

  const tabs = [
    {
      index: 0,
      label: "Details",
      component: (
        <FormField
          data={data}
          handleChange={handleChange}
          moveToNewTab={moveToNewTab}
        />
      ),
      active: true
    },
    {
      index: 1,
      label: "Settings",
      component: (
        <Settings
          data={data}
          moveToNewTab={moveToNewTab}
          handleSelectOption={handleSelectOption}
        />
      ),
      active: false
    },
    {
      index: 2,
      label: "Add members",
      component: (
        <AddConnections
          chooseConnections={chooseConnections}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          data={data}
        />
      ),
      active: false
    }
  ];

  return (
    <AuthContent>
      <Head>
        <title>New group</title>
      </Head>
      <ToastContainer />
      <div className={styles.createGroupFlex}>
        <div className={styles.createGroupLayout}>
          <div className={styles.ArrowBox}>
            <div className="btn" onClick={goBack}>
              <BsArrowLeft size={30} />
            </div>
          </div>
          <div className={styles.createGroupContent}>
            <div className={`${styles.createGroupHeader} text-center`}>
              Create New Group
            </div>

            <div className={`${styles.steppersBox} `}>
              {tabs.map((item, i) => (
                <div className={styles.stepperBoxItem} key={i}>
                  <Badge
                    //onClick={() => handleSelectTabs(item, i)}
                    className={`${styles.stepperBadge} ${
                      item.index == activeTab
                        ? styles.stepperBadgeActive
                        : styles.stepperBadgePassive
                    }`}
                  >
                    {i + 1}
                  </Badge>
                  <span className={styles.stepperLabel}>{item.label}</span>
                  {i == tabs.length - 1 ? (
                    ""
                  ) : (
                    <button className={styles.stepperLine}></button>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.createGroupElement}>
              {/* {tabs.map((item, index) => (
                <div key={index}>{item.active ? item.component : ""}</div>
              ))} */}
              {tabs[activeTab]?.component}
            </div>
          </div>
        </div>
      </div>
    </AuthContent>
  );
};

export default CreateNewGroup;
