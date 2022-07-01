import React, { useEffect, useState } from "react";
import config from '../../../config'
import axios from "axios";
import Head from "next/head";
import { BsArrowLeft } from "react-icons/bs";
import styles from "@/styles/new-group.module.css";
import { Card, Badge } from "react-bootstrap";
import FormField from "@/components/Templates/new-group/form";
import Settings from "@/components/Templates/new-group/settings";
import AddConnections from "@/components/Templates/new-group/connections";
import AuthContent from "@/components/Auth/AuthContent";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

const CreateNewGroup = () => {
  const router = useRouter();
 
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    name:"",
    description:"",
    privacy:"",
    invite:"",
    allowedToPost:"",
    groupMembers:[]
  })

  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);



  const handleChange = (e)=>{
  
    const clone = {...data}
    clone[e.currentTarget.name] = e.currentTarget.value
    setData(clone)
    //console.log(data);
    
  }

  const handleSelectOption = (arrayName, value)=>{
   //alert(arrayName)
   const clone = {...data}
   if(arrayName==="privacy"){
    clone['privacy'] = value
    setData(clone)
   }else if(arrayName==="invite"){
    clone['invite'] = value
    setData(clone)
   }else if(arrayName==="allowedToPost"){
    clone['allowedToPost'] = value
    setData(clone)
   }
  }

  const handleSubmit = async ()=>{
    //alert('makng request')
    setIsLoading(true)
     console.log(data);
    
    try{
      const response = await axios.post(`${config.serverUrl}/api/groups`, {...data}, {headers:{
        authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }})
      console.log(response.data);
      setIsLoading(false)
      toast.success("Group created successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: '1',
        autoClose:7000
      });
      setTimeout(()=>{
        router.push('/groups')
      }, 3000)
    }catch(error){
      console.log(error.response?.data);
      setIsLoading(false)
      toast.error("Failed to upload gist", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: '2',
      });
    }
  }

  const goBack = () => {
    if (sessionStorage.getItem("newGroup_coming4rm")) {
      let backTo = JSON.parse(sessionStorage.getItem("newGroup_coming4rm"));
      sessionStorage.removeItem("newGroup_coming4rm");
      router.push(backTo);
    } else {
      router.push("/");
    }
  };


  const tabs = [
    {
      index:0,
      label: "Details",
      component: <FormField data={data} handleChange ={handleChange} />,
      active: true,
    },
    { 
      index:1,
      label: "Settings",
      component: <Settings handleSelectOption={handleSelectOption} />,
      active: false,
    },
    {
      index:2,
      label: "Add members",
      component: <AddConnections isLoading={isLoading} handleSubmit ={handleSubmit} />,
      active: false,
    },
  ]

  const handleSelectTabs = (tab, i) => {
    tabs.map((item) => (item.active = false));
    tabs[i].active = true;
    console.log(tabs);
    setActiveTab(tabs[i].index)
    console.log(tabs[i]);
  
  };
  

  return (
    <AuthContent>
      <Head>
        <title>New group</title>
      </Head>
      <ToastContainer/>
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
                    onClick={() => handleSelectTabs(item, i)}
                    className={`${styles.stepperBadge} ${
                      item.index==activeTab
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
