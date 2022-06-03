import { NextApiRequest, NextApiResponse } from "next";

import User from "@/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const token = req.query.token;

      const user = await User.findOne({ confirmationCode: token });
      if (user) {
        user.status = "active";
        await user.save();
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).end("Something went wrong");
    }
  }
};

export default handler;
