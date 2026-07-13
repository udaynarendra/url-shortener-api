import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/db.js';
import app from './src/app.js';
import asyncHandler from './src/validators/asyncHandler.js';
const start=asyncHandler(()=>{
    connectDB();
app.listen(process.env.PORT||3000,()=>console.log(`server is running on port ${process.env.PORT||3000}`));
})
start();
