import dotenv from 'dotenv';
dotenv.config();
import ApiError from "../validators/ApiError.js";
import asyncHandler from '../validators/asyncHandler.js';
import jwt from 'jsonwebtoken';

const authMiddleware=asyncHandler((req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        throw new ApiError(404,'Token not found');
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decode;
    next()
});
export default authMiddleware;