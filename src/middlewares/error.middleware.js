import ApiError from "../validators/ApiError.js";
const errorHandler=(err,req,res,next)=>{
    let error=err;
    if(!(error instanceof ApiError)){
        const statusCode=error.statusCode||500;
        const message=error.message||"Internal Server Error";
        error=new ApiError(statusCode,message,err?.errors||[]);
    }
    return res.status(error.statusCode).json({
        success:error.success,
        message:error.message,
        error:error.errors
    });
}
export default errorHandler;