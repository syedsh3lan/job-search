import { ErrorHandleClass } from "../utils/error-class.utils.js";

//error handling
export const errorHandle = (API)=>{
    return (req,res,next)=>{
        API(req,res,next)?.catch((err)=>{
            console.log("error in error handle middleware",err);
            
         next(new ErrorHandleClass("Internal server error", 500 , err.message ))
        })
    }

}

export const globalResponse = (err,req,res,next)=>{
    if(err){
        res.status(err.status || 500).json({
            message : "fail response",
            err_msg:err.message,
            err_location: err.location,
            data: err.data

        })
    }
}