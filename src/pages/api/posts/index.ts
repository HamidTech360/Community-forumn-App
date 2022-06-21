import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import getUserID from "@/utils/get-userID";
import {validatePost} from '../../../validators/post'

import Post from "@/models/post";

const handler = async (req: any, res: NextApiResponse) => {
  await dbConnect();

  if (req.method == "POST") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const userId = getUserID(token);
    console.log(`The user ID is ${userId}`);
    if (!userId) return res.status(401).send("Unauthorized!");

    

    try {
      const {  postTitle, postBody } = req.body;
      const {error} = validatePost(req.body)
      if(error) return res.status(400).send(error.details[0].message)
      const newPost = await Post.create({
        user:userId,
        postTitle,
        postBody,
      });

      res.status(201).json({
        status: "success",
        message: "Post created successfully",
        newPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, message: "Something went wrong" });
    }
  } else if (req.method === "GET") {
    const query = req.query
   // return console.log(query);
   console.log('Getting posts');
   
    const size = parseInt(`${query.size}`)
    const page = parseInt(`${query.page}`)

    console.log(size, page, 'queries');
    
    try {
      const posts = await Post
      .find()
      .or([{deleted:false}, {deleted:null}])
      .limit(size||10)
      .skip(page||0)
      .sort({createdAt:-1})

      res.status(200).json({
        status: "success",
        message: "All posts retrieved",
        posts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to retrieve posts");
    }
  }
};

export default handler;
