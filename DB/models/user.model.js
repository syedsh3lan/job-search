//import { object } from "joi"
import mongoose from "mongoose"
import { systemRoles } from "../../src/utils/system-roles.utils.js"
const {Schema , model} = mongoose



//create user collection
const userSchema = new Schema({
    firstName : {
        type : String,
        require : true 
    },
    secondName : {
        type : String,
        require : true 
    },
    userName : {
        type : String,
        require : true 
        
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password:{
        type : String,
        require : true,
    },
    recoveryEmail:{
        type: String,
    },
    DOB :{
        type : Date ,
    },
    mobileNumber : {
        type : String,
        require : true,
        unique : true
    },
    // isConfirmed: {
    //     type: Boolean,
    //     default: false,
    // },
    role: {
        type : String,
        enum :Object.values(systemRoles),
        default : 'user' ,
    },
    status :{
        type :String,
        enum : ['online' , 'offline'],
        default : 'offline'
    }
},
{timestamps: true}
)

export default mongoose.models.User || model("User",userSchema)