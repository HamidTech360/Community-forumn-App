import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import getUserID from "@/utils/get-userID";

import User from "@/models/User";

const handler = async (req:NextApiRequest, res:NextApiResponse)=>{
    await dbConnect()
    const token = req.headers.authorization?.split(" ")[1] || "";
    const userId = getUserID(token)
    console.log(`The user ID is ${userId}`);
    
    if(!userId) return res.status(401).end('Unauthorized')
    if(req.method === "PUT"){
        try{
            const user = await User.findByIdAndUpdate(userId,{
                ...req.body
            })

            res.json({
                status:'success',
                message:'User updated'
            })
                   
        }catch(error){
            res.status(500).send(error)
        }
    }else if(req.method==="DELETE"){
        try{
            await User.findByIdAndDelete(userId)
            res.json({
                status:'success',
                message:'User account deleted'
            })
        }catch(error){
            res.status(500).send(error)
        }
    }
}

export default handler 
