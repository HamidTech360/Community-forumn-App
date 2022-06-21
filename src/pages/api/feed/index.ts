import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { sendMail } from "@/lib/mailer";
import getUserID from "@/utils/get-userID";
import Gist from "@/models/gist";
import Post from "@/models/post";
import post from "@/redux/post";

const handler = async (req:any, res:NextApiResponse)=>{
    if(req.method==="GET"){
        try{
            let gists = await Gist
                .find()
                .limit(10)
            gists.forEach(item=>{
                item.type="gist"
            })
           
            let posts = await Post
                    .find()
                    .limit(10)
            posts.forEach(item=>{
                item.type="post"
            })

            const result = [...gists, ...posts]
            result.sort((a,b)=>{
                if (a.createdAt > b.createdAt) {
                    return -1;
                  }
                  if (a.createdAt < b.createdAt) {
                    return 1;
                  }
                
                  // names must be equal
                  return 0;
            })

            res.status(200).json({
                status:'success',
                message:'Feeds fetched successfully',
                data:result
            })
        }catch(error){
            res.status(500).send(error)
        }
    }
}

export default handler 