import Company from "../../../DB/models/company.model.js"
import Job from "../../../DB/models/job.model.js"
import { ErrorHandleClass } from "../../utils/error-class.utils.js"



//add company api 
export const addCompany =async(req,res,next)=>{
    //destruct el data
    const{_id}=req.authUser
    const {companyName,description,industry,address,numberOfEmployees,companyEmail}= req.body

 //check if company is already exist 
const isCompanyEmailExist = await Company.findOne({companyEmail})
if(isCompanyEmailExist){
    return next(new ErrorHandleClass("this company email is exist " , 400))
}
//create new company
const companyObject = {companyName,description,industry,address,numberOfEmployees,companyEmail,companyHR:_id}
const newCompany = await Company.create(companyObject)
 
//check if no problem in add
if(!newCompany){
    return next(new ErrorHandleClass("try to add again" , 400))
}

//response
res.status(200).json({message:"add is done " , newCompany})


}


//update company api 
export const updateCompany = async(req,res,next)=>{
    //destruct el data
    const {_id}=req.authUser
    const {companyId} =req.params 
    const {companyName,description,industry,address,numberOfEmployees,companyEmail}= req.body

    const updatedDate= {companyName,description,industry,address,numberOfEmployees,companyEmail}

    //check if company exist and update
    const updatedCompany=await Company.findOneAndUpdate(
        {_id:companyId , companyHR:_id},
        updatedDate,
        {new:true}
    )

    if(!updatedCompany){
        return next( new ErrorHandleClass("company not found or you are not allow to update", 400))
    }

    //response
    res.status(200).json({message:"company updated", updatedCompany})





}


//DELETE company data
export const deleteCompany = async(req ,res ,next)=>{
    //destruct el data
    const {companyId}= req.params
    //find el company and update
    const deletedCompany = await Company.findByIdAndDelete(companyId)
    if(!deletedCompany){
        return next(new ErrorHandleClass("company not found",400))
    }
    //find job in this company and delete it also
    const deleteJob =await Job.deleteMany({companyID:companyId})
    if(!deleteJob){
        return next(new ErrorHandleClass("no jop deleted" , 400))
    }
    //response
    res.status(200).json({message:"company deleted" , deleteJob})    

}


//get company data with jobs related to this company
export const getCompany = async(req,res,next)=>{
    //destruct el data
    const { companyId} = req.params
    const getCompany = await Company.findById(companyId);
    if (!getCompany) {
        return next(new ErrorHandleClass("company not found" , 400))
    }

    // Find all jobs related to this company
    const getJobs = await Job.find({ companyID:companyId });

    res.status(200).json({message:"company data", getCompany, getJobs });


}


//search for company using el name 
export const searchForCompany = async(req,res,next)=>{
    //destruct el data
    const{nameOfCompany}=req.query;
   
    
    ///find company
    const searchCompany=await Company.findOne({companyName:nameOfCompany})
    
    if(!searchCompany){
        return next(new ErrorHandleClass("company not found" , 400))
    }
    //response
    res.status(200).json({message:"company data", searchCompany });


}