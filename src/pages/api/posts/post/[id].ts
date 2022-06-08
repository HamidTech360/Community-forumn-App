import mongoose from 'mongoose'
import Post from '@/models/post';
import dbConnect from "@/lib/mongo";
import getUserID from "@/utils/get-userID";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req:NextApiRequest, res:NextApiResponse)=>{
    await dbConnect()
    const postId = req.query.id
    const token = req.headers.authorization?.split(" ")[1] || "";
    const userID = getUserID(token);

    if (!userID) return res.status(401).end("Unauthorized!");

    if(req.method === "DELETE"){
        try{
            await Post.findByIdAndDelete(postId)
            res.json({
                status:'success',
                message:'Post deleted successfully'
            })
        }catch(error){
            console.log(error);
            res.status(500).send(error)         
        }
    }else if (req.method === "PUT"){
        const {postTitle, postBody} = req.body
        try{
            await Post.findByIdAndUpdate(postId, {
                postTitle, postBody
            })
            res.json({
                status:'success',
                message:'Post updated successfully'
            })
        }catch(error){
            console.log(error);
            res.status(500).send(error)
        }
    }else if(req.method==="GET"){
        try{
            const post = await Post.findById(postId)
            if(!post) return res.status(404).send('Post not found')
            res.json({
                status:'success',
                message:'Post retrieved with success',
                post
            })
        }catch(error){
            console.log(error);
            res.status(500).send(error)
        }
    }
}
//629f577995b0764c6fc663ed

export default handler