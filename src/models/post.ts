import mongoose from "mongoose";

export interface IPost extends mongoose.Document {
  user: string;
  postTitle: string;
  postBody: string;
  type:string;
}

const postSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    postTitle: {
      type: String,
      required: true,
    },
    postBody: {
      type: String,
      required: true,
    },
    deleted:{
      type:Boolean,
      default:false
    },
    type:{
      type:String,
      default:'post'
    }
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
