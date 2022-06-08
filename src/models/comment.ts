import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['gist', 'post'],
        required:'true'
    }
}, {timestamps:true})

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;