import mongoose from 'mongoose'

export interface IPost extends mongoose.Document{
    userId:string,
    postTitle:string,
    postBody:string
}

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postTitle:{
        type:String,
        required:true
    }, 
    postBody:{
        type:String,
        required:true
    }
}, {timestamps:true})

const Post = mongoose.model('Post', postSchema)

export default Post;