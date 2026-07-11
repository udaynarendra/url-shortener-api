import mongoose from "mongoose";
const urlSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    originalUrl:{
        type:String,
        trim:true,
        required:true
    },
    shortCode:{
            type:String,
            trim:true,
            unique:true,
            required:true
    },
    clicks:{
        type:Number,
        default:0
    }
},{timestamps:true})
const Url=mongoose.model('Url',urlSchema);
export default Url;