import Joi from "joi"




export const companySchema ={
    addCompanySchema :{
    body:Joi.object({
        companyName:Joi.string().required(),
        description:Joi.string().required(),
        industry:Joi.string().required(),
        address:Joi.string().required(),
        numberOfEmployees:Joi.string(),
        companyEmail: Joi.string().email({ tlds: { allow: ["com", "net", "org"] } }).required(),
    })
    },

    updateCompanySchema:{
        params:Joi.object({
            companyId:Joi.string()
        }),

        body:Joi.object({
            companyName:Joi.string().required(),
            description:Joi.string().required(),
            industry:Joi.string().required(),
            address:Joi.string().required(),
            numberOfEmployees:Joi.string(),
            companyEmail: Joi.string().email({ tlds: { allow: ["com", "net", "org"] } }).required(),
        })
    },

    deleteCompanySchema:{
        params:Joi.object({
            companyId:Joi.string()
        }),
    },

    getCompanySchema:{
        params:Joi.object({
            companyId:Joi.string()
        }),
    },

    searchCompanySchema:{
        query:Joi.object({
            nameOfCompany:Joi.string()
        }),
    }
}