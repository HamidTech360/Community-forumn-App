import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import getUserID from "@/utils/get-userID";

import User from "@/models/User";
import { validateUser } from "@/validators/user";

const handler = async (req:any, res:NextApiResponse)=>{
    await dbConnect()
    const token = req.headers.authorization?.split(" ")[1] || "";
    const userId = getUserID(token)
    if(!userId) return res.status(401).end('Unauthorized')
    
    if(req.method === "PUT"){

        try{
            const {error} = validateUser(req.body)
            if(error) return res.status(401).send(error.details[0].message)
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
        //    const user = await User.findById(userId)
        //     if(!user) return res.status(404).send('User not found')
        //     console.log(user);
            
        //     user.deleted = true
        //     await user.save()

        const result = await User.update({_id:userId}, {
            $set:{
                deleted:true
            }
        })
        console.log(result);
        

            res.json({
                status:'success',
                message:'User account deleted'
            })
        }catch(error){
            res.status(500).send(error)
        }
    }else if (req.method=="GET"){
        try{
            const users = await User.find()
            res.json({
                status:'success',
                message:'All users fetched',
                users
            })
        }catch(error){
            res.status(500).send(error)
        }
    }
}

export default handler 
