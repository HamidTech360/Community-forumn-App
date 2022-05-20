// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/lib/mongo";
import User, { IUserSchema } from "@/models/User";
import { setTokenCookie } from "@/utils/auth-cookie";
import { normalizeGoogleData } from "@/utils/dataNormalizer";
import getUserID from "@/utils/get-userID";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import { AnyKeys, AnyObject } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type authProvider = "GOOGLE" | "FACEBOOK" | "TWITTER" | string;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const provider: authProvider = String(req.query.provider).toUpperCase();
    if (!provider) {
      return res
        .status(400)
        .json({ message: "Authentication Provider not set" });
    }
    let userData: (AnyKeys<IUserSchema> & AnyObject) | undefined;
    if (provider === "GOOGLE") {
      userData = await normalizeGoogleData(req.body);
    }

    const dbUser = await User.findOne({ email: userData?.email }).select(
      "+authProvider"
    );
    let accessToken, refreshToken;
    console.log(userData);
    if (!dbUser) {
      const newUser = new User({
        ...userData,
        avatar: userData?.picture,
      });

      console.log(newUser);
      const savedUser = await newUser.save();
      accessToken = await generateAccessToken({ sub: savedUser._id });
      refreshToken = await generateRefreshToken({ sub: savedUser._id });

      return res.status(201).json({ accessToken, refreshToken });
    }
    if (dbUser.authProvider !== userData?.authProvider) {
      return res.status(409).json({
        message: "User with this email is associated with a different provider",
      });
    }

    accessToken = await generateAccessToken({ sub: dbUser._id });
    refreshToken = await generateRefreshToken({ sub: dbUser._id });

    return res.status(200).json({ accessToken, refreshToken });
  }
}
