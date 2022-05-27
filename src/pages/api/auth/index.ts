// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import { setTokenCookie } from "@/utils/auth-cookie";
import getUserID from "@/utils/get-userID";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      console.log(req.body);

      const { email, password, remember } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json({
          message: `User with email ${email} does not exist`,
          key: "email",
        });
      } else if (!(await user.matchPassword(password))) {
        return res
          .status(400)
          .json({ message: "Password is incorrect", key: "password" });
      } else {
        const accessToken = generateAccessToken({ sub: user._id });
        const refreshToken = generateRefreshToken({ sub: user._id });

        if (remember) {
          setTokenCookie(res, refreshToken);
          res.json({ accessToken, refreshToken });
        } else {
          res.json({ accessToken, refreshToken });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Something went wrong");
    }
  } else if (req.method === "GET") {
    try {
      await dbConnect();

      const token = req.headers.authorization?.split(" ")[1] || "";

      const userID = getUserID(token);
      if (!userID) return res.status(401).end("Unauthorized!");

      const user = await User.findById(userID).select("-password");

      if (!user) return res.status(400).end("User not found");

      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).end("Something went wrong");
    }
  }
}
