import Joi from "joi"


export const jobSchema={
    addJobSchema:{
        body:Joi.object({
            jobTitle: Joi.string().required(),
            jobLocation: Joi.string().valid('onsite', 'hybrid', 'remotely').required(),
            jobDescription: Joi.string().required(),
            workingTime: Joi.string().valid('part-time', 'full-time').required(),
            seniorityLevel: Joi.string().valid('Junior', 'Mid-level', 'Senior', 'Team-lead', 'CTO').required(),
            technicalSkills: Joi.array().items(Joi.string()).required(),
            softSkills: Joi.array().items(Joi.string()).optional(),
            companyID:Joi.string().required()
           
    
        })
    },

    updateJobSchema:{
        params:Joi.object({
            jobId:Joi.string()
        }),
    },

    deleteJobSchema:{
        params:Joi.object({
            jobId:Joi.string()
        }),
    },

    getJobWithSpCompany:{
        query:Joi.object({
            companyName:Joi.string()
        }),
    }

    
}