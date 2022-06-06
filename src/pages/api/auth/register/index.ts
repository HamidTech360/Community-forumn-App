import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { sendMail } from "@/lib/mailer";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        firstName,
        lastName,
        password,
        email,
        otherNames,
        interests,
        address,
        gender,
      } = req.body;
      await dbConnect();

      const token = await jwt.sign({ email: email }, process.env.JWT_SECRET);
      const userExists = await User.findOne({
        email,
      });

      if (!userExists) {
        let user = new User({
          firstName,
          lastName,
          password,
          email,
          otherNames,
          address,
          interests,
          gender,
          confirmationCode: token,
        });

        await user.save();
        sendMail(
          user.email,
          `<h1>Email Confirmation</h1>,<p>Hi ${
            user.firstName
          }, welcome to Setlinn.  <a href=${
            process.env.NODE_ENV === "production"
              ? `https://settlin.vercel.app/activate/${token}`
              : `http://localhost:3000/activate/${token}`
          }>Please use this link to activate your account.</a></p>`,
          "Activate your account"
        );
        res.status(201).json(user);
      } else {
        res.status(403).json({ error: "User already exists" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error, message: "Something went wrong" });
    }
  }
};

export default handler;
