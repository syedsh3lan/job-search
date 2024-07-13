import { ErrorHandleClass } from "../utils/error-class.utils.js";


const reqKey = ["body","query","params","headers"];


export const validationMiddleware = (schema)=>{
    return (req,res,next)=>{
        const validationError = [];
    for (const key of reqKey) {
        const validationResult = schema[key]?.validate(req[key],{
            abortEarly:false,
        });

        if(validationResult?.error){
            validationError.push(validationResult?.error?.details);

        }
        
    }
    validationError.length
    ? next(new ErrorHandleClass("validation Error",400,"validation Error"))
    : next()
    }

}