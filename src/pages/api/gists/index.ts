import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { sendMail } from "@/lib/mailer";
import getUserID from "@/utils/get-userID";
import Gist from "@/models/gist";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method === "POST") {
    //get token from headers
    const token = req.headers.authorization?.split(" ")[1] || "";

    const userID = getUserID(token);
    if (!userID) return res.status(401).end("Unauthorized!");
    try {
      const { title, post, country, categories } = req.body;

      const gist = await Gist.create({
        title,
        post,
        country,
        categories,
        user: userID,
      });
      res.status(201).json({ message: "Gist created", gist });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, message: "Something went wrong" });
    }
  } else if (req.method === "GET") {
    const gists = await Gist.find();
    res.status(200).json(gists);
  }
};

export default handler;
