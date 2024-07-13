import Joi from "joi"


export const userSchema = {
    signUpSchema:{
    body:Joi.object({
        firstName : Joi.string().required(),
        secondName : Joi.string().required(),
        userName :Joi.string(),
        email:Joi.string().email({tlds:{allow:["com","net","org"]}}).required(),
        password:Joi.string().min(5).max(20),
        recoveryEmail : Joi.string().email().required(),
        DOB:Joi.string().required(),
        mobileNumber:Joi.string(),
        role:Joi.string(),

    })
},

    loginSchema:{
        body : Joi.object({
            email : Joi.string().email({tlds:{allow:["com","net","org"]}}).required(),
            password:Joi.string().min(5).max(20),
        })
    },


    updateSchema:{
        body:Joi.object({
          firstName:Joi.string(),
          secondName:Joi.string(),
        
          recoveryEmail: Joi.string().email(),
          DOB:Joi.string(),
          
          mobileNumber:Joi.string(),
          
          email:Joi.string().email({tlds:{allow:["com","net","org"]}})
      
        })
      
      },

    getAnotherUserDataSchema:{
        params:Joi.object({
            id: Joi.string(),
        })
    },

    updatePass:{
        body:Joi.object({
            password :Joi.string().min(5).max(20),
        })
    },

    getALLAccountUsingRecoveryEmailSchema:{
        params:Joi.object({
            recoveryEmail: Joi.string().email(),
        })
    },

      
}