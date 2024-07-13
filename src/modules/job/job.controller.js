import Job from "../../../DB/models/job.model.js";
import Application from "../../../DB/models/application.model.js";
import User from "../../../DB/models/user.model.js";
import Company from "../../../DB/models/company.model.js";
import { ErrorHandleClass } from "../../utils/error-class.utils.js";





///add job 
export const addJob=async(req,res,next)=>{
   
    ///destructing data
    const{_id}=req.authUser;
    const{jobTitle,jobLocation,jobDescription,workingTime,seniorityLevel,technicalSkills,softSkills,companyID}=req.body

        ///prepare job object

        const newJob = new Job({
            jobTitle,
            jobLocation,
            jobDescription,
            workingTime,
            seniorityLevel,
            technicalSkills,
            softSkills,
            addedBy:_id,
            companyID
        });
        ///save el data
        const savedJob = await newJob.save();
        //response
        res.status(201).json({message: "Job created successfully",data: savedJob});

}

//update job
export const updateJob=async(req,res,next)=>{

    //destruct
    const{jobId}=req.params
    

    const{jobTitle,jobLocation,jobDescription,workingTime,seniorityLevel,technicalSkills,softSkills,companyId}=req.body
    
    ///find job and update
    
    const updateJob =await Job.findByIdAndUpdate({_id:jobId},req.body,{new:true})

    if(!updateJob){
        return next(new ErrorHandleClass("not updated",400))
    }
    //response
    res.status(200).json({message:"updated successfully",updateJob})    
}

//delete job
export const deleteJob=async(req,res,next)=>{

    const{jobId}=req.params
    const{_id}=req.authUser
    ///find job

    const deleteJob=await Job.findOneAndDelete({_id:jobId,addedBy:_id});
    if(!deleteJob) {
        return next(new ErrorHandleClass("not deleted",400))
    }

    ///find applications for this job and delete
    
    const deleteApplications = await Application.find({ jobId });
    if (deleteApplications.length > 0) {
      // Delete applications from the database
      await Application.deleteMany({ jobId });
    }


     res.status(200).json({message:"job deleted and related applications",deleteJob})   
}


//get all job 
export const getAllJobs =async(req,res,next)=>{
    //find all job and the company related 
    const getAllJobs=await Job.find().populate({path:'companyID'})
    ///response
    return res.status(200).json({getAllJobs})

}



//get Job for specific company 
export const getJobsForSpCompany=async(req,res,next)=>{

    //destruct data
    const{companyName}=req.query;

    //find company
    const specificCompany=await Company.findOne({companyName})

    if(!specificCompany){
        return next(new ErrorHandleClass("not found",400))
    }
    //find jobs
    const findJobs=await Job.findOne({companyID:specificCompany._id})
    if(!findJobs) {
        return next(new ErrorHandleClass("not found",400))
    }
//response
     res.status(200).json({jobs:findJobs})   


}