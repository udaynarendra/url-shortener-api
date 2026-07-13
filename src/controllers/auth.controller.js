import dotenv from "dotenv";
dotenv.config();
import apiResponse from "../validators/apiResponse.js";
import asyncHandler from "../validators/asyncHandler.js";
import ApiError from "../validators/ApiError.js";
import { registerValidation,loginValidation } from "../validators/validations.js";
import User from "../models/users.models.js";
import jwt from "jsonwebtoken";

const register=asyncHandler(async(req,res)=>{
    const validateData=await registerValidation.validateAsync(req.body);
    const existingEmail=await User.findOne({email:validateData.email});
    if(existingEmail){
        throw new ApiError(400,'Email already Exists');
    }
    const newUser=await User.create({
        name:validateData.name,
        email:validateData.email,
        password:validateData.password
    })
    return res.status(201).json(apiResponse(true,'User Register Successfully',newUser));
})

const login= asyncHandler(async(req,res)=>{
    const validateData=await loginValidation.validateAsync(req.body);
    const existingEmail=await User.findOne({email:validateData.email});
    if(!existingEmail){
        throw new ApiError(404,'Email not found , please register first');
    }
const token=jwt.sign({email:validateData.email,id:existingEmail._id},process.env.JWT_SECRET);
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});
return res.status(200).json(apiResponse(true,'Login Successfully'));
})

export {register,login};
