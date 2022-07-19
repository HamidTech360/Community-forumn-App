/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import config from '@/config'

const ModalCard = () => {
  const [ feedModal, setFeedModal ] = useState({})

  const router = useRouter();
  const { id } = router.query



  useEffect(() => {
    (async function () {
      try {
        const modalResponse = await axios.get(`${config.serverUrl}/api/feed/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        })
        console.log(modalResponse.data)

      } catch (error) {
        // router.back();
        console.log(error)
      }
    })()
  
  }, [])

  return (
    <div>ModalCard</div>
  )
}

export default ModalCard