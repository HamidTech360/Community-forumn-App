import { useRouter } from 'next/router';
import React from 'react';

const Feed = () => {
  const {query} = useRouter()

  console.log(query)
  return (
    <div>Feed</div>
  )
}

export default Feed