import { ErrorHandleClass } from "../utils/error-class.utils.js"




export const authorization = (allowedRoles)=>{
    return async(req,res,next)=>{
        const user = req.authUser
        if(!allowedRoles.includes(user.role)){
            return next(new ErrorHandleClass("authorization error",401 , "you are not allowed to access this route" ))
        }
        next()
    }

}