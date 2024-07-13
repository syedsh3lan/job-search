import User from "../../../DB/models/user.model.js"
import { sendEmailService } from "../../services/send-email.service.js";
import { ErrorHandleClass } from "../../utils/error-class.utils.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken"


//signup api
export const signup =async (req,res,next )=>{
    //get the data
    const{firstName,secondName,email,password,recoveryEmail,DOB,mobileNumber,role}=req.body 

    //check if email exist 
    const isEmailExist = await User.findOne({email});
    if(isEmailExist){
       return next(new ErrorHandleClass ("Email already exists ", 409 , "Email already exists "))
    }
    const userName = firstName + secondName 
    //hash the password 
    const hashPassword = hashSync(password , +process.env.SALT_ROUNDS) 
    
    //take instance from user 
    const userObject = new User({
        firstName,
        secondName,
        userName,
        email,
        password:hashPassword,
        recoveryEmail,
        DOB,
        mobileNumber,
        role,
    })
     //generate token
    const token = jwt.sign(
        { _id: userObject._id },
        process.env.SIGNATURE,
        {
          expiresIn: "1h",
        }
    )
     //confirmation email link
    //const confirmationLink = `${req.protocol}://${req.headers.host}/user/confirm-email/${token}`
    //send email
    // const isEmailSent =await sendEmailService({
    //     to :email,
    //     subject:"Job search app",
    //     textMessage:"welcome to our app",
    //     htmlMessage:`<a href ="${confirmationLink}">click here to confirm your email</a>`
    // })
    // if(isEmailSent.rejected.length){
    //     return res.status(400).json({ message: "Email not sent" });
    
    //save user
    const newUser = await userObject.save();
    //send response
    res.status(201).json({message: "user created done " , newUser ,token })
}


//confirm Email api
// export const confirmEmail = async(req,res,next)=>{
//     //destruct token 
//     const {token} = req.params;
//     //verify el token
//     const { _id}= jwt.verify(token, process.env.SIGNATURE);
//     //find user and update el confirm 
//     const user = await User.findOneAndUpdate(
//         {_id,isConfirmed:false},
//         {isConfirmed:true},
//         {new:true}
//     )
//     //check if user not found
//     if(!user){
//         return res.status(400).json({message: "user not found"}) 
//        }
//        //return el response
//        res.status(200).json({message:"email confirmed"})
// }

//signIn api
export const login = async(req,res,next)=>{
    const {email, password}= req.body 
    //check email or phoneNumber
    const user = await User.findOne({email})
    if(!user){
        return next(new ErrorHandleClass("invalid credentials",400))
    }
    //check the password
    const IsMatched = compareSync(password,user.password)
    if(!IsMatched){
        return next(new ErrorHandleClass("invalid credentials",400))
    }
    //update status
    user.status="online"
    //generate el token 
    const token = jwt.sign({_id:user._id , email:user.email }, process.env.SIGNATURE ,{expiresIn:"7d"})
    

    await user.save()
    res.status(200).json({message:"login success",token })   



}

//update el user
export const updateUser = async (req,res,next)=>{
    //destruct el data
    const {_id}=req.authUser
    const {email , mobileNumber , recoveryEmail , DOB , lastName , firstName} = req.body
     
    //check if email login
    const isEmailLogin = await User.findOne({_id , status:"online"})
    if(!isEmailLogin){
        return next( new ErrorHandleClass("you should login first" , 400 ))
    }
    //new data in new variable
    const updatedData = {email , mobileNumber , recoveryEmail , DOB , lastName , firstName}
    //check if we have new name for user name
    if(firstName && lastName)
        {
            const userName = firstName +lastName
            updatedData.userName= userName
        } 
        //update el data in database
        const updateUser = await User.findOneAndUpdate(_id , updatedData,{new:true})

        
        //check if we have any problem after el update 
        if(!updateUser){
            return next(new ErrorHandleClass("some thing went wrong", 400))
        }
        //response and the new data
        
        res.status(200).json({ message:'update is done' , updateUser})

}


//delete user 
export const deleteUser = async(req , res ,next )=>{
    //destruct data
    const {_id} = req.authUser
    //find el user and if he online or not 
    const deletedUser = await User.findByIdAndDelete({_id , status:"online"})
    if(!deletedUser){
        return next(new ErrorHandleClass("login First " , 401))
    }
    //response
     res.status(200).json({message:"deleted successfully"}) 

}

// get user data api
export const getUserData = async(req,res,next)=>{
    //destruct data
    const {_id}= req.authUser;
    //find el data and check if user online
    const getData = await User.findOne({_id, status:"online"})
    if(!getData){
        return next(new ErrorHandleClass("user not found" , 400))
    }
     //response
    res.status(200).json({message:"user data" , getData})
}


//get another user data 
export const getAnotherUserData = async(req,res,next)=>{
    //destruct id from params
    const {id} = req.params;
     //find el data
    const getData = await User.findById(id)
    if(!getData){
        return next( new ErrorHandleClass("user not found "))
    }
    //response
    res.status(200).json({message:"user found", getData})

}


// update password api
export const updatePass = async(req,res,next)=>{
    //destruct data
    const {_id}= req.authUser;
    const {password}=req.body
   ///find el user 
    const isUserExist= await User.findById(_id)
    //check if not exist
    if(!isUserExist){
        return next(new ErrorHandleClass("user not found",400))
    }
    //find if password is exist in another user
    const isPasswordExist = await User.findOne({password})
    if(isPasswordExist){
        return next(new ErrorHandleClass("plz change this password",400))
    }

    const hashPassword = hashSync(password , +process.env.SALT_ROUNDS)
    const updatedPassword = await User.findByIdAndUpdate(_id , {password:hashPassword})
    if(!updatedPassword){
        return next(new ErrorHandleClass("something wrong in update",400))
    }

    res.status(200).json({message:"password update successfully"})
    
}


//get ALL Account Using Recovery Email api
export const getALLAccountUsingRecoveryEmail = async(req,res,next)=>{
     //destruct Recovery Email from params
    const {recoveryEmail}=req.params
     //find el data
    const getAccount = await User.find({recoveryEmail})
    //response
    res.status(200).json({message:"account" ,getAccount })
}