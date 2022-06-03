import mongoose from "mongoose";

export interface IGistSchema extends mongoose.Document  {
    userId:string,
    title:string,
    country:string,
    category:string,
    post:string
}

const gistSchema = new mongoose.Schema<IGistSchema>({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    }
}, {timestamps:true})

const Gist =  mongoose.model("Gist", gistSchema);

export default Gist