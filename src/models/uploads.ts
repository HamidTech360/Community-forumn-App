import mongoose from 'mongoose'

const uploadSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    userId:{
        type:String, 
        required:true
    }
}, {timestamps:true})

const Upload = mongoose.models.Upload || mongoose.model('Upload', uploadSchema)
export default Upload