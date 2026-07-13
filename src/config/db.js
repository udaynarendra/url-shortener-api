import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import asyncHandler from '../validators/asyncHandler.js';
const connectDB=async()=>{
    try{
    await mongoose.connect(process.env.DATABASE_URL_STRING)
    console.log('DataBase is connected!!!');
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}
export default connectDB;