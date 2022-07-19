import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import config from '@/config'

const ModalCard = () => {
  const [ feedModal, setFeedModal ] = useState({})

  const router = useRouter();
  


  const handleOneFeed = async () => {
    try {
      const modalResponse = await axios.get(`${config.serverUrl}/api/feed/${router?.query?.id}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      })
      console.log(router.query.id)
      console.log(modalResponse.data)
    } catch (error) {
      // router.back();
      console.log(error)
    }
  }

  useEffect(() => {
    handleOneFeed()
  }, [])

  return (
    <div>ModalCard</div>
  )
}

export default ModalCard