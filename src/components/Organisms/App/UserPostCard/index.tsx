import React from 'react';
import { useRouter } from 'next/router';

const UserPostCard = ({user}: any) => {

    const router = useRouter()

    const redirectPage = () => {
        router.push({
          pathname: `/John/[id]`,
          query: {
            id: user?._id,
          },
        });
      };
  return (
    <>
        <div>
            <h1 onClick={redirectPage}>John</h1>
        </div>
    </>
  )
}

export default UserPostCard