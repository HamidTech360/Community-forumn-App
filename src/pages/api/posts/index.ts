import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import getUserID from "@/utils/get-userID";

import Post from "@/models/post";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method == "POST") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const userID = getUserID(token);
    if (!userID) return res.status(401).send("Unauthorized!");

    console.log(userID);
    console.log("Got to this point");

    try {
      const { userId, postTitle, postBody } = req.body;
      const newPost = await Post.create({
        userId,
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
    try {
      const posts = await Post.find();
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
