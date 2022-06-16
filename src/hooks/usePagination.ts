import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

interface IPost {
  bp_media_ids: string[] | null;
  content: { rendered: string };
  content_stripped: string;
  date: string;
  id: number;
  name: string;
  title: string;
  type: string;
  user_avatar: {
    full: string;
    thumb: string;
  };
  user_id: number;
}

// export const fetcher = async (url: string) => {
//   const { data: posts, headers } = await axios.get<IPost[]>(
//     `${process.env.NEXT_PUBLIC_REST}/${url}`
//   );

//   return { posts, headers };
// };

export const usePagination = () => {
  // const [page, setPage] = useState(1);
  // const { data, error, isValidating } = useSWR(
  //   `buddyboss/v1/activity?_fields=content_stripped,user_id,name,content,date,user_avatar,bp_media_ids,title,id,type&per_page=10&page=${page}`,
  //   fetcher,
  //   {
  //     refreshInterval: 100000,
  //   }
  // );
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  useEffect(() => {
    // if (data) {
    //   setPosts((existingPosts) => {
    //     const posts: typeof existingPosts = JSON.parse(
    //       JSON.stringify(existingPosts)
    //     );

    //     data.posts.forEach((post) => {
    //       if (!posts.find(({ id }) => id === post.id)) {
    //         posts.push(post);
    //       }
    //     });

    //     return posts;
    //   });
    // }
    (async function(){
        try{
          const response = await axios.get(`/api/posts`)
          console.log(response.data);
          
          setPosts(response.data.posts)
        }catch(error){
          console.log(error.response?.data);
        }
    })()
  }, []);

  return {
    posts,
    // error,
    // setPage,
    isFetchingMore,
    // hasMore: data ? page < Number(data.headers["x-wp-totalpages"]) : true,
    hasMore:false
  };
};
