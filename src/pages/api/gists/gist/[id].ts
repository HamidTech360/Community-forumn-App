import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import getUserID from "@/utils/get-userID";
import Gist from "@/models/gist";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //get gist id as params
  const gistID = req.query.id;
  await dbConnect();
  //check authorization for token
  const token = req.headers.authorization?.split(" ")[1] || "";

  const userID = getUserID(token);
  if (!userID) return res.status(401).end("Unauthorized!");

  if (req.method === "DELETE") {
    try {
      //find gist with gistID and delete
      await Gist.findByIdAndDelete(gistID).catch((error) => console.log(error));

      res.status(201).json({ message: "Gist deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, message: "Something went wrong" });
    }
  } else if (req.method === "PUT") {
    const { title, post, country, categories } = req.body;
    //find gist with GistID and update
    await Gist.findByIdAndUpdate(gistID, {
      title,
      post,
      country,
      categories,
    });
    res.status(200).json({ message: "Gist updated" });
  }
};

export default handler;
