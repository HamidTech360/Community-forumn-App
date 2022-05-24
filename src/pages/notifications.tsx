import Head from "next/head";
import React, {useEffect} from 'react'
import {GoPrimitiveDot} from 'react-icons/go'
import styles from '../styles/notifications.module.css'

const Notifications = ()=>{

    const notifications = [
        {
            message:'Welcome to setlinn. Your accunt ihas been set up successfully',
            date:'Dec 12, 2021 at 9:00am'
        },
        {
            message:'Welcome to setlinn. Your accunt ihas been set up successfully',
            date:'Dec 12, 2021 at 9:00am'
        },
        {
            message:'Welcome to setlinn. Your accunt ihas been set up successfully',
            date:'Dec 12, 2021 at 9:00am'
        },
        {
            message:'Your password has been successfully changed',
            date:'Dec 12, 2021 at 9:00am'
        },
        {
            message:'Welcome to setlinn. Your accunt ihas been set up successfully',
            date:'Dec 12, 2021 at 9:00am'
        },

    ]

    useEffect(() => {
        document.body.style.backgroundColor = "#f6f6f6";
    
        return () => {
          document.body.style.backgroundColor = "initial";
        };
      }, []);
   return (
    <>
        <Head>
            <title>Notifications</title> 
        </Head>

        <div className={styles.notificationBox}>
            
            <div className={styles.notificationHeader}>
                <span className={styles.notificationHeaderText}>Notifications</span>
                <span className={`${styles.markAsRead} float-sm-end`}>Mark all as read</span>
            </div>

            <div className={styles.notificationDay}>Today</div>

            <div className={styles.notificationList}>
                {
                    notifications.map((item, i)=>
                        <div className={styles.notificationListItem}>
                            <div className={styles.notificationDot}> <GoPrimitiveDot size={30} color="#069197" /> </div>
                            <div className={styles.notificationMessages}>
                                {item.message}
                                <div className={styles.notificationTime}>{item.date} </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    </>
   )
}

export default Notifications