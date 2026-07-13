import dotenv from 'dotenv';
dotenv.config();
import apiResponse  from '../validators/apiResponse.js';
import ApiError from '../validators/ApiError.js';
import asyncHandler from '../validators/asyncHandler.js';
import { nanoid } from 'nanoid';
import { urlValidation } from '../validators/validations.js';
import Url from '../models/urls.models.js';

const createUrl=asyncHandler(async(req,res)=>{
const validateData = await urlValidation.validateAsync(req.body);
const userId=req.user.id;
const user = await Url.findOne({user:userId});
const shortCode=nanoid(6);
let newUrl;
const newShortUrl={
    originalUrl:validateData.url,
    shortCode
}
if(user){
 user.url.push(newShortUrl);
 await user.save();
 newUrl=user;
}
else{
    newUrl=await Url.create({
        user:userId,
        url:[newShortUrl]
    })
}

return res.status(201).json(apiResponse(true,'Short Code created successfully',newUrl));
});

const urlRedirect=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    const shortCode=req.params.shortCode;
    const user=await Url.findOne({user:userId});
    if(!user){
        throw new ApiError(404,'user not found');
    }
    const existingShortCode=user.url.find((code)=>code.shortCode===shortCode);
    if(!existingShortCode){
        throw new ApiError(400,'short code not found');
    }
     res.redirect(existingShortCode.originalUrl);
});

const urlDetails=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    const shortCode=req.params.shortCode;
    const user= await Url.findOne({user:userId});
    if(!user){
        throw new ApiError(404,'user not found');
    }
    const existingShortCode=user.url.find((code)=>code.shortCode===shortCode);
    if(!existingShortCode){
        throw new ApiError(400,'short code not found');
    }
    return res.status(200).json(apiResponse(true,'fetched successfully',existingShortCode));
})
const getAllUrls=asyncHandler(async(req,res)=>{
    // const userId=req.user.id;
    const userId='6a5395f65364c79760b767e0'
    const user=await Url.findOne({user:userId});
    if(!user){
        throw new ApiError(404,'user not found');
    }
    if(user.url.length===0){
        throw new ApiError(400,'No Urls');
    }
    return res.status(200).json(apiResponse(true,'fetched successfully',user.url));
})

const deleteUrl=asyncHandler(async(req,res)=>{
    const shortCode=req.params.shortCode;
    const userId=req.user.id;
    const user=await Url.findOne({user:userId});
    if(!user){
        throw new ApiError(404,'user not found');
    }
    await Url.findOneAndUpdate({user:userId},{$pull:{
        url:{shortCode}
    }},{
        returnDocument:"after"
    })
    return res.status(200).json(apiResponse(true,'deleted successfully'));
})
export {createUrl,urlRedirect,urlDetails,getAllUrls,deleteUrl};