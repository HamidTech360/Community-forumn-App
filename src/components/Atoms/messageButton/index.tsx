import React from 'react'
import {RiMessage2Fill} from 'react-icons/ri'
import Link from 'next/link'

const MessageButton = ()=>{
    return(
      <Link href={"/chat"}>
        <div className="message-icon-circle" >
          <RiMessage2Fill size={25} color="white" />
      </div>
      </Link>
    )
}

export default MessageButton