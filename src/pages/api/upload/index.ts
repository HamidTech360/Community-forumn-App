import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongo";
import getUserID from "@/utils/get-userID";
import multer from 'multer'
import fs from 'fs'
import nextConnect from "next-connect";
import formidable from 'formidable'



// const upload = multer({
//     Storage:multer.diskStorage({
//         destination:'./public/uploads',
//     })
// })

// const apiRoute = nextConnect()

// apiRoute.use(upload.single('file'))
// apiRoute.post((req, res)=>{
//     res.statusCode= 200;
//     res.statusMessage = "file uploaded"
    
// })

// export default apiRoute


const handler = async (req:any, res:NextApiResponse)=>{
    await dbConnect()
   // upload.single('file')
    if(req.method==="POST"){
       const form = new formidable.IncomingForm()
       form.parse(req)
       
       form.KeepExtensions = true
       form.parse(req, (err, fields, files)=>{
           console.log(err, fields, files);
           files.path = __dirname + `/uploads/`+files.originalFilename
           res.send(err||'DOne')
           
       })      
    }
}

export default handler 

export const config = {
    api:{
        bodyParser:false
    }
}