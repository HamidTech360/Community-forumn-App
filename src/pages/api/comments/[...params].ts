import Comment from "@/models/comment";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import getUserID from "@/utils/get-userID";
import { send } from "process";
import { validateComment } from "@/validators/comment";

const handler = async (req:NextApiRequest, res:NextApiResponse)=>{
    
   
    
    await dbConnect()
    const token = req.headers.authorization?.split(" ")[1] || "";
    const userId = getUserID(token)
    const postId = req.query.params[0]
    const type= req.query.params[1]

     
    if(!userId) return res.status(401).end('Unauthorized')
    
    if(req.method==="POST"){
        const { comment} = req.body
        try{
            const {error} = validateComment(req.body)
            if(error) return res.status(401).send(error.details[0].message)

            const newComment = await Comment.create({
                userId,
                postId,
                type,
                comment
            })

            res.json({
                status:'success',
                message:'Comment saved',
                newComment
            })
        }catch(error){
            res.status(500).send(error)
        }
    }
    
    else if (req.method === "GET"){
      try{
        const comments = await Comment.find({type})
        res.json({
            status:'success',
            message:'comment retrieved',
            comments
        })
      }catch(error){
        res.status(500).send(error)
      }
    }
        
}

export default handler
